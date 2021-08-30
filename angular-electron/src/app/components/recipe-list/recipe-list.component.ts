import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { RecipeService } from '../../services/RecipeService';
import { ShoppingListService } from '../../services/ShoppingListService';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipeBatch: Recipe[][] = [[]];

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) {
    this.recipeService.getRecipesExample().subscribe(r => {
      this.recipeBatch = r.response;

      // this.shoppingListService.addProduct(this.recipeBatch[0][0].id).subscribe();
    })
  }

  ngOnInit(): void {
  }

}
