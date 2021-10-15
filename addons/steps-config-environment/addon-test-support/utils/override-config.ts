/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import { get, set } from '@ember/object';

// @ts-ignore Missing types
import config from 'ember-get-config';

export const overriddenConfigProps: Map<string, unknown> = new Map();

export function overrideConfig(key: string, value: unknown): void {
  if (!overriddenConfigProps.has(key)) {
    overriddenConfigProps.set(key, get(config, key));
  }

  set(config as Record<string, unknown>, key, value);
}

export function overrideFeatureFlag(key: string, value: unknown): void {
  const featureFlags = config.featureFlags ?? {};

  if (!overriddenConfigProps.has(key)) {
    overriddenConfigProps.set('featureFlags', featureFlags);
  }

  set(config.featureFlags as Record<string, unknown>, key, value);
}

export function restoreOriginalConfig(): void {
  for (const [key, value] of overriddenConfigProps) {
    set(config as Record<string, unknown>, key, value);
    overriddenConfigProps.delete(key);
  }
}

export function setupStepsConfigEnvironment(hooks: NestedHooks): void {
  hooks.afterEach(restoreOriginalConfig);
}

export default {
  'Given (?:the )?config/environment property $opinionatedString is set to $opinionatedJSON'(
    key: string,
    value: unknown
  ): void {
    overrideConfig(key, value);
  },

  'Given (?:the )?feature flag $opinionatedString is (enabled|disabled)'(
    key: string,
    stateStr: 'enabled' | 'disabled'
  ): void {
    const state = stateStr === 'enabled';

    overrideFeatureFlag(key, state);
  },
};
