import { Component, OnInit } from '@angular/core';
import { Keys } from '../../keys/keys';
import { Message } from '../../models/Message';
import { MessageService } from '../../services/MessageService';
import { cardAnimation } from '../../animations/card-animation';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  messages: Message[] = [];

  constructor(messageService: MessageService) {
    messageService.raspberryMessages.subscribe(r => {
      

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
