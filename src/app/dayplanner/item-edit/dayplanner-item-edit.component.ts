import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DayplannerItem, RawDayplannerItem } from '../dayplanner-models';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { parseItemString, itemToItemString } from '../date-number-utils';

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
            #itemInput
            matInput
            type="text"
            id="itemString"
            name="itemString"
            placeholder="New item"
            [(ngModel)]="itemString"
            (blur)="exit.emit()"
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
export class DayplannerItemEditComponent implements OnInit {
  @Input() item?: DayplannerItem;
  @Input() collection: AngularFirestoreCollection<RawDayplannerItem>;
  @Output() exit: EventEmitter<void> = new EventEmitter();
  @ViewChild('itemInput') itemInputField: ElementRef;
  itemString: string;

  constructor() { }

  ngOnInit() {
    if (this.item) {
      this.itemString = itemToItemString(this.item);
    }
    this.itemInputField.nativeElement.focus();
  }

  onSubmit() {
    const rawItem = parseItemString(this.itemString);
    if (this.item) {
      this.collection.doc(this.item.id).update(rawItem);
    } else {
      this.collection.add(rawItem);
    }
    this.exit.emit();
  }
}
