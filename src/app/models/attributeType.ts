/**
 * @typedef AttributeType
 * Represents an attribute type
 */

export interface AttributeType {
  basicType: string;
  id: number;
  isIdentifier: boolean;
  name: string;
  label: string;
  validation: string;
  icon: string;
}
