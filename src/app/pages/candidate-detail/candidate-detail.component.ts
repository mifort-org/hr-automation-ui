import { Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '@services/candidates.service';
import { Candidate } from '@interfaces/candidates';
import { ROUTES } from '@src/app/routes';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent implements OnInit {
  candidateId!: string;

  candidate!: Candidate | null;

  constructor(
    private _router: Router,
    private _candidateService: CandidatesService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap((param): Observable<Candidate> => {
          this.candidateId = param['id'];

          return this._candidateService.getCandidateById(this.candidateId);
        })
      )
      .subscribe((resolve: Candidate) => {
        this.candidate = resolve;
      });
  }

  back() {
    this._router.navigate([ROUTES.CANDIDATES]);
  }
}
