import { ECandidateStatus } from '@constants/candidates';

export interface CandidatesFilterData {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string[];
}

export interface Keywords {
  id: string;
}

export interface CommunicationHistory {
  id: number;
  createDate: string;
  updateDate: string;
  comment: string;
  archived: boolean;
}

export interface CandidateAttribute {
  id: number;
  value: string;
  valueSource: number;
  isArchived: boolean;
  attributeTypes: {
    id: number;
    name: string;
    basicType: string;
    validation: string;
    identifier: boolean;
  };
}
export interface Candidate {
  id: string;
  lastContact: string;
  status: ECandidateStatus;
  fullName: string;
  candidateUpdates: any;
  keywords: Keywords[];
  communicationHistory: CommunicationHistory[];
  candidateAttributes: CandidateAttribute[];
  candidateAttributesValues: CandidateAttributesValues[];
  mergeCandidates: any;
}

export type CandidateCustomAttributeDto = { [key: string]: CandidateAttribute };

export interface CandidateAttributesValues {
  name: string;
  value: string;
}
