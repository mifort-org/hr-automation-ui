import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MergeService } from '@src/app/services/merge.service';
import { PageState } from '@src/app/utils/pageState';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit {
  public pageState = new PageState();

  public candidateIds!: Observable<string[]>;

  public finalResult!: Observable<string[][]>;

  public attributesMatrix2: string[][] = [];

  public attributesTitles2$!: Observable<string[]>;

  constructor(public mergeService: MergeService) {}

  ngOnInit(): void {
    this.pageState.startLoading();
    this.candidateIds = this.mergeService.candidatesIdsSubject$;
    this.finalResult = this.mergeService.finalResultSubject2$;
    this.attributesTitles2$ = this.mergeService.getAttributesTitles2();
    this.mergeService.getAttributesMatrix2().subscribe((item) => {
      this.attributesMatrix2 = item;
      this.pageState.finishLoading();
    });
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
