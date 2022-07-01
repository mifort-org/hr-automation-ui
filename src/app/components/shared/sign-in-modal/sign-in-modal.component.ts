import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
})
export class SignInModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignInModalComponent>,
    private notification: NotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.notification.show('Closed');
    this.dialogRef.close();
  }
}
