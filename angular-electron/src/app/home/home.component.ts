import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/MessageService';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private messageService: MessageService) {
    messageService.messages.asObservable().subscribe(message => {
      console.log(message);
    })
  }
  

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

}
