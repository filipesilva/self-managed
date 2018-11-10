import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

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
        { time: mockTime(8, 30), content: 'Review PRs' },
        { time: mockTime(9), content: 'Investigate perf regression' },
        { time: mockTime(12, 30), content: 'Lunch and walk' },
        { time: mockTime(14), content: 'Look into AOT bug' },
        { time: mockTime(18), content: 'Gym' },
        { time: mockTime(20, 30), content: 'Dinner and time with Nora' },
        { time: mockTime(22, 30), content: 'Bed' },
      ]
    };
  }
}
