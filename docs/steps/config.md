---
title: The Config
index: 1
---

Config steps
============

Package name: `@ember-bdd/steps-config-environment`.

These are steps interacting with the `config/environment` configuration.



Override config/environment value
---------------------------------

Overrides a property on the config/environment object.

Useful for testing various states that would otherwise require rebuilding the app with a different config.

Uses `set()`, so a nested path delimited with dots can be used. All levels except for the innermost must preexist.

**Signature**: 

```feature
Given (?:the )config/environment property $opinionatedString is set to $opinionatedJSON
```

**Examples**:

```feature
Given the config/environment property "third-party-service.apiKey" is set to "123xyz"
Given config/environment property "some-ember-addon" is set to { enabled: true, foo: 'bar' }
```
