/* Accueil : « Comment tu te sens ? » (pavé énergie × moral) et « Hier, j'ai… » (phrase en 3 touches → story). */
(function () {
  "use strict";
  const A = window.APP;
  const { ic, esc, fr, tr, ligneTrad, texte } = A;
  const $ = (s, el) => (el || document).querySelector(s);

  A.ajouterIcones({
    cuisine: '<path d="M10 11v5"/><path d="M14 11v5"/><path d="M6 12.65c0-.457-.316-.844-.727-1.041A4 4 0 017.52 4.034a1.53 1.53 0 001.367-.547 4 4 0 016.225 0 1.53 1.53 0 001.367.547 4 4 0 012.248 7.575c-.411.197-.727.584-.727 1.04V19a2 2 0 01-2 2H8a2 2 0 01-2-2z"/><path d="M6 16h12"/>',
    pas: '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/>',
    tel: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    film: '<path d="m12.296 3.464 3.02 3.956"/><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m6.18 5.276 3.1 3.899"/>',
    aider: '<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"/><path d="m2 15 6 6"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"/>',
    de: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/><path d="M12 12h.01"/>',
    lire: '<path d="M12 5v16"/><path d="M16 13h2"/><path d="M16 9h2"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/><path d="M6 13h2"/><path d="M6 9h2"/>',
    agrandir: '<path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/>',
    perso: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    arbres: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
    ville: '<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
    ecole: '<path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 4.933V21"/><path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/><path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/><path d="M6 4.933V21"/><circle cx="12" cy="9" r="2"/>'
  });

  /* ---------- Textes ---------- */
  const T = {
    energie: { fr: "Énergie", uk: "Енергія", pl: "Energia", es: "Energía", rn: null },
    moral: { fr: "Moral", uk: "Настрій", pl: "Nastrój", es: "Ánimo", rn: null },
    aPlat: { fr: "à plat", uk: "без сил", pl: "bez sił", es: "sin energía", rn: null },
    aFond: { fr: "à fond", uk: "повно сил", pl: "pełno energii", es: "a tope", rn: null },
    pasTop: { fr: "pas top", uk: "не дуже", pl: "nie najlepiej", es: "no muy bien", rn: null },
    bien: { fr: "bien", uk: "добре", pl: "dobrze", es: "bien", rn: null },
    glisse: { fr: "GLISSE le point là où tu es aujourd'hui.", uk: "ПЕРЕТЯГНИ точку туди, де ти сьогодні.", pl: "PRZESUŃ punkt tam, gdzie jesteś dzisiaj.", es: "DESLIZA el punto donde estás hoy.", rn: null },
    pasDire: { fr: "Je préfère ne pas dire", uk: "Я не хочу казати", pl: "Wolę nie mówić", es: "Prefiero no decirlo", rn: null },
    merciPasDire: { fr: "D'accord. Tu peux changer quand tu veux.", uk: "Гаразд. Можеш змінити будь-коли.", pl: "W porządku. Możesz zmienić, kiedy chcesz.", es: "Vale. Puedes cambiarlo cuando quieras.", rn: null },
    quoi: { fr: "Quoi ?", uk: "Що?", pl: "Co?", es: "¿Qué?", rn: null },
    avecQui: { fr: "Avec qui ?", uk: "З ким?", pl: "Z kim?", es: "¿Con quién?", rn: null },
    ou: { fr: "Où ?", uk: "Де?", pl: "Gdzie?", es: "¿Dónde?", rn: null },
    facultatif: { fr: "facultatif", uk: "необов'язково", pl: "opcjonalnie", es: "opcional", rn: null },
    fond: { fr: "Fond", uk: "Фон", pl: "Tło", es: "Fondo", rn: null },
    montrer: { fr: "Montrer en grand", uk: "Показати на весь екран", pl: "Pokaż na pełnym ekranie", es: "Mostrar en grande", rn: null },
    defi: { fr: "Défi : LIS ta phrase à un voisin.", uk: "Виклик: ПРОЧИТАЙ своє речення сусідові.", pl: "Wyzwanie: PRZECZYTAJ swoje zdanie koledze obok.", es: "Reto: LEE tu frase a un compañero.", rn: null },
    cestFait: { fr: "C'est fait !", uk: "Готово!", pl: "Zrobione!", es: "¡Hecho!", rn: null },
    fermer: { fr: "Fermer", uk: "Закрити", pl: "Zamknij", es: "Cerrar", rn: null },
    commence: { fr: "TOUCHE une activité pour commencer ta phrase.", uk: "ТОРКНИСЬ заняття, щоб почати речення.", pl: "DOTKNIJ zajęcia, aby zacząć zdanie.", es: "TOCA una actividad para empezar tu frase.", rn: null }
  };

  // Zones du pavé (x = moral 0→1, y = énergie 0→1 vers le haut)
  const ZONES = {
    fond: { couleur: "#fde9cc", t: { fr: "J'ai la pêche !", uk: "Я сповнений сил!|Я сповнена сил!", pl: "Mam mnóstwo energii!", es: "¡Tengo mucha energía!", rn: null } },
    tendu: { couleur: "#fde3dc", t: { fr: "Je suis stressé.|Je suis stressée.", uk: "Я напружений.|Я напружена.", pl: "Jestem zestresowany.|Jestem zestresowana.", es: "Estoy estresado.|Estoy estresada.", rn: null } },
    plat: { couleur: "#dceaf7", t: { fr: "Je suis à plat.", uk: "У мене немає сил.", pl: "Nie mam siły.", es: "Estoy agotado.|Estoy agotada.", rn: null } },
    chill: { couleur: "#e3f1ea", t: { fr: "Ça va tranquille.", uk: "Усе спокійно.", pl: "Jest spokojnie.", es: "Estoy tranquilo.|Estoy tranquila.", rn: null } },
    milieu: { couleur: "#ffffff", t: { fr: "Ça va.", uk: "Нормально.", pl: "W porządku.", es: "Estoy bien.", rn: null } }
  };
  function zone(x, y) {
    if (Math.hypot(x - 0.5, y - 0.5) < 0.12) return "milieu";
    if (y >= 0.5) return x >= 0.5 ? "fond" : "tendu";
    return x >= 0.5 ? "chill" : "plat";
  }

  // Phrase « Hier, … » : chaque morceau est complet dans chaque langue (masculin|féminin)
  const DEBUT = { fr: "Hier, ", uk: "Учора я ", pl: "Wczoraj ", es: "Ayer " };
  const QUOI = [
    { id: "sport", icone: "ballon", t: { fr: "j'ai fait du sport", uk: "займався спортом|займалася спортом", pl: "uprawiałem sport|uprawiałam sport", es: "hice deporte", rn: null } },
    { id: "musique", icone: "musique", t: { fr: "j'ai écouté de la musique", uk: "слухав музику|слухала музику", pl: "słuchałem muzyki|słuchałam muzyki", es: "escuché música", rn: null } },
    { id: "cuisine", icone: "cuisine", t: { fr: "j'ai cuisiné", uk: "готував їжу|готувала їжу", pl: "gotowałem|gotowałam", es: "cociné", rn: null } },
    { id: "lire", icone: "lire", t: { fr: "j'ai lu", uk: "читав|читала", pl: "czytałem|czytałam", es: "leí", rn: null } },
    { id: "film", icone: "film", t: { fr: "j'ai regardé un film", uk: "дивився фільм|дивилася фільм", pl: "oglądałem film|oglądałam film", es: "vi una película", rn: null } },
    { id: "jeu", icone: "de", t: { fr: "j'ai joué à un jeu", uk: "грав у гру|грала у гру", pl: "grałem w grę|grałam w grę", es: "jugué a un juego", rn: null } },
    { id: "promener", icone: "pas", t: { fr: "je me suis promené|je me suis promenée", uk: "гуляв|гуляла", pl: "spacerowałem|spacerowałam", es: "di un paseo", rn: null } },
    { id: "dessiner", icone: "crayon", t: { fr: "j'ai dessiné", uk: "малював|малювала", pl: "rysowałem|rysowałam", es: "dibujé", rn: null } },
    { id: "appeler", icone: "tel", t: { fr: "j'ai téléphoné à quelqu'un", uk: "комусь телефонував|комусь телефонувала", pl: "dzwoniłem do kogoś|dzwoniłam do kogoś", es: "llamé a alguien", rn: null } },
    { id: "aider", icone: "aider", t: { fr: "j'ai aidé quelqu'un", uk: "комусь допомагав|комусь допомагала", pl: "pomagałem komuś|pomagałam komuś", es: "ayudé a alguien", rn: null } },
    { id: "devoirs", icone: "dico", t: { fr: "j'ai fait mes devoirs", uk: "робив домашнє завдання|робила домашнє завдання", pl: "odrabiałem lekcje|odrabiałam lekcje", es: "hice los deberes", rn: null } },
    { id: "repos", icone: "lit", t: { fr: "je me suis reposé|je me suis reposée", uk: "відпочивав|відпочивала", pl: "odpoczywałem|odpoczywałam", es: "descansé", rn: null } }
  ];
  const AVEC = [
    { id: "seul", icone: "perso", t: { fr: "seul|seule", uk: "сам|сама", pl: "sam|sama", es: "solo|sola", rn: null } },
    { id: "famille", icone: "users", t: { fr: "avec ma famille", uk: "з родиною", pl: "z rodziną", es: "con mi familia", rn: null } },
    { id: "amis", icone: "users", t: { fr: "avec des amis", uk: "з друзями", pl: "z przyjaciółmi", es: "con amigos", rn: null } },
    { id: "classe", icone: "ecole", t: { fr: "avec des camarades de classe", uk: "з однокласниками", pl: "z kolegami z klasy", es: "con compañeros de clase", rn: null } }
  ];
  const OU = [
    { id: "maison", icone: "house", t: { fr: "à la maison", uk: "вдома", pl: "w domu", es: "en casa", rn: null } },
    { id: "dehors", icone: "arbres", t: { fr: "dehors", uk: "надворі", pl: "na dworze", es: "fuera", rn: null } },
    { id: "ville", icone: "ville", t: { fr: "en ville", uk: "у місті", pl: "w mieście", es: "en la ciudad", rn: null } },
    { id: "ecole", icone: "ecole", t: { fr: "à l'école", uk: "у школі", pl: "w szkole", es: "en la escuela", rn: null } }
  ];
  const FONDS = [
    { id: "f1", style: "background:#6a4c96;color:#fff" },
    { id: "f2", style: "background:#a85d00;color:#fff" },
    { id: "f3", style: "background:#1d5f91;color:#fff" },
    { id: "f4", style: "background:#2b6e45;color:#fff" },
    { id: "f5", style: "background:#fff6e5 repeating-linear-gradient(45deg,transparent 0 18px,rgba(168,93,0,.12) 18px 36px);color:#2b2b2b" },
    { id: "f6", style: "background:#ffffff radial-gradient(rgba(43,43,43,.14) 2px,transparent 2px) 0 0/22px 22px;color:#2b2b2b" }
  ];

  const genre = () => (A.S.profil && A.S.profil.genre === "f") ? 1 : 0;
  const choix = s => s == null ? "" : String(s).split("|")[Math.min(genre(), String(s).split("|").length - 1)];
  const aujourdhui = () => new Date().toISOString().slice(0, 10);
  const journal = () => { const S = A.S; S.journal[aujourdhui()] = S.journal[aujourdhui()] || {}; return S.journal[aujourdhui()]; };

  function phrase(j, l) {
    const q = QUOI.find(x => x.id === j.hierQuoi); if (!q || (l !== "fr" && !q.t[l])) return null;
    const parts = [choix(q.t[l])];
    const a = AVEC.find(x => x.id === j.hierAvec); if (a && a.t[l]) parts.push(choix(a.t[l]));
    const o = OU.find(x => x.id === j.hierOu); if (o && o.t[l]) parts.push(choix(o.t[l]));
    const debut = DEBUT[l];
    if (!debut) return null;
    return debut + parts.join(" ") + ".";
  }

  /* ---------- Rendu ---------- */
  function blocHumeur() {
    const j = journal(); const h = j.humeur;
    const pos = h && typeof h === "object" ? h : null;
    const z = pos ? ZONES[pos.zone] : null;
    return `<section class="bloc">
      <h2>${esc(fr(A.D.ui.humeur))}${ligneTrad(A.D.ui.humeur)}</h2>
      <div class="humeur">
        <div class="pave-humeur-cadre">
          <span class="axe axe-y">${esc(fr(T.energie))}</span>
          <div class="pave-humeur" id="pave-humeur" role="slider" aria-label="${esc(fr(T.glisse))}" tabindex="0">
            <span class="q q-tendu"></span><span class="q q-fond"></span><span class="q q-plat"></span><span class="q q-chill"></span>
            <span class="lbl l-haut">${esc(fr(T.aFond))}</span><span class="lbl l-bas">${esc(fr(T.aPlat))}</span>
            <span class="lbl l-gauche">${esc(fr(T.pasTop))}</span><span class="lbl l-droite">${esc(fr(T.bien))}</span>
            <span class="point" id="point-humeur" style="${pos ? `left:${pos.x * 100}%;top:${(1 - pos.y) * 100}%` : "left:50%;top:50%;opacity:.35"}"></span>
          </div>
          <span class="axe axe-x">${esc(fr(T.moral))}</span>
        </div>
        <div class="humeur-texte" id="humeur-texte">${texteHumeur(h)}</div>
      </div>
    </section>`;
  }
  function texteHumeur(h) {
    if (h === "pasdire") return `<p class="consigne-texte">${texte(T.merciPasDire)}</p>${boutonPasDire(true)}`;
    if (!h || typeof h !== "object") return `<p class="consigne-texte">${texte(T.glisse, { gras: true })}</p>${boutonPasDire(false)}`;
    const z = ZONES[h.zone];
    return `<p class="expression">${esc(fr(z.t))}</p>${ligneTrad(z.t)}
      <div class="ligne-sons">${A.boutonsSon(z.t)}</div>${boutonPasDire(false)}`;
  }
  const boutonPasDire = actif => `<button class="btn-discret" data-humeur-pasdire aria-pressed="${actif}">${esc(fr(T.pasDire))}</button>`;

  function etiquettes(liste, cle, j, titre, facultatif) {
    return `<div class="groupe-etiq"><h3>${esc(fr(titre))}${facultatif ? ` <span class="petit">(${esc(fr(T.facultatif))})</span>` : ""}${ligneTrad(titre)}</h3>
      <div class="etiquettes">${liste.map(x => `<button class="etiq" data-hier-${cle}="${x.id}" aria-pressed="${j["hier" + cle[0].toUpperCase() + cle.slice(1)] === x.id}">${ic(x.icone)}<span>${esc(choix(x.t.fr))}</span></button>`).join("")}</div></div>`;
  }
  function story(j, grand) {
    const l = A.langue();
    const p = phrase(j, "fr");
    const t = l !== "fr" ? phrase(j, l) : null;
    const f = FONDS.find(x => x.id === j.hierFond) || FONDS[0];
    return `<div class="story ${grand ? "grande" : ""}" style="${f.style}">
      <span class="story-tete">${esc(A.S.profil.prenom)} · ${new Date().toLocaleDateString("fr-BE", { weekday: "long", day: "numeric", month: "long" })}</span>
      <p class="story-phrase">${esc(p)}</p>
      ${t && A.S.trad ? `<p class="story-trad" lang="${l}">${esc(t)}</p>` : ""}
      ${j.hierDefi ? `<span class="story-badge">${ic("ok")} ${esc(fr(T.cestFait))}</span>` : ""}
    </div>`;
  }
  function blocHier() {
    const j = journal();
    const p = phrase(j, "fr");
    return `<section class="bloc">
      <h2>${esc(fr(A.D.ui.hier))}${ligneTrad(A.D.ui.hier)}</h2>
      <div class="hier">
        <div class="hier-choix">
          ${etiquettes(QUOI, "quoi", j, T.quoi)}
          ${j.hierQuoi ? etiquettes(AVEC, "avec", j, T.avecQui, true) + etiquettes(OU, "ou", j, T.ou, true) : `<p class="petit">${texte(T.commence, { gras: true })}</p>`}
        </div>
        ${p ? `<div class="hier-story">
          ${story(j)}
          <div class="fonds">${FONDS.map(f => `<button class="pastille-fond" data-hier-fond="${f.id}" style="${f.style}" aria-pressed="${(j.hierFond || "f1") === f.id}" aria-label="${esc(fr(T.fond))}"></button>`).join("")}</div>
          <div class="ligne-sons">
            <button class="rond" data-dire="${esc(p)}" data-lg="fr" aria-label="Écouter">${ic("son")}</button>
            <button class="btn btn-secondaire" data-hier-grand>${ic("agrandir")} ${esc(fr(T.montrer))}</button>
          </div>
          <p class="consigne-texte" style="margin-top:12px">${texte(T.defi, { gras: true })}</p>
          <button class="btn ${j.hierDefi ? "btn-secondaire" : "btn-principal"}" data-espace="atelier" data-hier-defi>${ic("ok")} ${esc(fr(T.cestFait))}</button>
        </div>` : ""}
      </div>
    </section>`;
  }

  /* ---------- Pavé : glisser le point ---------- */
  function brancher() {
    const pave = $("#pave-humeur"); if (!pave) return;
    let actif = false;
    const placer = ev => {
      const r = pave.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, 1 - (ev.clientY - r.top) / r.height));
      const pt = $("#point-humeur"); pt.style.left = x * 100 + "%"; pt.style.top = (1 - y) * 100 + "%"; pt.style.opacity = 1;
      const h = { x: +x.toFixed(2), y: +y.toFixed(2), zone: zone(x, y) };
      journal().humeur = h;
      pave.dataset.zone = h.zone;
      $("#humeur-texte").innerHTML = texteHumeur(h);
      return h;
    };
    pave.addEventListener("pointerdown", ev => { actif = true; pave.setPointerCapture(ev.pointerId); placer(ev); });
    pave.addEventListener("pointermove", ev => { if (actif) placer(ev); });
    const fin = ev => { if (!actif) return; actif = false; const h = placer(ev); A.sauver(); A.parler(fr(ZONES[h.zone].t), "fr"); };
    pave.addEventListener("pointerup", fin); pave.addEventListener("pointercancel", () => { actif = false; A.sauver(); });
    const h = journal().humeur; if (h && h.zone) pave.dataset.zone = h.zone;
  }

  /* ---------- Plein écran ---------- */
  function ouvrirGrand() {
    const d = document.createElement("div");
    d.className = "story-plein"; d.id = "story-plein";
    d.innerHTML = story(journal(), true) + `<button class="btn btn-secondaire fermer-story" data-hier-fermer>${ic("x")} ${esc(fr(T.fermer))}</button>`;
    document.body.appendChild(d);
  }

  document.addEventListener("click", ev => {
    const b = ev.target.closest("button"); if (!b || !A.S.profil) return;
    const d = b.dataset, j = journal();
    let maj = false;
    if (d.humeurPasdire !== undefined) { j.humeur = j.humeur === "pasdire" ? null : "pasdire"; maj = true; }
    if (d.hierQuoi) { j.hierQuoi = j.hierQuoi === d.hierQuoi ? null : d.hierQuoi; j.hierDefi = false; maj = true; }
    if (d.hierAvec) { j.hierAvec = j.hierAvec === d.hierAvec ? null : d.hierAvec; j.hierDefi = false; maj = true; }
    if (d.hierOu) { j.hierOu = j.hierOu === d.hierOu ? null : d.hierOu; j.hierDefi = false; maj = true; }
    if (d.hierFond) { j.hierFond = d.hierFond; maj = true; }
    if (d.hierDefi !== undefined) { j.hierDefi = !j.hierDefi; maj = true; }
    if (d.hierGrand !== undefined) return ouvrirGrand();
    if (d.hierFermer !== undefined) { const p = $("#story-plein"); if (p) p.remove(); return; }
    if (maj) {
      A.sauver();
      const y = window.scrollY; A.rendre(); window.scrollTo(0, y);
      if ((d.hierQuoi || d.hierAvec || d.hierOu) && phrase(j, "fr")) A.parler(phrase(j, "fr"), "fr");
    }
  });

  window.ACCUEIL = { blocHumeur, blocHier, brancher };
  if (A.route() === "accueil" || A.route() === "") A.rendre();
})();
