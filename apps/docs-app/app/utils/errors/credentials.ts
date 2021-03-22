import AccessDenied from './access-denied';

/**
 * Error class for wrong credentials
 *
 * @class Credentials
 * @namespace Errors
 * @param message
 * @param statusCode
 * @constructor
 * @public
 */
export default class CredentialsError extends AccessDenied {
  constructor(message = 'Wrong credentials!') {
    super(message);
    this.messageKey = 'credentials';
  }
}
