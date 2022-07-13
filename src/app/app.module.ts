import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SystemModule } from '@components/systems/system.module';
import { SharedModule } from '@components/shared/shared.module';
import { CandidateDetailModule } from '@pages/candidate-detail/candidate-detail.module';
import { CandidateModule } from '@pages/candidates/candidate.module';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import { MergeModule } from './pages/merge-page/merge.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CandidateModule,
    CandidateDetailModule,
    MergeModule,
    SharedModule,
    SystemModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
