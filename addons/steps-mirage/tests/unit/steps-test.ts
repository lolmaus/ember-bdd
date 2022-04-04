import steps from '@ember-bdd/steps-mirage/steps';
import { module, test } from 'qunit';
import { BddTestContext, STR_STRING_WITH_ESCAPE as emberBddString } from '@ember-bdd/core';

// @ts-ignore Missing type
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupTest } from 'ember-qunit';

interface ProductVariant {
  id: string;
  age?: number | null;
  name?: string | null;
}

module('Unit | Utility | steps', function (hooks) {
  setupTest(hooks);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setupMirage(hooks);

  module('Creating DB records with identical attributes (single-line)', function () {
    test('Seed simple record, dash-case', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'product-variant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed simple record, camel-case', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'ProductVariant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed simple record, snake_case', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'product_variant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed record with a trait', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'product-variant', 'nameJohnDoe', undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);
    });

    ///

    test('Seed record with traits', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'product-variant', 'nameJohnDoe, age30', undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 30, m);
    });

    ///

    test('Seed record with attrs', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'product-variant', undefined, '{ "name": "Alice", "age": "20" }');

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'Alice', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 20, m);
    });

    ///

    test('Seed record with traits and attrs', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`
      ].call(this, undefined, 'product-variant', 'nameJohnDoe', '{ "age": "30" }');

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 30, m);
    });
  });

  module('Creating DB records with identical attributes (multi-line)', function () {
    test('Seed simple record, dash-case', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'product-variant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed simple record, camel-case', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'ProductVariant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed simple record, snake_case', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'product_variant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed record with a trait', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'product-variant', 'nameJohnDoe', undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);
    });

    ///

    test('Seed record with traits', function (this: BddTestContext, assert: Assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'product-variant', 'nameJohnDoe, age30', undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 30, m);
    });

    ///

    test('Seed record with attrs', function (this: BddTestContext, assert: Assert) {
      let m: string;
      this.assert = assert;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'product-variant', undefined, [
        { key: 'name', value: '"Alice"' },
        { key: 'age', value: '20' },
      ]);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'Alice', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 20, m);
    });

    ///

    test('Seed record with traits and attrs', function (this: BddTestContext, assert: Assert) {
      let m: string;
      this.assert = assert;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`
      ].call(this, undefined, 'product-variant', 'nameJohnDoe', [{ key: 'age', value: '30' }]);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 30, m);
    });
  });

  module('Creating DB records with unique attributes', function () {
    test('without traits', function (this: BddTestContext, assert: Assert) {
      let m: string;
      this.assert = assert;

      steps[
        'Given there are records of type $emberBddMirageModelName with the following properties:\n$emberBddTable'
      ].call(this, 'product-variant', [
        { id: '"2"', name: '"John"', age: '30' },
        { id: '"1"', name: '"Alice"', age: '20' },
      ]);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 2, m);

      m = "First record's name";
      assert.equal((server.db.productVariants.find('1') as ProductVariant).name, 'Alice', m);

      m = "First record's age";
      assert.equal((server.db.productVariants.find('1') as ProductVariant).age, 20, m);

      m = "Second record's name";
      assert.equal((server.db.productVariants.find('2') as ProductVariant).name, 'John', m);

      m = "Second record's age";
      assert.equal((server.db.productVariants.find('2') as ProductVariant).age, 30, m);
    });

    test('with traits', function (this: BddTestContext, assert: Assert) {
      let m: string;
      this.assert = assert;

      steps[
        'Given there are records of type $emberBddMirageModelName with the following properties:\n$emberBddTable'
      ].call(this, 'product-variant', [
        { id: '"2"', age: 30, trait: 'nameJohnDoe' },
        { id: '"1"', name: '"Alice"', traits: 'age30' },
      ]);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 2, m);

      m = "First record's name";
      assert.equal((server.db.productVariants.find('1') as ProductVariant).name, 'Alice', m);

      m = "First record's age";
      assert.equal((server.db.productVariants.find('1') as ProductVariant).age, 30, m);

      m = "Second record's name";
      assert.equal((server.db.productVariants.find('2') as ProductVariant).name, 'John Doe', m);

      m = "Second record's age";
      assert.equal((server.db.productVariants.find('2') as ProductVariant).age, 30, m);
    });
  });
});
