import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
    this.emitExit();
  }

  @HostListener('document:keyup.escape', ['$event'])
  emitExit(event?: KeyboardEvent) {
    if (event) { event.stopPropagation(); }
    this.exit.emit();
  }

  // Need to capture enter on the input and stop it from propagating further, otherwise
  // it will trigger keybinds on the dayplanner.
  // Would be good to have a better abstraction for this.
  @HostListener('document:keyup.enter', ['$event'])
  captureEnter(event?: KeyboardEvent) {
    if (event) { event.stopPropagation(); }
  }
}
