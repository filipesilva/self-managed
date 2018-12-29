import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class CurrentDayRedirectGuard implements CanActivate {
  constructor(private _router: Router) { }

  canActivate() {
    this._router.navigate(['/dayplanner', (new Date()).toISOString().slice(0, 10)]);
    return false;
  }
}
