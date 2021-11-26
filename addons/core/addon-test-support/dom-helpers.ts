import { assert } from '@ember/debug';
import {
  find,
  findAll,
  click,
  doubleClick,
  fillIn,
  triggerEvent,
  triggerKeyEvent,
  Target,
} from '@ember/test-helpers';
import { REGEX_SELECTOR_MAYBE_WITH_EQ, REGEX_SELECTOR_WITH_EQ } from './regex';
import { selectorFromLabel } from './labels';
import { KeyEvent, KeyModifiers } from '@ember/test-helpers/dom/trigger-key-event';
import { LabelOverridesRecord } from './types';

export interface Collection {
  __isCollection__: true;
  elements: Element[];
  label: string;
  selector: string;
}

export function isCollection(maybeCollection: unknown): maybeCollection is Collection {
  return (maybeCollection as Collection)?.__isCollection__ === true;
}

export function findSelfOrChild(
  elementOrSelector: Element | string,
  htmlClass: string
): Element | null {
  const childSelector = `.${htmlClass}`;

  if (elementOrSelector instanceof Element) {
    if (elementOrSelector.classList.contains(htmlClass)) {
      return elementOrSelector;
    } else {
      return elementOrSelector.querySelector(childSelector);
    }
  } else {
    return find(`${elementOrSelector} ${childSelector}`);
  }
}

export function findByLabel(label: string, labelOverrides?: LabelOverridesRecord): Collection {
  const selectorCompound = selectorFromLabel(label, labelOverrides);

  const selectorsMaybeWithEq = selectorCompound
    .split(REGEX_SELECTOR_WITH_EQ)
    .filter((substr) => substr && substr.length > 0);

  const { elements } = selectorsMaybeWithEq.reduce(
    ({ elements, parentSelector }, childSelectorMaybeWithEq) => {
      const [childSelectorWithoutEq, index] = _parseSelectorMaybeWithEq(childSelectorMaybeWithEq);
      const childSelectorWithoutEqFull = `${parentSelector} ${childSelectorWithoutEq}`;

      return {
        elements: _findElements(elements, childSelectorWithoutEqFull, index),
        parentSelector: childSelectorWithoutEqFull,
      };
    },
    { elements: [], parentSelector: '' } as {
      elements: Element[];
      parentSelector: string;
    }
  );

  const result: Collection = {
    elements,
    label,
    selector: selectorCompound,
    __isCollection__: true,
  };

  return result;
}

function _findElements(
  parentCollection: Element[],
  selector: string,
  index: number | null
): Element[] {
  const resulingCollection = parentCollection.length
    ? parentCollection
        .map((parent) => _findElement(parent, selector))
        .reduce((a, b) => a.concat(b), []) // flatten
        .filter((a) => a) // compact
    : _findElement(null, selector);

  return index == null ? resulingCollection : [resulingCollection[index]].filter((a) => a); // compact
}

function _parseSelectorMaybeWithEq(
  selectorMaybeWithEq: string
): [selector: string, index: number | null] {
  const matchResult = REGEX_SELECTOR_MAYBE_WITH_EQ.exec(selectorMaybeWithEq);
  assert(`findByLabel failed to parse a selector: "${selectorMaybeWithEq}"`, matchResult);
  const [, selector, indexRaw] = matchResult;
  const index = (indexRaw && parseInt(indexRaw, 10)) || null;
  return [selector, index];
}

function _findElement(parent: Element | null, selector: string): Element[] {
  const collection = parent ? parent.querySelectorAll(selector) : findAll(selector);

  return [...collection]; // cast NodeList to Array
}

export function findAllByLabel(label: string): Element[] | null {
  return findByLabel(label).elements;
}

export function findSingleByLabel(label: string): Element | undefined {
  const collection = findByLabel(label);
  assert(
    `Expected a single element, but ${collection.elements.length} found.\nLabel: ${label}\nSelector: ${collection.selector}\n\n`,
    collection.elements.length === 1
  );

  return collection.elements[0];
}

export function clickByLabel(label: string): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected clicked element to exist', element);
  return click(element);
}

export function doubleClickByLabel(label: string): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected doubleclicked element to exist', element);
  return doubleClick(element);
}

export function fillInByLabel(label: string, text: string): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  const target = findEditable(element);
  assert('Expected filled element to be editable or contain an editable', target);
  return fillIn(target, text);
}

