import { ConvertersOpinionatedRecord, isConvertersRecord } from '@ember-bdd/core/types';
import { assert } from '@ember/debug';

export { default as $emberBddInt } from './dictionary/int';
export { default as $emberBddJson } from './dictionary/json';
export { default as $emberBddLabel } from './dictionary/label';
export { default as $emberBddString } from './dictionary/string';

let _dictionary: ConvertersOpinionatedRecord | undefined;

export function setupDictionary(dictionary: ConvertersOpinionatedRecord): void {
  assert('You must not call `setupDictionary()` twice!', !_dictionary);
  assert(
    'Expected an object with ember-bdd converters passed to `setupDictionary()`!',
    isConvertersRecord(dictionary)
  );

  _dictionary = dictionary;
}

export function getDictionary(): ConvertersOpinionatedRecord {
  assert('You must call `setupDictionary()` before running any ember-bdd tests!', _dictionary);
  return _dictionary;
}
