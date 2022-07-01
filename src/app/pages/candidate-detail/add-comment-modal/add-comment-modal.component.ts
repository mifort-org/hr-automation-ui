import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageState } from '@utils/pageState';
import { HistoryService } from '@services/history.service';
import { Candidate } from '@interfaces/candidates';
import { CandidatesService } from '@services/candidates.service';
import { NotificationService } from '@services/notification.service';
import { ENotificationMode } from '@constants/notification';
import { ERROR_MESSAGE } from '@constants/strings';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { CreateCommentData } from '@interfaces/history';

@Component({
  selector: 'app-add-comment-modal',
  styleUrls: ['add-comment-modal.scss'],
  templateUrl: './add-comment-modal.component.html',
})
export class AddCommentModalComponent implements OnInit {
  @Output() formOnChange = new EventEmitter();

  candidate!: Candidate;

  modalState = new PageState();

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddCommentModalComponent>,
    private formBuilder: FormBuilder,
    private historyService: HistoryService,
    private candidateService: CandidatesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.candidate = this.candidateService.currentCandidate;
    this.form = this.formBuilder.group({
      comment: '',
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  submitHistoryUpdate(): void {
    this.modalState.startLoading();
    const data: CreateCommentData = {
      archived: false,
      comment: this.form.value.comment,
    };
    this.historyService.createNewCandidateHistory(data, this.candidate.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.notification.show('Comment is added', ENotificationMode.SUCCESS);
      },
      error: (err) => {
        this.modalState.finishLoading();
        this.notification.show(
          ERROR_MESSAGE[err?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
          ENotificationMode.ERROR
        );
      },
    });
  }
}
