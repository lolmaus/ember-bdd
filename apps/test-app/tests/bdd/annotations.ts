import { setupApplicationTest } from 'ember-qunit';
import { setupStepsConfigEnvironment } from '@ember-bdd/steps-config-environment';
import { AnnotationsRecord } from '@ember-bdd/core';

const annotations: AnnotationsRecord = {
  setupApplicationTest,
  setupStepsConfigEnvironment,

  setupTestCustom(hooks, message: unknown) {
    hooks.beforeEach((assert) => {
      assert.true(typeof message === 'string', 'custom annotation is called with string argument');
    });
  },
};

export default annotations;
