import Intl from 'ember-intl/services/intl';
import EmberError from '@ember/error';
import AccessDeniedError from './errors/access-denied';
import CredentialsError from './errors/credentials';
import HttpResponseError from './errors/http-response';
import NotFoundError from './errors/not-found';
import OfflineError from './errors/offline';
import AdapterError, {
  UnauthorizedError as DataUnauthorizedError,
  ForbiddenError as DataForbiddenError,
  NotFoundError as DataNotFoundError,
  ServerError as DataServerError,
} from '@ember-data/adapter/error';

// eslint-disable-next-line @typescript-eslint/ban-types
const ErrorMapping: [Function, string][] = [
  [DataUnauthorizedError, 'unauthorized'],
  [DataForbiddenError, 'forbidden'],
  [DataNotFoundError, 'not_found'],
  [DataServerError, 'server_error'],
];

export type AnyError =
  | EmberError
  | DataUnauthorizedError
  | DataForbiddenError
  | DataNotFoundError
  | DataServerError
  | AccessDeniedError
  | CredentialsError
  | HttpResponseError
  | NotFoundError
  | OfflineError;

export function errorTranslationKey(
  intl: Intl,
  error: AnyError,
  keyPrefix = 'exceptions'
): string | void {
  const rawMessage = 'message' in error ? error.message : String(error);
  let key = `${keyPrefix}.${rawMessage}`;

  // try translation of error.message
  if (intl.exists(key)) {
    return key;
  }

  // check if error is an ember-data error with a known mapping
  if (error instanceof AdapterError) {
    const found = ErrorMapping.find(([klass]) => error instanceof klass);
    if (found) {
      key = `${keyPrefix}.${found[1]}`;
      if (intl.exists(key)) {
        return key;
      }
    }
  }

  // try translation of error.messageKey
  if ('messageKey' in error) {
    key = `${keyPrefix}.${error.messageKey ?? ''}`;
    if (intl.exists(key)) {
      return key;
    }
  }
}

export default function translateError(
  intl: Intl,
  error: AnyError,
  keyPrefix = 'exceptions'
): string {
  const key = errorTranslationKey(intl, error, keyPrefix);

  if (key) {
    return intl.t(key);
  }

  const rawMessage = 'message' in error ? error.message : String(error);
  return rawMessage;
}
