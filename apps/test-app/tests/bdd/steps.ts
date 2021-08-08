import { expect } from 'chai';
import { StepImplementationsRecord } from '@ember-bdd/core/test-support/types';
import stepsConfigEnvironment from '@ember-bdd/steps-config-environment/test-support/steps';
import stepsEmber from '@ember-bdd/steps-ember/test-support/steps';

// @ts-ignore
import config from 'ember-get-config';
import { get } from '@ember/object';

const steps: StepImplementationsRecord = {
  ...stepsConfigEnvironment,
  ...stepsEmber,

  'Given email "$email"'(email: string) {
    expect(email).match(/^.+?@.+?$/);
  },

  'Then (?:the )config/environment property $emberBddString should be $emberBddJson'(
    key: string,
    value: unknown
  ) {
    expect(get(config, key)).deep.equal(value);
  },
};

export default steps;
