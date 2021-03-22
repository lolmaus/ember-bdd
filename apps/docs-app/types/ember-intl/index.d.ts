declare module 'ember-intl' {
  import ComputedProperty from '@ember/object/computed';

  export const translationMacro: ComputedProperty;
}

declare module 'ember-intl/services/intl' {
  import Service from '@ember/service';

  export interface FormatNumberOptions {
    localeMatcher?: 'lookup' | 'best fit';
    style?: 'decimal' | 'currency' | 'percent';
    currency?: string;
    currencyDisplay?: 'symbol' | 'code' | 'name';
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
  }
  export default class Intl extends Service {
    t(key: string, options?: any): string; // eslint-disable-line @typescript-eslint/no-explicit-any
    formatNumber(value: number, options?: FormatNumberOptions): string;
    setLocale(locale: string | string[]);
    exists(key: string, locale?: string | string[]): boolean;
    lookup(key: string, locale?: string | string[], options?: any): string; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}
