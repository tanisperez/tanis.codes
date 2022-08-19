---
title: "Why you should be using Makefiles?"
date: 2022-08-19T17:06:00+02:00
draft: false
toc: false
image: "/images/why-you-should-be-using-makefiles/logo.png"
tags:
  - makefile
  - build tools
---
A **Makefile** is a text file which defines rules for building software using the [make](https://en.wikipedia.org/wiki/Make_(software)) program. The original purpose of the `make` program was for building applications written in C or C++, but you can use it for everything you want.


## Example
A `Makefile` must be plain text and indented with tabs. If no `-f` option is used with `make`, it will look for the makefiles **GNUmakefile**, **makefile**, and **Makefile**, in that order. The most common name to use is **Makefile**.

```bash
hello:
    echo "Hello World!"
```

If we type `make` it will output the following:

```bash
echo "Hello World!"
Hello World!
```

Executing `make` without arguments will execute the first rule defined in the `Makefile`. We are going to add another rule:

```bash
hello:
    echo "Hello World!"

example:
    echo "This is another rule"
```

If we type again `make` it will output the same as before, but we can execute a specific rule like this:

```bash
make hello
echo "Hello World!"
Hello World!

make example
echo "This is another rule"
This is another rule
```

We can chain rules execution like this:

```bash
hello:
    echo "Hello World!"

example: hello
    echo "This is another rule"
```

When we type the command `make example` it will execute the `hello` rule first and then the rule itself.

```bash
make example
echo "Hello World!"
Hello World!
echo "This is another rule"
This is another rule
```

This is a very basic usage, you can learn everything about the Makefiles [here](https://makefiletutorial.com/).

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
		rekomind/rekomind-admin-ws

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