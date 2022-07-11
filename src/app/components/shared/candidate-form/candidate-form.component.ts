import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AttributeType } from '@interfaces/attributes';
import { AttributesService } from '@services/attributes.service';
import { CANDIDATE_STATUSES } from '@constants/candidates';
import { CandidateDto } from '@interfaces/candidates';
import { VALIDATORS } from '@utils/validators';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
})
export class CandidateFormComponent implements OnInit {
  @Input() candidate!: CandidateDto;

  @Output() formOnChange = new EventEmitter();

  statusesOptions = CANDIDATE_STATUSES;

  form!: FormGroup;

  formErrors: any = {};

  attributesData!: AttributeType[];

  constructor(private attributeService: AttributesService) {}

  ngOnInit(): void {
    if (this.attributeService.attributes) {
      this.attributesData = this.attributeService.attributes;

      const group: any = {};
      this.attributeService.attributes.forEach((el) => {
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
        this.attributeService.identifiedAttributes || [],
        this.form
      );
      if (this.attributeService?.identifiedAttributes?.find((el) => el.name === key)) {
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
