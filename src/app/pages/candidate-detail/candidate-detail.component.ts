import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
  providers: [CandidateDetailService],
})
export class CandidateDetailComponent implements OnInit {
  public candidate!: Candidate;

  constructor(
    private candidateDetailService: CandidateDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) =>
          this.candidateDetailService.getCandidateById(params['id']).pipe(take(1))
        )
      )
      .subscribe((candidate: Candidate) => {
        this.candidate = candidate;
      });
  }

  public updateCandidate(candidate: Candidate) {
    if (!candidate) {
      return;
    }

    this.candidateDetailService
      .getCandidateById(candidate.id)
      .pipe(take(1))
      .subscribe((updatedCandidate) => {
        this.candidate = updatedCandidate;
      });
  }
}
