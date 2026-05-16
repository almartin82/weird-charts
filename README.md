# weird-charts
a love letter to strange and/or captivating charts, sourced from around the web.

weird-charts is a [hugo](https://gohugo.io/) static site, backed by the magic of github pages.  

## contributing
submissions are welcome!  send in your weird charts, be rewarded with a [contributor](https://weirdcharts.com/contributor/) page for eternity. 

### 🌟 RECOMMENDED: USE THE CLAUDE CODE SKILL! 🌟

This repo ships with a [Claude Code](https://claude.com/claude-code) skill that does the whole thing for you. Three steps:

1. **fork + clone** the repo:
   ```bash
   gh repo fork almartin82/weird-charts --clone
   cd weird-charts
   ```
2. **run the skill** in Claude Code, pasting any tweet URL or image URL:
   ```
   /add-post https://x.com/someone/status/1234567890
   ```
   It picks the next post number, assigns quirky tags (you can override them), writes the markdown file, commits, pushes to a branch on your fork, and opens a PR back against this repo.
3. **wait for the PR to be merged.** That's it.

If you don't use Claude Code, the manual instructions below still work fine.

### manual contributing

To contribute, **open a PR against this repo**.  Add a new markdown document to [`content/posts`](https://github.com/almartin82/weird-charts/tree/main/content/posts).

You can look at [`content/posts`](https://github.com/almartin82/weird-charts/tree/main/content/posts) to get a sense of what a post looks like. Here are some examples:

### twitter charts
If it's a tweet, take a look at [470](https://raw.githubusercontent.com/almartin82/weird-charts/main/content/posts/00470.md)

```
---
date: 2022-07-30
contributor: Andy
tags:
- grimacing
---

{{< tweet-simple "1553578239557353472" >}}

<!-- {< tweet user="ArmandDoma" id="1553578239557353472" >}} -->

```

1. change the date, contributor and tags.
2. populate the `tweet-simple` shortcode using the tweet url (https://twitter.com/ArmandDoma/status/1553578239557353472). pull out the id string and replace the string above.  
3. (optional) Update the commented out line if you'd like.  Twitter's `oEmbed` API is apparently going to change at some point, and that will help future proof things if the tweet user needs to get provided.

### other charts

Take a look at [500](https://raw.githubusercontent.com/almartin82/weird-charts/main/content/posts/00500.md)

1. change the date, contributor and tags, same as above.
2. embed your image source in between a `rawhtml` shortcode, like so:

```
{{< rawhtml >}}

  <img src="https://static01.nyt.com/images/2022/08/01/upshot/01morning-friends-chart/01morning-friends-chart-jumbo.png">
{{< /rawhtml >}}
```

3. include a citation with the link to the full page/article below.

### Q & A

**Q: What should I name my post in [`content/posts`](https://github.com/almartin82/weird-charts/tree/main/content/posts)?  What's the numbering scheme?**

A: It honestly doesn't really matter, i've been counting up mostly so things sort nicely.  I counted by tens for old stuff that I "migrated" to github (`0010`, `0020`) mostly so I could fill things in between if I missed something (eg, `001.5`).  Now we're counting by ones (`00528`, `00529`).  But it honestly doesn't matter.  Just go for it!