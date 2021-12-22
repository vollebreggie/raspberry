import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Keys } from "../keys/keys";
import { PlayerCommand } from "../models/DTOs/PlayerCommand";
import { SongService } from "./SongService";

@Injectable({ providedIn: 'root' })
export class MusicPlayerService {
    public commandoSubject = new Subject<PlayerCommand>();

    constructor(private songService: SongService) {

    }

    sendCommando(commando: string, playListText?: string) {
        if (playListText.length > 0) {
            this.songService.getPlayListByName(playListText).subscribe(p => {
                let playerCommand = new PlayerCommand({ playListId: p.response.id, type: commando });

                return this.commandoSubject.next(playerCommand);
            })
        }

        let playerCommand = new PlayerCommand({ playListId: 0, type: commando });

        return this.commandoSubject.next(playerCommand);
    }


}