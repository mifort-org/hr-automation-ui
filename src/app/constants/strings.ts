import { Observable } from 'rxjs';
import { ENotificationMode } from '@constants/notification';
import { NotificationService } from '@services/notification.service';
import { ERROR_STATUS_CODES } from './errorStatusCode';

export enum EModalSizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export const ERROR_MESSAGE = {
  [ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR]: '500 Internal Server Error. Please, try later',
};

export function defaultErrorhandler(
  notification: NotificationService,
  error: { status: number },
  caught: Observable<any>
) {
  notification.show(
    ERROR_MESSAGE[error?.status || ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR],
    ENotificationMode.ERROR
  );
  return caught;
}

export const TEXT_FIELD_ERRORS = {
  IDENTIFIER_FIELD: 'Please fill one of identified field (*)',
  FORM_INVALID: 'Please, check out the form inputs',
};

export enum DialogModalIds {
  addCommentModal = 'add-comment-modal',
}
