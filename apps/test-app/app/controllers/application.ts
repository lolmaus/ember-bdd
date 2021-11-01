import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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

export default class Application extends Controller {
  click = useResource(this, ClickResource);
  dblclick = useResource(this, DblclickResource);
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    application: Application;
  }
}
