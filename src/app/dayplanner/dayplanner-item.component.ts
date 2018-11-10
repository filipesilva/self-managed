import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


enum DayplannerItemComponentState {
  Past = 'past',
  Current = 'current',
  Upcoming = 'upcoming',
  // Selected = 'selected',
}

@Component({
  selector: 'sm-dayplanner-item',
  template: `
    <mat-list-item [ngClass]="this.state | async">
      <span *ngIf="item.time">{{item.time | date:"hh:mm"}} -&nbsp;</span>
      {{item.content}}
    </mat-list-item>
  `,
  styles: [`
    .past { opacity: 0.5; }
    .current { border: solid; }
    .upcoming { }
    .selected { border: solid green; }
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
    // TODO: current state, needs next item time
    if (this.item.time && date > this.item.time) {
      return DayplannerItemComponentState.Past;
    } else {
      return DayplannerItemComponentState.Upcoming;
    }
  }
}
