import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';

import { CandidateUpdatesComponent } from '@pages/candidate-detail/candidate-updates/candidate-updates.component';
import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import AppRoutingModule from '@src/app/app-routing.module';

import { CandidateCommunicationsComponent } from './candidate-communications/candidate-communications.component';
import { CandidateDetailComponent } from './candidate-detail.component';
import { CandidateMainInfoComponent } from './candidate-main-info/candidate-main-info.component';
import { CandidateActionComponent } from './candidate-action/candidate-action.component';
import { CandidateHistoryComponent } from './candidate-history/candidate-history.component';

@NgModule({
  declarations: [
    CandidateDetailComponent,
    CandidateCommunicationsComponent,
    CandidateUpdatesComponent,
    CandidateMainInfoComponent,
    CandidateActionComponent,
    CandidateHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatButtonModule,

    AppPipesModule,
  ],
  exports: [
    CandidateCommunicationsComponent,
    CandidateDetailComponent,
    CandidateUpdatesComponent,
    CandidateMainInfoComponent,
    CandidateActionComponent,
    CandidateHistoryComponent,
  ],
})
export class CandidateDetailModule {}
