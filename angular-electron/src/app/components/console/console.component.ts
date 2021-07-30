import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/Message';
import { MessageService } from '../../services/MessageService';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  messages: Message[] = [];

  constructor(messageService: MessageService) { 
    messageService.messages.asObservable().subscribe(m => {
      this.messages.push(m);
    })
  }

  ngOnInit(): void {
  }

}
