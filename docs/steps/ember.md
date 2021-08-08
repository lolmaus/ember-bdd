---
title: Ember
index: 2
---

Ember-related steps
===================

Steps for interacting with the Ember framework itself, primarily delegating to [@ember/test-helpers](https://github.com/emberjs/ember-test-helpers/).

Note: this package does not include steps for interacting with the DOM. Those are in a separate package.



Visiting an URL
---------------

Visit a given URL. Delegates to [visit](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#visit).

**Signature**: 

```feature
When I visit URL $emberBddString
```

**Examples**:

```feature
When I visit URL "/"
When I visit URL "/products?sort=desc"
```



Waiting for settled state
-------------------------

Waits for pending processes to finish before proceeding to the next step. Delegates to [settled](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#settled).

Note: normally you don't need this step as most steps wait for settled state on their own. This step can be useful for testing the loading state in conjunction with steps that do something without waiting.

**Signature**:

```feature
When the app settles
```



Pausing test execution indefinitely
-----------------------------------

Useful for debugging a test.

Also quite useful for development in the BDD fashion. Set up seeding and interaction, then every time you save code changes, the app will reload to a specific state. This can save you a lot of time because you won't need to manually open modals, expand items, fill out forms *every time* you Save in your IDE.

Delegates to [pauseTest](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#pausetest).

**Signature**:

```feature
Then pause
```




Pausing test execution for a duration
-------------------------------------

Useful for waiting for a process to complete.

Pausing for 0 ms is an equivaleng of waiting for the [Ember.run.next](https://api.emberjs.com/ember/release/functions/@ember/runloop/next) runloop cycle.

Delegates to [pauseTest](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#pausetest).

⚠ In most cases, this step is a bad practice as it makes your tests slow and fragile. Instead, you should make effort to make Ember aware of pending processes via [@ember/test-waiters](https://github.com/emberjs/ember-test-waiters).

**Signatures**:

```feature
When (?:I )?pause for $emberBddInt ms
Then pause for $emberBddInt ms
```

**Examples**:

```feature
When I pause for 0 ms
When pause for 100 ms
Then pause for 3000 ms
```



Debugger
--------

Runs `debugger`. Useful for debugging a test.

It would not let you inspect any variables since the test would freeze in the context of a separate step and not app code. Nor will you have access to Ember Inspector.

What this step is very useful for is to see the page in a state that the following step works with.

If a step is not properly waiting for some process, it will execute before the process finishes and yield unexpected results. If you pause your test with `pauseTest` (see above), you may see the process finish. It is likely you will not realize that it has finished *after* the step ran. For example, you see a button appear, yet the next step fails due to an attempt to click an non-existent button.

The debugger step resolves this issue: it freezes the app execution entirely, letting you inspect the DOM and see if test execution has waited for e. g. the button to appear.

**Signature**:

```feature
Then debug(?:ger)?
```

**Examples**:

```feature
Then debug
Then debugger
```



Checking if you're at a given URL (full URL)
--------------------------------------------

Asserts against [currentURL](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#currenturl).

**Signature**:

```feature
Then I should (?:still )?be (?:at|on) URL $emberBddString
```

**Examples**:

```feature
Then I should be at URL "/"
Then I should be on URL "/foo"
Then I should still be at URL "/products?sort=desc"
Then I should still be on URL "/"




Checking if you're at a given URL (pathname only)
-------------------------------------------------

Asserts against [currentURL](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#currenturl) with query params omitted.

**Signature**:

```feature
Then current URL's pathname should be $emberBddString
```

**Examples**:

```feature
Then current URL's pathname should be "/products"
```



Checking for a query param existence
----------------------------------------

Extracts given query param from [currentURL](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#currenturl) and asserts it exists (or does not exist). 

**Signature**:

```feature
Then current URL should (not |NOT )?have query param $emberBddString
```

**Examples**:

```feature
Then current URL should have query param "foo"
Then current URL should not have query param "foo"
Then current URL should NOT have query param "foo"
```





Checking for a query param key value
------------------------------------

Extracts given query param from [currentURL](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#currenturl) and asserts its value matches (or does not match) a given value. 

**Signature**:

```feature
Then current URL should (not |NOT )?have query param $emberBddString with value $emberBddString
```

**Examples**:

```feature
Then current URL should have query param "foo" with value "bar"
Then current URL should not have query param "foo" with value "bar"
Then current URL should NOT have query param "foo" with value "bar"
```

