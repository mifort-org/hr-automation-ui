import { Attribute } from './attributeType';

/**
 * @typedef AttributeTypeDictionary
 * Represents a dictionary of attribute types
 */

export interface AttributeTypeDictionary {
  [key: string]: Attribute;
}
