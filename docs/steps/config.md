---
title: The Config
index: 1
---

# Override config/environment value

Overrides a property on the config/environment object.

Useful for testing various states that would otherwise require rebuilding the app with a different config.

Uses `set()`, so a nested path delimited with dots can be used. All levels except for the innermost must preexist.

Signature: 

    Given (?:the )config/environment property $opinionatedString is set to $opinionatedJSON

Examples:

    Given the config/environment property "third-party-service.apiKey" is set to "123xyz"
    Given config/environment property "some-ember-addon" is set to { enabled: true, foo: 'bar' }
