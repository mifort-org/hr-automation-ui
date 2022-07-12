import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit, OnDestroy {
  constructor(public mergeService: MergeService) {}

  public candidateIds: Array<string> = [];

  public finalResult: Array<Array<string>> = [];

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

  isAllCandidateAttributesChoose(indexMatrix: number) {
    return this.mergeService.isAllCandidateAttributesChoose(indexMatrix);
  }

  isCandidates() {
    return this.mergeService.isCandidates();
  }

  removeCandidateById(candidateId: string) {
    return this.mergeService.removeCandidateById(candidateId);
  }

  chooseAllCandidateAttributes(event: MatCheckboxChange) {
    const indexCandidate = +event.source.value;
    const { checked } = event;
    this.mergeService.chooseAllCandidateAttributes(indexCandidate, checked);
  }

  changeAttributes(event: { candidatesMatrixIndexes: Array<number>; candidateAttr: string }) {
    const { candidatesMatrixIndexes, candidateAttr } = event;
    return this.mergeService.changeAttributes(candidatesMatrixIndexes, candidateAttr);
  }

  checkFilledResult() {
    return this.mergeService.checkFilledResult();
  }
}
