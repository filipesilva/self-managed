import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DayplannerItem } from './dayplanner-models';


enum DayplannerItemComponentState {
  Unscheduled = 'unscheduled',
  Past = 'past',
  Current = 'current',
  Upcoming = 'upcoming',
  // Selected = 'selected',
}

@Component({
  selector: 'sm-dayplanner-item',
  template: `
    <mat-list-item [ngClass]="this.state | async">
      <span *ngIf="item.startTime">{{item.startTime | timeNumber}} -&nbsp;</span>
      {{item.content}}
    </mat-list-item>
  `,
  styles: [`
    .unscheduled { opacity: 0.7; }
    .past { opacity: 0.5; }
    .current { border: thin solid green; border-radius: 5px;}
    .upcoming { }
  `]
})
export class DayplannerItemComponent implements OnInit {
  @Input() item: DayplannerItem;
  @Input() ticker?: Observable<number>;
  @Input() state: Observable<DayplannerItemComponentState> =
    of(DayplannerItemComponentState.Upcoming);

  ngOnInit() {
    if (this.ticker) {
      this.state = this.ticker.pipe(map(time => this.getStateForDate(time)));
    }
  }

  private getStateForDate(time: number): DayplannerItemComponentState {
    if (this.item.startTime === null) {
      return DayplannerItemComponentState.Unscheduled;
    }

    if (this.item.endTime !== null && time < this.item.endTime && time > this.item.startTime) {
      return DayplannerItemComponentState.Current;
    }

    if (time > this.item.startTime) {
      return DayplannerItemComponentState.Past;
    }

    return DayplannerItemComponentState.Upcoming;
  }
}
