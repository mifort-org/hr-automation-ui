import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMode } from '@constants/notification';

export const NOTIFICATIONS_DURATION = {
  STANDART: 3000,
};
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public show(
    message: string,
    mode?: NotificationMode,
    duration: number = NOTIFICATIONS_DURATION.STANDART
  ) {
    this.snackBar.open(message, '', {
      verticalPosition: 'top',
      politeness: 'assertive',
      duration,
      panelClass: mode,
      horizontalPosition: 'right',
    });
  }
}
