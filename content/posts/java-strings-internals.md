---
title: "Java Strings Internals"
date: 2025-09-30T12:47:00+02:00
draft: false
toc: true
image: "/images/java-strings-internals/java-logo.png"
description: "Deep dive into Java Strings internals: learn about storage optimizations, encoding evolution, and performance improvements across different JDK versions."
tags:
  - java
  - performance
  - jdk
---

Java Strings are one of the most used data structures in the Java ecosystem. While they seem simple on the surface, their internal implementation has evolved significantly across different JDK versions to improve memory usage and performance.

## String Storage & Encoding

Before JDK 9, all String characters were stored using UTF-16 encoding, meaning each character consumed 2 bytes of memory regardless of the actual character being stored. This was inefficient for strings containing only ASCII characters, which was the common case for most applications.

### Compact Strings (JDK 9+)

JEP 254 introduced Compact Strings, a memory optimization that changed how strings are stored internally:

```java
// Before JDK 9 - Always UTF-16
String ascii = "Hello";     // 10 bytes (2 bytes per char)
String special = "Hello👋"; // 14 bytes (2 bytes per char including emoji)

// After JDK 9 - LATIN1 or UTF16
String ascii = "Hello";     // 5 bytes (1 byte per char)
String special = "Hello👋"; // 14 bytes (still UTF16 due to emoji)
```

This optimization automatically chooses between two encodings:

LATIN1 (ISO-8859-1) for strings that only contain characters that can be represented in one byte
UTF16 for strings that require more than one byte per character.


## References
- [JEP 254: Compact Strings](https://openjdk.org/jeps/254)
- [JEP 400: UTF-8 by Default](https://openjdk.org/jeps/400)

