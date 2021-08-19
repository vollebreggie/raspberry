import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs/operators';
import { cardAnimation } from '../../animations/card-animation';
import { Keys } from '../../keys/keys';
import { Recipe } from '../../models/Recipe';
import { MessageService } from '../../services/MessageService';
import { RecipeService } from '../../services/RecipeService';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class RecipeDetailsComponent implements OnInit {
  animate: string = "open";
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private messageService: MessageService) {
    this.recipeService.getRecipeExample().subscribe(response => {
      this.recipe = response.response;
    })

    this.messageService.raspberryMessages.subscribe(r => {
      if (r.message == Keys.recipeDetailsOpen) {
        this.animate = "open";
      } else if (r.message == Keys.recipeDetailsClose) {
        this.animate = "close";
      }
    });
  }

  ngOnInit(): void {
  }

}
