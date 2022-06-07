import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NavbarComponent } from '@components/systems/navbar/navbar.component';
import { SignInModalComponent } from '@components/shared/sign-in-modal/sign-in-modal.component';
import { CandidateDetailModule } from '@pages/candidate-detail/candidate-detail.module';

import { CandidateModule } from '@pages/candidates/candidate.module';
import { ActionsBarComponent } from '@components/systems/actions-bar/actions-bar.component';
import { NewCandidateModalComponent } from '@components/shared/new-candidate-modal/new-candidate-modal.component';
import { CandidateFormComponent } from '@components/shared/candidate-form/candidate-form.component';
import { EditCandidateModalComponent } from '@components/shared/edit-candidate-modal/edit-candidate-modal.component';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInModalComponent,
    ActionsBarComponent,
    NewCandidateModalComponent,
    CandidateFormComponent,
    EditCandidateModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    CandidateModule,
    CandidateDetailModule,

    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
