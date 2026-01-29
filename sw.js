self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.open("altay-cache").then(cache=>
   cache.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    cache.put(e.request,n.clone());
    return n;
   }))
  )
 );
});
