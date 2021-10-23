import time
import temescal
import bluetooth
import os

class SoundBarService:

    def speaker_callback(self, callback):
        self.pairSoundBar()
        print(callback)
        
    def start(self):
        speaker = temescal.temescal("192.168.178.52", callback=self.speaker_callback)
        speaker.set_func(temescal.BLUETOOTH)
        speaker.get_info()
        

    def pairSoundBar(self):
        os.system("bluetoothctl connect 20:3D:BD:B4:11:80")