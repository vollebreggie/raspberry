import youtube_dl
import sys

from song_api_service import SongApiService

class YoutubeService:
    def downloadSong(self, video_url):
        video_info = youtube_dl.YoutubeDL().extract_info(
            url = video_url,download=False
        )
        filename = f"{video_info['title']}.%(ext)s"
        options={
            'format': 'bestaudio/best', 'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
             }],
            'keepvideo':False,
            'outtmpl': '/home/pi/Desktop/raspberry/VoiceToText/music/' + filename,
        }

        with youtube_dl.YoutubeDL(options) as ydl:
            ydl.download([video_info['webpage_url']])

        print("Download complete... {}".format(filename))

        return filename

youtubeService = YoutubeService()
api = SongApiService()
url = sys.argv[1]
songId = sys.argv[2]
title = youtubeService.downloadSong(url)
api.updateSong(title, songId)