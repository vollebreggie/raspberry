import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Playlist } from "../models/Playlist";
import { ApiResponse } from "../models/ApiResponse";
import { CurrentSong } from "../models/DTOs/CurrentSong";
import { PlayListDTO } from "../models/DTOs/PlayListDTO";
import { Recipe } from "../models/Recipe";
import { ScheduledDay } from "../models/ScheduledDay";
import { Song } from "../models/Song";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class SongService extends RestService<any> {
    constructor(http: HttpClient) { super('Song/', http); }

    public getSongs(playListId: number): Observable<ApiResponse<Song[]>> {
        return this.makeRequest<Song[]>("GET", `getsongs/${playListId}`);
    }

    public getPlayList(): Observable<ApiResponse<PlayListDTO[]>> {
        return this.makeRequest<PlayListDTO[]>("GET", `GetPlayList`);
    }

    public getPlayListByName(name: string): Observable<ApiResponse<Playlist>> {
        return this.makeRequest<Playlist>("GET", `GetPlayListByName/${name}`);
    }

    public getCurrentSong(name: string): Observable<ApiResponse<Song>> {
        let currentSong = new CurrentSong();
        currentSong.name = name;

        return this.makeRequest<Song>("Post", `getCurrentSong`, currentSong);
    }

    public getNextSongsInPlayList(name: string): Observable<ApiResponse<Song[]>> {
        let currentSong = new CurrentSong();
        currentSong.name = name;

        return this.makeRequest<Song[]>("Post", `getNextSongsInPlayList`, currentSong);
    }

}