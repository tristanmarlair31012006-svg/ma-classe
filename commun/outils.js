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
  // Icônes dessinées au trait (même style partout, pas d'émojis)
  var ICONES = {
    aujourdhui: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h3"/>',
    daspa: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.5 5.3 3.5 8.5s-1.1 6-3.5 8.5c-2.4-2.5-3.5-5.3-3.5-8.5s1.1-6 3.5-8.5z"/>',
    suivi: '<path d="M7 3.5h10.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7z"/><path d="M7 3.5v17M4.5 8h4M4.5 12h4M4.5 16h4M11.5 8.5h5M11.5 12h3"/>',
    lecons: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8.5 20.5h7M7 8.5h6M7 11.5h9"/>',
    crayon: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>'
  };
  MesOutils.icone = function (nom) {
    return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONES[nom] || "") + "</svg>";
  };
  var OUTILS = [
    { id: "aujourdhui", nom: "Aujourd'hui", lien: "/accueil/", c: "var(--c-aujourdhui)" },
    { id: "daspa", nom: "DASPA", lien: "/daspa/", c: "var(--c-daspa)" },
    { id: "suivi", nom: "Suivi", lien: "/suivi/", c: "var(--c-suivi)" },
    { id: "lecons", nom: "Leçons", lien: "/lecons/", c: "var(--c-lecons)" }
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
      a.innerHTML = MesOutils.icone(o.id) + "<span>" + o.nom + "</span>";
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  }

  document.addEventListener("DOMContentLoaded", function () {
    barre();
    document.querySelectorAll("[data-icone]").forEach(function (el) { el.innerHTML = MesOutils.icone(el.dataset.icone); });
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
