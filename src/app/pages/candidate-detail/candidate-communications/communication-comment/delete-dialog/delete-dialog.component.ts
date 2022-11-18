import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  @Input() title: string | undefined;

  @Input() text: string | undefined;

  conFirmTitle: string = '';

  conFirmText: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteComment: boolean
  ) {}

  ngOnInit() {
    this.conFirmTitle = this.title || 'Delete comment';
    this.conFirmText = this.text || 'Are you sure you want to delete this comment?';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
