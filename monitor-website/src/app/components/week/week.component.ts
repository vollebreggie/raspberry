import { Component, OnInit } from '@angular/core';
import { Keys } from '../../keys/keys';
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
  date: Date = new Date();

  constructor(private scheduleService: ScheduleService, private messageService: MessageService) { 
    this.messageService.raspberryMessages.asObservable().subscribe(r => {
      if (r.type == Keys.scheduleDay) {
        let split = r.message.split(" ");
        this.date = new Date(`${this.date.getFullYear()}-${this.getMonthDays(split[0].toLowerCase())}-${split[1]}`)
      }
    });

    this.scheduleService.getWeek().subscribe(r => {
      this.week = r.response;
    });
  }

  ngOnInit(): void {
  }

  getMonthDays(MonthYear) {
    var months = [
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'june',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december'
    ];

    var Value = MonthYear.split(" ");
    var month = (months.indexOf(Value[0]) + 1);
    return new Date(Value[1], month, 0).getDate();
  }

  getProperOpacity(day: number) : number{
    return this.date.getDate() == day ? 1 : 0.6;
  }


}
