import { ECandidateStatus } from '@constants/candidates';

export interface ICandidatesFilterData {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string[];
}

export interface IKeywords {
  id: string;
}

export interface ICommunicationHistory {
  id: number;
  createDate: string;
  updateDate: string;
  comment: string;
  archived: boolean;
}

export interface ICandidateAttribute {
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

export type ICandidateCustomAttribute = { [key: string]: ICandidateAttribute };

export interface ICandidate {
  id: string;
  lastContact: string;
  status: ECandidateStatus;

  // TODO: Need to resolve this one any;
  candidateUpdates: any;
  keywords: IKeywords[];
  communicationHistory: ICommunicationHistory[];
  candidateAttributes: ICandidateAttribute[];
  customAttribute?: ICandidateCustomAttribute;

  // TODO: Need to resolve this one any
  mergeCandidates: any;
}
