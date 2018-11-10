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
      items: [
        { content: 'Amazon Delivery' },
        { time: '8:30', content: 'Review PRs' },
        { time: '9:00', content: 'Investigate perf regression' },
        { time: '12:30', content: 'Lunch and walk' },
        { time: '14:00', content: 'Look into AOT bug' },
        { time: '18:00', content: 'Gym' },
        { time: '20:30', content: 'Dinner and time with Nora' },
        { time: '22:30', content: 'Bed' },
      ]
    };
  }
}
