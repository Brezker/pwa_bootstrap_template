const CACHE_NAME = 'v1-cache';

const CACHE_URLS = [
  '/',
  'main.js',
  'manifest.json',
  'sw.js',
  'index.html',
  'imgs/halloween01.jpg',
  'imgs/halloween02.jpg',
  'imgs/halloween03.jpg',
  'imgs/halloween04.jpg',
  'imgs/halloween05.jpg',
  'imgs/halloween06.jpg',
  'imgs/halloween07.jpg',
  'imgs/halloween08.jpg',
  'imgs/icon-192x192.png',
  'imgs/icon-512x512.png',
  'imgs/icon-2048x2048.png',
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Fetch and cache new resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
