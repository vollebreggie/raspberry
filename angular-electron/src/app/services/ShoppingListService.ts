import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "../models/ApiResponse";
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { ShoppingListDTO } from "../models/ShoppingListDTO";
import { RestService } from "./RestService";

@Injectable({ providedIn: 'root' })
export class ShoppingListService extends RestService<any> {
    constructor(http: HttpClient) { super('shoppinglist/', http); }
    public shoppinglistObserver: Subject<ShoppingListDTO> = new Subject<ShoppingListDTO>();

    public getShoppingList(): Observable<ApiResponse<ShoppingListDTO>> {
        return this.makeRequest<ShoppingListDTO>("GET", `GetShoppingList`).pipe(map(r => {
            this.shoppinglistObserver.next(r.response);
            return r;
        }));
    }

    public addIngredient(ingredient: Ingredient): Observable<ApiResponse<ShoppingListDTO>> {
        return this.makeRequest<ShoppingListDTO>("GET", `AddIngredient`, ingredient).pipe(map(r => {
            this.shoppinglistObserver.next(r.response);
            return r;
        }));
    }

    public addRecipe(recipe: Recipe): Observable<ApiResponse<ShoppingListDTO>> {
        return this.makeRequest<ShoppingListDTO>("GET", `AddRecipe`, recipe).pipe(map(r => {
            this.shoppinglistObserver.next(r.response);
            return r;
        }));
    }

    public addProduct(productId: number): Observable<ApiResponse<ShoppingListDTO>> {
        return this.makeRequest<ShoppingListDTO>("GET", `AddProduct/${productId}`).pipe(map(r => {
            this.shoppinglistObserver.next(r.response);
            return r;
        }));
    }

    public removeProduct(productId: number): Observable<ApiResponse<ShoppingListDTO>> {
        return this.makeRequest<ShoppingListDTO>("GET", `RemoveProduct/${productId}`).pipe(map(r => {
            this.shoppinglistObserver.next(r.response);
            return r;
        }));
    }
}