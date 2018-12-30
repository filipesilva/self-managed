import { DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface RawDayplannerItem {
  timestamp: number; // Unix timestamp
  unscheduled?: boolean;
  content: string;
}

export enum DayplannerItemComponentState {
  Unscheduled = 'unscheduled',
  Past = 'past',
  Current = 'current',
  Upcoming = 'upcoming',
}

export class DayplannerItem {
  // Should match these:
  // 10:00 something
  // 10:00 - something
  // 10 - something
  // 10 something
  private static itemStringRegex =
    /^(?:(?<hours>\d\d)(?:\:(?<minutes>\d\d))? (?:- )?)?(?<content>.+)/s;
  private _id: string;
  private _raw: RawDayplannerItem;
  private _date: Date;

  static parseItemString(str: string, dayTimestamp: number): RawDayplannerItem {
    const match = str.match(DayplannerItem.itemStringRegex);
    let timestamp = dayTimestamp;
    let unscheduled = true;
    // TODO: validate hours and minutes, how to show the errors though?
    if (match.groups.hours) {
      unscheduled = false;
      const hours = parseInt(match.groups.hours, 10);
      timestamp += hours * 60 * 60 * 1000;
      if (match.groups.minutes) {
        const minutes = parseInt(match.groups.minutes, 10);
        timestamp += minutes * 60 * 1000;
      }
    }

    return {
      timestamp,
      unscheduled,
      content: match.groups.content
    };
  }

  constructor(
    action: DocumentChangeAction<RawDayplannerItem>,
    private collection: AngularFirestoreCollection,
  ) {
    this._raw = action.payload.doc.data();
    this._id = action.payload.doc.id;
    this._date = new Date(this._raw.timestamp);
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._raw.content;
  }

  get timestamp() {
    return this._raw.timestamp;
  }

  get unscheduled() {
    return !!this._raw.unscheduled;
  }

  delete() {
    this.collection.doc(this.id).delete();
  }

  update(rawItem: RawDayplannerItem) {
    this.collection.doc(this.id).update(rawItem);
  }

  toString() {
    const timeStr = this.unscheduled ? '' : `${this.getTimeStr()} - `;
    return `${timeStr}${this.content}`;
  }

  private getTimeStr() {
    const hours = this._date.getUTCHours().toString().padStart(2, '0');
    const minutes = this._date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}

