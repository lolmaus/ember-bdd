import { setupApplicationTest } from 'ember-qunit';
import { setupStepsConfigEnvironment } from '@ember-bdd/steps-config-environment';
import { AnnotationsRecord } from '@ember-bdd/core';

// @ts-ignore Missing type
import { setupMirage } from 'ember-cli-mirage/test-support';

const annotations: AnnotationsRecord = {
  setupApplicationTest,
  setupStepsConfigEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  setupMirage,

  setupTestCustom(hooks, message: unknown) {
    hooks.beforeEach((assert) => {
      assert.true(typeof message === 'string', 'custom annotation is called with string argument');
    });
  },
};

export default annotations;
