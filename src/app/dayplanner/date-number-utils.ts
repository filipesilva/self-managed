// Utilities to transform dates to the codified date and time string used in Dayplanner.
// A DateString is YYYYMMDD (e.g. 20190101), and a TimeString is HHmm (e.g. 2330).


export function dateToTimeNumber(date: Date): number {
  return date.getUTCHours() * 100 + date.getUTCMinutes();
}

export function dateIdToDate(id: string) {
  // TODO: validate this date id somewhere.
  const year = parseInt(id.substr(0, 4), 10);
  const month = parseInt(id.substr(4, 2), 10);
  const day = parseInt(id.substr(6, 2), 10);

  return new Date(year, month - 1, day);
}

export function getTodayDateString() {
  const today = new Date().toLocaleDateString('en-GB');

  return `${today.substr(6, 4)}${today.substr(3, 2)}${today.substr(0, 2)}`;
}
