
from models.websocketMessage import Message
from audioSystem import AudioSystem
from ctypes import Structure
import os

from remotes.tv_lg_remote import LGTV
from remotes.monitor_samsung_remote import SamsungTV
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

import asyncio
import websockets

sendMessageQueue: collections.Deque['Message'] = collections.deque()


#samsungTv = SamsungTV("192.168.178.49", token=77086677)
#lgTv = LGTV()

def speak(text):
    with BytesIO() as f:
        tts = gTTS(text=text, lang="es-ES")
        tts.write_to_fp(f)  # Write speech to f
        f.seek(0)  # seek to zero after writing
        song = AudioSegment.from_file(f, format="mp3")
        log(text)
        play(song)


def get_audio():
    r = sr.Recognizer()
    with sr.Microphone(device_index=2, sample_rate=16000) as source:
        audio = r.record(source, duration=3)
        said = ""

        try:
            said = r.recognize_google(audio, language="nl-NL")
            log(said)
            print(said)
        except Exception as e:
            print("Exception: " + str(e))

    return said

def get_microphone_devices():
    for index, name in enumerate(sr.Microphone.list_microphone_names()):     
        print("Microphone with name \"{1}\" found for Microphone(device_index={0})".format(index, name))

hdmi = True

def startWakeWord():
    handle = pvporcupine.create(keywords=['computer'])
    pa = pyaudio.PyAudio()
    audio_stream = pa.open(
                    rate=handle.sample_rate,
                    channels=1,
                    format=pyaudio.paInt16,
                    input=True,
                    frames_per_buffer=handle.frame_length)

    while True:
        pcm = audio_stream.read(handle.frame_length)
        pcm = struct.unpack_from("h" * handle.frame_length, pcm)

        keyword_index = handle.process(pcm)

        if keyword_index >= 0:

            audio_stream.stop_stream()
            audio_stream.close()
            pa.terminate()
            handle.delete()
            speak("activated")
            print(audio_stream.is_stopped)

            samsungTv = SamsungTV("192.168.178.49", token=77086677)
            pixels = Pixels()
            print("Hotword Detected")
            pixels.wakeup()
            time.sleep(5)
            while True:
                print("Listening")
                text = get_audio().lower()
                if text.count("tv aan") > 0:
                    speak("activated")
                    samsungTv.power()
                if text.count("tv uit") > 0:
                    speak("disabled")
                    samsungTv.power()
                if text.count("switch") > 0:
                    system = AudioSystem()
                    if hdmi:
                        os.system("sudo amixer cset numid=3 1")
                        speak("this is a test")
                    else:
                        os.system("sudo amixer cset numid=3 2")
                        speak("this is a test")


def log(type, message):
    mes = Message(type, message)
    sendMessageQueue.append(mes)

def sendWebSockStart():
    # since we're in a separate thread now, call new_event_loop() (rather than the usual get_event_loop())
    # and set the returned loop as the current loop
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    # instantiate the WebSocket server, note this also connects it to the sendMessages function
    webSocketServer = websockets.serve(sendMessages, 'localhost', 8765)
    # run the webSocketServer forever, which runs the sendMessages function forever
    loop.run_until_complete(webSocketServer)
    loop.run_forever()      # note execution of this separate thread stays on this line forever


async def sendMessages(websocket, path):
    while True:
        await asyncio.sleep(1)
        while len(sendMessageQueue) > 0:
            print(json.dumps(sendMessageQueue.popleft().__dict__))
            await websocket.send(json.dumps(sendMessageQueue.popleft().__dict__))


def main():
    # start the WebSocket sending on a separate thread so it doesn't block main
    webSockSendThread = threading.Thread(target=sendWebSockStart)
    webSockSendThread.start()

    startWakeWord()

main()