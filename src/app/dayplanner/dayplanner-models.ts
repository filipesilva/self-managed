
// TODO: maybe separate scheduled and unscheduled items.
export interface DayplannerItem {
  startTime?: Date;
  endTime?: Date;
  content: string;
}

export interface DayplannerDay {
  date: Date;
  items: DayplannerItem[];
}
