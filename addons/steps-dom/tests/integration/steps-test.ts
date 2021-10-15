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

    //

    test('click normally', async function (this: TestContextClick, assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('action', sinon.spy());

      await render(hbs`
        <button
          data-test-button
          type="button"
          {{on "click" this.action}}
        >
        </button>`);

      const tuple = findByLabel('Button');

      await steps['When I click (?:on )?$emberBddLabel'](tuple);

      assert.ok(this.action?.calledOnce);
    });

    //

    test('crashes when no button is found', async function (this: TestContextClick, assert) {
      await render(hbs``);

      const tuple = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I click (?:on )?$emberBddLabel'](tuple),
        /Expected 1 element\(s\), but 0 found/
      );
    });

    //

    test('crashes when there are multiple buttons', async function (this: TestContextClick, assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('action', sinon.spy());

      await render(hbs`
      <button
        data-test-button
        type="button"
        {{on "click" this.action}}
      >
      </button>

      <button
        data-test-button
        type="button"
        {{on "click" this.action}}
      >
      </button>`);

      const tuple = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I click (?:on )?$emberBddLabel'](tuple),
        /Expected 1 element\(s\), but 2 found/
      );
    });
  });
});
