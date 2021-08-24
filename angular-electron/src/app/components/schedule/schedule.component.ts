import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { cardAnimation } from '../../animations/card-animation';
import { Keys } from '../../keys/keys';
import { Message } from '../../models/Message';
import { ScheduledPeriod } from '../../models/ScheduledPeriod';
import { MessageService } from '../../services/MessageService';
import { ScheduleService } from '../../services/ScheduleService';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  periods: ScheduledPeriod[] = [];
  date: Date = new Date();


  constructor(scheduleService: ScheduleService, private messageService: MessageService) {
    scheduleService.getDay(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate()).subscribe(r => {
      this.periods = r.response.scheduledPeriods;
    });

    this.messageService.raspberryMessages.subscribe(r => {
      if (r.type == Keys.scheduleDay) {
        let split = r.message.split(" ");
        scheduleService.getDay(this.date.getFullYear(), this.getMonthDays(split[0].toLowerCase()), +split[1]).subscribe(r => {
          this.periods = r.response.scheduledPeriods;
        });
      }
    })
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

  ngOnInit(): void { }

  getDateOfToday(): string {
    var today = new Date();
    return formatDate(this.date, "dd MMM yyyy", "en-US");
  }
}
