import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@src/app/routes';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent {
  constructor(private _router: Router) {}

  back() {
    this._router.navigate([ROUTES.CANDIDATES]);
  }
}
