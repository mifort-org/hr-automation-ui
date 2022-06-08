import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from '@components/shared/shared.module';
import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import { CandidatesComponent } from '@pages/candidates/candidates.component';
import { CandidateItemComponent } from '@pages/candidates/candidate-item/candidate-item.component';
import AppRoutingModule from '@src/app/app-routing.module';

@NgModule({
  declarations: [CandidateItemComponent, CandidatesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,

    SharedModule,

    AppPipesModule,
  ],
  exports: [CandidateItemComponent, CandidatesComponent],
})
export class CandidateModule {}