export function triggerByLabel(
  label: string,
  eventName: string,
  options?: Record<string, unknown>
): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  return triggerEvent(element, eventName, options);
}

export function mouseEnterByLabel(label: string): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  return triggerEvent(element, 'mouseenter');
}

export function mouseLeaveByLabel(label: string): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  return triggerEvent(element, 'mouseleave');
}

export function triggerKeyByLabel(
  label: string,
  eventType: KeyEvent,
  key: number | string,
  modifiers: KeyModifiers
): Promise<void> {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  return triggerKeyEvent(element, eventType, key, modifiers);
}

export function findEditable(
  element: Element,
  includeContentEditable = true,
  includeSelect = true
): Element {
  const selectors = [
    'textarea',
    'input:not([hidden])',
    ...(includeSelect ? ['select'] : []),
    ...(includeContentEditable ? ['[contenteditable]'] : []),
  ];

  if (selectors.some((selector) => element.matches(selector))) {
    return element;
  } else {
    const children = element.querySelectorAll(selectors.join(', '));
    assert(
      `Expected element to be fillable or have exactly one fillable child, but ${children.length} fillable children found`,
      children.length === 1
    );
    return children[0];
  }
}

export function findInputForLabelWithText(text: string, parent: Element | null): Element {
  const labels = _findElement(parent, 'label').filter((el) => el.textContent?.trim() === text);

  assert(
    `Expected to find exactly one label with text content "${text}", but ${labels.length} found`,
    labels.length === 1
  );

  const [label] = labels;
  const id = label.getAttribute('for');

  let input;

  if (id) {
    input = document.getElementById(id);
    assert(
      `Label with text "${text} had an attr for="${id}", but no input with such id found in element`,
      input
    );
  } else {
    const inputs = _findElement(parent, 'input');
    assert(
      `Expected to find exactly one input inside label with text "${text}", but ${inputs.length} found`,
      inputs.length === 1
    );
    input = inputs[0];
  }

  return input;
}

// https://github.com/cibernox/ember-power-select/blob/v2.2.1/addon-test-support/index.js

const POWER_SELECT_TRIGGER_CLASS = 'ember-power-select-trigger';
const POWER_SELECT_DROPDOWN_PLACEHOLDER_CLASS = 'ember-basic-dropdown-content-placeholder';
const POWER_SEELCT_OPTIONS_SELECTOR = '.ember-power-select-options';
const POWER_SEELCT_OPTION_SELECTOR = '.ember-power-select-option';
const POWER_SEELCT_MULTIPLE_OPTIONS_SELECTOR = '.ember-power-select-multiple-options';
const POWER_SEELCT_MULTIPLE_OPTION_SELECTOR = '.ember-power-select-multiple-option';
const POWER_SEELCT_MULTIPLE_OPTION_DISABLED_CLASS = 'ember-power-select-multiple-option--disabled';
const POWER_SELECT_MULTIPLE_OPTION_REMOVE_BUTTON_SELECTOR =
  '.ember-power-select-multiple-remove-btn';
const powerSelectDropdownIdForTrigger = (trigger: Element): string | undefined =>
  trigger.attributes.getNamedItem('aria-owns')?.value;

export function powerSelectFindTrigger(elementOrSelector: Target): Element {
  const result = findSelfOrChild(elementOrSelector, POWER_SELECT_TRIGGER_CLASS);

  assert(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `Element with class ${POWER_SELECT_TRIGGER_CLASS} not found in ${elementOrSelector}`,
    result
  );

  return result;
}

export function powerSelectIsTriggerDisabled(trigger: Element): boolean {
  assert('ember-power-select trigger expected', trigger);
  const attr = trigger.getAttribute('aria-disabled');
  return attr === '' || !!attr;
}

export function powerSelectFindDropdown(trigger: Element): Element {
  assert('ember-power-select trigger expected', trigger);

  const dropdownId = powerSelectDropdownIdForTrigger(trigger);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const dropdown = find(`#${dropdownId}`);

  assert('ember-power-select dropdown not found. Not expanded?', dropdown);

  return dropdown;
}

export function powerSelectFindOptions(trigger: Element): Element[] {
  const dropdown = powerSelectFindDropdown(trigger);
  const options = dropdown.querySelectorAll(POWER_SEELCT_OPTION_SELECTOR);
  return Array.from(options);
}

