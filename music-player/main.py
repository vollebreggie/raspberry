import sys

sys.path.insert(0, '/home/pi/Desktop/raspberry')

from music_player import MusicPlayer

def main():
    print("musicplayer started.")
    musicPlayer = MusicPlayer()

if __name__ == "__main__":
    main() 