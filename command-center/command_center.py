import asyncio
import threading
import collections
import json
import websocket
import _thread
import subprocess

import websockets

from services.song_api_service import SongApiService


class CommandCenter:
    def __init__(self):
        self.sendMessages = collections.deque()

        webSockSendThread = threading.Thread(target=self.setup_websocket_server)
        webSockSendThread.start()

        webSockSendThread = threading.Thread(target=self.connect_to_server)
        webSockSendThread.start()
    
    def setup_websocket_server(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        webSocketServer = websockets.serve(self.sendMessages, 'localhost', 8766)
        loop.run_until_complete(webSocketServer)
        loop.run_forever()      


    async def sendMessages(self, connection, path):
        while True:
            await asyncio.sleep(1)
            
            while len(self.sendMessageQueue) > 0:
                m = json.dumps(self.sendMessageQueue.popleft().__dict__, default=str)
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

    