import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { cardAnimation } from '../../animations/card-animation';
import { Keys } from '../../keys/keys';
import { Message } from '../../models/Message';
import { MessageService } from '../../services/MessageService';
import { ScheduleService } from '../../services/ScheduleService';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class RootComponent implements OnInit, AfterContentInit {
  consoleAnimate: string = "open";
  notificationAnimate: string = "close";
  recipeDetailsAnimate: string = "close";
  scheduleAnimate: string = "close";
  recipeListAnimate: string = "open";
  shoppingListAnime: string = "open";
  constructor(private messageService: MessageService) {
    this.messageService.connectMonitor();
    this.messageService.connectServer();

    this.messageService.raspberryMessages.subscribe(r => {
      if (r.message == Keys.consoleOpen) {
        this.consoleAnimate = "open";
      } else if (r.message == Keys.consoleClose) {
        this.consoleAnimate = "close";
      }

      if (r.message == Keys.notificationOpen) {
        this.notificationAnimate = "open";
      } else if (r.message == Keys.notificationClose) {
        this.notificationAnimate = "close";
      }

      if (r.message == Keys.recipeDetailsOpen) {
        this.recipeDetailsAnimate = "open";
      } else if (r.message == Keys.recipeDetailsClose) {
        this.recipeDetailsAnimate = "close";
      }

      if (r.message == Keys.scheduleOpen) {
        this.scheduleAnimate = "open";
      } else if (r.message == Keys.scheduleClose) {
        this.scheduleAnimate = "close";
      }

      if (r.message == Keys.recipeList) {
        this.consoleAnimate = "close";
        this.scheduleAnimate = "close";
        this.recipeDetailsAnimate = "close";
        this.recipeListAnimate = "open";
        this.shoppingListAnime = "open";
      }
    });

    this.messageService.serverMessages.subscribe(r => {
      console.log(r);
    });

  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.messageService.sendMessageFromRaspberry();
  }
}
