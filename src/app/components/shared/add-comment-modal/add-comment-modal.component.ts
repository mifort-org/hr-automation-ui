import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageState } from '@utils/pageState';
import { HistoryService } from '@src/app/services/history.service';
import { Candidate } from '@src/app/interfaces/candidates';
import { CandidatesService } from '@src/app/services/candidates.service';
import { NotificationService } from '@src/app/services/notification.service';
import { ENotificationMode } from '@src/app/constants/notification';
import { ERROR_MESSAGE } from '@src/app/constants/strings';
import { ERROR_STATUS_CODES } from '@src/app/constants/errorStatusCode';

@Component({
  selector: 'app-add-comment-modal',
  styleUrls: ['add-comment-modal.scss'],
  templateUrl: './add-comment-modal.component.html',
})
export class AddCommentModalComponent implements OnInit {
  @Output() formOnChange = new EventEmitter();

  candidate!: Candidate;

  formData = null;

  formErrors = null as any;

  modalState = new PageState();

  form!: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AddCommentModalComponent>,
    private _formBuilder: FormBuilder,
    private _historyService: HistoryService,
    private _candidateService: CandidatesService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.candidate = this._candidateService.currentCandidate;
    this.form = this._formBuilder.group({
      comment: '',
    });
  }

  closeModal(): void {
    this._dialogRef.close();
  }

  submitHistoryUpdate(): void {
    this.modalState.startLoading();
    const data = {
      archived: false,
      comment: this.form.value.comment,
      id: '',
    };
    this._historyService.createNewCandidateHistory(data, this.candidate.id).subscribe({
      next: () => {
        this._dialogRef.close(true);
        this._notification.show('Comment is added', ENotificationMode.SUCCESS);
      },
      error: (err) => {
        this.modalState.finishLoading();
        this._notification.show(
          ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
          ENotificationMode.ERROR
        );
      },
    });
  }
}
