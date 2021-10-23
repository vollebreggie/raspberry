import threading
import vlc
import time

import temescal
import bluetooth
import os

from song_api_service import SongApiService

class SoundService:
    def playMusic(self, playListId):
        musicThread = threading.Thread(target=self._playMusic, args=[playListId])
        musicThread.start()

    def _playMusic(self, playListId):
        api = SongApiService()
        songs = api.getSongs(playListId)
        song_list = []

        for song in songs:
            song_list.append('file:///home/pi/Desktop/raspberry/VoiceToText/music/' + song['title'])
            
        instance = vlc.Instance('--input-repeat=-1', '--mouse-hide-timeout=0')
        for song in song_list:
            player = instance.media_player_new()
            media = instance.media_new(song)
            
            media.get_mrl()
            player.set_media(media)
            player.play()
            playing = set([1,2,3,4])
            time.sleep(1)
            duration = player.get_length() / 1000
            mm, ss = divmod(duration, 60)

            time.sleep(20)

            while True:
                state = player.get_state()
                if state not in playing:
                    break
                continue


class BluetoothService:

    # def __init__(self):
    #     self.start()

    def speaker_callback(self, callback):
        systemThread = threading.Thread(target=self.pairSoundBar)
        systemThread.start()
        
        
    def start(self, playList):
        speaker = temescal.temescal("192.168.178.52", callback=self.speaker_callback)
        speaker.set_func(temescal.BLUETOOTH)
        speaker.get_info()
        time.sleep(3)
        SoundService().playMusic(playList)

    def pairSoundBar(self):
        os.system("bluetoothctl connect 20:3D:BD:B4:11:80")


