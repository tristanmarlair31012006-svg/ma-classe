/* Leçons : l'élève choisit sa matière (ou un peu de tout), suit des séquences
   (ressources, activités, mini-tests, synthèses) et passe un test à la fin de chaque chapitre.
   Évaluation = avancement (étapes faites) + maîtrise (guide de maîtrise, d'après les mini-tests).
   Le contenu est dans js/parcours.js. Tout reste sur l'iPad. */
(function () {
  "use strict";
  const A = window.APP;
  const P = window.PARCOURS || { chapitres: [], sequences: [], tests: [] };
  const { ic, esc, fr, ligneTrad, texte, cadre, aller, boutonsSon } = A;
  const $ = (s, el) => (el || document).querySelector(s);

  /* ---------- Textes ---------- */
  const T = {
    choisis: { fr: "Aujourd'hui, je travaille…", uk: "Сьогодні я працюю над…", pl: "Dzisiaj pracuję nad…", es: "Hoy trabajo en…", rn: null },
    choisisConsigne: { fr: "CHOISIS une matière. Tu peux aussi faire un peu de tout.", uk: "ВИБЕРИ предмет. Можна також потроху всього.", pl: "WYBIERZ przedmiot. Możesz też zrobić trochę wszystkiego.", es: "ELIGE una asignatura. También puedes hacer un poco de todo.", rn: null },
    tout: { fr: "Un peu de tout", uk: "Потроху всього", pl: "Trochę wszystkiego", es: "Un poco de todo", rn: null },
    toutBut: { fr: "Une étape dans chaque matière", uk: "Один крок з кожного предмета", pl: "Jeden krok z każdego przedmiotu", es: "Un paso de cada asignatura", rn: null },
    avancement: { fr: "Avancement", uk: "Поступ", pl: "Postęp", es: "Avance", rn: null },
    maitrise: { fr: "Maîtrise", uk: "Засвоєння", pl: "Opanowanie", es: "Dominio", rn: null },
    guide: { fr: "Guide de maîtrise", uk: "Що я маю вміти", pl: "Co mam umieć", es: "Lo que tengo que saber hacer", rn: null },
    guideConsigne: { fr: "TOUCHE une couleur pour dire où tu en es.", uk: "ТОРКНИСЬ кольору, щоб показати, де ти зараз.", pl: "DOTKNIJ koloru, żeby pokazać, gdzie jesteś.", es: "TOCA un color para decir cómo vas.", rn: null },
    dejaVu: { fr: "Déjà vu en classe", uk: "Уже бачили в класі", pl: "Już było na lekcji", es: "Ya visto en clase", rn: null },
    prochaine: { fr: "Prochaine étape", uk: "Наступний крок", pl: "Następny krok", es: "Siguiente paso", rn: null },
    commencer: { fr: "Commencer", uk: "Почати", pl: "Zacznij", es: "Empezar", rn: null },
    refaire: { fr: "Refaire", uk: "Повторити", pl: "Powtórz", es: "Repetir", rn: null },
    revoir: { fr: "Revoir", uk: "Переглянути", pl: "Zobacz znowu", es: "Volver a ver", rn: null },
    fait: { fr: "Fait", uk: "Зроблено", pl: "Zrobione", es: "Hecho", rn: null },
    termine: { fr: "Terminé", uk: "Завершено", pl: "Ukończone", es: "Terminado", rn: null },
    etapes: { fr: "Les étapes", uk: "Кроки", pl: "Kroki", es: "Los pasos", rn: null },
    objectif: { fr: "Objectif", uk: "Мета", pl: "Cel", es: "Objetivo", rn: null },
    chapitre: { fr: "Chapitre", uk: "Розділ", pl: "Rozdział", es: "Capítulo", rn: null },
    ressources: { fr: "Mes ressources", uk: "Мої матеріали", pl: "Moje materiały", es: "Mis recursos", rn: null },
    ressource: { fr: "Ressource", uk: "Матеріал", pl: "Materiał", es: "Recurso", rn: null },
    activite: { fr: "Activité", uk: "Завдання", pl: "Zadanie", es: "Actividad", rn: null },
    minitest: { fr: "Mini-test", uk: "Міні-тест", pl: "Mini-test", es: "Mini-prueba", rn: null },
    synthese: { fr: "Synthèse", uk: "Підсумок", pl: "Podsumowanie", es: "Síntesis", rn: null },
    bilan: { fr: "Test de fin de chapitre", uk: "Тест у кінці розділу", pl: "Test na koniec rozdziału", es: "Prueba de fin de capítulo", rn: null },
    bilanVerrou: { fr: "Termine d'abord toutes les séquences du chapitre.", uk: "Спочатку закінчи всі частини розділу.", pl: "Najpierw skończ wszystkie części rozdziału.", es: "Primero termina todas las partes del capítulo.", rn: null },
    moi: { fr: "Moi", uk: "Я", pl: "Ja", es: "Yo", rn: null },
    test: { fr: "Test", uk: "Тест", pl: "Test", es: "Prueba", rn: null },
    jeMaitrise: { fr: "Je maîtrise", uk: "Я вмію", pl: "Umiem", es: "Lo domino", rn: null },
    presque: { fr: "Presque", uk: "Майже", pl: "Prawie", es: "Casi", rn: null },
    pasEncore: { fr: "Pas encore", uk: "Ще ні", pl: "Jeszcze nie", es: "Todavía no", rn: null },
    pasTeste: { fr: "Pas encore testé", uk: "Ще не перевірено", pl: "Jeszcze nie sprawdzone", es: "Aún sin prueba", rn: null },
    jaiLu: { fr: "J'ai lu", uk: "Я прочитав|Я прочитала", pl: "Przeczytałem|Przeczytałam", es: "Lo he leído", rn: null },
    valider: { fr: "Valider", uk: "Підтвердити", pl: "Zatwierdź", es: "Validar", rn: null },
    resultatVoir: { fr: "Voir mon résultat", uk: "Побачити результат", pl: "Zobacz wynik", es: "Ver mi resultado", rn: null },
    resultat: { fr: "Ton résultat", uk: "Твій результат", pl: "Twój wynik", es: "Tu resultado", rn: null },
    bonnes: { fr: "bonnes réponses", uk: "правильних відповідей", pl: "dobrych odpowiedzi", es: "respuestas correctas", rn: null },
    meilleur: { fr: "Meilleur résultat", uk: "Найкращий результат", pl: "Najlepszy wynik", es: "Mejor resultado", rn: null },
    testConsigne: { fr: "Un mini-test sert à voir ce que tu sais déjà. Tu peux le refaire.", uk: "Міні-тест показує, що ти вже знаєш. Його можна пройти ще раз.", pl: "Mini-test pokazuje, co już umiesz. Możesz go powtórzyć.", es: "Una mini-prueba sirve para ver lo que ya sabes. Puedes repetirla.", rn: null },
    bilanConsigne: { fr: "Ce test montre ce que tu as appris dans tout le chapitre.", uk: "Цей тест показує, чого ти навчився в усьому розділі.|Цей тест показує, чого ти навчилася в усьому розділі.", pl: "Ten test pokazuje, czego nauczyłeś się w całym rozdziale.|Ten test pokazuje, czego nauczyłaś się w całym rozdziale.", es: "Esta prueba muestra lo que has aprendido en todo el capítulo.", rn: null },
    questions: { fr: "questions", uk: "питань", pl: "pytań", es: "preguntas", rn: null },
    bonne: { fr: "Bonne réponse.", uk: "Правильно.", pl: "Dobra odpowiedź.", es: "Respuesta correcta.", rn: null },
    laBonne: { fr: "La bonne réponse est :", uk: "Правильна відповідь:", pl: "Poprawna odpowiedź:", es: "La respuesta correcta es:", rn: null },
    retourSeq: { fr: "Retour à la séquence", uk: "Назад до теми", pl: "Wróć do tematu", es: "Volver al tema", rn: null },
    retourMatiere: { fr: "Retour à la matière", uk: "Назад до предмета", pl: "Wróć do przedmiotu", es: "Volver a la asignatura", rn: null },
    rien: { fr: "Tout est fini ici. Bravo !", uk: "Тут усе зроблено. Молодець!", pl: "Tu wszystko zrobione. Brawo!", es: "Aquí todo está hecho. ¡Bien!", rn: null }
  };
  const TYPE_ICONE = { ressource: "lire", activite: "jouer", minitest: "cible", synthese: "etoile", bilan: "trophee" };

  /* ---------- État (dans le profil de la tablette) ---------- */
  function E() {
    const S = A.S;
    S.parcours = S.parcours || {};
    const p = S.parcours;
    p.faits = p.faits || {}; p.tests = p.tests || {}; p.auto = p.auto || {}; p.jours = p.jours || {};
    return p;
  }
  const aujourdhui = () => new Date().toISOString().slice(0, 10);
  function noterJour(choix) {
    const j = E().jours[aujourdhui()] = E().jours[aujourdhui()] || [];
    if (!j.includes(choix)) { j.push(choix); A.sauver(); }
  }

  /* ---------- Lecture du parcours ---------- */
  const discipline = id => A.D.disciplines.find(d => d.id === id);
  const seq = id => P.sequences.find(s => s.id === id);
  const test = id => P.tests.find(t => t.id === id);
  const chapitresDe = d => P.chapitres.filter(c => c.discipline === d);
  const seqsDe = ch => ch.sequences.map(seq).filter(Boolean);
  const chapitreDeSeq = id => P.chapitres.find(c => c.sequences.includes(id));
  const chapitreDeBilan = id => P.chapitres.find(c => c.bilan === id);
  const titreEtape = e => e.titre ? fr(e.titre)
    : e.type === "activite" ? fr((A.D.activites.find(a => a.id === e.activite) || {}).titre)
    : e.type === "minitest" ? fr((test(e.test) || {}).titre) : "";

  function etapeFaite(s, i) {
    const e = s.etapes[i];
    if (e.type === "activite") return !!(A.S.progres[e.activite] || {}).fini;
    if (e.type === "minitest") return !!E().tests[e.test];
    return !!E().faits[s.id + ":" + i];
  }
  function avSeq(s) {
    const n = s.etapes.length;
    if (!n) return null;
    const f = s.etapes.filter((_, i) => etapeFaite(s, i)).length;
    return { f, n, pct: Math.round((f / n) * 100) };
  }
  const seqFinie = s => { const a = avSeq(s); return !!a && a.f === a.n; };
  function bilanOuvert(ch) {
    const pleines = seqsDe(ch).filter(s => s.etapes.length);
    return pleines.length > 0 && pleines.every(seqFinie);
  }
  /* Niveau d'un critère d'après les tests : meilleur taux de réussite sur les questions de ce critère. */
  function niveauTest(critId) {
    let best = null;
    P.tests.forEach(t => {
      const r = E().tests[t.id];
      if (r && r.criteres && r.criteres[critId] != null) best = Math.max(best == null ? 0 : best, r.criteres[critId]);
    });
    if (best == null) return null;
    return best >= 0.8 ? "vert" : best >= 0.5 ? "orange" : "rouge";
  }
  function avDisc(d) {
    let f = 0, n = 0, crit = 0, critOk = 0;
    chapitresDe(d).forEach(ch => {
      seqsDe(ch).forEach(s => {
        const a = avSeq(s); if (a) { f += a.f; n += a.n; }
        s.criteres.forEach(c => { crit++; if (niveauTest(c.id) === "vert") critOk++; });
      });
      if (ch.bilan && test(ch.bilan) && seqsDe(ch).some(s => s.etapes.length)) { n++; if (E().tests[ch.bilan]) f++; }
    });
    return n ? { f, n, pct: Math.round((f / n) * 100), crit, critOk } : null;
  }
  /* Première étape pas encore faite d'une matière (dans l'ordre du parcours). */
  function prochaine(d) {
    for (const ch of chapitresDe(d)) {
      for (const s of seqsDe(ch)) {
        const i = s.etapes.findIndex((_, k) => !etapeFaite(s, k));
        if (i >= 0) return { s, i, e: s.etapes[i] };
      }
      if (bilanOuvert(ch) && ch.bilan && !E().tests[ch.bilan]) return { bilan: ch.bilan, ch };
    }
    return null;
  }

  /* ---------- Morceaux d'interface ---------- */
  function lienEtape(s, i) {
    const e = s.etapes[i];
    if (e.type === "activite") return "act-" + e.activite;
    if (e.type === "minitest") return "test-" + e.test;
    return "res-" + s.id + "--" + i;
  }
  const barre = pct => `<span class="barre" role="img" aria-label="${pct} %"><i style="width:${pct}%"></i></span>`;
  const T2 = (k, opts) => texte(T[k], opts);
  function lampe(niv, petit) {
    if (!niv) return `<span class="lampe-niv vide ${petit ? "p" : ""}" title="${esc(fr(T.pasTeste))}"></span>`;
    const lbl = { vert: T.jeMaitrise, orange: T.presque, rouge: T.pasEncore }[niv];
    return `<span class="lampe-niv ${niv} ${petit ? "p" : ""}" title="${esc(fr(lbl))}">${niv === "vert" ? ic("ok") : niv === "rouge" ? ic("x") : "~"}</span>`;
  }
  function badgeNiveau(niv) {
    if (!niv) return `<span class="niv vide">${lampe(null, true)}${esc(fr(T.pasTeste))}</span>`;
    const lbl = { vert: T.jeMaitrise, orange: T.presque, rouge: T.pasEncore }[niv];
    return `<span class="niv ${niv}">${lampe(niv, true)}${esc(fr(lbl))}</span>`;
  }
  function entete(titreObj, retourHref, extra, cls) {
    return `<div class="bandeau ${cls || ""}">
      <a class="rond retour" href="#${retourHref}" aria-label="Retour">${ic("gauche")}</a>
      <div><h1>${esc(fr(titreObj))}</h1>${ligneTrad(titreObj)}</div>
      ${extra || ""}
    </div>`;
  }
  const exemple = o => o && o.exemple ? `<span class="etiquette exemple">Exemple</span>` : "";

  /* ---------- Écran 1 : choisir sa matière ---------- */
  function ecranChoix() {
    const tuiles = A.D.disciplines.map(d => {
      const av = avDisc(d.id);
      const pr = av ? prochaine(d.id) : null;
      if (!av) return `<div class="tuile matiere vide" data-espace="${d.id}"><span class="bande"></span><span class="corps-tuile">
          <h2>${esc(fr(d.t))}${ligneTrad(d.t)}</h2><p class="petit">${esc(fr(d.but))}</p>
          <span class="etiquette">${esc(fr(A.D.ui.bientot))}</span></span></div>`;
      return `<a class="tuile matiere" href="#disc-${d.id}" data-espace="${d.id}"><span class="bande"></span><span class="corps-tuile">
          <h2>${esc(fr(d.t))}${ligneTrad(d.t)}</h2><p class="petit">${esc(fr(d.but))}</p>
          <span class="ligne-av">${barre(av.pct)}<b>${av.pct} %</b></span>
          <span class="petit">${pr ? `${ic("droite")} ${esc(pr.bilan ? fr(T.bilan) : titreEtape(pr.e))}` : esc(fr(T.termine))}</span>
        </span>${ic("droite")}</a>`;
    }).join("");
    cadre(`
      <h1 style="margin-top:8px">${T2("choisis")}</h1>
      <p class="consigne-texte" style="margin-top:8px">${T2("choisisConsigne", { gras: true })}</p>
      <div class="tuiles matieres bloc">${tuiles}
        <a class="tuile matiere tout" href="#tout"><span class="bande"></span><span class="corps-tuile">
          <h2>${esc(fr(T.tout))}${ligneTrad(T.tout)}</h2><p class="petit">${esc(fr(T.toutBut))}</p>
        </span>${ic("droite")}</a>
      </div>`, "", "lecons");
  }

  /* ---------- Écran 2 : un peu de tout ---------- */
  function ecranTout() {
    noterJour("tout");
    const cartes = A.D.disciplines.map(d => {
      if (!avDisc(d.id)) return "";
      const pr = prochaine(d.id);
      if (!pr) return `<div class="carte-plate prochaine" data-espace="${d.id}"><span class="etiquette pastille-disc">${esc(fr(d.t))}</span><p>${ic("fini")} ${T2("rien")}</p></div>`;
      if (pr.bilan) return `<div class="carte-plate prochaine" data-espace="${d.id}"><span class="etiquette pastille-disc">${esc(fr(d.t))}</span>
          <h2>${ic("trophee")} ${esc(fr(T.bilan))}</h2>${ligneTrad(T.bilan)}
          <a class="btn btn-principal" href="#test-${pr.bilan}" data-retour="tout">${esc(fr(A.D.ui.continuer))} ${ic("droite")}</a></div>`;
      return `<div class="carte-plate prochaine" data-espace="${d.id}"><span class="etiquette pastille-disc">${esc(fr(d.t))}</span>
          <h2>${esc(fr(pr.s.titre))}</h2>${ligneTrad(pr.s.titre)}
          <p class="type-etape">${ic(TYPE_ICONE[pr.e.type])} <b>${esc(fr(T[pr.e.type]))}</b> · ${esc(titreEtape(pr.e))}</p>
          <a class="btn btn-principal" href="#${lienEtape(pr.s, pr.i)}" data-retour="tout">${esc(fr(A.D.ui.continuer))} ${ic("droite")}</a></div>`;
    }).join("");
    cadre(entete(T.tout, "lecons", "", "neutre") + `<div class="grille-prochaines bloc">${cartes}</div>`, "", "lecons");
  }

  /* ---------- Écran 3 : une matière (chapitres et séquences) ---------- */
  function ecranDisc(id) {
    const d = discipline(id);
    if (!d) return aller("lecons");
    noterJour(id);
    const av = avDisc(id);
    const resume = av ? `<div class="resume-av">
        <span>${esc(fr(T.avancement))} ${barre(av.pct)} <b>${av.pct} %</b></span>
        <span>${esc(fr(T.maitrise))} <b>${av.critOk} / ${av.crit}</b></span></div>` : "";
    const chapitres = chapitresDe(id).map((ch, ci) => {
      const seqs = seqsDe(ch).map((s, si) => {
        const a = avSeq(s);
        if (!a) return `<li class="ligne-seq bientot"><span class="num-seq">${si + 1}</span><span class="txt"><b>${esc(fr(s.titre))}</b>${ligneTrad(s.titre)}</span><span class="etiquette">${esc(fr(A.D.ui.bientot))}</span></li>`;
        const etat = a.f === a.n ? "fini" : a.f ? "en-cours" : "";
        return `<li><a class="ligne-seq ${etat}" href="#seq-${s.id}">
          <span class="num-seq">${a.f === a.n ? ic("ok") : si + 1}</span>
          <span class="txt"><b>${esc(fr(s.titre))}</b>${ligneTrad(s.titre)}
            <span class="ligne-av">${barre(a.pct)}<span class="petit">${a.f}/${a.n}</span>
            <span class="lampes" aria-label="${esc(fr(T.guide))}">${s.criteres.map(c => lampe(niveauTest(c.id), true)).join("")}</span></span></span>
          ${ic("droite")}</a></li>`;
      }).join("");
      const t = ch.bilan && test(ch.bilan);
      let bilan = "";
      if (t) {
        const r = E().tests[ch.bilan];
        bilan = bilanOuvert(ch)
          ? `<li><a class="ligne-seq bilan ${r ? "fini" : ""}" href="#test-${ch.bilan}" data-retour="disc-${id}"><span class="num-seq">${ic("trophee")}</span>
              <span class="txt"><b>${esc(fr(T.bilan))}</b>${ligneTrad(T.bilan)}${r ? `<span class="petit">${esc(fr(T.meilleur))} : ${r.meilleurNb}/${r.total}</span>` : ""}</span>${ic("droite")}</a></li>`
          : `<li class="ligne-seq bilan verrou"><span class="num-seq">${ic("verrou")}</span><span class="txt"><b>${esc(fr(T.bilan))}</b><span class="petit">${esc(fr(T.bilanVerrou))}</span>${ligneTrad(T.bilanVerrou)}</span></li>`;
      }
      const dejaVu = (ch.dejaVu || []).length ? `<div class="deja-vu"><h3>${ic("fini")} ${esc(fr(T.dejaVu))}</h3>${ligneTrad(T.dejaVu)}
          <ul>${ch.dejaVu.map(x => `<li>${texte(x)}</li>`).join("")}</ul></div>` : "";
      return `<section class="bloc chapitre">
        <h2><span class="petit">${esc(fr(T.chapitre))} ${ci + 1}</span> ${esc(fr(ch.titre))} ${exemple(ch)}</h2>${ligneTrad(ch.titre)}
        ${dejaVu}
        <ol class="parcours">${seqs}${bilan}</ol>
      </section>`;
    }).join("");
    const res = [];
    chapitresDe(id).forEach(ch => seqsDe(ch).forEach(s => s.etapes.forEach((e, i) => {
      if (e.type === "ressource" || e.type === "synthese") res.push(`<a class="ressource-lien" href="#res-${s.id}--${i}" data-retour="disc-${id}">${ic(TYPE_ICONE[e.type])}<span><b>${esc(fr(e.titre))}</b><span class="petit">${esc(fr(s.titre))}</span></span></a>`);
    })));
    cadre(entete(d.t, "lecons", resume) + (chapitres || `<p class="carte-plate bloc">${esc(fr(A.D.ui.bientot))}</p>`)
      + (res.length ? `<section class="bloc"><h2>${ic("lire")} ${esc(fr(T.ressources))}${ligneTrad(T.ressources)}</h2><div class="ressources">${res.join("")}</div></section>` : ""),
      id, "lecons");
  }

  /* ---------- Écran 4 : une séquence ---------- */
  function ecranSeq(id) {
    const s = seq(id);
    if (!s) return aller("lecons");
    const ch = chapitreDeSeq(id);
    const d = ch ? ch.discipline : "";
    if (!A.S.dernier || A.S.dernier.r !== "seq-" + id) { A.S.dernier = { r: "seq-" + id, t: Date.now() }; A.sauver(); }
    const a = avSeq(s) || { f: 0, n: 0, pct: 0 };
    const prochain = s.etapes.findIndex((_, i) => !etapeFaite(s, i));
    const pastilles = `<div class="etapes">${s.etapes.map((_, i) => `<i class="${etapeFaite(s, i) ? "fait" : i === prochain ? "actuel" : ""}"></i>`).join("")}</div>`;
    const etapes = s.etapes.map((e, i) => {
      const fait = etapeFaite(s, i);
      const lien = lienEtape(s, i);
      const lbl = fait ? (e.type === "ressource" || e.type === "synthese" ? T.revoir : T.refaire) : T.commencer;
      return `<li class="ligne-etape ${fait ? "fait" : ""} ${i === prochain ? "actuelle" : ""}">
        <span class="ico-etape">${fait ? ic("ok") : ic(TYPE_ICONE[e.type])}</span>
        <span class="txt"><span class="petit">${esc(fr(T[e.type]))}${fait ? ` · ${esc(fr(T.fait))}` : ""}</span><b>${esc(titreEtape(e))}</b></span>
        <a class="btn ${i === prochain ? "btn-principal" : "btn-secondaire"} btn-etape" href="#${lien}" data-retour="seq-${id}">${esc(fr(lbl))}</a>
      </li>`;
    }).join("");
    const auto = E().auto;
    const guide = s.criteres.map(c => {
      const v = auto[c.id];
      return `<li class="critere">
        <div class="txt-crit"><p>${texte(c.t)}</p><div class="sons">${boutonsSon(c.t)}</div></div>
        <div class="evals">
          <div class="eval"><span class="petit">${esc(fr(T.moi))}</span>
            <div class="mini-feux">${["vert", "orange", "rouge"].map(k => `<button class="mini-feu ${k}" data-auto="${c.id}:${k}" aria-pressed="${v === k}" aria-label="${esc(fr({ vert: T.jeMaitrise, orange: T.presque, rouge: T.pasEncore }[k]))}">${k === "vert" ? ic("ok") : k === "rouge" ? ic("x") : "~"}</button>`).join("")}</div></div>
          <div class="eval"><span class="petit">${esc(fr(T.test))}</span>${badgeNiveau(niveauTest(c.id))}</div>
        </div>
      </li>`;
    }).join("");
    cadre(entete(s.titre, ch ? "disc-" + ch.discipline : "lecons", pastilles) + `
      <div class="objectif-seq bloc">${ic("cible")}<div><span class="petit">${esc(fr(T.objectif))}</span><p class="consigne-texte">${texte(s.objectif)}</p></div><div class="sons">${boutonsSon(s.objectif)}</div></div>
      <div class="seq-colonnes bloc">
        <section><h2>${esc(fr(T.etapes))}${ligneTrad(T.etapes)}</h2>
          <p class="ligne-av" style="margin-bottom:16px">${barre(a.pct)}<b>${a.f}/${a.n}</b></p>
          <ol class="liste-etapes">${etapes}</ol></section>
        ${s.criteres.length ? `<section class="guide carte"><h2>${esc(fr(T.guide))}${ligneTrad(T.guide)}</h2>
          <p class="petit" style="margin-bottom:16px">${texte(T.guideConsigne, { gras: true })}</p>
          <ul class="criteres">${guide}</ul></section>` : ""}
      </div>`, d, "lecons");
  }

  /* Document (trace du passé ou travail postérieur) : image dans un cadre papier + « Document N°X » + légende.
     doc = { n, src, legende: {fr, uk…}, credit, alt } — la légende ne dit jamais « trace » ou « travail postérieur ». */
  const T_DOC = { fr: "Document N°", uk: "Документ №", pl: "Dokument nr ", es: "Documento N.º ", rn: null };
  function figureDoc(d) {
    return `<figure class="doc">
      <div class="doc-cadre"><img src="${esc(d.src)}" alt="${esc(d.alt ? fr(d.alt) : fr(d.legende))}" loading="lazy"></div>
      <figcaption><div class="paragraphe"><p><b class="doc-num">${esc(fr(T_DOC))}${esc(String(d.n))}</b> : ${texte(d.legende)}</p><div class="sons">${boutonsSon(d.legende)}</div></div>
        ${d.credit ? `<p class="doc-credit">${esc(d.credit)}</p>` : ""}</figcaption>
    </figure>`;
  }

  /* ---------- Écran 5 : ressource ou synthèse ---------- */
  function ecranRes(r) {
    const [sid, idx] = r.split("--");
    const s = seq(sid); const i = parseInt(idx, 10);
    const e = s && s.etapes[i];
    if (!e) return aller("lecons");
    const ch = chapitreDeSeq(sid);
    const c = e.contenu || {};
    const retour = retourPour("res-" + r, "seq-" + sid);
    const fait = !!E().faits[sid + ":" + i];
    cadre(entete(e.titre, retour) + `
      <div class="ressource-corps ${e.type} bloc">
        <span class="etiquette">${ic(TYPE_ICONE[e.type])} ${esc(fr(T[e.type]))}</span>
        ${(c.docs || []).map(figureDoc).join("")}
        ${(c.textes || []).map(p => `<div class="paragraphe"><p class="consigne-texte">${texte(p)}</p><div class="sons">${boutonsSon(p)}</div></div>`).join("")}
        ${(c.liste || []).length ? `<ul class="liste-res">${c.liste.map(p => `<li><div><p>${texte(p)}</p></div><div class="sons">${boutonsSon(p)}</div></li>`).join("")}</ul>` : ""}
        ${c.lien ? `<p><a class="btn btn-secondaire" href="${esc(c.lien.url)}" target="_blank" rel="noopener">${ic("droite")} ${esc(c.lien.label || c.lien.url)}</a></p>` : ""}
      </div>
      <div class="actions"><div class="droite">
        ${fait ? `<a class="btn btn-principal" href="#${retour}">${ic("ok")} ${esc(fr(T.fait))}</a>`
               : `<button class="btn btn-principal" data-lu="${sid}:${i}" data-vers="${retour}">${ic("ok")} ${esc(fr(T.jaiLu))}</button>`}
      </div></div>`, ch ? ch.discipline : "", "lecons");
  }

  /* ---------- Écran 6 : mini-test ou test de fin de chapitre ---------- */
  let Q = null; // { id, n, choix, valide, bonnes: [bool] }
  function ecranTest(id) {
    const t = test(id);
    if (!t) return aller("lecons");
    const estBilan = !!chapitreDeBilan(id);
    const ch = chapitreDeBilan(id) || P.chapitres.find(c => seqsDe(c).some(s => s.etapes.some(e => e.test === id)));
    const d = ch ? ch.discipline : "";
    const sDe = P.sequences.find(s => s.etapes.some(e => e.test === id));
    const retour = retourPour("test-" + id, estBilan ? "disc-" + d : sDe ? "seq-" + sDe.id : "lecons");
    const r = E().tests[id];

    if (!Q || Q.id !== id) {
      return cadre(entete(t.titre, retour) + `
        <div class="carte intro-test bloc">
          <div class="rond-test">${ic(estBilan ? "trophee" : "cible")}</div>
          <p class="consigne-texte">${T2(estBilan ? "bilanConsigne" : "testConsigne")}</p>
          <p class="petit">${t.questions.length} ${esc(fr(T.questions))}</p>
          ${r ? `<p class="meilleur">${esc(fr(T.meilleur))} : <b>${r.meilleurNb} / ${r.total}</b></p>` : ""}
          <button class="btn btn-principal" data-test-start="${id}">${esc(fr(r ? T.refaire : T.commencer))} ${ic("droite")}</button>
        </div>`, d, "lecons");
    }

    if (Q.n >= t.questions.length) return finTest(t, estBilan, retour, d);

    const q = t.questions[Q.n];
    const lettres = "ABCDEF";
    const pastilles = `<div class="etapes">${t.questions.map((_, i) => `<i class="${i < Q.n ? "fait" : i === Q.n ? "actuel" : ""}"></i>`).join("")}</div>`;
    const opts = q.options.map((o, k) => {
      let etat = "";
      if (Q.valide) { if (o.correct) etat = "juste"; else if (Q.choix === k) etat = "faux"; }
      return `<button class="option ${etat}" data-qopt="${k}" aria-pressed="${Q.choix === k}" ${Q.valide ? "disabled" : ""}><span class="symb">${lettres[k]}</span><span>${lab(o.label)}</span></button>`;
    }).join("");
    const juste = Q.valide && Q.bonnes[Q.n];
    const bonneRep = q.options.find(o => o.correct);
    cadre(entete(t.titre, retour, pastilles) + `
      <div class="consigne">
        <span class="num">${Q.n + 1}</span>
        <div class="corps"><p class="consigne-texte">${texte(q.consigne, { gras: true })}</p></div>
        <div style="display:flex;flex-direction:column;gap:8px">${boutonsSon(q.consigne)}</div>
      </div>
      ${q.doc ? figureDoc(q.doc) : ""}
      ${q.visuel ? `<div class="carte-plate visuel-test"><div class="visuel">${q.visuel.map((v, i) => (i ? '<span class="plus">+</span>' : "") + A.argent(v)).join("")}</div></div>` : ""}
      <div class="zone"><div class="options">${opts}</div></div>
      ${Q.valide ? `<div class="retour-msg ${juste ? "ok" : "ko"}" role="status">${ic(juste ? "ok" : "x")}<p>
          <span class="etat">${juste ? esc(fr(T.bonne)) : `${esc(fr(T.laBonne))} ${labTxt(bonneRep.label)}.`}</span>
          ${q.explication ? texte(q.explication) : ""}</p></div>` : ""}
      <div class="actions"><div class="droite">
        ${Q.valide
          ? `<button class="btn btn-principal" data-qsuivant>${esc(fr(Q.n + 1 >= t.questions.length ? T.resultatVoir : A.D.ui.suivant))} ${ic("droite")}</button>`
          : `<button class="btn btn-principal" data-qvalider ${Q.choix == null ? "disabled" : ""}>${esc(fr(T.valider))}</button>`}
      </div></div>`, d, "lecons");
  }
  const lab = l => typeof l === "string" ? esc(l) : texte(l);
  const labTxt = l => typeof l === "string" ? esc(l) : esc(fr(l));

  function enregistrerTest(t) {
    const nb = Q.bonnes.filter(Boolean).length;
    const total = t.questions.length;
    const parCrit = {};
    t.questions.forEach((q, i) => {
      if (!q.critere) return;
      const c = parCrit[q.critere] = parCrit[q.critere] || { ok: 0, n: 0 };
      c.n++; if (Q.bonnes[i]) c.ok++;
    });
    const r = E().tests[t.id] || { essais: 0, meilleurNb: 0, total, criteres: {} };
    r.essais++; r.total = total; r.dernierNb = nb; r.date = aujourdhui();
    r.meilleurNb = Math.max(r.meilleurNb, nb);
    Object.entries(parCrit).forEach(([k, v]) => { r.criteres[k] = Math.max(r.criteres[k] || 0, v.ok / v.n); });
    E().tests[t.id] = r;
    A.sauver();
  }

  function finTest(t, estBilan, retour, d) {
    const nb = Q.bonnes.filter(Boolean).length;
    const crits = [...new Set(t.questions.map(q => q.critere).filter(Boolean))];
    const tousCrit = P.sequences.flatMap(s => s.criteres);
    const lignes = crits.map(cid => {
      const c = tousCrit.find(x => x.id === cid);
      const qs = t.questions.map((q, i) => [q, i]).filter(([q]) => q.critere === cid);
      const ok = qs.filter(([, i]) => Q.bonnes[i]).length;
      const ratio = ok / qs.length;
      const niv = ratio >= 0.8 ? "vert" : ratio >= 0.5 ? "orange" : "rouge";
      return `<li>${c ? `<span>${texte(c.t)}</span>` : ""}${badgeNiveau(niv)}</li>`;
    }).join("");
    cadre(entete(t.titre, retour) + `
      <div class="carte fin bloc">
        <div class="etoile">${ic(estBilan ? "trophee" : "cible")}</div>
        <h1>${esc(fr(T.resultat))}${ligneTrad(T.resultat)}</h1>
        <p class="score"><b>${nb}</b> / ${t.questions.length} <span class="petit">${esc(fr(T.bonnes))}</span></p>
        ${lignes ? `<h2 class="bloc">${esc(fr(T.guide))}${ligneTrad(T.guide)}</h2><ul class="bilan-crit">${lignes}</ul>` : ""}
        <div class="ligne-boutons bloc">
          <button class="btn btn-secondaire" data-test-start="${t.id}">${esc(fr(T.refaire))}</button>
          <a class="btn btn-principal" href="#${retour}" data-fin-test>${esc(fr(retour.startsWith("seq-") ? T.retourSeq : T.retourMatiere))} ${ic("droite")}</a>
        </div>
      </div>`, d, "lecons");
  }

  /* ---------- Retour : on revient là d'où on vient ---------- */
  function retourPour(cible, defaut) {
    const r = A.S.retour;
    return r && r.cible === cible ? r.r : defaut;
  }

  /* ---------- Routeur ---------- */
  function ecran(r) {
    if (r === "lecons") { Q = null; return ecranChoix(); }
    if (r === "tout") return ecranTout();
    if (r.startsWith("disc-")) return ecranDisc(r.slice(5));
    if (r.startsWith("seq-")) { Q = null; return ecranSeq(r.slice(4)); }
    if (r.startsWith("res-")) return ecranRes(r.slice(4));
    if (r.startsWith("test-")) return ecranTest(r.slice(5));
    return ecranChoix();
  }
  const gere = r => r === "lecons" || r === "tout" || /^(disc|seq|res|test)-/.test(r);

  /* ---------- Événements ---------- */
  // Avant la navigation : on retient où revenir.
  document.addEventListener("click", ev => {
    const a = ev.target.closest("a[data-retour]");
    if (a) { A.S.retour = { cible: a.getAttribute("href").slice(1), r: a.dataset.retour }; A.sauver(); return; }
    const autre = ev.target.closest('a[href^="#act-"], a[href^="#test-"], a[href^="#res-"]');
    if (autre && A.S.retour && !autre.closest(".bandeau, .actions, .fin")) { A.S.retour = null; A.sauver(); }
  }, true);

  document.addEventListener("click", ev => {
    const b = ev.target.closest("button");
    if (!b) return;
    const d = b.dataset;
    if (d.auto) {
      const [cid, k] = d.auto.split(":");
      E().auto[cid] = E().auto[cid] === k ? null : k; A.sauver(); return A.rendre();
    }
    if (d.lu) {
      E().faits[d.lu] = true; A.sauver(); window.scrollTo(0, 0); return aller(d.vers);
    }
    if (d.testStart) { Q = { id: d.testStart, n: 0, choix: null, valide: false, bonnes: [] }; window.scrollTo(0, 0); return A.rendre(); }
    if (!Q) return;
    const t = test(Q.id);
    if (d.qopt !== undefined && !Q.valide) { Q.choix = parseInt(d.qopt, 10); return A.rendre(); }
    if (d.qvalider !== undefined && Q.choix != null) {
      Q.bonnes[Q.n] = !!t.questions[Q.n].options[Q.choix].correct;
      Q.valide = true; return A.rendre();
    }
    if (d.qsuivant !== undefined) {
      Q.n++; Q.choix = null; Q.valide = false;
      if (Q.n >= t.questions.length) enregistrerTest(t);
      window.scrollTo(0, 0); return A.rendre();
    }
  });
  window.addEventListener("hashchange", () => { if (!location.hash.startsWith("#test-")) Q = null; });

  /* ---------- Résumé pour le mode prof (sert à l'évaluation) ---------- */
  function resumeProf() {
    const lignes = A.D.disciplines.map(d => {
      const av = avDisc(d.id);
      if (!av) return "";
      const tests = P.tests.filter(t => {
        const ch = chapitreDeBilan(t.id) || P.chapitres.find(c => seqsDe(c).some(s => s.etapes.some(e => e.test === t.id)));
        return ch && ch.discipline === d.id && E().tests[t.id];
      }).map(t => { const r = E().tests[t.id]; return `${esc(fr(t.titre))} : ${r.meilleurNb}/${r.total} (${r.essais} essai${r.essais > 1 ? "s" : ""})`; });
      return `<tr><th>${esc(fr(d.t))}</th><td>${av.pct} % (${av.f}/${av.n})</td><td>${av.critOk}/${av.crit}</td><td class="petit">${tests.join("<br>") || "–"}</td></tr>`;
    }).join("");
    const jours = Object.entries(E().jours).sort().slice(-10).reverse()
      .map(([j, l]) => `${j} : ${l.map(x => x === "tout" ? "un peu de tout" : fr((discipline(x) || {}).t || { fr: x })).join(", ")}`).join("<br>");
    return `<h2 style="margin-top:8px">Avancement de l'élève</h2>
      <table class="tableau-prof"><thead><tr><th>Matière</th><th>Avancement</th><th>Critères maîtrisés</th><th>Tests (meilleur résultat)</th></tr></thead><tbody>${lignes || `<tr><td colspan="4">Pas encore de leçon.</td></tr>`}</tbody></table>
      ${jours ? `<p class="petit"><b>Matières choisies (10 derniers jours)</b><br>${jours}</p>` : ""}`;
  }

  /* Bloc de l'accueil : la prochaine étape de chaque matière. */
  function blocAccueil() {
    const items = A.D.disciplines.map(d => {
      if (!avDisc(d.id)) return "";
      const pr = prochaine(d.id);
      if (!pr) return "";
      const href = pr.bilan ? "test-" + pr.bilan : lienEtape(pr.s, pr.i);
      const titre = pr.bilan ? fr(T.bilan) : titreEtape(pr.e);
      const sous = pr.bilan ? fr(pr.ch.titre) : fr(pr.s.titre);
      const retour = pr.bilan ? "disc-" + d.id : "seq-" + pr.s.id;
      const av = avDisc(d.id);
      return `<a class="tuile" href="#${href}" data-retour="${retour}" data-espace="${d.id}">
        <span class="bande"></span>
        <span style="flex:1;display:grid;gap:6px"><span class="etiquette" style="justify-self:start">${esc(fr(d.t))}</span>
          <h2>${esc(titre)}</h2><span class="petit">${ic(pr.bilan ? "trophee" : TYPE_ICONE[pr.e.type])} ${esc(sous)}</span>
          <span class="ligne-av">${barre(av.pct)}<b>${av.pct} %</b></span></span>${ic("droite")}</a>`;
    }).join("");
    return `<section class="bloc">
      <h2>${esc(fr(T.prochaine))}${ligneTrad(T.prochaine)}</h2>
      ${items ? `<div class="tuiles">${items}</div>` : ""}
      <p style="margin-top:16px"><a class="btn btn-secondaire" href="#lecons">${ic("book")} ${esc(fr(T.choisis))}</a></p>
    </section>`;
  }

  /* Bilan envoyé au prof (suivi de la classe). Rien de personnel : seulement l'avancement. */
  function bilan() {
    const disciplines = {};
    let f = 0, n = 0, crit = 0, critOk = 0;
    A.D.disciplines.forEach(d => {
      const a = avDisc(d.id);
      if (!a) return;
      disciplines[d.id] = a; f += a.f; n += a.n; crit += a.crit; critOk += a.critOk;
    });
    const tests = {};
    P.tests.forEach(t => { const r = E().tests[t.id]; if (r) tests[t.id] = { titre: fr(t.titre), meilleurNb: r.meilleurNb, total: r.total, essais: r.essais, bilan: !!chapitreDeBilan(t.id) }; });
    let enCours = null;
    const dern = A.S.dernier && A.S.dernier.r;
    if (dern && dern.startsWith("seq-")) { const s = seq(dern.slice(4)); if (s) enCours = { titre: fr(s.titre), discipline: espaceSeq(s.id) }; }
    const jours = Object.fromEntries(Object.entries(E().jours).sort().slice(-7));
    return { global: n ? { f, n, pct: Math.round((f / n) * 100), crit, critOk } : null, disciplines, tests, enCours, jours };
  }

  const titreSeq = id => { const s = seq(id); return s ? fr(s.titre) : ""; };
  const espaceSeq = id => { const ch = chapitreDeSeq(id); return ch ? ch.discipline : ""; };

  window.LECONS = { ecran, gere, resumeProf, titreSeq, espaceSeq, blocAccueil, bilan };
})();
