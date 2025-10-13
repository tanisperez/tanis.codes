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

Java Strings are one of the most used data structures in the Java ecosystem. Understanding their internal implementation is crucial for writing efficient applications, especially in high-performance scenarios.

A key characteristic of the `String` class is its immutability — once created, a String object cannot be modified. This immutability provides several benefits:

- **Thread Safety**: Immutable objects are inherently thread-safe, making Strings ideal for concurrent applications.
- **Security**: Since Strings cannot be modified, they are safe to use for sensitive data like passwords or authentication tokens.
- **Caching**: The immutable nature allows Java to cache and reuse String objects through the String pool.
- **Hash code**: The hash code can be cached since the String content never changes.

While Strings seem simple on the surface, their internal implementation has evolved significantly across different JDK versions to improve memory usage and performance.

## 1. String Storage and Encoding

Before JDK 9, all String characters were stored using UTF-16 encoding, meaning each character consumed 2 bytes of memory regardless of the actual character being stored. This was inefficient for strings containing only ASCII characters, which was the common case for most applications.

### 1.1. Compact Strings (JDK 9+)

[JEP 254](https://openjdk.org/jeps/254) introduced **Compact Strings**, a memory optimization that changed how strings are stored internally at runtime.  
This means that even if your code was compiled with Java 8, running it on JVM 9+ will automatically benefit from this optimization, as it's a JVM feature, not a compile-time one.

```java
// This code compiled with Java 8 will still use Compact Strings when run on JVM 9+
String ascii = "Hello";     // Uses LATIN1 encoding on JVM 9+
String special = "Hello👋"; // Uses UTF16 encoding on both JVM 8 and 9+
```

The JVM automatically chooses between two encodings:
- **LATIN1 (ISO-8859-1)** for strings that only contain characters that can be represented in one byte.
- **UTF16** for strings that require more than one byte per character.

![String encodings comparison](/images/java-strings-internals/string-encoding.png#center)

This optimization is transparent to application code and can reduce the memory footprint of your application by up to 50% when most strings contain only ASCII characters.

You can disable this optimization using the JVM flag:
```bash
-XX:-CompactStrings
```

However, disabling Compact Strings is not recommended unless you have a very specific use case, as it will increase memory usage significantly.

### 1.2. UTF-8 by Default (JDK 18+)

[JEP 400](https://openjdk.org/jeps/400) changed the default charset to UTF-8 in Java 18. Before this change, the default charset depended on the operating system and locale settings, which could lead to inconsistent behavior across different environments.

```java
System.out.println(Charset.defaultCharset());
```

| Version | Example Default Charset |
|--------|-------------|
|Before JDK 18|Windows: `windows-1252`, Linux/macOS: `UTF-8`|
|JDK 18+|Always `UTF-8`|

This affects APIs like `Charset.defaultCharset()`, file I/O, and system properties such as `file.encoding`.

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

### 2.2. String Interning in Practice

String interning stores a single copy of each distinct string in a dedicated pool to avoid duplicates. While it may seem beneficial, it comes with notable trade-offs:

| Aspect | Advantages | Disadvantages |
|--------|-------------|----------------|
| **Memory** | Saves memory when many identical strings exist. | The pool itself consumes memory; interning too many strings can actually increase memory usage. |
| **Performance** | Comparing interned strings with `==` is faster than using `equals()`. | Interning requires a synchronized lookup in the pool, adding overhead when calling `intern()`. |
| **Garbage Collection** | — | Interned strings remain alive until their defining `ClassLoader` is unloaded, which can lead to memory leaks if used carelessly. |
| **Security / Stability** | — | Interning external or user-supplied strings can expose the application to denial-of-service risks by filling the pool with unique values. |

In modern Java applications, using `String.intern()` is rarely necessary.  

The JVM’s advanced garbage collectors and optional **String deduplication** mechanisms (in G1 and ZGC) already minimize duplicate character arrays efficiently.  

In general, explicit interning should be avoided unless you have a **very specific, well-profiled case** demonstrating measurable benefits.

### 2.3. String Deduplication

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

#### 2.3.1. Configuration Parameters
- `-XX:StringDeduplicationAgeThreshold`: Age threshold before String objects are considered for deduplication (default: 3).
- `-XX:StringTableSize`: Size of the hash table for String deduplication (default: 60013).

### 2.4. Performance Considerations
- Monitor deduplication with `-XX:+PrintStringDeduplicationStatistics`.
- Combine with Compact Strings for optimal memory usage.
- Unlike interning, deduplication happens automatically and is generally safer for dynamic strings,

## 3. String Concatenation

### 3.1. Compile-time Optimizations

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

### 3.2. The concat() Method

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
- `concat()` creates a new String object for each call.
- Unlike `+`, `concat()` doesn't get optimized by the compiler into StringBuilder operations.
- `concat()` throws NullPointerException if the argument is null, while `+` converts null to "null".

```java
String str = "Hello";
String nullStr = null;

// Works fine, prints "Hello null"
System.out.println(str + nullStr);

// Throws NullPointerException
System.out.println(str.concat(nullStr));
```

In terms of performance:
- For simple concatenations, `+` is usually the best choice.
- For multiple concatenations in loops, use StringBuilder.
- Avoid `concat()` in performance-critical code or loops.

### 3.3. String Concatenation in Loops

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

### 3.4. Performance Impact

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

Here's a JMH benchmark showing the performance difference:

```java
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@State(Scope.Thread)
@Fork(1)
@Warmup(iterations = 2)
@Measurement(iterations = 3)
public class StringConcatenationBenchmark {
    
    @Param({"100", "1000", "10000"})
    private int length;

    @Benchmark
    public String concatenateWithPlus() {
        String result = "";
        for (int i = 0; i < length; i++) {
            result += "number" + i;
        }
        return result;
    }

    @Benchmark
    public String concatenateWithBuilder() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            builder.append("number").append(i);
        }
        return builder.toString();
    }

    @Benchmark
    public String concatenateWithPreallocatedBuilder() {
        StringBuilder builder = new StringBuilder(length * 10);
        for (int i = 0; i < length; i++) {
            builder.append("number").append(i);
        }
        return builder.toString();
    }
}
```

This was the benchmark setup:
* Dell XPS 9370 with an i7-8550U.
* 16 GB of RAM.
* Arch Linux with kernel 6.17.1-arch1-1.

| Benchmark | length | Mode | Cnt | Score | Error | Units |
|-----------|--------|------|-----|--------|--------|--------|
| concatenateWithBuilder | 100 | avgt | 3 | 0.669 | 0.405 | us/op |
| concatenateWithBuilder | 1000 | avgt | 3 | 7.818 | 0.989 | us/op |
| concatenateWithBuilder | 10000 | avgt | 3 | 109.673 | 6.827 | us/op |
| concatenateWithPlus | 100 | avgt | 3 | 3.883 | 0.195 | us/op |
| concatenateWithPlus | 1000 | avgt | 3 | 380.518 | 18.312 | us/op |
| concatenateWithPlus | 10000 | avgt | 3 | 37008.220 | 467.445 | us/op |
| concatenateWithPreallocatedBuilder | 100 | avgt | 3 | 0.555 | 0.048 | us/op |
| concatenateWithPreallocatedBuilder | 1000 | avgt | 3 | 7.159 | 0.651 | us/op |
| concatenateWithPreallocatedBuilder | 10000 | avgt | 3 | 91.623 | 6.622 | us/op |

The benchmark results demonstrate several key points:

1. **String concatenation with + operator**: 
   - Shows exponential performance degradation
   - At 10,000 iterations, takes ~37ms (37008.220 μs)
   - Creates multiple intermediate String objects

2. **StringBuilder without preallocation**:
   - Linear performance growth
   - At 10,000 iterations, takes ~109μs
   - Still requires buffer resizing operations

3. **Preallocated StringBuilder**:
   - Best performance across all sizes
   - At 10,000 iterations, only ~91μs
   - Avoids buffer resizing completely

The importance of preallocating StringBuilder capacity:
- Eliminates the need for buffer resizing
- Reduces memory allocation overhead
- Prevents copying of existing content during resize
- Particularly important in performance-critical loops

For example, StringBuilder's default capacity is 16 characters. Without preallocation, it will need to resize multiple times:
```java
// Initial capacity: 16
// First resize: 34
// Second resize: 70
// Third resize: 142
// ...and so on

// Better approach:
int finalSize = items.size() * 20; // Estimate final size
StringBuilder builder = new StringBuilder(finalSize);
```

As shown in the benchmark, proper preallocation can improve performance by up to 16% in large concatenation operations.

### 3.5. Understanding invokedynamic and Bytecode

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
- Choose the best concatenation strategy at runtime.
- Avoid creating unnecessary intermediate objects.
- Optimize based on the actual string content and size.

### 3.6. StringBuffer vs StringBuilder

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
- `StringBuffer`: All methods are synchronized.
- `StringBuilder`: No synchronization, better performance.
- Memory usage is identical.
- Both are mutable.

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

## References

### JEPs (JDK Enhancement Proposals)
- [JEP 254: Compact Strings](https://openjdk.org/jeps/254)
- [JEP 400: UTF-8 by Default](https://openjdk.org/jeps/400)
- [JEP 280: String Concatenation](https://openjdk.org/jeps/280)
- [JEP 192: String Deduplication](https://openjdk.org/jeps/192)

### Official Documentation
- [String (Java SE 21 & JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
- [StringBuilder (Java SE 21 & JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html)
- [StringBuffer (Java SE 21 & JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuffer.html)

### Performance and Best Practices
- [String Concatenation (Java Language Specification)](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.18.1)
- [Java Performance Tuning Guide - String Pool](https://docs.oracle.com/cd/E15523_01/web.1111/e13814/jvm_tuning.htm#PERFM161)

