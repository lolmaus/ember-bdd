import Controller from '@ember/controller';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isBoolean } from '@sniptt/guards';
import { Resource, useResource } from 'ember-resources';

class ClickResource extends Resource {
  @tracked prop = false;

  @action action(): void {
    this.prop = true;
  }
}

class DblclickResource extends Resource {
  @tracked prop = false;

  @action action(): void {
    this.prop = true;
  }
}

class MouseEnterLeaveResource extends Resource {
  @tracked isActive = false;

  @action action(value: unknown): void {
    assert('Value passed from template must be a boolean', isBoolean(value));
    this.isActive = value;
  }
}

export default class Application extends Controller {
  click = useResource(this, ClickResource);
  dblclick = useResource(this, DblclickResource);
  mouseEnterLeave = useResource(this, MouseEnterLeaveResource);
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    application: Application;
  }
}
