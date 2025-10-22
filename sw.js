// Service Worker for Performance Optimization
const CACHE_NAME = 'wishihab-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/bootstrap.min.css',
  '/styles/main.css',
  '/js/core/jquery.3.2.1.min.js',
  '/js/core/popper.min.js',
  '/js/core/bootstrap.min.js',
  '/js/now-ui-kit.js',
  '/js/aos.js',
  '/images/cyber.jpg',
  '/images/appstore.jpg'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
