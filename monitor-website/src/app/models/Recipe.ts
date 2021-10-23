import { Ingredient } from "./Ingredient";
import { Product } from "./Product";
import { RecipeIngredient } from "./RecipeIngredient";

export class Recipe extends Product{
    instructions: string;
    recipeIngredients: RecipeIngredient[];
    numberOfPortions: number;
    imageInfo: string;
    cookingTips: string;
    cookingTime: string;
    difficultyLevel: string;
    dishType: string;
    course: string;
    group: string;
}