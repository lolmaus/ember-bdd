import ArrayProxy from '@ember/array/proxy';
import Route from '@ember/routing/route';
import ProductVariant from 'test-app/models/product-variant';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

export default class Application extends Route {
  @service store!: Store;

  model(): Promise<ArrayProxy<ProductVariant>> {
    return this.store.findAll('product-variant');
  }
}
