/* Mode hors ligne : l'app est gardée sur l'iPad.
   À CHAQUE MISE À JOUR DE L'APP, augmenter VERSION (ex. "v2" → "v3") pour que les iPad téléchargent la nouvelle version. */
const VERSION = "v4";
const CACHE = "ma-classe-" + VERSION;
const FICHIERS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./css/fonts.css", "./css/tokens.css", "./css/app.css", "./css/lecons.css",
  "./js/data.js", "./js/parcours.js", "./js/app.js", "./js/accueil.js", "./js/cartes.js", "./js/atelier.js", "./js/lecons.js",
  "./icones/icone-192.png", "./icones/icone-512.png", "./icones/apple-touch-icon.png",
  "./fonts/comic-neue-latin-400-normal.woff2", "./fonts/comic-neue-latin-700-normal.woff2",
  "./fonts/andika-latin-400-normal.woff2", "./fonts/andika-latin-700-normal.woff2",
  "./fonts/andika-latin-ext-400-normal.woff2", "./fonts/andika-latin-ext-700-normal.woff2",
  "./fonts/andika-cyrillic-400-normal.woff2", "./fonts/andika-cyrillic-700-normal.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(cles => Promise.all(cles.filter(k => k.startsWith("ma-classe-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Pictos ARASAAC : gardés après le premier affichage (ensuite visibles sans wifi)
  if (url.hostname === "static.arasaac.org") {
    e.respondWith(caches.open("ma-classe-pictos").then(async c => {
      const deja = await c.match(e.request);
      if (deja) return deja;
      const r = await fetch(e.request, { mode: "no-cors" });
      c.put(e.request, r.clone());
      return r;
    }));
    return;
  }
  if (url.origin !== location.origin) return; // serveur de discussion, etc. : jamais en cache
  // Contenu du jour : toujours la version en ligne si possible, sinon la dernière gardée
  if (url.pathname.endsWith("/jour.json")) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put("./jour.json", c)); return r; }).catch(() => caches.match("./jour.json")));
    return;
  }
  // Fichiers de l'app : d'abord le cache (rapide, hors ligne), sinon le réseau
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(rep => {
    if (rep.ok && url.pathname.includes("/pictos/")) caches.open("ma-classe-pictos").then(c => c.put(e.request, rep.clone()));
    return rep;
  }).catch(() => caches.match("./index.html"))));
});
