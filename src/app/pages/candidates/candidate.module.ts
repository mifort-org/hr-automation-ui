import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import { ErrorDisplayComponent } from '@components/shared/error-display/error-display.component';
import { CandidatesComponent } from '@pages/candidates/candidates.component';
import { CandidateItemComponent } from '@pages/candidates/candidate-item/candidate-item.component';
import AppRoutingModule from '@src/app/app-routing.module';

@NgModule({
  declarations: [CandidateItemComponent, CandidatesComponent, ErrorDisplayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,

    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,

    AppPipesModule,
  ],
  exports: [CandidateItemComponent, CandidatesComponent],
})
export class CandidateModule {}
