/* ==========================================================
   Mes outils – script commun
   1. mode jour / nuit (même réglage que mes autres outils : « stageM1-mode »)
   2. barre du bas (Aujourd'hui · DASPA · Suivi · Leçons)
   3. hors ligne (service worker du site)
   Chaque page met <html data-outil="…"> pour dire où je suis.
   ========================================================== */
(function () {
  var R = document.documentElement;

  /* Cette tablette est la mienne : l'appli DASPA affichera alors le bouton « Mes outils ».
     (Sur les iPads des élèves, ces pages ne sont jamais ouvertes.) */
  try { localStorage.setItem("mesoutils-prof", "1"); } catch (e) {}

  /* ---------- 1. Jour / nuit ---------- */
  try { var m = localStorage.getItem("stageM1-mode"); if (m === "light" || m === "dark") R.dataset.mode = m; } catch (e) {}
  function estSombre() { return R.dataset.mode ? R.dataset.mode === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }
  function majInterrupteur(sw) {
    var d = estSombre();
    sw.setAttribute("aria-checked", d ? "true" : "false");
    sw.setAttribute("aria-label", d ? "Passer en mode jour" : "Passer en mode nuit");
  }
  window.MesOutils = window.MesOutils || {};
  // Remplace <button class="sw" data-interrupteur></button> par l'interrupteur
  MesOutils.interrupteur = function (sw) {
    sw.setAttribute("role", "switch");
    sw.title = "Mode jour / mode nuit";
    sw.innerHTML = '<svg class="soleil" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="lune" viewBox="0 0 24 24"><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg><i></i>';
    majInterrupteur(sw);
    sw.addEventListener("click", function () {
      var m = estSombre() ? "light" : "dark";
      R.dataset.mode = m;
      try { localStorage.setItem("stageM1-mode", m); } catch (e) {}
      majInterrupteur(sw);
    });
  };

  /* ---------- 2. Barre du bas ---------- */
  var OUTILS = [
    { id: "aujourdhui", nom: "Aujourd'hui", pic: "🏠", lien: "/accueil/", c: "var(--c-aujourdhui)" },
    { id: "daspa", nom: "DASPA", pic: "🌍", lien: "/daspa/", c: "var(--c-daspa)" },
    { id: "suivi", nom: "Suivi", pic: "📒", lien: "/suivi/", c: "var(--c-suivi)" },
    { id: "lecons", nom: "Leçons", pic: "🖍️", lien: "/lecons/", c: "var(--c-lecons)" }
  ];
  MesOutils.OUTILS = OUTILS;
  function barre() {
    var nav = document.createElement("nav");
    nav.className = "barre-outils";
    nav.setAttribute("aria-label", "Mes outils");
    OUTILS.forEach(function (o) {
      var a = document.createElement("a");
      a.href = o.lien;
      a.style.setProperty("--a", o.c);
      if (R.dataset.outil === o.id) a.setAttribute("aria-current", "page");
      a.innerHTML = '<span aria-hidden="true">' + o.pic + "</span>" + o.nom;
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  }

  document.addEventListener("DOMContentLoaded", function () {
    barre();
    document.querySelectorAll("[data-interrupteur]").forEach(MesOutils.interrupteur);
  });

  /* ---------- 3. Hors ligne ---------- */
  try {
    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(function () {});
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    }
  } catch (e) {}
})();
