import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, NonNullableFormBuilder} from '@angular/forms';
import { Candidate } from '@src/app/models/candidate';
import { CommentData } from '@src/app/models/commentData';

@Component({
  selector: 'app-add-comment-modal',
  styleUrls: ['add-comment-modal.scss'],
  templateUrl: './add-comment-modal.component.html',
})
export class AddCommentModalComponent implements OnInit {
  public candidate!: Candidate;

  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCommentModalComponent>,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: '',
    });
  }

  public submitHistoryUpdate(): void {
    const data: CommentData = {
      archived: false,
      comment: this.form.value.comment,
    };
    this.dialogRef.close(this.form.value.comment.length ? data : null);
  }
}
