import { expect } from 'chai';
import { blur, click, doubleClick, fillIn, focus, triggerEvent } from '@ember/test-helpers';
import { Collection, findEditable } from '@ember-bdd/core/test-support/dom-helpers';

// @ts-ignore Missing type
import isFormControl from '@ember/test-helpers/dom/-is-form-control';

function getSingleElement(collection: Collection, length = 1): Element {
  expect(collection.elements).to.have.length(
    length,
    `Expected \`${collection.label}\` to match ${length} element(s), but ${collection.elements.length} found`
  );

  return collection.elements[0];
}

function getCheckboxOrRadio(collection: Collection): HTMLInputElement {
  const element = getSingleElement(collection);

  if (
    element instanceof HTMLInputElement &&
    (element.type === 'checkbox' || element.type === 'radio')
  ) {
    return element;
  } else {
    const inputs = element.querySelectorAll('input[type="text"], input[type="checkbox"]');
    expect(inputs, `Expected one checkbox/radio, but ${inputs.length} found`).to.have.length(1);

    if (!(inputs[0] instanceof HTMLInputElement)) {
      throw new Error(`Expected a checkbox/radio, but found ${inputs[0].tagName}`);
    }

    return inputs[0];
  }
}

export default {
  async 'When I click (?:on )?$emberBddLabel'(collection: Collection): Promise<void> {
    const element = getSingleElement(collection);

    // @ts-ignore An innocent check, only some HTML elements have this property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!isFormControl(element) || !element.disabled) {
      await click(element);
    }
  },

  async 'When I double click (?:on )?$emberBddLabel'(collection: Collection): Promise<void> {
    const element = getSingleElement(collection);

    // @ts-ignore An innocent check, only some HTML elements have this property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!isFormControl(element) || !element.disabled) {
      await doubleClick(element);
    }
  },

  async 'When I (?:fill|type) $emberBddString into $emberBddLabel'(
    text: string,
    collection: Collection
  ): Promise<void> {
    const element = getSingleElement(collection);
    const target = findEditable(element, true, false);

    return fillIn(target, text);
  },

  //

  async 'When I move the mouse pointer into $emberBddLabel'(collection: Collection): Promise<void> {
    const element = getSingleElement(collection);

    await triggerEvent(element, 'mouseenter');
  },

  //

  async 'When I move the mouse pointer out of $emberBddLabel'(
    collection: Collection
  ): Promise<void> {
    const element = getSingleElement(collection);

    await triggerEvent(element, 'mouseleave');
  },

  //

  async 'When I focus into $emberBddLabel'(collection: Collection): Promise<void> {
    const element = getSingleElement(collection);

    await focus(element);
  },

  //

  async 'When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel'(
    collection: Collection
  ): Promise<void> {
    const element = getSingleElement(collection);

    await blur(element);
  },

  async 'When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel'(
    de: 'de' | undefined,
    collection: Collection
  ): Promise<void> {
    const input = getCheckboxOrRadio(collection);

    expect(!!de && input.type === 'radio', 'A radio button cannot be deselected').not.ok;

    if (de) {
      expect(input.checked, 'Checkbox has to be checked in order to uncheck it').ok;
    } else {
      expect(input.checked, 'Checkbox has to be unchecked in order to check it').not.ok;
    }

    return click(input);
  },

  //

  'Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel'(
    no: 'NO ' | 'no ' | undefined,
    countStr: string | undefined,
    collection: Collection
  ): void {
    expect(no && countStr, "Don't use NO and number at the same time").not.ok;

    // prettier-ignore
    const count =
      no       ? 0 :
      countStr ? parseInt(countStr, 10) :
                 1;

    expect(collection.elements).to.have.length(count);
  },

  //

  'Then $emberBddLabel should (not |NOT )?(?:have text|say|be) $emberBddString'(
    collection: Collection,
    not: 'not ' | 'NOT ' | undefined,
    text: string
  ): void {
    if (not && collection.elements.length === 0) {
      return;
    }

    const element = getSingleElement(collection);

    if (element.matches('input, textarea')) {
      not ? expect(element).not.to.have.value(text) : expect(element).to.have.value(text);
    } else {
      not
        ? expect(element).not.to.have.trimmed.text(text)
        : expect(element).to.have.trimmed.text(text);
    }
  },

  //

  'Then $emberBddLabel should (not |NOT )?have focus'(
    collection: Collection,
    not: 'not ' | 'NOT ' | undefined
  ): void {
    if (not && collection.elements.length === 0) {
      return;
    }

    const element = getSingleElement(collection);

    not ? expect(element).not.to.have.focus : expect(element).to.have.focus;
  },

  //

  'Then $emberBddLabel should (not |NOT )?have HTML class $emberBddString'(
    collection: Collection,
    not: 'not ' | 'NOT ' | undefined,
    text: string
  ): void {
    if (not && collection.elements.length === 0) {
      return;
    }

    const element = getSingleElement(collection);

    expect(text, 'Class cannot be empty string').not.to.have.length(0);

    not ? expect(element).not.to.have.class(text) : expect(element).to.have.class(text);
  },

  //

  'Then $emberBddLabel should (not |NOT )?be checked'(
    collection: Collection,
    not: 'not ' | 'NOT ' | undefined
  ): void {
    if (not && collection.elements.length === 0) {
      return;
    }

    const element = getCheckboxOrRadio(collection);

    // @ts-ignore Missing type
    not ? expect(element).not.to.be.checked : expect(element).to.be.checked;
  },
};
