import { Component, OnInit } from '@angular/core';
import { Keys } from '../../keys/keys';
import { Message } from '../../models/Message';
import { MessageService } from '../../services/MessageService';
import { cardAnimation } from '../../animations/card-animation';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class ConsoleComponent implements OnInit {
  animate: string = "open";
  messages: Message[] = [];

  constructor(messageService: MessageService) {
    messageService.raspberryMessages.subscribe(r => {
      if (r.message == Keys.consoleOpen) {
        this.animate = "open";
      } else if (r.message == Keys.consoleClose) {
        this.animate = "close";
      }

      if(this.messages.length > 10) {
        this.messages.pop()
      }

      this.messages.unshift(r);
    });
  }

  ngOnInit(): void {
  }

  getDate(date){
    let test = new Date(date);
    return test;
  }
}
