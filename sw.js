const CACHE_NAME = 'altay-macera-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Oyun motoru
  'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js',
  // Oyun görselleri (Phaser Labs sunucusundan)
  'https://labs.phaser.io/assets/skies/space3.png',
  'https://labs.phaser.io/assets/sprites/platform.png',
  'https://labs.phaser.io/assets/sprites/diamond.png',
  'https://labs.phaser.io/assets/sprites/dude.png',
  'https://labs.phaser.io/assets/sprites/baddie.png'
];

// 1. Kurulum: Dosyaları önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Oyun dosyaları önbelleğe alınıyor...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. İstekleri Yakala: İnternet yoksa önbellekten sun
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Önbellekte varsa oradan ver, yoksa internetten çek
      return response || fetch(event.request);
    })
  );
});

// 3. Etkinleştirme: Eski sürümleri temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
