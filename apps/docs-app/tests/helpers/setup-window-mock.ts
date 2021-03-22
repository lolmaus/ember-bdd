import sinon from 'sinon';
import window from 'ember-window-mock';
import { setupWindowMock } from 'ember-window-mock/test-support';

export default function mockWindow(hooks: NestedHooks): void {
  setupWindowMock(hooks);
  hooks.beforeEach(function (): void {
    window.print = sinon.spy();
    window.location.reload = sinon.spy();
  });
}
