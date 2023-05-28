# weird-charts
a handcrafted collection of weird charts, sourced from around the web.

weird-charts is a hugo static site, backed by github pages.  

## contributing
submissions are welcome!  send in your weird charts, be rewarded with a [contributor](https://weirdcharts.com/contributor/) page for eternity. 

To contribute, **open a PR against this repo.  Add a new markdown document to [`content/posts`](https://github.com/almartin82/weird-charts/tree/main/content/posts).

You can look at [`content/posts`](https://github.com/almartin82/weird-charts/tree/main/content/posts) to get a sense of what it looks like.  

### twitter charts
5
If it's a tweet, take a look at [470](https://raw.githubusercontent.com/almartin82/weird-charts/main/content/posts/00470.md)

```
---
date: 2022-07-30
contributor: Andrew
tags:
- grimacing
---

{{< tweet-simple "1553578239557353472" >}}

<!-- {< tweet user="ArmandDoma" id="1553578239557353472" >}} -->

```

1. change the date, contributor and tags.
2. populate the `tweet-simple` shortcode using the tweet url (https://twitter.com/ArmandDoma/status/1553578239557353472). pull out the id string and replace the string above.  You can include the username in the commented out line if you'd like.  Twitter's `oEmbed` API is apparently going to change at some point, and that will help future proof.

### other charts

Take a look at [500](https://raw.githubusercontent.com/almartin82/weird-charts/main/content/posts/00500.md)

embed your image source in between a `rawhtml` shortcode

```
{{< rawhtml >}}

  <img src="https://static01.nyt.com/images/2022/08/01/upshot/01morning-friends-chart/01morning-friends-chart-jumbo.png">
{{< /rawhtml >}}
```

include a citation with the link to the full article below.