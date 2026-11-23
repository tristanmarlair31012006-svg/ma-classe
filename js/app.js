/* App DASPA – logique. Tout reste sur l'iPad (localStorage). Aucun envoi vers un serveur. */
(function () {
  "use strict";
  const D = window.DATA;
  const CLE = "daspa-v1";
  const CODE_PROF_DEFAUT = "2468";

  /* ---------- Stockage local ---------- */
  function charger() {
    try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { return {}; }
  }
  let S = Object.assign({ profil: null, codeProf: CODE_PROF_DEFAUT, journal: {}, progres: {}, dico: [], reponses: {}, trad: true, signal: null }, charger());
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(S)); } catch (e) { /* stockage indisponible : l'app continue */ } }
  let deverrouille = false;
  try { deverrouille = sessionStorage.getItem(CLE + "-ok") === "1"; } catch (e) {}
  function setDeverrouille(v) { deverrouille = v; try { sessionStorage.setItem(CLE + "-ok", v ? "1" : "0"); } catch (e) {} }

  /* ---------- Outils ---------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const langue = () => (S.profil && S.profil.langue) || "fr";
  const genreIdx = () => (S.profil && S.profil.genre === "f") ? 1 : 0;
  function choisirGenre(txt) {
    if (txt == null) return null;
    const p = String(txt).split("|");
    return p.length > 1 ? p[genreIdx()] : p[0];
  }
  const fr = o => choisirGenre(o && o.fr) || "";
  function tr(o) {
    const l = langue();
    if (l === "fr" || !o) return null;
    return choisirGenre(o[l]);
  }
  // Mise en forme du verbe en MAJUSCULES : on met en gras les mots tout en capitales.
  const grasVerbes = s => esc(s).replace(/(^|[^A-Za-zÀ-ÿА-яІіЇїЄєҐґĄąĆćĘęŁłŃńŚśŹźŻżÑñ])([A-ZÀ-ÖØ-ÞА-ЯІЇЄҐĄĆĘŁŃÓŚŹŻÑ]{3,})(?=$|[^A-Za-zÀ-ÿА-яІіЇїЄєҐґĄąĆćĘęŁłŃńŚśŹźŻżÑñ])/g, "$1<b>$2</b>");
  function ligneTrad(o, opts) {
    const l = langue();
    if (l === "fr") return "";
    const t = tr(o);
    if (t) return `<span class="trad" lang="${l}">${opts && opts.gras ? grasVerbes(t) : esc(t)}</span>`;
    return ""; // traduction pas encore relue : on n'affiche rien plutôt qu'un texte incertain
  }
  function texte(o, opts) { return `${opts && opts.gras ? grasVerbes(fr(o)) : esc(fr(o))}${ligneTrad(o, opts)}`; }

  const ICONES = {
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    book: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',
    palette: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
    mots: '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',
    son: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
    ampoule: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    main: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    question: '<circle cx="12" cy="12" r="10"/><path d="M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"/><path d="M12 17h.01"/>',
    fini: '<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>',
    gauche: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    droite: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    langues: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    etoile: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    ok: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    verrou: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    effacer: '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    smile: '<path d="M15 10V9"/><path d="M16.472 15a6 6 0 01-8.943 0"/><path d="M9 10V9"/><circle cx="12" cy="12" r="10"/>',
    meh: '<path d="M15 10V9"/><path d="M8 16h8"/><path d="M9 10V9"/><circle cx="12" cy="12" r="10"/>',
    frown: '<path d="M15 10V9"/><path d="M9 10V9"/><path d="M9 16a5 5 0 016 0"/><circle cx="12" cy="12" r="10"/>',
    angry: '<path d="M15 12v-1.584"/><path d="M17 10a5 5 0 00-3 1"/><path d="M7 10a5 5 0 013 1"/><path d="M9 12v-1.584"/><path d="M9 17a5 5 0 016.001 0"/><circle cx="12" cy="12" r="10"/>',
    batterie: '<path d="M22 14v-4"/><path d="M6 14v-4"/><rect x="2" y="6" width="16" height="12" rx="2"/>',
    ballon: '<path d="M11 7a16 16 20 0 1 10.98 4.362"/><path d="M12 12a13 13 0 0 1-8.66 5"/><path d="M16.83 13.634a16 16 0 0 1-9.267 7.328"/><path d="M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10"/><path d="M8.17 15.366a16 16 0 0 1-1.713-11.69"/><circle cx="12" cy="12" r="10"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
    musique: '<path d="M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"/><circle cx="18" cy="16" r="3"/><circle cx="6" cy="19" r="3"/>',
    manette: '<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',
    caddie: '<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',
    lit: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
    envoyer: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
    wifiOff: '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',
    poubelle: '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    pause: '<rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/>',
    play: '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>',
    alerte: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    discuter: '<path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/>',
    dico: '<path d="M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2"/><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20"/>'
  };
  const ic = (n, cls) => `<svg class="i ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${ICONES[n]}</svg>`;

  /* Pictos ARASAAC : d'abord le dossier local pictos/, puis le site ARASAAC, sinon le mot. */
  function picto(id, label, taille) {
    const cls = "picto " + (taille || "");
    if (!id) return `<span class="${cls} manque"><span>${esc(label)}</span></span>`;
    return `<span class="${cls}"><img alt="${esc(label)}" src="pictos/${id}.png" data-id="${id}" data-label="${esc(label)}" loading="lazy"></span>`;
  }
  document.addEventListener("error", e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.id) return;
    if (!img.dataset.essai) {
      img.dataset.essai = "1";
      img.src = `https://static.arasaac.org/pictograms/${img.dataset.id}/${img.dataset.id}_300.png`;
    } else {
      const span = img.parentElement;
      span.classList.add("manque");
      span.innerHTML = `<span>${esc(img.dataset.label)}</span>`;
    }
  }, true);

  /* Dessins d'argent (formes génériques, pas de reproduction des vrais billets) */
  function argent(valeur, bouton, attrs) {
    const estBillet = /^(5|10|20|50|100|200) €$/.test(valeur);
    const cls = estBillet ? `billet v${parseInt(valeur, 10)}` : ("piece " + (valeur === "50 c" ? "cuivre" : valeur === "2 €" ? "bi" : ""));
    const tag = bouton ? "button" : "span";
    return `<${tag} class="argent ${cls}" ${attrs || ""}>${esc(valeur)}</${tag}>`;
  }

  /* ---------- Voix ---------- */
  function parler(txt, lg) {
    try {
      if (!("speechSynthesis" in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt.replace(/\|.*/, ""));
      u.lang = D.langues[lg].voix || "fr-FR";
      u.rate = 0.85;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function boutonsSon(o) {
    const l = langue();
    let h = `<button class="rond" data-dire="${esc(fr(o))}" data-lg="fr" aria-label="Écouter en français">${ic("son")}</button>`;
    if (l !== "fr") {
      const t = tr(o);
      const voix = D.langues[l].voix;
      h += `<button class="rond" data-dire="${esc(t || "")}" data-lg="${l}" ${t && voix ? "" : "disabled"} aria-label="Écouter en ${esc(D.langues[l].nom)}" title="${voix ? "" : "Audio à enregistrer"}"><span style="font:700 13px/1 var(--font-fr)">${D.langues[l].code}</span></button>`;
    }
    return h;
  }

  /* ---------- Routeur (#ecran) ---------- */
  const app = $("#app");
  function route() { return (location.hash || "#accueil").slice(1); }
  function aller(h) { if (location.hash === "#" + h) rendre(); else location.hash = h; }
  window.addEventListener("hashchange", rendre);

  function cadre(contenu, espace, actif) {
    document.body.classList.toggle("sans-trad", !S.trad);
    const l = langue();
    const p = S.profil;
    const nav = [["accueil", "house", "accueil", ""], ["lecons", "book", "lecons", "eco"], ["atelier", "palette", "atelier", "atelier"], ["discuter", "discuter", "discuter", "social"], ["mots", "mots", "mots", "mots"]];
    const sig = S.signal ? banniereSignal() : "";
    app.innerHTML = `
      ${sig}
      <header class="haut">
        <span class="qui">${p ? `<b>${esc(p.prenom)}</b> · tablette N°${esc(p.tablette)}` : "Mode découverte"}</span>
        ${l !== "fr" ? `<button class="langue" id="bascule-trad" aria-pressed="${S.trad}" aria-label="Afficher ou masquer la traduction">${ic("langues")}<span class="code">FR</span><span class="code trad-code">${D.langues[l].code}</span></button>` : ""}
      </header>
      <main data-espace="${espace || ""}">${contenu}</main>
      <nav class="nav">${nav.map(([h, i, k, e]) => `<a href="#${h}" data-espace="${e}" ${actif === h ? 'aria-current="page"' : ""}>${ic(i)}<span>${esc(fr(D.ui[k]))}</span>${l !== "fr" && tr(D.ui[k]) ? `<span class="trad" lang="${l}">${esc(tr(D.ui[k]))}</span>` : ""}</a>`).join("")}</nav>
      <button class="coin-prof" id="ouvrir-prof">Prof</button>`;
  }

  function banniereSignal() {
    const k = S.signal;
    const ico = { bloque: "main", question: "question", fini: "fini" }[k];
    return `<div class="banniere-signal ${k}" role="status">${ic(ico)}<div>${esc(fr(D.ui[k]))}<span class="petit trad">${esc(fr(D.ui.signalActif))}</span></div><button class="btn btn-secondaire" data-signal="${k}">${ic("x")}</button></div>`;
  }

  /* ---------- Écrans ---------- */
  function rendre() {
    speechSynthesisCancel();
    const r = route();
    if (r === "prof") return ecranProf(); // le prof peut toujours entrer (élève qui a oublié son code…)
    if (!S.profil) return ecranSansProfil();
    if (!deverrouille) return ecranCode();
    if (window.LECONS && window.LECONS.gere(r)) return window.LECONS.ecran(r);
    if (r === "lecons") return ecranLecons();
    if ((r.startsWith("act-") || (r.startsWith("atelier-"))) && (!S.dernier || S.dernier.r !== r)) { S.dernier = { r, t: Date.now() }; sauver(); }
    if (r === "groupes" && window.GROUPES) return window.GROUPES.ecran();
    if (r === "suivi" && window.SUIVI) return window.SUIVI.ecran();
    if (r === "atelier" || r.startsWith("atelier-")) return window.ATELIER ? window.ATELIER.ecran(r) : ecranAtelier();
    if (r === "mots") return ecranMots();
    if (r === "discuter") return ecranDiscuter();
    if (r.startsWith("act-")) return ecranActivite(r.slice(4));
    return ecranAccueil();
  }
  function speechSynthesisCancel() { try { speechSynthesis.cancel(); } catch (e) {} }

  function ecranSansProfil() {
    if (route() === "prof") return ecranProf();
    app.innerHTML = `<main><div class="ecran-centre"><div class="carte">
      <span class="pastille-tablette">Nouvelle tablette</span>
      <h1>Bonjour !</h1>
      <p class="bloc">Cette tablette n'a pas encore de profil.<br>DEMANDE à ton prof.</p>
      <div class="ligne-boutons">
        <button class="btn btn-secondaire" id="ouvrir-prof">${ic("verrou")} Mode prof</button>
      </div>
      <p class="petit bloc">Pour essayer : mode prof → « Profil de démonstration ».</p>
    </div></div></main>`;
  }

  let codeSaisi = "";
  function ecranCode(msgErreur) {
    const p = S.profil;
    const l = langue();
    app.innerHTML = `<main><div class="ecran-centre"><div class="carte">
      <span class="pastille-tablette">Tablette N°${esc(p.tablette)}</span>
      <h1>${esc(fr(D.ui.bonjour))} ${esc(p.prenom)} !${l !== "fr" && tr(D.ui.bonjour) ? `<span class="trad" lang="${l}">${esc(tr(D.ui.bonjour))} ${esc(p.prenom)}!</span>` : ""}</h1>
      <p class="consigne-texte bloc">${texte(D.ui.tapeCode, { gras: true })}</p>
      <div class="points" aria-label="${codeSaisi.length} chiffres sur 4">${[0, 1, 2, 3].map(i => `<span class="${i < codeSaisi.length ? "plein" : ""}"></span>`).join("")}</div>
      <div class="pave">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button data-chiffre="${n}">${n}</button>`).join("")}<span></span><button data-chiffre="0">0</button><button data-effacer aria-label="Effacer">${ic("effacer")}</button></div>
      <p class="message-erreur" role="alert">${msgErreur ? ic("x") + texte(D.ui.mauvaisCode) : ""}</p>
    </div></div></main><button class="coin-prof" id="ouvrir-prof">Prof</button>`;
  }
  function saisirChiffre(c) {
    codeSaisi = (codeSaisi + c).slice(0, 4);
    if (codeSaisi.length < 4) return ecranCode();
    if (codeSaisi === S.profil.code) { codeSaisi = ""; setDeverrouille(true); rendre(); }
    else { codeSaisi = ""; ecranCode(true); }
  }

  const aujourdhui = () => new Date().toISOString().slice(0, 10);

  function ecranAccueil() {
    const l = langue();
    const j = S.journal[aujourdhui()] || {};
    const hierChoisi = D.hier.find(h => h.id === j.hier);
    const nbFinies = D.activites.filter(a => S.progres[a.id] && S.progres[a.id].fini).length;
    cadre(`
      <div class="accueil-tete">
        <h1>${esc(fr(D.ui.bonjour))} ${esc(S.profil.prenom)} !${l !== "fr" && tr(D.ui.bonjour) ? `<span class="trad" lang="${l}">${esc(tr(D.ui.bonjour))} ${esc(S.profil.prenom)}!</span>` : ""}</h1>
      </div>

      ${window.SUIVI ? window.SUIVI.blocAccueil() : ""}

      ${window.ACCUEIL ? window.ACCUEIL.page() : ""}

      ${window.LECONS ? window.LECONS.blocAccueil() : `<section class="bloc" data-espace="eco">
        <h2>${esc(fr(D.ui.continuer))}${ligneTrad(D.ui.continuer)}</h2>
        <div class="tuiles">${D.activites.map(a => tuileActivite(a)).join("")}</div>
      </section>`}

`, "", "accueil");
    if (window.ACCUEIL) window.ACCUEIL.brancher();
  }

  function tuileActivite(a) {
    const d = D.disciplines.find(x => x.id === a.discipline);
    const pr = S.progres[a.id] || {};
    const pct = pr.fini ? 100 : Math.round(((pr.etape || 0) / a.etapes.length) * 100);
    return `<a class="tuile" href="#act-${a.id}" data-espace="${a.discipline}">
      <span class="bande"></span>${picto(a.picto, fr(a.titre))}
      <span style="flex:1"><span class="etiquette">${esc(fr(d.t))}</span>
        <h2 style="margin-top:8px">${esc(fr(a.titre))}${ligneTrad(a.titre)}</h2>
        <span class="barre" style="display:block"><i style="width:${pct}%"></i></span>
      </span>${ic("droite")}</a>`;
  }

  function ecranLecons() {
    cadre(`<h1 style="margin-top:8px">${esc(fr(D.ui.lecons))}${ligneTrad(D.ui.lecons)}</h1>
      <div class="tuiles bloc">${D.disciplines.map(d => {
        const acts = D.activites.filter(a => a.discipline === d.id);
        if (!acts.length) return `<div class="tuile vide" data-espace="${d.id}"><span class="bande"></span><span><h2>${esc(fr(d.t))}${ligneTrad(d.t)}</h2><p class="petit">${esc(fr(d.but))}</p><span class="etiquette" style="margin-top:8px">${esc(fr(D.ui.bientot))}</span></span></div>`;
        return `<a class="tuile" href="#act-${acts[0].id}" data-espace="${d.id}"><span class="bande"></span><span style="flex:1"><h2>${esc(fr(d.t))}${ligneTrad(d.t)}</h2><p class="petit">${esc(fr(d.but))}</p><span class="etiquette" style="margin-top:8px">${acts.length} activité</span></span>${ic("droite")}</a>`;
      }).join("")}</div>`, "eco", "lecons");
  }

  function ecranAtelier() {
    cadre(`<h1 style="margin-top:8px">${esc(fr(D.ui.atelier))}${ligneTrad(D.ui.atelier)}</h1>
      <div class="choix-grille bloc">${D.atelierOutils.map(o => `<div class="choix" style="justify-content:center">${ic("palette")}<span>${esc(fr(o.t))}${ligneTrad(o.t)}</span><span class="etiquette">${esc(fr(D.ui.bientot))}</span></div>`).join("")}</div>`, "atelier", "atelier");
  }

  /* ---------- Mes mots ---------- */
  let ongletMots = "argent";
  function carteMot(m) {
    const dans = S.dico.includes(m.id);
    const visuel = m.dessin === "billet" ? `<span class="picto petit-p">${argent("10 €").replace('class="argent ', 'class="argent mini ')}</span>` : picto(m.picto, fr(m.t), "petit-p");
    return `<div class="mot">
      <div class="ligne">${visuel}<div><div class="fr">${esc(fr(m.t))}</div>${ligneTrad(m.t)}</div></div>
      <div class="pied">${boutonsSon(m.t)}<button class="ajout" data-dico="${m.id}" aria-pressed="${dans}">${dans ? ic("ok") + esc(fr(D.ui.monDico)) : ic("plus") + esc(fr(D.ui.monDico))}<span class="sr">${esc(fr(dans ? D.ui.dansDico : D.ui.ajouterDico))}</span></button></div>
    </div>`;
  }
  function ecranMots() {
    const jour = Math.floor(Date.now() / 86400000);
    const mj = D.mots[jour % D.mots.length];
    const onglets = [...D.motsCategories.map(c => [c.id, c.t]), ["dico", D.ui.monDico]];
    const liste = ongletMots === "dico" ? D.mots.filter(m => S.dico.includes(m.id)) : D.mots.filter(m => m.cat === ongletMots);
    const visuelJour = mj.dessin === "billet" ? `<span class="picto grand-p">${argent("10 €")}</span>` : picto(mj.picto, fr(mj.t), "grand-p");
    cadre(`
      <section class="bloc carte" style="margin-top:8px">
        <span class="etiquette">${ic("etoile")} ${esc(fr(D.ui.motDuJour))}</span>
        <div class="mot-jour" style="margin-top:16px">${visuelJour}
          <div><div class="fr">${esc(fr(mj.t))}</div>${ligneTrad(mj.t)}
            <div class="outils">${boutonsSon(mj.t)}<button class="btn btn-secondaire" data-dico="${mj.id}">${S.dico.includes(mj.id) ? ic("ok") + esc(fr(D.ui.dansDico)) : ic("plus") + esc(fr(D.ui.ajouterDico))}</button></div>
          </div>
        </div>
      </section>
      <section class="bloc">
        <div class="onglets" role="tablist">${onglets.map(([id, t]) => `<button class="onglet" role="tab" data-onglet="${id}" aria-selected="${ongletMots === id}">${esc(fr(t))}</button>`).join("")}</div>
        ${liste.length ? `<div class="imagier">${liste.map(carteMot).join("")}</div>` : `<p class="carte-plate">${texte(D.ui.dicoVide)}</p>`}
      </section>`, "mots", "mots");
  }

  /* ---------- Activité ---------- */
  let A = null; // état de l'étape en cours
  function ecranActivite(id) {
    const act = D.activites.find(a => a.id === id);
    if (!act) return aller("accueil");
    const pr = S.progres[id] = S.progres[id] || { etape: 0, fini: false };
    if (!A || A.id !== id || A.etape !== pr.etape) A = { id, etape: pr.etape, aides: 0, choix: null, resultat: null, place: {}, selection: null };
    const fin = pr.etape >= act.etapes.length;
    const pastilles = act.etapes.map((_, i) => `<i class="${i < pr.etape ? "fait" : i === pr.etape ? "actuel" : ""}"></i>`).join("");
    const tete = `<div class="bandeau">
        <a class="rond retour" href="#${retourActivite(id) || "accueil"}" aria-label="Retour">${ic("gauche")}</a>
        <div><h1>${esc(fr(act.titre))}</h1>${ligneTrad(act.titre)}</div>
        <div class="etapes" aria-label="${fin ? "Terminé" : `Étape ${pr.etape + 1} sur ${act.etapes.length}`}">${pastilles}</div>
      </div>`;
    if (fin) return cadre(tete + ecranFin(act), act.discipline, "lecons");
    const e = act.etapes[pr.etape];
    cadre(tete + `
      <div class="consigne">
        <span class="num">${pr.etape + 1}</span>
        ${picto(e.picto, e.verbe)}
        <div class="corps"><p class="consigne-texte">${texte(e.consigne, { gras: true })}</p>
          ${e.facultatif ? `<p class="petit facultatif">Tu peux aussi passer cette question.</p>` : ""}
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">${boutonsSon(e.consigne)}</div>
      </div>
      <div class="zone">${zoneEtape(e)}</div>
      ${retourEtape(e)}
      ${A.aides ? `<div class="aides">${e.aides.slice(0, A.aides).map((a, i) => `<div class="aide">${ic("ampoule")}<div><span class="n">${esc(fr(D.ui.coupDePouce))} ${i + 1}</span><p>${texte(a)}</p></div></div>`).join("")}</div>` : ""}
      <div class="actions">
        ${e.aides ? `<button class="btn btn-secondaire" data-aide ${A.aides >= e.aides.length ? "disabled" : ""}>${ic("ampoule")} ${esc(fr(D.ui.coupDePouce))} ${Math.min(A.aides + 1, e.aides.length)}/${e.aides.length}</button>` : ""}
        <div class="signaux">${["bloque", "question", "fini"].map(k => `<button class="rond signal" data-signal="${k}" aria-pressed="${S.signal === k}">${ic({ bloque: "main", question: "question", fini: "fini" }[k])}<span class="lbl">${{ bloque: "Bloqué", question: "Question", fini: "Fini" }[k]}</span><span class="sr">${esc(fr(D.ui[k]))}</span></button>`).join("")}</div>
        <div class="droite">${boutonAvancer(e)}</div>
      </div>`, act.discipline, "lecons");
    if (e.type === "ecrire") { const ta = $("#ecrit"); if (ta) ta.value = S.reponses[act.id + "-ecrit"] || ""; }
  }

  function zoneEtape(e) {
    if (e.type === "choix" || e.type === "partage") {
      return `<div class="options">${e.options.map(o => {
        let etat = "";
        if (A.resultat && e.type === "choix" && A.choix === o.id) etat = o.correct ? "juste" : "faux";
        return `<button class="option ${etat}" data-option="${o.id}" aria-pressed="${A.choix === o.id}"><span class="symb">${esc(o.symbole)}</span><span>${esc(o.label)}${o.pays ? `<small>${esc(o.pays)}</small>` : ""}</span></button>`;
      }).join("")}</div>`;
    }
    if (e.type === "classer") {
      const restants = e.elements.filter(x => !A.place[x.id]);
      return `<div class="classer">
        <div class="stock" aria-label="Argent à classer">${restants.map(x => argent(x.valeur, true, `data-element="${x.id}" aria-pressed="${A.selection === x.id}"`)).join("") || `<span class="petit">${ic("ok")}</span>`}</div>
        <div class="bacs">${e.bacs.map(b => `<button class="bac ${A.selection ? "cible" : ""}" data-bac="${b.id}">
          <span class="titre-bac">${esc(fr(b.label))}</span>${ligneTrad(b.label)}
          <span class="contenu">${e.elements.filter(x => A.place[x.id] === b.id).map(x => {
            const etat = A.resultat ? (x.bac === b.id ? "bien" : "mal") : "";
            return argent(x.valeur, false, "").replace('class="argent ', `class="argent ${etat} `);
          }).join("")}</span>
        </button>`).join("")}</div>
      </div>`;
    }
    if (e.type === "nombre") {
      return `<div class="carte-plate"><div class="visuel">${e.visuel.map((v, i) => (i ? '<span class="plus">+</span>' : "") + argent(v)).join("")}</div>
        <div class="saisie-nombre"><span>=</span><input id="nombre" inputmode="numeric" pattern="[0-9]*" aria-label="Ta réponse" value="${A.choix != null ? esc(A.choix) : ""}"><span>${esc(e.unite)}</span></div></div>`;
    }
    if (e.type === "ecrire") {
      return `<div class="amorces">${e.amorces.map(a => `<button class="amorce" data-amorce="${esc(a)}">${esc(a)}…</button>`).join("")}</div>
        <textarea class="ecrit" id="ecrit" aria-label="Ta phrase" placeholder="Avec 9 €, j'achète…"></textarea>
        <p class="petit" style="margin-top:8px">${texte(e.astuce)}</p>`;
    }
    if (e.type === "auto") {
      const v = A.choix;
      return `<div class="feux">
        <button class="feu vert" data-feu="vert" aria-pressed="${v === "vert"}"><span class="lampe">${ic("ok")}</span>${texte(D.ui.jeSais)}</button>
        <button class="feu orange" data-feu="orange" aria-pressed="${v === "orange"}"><span class="lampe">~</span>${texte(D.ui.presque)}</button>
        <button class="feu rouge" data-feu="rouge" aria-pressed="${v === "rouge"}"><span class="lampe">${ic("x")}</span>${texte(D.ui.pasEncore)}</button>
      </div>`;
    }
    return "";
  }

  function retourEtape(e) {
    if (!A.resultat) return "";
    if (A.resultat === "merci") return `<div class="retour-msg ok">${ic("ok")}<p>${texte(e.merci)}</p></div>`;
    const ok = A.resultat === "ok";
    return `<div class="retour-msg ${ok ? "ok" : "ko"}" role="status">${ic(ok ? "ok" : "x")}<p><span class="etat">${ok ? "Réussi" : "À revoir"}.</span> ${texte(ok ? e.bravo : e.erreur)}</p></div>`;
  }

  function boutonAvancer(e) {
    const verifiable = ["choix", "classer", "nombre"].includes(e.type);
    if (e.facultatif && !A.resultat) return `<button class="btn-discret" data-passer>${esc(fr(D.ui.passer))}</button><button class="btn btn-principal" data-valider ${A.choix ? "" : "disabled"}>${esc(fr(D.ui.suivant))} ${ic("droite")}</button>`;
    if (verifiable && A.resultat !== "ok") {
      const pret = e.type === "classer" ? Object.keys(A.place).length === e.elements.length : A.choix != null && A.choix !== "";
      return `<button class="btn btn-principal" data-verifier ${pret ? "" : "disabled"}>${esc(A.resultat === "ko" ? fr(D.ui.reessaie) : fr(D.ui.verifier))}</button>`;
    }
    if (e.type === "auto") return `<button class="btn btn-principal" data-suivant ${A.choix ? "" : "disabled"}>${esc(fr(D.ui.suivant))} ${ic("droite")}</button>`;
    return `<button class="btn btn-principal" data-suivant>${esc(fr(D.ui.suivant))} ${ic("droite")}</button>`;
  }

  function verifier() {
    const act = D.activites.find(a => a.id === A.id);
    const e = act.etapes[A.etape];
    if (A.resultat === "ko") { // « Essaie encore » : on remet à zéro la réponse
      A.resultat = null;
      if (e.type === "classer") { A.place = {}; A.selection = null; }
      if (e.type === "choix") A.choix = null;
      return rendre();
    }
    let juste = false;
    if (e.type === "choix") juste = !!(e.options.find(o => o.id === A.choix) || {}).correct;
    if (e.type === "classer") juste = e.elements.every(x => A.place[x.id] === x.bac);
    if (e.type === "nombre") juste = parseInt(A.choix, 10) === e.reponse;
    A.resultat = juste ? "ok" : "ko";
    S.reponses[`${act.id}-${A.etape}-essais`] = (S.reponses[`${act.id}-${A.etape}-essais`] || 0) + 1;
    sauver();
    rendre();
  }

  function etapeSuivante() {
    const act = D.activites.find(a => a.id === A.id);
    const e = act.etapes[A.etape];
    if (e.type === "auto") S.reponses[act.id + "-auto"] = A.choix;
    if (e.type === "ecrire") { const ta = $("#ecrit"); if (ta) S.reponses[act.id + "-ecrit"] = ta.value; }
    if (e.type === "partage" && A.choix) S.reponses[act.id + "-partage"] = A.choix;
    S.progres[act.id].etape = A.etape + 1;
    if (S.progres[act.id].etape >= act.etapes.length) {
      S.progres[act.id].fini = true;
      act.motsAppris.forEach(m => { if (!S.dico.includes(m)) S.dico.push(m); });
    }
    sauver();
    window.scrollTo(0, 0);
    rendre();
  }

  // Activité ouverte depuis une séquence : on y revient.
  function retourActivite(id) { const r = S.retour; return r && r.cible === "act-" + id ? r.r : null; }

  function ecranFin(act) {
    const mots = act.motsAppris.map(id => D.mots.find(m => m.id === id)).filter(Boolean);
    const ret = retourActivite(act.id);
    if (ret) return `<div class="carte fin bloc">
      <div class="etoile">${ic("ok")}</div>
      <h1>${texte(D.ui.bravo)}</h1>
      <p class="bloc consigne-texte">${texte(act.objectif)}</p>
      <h2 class="bloc">${texte(D.ui.motsAppris)}</h2>
      <div class="mots-gagnes">${mots.map(m => `<span class="badge">${ic("dico")} ${esc(fr(m.t))}</span>`).join("")}</div>
      <div class="ligne-boutons bloc"><a class="btn btn-principal" href="#${ret}">${ic("droite")} ${esc(fr(ret.startsWith("seq-") ? D.ui.retourSeq : D.ui.continuer))}</a></div>
      <p class="bloc"><button class="btn-discret" data-recommencer="${act.id}">Recommencer l'activité</button></p>
    </div>`;
    return `<div class="carte fin bloc">
      <div class="etoile">${ic("ok")}</div>
      <h1>${texte(D.ui.bravo)}</h1>
      ${S.reponses[act.id + "-auto"] ? `<p class="petit" style="margin-top:8px">${esc(fr(D.ui.tonAvis))} : ${esc(fr({ vert: D.ui.jeSais, orange: D.ui.presque, rouge: D.ui.pasEncore }[S.reponses[act.id + "-auto"]]))}</p>` : ""}
      <p class="bloc consigne-texte">${texte(act.objectif)}</p>
      <h2 class="bloc">${texte(D.ui.motsAppris)}</h2>
      <div class="mots-gagnes">${mots.map(m => `<span class="badge">${ic("dico")} ${esc(fr(m.t))}</span>`).join("")}</div>
      <div class="ligne-boutons bloc">
        <a class="btn btn-secondaire" href="#mots">${ic("mots")} ${esc(fr(D.ui.mots))}</a>
        <a class="btn btn-principal" href="#accueil">${ic("house")} ${esc(fr(D.ui.accueil))}</a>
      </div>
      <p class="bloc"><button class="btn-discret" data-recommencer="${act.id}">Recommencer l'activité</button></p>
    </div>`;
  }

  /* ---------- Discussion de la classe (serveur WebSocket + traduction) ---------- */
  const GROUPES = ["classe", "g1", "g2", "g3", "g4", "g5", "g6"];
  const C = { etat: "deconnecte", messages: [], presence: [], pause: false, prof: false, groupe: S.groupe || "classe", ws: null, relance: null, brouillon: "" };
  const nomGroupe = g => g === "classe" ? fr(D.ui.toutLaClasse) : `${fr(D.ui.groupe)} ${g.slice(1)}`;
  const reglages = () => S.discussion || {};
  const estConfigure = () => !!(reglages().serveur && reglages().codeClasse);

  function connecter() {
    if (!estConfigure() || !S.profil) { C.etat = "essai"; return; }
    if (C.ws && C.ws.readyState <= 1) return;
    const r = reglages();
    let u;
    try {
      u = new URL(r.serveur.replace(/\/+$/, "") + "/ws");
      u.protocol = u.protocol === "http:" ? "ws:" : "wss:";
    } catch (e) { C.etat = "erreur"; return majDiscussion(); }
    const p = S.profil;
    u.search = new URLSearchParams({ classe: r.codeClasse, prenom: p.prenom, tablette: p.tablette, langue: p.langue, groupe: C.groupe, cleprof: r.clePof || "" });
    C.etat = "connexion";
    try { C.ws = new WebSocket(u); } catch (e) { C.etat = "erreur"; return majDiscussion(); }
    C.ws.onopen = () => { C.etat = "ok"; majDiscussion(); };
    C.ws.onmessage = ev => {
      let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m.type === "bienvenue") {
        const changement = C.prof !== m.prof;
        C.messages = m.historique || []; C.pause = m.pause; C.prof = m.prof;
        if (changement && route() === "discuter" && deverrouille) { const ta = $("#saisie-chat"); if (ta) C.brouillon = ta.value; return rendre(); }
      }
      if (m.type === "message") C.messages.push(m);
      if (m.type === "presence") C.presence = m.liste;
      if (m.type === "supprime") C.messages = C.messages.filter(x => x.id !== m.id);
      if (m.type === "vide") C.messages = [];
      if (m.type === "pause") C.pause = m.valeur;
      if (m.type === "refus") C.dernierRefus = m.raison;
      majDiscussion();
    };
    C.ws.onclose = () => {
      C.etat = "hors-ligne"; C.ws = null; majDiscussion();
      clearTimeout(C.relance);
      C.relance = setTimeout(() => { if (route() === "discuter") connecter(); }, 4000);
    };
  }
  function deconnecter() { clearTimeout(C.relance); if (C.ws) { C.ws.onclose = null; try { C.ws.close(); } catch (e) {} } C.ws = null; C.etat = "deconnecte"; C.messages = []; }
  function envoyerWS(o) { if (C.ws && C.ws.readyState === 1) { C.ws.send(JSON.stringify(o)); return true; } return false; }

  const heure = t => new Date(t).toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" });

  function bulle(m) {
    const l = langue();
    const moi = m.tablette === S.profil.tablette && m.de === S.profil.prenom;
    const tr_ = m.traductions || {};
    const principal = tr_[l] || tr_[m.langue] || "";
    const traduit = m.langue !== l;
    const lgPrincipal = tr_[l] ? l : m.langue;
    const frLigne = l !== "fr" && tr_.fr && m.langue !== "fr" ? `<span class="trad" lang="fr"><b>${esc(fr(D.ui.enFrancais))} :</b> ${esc(tr_.fr)}</span>` : "";
    const fragile = traduit && (m.langue === "rn" || l === "rn");
    return `<li class="bulle ${moi ? "moi" : ""} ${m.prof ? "du-prof" : ""}">
      <div class="entete"><b>${esc(m.de)}</b><span class="code-lg">${D.langues[m.langue].code}</span>${C.prof && m.groupe !== "classe" ? `<span class="etiquette">${esc(nomGroupe(m.groupe))}</span>` : ""}<span class="petit">${heure(m.heure)}</span>
        ${C.prof ? `<button class="rond mini" data-supprimer="${m.id}" aria-label="Supprimer ce message">${ic("poubelle")}</button>` : ""}</div>
      <p class="texte-bulle" lang="${lgPrincipal}">${esc(principal)}</p>
      ${frLigne}
      ${m.erreurTraduction ? `<p class="petit">${ic("alerte")} Traduction indisponible pour ce message.</p>` : ""}
      ${traduit ? `<details><summary>${esc(fr(D.ui.original))} (${D.langues[m.langue].code})</summary><p lang="${m.langue}">${esc(tr_[m.langue] || "")}</p></details>` : ""}
      ${fragile ? `<p class="petit avert">${ic("alerte")} ${esc(fr(D.ui.tradAuto))}</p>` : ""}
      <div class="outils-bulle">
        <button class="rond mini" data-dire="${esc(principal)}" data-lg="${lgPrincipal}" ${D.langues[lgPrincipal].voix ? "" : "disabled"} aria-label="Écouter">${ic("son")}</button>
        ${tr_.fr && lgPrincipal !== "fr" ? `<button class="rond mini" data-dire="${esc(tr_.fr)}" data-lg="fr" aria-label="Écouter en français"><span style="font:700 12px/1 var(--font-fr)">FR</span></button>` : ""}
      </div>
    </li>`;
  }

  function etatHTML() {
    const e = C.etat;
    if (e === "essai") return `<span class="etat-chat attention">${ic("wifiOff")} Serveur pas encore branché : mode essai, rien n'est envoyé.</span>`;
    if (e === "ok") return `<span class="etat-chat ok">${ic("wifi")} En ligne</span>`;
    if (e === "connexion") return `<span class="etat-chat">${ic("wifi")} Connexion…</span>`;
    return `<span class="etat-chat erreur">${ic("wifiOff")} ${texte(D.ui.horsLigne)}</span>`;
  }

  function filHTML() {
    const liste = C.prof ? C.messages : C.messages.filter(m => m.groupe === C.groupe);
    if (!liste.length) return `<li class="petit vide-fil">${texte(D.ui.ecrisMessage, { gras: true })}</li>`;
    return liste.map(bulle).join("");
  }

  function presenceHTML() {
    const ici = C.presence.filter(p => C.prof || p.groupe === C.groupe || p.prof);
    if (!ici.length) return "";
    return `<p class="presence">${ic("users")} ${ici.map(p => `${esc(p.prenom)} <span class="code-lg">${D.langues[p.langue] ? D.langues[p.langue].code : "?"}</span>`).join(" · ")}</p>`;
  }

  function ecranDiscuter() {
    if (C.etat === "deconnecte" || C.etat === "essai") connecter();
    cadre(`
      <div class="chat-tete">
        <h1>${esc(fr(D.ui.discuter))}${ligneTrad(D.ui.discuter)}</h1>
        <div id="etat-chat">${etatHTML()}</div>
      </div>
      <div class="onglets" role="tablist" style="margin-top:16px">${GROUPES.map(g => `<button class="onglet" role="tab" data-groupe="${g}" aria-selected="${C.groupe === g}">${esc(nomGroupe(g))}</button>`).join("")}</div>
      <div id="presence">${presenceHTML()}</div>
      ${C.prof ? `<div class="barre-prof"><button class="btn btn-secondaire" data-pause>${C.pause ? ic("play") + " Rouvrir la discussion" : ic("pause") + " Mettre en pause"}</button><button class="btn-discret" data-vider>Tout effacer</button></div>` : ""}
      <p class="petit regle">${texte(D.ui.regleChat)}</p>
      <ul class="fil" id="fil" aria-live="polite">${filHTML()}</ul>
      <div class="compo">
        <div class="amorces">${D.amorcesChat.map(a => `<button class="amorce" data-amorce-chat="${esc(a)}">${esc(a)}…</button>`).join("")}</div>
        <div id="pause-msg">${C.pause && !C.prof ? `<p class="retour-msg ko">${ic("pause")} ${texte(D.ui.chatPause)}</p>` : ""}</div>
        <form id="form-chat" class="ligne-compo">
          <textarea id="saisie-chat" rows="2" maxlength="300" aria-label="Ton message" placeholder="${esc(D.langues[langue()].nom)}…"></textarea>
          <button class="btn btn-principal" data-espace="social" ${C.pause && !C.prof ? "disabled" : ""}>${ic("envoyer")} ${esc(fr(D.ui.envoyer))}</button>
        </form>
      </div>`, "social", "discuter");
    const ta = $("#saisie-chat"); if (ta) ta.value = C.brouillon;
    defilerBas();
  }
  function defilerBas() { const f = $("#fil"); if (f) f.scrollTop = f.scrollHeight; }
  function majDiscussion() {
    if (route() !== "discuter" || !deverrouille) return;
    const f = $("#fil"); if (!f) return;
    f.innerHTML = filHTML();
    $("#etat-chat").innerHTML = etatHTML();
    $("#presence").innerHTML = presenceHTML();
    $("#pause-msg").innerHTML = C.pause && !C.prof ? `<p class="retour-msg ko">${ic("pause")} ${texte(D.ui.chatPause)}</p>` : "";
    const b = $("#form-chat button"); if (b) b.disabled = C.pause && !C.prof;
    const bp = $("[data-pause]"); if (bp) bp.innerHTML = C.pause ? ic("play") + " Rouvrir la discussion" : ic("pause") + " Mettre en pause";
    defilerBas();
  }
  function envoyerMessage() {
    const ta = $("#saisie-chat");
    const t = ta.value.trim();
    if (!t) return;
    if (C.etat === "essai") {
      // Mode essai : le message reste sur la tablette, sans traduction.
      C.messages.push({ id: String(Date.now()), de: S.profil.prenom, tablette: S.profil.tablette, langue: langue(), groupe: C.groupe, traductions: { [langue()]: t }, heure: Date.now() });
    } else if (!envoyerWS({ type: "message", texte: t })) return majDiscussion();
    ta.value = ""; C.brouillon = "";
    majDiscussion();
  }

  /* ---------- Mode prof ---------- */
  let profOk = false;
  function ecranProf() {
    if (!profOk) {
      app.innerHTML = `<main><div class="ecran-centre"><form class="carte formulaire" id="form-code-prof">
        <h1>${ic("verrou")} Mode prof</h1>
        <label>Code prof<input id="code-prof" type="password" inputmode="numeric" autocomplete="off"></label>
        <p class="petit">Code de départ : 2468. Change-le après la première connexion.</p>
        <p class="message-erreur" id="err-prof"></p>
        <div class="ligne-boutons"><a class="btn btn-secondaire" href="#accueil">Annuler</a><button class="btn btn-principal" style="--espace:var(--ink)">Entrer</button></div>
      </form></div></main>`;
      return;
    }
    const p = S.profil || { tablette: "", prenom: "", langue: "uk", genre: "m", code: "" };
    app.innerHTML = `<main><div class="ecran-centre"><form class="carte formulaire" id="form-profil" style="max-width:640px">
      <h1>Profil de cette tablette</h1>
      <label>Numéro de la tablette<input name="tablette" inputmode="numeric" required value="${esc(p.tablette)}"></label>
      <label>Prénom de l'élève<input name="prenom" required value="${esc(p.prenom)}"></label>
      <label>Langue de l'élève<select name="langue">${Object.entries(D.langues).map(([k, v]) => `<option value="${k}" ${p.langue === k ? "selected" : ""}>${esc(v.nom)} (${v.code})</option>`).join("")}</select></label>
      <label>Accords en français (content / contente)<select name="genre"><option value="m" ${p.genre !== "f" ? "selected" : ""}>masculin</option><option value="f" ${p.genre === "f" ? "selected" : ""}>féminin</option></select></label>
      <label>Code secret de l'élève (4 chiffres)<input name="code" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required value="${esc(p.code)}"></label>
      <label>Nouveau code prof (laisser vide pour garder)<input name="codeProf" inputmode="numeric" autocomplete="off"></label>
      <h2 style="margin-top:8px">Serveur de la classe (discussion et suivi)</h2>
      <label>Adresse du serveur<input name="serveur" placeholder="https://daspa-discussion.….workers.dev" value="${esc((S.discussion || {}).serveur || "")}"></label>
      <label>Code de la classe<input name="codeClasse" autocomplete="off" value="${esc((S.discussion || {}).codeClasse || "")}"></label>
      <label>Clé prof (uniquement sur la tablette du prof : modération et suivi)<input name="clePof" type="password" autocomplete="off" value="${esc((S.discussion || {}).clePof || "")}"></label>
      <div class="ligne-boutons">
        <button type="button" class="btn btn-secondaire" id="demo">Profil de démonstration</button>
        <button class="btn btn-principal" style="--espace:var(--ink)">Enregistrer</button>
      </div>
      <h2 style="margin-top:8px">Suivi de la classe</h2>
      <p class="petit">La progression de chaque élève, tes feedbacks et le cahier de cotes. Il faut l'adresse du serveur, le code de la classe et la clé prof.</p>
      <div class="ligne-boutons"><a class="btn btn-principal" style="--espace:var(--ink)" href="#suivi">Ouvrir le suivi de la classe</a></div>
      ${window.LECONS && S.profil ? window.LECONS.resumeProf() : ""}
      <h2 style="margin-top:8px">Sauvegarde</h2>
      <p class="petit">À faire de temps en temps : si l'iPad est réinitialisé, tu pourras tout remettre (profil, créations, dico, progrès).</p>
      <div class="ligne-boutons">
        <button type="button" class="btn btn-secondaire" id="sauvegarder">Sauvegarder cette tablette</button>
        <label class="btn btn-secondaire">Restaurer une sauvegarde<input type="file" id="restaurer" accept=".json,application/json" class="sr"></label>
      </div>
      <p class="petit" id="msg-sauvegarde"></p>
      <div class="ligne-boutons">
        <button type="button" class="btn-discret" id="reinit">Effacer toutes les données de cette tablette</button>
        <a class="btn-discret" href="#accueil">Fermer</a>
      </div>
      <p class="petit">${S.discussion && S.discussion.serveur && S.discussion.codeClasse ? "Envoyé au serveur de la classe (Europe) : prénom, numéro de tablette et avancement dans les leçons, pour le suivi du prof. Le reste (créations, humeur, réponses, dico) reste sur cette tablette." : "Les données restent sur cette tablette. Rien n'est envoyé sur Internet."}<br>Pictogrammes : ARASAAC (Gobierno de Aragón, Sergio Palao), licence CC BY-NC-SA.</p>
    </form></div></main>`;
  }

  /* ---------- Sauvegarde / restauration ---------- */
  async function sauvegarder() {
    const donnees = {};
    try { Object.keys(localStorage).filter(k => k.startsWith("daspa-")).forEach(k => { donnees[k] = localStorage.getItem(k); }); } catch (e) {}
    const p = S.profil || {};
    const nom = `sauvegarde-tablette${p.tablette || ""}-${(p.prenom || "").replace(/[^\w-]/g, "")}-${aujourdhui()}.json`;
    const blob = new Blob([JSON.stringify({ app: "ma-classe-daspa", date: new Date().toISOString(), donnees })], { type: "application/json" });
    const msg = $("#msg-sauvegarde");
    try {
      const f = new File([blob], nom, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: nom }); if (msg) msg.textContent = "Sauvegarde envoyée."; return; }
    } catch (e) { if (e && e.name === "AbortError") return; }
    try { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nom; document.body.appendChild(a); a.click(); a.remove(); if (msg) msg.textContent = "Sauvegarde téléchargée : " + nom; }
    catch (e) { if (msg) msg.textContent = "Sauvegarde impossible ici (elle marchera dans l'app installée)."; }
  }
  function restaurer(fichier) {
    const msg = $("#msg-sauvegarde");
    const r = new FileReader();
    r.onload = () => {
      try {
        const j = JSON.parse(r.result);
        if (j.app !== "ma-classe-daspa" || !j.donnees || !j.donnees[CLE]) throw new Error("format");
        Object.keys(localStorage).filter(k => k.startsWith("daspa-")).forEach(k => localStorage.removeItem(k));
        Object.entries(j.donnees).forEach(([k, v]) => localStorage.setItem(k, v));
        S = Object.assign({ profil: null, codeProf: CODE_PROF_DEFAUT, journal: {}, progres: {}, dico: [], reponses: {}, trad: true, signal: null }, charger());
        if (msg) msg.textContent = "Sauvegarde restaurée.";
        setDeverrouille(false); profOk = false; setTimeout(() => aller("accueil"), 800);
      } catch (e) { if (msg) msg.textContent = "Ce fichier n'est pas une sauvegarde de l'app."; }
    };
    r.readAsText(fichier);
  }

  /* ---------- Événements ---------- */
  document.addEventListener("click", ev => {
    const b = ev.target.closest("button, a");
    if (!b) return;
    const d = b.dataset;

    if (b.id === "ouvrir-prof") { profOk = false; return aller("prof"); }
    if (b.id === "bascule-trad") { S.trad = !S.trad; sauver(); return rendre(); }
    if (d.chiffre !== undefined) return saisirChiffre(d.chiffre);
    if (d.effacer !== undefined) { codeSaisi = codeSaisi.slice(0, -1); return ecranCode(); }
    if (d.dire !== undefined) return parler(d.dire, d.lg);

    if (d.humeur) { const j = S.journal[aujourdhui()] = S.journal[aujourdhui()] || {}; j.humeur = j.humeur === d.humeur ? null : d.humeur; sauver(); return rendre(); }
    if (d.hier) { const j = S.journal[aujourdhui()] = S.journal[aujourdhui()] || {}; j.hier = j.hier === d.hier ? null : d.hier; sauver(); rendre(); if (j.hier) parler("Hier, " + fr(D.hier.find(h => h.id === d.hier).t), "fr"); return; }

    if (d.dico) { const i = S.dico.indexOf(d.dico); if (i >= 0) S.dico.splice(i, 1); else S.dico.push(d.dico); sauver(); return rendre(); }
    if (d.onglet) { ongletMots = d.onglet; return rendre(); }

    if (d.groupe) { C.groupe = d.groupe; S.groupe = d.groupe; sauver(); envoyerWS({ type: "groupe", groupe: d.groupe }); return rendre(); }
    if (d.amorceChat) { const ta = $("#saisie-chat"); ta.value = (ta.value ? ta.value.trim() + " " : "") + d.amorceChat + " "; C.brouillon = ta.value; ta.focus(); return; }
    if (d.supprimer) return envoyerWS({ type: "supprimer", id: d.supprimer });
    if (d.pause !== undefined) return envoyerWS({ type: "pause", valeur: !C.pause });
    if (d.vider !== undefined) { if (b.dataset.confirme !== "1") { b.dataset.confirme = "1"; b.textContent = "Touche encore : tout sera effacé"; return; } return envoyerWS({ type: "vider" }); }
    if (d.signal) { S.signal = S.signal === d.signal ? null : d.signal; sauver(); window.scrollTo(0, 0); return rendre(); }

    if (A) {
      if (d.option) { if (A.resultat === "ok") return; A.choix = d.option; A.resultat = null; return rendre(); }
      if (d.element) { A.selection = A.selection === d.element ? null : d.element; return rendre(); }
      if (d.bac) {
        if (A.selection) { A.place[A.selection] = d.bac; A.selection = null; A.resultat = null; return rendre(); }
        // toucher un bac sans sélection : on sort le dernier élément placé dans ce bac
        if (!A.resultat) { const ids = Object.keys(A.place).filter(k => A.place[k] === d.bac); if (ids.length) { delete A.place[ids.pop()]; return rendre(); } }
        return;
      }
      if (d.feu) { A.choix = d.feu; return rendre(); }
      if (d.amorce) { const ta = $("#ecrit"); ta.value = (ta.value ? ta.value.trim() + " " : "") + d.amorce + " "; ta.focus(); return; }
      if (d.aide !== undefined) { A.aides++; S.reponses[`${A.id}-${A.etape}-aides`] = A.aides; sauver(); return rendre(); }
      if (d.verifier !== undefined) return verifier();
      if (d.valider !== undefined) { A.resultat = "merci"; return rendre(); }
      if (d.passer !== undefined || d.suivant !== undefined) return etapeSuivante();
    }
    if (d.recommencer) { S.progres[d.recommencer] = { etape: 0, fini: false }; A = null; sauver(); return rendre(); }

    if (b.id === "demo") {
      S.profil = { tablette: "7", prenom: "Olena", langue: "uk", genre: "f", code: "1234" };
      sauver(); setDeverrouille(false); profOk = false;
      return aller("accueil");
    }
    if (b.id === "sauvegarder") return sauvegarder();
    if (b.id === "reinit") {
      if (b.dataset.confirme !== "1") { b.dataset.confirme = "1"; b.textContent = "Touche encore pour confirmer : tout sera effacé"; return; }
      S = { profil: null, codeProf: S.codeProf, journal: {}, progres: {}, dico: [], reponses: {}, trad: true, signal: null };
      sauver(); setDeverrouille(false); profOk = false; A = null; return aller("accueil");
    }
  });

  document.addEventListener("input", ev => {
    if (ev.target.id === "nombre" && A) {
      A.choix = ev.target.value.replace(/\D/g, "");
      A.resultat = null;
      const btn = $("[data-verifier]");
      if (btn) { btn.disabled = !A.choix; btn.textContent = fr(D.ui.verifier); }
    }
    if (ev.target.id === "ecrit" && A) S.reponses[A.id + "-ecrit"] = ev.target.value;
    if (ev.target.id === "saisie-chat") C.brouillon = ev.target.value;
  });
  document.addEventListener("change", ev => {
    if (ev.target.id === "ecrit") sauver();
    if (ev.target.id === "restaurer" && ev.target.files[0]) restaurer(ev.target.files[0]);
  });

  document.addEventListener("submit", ev => {
    ev.preventDefault();
    if (ev.target.id === "form-chat") return envoyerMessage();
    if (ev.target.id === "form-code-prof") {
      if ($("#code-prof").value === S.codeProf) { profOk = true; ecranProf(); }
      else $("#err-prof").textContent = "Code incorrect.";
    }
    if (ev.target.id === "form-profil") {
      const f = new FormData(ev.target);
      S.profil = { tablette: f.get("tablette").trim(), prenom: f.get("prenom").trim(), langue: f.get("langue"), genre: f.get("genre"), code: f.get("code").trim() };
      if (f.get("codeProf").trim()) S.codeProf = f.get("codeProf").trim();
      S.discussion = { serveur: f.get("serveur").trim(), codeClasse: f.get("codeClasse").trim(), clePof: f.get("clePof").trim() };
      deconnecter();
      sauver(); setDeverrouille(false); profOk = false; aller("accueil");
    }
  });

  document.addEventListener("keydown", ev => {
    if (ev.target.id === "saisie-chat" && ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); envoyerMessage(); }
  });

  // Outils partagés avec les autres modules (atelier.js)
  window.APP = {
    D, get S() { return S; }, sauver, ic, esc, fr, tr, ligneTrad, texte, cadre, aller, route, langue, parler, boutonsSon, rendre, argent, picto,
    ajouterIcones: o => Object.assign(ICONES, o)
  };

  rendre();
})();
