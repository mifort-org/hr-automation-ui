import { CandidateStatus } from '../constants/candidates';
import { CandidateAttribute } from './candidateAttribute';
import { CandidateAttributesValues } from './candidateAttributesValues';
import { CommunicationHistory } from './communicationHistory';
import { Keywords } from './keywords';

/**
 * @typedef Candidate
 * @prop {string} id Id
 * @prop {string} lastContact Last contact
 * @prop {CandidateStatus} status Candidate status {@link CandidateStatus}
 * @prop {string} fullName Candidate fullname
 * @prop {any} candidateUpdates Candidate updates
 * @prop {Keywords[]} keywords Keywords for candidate {@link Keywords}
 * @prop {communicationHistory[]} communicationHistory Communication history with candidate {@link communicationHistory}
 * @prop {CandidateAttribute[]} candidateAttributes Candidate attrubutes {@link CandidateAttribute}
 * @prop {CandidateAttributesValues[]} CandidateAttributesValues Candidate attrubutes values {@link CandidateAttributesValues}
 * @prop {any} mergeCandidates Merge candidates
 */

export interface Candidate {
  id: string;
  lastContact: string;
  status: CandidateStatus;
  fullName: string;
  candidateUpdates: any;
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  CandidateAttributesValues: CandidateAttributesValues[];
  mergeCandidates: any;
}
