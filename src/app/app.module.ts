import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import { NavbarComponent } from './components/systems/navbar/navbar.component';
import { SignInModalComponent } from './components/shared/sign-in-modal/sign-in-modal.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { CandidateItemComponent } from './components/shared/candidate-item/candidate-item.component';
import { CandidatesFilterComponent } from './components/shared/candidates-filter/candidates-filter.component';
import { ErrorDisplayComponent } from './components/shared/error-display/error-display.component';
import { ActionsBarComponent } from './components/systems/actions-bar/actions-bar.component';
import { NewCandidateModalComponent } from './components/shared/new-candidate-modal/new-candidate-modal.component';
import { CandidateFormComponent } from './components/shared/candidate-form/candidate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInModalComponent,
    CandidatesComponent,
    CandidateItemComponent,
    CandidatesFilterComponent,
    ErrorDisplayComponent,
    ActionsBarComponent,
    NewCandidateModalComponent,
    CandidateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatChipsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
