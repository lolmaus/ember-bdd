import {
  overrideConfig,
  restoreOriginalConfig,
} from '@ember-bdd/steps-config-environment/test-support/utils/override-config';
import { module, test } from 'qunit';

import setupStepsConfigEnvironment from '@ember-bdd/steps-config-environment/test-support/setup';

// @ts-ignore
import config from 'ember-get-config';

module('Unit | Utility | overrideConfig', function (/* hooks */) {
  module('overrideConfig', function (hooks) {
    setupStepsConfigEnvironment(hooks);

    // Two iterations of the same this to ensure that the cleanup is done correctly
    [1, 2].forEach((iOneIndexed) => {
      test(iOneIndexed.toString(), function (assert) {
        const bar = {};
        const conf = config as Record<string, unknown>;

        assert.notOk(conf.foo);

        overrideConfig('foo', bar);

        assert.equal(conf.foo, bar);
      });
    });
  });

  test('restoreOriginalConfig', function (assert) {
    const bar = {};
    const conf = config as Record<string, unknown>;

    assert.notOk(conf.foo);

    overrideConfig('foo', bar);

    assert.equal(conf.foo, bar);

    restoreOriginalConfig();

    assert.notOk(conf.foo);
  });
});
