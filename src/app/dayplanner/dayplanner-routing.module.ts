import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayplannerCardComponent } from './dayplanner-card.component';

const routes: Routes = [
  { path: '', component: DayplannerCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayplannerRoutingModule { }
