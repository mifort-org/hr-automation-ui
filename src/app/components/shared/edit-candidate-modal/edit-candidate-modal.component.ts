import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ERROR_MESSAGE } from '@constants/strings';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { AttributesService } from '@services/attributes.service';
import { ICandidate } from '@interfaces/candidates';
import { CandidatesService } from '@services/candidates.service';
import { VALIDATORS } from '@utils/validators';
import { NotificationService } from '@services/notification.service';
import { ENotificationMode } from '@constants/notification';

@Component({
  selector: 'app-edit-candidate-modal',
  templateUrl: './edit-candidate-modal.component.html',
})
export class EditCandidateModalComponent implements OnInit {
  candidate!: ICandidate;

  formData = null;

  formErrors = null as any;

  modalState = {
    loading: false,
    error: null,
  };

  constructor(
    private _dialogRef: MatDialogRef<EditCandidateModalComponent>,
    private _candidateService: CandidatesService,
    private _attributesService: AttributesService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.candidate = this._candidateService.currentCandidate;
  }

  closeModal() {
    this._dialogRef.close();
  }

  formValuesOnChange(data: any) {
    this.formData = data;
  }

  submitCandidateUpdate() {
    if (this.formData === null) {
      this.closeModal();
    } else {
      const result = VALIDATORS.identifiedOfData(
        this._attributesService.identifiedAttributes || [],
        this.formData
      );

      if (result === null) {
        this.modalState.loading = true;
        const fetchData = Object.entries(this.formData).map(([key, value]) => {
          return {
            value,
            valueSource: this.candidate?.customAttribute?.[key]?.valueSource || 0,
            archived: false,
            attributeTypes: this._attributesService.attributesDictionary[key].id,
          };
        });

        const data = fetchData.filter((el) => el?.value);
        this._candidateService.updateCandidateAttributes(this.candidate?.id, data).subscribe({
          next: () => {
            this.modalState.loading = false;
            this.closeModal();
            this._notification.show('Candidate is updated', ENotificationMode.SUCCESS);
            this._candidateService.getCandidateById(this.candidate?.id);

            // TODO: Need to think, maybe we should subscribe in service and call just this._candidateService.getCandidateById();
            // Or just create and Observable ICandidate object
            this._candidateService.getCandidateById(this.candidate?.id).subscribe();
          },
          error: (err) => {
            this.modalState.loading = false;
            this._notification.show(
              ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
              ENotificationMode.ERROR
            );
          },
        });
      } else {
        this._notification.show(result, ENotificationMode.ERROR);
      }
    }
  }
}
