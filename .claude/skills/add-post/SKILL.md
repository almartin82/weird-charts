---
name: add-post
description: Add a new weird-charts post from a Twitter/X status link (or raw image URL). Parses the link, picks the next post number, assigns quirky tags, writes the markdown file, and commits + pushes to main. Use when the user pastes an x.com / twitter.com status URL, an image URL, or says "add post" / "new chart".
---

# add-post

Turn a pasted link into a published weird-charts post.

## Input

A Twitter/X status URL, e.g. `https://x.com/darioperkins/status/2054837194615824871/photo/1`,
or a raw image URL for non-tweet charts. May arrive as `/add-post <url>` or just pasted in chat.

## Steps

### 1. Parse the link

For a tweet, extract username and status ID:
`(?:twitter\.com|x\.com)/([^/]+)/status/([0-9]+)` — ignore any `/photo/N` suffix and `?query` params.

If it's not a tweet URL, treat it as a raw image and use the `rawhtml` path (step 4b).

### 2. Pick the next post number

```bash
ls content/posts/*.md | sort | tail -1
```
Increment the number, zero-pad to 5 digits (e.g. `00551` → `00552`).

### 3. Pick tags

View the chart so the tags actually fit — use the `/browse` skill on the tweet URL, or
fetch the tweet. Assign 2-3 tags in the spirit of existing posts: quirky, observational,
lowercase. Examples already in the repo: `things that go up`, `grimacing`, `group chat`,
`sad`, `curves`, `VORP`, `nyt`. **Show the user the tags before committing** — they can override.

### 4a. Write the file (tweet)

`content/posts/NNNNN.md`:
```
---
date: <output of: date "+%Y-%m-%dT%H:%M:%S%z">
contributor: "Andy"
tags:
- tag one
- tag two
---
{{< tweet-simple "STATUS_ID" >}}
<!-- {< tweet user="USERNAME" id="STATUS_ID" >}} -->
```
Keep the commented-out line — it future-proofs against Twitter's oEmbed API changing.

### 4b. Write the file (raw image)

`content/posts/NNNNN.md`:
```
---
date: <output of: date "+%Y-%m-%dT%H:%M:%S%z">
contributor: "Andy"
tags:
- tag one
- tag two
---
{{< rawhtml >}}
  <img src="IMAGE_URL">
{{< /rawhtml >}}
[source-name](SOURCE_URL)
```
Always include a citation link to the source page below the image.

### 4c. Cache the tweet (tweet posts only)

Run the tweet cache script for the new ID:

```bash
node scripts/cache_tweets.mjs <STATUS_ID>
```

This downloads the tweet's media to `static/tweet-media/<id>/` and writes metadata to
`data/tweets/<id>.json`. The shortcode reads from this cache and renders a static `<img>`
card with author and permalink — no `widgets.js`, no iframe, no cross-origin handshake at
runtime. Without this step the shortcode silently falls back to the runtime widget, which
defeats the caching strategy and makes mobile load extremely slow.

Both the JSON and the downloaded media must be `git add`-ed in step 6.

### 5. Detect: canonical repo or a fork?

Before committing, figure out where you are:

```bash
git remote get-url origin
```

- If origin is `almartin82/weird-charts` (any of `git@github.com:almartin82/weird-charts.git`, `https://github.com/almartin82/weird-charts.git`, etc.) → **canonical path** (step 6a).
- Anything else (a fork) → **PR path** (step 6b). This is the right path for any contributor who isn't almartin82.

Also update the `contributor` field in the frontmatter: on the canonical repo it stays `"Andy"`, but on a fork, ask the user what name they want on their [contributor page](https://weirdcharts.com/contributor/) (default to their git `user.name` if they don't care).

### 6a. Canonical path — commit + push to main

Terse lowercase commit message describing the chart (`win expectancy`, `browns`).
NEVER add `Co-Authored-By` or any AI attribution. Push to `main` — this deploys the site.

```bash
git add content/posts/NNNNN.md data/tweets/<id>.json static/tweet-media/<id>
git commit -m "<terse message>"
git push
```

For raw-image posts, skip the `data/` and `static/tweet-media/` paths (no cache to add).

### 6b. Fork path — branch, push, open a PR

The contributor isn't almartin82, so don't push to their `main`. Instead, open a PR back against `almartin82/weird-charts` so the assignment actually completes.

```bash
# branch name: short, lowercase, derived from the chart subject
git checkout -b add-<short-slug>

git add content/posts/NNNNN.md data/tweets/<id>.json static/tweet-media/<id>
git commit -m "<terse message>"
git push -u origin HEAD

gh pr create \
  --repo almartin82/weird-charts \
  --base main \
  --title "<terse message>" \
  --body "Adds post NNNNN via the add-post Claude Code skill.

Tags: tag one, tag two
Source: <original tweet/image URL>"
```

NEVER add `Co-Authored-By` or any AI attribution to the commit or PR body.

If `gh` isn't installed or auth'd, fall back to printing the compare URL the user can click:
`https://github.com/almartin82/weird-charts/compare/main...<their-username>:<branch>?expand=1`

## Notes

- `contributor` defaults to `"Andy"` on the canonical repo. On a fork, use the contributor's name.
- The numbering scheme is purely cosmetic (keeps files sorting nicely). On a fork, still pick the next number from `content/posts/` — collisions are fine, the maintainer can renumber on merge.
- If the oEmbed render looks broken on the live site, the raw-image path is the fallback.
