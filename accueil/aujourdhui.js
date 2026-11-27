/* ==========================================================
   Page « Aujourd'hui » : mes cours du jour, la leçon à projeter,
   les cours à noter dans mon Suivi, et mon horaire.
   Données (sur l'appareil) :
   - "commun/horaire"  : { cours: [{ id, jour (1 = lundi … 5 = vendredi), debut "08:20", fin "09:10", classe "1D", matiere "FHGS", local "B12" }] }
                           (matiere est facultatif : les anciens cours sans matière restent valables)
   - "commun/calendrier" : { debut "2027-01-04", fin "2027-04-23", sansCours: [{ id, du "2027-02-01", au "2027-02-02", motif "Formations" }] }
                           jours où mon horaire ne s'applique pas (formations, voyage, conseils de classe…)
   - "meta/dernieres"  : { "1D": { id, titre, page, t } }  ← écrit par Leçons à chaque leçon ouverte
   - "carnet/lecons"   : mes fiches de leçons du Suivi (pour savoir ce qui est déjà noté)
   Pour tester un autre jour : /accueil/?jour=2027-01-05
   ========================================================== */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var MATIERES = ["FHGS", "FES", "DASPA"];
  var HORAIRE = [], CLASSES = [], DERNIERES = {}, LECONS_SUIVI = [], LECONS = [];
  var CAL = { debut: "2027-01-04", fin: "2027-04-23", sansCours: [] };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function aujourdhui() {
    var q = new URLSearchParams(location.search).get("jour");
    var d = q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? new Date(q + "T00:00:00") : new Date();
    d.setHours(0, 0, 0, 0); return d;
  }
  function jjmm(d) { return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0"); }
  function minutes(h) { var m = /^(\d{1,2}):(\d{2})$/.exec(h || ""); return m ? +m[1] * 60 + +m[2] : 0; }
  function tri(a, b) { return (a.jour - b.jour) || (minutes(a.debut) - minutes(b.debut)); }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function enStage(d) { var k = iso(d); return k >= CAL.debut && k <= CAL.fin; }
  // Motif si mon horaire ne s'applique pas ce jour-là (formation, voyage…), sinon null
  function sansCours(d) {
    var k = iso(d), x = (CAL.sansCours || []).filter(function (s) { return s.du && k >= s.du && k <= (s.au || s.du); })[0];
    return x ? (x.motif || "pas de cours") : null;
  }
  function etiquette(c) { return esc(c.classe) + (c.matiere ? " " + esc(c.matiere) : ""); }

  async function charger() {
    try {
      // Copies : les données lues sont figées
      var h = await MesDonnees.doc("commun/horaire").get(); HORAIRE = h.exists ? JSON.parse(JSON.stringify(h.data().cours || [])) : [];
      var k = await MesDonnees.doc("commun/calendrier").get();
      if (k.exists) { var o = JSON.parse(JSON.stringify(k.data() || {})); CAL = { debut: o.debut || CAL.debut, fin: o.fin || CAL.fin, sansCours: o.sansCours || [] }; }
      var c = await MesDonnees.doc("meta/classes").get(); CLASSES = c.exists ? (c.data().list || []).map(function (x) { return x.nom; }) : [];
      if (!CLASSES.length) CLASSES = ["1D", "1E", "DASPA"];
      var d = await MesDonnees.doc("meta/dernieres").get(); DERNIERES = d.exists ? d.data() || {} : {};
      var s = await MesDonnees.doc("carnet/lecons").get(); LECONS_SUIVI = s.exists ? (s.data().v || []) : [];
      LECONS = (await MesDonnees.collection("lecons").get()).map(function (x) { var o = x.data() || {}; return { id: x.id, titre: o.titre }; });
    } catch (e) { HORAIRE = []; }
  }

  // Une fiche « Mes leçons » existe-t-elle déjà pour cette classe et cette date ?
  function dejaNote(classe, d) { var k = jjmm(d); return LECONS_SUIVI.some(function (l) { return l.classe === classe && String(l.date || "").slice(0, 5) === k; }); }

  function lienProjeter(classe) {
    var der = DERNIERES[classe];
    if (!der || !LECONS.some(function (l) { return l.id === der.id; })) return '<a class="petit-bouton" href="/lecons/">Choisir une leçon</a>';
    var q = new URLSearchParams({ lecon: der.id, page: String(der.page || 1), classe: classe });
    return '<a class="petit-bouton plein" href="/lecons/?' + q + '">' + MesOutils.icone("lecons") + 'Projeter « ' + esc((der.titre || "").slice(0, 30)) + ' » p.' + (der.page || 1) + "</a>";
  }

  // Ouvre mon Suivi sur une fiche « Mes leçons » préremplie (classe, date, dernière leçon projetée)
  function lienNoter(classe, d) {
    var der = DERNIERES[classe], q = new URLSearchParams({ noter: "1", classe: classe, date: d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0") });
    if (der && LECONS.some(function (l) { return l.id === der.id; })) { q.set("lecon", der.id); q.set("titre", der.titre || "Leçon"); }
    else q.set("titre", "Cours du " + jjmm(d));
    return "/suivi/?" + q;
  }

  function coursDuJour() {
    var d = aujourdhui(), j = d.getDay(), box = $("#cours-jour");
    var titre = JOURS[j].charAt(0).toUpperCase() + JOURS[j].slice(1) + " " + jjmm(d);
    if (!HORAIRE.length) { box.innerHTML = '<h2>Mes cours du jour</h2><p class="note">J\'encode mon horaire une fois (plus bas, « Mon horaire ») et mes cours apparaîtront ici chaque jour.</p>'; return; }
    var L = HORAIRE.filter(function (c) { return c.jour === j; }).sort(tri);
    var html = "<h2>Mes cours · <span style=\"font-weight:400;color:var(--gris)\">" + esc(titre) + "</span></h2>";
    var motif = sansCours(d);
    if (motif) { html += '<p class="note">Pas de cours : <b>' + esc(motif) + "</b>.</p>"; L = []; }
    else if (!L.length) html += '<p class="note">Pas de cours aujourd\'hui.</p>';
    var maintenant = new Date(), minNow = maintenant.getHours() * 60 + maintenant.getMinutes(), estAujourdhui = d.toDateString() === new Date(new Date().setHours(0, 0, 0, 0)).toDateString();
    L.forEach(function (c) {
      var fini = estAujourdhui && minutes(c.fin) && minNow > minutes(c.fin), enCours = estAujourdhui && minNow >= minutes(c.debut) && minNow <= minutes(c.fin);
      html += '<div class="cours' + (enCours ? " en-cours" : "") + (fini ? " fini" : "") + '">' +
        '<div class="heure">' + esc(c.debut) + "<span>" + esc(c.fin) + "</span></div>" +
        '<div class="quoi"><b>' + esc(c.classe) + "</b>" + (c.matiere ? " " + esc(c.matiere) : "") + (c.local ? ' <span class="note">· local ' + esc(c.local) + "</span>" : "") + (enCours ? ' <span class="badge">· en cours</span>' : "") + "</div>" +
        '<div class="actions">' + lienProjeter(c.classe) +
        (dejaNote(c.classe, d) ? '<span class="note">✓ noté</span>' : '<a class="petit-bouton" href="' + lienNoter(c.classe, d) + '">Noter</a>') + "</div></div>";
    });
    // Cours des 7 derniers jours de stage pas encore notés dans mon Suivi
    var manque = [];
    for (var k = 1; k <= 7; k++) {
      var dd = new Date(d.getTime() - k * 864e5);
      if (!enStage(dd) || sansCours(dd)) continue;
      HORAIRE.filter(function (c) { return c.jour === dd.getDay(); }).forEach(function (c) {
        if (!dejaNote(c.classe, dd) && !manque.some(function (m) { return m.classe === c.classe && m.d.getTime() === dd.getTime(); })) manque.push({ classe: c.classe, lib: etiquette(c), d: dd });
      });
    }
    if (manque.length) html += '<h3 class="a-noter">À noter dans mon Suivi</h3><p class="note">' + manque.map(function (m) { return m.lib + " (" + JOURS[m.d.getDay()] + " " + jjmm(m.d) + ")"; }).join(" · ") + ' · <a href="/suivi/#les">Ouvrir Mes leçons</a></p>';
    box.innerHTML = html;
  }

  /* ---------- Mon horaire ---------- */
  function editeur() {
    var box = $("#horaire-liste");
    var L = HORAIRE.slice().sort(tri);
    box.innerHTML = L.length ? "" : '<p class="note">Pas encore de cours.</p>';
    L.forEach(function (c) {
      var r = document.createElement("div"); r.className = "ligne-horaire";
      r.innerHTML = '<select data-h="jour" aria-label="Jour">' + [1, 2, 3, 4, 5].map(function (n) { return '<option value="' + n + '"' + (c.jour === n ? " selected" : "") + ">" + JOURS[n] + "</option>"; }).join("") + "</select>" +
        '<input type="time" data-h="debut" value="' + esc(c.debut) + '" aria-label="Début">' +
        '<input type="time" data-h="fin" value="' + esc(c.fin) + '" aria-label="Fin">' +
        '<select data-h="classe" aria-label="Classe">' + CLASSES.concat(CLASSES.indexOf(c.classe) < 0 && c.classe ? [c.classe] : []).map(function (n) { return "<option" + (c.classe === n ? " selected" : "") + ">" + esc(n) + "</option>"; }).join("") + "</select>" +
        '<select data-h="matiere" aria-label="Cours"><option value="">Cours…</option>' + MATIERES.concat(c.matiere && MATIERES.indexOf(c.matiere) < 0 ? [c.matiere] : []).map(function (n) { return "<option" + (c.matiere === n ? " selected" : "") + ">" + esc(n) + "</option>"; }).join("") + "</select>" +
        '<input data-h="local" value="' + esc(c.local) + '" placeholder="Local" aria-label="Local">' +
        '<button class="petit-bouton" data-suppr aria-label="Retirer ce cours">×</button>';
      r.addEventListener("change", function (e) { var k = e.target.dataset.h; if (!k) return; c[k] = k === "jour" ? +e.target.value : e.target.value; sauver(); });
      r.querySelector("[data-suppr]").addEventListener("click", function () { HORAIRE = HORAIRE.filter(function (x) { return x !== c; }); sauver(); editeur(); });
      box.appendChild(r);
    });
  }
  /* ---------- Jours sans cours ---------- */
  function editeurSans() {
    var box = $("#sans-liste");
    var L = (CAL.sansCours || []).slice().sort(function (a, b) { return a.du < b.du ? -1 : 1; });
    box.innerHTML = L.length ? "" : '<p class="note">Aucun pour l\'instant.</p>';
    L.forEach(function (s) {
      var r = document.createElement("div"); r.className = "ligne-sans";
      r.innerHTML = '<input type="date" data-s="du" value="' + esc(s.du) + '" aria-label="Du">' +
        '<input type="date" data-s="au" value="' + esc(s.au || s.du) + '" aria-label="Au">' +
        '<input data-s="motif" value="' + esc(s.motif) + '" placeholder="Pourquoi ? (formation…)" aria-label="Motif">' +
        '<button class="petit-bouton" data-suppr aria-label="Retirer">×</button>';
      r.addEventListener("change", function (e) { var k = e.target.dataset.s; if (!k) return; s[k] = e.target.value; if (k === "du" && (!s.au || s.au < s.du)) s.au = s.du; sauverCal(); editeurSans(); });
      r.querySelector("[data-suppr]").addEventListener("click", function () { CAL.sansCours = CAL.sansCours.filter(function (x) { return x !== s; }); sauverCal(); editeurSans(); });
      box.appendChild(r);
    });
  }
  var tc = null;
  function sauverCal() {
    clearTimeout(tc);
    tc = setTimeout(function () {
      MesDonnees.doc("commun/calendrier").set(CAL).then(function () { $("#horaire-etat").textContent = "Enregistré."; coursDuJour(); }).catch(function () { $("#horaire-etat").textContent = "Échec de l'enregistrement."; });
    }, 300);
  }

  var t = null;
  function sauver() {
    clearTimeout(t);
    t = setTimeout(function () {
      MesDonnees.doc("commun/horaire").set({ cours: HORAIRE }).then(function () { $("#horaire-etat").textContent = "Enregistré."; coursDuJour(); }).catch(function () { $("#horaire-etat").textContent = "Échec de l'enregistrement."; });
    }, 300);
  }

  // Retour arrière depuis Leçons ou Suivi : je relis mes données
  function recharger() { return charger().then(function () { coursDuJour(); editeur(); editeurSans(); }); }
  addEventListener("pageshow", function (e) { if (e.persisted) recharger(); });
  // Après un import (sauvegarde ou fichier d'horaire), j'affiche tout de suite les nouvelles données
  window.Aujourdhui = { recharger: recharger };

  document.addEventListener("DOMContentLoaded", async function () {
    await charger();
    coursDuJour(); editeur(); editeurSans();
    $("#s-ajouter").addEventListener("click", function () {
      var k = iso(aujourdhui());
      CAL.sansCours = (CAL.sansCours || []).concat([{ id: "s" + Date.now(), du: k, au: k, motif: "" }]);
      sauverCal(); editeurSans();
    });
    $("#h-ajouter").addEventListener("click", function () {
      var der = HORAIRE.slice().sort(tri).pop();
      HORAIRE.push({ id: "h" + Date.now(), jour: der ? der.jour : 1, debut: der ? der.fin : "08:15", fin: "", classe: CLASSES[0] || "", matiere: der ? der.matiere || "" : "", local: "" });
      sauver(); editeur();
    });
  });
})();
