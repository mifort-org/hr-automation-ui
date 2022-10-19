import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMode } from '../constants/notification';
import { NOTIFICATIONS_DURATION, NotificationService } from './notification.service';

describe('NotificationService', () => {
  let spectator: SpectatorService<NotificationService>;
  let snackBar: MatSnackBar;
  let snackBarSpy: jest.SpyInstance;
  const snackBarOptions = {
    verticalPosition: 'top',
    politeness: 'assertive',
    duration: NOTIFICATIONS_DURATION.STANDART,
    panelClass: NotificationMode.SUCCESS,
    horizontalPosition: 'right',
  };
  const createService = createServiceFactory({
    service: NotificationService,
    mocks: [MatSnackBar],
  });

  beforeEach(() => {
    spectator = createService();
    snackBar = spectator.inject(MatSnackBar);
    snackBarSpy = jest.spyOn(snackBar, 'open');
  });

  describe('show method', () => {
    it('should open snackbar with standard time', () => {
      spectator.service.show('message', NotificationMode.SUCCESS);
      expect(snackBarSpy).toHaveBeenCalledWith('message', '', {
        ...snackBarOptions,
        duration: NOTIFICATIONS_DURATION.STANDART,
      });
    });

    it('should open snackbar with non standard time', () => {
      const duration = 5;
      spectator.service.show('message', NotificationMode.SUCCESS, duration);
      expect(snackBarSpy).toHaveBeenCalledWith('message', '', { ...snackBarOptions, duration });
    });
  });
});
