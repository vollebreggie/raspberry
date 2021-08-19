import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/MessageService';
import { ScheduleService } from '../../services/ScheduleService';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private messageService: MessageService) { 
    this.messageService.connectMonitor();
    this.messageService.connectServer();
  }

  ngOnInit(): void {
  }

}
