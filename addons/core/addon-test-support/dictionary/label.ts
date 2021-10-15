import { findByLabel, LabelTuple } from '../dom-helpers';
import { REGEX_LABEL } from '../regex';
import { ConverterOpinionatedTuple } from '../types';

const $emberBddLabel: ConverterOpinionatedTuple = [
  REGEX_LABEL,
  function emberBddLabelConverter(label: string): LabelTuple {
    return findByLabel(label);
  },
];

export default $emberBddLabel;
