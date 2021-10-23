import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { PlayListDTO } from "../models/DTOs/PlayListDTO";
import { Recipe } from "../models/Recipe";
import { ScheduledDay } from "../models/ScheduledDay";
import { Song } from "../models/Song";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class SongService extends RestService<any> {
    constructor(http: HttpClient) { super('Songs/', http); }

    public getSongs(playListId: number): Observable<ApiResponse<Song[]>> {
        return this.makeRequest<Song[]>("GET", `getsongs/${playListId}`);
    }

    public getPlayList(): Observable<ApiResponse<PlayListDTO[]>> {
        return this.makeRequest<PlayListDTO[]>("GET", `GetPlayList`);
    }

}