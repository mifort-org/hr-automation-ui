import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CandidateUpdatesComponent } from '@pages/candidate-detail/candidate-updates/candidate-updates.component';
import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import AppRoutingModule from '@src/app/app-routing.module';
import { CandidateCommunicationsComponent } from './candidate-communications/candidate-communications.component';
import { CandidateDetailComponent } from './candidate-detail.component';
import { CandidateMainInfoComponent } from './candidate-main-info/candidate-main-info.component';
import { CandidateActionComponent } from './candidate-action/candidate-action.component';

@NgModule({
  declarations: [
    CandidateDetailComponent,
    CandidateCommunicationsComponent,
    CandidateUpdatesComponent,
    CandidateMainInfoComponent,
    CandidateActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    AppPipesModule,
  ],
  exports: [
    CandidateCommunicationsComponent,
    CandidateDetailComponent,
    CandidateUpdatesComponent,
    CandidateMainInfoComponent,
    CandidateActionComponent,
  ],
})
export class CandidateDetailModule {}
