import { Component, OnInit } from '@angular/core';
import { ScheduledPeriod } from '../../models/ScheduledPeriod';
import { ScheduleService } from '../../services/ScheduleService';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  periods: ScheduledPeriod[] = [];

  constructor(scheduleService: ScheduleService) {
    var today = new Date();
    scheduleService.getDay(today.getFullYear(), today.getMonth() + 1, today.getDate()).subscribe(r => {
      this.periods = r.response.scheduledPeriods;
    });
  }

  ngOnInit(): void {
  }

}
