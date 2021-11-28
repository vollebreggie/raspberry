import threading
import wave
from pyaudio import PyAudio
import pyaudio
import torch
import librosa
import time
import numpy as np
import soundfile as sf
from scipy.io import wavfile
import torchaudio
from IPython.display import Audio
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer
import speech_recognition as sr
from transformers import BertTokenizer, BertModel
from transformers import Wav2Vec2Processor, HubertForCTC
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
        self.listener = Listener(sample_rate=8000)
        self.audio_q = list()
        self.processor = Wav2Vec2Processor.from_pretrained("facebook/hubert-large-ls960-ft")
        self.model = HubertForCTC.from_pretrained("facebook/hubert-large-ls960-ft")

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
        input_values = self.processor(input_audio, return_tensors="pt", sampling_rate=16000).input_values
        logits = self.model(input_values).logits
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = self.processor.decode(predicted_ids[0])
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

engine = SpeechRecognitionEngine()
engine.run()
threading.Event().wait()
