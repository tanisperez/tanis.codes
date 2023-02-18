---
title: "Solid principles"
date: 2023-02-18T18:11:00+01:00
draft: false
toc: false
image: "/images/solid-principles/logo.png"
description: "SOLID principles are a set of design guidelines that help developers create maintainable, scalable, and testable software. Learn how to apply SOLID in this blog post."
tags:
  - software-engineering
---

SOLID is an acronym for a set of design principles that are intended to make software more maintainable, scalable, and testable. These principles can be applied to object-oriented programming (OOP) and other software design methodologies. The SOLID principles were introduced by Robert C. Martin, also known as Uncle Bob, in the early 2000s.

## Single Responsibility Principle (SRP)
A class should have only one reason to change. In other words, a class should have only one responsibility. This principle helps to keep classes small, focused, and easier to understand.

## Open/Closed Principle (OCP)
Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. In other words, you should be able to extend the behavior of a class without modifying its source code. This principle promotes code reuse and reduces the risk of introducing new bugs.

## Liskov Substitution Principle (LSP)
Subtypes should be substitutable for their base types. In other words, if a program is using a base class, it should be able to use any of its derived classes without knowing it. This principle helps to ensure that classes are interchangeable and can be used in different contexts.

## Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they do not use. In other words, classes should not be required to implement methods they don't need. This principle helps to keep classes small, focused, and easier to understand.

## Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions. This principle helps to decouple modules and reduce the risk of introducing new bugs.

## To summarize
The SOLID principles help to improve the quality of software design by making it more modular, extensible, and maintainable. By following these principles, developers can create code that is easier to read, test, and modify. Additionally, SOLID principles promote the use of design patterns, such as the Factory Method and the Dependency Injection patterns, which further improve the quality of software design.

In conclusion, the SOLID principles are a set of design principles that are intended to make software more maintainable, scalable, and testable. By following these principles, developers can create code that is easier to understand, modify, and test. The SOLID principles are not a set of hard and fast rules, but rather guidelines that should be adapted to each project and context.

## References
* Wikipedia: https://en.wikipedia.org/wiki/SOLID
* Ugonna Thelma post in medium: https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898