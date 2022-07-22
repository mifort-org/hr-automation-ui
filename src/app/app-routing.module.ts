import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidatesComponent } from '@pages/candidates/candidates.component';
import { CandidateDetailComponent } from '@pages/candidate-detail/candidate-detail.component';

import { ROUTES } from './routes';
import { MergePageComponent } from './pages/merge-page/merge-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.CANDIDATES,
    pathMatch: 'full',
  },
  {
    path: ROUTES.CANDIDATES,
    component: CandidatesComponent,
  },
  {
    path: ROUTES.CANDIDATE_DETAIL,
    component: CandidateDetailComponent,
  },
  {
    path: ROUTES.CANDIDATES_MERGE,
    component: MergePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
class AppRoutingModule {}

export default AppRoutingModule;
