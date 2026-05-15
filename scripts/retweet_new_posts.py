#!/usr/bin/env python3
"""Retweet the source tweet of any newly added weird-charts post from @weirdcharts.

Run by .github/workflows/retweet.yaml on push to main. Looks at the files added
in the push, pulls the status ID out of each {{< tweet-simple "ID" >}} shortcode,
and retweets it. Raw-image posts have no shortcode and are skipped.
"""
import os
import re
import subprocess
import sys

import tweepy

TWEET_RE = re.compile(r'{{<\s*tweet-simple\s+"(\d+)"\s*>}}')


def added_post_files(before, after):
    """Paths of content/posts/*.md files added between two commits."""
    if not before or set(before) <= {"0"}:
        # First push on the branch: github.event.before is all zeros.
        # Fall back to the files added in the tip commit.
        out = subprocess.check_output(
            ["git", "show", "--name-only", "--diff-filter=A",
             "--pretty=format:", "HEAD"],
            text=True,
        )
    else:
        out = subprocess.check_output(
            ["git", "diff", "--name-only", "--diff-filter=A", before, after],
            text=True,
        )
    return [
        line for line in out.splitlines()
        if line.startswith("content/posts/") and line.endswith(".md")
    ]


def tweet_id_for(path):
    with open(path, encoding="utf-8") as fh:
        match = TWEET_RE.search(fh.read())
    return match.group(1) if match else None


def main():
    files = added_post_files(
        os.environ.get("BEFORE_SHA", ""),
        os.environ.get("AFTER_SHA", ""),
    )
    if not files:
        print("no new posts in this push")
        return

    client = tweepy.Client(
        consumer_key=os.environ["TWITTER_API_KEY"],
        consumer_secret=os.environ["TWITTER_API_SECRET"],
        access_token=os.environ["TWITTER_ACCESS_TOKEN"],
        access_token_secret=os.environ["TWITTER_ACCESS_SECRET"],
    )

    failed = False
    for path in files:
        tweet_id = tweet_id_for(path)
        if not tweet_id:
            print(f"skip {path}: no tweet-simple shortcode (raw-image post?)")
            continue
        try:
            client.retweet(tweet_id)
            print(f"retweeted {tweet_id} from {path}")
        except tweepy.errors.TweepyException as err:
            if "already retweeted" in str(err).lower():
                print(f"already retweeted {tweet_id}, skipping")
                continue
            print(f"FAILED to retweet {tweet_id} from {path}: {err}")
            failed = True

    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
