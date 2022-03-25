import threading
import wave
from pyaudio import PyAudio
from commando import Commando
from dtos.message import Message
import websocket
import pyaudio
import torch
import librosa
import _thread
import time
import numpy as np
import torchaudio
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, Wav2Vec2ForCTC, Wav2Vec2Tokenizer
from transformers import BertTokenizer, BertModel
from transformers import Wav2Vec2Processor, HubertForCTC
import onnxruntime as rt
from openvino.runtime import Core
import openvino.runtime as ov

# from pixels.pixels import Pixels
class Listener:
    
    def __init__(self, sample_rate=16000):
        self.chunk = 1024
        self.sample_rate = sample_rate
        self.p = pyaudio.PyAudio()
        self.stream = self.p.open(format=pyaudio.paInt16,
                        channels=1,
                        rate=self.sample_rate,
                        input=True,
                        output=True,
                        frames_per_buffer=self.chunk)

    def listen(self, queue):
        while True:
            data = self.stream.read(self.chunk , exception_on_overflow=False)
            queue.append(data)
            time.sleep(0.01)

    def run(self, queue):
        thread = threading.Thread(target=self.listen, args=(queue,), daemon=True)
        thread.start()
        print("\Speech Recognition engine is now listening... \n")


class SpeechRecognitionEngine:

    def __init__(self):
        # self.pixels = Pixels()
        self.commandoService = Commando()
        self.listener = Listener(sample_rate=8000)
        self.audio_q = list()
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        #self.processor = Wav2Vec2Processor.from_pretrained("facebook/hubert-large-ls960-ft")
        self.processor = AutoProcessor.from_pretrained("facebook/s2t-small-librispeech-asr")
        self.model = AutoModelForSpeechSeq2Seq.from_pretrained("facebook/s2t-small-librispeech-asr")

    def save(self, waveforms, fname="audio_temp"):
        wf = wave.open(fname, "wb")
        wf.setnchannels(1)
        wf.setsampwidth(self.listener.p.get_sample_size(pyaudio.paInt16))
        wf.setframerate(8000)
        wf.writeframes(b"".join(waveforms))
        wf.close()
        return fname

    def predict(self, audio):
        fname = self.save(audio)
        input_audio, _ = librosa.load(fname, sr=16000)
      
        input_features = self.processor(input_audio, sampling_rate=16000, return_tensors="pt").input_features  # Batch size 1
        generated_ids = self.model.generate(input_features=input_features)
        list = self.processor.batch_decode(generated_ids)
        transcription = list[0]

        if len(transcription) > 0:
            self.log("recorded audio", transcription)
            self.send_message_to_command_center(Message("command", transcription, ""))

        print(transcription)

    def inference_loop(self):
        while True:
            if len(self.audio_q) < 20:
                continue
            else:
                pred_q = self.audio_q.copy()
                self.audio_q.clear()
                self.predict(pred_q)
             
            time.sleep(0.01)

    def run(self):
        self.listener.run(self.audio_q)
        thread = threading.Thread(target=self.inference_loop,
                                    args=(), daemon=True)
        thread.start()

    def startEngine(self):
            # start the WebSocket sending on a separate thread so it doesn't block main
            webSockSendThread = threading.Thread(target=self.connect_to_command_center)
            webSockSendThread.start()

            self.run()

            # self.pixels.standby()


    def log(self, description, message):
        if(self.ws != None):
            self.ws.send(Message("log", description + ": " + message, "").toJson())


    def send_message_to_command_center(self, message: Message):
        if(self.ws != None):
            self.ws.send(message.toJson())

    def connect_to_command_center(self):
        ws = websocket.WebSocketApp("ws://localhost:9001", on_open=self.on_open, on_message=self.on_message, on_error=self.on_error)
        ws.run_forever()

    def on_message(self, ws, message):
        print(message)

    def on_error(self, ws, error):
        print(error)

    def on_close(self, ws, close_status_code, close_msg):
        print("closed")

    def on_open(self, ws):
        self.ws = ws
        def run(*args):
            ws.send(Message("init", "voicetotext", "").toJson())
        _thread.start_new_thread(run, ())

# engine = SpeechRecognitionEngine()
# engine.run()
# threading.Event().wait()
