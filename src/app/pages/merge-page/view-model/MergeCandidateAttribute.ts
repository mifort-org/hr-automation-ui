import { CandidateAttribute } from '@src/app/models/candidateAttribute';

export interface MergeCandidateAttribute extends CandidateAttribute {
  candidateId: string;
  selected: boolean;
}
