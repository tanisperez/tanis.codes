---
title: "Java Strings Internals"
date: 2025-09-30T12:47:00+02:00
draft: false
toc: true
image: "/images/common/java.png"
description: "Deep dive into Java Strings internals: learn about storage optimizations, encoding evolution, and performance improvements across different JDK versions."
tags:
  - java
  - performance
---

Java Strings are one of the most used data structures in the Java ecosystem. A key characteristic of String class is its immutability - once created, a String object cannot be modified. This immutability provides several benefits:

- **Thread Safety**: Immutable objects are inherently thread-safe, making Strings ideal for concurrent applications.
- **Security**: Since Strings cannot be modified, they are safe to use for sensitive data like passwords or authentication tokens.
- **Caching**: The immutable nature allows Java to cache and reuse String objects through the String pool.

While Strings seem simple on the surface, their internal implementation has evolved significantly across different JDK versions to improve memory usage and performance.

## 1. String Storage and Encoding

Before JDK 9, all String characters were stored using UTF-16 encoding, meaning each character consumed 2 bytes of memory regardless of the actual character being stored. This was inefficient for strings containing only ASCII characters, which was the common case for most applications.

### 1.1. Compact Strings (JDK 9+)

JEP 254 introduced Compact Strings, a memory optimization that changed how strings are stored internally at runtime. This means that even if your code was compiled with Java 8, running it on JVM 9+ will automatically benefit from this optimization, as it's a JVM feature, not a compile-time one.

Let's see an example:

```java
// This code compiled with Java 8 will still use Compact Strings when run on JVM 9+
String ascii = "Hello";     // Will use LATIN1 encoding on JVM 9+
String special = "Hello👋"; // Will use UTF16 encoding on both JVM 8 and 9+
```

The JVM automatically chooses between two encodings:
- LATIN1 (ISO-8859-1) for strings that only contain characters that can be represented in one byte
- UTF16 for strings that require more than one byte per character

This optimization is transparent to the application code and can reduce the memory footprint of your application by up to 50% in cases where most strings contain only ASCII characters.

### 1.2. UTF-8 by Default (JDK 18+)

JEP 400 changed the default charset to UTF-8 in Java 18. Before this change, the default charset depended on the operating system and locale settings, which could lead to inconsistent behavior across different environments.

```java
// Before Java 18 - Default charset was platform dependent
// Windows en-US: windows-1252
// Linux en-US: UTF-8
// MacOS en-US: UTF-8
System.out.println(Charset.defaultCharset()); 

// After Java 18 - Always UTF-8 by default
System.out.println(Charset.defaultCharset()); // UTF-8
```

This change affects several Java APIs and system properties:
- `java.nio.charset.Charset.defaultCharset()`
- `System.getProperty("file.encoding")`
- File I/O operations
- Platform APIs that depend on character encoding

> **Note**: Internal String representation (LATIN1/UTF16) is different from the default charset used for I/O operations. Compact Strings optimization works at the JVM level, while the default charset affects how Java interacts with the external world.

#### 1.2.1. Potential Breaking Changes

If your application relies on the platform's default encoding, you might need to:

```java
// Explicit charset specification for backward compatibility
String content = new String(bytes, Charset.forName("windows-1252"));
Files.write(path, content.getBytes(StandardCharsets.ISO_8859_1));
```

## 2. String Pool and Interning

In Java, String interning is a method of storing only one copy of each distinct String value, which must be immutable. The String pool is a special storage area in the Java heap where Java stores these interned Strings. When you create a String literal, Java checks the String pool first to see if an identical String already exists. If it does, Java returns a reference to the pooled instance. If it doesn't, Java adds the new String to the pool and then returns the reference.

### 2.1. How Interning Works

Interning is done using the `String.intern()` method. When you intern a String, Java checks if the String is already in the pool. If it is, `intern()` returns the reference from the pool. If it's not, `intern()` adds the String to the pool and then returns the reference.

Here's an example:

```java
String a = "Hello";
String b = "Hello";
String c = new String("Hello").intern();

System.out.println(a == b); // true, both refer to the same instance in the pool
System.out.println(a == c); // true, c is interned and refers to the same instance as a
```

### 2.2. Benefits of Interning

- **Memory Savings**: Interning can save memory when you have many identical Strings, as only one copy of each String is stored in the pool.
- **Performance Improvement**: Comparing interned Strings is faster because you can use `==` instead of `equals()`, as interned Strings with the same content refer to the same object.

### 2.3. Drawbacks of Interning

- **Memory Consumption**: The String pool itself consumes memory, and if you intern too many Strings, it can lead to increased memory usage.
- **Garbage Collection**: Interned Strings are not garbage collected until the ClassLoader that loaded them is garbage collected. This can potentially lead to memory leaks if not managed properly.

### 2.4. When to Use Interning

Interning is useful when:
- You have a large number of identical Strings.
- You need to save memory.
- You need faster String comparison.

However, you should avoid interning:
- Large Strings, to prevent excessive memory usage.
- Strings from external sources (like user input), due to potential security risks like DOS attacks.

## 3. JVM String Optimizations

### 3.1. String Deduplication

String deduplication is a JVM feature that automatically identifies and removes duplicate String objects from memory. Unlike String interning, which you control explicitly through code, deduplication happens automatically during garbage collection when enabled.

To enable String deduplication:
```bash
-XX:+UseStringDeduplication
```

Example of deduplication in action:
```java
String a = new String("hello").intern(); // Goes to String pool
String b = new String("hello");          // New object in heap
String c = new String("hello");          // New object in heap

// After some GC cycles with StringDeduplication:
// b and c will share the same underlying byte[] array
// This happens automatically without explicit interning
```

#### 3.1.1. Configuration Parameters
- `-XX:StringDeduplicationAgeThreshold`: Age threshold before String objects are considered for deduplication (default: 3)
- `-XX:StringTableSize`: Size of the hash table for String deduplication (default: 60013)

### 3.2. Performance Considerations
- Monitor deduplication with `-XX:+PrintStringDeduplicationStatistics`
- Combine with Compact Strings for optimal memory usage
- Unlike interning, deduplication happens automatically and is generally safer for dynamic strings

## References
- [JEP 254: Compact Strings](https://openjdk.org/jeps/254)
- [JEP 400: UTF-8 by Default](https://openjdk.org/jeps/400)

