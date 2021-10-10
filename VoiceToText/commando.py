from services.sound_service import SoundService
from services.bluetooth_service import BluetoothService
from io import BytesIO
from remotes.tv_lg_remote import LGTV
import time

from gtts.tts import gTTS
from pydub.audio_segment import AudioSegment
from pydub.playback import play
from remotes.monitor_samsung_remote import SamsungTV
from pixels.pixels import Pixels
import keys

class Commando:

    def __init__(self):
        self.pixels = Pixels()
        self.tv = LGTV()
        self.bluetooth = BluetoothService()
        self.sound = SoundService()

    def checkForCommandos(self, text):
        message = self._checkForPossibilities(text)
        if(message != None):
            self.pixels.commando_understood()
            self.pixels.listening()
        else:
            self.pixels.error()
            self.pixels.listening()

        return message

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
        elif text.count("monitor aan") > 0:
            self.speak("activated")  
            samsung = SamsungTV("192.168.178.199", 18724684)
            samsung.power()
            samsung.close()
            return ""
        elif text.count("monitor uit") > 0:
            self.speak("disabled")
            samsung = SamsungTV("192.168.178.199", 18724684)
            samsung.power()
            samsung.close()
            return ""
        elif text.count("tv aan") > 0:
            self.speak("activated")
            self.tv.on()
            return ""
        elif text.count("tv uit") > 0:
            self.speak("disabled")
            self.tv.off()
            return ""
        elif text.count("muziek") > 0:
            self.bluetooth.start()
            time.sleep(2)
            self.sound.playMusic()
            return ""
        else:
            return None

    def speak(self, text):
        with BytesIO() as f:
            tts = gTTS(text=text, lang="en")
            tts.write_to_fp(f)  # Write speech to f
            f.seek(0)  # seek to zero after writing
            song = AudioSegment.from_file(f, format="mp3")
            play(song)
