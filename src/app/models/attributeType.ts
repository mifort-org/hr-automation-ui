/**
 * @typedef AttributeType
 * @prop {string} basicType Basic type
 * @prop {number} id Id
 * @prop {boolean} identifier Identifier
 * @prop {string} name Attribute name
 * @prop {string} label Attribute label
 * @prop {string} validation Validation
 */

export interface AttributeType {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
}
