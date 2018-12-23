import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DayplannerItem, RawDayplannerItem } from '../dayplanner-models';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { parseItemString } from '../date-number-utils';

@Component({
  selector: 'sm-dayplanner-item-edit',
  template: `
    <mat-list-item>
      <form class="dayplanner-form" (ngSubmit)="onSubmit()">
        <mat-form-field
          class="dayplanner-full-width"
          [floatLabel]="'never'"
        >
          <input
            matInput
            type="text"
            id="itemString"
            name="itemString"
            placeholder="New item"
            [(ngModel)]="itemString"
          >
        </mat-form-field>
      </form>
    </mat-list-item>
  `,
  styles: [`
    .dayplanner-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .dayplanner-full-width {
      width: 100%;
    }
  `]
})
export class DayplannerItemEditComponent {
  @Input() item?: DayplannerItem;
  @Input() collection: AngularFirestoreCollection<RawDayplannerItem>;
  @Output() submitted: EventEmitter<void> = new EventEmitter();
  itemString: string;

  constructor() { }

  onSubmit() {
    const rawItem = parseItemString(this.itemString);
    if (this.item) {
      this.collection.doc(this.item.id).update(rawItem);
    } else {
      this.collection.add(rawItem);
    }
    this.submitted.emit();
  }
}
