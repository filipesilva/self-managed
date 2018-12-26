import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DayplannerItem, RawDayplannerItem } from '../dayplanner-models';
import { AngularFirestoreCollection } from '@angular/fire/firestore';


enum DayplannerItemComponentState {
  Unscheduled = 'unscheduled',
  Past = 'past',
  Current = 'current',
  Upcoming = 'upcoming',
  // Selected = 'selected',
}

@Component({
  selector: 'sm-dayplanner-item',
  templateUrl: 'dayplanner-item.component.html',
  styleUrls: ['dayplanner-item.component.css']
})
export class DayplannerItemComponent implements OnInit {
  @Input() collection: AngularFirestoreCollection<RawDayplannerItem>;
  @Input() item?: DayplannerItem;
  @Input() ticker?: Observable<number>;
  @Input() state: Observable<DayplannerItemComponentState> =
    of(DayplannerItemComponentState.Upcoming);
  @Input() selected = false;
  editMode = false;

  constructor(public element: ElementRef) { }

  ngOnInit() {
    if (this.ticker) {
      this.state = this.ticker.pipe(map(time => this.getStateForDate(time)));
    }
  }

  delete() {
    if (this.item) {
      this.collection.doc(this.item.id).delete();
    }
  }

  @HostListener('click')
  showEditForm() { this.editMode = true; }

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
