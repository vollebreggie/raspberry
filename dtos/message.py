import json

class Message:
    def __init__(self, type: str, message: str, args: str) -> None:
        self.type = type
        self.message = message
        self.args = args
        
    def toJson(self):
            return json.dumps(self, default=lambda o: o.__dict__)