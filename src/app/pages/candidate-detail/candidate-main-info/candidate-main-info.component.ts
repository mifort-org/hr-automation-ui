import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { Candidate } from '@src/app/models/candidates';

@Component({
  selector: 'app-candidate-main-info',
  styleUrls: ['candidate-main-info.component.scss'],
  templateUrl: './candidate-main-info.component.html',
})
export class CandidateMainInfoComponent implements OnInit {
  public candidate$!: Observable<Candidate>;

  public displayedColumns: string[] = ['name', 'value'];

  constructor(private candidateDetailService: CandidateDetailService) {}

  ngOnInit(): void {
    this.candidate$ = this.candidateDetailService.currentCandidate$;
  }
}
