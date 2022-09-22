import { CandidateStatus } from '@constants/candidates';
import { CandidateUpdates } from '@src/app/models/candidate-updates';
import { MergeCandidate } from '@src/app/models/MergeCandidate';
import { CandidateAttribute } from './candidateAttribute';
import { CandidateAttributesValues } from './candidateAttributesValues';
import { CommunicationHistory } from './communicationHistory';
import { ContactAttribute } from './contactAttribute';
import { Keywords } from './keywords';

/**
 * @typedef Candidate
 * Represents full description of candidate
 */

export interface Candidate {
  id: string;
  lastContact: string;
  status: CandidateStatus;
  fullName: string;
  firstName?: string;
  lastName?: string;
  candidateUpdates: CandidateUpdates[];
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  candidateAttributesValues: CandidateAttributesValues[];
  mergeCandidates: MergeCandidate[];
  city?: any;
  contacts?: ContactAttribute;
}
