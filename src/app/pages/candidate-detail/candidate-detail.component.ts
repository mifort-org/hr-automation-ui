import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
  providers: [CandidateDetailService],
})
export class CandidateDetailComponent implements OnInit {
  public candidate$!: Observable<Candidate>;

  public currentCandidate!: Candidate;

  constructor(private candidateDetailService: CandidateDetailService) {}

  ngOnInit(): void {
    this.candidate$ = this.candidateDetailService.currentCandidate$;
    this.candidateDetailService.currentCandidate$.subscribe((res: Candidate) => {
      this.currentCandidate = res;
      console.log('keywords', res.keywords);
    });
  }
}
