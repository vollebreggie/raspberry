import os
import threading

class LGService():
    def off(self):
        systemThread = threading.Thread(target=self._off)
        systemThread.start()

    def _off(self):
        os.system("lgtv MyTv off")

    def on(self):
        systemThread = threading.Thread(target=self._on)
        systemThread.start()

    def _on(self):
        os.system("lgtv MyTv on")

    def openYoutube(self, url):
        os.system("lgtv MyTv openYoutubeURL " + url)

    def openBrower(self, url):
        os.system("openBrowserAt " + url)

    def scan(self):
        os.system("lgtv scan")