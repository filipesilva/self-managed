import { Component, Input, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

import { DayplannerItem, DayplannerItemComponentState, RawDayplannerItem } from '../dayplanner-item';
import { Keybind } from '../keybind.decorator';


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
  @ViewChild('itemInput') itemInputField: ElementRef;
  state: Observable<DayplannerItemComponentState> = of(DayplannerItemComponentState.Upcoming);
  itemFormControl = new FormControl('');
  editMode = false;

  constructor(public element: ElementRef) { }

  ngOnInit() {
    this.reset();
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
    // setTimeout is needed because the edit form starts with `display:none`,
    // we can't focus an element that isn't displayed. So we do it async.
    // TODO: find a better way to do this. Maybe `ngZone.onStable`?
    setTimeout(() => this.itemInputField.nativeElement.focus(), 0);
  }

  exitEdit() {
    this.editMode = false;
    // Same as above.
    setTimeout(() => this.itemInputField.nativeElement.blur(), 0);
  }

  @HostListener('document:keydown.enter', ['$event'])
  @Keybind({ preventInput: false })
  submit() {
    if (this.itemFormControl.value !== this._getInitialValue()) {
      const rawItem = DayplannerItem.parseItemString(this.itemFormControl.value, this.dayTimestamp);
      if (this.item) {
        this.item.update(rawItem);
      } else if (this.collection) {
        this.collection.add(rawItem);
      } else {
        // TODO: emit error?
      }
      this.exitEdit();
    }
  }

  // Don't stop propagation to allow other escape handler to do their thing.
  @HostListener('document:keydown.escape', ['$event'])
  @Keybind({ preventInput: false })
  reset() {
    this.itemFormControl.reset(this._getInitialValue());
    this.exitEdit();
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

  private _getInitialValue() {
    return this.item ? this.item.toString() : '';
  }
}
