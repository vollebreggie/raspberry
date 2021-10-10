import requests

class SongApiService:
    def getSongs(self, playListId):
        r = requests.get("http://192.168.178.33:45455/api/Song/GetSongs/" + str(playListId))
        responseJson = r.json()
        return responseJson['response']
        # for song in responseJson['response']:
        #     print(song['url'])

    def getUnsyncedSongs(self):
        r = requests.get("http://192.168.178.33:45455/api/Song/GetUnsyncedSongs")
        responseJson = r.json()
        return responseJson['response']

    def updateSong(self, title, songId):
        r = requests.get("http://192.168.178.33:45455/api/Song/UpdateSongTitle/" + title + "/" + str(songId))

