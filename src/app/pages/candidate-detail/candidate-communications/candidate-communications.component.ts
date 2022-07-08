import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { History } from '@interfaces/history';
import { CandidateDetailService } from '@services/candidateDetail.service';

@Component({
  selector: 'app-candidate-communications',
  styleUrls: ['candidate-communications.scss'],
  templateUrl: './candidate-communications.component.html',
})
export class CandidateCommunicationsComponent implements OnInit, OnDestroy {
  public candidateHistory!: History | null;

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(public candidateDetailService: CandidateDetailService) {}

  ngOnInit() {
    this.candidateDetailService.historyOfCurrentCandidate$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (history) => {
          this.candidateHistory = history;
        },
      });
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
