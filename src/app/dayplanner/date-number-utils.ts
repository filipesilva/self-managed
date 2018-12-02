// Utilities to transform dates to the codified date and time string used in Dayplanner.
// A DateString is YYYYMMDD (e.g. 20190101), and a TimeString is HHmm (e.g. 2330).

// TODO: add validation.
export type DateString = string; // e.g. '20190101'
export type DateNumber = number; // e.g. 20190101
export type TimeString = string; // e.g. '2330'
export type TimeNumber = number; // e.g. 2330

export function dateToTimeNumber(date: Date): TimeNumber {
  return date.getUTCHours() * 100 + date.getUTCMinutes();
}

export function dateStringToDate(dateStr: DateString): Date {
  const year = parseInt(dateStr.substr(0, 4), 10);
  const month = parseInt(dateStr.substr(4, 2), 10);
  const day = parseInt(dateStr.substr(6, 2), 10);

  return new Date(year, month - 1, day);
}

export function getTodayDateString(): DateString {
  const today = new Date().toLocaleDateString('en-GB');

  return `${today.substr(6, 4)}${today.substr(3, 2)}${today.substr(0, 2)}`;
}

export function timeNumberToTimeString(timeNbr: TimeNumber): TimeString {
  const rawTimeStr = (10000 + timeNbr).toString();
  const valOrZero = (idx: number) => rawTimeStr[idx] || '0';
  const timeStr = `${valOrZero(1)}${valOrZero(2)}:${valOrZero(3)}${valOrZero(4)}`;

  return timeStr;
}
