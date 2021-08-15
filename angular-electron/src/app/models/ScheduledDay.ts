import { ScheduledPeriod } from "./ScheduledPeriod";
import { ScheduledTask } from "./ScheduledTask";

export class ScheduledDay {
    date: Date;
    scheduledPeriods: ScheduledPeriod[];
}