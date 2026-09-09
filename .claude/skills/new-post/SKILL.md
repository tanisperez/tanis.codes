---
name: new-post
description: Scaffold a new blog post for tanis.codes (Hugo). Use when the user wants to start a new post, create an article, or asks for "/new-post" — creates the file via the Hugo archetype, fills in the front matter, and later reports an estimated reading time before publishing. Not a content generator: it does not write the article body for the user.
---

# new-post

Scaffolding and feedback tool for new posts on this Hugo site. It does two
things, usually across two separate invocations of this skill:

1. **Creation**: generate the post file and fill in its front matter.
2. **Feedback**: once the post has a body, estimate the reading time the
   site will actually show, using the same criterion Hugo uses.

Do not write the article's content yourself — that's the user's job. This
skill only scaffolds the file and reports numbers back.

## Step 1 — Gather the basics

Ask the user (or infer from the current conversation if already stated):

- **Title** of the post.
- **Tags** (one or more; lowercase, matching the style of existing tags —
  check `content/posts/*.md` front matter or `layouts/index.json` if unsure
  what tags already exist, to avoid near-duplicate tags).
- **A short description** (one sentence, used for `description` in front
  matter and shown in listings/search).

Derive the **slug** from the title: lowercase, kebab-case, ASCII (no
accents/punctuation). Confirm it with the user if it's ambiguous — the slug
becomes the permanent URL segment (`/posts/<slug>/`).

## Step 2 — Create the file

Run, from the repo root:

```bash
hugo new posts/<slug>.md
```

This uses `archetypes/posts.md` and creates
`content/posts/<slug>.md` with `draft: true` and today's date already
filled in by Hugo.

## Step 3 — Fill in the front matter

Edit the new file's front matter to match the convention actually used by
existing posts (see any file under `content/posts/` — the archetype's
`images:` field is legacy and not what's in use):

```yaml
title: "<the title, as given>"
date: <leave what Hugo generated>
draft: true
toc: true            # or false — ask if the post is long enough to need one
image: "/images/common/something.png"   # optional, see note below
description: "<the one-sentence description>"
tags:
  - tag-one
  - tag-two
```

Leave `draft: true` until the user says the post is ready to publish.

**Cover image reminder**: if the user plans to add a new cover image for
this post, remind them that the source file should be at least
**1440×720px** (or **800×800px** if square) — see the comment in
`archetypes/posts.md`. Anything smaller falls back to the site's CSS
placeholder tile instead of a real hero image.

## Step 4 — Reading time feedback (once there's content)

This can happen in the same invocation (if the user already pasted a draft
body) or in a later one — detect it by checking whether
`content/posts/<slug>.md` has body content beyond the front matter.

When there is a body to measure:

1. Strip the front matter (everything between the `---` fences).
2. Count words in the remaining markdown body (a plain whitespace word
   count is close enough — Hugo's own `.ReadingTime` does the same thing on
   rendered plain text).
3. Estimate minutes at **213 words per minute** (Hugo's default
   `reading-time` word count), rounding up to the nearest whole minute,
   minimum 1:

   ```
   minutes = ceil(word_count / 213)
   ```

4. Report the word count and the estimated reading time to the user, e.g.
   "~842 words → about 4 min read", so they know what the site will show
   (`layouts/index.json`'s `readingTime` field, and any template that uses
   `.ReadingTime`) before publishing.

This is an estimate for the author's convenience — the authoritative value
is always Hugo's own `.ReadingTime` computed at build time.
