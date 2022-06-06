export interface IAttribute {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
}

export interface IAttributeDictionary {
  [key: string]: IAttribute;
}
