/* Tirage au sort des groupes (Atelier).
   Les prénoms restent sur la tablette (jamais dans le dépôt GitHub).
   Le tirage évite au maximum de remettre ensemble les élèves qui ont déjà travaillé ensemble. */
(function () {
  "use strict";
  const A = window.APP;
  const { ic, esc, fr, ligneTrad, texte, cadre, aller } = A;
  const $ = (s, el) => (el || document).querySelector(s);

  const T = {
    titre: { fr: "Tirage au sort des groupes", uk: "Жеребкування груп", pl: "Losowanie grup", es: "Sorteo de los grupos", rn: null },
    desc: { fr: "Chaque fois avec quelqu'un de nouveau.", uk: "Щоразу з кимось новим.", pl: "Za każdym razem z kimś nowym.", es: "Cada vez con alguien nuevo.", rn: null },
    presents: { fr: "Qui est là aujourd'hui ?", uk: "Хто сьогодні тут?", pl: "Kto jest dzisiaj?", es: "¿Quién está hoy?", rn: null },
    taille: { fr: "Groupes de", uk: "Групи по", pl: "Grupy po", es: "Grupos de", rn: null },
    tirer: { fr: "Tirer au sort", uk: "Тягнути жереб", pl: "Losuj", es: "Sortear", rn: null },
    retirer: { fr: "Nouveau tirage", uk: "Новий жереб", pl: "Losuj ponownie", es: "Nuevo sorteo", rn: null },
    garder: { fr: "On garde ces groupes", uk: "Залишаємо ці групи", pl: "Zostawiamy te grupy", es: "Nos quedamos con estos grupos", rn: null },
    garde: { fr: "Groupes enregistrés", uk: "Групи збережено", pl: "Grupy zapisane", es: "Grupos guardados", rn: null },
    groupe: { fr: "Groupe", uk: "Група", pl: "Grupa", es: "Grupo", rn: null },
    personnes: { fr: "personnes", uk: "особи", pl: "osoby", es: "personas", rn: null }
  };

  /* ---------- Données (sur la tablette) ---------- */
  function C() {
    const S = A.S;
    S.classe = S.classe || {};
    const c = S.classe;
    c.noms = c.noms || []; c.historique = c.historique || []; c.absents = c.absents || {};
    return c;
  }
  const jour = () => new Date().toISOString().slice(0, 10);
  const absentsDuJour = () => C().absents[jour()] || [];
  const presents = () => C().noms.filter(n => !absentsDuJour().includes(n));
  const cle = (a, b) => [a, b].sort().join("§");

  /* Nombre de fois où chaque paire a déjà travaillé ensemble (les tirages récents comptent plus). */
  function compteurs() {
    const m = {};
    const h = C().historique;
    h.forEach((t, i) => {
      const poids = 1 + i / Math.max(1, h.length); // de 1 (ancien) à 2 (récent)
      t.groupes.forEach(g => { for (let a = 0; a < g.length; a++) for (let b = a + 1; b < g.length; b++) { const k = cle(g[a], g[b]); m[k] = (m[k] || 0) + poids; } });
    });
    return m;
  }
  function melanger(t) { const a = t.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  /* Découpe : autant de groupes complets que possible, les élèves en trop rejoignent d'autres groupes. */
  function decouper(liste, k) {
    const nb = Math.max(1, Math.floor(liste.length / k));
    const g = Array.from({ length: nb }, () => []);
    liste.forEach((n, i) => g[i % nb].push(n));
    return g;
  }
  function tirer(k) {
    const l = presents();
    if (l.length < 2) return null;
    const m = compteurs();
    let meilleur = null, score = Infinity;
    for (let essai = 0; essai < 600; essai++) {
      const g = decouper(melanger(l), k);
      let s = 0;
      g.forEach(gr => { for (let a = 0; a < gr.length; a++) for (let b = a + 1; b < gr.length; b++) s += m[cle(gr[a], gr[b])] || 0; });
      if (s < score) { score = s; meilleur = g; if (s === 0) break; }
    }
    return meilleur;
  }

  /* ---------- État de l'écran ---------- */
  let taille = 2, resultat = null, enregistre = false, edition = false, codeOk = false;

  function ecran() {
    const c = C();
    if (edition) return ecranListe();
    const abs = absentsDuJour();
    const tete = `<div class="bandeau" style="--espace:var(--ink)">
        <a class="rond retour" href="#atelier" aria-label="Retour">${ic("gauche")}</a>
        <div><h1>${esc(fr(T.titre))}</h1>${ligneTrad(T.titre)}</div>
      </div>`;
    if (!c.noms.length) return cadre(tete + `
      <div class="carte bloc" style="text-align:center;display:grid;gap:16px;justify-items:center">
        <div class="rond-test">${ic("users")}</div>
        <p class="consigne-texte">La liste de la classe est vide sur cette tablette.</p>
        <p class="petit">Le prof la remplit une fois (code prof). Les prénoms restent sur l'iPad.</p>
        <button class="btn btn-principal" data-gr-editer>${ic("crayon")} Remplir la liste</button>
      </div>`, "atelier", "atelier");

    const n = presents().length;
    const groupes = resultat ? resultat.map((g, i) => `
      <div class="groupe-tire" style="--i:${i}">
        <span class="num-groupe">${esc(fr(T.groupe))} ${i + 1}</span>
        <ul>${g.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`).join("") : "";
    cadre(tete + `
      <p class="consigne-texte bloc">${texte(T.desc)}</p>
      <div class="tirage-colonnes bloc">
        <section class="carte">
          <h2>${esc(fr(T.presents))}${ligneTrad(T.presents)}</h2>
          <div class="puces-eleves">${c.noms.map(p => `<button class="puce-eleve" data-gr-presence="${esc(p)}" aria-pressed="${!abs.includes(p)}">${!abs.includes(p) ? ic("ok") : ic("x")} ${esc(p)}</button>`).join("")}</div>
          <p class="petit" style="margin-top:12px">${n} présent${n > 1 ? "s" : ""} · <button class="btn-discret" data-gr-editer>Modifier la liste</button></p>
          <h2 style="margin-top:24px">${esc(fr(T.taille))}${ligneTrad(T.taille)}</h2>
          <div class="segments" role="group">${[2, 3, 4].map(k => `<button class="segment" data-gr-taille="${k}" aria-pressed="${taille === k}">${k}</button>`).join("")}</div>
          <button class="btn btn-principal btn-tirer" data-gr-tirer ${n < 2 ? "disabled" : ""}>${ic("de")} ${esc(fr(resultat ? T.retirer : T.tirer))}</button>
        </section>
        <section>
          ${resultat ? `<div class="groupes-tires">${groupes}</div>
            <div class="ligne-boutons" style="margin-top:16px">
              ${enregistre ? `<span class="niv vert">${ic("ok")} ${esc(fr(T.garde))}</span>` : `<button class="btn btn-secondaire" data-gr-garder>${ic("ok")} ${esc(fr(T.garder))}</button>`}
            </div>`
          : `<div class="carte-plate attente-tirage">${ic("de")}<p>${texte(T.desc)}</p></div>`}
          ${c.historique.length ? `<details class="historique-groupes"><summary>Derniers groupes (${c.historique.length})</summary>
            ${c.historique.slice(-5).reverse().map(t => `<p class="petit"><b>${t.date}</b> : ${t.groupes.map(g => esc(g.join(" + "))).join(" · ")}</p>`).join("")}
            <button class="btn-discret" data-gr-oublier>Effacer l'historique</button></details>` : ""}
        </section>
      </div>`, "atelier", "atelier");
  }

  function ecranListe() {
    const tete = `<div class="bandeau" style="--espace:var(--ink)">
        <button class="rond retour" data-gr-fin-edition aria-label="Retour">${ic("gauche")}</button>
        <div><h1>Liste de la classe</h1></div></div>`;
    if (!codeOk) return cadre(tete + `
      <form class="carte bloc form-prof" id="form-gr-code" style="max-width:480px">
        <label>Code prof<input id="gr-code" type="password" inputmode="numeric" autocomplete="off"></label>
        <p class="petit" id="gr-code-msg"></p>
        <button class="btn btn-principal" type="submit">Ouvrir</button>
      </form>`, "atelier", "atelier");
    cadre(tete + `
      <form class="carte bloc" id="form-gr-liste" style="display:grid;gap:16px">
        <label class="petit" for="gr-noms"><b>Un prénom par ligne.</b> Pour deux prénoms identiques, ajoute l'initiale du nom (ex. Valeriia L.). Les prénoms restent sur cette tablette.</label>
        <textarea id="gr-noms" rows="14" style="font:var(--t-texte);padding:12px;border:var(--trait);border-radius:var(--r-md)">${esc(C().noms.join("\n"))}</textarea>
        <div class="ligne-boutons"><button class="btn btn-principal" type="submit">${ic("ok")} Enregistrer</button></div>
      </form>`, "atelier", "atelier");
  }

  /* ---------- Événements ---------- */
  document.addEventListener("click", ev => {
    if (A.route() !== "groupes") return;
    const b = ev.target.closest("button"); if (!b) return;
    const d = b.dataset;
    if (d.grEditer !== undefined) { edition = true; return A.rendre(); }
    if (d.grFinEdition !== undefined) { edition = false; return A.rendre(); }
    if (d.grPresence) {
      const c = C(); const j = jour();
      const abs = c.absents[j] = c.absents[j] || [];
      const i = abs.indexOf(d.grPresence);
      if (i >= 0) abs.splice(i, 1); else abs.push(d.grPresence);
      Object.keys(c.absents).forEach(k => { if (k !== j) delete c.absents[k]; }); // on ne garde que le jour même
      resultat = null; A.sauver(); return A.rendre();
    }
    if (d.grTaille) { taille = +d.grTaille; resultat = null; return A.rendre(); }
    if (d.grTirer !== undefined) {
      resultat = tirer(taille); enregistre = false; A.rendre();
      const zone = $(".groupes-tires"); if (zone) { zone.classList.add("anime"); if (window.innerWidth <= 900) zone.scrollIntoView({ behavior: "smooth", block: "start" }); }
      return;
    }
    if (d.grGarder !== undefined && resultat) {
      const c = C();
      c.historique.push({ date: jour(), taille, groupes: resultat });
      if (c.historique.length > 40) c.historique.shift();
      enregistre = true; A.sauver(); return A.rendre();
    }
    if (d.grOublier !== undefined) { C().historique = []; A.sauver(); return A.rendre(); }
  });
  document.addEventListener("submit", ev => {
    if (A.route() !== "groupes") return;
    if (ev.target.id === "form-gr-code") {
      ev.preventDefault();
      if ($("#gr-code").value === A.S.codeProf) { codeOk = true; return A.rendre(); }
      $("#gr-code-msg").textContent = "Code incorrect.";
    }
    if (ev.target.id === "form-gr-liste") {
      ev.preventDefault();
      const vus = new Set();
      C().noms = $("#gr-noms").value.split("\n").map(s => s.trim().replace(/\s+/g, " ")).filter(s => s && !vus.has(s.toLowerCase()) && vus.add(s.toLowerCase()));
      resultat = null; edition = false; A.sauver(); return A.rendre();
    }
  });
  window.addEventListener("hashchange", () => { if (location.hash !== "#groupes") { edition = false; codeOk = false; } });

  window.GROUPES = { ecran };
})();
