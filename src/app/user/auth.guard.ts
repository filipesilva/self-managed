import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return this._userService.getUser().then(user => {
      if (user != null) { return true; }

      // Store the attempted URL for redirecting.
      this._userService.pushRedirectUrl(url);

      // Navigate to the login page.
      this._router.navigate(['/login']);
      return false;
    });
  }
}
