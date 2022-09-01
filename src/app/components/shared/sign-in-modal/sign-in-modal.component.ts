import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
})
export class SignInModalComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignInModalComponent>,
    private notification: NotificationService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onNoClick(): void {
    this.notification.show('Closed');
    this.dialogRef.close();
  }
}
