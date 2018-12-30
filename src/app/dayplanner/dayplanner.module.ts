import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {
  MatTooltipModule,
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_DEFAULT_OPTIONS
} from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { DayplannerRoutingModule } from './dayplanner-routing.module';
import { DayplannerCardComponent } from './card/dayplanner-card.component';
import { DayplannerItemComponent } from './item/dayplanner-item.component';
import { DayplannerItemEditComponent } from './item-edit/dayplanner-item-edit.component';
import { DayplannerHelpComponent } from './help/dayplanner-help.component';


/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 500,
  touchendHideDelay: 500,
};

@NgModule({
  imports: [
    CommonModule,
    DayplannerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  declarations: [
    DayplannerCardComponent,
    DayplannerItemComponent,
    DayplannerItemEditComponent,
    DayplannerHelpComponent,
  ],
  entryComponents: [
    DayplannerHelpComponent
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
})
export class DayplannerModule { }
