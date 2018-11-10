import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-dayplanner-item',
  template: `
  <mat-list-item>
    <span *ngIf="time">{{time}} -&nbsp;</span>
    {{content}}
  </mat-list-item>
  `,
})
export class DayplannerItemComponent implements DayplannerItem {
  @Input() time?: string;
  @Input() content: string;
}
