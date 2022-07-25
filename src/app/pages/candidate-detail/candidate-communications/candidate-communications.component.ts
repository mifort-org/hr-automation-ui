import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateDetailService } from '@services/candidate-detail.service';
import { HistoryElement } from '@src/app/models/historyElement';
import { CommentData } from '@src/app/models/commentData';

@Component({
  selector: 'app-candidate-communications',
  styleUrls: ['candidate-communications.scss'],
  templateUrl: './candidate-communications.component.html',
})
export class CandidateCommunicationsComponent implements OnInit {
  public candidateHistory$!: Observable<HistoryElement[]>;

  constructor(private candidateDetailService: CandidateDetailService) {}

  ngOnInit(): void {
    this.candidateHistory$ = this.candidateDetailService.historyOfCurrentCandidate$;
  }

  public commentDelete(id: number): void {
    this.candidateDetailService.deleteHistoryComment(id);
  }

  public updateComment(data: CommentData): void {
    this.candidateDetailService.updateComment(data);
  }
}
