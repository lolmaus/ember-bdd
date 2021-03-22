import HttpResponseError from './http-response';

/**
 * Error class for Access Denied (401) errors
 *
 * @class AccessDenied
 * @namespace Errors
 * @param message
 * @param statusCode
 * @constructor
 * @public
 */
export default class AccessDeniedError extends HttpResponseError {
  constructor(message = 'Access denied!', statusCode = 401) {
    super(message, statusCode);
    this.messageKey = 'unauthorized';
  }
}
