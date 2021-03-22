import HttpResponseError from './http-response';

/**
 * Error class for Not Found errors (404)
 *
 * @class Credentials
 * @namespace Errors
 * @param message
 * @param statusCode
 * @constructor
 * @public
 */
export default class NotFoundError extends HttpResponseError {
  constructor(message = 'Not found!', statusCode = 404) {
    super(message, statusCode);
    this.messageKey = 'not_found';
  }
}
