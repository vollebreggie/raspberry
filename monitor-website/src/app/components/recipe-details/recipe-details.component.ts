import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { MessageService } from '../../services/MessageService';
import { RecipeService } from '../../services/RecipeService';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private messageService: MessageService) {
    this.recipeService.getRecipeExample().subscribe(response => {
      this.recipe = response.response;
    })

  }

  ngOnInit(): void {
  }

}
