---
title: Annotations
index: 3
---

# Annotations

Annotations are a Cucumber equivalent of functions that accept [Ember testing hooks](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md#new-apis).

You prepend a feature or a scenario with one or more keywords prefixed with `@`:

```feature
@setupApplicationTest
Feature: Product page

Scenario: I should not be redirected away
  When I visit URL "/products"
  Then I should be at URL "/products"

@setupLocalStorage
Scenario: I should be redirected when I'm a premium user
  Given there's a local storage entry "premium" with value "true"
  When I visit URL "/products"
  Then I should be at URL "/premium-products"
```

In this feature, the initializations correspoinding to `@setupApplicationTest` will be applied to every scenario. But on the latter scenario will receive the `@setupLocalStorage` initialization.



## Defining annotations

Annotations are defined in the file:

    tests/bdd/annotations.js

This file should export an object: a record of functions that accept [Ember testing hooks](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md#new-apis).

```js
import { setupApplicationTest } from 'ember-qunit';
import { setupWindowMock } from 'ember-window-mock/test-support';
import setupLocalStorage from 'my-app/tests/helpers/setup-local-storage';

export default {
  setupApplicationTest,
  setupWindowMock,
  setupLocalStorage,
}
```

You could use them like this:


```feature
@setupApplicationTest
@setupWindowMock
@setupLocalStorage
Feature: Products page
```



## Writing custom annotations

You write a custom annotation just like you would write a custom Ember test initializer:

```js
import ThirdPartyLibrary from 'third-party-library';

function setupThirdPartyLibrary(hooks) {
  hooks.beforeEach(() => {
    ThirdPartyLibrary.setup();
  });

  hooks.afterEach(() => {
    ThirdPartyLibrary.teardown();
  });
}

export default {
  setupThirdPartyLibrary();
}
```


## Grouping annotations

There's a fair chance that you want all you tests to be initialized with the same set of annotations. It is annoying to write many of them for every test.

To resolve this, you can create an annoation that would call multiple initializers:

```js
import { setupApplicationTest } from 'ember-qunit';
import { setupWindowMock } from 'ember-window-mock/test-support';
import setupLocalStorage from 'my-app/tests/helpers/setup-local-storage';

export default {
  setupApplicationTest,
  setupWindowMock,
  setupLocalStorage,

  setupApplicationTestCustom(hooks) {
    setupApplicationTest(hooks);
    setupWindowMock(hooks);
    setupLocalStorage(hooks);
  }
}
```

Now you can use one `@setupApplicationTestCustom` instead of three others.



## Parameterized annotations

Cucumber lets you invoke annotations with arguments like this:

```feature
@setupThirdPartyLibrary=cat,dog
@setupYetNotherLibrary={mode: 'simplified', slots: [3, 2, 1]}
Feature: Products
```

The annotation argument (string after `=`) will be passed as the the second argument in your annotation function:

```js
import ThirdPartyLibrary from 'third-party-library';
import YetAnotherLibrary from 'yet-another-library';

export default {
  setupThirdPartyLibrary(hooks, animalsStr) {
    const animals = animalsStr.split(',');
    
    hooks.afterEach(() => {
      ThirdPartyLibrary.feedAnimals({animals});
    });
  },

  setupYetAnotherLibrary(hooks, jsonStr) {
    const config = JSON.parse(jsonStr);
    
    hooks.beforeEach(() => {
      YetNotherLibrary.init(config);
    });
  },
}
```



## Built-in annotations

There are three annotations built into `ember-bdd`:

* `@only`: prevents running all other features/scenarios not marked with `@only`; see [QUnit.test.only](https://api.qunitjs.com/QUnit/test.only/).
* `@skip`: prevents running given feature/scenario, but log it into QUnit; see [QUnit.test.skip](https://api.qunitjs.com/QUnit/test.skip/).
* `@todo`: runs a feature/scenario but expects it to fail; see [QUnit.test.todo](https://api.qunitjs.com/QUnit/test.todo/).

