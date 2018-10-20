import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

import { DayplannerRoutingModule } from './dayplanner-routing.module';
import { DayplannerCardComponent } from './dayplanner-card.component';

@NgModule({
  imports: [
    CommonModule,
    DayplannerRoutingModule,
    MatButtonModule,
    MatCardModule,
  ],
  declarations: [DayplannerCardComponent]
})
export class DayplannerModule { }
