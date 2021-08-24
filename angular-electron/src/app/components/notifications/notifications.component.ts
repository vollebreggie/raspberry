import { Component, OnInit } from '@angular/core';
import { Keys } from '../../keys/keys';
import { MessageService } from '../../services/MessageService';
import { cardAnimation } from '../../animations/card-animation';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private messageService: MessageService) {
    
  }

  ngOnInit(): void {
  }

}
