const CACHE_NAME = 'currency-gen-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/libs/chart.min.js',
  'https://cdn.jsdelivr.net/npm/ethers@6/dist/ethers.min.js',
  '/manifest.json',
  '/icons/icon-48.png',
  '/icons/icon-152.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});