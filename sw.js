const CACHE = "altay-v2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./manifest.json"
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
this.diamonds = this.physics.add.group({ allowGravity:false });

for(let i=0;i<10;i++){
 const b = this.bricks.create(
   600+i*350,
   400-Phaser.Math.Between(0,200),
   "brick"
 );

 const d = this.diamonds.create(0,0,"diamond")
   .setScale(0.25)
   .setDepth(5);

 d.brick = b;
}

// Elmasları tuğlanın üstünde sabitle
this.diamonds.children.iterate(d=>{
 if(d && d.brick && d.brick.active){
   d.x = d.brick.x;
   d.y = d.brick.y - d.brick.height/2 - 8;
 }
});


