import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { PComponent } from "../models/Component";
import { Project } from "../models/Project";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class ComponentService extends RestService<any> {
    constructor(http: HttpClient) { super('components/', http); }

    public getComponent(componentId: number): Observable<ApiResponse<PComponent>> {
        return this.makeRequest("GET", `getComponent/${componentId}`);
    }

    public GetComponentsByProjectId(projectId: number): Observable<ApiResponse<PComponent[]>> {
        return this.makeRequest("GET", `GetComponentsByProjectId/${projectId}`);
    }

    public GetComponentByName(name: string, projectId: number): Observable<ApiResponse<PComponent>> {
        return this.makeRequest("GET", `GetComponentByName/${name}/${projectId}`);
    }

    public CreateComponent(projectId: number): Observable<ApiResponse<PComponent>> {
        return this.makeRequest("POST", `CreateComponent/${projectId}`);
    }

    public UpdateComponent(component: PComponent): Observable<ApiResponse<PComponent>> {
        return this.makeRequest("POST", `UpdateComponent`, component);
    }

    public DeleteComponent(componentId: number): Observable<ApiResponse<PComponent>> {
        return this.makeRequest("GET", `DeleteComponent/${componentId}`);
    }
}