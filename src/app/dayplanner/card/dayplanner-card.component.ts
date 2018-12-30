import { Component, HostListener, ViewChild, ViewChildren, QueryList, OnDestroy, ElementRef } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, timer, Subject } from 'rxjs';
import { map, tap, first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { RawDayplannerItem, DayplannerItem } from '../dayplanner-item';
import { DayplannerItemComponent } from '../item/dayplanner-item.component';
import { Keybind } from '../keybind.decorator';
import { UserService } from '../../user/user.service';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css'],
})
export class DayplannerCardComponent implements OnDestroy {
  dayTimestamp: number;
  // TODO: make a single ticker for the whole app.
  ticker = timer(0, 5 * 60 * 1000).pipe(map(() => Date.now()));
  items$: Observable<DayplannerItem[]>;
  itemsSnapshot: DayplannerItem[];
  collection: AngularFirestoreCollection<RawDayplannerItem>;
  @ViewChild('emptyItem') emptyItem: DayplannerItemComponent;
  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('datepicker') datepicker: MatDatepicker<any>;
  @ViewChildren(DayplannerItemComponent) itemComponents: QueryList<DayplannerItemComponent>;
  selectedItemId: string | null = null;
  dateFormControl = new FormControl();
  private _onDestroy = new Subject();
  private _firstLoad = true;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this._route.params.subscribe(() => this.load());
  }

  load() {
    this.dayTimestamp = this.dateStringToTimestamp(this._route.snapshot.paramMap.get('id'));
    this.dateFormControl.setValue(new Date(this.dayTimestamp));
    // TODO: this is still a subscription leak when navigating away by other means.
    this.dateFormControl.valueChanges.pipe(
      takeUntil(this._onDestroy),
      first(v => !!v),
      tap(date => this._navigateToDay(date.toISOString().slice(0, 10))),
    ).subscribe();

    this.collection = this._userService.getDayplannerItemsCollectionForDay(this.dayTimestamp);
    this.items$ = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => new DayplannerItem(a, this.collection))),
      tap(items => this.itemsSnapshot = items),
      tap(items => {
        // Show the edit form whenever there are no items on the first load.
        if (this._firstLoad) {
          // Run it async to give the view a change to update.
          // TODO: find a better way to do this.
          setTimeout(() => {
            if (items.length === 0 && this.emptyItem) {
              this.emptyItem.showEditForm();
            }
          }, 0);
          this._firstLoad = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

  trackByItems(_index: number, item: DayplannerItem) {
    return item.trackBy();
  }

  delectIfSelected(item: DayplannerItem) {
    if (item.id === this.selectedItemId) { this.selectedItemId = null; }
  }

  @HostListener('document:keydown.enter', ['$event'])
  @Keybind()
  editOrNew() {
    let selected = this.itemComponents.find(i => i.selected);
    if (!selected) { selected = this.emptyItem; }
    selected.showEditForm();
  }

  selectItem(item: DayplannerItem) {
    if (item.id) { this.selectedItemId = item.id; }
  }

  @HostListener('document:keydown.escape', ['$event'])
  @Keybind({ preventInput: false })
  deselect() {
    this.selectedItemId = null;
    if ((document.activeElement as any).blur) {
      (document.activeElement as any).blur();
    }
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  @Keybind()
  selectNextItem() {
    this.selectItemDelta(+1);
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  @Keybind()
  selectPreviousItem() {
    this.selectItemDelta(-1);
  }

  @HostListener('document:keydown.delete', ['$event'])
  @Keybind()
  deleteSelectedItem() {
    const selected = this.itemsSnapshot.find(i => i.id === this.selectedItemId);
    if (selected) { selected.delete(); }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  @Keybind()
  previousDay() {
    const previousDayTimestamp = this.dayTimestamp - 24 * 60 * 60 * 1000;
    const previousDayStr = (new Date(previousDayTimestamp)).toISOString().slice(0, 10);
    this._navigateToDay(previousDayStr);
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  @Keybind()
  nextDay() {
    const nextDayTimestamp = this.dayTimestamp + 24 * 60 * 60 * 1000;
    const nextDayStr = (new Date(nextDayTimestamp)).toISOString().slice(0, 10);
    this._navigateToDay(nextDayStr);
  }

  @HostListener('document:keydown.d', ['$event'])
  @Keybind()
  clickDateInput() {
    this.dateInput.nativeElement.click();
  }

  @HostListener('document:keydown.p', ['$event'])
  @Keybind()
  openDatepicker() {
    this.datepicker.open();
  }

  private _navigateToDay(dayStr) {
    this._router.navigate(['/dayplanner', dayStr]);
  }

  private selectItemDelta(delta: number) {
    if (this.itemsSnapshot.length > 0) {
      const currIdx = this.itemsSnapshot.findIndex(i => i.id === this.selectedItemId);
      let newIdx: number;
      if (currIdx === -1) {
        // For +1 delta we want to select 0, for -1 delta we want to select len-1;
        newIdx = delta > 0 ? delta - 1 : this.itemsSnapshot.length + delta;
      } else {
        newIdx = this.positiveModulo((currIdx + delta), this.itemsSnapshot.length);
      }

      this.selectItem(this.itemsSnapshot[newIdx]);
    }
  }

  private positiveModulo(i: number, n: number) {
    return (i % n + n) % n;
  }

  private dateStringToTimestamp(dateStr: string): number {
    const dateFormat = /\d\d\d\d-\d\d-\d\d/;
    if (dateFormat.test(dateStr)) {
      try {
        return Date.parse(dateStr);
      } catch {
        // TODO: find a good way to display this to the user.
      }
    }

    return null;
  }
}
