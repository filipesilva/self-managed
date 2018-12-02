import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayplannerCardComponent } from './card/dayplanner-card.component';

const routes: Routes = [
  // TODO: there's probably a better way to declare with and without parameter routes.
  { path: '', component: DayplannerCardComponent },
  { path: ':id', component: DayplannerCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayplannerRoutingModule { }
