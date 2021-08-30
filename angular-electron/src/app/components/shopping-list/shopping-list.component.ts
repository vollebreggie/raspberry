import { Component, OnInit } from '@angular/core';
import { ShoppingListDTO } from '../../models/ShoppingListDTO';
import { ShoppingListService } from '../../services/ShoppingListService';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shoppingList: ShoppingListDTO;

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.shoppinglistObserver.subscribe(list => {
      this.shoppingList = list;
    });
    
    this.shoppingListService.getShoppingList().subscribe();
   }

  ngOnInit(): void {
  }

}
