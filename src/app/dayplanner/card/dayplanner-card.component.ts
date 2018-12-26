import { Component, OnInit, HostListener, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { RawDayplannerItem, DayplannerItem } from '../dayplanner-models';
import { dateToTimeNumber, getTodayDateString, dateStringToDate } from '../date-number-utils';
import { DayplannerItemComponent } from '../item/dayplanner-item.component';
import { Keybind } from '../keybind.decorator';


@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css'],
})
export class DayplannerCardComponent implements OnInit {
  day: Date;
  // TODO: should tick every 5m.
  ticker = of(new Date(2019, 0, 1, 13)).pipe(map(date => dateToTimeNumber(date)));
  items$: Observable<DayplannerItem[]>;
  collection: AngularFirestoreCollection<RawDayplannerItem>;
  @ViewChild('emptyItem') emptyItem: DayplannerItemComponent;
  @ViewChildren(DayplannerItemComponent) itemComponents: QueryList<DayplannerItemComponent>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    let dayplannerId = this.route.snapshot.paramMap.get('id') || getTodayDateString();
    // TODO: use current id instead of 20190101 when CRUD ops are enabled.
    dayplannerId = '20190101';
    // TODO: use current user id.
    const userId = 'uzf2T6cgSOMcm1xdtfSliusIq7O2';
    this.day = dateStringToDate(dayplannerId);

    this.collection = this.afs.collection<RawDayplannerItem>(
      `/users/${userId}/dayplannerDays/${dayplannerId}/items`,
      ref => ref.orderBy('startTime')
    );

    this.items$ = this.collection.snapshotChanges().pipe(
      map(actions => this.mapToItems(actions)),
    );
  }

  selectMouseTarget(target: EventTarget) {
    const item = this.findItemByEventTarget(target);
    if (item) { this.selectItem(item); }
  }

  deselectMouseTarget(target: EventTarget) {
    const item = this.findItemByEventTarget(target);
    if (item) { item.selected = false; }
  }

  @HostListener('document:keydown.enter', ['$event'])
  @Keybind()
  addNewItem() {
    let selected = this.getSelectedItem();
    if (!selected) { selected = this.emptyItem; }
    selected.showEditForm();
  }

  selectItem(item: DayplannerItemComponent) {
    this.deselectItems();
    item.selected = true;
  }

  @HostListener('document:keydown.escape', ['$event'])
  @Keybind()
  deselectItems() {
    this.itemComponents.filter(i => i.selected).forEach(i => i.selected = false);
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
    const selected = this.getSelectedItem();
    if (selected) { selected.delete(); }
  }

  private getSelectedItem() {
    return this.itemComponents.find(i => i.selected);
  }

  private findItemByEventTarget(eventTarget: EventTarget) {
    return this.itemComponents.find(i => i.element.nativeElement === eventTarget);
  }

  private selectItemDelta(delta: number) {
    // We don't want to cycle through the empty item.
    const items = this.itemComponents.toArray().filter(i => i !== this.emptyItem);

    if (items.length > 0) {
      const selected = items.find(i => i.selected);
      let newIdx: number;
      if (!selected) {
        // For +1 delta we want to select 0, for -1 delta we want to select len-1;
        newIdx = delta > 0 ? delta - 1 : items.length + delta;
      } else {
        const currIdx = items.indexOf(selected);
        newIdx = this.positiveModulo((currIdx + delta), items.length);
      }

      this.selectItem(items[newIdx]);
    }
  }

  private positiveModulo(i: number, n: number) {
    return (i % n + n) % n;
  }

  // Map a RawDayplannerItem action to include the id and expected end time.
  private mapToItems(actions: DocumentChangeAction<RawDayplannerItem>[]): DayplannerItem[] {
    return actions.map((action, idx) => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      let endTime = null;

      if (data.startTime !== null && idx !== actions.length - 1) {
        const nextItem = actions[idx + 1].payload.doc.data();
        endTime = nextItem.startTime;
      }

      return { id, endTime, ...data };
    });
  }
}
