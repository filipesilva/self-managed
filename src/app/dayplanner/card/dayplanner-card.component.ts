import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { RawDayplannerItem, DayplannerItem } from '../dayplanner-models';
import { dateToTimeNumber, getTodayDateString, dateStringToDate } from '../date-number-utils';


@Component({
  selector: 'sm-dayplanner-card',
  templateUrl: './dayplanner-card.component.html',
  styleUrls: ['./dayplanner-card.component.css']
})
export class DayplannerCardComponent implements OnInit {
  day: Date;
  // TODO: should tick every 5m.
  ticker = of(new Date(2019, 0, 1, 13)).pipe(map(date => dateToTimeNumber(date)));
  items: Observable<DayplannerItem[]>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    let dayplannerId = this.route.snapshot.paramMap.get('id') || getTodayDateString();
    // TODO: use current id instead of 20190101 when CRUD ops are enabled.
    dayplannerId = '20190101';
    // TODO: use current user id.
    const userId = 'uzf2T6cgSOMcm1xdtfSliusIq7O2';
    this.day = dateStringToDate(dayplannerId);

    const itemsCollection = this.afs.collection<RawDayplannerItem>(
      `/users/${userId}/dayplannerDays/${dayplannerId}/items`,
      ref => ref.orderBy('startTime')
    );

    this.items = itemsCollection.valueChanges().pipe(
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
}
