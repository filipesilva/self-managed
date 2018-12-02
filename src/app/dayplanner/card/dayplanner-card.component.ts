import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { RawDayplannerItem, DayplannerItem } from '../dayplanner-models';
import { map } from 'rxjs/operators';


@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css']
})
export class DayplannerCardComponent {
  // Todo should come from the URL?
  day = new Date(2019, 0, 1);
  // TODO: should tick every 5m.
  ticker = of(new Date(2019, 0, 1, 13)).pipe(map(date => this.dateToTimeNumber(date)));

  private itemsCollection: AngularFirestoreCollection<RawDayplannerItem>;
  items: Observable<DayplannerItem[]>;

  constructor(private afs: AngularFirestore) {

    this.itemsCollection = afs.collection<RawDayplannerItem>(
      '/users/uzf2T6cgSOMcm1xdtfSliusIq7O2/dayplannerDays/20190101/items',
      ref => ref.orderBy('startTime')
    );
    this.items = this.itemsCollection.valueChanges().pipe(
      map(items => this.updateWithEndTimes(items))
    );
  }

  // Update a DayplannerItem to include the expected end time.
  private updateWithEndTimes(items: RawDayplannerItem[]): DayplannerItem[] {
    for (let index = 0; index < items.length; index++) {
      const item = items[index] as DayplannerItem;
      // Don't bother to check the last item, it will never have one after it.
      if (item.startTime == null || index === items.length - 1) {
        item.endTime = null;
      } else {
        const nextItem = items[index + 1];
        item.endTime = nextItem.startTime;
      }
    }

    return items as DayplannerItem[];
  }

  private dateToTimeNumber(date: Date): number {
    return date.getUTCHours() * 100 + date.getUTCMinutes();
  }
}
