---
title: Project Structure
index: 1
---



Project structure
=================



/tests/test-helper.js
---------------------

This file is an entry point for your Ember tests.

Here you need to initialize the [Chai](https://www.chaijs.com) assertion library which is used internally by `ember-bdd`:

```js
import chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);
```



/tests/bdd/steps.js
---------------------

This file must export an object containing step implementations.

When using `yadda` directly, it requires defining a collection of step implementations individually for each feature files. Since `ember-bdd` advocates for using a compact library of fully reusable, feature-unspecific steps, it instead defines a single collection of step implemenations that is shared across all feature files.

```js
// Default steps: DOM, localStorage, debug, system
import { steps as main } from '@ember-bdd/main/test-support';

// Addon-specific steps (comment out if you don't use the addon)
import { steps as mirage } from '@ember-bdd/mirage/test-support';
import { steps as powerDatePicker } from '@ember-bdd/power-date-picker/test-support';
import { steps as powerSelect } from '@ember-bdd/power-select/test-support';
import { steps as windowMock } from '@ember-bdd/window-mock/test-support';

// Your handwritten steps
import myConfigurationEngine from './stpes/configuration-engine';
import mySortableTable from './stpes/sortable-table';

export default {
  ...dom,
  ...localStorage,
  ...system,

  ...mirage,
  ...powerDatePicker,
  ...powerSelect,
  ...windowMock,

  ...myconfigurationEngine,
  ...mySortableTable,
}
```



/tests/bdd/steps/*.js
-----------------------

This is where you define custom step implementations:

```js
import { setConfigurationState } from 'my-app/utils/configuration';

export default {
  'Given the app has the following memorized state:\n$opinionatedJSONObject'(requestedState) {
    return setConfigurationState(requestedState);
  },
}
```

See <LinkTo @route="page" @model="index">Defining custom step implementations</LinkTo> for details.



/tests/bdd/dictionary.js
------------------------

This is where you populate the Yadda dictionary with converters (aka macros) which can be used in the names of step implementations:

```js
import {
  date,
  integer,
  float,
  list,
  table,
  json,
  string,
 } from '@mber-bdd/core';

 import { modelName } from '@ember-bdd/mirage';

export default {
    date,
    integer,
    float,
    list,
    table,
    json,
    string,
    modelName,
}
```

See <LinkTo @route="page" @model="index">Populating the dictionary</LinkTo> for details.



/tests/bdd/custom-labels.js
-----------------------------

Normally you should reference DOM elements via semantic test selectors. See <LinkTo @route="page" @model="concept/labels">Labels for test selectors</LinkTo>.

But sometimes you have to deal with third-party components. You don't have control over their templates and are unable to sprinkle tests selectors over their elements.

Custom labels to the rescue! Define some labels to serve as aliases for arbitrary selectors:

```js
{
  'Bootstrap-Field-Error': '.invalid-feedback',
}
```

Please read up on <LinkTo @route="page" @model="index">Custom labels</LinkTo>.



/tests/bdd/annotations.js
---------------------------

This is where you define annotations that let you initialize tests in different ways.

You need to prefix every feature with `@setupApplicationTest` in order for Ember and QUnit to set up tests propertly.

You can prefix a feature or a scenario with `@skip` in order not to run it.

Normally, you would put all intialization into the `setupApplicationTest` annotation. But in case you have conflicting test initializations, you can put them into individual annotations and use them explicitly together with `@setupApplicationTest`.

```js
import { setupApplicationTest } from 'ember-qunit';

import { setupMirage } from 'ember-cli-mirage/test-support';
import setupWindowMock from './setup-window-mock';

import { setup as setupEmberBddMain } from '@ember-bdd/main';

import setupResetState from './setup-reset-app';

export default {
  skip(test) {
    console.info(`Skipping ${test.type} "${test.title}"`);
    return fazse; // Prevents test execution
  },

  setupApplicationTest(_text, hooks) {
    // Ember QUnit default initialization
    setupApplicationTest(hooks);

    // Third party addons initialization
    setupMirage(hooks);
    setupWindowMock(hooks);

    // ember-bdd initialization
    setupEmberBddMain(hooks);

    // Your own initializaion
    setupResetState(hooks);
  },
}
```

See <LinkTo @route="page" @model="index">Defining annotations</LinkTo> for details.



/tests/acceptance/*.feature
---------------------------

These are your feature files. A feature file is equvalent to an acceptance test file.

Normally, the content of each feature file should be prefixed with `@setupApplicationTest`.

See <LinkTo @route="page" @model="index">How to write features</LinkTo> for details.




/tests/acceptance/steps/*-steps.js
----------------------------------

**Normally, you don't need these files**, so they don't exist by default.

If you create one, it must be paired with a feature file, e. g.:

````
/tests/acceptance/shop-page.feature
/tests/acceptance/steps/shop-page-steps.js
```

`*-steps.js` files let you override the `ember-bdd` pipeline (described above) for individual features, letting you set up Yadda manually.

This might be useful in one of two cases:

* Support legacy [ember-cli-yadda](https://github.com/kaliber5/ember-cli-yadda) tests or vanilla [Yadda](https://github.com/acuminous/yadda) tests.
* Avoid conflicts in step names or converters (macros).

We do not recommend using this aproach. Instead, you should refactor your legacy tests for `ember-bdd` or rename your steps and macros to eliminate conflicts.

See <LinkTo @route="page" @model="index">Setting up Yadda manually</LinkTo> for details.
