import { overrideConfig } from './utils/override-config';

export default {
  'Given configuration property $opinionatedString is set to $opinionatedJSON'(
    key: string,
    value: unknown
  ): void {
    overrideConfig(key, value);
  },
};
