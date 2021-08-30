import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

export class ShoppingListDTO {
    recipes: Recipe[];
    ingredients: Ingredient[];
}