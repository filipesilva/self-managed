import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { DayplannerRoutingModule } from './dayplanner-routing.module';
import { DayplannerCardComponent } from './dayplanner-card.component';
import { DayplannerItemComponent } from './dayplanner-item.component';
import { TimeNumberPipe } from './time-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    DayplannerRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [
    DayplannerCardComponent,
    DayplannerItemComponent,
    TimeNumberPipe,
  ]
})
export class DayplannerModule { }
