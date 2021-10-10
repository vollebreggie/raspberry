
from commando import Commando
from models.websocketMessage import Message
from audioSystem import AudioSystem
from ctypes import Structure
import os
import websocket
import _thread
from remotes.tv_lg_remote import LGTV
from pygame import mixer
import speech_recognition as sr
from gtts import gTTS
from io import BytesIO
from pydub import AudioSegment
from pydub.playback import play
import beepy
import pyaudio
import sys
from precise_runner import PreciseEngine, PreciseRunner
import pvporcupine
import json
from pixels.pixels import Pixels
import struct
import time
import collections
import threading
import subprocess
import asyncio
import websockets

from services.song_api_service import SongApiService

sendMessageQueue = collections.deque()

# pixels = Pixels()
# pixels.listening()
# while True:
#     time.sleep(1)
#lgTv = LGTV()
class Engine:

    def __init__(self):
        self.activated = False
        self.timeout = time.time() + 60 * 5  
        self.pixels = Pixels()
        self.commandoService = Commando()
        self.handle = pvporcupine.create(keywords=['computer'])
        self.pa = pyaudio.PyAudio()
        self.audio_stream = None
        self.stop_listening = None

    def speak(self, text):
        with BytesIO() as f:
            tts = gTTS(text=text, lang="en")
            tts.write_to_fp(f)  # Write speech to f
            f.seek(0)  # seek to zero after writing
            song = AudioSegment.from_file(f, format="mp3")
            self.log("speach", text)
            play(song)


    def callback(self, recognizer, audio):
            try: 
                text = recognizer.recognize_google(audio, language="nl-NL").lower()
                self.log("recorded audio", text)
                if len(text) > 0:
                    self.timout = time.time() + 30 
                    commando = self.commandoService.checkForCommandos(text)
                    if commando != None:
                        self.log("commando", commando)

            # handles any api/voice errors  errors 
            except sr.RequestError: 
                self.log("callback", "There was an issue in handling the request, please try again")
            except sr.UnknownValueError:
                self.log("callback", "Unable to Recognize speech")

    def get_audio(self):
        r = sr.Recognizer()
        try: 
            self.microphone = sr.Microphone(device_index=2)

        except(IOError):
            self.log("get audio", "ERROR: No default microphone. Check if microphone is plugged in or if you have a default microphone set in your sound settings.")
            
        with self.microphone as source:
            r.adjust_for_ambient_noise(source)

        self.speak("activated")
        self.stop_listening = r.listen_in_background(self.microphone, self.callback, phrase_time_limit=3)
   
    def get_microphone_devices(self):
        for index, name in enumerate(sr.Microphone.list_microphone_names()):     
            print("Microphone with name \"{1}\" found for Microphone(device_index={0})".format(index, name))

    def openWakeWordStream(self):
        self.handle = pvporcupine.create(keywords=['computer'])
        self.pa = pyaudio.PyAudio()
        self.audio_stream = self.pa.open(
                        rate=self.handle.sample_rate,
                        channels=1,
                        format=pyaudio.paInt16,
                        input=True,
                        frames_per_buffer=self.handle.frame_length)    

    def listeningToWakeWord(self):    
        while True:
            if(self.activated == False):

                pcm = struct.unpack_from("h" * self.handle.frame_length, self.audio_stream.read(self.handle.frame_length))
                keyword_index = self.handle.process(pcm)

                if keyword_index >= 0:
                    self.pixels.loading()
                    timeoutThread = threading.Thread(target=self.startTimeoutSequence)
                    timeoutThread.start()
                    self.audio_stream.stop_stream()
                    self.audio_stream.close()
                    self.audio_stream = None
                    self.pa.terminate()
                    self.handle.delete()
                    self.timout = time.time() + 30 
                    
                    self.activated = True
                    self.speak("loading")
                    time.sleep(3)
                    self.pixels.listening()
                    self.get_audio()
                    break

    def startTimeoutSequence(self):
        looper = True
        while looper:
            time.sleep(5)
            if time.time() > self.timeout:
                looper = False
                self.activated = False
                self.pixels.standby()
                if self.stop_listening:
                    self.stop_listening(wait_for_stop=False)
                    self.stop_listening = None
                self.speak("standby")
                self.openWakeWordStream()
                self.listeningToWakeWord()
                

    def startEngine(self):
        # start the WebSocket sending on a separate thread so it doesn't block main
        webSockSendThread = threading.Thread(target=self.connect_to_monitor)
        webSockSendThread.start()

        webSockSendThread = threading.Thread(target=self.connect_to_server)
        webSockSendThread.start()

        self.openWakeWordStream()
        self.pixels.standby()

        self.listeningToWakeWord()

    def log(self, type, message):
        print(type + ": " + message)
        mes = Message(type, message)
        sendMessageQueue.append(mes)

    def connect_to_monitor(self):
        # since we're in a separate thread now, call new_event_loop() (rather than the usual get_event_loop())
        # and set the returned loop as the current loop
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        # instantiate the WebSocket server, note this also connects it to the sendMessages function
        webSocketServer = websockets.serve(self.sendMessages, 'localhost', 8766)
        # run the webSocketServer forever, which runs the sendMessages function forever
        loop.run_until_complete(webSocketServer)
        loop.run_forever()      # note execution of this separate thread stays on this line forever


    async def sendMessages(self, connection, path):
        while True:
            await asyncio.sleep(1)
            
            while len(sendMessageQueue) > 0:
                m = json.dumps(sendMessageQueue.popleft().__dict__, default=str)
                await connection.send(m)

    def connect_to_server(self):
        ws = websocket.WebSocketApp("ws://192.168.178.33:45455/tv", on_open=self.on_open, on_message=self.on_message, on_error=self.on_error)
        ws.run_forever()

    def on_message(self, ws, message):
        if(message == "sync"):
            api = SongApiService()
            songs = api.getUnsyncedSongs()
            for song in songs:
                process = subprocess.Popen(["python3", "/home/pi/Desktop/raspberry/VoiceToText/services/youtube_service.py", song["url"], str(song["id"])])
                process.wait()

                print("Completed!")

    def on_error(self, ws, error):
        print(error)

    def on_close(self, ws, close_status_code, close_msg):
        print("closed")

    def on_open(self, ws):
        def run(*args):
            ws.send("{'Device':4,'UserId':'693b2e8c-4a2b-44ca-956a-c9a1cc6f8de6','Message':'connection opened'}")
        _thread.start_new_thread(run, ())

    

   
