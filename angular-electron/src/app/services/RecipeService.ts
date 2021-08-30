import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Recipe } from '../models/Recipe';
import { ScheduledDay } from '../models/ScheduledDay';
import { WeekDTO } from '../models/WeekDTO';
import { RestService } from './RestService';

@Injectable({ providedIn: 'root' })
export class RecipeService extends RestService<any> {
    constructor(http: HttpClient) { super('recipe/', http); }

    public getRecipeByName(name: string): Observable<ApiResponse<ScheduledDay>> {
        return this.makeRequest("GET", `GetExampleRecipe`);
    }

    public getRecipeExample(): Observable<ApiResponse<Recipe>> {
        return this.makeRequest("GET", `GetExampleRecipe`);
    }

    public getRecipesExample(): Observable<ApiResponse<Recipe[][]>> {
        return this.makeRequest("GET", `GetExamplesRecipe`);
    }
}