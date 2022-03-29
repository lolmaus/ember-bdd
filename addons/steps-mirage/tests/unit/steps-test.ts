import steps from '@ember-bdd/steps-mirage/steps';
import { module, test } from 'qunit';
import { STR_STRING_WITH_ESCAPE as emberBddString } from '@ember-bdd/core';

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

  module('Creating DB records (single-line)', function () {
    test('Seed simple record, dash-case', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'product-variant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed simple record, camel-case', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'ProductVariant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed simple record, snake_case', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'product_variant', undefined, undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's id";
      assert.equal((server.db.productVariants[0] as ProductVariant).id, '1', m);
    });

    ///

    test('Seed record with a trait', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'product-variant', 'nameJohnDoe', undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);
    });

    ///

    test('Seed record with traits', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'product-variant', 'nameJohnDoe, age30', undefined);

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 30, m);
    });

    ///

    test('Seed record with attrs', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'product-variant', undefined, '{ "name": "Alice", "age": "20" }');

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'Alice', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 20, m);
    });

    ///

    test('Seed record with traits and attrs', function (assert) {
      let m: string;

      steps[
        `Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`

        // @ts-expect-error The fisrt argument has a default value
      ](undefined, 'product-variant', 'nameJohnDoe', '{ "age": "30" }');

      m = 'Record count';
      assert.equal(server.db.productVariants.length, 1, m);

      m = "First record's name";
      assert.equal((server.db.productVariants[0] as ProductVariant).name, 'John Doe', m);

      m = "First record's age";
      assert.equal((server.db.productVariants[0] as ProductVariant).age, 30, m);
    });
  });
});
