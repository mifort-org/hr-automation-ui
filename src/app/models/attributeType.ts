/**
 * @typedef AttributeType
 * Represents an attribute type
 */

export interface AttributeType {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
  icon: string;
  isEdit: boolean;
}
export interface Types {
  basicType: string;
  viewValue: string;
}
export interface AttributeTypeDto {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
  icon: string;
  isEdit: boolean;
}
