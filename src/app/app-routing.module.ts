import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from './routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.CANDIDATES,
    pathMatch: 'full',
  },
  {
    path: ROUTES.CANDIDATES,
    loadChildren: () =>
      import('./pages/candidates/candidate.module').then((m) => m.CandidateModule),
    // component: CandidatesComponent,
  },
  {
    path: ROUTES.CANDIDATE_DETAIL,
    loadChildren: () =>
      import('./pages/candidate-detail/candidate-detail.module').then(
        (m) => m.CandidateDetailModule
      ),
    // component: CandidateDetailComponent,
  },
  {
    path: ROUTES.CANDIDATES_MERGE,
    loadChildren: () => import('./pages/merge-page/merge.module').then((m) => m.MergeModule),
    // component: MergePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
class AppRoutingModule {}

export default AppRoutingModule;
