import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { RawDayplannerItem } from '../dayplanner/dayplanner-item';


@Injectable({ providedIn: 'root' })
export class UserService {
  private _redirectUrl: string | null = null;
  private _userIdSnapshot: string | null;

  constructor(private _afAuth: AngularFireAuth, private _afs: AngularFirestore) {
    _afAuth.user.subscribe(user => this._userIdSnapshot = user ? user.uid : null);
  }

  pushRedirectUrl(val: string) {
    this._redirectUrl = val;
  }

  popRedirectUrl() {
    const currVal = this._redirectUrl;
    this._redirectUrl = null;
    return currVal;
  }

  getUser$() {
    return this._afAuth.user;
  }

  getUser() {
    return this.getUser$().pipe(first()).toPromise();
  }

  getDayplannerItemsCollectionForDay(dayTimestamp: number) {
    const nextDayTimestamp = dayTimestamp + 24 * 60 * 60 * 1000;

    return this._afs.collection<RawDayplannerItem>(
      `/users/${this._userIdSnapshot}/dayplannerItems`,
      ref => ref.where('timestamp', '>=', dayTimestamp)
        .where('timestamp', '<', nextDayTimestamp)
        .orderBy('timestamp')
    );
  }

  login() {
    return this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this._afAuth.auth.signOut();
  }
}
