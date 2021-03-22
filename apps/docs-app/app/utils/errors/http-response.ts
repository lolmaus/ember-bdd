import EmberError from '@ember/error';

/**
 * Base error class for errors based on HTTP status code
 *
 * @class HttpResponse
 * @namespace Errors
 * @param message
 * @param statusCode
 * @constructor
 * @public
 */
export default class HttpResponseError extends EmberError {
  messageKey?: string;
  statusCode: number;

  constructor(message: string, statusCode = 200) {
    super(message);
    this.statusCode = statusCode;
  }
}
