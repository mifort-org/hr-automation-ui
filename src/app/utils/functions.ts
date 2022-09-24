import { throwError } from 'rxjs';
import { NotificationService } from '@services/notification.service';
import { ERROR_STATUS_CODES } from '@constants/errorStatusCode';
import { NotificationMode } from '@constants/notification';
import { ERROR_MESSAGE } from '@constants/strings';

export const defaultErrorhandler = (
  notification: NotificationService,
  error: { status: number }
) => {
  notification.show(
    ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
    NotificationMode.ERROR
  );
  return throwError('error');
};
