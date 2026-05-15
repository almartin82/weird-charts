# Styling

The site visual style is layered on top of the vendored `etch` Hugo theme.
We don't fork the theme. Instead we add one extra stylesheet that loads after
the theme CSS and wins on specificity / source order.

## Files

- `assets/css/site.css` — project-level overrides. Design tokens (colors,
  fonts), header layout, footer layout. Loaded last in the bundle.
- `layouts/partials/head.html` — copy of `themes/etch/layouts/partials/head.html`
  with one extra `append` line so `site.css` joins the resource pipeline:
  ```
  {{ $resources = $resources | append (resources.Get "css/site.css") -}}
  ```
- `layouts/partials/header.html` — brand block (title, tagline, attribution)
  plus a `nav.site-nav` with a bold `.cta` link to follow @weirdcharts.
- `layouts/partials/footer.html` — single line of dot-separated links.

## Design tokens

Mirrors `~/Documents/almart.in/src/styles/global.css`:

```
--bg #fafaf7   --fg #1a1a1a   --fg-muted #555   --fg-faint #888
--accent #b14b1f   --rule #e3e0d6   --maxw 1024px
--font-serif "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif
--font-sans  ui-sans-serif, system-ui, ...
```

Dark mode swaps via `@media (prefers-color-scheme: dark)`. The etch theme
also has a `dark.css` that runs; the new tokens take precedence because
`site.css` is concatenated after it.

## Critical gotcha: 62.5% root font-size

The etch theme's `main.css` opens with:

```
html { font-size: 62.5%; }
body { font-size: 16px; font-size: 1.6rem; ... }
```

This is the classic "1rem = 10px" trick. **Any `rem` value in `site.css` is
computed against a 10px root**, not the standard 16px. A value like
`font-size: 1rem` renders at 10px, not 16px.

Two safe options when adding to `site.css`:

1. **Use absolute pixels** for font-sizes and the `--maxw` token. This is
   what the current file does. Predictable, immune to the root override.
2. **Multiply your intended px by 0.1** to get the rem value. So 17px = 1.7rem.

Don't use plain rem values that assume a 16px root. They will render tiny.

## Header structure

```
<header id="banner">
  <div class="brand-block">
    <h1>weird charts</h1>           ← 34px sans-serif, fg
    <p class="tagline">...</p>      ← 20px serif italic, fg-muted
    <p class="attribution">         ← 15px sans, fg-faint
      by Andy Martin (almart.in)
    </p>
  </div>
  <nav class="site-nav">            ← stacked column, top-right
    <a class="cta">follow @weirdcharts</a>   ← bold accent
    <a>contribute</a>
  </nav>
</header>
```

On viewports under 600px the nav flips to a horizontal row beneath the
brand block.

## Pagination

`hugo.toml` sets `paginate = 50`. Each post is a Twitter oEmbed iframe so
this is a real page-weight tradeoff. If the front page ever feels too
heavy, drop it back. The "Next" link in `layouts/partials/posts.html`
handles overflow.

## Adding new styles

Edit `assets/css/site.css` and rebuild. CI rebuilds and deploys on push to
`main`. To preview locally: `hugo server -D`.

If you find yourself fighting the etch theme on something other than
header / footer / colors, consider either (a) overriding the specific
theme CSS file by placing one with the same name in `assets/css/`, or
(b) adding a more specific selector in `site.css`.
