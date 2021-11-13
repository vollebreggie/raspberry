import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { PlayerCommand } from "../models/DTOs/PlayerCommand";
import { PlayerCommandoType } from "../models/enums/PlayerCommandoType";

@Injectable({ providedIn: 'root' })
export class MusicPlayerService {
    public commandoSubject = new Subject<PlayerCommand>();

    sendCommando(commando: string) {
        let commandoType: PlayerCommandoType;
        switch (commando) {
            case "play":
                commandoType = PlayerCommandoType.Play;
                break;
            case "pause":
                commandoType = PlayerCommandoType.Pause;
                break;
            case "stop":
                commandoType = PlayerCommandoType.Stop;
                break;
            case "previous":
                commandoType = PlayerCommandoType.Previous;
                break;
            case "next":
                commandoType = PlayerCommandoType.Next;
                break;
            default:
                return;
        }

        let playerCommand = new PlayerCommand({playListId: 0, type: commandoType});
        
        return this.commandoSubject.next(playerCommand);
    }


}