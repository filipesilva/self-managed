import { TimeNumber } from './date-number-utils';

// TODO: consider separating scheduled and unscheduled items, instead of unscheduled items being
// implicit by a null start date.
export interface RawDayplannerItem {
  startTime: TimeNumber | null; // See TimeNumberPipe for the conversion logic.
  content: string;
}

export type DayplannerItem = RawDayplannerItem & {
  endTime: TimeNumber | null;
};
