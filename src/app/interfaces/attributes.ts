export interface AttributeType {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
}

export interface CandidateAttributesTypes {
  id: number;
  name: string;
  basicType: string;
  validation: string;
  identifier: boolean;
  value: string;
}

export interface AttributeTypeDictionary {
  [key: string]: AttributeType;
}
