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

### Installation

For Debian-based Linux distributions or Windows Subsystem for Linux (WSL), it can be installed using `apt-get`:

```bash
sudo apt-get install make
```

On macOS, it can be easily installed using Homebrew:

```bash
brew install make
```

### Make command syntax

The basic syntax for the `make` program is as follows:

```bash
make [-f makefile] [options] [targets]
```

### "Hello, World!" example

Consider this simple example of a "Hello, World!" program:

```bash
first:
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
first:
	echo "Hello World!"

second:
	echo "This is another rule"
```

If we run the `make` command again, the output will remain the same as before. However, we can execute a specific rule using the following command:

```bash
make hello
echo "Hello World!"
Hello World!

make second
echo "This is another rule"
This is another rule
```

We can chain the execution of rules as follows:

```bash
first:
	echo "Hello World!"

second: first
	echo "This is another rule"
```

In this case, when the `make second` command is run, it will first execute the `first` rule, followed by the `second` rule.

```bash
make second
echo "Hello World!"
Hello World!
echo "This is another rule"
This is another rule
```

This is a very basic demonstration. For a more detailed guide on Makefiles, please refer to [this resource](https://makefiletutorial.com).

## The importance of using Makefiles

We have different building tools for every programming language and that is great, but I find it quite useful having a `Makefile` in every project as a shortcut.

For instance, [this blog](https://github.com/tanisperez/tanis.codes/blob/main/Makefile) has a `Makefile` with three rules:
* **run**: This rule starts Hugo in development mode.
* **build**: This rule minifies the HTML, CSS, and JavaScript for production deployment.
* **clean**: This rule removes the `public` folder containing generated files.

```bash
run:
	hugo --config config-local.toml server -D

build:
	hugo --minify --config config-pro.toml

clean:
	rm -Rf public/
```

Rather than typing `hugo --config config-local.toml server -D` each time I wish to run this blog on my computer, I simply enter `make run`.

In JavaScript projects, it is common to use `npm` as a dependency management and build tool. I typically maintain a `Makefile` structured as follows:

```makefile
test:
	npm test

run:
	npm run dev

build:
	npm run build

run-pro: build
	npm run start
```

When working on Java or Kotlin projects using `Maven`, I have the following `Makefile`:

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

Makefiles are invaluable when joining a new team or supporting a legacy project that lacks documentation. If such a project includes a **Makefile**, you can at least build and run the project, even in the absence of technical documentation.

Makefiles are straightforward plain text files that seamlessly integrate with a Git repository and can significantly enhance the project's documentation, particularly when referenced in the `README.md`.

## References

* Make: https://en.wikipedia.org/wiki/Make_(software)
* Makefile: https://en.wikipedia.org/wiki/Make_(software)#Makefile
* Make files tutorial: https://makefiletutorial.com/