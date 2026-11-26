/* ==========================================================
   Page « Aujourd'hui » : mes cours du jour, la leçon à projeter,
   les cours à noter dans mon Suivi, et mon horaire.
   Données (sur l'appareil) :
   - "commun/horaire"  : { cours: [{ id, jour (1 = lundi … 5 = vendredi), debut "08:20", fin "09:10", classe "1D", local "B12" }] }
   - "meta/dernieres"  : { "1D": { id, titre, page, t } }  ← écrit par Leçons à chaque leçon ouverte
   - "carnet/lecons"   : mes fiches de leçons du Suivi (pour savoir ce qui est déjà noté)
   Pour tester un autre jour : /accueil/?jour=2027-01-05
   ========================================================== */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var DEBUT_STAGE = new Date(2027, 0, 4), FIN_STAGE = new Date(2027, 3, 23);
  var HORAIRE = [], CLASSES = [], DERNIERES = {}, LECONS_SUIVI = [], LECONS = [];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function aujourdhui() {
    var q = new URLSearchParams(location.search).get("jour");
    var d = q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? new Date(q + "T00:00:00") : new Date();
    d.setHours(0, 0, 0, 0); return d;
  }
  function jjmm(d) { return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0"); }
  function minutes(h) { var m = /^(\d{1,2}):(\d{2})$/.exec(h || ""); return m ? +m[1] * 60 + +m[2] : 0; }
  function tri(a, b) { return (a.jour - b.jour) || (minutes(a.debut) - minutes(b.debut)); }

  async function charger() {
    try {
      var h = await MesDonnees.doc("commun/horaire").get(); HORAIRE = h.exists ? (h.data().cours || []) : [];
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
    return '<a class="petit-bouton plein" href="/lecons/?' + q + '">▶ Projeter « ' + esc((der.titre || "").slice(0, 30)) + ' » p.' + (der.page || 1) + "</a>";
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
    var html = "<h2>Mes cours · " + esc(titre) + "</h2>";
    if (!L.length) html += '<p class="note">Pas de cours aujourd\'hui.</p>';
    var maintenant = new Date(), minNow = maintenant.getHours() * 60 + maintenant.getMinutes(), estAujourdhui = d.toDateString() === new Date(new Date().setHours(0, 0, 0, 0)).toDateString();
    L.forEach(function (c) {
      var fini = estAujourdhui && minutes(c.fin) && minNow > minutes(c.fin), enCours = estAujourdhui && minNow >= minutes(c.debut) && minNow <= minutes(c.fin);
      html += '<div class="cours' + (enCours ? " en-cours" : "") + (fini ? " fini" : "") + '">' +
        '<div class="heure">' + esc(c.debut) + "<span>" + esc(c.fin) + "</span></div>" +
        '<div class="quoi"><b>' + esc(c.classe) + "</b>" + (c.local ? ' <span class="note">· ' + esc(c.local) + "</span>" : "") + (enCours ? ' <span class="badge">en cours</span>' : "") + "</div>" +
        '<div class="actions">' + lienProjeter(c.classe) +
        (dejaNote(c.classe, d) ? '<span class="note">✓ noté</span>' : '<a class="petit-bouton" href="' + lienNoter(c.classe, d) + '">📝 Noter</a>') + "</div></div>";
    });
    // Cours des 7 derniers jours de stage pas encore notés dans mon Suivi
    var manque = [];
    for (var k = 1; k <= 7; k++) {
      var dd = new Date(d.getTime() - k * 864e5);
      if (dd < DEBUT_STAGE || dd > FIN_STAGE) continue;
      HORAIRE.filter(function (c) { return c.jour === dd.getDay(); }).forEach(function (c) {
        if (!dejaNote(c.classe, dd) && !manque.some(function (m) { return m.classe === c.classe && m.d.getTime() === dd.getTime(); })) manque.push({ classe: c.classe, d: dd });
      });
    }
    if (manque.length) html += '<h3 class="a-noter">À noter dans mon Suivi</h3><p class="note">' + manque.map(function (m) { return esc(m.classe) + " (" + JOURS[m.d.getDay()] + " " + jjmm(m.d) + ")"; }).join(" · ") + ' · <a href="/suivi/#les">Ouvrir Mes leçons</a></p>';
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
        '<input data-h="local" value="' + esc(c.local) + '" placeholder="Local" aria-label="Local">' +
        '<button class="petit-bouton" data-suppr aria-label="Retirer ce cours">×</button>';
      r.addEventListener("change", function (e) { var k = e.target.dataset.h; if (!k) return; c[k] = k === "jour" ? +e.target.value : e.target.value; sauver(); });
      r.querySelector("[data-suppr]").addEventListener("click", function () { HORAIRE = HORAIRE.filter(function (x) { return x !== c; }); sauver(); editeur(); });
      box.appendChild(r);
    });
  }
  var t = null;
  function sauver() {
    clearTimeout(t);
    t = setTimeout(function () {
      MesDonnees.doc("commun/horaire").set({ cours: HORAIRE }).then(function () { $("#horaire-etat").textContent = "Enregistré."; coursDuJour(); }).catch(function () { $("#horaire-etat").textContent = "Échec de l'enregistrement."; });
    }, 300);
  }

  // Retour arrière depuis Leçons ou Suivi : je relis mes données
  addEventListener("pageshow", function (e) { if (e.persisted) charger().then(function () { coursDuJour(); editeur(); }); });

  document.addEventListener("DOMContentLoaded", async function () {
    await charger();
    coursDuJour(); editeur();
    $("#h-ajouter").addEventListener("click", function () {
      var der = HORAIRE.slice().sort(tri).pop();
      HORAIRE.push({ id: "h" + Date.now(), jour: der ? der.jour : 1, debut: der ? der.fin : "08:20", fin: "", classe: CLASSES[0] || "", local: "" });
      sauver(); editeur();
    });
  });
})();
