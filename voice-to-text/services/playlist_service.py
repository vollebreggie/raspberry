from sound_service import BluetoothService


class PlaylistService:
    def startPlayList(self, playlist):
        bluetoothService = BluetoothService()
        bluetoothService.start(1)
    
playListService = PlaylistService()
playListService.startPlayList(1)