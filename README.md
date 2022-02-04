ember-bdd
=========

A Cucumber-style BDD testing solution for Ember.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
* Embroider or ember-auto-import v2


Docs
----

https://kaliber5.github.io/ember-bdd/



Roadmap
-------

`ember-bdd` is in development.

* [ ] Core features
  * [x] Technical design
  * [x] Monorepo setup
  * [x] Feature parser: converts a `foo.feature` file to `foo-test.js`
  * [x] Test declarator: integrates with QUnit
  * [x] Meaningful errors
  * [x] Expose assert as `this.assert`
  * [x] Opinionated step composition
  * [x] Annotations
  * [x] Dictionary/converters/macros
  * [x] Step aliases
  * [x] Labels
  * [x] Custom labels
  * [ ] Blueprints
* [ ] Step library + step docs
  * [x] Ember (visit, settled, pause, debugger, URL, etc)
  * [x] config/environment
  * [x] DOM
  * [ ] Local storage
  * [ ] Mirage
  * [ ] Window
  * [ ] Configuration service
  * [ ] Power Select
  * [ ] Power Date Picker
* [ ] Documentation
  * [ ] Content
    * [x] Concept
      * [x] Glossary
      * [x] Truth to feature files
      * [x] Labels for test selectors 
      * [x] Composing step implementations
      * [x] Debugging
    * [ ] Usage
      * [x] Project structure
      * [x] Dictionary
      * [x] Annotations
      * [ ] Labels
      * [ ] Custom labels
      * [ ] Step implementations
    * [ ] Addon development
      * [ ] Addon structure 
  * [ ] Implementation
    * [x] Setup a docs app
    * [x] FastBoot setup 
    * [x] Table of contents
    * [x] Forward and back links
    * [x] Minimal visual design
    * [ ] Text formatting styles
    * [ ] Syntax highlighting
    * [ ] Fancy visual design
    * [x] CI, deployment
  * [ ] Package
    * [ ] Update all things
    * [ ] Fill out readmes (or remove?)
    * [ ] Fill out `package.json`s
    * [ ] Set up `release-it` via [create-rwjblue-release-it-setup](https://github.com/rwjblue/create-rwjblue-release-it-setup)
    * [ ] Publish to npm
