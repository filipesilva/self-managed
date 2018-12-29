import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';

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

  getUser() {
    return this._afAuth.user.pipe(first()).toPromise();
  }

  login() {
    return this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this._afAuth.auth.signOut();
  }
}
