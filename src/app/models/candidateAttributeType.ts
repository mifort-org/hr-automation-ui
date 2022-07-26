/**
 * @typedef CandidateAttributeType
 * @prop {number} id Id
 * @prop {string} name Candidate name
 * @prop {string} basicType Basic type
 * @prop {string} validation Validation
 * @prop {boolean} identifier Identifier
 */

export interface CandidateAttributeType {
  id: number;
  name: string;
  basicType: string;
  validation: string;
  identifier: boolean;
}
