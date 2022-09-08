import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PageState } from '@utils/pageState';
import { ERROR_MESSAGE } from '@constants/strings';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { AttributesService } from '@services/attributes.service';
import { CandidatesService } from '@services/candidates.service';
import { VALIDATORS } from '@utils/validators';
import { NotificationService } from '@services/notification.service';
import { NotificationMode } from '@constants/notification';
import { Candidate } from '@src/app/models/candidate';

@Component({
  selector: 'app-edit-candidate-modal',
  templateUrl: './edit-candidate-modal.component.html',
})
export class EditCandidateModalComponent {
  public candidate!: Candidate;

  public formData!: FormData;

  public modalState = new PageState();

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidateData: Candidate,
    private dialogRef: MatDialogRef<EditCandidateModalComponent>,
    private candidateService: CandidatesService,
    private attributesService: AttributesService,
    private notification: NotificationService
  ) {
    this.candidate = this.candidateData;
  }

  public closeModal(candidate?: Candidate): void {
    this.dialogRef.close(candidate);
  }

  public formValuesOnChange(data: any): void {
    this.formData = data;
  }

  public submitCandidateUpdate(): void {
    if (this.formData === null) {
      this.closeModal();
    } else {
      const result = VALIDATORS.identifiedOfData(
        this.attributesService.identifiedAttributes || [],
        this.formData
      );

      if (result === null) {
        this.modalState.startLoading();
        const fetchData = Object.entries(this.formData).map(([key, value]) => {
          const valueSource =
            this.candidate.candidateAttributes.find((attr) => attr.value === key)?.valueSource || 0;
          return {
            value,
            valueSource,
            isArchived: false,
            attributeTypes: this.attributesService.attributesDictionary[key].id,
          };
        });

        const data = fetchData.filter((el) => el?.value);
        this.candidateService.updateCandidateAttributes(this.candidate?.id, data).subscribe({
          next: () => {
            this.modalState.finishLoading();
            this.closeModal(this.candidate);
            this.notification.show('Candidate is updated', NotificationMode.SUCCESS);
          },
          error: (err) => {
            this.modalState.finishLoading();
            this.notification.show(
              ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              NotificationMode.ERROR
            );
          },
        });
      } else {
        this.notification.show(result, NotificationMode.ERROR);
      }
    }
  }
}
