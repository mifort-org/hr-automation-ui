import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidatesComponent } from '@pages/candidates/candidates.component';

import { ROUTES } from './routes';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
class AppRoutingModule {}

export default AppRoutingModule;
