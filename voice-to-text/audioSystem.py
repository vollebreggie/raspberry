import os

class AudioSystem:
    def switchToJack():
        os.system("sudo amixer cset numid=3 1")

    def switchToHdmi():
        os.system("sudo amixer cset numid=3 2")