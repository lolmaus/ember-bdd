import { Collection, findByLabel } from '../dom-helpers';
import { REGEX_LABEL } from '../regex';
import { ConverterOpinionatedTuple } from '../types';

const $emberBddLabel: ConverterOpinionatedTuple = [
  REGEX_LABEL,
  function emberBddLabelConverter(label: string): Collection {
    return findByLabel(label);
  },
];

export default $emberBddLabel;
