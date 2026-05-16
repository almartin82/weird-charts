# weird-charts — Claude Code Project Instructions

## What This Is

weird-charts is a love letter to strange and/or captivating charts, sourced from
around the web. It's a [Hugo](https://gohugo.io/) static site published via GitHub
Pages at [weirdcharts.com](https://weirdcharts.com/).

Each "post" is one chart: a tweet embed or a raw image, plus a date, a contributor,
and a few quirky tags.

## Architecture

- **Hugo** static site, theme `etch` (vendored in `themes/etch/`)
- `content/posts/NNNNN.md` — one markdown file per chart, zero-padded 5-digit number
- `layouts/shortcodes/` — `tweet-simple.html` (renders a cached static card from `data/tweets/<id>.json` + `/tweet-media/<id>/*`; falls back to a deferred oEmbed widget if uncached), `rawhtml` (raw `<img>`)
- `assets/css/site.css` — project-level style overrides on top of the etch theme. See `docs/styling.md`
- `layouts/partials/{head,header,footer}.html` — overrides of the etch theme's partials
- `data/tweets/<id>.json` and `static/tweet-media/<id>/` — local cache populated by `scripts/cache_tweets.mjs`. Both must be committed alongside the post markdown so the build runs offline and the rendered site has zero dependency on Twitter at runtime
- `.github/workflows/hugo.yaml` — builds and deploys to GitHub Pages on push to `main`
- `.github/workflows/retweet.yaml` + `scripts/retweet_new_posts.py` — retweets newly added posts from @weirdcharts on push to `main`. See `docs/security.md`
- `hugo.toml` — `paginate = 10` (10 posts on the front page; infinite scroll loads more on demand)
- Taxonomies: `tags` and `contributor`

## Tweet caching (this is the runtime perf story; don't break it)

Tweets are rendered as **static `<img>` cards served from our own origin**, not as Twitter widgets.
Twitter's `widgets.js` and the per-tweet iframe each cost ~250KB-2MB on mobile; the cache
eliminates both. When you add a tweet post you MUST also run the cache script and commit
its output alongside the post markdown:

```bash
node scripts/cache_tweets.mjs <STATUS_ID>
git add data/tweets/<STATUS_ID>.json static/tweet-media/<STATUS_ID>
```

- Without the cache, `tweet-simple` silently falls back to the deferred widget. This works
  but ships back the heavy mobile path. Don't skip the cache step.
- To refresh every cached tweet: `node scripts/cache_tweets.mjs --force`.
- To cache anything missing (e.g., after pulling new posts a collaborator made): `node scripts/cache_tweets.mjs`
  scans `content/posts/*.md` and caches anything not yet in `data/tweets/`.

Cache size budget: ~150KB media + ~5KB JSON per tweet.

## Git & Commits

- NEVER add `Co-Authored-By` or any Claude/AI attribution to commits. No joint commits, no co-commit lines.
- Commit messages match the existing terse, lowercase style (`embed`, `win expectancy`, `browns`).
- Pushing to `main` triggers a live deploy. That's expected for this repo — see the publish workflow below.

## Workflow: Adding a Post from a Twitter/X Link

When the user pastes a Twitter or X status URL (e.g.
`https://x.com/darioperkins/status/2054837194615824871/photo/1`), treat it as a
request to add a new post. Also available as the `/add-post` skill.

1. **Parse the URL.** Extract the username and status ID with
   `(?:twitter\.com|x\.com)/([^/]+)/status/([0-9]+)`. Ignore `/photo/N` suffixes and query params.
2. **Pick the next number.** `ls content/posts/*.md | sort | tail -1`, increment, zero-pad to 5 digits.
3. **Pick tags.** View the chart (use `/browse` or fetch the tweet) and assign 2-3 quirky
   tags in the spirit of existing posts (`things that go up`, `grimacing`, `group chat`,
   `sad`, `curves`). Show the user the tags before committing so they can override.
4. **Write `content/posts/NNNNN.md`:**
   ```
   ---
   date: <output of `date "+%Y-%m-%dT%H:%M:%S%z"`>
   contributor: "Andy"
   tags:
   - tag one
   - tag two
   ---
   {{< tweet-simple "STATUS_ID" >}}
   <!-- {< tweet user="USERNAME" id="STATUS_ID" >}} -->
   ```
   The commented-out line future-proofs against Twitter's oEmbed API changing — keep it.
5. **Commit + push to `main`.** Terse lowercase message. This deploys the site.

## Workflow: Adding a Post from a Raw Image

For non-tweet charts (NYT, Reddit, etc.), use the `rawhtml` shortcode instead of
`tweet-simple`. Same numbering, date, contributor, and tag rules. Body:
```
{{< rawhtml >}}
  <img src="IMAGE_URL">
{{< /rawhtml >}}
[source-name](SOURCE_URL)
```
Always include a citation link to the full page/article below the image.

## Post Format Notes

- `contributor` is almost always `"Andy"`. Quote it.
- `date` uses a full ISO timestamp on recent posts; a bare `YYYY-MM-DD` is also valid.
- The numbering scheme is cosmetic — it just keeps files sorting nicely. Counting by ones now.

## Build & Preview

```bash
hugo server -D    # local preview at http://localhost:1313
hugo              # production build into public/ (CI does this on push)
```

## Styling Gotcha

The etch theme sets `html { font-size: 62.5% }` (the classic "1rem = 10px"
trick). Any `rem` value in `assets/css/site.css` is computed against a 10px
root, not 16px. Use absolute pixel values for font-size and `--maxw`, or
multiply your intended px by 0.1 to get the rem (17px = 1.7rem). Plain rem
that assumes a 16px root will render tiny. Full notes in `docs/styling.md`.

## Security

Twitter creds (`TWITTER_API_KEY`, `TWITTER_API_SECRET`,
`TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`) are read from `os.environ`
in `scripts/retweet_new_posts.py` and injected via repo secrets in
`.github/workflows/retweet.yaml`. Audit and open hardening items
(pin tweepy, branch protection on `main`, SHA-pin actions) live in
`docs/security.md`.
