const CACHE_NAME = 'music-loto-v2';
const urlsToCache = [
  '/muzloto2/',
  '/muzloto2/index.html',
  '/muzloto2/style.css',
  '/muzloto2/app.js',
  '/muzloto2/manifest.json',
  '/muzloto2/icon-192.png',
  '/muzloto2/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
