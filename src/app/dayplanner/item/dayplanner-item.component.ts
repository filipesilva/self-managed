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
      this.state = this.ticker.pipe(map(time => this.item.getStateForTimestamp(time)));
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
}
