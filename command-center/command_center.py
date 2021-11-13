import asyncio
import threading
import collections
import json
import websocket
import _thread
import subprocess
from services.sounbar_service import SoundBarService
from websocket_server import WebsocketServer
import websockets
from dtos.client import Client
from dtos.message import Message

from services.song_api_service import SongApiService


class CommandCenter:
    def __init__(self):
        self.clients = []
        self.server = None
        self.music = None

        webSockSendThread = threading.Thread(target=self.setup_websocket_server)
        webSockSendThread.start()

        webSockSendThread = threading.Thread(target=self.connect_to_kataskopos_server)
        webSockSendThread.start()
    
    def setup_websocket_server(self):
        print("starting up server..")
        server = WebsocketServer(port=9001)
        server.set_fn_new_client(self.new_client)
        server.set_fn_client_left(self.client_left)
        server.set_fn_message_received(self.message_received)
        server.run_forever()


    #kataskopos server
    def connect_to_kataskopos_server(self):
        print("connecting to Kataskopos server..")
        ws = websocket.WebSocketApp("ws://kataskopos.nl/tv", on_open=self.on_open, on_message=self.on_message, on_error=self.on_error)
        ws.run_forever()

    def on_message(self, ws, message):
        print(message)

        if(message == "sync"):
            api = SongApiService()
            songs = api.getUnsyncedSongs()
            for song in songs:
                process = subprocess.Popen(["python3", "/home/pi/Desktop/raspberry/services/youtube_service.py", song["url"], str(song["id"])])
                process.wait()

                print("Sync completed!")

    def on_error(self, ws, error):
        print(error)

    def on_close(self, ws, close_status_code, close_msg):
        print("closed")

    def on_open(self, ws):
        print("connected to Kataskopos server")

        def run(*args):
            ws.send("{'Device':4,'UserId':'693b2e8c-4a2b-44ca-956a-c9a1cc6f8de6','Message':'connection opened'}")
        _thread.start_new_thread(run, ())


    #CommandServer func
    def new_client(self, client, server):
        self.server = server
        print("New client connected and was given id %d" % client['id'])

    def client_left(self, client, server):
        print("Client(%d) disconnected" % client['id'])
        self.clients.remove(Client("", client['id']))
        print(self.clients)

    def message_received(self, client, server, jsonString):
        message = json.loads(jsonString)

        print("Client(%d) said: %s" % (client['id'], message))

        if(message["type"] == "init"):
            clientDTO = Client(message["message"], client['id'])
            self.clients.append(clientDTO)
            return
        elif(message["type"] == "command"):
            self.procesCommand(message["message"], message["args"])
        elif(message["type"] == "log"):
            print(message["message"])

    def send_message(self, client: str, message: str, args: str):
        for client in self.clients:
            if(client['name'] == client):
                self.server.send_message(client['id'], Message("command", message, args))
        
    def procesCommand(self, command: str, args: str):
        if(command == "play"):
            soundBarService = SoundBarService()
            soundBarService.start()

            self.send_message("monitor", "music-play", args)

        if(command == "pause"):
            self.send_message("monitor", "music-pause", args)

        if(command == "next"):
            self.send_message("monitor", "music-next", args)

        if(command == "previous"):
            self.send_message("monitor", "music-previous", args)




        
