import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-candidate-modal',
  templateUrl: './new-candidate-modal.component.html',
})
export class NewCandidateModalComponent {
  constructor(private _dialogRef: MatDialogRef<NewCandidateModalComponent>) {}

  closeModal() {
    this._dialogRef.close();
  }
}
