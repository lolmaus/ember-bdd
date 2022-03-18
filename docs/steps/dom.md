---
title: DOM
index: 3
---

DOM manipulation steps
======================

Package name: `@ember-bdd/steps-dom`.

Steps for interacting with elements on the page, mostly delegating to [@ember/test-helpers](https://github.com/emberjs/ember-test-helpers/).

Note: this package does not include steps for interacting with the URL. Those are in the [steps-ember](./ember).



User action steps
-----------------
### Clicking an element

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



### Double clicking an element

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



### Typing text into a text field

Fills text into given input, textarea or a contenteditable, or selects a value in a select. Delegates to [click](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#click).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I (?:fill|type) $emberBddString into $emberBddLabel
```

**Examples**:

```feature
When I type "foo" into the Name-Field
When I fill "bar" into Name-Field
```



### Moving the mouse pointer into an element

Triggers a `mouseenter` event on the element. Delegates to [triggerEvent](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#triggerEvent).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I move the mouse pointer into $emberBddLabel
```

**Examples**:

```feature
When I move the mouse pointer into the Name-Field
When I move the mouse pointer into Name-Field
```



### Moving the mouse pointer out of an element

Triggers a `mouseleave` event on the element. Delegates to [triggerEvent](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#triggerEvent).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I move the mouse pointer out of $emberBddLabel
```

**Examples**:

```feature
When I move the mouse pointer out of the Name-Field
When I move the mouse pointer out of Name-Field
```



### Focusing into an element

Delegates to [focus](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#focus).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I focus into $emberBddLabel
```

**Examples**:

```feature
When I focus into the Name-Field
When I focus into Name-Field
```



### Unfocusing from an element

Delegates to [blur](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#blur).

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel
```

**Examples**:

```feature
When I focus out of the Name-Field
When I unfocus out of the Name-Field
When I blur out of Name-Field
When I focus from the Name-Field
When I unfocus from the Name-Field
When I blur from Name-Field
```




### Selecting or deselecting an input or radio button

If the matching element is not a checkbox or radio, then a checkbox/radio will be looked up inside the matching element. This lets you work with an input by targeting its container.

This step delegates to [click](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#click), but it also makes a check comparing the element's initial state with the action. It will crash when attempting to delelect a deselected input/radio, select a selected input/radio, deleselect any radio.

Expects exactly one element to match the selector label.

**Signature**:

```feature
When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel
```

**Examples**:

```feature
When I select checkbox Consent-Field
When I deselect the checkbox Consent-Field
When I select radio Radio[prefer not to tell]
```



Assertion steps
---------------

### Asserting elemnet existence/count

Asserts that a given number of elements exist or dont' exist on a page.

**Signatures**: 

```feature
Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel
Then I should see (NO |no )?(?:(\\d+) )?$emberBddLabel
```

**Examples**:

```feature
Then there should be NO Items
Then there should be 0 Items
Then there should be an Item
Then there should be 1 Item
Then there should be 2 Items
Then I should see NO Items
Then I should see 0 Items
Then I should see an Item
Then I should see 1 Item
Then I should see 2 Items
```



### Asserting element has (does not have) given text

If a given element is an input or textarea, then this step asserts that the element's value exactly matches given text.

Otherwise, it asserts that the element **trimmed** text content matches given text.

Expects exactly one element to match the selector label.

**Signature**:

```
Then $emberBddLabel should (not |NOT )?(?:have text|say|be) $emberBddString
```

**Examples**:

```feature
Then the Error-Message should have text "Something went wrong!"
Then the Error-Message should NOT have text "Something went wrong!"
Then the Title of 1st Post should say "Hello, World!"
Then the Title of 1st Post should NOT say "Hello, World!"
Then the Quantity of the Cart should be "2"
Then the Quantity of the Cart should NOT be "2"
```




### Asserting element has (does not have) focus

Expects exactly one element to match the selector label (except for NOT cases).

**Signature**:

```
Then $emberBddLabel should (not |NOT )?have focus
```

**Examples**:

```feature
Then the Link should have focus
Then the Link should not have focus
Then the Link should NOT have focus
```




### Asserting element has (does not have) given HTML class

Expects exactly one element to match the selector label (except for NOT cases).

**Signature**:

```
Then $emberBddLabel should (not |NOT )?have HTML class $emberBddString
```

**Examples**:

```feature
Then the Link should have HTML class "active"
Then the Link should not have HTML class "disabled"
Then the Link should NOT have HTML class "current"
```




### Asserting checkbox/radio is checked

Expects exactly one element to match the selector label (except for NOT cases).

Expects the element to be a checkbox or a radio button.

**Signature**:

```
Then $emberBddLabel should (not |NOT )?be checked
```

**Examples**:

```feature
Then the Consent-Checkbox should be checked
Then the Radio(yes) should be checked
Then the Radio(no) should NOT be cheked
Then the Radio(no) should not be cheked
```
