import { ScheduledTask } from "./ScheduledTask";

export class ScheduledPeriod {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    scheduledDayId: number;
    title: number;
    image: string;
    periodType: number;
    periodConfig: number;
    activitySettingId: number;
    scheduledTasks: ScheduledTask[];
}