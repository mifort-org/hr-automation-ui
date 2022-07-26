import { CandidateAttributeType } from './candidateAttributeType';

/**
 * @typedef CandidateAttribute
 * @prop {number} id Id
 * @prop {string} value Value
 * @prop {number} valueSource Value Source
 * @prop {boolean} isArchived Is archived
 * @prop {CandidateAttributeType} attributeTypes Attribute types {@link CandidateAttributeType}
 */

export interface CandidateAttribute {
  id: number;
  value: string;
  valueSource: number;
  isArchived: boolean;
  attributeTypes: CandidateAttributeType;
}
