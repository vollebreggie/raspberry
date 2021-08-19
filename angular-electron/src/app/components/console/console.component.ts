import { Component, OnInit } from '@angular/core';
import { Keys } from '../../keys/keys';
import { Message } from '../../models/Message';
import { MessageService } from '../../services/MessageService';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  animate: string = "open";
  messages: Message[] = [];

  constructor(messageService: MessageService) {
    messageService.raspberryMessages.asObservable().subscribe(r => {
      if (r.message == Keys.consoleOpen) {
        this.animate = "open";
      } else if (r.message == Keys.consoleClose) {
        this.animate = "close";
      }
    });
  }

  ngOnInit(): void {
  }

}
