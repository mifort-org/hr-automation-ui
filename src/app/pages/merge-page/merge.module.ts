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
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModule } from '@components/shared/shared.module';
import { AppPipesModule } from '@utils/pipes/app-pipes.module';
import AppRoutingModule from '@src/app/app-routing.module';
import { SystemModule } from '@src/app/components/systems/system.module';
import { ActionsBarMergeComponent } from '@src/app/pages/merge-page/actions-bar-merge/actions-bar-merge.component';
import { CandidateMergeComponent } from './candidate-merge/candidate-merge.component';
import { MergePageComponent } from './merge-page.component';

@NgModule({
  declarations: [MergePageComponent, CandidateMergeComponent, ActionsBarMergeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,

    SharedModule,
    SystemModule,
    AppPipesModule,
  ],
  exports: [MergePageComponent, CandidateMergeComponent],
})
export class MergeModule {}
