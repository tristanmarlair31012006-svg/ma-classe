/* Suivi de la classe.
   - Tablette élève : envoie son bilan (prénom, n° de tablette, avancement dans les leçons) au serveur de la classe
     et reçoit les feedbacks du prof, affichés sur l'accueil.
   - Tablette prof (clé prof) : voit la progression de chaque élève, envoie des feedbacks, tient un cahier de cotes.
     Le cahier de cotes reste sur la tablette du prof (jamais envoyé). */
(function () {
  "use strict";
  const A = window.APP;
  const { ic, esc, fr, ligneTrad, texte, cadre, boutonsSon } = A;
  const $ = (s, el) => (el || document).querySelector(s);

  const T = {
    messageTonProf: { fr: "Message de ton prof", uk: "Повідомлення від твого вчителя", pl: "Wiadomość od twojego nauczyciela", es: "Mensaje de tu profe", rn: null },
    jaiLu: { fr: "J'ai lu", uk: "Я прочитав|Я прочитала", pl: "Przeczytałem|Przeczytałam", es: "Lo he leído", rn: null }
  };

  /* Feedbacks prêts à l'emploi, déjà traduits (le texte libre, lui, part en français seulement). */
  const MODELES = [
    { type: "bravo", t: { fr: "Bravo, tu avances bien ! Continue comme ça.", uk: "Молодець, ти добре просуваєшся! Продовжуй так.", pl: "Brawo, dobrze ci idzie! Tak trzymaj.", es: "¡Bien hecho, avanzas bien! Sigue así." } },
    { type: "bravo", t: { fr: "Super résultat à ton mini-test !", uk: "Чудовий результат міні-тесту!", pl: "Świetny wynik mini-testu!", es: "¡Muy buen resultado en tu mini-prueba!" } },
    { type: "bravo", t: { fr: "Tu as fait de gros progrès cette semaine.", uk: "Цього тижня ти дуже добре просунувся.|Цього тижня ти дуже добре просунулася.", pl: "W tym tygodniu zrobiłeś duże postępy.|W tym tygodniu zrobiłaś duże postępy.", es: "Esta semana has progresado mucho." } },
    { type: "info", t: { fr: "Pense à faire ton mini-test.", uk: "Не забудь пройти міні-тест.", pl: "Pamiętaj, żeby zrobić mini-test.", es: "Acuérdate de hacer tu mini-prueba." } },
    { type: "info", t: { fr: "Retourne à ta séquence et continue-la.", uk: "Повернися до своєї теми й продовж її.", pl: "Wróć do swojego tematu i kontynuuj.", es: "Vuelve a tu tema y continúa." } },
    { type: "info", t: { fr: "Aujourd'hui, choisis une autre matière.", uk: "Сьогодні вибери інший предмет.", pl: "Dzisiaj wybierz inny przedmiot.", es: "Hoy elige otra asignatura." } },
    { type: "attention", t: { fr: "Je te vois peu travailler. On en parle ensemble ?", uk: "Я бачу, що ти мало працюєш. Поговоримо разом?", pl: "Widzę, że mało pracujesz. Porozmawiamy?", es: "Veo que trabajas poco. ¿Lo hablamos juntos?" } },
    { type: "attention", t: { fr: "Concentre-toi sur ton travail, s'il te plaît.", uk: "Зосередься, будь ласка, на своїй роботі.", pl: "Skup się, proszę, na swojej pracy.", es: "Concéntrate en tu trabajo, por favor." } },
    { type: "attention", t: { fr: "Viens me voir, je vais t'aider.", uk: "Підійди до мене, я тобі допоможу.", pl: "Podejdź do mnie, pomogę ci.", es: "Ven a verme, te voy a ayudar." } }
  ];
  const TYPE = { bravo: { ic: "trophee", nom: "Bravo" }, info: { ic: "megaphone", nom: "Conseil" }, attention: { ic: "ampoule", nom: "Attention" } };

  const reglages = () => A.S.discussion || {};
  const configure = () => !!(reglages().serveur && reglages().codeClasse);
  const estProf = () => !!reglages().clePof;
  const base = () => reglages().serveur.replace(/\/+$/, "");
  const qs = prof => "?" + new URLSearchParams(Object.assign({ classe: reglages().codeClasse }, prof ? { cleprof: reglages().clePof } : {}));

  /* ======================= Côté élève ======================= */
  let dernierEnvoi = 0, enCours = false, minuteur = null;
  async function envoyer(force) {
    const S = A.S;
    if (!configure() || !S.profil || estProf() || enCours) return;
    if (!force && Date.now() - dernierEnvoi < 20000) { planifier(); return; }
    enCours = true;
    try {
      const lus = S.feedbacksLus || [];
      const r = await fetch(base() + "/suivi" + qs(false), {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ tablette: S.profil.tablette, prenom: S.profil.prenom, langue: S.profil.langue, bilan: Object.assign(window.LECONS ? window.LECONS.bilan() : {}, { derniereActivite: S.derniereActivite || null }), lus })
      });
      if (r.ok) {
        const j = await r.json();
        dernierEnvoi = Date.now();
        S.feedbacksLus = []; // le serveur les a notés comme lus
        const avant = JSON.stringify(S.feedbacks || []);
        const vus = new Set(S.feedbacksVus || []);
        S.feedbacks = (j.feedbacks || []).filter(f => !vus.has(f.id));
        A.sauver();
        if (JSON.stringify(S.feedbacks) !== avant && A.route() === "accueil") A.rendre();
      }
    } catch (e) { /* hors ligne : on réessaiera */ }
    enCours = false;
  }
  function planifier() { clearTimeout(minuteur); minuteur = setTimeout(() => envoyer(true), 20000); }

  // Dernière activité dans l'app (pour le prof : « vu il y a… »).
  window.addEventListener("hashchange", () => {
    const r = A.route();
    if (/^(act|seq|res|test|disc|atelier)-/.test(r) || r === "lecons" || r === "tout") { A.S.derniereActivite = Date.now(); A.sauver(); }
    envoyer(false);
  });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) envoyer(true); });
  setInterval(() => { if (!document.hidden) envoyer(true); }, 60000);
  setTimeout(() => envoyer(true), 1500);

  function blocAccueil() {
    const liste = A.S.feedbacks || [];
    if (!liste.length) return "";
    return liste.map(f => {
      const t = TYPE[f.type] || TYPE.info;
      return `<div class="feedback-prof ${esc(f.type)}" role="status">
        <span class="ico-fb">${ic(t.ic)}</span>
        <div class="corps-fb"><span class="petit">${esc(fr(T.messageTonProf))}${ligneTrad(T.messageTonProf)}</span>
          <p class="consigne-texte">${texte(f.texte)}</p></div>
        <div class="actions-fb"><div class="sons">${boutonsSon(f.texte)}</div>
          <button class="btn btn-principal" data-fb-lu="${esc(f.id)}">${ic("ok")} ${esc(fr(T.jaiLu))}</button></div>
      </div>`;
    }).join("");
  }

  /* ======================= Côté prof ======================= */
  let ouvert = false;      // code prof saisi pendant cette session
  try { ouvert = sessionStorage.getItem("daspa-suivi-ok") === "1"; } catch (e) {}
  let onglet = "progression", tri = "avancement", donnees = null, etat = "", charge = 0, demo = false;
  let panneau = null;      // tablette dont le panneau feedback est ouvert
  let texteLibre = "", typeLibre = "info", msgEnvoi = "", confirmerOubli = null;

  async function charger() {
    if (demo) { donnees = donneesDemo(); etat = "demo"; return A.route() === "suivi" && A.rendre(); }
    if (!configure() || !estProf()) { etat = "non-configure"; return A.route() === "suivi" && A.rendre(); }
    etat = etat === "ok" ? "ok" : "chargement";
    try {
      const r = await fetch(base() + "/prof/suivi" + qs(true));
      if (r.status === 403) { etat = "refuse"; }
      else if (!r.ok) { etat = "erreur"; }
      else { donnees = await r.json(); etat = "ok"; charge = Date.now(); }
    } catch (e) { etat = "hors-ligne"; }
    if (A.route() === "suivi" && !document.querySelector(".panneau-fb textarea:focus, .cahier input:focus")) A.rendre();
  }
  setInterval(() => { if (A.route() === "suivi" && ouvert && !demo && !document.hidden) charger(); }, 30000);

  const depuis = t => {
    if (!t) return "jamais";
    const m = Math.round((Date.now() - t) / 60000);
    if (m < 1) return "à l'instant";
    if (m < 60) return `il y a ${m} min`;
    const h = Math.round(m / 60);
    if (h < 24) return `il y a ${h} h`;
    const j = Math.round(h / 24);
    return `il y a ${j} jour${j > 1 ? "s" : ""}`;
  };
  const barre = pct => `<span class="barre" role="img" aria-label="${pct} %"><i style="width:${pct}%"></i></span>`;
  const pctGlobal = e => (e.bilan && e.bilan.global) ? e.bilan.global.pct : 0;
  const activite = e => (e.bilan && e.bilan.derniereActivite) || e.vu || 0;

  function eleves() {
    const l = ((donnees && donnees.eleves) || []).slice();
    if (tri === "avancement") l.sort((a, b) => pctGlobal(a) - pctGlobal(b));
    if (tri === "activite") l.sort((a, b) => (activite(a) || 0) - (activite(b) || 0));
    if (tri === "prenom") l.sort((a, b) => a.prenom.localeCompare(b.prenom, "fr"));
    if (tri === "tablette") l.sort((a, b) => String(a.tablette).localeCompare(String(b.tablette), "fr", { numeric: true }));
    return l;
  }

  function ecran() {
    if (!ouvert) return ecranCode();
    if (!donnees && !etat) charger();
    const tete = `<div class="bandeau" style="--espace:var(--ink)">
        <a class="rond retour" href="#prof" aria-label="Retour">${ic("gauche")}</a>
        <div><h1>Suivi de la classe</h1><span class="trad">${messageEtat()}</span></div>
        <button class="btn btn-secondaire actualiser" data-sv-actualiser>${ic("annuler")} Actualiser</button>
      </div>`;
    if (etat === "non-configure" && !demo) return cadre(tete + `
      <div class="carte bloc" style="display:grid;gap:16px;max-width:720px">
        <h2>Le serveur n'est pas encore branché sur cette tablette</h2>
        <p>Dans <a href="#prof">Mode prof</a>, remplis l'adresse du serveur, le code de la classe et la <b>clé prof</b>. Sur les tablettes des élèves : adresse et code de la classe seulement.</p>
        <p class="petit">Tu peux déjà voir à quoi ça ressemble avec des élèves fictifs.</p>
        <div class="ligne-boutons"><button class="btn btn-principal" style="--espace:var(--ink)" data-sv-demo>Voir avec des élèves fictifs</button></div>
      </div>`, "", "");
    const onglets = `<div class="onglets-suivi" role="tablist">
        ${[["progression", "Progression"], ["cahier", "Cahier de cotes"]].map(([k, n]) => `<button role="tab" class="onglet-suivi" data-sv-onglet="${k}" aria-selected="${onglet === k}">${n}</button>`).join("")}
        <label class="tri">Trier par <select data-sv-tri>${[["avancement", "avancement (le plus bas d'abord)"], ["activite", "activité (le plus ancien d'abord)"], ["prenom", "prénom"], ["tablette", "n° de tablette"]].map(([k, n]) => `<option value="${k}" ${tri === k ? "selected" : ""}>${n}</option>`).join("")}</select></label>
      </div>`;
    const l = eleves();
    const vide = `<p class="carte-plate bloc">Aucune tablette n'a encore envoyé de bilan. Les bilans arrivent dès qu'un élève ouvre l'app avec le serveur branché.</p>`;
    cadre(tete + (demo ? `<p class="bandeau-demo bloc">${ic("ampoule")} Élèves fictifs, pour voir l'écran. <button class="btn-discret" data-sv-demo-fin>Quitter la démo</button></p>` : "") + onglets +
      (!l.length ? vide : onglet === "cahier" ? cahier(l) : progression(l)), "", "");
  }

  function messageEtat() {
    if (demo) return "Démonstration";
    return { chargement: "Chargement…", ok: `À jour ${depuis(charge)} · ${((donnees && donnees.eleves) || []).length} tablettes`, refuse: "Clé prof ou code de la classe refusé : vérifie le mode prof.", erreur: "Le serveur a répondu par une erreur.", "hors-ligne": "Pas de connexion au serveur.", "non-configure": "Serveur pas branché" }[etat] || "";
  }

  function ecranCode() {
    cadre(`<div class="bandeau" style="--espace:var(--ink)"><a class="rond retour" href="#accueil" aria-label="Retour">${ic("gauche")}</a><div><h1>Suivi de la classe</h1></div></div>
      <form class="carte bloc form-prof" id="form-sv-code" style="max-width:480px;display:grid;gap:12px">
        <label>Code prof<input id="sv-code" type="password" inputmode="numeric" autocomplete="off"></label>
        <p class="petit" id="sv-code-msg"></p>
        <button class="btn btn-principal" style="--espace:var(--ink)" type="submit">Ouvrir</button>
      </form>`, "", "");
  }

  /* ---------- Onglet Progression ---------- */
  function progression(l) {
    return `<div class="grille-eleves bloc">${l.map(e => {
      const b = e.bilan || {};
      const g = b.global || { pct: 0, f: 0, n: 0, critOk: 0, crit: 0 };
      const act = activite(e);
      const inactif = !act || Date.now() - act > 2 * 86400000;
      const enLigne = e.vu && Date.now() - e.vu < 3 * 60000;
      const nonLus = (e.feedbacks || []).filter(f => !f.lu).length;
      const disc = A.D.disciplines.map(d => {
        const x = (b.disciplines || {})[d.id];
        return x ? `<span class="mini-disc" data-espace="${d.id}"><span class="nom-disc">${esc(fr(d.t))}</span>${barre(x.pct)}<b>${x.pct} %</b></span>` : "";
      }).join("");
      const tests = Object.values(b.tests || {});
      return `<article class="carte-eleve ${inactif ? "inactif" : ""}">
        <header>
          <span class="pastille-tab">${esc(e.tablette)}</span>
          <h2>${esc(e.prenom)}</h2>
          <span class="vu ${enLigne ? "en-ligne" : ""}">${enLigne ? "● en ligne" : `vu ${depuis(e.vu)}`}</span>
        </header>
        <div class="global"><span class="pct">${g.pct} %</span>${barre(g.pct)}<span class="petit">${g.f}/${g.n} étapes · ${g.critOk}/${g.crit} critères</span></div>
        <div class="discs">${disc || `<span class="petit">Pas encore commencé.</span>`}</div>
        ${b.enCours ? `<p class="petit">${ic("book")}<span>En cours : <b>${esc(b.enCours.titre)}</b></span></p>` : ""}
        ${tests.length ? `<p class="petit">${ic("cible")}<span>${tests.map(t => `${esc(t.titre.replace(/^Mini-test : |^Test de fin de chapitre : /, ""))} ${t.meilleurNb}/${t.total}`).join(" · ")}</span></p>` : ""}
        ${inactif ? `<p class="alerte-inactif">${ic("ampoule")} Pas d'activité depuis plus de 2 jours</p>` : ""}
        <div class="ligne-boutons">
          <button class="btn btn-secondaire" data-sv-panneau="${esc(e.tablette)}">${ic("megaphone")} Feedback${nonLus ? ` <span class="compteur">${nonLus} non lu${nonLus > 1 ? "s" : ""}</span>` : ""}</button>
        </div>
        ${panneau === e.tablette ? panneauFeedback(e) : ""}
      </article>`;
    }).join("")}</div>`;
  }

  function panneauFeedback(e) {
    const envoyes = (e.feedbacks || []).slice().reverse();
    return `<div class="panneau-fb">
      <h3>Envoyer à ${esc(e.prenom)}</h3>
      <p class="petit">Messages prêts, déjà traduits pour l'élève :</p>
      <div class="modeles">${MODELES.map((m, i) => `<button class="modele ${m.type}" data-sv-modele="${i}" data-tab="${esc(e.tablette)}">${ic(TYPE[m.type].ic)} ${esc(m.t.fr)}</button>`).join("")}</div>
      <label class="petit" for="sv-libre">Ou ton propre message (en français, il ne sera pas traduit) :</label>
      <textarea id="sv-libre" rows="2" maxlength="300">${esc(texteLibre)}</textarea>
      <div class="ligne-boutons">
        <select data-sv-type-libre>${Object.entries(TYPE).map(([k, v]) => `<option value="${k}" ${typeLibre === k ? "selected" : ""}>${v.nom}</option>`).join("")}</select>
        <button class="btn btn-principal" style="--espace:var(--ink)" data-sv-libre="${esc(e.tablette)}">Envoyer</button>
        <button class="btn-discret" data-sv-panneau="">Fermer</button>
      </div>
      <p><button class="btn-discret" data-sv-oublier="${esc(e.tablette)}">${confirmerOubli === e.tablette ? "Touche encore pour confirmer : tout effacer pour cette tablette" : "Effacer cette tablette du suivi (élève parti…)"}</button></p>
      ${msgEnvoi ? `<p class="petit" role="status">${esc(msgEnvoi)}</p>` : ""}
      ${envoyes.length ? `<h4>Déjà envoyés</h4><ul class="fb-envoyes">${envoyes.map(f => `<li><span>${ic(TYPE[f.type] ? TYPE[f.type].ic : "megaphone")} ${esc(f.texte.fr)}</span>
          <span class="petit">${new Date(f.date).toLocaleDateString("fr-BE", { day: "numeric", month: "short" })} · ${f.lu ? `${ic("ok")} lu` : "pas encore lu"}</span>
          <button class="btn-discret" data-sv-suppr="${esc(f.id)}" data-tab="${esc(e.tablette)}">Retirer</button></li>`).join("")}</ul>` : ""}
    </div>`;
  }

  async function envoyerFeedback(tablette, texteObj, type) {
    msgEnvoi = "Envoi…"; A.rendre();
    if (demo) {
      const e = donnees.eleves.find(x => x.tablette === tablette);
      e.feedbacks.push({ id: String(Date.now()), texte: texteObj, type, date: Date.now(), lu: null });
      msgEnvoi = "Envoyé (démo).";
      return A.rendre();
    }
    try {
      const r = await fetch(base() + "/prof/feedback" + qs(true), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tablette, texte: texteObj, type }) });
      msgEnvoi = r.ok ? "Envoyé. L'élève le verra sur son accueil." : "Pas envoyé : le serveur a refusé.";
      if (r.ok) texteLibre = "";
    } catch (e) { msgEnvoi = "Pas envoyé : pas de connexion."; }
    await charger();
  }

  /* ---------- Onglet Cahier de cotes (sur cette tablette uniquement) ---------- */
  const TRAVAIL = [["bien", "Travaille bien", "vert"], ["moyen", "Moyen", "orange"], ["peu", "Travaille peu", "rouge"]];
  function cahierDe(tab) { const c = A.S.cahier = A.S.cahier || {}; return c[tab] = c[tab] || {}; }
  function proposition(e) {
    const g = (e.bilan && e.bilan.global) || null;
    if (!g || !g.n) return null;
    const maitrise = g.crit ? g.critOk / g.crit : 0;
    return Math.round(20 * (0.5 * g.f / g.n + 0.5 * maitrise) * 2) / 2; // au demi-point
  }
  function cahier(l) {
    const tousTests = [];
    l.forEach(e => Object.entries((e.bilan || {}).tests || {}).forEach(([id, t]) => { if (!tousTests.find(x => x.id === id)) tousTests.push({ id, titre: t.titre }); }));
    return `<div class="cahier bloc">
      <p class="petit">Le cahier de cotes reste sur cette tablette (il est dans la sauvegarde). « Proposition » = moitié avancement, moitié critères maîtrisés, sur 20 : c'est une aide, la cote finale est la tienne.</p>
      <div class="defile"><table class="tableau-prof tableau-cahier">
        <thead><tr><th>Élève</th><th>Avancement</th><th>Critères</th>${tousTests.map(t => `<th class="petit">${esc(t.titre)}</th>`).join("")}<th>Travail en classe</th><th>Proposition /20</th><th>Cote /20</th><th>Remarque</th></tr></thead>
        <tbody>${l.map(e => {
          const g = (e.bilan && e.bilan.global) || { pct: 0, critOk: 0, crit: 0 };
          const c = cahierDe(e.tablette);
          const p = proposition(e);
          return `<tr>
            <th>${esc(e.prenom)} <span class="petit">(${esc(e.tablette)})</span></th>
            <td>${g.pct} %</td><td>${g.critOk}/${g.crit}</td>
            ${tousTests.map(t => { const x = ((e.bilan || {}).tests || {})[t.id]; return `<td>${x ? `${x.meilleurNb}/${x.total}` : "–"}</td>`; }).join("")}
            <td><div class="mini-feux">${TRAVAIL.map(([k, n, coul]) => `<button class="mini-feu ${coul}" data-sv-travail="${esc(e.tablette)}:${k}" aria-pressed="${c.travail === k}" aria-label="${n}" title="${n}">${coul === "vert" ? ic("ok") : coul === "rouge" ? ic("x") : "~"}</button>`).join("")}</div></td>
            <td>${p == null ? "–" : String(p).replace(".", ",")}</td>
            <td><input class="saisie-cote" inputmode="decimal" data-sv-cote="${esc(e.tablette)}" value="${esc(c.cote || "")}" aria-label="Cote de ${esc(e.prenom)}"></td>
            <td><input class="saisie-remarque" data-sv-remarque="${esc(e.tablette)}" value="${esc(c.remarque || "")}" aria-label="Remarque pour ${esc(e.prenom)}"></td>
          </tr>`;
        }).join("")}</tbody>
      </table></div>
      <div class="ligne-boutons" style="margin-top:16px"><button class="btn btn-secondaire" data-sv-copier>${ic("ok")} Copier le tableau (pour Excel)</button><span class="petit" id="sv-copie"></span></div>
    </div>`;
  }
  function tableauTexte() {
    const l = eleves();
    const tests = [];
    l.forEach(e => Object.entries((e.bilan || {}).tests || {}).forEach(([id, t]) => { if (!tests.find(x => x.id === id)) tests.push({ id, titre: t.titre }); }));
    const lignes = [["Élève", "Tablette", "Avancement %", "Critères maîtrisés", ...tests.map(t => t.titre), "Travail en classe", "Proposition /20", "Cote /20", "Remarque"]];
    l.forEach(e => {
      const g = (e.bilan && e.bilan.global) || { pct: 0, critOk: 0, crit: 0 };
      const c = cahierDe(e.tablette); const p = proposition(e);
      lignes.push([e.prenom, e.tablette, g.pct, `${g.critOk}/${g.crit}`, ...tests.map(t => { const x = ((e.bilan || {}).tests || {})[t.id]; return x ? `${x.meilleurNb}/${x.total}` : ""; }),
        (TRAVAIL.find(t => t[0] === c.travail) || ["", ""])[1], p == null ? "" : String(p).replace(".", ","), c.cote || "", c.remarque || ""]);
    });
    return lignes.map(r => r.map(x => String(x).replace(/[\t\n]/g, " ")).join("\t")).join("\n");
  }

  /* ---------- Démo ---------- */
  function donneesDemo() {
    const maintenant = Date.now();
    const mk = (tab, prenom, pctH, pctE, crit, vuMin, fb) => {
      const fH = Math.round(pctH * 4 / 100), fE = Math.round(pctE * 5 / 100);
      return { tablette: tab, prenom, langue: "uk", vu: maintenant - vuMin * 60000, feedbacks: fb || [],
        bilan: { global: { f: fH + fE, n: 9, pct: Math.round((fH + fE) / 9 * 100), crit: 4, critOk: crit },
          disciplines: { histoire: { pct: pctH, f: fH, n: 4, crit: 2, critOk: Math.min(2, crit) }, eco: { pct: pctE, f: fE, n: 5, crit: 2, critOk: Math.max(0, crit - 2) } },
          tests: pctE > 50 ? { "test-euro": { titre: "Mini-test : les euros", meilleurNb: 3, total: 4, essais: 2 } } : {},
          enCours: { titre: pctH < 100 ? "Les dates et les siècles" : "Reconnaître et compter les euros", discipline: "histoire" },
          derniereActivite: maintenant - vuMin * 60000 } };
    };
    return { maintenant, eleves: [
      mk("1", "Élève A", 100, 100, 4, 1), mk("2", "Élève B", 50, 20, 1, 2),
      mk("3", "Élève C", 0, 0, 0, 4000, [{ id: "d1", texte: { fr: "Je te vois peu travailler. On en parle ensemble ?" }, type: "attention", date: maintenant - 86400000, lu: null }]),
      mk("4", "Élève D", 75, 60, 2, 30), mk("5", "Élève E", 25, 80, 2, 90)
    ] };
  }

  /* ---------- Événements ---------- */
  document.addEventListener("click", ev => {
    const b = ev.target.closest("button"); if (!b) return;
    const d = b.dataset;
    if (d.fbLu) {
      const S = A.S;
      S.feedbacks = (S.feedbacks || []).filter(f => f.id !== d.fbLu);
      S.feedbacksLus = (S.feedbacksLus || []).concat(d.fbLu);
      S.feedbacksVus = (S.feedbacksVus || []).concat(d.fbLu).slice(-50);
      A.sauver(); A.rendre(); return envoyer(true);
    }
    if (A.route() !== "suivi") return;
    if (d.svActualiser !== undefined) { etat = "chargement"; A.rendre(); return charger(); }
    if (d.svDemo !== undefined) { demo = true; return charger(); }
    if (d.svDemoFin !== undefined) { demo = false; donnees = null; etat = ""; return A.rendre(); }
    if (d.svOnglet) { onglet = d.svOnglet; return A.rendre(); }
    if (d.svPanneau !== undefined) { panneau = d.svPanneau || null; msgEnvoi = ""; return A.rendre(); }
    if (d.svModele !== undefined) { const m = MODELES[+d.svModele]; return envoyerFeedback(d.tab, m.t, m.type); }
    if (d.svLibre !== undefined) {
      const t = ($("#sv-libre").value || "").trim(); texteLibre = t;
      if (!t) { msgEnvoi = "Écris d'abord ton message."; return A.rendre(); }
      return envoyerFeedback(d.svLibre, { fr: t }, typeLibre);
    }
    if (d.svSuppr) {
      if (demo) { const e = donnees.eleves.find(x => x.tablette === d.tab); e.feedbacks = e.feedbacks.filter(f => f.id !== d.svSuppr); return A.rendre(); }
      return fetch(base() + "/prof/supprimer-feedback" + qs(true), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tablette: d.tab, id: d.svSuppr }) }).then(charger, charger);
    }
    if (d.svOublier) {
      if (confirmerOubli !== d.svOublier) { confirmerOubli = d.svOublier; return A.rendre(); }
      confirmerOubli = null; panneau = null;
      if (demo) { donnees.eleves = donnees.eleves.filter(x => x.tablette !== d.svOublier); return A.rendre(); }
      return fetch(base() + "/prof/oublier" + qs(true), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tablette: d.svOublier }) }).then(charger, charger);
    }
    if (d.svTravail) { const [tab, k] = d.svTravail.split(":"); const c = cahierDe(tab); c.travail = c.travail === k ? null : k; c.maj = Date.now(); A.sauver(); return A.rendre(); }
    if (d.svCopier !== undefined) {
      const txt = tableauTexte(); const msg = $("#sv-copie");
      Promise.resolve().then(() => navigator.clipboard.writeText(txt)).then(() => { if (msg) msg.textContent = "Copié. Colle-le dans Excel ou Numbers."; }, () => { if (msg) msg.textContent = "Copie impossible ici."; });
    }
  });
  document.addEventListener("input", ev => {
    if (A.route() !== "suivi") return;
    const d = ev.target.dataset;
    if (d.svCote !== undefined) { cahierDe(d.svCote).cote = ev.target.value.slice(0, 6); A.sauver(); }
    if (d.svRemarque !== undefined) { cahierDe(d.svRemarque).remarque = ev.target.value.slice(0, 200); A.sauver(); }
    if (ev.target.id === "sv-libre") texteLibre = ev.target.value;
  });
  document.addEventListener("change", ev => {
    if (A.route() !== "suivi") return;
    if (ev.target.matches("[data-sv-tri]")) { tri = ev.target.value; A.rendre(); }
    if (ev.target.matches("[data-sv-type-libre]")) typeLibre = ev.target.value;
  });
  document.addEventListener("submit", ev => {
    if (ev.target.id !== "form-sv-code") return;
    ev.preventDefault();
    if ($("#sv-code").value === A.S.codeProf) { ouvert = true; try { sessionStorage.setItem("daspa-suivi-ok", "1"); } catch (e) {} etat = ""; return A.rendre(); }
    $("#sv-code-msg").textContent = "Code incorrect.";
  });

  window.SUIVI = { ecran, blocAccueil, envoyer };
})();
