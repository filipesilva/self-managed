import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { DayplannerRoutingModule } from './dayplanner-routing.module';
import { DayplannerCardComponent } from './card/dayplanner-card.component';
import { DayplannerItemComponent } from './item/dayplanner-item.component';
import { TimeNumberPipe } from './time-number/time-number.pipe';
import { DayplannerItemEditComponent } from './item-edit/dayplanner-item-edit.component';

@NgModule({
  imports: [
    CommonModule,
    DayplannerRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
  ],
  declarations: [
    DayplannerCardComponent,
    DayplannerItemComponent,
    TimeNumberPipe,
    DayplannerItemEditComponent,
  ]
})
export class DayplannerModule { }
