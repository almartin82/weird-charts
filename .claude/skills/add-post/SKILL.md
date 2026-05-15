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

### 5. Commit + push

Terse lowercase commit message describing the chart (`win expectancy`, `browns`).
NEVER add `Co-Authored-By` or any AI attribution. Push to `main` — this deploys the site.

```bash
git add content/posts/NNNNN.md
git commit -m "<terse message>"
git push
```

## Notes

- `contributor` is almost always `"Andy"`.
- The numbering scheme is purely cosmetic (keeps files sorting nicely).
- If the oEmbed render looks broken on the live site, the raw-image path is the fallback.
