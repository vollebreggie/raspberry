import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/Message';
import { WeekDTO } from '../../models/WeekDTO';
import { MessageService } from '../../services/MessageService';
import { ScheduleService } from '../../services/ScheduleService';

@Component({
  selector: 'week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  messages: Message[] = [];
  week: WeekDTO[] = [];
  day: Date = new Date();

  constructor(private scheduleService: ScheduleService, private messageService: MessageService) { 
    this.messageService.raspberryMessages.asObservable().subscribe(m => {
      this.messages.push(m);
    });

    this.scheduleService.getWeek().subscribe(r => {
      this.week = r.response;
    });
  }

  ngOnInit(): void {
  }

  getProperOpacity(day: number) : number{
    return this.day.getDate() == day ? 1 : 0.6;
  }


}
