from pygame import mixer
import speech_recognition as sr
from gtts import gTTS
from io import BytesIO
from pydub import AudioSegment
from pydub.playback import play

# Adapted from:
# https://github.com/pndurette/gTTS/issues/26#issuecomment-607573170
def speak(text):
    with BytesIO() as f:
        tts = gTTS(text=text, lang="es-ES")
        tts.write_to_fp(f)  # Write speech to f
        f.seek(0)  # seek to zero after writing
        song = AudioSegment.from_file(f, format="mp3")
        play(song)


def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        said = ""

        try:
            said = r.recognize_google(audio, language="es-ES")
            print(said)
        except Exception as e:
            print("Exception: " + str(e))

    return said


get_audio()
speak("Di algo")