import { expect } from 'chai';
import { click, doubleClick, fillIn, triggerEvent } from '@ember/test-helpers';
import { findEditable, LabelTuple } from '@ember-bdd/core/test-support/dom-helpers';

// @ts-ignore Missing type
import isFormControl from '@ember/test-helpers/dom/-is-form-control';

function assertLength(collection: Array<unknown>, label: string, length = 1): void {
  expect(collection).to.have.length(
    length,
    `Expected \`${label}\` to match ${length} element(s), but ${collection.length} found`
  );
}

export default {
  async 'When I click (?:on )?$emberBddLabel'([
    collection,
    label /*, selector */,
  ]: LabelTuple): Promise<void> {
    assertLength(collection, label);

    const [element] = collection;

    // @ts-ignore An innocent check, only some HTML elements have this property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!isFormControl(element) || !element.disabled) {
      await click(element);
    }
  },

  async 'When I double click (?:on )?$emberBddLabel'([
    collection,
    label /* , selector */,
  ]: LabelTuple): Promise<void> {
    assertLength(collection, label);

    const [element] = collection;

    // @ts-ignore An innocent check, only some HTML elements have this property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!isFormControl(element) || !element.disabled) {
      await doubleClick(element);
    }
  },

  async 'When I (?:fill|type) "(.*)" into $emberBddLabel'(
    text: string,
    [collection, label /*, selector */]: LabelTuple
  ): Promise<void> {
    assertLength(collection, label);

    const element = collection[0];
    const target = findEditable(element, true, false);

    return fillIn(target, text);
  },

  //

  async 'When I move the mouse pointer into $emberBddLabel'([
    collection,
    label /*, selector */,
  ]: LabelTuple): Promise<void> {
    assertLength(collection, label);

    return triggerEvent(collection[0], 'mouseeenter');
  },

  //

  // 'When I move the mouse pointer out of $emberBddLabel'([collection /* , label, selector */]) {
  //   assert(`Expected a single element, but ${collection.length} found`, collection.length === 1);
  //   return triggerEvent(collection[0], 'mouseeleave');
  // },

  //

  'Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel'(
    no: string | undefined,
    countStr: string | undefined,
    [collection /* , label, selector */]: LabelTuple
  ): void {
    expect(no && countStr, "Don't use NO and number at the same time").not.ok;

    // prettier-ignore
    const count =
      no       ? 0 :
      countStr ? parseInt(countStr, 10) :
                 1;

    expect(collection).to.have.length(count);
  },
  // 'When I focus into $emberBddLabel'([collection /* , label, selector */]) {
  //   assert(`Expected a single element, but ${collection.length} found`, collection.length === 1);
  //   return focus(collection[0]);
  // },

  // 'When I focus out of $emberBddLabel'([collection /* , label, selector */]) {
  //   assert(`Expected a single element, but ${collection.length} found`, collection.length === 1);
  //   return blur(collection[0]);
  // },

  // 'When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'(
  //   de,
  //   [collection /* , label, selector */]
  // ) {
  //   assert(`Expected a single element, but ${collection.length} found.`, collection.length === 1);
  //   const [element] = collection;
  //   let input;

  //   if (element.type === 'checkbox' || element.type === 'radio') {
  //     input = element;
  //   } else {
  //     const inputs = element.querySelectorAll('input[type="text"], input[type="checkbox"]');
  //     assert(`Expected one checkbox/radio, but ${inputs.length} found`, inputs.length === 1);
  //     [input] = inputs;
  //   }

  //   assert('A radio button cannot be deselected', !(de && input.type === 'radio'));
  //   assert(`Expected input ${de ? 'not ' : ''}to be selected`, de ? input.checked : !input.checked);

  //   return click(input);
  // },

  // 'When I (de)?select (?:the )?(?:radio button|checkbox) $opinionatedString in $emberBddLabel'(
  //   de,
  //   text,
  //   [collection /* , label, selector */]
  // ) {
  //   assert(`Expected a single element, but ${collection.length} found.`, collection.length === 1);
  //   const [element] = collection;
  //   const input = findInputForLabelWithText(text, element);

  //   assert('Expected input to exist', input);
  //   assert(
  //     'Expected input to be a checkbox or radio button',
  //     input.type === 'checkbox' || input.type === 'radio'
  //   );
  //   assert('A radio button cannot be deselected', !(de && input.type === 'radio'));
  //   assert(`Expected input ${de ? '' : 'not '}to be selected`, de ? input.checked : !input.checked);

  //   return click(input);
  // },

  // 'When I (press|press down|release) the $opinionatedString key in $emberBddLabel'(
  //   eventRaw,
  //   key,
  //   [collection /* , label, selector */]
  // ) {
  //   assert(`Expected a single element, but ${collection.length} found`, collection.length === 1);

  //   const events = {
  //     press: 'keypress',
  //     'press down': 'keydown',
  //     release: 'keyup',
  //   };

  //   const event = events[eventRaw];

  //   const keys = key.split('+');

  //   const { modifiers, remainingKeys } = keys.reduce(
  //     ({ modifiers, remainingKeys }, key) => {
  //       if (key.toLowerCase() === 'ctrl') {
  //         modifiers.ctrlKey = true;
  //       } else if (key.toLowerCase() === 'alt') {
  //         modifiers.ctrlKey = true;
  //       } else if (key.toLowerCase() === 'shift') {
  //         modifiers.shiftKey = true;
  //       } else if (key.toLowerCase() === 'meta') {
  //         modifiers.ctrlKey = true;
  //       } else {
  //         remainingKeys.push(key);
  //       }

  //       return { modifiers, remainingKeys };
  //     },
  //     { modifiers: {}, remainingKeys: [] }
  //   );

  //   if (remainingKeys.length > 1) {
  //     throw new Error(
  //       `Can press only one non-modifier key at once, but tried to press ${remainingKeys.join('+')}`
  //     );
  //   }

  //   if (remainingKeys.length === 0) {
  //     throw new Error('A non-modifier key is required to press.');
  //   }

  //   triggerKeyEvent(collection[0], event, remainingKeys[0], modifiers);
  // },
};
