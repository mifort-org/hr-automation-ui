import { FormGroup, ValidationErrors } from '@angular/forms';
import { Attribute } from '@src/app/models/attributeType';
import { TEXT_FIELD_ERRORS } from '@constants/strings';

const EMPTY_VALUES = ['', undefined, null];

export const VALIDATORS = {
  identifiedOfField(identifiedArray: Attribute[], form: FormGroup): ValidationErrors | null {
    if (identifiedArray.some((el) => !EMPTY_VALUES.includes(form.controls[el?.name]?.value))) {
      return null;
    }
    return { identifiedOfField: TEXT_FIELD_ERRORS.IDENTIFIER_FIELD };
  },

  identifiedOfData(identifiedArray: Attribute[], data: { [key: string]: string }): string | null {
    if (identifiedArray.some((el) => !EMPTY_VALUES.includes(data[el?.name]))) {
      return null;
    }
    return TEXT_FIELD_ERRORS.IDENTIFIER_FIELD;
  },
};
