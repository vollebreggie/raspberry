from datetime import datetime
import json

class Message:
    def __init__(self, type, message):
        self.type = type
        self.message = message
        self.date = datetime.now()