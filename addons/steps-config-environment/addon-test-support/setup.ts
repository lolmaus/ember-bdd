import { restoreOriginalConfig } from './utils/override-config';

export default function setupStepsConfigEnvironment(hooks: NestedHooks): void {
  hooks.afterEach(restoreOriginalConfig);
}
