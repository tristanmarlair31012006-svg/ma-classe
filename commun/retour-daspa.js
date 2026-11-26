/* Dans l'appli DASPA : bouton « Mes outils » pour revenir à mes autres outils.
   Il n'apparaît que sur MA tablette (celle où j'ai ouvert « Mes outils »), jamais chez les élèves. */
(function () {
  var prof = false;
  try { prof = localStorage.getItem("mesoutils-prof") === "1"; } catch (e) {}
  if (!prof) return;
  var st = document.createElement("style");
  st.textContent =
    ".retour-outils{position:fixed;z-index:50;top:max(12px,env(safe-area-inset-top));left:12px;display:inline-flex;align-items:center;gap:6px;" +
    "min-height:48px;padding:0 16px;border-radius:999px;background:#7b4fa0;color:#fff;font:600 16px/1 Lexend,system-ui,sans-serif;text-decoration:none;" +
    "box-shadow:0 2px 10px rgba(40,20,60,.25)}" +
    "html.dans-mes-outils .haut{padding-left:170px}";
  document.head.appendChild(st);
  document.documentElement.classList.add("dans-mes-outils");
  function ajouter() {
    var a = document.createElement("a");
    a.className = "retour-outils";
    a.href = "/accueil/";
    a.innerHTML = '<span aria-hidden="true">◀</span> Mes outils';
    document.body.appendChild(a);
  }
  if (document.body) ajouter(); else document.addEventListener("DOMContentLoaded", ajouter);
})();
