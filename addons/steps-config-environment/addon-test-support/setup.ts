import { restoreOriginalConfig } from './utils/override-config';

export function setupStepsConfigEnvironment(hooks: NestedHooks): void {
  hooks.afterEach(restoreOriginalConfig);
}
