import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CandidatesService } from '@src/app/services/candidates.service';
import { MergeService } from '@src/app/services/merge.service';
import { PageState } from '@src/app/utils/pageState';

export interface AttributeTypes {
  id: number;
  name: string;
  basicType: string;
  validation: string;
  identifier: boolean;
  value: string;
}

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit {
  constructor(private candidateService: CandidatesService, public mergeService: MergeService) {}

  pageState = new PageState();

  candidateIds: Array<string> = [];

  attributesTitles: Array<string> = [];

  attributesMatrix: Array<Array<string>> = [];

  finalAttributesMatrix: Array<Array<string>> = [];

  finalResult: Array<Array<string>> = [];

  candidates: Array<Array<AttributeTypes>> = [];

  ngOnInit() {
    this.pageState.startLoading();
    this.mergeService.candidatesIdsSubject.subscribe((items) => {
      this.candidateIds = items;
      const fetchAttrArr = items.map((item) =>
        this.candidateService.getCandidateAttributesById(item)
      );
      forkJoin(fetchAttrArr).subscribe(
        (resolve: AttributeTypes[][]) => {
          this.candidates = resolve;
          this.fillTitleValues();
          this.fillAttributesMatrix();
          this.pageState.finishLoading();
        },
        (error) => {
          this.pageState.catchError(error);
          this.pageState.finishLoading();
        }
      );
    });
    this.mergeService.finalResultSubject.subscribe((item) => {
      this.finalResult = item;
    });
  }

  changeAttributes(event: { candidatesMatrixIndexes: Array<number>; candidateAttr: string }) {
    const [indexMatrix, indexCandidate] = event.candidatesMatrixIndexes;
    this.finalAttributesMatrix[indexMatrix][indexCandidate] = event.candidateAttr;
    this.calculateResult();
  }

  fillTitleValues() {
    const attributesSetList = new Set();
    const finalResult: string[][] = [];
    this.candidates.forEach((attrArray) =>
      attrArray.forEach((attr) => attributesSetList.add(attr.name))
    );
    this.attributesTitles = [...(Array.from(attributesSetList.values()) as Array<string>)];
    this.attributesTitles.forEach(() => finalResult.push([]));
    this.mergeService.addFinalResult(finalResult);
    this.mergeService.addTitles(this.attributesTitles);
  }

  fillAttributesMatrix() {
    this.attributesMatrix = this.candidates.map((candidateArr) =>
      this.attributesTitles.map((item) => {
        const candidateAttribute = candidateArr.find((attr) => attr.name === item);
        return candidateAttribute ? candidateAttribute.value : '';
      })
    );
    this.finalAttributesMatrix = this.attributesMatrix.map((item) => item.map(() => ''));
  }

  calculateResult() {
    const finalResult: string[][] = [];
    this.attributesTitles.forEach(() => finalResult.push([]));

    this.finalAttributesMatrix.forEach((candAttrArr) => {
      candAttrArr.forEach((attr, index) => {
        if (attr) {
          finalResult[index].push(attr);
        }
      });
    });
    this.mergeService.addFinalResult(finalResult);
  }

  removeCandidate(candidateId: string) {
    this.mergeService.removeCandidateId(candidateId);
  }
}
