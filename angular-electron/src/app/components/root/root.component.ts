import { Component, OnInit } from '@angular/core';
import { cardAnimation } from '../../animations/card-animation';
import { Keys } from '../../keys/keys';
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
export class RootComponent implements OnInit {
  consoleAnimate: string = "open";
  notificationAnimate: string = "open";
  recipeDetailsAnimate: string = "open";
  scheduleAnimate: string = "open";

  constructor(private messageService: MessageService) {
    this.messageService.connectMonitor();
    // this.messageService.connectServer();

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
    });
  }

  ngOnInit(): void {
  }

}
