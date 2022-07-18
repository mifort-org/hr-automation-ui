import { MergeCandidateAttribute } from '@pages/merge-page/view-model/MergeCandidateAttribute';
import { ECandidateStatus } from '@constants/candidates';

export interface MergeCandidate {
  id: string;
  lastContact: string;
  status: ECandidateStatus;
  fullName: string;
  attributes: MergeCandidateAttribute[];
  attributesMap: Map<string, MergeCandidateAttribute[]>;

  selected: boolean;
}
