---
title: "Git cheat sheet"
date: 2023-02-18T17:53:00+01:00
draft: false
toc: false
image: "/images/git-cheat-sheet/logo.png"
description: "Learn Git basics! Track changes, collaborate with team members, and optimize workflows. This post covers key features, commands, and best practices."
tags:
  - git
---

Git is a popular version control system used by developers around the world. It allows multiple team members to work on the same codebase, track changes, and collaborate on new features. In this blog post, we'll explore the basics of Git, including its key features, common commands, and best practices for working with it.

## Basic Git Commands
* `git init`: Initialize a new Git repository in the current directory.
* `git clone` <url>: Clone a remote Git repository to your local machine.
* `git add` <file>: Add a file to the staging area.
* `git add` .: Add all changes to the staging area.
* `git commit -m "<message>"`: Commit changes to the repository with a message.
* `git status`: Show the status of the current repository.
* `git log`: Show the commit history of the current repository.
* `git diff`: Show the difference between the working directory and the repository.

## Branching and Merging
* `git branch`: List all branches in the repository.
* `git branch <branch-name>`: Create a new branch.
* `git checkout <branch-name>`: Switch to an existing branch.
* `git merge <branch-name>`: Merge a branch into the current branch.

## Remote Repositories
* `git remote`: List all remote repositories.
* `git remote add <name> <url>`: Add a new remote repository.
* `git push <remote> <branch>`: Push local changes to a remote repository.
* `git pull <remote> <branch>`: Pull remote changes into the local repository.

## Git Configuration
* `git config --global user.name "<name>"`: Set the name associated with commits.
* `git config --global user.email "<email>"`: Set the email associated with commits.
* `git config --global core.editor "<editor>"`: Set the default text editor for Git.
* `git config --global alias.<alias-name> "<command>"`: Create a shortcut for a Git command.
* `git config --global alias.lg "log --oneline --decorate --all --graph"`: Set an alias for git log with a graph view.
* `git config --global alias.s "status -s -b"`: Set an alias for git status.
* `git config --list`: List the git config.
![git config list](/images/git-cheat-sheet/git-config-list.png#center)

## Git Reset
* `git reset`: Unstage changes.
* `git reset --hard HEAD`: Discard all changes since the last commit.
* `git reset <commit>`: Revert the repository to a specific commit.

## Git Stash
* `git stash`: Stash changes in the working directory.
* `git stash list`: List all stashes.
* `git stash apply`: Apply the most recent stash.
* `git stash apply <stash>`: Apply a specific stash.

## Git Rebase
* `git rebase <branch>`: Rebase the current branch onto another branch.
* `git rebase --interactive <branch>`: Rebase the current branch interactively.
* `git rebase --abort`: Abort a rebase in progress.

## Git Tagging
* `git tag`: List all tags in the repository.
* `git tag <tag-name>`: Create a new tag.
* `git tag -a <tag-name> -m "<message>"`: Create an annotated tag.
* `git push --tags`: Push all tags to a remote repository.

## Git Ignore
Create a file called `.gitignore` in the root of your repository. Add file patterns to the `.gitignore` file to exclude them from Git.

That's it! This cheat sheet covers the most common Git commands that you'll use on a day-to-day basis. Happy coding!

## References
* Git official docs: https://git-scm.com/docs
* Danny Adams blog post in dev.to: https://dev.to/doabledanny/git-cheat-sheet-50-commands-free-pdf-and-poster-4gcn