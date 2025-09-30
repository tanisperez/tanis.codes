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

## 4. String Concatenation

### 4.1. Compile-time Optimizations

The Java compiler performs several optimizations when dealing with String concatenation. When concatenating string literals or final variables, the compiler will combine them at compile time:

```java
// Compile-time constants
final String GREETING = "Hello";
final String WORLD = "World";
String result = GREETING + " " + WORLD;

// Decompiled bytecode will show:
String result = "Hello World";
```

However, when working with non-final variables, the compiler behavior has evolved:

```java
String a = "Hello";
String b = "World";
String result = a + " " + b;

// Before JDK 9 - Compiled to StringBuilder
// Decompiled bytecode equivalent:
String result = new StringBuilder()
    .append(a)
    .append(" ")
    .append(b)
    .toString();

// After JDK 9 - Uses invokedynamic
// More efficient implementation determined at runtime
```

### 4.2. The concat() Method

While the `+` operator is the most common way to concatenate strings, Java also provides the `concat()` method. However, there are important differences to consider:

```java
String a = "Hello";
String b = "World";

// Using + operator
String result1 = a + " " + b;

// Using concat()
String result2 = a.concat(" ").concat(b);
```

Key considerations:
- `concat()` creates a new String object for each call
- Unlike `+`, `concat()` doesn't get optimized by the compiler into StringBuilder operations
- `concat()` throws NullPointerException if the argument is null, while `+` converts null to "null"

```java
String str = "Hello";
String nullStr = null;

// Works fine, prints "Hello null"
System.out.println(str + nullStr);

// Throws NullPointerException
System.out.println(str.concat(nullStr));
```

In terms of performance:
- For simple concatenations, `+` is usually the best choice
- For multiple concatenations in loops, use StringBuilder
- Avoid `concat()` in performance-critical code or loops

### 4.3. String Concatenation in Loops

One of the most common performance pitfalls is concatenating strings inside loops:

```java
// Bad practice
String result = "";
for (int i = 0; i < 1000; i++) {
    result += "number" + i; // Creates many temporary objects
}

// Good practice
StringBuilder builder = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    builder.append("number").append(i);
}
String result = builder.toString();
```

> **Note**: Even though the compiler uses StringBuilder internally for the `+` operator, it creates a new StringBuilder for each concatenation operation in the loop.

### 4.4. Performance Impact

Let's see a simple benchmark comparing different approaches:

```java
// Don't do this
public String concatenateWithPlus() {
    String result = "";
    for (int i = 0; i < 1000; i++) {
        result += "number" + i;
    }
    return result;
}

// Better approach
public String concatenateWithBuilder() {
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < 1000; i++) {
        builder.append("number").append(i);
    }
    return builder.toString();
}

// Best when final size is known
public String concatenateWithPreallocatedBuilder() {
    StringBuilder builder = new StringBuilder(10000); // Preallocate capacity
    for (int i = 0; i < 1000; i++) {
        builder.append("number").append(i);
    }
    return builder.toString();
}
```

The performance difference can be significant:
- String concatenation: O(n²) complexity
- StringBuilder: O(n) complexity
- Preallocated StringBuilder: O(n) with minimal reallocations

### 4.5. Understanding invokedynamic and Bytecode

Since JDK 9, String concatenation uses `invokedynamic` to optimize the operation at runtime. Let's look at a simple example and its bytecode:

```java
String name = "John";
int age = 30;
String message = "Hello " + name + ", you are " + age + " years old";
```

Before JDK 9, the bytecode would show:
```java
// Decompiled from JDK 8 bytecode
new java/lang/StringBuilder
dup
ldc "Hello "
invokespecial java/lang/StringBuilder.<init>(Ljava/lang/String;)V
aload_1
invokevirtual java/lang/StringBuilder.append(Ljava/lang/String;)Ljava/lang/StringBuilder;
ldc ", you are "
invokevirtual java/lang/StringBuilder.append(Ljava/lang/String;)Ljava/lang/StringBuilder;
iload_2
invokevirtual java/lang/StringBuilder.append(I)Ljava/lang/StringBuilder;
ldc " years old"
invokevirtual java/lang/StringBuilder.append(Ljava/lang/String;)Ljava/lang/StringBuilder;
invokevirtual java/lang/StringBuilder.toString()Ljava/lang/String;
```

After JDK 9, it becomes:
```java
// Decompiled from JDK 9+ bytecode
invokedynamic makeConcatWithConstants(Ljava/lang/String;I)Ljava/lang/String;
  // Bootstrap method using StringConcatFactory
```

This change allows the JVM to:
- Choose the best concatenation strategy at runtime
- Avoid creating unnecessary intermediate objects
- Optimize based on the actual string content and size

### 4.6. StringBuffer vs StringBuilder

While `StringBuilder` is the preferred choice for string concatenation, `StringBuffer` still has its place:

```java
// Thread-safe but slower
StringBuffer buffer = new StringBuffer();
buffer.append("Hello ");
buffer.append("World");

// Not thread-safe but faster
StringBuilder builder = new StringBuilder();
builder.append("Hello ");
builder.append("World");
```

Key differences:
- `StringBuffer`: All methods are synchronized
- `StringBuilder`: No synchronization, better performance
- Memory usage is identical
- Both are mutable

When to use each:
```java
// Use StringBuffer when sharing between threads
public class SharedMessage {
    private final StringBuffer message = new StringBuffer();
    
    public synchronized void addToMessage(String text) {
        message.append(text);
    }
}

// Use StringBuilder for single-thread operations
public class MessageBuilder {
    private final StringBuilder message = new StringBuilder();
    
    public void addToMessage(String text) {
        message.append(text);
    }
}
```

> **Note**: In modern Java applications, it's rare to need `StringBuffer`. If you need thread-safe string manipulation, consider using other synchronization mechanisms or concurrent data structures.

