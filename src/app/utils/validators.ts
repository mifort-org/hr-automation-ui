import { FormGroup, ValidationErrors } from '@angular/forms';
import { AttributeType } from '@interfaces/attributes';
import { TEXT_FIELD_ERRORS } from '@constants/strings';

const EMPTY_VALUES = ['', undefined, null];

export const VALIDATORS = {
  identifiedOfField(identifiedArray: AttributeType[], form: FormGroup): ValidationErrors | null {
    if (identifiedArray.some((el) => !EMPTY_VALUES.includes(form.controls[el?.name]?.value))) {
      return null;
    }
    return { identifiedOfField: TEXT_FIELD_ERRORS.IDENTIFIER_FIELD };
  },

  identifiedOfData(identifiedArray: AttributeType[], data: any): string | null {
    if (identifiedArray.some((el) => !EMPTY_VALUES.includes(data[el?.name]))) {
      return null;
    }
    return TEXT_FIELD_ERRORS.IDENTIFIER_FIELD;
  },
};
