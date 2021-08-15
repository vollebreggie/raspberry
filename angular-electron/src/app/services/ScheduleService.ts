import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { ScheduledDay } from '../models/ScheduledDay';
import { RestService } from './RestService';

@Injectable({ providedIn: 'root' })
export class ScheduleService extends RestService<any> {
    constructor(http: HttpClient) { super('schedule/', http); }

    public getDay(year: number, month: number, day: number): Observable<ApiResponse<ScheduledDay>> {
        return this.makeRequest("GET", `GetDay/${year}/${month}/${day}`);
    }

}