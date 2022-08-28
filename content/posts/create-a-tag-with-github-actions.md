---
title: "Create a tag with GitHub Actions"
date: 2022-08-28T16:12:00+02:00
draft: false
toc: false
image: "/images/create-a-tag-with-github-actions/logo.png"
tags:
  - git
  - github
  - github-actions
---

GitHub Actions allow us to automate, customize and execute software development workflows right into our repository. There are a lot of [examples](https://docs.github.com/en/actions/examples), custom workflows and [documentation](https://docs.github.com/en/actions).

In this tutorial we are going to create a manual GitHub Action to create a new tag with a version and a description. For this task, we will use the action [negz/create-tag@v1](https://github.com/negz/create-tag).

## Create a new manual workflow

We will use the assistant from GitHub in the Actions tab. 

![Create a new workflow](/images/create-a-tag-with-github-actions/create-a-new-workflow.png#center)

Pressing the **New workflow** button will take us to a list of workflows template. We will use the `Manual workflow template`.

![Workflow template list](/images/create-a-tag-with-github-actions/create-a-manual-workflow.png#center)

This action will open the workflow assistant based on the manual workflow template.

![Manual workflow assitant](/images/create-a-tag-with-github-actions/workflow-assistant.png#center)

We can use this window to edit our custom workflow or our favourite editor. This assistant will help you to add new actions from the Marketplace.

## The create tag action workflow

This will be the content of our github action to create new tags.

```yaml
name: Create tag

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'The tag version to be created based on the master branch'
        default: '1.0.0'
        required: true
      description:
        description: 'The tag description. For example: First release!'
        default: 'First release!'
        required: true

jobs:
  create-tag:
    runs-on: ubuntu-latest
    steps:
      - name: Create tag
        uses: negz/create-tag@v1
        with:
          # Github Token
          token: 'MY_GITHUB_ACTION'
          # Version (v1.0.0)
          version: 'v${{ github.event.inputs.version }}'
          # Tag message
          message: '${{ github.event.inputs.description }}'
```

Our action will do the following tasks:
* It will ask us for 2 required parameters: a version and a description.
* It will run the `create-tag` job from the jobs definition.
* This job will use a virtual machine based on the latest version of Ubuntu to run a list of steps.
* We will have an unique step called `Create tag` which uses the `negz/create-tag@v1` action.
* This action needs 3 parameters:
  * A GitHub Token used to create and push a new tag in our repository.
  * The version of our tag filled with the input variable `version`.
  * The message of our tag filled with the input variable `message`.

## Create a GitHub token

We can create new GitHub tokens from [this page](https://github.com/settings/tokens).

![GitHub tokens](/images/create-a-tag-with-github-actions/github-tokens.png#center)

Pressing the button `Generate new token` will open the assistant for generating new tokens.

![GitHub tokens permissions](/images/create-a-tag-with-github-actions/github-token-permissions.png#center)

We have to give it a name, set the expiration policy and we will check the `repo scope`. Then, it will generate the token and you must save it somewhere because you will not be able to see it again.

**NOTE**: Be careful where you publish this token because anyone can access your repositories and take control of them.

If your repository is private, you can put it as plain text in the `token` parameter of the `Create tag` step. The best option is to use `Actions secrets`, we will see them in a future article.

![Action secrets](/images/create-a-tag-with-github-actions/action-secrets.png#center)

## Execute the GitHub Action

When the action file is pushed to our repository, we will see the action in the `Actions tab`.

![Execute the create tag action](/images/create-a-tag-with-github-actions/execute-the-action.png#center)

This action will create a new tag with the version `3.2.0` and the description `Deals feature release` for a private project called [rekomind](https://rekomind.com).

## References

* GitHub Actions: https://docs.github.com/es/actions
* Create tag action: https://github.com/negz/create-tag