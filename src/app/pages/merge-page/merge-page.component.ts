/* eslint-disable no-console */
// eslint-disable-next-line max-classes-per-file
import { Component, OnInit } from '@angular/core';
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
    this.candidates = candidates;
    this.allAttributeTypes = _(candidates)
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
export class MergePageComponent implements OnInit {
  public pageState = new PageState();

  public candidatesMatrix!: Observable<MergeCandidates>;

  public attributeTypes!: CandidateAttributeType[];

  public candidates!: MergeCandidate[];

  public candidatesMatrixNotEmpty!: boolean;

  constructor(public mergeService: MergeService) {
    this.candidatesMatrix = this.mergeService
      .getCandidates()
      .pipe(map((candidates) => new MergeCandidates(candidates)));
  }

  ngOnInit(): void {
    this.pageState.startLoading();
    this.candidatesMatrix.subscribe((matrix) => {
      if (matrix) {
        this.pageState.finishLoading();
      }

      this.candidatesMatrixNotEmpty = !matrix.isEmpty();
      this.candidates = matrix.getCandidates();
      this.attributeTypes = matrix.getAllAttributeTypesFrom();
    });
  }

  finalResult(): MergeCandidate {
    return this.candidates.reduce((res, candidate) => {
      res.id = 'Results';
      res.attributes = (res.attributes || []).concat(
        candidate.attributes.filter((a) => a.selected)
      );
      res.attributesMap = new Map<string, MergeCandidateAttribute[]>(
        Object.entries(
          _.forEach(_.groupBy(res.attributes, (attr) => attr.attributeTypes.name))
        ).map((item) => {
          return [item[0], _.uniqBy(item[1], 'value')];
        })
      );
      return res;
    }, {} as MergeCandidate);
  }

  deleteCandidate(candidate: MergeCandidate) {
    this.mergeService.deleteCandidate(candidate);
  }
}
