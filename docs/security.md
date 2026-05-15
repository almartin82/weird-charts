# Security

This is a Hugo static site published to GitHub Pages plus a small Python
retweet workflow. Most of OWASP doesn't apply (no DB, no auth, no user
input collection). The interesting surface is just secrets, the retweet
script, and the build / deploy workflows.

## What's secure

- **Twitter creds**: read from `os.environ` only in
  `scripts/retweet_new_posts.py`. No hardcoded values, no occurrences in
  git history (verified by scanning for common token patterns: `sk-`,
  `ghp_`, `AKIA`, JWTs, `xox*`).
- **Workflow injection**: `.github/workflows/retweet.yaml` injects the
  four `TWITTER_*` secrets via `${{ secrets.* }}` only on `push` to
  `main`. No `pull_request` trigger, so a fork PR cannot exfiltrate.
- **Repo secrets**: all four exist in GitHub Settings, encrypted at
  rest by GitHub.
- **Logging**: `retweet_new_posts.py` only prints tweet IDs, file paths,
  and tweepy error strings. Tweepy errors do not echo creds.
- **Build job has no secrets**: `hugo.yaml` only uses `GITHUB_TOKEN`
  scoped to `pages: write, contents: read, id-token: write`.

## Trust model for content

`layouts/shortcodes/rawhtml` injects `{{.Inner}}` unescaped, and
`tweet-simple.html` renders Twitter oEmbed JSON via `safeHTML`. This is
fine because the only author committing posts is the repo owner. The
risk model is: anything you commit, you trust. For raw-image posts use
plain `<img src="...">` (no event handlers), as `CLAUDE.md` already
prescribes.

## Open hardening items

In rough priority order:

1. **Pin tweepy** in `.github/workflows/retweet.yaml`. Currently
   `pip install tweepy` is unpinned. A malicious tweepy release would
   run with your Twitter creds in env. Fix:
   ```
   run: pip install tweepy==<known good version>
   ```
2. **Enable branch protection on `main`**. Pushes to `main` auto-deploy
   the site and auto-retweet. Worth requiring linear history at minimum.
3. **Pin GitHub Actions to commit SHAs** (currently `@v4` / `@v5` major
   tags). Standard belt-and-suspenders. A `dependabot.yml` can manage
   the bumps.
4. **Node 20 deprecation**: `actions/deploy-pages@v4` runs on Node 20.
   GitHub forces Node 24 as default starting 2026-06-02 and removes
   Node 20 entirely on 2026-09-16. Bump the action version when an
   updated release is available.

None are urgent; flagged for later.
