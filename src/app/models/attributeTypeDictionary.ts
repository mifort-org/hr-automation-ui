import { AttributeType } from './attributeType';

/**
 * @typedef AttributeTypeDictionary
 * @prop {AttributeType} [key: string] Attribute type {@link AttributeType}
 */

export interface AttributeTypeDictionary {
  [key: string]: AttributeType;
}
