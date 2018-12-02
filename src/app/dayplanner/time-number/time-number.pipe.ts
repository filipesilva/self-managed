import { Pipe, PipeTransform } from '@angular/core';

// Convert a number to a time string.
// e.g. 800 to 08:00, 2330 to 23:00.
@Pipe({
  name: 'timeNumber'
})
export class TimeNumberPipe implements PipeTransform {

  transform(time: number): string {
    const rawTimeStr = (10000 + time).toString();
    const valOrZero = (idx: number) => rawTimeStr[idx] || '0';
    const timeStr = `${valOrZero(1)}${valOrZero(2)}:${valOrZero(3)}${valOrZero(4)}`;

    return timeStr;
  }
}
