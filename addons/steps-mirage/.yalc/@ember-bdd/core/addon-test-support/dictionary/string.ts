import { ConverterOpinionatedTuple } from '../types';

export const STR_STRING_WITH_ESCAPE = '"((?:[^"\\\\]|\\\\.)*)"';
export const REGEX_STRING_WITH_ESCAPE = new RegExp(STR_STRING_WITH_ESCAPE);

const $emberBddString: ConverterOpinionatedTuple = [
  REGEX_STRING_WITH_ESCAPE,
  function emberBddStringConverter(strUnescaped: string): string {
    return strUnescaped.replace(/\\"/g, '"');
  },
];

export default $emberBddString;
