import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import AppRoutingModule from '@src/app/app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';
import { ActionsBarMergeComponent } from './actions-bar-merge/actions-bar-merge.component';

@NgModule({
  declarations: [ActionsBarComponent, NavbarComponent, ActionsBarMergeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  exports: [ActionsBarComponent, NavbarComponent],
})
export class SystemModule {}
