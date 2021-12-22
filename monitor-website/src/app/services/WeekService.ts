import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Keys } from "../keys/keys";
import { PlayerCommand } from "../models/DTOs/PlayerCommand";
import { SongService } from "./SongService";

@Injectable({ providedIn: 'root' })
export class WeekService {
    public weekSubject = new Subject<number>();

    constructor() {

    }

}