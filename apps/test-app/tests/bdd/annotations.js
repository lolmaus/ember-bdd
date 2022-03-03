import { setupApplicationTest } from 'ember-qunit';
import { setupStepsConfigEnvironment } from '@ember-bdd/steps-config-environment';

export default {
  setupApplicationTest,
  setupStepsConfigEnvironment,

  setupTestCustom(hooks, message) {
    hooks.beforeEach(() => {});
  },
};