export function powerSelectFindSelectedOptions(trigger: Element): Element[] {
  const list = trigger.querySelector(POWER_SEELCT_MULTIPLE_OPTIONS_SELECTOR);
  assert(
    `${POWER_SEELCT_MULTIPLE_OPTIONS_SELECTOR} not found. Power Select is not in multiple mode?`,
    list
  );
  const options = list.querySelectorAll(POWER_SEELCT_MULTIPLE_OPTION_SELECTOR);
  return Array.from(options);
}

export function powerSelectFilterSelectedOptionsByText(
  selectedOptions: Element[],
  text: string
): Element[] {
  return selectedOptions.filter((selectedOption) => {
    let trimmedText = selectedOption.textContent?.trim() || '';

    trimmedText = powerSelectIsSelectedOptionDisabled(selectedOption)
      ? trimmedText
      : trimmedText.slice(1).trim(); // remove the deselect button from text

    return trimmedText === text;
  });
}

export function powerSelectIsSelectedOptionDisabled(option: Element): boolean {
  return option.classList.contains(POWER_SEELCT_MULTIPLE_OPTION_DISABLED_CLASS);
}

export function powerSelectRemoveSelectedOption(option: Element): Promise<void> {
  assert(
    'Attempted to deselect a locked selected option',
    !powerSelectIsSelectedOptionDisabled(option)
  );

  const removeButton = option.querySelector(POWER_SELECT_MULTIPLE_OPTION_REMOVE_BUTTON_SELECTOR);
  assert('Expected filled element to exist', removeButton);
  return click(removeButton);
}

export function powerSelectIsDropdownExpanded(trigger: Element): boolean {
  const dropdown = powerSelectFindDropdown(trigger);
  return dropdown && !dropdown.classList.contains(POWER_SELECT_DROPDOWN_PLACEHOLDER_CLASS);
}

export async function powerSelectExpand(trigger: Element): Promise<void> {
  // If the dropdown is closed, open it
  if (!powerSelectIsDropdownExpanded(trigger)) {
    await click(trigger);
  }
}

export async function powerSelectCollapse(trigger: Element): Promise<void> {
  // If the dropdown is opened, close it
  if (powerSelectIsDropdownExpanded(trigger)) {
    await click(trigger);
  }
}

export function powerSelectFindOptionByValueOrSelector(
  trigger: Element,
  valueOrSelector: string,
  optionIndex = 0
): Element {
  const options = powerSelectFindOptions(trigger);
  let target;

  let potentialTargets = options.filter(
    (opt) => (opt.textContent || '').indexOf(valueOrSelector) > -1
  );

  if (potentialTargets.length === 0) {
    const selector = `${POWER_SEELCT_OPTIONS_SELECTOR} ${valueOrSelector}`;
    try {
      potentialTargets = Array.from(trigger.querySelectorAll(selector));
    } catch (e) {
      if ((e as Error).message.includes("Failed to execute 'querySelectorAll'")) {
        throw new Error(`Option "${valueOrSelector}" not found in PowerSelect`);
      } else {
        throw e;
      }
    }
  }

  if (potentialTargets.length > 1) {
    const filteredTargets = potentialTargets.filter(
      (t) => t.textContent?.trim() === valueOrSelector
    );

    target = filteredTargets[optionIndex] || potentialTargets[optionIndex];
  } else {
    target = potentialTargets[0];
  }

  if (!target) {
    throw new Error(`Option ${valueOrSelector} not found in Power Select`);
  }

  return target;
}

export function powerSelectFindTriggerByLabel(label: string): Element | null {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  return powerSelectFindTrigger(element);
}

export function powerSelectFindDropdownByLabel(label: string): Element | null {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectFindDropdown(trigger);
}

export async function powerSelectFindOptionsByLabel(label: string): Promise<Element[]> {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  const isExpanded = powerSelectIsDropdownExpanded(trigger);

  if (!isExpanded) {
    await powerSelectExpand(trigger);
  }

  return powerSelectFindOptions(trigger);
}

export async function powerSelectSelectOptionByLabelAndIndex(
  label: string,
  index: number
): Promise<void> {
  const options = await powerSelectFindOptionsByLabel(label);

  assert(
    `Expected number of options to be greater than index ${index}, was ${options.length}, label: ${label}`,
    options.length > index
  );

  return click(options[index]);
}

