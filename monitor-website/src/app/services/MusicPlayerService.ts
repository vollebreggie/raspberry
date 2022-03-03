import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Keys } from "../keys/keys";
import { ApiResponse } from "../models/ApiResponse";
import { MusicPlayerCommandoDTO } from "../models/DTOs/MusicPlayerCommandoDTO";
import { PlayerCommand } from "../models/DTOs/PlayerCommand";
import { Recipe } from "../models/Recipe";
import { RestService } from "./RestService";
import { SongService } from "./SongService";

@Injectable({ providedIn: 'root' })
export class MusicPlayerService extends RestService<any> {
    public commandoSubject = new Subject<PlayerCommand>();

    constructor(private songService: SongService, http: HttpClient) { super('MusicPlayer/', http); }

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

    public pingPhone(songId: number, playListId: number, commando: string): Observable<ApiResponse<MusicPlayerCommandoDTO>> {
        return this.makeRequest("POST", `PingPhone`, new MusicPlayerCommandoDTO(playListId, songId, commando));
    }


}