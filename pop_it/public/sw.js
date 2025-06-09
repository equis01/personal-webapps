self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('popit-cache').then(function (cache) {
      return cache.addAll(['/', 'https://evazquez.me/personal-webapps/pop_it/index.html']);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
