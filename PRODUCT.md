# Product

## Register

brand

## Universe

weird-charts.com is part of a small family of personal projects at [almart.in](https://almart.in). The hub wordmark `Andy Martin | almart.in` sits at the top of every page, linked to the hub. The "weird charts" site header appears below it, subordinate.

## Users

Chart-loving internet people. The kind who already get the joke. Data folks, journalists, designers, quants, and the broader population of professional curiosity-havers who experience a small electric shock when a chart is funny, ugly, or wrong in an interesting way.

They land here looking for charts they have not seen. The bar is long-tail weird, not front-page-of-Reddit weird. "Oh, I missed that one" is the desired reaction. "Saw this twice on Twitter last week" is the failure mode.

## Product Purpose

A hand-curated archive of strange and captivating charts, sourced from around the web. Each post is one chart (a tweet embed or a raw image), tagged with quirky descriptors like "grimacing", "things that go up", "curves", and "sad", credited to a contributor, dated, and otherwise left alone.

The site exists because the genre deserves cataloguing. Strange charts, beautiful charts, baffling charts, charts that punch above their weight. It is a love letter, literally. Affectionate, never snarky. The numbering scheme is on purpose. The absence of "popular this week" is on purpose. The lack of recommendations is on purpose.

Success looks like a reader scrolling through ten posts, finding one that genuinely surprises them, and bookmarking the site instead of just the chart.

## Brand Personality

Three words: **affectionate, dry, archival.**

Voice descended from the NYT chartsnthings tumblr (RIP). Behind-the-desk, working-notes warmth. Smart people thinking out loud about charts, not gallery curators presenting them. Lowercase headers are fine. Tone is wry, never loud, never punching down.

**The tags carry the voice.** Body chrome stays neutral. The chart is the artifact and the tag is the editorial wink. Tags are loving but knowing:

- `hard to parse` (affectionate roast of legibility)
- `things that go up` (knowing nod at line-go-up culture)
- `actually this is a map` (the "wait, is this even a chart" recategorization)
- `small multiples` (a grammar-of-graphics nod for the ggplot crowd, no explanation given)
- `grimacing`, `sad`, `curves`, `group chat` (emotional / shape-noticing tags that name the vibe rather than the topic)

The taxonomy is the joke. If a tag needs explaining, it does not belong. Tags are lowercase, often two or three words, frequently descriptive of feeling or form rather than subject matter.

Emotional goal: delight via recognition. The small-smile reaction. Never cynical-Twitter "lol look at this" energy.

## Anti-references

What weird-charts should NOT read as:

- **Algorithmic / engagement-feed aesthetic.** Trending tags, upvote counts, "most popular this week", comment threads. weird-charts is a feed of hand-picked artifacts; the ordering is reverse-chronological and the ranking is taste. Reward digging, not virality.
- **SaaS landing page chrome.** Big hero gradient, conversion-focused headline above the fold, three-card feature blocks, prominent CTAs. weird-charts has nothing to sell.
- **Scroll-driven dataviz storytelling.** Full-bleed multimedia, ambient autoplay, "we'll guide you through the data" pacing. weird-charts is a feed of single artifacts, not a sequenced essay.
- **Heavily art-directed editorial polish.** Charts treated as trophies, with the seams of the original source scrubbed off. The weird belongs in, not buffed out.

## Design Principles

1. **The chart is the hero, the tag is the caption.** Site chrome defers. Margins, type, and accents are the museum mat. Tags are the only place editorial voice lives; everything else recedes.
2. **Hand-curated, never algorithmic.** Reverse-chronological feed, browsable by tag and contributor. No "trending", no recommendations, no engagement metrics. Taste is the algorithm.
3. **Long-tail over viral.** If a chart has done two laps of Twitter, it is the wrong fit. Reward digging.
4. **Loving, not snarky.** Affectionate cataloguing of the whole genre, no exceptions for technical merit. The tagline is the brief.
5. **One-person blog energy.** Personal, lightly archival, unpretentious. No "platform" framing, no aggregation pretensions. A tumblr-shaped thing with a domain name.
6. **Both modes are first-class.** The site honors the visitor's `prefers-color-scheme` preference and treats dark mode as a designed surface, not an afterthought. Every new component must work in both modes from day one. No hardcoded colors that bypass the mode swap; use the CSS variables that flip with the theme. Test in both before shipping.

## Accessibility & Inclusion

Personal-blog bar with conscientious craft. The constraints:

- Sufficient color contrast on body text and links (the cream / terracotta palette passes WCAG AA in both modes).
- Readable type size. The etch theme uses the 62.5% root trick, so any `rem` value in `assets/css/site.css` is computed against a 10px root. Use pixel values, or multiply intended px by 0.1. See `docs/styling.md`.
- Respect `prefers-color-scheme` (already wired). Respect `prefers-reduced-motion` whenever motion ships.
- Keyboard navigation works for the site's own affordances. Focus rings are visible.
- Alt text on raw images, where the source provides a description we can use.
- Embedded tweets are rendered by Twitter / X's own markup; their accessibility behavior is outside this site's scope.

This is a one-person curation project. The accessibility bar is high-quality on the surfaces this site controls, light on formal commitments around third-party embeds.
