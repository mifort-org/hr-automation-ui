import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PageState } from '@utils/pageState';
import { ERROR_MESSAGE } from '@constants/strings';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { AttributesService } from '@services/attributes.service';
import { CandidateDto } from '@interfaces/candidates';
import { CandidatesService } from '@services/candidates.service';
import { VALIDATORS } from '@utils/validators';
import { NotificationService } from '@services/notification.service';
import { ENotificationMode } from '@constants/notification';

@Component({
  selector: 'app-edit-candidate-modal',
  templateUrl: './edit-candidate-modal.component.html',
})
export class EditCandidateModalComponent {
  candidate!: CandidateDto;

  formData = null;

  formErrors = null as any;

  modalState = new PageState();

  constructor(
    private dialogRef: MatDialogRef<EditCandidateModalComponent>,
    private candidateService: CandidatesService,
    private attributesService: AttributesService,
    private notification: NotificationService
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  formValuesOnChange(data: any) {
    this.formData = data;
  }

  submitCandidateUpdate() {
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
          return {
            value,
            valueSource: this.candidate?.customAttribute?.[key]?.valueSource || 0,
            archived: false,
            attributeTypes: this.attributesService.attributesDictionary[key].id,
          };
        });

        const data = fetchData.filter((el) => el?.value);
        this.candidateService.updateCandidateAttributes(this.candidate?.id, data).subscribe({
          next: () => {
            this.modalState.finishLoading();
            this.closeModal();
            this.notification.show('Candidate is updated', ENotificationMode.SUCCESS);
            this.candidateService.getCandidateById(this.candidate?.id);

            // TODO: Need to think, maybe we should subscribe in service and call just this.candidateService.getCandidateById();
            // Or just create and Observable ICandidate object
          },
          error: (err) => {
            this.modalState.finishLoading();
            this.notification.show(
              ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              ENotificationMode.ERROR
            );
          },
        });
      } else {
        this.notification.show(result, ENotificationMode.ERROR);
      }
    }
  }
}
