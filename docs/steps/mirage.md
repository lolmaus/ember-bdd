---
title: Mirage
index: 4
---

Mirage steps for mocking a backend
==================================

Package name: `@ember-bdd/steps-mirage`.

Steps for working the [Mirage](https://www.ember-cli-mirage.com) mock database to imitate a backend: seeding, simulating errors, etc.


Working with relationships
--------------------------

Relationships must be provided via attributes such as `modelNameId` and `modelNameIds`, containing a string id or an array of string ids.

For polymorphic relationships, enitity objects must be provided instead of string ids e . g. `{id: '1', type: 'model-name'}`.

All referenced records must already exist in Mirage database.

For two-way relationships, you only need to provide one side of the relationships, so bidirectional referencing manually is unnecessary. That's provided you have properly used the `inverse` [relationship option](https://api.emberjs.com/ember-data/release/functions/@ember-data%2Fmodel/hasMany#explicit-inverses) in Ember Data.

Seeding records with bidirectional references is actually impossible: in order to prodvide a bidirectional reference, you'd have to reference a record that hasn't been seeded yet. To work around this limitation, you could seed the first record without referencing the second one, then seed the second record referencing the first one, then *update* the first record to reference the second one. But again, that's not necessary because both Ember Data and Mirage are smart enough to figure out the other end of a bidirectional relationship.



Seeding steps
-----------------

### Creating DB records (single-line)

Creates a given number of records in the Mirage database.

This step is useful when:

1. There are not too much attributes to provide.
2. Ids of records are not imporant, i. e. you don't need to reference created records in subsequent steps.

Model name is tolerant to casing and quantity form. CamelCase is recommended

**Signature**: 

```feature
Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?
```

**Examples**:

```feature
Given there is a record of type "ProductVariant" 
Given there are 5 records of type "product-variant"
Given there are 5 records of type "ProductVariant" with trait "foo"
Given there are 5 records of type "ProductVariant" with traits "foo, bar, baz"
Given there are 5 records of type "ProductVariant" with properties {name: "john", age: 30}
Given there are 5 records of type "ProductVariant" with traits "foo, bar, baz"
Given there are 5 records of type "ProductVariant" with traits "foo, bar" and properties {name: "john", age: 30}
```

