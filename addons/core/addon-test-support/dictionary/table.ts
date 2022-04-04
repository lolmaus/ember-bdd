import { ConverterOpinionatedTuple } from '../types';
import yadda from 'yadda';

const $emberBddTable: ConverterOpinionatedTuple = [
  /([^\u0000]*)/, // eslint-disable-line no-control-regex
  function emberBddJsonConverter(strMaybeTable: string): Record<string, unknown> {
    let result: Record<string, unknown>;

    yadda.converters.table(
      strMaybeTable,
      // @ts-ignore Incorrect type
      (maybeError: Error | null, resultt: Record<string, unknown>) => {
        if (maybeError) {
          throw maybeError;
        }

        result = resultt;
      }
    );

    return result!;
  },
];

export default $emberBddTable;
