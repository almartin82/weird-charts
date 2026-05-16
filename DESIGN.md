---
name: weird-charts
description: The Lab Notebook design system, applied to a hand-curated chart archive
colors:
  bench-white: "#fafaf7"
  carbon: "#1a1a1a"
  lead-mid: "#555555"
  lead-faint: "#888888"
  bench-mark: "#e3e0d6"
  cinnabar: "#b14b1f"
  cinnabar-glow: "#e08a5c"
  tar: "#14140f"
  bone: "#ece8d9"
  worn-bone: "#b3aea0"
  faded-bone: "#807a6d"
  bench-mark-dark: "#2a2820"
typography:
  display:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "2.4rem"
    fontWeight: 600
    lineHeight: 1.15
  tagline:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif'
    fontSize: "20px"
    fontWeight: 400
    fontStyle: "italic"
    lineHeight: 1.4
  body:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif'
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.6
  attribution:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  wordmark:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  nav:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.4
  footer:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0"
spacing:
  tight: "0.75rem"
  base: "1.5rem"
  loose: "2rem"
  section: "3rem"
  page-bottom: "6rem"
components:
  nav-brand:
    textColor: "{colors.carbon}"
    typography: "{typography.wordmark}"
  site-banner:
    textColor: "{colors.carbon}"
    typography: "{typography.display}"
  tagline:
    textColor: "{colors.cinnabar}"
    typography: "{typography.tagline}"
  link:
    textColor: "{colors.cinnabar}"
    typography: "{typography.body}"
  nav-cta:
    textColor: "{colors.cinnabar}"
    typography: "{typography.nav}"
  post-meta:
    textColor: "{colors.lead-faint}"
    typography: "{typography.attribution}"
---

# Design System: weird-charts

## 1. Overview

**Creative North Star: "The Lab Notebook"**

weird-charts is one section of a personal universe styled as a working lab notebook. Bench White paper. Carbon ink. A single Cinnabar accent. Type does the work; chrome stays out of the way. No shadows, no gradients, no decorative chrome.

The chart is the hero, the tag is the caption, and the site frame is the museum mat. The page is a hand-curated feed; each post is one chart, dated, credited, tagged, and otherwise left alone. The visual system gives charts the room they need to be looked at, then sits down.

**Key Characteristics:**

- **Type-led.** Typography carries the structural work; no background-filled cards, no fancy chrome around individual posts.
- **Flat.** Zero box-shadows; depth comes from rule lines and tinted backgrounds.
- **Two-mode.** Warm cream by default; warm dark for night. Both modes are warm-axis; cool grays are forbidden.
- **One accent.** Cinnabar (or Cinnabar Glow in dark) is the only color carrying interactive or attentional weight.
- **Feed-shaped.** 1024px max-width container so embedded charts and tweets can breathe. Reverse-chronological. Hand-curated, never algorithmic.
- **Wordmark-above-banner.** The universe wordmark sits above the weird-charts site banner.

## 2. Colors: The Lab Notebook Palette

A two-tone notebook palette with a single Cinnabar accent. Both modes are warm-tinted; cool grays are forbidden.

### Primary
- **Cinnabar** (`#b14b1f`, light mode): pigment of medieval manuscripts. Used for the tagline ("a love letter to strange and/or captivating charts"), all anchor links, the "follow @weirdcharts" CTA in the nav, term-title emphasis (e.g. the term name on `/tags/grimacing/`), and hover states.
- **Cinnabar Glow** (`#e08a5c`, dark mode): the same hue, lifted in lightness for legibility against Tar.

### Neutral (light mode)
- **Bench White** (`#fafaf7`): page background; the writing surface.
- **Carbon** (`#1a1a1a`): primary text; the site banner; the wordmark name.
- **Lead Mid** (`#555555`): nav links at rest; term-page back-links.
- **Lead Faint** (`#888888`): the wordmark pipe separator; post-meta; term counts on the taxonomy index.
- **Bench Mark** (`#e3e0d6`): rule lines, dividers, the bottom border under the site banner.

### Neutral (dark mode)
- **Tar** (`#14140f`): page background.
- **Bone** (`#ece8d9`): primary text.
- **Worn Bone** (`#b3aea0`): secondary text and tagline copy.
- **Faded Bone** (`#807a6d`): tertiary text and the wordmark pipe.
- **Bench Mark Dark** (`#2a2820`): rule lines and dividers.

### Named Rules

**The One Cinnabar Rule.** Cinnabar (or Cinnabar Glow in dark) is the only accent color used on more than a few pixels. It appears on the tagline italic ("the brief in the brand's ink"), all links, the nav CTA, term-title emphasis, and the wordmark hover. Never as a gradient. Never with a second accent.

**The No Cool Grays Rule.** Every neutral carries warmth. Never use `#fff`, `#000`, or cool-axis grays. The notebook is on a wooden desk.

