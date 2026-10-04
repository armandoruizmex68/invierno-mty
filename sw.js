/* GENERADO por app/construir.py desde sw_plantilla.js (la versión es el hash de index.html). No editar sw.js. */
var VERSION = "2ed8442948";
var CACHE = "invierno-mty-" + VERSION;
var NUCLEO = ["./", "index.html", "manifest.webmanifest", "iconos/icono-192.png", "iconos/icono-512.png", "iconos/apple-touch-icon.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(NUCLEO); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k.indexOf("invierno-mty-")===0 && k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var req = e.request; if(req.method!=="GET") return;
  var url = new URL(req.url);
  var mismo = url.origin===location.origin, fuente = /(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if(!mismo && !fuente) return;
  // Mismo origen: caché primero (la versión nueva llega al activarse el SW nuevo). Fuentes: caché y actualiza.
  e.respondWith(caches.match(req, {ignoreSearch: mismo}).then(function(hit){
    var red = fetch(req).then(function(r){
      if(r && (r.ok || r.type==="opaque")){ var cp=r.clone(); caches.open(CACHE).then(function(c){ c.put(req,cp); }); }
      return r;
    }).catch(function(){ return hit || (req.mode==="navigate" ? caches.match("index.html") : undefined); });
    return (mismo ? hit : (hit || red)) || red;
  }));
});
