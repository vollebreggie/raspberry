import requests

class SongApiService:
    def __init__(self):
        print("songApiService init")

    def getSongs(self, playListId):
        r = requests.get("https://kataskopos.nl/api/Song/GetSongs/" + str(playListId))
        responseJson = r.json()
        return responseJson['response']
        # for song in responseJson['response']:
        #     print(song['url'])

    def getUnsyncedSongs(self):
        r = requests.get("https://kataskopos.nl/api/Song/GetUnsyncedSongs")
        responseJson = r.json()
        return responseJson['response']

    def updateSong(self, title, songId):
        r = requests.get("https://kataskopos.nl/api/Song/UpdateSongTitle/" + title + "/" + str(songId))

