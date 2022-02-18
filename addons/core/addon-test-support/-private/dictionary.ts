import yadda, { Dictionary } from 'yadda';
import { wrapWithNodeStyleLengthSafe } from './utils';
import requireModule from 'ember-require-module';
import { assert } from '@ember/debug';
import { isConverter, isConverterSimple, isConvertersRecord, isConverterTuple } from '../types';

export function generateDictionary(): Dictionary {
  const dictionary: Dictionary = new yadda.Dictionary();
  const converters = requireModule('@ember-bdd/core/app/dictionary') ?? {};

  assert(
    'Expected `tests/bdd/annotations.js` to have a default export with an object of ember-bdd converters.',
    isConvertersRecord(converters)
  );

  if (converters) {
    Object.keys(converters).forEach((key) => {
      const converter = converters[key];
      assert(`Converter ${key} is defined incorrectly.`, isConverter(converter));

      if (key[0] === '$') {
        key = key.slice(1);
      }

      if (isConverterTuple(converter)) {
        dictionary.define(key, converter[0], wrapWithNodeStyleLengthSafe(converter[1])); // eslint-disable-line @typescript-eslint/no-misused-promises
      } else if (isConverterSimple(converter)) {
        dictionary.define(key, converter);
      }
    });
  }

  return dictionary;
}
