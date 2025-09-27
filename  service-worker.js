const CACHE_NAME = 'currency-generator-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/libs/chart.min.js',
  '/manifest.json',
  '/icons/icon-48.png',
  '/icons/icon-152.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('キャッシュを作成中...');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// リクエストをキャッシュから応答、無ければネットワーク
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュの削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cache => {
          if(cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
});