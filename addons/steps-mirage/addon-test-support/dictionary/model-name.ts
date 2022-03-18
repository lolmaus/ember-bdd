import { ConverterOpinionatedTuple } from '@ember-bdd/core';
import { assert } from '@ember/debug';
import { camelize, dasherize } from '@ember/string';
import { pluralize, singularize } from 'ember-inflector';

export const STR_STRING_WITH_ESCAPE = '"((?:[^"\\\\]|\\\\.)*)"';
export const REGEX_STRING_WITH_ESCAPE = new RegExp(STR_STRING_WITH_ESCAPE);

const $emberBddMirageModelName: ConverterOpinionatedTuple = [
  REGEX_STRING_WITH_ESCAPE,
  function emberBddStringConverter(strUnescaped: string): string {
    const modelNameRaw = strUnescaped.replace(/\\"/g, '"');

    const modelName = singularize(dasherize(modelNameRaw));
    const modelNamePlural = pluralize(camelize(modelNameRaw));

    assert(`Collection ${modelNamePlural} does not exist in Mirage`, server.db[modelNamePlural]);

    return modelName;
  },
];

export default $emberBddMirageModelName;
