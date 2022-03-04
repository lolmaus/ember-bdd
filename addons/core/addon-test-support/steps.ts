import { isStepImplementationsRecord, StepImplementationsRecord } from '@ember-bdd/core/types';
import { assert } from '@ember/debug';

let _steps: StepImplementationsRecord | undefined;

export function setupSteps(steps: StepImplementationsRecord): void {
  assert('You must not call `setupSteps()` twice!', !_steps);
  assert(
    'Expected an object with functions or strings passed to `setupSteps()`!',
    isStepImplementationsRecord(steps)
  );

  _steps = steps;
}

export function getSteps(): StepImplementationsRecord {
  assert('You must call `setupSteps()` before running any ember-bdd tests!', _steps);
  return _steps;
}
