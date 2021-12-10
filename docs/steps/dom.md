---
title: DOM
index: 3
---

DOM manipulation steps
======================

Package name: `@ember-bdd/steps-dom`.

Steps for interacting with elements on the page, mostly delegating to [@ember/test-helpers](https://github.com/emberjs/ember-test-helpers/).

Note: this package does not include steps for interacting with the URL. Those are in the [steps-ember](./ember).



Clicking an element
-------------------

Triggers a click event on an element. Delegates to [click](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#click).

Expects exactly one element to match the selector label.

⚠ This step would silently ignore disabled form elements. That's unlike the `click()` helper from `@ember/test-helpers` which would throw an error when attempting to click a disabled element. Throwing an error lets you notice early that you're doing something that might be unintended and meaningless. But it might as well being intended, e. g. when trying to reproduce a BDD scenario written by a UI/UX designer, and the scenario involves clicking an element. See [related discussion](https://github.com/emberjs/ember-test-helpers/issues/1100) and [implementation](https://github.com/emberjs/ember-test-helpers/pull/778).

**Signature**: 

```feature
When I click (?:on )?$emberBddLabel
```

**Examples**:

```feature
When I click Submit-Button
When I click the Submit-Button
When I click on Submit-Button
When I click on the Submit-Button
```



Double clicking an element
-------------------

Triggers a click event on an element. Delegates to [click](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#click).

Expects exactly one element to match the selector label.

⚠ This step would silently ignore disabled form elements. That's unlike the `click()` helper from `@ember/test-helpers` which would throw an error when attempting to click a disabled element. Throwing an error lets you notice early that you're doing something that might be unintended and meaningless. But it might as well being intended, e. g. when trying to reproduce a BDD scenario written by a UI/UX designer, and the scenario involves clicking an element. See [related discussion](https://github.com/emberjs/ember-test-helpers/issues/1100)  and [implementation](https://github.com/emberjs/ember-test-helpers/pull/778).

**Signature**: 

```feature
When I double click (?:on )?$emberBddLabel
```

**Examples**:

```feature
When I double click Submit-Button
When I double click the Submit-Button
When I double click on Submit-Button
When I double click on the Submit-Button
```



Typing text into a text field
-----------------------------

Fills text into given input, textarea or a contenteditable, or selects a value in a select. Delegates to [click](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#click).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I (?:fill|type) "(.*)" into $emberBddLabel
```

**Examples**:

```feature
When I type "foo" into the Name-Field
When I fill "bar" into Name-Field
```



Moving the mouse pointer into an element
----------------------------------------

Fills text into given input, textarea or a contenteditable, or selects a value in a select. Delegates to [click](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#click).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I move the mouse pointer out of $emberBddLabel
```

**Examples**:

```feature
When I type "foo" into the Name-Field
When I fill "bar" into Name-Field
```




Asserting elemnet existence/count
---------------------------------

Asserts that a given number of elements exist or dont' exist on a page

**Signature**: 

```feature
Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel
```

**Examples**:

```feature
Then there should be NO Items
Then there should be 0 Items
Then there should be an Item
Then there should be 1 Item
Then there should be 2 Items
```
