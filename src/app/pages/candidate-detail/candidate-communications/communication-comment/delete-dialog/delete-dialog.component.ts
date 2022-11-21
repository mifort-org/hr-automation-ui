import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModalDataType } from '@src/app/models/deleteModalDataType';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  conFirmTitle: string = '';

  conFirmText: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteModalDataType
  ) {}

  ngOnInit() {
    this.conFirmTitle = this.data.title || 'Delete comment';
    this.conFirmText = this.data.text || 'Are you sure you want to delete this comment?';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
