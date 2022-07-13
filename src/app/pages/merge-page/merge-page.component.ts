import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MergeService } from '@src/app/services/merge.service';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit {
  constructor(public mergeService: MergeService) {}

  public candidateIds!: Observable<string[]>;

  public finalResult!: Observable<string[][]>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.candidateIds = this.mergeService.candidatesIdsSubject$;
    this.finalResult = this.mergeService.finalResultSubject$;
    this.mergeService.parseCanditatesAttributes();
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
