import { ConverterOpinionatedTuple } from '../types';

const $emberBddJson: ConverterOpinionatedTuple = [
  /([^\u0000]*)/, // eslint-disable-line no-control-regex
  function emberBddJsonConverter(strMaybeJsson: string): unknown {
    try {
      return JSON.parse(strMaybeJsson);
    } catch (e) {
      throw new Error(`Invalid JSON:\n${strMaybeJsson}`);
    }
  },
];

export default $emberBddJson;
