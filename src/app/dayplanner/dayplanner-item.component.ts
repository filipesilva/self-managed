import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-dayplanner-item',
  template: `
  <mat-list-item>
    <span *ngIf="item.time">{{item.time | date:"hh:mm"}} -&nbsp;</span>
    {{item.content}}
  </mat-list-item>
  `,
})
export class DayplannerItemComponent {
  @Input() item: DayplannerItem;
}
