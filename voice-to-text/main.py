import sys

sys.path.insert(0, '/home/pi/Desktop/raspberry')

from engine import Engine


def main():
    engine = Engine()
    engine.startEngine()

if __name__ == "__main__":
    main() 