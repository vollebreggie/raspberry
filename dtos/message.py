import json

class Message:
    def __init__(self, type: str, message: str) -> None:
        self.type = type
        self.message = message
        
    def toJson(self):
            return json.dumps(self, default=lambda o: o.__dict__)