const CACHE_NAME = 'local-time-app-v1';
const ASSETS = [
  '/',
  '/index.html',
];

// التثبيت والتخزين في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// تفعيل (تنظيف كاش قديم إذا لزم)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// التعامل مع الطلبات
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
