import { restoreOriginalConfig } from './utils/override-config';

export default function setup(hooks: NestedHooks): void {
  hooks.afterEach(restoreOriginalConfig);
}
