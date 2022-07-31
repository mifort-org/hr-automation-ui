import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AttributeType } from '@src/app/models/attributeType';
import { AttributesService } from '@services/attributes.service';
import { VALIDATORS } from '@utils/validators';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
})
export class CandidateFormComponent implements OnInit {
  @Input() candidate!: Candidate;

  @Output() formOnChange = new EventEmitter();

  public form!: FormGroup;

  public formErrors: any = {};

  public attributesData!: AttributeType[];

  constructor(private attributeService: AttributesService) {}

  ngOnInit(): void {
    if (this.attributeService.attributes) {
      this.attributesData = this.attributeService.attributes;

      const group: any = {};
      this.attributeService.attributes.forEach((el) => {
        const attributeName = this.candidate?.candidateAttributes.find(
          (attr) => attr.attributeTypes.name === el.name
        );
        group[el.name] = new FormControl(attributeName?.value || '');
      });

      this.form = new FormGroup(group);

      this.form.valueChanges.subscribe((el) => {
        this.onValueChanges(el);
      });
    }
  }

  public onValueChanges(value: any): void {
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
