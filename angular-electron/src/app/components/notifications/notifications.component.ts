import { Component, OnInit } from '@angular/core';
import { Keys } from '../../keys/keys';
import { MessageService } from '../../services/MessageService';
import { cardAnimation } from '../../animations/card-animation';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class NotificationsComponent implements OnInit {
  animate: string = "open";

  constructor(private messageService: MessageService) {
    this.messageService.raspberryMessages.subscribe(r => {
      if (r.message == Keys.notificationOpen) {
        this.animate = "open";
      } else if (r.message == Keys.notificationClose) {
        this.animate = "close";
      }
    });
  }

  ngOnInit(): void {
  }

}
