import { Component, OnInit, HostListener, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { RawDayplannerItem, DayplannerItem } from '../dayplanner-item';
import { DayplannerItemComponent } from '../item/dayplanner-item.component';
import { Keybind } from '../keybind.decorator';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css'],
})
export class DayplannerCardComponent implements OnInit {
  dayTimestamp: number;
  // TODO: make a single ticker for the whole app.
  ticker = timer(0, 5 * 60 * 1000).pipe(map(() => Date.now()));
  items$: Observable<DayplannerItem[]>;
  itemsSnapshot: DayplannerItem[];
  collection: AngularFirestoreCollection<RawDayplannerItem>;
  @ViewChild('emptyItem') emptyItem: DayplannerItemComponent;
  @ViewChildren(DayplannerItemComponent) itemComponents: QueryList<DayplannerItemComponent>;
  selectedItemId: string | null = null;

  constructor(private _userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dayTimestamp = this.dateStringToTimestamp(this.route.snapshot.paramMap.get('id'));
    this.collection = this._userService.getDayplannerItemsCollectionForDay(this.dayTimestamp);

    this.items$ = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => new DayplannerItem(a, this.collection))),
      map(items => this.addNextTimestamp(items)),
      tap(items => this.itemsSnapshot = items),
    );
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
  @Keybind()
  deselectItem() {
    this.selectedItemId = null;
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

  private selectItemDelta(delta: number) {
    // We don't want to cycle through the empty item.
    // const items = this.itemComponents.toArray().filter(i => i !== this.emptyItem);

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

  private addNextTimestamp(items: DayplannerItem[]): DayplannerItem[] {
    return items.map((item, idx) => {
      if (!item.unscheduled && idx !== items.length - 1) {
        item.setNextTimestamp(items[idx + 1].timestamp);
      }

      return item;
    });
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
