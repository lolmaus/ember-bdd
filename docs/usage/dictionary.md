---
title: Dictionary
index: 2
---

# The dictionary

## Using regular expressions in step names

Yadda allows usage of regualr expressions in step names, emabling step implementations to be highly reusable.

Here's an example of a step implementation with a regular expression:


```feature
Then the page title should be "Hello World"
```

```js
{
  'Then the page title should be (.+)'(expectedStr) {
    expectedStr; // => 'Hello World'
    expect(window.document.title).equal(expectedStr);
  }
}
```

Each capturing group is represented by an argument of the step implementation function, in the order of appearance.



## Using undefined marcos

You can use macros in the form of `$macroName` in place of regular expressions.

If you have not defined the macro you're using, then it will [default to](https://github.com/acuminous/yadda/blob/v2.1.0/lib/Dictionary.js#L69) the `(.+)` regular expressuon.

```feature
Then the page title should be "Hello World"
```

```js
{
  'Then the page title should be $str'(expectedStr) {
    expectedStr; // => 'Hello World'
    expect(window.document.title).equal(expectedStr);
  }
}
```

⚠ We do not recommend using undefined macros due to their ambiguity. Either use regular expressions explicitly or use defined macros with narrow purpose.



## Defining macros

Macros go into the *dictionary* located at:

    tests/bdd/dictionary.js

This file should have a default export of an object: a record with macro definitions.

There are a number of ways to define a macro:

```js
  export default {
    // A regular expression with a capturing group
    $email: /(.+?@.+)/, // john.doe@example.com

    // A regular expression with multiple capturing groups
    $fullName: /(.+?) (.+?)/, // John Doe

    // An alias delegating to another macro
    $eMail: '$email',

    // An alias delegating to multiple aliases
    $fullNameWithEmail: '$fullName <$email>', // John Doe <john.doe@example.com>

    // A tuple of a regular expression and a converter function
    $index: [
      /(\d+)/,
      (numberStr) => parseInt(numberStr, 10) - 1;
    ],
  };
```



## Implementing converters

All values extracted by regular expressions come as strings. A converter lets you convert a string into something else:

* a modified string;
* a number;
* a `Date` object;
* a DOM element from the DOM;
* a database record (in case you're using a frontend data layer such as [Mirage](https://miragejs.com));
* etc.

A converter is a function that accepts strings from capturing groups and returns a value for your step implemenation to consume:

```feature
Then the 2nd .title should be "Hello world"
```

```js
export default {
  $index: [
    /(\d+)(?:st|nd|rd|th)/, // ?: means a non-capturing group
    (numberStr) => parseInt(numberStr, 10) - 1,
  ],

  $collection: [
    /(.+)/,
    (selector) => Array.from(document.querySelectorAll(selector)),
  ],
}
```

```js
import { expect } from 'chai';

export default {
  'Then the $element should be $quotedString'(element, text) {
    expect(element, 'Element not found').ok;
    expect(element.textContent.trim()).equal(text);
  }
}
```
