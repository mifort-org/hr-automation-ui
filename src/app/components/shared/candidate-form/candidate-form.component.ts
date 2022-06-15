import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AttributeType } from '@interfaces/attributes';
import { AttributesService } from '@services/attributes.service';
import { CANDIDATE_STATUSES } from '@constants/candidates';
import { Candidate } from '@interfaces/candidates';
import { VALIDATORS } from '@utils/validators';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
})
export class CandidateFormComponent implements OnInit {
  @Input() candidate!: Candidate;

  @Output() formOnChange = new EventEmitter();

  statusesOptions = CANDIDATE_STATUSES;

  form!: FormGroup;

  formErrors: any = {};

  attributesData!: AttributeType[];

  constructor(private _attributeService: AttributesService) {}

  ngOnInit(): void {
    if (this._attributeService.attributes) {
      this.attributesData = this._attributeService.attributes;

      const group: any = {};
      this._attributeService.attributes.forEach((el) => {
        group[el.name] = new FormControl(this.candidate?.customAttribute?.[el.name]?.value || '');
      });

      this.form = new FormGroup(group);

      this.form.valueChanges.subscribe((el) => {
        this.onValueChanges(el);
      });
    }
  }

  onValueChanges(value: any) {
    Object.entries(this.form?.controls).forEach(([key]) => {
      const currentControl = this.form?.controls[key];
      currentControl.setErrors(null);

      const result = VALIDATORS.identifiedOfField(
        this._attributeService.identifiedAttributes || [],
        this.form
      );
      if (this._attributeService?.identifiedAttributes?.find((el) => el.name === key)) {
        currentControl.setErrors(result);
        this.formErrors = {
          ...this.formErrors,
          [key]: result?.['identifiedOfField'] || '',
        };
      }
    });

    this.formOnChange.emit(value);
  }
}
