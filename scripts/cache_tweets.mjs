#!/usr/bin/env node
// Fetch tweet payloads + media from Twitter's syndication endpoint and
// stash them locally so the Hugo build is fully offline and the rendered
// site has zero runtime dependency on Twitter / widgets.js.
//
// Inputs: content/posts/*.md — tweet IDs are extracted from {{< tweet-simple "ID" >}}
// Outputs:
//   data/tweets/<ID>.json       — slimmed metadata, read by the shortcode
//   static/tweet-media/<ID>/N.<ext> — downloaded photo files served from our origin
//
// Usage:
//   node scripts/cache_tweets.mjs              # cache any tweets not already cached
//   node scripts/cache_tweets.mjs --force      # re-fetch everything
//   node scripts/cache_tweets.mjs <ID> [<ID>]  # cache specific tweet IDs (always re-fetches)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const DATA_DIR = path.join(ROOT, 'data', 'tweets');
const MEDIA_DIR = path.join(ROOT, 'static', 'tweet-media');

const TWEET_RE = /\{\{<\s*tweet-simple\s+"?(\d+)"?\s*>\}\}/g;

function syndicationToken(id) {
    return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, '');
}

function extensionFor(url, contentType) {
    const m = url.match(/\.(jpg|jpeg|png|gif|webp)(?:\?|$)/i);
    if (m) return m[1].toLowerCase().replace('jpeg', 'jpg');
    if (contentType) {
        if (contentType.includes('jpeg')) return 'jpg';
        if (contentType.includes('png')) return 'png';
        if (contentType.includes('gif')) return 'gif';
        if (contentType.includes('webp')) return 'webp';
    }
    return 'jpg';
}

function tweetIdsFromPosts() {
    const ids = new Set();
    for (const file of fs.readdirSync(POSTS_DIR)) {
        if (!file.endsWith('.md')) continue;
        const text = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
        for (const m of text.matchAll(TWEET_RE)) ids.add(m[1]);
    }
    return [...ids].sort();
}

async function fetchSyndication(id) {
    const token = syndicationToken(id);
    const url = `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${token}&lang=en`;
    const res = await fetch(url, {
        headers: { 'User-Agent': 'weird-charts-cache/1.0' },
    });
    if (!res.ok) throw new Error(`syndication ${id}: HTTP ${res.status}`);
    return res.json();
}

async function downloadMedia(id, media) {
    const dir = path.join(MEDIA_DIR, id);
    fs.mkdirSync(dir, { recursive: true });
    const out = [];
    for (let i = 0; i < media.length; i++) {
        const m = media[i];
        // Photos: media_url_https is the high-res image. For videos, prefer the
        // poster (also media_url_https) — we treat video tweets as thumbnail
        // + click-through to the original.
        const url = m.media_url_https;
        if (!url) continue;
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`  ! media ${id}/${i}: HTTP ${res.status} on ${url}`);
            continue;
        }
        const ct = res.headers.get('content-type') || '';
        const ext = extensionFor(url, ct);
        const buf = Buffer.from(await res.arrayBuffer());
        const filename = `${i}.${ext}`;
        fs.writeFileSync(path.join(dir, filename), buf);
        out.push({
            path: `/tweet-media/${id}/${filename}`,
            type: m.type,                                  // photo / video / animated_gif
            width: m.original_info?.width ?? null,
            height: m.original_info?.height ?? null,
            alt: m.ext_alt_text ?? null,
        });
    }
    return out;
}

function slimRecord(id, raw, media) {
    const user = raw.user || {};
    const handle = user.screen_name || '';
    return {
        id,
        text: raw.text || '',
        author: { handle, name: user.name || handle },
        created_at: raw.created_at || null,
        permalink: handle
            ? `https://twitter.com/${handle}/status/${id}`
            : `https://twitter.com/x/status/${id}`,
        media,
    };
}

async function cacheOne(id, { force = false } = {}) {
    const dataFile = path.join(DATA_DIR, `${id}.json`);
    if (!force && fs.existsSync(dataFile)) {
        return { id, status: 'skip' };
    }
    let raw;
    try {
        raw = await fetchSyndication(id);
    } catch (e) {
        return { id, status: 'error', error: e.message };
    }
    const media = await downloadMedia(id, raw.mediaDetails || []);
    const record = slimRecord(id, raw, media);
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify(record, null, 2) + '\n');
    return { id, status: 'ok', media: media.length };
}

async function main(argv) {
    const force = argv.includes('--force');
    const explicit = argv.filter((a) => /^\d+$/.test(a));
    const ids = explicit.length ? explicit : tweetIdsFromPosts();

    if (!ids.length) {
        console.log('no tweet ids found');
        return;
    }

    console.log(`caching ${ids.length} tweets${force ? ' (--force)' : ''}${explicit.length ? ' (explicit)' : ''}`);

    let ok = 0, skip = 0, err = 0;
    for (const id of ids) {
        const r = await cacheOne(id, { force: force || explicit.length > 0 });
        if (r.status === 'ok') {
            console.log(`  + ${id} (${r.media} media)`);
            ok++;
        } else if (r.status === 'skip') {
            skip++;
        } else {
            console.error(`  ! ${id}: ${r.error}`);
            err++;
        }
        // Be polite to the syndication endpoint.
        if (r.status !== 'skip') await new Promise((r) => setTimeout(r, 250));
    }

    console.log(`done: ${ok} cached, ${skip} skipped, ${err} errors`);
    if (err > 0) process.exit(1);
}

main(process.argv.slice(2)).catch((e) => {
    console.error(e);
    process.exit(1);
});
