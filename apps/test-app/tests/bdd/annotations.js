import { setupApplicationTest } from 'ember-qunit';
import setupStepsConfigEnvironment from '@ember-bdd/steps-config-environment/test-support/setup';

export default {
  setupApplicationTest,
  setupStepsConfigEnvironment,

  setupTestCustom(hooks, message) {
    hooks.beforeEach(() => console.log(message));
  },
};
