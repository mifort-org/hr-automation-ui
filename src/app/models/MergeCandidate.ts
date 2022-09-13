import { MergeCandidateAttribute } from '@src/app/models/MergeCandidateAttribute';
import { CandidateStatus } from '@constants/candidates';

export interface MergeCandidate {
  id: string;
  lastContact: string;
  status: CandidateStatus;
  fullName: string;
  attributes: MergeCandidateAttribute[];
  attributesMap: Map<string, MergeCandidateAttribute[]>;
}
