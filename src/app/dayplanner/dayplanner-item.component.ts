import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-dayplanner-item',
  template: `
  <mat-list-item>
    <span *ngIf="time">{{time | date:"hh:mm"}} -&nbsp;</span>
    {{content}}
  </mat-list-item>
  `,
})
export class DayplannerItemComponent implements DayplannerItem {
  @Input() time?: Date;
  @Input() content: string;
}
