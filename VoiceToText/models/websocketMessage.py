from datetime import date
import json

class Message:
    def init(self, type, message):
        self.type = type
        self.message = message
        self.date = date.today()
    def to_json(self):    
        return json.dumps(self.__dict__)