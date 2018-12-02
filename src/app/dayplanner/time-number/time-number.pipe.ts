import { Pipe, PipeTransform } from '@angular/core';
import { timeNumberToTimeString, TimeNumber } from '../date-number-utils';

// Convert a number to a time string.
// e.g. 800 to 08:00, 2330 to 23:00.
@Pipe({
  name: 'timeNumber'
})
export class TimeNumberPipe implements PipeTransform {

  transform(timeNbr: TimeNumber): string {
    return timeNumberToTimeString(timeNbr);
  }
}
