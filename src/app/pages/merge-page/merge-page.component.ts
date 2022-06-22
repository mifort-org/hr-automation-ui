import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CandidatesService } from '@src/app/services/candidates.service';
import { MergeService } from '@src/app/services/merge.service';
import { PageState } from '@src/app/utils/pageState';
import { NotificationService } from '@src/app/services/notification.service';
import { ENotificationMode } from '@src/app/constants/notification';

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
  constructor(
    private _candidateService: CandidatesService,
    public _mergeService: MergeService,
    private _notification: NotificationService
  ) {}

  data = this._mergeService.getCandidatesIds();

  pageState = new PageState();

  attributesTitles: Array<string> = [];

  attributesMatrix: Array<Array<string>> = [];

  finalAttributesMatrix: Array<Array<string>> = [];

  finalResult: Array<Array<string>> = [];

  candidates: Array<Array<AttributeTypes>> = [];

  ngOnInit() {
    this.pageState.startLoading();
    const fetchAttrArr = this.data.map((item) =>
      this._candidateService.getCandidateAttributesById(item)
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
  }

  changeAttributes(event: { candidateIndex: number; candidateAttr: Array<string> }) {
    this.finalAttributesMatrix[event.candidateIndex] = event.candidateAttr;
    this.calculateResult();
  }

  fillTitleValues() {
    const attributesSetList = new Set();
    this.candidates.forEach((attrArray) =>
      attrArray.forEach((attr) => attributesSetList.add(attr.name))
    );
    this.attributesTitles = [...(Array.from(attributesSetList.values()) as Array<string>)];
    this.attributesTitles.forEach(() => this.finalResult.push([]));
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
    this.finalResult = [];
    this.attributesTitles.forEach(() => this.finalResult.push([]));

    this.finalAttributesMatrix.forEach((candAttrArr) => {
      candAttrArr.forEach((attr, index) => {
        if (attr) {
          this.finalResult[index].push(attr);
        }
      });
    });
  }

  mergeCandidates() {
    this.attributesTitles.forEach((item, index) => {
      if (this.finalResult[index].length) {
        // eslint-disable-next-line no-console
        console.log(`${item} ${this.finalResult[index]}`);
      }
    });
    this._notification.show('Successfully merged. Check console', ENotificationMode.SUCCESS);
  }
}
