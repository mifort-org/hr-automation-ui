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

export const TEXT_FIELD_ERRORS = {
  IDENTIFIER_FIELD: 'Please fill one of identified field (*)',
};
