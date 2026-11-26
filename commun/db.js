/* ==========================================================
   Mes données – gardées sur cet appareil (IndexedDB « mes-outils »)
   Rien n'est envoyé en ligne.

   Deux tiroirs :
   - docs     : un document par chemin, ex. "lecons/l123", "meta/classes", "prog/c1".
                Même structure que dans mes anciens outils claude.ai.
   - fichiers : les images des pages (blobs), retrouvées par leur id.

   Utilisation (même forme qu'avant, pour garder le code des outils) :
     await MesDonnees.doc("meta/classes").set({ list: [...] });
     const s = await MesDonnees.doc("meta/classes").get();  // s.exists, s.data()
     await MesDonnees.doc("lecons/l1").delete();
     const docs = await MesDonnees.collection("lecons").get(); // [{ id, data() }]
     const id = await MesDonnees.fichiers.ajouter(blob);
     const blob = await MesDonnees.fichiers.lire(id);
   ========================================================== */
(function () {
  var base = null;

  function ouvrir() {
    if (!base) base = new Promise(function (ok, ko) {
      var r = indexedDB.open("mes-outils", 1);
      r.onupgradeneeded = function () {
        var db = r.result;
        if (!db.objectStoreNames.contains("docs")) db.createObjectStore("docs");
        if (!db.objectStoreNames.contains("fichiers")) db.createObjectStore("fichiers");
      };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { base = null; ko(r.error); };
    });
    return base;
  }

  // Une opération dans un tiroir ; renvoie le résultat quand c'est vraiment écrit
  function op(tiroir, mode, fn) {
    return ouvrir().then(function (db) {
      return new Promise(function (ok, ko) {
        var t = db.transaction(tiroir, mode), req = fn(t.objectStore(tiroir));
        t.oncomplete = function () { ok(req ? req.result : undefined); };
        t.onerror = function () { ko(t.error); };
        t.onabort = function () { ko(t.error || new Error("écriture annulée")); };
      });
    });
  }

  // Copie modifiable (les données lues ne sont jamais partagées entre deux lectures)
  function copie(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }
  function instantane(id, v) {
    return { id: id, exists: v !== undefined, data: function () { return v ? copie(v.d) : undefined; } };
  }

  window.MesDonnees = {
    doc: function (chemin) {
      return {
        get: function () { return op("docs", "readonly", function (s) { return s.get(chemin); }).then(function (v) { return instantane(chemin.split("/").pop(), v); }); },
        // maj = date de la dernière modification (servira pour fusionner à l'import)
        set: function (data) { return op("docs", "readwrite", function (s) { return s.put({ d: copie(data), maj: Date.now() }, chemin); }); },
        delete: function () { return op("docs", "readwrite", function (s) { return s.delete(chemin); }); }
      };
    },
    // Tous les documents d'un dossier, ex. collection("lecons") → "lecons/…"
    collection: function (dossier) {
      var p = dossier + "/";
      return {
        get: function () {
          return ouvrir().then(function (db) {
            return new Promise(function (ok, ko) {
              var res = [], t = db.transaction("docs", "readonly");
              var req = t.objectStore("docs").openCursor(IDBKeyRange.bound(p, p + "￿"));
              req.onsuccess = function () {
                var c = req.result;
                if (c) { res.push(instantane(String(c.key).slice(p.length), c.value)); c.continue(); }
              };
              t.oncomplete = function () { ok(res); };
              t.onerror = function () { ko(t.error); };
            });
          });
        }
      };
    },
    fichiers: {
      ajouter: function (blob) {
        var id = "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        return op("fichiers", "readwrite", function (s) { return s.put(blob, id); }).then(function () { return id; });
      },
      lire: function (id) { return op("fichiers", "readonly", function (s) { return s.get(id); }); },
      supprimer: function (id) { return op("fichiers", "readwrite", function (s) { return s.delete(id); }); }
    },
    // L'erreur vient-elle d'un manque de place ?
    estPlein: function (e) { return !!e && (e.name === "QuotaExceededError" || /quota/i.test(String(e.message || ""))); }
  };
})();
