import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css']
})
export class DayplannerCardComponent {
  day: DayplannerDay;
  constructor() {
    this.day = {
      date: new Date(2019, 1, 1),
      items: [
        { content: 'Amazon Delivery' },
        { time: new Date(2019, 1, 1, 8, 30), content: 'Review PRs' },
        { time: new Date(2019, 1, 1, 9), content: 'Investigate perf regression' },
        { time: new Date(2019, 1, 1, 12, 30), content: 'Lunch and walk' },
        { time: new Date(2019, 1, 1, 14), content: 'Look into AOT bug' },
        { time: new Date(2019, 1, 1, 18), content: 'Gym' },
        { time: new Date(2019, 1, 1, 20, 30), content: 'Dinner and time with Nora' },
        { time: new Date(2019, 1, 1, 22, 30), content: 'Bed' },
      ]
    };
  }
}
