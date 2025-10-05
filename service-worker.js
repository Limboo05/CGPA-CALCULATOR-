const CACHE_NAME = 'nake-cgpa-app-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// On install - cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

// On activate - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch - respond with cache, fallback to network, and fallback to offline page
self.addEventListener('fetch', event => {
  const req = event.request;
  // For navigation requests, try network first, then cache, then offline page
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(response => {
        // Put a copy in cache
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return response;
      }).catch(() => {
        return caches.match(req).then(resp => resp || caches.match(OFFLINE_URL));
      })
    );
    return;
  }

  // For other requests (CSS/JS/images) use cache-first strategy
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(networkResp => {
        // Save to cache for future
        caches.open(CACHE_NAME).then(cache => cache.put(req, networkResp.clone()));
        return networkResp;
      }).catch(() => {
        // as fallback for images, could return an inline svg or nothing
        return caches.match(OFFLINE_URL);
      });
    })
  );
});