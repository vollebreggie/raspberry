import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Keys } from "../keys/keys";
import { PlayerCommand } from "../models/DTOs/PlayerCommand";

@Injectable({ providedIn: 'root' })
export class MusicPlayerService {
    public commandoSubject = new Subject<PlayerCommand>();

    sendCommando(commando: string, playListId?: number) {
        let playerCommand = new PlayerCommand({ playListId: playListId, type: commando });

        return this.commandoSubject.next(playerCommand);
    }


}