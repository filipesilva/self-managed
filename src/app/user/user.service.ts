import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _redirectUrl: string | null = null;

  constructor(private _afAuth: AngularFireAuth) { }

  pushRedirectUrl(val: string) {
    this._redirectUrl = val;
  }

  popRedirectUrl() {
    const currVal = this._redirectUrl;
    this._redirectUrl = null;
    return currVal;
  }

  get user() {
    return this._afAuth.user;
  }

  login() {
    return this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this._afAuth.auth.signOut();
  }
}
