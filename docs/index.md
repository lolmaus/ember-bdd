---
title: 'What and Why'
---

Welcome to ember-bdd documentation
====================================

`ember-bdd` provides a complete framework for Behavior Driven Development in your EmberJS app, including:

* A wrapper over the [Yadda](https://github.com/acuminous/yadda) library, which is a JS implementation of the Cucumber BDD methodology.
* A set of very opinionated and very efficient practices of organizing your BDD tests.
* A collection of utilities to leverage those practices with ease.
* A compact library of reusable BDD step implementations.

The goal of `ember-bdd` is to resolve many of the issues attributed to the Cucumber methodology.



Why Cucumber
------------

Cucumber is a famous BDD implementation that offers exciting benefits:



### Acceptance tests in form of *user stories* offer a lot of benefits:
  
* User stories provide *guarantees*.
* Thus, they have *business value* for all stakeholders, whereas unit-tests serve rather a safeguard for developers only.
* User stories integrate into the BDD cycle in a broader sense.
* User stories thread through all the lifecycle of a feature, from conception to deployment.
* User stories get all team members involved: not only developers, but also managers, designers, product owners, customer representatives, etc.



### Extensive *user story coverage* can be very helpful:

* It reveals the true size of features.
* It allows for more realistic estimations.
* It serves as a technical design specification.
* It is written in a human-readable language, understandable to non-developers.
* It serves as *the* source of truth for resolving disagreements.
* It simplifies progress tracking.
* It focuses on user needs, rather than [developer needs](https://www.goodreads.com/book/show/44098.The_Inmates_Are_Running_the_Asylum).
* It encourages creating numerous minimal test cases, as opposed to few enormous cases that attempt to test everything in one go.
* It integrates well into automated testing.



## Cucumber has its problems and ember-bdd solves them

Though Cucumber has a large army of faithful fans, it has a comparable amount of haters. Lots of developers have tried Cucumber and found that it caused more trouble than it solved.

Many developers on their path to embrace BDD, including me, have started as avid Cucumber enthusiasts and then got severely disappointed, or got their teammates on — or over — the fence.

I'm convinced that it's not Cucumber to blame, rather it's the misuse of the tool that causes grief. In much the same way, it would be ridiculous to advocate against using kitchen knives because you have cut your finger. 😏

I have identified a number of issues with how Cucumber is typically used and, I believe, successfully solved them in this addon. The resulting approach is quite radical and quite effective. Read on!

-- [Andrey Mikhaylov @lolmaus](https://github.com/lolmaus)
