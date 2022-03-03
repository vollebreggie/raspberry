export class MusicPlayerCommandoDTO {
    playListId: number;
    songId: number;
    commando: string;

    constructor(playListId: number, songId: number, commando: string) {
        this.playListId = playListId;
        this.songId = songId;
        this.commando = commando;
    }
}