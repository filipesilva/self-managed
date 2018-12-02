import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayplannerCardComponent } from './card/dayplanner-card.component';

const routes: Routes = [
  { path: '', component: DayplannerCardComponent },
  { path: ':id', component: DayplannerCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayplannerRoutingModule { }
