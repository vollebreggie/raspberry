import subprocess
from io import BytesIO
from remotes.tv_lg_remote import LGTV
import time
from dtos.message import Message

from gtts.tts import gTTS
from pydub.audio_segment import AudioSegment
from pydub.playback import play
from remotes.monitor_samsung_remote import SamsungTV
# from pixels.pixels import Pixels
import keys


class Commando:

    def __init__(self):
        # self.pixels = Pixels()
        self.tv = LGTV()
        self.music = None

    def checkForCommandos(self, text):
        message = self._checkForPossibilities(text)
        # if(message != None):
        # self.pixels.commando_understood()
        # self.pixels.listening()
        # else:
        # self.pixels.error()
        # self.pixels.listening()

        return message

    def _checkForPossibilities(self, text):
        if text == "recept details open":
            return Message("command", keys.recipeDetailsOpen, "")
        elif text == "recept details close":
            return Message("command", keys.recipeDetailsClose, "")
        elif text == "open console":
            return Message("command", keys.consoleOpen, "")
        elif text == "close console":
            return Message("command", keys.consoleClose, "")
        elif text == "open notificaties":
            return Message("command", keys.notificationOpen, "")
        elif text == "close notificaties":
            return Message("command", keys.notificationClose, "")
        elif text == "open schedule":
            return Message("command", keys.scheduleOpen, "")
        elif text == "close schedule":
            return Message("command", keys.scheduleClose, "")
        elif text.count("monitor on") > 0:
            self.speak("activated")
            samsung = SamsungTV("192.168.178.199", 18724684)
            samsung.power()
            samsung.close()
            return None
        elif text.count("monitor off") > 0:
            self.speak("disabled")
            samsung = SamsungTV("192.168.178.199", 18724684)
            samsung.power()
            samsung.close()
            return None
        elif text.count("tv on") > 0:
            self.speak("activated")
            self.tv.on()
            return None
        elif text.count("tv off") > 0:
            self.speak("disabled")
            self.tv.off()
            return None
        elif text.count("music") > 0 or text.count("play"):
            return Message("command", "play", "")
        elif text.count("next") > 0:
            return Message("command", "next", "")
        elif text.count("previous") > 0:
            return Message("command", "previous", "")
        elif text.count("pause") > 0 or text.count("stop") > 0:
            return Message("command", "pause", "")
        elif text.count("playlist") > 0 or text.count("list") > 0:
            return Message("command", "play", text.replace("playlist", "").replace("list", ""))
        elif(text.count("project") > 0):
            return Message("command", "show project", text.replace("show", "").replace("project", ""))
        elif(text.count("component") > 0):
            return Message("command", "show component", text.replace("show", "").replace("component", ""))
        elif(text.count("task") > 0):
            return Message("command", "show task", text.replace("show", "").replace("task", ""))
        elif(text.count("create") > 0):
            return Message("command", "create", text.replace("create", ""))
        elif(text.count("update") > 0):
            if(text.count("title") > 0):
                return Message("command", "title update", "")
            if(text.count("description") > 0):
                return Message("command", "description update", "")
            if(text.count("points") > 0):
                return Message("command", "points update", "")
        
        else:
            return None

    def speak(self, text):
        with BytesIO() as f:
            tts = gTTS(text=text, lang="en")
            tts.write_to_fp(f)  # Write speech to f
            f.seek(0)  # seek to zero after writing
            song = AudioSegment.from_file(f, format="mp3")
            play(song)
