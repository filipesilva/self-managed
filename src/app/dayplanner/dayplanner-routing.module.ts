import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DayplannerCardComponent } from './card/dayplanner-card.component';
import { CurrentDayRedirectGuard } from './current-day-redirect.guard';


const routes: Routes = [
  { path: '', canActivate: [CurrentDayRedirectGuard] },
  { path: ':id', component: DayplannerCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayplannerRoutingModule { }
