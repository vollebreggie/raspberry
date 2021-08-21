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
  styleUrls: ['./schedule.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class ScheduleComponent implements OnInit {
  animate: string = "open";
  periods: ScheduledPeriod[] = [];

  constructor(scheduleService: ScheduleService, private messageService: MessageService) {
    var today = new Date();
    scheduleService.getDay(today.getFullYear(), today.getMonth() + 1, today.getDate()).subscribe(r => {
      this.periods = r.response.scheduledPeriods;
    });

    this.messageService.raspberryMessages.subscribe(r => {
      if (r.message == Keys.scheduleOpen) {
        this.animate = "open";
      } else if (r.message == Keys.scheduleClose) {
        this.animate = "close";
      }
    });
  }

  ngOnInit(): void {}

  getDateOfToday(): string {
    var today = new Date();
    return formatDate(today, "dd MMM yyyy", "en-US");
  }
}
