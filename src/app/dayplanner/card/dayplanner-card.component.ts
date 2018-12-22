import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
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
  collection: AngularFirestoreCollection<RawDayplannerItem>;
  showNewItemForm = false;

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

    this.items = this.collection.snapshotChanges().pipe(
      map(actions => this.mapToItems(actions)),
    );
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
