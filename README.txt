PWA package for "Nake CGPA Calculator"
--------------------------------------

Files included:
- manifest.json
- service-worker.js
- offline.html
- head-snippet.html   (paste into your existing <head>)
- sw-register.js      (include before </body>)
- icon-192.png
- icon-512.png

How to deploy on Vercel (quick):
1. Put these files in the root of your web project (same level as index.html).
2. Add the head snippet contents into your site's <head>.
3. Include sw-register.js before </body> (or paste its contents inline).
4. Deploy to Vercel (your site already uses HTTPS). After users visit the site, the service worker will cache the app shell and the site becomes installable.
5. Test: open site in Chrome on Android -> menu -> "Install app" or "Add to Home screen".

Notes about offline mode:
- The service worker pre-caches a small app shell and will try to cache navigation responses at runtime.
- To have full offline capability (where all pages/assets are available offline on first install), you must ensure static JS/CSS/HTML assets are present in the project root so they can be pre-cached.
- If your app fetches data from remote APIs, you may want to cache API responses selectively or show an offline indicator.

If you want, I can:
- Modify the service worker to aggressively cache your app's specific JS/CSS files (if you paste their paths).
- Create a full local copy of your site (index.html + assets) packaged as an offline-first app — I would need the site's HTML/JS/CSS files (you can paste or upload them).