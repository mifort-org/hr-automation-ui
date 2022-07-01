import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ENotificationMode } from '@constants/notification';

const NOTIFICATIONS_DURATION = {
  STANDART: 3000,
};
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    mode?: ENotificationMode,
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
