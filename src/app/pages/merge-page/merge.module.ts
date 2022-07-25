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
import { ActionsBarMergeComponent } from '@src/app/pages/merge-page/actions-bar-merge/actions-bar-merge.component';
import { MergeCandidateComponent } from '@pages/merge-page/merge-candidate/merge-candidate.component';
import { MergeCellComponent } from './merge-cell/merge-cell.component';
import { MergePageComponent } from './merge-page.component';

@NgModule({
  declarations: [
    MergePageComponent,
    MergeCandidateComponent,
    MergeCellComponent,
    ActionsBarMergeComponent,
  ],
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
    AppPipesModule,
  ],
  exports: [MergePageComponent],
})
export class MergeModule {}
