import { CandidateStatus } from '@constants/candidates';
import { CandidateAttribute } from './candidateAttribute';
import { CandidateAttributesValues } from './candidateAttributesValues';
import { CandidateUpdates } from '@src/app/models/candidate-updates';
import { CommunicationHistory } from './communicationHistory';
import { Keywords } from './keywords';
import { MergeCandidate } from '@src/app/models/MergeCandidate';

/**
 * @typedef Candidate
 * Represents full description of candidate
 */

export interface Candidate {
  id: string;
  lastContact: string;
  status: CandidateStatus;
  fullName: string;
  candidateUpdates: CandidateUpdates[];
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  candidateAttributesValues: CandidateAttributesValues[];
  mergeCandidates: MergeCandidate[];
}
