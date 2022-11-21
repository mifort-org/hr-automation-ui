/**
 * @typedef AttributeType
 * Represents an attribute type
 */

export interface Attribute {
  basicType: string;
  id?: number;
  isIdentifier: boolean;
  isMultivalued: boolean;
  name: string;
  label: string;
  validation: string;
  icon: string;
  isEdit: boolean;
}

export interface AttributeType {
  basicType: string;
  viewValue: string;
}
export const DEFAULT_TYPE: AttributeType = { basicType: 'data', viewValue: 'Data' };

export const PREDEFINED_TYPES: AttributeType[] = [
  DEFAULT_TYPE,
  { basicType: 'string', viewValue: 'String' },
  { basicType: 'number', viewValue: 'Number' },
  { basicType: 'date', viewValue: 'Date' },
];
