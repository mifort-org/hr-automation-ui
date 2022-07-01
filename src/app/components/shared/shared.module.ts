import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import AppRoutingModule from '@src/app/app-routing.module';

import { CandidateFormComponent } from '@components/shared/candidate-form/candidate-form.component';
import { EditCandidateModalComponent } from '@components/shared/edit-candidate-modal/edit-candidate-modal.component';
import { ErrorDisplayComponent } from '@components/shared/error-display/error-display.component';
import { NewCandidateModalComponent } from '@components/shared/new-candidate-modal/new-candidate-modal.component';
import { SignInModalComponent } from '@components/shared/sign-in-modal/sign-in-modal.component';

@NgModule({
  declarations: [
    SignInModalComponent,
    NewCandidateModalComponent,
    ErrorDisplayComponent,
    EditCandidateModalComponent,
    CandidateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
  ],
  exports: [
    SignInModalComponent,
    NewCandidateModalComponent,
    ErrorDisplayComponent,
    EditCandidateModalComponent,
    CandidateFormComponent,
  ],
})
export class SharedModule {}
