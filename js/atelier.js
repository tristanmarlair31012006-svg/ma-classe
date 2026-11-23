/* Atelier : les élèves créent (carte, frise, dessin, trace, BD). Tout reste sur l'iPad. */
(function () {
  "use strict";
  const A = window.APP;
  const { D, ic, esc, fr, ligneTrad, texte, cadre, aller } = A;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => [...(el || document).querySelectorAll(s)];

  A.ajouterIcones({
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    texteT: '<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>',
    fleche: '<path d="M13 5H19V11"/><path d="M19 5L5 19"/>',
    annuler: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
    pinceau: '<path d="m11 10 3 3"/><path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"/><path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"/>',
    gomme: '<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/>',
    photo: '<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',
    partager: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    frise: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M16 2v3"/><path d="M3 9h18"/><path d="M8 2v3"/><path d="M17 13h-6"/><path d="M13 17H7"/><path d="M7 13h.01"/><path d="M17 17h.01"/>',
    crayon: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    cases: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    carte: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>'
  });

  /* ---------- Textes ---------- */
  const T = {
    mesCreations: { fr: "Mes créations", uk: "Мої роботи", pl: "Moje prace", es: "Mis creaciones", rn: null },
    nouvelle: { fr: "Nouvelle création", uk: "Нова робота", pl: "Nowa praca", es: "Nueva creación", rn: null },
    aucune: { fr: "Tu n'as encore rien créé. CHOISIS un outil.", uk: "Ти ще нічого не створив. ВИБЕРИ інструмент.", pl: "Jeszcze nic nie stworzyłeś. WYBIERZ narzędzie.", es: "Todavía no has creado nada. ELIGE una herramienta.", rn: null },
    titre: { fr: "Titre", uk: "Назва", pl: "Tytuł", es: "Título", rn: null },
    partager: { fr: "Partager", uk: "Поділитися", pl: "Udostępnij", es: "Compartir", rn: null },
    supprimer: { fr: "Supprimer", uk: "Видалити", pl: "Usuń", es: "Eliminar", rn: null },
    annuler: { fr: "Annuler", uk: "Скасувати", pl: "Cofnij", es: "Deshacer", rn: null },
    enregistre: { fr: "Enregistré sur l'iPad", uk: "Збережено на iPad", pl: "Zapisano na iPadzie", es: "Guardado en el iPad", rn: null },
    colorier: { fr: "Colorier", uk: "Розфарбувати", pl: "Koloruj", es: "Colorear", rn: null },
    etiquette: { fr: "Étiquette", uk: "Підпис", pl: "Podpis", es: "Etiqueta", rn: null },
    fleche: { fr: "Flèche", uk: "Стрілка", pl: "Strzałka", es: "Flecha", rn: null },
    point: { fr: "Point", uk: "Точка", pl: "Punkt", es: "Punto", rn: null },
    legende: { fr: "Légende", uk: "Легенда", pl: "Legenda", es: "Leyenda", rn: null },
    fond: { fr: "Fond de carte", uk: "Основа карти", pl: "Podkład mapy", es: "Mapa base", rn: null },
    texteEtiquette: { fr: "ÉCRIS le texte, puis TOUCHE la carte.", uk: "НАПИШИ текст, потім ТОРКНИСЬ карти.", pl: "NAPISZ tekst, potem DOTKNIJ mapy.", es: "ESCRIBE el texto y luego TOCA el mapa.", rn: null },
    aideFleche: { fr: "GLISSE ton doigt sur la carte pour tracer une flèche.", uk: "ПРОВЕДИ пальцем по карті, щоб намалювати стрілку.", pl: "PRZESUŃ palcem po mapie, aby narysować strzałkę.", es: "DESLIZA el dedo por el mapa para trazar una flecha.", rn: null },
    aideColorier: { fr: "CHOISIS une couleur, puis TOUCHE un pays.", uk: "ВИБЕРИ колір, потім ТОРКНИСЬ країни.", pl: "WYBIERZ kolor, potem DOTKNIJ kraju.", es: "ELIGE un color y luego TOCA un país.", rn: null },
    aidePoint: { fr: "TOUCHE la carte pour placer un point.", uk: "ТОРКНИСЬ карти, щоб поставити точку.", pl: "DOTKNIJ mapy, aby postawić punkt.", es: "TOCA el mapa para poner un punto.", rn: null },
    sensCouleur: { fr: "Cette couleur veut dire…", uk: "Цей колір означає…", pl: "Ten kolor oznacza…", es: "Este color significa…", rn: null },
    monHistoire: { fr: "Mon histoire", uk: "Моя історія", pl: "Moja historia", es: "Mi historia", rn: null },
    lHistoire: { fr: "L'histoire (Belgique, monde)", uk: "Історія (Бельгія, світ)", pl: "Historia (Belgia, świat)", es: "La historia (Bélgica, mundo)", rn: null },
    annee: { fr: "Année", uk: "Рік", pl: "Rok", es: "Año", rn: null },
    evenement: { fr: "Événement", uk: "Подія", pl: "Wydarzenie", es: "Acontecimiento", rn: null },
    ajouter: { fr: "Ajouter", uk: "Додати", pl: "Dodaj", es: "Añadir", rn: null },
    aideFrise: { fr: "AJOUTE des événements. La frise se range toute seule.", uk: "ДОДАЙ події. Стрічка впорядкується сама.", pl: "DODAJ wydarzenia. Oś czasu ułoży się sama.", es: "AÑADE acontecimientos. La línea se ordena sola.", rn: null },
    quoi: { fr: "Qu'est-ce que c'est ?", uk: "Що це?", pl: "Co to jest?", es: "¿Qué es?", rn: null },
    dou: { fr: "D'où ça vient ?", uk: "Звідки це?", pl: "Skąd to pochodzi?", es: "¿De dónde viene?", rn: null },
    pourquoi: { fr: "Pourquoi c'est important pour moi ?", uk: "Чому це важливо для мене?", pl: "Dlaczego to jest dla mnie ważne?", es: "¿Por qué es importante para mí?", rn: null },
    prendrePhoto: { fr: "Prendre ou choisir une photo", uk: "Зробити або вибрати фото", pl: "Zrób lub wybierz zdjęcie", es: "Hacer o elegir una foto", rn: null },
    choixLibre: { fr: "Tu choisis ce que tu montres. Rien n'est obligatoire.", uk: "Ти сам вирішуєш, що показати. Нічого не обов'язково.", pl: "Sam decydujesz, co pokazujesz. Nic nie jest obowiązkowe.", es: "Tú eliges qué mostrar. Nada es obligatorio.", rn: null },
    case_: { fr: "Case", uk: "Кадр", pl: "Kadr", es: "Viñeta", rn: null },
    ajouterCase: { fr: "Ajouter une case", uk: "Додати кадр", pl: "Dodaj kadr", es: "Añadir viñeta", rn: null },
    dessiner: { fr: "Dessiner", uk: "Малювати", pl: "Rysuj", es: "Dibujar", rn: null },
    bulle: { fr: "Bulle (ce que dit le personnage)", uk: "Бульбашка (що каже персонаж)", pl: "Dymek (co mówi postać)", es: "Bocadillo (lo que dice el personaje)", rn: null },
    legendeCase: { fr: "Récit (ce qui se passe)", uk: "Розповідь (що відбувається)", pl: "Opis (co się dzieje)", es: "Relato (lo que pasa)", rn: null },
    retourBD: { fr: "Retour à la BD", uk: "Назад до коміксу", pl: "Powrót do komiksu", es: "Volver al cómic", rn: null },
    partageImpossible: { fr: "Le partage marchera quand l'app sera installée sur l'iPad.", uk: "Поділитися можна буде, коли застосунок встановлять на iPad.", pl: "Udostępnianie zadziała, gdy aplikacja będzie zainstalowana na iPadzie.", es: "Compartir funcionará cuando la app esté instalada en el iPad.", rn: null },
    enClasse: { fr: "En classe", uk: "У класі", pl: "W klasie", es: "En clase", rn: null },
    tirage: { fr: "Tirage au sort des groupes", uk: "Жеребкування груп", pl: "Losowanie grup", es: "Sorteo de los grupos", rn: null },
    tirageDesc: { fr: "Des groupes au hasard, chaque fois avec quelqu'un de nouveau.", uk: "Випадкові групи, щоразу з кимось новим.", pl: "Losowe grupy, za każdym razem z kimś nowym.", es: "Grupos al azar, cada vez con alguien nuevo.", rn: null },
    effacerTout: { fr: "Tout effacer", uk: "Стерти все", pl: "Wyczyść wszystko", es: "Borrar todo", rn: null }
  };

  const OUTILS = [
    { type: "carte", icone: "carte", nom: D.atelierOutils[0].t, desc: { fr: "Colorie, place des étiquettes et des flèches.", uk: "Розфарбовуй, став підписи та стрілки.", pl: "Koloruj, dodawaj podpisy i strzałki.", es: "Colorea, pon etiquetas y flechas.", rn: null } },
    { type: "frise", icone: "frise", nom: D.atelierOutils[1].t, desc: { fr: "Place ton histoire à côté de la grande histoire.", uk: "Розмісти свою історію поруч із великою історією.", pl: "Umieść swoją historię obok wielkiej historii.", es: "Pon tu historia al lado de la gran historia.", rn: null } },
    { type: "dessin", icone: "pinceau", nom: D.atelierOutils[2].t, desc: { fr: "Dessine un schéma ou un croquis.", uk: "Намалюй схему чи ескіз.", pl: "Narysuj schemat lub szkic.", es: "Dibuja un esquema o un croquis.", rn: null } },
    { type: "trace", icone: "photo", nom: D.atelierOutils[3].t, desc: { fr: "Photographie un objet et explique ce qu'il raconte.", uk: "Сфотографуй предмет і поясни, що він розповідає.", pl: "Zrób zdjęcie przedmiotu i wyjaśnij, co opowiada.", es: "Fotografía un objeto y explica lo que cuenta.", rn: null } },
    { type: "bd", icone: "cases", nom: D.atelierOutils[4].t, desc: { fr: "Raconte une histoire en 3 à 6 cases.", uk: "Розкажи історію в 3–6 кадрах.", pl: "Opowiedz historię w 3–6 kadrach.", es: "Cuenta una historia en 3 a 6 viñetas.", rn: null } }
  ];
  const outil = t => OUTILS.find(o => o.type === t);
  const COULEURS = ["#e07a5f", "#f2cc8f", "#81b29a", "#5b8fc9", "#a98bd4", "#8d8d8d"];
  const CRAYONS = ["#2b2b2b", "#c62828", "#1d5f91", "#2e7d32", "#a85d00", "#6a4c96"];

  /* ---------- Stockage ---------- */
  const S = () => A.S;
  function creations() { S().creations = S().creations || []; return S().creations; }
  function trouver(id) { return creations().find(c => c.id === id); }
  function sauverCreation(c) { c.modifie = Date.now(); A.sauver(); signaler(); }
  function lireImage(cle) { try { return localStorage.getItem("daspa-img-" + cle); } catch (e) { return null; } }
  function ecrireImage(cle, url) { try { localStorage.setItem("daspa-img-" + cle, url); return true; } catch (e) { return false; } }
  function effacerImages(id) { try { Object.keys(localStorage).filter(k => k.startsWith("daspa-img-" + id)).forEach(k => localStorage.removeItem(k)); } catch (e) {} }
  let minuteur;
  function signaler() { const el = $("#etat-enreg"); if (!el) return; el.classList.add("vu"); clearTimeout(minuteur); minuteur = setTimeout(() => el.classList.remove("vu"), 1500); }

  function nouvelle(type) {
    const id = type + "-" + Date.now().toString(36);
    const base = { carte: { fond: "monde", couleurs: {}, etiquettes: [], fleches: [], points: [], legende: {} }, frise: { evenements: [] }, dessin: {}, trace: { quoi: "", dou: "", pourquoi: "" }, bd: { cases: [{ bulle: "", recit: "" }, { bulle: "", recit: "" }, { bulle: "", recit: "" }] } }[type];
    creations().unshift({ id, type, titre: fr(outil(type).nom), cree: Date.now(), modifie: Date.now(), data: base });
    A.sauver();
    aller("atelier-" + id);
  }

  /* ---------- Partage (image → Teams via la feuille de partage de l'iPad) ---------- */
  async function partager(blob, nom) {
    const fichier = new File([blob], nom.replace(/[^\w\-àâçéèêëîïôûùüÿ ]/gi, "_") + ".png", { type: "image/png" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [fichier] })) { await navigator.share({ files: [fichier], title: nom }); return; }
    } catch (e) { if (e && e.name === "AbortError") return; }
    try {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = fichier.name; document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {}
    const msg = $("#msg-partage"); if (msg) msg.innerHTML = texte(T.partageImpossible);
  }
  function svgVersPng(svg, l, h) {
    return new Promise(res => {
      const clone = svg.cloneNode(true);
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("width", l); clone.setAttribute("height", h);
      const fond = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      fond.setAttribute("width", "100%"); fond.setAttribute("height", "100%"); fond.setAttribute("fill", "#ffffff");
      clone.insertBefore(fond, clone.firstChild);
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" }));
      const img = new Image();
      img.onload = () => { const c = document.createElement("canvas"); c.width = l * 2; c.height = h * 2; const x = c.getContext("2d"); x.scale(2, 2); x.drawImage(img, 0, 0, l, h); URL.revokeObjectURL(url); c.toBlob(res, "image/png"); };
      img.onerror = () => res(null);
      img.src = url;
    });
  }

  /* ---------- Écran principal ---------- */
  function ecran(r) {
    if (r === "atelier") return galerie();
    const id = r.slice("atelier-".length);
    const [cid, sous] = id.split("--");
    const c = trouver(cid);
    if (!c) return aller("atelier");
    if (sous && c.type === "bd") return editeurDessin(c, sous);
    ({ carte: editeurCarte, frise: editeurFrise, dessin: c2 => editeurDessin(c2), trace: editeurTrace, bd: editeurBD })[c.type](c);
  }

  function galerie() {
    const liste = creations();
    const date = t => new Date(t).toLocaleDateString("fr-BE", { day: "numeric", month: "short" });
    cadre(`
      <h1 style="margin-top:8px">${esc(fr(D.ui.atelier))}${ligneTrad(D.ui.atelier)}</h1>
      <section class="bloc">
        <h2>${esc(fr(T.nouvelle))}${ligneTrad(T.nouvelle)}</h2>
        <div class="outils-atelier">${OUTILS.map(o => `
          <button class="outil-atelier" data-at-nouveau="${o.type}">
            <span class="icone-outil">${ic(o.icone)}</span>
            <span><b>${esc(fr(o.nom))}</b>${ligneTrad(o.nom)}<span class="petit" style="display:block;margin-top:4px">${esc(fr(o.desc))}</span></span>
          </button>`).join("")}
        </div>
      </section>
      <section class="bloc">
        <h2>${esc(fr(T.enClasse))}${ligneTrad(T.enClasse)}</h2>
        <div class="outils-atelier">
          <a class="outil-atelier" href="#groupes" style="color:inherit;text-decoration:none">
            <span class="icone-outil">${ic("de")}</span>
            <span><b>${esc(fr(T.tirage))}</b>${ligneTrad(T.tirage)}<span class="petit" style="display:block;margin-top:4px">${esc(fr(T.tirageDesc))}</span></span>
          </a>
        </div>
      </section>
      <section class="bloc">
        <h2>${esc(fr(T.mesCreations))}${ligneTrad(T.mesCreations)}</h2>
        ${liste.length ? `<div class="creations">${liste.map(c => `
          <a class="creation" href="#atelier-${c.id}">
            <span class="icone-outil">${ic(outil(c.type).icone)}</span>
            <span><b>${esc(c.titre)}</b><span class="petit" style="display:block">${esc(fr(outil(c.type).nom))} · ${date(c.modifie)}</span></span>
          </a>`).join("")}</div>` : `<p class="carte-plate">${texte(T.aucune, { gras: true })}</p>`}
      </section>`, "atelier", "atelier");
  }

  function enTete(c) {
    return `<div class="bandeau">
        <a class="rond retour" href="#atelier" aria-label="Retour">${ic("gauche")}</a>
        <span class="icone-outil blanc">${ic(outil(c.type).icone)}</span>
        <input class="titre-creation" id="at-titre" value="${esc(c.titre)}" aria-label="${esc(fr(T.titre))}" maxlength="60">
        <span class="etat-enreg" id="etat-enreg">${ic("ok")} ${esc(fr(T.enregistre))}</span>
      </div>`;
  }
  function piedEditeur() {
    return `<div class="actions">
        <button class="btn btn-secondaire" data-at-annuler>${ic("annuler")} ${esc(fr(T.annuler))}</button>
        <button class="btn-discret" data-at-supprimer>${esc(fr(T.supprimer))}</button>
        <div class="droite"><span id="msg-partage" class="petit"></span><button class="btn btn-principal" data-at-partager>${ic("partager")} ${esc(fr(T.partager))}</button></div>
      </div>`;
  }

  /* ---------- Historique pour « Annuler » ---------- */
  let historique = [];
  function memoriser(c) { historique.push(JSON.stringify(c.data)); if (historique.length > 40) historique.shift(); }

  let courant = null; // création ouverte

  /* =========================================================
     CARTE
     ========================================================= */
  let outilCarte = "colorier", couleurCarte = COULEURS[0], texteEtiq = "";
  function svgCarte(c, interactif) {
    const f = window.CARTES[c.data.fond];
    const d = c.data;
    const pays = f.pays.map(p => `<path d="${p.d}" data-pays="${esc(p.id)}" fill="${d.couleurs[p.id] || "#fbf7ef"}" stroke="#6b6b6b" stroke-width="${c.data.fond === "monde" ? 0.6 : 1}"/>`).join("");
    const reperes = f.points.map(p => `<g class="repere"><circle cx="${p.x}" cy="${p.y}" r="4" fill="#2b2b2b"/><text x="${p.x + 7}" y="${p.y + 5}" font-size="${c.data.fond === "monde" ? 12 : 16}" font-family="Comic Neue, sans-serif" font-weight="700" fill="#2b2b2b">${esc(p.label)}</text></g>`).join("");
    const fleches = d.fleches.map(a => `<line x1="${a.x1}" y1="${a.y1}" x2="${a.x2}" y2="${a.y2}" stroke="${a.c}" stroke-width="4" stroke-linecap="round" marker-end="url(#pointe-${a.c.slice(1)})"/>`).join("");
    const marqueurs = [...new Set(d.fleches.map(a => a.c).concat(COULEURS, ["#2b2b2b"]))].map(col => `<marker id="pointe-${col.slice(1)}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${col}"/></marker>`).join("");
    const points = d.points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="8" fill="${p.c}" stroke="#2b2b2b" stroke-width="2"/>`).join("");
    const etiq = d.etiquettes.map(e => `<text x="${e.x}" y="${e.y}" font-size="${c.data.fond === "monde" ? 16 : 20}" font-family="Comic Neue, sans-serif" font-weight="700" fill="#2b2b2b" stroke="#ffffff" stroke-width="4" paint-order="stroke" text-anchor="middle">${esc(e.t)}</text>`).join("");
    const legende = Object.entries(d.legende).filter(([col]) => Object.values(d.couleurs).includes(col) || d.points.some(p => p.c === col) || d.fleches.some(a => a.c === col)).filter(([, t]) => t);
    const hL = legende.length ? 16 + legende.length * 26 : 0;
    const leg = legende.length ? `<g transform="translate(12 ${f.h - hL - 8})"><rect width="${Math.max(...legende.map(([, t]) => t.length)) * 9 + 52}" height="${hL}" rx="8" fill="#ffffff" stroke="#2b2b2b" stroke-width="1.5"/>${legende.map(([col, t], i) => `<rect x="10" y="${10 + i * 26}" width="18" height="18" rx="3" fill="${col}" stroke="#2b2b2b"/><text x="36" y="${24 + i * 26}" font-size="15" font-family="Comic Neue, sans-serif" fill="#2b2b2b">${esc(t)}</text>`).join("")}</g>` : "";
    return `<svg id="svg-carte" viewBox="0 0 ${f.l} ${f.h}" class="svg-carte ${interactif ? "outil-" + outilCarte : ""}" role="img" aria-label="${esc(f.nom)}"><defs>${marqueurs}</defs><rect width="${f.l}" height="${f.h}" fill="#dceaf7"/>${pays}${reperes}${fleches}${points}${etiq}<line id="fleche-temp" stroke="${couleurCarte}" stroke-width="4" stroke-dasharray="8 6" visibility="hidden"/>${leg}</svg>`;
  }
  function editeurCarte(c) {
    if (courant !== c.id) { historique = []; courant = c.id; }
    const d = c.data;
    const aide = { colorier: T.aideColorier, etiquette: T.texteEtiquette, fleche: T.aideFleche, point: T.aidePoint }[outilCarte];
    const couleursUtilisees = [...new Set(Object.values(d.couleurs).concat(d.points.map(p => p.c), d.fleches.map(a => a.c)))];
    cadre(enTete(c) + `
      <div class="barre-outils">
        <div class="onglets">${Object.entries(window.CARTES).map(([k, f]) => `<button class="onglet" data-at-fond="${k}" aria-selected="${d.fond === k}">${esc(f.nom)}</button>`).join("")}</div>
      </div>
      <div class="barre-outils">
        ${[["colorier", "pinceau", T.colorier], ["etiquette", "texteT", T.etiquette], ["fleche", "fleche", T.fleche], ["point", "pin", T.point]].map(([k, i, t]) => `<button class="outil-btn" data-at-outil="${k}" aria-pressed="${outilCarte === k}">${ic(i)}<span>${esc(fr(t))}</span></button>`).join("")}
        <span class="separateur"></span>
        ${outilCarte !== "etiquette" ? COULEURS.map(col => `<button class="pastille-couleur" style="background:${col}" data-at-couleur="${col}" aria-pressed="${couleurCarte === col}" aria-label="Couleur"></button>`).join("") : ""}
        ${outilCarte === "etiquette" ? `<input class="champ-etiquette" id="at-etiq" placeholder="Huy, Ukraine, mer…" value="${esc(texteEtiq)}" maxlength="30">` : ""}
      </div>
      <p class="consigne-texte aide-outil">${texte(aide, { gras: true })}</p>
      <div class="zone-carte">${svgCarte(c, true)}</div>
      ${couleursUtilisees.length ? `<section class="bloc"><h2>${esc(fr(T.legende))}${ligneTrad(T.legende)}</h2>
        <div class="legende-edit">${couleursUtilisees.map(col => `<label class="ligne-legende"><span class="pastille-couleur" style="background:${col}"></span><input data-at-legende="${col}" value="${esc(d.legende[col] || "")}" placeholder="${esc(fr(T.sensCouleur))}" maxlength="40"></label>`).join("")}</div></section>` : ""}
      ${piedEditeur()}`, "atelier", "atelier");
    brancherCarte(c);
  }
  function coordSVG(svg, ev) {
    const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: Math.round(p.x), y: Math.round(p.y) };
  }
  function brancherCarte(c) {
    const svg = $("#svg-carte"); if (!svg) return;
    let depart = null;
    svg.addEventListener("pointerdown", ev => {
      const p = coordSVG(svg, ev);
      if (outilCarte === "fleche") { depart = p; svg.setPointerCapture(ev.pointerId); const l = $("#fleche-temp"); l.setAttribute("x1", p.x); l.setAttribute("y1", p.y); l.setAttribute("x2", p.x); l.setAttribute("y2", p.y); l.setAttribute("visibility", "visible"); }
    });
    svg.addEventListener("pointermove", ev => { if (!depart) return; const p = coordSVG(svg, ev); const l = $("#fleche-temp"); l.setAttribute("x2", p.x); l.setAttribute("y2", p.y); });
    svg.addEventListener("pointerup", ev => {
      const p = coordSVG(svg, ev);
      const d = c.data;
      if (outilCarte === "fleche" && depart) {
        if (Math.hypot(p.x - depart.x, p.y - depart.y) > 12) { memoriser(c); d.fleches.push({ x1: depart.x, y1: depart.y, x2: p.x, y2: p.y, c: couleurCarte }); }
        depart = null; sauverCreation(c); return editeurCarte(c);
      }
      if (outilCarte === "colorier") {
        const cible = ev.target.closest("[data-pays]"); if (!cible) return;
        memoriser(c);
        const id = cible.dataset.pays;
        if (d.couleurs[id] === couleurCarte) delete d.couleurs[id]; else d.couleurs[id] = couleurCarte;
        sauverCreation(c); return editeurCarte(c);
      }
      if (outilCarte === "point") { memoriser(c); d.points.push({ x: p.x, y: p.y, c: couleurCarte }); sauverCreation(c); return editeurCarte(c); }
      if (outilCarte === "etiquette") {
        const t = ($("#at-etiq").value || "").trim();
        if (!t) { $("#at-etiq").focus(); return; }
        memoriser(c); d.etiquettes.push({ x: p.x, y: p.y, t }); texteEtiq = ""; sauverCreation(c); return editeurCarte(c);
      }
    });
  }

  /* =========================================================
     FRISE
     ========================================================= */
  let ligneFrise = "moi";
  function svgFrise(c) {
    const ev = [...c.data.evenements].sort((a, b) => a.annee - b.annee);
    const L = 1100, H = 460, mx = 60, axe = H / 2;
    if (!ev.length) return `<svg id="svg-frise" viewBox="0 0 ${L} ${H}" class="svg-frise"><line x1="${mx}" y1="${axe}" x2="${L - mx}" y2="${axe}" stroke="#2b2b2b" stroke-width="4"/></svg>`;
    let min = ev[0].annee, max = ev[ev.length - 1].annee;
    if (min === max) { min -= 5; max += 5; }
    const marge = Math.max(1, Math.round((max - min) * 0.06));
    min -= marge; max += marge;
    const x = a => mx + (a - min) / (max - min) * (L - 2 * mx);
    const pas = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000].find(p => (max - min) / p <= 10) || 1000;
    const graduations = [];
    for (let a = Math.ceil(min / pas) * pas; a <= max; a += pas) graduations.push(a);
    // placement en quinconce pour éviter les chevauchements
    const niveaux = { moi: [], histoire: [] };
    const blocs = ev.map(e => {
      const cx = x(e.annee), cote = e.ligne === "moi" ? -1 : 1;
      const occ = niveaux[e.ligne];
      let n = 0; while (occ.some(o => o.n === n && Math.abs(o.x - cx) < 190)) n++;
      occ.push({ n, x: cx });
      const y = axe + cote * (40 + n * 62);
      return { e, cx, y, cote };
    });
    const coul = { moi: "#a85d00", histoire: "#1d5f91" };
    return `<svg id="svg-frise" viewBox="0 0 ${L} ${H}" class="svg-frise">
      <text x="${mx}" y="28" font-size="18" font-family="Comic Neue, sans-serif" font-weight="700" fill="${coul.moi}">${esc(fr(T.monHistoire))}</text>
      <text x="${mx}" y="${H - 14}" font-size="18" font-family="Comic Neue, sans-serif" font-weight="700" fill="${coul.histoire}">${esc(fr(T.lHistoire))}</text>
      <line x1="${mx - 20}" y1="${axe}" x2="${L - mx + 20}" y2="${axe}" stroke="#2b2b2b" stroke-width="4"/>
      <path d="M${L - mx + 20} ${axe - 9} L${L - mx + 36} ${axe} L${L - mx + 20} ${axe + 9}z" fill="#2b2b2b"/>
      ${graduations.map(a => `<line x1="${x(a)}" y1="${axe - 8}" x2="${x(a)}" y2="${axe + 8}" stroke="#2b2b2b" stroke-width="2"/><text x="${x(a)}" y="${axe + 26}" font-size="13" font-family="Comic Neue, sans-serif" fill="#62666b" text-anchor="middle">${a}</text>`).join("")}
      ${blocs.map(({ e, cx, y, cote }) => {
        const t = e.texte.length > 26 ? e.texte.slice(0, 25) + "…" : e.texte;
        const w = Math.max(90, t.length * 8.5 + 24);
        const bx = Math.min(Math.max(cx - w / 2, 4), L - w - 4);
        return `<line x1="${cx}" y1="${axe}" x2="${cx}" y2="${y}" stroke="${coul[e.ligne]}" stroke-width="2"/>
          <circle cx="${cx}" cy="${axe}" r="7" fill="${coul[e.ligne]}" stroke="#fff" stroke-width="2"/>
          <g transform="translate(${bx} ${cote < 0 ? y - 44 : y})"><rect width="${w}" height="44" rx="8" fill="#fff" stroke="${coul[e.ligne]}" stroke-width="2"/>
          <text x="12" y="18" font-size="14" font-weight="700" font-family="Comic Neue, sans-serif" fill="${coul[e.ligne]}">${e.annee}</text>
          <text x="12" y="36" font-size="15" font-family="Comic Neue, Andika, sans-serif" fill="#2b2b2b">${esc(t)}</text></g>`;
      }).join("")}
    </svg>`;
  }
  function editeurFrise(c) {
    if (courant !== c.id) { historique = []; courant = c.id; }
    const ev = [...c.data.evenements].map((e, i) => ({ ...e, i })).sort((a, b) => a.annee - b.annee);
    cadre(enTete(c) + `
      <p class="consigne-texte aide-outil">${texte(T.aideFrise, { gras: true })}</p>
      <div class="zone-carte">${svgFrise(c)}</div>
      <form class="carte-plate form-frise" id="form-frise">
        <div class="onglets">
          <button type="button" class="onglet" data-at-ligne="moi" aria-selected="${ligneFrise === "moi"}">${esc(fr(T.monHistoire))}</button>
          <button type="button" class="onglet" data-at-ligne="histoire" aria-selected="${ligneFrise === "histoire"}">${esc(fr(T.lHistoire))}</button>
        </div>
        <div class="ligne-compo">
          <label class="champ-annee"><span class="petit">${esc(fr(T.annee))}</span><input id="at-annee" inputmode="numeric" maxlength="5" required></label>
          <label style="flex:1"><span class="petit">${esc(fr(T.evenement))}</span><input id="at-evt" maxlength="60" required></label>
          <button class="btn btn-principal">${ic("plus")} ${esc(fr(T.ajouter))}</button>
        </div>
      </form>
      ${ev.length ? `<ul class="liste-evts">${ev.map(e => `<li><span class="code-lg" style="background:${e.ligne === "moi" ? "var(--atelier)" : "var(--mots)"}">${e.annee}</span> ${esc(e.texte)} <button class="rond mini" data-at-suppr-evt="${e.i}" aria-label="Supprimer">${ic("x")}</button></li>`).join("")}</ul>` : ""}
      ${piedEditeur()}`, "atelier", "atelier");
  }

  /* =========================================================
     DESSIN (aussi utilisé pour chaque case de BD)
     ========================================================= */
  let crayon = CRAYONS[0], epaisseur = 6, gomme = false;
  let pileDessin = [];
  function editeurDessin(c, caseBD) {
    const cle = caseBD != null ? `${c.id}-${caseBD}` : c.id;
    if (courant !== cle) { pileDessin = []; courant = cle; }
    const entete = caseBD != null
      ? `<div class="bandeau"><a class="rond retour" href="#atelier-${c.id}" aria-label="${esc(fr(T.retourBD))}">${ic("gauche")}</a><h1>${esc(c.titre)} · ${esc(fr(T.case_))} ${+caseBD + 1}</h1><span class="etat-enreg" id="etat-enreg">${ic("ok")} ${esc(fr(T.enregistre))}</span></div>`
      : enTete(c);
    cadre(entete + `
      <div class="barre-outils">
        ${CRAYONS.map(col => `<button class="pastille-couleur" style="background:${col}" data-at-crayon="${col}" aria-pressed="${!gomme && crayon === col}" aria-label="Couleur"></button>`).join("")}
        <span class="separateur"></span>
        ${[3, 6, 14].map(e => `<button class="outil-btn epaisseur" data-at-epaisseur="${e}" aria-pressed="${epaisseur === e}" aria-label="Épaisseur ${e}"><i style="width:${e + 4}px;height:${e + 4}px"></i></button>`).join("")}
        <button class="outil-btn" data-at-gomme aria-pressed="${gomme}">${ic("gomme")}<span>Gomme</span></button>
        <span class="separateur"></span>
        <button class="btn-discret" data-at-vider-dessin>${esc(fr(T.effacerTout))}</button>
      </div>
      <div class="zone-dessin"><canvas id="toile" width="1600" height="1000" aria-label="Zone de dessin"></canvas></div>
      ${caseBD != null ? `<div class="actions"><button class="btn btn-secondaire" data-at-annuler>${ic("annuler")} ${esc(fr(T.annuler))}</button><div class="droite"><a class="btn btn-principal" href="#atelier-${c.id}">${ic("ok")} ${esc(fr(T.retourBD))}</a></div></div>` : piedEditeur()}`, "atelier", "atelier");
    brancherToile(c, cle);
  }
  function brancherToile(c, cle) {
    const toile = $("#toile"); const x = toile.getContext("2d");
    x.fillStyle = "#fff"; x.fillRect(0, 0, toile.width, toile.height);
    const url = lireImage(cle);
    if (url) { const img = new Image(); img.onload = () => x.drawImage(img, 0, 0, toile.width, toile.height); img.src = url; }
    let actif = false, dernier = null;
    const pos = ev => { const r = toile.getBoundingClientRect(); return { x: (ev.clientX - r.left) * toile.width / r.width, y: (ev.clientY - r.top) * toile.height / r.height }; };
    toile.addEventListener("pointerdown", ev => {
      actif = true; toile.setPointerCapture(ev.pointerId);
      pileDessin.push(toile.toDataURL("image/png")); if (pileDessin.length > 15) pileDessin.shift();
      dernier = pos(ev);
      const pression = ev.pressure && ev.pointerType === "pen" ? ev.pressure * 2 : 1;
      x.beginPath(); x.fillStyle = gomme ? "#fff" : crayon; x.arc(dernier.x, dernier.y, (gomme ? epaisseur * 3 : epaisseur) * pression / 2, 0, Math.PI * 2); x.fill();
    });
    toile.addEventListener("pointermove", ev => {
      if (!actif) return;
      const p = pos(ev);
      const pression = ev.pressure && ev.pointerType === "pen" ? ev.pressure * 2 : 1;
      x.strokeStyle = gomme ? "#fff" : crayon; x.lineWidth = (gomme ? epaisseur * 3 : epaisseur) * pression; x.lineCap = "round"; x.lineJoin = "round";
      x.beginPath(); x.moveTo(dernier.x, dernier.y); x.lineTo(p.x, p.y); x.stroke();
      dernier = p;
    });
    const fin = () => { if (!actif) return; actif = false; ecrireImage(cle, toile.toDataURL("image/jpeg", 0.85)); sauverCreation(c); };
    toile.addEventListener("pointerup", fin); toile.addEventListener("pointercancel", fin);
  }

  /* =========================================================
     MA TRACE
     ========================================================= */
  function editeurTrace(c) {
    courant = c.id;
    const img = lireImage(c.id);
    const d = c.data;
    cadre(enTete(c) + `
      <p class="petit" style="margin-top:16px">${texte(T.choixLibre)}</p>
      <div class="trace">
        <label class="zone-photo">${img ? `<img src="${img}" alt="${esc(d.quoi || "Photo")}">` : `<span>${ic("photo")}<b>${esc(fr(T.prendrePhoto))}</b>${ligneTrad(T.prendrePhoto)}</span>`}
          <input type="file" accept="image/*" capture="environment" id="at-photo" class="sr">
        </label>
        <div class="formulaire">
          ${[["quoi", T.quoi], ["dou", T.dou], ["pourquoi", T.pourquoi]].map(([k, t]) => `<label>${esc(fr(t))}${ligneTrad(t)}<textarea data-at-champ="${k}" rows="${k === "pourquoi" ? 4 : 2}" maxlength="400">${esc(d[k] || "")}</textarea></label>`).join("")}
        </div>
      </div>
      ${piedEditeur()}`, "atelier", "atelier");
  }
  function chargerPhoto(c, fichier) {
    const lecteur = new FileReader();
    lecteur.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1000, k = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas"); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        if (!ecrireImage(c.id, cv.toDataURL("image/jpeg", 0.75))) { const m = $("#msg-partage"); if (m) m.textContent = "iPad plein : supprime une création."; return; }
        sauverCreation(c); editeurTrace(c);
      };
      img.src = lecteur.result;
    };
    lecteur.readAsDataURL(fichier);
  }

  /* =========================================================
     MA BD
     ========================================================= */
  function editeurBD(c) {
    courant = c.id;
    const cases = c.data.cases;
    cadre(enTete(c) + `
      <div class="bd">${cases.map((k, i) => {
        const img = lireImage(`${c.id}-${i}`);
        return `<div class="case-bd">
          <div class="num-case">${i + 1}</div>
          <a class="dessin-case" href="#atelier-${c.id}--${i}">${img ? `<img src="${img}" alt="${esc(fr(T.case_))} ${i + 1}">` : `<span>${ic("crayon")} ${esc(fr(T.dessiner))}</span>`}</a>
          <label class="petit">${esc(fr(T.bulle))}<input data-at-case="${i}" data-at-cle="bulle" value="${esc(k.bulle)}" maxlength="80"></label>
          <label class="petit">${esc(fr(T.legendeCase))}<input data-at-case="${i}" data-at-cle="recit" value="${esc(k.recit)}" maxlength="120"></label>
          ${cases.length > 3 ? `<button class="btn-discret" data-at-suppr-case="${i}">${esc(fr(T.supprimer))}</button>` : ""}
        </div>`;
      }).join("")}
      ${cases.length < 6 ? `<button class="case-bd ajout-case" data-at-ajout-case>${ic("plus")}<b>${esc(fr(T.ajouterCase))}</b></button>` : ""}
      </div>
      ${piedEditeur()}`, "atelier", "atelier");
  }
  async function imageBD(c) {
    const cases = c.data.cases, col = 3, l = 420, h = 360, marge = 16;
    const lignes = Math.ceil(cases.length / col);
    const cv = document.createElement("canvas"); cv.width = col * (l + marge) + marge; cv.height = 60 + lignes * (h + marge) + marge;
    const x = cv.getContext("2d");
    x.fillStyle = "#fff"; x.fillRect(0, 0, cv.width, cv.height);
    x.fillStyle = "#2b2b2b"; x.font = "700 28px 'Comic Neue', sans-serif"; x.fillText(c.titre, marge, 40);
    for (let i = 0; i < cases.length; i++) {
      const cx = marge + (i % col) * (l + marge), cy = 60 + Math.floor(i / col) * (h + marge);
      x.strokeStyle = "#2b2b2b"; x.lineWidth = 3; x.strokeRect(cx, cy, l, h);
      const url = lireImage(`${c.id}-${i}`);
      if (url) await new Promise(r => { const im = new Image(); im.onload = () => { x.drawImage(im, cx + 2, cy + 2, l - 4, 240); r(); }; im.onerror = r; im.src = url; });
      x.fillStyle = "#2b2b2b"; x.font = "700 20px 'Comic Neue', sans-serif";
      if (cases[i].bulle) x.fillText("« " + cases[i].bulle.slice(0, 34) + " »", cx + 10, cy + 272);
      x.font = "18px 'Comic Neue', sans-serif";
      if (cases[i].recit) x.fillText(cases[i].recit.slice(0, 44), cx + 10, cy + 304);
    }
    return new Promise(r => cv.toBlob(r, "image/png"));
  }

  /* ---------- Export d'une création en image ---------- */
  async function exporter(c) {
    let blob = null;
    if (c.type === "carte") { const f = window.CARTES[c.data.fond]; blob = await svgVersPng($("#svg-carte"), f.l, f.h); }
    if (c.type === "frise") blob = await svgVersPng($("#svg-frise"), 1100, 460);
    if (c.type === "dessin") blob = await new Promise(r => $("#toile").toBlob(r, "image/png"));
    if (c.type === "bd") blob = await imageBD(c);
    if (c.type === "trace") {
      const url = lireImage(c.id);
      const cv = document.createElement("canvas"); cv.width = 1000; cv.height = 1300;
      const x = cv.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, 1000, 1300);
      if (url) await new Promise(r => { const im = new Image(); im.onload = () => { const k = Math.min(920 / im.width, 760 / im.height); x.drawImage(im, 40, 40, im.width * k, im.height * k); r(); }; im.src = url; });
      x.fillStyle = "#2b2b2b"; let y = 860;
      for (const [k, t] of [["quoi", T.quoi], ["dou", T.dou], ["pourquoi", T.pourquoi]]) {
        x.font = "700 26px 'Comic Neue', sans-serif"; x.fillText(fr(t), 40, y); y += 36;
        x.font = "24px 'Comic Neue', Andika, sans-serif"; x.fillText((c.data[k] || "").slice(0, 70), 40, y); y += 56;
      }
      blob = await new Promise(r => cv.toBlob(r, "image/png"));
    }
    if (blob) partager(blob, `${A.S.profil.prenom} - ${c.titre}`);
  }

  /* ---------- Événements ---------- */
  const idCourant = () => { const r = A.route(); return r.startsWith("atelier-") ? r.slice(8).split("--")[0] : null; };
  document.addEventListener("click", ev => {
    const b = ev.target.closest("button, a"); if (!b) return;
    const d = b.dataset;
    if (d.atNouveau) return nouvelle(d.atNouveau);
    const c = idCourant() && trouver(idCourant()); if (!c) return;
    const sous = A.route().split("--")[1];

    if (d.atPartager !== undefined) return exporter(c);
    if (d.atSupprimer !== undefined) {
      if (b.dataset.confirme !== "1") { b.dataset.confirme = "1"; b.textContent = "Touche encore pour supprimer"; return; }
      A.S.creations = creations().filter(x => x.id !== c.id); effacerImages(c.id); A.sauver(); return aller("atelier");
    }
    if (d.atAnnuler !== undefined) {
      if (c.type === "dessin" || sous != null) {
        const prev = pileDessin.pop(); if (!prev) return;
        const toile = $("#toile"), x = toile.getContext("2d"), img = new Image();
        img.onload = () => { x.drawImage(img, 0, 0); ecrireImage(sous != null ? `${c.id}-${sous}` : c.id, toile.toDataURL("image/jpeg", 0.85)); sauverCreation(c); };
        img.src = prev; return;
      }
      const prev = historique.pop(); if (!prev) return;
      c.data = JSON.parse(prev); sauverCreation(c); return ecran(A.route());
    }
    // carte
    if (d.atFond) { memoriser(c); c.data.fond = d.atFond; c.data.couleurs = {}; c.data.etiquettes = []; c.data.fleches = []; c.data.points = []; sauverCreation(c); return editeurCarte(c); }
    if (d.atOutil) { if ($("#at-etiq")) texteEtiq = $("#at-etiq").value; outilCarte = d.atOutil; return editeurCarte(c); }
    if (d.atCouleur) { couleurCarte = d.atCouleur; return editeurCarte(c); }
    // frise
    if (d.atLigne) { ligneFrise = d.atLigne; $$("[data-at-ligne]").forEach(x => x.setAttribute("aria-selected", x.dataset.atLigne === ligneFrise)); return; }
    if (d.atSupprEvt !== undefined) { memoriser(c); c.data.evenements.splice(+d.atSupprEvt, 1); sauverCreation(c); return editeurFrise(c); }
    // dessin
    if (d.atCrayon) { crayon = d.atCrayon; gomme = false; $$("[data-at-crayon]").forEach(x => x.setAttribute("aria-pressed", x.dataset.atCrayon === crayon)); $("[data-at-gomme]").setAttribute("aria-pressed", "false"); return; }
    if (d.atEpaisseur) { epaisseur = +d.atEpaisseur; $$("[data-at-epaisseur]").forEach(x => x.setAttribute("aria-pressed", +x.dataset.atEpaisseur === epaisseur)); return; }
    if (d.atGomme !== undefined) { gomme = !gomme; b.setAttribute("aria-pressed", gomme); $$("[data-at-crayon]").forEach(x => x.setAttribute("aria-pressed", !gomme && x.dataset.atCrayon === crayon)); return; }
    if (d.atViderDessin !== undefined) {
      if (b.dataset.confirme !== "1") { b.dataset.confirme = "1"; b.textContent = "Touche encore"; return; }
      const toile = $("#toile"), x = toile.getContext("2d"); pileDessin.push(toile.toDataURL()); x.fillStyle = "#fff"; x.fillRect(0, 0, toile.width, toile.height);
      ecrireImage(sous != null ? `${c.id}-${sous}` : c.id, toile.toDataURL("image/jpeg", 0.85)); sauverCreation(c); b.dataset.confirme = ""; b.textContent = fr(T.effacerTout); return;
    }
    // BD
    if (d.atAjoutCase !== undefined) { c.data.cases.push({ bulle: "", recit: "" }); sauverCreation(c); return editeurBD(c); }
    if (d.atSupprCase !== undefined) {
      const i = +d.atSupprCase;
      // décaler les dessins des cases suivantes
      for (let k = i; k < c.data.cases.length - 1; k++) { const suiv = lireImage(`${c.id}-${k + 1}`); if (suiv) ecrireImage(`${c.id}-${k}`, suiv); else try { localStorage.removeItem(`daspa-img-${c.id}-${k}`); } catch (e) {} }
      try { localStorage.removeItem(`daspa-img-${c.id}-${c.data.cases.length - 1}`); } catch (e) {}
      c.data.cases.splice(i, 1); sauverCreation(c); return editeurBD(c);
    }
  });

  document.addEventListener("input", ev => {
    const c = idCourant() && trouver(idCourant()); if (!c) return;
    const t = ev.target;
    if (t.id === "at-titre") { c.titre = t.value.trim() || fr(outil(c.type).nom); sauverCreation(c); }
    if (t.dataset.atLegende) { c.data.legende[t.dataset.atLegende] = t.value; sauverCreation(c); }
    if (t.dataset.atChamp) { c.data[t.dataset.atChamp] = t.value; sauverCreation(c); }
    if (t.dataset.atCase !== undefined) { c.data.cases[+t.dataset.atCase][t.dataset.atCle] = t.value; sauverCreation(c); }
    if (t.id === "at-etiq") texteEtiq = t.value;
  });
  // La légende se redessine quand on quitte le champ (pas à chaque lettre)
  document.addEventListener("change", ev => {
    const c = idCourant() && trouver(idCourant()); if (!c) return;
    if (ev.target.dataset.atLegende && c.type === "carte") { const z = $(".zone-carte"); if (z) { z.innerHTML = svgCarte(c, true); brancherCarte(c); } }
    if (ev.target.id === "at-photo" && ev.target.files[0]) chargerPhoto(c, ev.target.files[0]);
  });
  document.addEventListener("submit", ev => {
    if (ev.target.id !== "form-frise") return;
    ev.preventDefault();
    const c = trouver(idCourant()); if (!c) return;
    const annee = parseInt($("#at-annee").value, 10), texteEvt = $("#at-evt").value.trim();
    if (isNaN(annee) || !texteEvt) return;
    memoriser(c); c.data.evenements.push({ annee, texte: texteEvt, ligne: ligneFrise }); sauverCreation(c); editeurFrise(c);
    setTimeout(() => { const a = $("#at-annee"); if (a) a.focus(); }, 0);
  });

  window.ATELIER = { ecran };
  if (A.route().startsWith("atelier")) A.rendre();
})();
