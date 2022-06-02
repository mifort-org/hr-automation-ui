import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '@services/candidates.service';
import { ICandidate } from '@interfaces/candidates';
import { ROUTES } from '@src/app/routes';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent implements OnInit {
  candidateId!: string;

  candidate!: ICandidate | null;

  constructor(
    private _router: Router,
    private _candidateService: CandidatesService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: (param) => {
        this.candidateId = param['id'];
      },
    });

    this._candidateService.getCandidateById(this.candidateId).subscribe({
      next: (resolve: ICandidate) => {
        this.candidate = resolve;
      },
    });
  }

  back() {
    this._router.navigate([ROUTES.CANDIDATES]);
  }
}