export function powerSelectFindSelectedOptionsByLabel(label: string): Element[] {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectFindSelectedOptions(trigger);
}

export function powerSelectFilterSelectedOptionsByLabelAndText(
  label: string,
  text: string
): Element[] {
  const selectedOptions = powerSelectFindSelectedOptionsByLabel(label);
  return powerSelectFilterSelectedOptionsByText(selectedOptions, text);
}

export function powerSelectIsSelectedOptionDisabledByLabelAndIndex(
  label: string,
  index: number
): boolean {
  const selectedOptions = powerSelectFindSelectedOptionsByLabel(label);

  assert(
    `Expected number of selected options to be greater than index ${index}, was ${selectedOptions.length}, label: ${label}`,
    selectedOptions.length > index
  );

  const selectedOption = selectedOptions[index];

  return powerSelectIsSelectedOptionDisabled(selectedOption);
}

export async function powerSelectIsSelectedOptionDisabledByLabelAndText(
  label: string,
  text: string
): Promise<boolean> {
  const options = await powerSelectFindOptionsByLabel(label);
  const selectedOptions = powerSelectFilterSelectedOptionsByText(options, text);
  assert(
    `Expected exactly 1 selected option to match text "${text}, was ${selectedOptions.length}, label: ${label}`,
    selectedOptions.length === 1
  );
  const selectedOption = selectedOptions[0];
  return powerSelectIsSelectedOptionDisabled(selectedOption);
}

export function powerSelectIsTriggerDisabledByLabel(label: string): boolean {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectIsTriggerDisabled(trigger);
}

export function powerSelectRemoveSelectedOptionByLabelAndIndex(
  label: string,
  index: number
): Promise<void> {
  const selectedOptions = powerSelectFindSelectedOptionsByLabel(label);

  assert(
    `Expected number of selected options to be greater than index ${index}, was ${selectedOptions.length}, label: ${label}`,
    selectedOptions.length > index
  );

  const selectedOption = selectedOptions[index];

  return powerSelectRemoveSelectedOption(selectedOption);
}

export async function powerSelectRemoveSelectedOptionByLabelAndText(
  label: string,
  text: string
): Promise<void> {
  const options = await powerSelectFindOptionsByLabel(label);
  const selectedOptions = powerSelectFilterSelectedOptionsByText(options, text);
  assert(
    `Expected exactly 1 selected option to match text "${text}, was ${selectedOptions.length}, label: ${label}`,
    selectedOptions.length === 1
  );
  const selectedOption = selectedOptions[0];
  return powerSelectRemoveSelectedOption(selectedOption);
}

export function powerSelectIsDropdownExpandedByLabel(label: string): boolean {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectIsDropdownExpanded(trigger);
}

export function powerSelectExpandByLabel(label: string): Promise<void> {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectExpand(trigger);
}

export function powerSelectCollapseByLabel(label: string): Promise<void> {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectCollapse(trigger);
}

export function powerSelectFindOptionByLabelAndValue(
  label: string,
  valueOrSelector: string,
  optionIndex: number
): Element {
  const trigger = powerSelectFindTriggerByLabel(label);
  assert('Expected element to exist', trigger);
  return powerSelectFindOptionByValueOrSelector(trigger, valueOrSelector, optionIndex);
}

const POWER_DATE_PICKER_TRIGGER_CLASS = 'ember-power-datepicker-trigger';
export const POWER_DATE_PICKER_DROPDOWN_SELECTOR = '.ember-power-datepicker-content';

export function powerDatePickerFindTrigger(triggerOrSelector: Target): Element {
  const result = findSelfOrChild(triggerOrSelector, POWER_DATE_PICKER_TRIGGER_CLASS);

  assert(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `Element with class ${POWER_DATE_PICKER_TRIGGER_CLASS} not found in ${triggerOrSelector}`,
    result
  );

  return result;
}

export function powerDatePickerFindDropdown(): Element | null {
  return find(POWER_DATE_PICKER_DROPDOWN_SELECTOR);
}

export function powerDatePickerFindTriggerByLabel(label: string): Element | null {
  const element = findSingleByLabel(label);
  assert('Expected element to exist', element);
  return powerDatePickerFindTrigger(element);
}
