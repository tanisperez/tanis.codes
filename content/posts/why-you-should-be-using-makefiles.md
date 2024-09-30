---
title: "Why you should be using Makefiles?"
date: 2022-08-19T17:06:00+02:00
draft: false
toc: false
image: "/images/why-you-should-be-using-makefiles/logo.png"
description: "A Makefile is a text file which defines rules for building software using the make program, but you can use it for everything you want."
tags:
  - makefile
  - build tools
---
A **Makefile** is a text file which defines rules for building software using the [make](https://en.wikipedia.org/wiki/Make_(software)) program. Originally designed for applications written in C or C++, `make` can be used for a wide variety of programming tasks.

## Syntax

A `Makefile` must be plain text and use tabs for indentation. If the `-f` option is not specified when running `make`, it will search for the following makefiles in this order:

1. **GNUmakefile**
2. **makefile**
3. **Makefile**

The most commonly used name is **Makefile**.

The Makefile language is partially declarative, where end conditions are specified but the order of actions is not.

Makefiles can include the following constructs:

- **Explicit Rule**: Defines when and how to update a target by listing its prerequisites (dependent targets) and the commands that execute the update, known as the recipe.
- **Implicit Rule**: Specifies how to remake a class of files based on their names, detailing the dependencies and the update recipe for targets with similar names.
- **Variable Definition**: Associates a text value with a name, allowing that value to be substituted into the Makefile at a later point.
- **Directive**: An instruction that performs special actions, such as including another Makefile.
- **Comment**: Any line that begins with `#`, which is ignored by `make` and used for explanatory notes.

## Rules

Each rule begins with a dependency line, which comprises the rule's target name followed by a colon `:`. This line may also include an optional list of prerequisites, or targets upon which the rule's target depends.

### Basic rule syntax

```bash
target [target ...]: [component ...]
Tab ↹[command 1]
	   .
	   .
	   .
Tab ↹[command n]
```

### Make command syntax

The basic syntax for the `make` program is as follows:

```bash
make [-f makefile] [options] [targets]
```

### "Hello, World!" example

Consider this simple example of a "Hello, World!" program:

```bash
hello:
    echo "Hello World!"
```
When you type `make`, the output will be:

```bash
echo "Hello World!"
Hello World!
```

### Chaining rules in the Makefile

When you execute `make` without any arguments, it will invoke the first rule defined in the **Makefile**. To illustrate, let us define an additional rule:

```bash
hello:
    echo "Hello World!"

example:
    echo "This is another rule"
```

If we run the `make` command again, the output will remain the same as before. However, we can execute a specific rule using the following command:

```bash
make hello
echo "Hello World!"
Hello World!

make example
echo "This is another rule"
This is another rule
```

We can sequence the execution of rules as follows:

```bash
hello:
    echo "Hello World!"

example: hello
    echo "This is another rule"
```

In this case, when the `make example` command is run, it will first execute the `hello` rule, followed by the `example` rule.

```bash
make example
echo "Hello World!"
Hello World!
echo "This is another rule"
This is another rule
```

This is a very basic demonstration. For a more detailed guide on Makefiles, please refer to [this resource](https://makefiletutorial.com).

## Why we should use Makefiles?

We have different building tools for every programming language and that is great, but I find it quite useful having a `Makefile` in every project as a shortcut.

For example, [this blog](https://github.com/tanisperez/tanis.codes/blob/main/Makefile) has a `Makefile` with 2 rules:
* **run**: It runs Hugo in development mode.
* **build**: Hugo will minify the HTML, CSS and JavaScript for deploying in production.

```bash
run:
	hugo --config config-local.toml server -D

build:
	hugo --minify --config config-pro.toml
```

Instead of typing `hugo --config config-local.toml server -D` every time I want to run this blog in my computer, I just type `make run`.

For React projects it is common to use `npm` as dependency managment and building tool. I usually have a `Makefile` like this:

```bash
test:
	npm test

run:
	npm run dev

build:
	npm run build

run-pro: build
	npm run start
```

When I work with some Java or Kotlin projects with `maven` I have the following `Makefile`:

```bash
clean:
	mvn clean

test:
	mvn clean test

package:
	mvn clean package -DskipTests -Plocal

package-docker:
	mvn clean package -DskipTests -Pdocker

build-docker: package-docker
	docker build -t rekomind/rekomind-core-ws .

run: package
	java -jar app/target/rekomind-core-ws.jar

run-docker: build-docker
	mkdir -p /tmp/log/rekomind/rekomind-core-ws
	docker run --name rekomind-core-ws -it \
		-e SPRING_DATASOURCE_URL="jdbc:postgresql://************:*****/mydb" \
		-e SPRING_DATASOURCE_USERNAME="username" \
		-e SPRING_DATASOURCE_PASSWORD="password" \
		-p 18000:18000 \
		-v /tmp/log/rekomind/rekomind-core-ws:/var/log/rekomind/rekomind-core-ws \
		--rm \
		rekomind/rekomind-core-ws

dependency-tree:
	mvn dependency:tree

dependency-check:
	mvn clean verify -DskipTests -Pdependency-check
```

## Conclusion

Makefiles are useful when you work with a lot of different projects and you do not remember how to build it or run a specific task. If you have a `Makefile` you can check it quickly and get the work done.

## References

* Make: https://en.wikipedia.org/wiki/Make_(software)
* Makefile: https://en.wikipedia.org/wiki/Make_(software)#Makefile
* Make files tutorial: https://makefiletutorial.com/