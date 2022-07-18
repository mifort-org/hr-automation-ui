/* eslint-disable no-console */
// eslint-disable-next-line max-classes-per-file
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';
import { MergeService } from '@pages/merge-page/merge.service';
import { PageState } from '@src/app/utils/pageState';
import { CandidateAttributeType } from '@src/app/models/candidates';
import { MergeCandidate } from '@pages/merge-page/view-model/MergeCandidate';
import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';

class MergeCandidates {
  private readonly candidates: MergeCandidate[];

  private readonly allAttributeTypes: CandidateAttributeType[];

  constructor(candidates: MergeCandidate[]) {
    console.log('MergeCandidates.constructor', candidates);

    this.candidates = candidates;
    this.allAttributeTypes = _(candidates)
      .filter((candidate: MergeCandidate) => candidate.show)
      .flatMap((c) => c.attributes.map((a) => a.attributeTypes))
      .uniqBy('id')
      .reduce(
        (array: CandidateAttributeType[], a: CandidateAttributeType) => array.concat([a]),
        []
      );
  }

  getAllAttributeTypesFrom(): CandidateAttributeType[] {
    return this.allAttributeTypes;
  }

  public selectAttribute(
    candidate: MergeCandidate,
    attr: MergeCandidateAttribute,
    selectValue: boolean
  ) {
    // eslint-disable-next-line no-param-reassign
    attr.selected = selectValue;
    if (candidate.selected && !selectValue) {
      // eslint-disable-next-line no-param-reassign
      candidate.selected = false;
    }
  }

  isEmpty(): boolean {
    return this.candidates.length === 0;
  }

  getCandidates(): MergeCandidate[] {
    return this.candidates;
  }
}

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss'],
})
export class MergePageComponent implements OnInit, OnChanges {
  public pageState = new PageState();

  public candidateIds: string[] = ['uliana_fomina', 'artem_skrebets', 'vladimir_zelmanchuk'];

  public candidatesMatrix!: Observable<MergeCandidates>;

  public attributeTypes!: CandidateAttributeType[];

  public candidates!: MergeCandidate[];

  public candidatesMatrixNotEmpty!: boolean;

  constructor(public mergeService: MergeService) {
    console.log('MergePageComponent.constructor');
    this.candidatesMatrix = this.mergeService
      .getCandidates()
      .pipe(map((candidates) => new MergeCandidates(candidates)));
  }

  ngOnInit(): void {
    console.log('MergePageComponent.ngOnInit -1- ');
    this.pageState.startLoading();
    this.candidatesMatrix.subscribe((matrix) => {
      console.log('MergePageComponent.ngOnInit -2- ', matrix);
      if (matrix) {
        console.log('MergePageComponent.ngOnInit -3- ', matrix);
        this.pageState.finishLoading();
      }

      this.candidatesMatrixNotEmpty = !matrix.isEmpty();
      this.candidates = matrix.getCandidates();
      this.attributeTypes = matrix.getAllAttributeTypesFrom();
    });

    this.mergeService.updateCandidates(this.candidateIds);
  }

  finalResult(): MergeCandidate {
    return this.candidates.reduce((res, candidate) => {
      res.id = 'Results';
      res.attributes = (res.attributes || []).concat(
        candidate.attributes.filter((a) => a.selected)
      );
      return res;
    }, {} as MergeCandidate);
  }

  checkFilledResult(): boolean {
    return false;
  }

  deleteCandidate(candidate: MergeCandidate) {
    this.mergeService.updateCandidates(this.candidateIds.filter((id) => id !== candidate.id));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }
}
