# SPORTS WIRE — Live Daily Sports News

A React sports news site with cards that auto-refresh from a live sports
headlines feed (no API key required). Includes a scrolling wire ticker and
auto-refresh every 10 minutes plus a manual refresh button.

## 1. Run it locally

```bash
npm install
npm start
```

Opens at http://localhost:3000

## 2. Put it on GitHub

```bash
git init
git add .
git commit -m "Initial commit: THE WIRE news site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## 3. Deploy live with GitHub Pages (free)

1. Open `package.json` and replace the `homepage` field:
   ```
   "homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
   ```
2. Install the deploy tool (already listed in devDependencies, just run):
   ```bash
   npm install
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
4. On GitHub: go to your repo → **Settings → Pages** → under "Build and
   deployment", set **Source: Deploy from a branch**, **Branch: gh-pages**.
5. Your live link will be:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`
   (Wait 1–2 minutes after the first deploy for it to go live.)

## Alternative: Vercel or Netlify (also free, often simpler)

- **Vercel**: go to vercel.com → New Project → Import your GitHub repo →
  it auto-detects Create React App → Deploy. You get a live `.vercel.app` link.
- **Netlify**: go to netlify.com → Add new site → Import from GitHub →
  Build command `npm run build`, publish directory `build` → Deploy.

## Notes

- News source: `saurav.tech/NewsAPI` — a free, no-key mirror of live
  headlines (India edition), refreshed roughly every 15 minutes. To use
  your own NewsAPI.org or GNews key instead, edit `src/api/newsApi.js`.
- The site fetches fresh headlines on every page load and again every
  10 minutes while open, so cards stay current as news changes.
