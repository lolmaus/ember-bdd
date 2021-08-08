import { overrideConfig } from './utils/override-config';

export default {
  'Given (?:the )config/environment property $emberBddString is set to $emberBddJson'(
    key: string,
    value: unknown
  ): void {
    overrideConfig(key, value);
  },
};
