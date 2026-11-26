/* ==========================================================
   Sauvegarde et synchro entre mes appareils (iPad ↔ Mac)
   - Exporter tout : un fichier .json avec toutes mes données et mes fichiers.
   - Importer : je reprends ce fichier sur l'autre appareil.
     Pour chaque document, la version la plus récente gagne. Rien n'est effacé.
   Le fichier contient les prénoms et notes de mes élèves : il reste privé
   (iCloud Drive, OneDrive perso), jamais dans un dossier partagé.
   ========================================================== */
(function () {
  var CLE_DERNIER = "mesoutils-dernier-export";

  function ouvrir() {
    return new Promise(function (ok, ko) {
      var r = indexedDB.open("mes-outils", 1);
      r.onupgradeneeded = function () {
        var db = r.result;
        if (!db.objectStoreNames.contains("docs")) db.createObjectStore("docs");
        if (!db.objectStoreNames.contains("fichiers")) db.createObjectStore("fichiers");
      };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { ko(r.error); };
    });
  }
  // Tout le contenu d'un tiroir : [[clé, valeur], …]
  function toutLire(db, tiroir) {
    return new Promise(function (ok, ko) {
      var res = [], t = db.transaction(tiroir, "readonly"), req = t.objectStore(tiroir).openCursor();
      req.onsuccess = function () { var c = req.result; if (c) { res.push([c.key, c.value]); c.continue(); } };
      t.oncomplete = function () { ok(res); };
      t.onerror = function () { ko(t.error); };
    });
  }
  function enBase64(blob) {
    return new Promise(function (ok, ko) {
      var fr = new FileReader();
      fr.onload = function () { ok(String(fr.result).split(",")[1] || ""); };
      fr.onerror = function () { ko(fr.error); };
      fr.readAsDataURL(blob);
    });
  }
  function depuisBase64(b64, type) {
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return new Blob([u], { type: type || "application/octet-stream" });
  }
  function aujourdhui() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

  // Donner le fichier : feuille de partage sur iPad, téléchargement sur ordinateur
  async function donner(fichier) {
    var tactile = "ontouchend" in document;
    try {
      if (tactile && navigator.canShare && navigator.canShare({ files: [fichier] })) { await navigator.share({ files: [fichier], title: fichier.name }); return true; }
    } catch (e) { if (e && e.name === "AbortError") return false; }
    var a = document.createElement("a");
    a.href = URL.createObjectURL(fichier); a.download = fichier.name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    return true;
  }

  async function exporter(etat) {
    etat("Je rassemble mes données…");
    var db = await ouvrir();
    var docs = await toutLire(db, "docs"), fichiers = await toutLire(db, "fichiers");
    // Le fichier est construit morceau par morceau (moins de mémoire sur l'iPad)
    var morceaux = ['{"format":"mes-outils","version":1,"date":' + JSON.stringify(new Date().toISOString()) + ',"docs":{'];
    docs.forEach(function (d, i) { morceaux.push((i ? "," : "") + JSON.stringify(String(d[0])) + ":" + JSON.stringify(d[1])); });
    morceaux.push('},"fichiers":{');
    for (var i = 0; i < fichiers.length; i++) {
      etat("Fichiers : " + (i + 1) + " sur " + fichiers.length + "…");
      var b = fichiers[i][1];
      if (!(b instanceof Blob)) continue;
      morceaux.push((morceaux[morceaux.length - 1].slice(-1) === "{" ? "" : ",") + JSON.stringify(String(fichiers[i][0])) + ':{"type":' + JSON.stringify(b.type || "") + ',"data":"' + (await enBase64(b)) + '"}');
    }
    morceaux.push("}}");
    var f = new File(morceaux, "mes-outils-" + aujourdhui() + ".json", { type: "application/json" });
    var fait = await donner(f);
    if (fait) { try { localStorage.setItem(CLE_DERNIER, new Date().toISOString()); } catch (e) {} }
    etat(fait ? "Sauvegarde prête : " + docs.length + " documents, " + fichiers.length + " fichiers (" + Math.max(1, Math.round(f.size / 1048576)) + " Mo)." : "Sauvegarde annulée.");
  }

  async function importer(fichier, etat) {
    etat("Je lis la sauvegarde…");
    var j;
    try { j = JSON.parse(await fichier.text()); } catch (e) { etat("Ce fichier n'est pas une sauvegarde de Mes outils."); return; }
    if (!j || j.format !== "mes-outils" || !j.docs) { etat("Ce fichier n'est pas une sauvegarde de Mes outils."); return; }
    var db = await ouvrir(), nouveaux = 0, plusRecents = 0, gardes = 0, nf = 0;
    var cles = Object.keys(j.docs);
    // Documents : le plus récent gagne
    for (var i = 0; i < cles.length; i++) {
      var k = cles[i], v = j.docs[k];
      var actuel = await new Promise(function (ok) { var r = db.transaction("docs").objectStore("docs").get(k); r.onsuccess = function () { ok(r.result); }; r.onerror = function () { ok(undefined); }; });
      if (actuel === undefined) nouveaux++;
      else if ((v && v.maj || 0) > (actuel.maj || 0)) plusRecents++;
      else { gardes++; continue; }
      await new Promise(function (ok, ko) { var t = db.transaction("docs", "readwrite"); t.objectStore("docs").put(v, k); t.oncomplete = ok; t.onerror = function () { ko(t.error); }; });
    }
    // Fichiers : j'ajoute ceux qui manquent
    var ids = Object.keys(j.fichiers || {});
    for (var n = 0; n < ids.length; n++) {
      etat("Fichiers : " + (n + 1) + " sur " + ids.length + "…");
      var id = ids[n];
      var existe = await new Promise(function (ok) { var r = db.transaction("fichiers").objectStore("fichiers").getKey(id); r.onsuccess = function () { ok(r.result !== undefined); }; r.onerror = function () { ok(false); }; });
      if (existe) continue;
      var x = j.fichiers[id];
      await new Promise(function (ok, ko) { var t = db.transaction("fichiers", "readwrite"); t.objectStore("fichiers").put(depuisBase64(x.data, x.type), id); t.oncomplete = ok; t.onerror = function () { ko(t.error); }; });
      nf++;
    }
    etat("Importé : " + nouveaux + " nouveau(x), " + plusRecents + " mis à jour, " + gardes + " déjà à jour, " + nf + " fichier(s) ajouté(s).");
  }

  function joursDepuisExport() {
    try { var d = localStorage.getItem(CLE_DERNIER); return d ? Math.floor((Date.now() - new Date(d)) / 864e5) : null; } catch (e) { return null; }
  }

  window.MaSauvegarde = { exporter: exporter, importer: importer, joursDepuisExport: joursDepuisExport };
})();
