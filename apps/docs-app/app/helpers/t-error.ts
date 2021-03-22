import Helper from '@ember/component/helper';
import translateError, { AnyError } from 'docs-app/utils/t-error';
import { inject as service } from '@ember/service';
import Intl from 'ember-intl/services/intl';

export default class TranslateError extends Helper {
  @service
  intl!: Intl;

  compute([error]: AnyError[]): string | null {
    return error ? translateError(this.intl, error) : null;
  }
}
