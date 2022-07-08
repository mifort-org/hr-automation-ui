import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CandidateAttributesValues } from '@interfaces/candidates';
import { CandidateDetailService } from '@services/candidateDetail.service';

@Component({
  selector: 'app-candidate-main-info',
  styleUrls: ['candidate-main-info.component.scss'],
  templateUrl: './candidate-main-info.component.html',
})
export class CandidateMainInfoComponent implements OnInit, OnDestroy {
  public candidateAttributesValues!: CandidateAttributesValues[] | null;

  public displayedColumns: string[] = ['name', 'value'];

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(public candidateDetailService: CandidateDetailService) {}

  ngOnInit() {
    this.candidateDetailService.candidateAttributes$.pipe(takeUntil(this.unSubscribe$)).subscribe({
      next: (attributes) => {
        this.candidateAttributesValues = attributes;
      },
    });
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
