import { overrideConfig } from './utils/override-config';

export default {
  /**
   * Sets a config/environment value for testing purposes.
   *
   * @param key Quoted string. May contain dots for nesting, but all parents must pre-exist.
   * @param value a JSON-like structure
   */
  'Given (?:the )config/environment property $emberBddString is set to $emberBddJson'(
    key: string,
    value: unknown
  ): void {
    overrideConfig(key, value);
  },
};
