import { CandidateAttributeType } from './candidateAttributeType';

/**
 * @typedef CandidateAttribute
 * Represents full description of candidate attribute
 */

export interface CandidateAttribute {
  id: number;
  value: string;
  valueSource: number;
  isArchived: boolean;
  attributeTypes: CandidateAttributeType;
}
