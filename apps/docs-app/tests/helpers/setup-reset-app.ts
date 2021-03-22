import { restoreOriginalTestAdapterException } from '../acceptance/steps/_error-handling';

export default function setupResetState(hooks: NestedHooks): void {
  hooks.beforeEach(function () {
    // clear local storage before each acceptance test
    window.localStorage.clear();

    // Remove error handler ignore
    restoreOriginalTestAdapterException();
  });
}
