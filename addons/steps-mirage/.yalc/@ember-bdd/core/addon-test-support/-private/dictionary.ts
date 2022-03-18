import yadda, { Dictionary } from 'yadda';
import { wrapWithNodeStyleLengthSafe } from './utils';
import { assert } from '@ember/debug';
import { isConverter, isConverterSimple, isConverterTuple } from '../types';
import { getDictionary } from '@ember-bdd/core';

export function generateDictionary(): Dictionary {
  const dictionary: Dictionary = new yadda.Dictionary();
  const converters = getDictionary();

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
