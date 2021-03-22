import Controller from '@ember/controller';

export default class Error_Controller extends Controller {
  model!: Error;

  get error(): Error {
    return this.model;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    error: Error_Controller;
  }
}
