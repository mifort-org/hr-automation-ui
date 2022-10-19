/**
 * @typedef CandidateAttributeType
 * Represents full description of candidate attribute type
 */

export interface CandidateAttributeType {
  id: number;
  name: string;
  basicType: string;
  validation: string;
  identifier: boolean;
  icon?: string | undefined;
}
