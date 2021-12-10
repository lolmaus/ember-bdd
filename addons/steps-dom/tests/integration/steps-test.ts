/* eslint-disable prefer-const */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon, { SinonSpy } from 'sinon';
import steps from '@ember-bdd/steps-dom/test-support/steps';
import { findByLabel } from '@ember-bdd/core/test-support/dom-helpers';
import { TestContext } from 'ember-test-helpers';

module('Integration | Component | steps', function (hooks) {
  setupRenderingTest(hooks);

  module('When I click (?:on )?$emberBddLabel', function () {
    interface TestContextClick extends TestContext {
      action?: SinonSpy;
    }

    //

    test('click normally', async function (this: TestContextClick, assert) {
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
        /Expected `Button` to match 1 element\(s\), but 0 found/
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
        /Expected `Button` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('When I double click (?:on )?$emberBddLabel', function () {
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
          {{on "dblclick" this.action}}
        >
        </button>`);

      const tuple = findByLabel('Button');

      await steps['When I double click (?:on )?$emberBddLabel'](tuple);

      assert.ok(this.action?.calledOnce);
    });

    //

    test('crashes when no button is found', async function (this: TestContextClick, assert) {
      await render(hbs``);

      const tuple = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I double click (?:on )?$emberBddLabel'](tuple),
        /Expected `Button` to match 1 element\(s\), but 0 found/
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
        {{on "dblclick" this.action}}
      >
      </button>

      <button
        data-test-button
        type="button"
        {{on "dblclick" this.action}}
      >
      </button>`);

      const tuple = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I double click (?:on )?$emberBddLabel'](tuple),
        /Expected `Button` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('When I (?:fill|type) "(.*)" into $emberBddLabel', function () {
    test('Fill an input normally', async function (assert) {
      await render(hbs`
        <input data-test-field>
      `);

      const tuple = findByLabel('Field');

      await steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple);

      assert.dom(tuple[0][0]).hasValue('foo');
    });

    test('Fill a textarea normally', async function (assert) {
      await render(hbs`
        <textarea data-test-field></textarea>
      `);

      const tuple = findByLabel('Field');

      await steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple);

      assert.dom(tuple[0][0]).hasValue('foo');
    });

    test('Fill a contenteditable normally', async function (assert) {
      await render(hbs`
        <div contenteditable data-test-field></div>
      `);

      const tuple = findByLabel('Field');

      await steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple);

      assert.dom(tuple[0][0]).hasText('foo');
    });

    test('Fill an input inside given element', async function (assert) {
      await render(hbs`
        <div data-test-field>
          <input>
        </div>
      `);

      const tuple = findByLabel('Field');

      await steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple);

      assert.dom(find('input')).hasValue('foo');
    });

    test('Fill a textarea inside given element', async function (assert) {
      await render(hbs`
        <div data-test-field>
          <textarea></textarea>
        </div>
      `);

      const tuple = findByLabel('Field');

      await steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple);

      assert.dom(find('textarea')).hasValue('foo');
    });

    test('Fill a contenteditable inside given element', async function (assert) {
      await render(hbs`
        <div data-test-field>
          <div contenteditable></div>
        </div>
      `);

      const tuple = findByLabel('Field');

      await steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple);

      assert.dom(find('[contenteditable]')).hasText('foo');
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const tuple = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw when matching element is not editable and does not contain an editable', async function (assert) {
      await render(hbs`<div data-test-field></div>`);

      const tuple = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (?:fill|type) "(.*)" into $emberBddLabel']('foo', tuple),
        /Expected element to be fillable or have exactly one fillable child, but 0 fillable children found/
      );
    });
  });

  //

  module('When I move the mouse pointer into $emberBddLabel', function () {
    interface TestContextMouseEnter extends TestContext {
      action?: SinonSpy;
    }

    test('Normal', async function (this: TestContextMouseEnter, assert) {
      this.set('action', sinon.spy());

      await render(hbs`
        <div
          data-test-item
          {{on "mouseenter" this.action}}
        >
          f
        </div>
      `);

      const tuple = findByLabel('Item');

      await steps['When I move the mouse pointer into $emberBddLabel'](tuple);

      assert.equal(this.action!.callCount, 1);
    });
  });

  //

  module('Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel', function () {
    const cases = [
      { template: hbs`<div data-test-item></div>`, args: [undefined, '1'], error: false },
      { template: hbs`<div data-test-item></div>`, args: [undefined, ''], error: false },
      { template: hbs`<div></div>`, args: ['NO'], error: false },
      {
        template: hbs`<div data-test-item></div>`,
        args: ['no'],
        error: /expected (.+) to have a length of 0 but got 1/,
      },
      {
        template: hbs`<div data-test-item></div>`,
        args: [undefined, '0'],
        error: /expected (.+) to have a length of 0 but got 1/,
      },
      {
        template: hbs`<div data-test-item></div>`,
        args: [undefined, '2'],
        error: /expected (.+) to have a length of 2 but got 1/,
      },
      {
        template: hbs`<div data-test-item></div><div data-test-item></div>`,
        args: [undefined, '2'],
        error: false,
      },
      {
        template: hbs`<div data-test-item></div>`,
        args: ['NO', '2'],
        error: /Don't use NO and number at the same time/,
      },
    ];

    cases.forEach(({ template, args, error }, i) => {
      test(`Index ${i}`, async function (assert) {
        await render(template);

        const tuple = findByLabel('Item');

        const assertion = (): void => {
          steps['Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel'](
            args[0],
            args[1],
            tuple
          );
        };

        if (error) {
          assert.throws(assertion, error);
        } else {
          assertion();
          assert.expect(0);
        }
      });
    });
  });
});
