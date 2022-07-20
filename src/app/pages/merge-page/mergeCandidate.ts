import * as _ from 'lodash';
import { CandidateAttributeType } from '@src/app/models/candidates';
import { MergeCandidate } from './view-model/MergeCandidate';

export class MergeCandidates {
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

  isEmpty(): boolean {
    return this.candidates.length === 0;
  }

  getCandidates(): MergeCandidate[] {
    return this.candidates;
  }
}
