import { ConverterOpinionatedTuple } from '../types';

const $emberBddString: ConverterOpinionatedTuple = [
  /(\d+)/,
  function emberBddNumberConverter(strNumber: string): number {
    return parseInt(strNumber, 10);
  },
];

export default $emberBddString;
