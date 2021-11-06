class Client:
    def __init__(self, name: str, clientId: int) -> None:
        self.name = name
        self.clientId = clientId

    def __eq__(self, other):
        return self.clientId == other.clientId