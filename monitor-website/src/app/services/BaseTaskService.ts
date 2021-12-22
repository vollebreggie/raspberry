import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { BaseTask } from "../models/BaseTask";
import { PComponent } from "../models/Component";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class BaseTaskService extends RestService<any> {
    constructor(http: HttpClient) { super('tasks/', http); }

    public getTasksByComponentId(componentId: number): Observable<ApiResponse<BaseTask[]>> {
        return this.makeRequest("GET", `GetTasksByComponentId/${componentId}`);
    }

    public getBaseTask(baseTaskId: number): Observable<ApiResponse<BaseTask>> {
        return this.makeRequest("GET", `GetBaseTask/${baseTaskId}`);
    }

    public GetTaskByName(name: string, componentId: number): Observable<ApiResponse<BaseTask>> {
        return this.makeRequest("GET", `GetTaskByName/${name}/${componentId}`);
    }

    public CreateTask(componentId: number): Observable<ApiResponse<BaseTask>> {
        return this.makeRequest("GET", `CreateBaseTask/${componentId}`);
    }

    public UpdateTask(task: BaseTask): Observable<ApiResponse<BaseTask>> {
        return this.makeRequest("POST", `UpdateBaseTask`, task);
    }

    public DeleteTask(task: BaseTask): Observable<ApiResponse<BaseTask>> {
        return this.makeRequest("POST", `DeleteBaseTask`, task);
    }
}