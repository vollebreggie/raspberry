import sys
sys.path.insert(0, 'C:\\projects\\raspberry')

from speechRecognitionEngine import SpeechRecognitionEngine

def main():
    engine = SpeechRecognitionEngine()
    engine.startEngine()

if __name__ == "__main__":
    main() 