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

  public attributesMatrix: string[][] = [];

  public attributesTitles2$!: Observable<string[]>;

  constructor(public mergeService: MergeService) {}

  ngOnInit(): void {
    this.pageState.startLoading();
    this.candidateIds = this.mergeService.candidatesIdsSubject$;
    this.finalResult = this.mergeService.finalResultSubject$;
    this.attributesTitles2$ = this.mergeService.attributesTitles2$;
    this.mergeService.attributesMatrix$.subscribe((item) => {
      this.attributesMatrix = item;
      this.pageState.finishLoading();
    });
  }

  isCandidates(): boolean {
    return this.mergeService.isCandidates();
  }

  removeCandidateById(candidateId: string): void {
    return this.mergeService.removeCandidateById(candidateId);
  }

  chooseAllCandidateAttributes(event: MatCheckboxChange): void {
    const indexCandidate = +event.source.value;
    const { checked } = event;
    this.mergeService.chooseAllCandidateAttributes(indexCandidate, checked);
  }

  changeAttributes(event: { candidatesMatrixIndexes: Array<number>; candidateAttr: string }): void {
    const { candidatesMatrixIndexes, candidateAttr } = event;
    return this.mergeService.changeAttributes(candidatesMatrixIndexes, candidateAttr);
  }

  checkFilledResult(): boolean {
    return this.mergeService.checkFilledResult();
  }

  attributeIsChecked(indexMatrix: number, indexCandidate: number): boolean {
    return this.mergeService.attributeIsChecked(indexMatrix, indexCandidate);
  }
}