**The Tinted Black Rule.** Carbon (`#1a1a1a`) is the deepest text color. Pure `#000` is forbidden.

## 3. Typography

**Display Font:** ui-sans-serif system stack (system font, no webfonts).
**Body Font:** Iowan Old Style, with Palatino / Palatino Linotype / Georgia as fallbacks.

**Character:** a warm, considered serif body for tagline, dates, and reading prose. A precise sans for the wordmark, the site banner, the nav, taxonomy titles, and the footer. The system-font choice is deliberate; no custom faces, no webfont loads, text renders instantly.

### Hierarchy
- **Wordmark** (sans, 700, 15px, line-height 1, letter-spacing -0.02em): the canonical `Andy Martin | almart.in` wordmark above the site banner.
- **Site banner** (sans, 700, 34px, line-height 1.1, letter-spacing -0.02em): the "weird charts" wordmark at the top of every page, below the universe wordmark.
- **Tagline** (serif italic, 400, 20px, line-height 1.4, Cinnabar): the "a love letter to strange and/or captivating charts" line below the banner. The brief, in the brand's ink.
- **Taxonomy / term title** (sans, 600, 24px, line-height 1.2, letter-spacing -0.01em): the `<h2>` on `/tags/`, `/contributor/`, and individual term pages. On term pages, the term name itself is rendered in serif italic Cinnabar via `<em>`.
- **Nav link** (sans, 400, 17px): the "contribute" / "follow @weirdcharts" page-level nav.
- **Nav CTA** (sans, 700, 17px): the active CTA variant of nav-link in Cinnabar.
- **Body** (serif, 400, 1.6rem ≈ 16px at the etch theme's 62.5% root): paragraph copy, post dates, captions.
- **Footer** (sans, 400, 16px): copyright and metadata.

### Named Rules

**The 62.5% Root Rule.** weird-charts inherits the etch theme's `html { font-size: 62.5% }` convention. Every `rem` value in `assets/css/site.css` is computed against a 10px root, not 16px. Use pixel values for clarity, or multiply intended px by 0.1. Plain rem values that assume a 16px root will render tiny. See `docs/styling.md` for the full explanation.

**The System-Font Rule.** Use the system font stack. No webfonts. The instant-load, no-pretense signal is the choice, not a fallback.

**The Sans-for-Structure Rule.** Sans-serif carries structure (wordmark, banner, nav, taxonomy titles, footer). Serif carries voice (tagline, term-name emphasis, dates, prose). Iowan Old Style's italic is the right register for the tagline because the tagline is the brief.

## 4. Elevation

The system is flat. Zero box-shadows. Depth comes from:

1. **Rule lines.** 1px solid Bench Mark below the site banner; under the post-list separator if any; 1px under the footer.
2. **Tinted backgrounds.** The Twitter embed iframes carry their own visual chrome; the site's own backgrounds are flat Bench White (Tar in dark).
3. **Type weight contrast.** The 700-weight banner and the 400-weight tagline establish hierarchy without any shadow.

State changes use color shift and underline thickness change, not shadow.

### Named Rules

**The No Shadow Rule.** No `box-shadow` declarations. The site is flat at rest. State changes (hover, focus) use color and underline thickness only.

**The Embed-Is-Itself Rule.** Twitter / X embeds carry their own visual chrome from Twitter / X. The site does not wrap them in cards, borders, or shadows. The embed is the artifact, the surrounding page is the museum mat.

## 5. Components

### Universe wordmark
- **Text:** `Andy Martin | almart.in`
- **Linked to:** `https://almart.in/`
- **Typography:** wordmark (sans, 700, 15px, -0.02em letter-spacing)
- **Name color:** Carbon (Bone in dark). Pipe: Lead Faint (Faded Bone in dark), weight 400.
- **Hover:** underline appears with 3px offset.
- **Position:** above the site banner, on every page. The "you are in Andy's universe" signal.

### Site banner ("weird charts")
- **Layout:** flex with brand-block on the left and nav on the right; wraps at narrow viewports.
- **Bottom border:** 1px Bench Mark, padding-bottom 1.5rem, margin-bottom 3rem.
- **Banner h1:** sans, 700, 34px, line-height 1.1, letter-spacing -0.02em, no underline at rest.
- **Tagline:** serif italic, 20px, Cinnabar, 8px top margin. The brief, in the brand's ink. The universe wordmark above the banner does the attribution work; no separate byline is needed.

### Navigation
- **Position:** top-right of the banner.
- **Layout:** vertical at desktop (column, end-aligned); horizontal at narrow viewports (`max-width: 600px`).
- **Links:** sans, 17px, Lead Mid; hover lifts to Cinnabar.
- **CTA variant (`follow @weirdcharts`):** sans, 700, Cinnabar at rest.

### Post links (homepage feed and tag / contributor pages)
- **Style:** Cinnabar, underline 1px with 2px offset.
- **Hover:** underline thickness lifts to 2px.

### Taxonomy index (`/tags/`, `/contributor/`)
- **Title:** `<h2 class="taxonomy-title">` rendered sans, 600, 24px, Carbon (Bone in dark), lowercased.
- **List:** `<ul class="terms-list">`, serif italic body type (1.8rem, line-height 1.7). Each row is the term name (lowercase, as written in front matter, spaces preserved) followed by a small Lead Faint count in sans 13px.
- **No bullets, no rule lines between rows.** The page reads like the back-of-book index: a quiet directory in the book's own typeface.

### Term page (`/tags/<term>/`, `/contributor/<name>/`)
- **Title:** `<h2 class="term-title">` reading `tagged <em>{term}</em>` or `by <em>{name}</em>`. The `<em>` carries the term itself in serif italic Cinnabar; the framing words ("tagged", "by") stay in Carbon sans. The term is what's editorial; the frame is structural.
- **Back-link:** `<p class="term-nav"><a>all tags</a></p>` (or `all contributors`). Sans, 14px, Lead Mid, with an `←` glyph prepended via CSS pseudo-element. Hover lifts to Cinnabar with underline.
- **Below the title and nav:** the standard postblock partial repeats, same as the homepage.

### Body / post content
- **Paragraph:** serif (Iowan), 400, 1.6rem (etch theme convention; visually 16px at 62.5% root), Carbon (Bone in dark).
- **Post date / contributor metadata:** smaller and muted.

### Embedded tweets (the dominant content type)
- **Wrapper:** no extra chrome. Twitter / X renders the embed; the site provides space around it.
- **Spacing:** generous vertical margin between successive embeds; the page rhythm carries the feed.

### Raw images (non-tweet charts)
- **Wrapper:** `rawhtml` shortcode with a plain `<img>`. No border, no shadow.
- **Citation link:** below the image, body type, Cinnabar.

### Footer
- **Style:** sans, 16px, Lead Faint.
- **Container:** border-top 1px Bench Mark, padding-top 1.5rem, margin-top 5rem.
- **Links:** Lead Mid; hover lifts to Cinnabar with underline.

### Named Rules

**The Wordmark-Above-Banner Rule.** The universe wordmark sits above the weird-charts banner, never replacing it. The wordmark signals "Andy's universe"; the banner signals "weird-charts specifically." Both are needed.

**The Type-Led Component Rule.** Components are typography first, structure second. A post is a date plus an embed plus tags. A tag link is body type in Cinnabar. A contributor page is a list of links. There are no cards; there is no chrome around individual posts.

**The Quiet-Around-The-Embed Rule.** The chart (whether tweet or raw image) carries its own visual identity. The site should hold a steady, quiet visual hand around it. Resist adding wrappers, decorative borders, or framing devices.

## 6. Do's and Don'ts

### Do:
- **Do** carry the universe wordmark above the site banner on every page. Link it to `https://almart.in/`.
- **Do** use Cinnabar (`#b14b1f`) for all links and the nav CTA. Cinnabar Glow (`#e08a5c`) in dark mode.
- **Do** keep neutrals warm-tinted. Every neutral has measurable yellow chroma.
- **Do** use the system font stack. No webfonts.
- **Do** preserve the etch theme's 62.5% root font-size convention. Document any new rem values explicitly. See `docs/styling.md`.
- **Do** give the chart embed visual space and minimal frame. The chart is the hero.
- **Do** lowercase the post-tag text. Tags are the editorial voice; the lowercase signals working-notes warmth, not gallery polish.

### Don't:
- **Don't** use `#000` or `#fff`. Pure neutrals are forbidden.
- **Don't** use cool grays. The whole palette is warm-axis.
- **Don't** add `box-shadow` anywhere in the production CSS. The system is flat.
- **Don't** use gradients. The single Cinnabar accent is always flat.
- **Don't** stripe posts with colored left borders or pseudo-accent bars.
- **Don't** wrap individual posts in cards. The post is a date plus an embed plus tags; no card chrome.
- **Don't** introduce custom webfonts without explicit approval. The system-font stack is canonical.
- **Don't** build an algorithmic / engagement-feed aesthetic (trending tags, upvote counts, "most popular this week"). The site is hand-curated and reverse-chronological.
- **Don't** add SaaS-landing-page chrome: hero gradients, conversion-focused headlines, three-card feature blocks, prominent CTAs above the fold.
- **Don't** turn the feed into a scroll-driven dataviz essay with ambient autoplay, full-bleed multimedia, or "let us guide you through the data" pacing. The site is a feed of single artifacts.
- **Don't** apply heavily art-directed editorial polish that scrubs the seams off the source chart. The weird belongs in.
- **Don't** introduce a chart-recommendation system, an upvote count, or any visible engagement metric. Taste is the algorithm.
