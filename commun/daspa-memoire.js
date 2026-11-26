/* ==========================================================
   Dans l'appli DASPA (suivi des élèves, mode prof) :
   un bouton « Mémoire » à côté de chaque remarque.
   Il envoie l'observation dans mon Suivi (onglet « Mémoire DASPA »).
   Seulement sur MA tablette (celle où j'ai ouvert « Mes outils »), jamais chez les élèves.
   Rien n'est envoyé en ligne : tout reste sur l'appareil.
   ========================================================== */
(function () {
  var prof = false;
  try { prof = localStorage.getItem("mesoutils-prof") === "1"; } catch (e) {}
  if (!prof || !window.MesDonnees) return;

  var st = document.createElement("style");
  st.textContent =
    ".btn-memoire{margin-left:6px;min-height:40px;padding:0 12px;border-radius:999px;border:2px solid #7b4fa0;background:#fff;color:#7b4fa0;font:700 14px/1 system-ui,sans-serif;cursor:pointer;white-space:nowrap}" +
    ".btn-memoire.envoye{background:#7b4fa0;color:#fff}" +
    ".panneau-memoire{position:fixed;inset:0;z-index:80;background:rgba(20,12,30,.55);display:flex;align-items:center;justify-content:center;padding:16px}" +
    ".panneau-memoire>div{background:#fff;color:#2a1f35;border-radius:18px;padding:20px;width:min(520px,100%);font:16px/1.5 system-ui,sans-serif}" +
    ".panneau-memoire textarea{width:100%;min-height:120px;font:inherit;border:2px solid #e2d8ee;border-radius:10px;padding:10px;margin:8px 0 12px}" +
    ".panneau-memoire .lig{display:flex;gap:8px;justify-content:flex-end}" +
    ".panneau-memoire button{min-height:48px;padding:0 18px;border-radius:12px;border:1px solid #e2d8ee;background:#fff;font:600 16px system-ui,sans-serif;cursor:pointer}" +
    ".panneau-memoire button.pri{background:#7b4fa0;color:#fff;border-color:#7b4fa0}";
  document.head.appendChild(st);

  function prenomDe(ligne) {
    var th = ligne.querySelector("th");
    return th && th.firstChild ? String(th.firstChild.textContent || "").trim() : "";
  }

  function ouvrirPanneau(input, bouton) {
    var prenom = prenomDe(input.closest("tr"));
    var p = document.createElement("div");
    p.className = "panneau-memoire";
    p.innerHTML = '<div><b>Utile pour le mémoire</b><p style="margin:6px 0 0;color:#6f6280"></p><textarea></textarea><div class="lig"><button data-x="non">Annuler</button><button class="pri" data-x="oui">Envoyer dans mon Suivi</button></div></div>';
    p.querySelector("p").textContent = "Observation sur " + (prenom || "cet élève") + ". Elle reste sur cet appareil.";
    var ta = p.querySelector("textarea");
    ta.value = input.value || "";
    ta.placeholder = "Ce que j'ai observé…";
    p.addEventListener("click", function (e) {
      var x = e.target.dataset && e.target.dataset.x;
      if (e.target === p || x === "non") { p.remove(); return; }
      if (x !== "oui") return;
      var d = new Date(), id = "m" + Date.now();
      var jour = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      MesDonnees.doc("memoire/" + id).set({ t: Date.now(), date: jour, prenom: prenom, texte: ta.value.trim(), analyse: "", source: "Envoyée depuis l'appli DASPA" })
        .then(function () { p.remove(); bouton.classList.add("envoye"); bouton.textContent = "✓ Mémoire"; })
        .catch(function () { p.querySelector("p").textContent = "Enregistrement impossible sur cet appareil."; });
    });
    document.body.appendChild(p);
    ta.focus();
  }

  // L'appli redessine ses écrans : j'ajoute le bouton chaque fois qu'une remarque apparaît
  function ajouterBoutons() {
    document.querySelectorAll("input.saisie-remarque").forEach(function (input) {
      if (input.nextElementSibling && input.nextElementSibling.classList.contains("btn-memoire")) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn-memoire";
      b.textContent = "Mémoire";
      b.title = "Utile pour le mémoire : envoyer dans mon Suivi";
      b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); ouvrirPanneau(input, b); });
      input.insertAdjacentElement("afterend", b);
    });
  }
  new MutationObserver(ajouterBoutons).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", ajouterBoutons);
})();
