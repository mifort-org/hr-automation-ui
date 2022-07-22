import { CandidateAttribute } from '@src/app/models/candidates';

export interface MergeCandidateAttribute extends CandidateAttribute {
  candidateId: string;
  selected: boolean;
}
