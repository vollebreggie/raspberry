import { Component, Input, OnInit } from '@angular/core';
import { ScheduledPeriod } from '../../models/ScheduledPeriod';

@Component({
  selector: 'schedule-period',
  templateUrl: './schedule-period.component.html',
  styleUrls: ['./schedule-period.component.scss']
})
export class SchedulePeriodComponent implements OnInit {

  @Input() schedulePeriod: ScheduledPeriod;

  constructor() { }

  ngOnInit(): void {
  }

}
