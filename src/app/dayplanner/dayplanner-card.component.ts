import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DayplannerDay } from './dayplanner-models';

@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css']
})
export class DayplannerCardComponent {
  day: DayplannerDay;
  ticker: Observable<Date>;
  constructor() {
    const mockDate = new Date(2019, 0, 1);
    const mockTime = (hours, minutes = 0) => new Date(
      mockDate.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000,
    );
    // TODO: should tick every 5m.
    this.ticker = of(mockTime(13));
    this.day = {
      date: mockDate,
      items: [
        { content: 'Amazon Delivery' },
        { startTime: mockTime(8, 30), content: 'Review PRs' },
        { startTime: mockTime(9), content: 'Investigate perf regression' },
        { startTime: mockTime(12, 30), content: 'Lunch and walk' },
        { startTime: mockTime(14), content: 'Look into AOT bug' },
        { startTime: mockTime(18), content: 'Gym' },
        { startTime: mockTime(20, 30), content: 'Dinner and time with Nora' },
        { startTime: mockTime(22, 30), content: 'Bed' },
      ]
    };
    this.updateEndTimes();
  }

  // TODO: come up with a CRUD model and abstract it away. Check firebase.
  updateEndTimes() {
    // Don't bother to check the last item, it will never have one after it.
    for (let index = 0; index < this.day.items.length - 1; index++) {
      const item = this.day.items[index];
      const nextItem = this.day.items[index + 1];
      item.endTime = nextItem.startTime;
    }
  }
}
