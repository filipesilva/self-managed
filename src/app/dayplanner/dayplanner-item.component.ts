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
      <span *ngIf="item.startTime">{{item.startTime | date:"HH:mm"}} -&nbsp;</span>
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
  @Input() ticker?: Observable<Date>;
  @Input() state: Observable<DayplannerItemComponentState> =
    of(DayplannerItemComponentState.Upcoming);

  ngOnInit() {
    if (this.ticker) {
      this.state = this.ticker.pipe(map(date => this.getStateForDate(date)));
    }
  }

  private getStateForDate(date: Date): DayplannerItemComponentState {
    if (!this.item.startTime) {
      return DayplannerItemComponentState.Unscheduled;
    }

    if (this.item.endTime && date < this.item.endTime && date > this.item.startTime) {
      return DayplannerItemComponentState.Current;
    }

    if (date > this.item.startTime) {
      return DayplannerItemComponentState.Past;
    }

    return DayplannerItemComponentState.Upcoming;
  }
}
