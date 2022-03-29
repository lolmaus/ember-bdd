import Model, { attr } from '@ember-data/model';

export default class ProductVariant extends Model {
  @attr('string') name!: string | null;
  @attr('number') age!: number | null;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'product-variant': ProductVariant;
  }
}
