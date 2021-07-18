// @ts-ignore Missing types
import config from 'ember-get-config';
import { get, set } from '@ember/object';

export const overriddenConfigProps: Record<string, unknown> = {};

export function overrideConfig(key: string, value: unknown): void {
  overriddenConfigProps[key] = get(config, key);
  set(config, key, value);
}

export function restoreOriginalConfig(): void {
  Object.getOwnPropertyNames(overriddenConfigProps).forEach((key) => {
    set(config as Record<string, unknown>, key, overriddenConfigProps[key]);
    delete overriddenConfigProps[key];
  });
}
