import { visit, settled, currentURL } from '@ember/test-helpers';
import { assert } from '@ember/debug';
import {
  assertNumber,
  assertUnquotedString,
} from '@ember-bdd/core/test-support/-private/converter-assertions';
import { pauseTest } from '@ember/test-helpers/setup-context';
import { expect } from 'chai';

export default {
  async 'When I visit URL $emberBddString'(url: string | undefined): Promise<void> {
    assert('Expected URL to exist', url);

    try {
      await visit(url);
    } catch (e) {
      // See https://github.com/emberjs/ember-test-helpers/issues/332
      if (!(e instanceof Error) || e.message !== 'TransitionAborted') {
        throw e;
      }
    }

    return settled();
  },

  'When the app settles'(): Promise<void> {
    return settled();
  },

  'Then pause'(): Promise<void> {
    return pauseTest();
  },

  async 'When (?:I )?pause for $emberBddInt ms'(ms: unknown): Promise<void> {
    assertNumber(ms);
    await new Promise((resolve) => setTimeout(resolve, ms));
    return settled();
  },

  'Then pause for $emberBddInt ms': 'When (?:I )?pause for $emberBddInt ms',

  'Then debug(?:ger)?'(): void {
    debugger; // eslint-disable-line no-debugger
  },

  async 'Then I should (?:still )?be (?:at|on) URL $emberBddString'(
    url: string | undefined
  ): Promise<void> {
    assert('Expected URL to exist', url);

    await settled();
    expect(currentURL()).to.equal(url);
  },

  async "Then current URL's pathname should be $emberBddString"(pathname: unknown): Promise<void> {
    assertUnquotedString(pathname);
    await settled();
    const url = new URL(currentURL(), location.origin);
    expect(url.pathname).to.equal(pathname);
  },

  async 'Then current URL should (not |NOT )?have query param $emberBddString'(
    not: string | undefined,
    key: unknown
  ): Promise<void> {
    assertUnquotedString(key);
    await settled();
    const url = new URL(currentURL(), location.origin);
    expect(url.searchParams.has(key)).to.equal(!not);
  },

  async 'Then current URL should (not |NOT )?have query param $emberBddString with value $emberBddString'(
    not: string | undefined,
    key: unknown,
    expectedValue: unknown
  ): Promise<void> {
    assertUnquotedString(key);
    await settled();
    const url = new URL(currentURL(), location.origin);
    const actualValue = url.searchParams.get(key);

    not
      ? expect(actualValue).not.to.equal(expectedValue)
      : expect(actualValue).to.equal(expectedValue);
  },
};
