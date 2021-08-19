from asyncio.windows_events import NULL
from io import BytesIO

from gtts.tts import gTTS
from pydub.audio_segment import AudioSegment
from pydub.playback import play
from VoiceToText.remotes.monitor_samsung_remote import SamsungTV
from VoiceToText.pixels.pixels import Pixels
import keys

class Commando:

    def __init__(self):
        self.pixels = Pixels()
        self.samsungTv = SamsungTV("192.168.178.49", token=77086677)
        
    def checkForCommandos(self, text):
        message = self._checkForPossibilities(text)
        if(message != NULL):
            self.pixels.commando_understood()
        else:
            self.pixels.error()

    def _checkForPossibilities(self, text):
        if text == "recept details open":
            return keys.recipeDetailsOpen
        elif text == "recept details open":
            return keys.recipeDetailsClose
        elif text == "open console":
            return keys.consoleOpen
        elif text == "sluit console":
            return keys.consoleClose
        elif text == "open notificaties":
            return keys.notificationOpen
        elif text == "sluit notificaties":
            return keys.notificationClose
        elif text == "open schedule":
            return keys.scheduleOpen
        elif text == "sluit schedule":
            return keys.scheduleClose
        elif text.count("tv aan") > 0:
            self.speak("activated")
            self.samsungTv.power()
            return ""
        elif text.count("tv uit") > 0:
            self.speak("disabled")
            self.samsungTv.power()
            return ""
        else:
            return NULL

    def speak(self, text):
        with BytesIO() as f:
            tts = gTTS(text=text, lang="es-ES")
            tts.write_to_fp(f)  # Write speech to f
            f.seek(0)  # seek to zero after writing
            song = AudioSegment.from_file(f, format="mp3")
            self.log("speach", text)
            play(song)
