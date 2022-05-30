import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignInModalComponent>,
    private _notification: NotificationService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onNoClick(): void {
    this._notification.show('Closed');
    this.dialogRef.close();
  }
}
