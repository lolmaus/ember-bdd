import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import { singularize } from 'ember-inflector';

import { REGEX_ITEM_MATCHING, REGEX_SEPARATOR } from './regex';

// import { getLabel, hasLabel } from '-private/label-map';
import { getIndexZero } from './helpers';
import { isLabelOverridesRecord, LabelOverridesRecord } from './types';
import requireModule from 'ember-require-module';

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
  if (!labelOverrides) {
    const labelOverridesRecord =
      requireModule('@ember-bdd/core/test-support/app/label-overrides') ?? {};

    assert(
      'The `tests/bdd/label-overrides.js` file must export an object with strings',
      isLabelOverridesRecord(labelOverridesRecord)
    );

    labelOverrides = labelOverridesRecord;
  }

  return Object.entries(labelOverrides).find(([key]) => {
    return dasherize(key) === dasherize(label);
  })?.[1];
}
