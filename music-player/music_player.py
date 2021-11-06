
import threading
import websocket
import _thread
import json
import vlc
import time

from dtos.message import Message
from services.sounbar_service import SoundBarService
from services.song_api_service import SongApiService 


class MusicPlayer:
    def __init__(self):
        self.ws = None
        self.instance = None
        self.player = None
        self.media = None

        webSockSendThread = threading.Thread(target=self.connect_to_command_center)
        webSockSendThread.start()

        soundbarService = SoundBarService()
        soundbarService.start()

        self.play_music(6)


    ###Websocket to commandcenter
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
            message = Message("init", "musicplayer")
            
            ws.send(message.toJson())
        _thread.start_new_thread(run, ())
    
    def send_message(self, topic, message):
        self.ws.send(Message("monitor-" + topic, message).toJson())

    ###musicplayer functionallity
    def play_music(self, playListId):
        musicThread = threading.Thread(target=self._play_music, args=[playListId])
        musicThread.start()

    def _play_music(self, playListId):
        api = SongApiService()
        songs = api.getSongs(playListId)

        self.media_player = vlc.MediaListPlayer()

        self.media_player.set_playback_mode(vlc.PlaybackMode.loop)
        self.event_manager = self.media_player.event_manager()
        self.player = vlc.Instance()
        self.media_list = vlc.MediaList()
        
        self.event_manager.event_attach(vlc.EventType.MediaListPlayerNextItemSet , self._song_finished)

        for song in songs:
            media = self.player.media_new('file:///home/pi/Desktop/raspberry/music-player/music/' + song['title'])
            self.media_list.add_media(media)
        
        self.media_player.set_media_list(self.media_list)
        self.media_player.play()

    def pause(self):
        self.media_player.pause()
    
    def stop(self):
        self.media_player.stop()
    
    def previous(self):
        self.media_player.previous()
    
    def next(self):
        self.media_player.next()

    def setAudio(self, volume):
        self.media_player.audio_set_volume(volume)

    def _song_finished(self, event):
        song = self.media_player.get_media_player().get_media().get_mrl().replace("file:///home/pi/Desktop/raspberry/music-player/music/","").replace(".mp3", "")
        self.send_message("new-song", song)
