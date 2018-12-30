import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';

import { DayplannerItem, RawDayplannerItem } from '../dayplanner-item';
import { Keybind } from '../keybind.decorator';


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
            [formControl]="itemFormControl"
            type="text"
            placeholder="I intend to..."
            (blur)="emitExit()"
          >
          <mat-error>You must enter something</mat-error>
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
  // This component should have either an item or a collection.
  // TODO: consider some other way of getting the collection, like the current user collections.
  @Input() item?: DayplannerItem;
  @Input() collection?: AngularFirestoreCollection<RawDayplannerItem> | null = null;
  @Input() dayTimestamp: number | null = null;
  @Output() exit: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('itemInput') itemInputField: ElementRef;
  itemFormControl = new FormControl();

  constructor() { }

  ngOnInit() {
    if (this.item) {
      this.itemFormControl.setValue(this.item.toString());
    }
  }

  onSubmit() {
    if (this.itemFormControl.value !== '') {
      const rawItem = DayplannerItem.parseItemString(this.itemFormControl.value, this.dayTimestamp);
      if (this.item) {
        this.item.update(rawItem);
      } else if (this.collection) {
        this.collection.add(rawItem);
      } else {
        // TODO: emit error?
      }
      this.emitExit();
    }
  }

  focus() {
    // setTimeout is needed because the edit form starts with `display:none`,
    // we can't focus an element that isn't displayed. So we do it async.
    // TODO: find a better way to do this.
    setTimeout(() => this.itemInputField.nativeElement.focus(), 0);
  }

  @HostListener('document:keydown.escape', ['$event'])
  @Keybind({ preventInput: false })
  emitExit(submitted = false) {
    this.itemFormControl.reset();
    this.exit.emit(submitted);
    setTimeout(() => this.itemInputField.nativeElement.blur(), 0);
  }
}
