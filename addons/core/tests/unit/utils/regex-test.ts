import {
  REGEX_ITEM_MATCHING,
  REGEX_SEPARATOR,
  REGEX_SELECTOR_MAYBE_WITH_EQ,
  REGEX_LABEL_CONSTRAINED,
  REGEX_COMMA_AND_SEPARATOR,
  STR_STRING_WITH_ESCAPE,
} from '@ember-bdd/core/regex';
import { module, test } from 'qunit';

interface Case {
  str: string;
  matches: null | Array<null | string>;
  regex: RegExp;
}

// prettier-ignore
const cases: Case[] = [
  { regex: REGEX_ITEM_MATCHING, str: 'Post',         matches: [null,  null, null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'a Post',       matches: ["a",   null, null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'the Post',     matches: ["the", null, null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'an Post',      matches: ["an",  null, null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'THE Post',     matches: ["THE", null, null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: '1st Post',     matches: [null,  '1',  null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'a 1st Post',   matches: ['a',   '1',  null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'the 1st Post', matches: ['the', '1',  null,     'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'Foo(Bar)',     matches: [null,  null, null,     'Foo',     'Bar'] },
  { regex: REGEX_ITEM_MATCHING, str: 'Foo+Bar',      matches: [null,  null, null,     'Foo+Bar', null] },
  { regex: REGEX_ITEM_MATCHING, str: 'first Post',   matches: [null, null, 'first',   'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'second Post',  matches: [null, null, 'second',  'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'third Post',   matches: [null, null, 'third',   'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'fourth Post',  matches: [null, null, 'fourth',  'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'fifth Post',   matches: [null, null, 'fifth',   'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'sixth Post',   matches: [null, null, 'sixth',   'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'seventh Post', matches: [null, null, 'seventh', 'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'eighth Post',  matches: [null, null, 'eighth',  'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'ninth Post',   matches: [null, null, 'ninth',   'Post',    null] },
  { regex: REGEX_ITEM_MATCHING, str: 'tenth Post',   matches: [null, null, 'tenth',   'Post',    null] },

  { regex: REGEX_SEPARATOR, str: ' of ',     matches: [] },
  { regex: REGEX_SEPARATOR, str: ' on ',     matches: [] },
  { regex: REGEX_SEPARATOR, str: ' in ',     matches: [] },
  { regex: REGEX_SEPARATOR, str: ' inside ', matches: [] },
  { regex: REGEX_SEPARATOR, str: ' under ',  matches: [] },
  { regex: REGEX_SEPARATOR, str: ' zomg ',   matches: null },
  { regex: REGEX_SEPARATOR, str: 'in',       matches: null },

  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: 'foo',                          matches: ['foo',                   null] },
  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: 'foo:eq(2)',                    matches: ['foo',                   '2'] },
  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: '[data-test]',                  matches: ['[data-test]',           null] },
  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: '[data-test-foo]',              matches: ['[data-test-foo]',       null] },
  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: '[data-test-foo-bar]',          matches: ['[data-test-foo-bar]',   null] },
  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: '[data-test-foo-bar]:eq(0)',    matches: ['[data-test-foo-bar]',   '0'] },
  { regex: REGEX_SELECTOR_MAYBE_WITH_EQ, str: '[data-test-foo="bar"]:eq(0)',  matches: ['[data-test-foo="bar"]', '0'] },

  { regex: REGEX_LABEL_CONSTRAINED, str: 'Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'a Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: '2nd Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'the 2nd Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: '4554th Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'Foo in Baru',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'a Comment under 2nd Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'a Reaction-Emoji under CommentReply in a comment under 2nd Post',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'Foo Bar',  matches: null },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'Foo(Bar)',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'a Foo(Bar)',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: '2nd Foo(Bar)',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'the 2nd Foo(Bar)',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: '2543rd Foo(Bar)',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'a Foo(Bar) in Zomg+Lol',  matches: [] },
  { regex: REGEX_LABEL_CONSTRAINED, str: 'the 1st Foo(Bar) in 2nd Zomg(Lol) of Baz',  matches: [] },

  { regex: REGEX_COMMA_AND_SEPARATOR, str: 'foo,bar,    baz and    quux ,fooandbar', matches: [',', ',    ', ' and    ', ' ,'] },

  { regex: new RegExp(STR_STRING_WITH_ESCAPE, 'g'), str: 'foo "bar" "baz \\"quux\\"" zomg "lol"', matches: ['"bar"', '"baz \\"quux\\""', '"lol"'] },
];

module('Unit | Utility | regex', function (/* hooks */) {
  cases.forEach(({ regex, str, matches }, index) => {
    test(`${index}: "${str}"`, function (assert) {
      let m;
      regex.lastIndex = 0;
      const result = str.match(regex);

      if (matches && matches.length) {
        assert.ok(result, "Expected to match, but it didn't");

        matches.forEach((match: string, i) => {
          const indexEffective = regex.flags.includes('g') ? i : i + 1;

          m = `Match #${i}: ${match}`;
          assert.equal(result?.[indexEffective], match, m);
        });
      } else if (matches && !matches.length) {
        m = 'Expected to match (not checking submatches)';
        assert.ok(result, m);
      } else {
        m = 'Expected no match';
        assert.equal(result, null, m);
      }
    });
  });
});
