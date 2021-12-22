import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { Project } from "../models/Project";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class ProjectService extends RestService<any> {
    constructor(http: HttpClient) { super('projects/', http); }

    public getProjects(): Observable<ApiResponse<Project[]>> {
        return this.makeRequest("GET", `GetProjects`);
    }

    public getProject(id: number): Observable<ApiResponse<Project>> {
        return this.makeRequest("GET", `GetProject/${id}`);
    }

    public getProjectByName(name: string): Observable<ApiResponse<Project>> {
        return this.makeRequest("GET", `GetProjectByName/${name}`);
    }

    public createProject(): Observable<ApiResponse<Project>> {
        return this.makeRequest("POST", `CreateProject`);
    }

    public updateProject(project: Project): Observable<ApiResponse<Project>> {
        return this.makeRequest("POST", `UpdateProject`, project);
    }

    public deleteProject(projectId: number): Observable<ApiResponse<Project>> {
        return this.makeRequest("GET", `DeleteProject/${projectId}`);
    }
}