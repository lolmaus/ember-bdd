import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import { singularize } from 'ember-inflector';
import { REGEX_ITEM_MATCHING, REGEX_SEPARATOR } from './regex';
import { getIndexZero } from './helpers';
import { isLabelOverridesRecord, LabelOverridesRecord } from './types';

export function selectorFromLabel(label: string, labelOverrides?: LabelOverridesRecord): string {
  return label
    .split(new RegExp(REGEX_SEPARATOR))
    .reverse()
    .map((label) => {
      const matchResult = REGEX_ITEM_MATCHING.exec(label);

      assert(`selectorFromLabel failed to parse the label: "${label}"`, matchResult);

      const [, , indexOneStr, ordinal, subAttrRaw, valueRaw] = matchResult;

      let result = getSelectorFromLabelOverride(subAttrRaw, labelOverrides);

      if (!result) {
        const subAttr = dasherize(subAttrRaw);

        result = subAttr
          .split('+')
          .map((attr) => {
            const attrSinglular = singularize(attr);
            const value = valueRaw ? `="${valueRaw}"` : '';
            return `[data-test-${attrSinglular}${value}]`;
          })
          .join('');
      }

      const indexZero = getIndexZero(ordinal, indexOneStr);

      if (indexZero !== undefined) {
        result += `:eq(${indexZero})`;
      }

      return result;
    })
    .join(' ');
}

function getSelectorFromLabelOverride(
  label: string,
  labelOverrides?: LabelOverridesRecord
): string | undefined {
  return Object.entries(labelOverrides ?? getLabelOverrides() ?? {}).find(([key]) => {
    return dasherize(key) === dasherize(label);
  })?.[1];
}

let _labelOverrides: LabelOverridesRecord | undefined;

export function setupLabelOverrides(labelOverrides: LabelOverridesRecord): void {
  assert('You must not call `setupLabelOverrides()` twice!', !_labelOverrides);
  assert(
    'Expected an object with strings passed to `setupLabelOverrides()`!',
    isLabelOverridesRecord(labelOverrides)
  );

  _labelOverrides = labelOverrides;
}

export function getLabelOverrides(): LabelOverridesRecord | undefined {
  return _labelOverrides;
}
