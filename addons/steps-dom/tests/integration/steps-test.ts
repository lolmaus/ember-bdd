/* eslint-disable prefer-const */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon, { SinonSpy } from 'sinon';
import steps from '@ember-bdd/steps-dom/test-support/steps';
import { findByLabel } from '@ember-bdd/core/test-support/dom-helpers';
import { TestContext } from 'ember-test-helpers';

module('Integration | Component | steps', function (hooks) {
  setupRenderingTest(hooks);

  module('click', function () {
    interface TestContextClick extends TestContext {
      action?: SinonSpy;
    }

    test('click normally', async function (this: TestContextClick, assert) {
      let m;

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('action', sinon.spy());

      await render(hbs`
        <a
          data-test-button
          href
          {{on "click" this.action}}
        >
        </a>`);

      const tuple = findByLabel('Button');

      await steps['When I click (?:on )?$opinionatedElement'](tuple);

      m = "Action should've been called";
      assert.ok(this.action?.calledOnce, m);
    });
  });
});
