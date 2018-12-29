import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user/user.service';


@Component({
  template: `
    <mat-card class="login-card">
      <mat-card-title>
        <i>Login</i>
      </mat-card-title>

      <mat-card-content>
        <div *ngIf="userService.user | async as user; else showLogin">
          <p>Logged in as  {{ user.displayName }}.</p>
          <button mat-raised-button color="primary" (click)="logout()">
            Logout
          </button>
        </div>
        <ng-template #showLogin>
          <button mat-raised-button color="primary" (click)="login()">
            Login with Google
          </button>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .login-card {
      width: 400px;
    }
  `]
})
export class LoginComponent {
  constructor(public userService: UserService, private _router: Router, private _ngZone: NgZone) { }

  login() {
    // _ngZone.run is needed because this promise seems to run outside zones, perhaps because
    // of the Google login popup.
    this.userService.login().then(() => this._ngZone.run(() => {
      this._router.navigate([this.userService.popRedirectUrl() || '/dayplanner']);
    }));
  }
  logout() {
    this.userService.logout();
  }
}
