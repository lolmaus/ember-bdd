import { expect } from 'chai';
import { StepImplementationsRecord } from '@ember-bdd/core';
import { steps as stepsConfigEnvironment } from '@ember-bdd/steps-config-environment';
import { steps as stepsEmber } from '@ember-bdd/steps-ember';
import { steps as stepsDom } from '@ember-bdd/steps-dom';

// @ts-ignore
import config from 'ember-get-config';
import { get } from '@ember/object';

const steps: StepImplementationsRecord = {
  ...stepsConfigEnvironment,
  ...stepsEmber,
  ...stepsDom,

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
