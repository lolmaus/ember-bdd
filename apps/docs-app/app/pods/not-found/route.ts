import Route from '@ember/routing/route';
import NotFoundError from 'docs-app/utils/errors/not-found';

export default class NotFondRoute extends Route {
  beforeModel(): never {
    throw new NotFoundError();
  }
}
