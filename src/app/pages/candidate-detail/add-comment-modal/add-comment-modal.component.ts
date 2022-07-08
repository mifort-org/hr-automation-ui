import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Candidate } from '@interfaces/candidates';
import { CommentData } from '@interfaces/history';

@Component({
  selector: 'app-add-comment-modal',
  styleUrls: ['add-comment-modal.scss'],
  templateUrl: './add-comment-modal.component.html',
})
export class AddCommentModalComponent implements OnInit {
  candidate!: Candidate;

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCommentModalComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: '',
    });
  }

  submitHistoryUpdate(): void {
    const data: CommentData = {
      archived: false,
      comment: this.form.value.comment,
    };
    this.dialogRef.close(this.form.value.comment.length ? data : null);
  }
}
