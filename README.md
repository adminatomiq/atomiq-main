# Atomiq

Atomiq: PCMB PYQ Arena, the student app (login, study notes, reactions, quizzes, leaderboard, profile, Contact Us).
It's a static site, so it runs on GitHub Pages with no build step. The admin dashboard lives in the separate `atomiq-admin` repository.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole student app |
| `manifest.webmanifest`, `icon.svg`, `icon-*.png` | App name and icons for "Add to Home screen" |
| `sw.js` | Service worker: network first, keeps a copy for offline use |
| `privacy.html`, `terms.html` | Privacy Policy and Terms of Service linked from the app |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

If your old `www` folder has your own icons, `privacy.html` or `terms.html`, use those instead (same file names).

## Put it on GitHub Pages

1. Create a repository named `atomiq` (Public).
2. Upload every file from this folder to the root of the main branch (not inside a subfolder) and commit.
3. Settings → Pages → Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)** → Save.
4. In 1–2 minutes it's live at `https://<your-username>.github.io/atomiq/`.
5. Firebase console → Authentication → Settings → Authorized domains → add `<your-username>.github.io` (once covers both atomiq and atomiq-admin).

## Updating

Edit and commit; Pages redeploys automatically. Because of the service worker, students get the new version on their next visit while online. If you ever change `sw.js`, bump `VERSION` inside it.

## Run locally

```
python -m http.server 8000
```
Then open http://localhost:8000 (Google sign-in doesn't work from `file://`).
