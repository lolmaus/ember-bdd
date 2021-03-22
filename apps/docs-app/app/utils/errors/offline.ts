import EmberError from '@ember/error';

/**
 * Error class if network connection is lost
 *
 * @class Offline
 * @namespace Errors
 * @param message
 * @param statusCode
 * @constructor
 * @public
 */
export default class OfflineError extends EmberError {
  messageKey: string;

  constructor(message = 'No internet connection. Try again later!') {
    super(message);
    this.messageKey = 'connection_lost';
  }
}
