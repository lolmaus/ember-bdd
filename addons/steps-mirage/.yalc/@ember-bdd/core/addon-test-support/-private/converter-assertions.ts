import { assert } from '@ember/debug';

export function assertNumber(maybeNumber: unknown): asserts maybeNumber is number {
  assert(
    `Expected a number but was passed ${typeof maybeNumber}. Did you forget to add $emberBddInt to dictionary?`,
    typeof maybeNumber === 'number'
  );
}

export function assertUnquotedString(maybeString: unknown): asserts maybeString is string {
  assert(
    `Expected an unquoted string but was passed ${typeof maybeString}. Did you forget to add $emberBddString to dictionary?`,
    typeof maybeString === 'string' &&
      maybeString[0] !== '"' &&
      maybeString[maybeString.length - 1] !== '"'
  );
}
