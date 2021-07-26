export default function setupResetState(hooks: NestedHooks): void {
  hooks.beforeEach(function () {
    // clear local storage before each acceptance test
    window.localStorage.clear();
  });
}
