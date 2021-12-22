import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { Project } from "../models/Project";
import { SpeachLog } from "../models/SpeachLog";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class SpeachLogService extends RestService<any> {
    constructor(http: HttpClient) { super('speachlog/', http); }

    public getSpeachLog(): Observable<ApiResponse<SpeachLog[]>> {
        return this.makeRequest("GET", `GetLogs`);
    }

    // public addSpeachLog(log: SpeachLog): Observable<ApiResponse<Project>> {
    //     return this.makeRequest("GET", `CreateSpeachLog`, log);
    // }

    public addSpeachLog(message: string): Observable<ApiResponse<SpeachLog>> {
        return this.makeRequest("POST", `CreateSpeachLog`, new SpeachLog(message, ""));
    }
}