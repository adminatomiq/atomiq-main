// Atomiq service worker: network first, so students always get the latest version
// when online, with the last copy kept for offline use. Bump VERSION to clear old caches.
const VERSION = "atomiq-v1";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "privacy.html", "terms.html"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;   // Firebase, fonts etc. go straight to the network
  e.respondWith(fetch(r).then(res => {
    if (res.ok) { const c = res.clone(); caches.open(VERSION).then(x => x.put(r, c)); }
    return res;
  }).catch(() => caches.match(r).then(m => m || (r.mode === "navigate" ? caches.match("index.html") : Response.error()))));
});
