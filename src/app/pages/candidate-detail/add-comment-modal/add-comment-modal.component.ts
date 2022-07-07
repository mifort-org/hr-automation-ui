import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageState } from '@utils/pageState';
import { Candidate } from '@interfaces/candidates';
import { CreateCommentData } from '@interfaces/history';
import { CandidateDetailService } from '@services/candidateDetail.service';

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
    public candidateDetailService: CandidateDetailService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: '',
    });
    this.candidateDetailService.historyOfCurrentCandidate$.subscribe({
      next: () => {
        this.closeModal();
      },
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
    this.candidateDetailService.createNewComment(data);
  }
}
