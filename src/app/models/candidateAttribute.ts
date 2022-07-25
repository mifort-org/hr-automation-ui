import { CandidateAttributeType } from './candidateAttributeType';

export interface CandidateAttribute {
  id: number;
  value: string;
  valueSource: number;
  isArchived: boolean;
  attributeTypes: CandidateAttributeType;
}
