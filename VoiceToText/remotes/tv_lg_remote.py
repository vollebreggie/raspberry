import os

class LGTV():
    def off():
        os.system("lgtv MyTv off")

    def on():
        os.system("lgtv MyTv on")

    def openYoutube(url):
        os.system("lgtv MyTv openYoutubeURL " + url)

    def openBrower(url):
        os.system("openBrowserAt " + url)

    def scan():
        os.system("lgtv scan")
