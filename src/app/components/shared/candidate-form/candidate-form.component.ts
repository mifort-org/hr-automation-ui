import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { CANDIDATE_STATUSES } from '@constants/candidates';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
})
export class CandidateFormComponent implements OnInit {
  @Input() candidate: any;

  statusesOptions = CANDIDATE_STATUSES;

  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstname: [this.candidate?.firstname],
      lastname: [this.candidate?.lastname],
      email: [this.candidate?.email, [Validators.required, Validators.email]],
      phone: [this.candidate?.phone],
      status: [this.candidate?.status, [Validators.required]],
    });
  }
}
