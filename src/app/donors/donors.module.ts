import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationFormComponent } from './donation-form/donation-form.component';
import { ClFormsModule } from '../shared/cl-forms/cl-forms.module';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationCardComponent } from './donation-card/donation-card.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    DonationFormComponent,
    DonationListComponent,
    DonationCardComponent
  ],
  imports: [
    CommonModule,
    ClFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class DonorsModule { }
