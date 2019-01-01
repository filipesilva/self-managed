import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { DayplannerItem, DayplannerItemComponentState, RawDayplannerItem } from '../dayplanner-item';
import { DayplannerItemEditComponent } from '../item-edit/dayplanner-item-edit.component';


@Component({
  selector: 'sm-dayplanner-item',
  templateUrl: 'dayplanner-item.component.html',
  styleUrls: ['dayplanner-item.component.css']
})
export class DayplannerItemComponent implements OnInit {
  @Input() item?: DayplannerItem;
  @Input() nextItem?: DayplannerItem;
  @Input() ticker?: Observable<number>;
  @Input() selected = false;
  @Input() forceEdit = false;
  @Input() dayTimestamp: number;
  @Input() collection?: AngularFirestoreCollection<RawDayplannerItem>;
  @ViewChild(DayplannerItemEditComponent) editItem: DayplannerItemEditComponent;
  state: Observable<DayplannerItemComponentState> = of(DayplannerItemComponentState.Upcoming);
  editMode = false;

  constructor(public element: ElementRef) { }

  ngOnInit() {
    if (this.ticker) {
      this.state = this.ticker.pipe(map(time => this.getStateForTimestamp(time)));
    }
  }

  delete() {
    if (this.item) {
      this.item.delete();
    }
  }

  closeEdit(submitted: boolean) {
    if (submitted || !this.forceEdit) {
      this.editMode = false;
    }
  }

  showEditForm() {
    this.editMode = true;
    this.editItem.focus();
  }

  private getStateForTimestamp(timestamp: number): DayplannerItemComponentState {
    const curr = this.item;
    const next = this.nextItem;

    if (!curr) {
      return DayplannerItemComponentState.Upcoming;
    }

    if (curr.unscheduled) {
      return DayplannerItemComponentState.Unscheduled;
    }

    // The timestamp is in future day, so this item is in the past.
    if (timestamp > this.dayTimestamp + 24 * 60 * 60 * 1000) {
      return DayplannerItemComponentState.Past;
    }

    // The timestamp is before this item.
    if (timestamp < curr.timestamp) {
      return DayplannerItemComponentState.Upcoming;
    }

    // The timestamp is between this item and the next, so this item is the current one.
    if (next
      && timestamp >= curr.timestamp
      && next.timestamp !== null
      && timestamp < next.timestamp
    ) {
      return DayplannerItemComponentState.Current;
    }

    // Otherwise, the item is in the past.
    return DayplannerItemComponentState.Past;
  }
}
