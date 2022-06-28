import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EModalSizes } from '@constants/strings';

const MODAL_SIZE = {
  [EModalSizes.XS]: '250px',
  [EModalSizes.SM]: '450px',
  [EModalSizes.MD]: '650px',
  [EModalSizes.LG]: '1200px',
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  open(
    modalComponent: ComponentType<any>,
    size: EModalSizes,
    data?: any,
    afterClosedCallback?: (result: any) => void
  ) {
    const dialogRef = this.dialog.open(modalComponent, {
      width: MODAL_SIZE[size],
      data,
    });

    if (afterClosedCallback) {
      dialogRef.afterClosed().subscribe((result) => {
        afterClosedCallback(result);
      });
    }
  }
}
