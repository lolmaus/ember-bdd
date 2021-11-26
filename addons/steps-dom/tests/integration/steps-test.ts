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

      const collection = findByLabel('Button');

      await steps['When I click (?:on )?$emberBddLabel'](collection);

      assert.ok(this.action?.calledOnce);
    });

    //

    test('crashes when no button is found', async function (this: TestContextClick, assert) {
      await render(hbs``);

      const collection = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I click (?:on )?$emberBddLabel'](collection),
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

      const collection = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I click (?:on )?$emberBddLabel'](collection),
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

      const collection = findByLabel('Button');

      await steps['When I double click (?:on )?$emberBddLabel'](collection);

      assert.ok(this.action?.calledOnce);
    });

    //

    test('crashes when no button is found', async function (this: TestContextClick, assert) {
      await render(hbs``);

      const collection = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I double click (?:on )?$emberBddLabel'](collection),
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

      const collection = findByLabel('Button');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I double click (?:on )?$emberBddLabel'](collection),
        /Expected `Button` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('When I (?:fill|type) $emberBddString into $emberBddLabel', function () {
    test('Fill an input normally', async function (assert) {
      await render(hbs`
        <input data-test-field>
      `);

      const collection = findByLabel('Field');

      await steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection);

      assert.dom(collection.elements[0]).hasValue('foo');
    });

    test('Fill a textarea normally', async function (assert) {
      await render(hbs`
        <textarea data-test-field></textarea>
      `);

      const collection = findByLabel('Field');

      await steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection);

      assert.dom(collection.elements[0]).hasValue('foo');
    });

    test('Fill a contenteditable normally', async function (assert) {
      await render(hbs`
        <div contenteditable data-test-field></div>
      `);

      const collection = findByLabel('Field');

      await steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection);

      assert.dom(collection.elements[0]).hasText('foo');
    });

    test('Fill an input inside given element', async function (assert) {
      await render(hbs`
        <div data-test-field>
          <input>
        </div>
      `);

      const collection = findByLabel('Field');

      await steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection);

      assert.dom(find('input')).hasValue('foo');
    });

    test('Fill a textarea inside given element', async function (assert) {
      await render(hbs`
        <div data-test-field>
          <textarea></textarea>
        </div>
      `);

      const collection = findByLabel('Field');

      await steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection);

      assert.dom(find('textarea')).hasValue('foo');
    });

    test('Fill a contenteditable inside given element', async function (assert) {
      await render(hbs`
        <div data-test-field>
          <div contenteditable></div>
        </div>
      `);

      const collection = findByLabel('Field');

      await steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection);

      assert.dom(find('[contenteditable]')).hasText('foo');
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw when matching element is not editable and does not contain an editable', async function (assert) {
      await render(hbs`<div data-test-field></div>`);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (?:fill|type) $emberBddString into $emberBddLabel']('foo', collection),
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

      const collection = findByLabel('Item');

      await steps['When I move the mouse pointer into $emberBddLabel'](collection);

      assert.equal(this.action!.callCount, 1);
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I move the mouse pointer into $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw on multiple matching elements', async function (assert) {
      await render(hbs`
        <div data-test-field></div>
        <div data-test-field></div>
      `);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I move the mouse pointer into $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('When I focus into $emberBddLabel', function () {
    test('Normal', async function (assert) {
      await render(hbs`
        <button data-test-button type="button">
          f
        </button>
      `);

      const collection = findByLabel('Button');

      await steps['When I focus into $emberBddLabel'](collection);

      assert.equal(document.activeElement, collection.elements[0]);
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I focus into $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw on multiple matching elements', async function (assert) {
      await render(hbs`
        <div data-test-field></div>
        <div data-test-field></div>
      `);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I focus into $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel', function () {
    test('Normal', async function (assert) {
      await render(hbs`
        <button data-test-button type="button">
          f
        </button>
      `);

      const collection = findByLabel('Button');
      const [element] = collection.elements;

      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected element to be an HTMLElement');
      }

      element.focus();

      await steps['When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel'](collection);

      assert.notEqual(document.activeElement, collection.elements[0]);
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw on multiple matching elements', async function (assert) {
      await render(hbs`
        <div data-test-field></div>
        <div data-test-field></div>
      `);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('When I move the mouse pointer out of $emberBddLabel', function () {
    interface TestContextMouseEnter extends TestContext {
      action?: SinonSpy;
    }

    test('Normal', async function (this: TestContextMouseEnter, assert) {
      this.set('action', sinon.spy());

      await render(hbs`
        <div
          data-test-item
          {{on "mouseleave" this.action}}
        >
          f
        </div>
      `);

      const collection = findByLabel('Item');

      await steps['When I move the mouse pointer out of $emberBddLabel'](collection);

      assert.equal(this.action!.callCount, 1);
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I move the mouse pointer out of $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw on multiple matching elements', async function (assert) {
      await render(hbs`
        <div data-test-field></div>
        <div data-test-field></div>
      `);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I move the mouse pointer out of $emberBddLabel'](collection),
        /Expected `Field` to match 1 element\(s\), but 2 found/
      );
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

        const collection = findByLabel('Item');

        const assertion = (): void => {
          steps['Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel'](
            args[0] as 'NO ' | 'no ' | undefined,
            args[1],
            collection
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

  //

  module(
    'Then $emberBddLabel should (not |NOT )?(?:have text|say|be) $emberBddString',
    function () {
      const cases = [
        { template: hbs`<div data-test-item></div>`, args: [undefined, ''], error: false },
        { template: hbs`<div data-test-item>foo</div>`, args: [undefined, 'foo'], error: false },
        { template: hbs`<div data-test-item>foo</div>`, args: ['NOT ', 'bar'], error: false },
        {
          template: hbs`<div data-test-item>  foo  </div>`,
          args: [undefined, 'foo'],
          error: false,
        },
        { template: hbs`<div></div>`, args: ['NOT ', ''], error: false },
        {
          template: hbs`<div data-test-item></div>`,
          args: ['not ', ''],
          error: /expected (.+) not to have trimmed text ''/,
        },
        { template: hbs`<input data-test-item>`, args: [undefined, ''], error: false },
        {
          template: hbs`<input data-test-item value="foo">`,
          args: [undefined, 'foo'],
          error: false,
        },
        { template: hbs`<input data-test-item value="foo">`, args: ['NOT ', 'bar'], error: false },
        {
          template: hbs`<input data-test-item value="  foo  ">`,
          args: [undefined, 'foo'],
          error: /expected (.+) to have value 'foo', but the value was ' {2}foo {2}'/,
        },
        { template: hbs`<div></div>`, args: ['NOT ', ''], error: false },
        {
          template: hbs`<div data-test-item></div>`,
          args: ['not ', ''],
          error: /expected (.+) not to have trimmed text ''/,
        },
        {
          template: hbs`<div></div>`,
          args: [undefined, '0'],
          error: /Expected `Item` to match 1 element\(s\), but 0 found/,
        },
        {
          template: hbs`<div data-test-item></div><div data-test-item></div>`,
          args: [undefined, '2'],
          error: /Expected `Item` to match 1 element\(s\), but 2 found/,
        },
      ];

      cases.forEach(({ template, args, error }, i) => {
        test(`Index ${i}`, async function (assert) {
          await render(template);

          const collection = findByLabel('Item');

          const assertion = (): void => {
            steps['Then $emberBddLabel should (not |NOT )?(?:have text|say|be) $emberBddString'](
              collection,
              args[0] as 'not ' | 'NOT ' | undefined,
              args[1] as string
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
    }
  );

  //

  module('Then $emberBddLabel should (not |NOT )?have HTML class $emberBddString', function () {
    const cases = [
      {
        template: hbs`<div data-test-item class="foo"></div>`,
        args: [undefined, 'foo'],
        error: false,
      },
      {
        template: hbs`<div data-test-item class="foo"></div>`,
        args: ['NOT ', 'bar'],
        error: false,
      },
      { template: hbs`<div></div>`, args: ['NOT ', ''], error: false },
      {
        template: hbs`<div data-test-item></div>`,
        args: ['not ', ''],
        error: /Class cannot be empty string/,
      },
      {
        template: hbs`<input data-test-item class="  foo  ">`,
        args: [undefined, 'foo'],
        error: false,
      },
      {
        template: hbs`<div data-test-item class="foo"></div>`,
        args: [undefined, ''],
        error: /Class cannot be empty string/,
      },
      {
        template: hbs`<div></div>`,
        args: [undefined, '0'],
        error: /Expected `Item` to match 1 element\(s\), but 0 found/,
      },
      {
        template: hbs`<div data-test-item></div><div data-test-item></div>`,
        args: [undefined, '2'],
        error: /Expected `Item` to match 1 element\(s\), but 2 found/,
      },
    ];

    cases.forEach(({ template, args, error }, i) => {
      test(`Index ${i}`, async function (assert) {
        await render(template);

        const collection = findByLabel('Item');

        const assertion = (): void => {
          steps['Then $emberBddLabel should (not |NOT )?have HTML class $emberBddString'](
            collection,
            args[0] as 'not ' | 'NOT ' | undefined,
            args[1] as string
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

  //

  module('When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel', function () {
    test('Selecting a checkbox', async function (assert) {
      await render(hbs`<input type="checkbox" data-test-control>`);

      const collection = findByLabel('Control');

      await steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
        undefined,
        collection
      );

      if (!(collection.elements[0] instanceof HTMLInputElement)) {
        throw new Error('Expected collection to be an HTMLInputElement');
      }

      assert.true(collection.elements[0].checked);
    });

    test('Selecting a radio', async function (assert) {
      await render(hbs`<input type="radio" data-test-control>`);

      const collection = findByLabel('Control');

      await steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
        undefined,
        collection
      );

      if (!(collection.elements[0] instanceof HTMLInputElement)) {
        throw new Error('Expected collection to be an HTMLInputElement');
      }

      assert.true(collection.elements[0].checked);
    });

    test('Deselecting a checkbox', async function (assert) {
      await render(hbs`<input type="checkbox" data-test-control checked>`);

      const collection = findByLabel('Control');

      await steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
        'de',
        collection
      );

      if (!(collection.elements[0] instanceof HTMLInputElement)) {
        throw new Error('Expected collection to be an HTMLInputElement');
      }

      assert.false(collection.elements[0].checked);
    });

    test('Should throw when deselecting a radio', async function (assert) {
      await render(hbs`<input type="radio" data-test-control>`);

      const collection = findByLabel('Control');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
          'de',
          collection
        ),
        /A radio button cannot be deselected/
      );
    });

    test('Should throw when deselecting an unchecked checkbox', async function (assert) {
      await render(hbs`<input type="checkbox" data-test-control>`);

      const collection = findByLabel('Control');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
          'de',
          collection
        ),
        /Checkbox has to be checked in order to uncheck it/
      );
    });

    test('Should throw when selecting a checked checkbox', async function (assert) {
      await render(hbs`<input type="checkbox" checked data-test-control>`);

      const collection = findByLabel('Control');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
          undefined,
          collection
        ),
        /Checkbox has to be unchecked in order to check it/
      );
    });

    test('Should throw when selecting a checked radio', async function (assert) {
      await render(hbs`<input type="radio" checked data-test-control>`);

      const collection = findByLabel('Control');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
          undefined,
          collection
        ),
        /Checkbox has to be unchecked in order to check it/
      );
    });

    test('Should throw on missing element', async function (assert) {
      await render(hbs``);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
          undefined,
          collection
        ),
        /Expected `Field` to match 1 element\(s\), but 0 found/
      );
    });

    test('Should throw on multiple matching elements', async function (assert) {
      await render(hbs`
        <div data-test-field></div>
        <div data-test-field></div>
      `);

      const collection = findByLabel('Field');

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      assert.rejects(
        steps['When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'](
          undefined,
          collection
        ),
        /Expected `Field` to match 1 element\(s\), but 2 found/
      );
    });
  });

  //

  module('Then $emberBddLabel should (not |NOT )?be checked', function () {
    const cases = [
      {
        template: hbs`<input data-test-item checked type="checkbox">`,
        args: [undefined],
        error: false,
      },
      {
        template: hbs`<input data-test-item checked type="radio">`,
        args: [undefined],
        error: false,
      },
      {
        template: hbs`<input data-test-item type="checkbox">`,
        args: ['not '],
        error: false,
      },
      {
        template: hbs`<input data-test-item type="radio">`,
        args: ['not '],
        error: false,
      },
      {
        template: hbs`<input data-test-item checked type="checkbox">`,
        args: ['not '],
        error: /expected input\[data-test-item]\[checked]\[type="checkbox"] to not be checked/,
      },
      {
        template: hbs`<input data-test-item checked type="radio">`,
        args: ['not '],
        error: /expected input\[data-test-item]\[checked]\[type="radio"] to not be checked/,
      },
      {
        template: hbs`<input data-test-item type="checkbox">`,
        args: [undefined],
        error: /expected input\[data-test-item]\[type="checkbox"] to be checked/,
      },
      {
        template: hbs`<input data-test-item type="radio">`,
        args: [undefined],
        error: /expected input\[data-test-item]\[type="radio"] to be checked/,
      },
      {
        template: hbs`<div></div>`,
        args: [undefined],
        error: /Expected `Item` to match 1 element\(s\), but 0 found/,
      },
      {
        template: hbs`<div data-test-item></div><div data-test-item></div>`,
        args: [undefined],
        error: /Expected `Item` to match 1 element\(s\), but 2 found/,
      },
    ];

    cases.forEach(({ template, args, error }, i) => {
      test(`Index ${i}`, async function (assert) {
        await render(template);

        const collection = findByLabel('Item');

        const assertion = (): void => {
          steps['Then $emberBddLabel should (not |NOT )?be checked'](
            collection,
            args[0] as 'not ' | 'NOT ' | undefined
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
