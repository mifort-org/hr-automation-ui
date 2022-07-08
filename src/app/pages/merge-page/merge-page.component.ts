import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit, OnDestroy {
  constructor(public mergeService: MergeService) {}

  private candidateIds: Array<string> = [];

  private finalResult: Array<Array<string>> = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.mergeService.candidatesIdsSubject$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.candidateIds = items;
    });
    this.mergeService.finalResultSubject$.pipe(takeUntil(this.destroy$)).subscribe((item) => {
      this.finalResult = item;
    });
    this.mergeService.parseCanditatesAttributes();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
