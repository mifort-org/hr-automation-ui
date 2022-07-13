import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PageState } from '@utils/pageState';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { ROUTES } from '@src/app/routes';
import { NotificationService } from '@services/notification.service';
import { CandidatesService } from '@services/candidates.service';
import { ECandidateStatus } from '@constants/candidates';
import { ENotificationMode } from '@constants/notification';
import { ERROR_MESSAGE, TEXT_FIELD_ERRORS } from '@constants/strings';

interface IFormData {
  id: string;
  status: ECandidateStatus;
}

@Component({
  selector: 'app-new-candidate-modal',
  templateUrl: './new-candidate-modal.component.html',
})
export class NewCandidateModalComponent {
  public form!: FormGroup;

  public formData: IFormData | null = null;

  public modalState = new PageState();

  constructor(
    private dialogRef: MatDialogRef<NewCandidateModalComponent>,
    private formBuilder: FormBuilder,
    private candidateService: CandidatesService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });

    this.form?.valueChanges.subscribe((data) => {
      this.formData = data;
    });
  }

  public submitNewCandidate(): void {
    if (this.formData === null || this.form.invalid) {
      this.notificationService.show(TEXT_FIELD_ERRORS.FORM_INVALID, ENotificationMode.ERROR);
    } else {
      this.modalState.startLoading();
      this.candidateService.createNewCandidate(this.formData).subscribe({
        next: () => {
          this.router.navigate([`${ROUTES.CANDIDATES}/details/${this.formData!.id}`]);
          this.modalState.finishLoading();
          this.closeModal();
        },
        error: (error) => {
          this.modalState.finishLoading();
          this.notificationService.show(
            ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
            ENotificationMode.ERROR
          );
        },
      });
    }
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
