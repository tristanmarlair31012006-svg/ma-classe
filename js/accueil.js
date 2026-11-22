/* Accueil : « Comment tu te sens ? » (pavé énergie × moral) et « Hier, j'ai… » (phrase en 3 touches → story). */
(function () {
  "use strict";
  const A = window.APP;
  const { ic, esc, fr, tr, ligneTrad, texte } = A;
  const $ = (s, el) => (el || document).querySelector(s);

  A.ajouterIcones({"soleil": "<circle cx=\"12\" cy=\"12\" r=\"4\"/> <path d=\"M12 2v2\"/> <path d=\"M12 20v2\"/> <path d=\"m4.93 4.93 1.41 1.41\"/> <path d=\"m17.66 17.66 1.41 1.41\"/> <path d=\"M2 12h2\"/> <path d=\"M20 12h2\"/> <path d=\"m6.34 17.66-1.41 1.41\"/> <path d=\"m19.07 4.93-1.41 1.41\"/>", "pluie": "<path d=\"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242\"/> <path d=\"M16 14v6\"/> <path d=\"M8 14v6\"/> <path d=\"M12 16v6\"/>", "nuage": "<path d=\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z\"/>", "froid": "<path d=\"m10 20-1.25-2.5L6 18\"/> <path d=\"M10 4 8.75 6.5 6 6\"/> <path d=\"m14 20 1.25-2.5L18 18\"/> <path d=\"m14 4 1.25 2.5L18 6\"/> <path d=\"m17 21-3-6h-4\"/> <path d=\"m17 3-3 6 1.5 3\"/> <path d=\"M2 12h6.5L10 9\"/> <path d=\"m20 10-1.5 2 1.5 2\"/> <path d=\"M22 12h-6.5L14 15\"/> <path d=\"m4 10 1.5 2L4 14\"/> <path d=\"m7 21 3-6-1.5-3\"/> <path d=\"m7 3 3 6h4\"/>", "vent": "<path d=\"M12.8 19.6A2 2 0 1 0 14 16H2\"/> <path d=\"M17.5 8a2.5 2.5 0 1 1 2 4H2\"/> <path d=\"M9.8 4.4A2 2 0 1 1 11 8H2\"/>", "bus": "<path d=\"M8 6v6\"/> <path d=\"M15 6v6\"/> <path d=\"M2 12h19.6\"/> <path d=\"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3\"/> <circle cx=\"7\" cy=\"18\" r=\"2\"/> <path d=\"M9 18h5\"/> <circle cx=\"16\" cy=\"18\" r=\"2\"/>", "voiture": "<path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\"/> <circle cx=\"7\" cy=\"17\" r=\"2\"/> <path d=\"M9 17h6\"/> <circle cx=\"17\" cy=\"17\" r=\"2\"/>", "velo": "<circle cx=\"18.5\" cy=\"17.5\" r=\"3.5\"/> <circle cx=\"5.5\" cy=\"17.5\" r=\"3.5\"/> <circle cx=\"15\" cy=\"5\" r=\"1\"/> <path d=\"M12 17.5V14l-3-3 4-3 2 3h2\"/>", "train": "<path d=\"M8 3.1V7a4 4 0 0 0 8 0V3.1\"/> <path d=\"m9 15-1-1\"/> <path d=\"m15 15 1-1\"/> <path d=\"M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z\"/> <path d=\"m8 19-2 3\"/> <path d=\"m16 19 2 3\"/>", "matin": "<path d=\"M12 2v8\"/> <path d=\"m4.93 10.93 1.41 1.41\"/> <path d=\"M2 18h2\"/> <path d=\"M20 18h2\"/> <path d=\"m19.07 10.93-1.41 1.41\"/> <path d=\"M22 22H2\"/> <path d=\"m8 6 4-4 4 4\"/> <path d=\"M16 18a4 4 0 0 0-8 0\"/>", "soir": "<path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"/>", "printemps": "<path d=\"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1\"/> <circle cx=\"12\" cy=\"8\" r=\"2\"/> <path d=\"M12 10v12\"/> <path d=\"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z\"/> <path d=\"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z\"/>", "automne": "<path d=\"M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20\"/> <path d=\"M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13\"/>", "calendrier": "<path d=\"M8 2v3\"/> <path d=\"M16 2v3\"/> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/> <path d=\"M3 9h18\"/> <path d=\"M8 13h.01\"/> <path d=\"M12 13h.01\"/> <path d=\"M16 13h.01\"/> <path d=\"M8 17h.01\"/> <path d=\"M12 17h.01\"/> <path d=\"M16 17h.01\"/>", "cible": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <circle cx=\"12\" cy=\"12\" r=\"6\"/> <circle cx=\"12\" cy=\"12\" r=\"2\"/>", "jouer": "<path d=\"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z\"/>", "megaphone": "<path d=\"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z\"/> <path d=\"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14\"/> <path d=\"M8 6v8\"/>", "etincelles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"/> <path d=\"M20 2v4\"/> <path d=\"M22 4h-4\"/> <circle cx=\"4\" cy=\"20\" r=\"2\"/>", "trophee": "<path d=\"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2\"/> <path d=\"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2\"/> <path d=\"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3\"/> <path d=\"M4 22h16\"/> <path d=\"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z\"/> <path d=\"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3\"/>", "questionDuJour": "<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\"/> <path d=\"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5\"/> <path d=\"M12 17h.01\"/>"});
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


  /* =========================================================
     CONTENUS DU JOUR (fichier jour.json, modifiable sur GitHub)
     ========================================================= */
  let JOUR = null;
  async function chargerJour() {
    try {
      const r = await fetch("jour.json", { cache: "no-store" });
      if (r.ok) { JOUR = await r.json(); try { localStorage.setItem("daspa-jour", JSON.stringify(JOUR)); } catch (e) {} }
    } catch (e) {}
    if (!JOUR) { try { JOUR = JSON.parse(localStorage.getItem("daspa-jour")); } catch (e) {} }
    if (JOUR && (A.route() === "accueil" || A.route() === "") && A.S.profil) { const y = window.scrollY; A.rendre(); window.scrollTo(0, y); }
  }

  const T2 = {
    aujourdhui: { fr: "Aujourd'hui", uk: "Сьогодні", pl: "Dzisiaj", es: "Hoy", rn: null },
    objectif: { fr: "Mon objectif", uk: "Моя мета", pl: "Mój cel", es: "Mi objetivo", rn: null },
    reprendre: { fr: "Reprendre", uk: "Продовжити", pl: "Wróć do", es: "Retomar", rn: null },
    messageProf: { fr: "Message du prof", uk: "Повідомлення від учителя", pl: "Wiadomość od nauczyciela", es: "Mensaje del profe", rn: null },
    question: { fr: "La question du jour", uk: "Питання дня", pl: "Pytanie dnia", es: "La pregunta del día", rn: null },
    taReponse: { fr: "Ta réponse", uk: "Твоя відповідь", pl: "Twoja odpowiedź", es: "Tu respuesta", rn: null },
    diLe: { fr: "Dis-le en français", uk: "Скажи це французькою", pl: "Powiedz to po francusku", es: "Dilo en francés", rn: null },
    repete: { fr: "ÉCOUTE, puis RÉPÈTE.", uk: "ПОСЛУХАЙ, потім ПОВТОРИ.", pl: "POSŁUCHAJ, potem POWTÓRZ.", es: "ESCUCHA y luego REPITE.", rn: null },
    jeLaiDit: { fr: "Je l'ai dit !", uk: "Я це сказав!|Я це сказала!", pl: "Powiedziałem to!|Powiedziałam to!", es: "¡Lo he dicho!", rn: null },
    maSemaine: { fr: "Ma semaine", uk: "Мій тиждень", pl: "Mój tydzień", es: "Mi semana", rn: null },
    reussites: { fr: "Mes réussites", uk: "Мої успіхи", pl: "Moje sukcesy", es: "Mis logros", rn: null },
    notreClasse: { fr: "Dans notre classe, on parle…", uk: "У нашому класі говорять…", pl: "W naszej klasie mówimy…", es: "En nuestra clase hablamos…", rn: null },
    valider: { fr: "Valider", uk: "Готово", pl: "Gotowe", es: "Listo", rn: null }
  };
  const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

  const QUESTIONS = [
    { id: "meteo", t: { fr: "Quel temps fait-il aujourd'hui ?", uk: "Яка сьогодні погода?", pl: "Jaka jest dziś pogoda?", es: "¿Qué tiempo hace hoy?", rn: null },
      options: [
        { id: "beau", icone: "soleil", t: { fr: "Il fait beau.", uk: "Сонячно.", pl: "Jest ładnie.", es: "Hace buen tiempo.", rn: null } },
        { id: "pluie", icone: "pluie", t: { fr: "Il pleut.", uk: "Іде дощ.", pl: "Pada deszcz.", es: "Llueve.", rn: null } },
        { id: "gris", icone: "nuage", t: { fr: "C'est nuageux.", uk: "Хмарно.", pl: "Jest pochmurno.", es: "Está nublado.", rn: null } },
        { id: "froid", icone: "froid", t: { fr: "Il fait froid.", uk: "Холодно.", pl: "Jest zimno.", es: "Hace frío.", rn: null } },
        { id: "vent", icone: "vent", t: { fr: "Il y a du vent.", uk: "Вітряно.", pl: "Wieje wiatr.", es: "Hace viento.", rn: null } }
      ] },
    { id: "trajet", t: { fr: "Comment es-tu venu à l'école ?|Comment es-tu venue à l'école ?", uk: "Як ти добирався до школи?|Як ти добиралася до школи?", pl: "Jak dotarłeś do szkoły?|Jak dotarłaś do szkoły?", es: "¿Cómo has venido a la escuela?", rn: null },
      options: [
        { id: "pied", icone: "pas", t: { fr: "À pied.", uk: "Пішки.", pl: "Pieszo.", es: "A pie.", rn: null } },
        { id: "bus", icone: "bus", t: { fr: "En bus.", uk: "Автобусом.", pl: "Autobusem.", es: "En autobús.", rn: null } },
        { id: "voiture", icone: "voiture", t: { fr: "En voiture.", uk: "Машиною.", pl: "Samochodem.", es: "En coche.", rn: null } },
        { id: "velo", icone: "velo", t: { fr: "À vélo.", uk: "Велосипедом.", pl: "Rowerem.", es: "En bici.", rn: null } },
        { id: "train", icone: "train", t: { fr: "En train.", uk: "Поїздом.", pl: "Pociągiem.", es: "En tren.", rn: null } }
      ] },
    { id: "moment", t: { fr: "Tu préfères le matin ou le soir ?", uk: "Ти більше любиш ранок чи вечір?", pl: "Wolisz poranek czy wieczór?", es: "¿Prefieres la mañana o la noche?", rn: null },
      options: [
        { id: "matin", icone: "matin", t: { fr: "Je préfère le matin.", uk: "Я більше люблю ранок.", pl: "Wolę poranek.", es: "Prefiero la mañana.", rn: null } },
        { id: "soir", icone: "soir", t: { fr: "Je préfère le soir.", uk: "Я більше люблю вечір.", pl: "Wolę wieczór.", es: "Prefiero la noche.", rn: null } }
      ] },
    { id: "saison", t: { fr: "Quelle est ta saison préférée ?", uk: "Яка твоя улюблена пора року?", pl: "Jaka jest twoja ulubiona pora roku?", es: "¿Cuál es tu estación favorita?", rn: null },
      options: [
        { id: "printemps", icone: "printemps", t: { fr: "Le printemps.", uk: "Весна.", pl: "Wiosna.", es: "La primavera.", rn: null } },
        { id: "ete", icone: "soleil", t: { fr: "L'été.", uk: "Літо.", pl: "Lato.", es: "El verano.", rn: null } },
        { id: "automne", icone: "automne", t: { fr: "L'automne.", uk: "Осінь.", pl: "Jesień.", es: "El otoño.", rn: null } },
        { id: "hiver", icone: "froid", t: { fr: "L'hiver.", uk: "Зима.", pl: "Zima.", es: "El invierno.", rn: null } }
      ] },
    { id: "langues", t: { fr: "Combien de langues est-ce que tu parles ?", uk: "Скільки мов ти знаєш?", pl: "Iloma językami mówisz?", es: "¿Cuántos idiomas hablas?", rn: null },
      options: [
        { id: "1", icone: "langues", t: { fr: "Je parle une langue.", uk: "Одну мову.", pl: "Jednym.", es: "Uno.", rn: null } },
        { id: "2", icone: "langues", t: { fr: "Je parle deux langues.", uk: "Дві мови.", pl: "Dwoma.", es: "Dos.", rn: null } },
        { id: "3", icone: "langues", t: { fr: "Je parle trois langues.", uk: "Три мови.", pl: "Trzema.", es: "Tres.", rn: null } },
        { id: "4", icone: "langues", t: { fr: "Je parle quatre langues ou plus.", uk: "Чотири або більше.", pl: "Czterema lub więcej.", es: "Cuatro o más.", rn: null } }
      ] },
    { id: "groupe", t: { fr: "Tu préfères travailler seul, à deux ou en groupe ?|Tu préfères travailler seule, à deux ou en groupe ?", uk: "Тобі більше подобається працювати самому, удвох чи в групі?|Тобі більше подобається працювати самій, удвох чи в групі?", pl: "Wolisz pracować sam, w parze czy w grupie?|Wolisz pracować sama, w parze czy w grupie?", es: "¿Prefieres trabajar solo, en pareja o en grupo?|¿Prefieres trabajar sola, en pareja o en grupo?", rn: null },
      options: [
        { id: "seul", icone: "perso", t: { fr: "Je préfère travailler seul.|Je préfère travailler seule.", uk: "Сам.|Сама.", pl: "Sam.|Sama.", es: "Solo.|Sola.", rn: null } },
        { id: "deux", icone: "users", t: { fr: "Je préfère travailler à deux.", uk: "Удвох.", pl: "W parze.", es: "En pareja.", rn: null } },
        { id: "groupe", icone: "users", t: { fr: "Je préfère travailler en groupe.", uk: "У групі.", pl: "W grupie.", es: "En grupo.", rn: null } }
      ] },
    { id: "plat", libre: "Mon plat préféré, c'est", t: { fr: "Quel est ton plat préféré ?", uk: "Яка твоя улюблена страва?", pl: "Jakie jest twoje ulubione danie?", es: "¿Cuál es tu plato favorito?", rn: null } },
    { id: "rire", libre: "Ce qui me fait rire, c'est", t: { fr: "Qu'est-ce qui te fait rire ?", uk: "Що тебе смішить?", pl: "Co cię rozśmiesza?", es: "¿Qué te hace reír?", rn: null } },
    { id: "metier", libre: "Le métier qui m'intéresse, c'est", t: { fr: "Quel métier t'intéresse ?", uk: "Яка професія тебе цікавить?", pl: "Jaki zawód cię interesuje?", es: "¿Qué profesión te interesa?", rn: null } }
  ];

  const PHRASES = [
    { fr: "Je voudrais un ticket, s'il vous plaît.", uk: "Мені, будь ласка, квиток.", pl: "Poproszę bilet.", es: "Quisiera un billete, por favor.", rn: null },
    { fr: "À quelle heure part le bus ?", uk: "О котрій відправляється автобус?", pl: "O której odjeżdża autobus?", es: "¿A qué hora sale el autobús?", rn: null },
    { fr: "Vous pouvez répéter, s'il vous plaît ?", uk: "Можете повторити, будь ласка?", pl: "Czy może pan powtórzyć?", es: "¿Puede repetir, por favor?", rn: null },
    { fr: "Combien ça coûte ?", uk: "Скільки це коштує?", pl: "Ile to kosztuje?", es: "¿Cuánto cuesta?", rn: null },
    { fr: "J'ai rendez-vous à dix heures.", uk: "У мене зустріч о десятій.", pl: "Mam wizytę o dziesiątej.", es: "Tengo una cita a las diez.", rn: null },
    { fr: "Je ne me sens pas bien.", uk: "Я погано почуваюся.", pl: "Źle się czuję.", es: "No me encuentro bien.", rn: null },
    { fr: "Parlez plus lentement, s'il vous plaît.", uk: "Говоріть повільніше, будь ласка.", pl: "Proszę mówić wolniej.", es: "Hable más despacio, por favor.", rn: null },
    { fr: "Excusez-moi, je cherche la gare.", uk: "Вибачте, я шукаю вокзал.", pl: "Przepraszam, szukam dworca.", es: "Perdone, busco la estación.", rn: null },
    { fr: "Où se trouve le secrétariat ?", uk: "Де знаходиться секретаріат?", pl: "Gdzie jest sekretariat?", es: "¿Dónde está la secretaría?", rn: null },
    { fr: "Bonne journée !", uk: "Гарного дня!", pl: "Miłego dnia!", es: "¡Que tenga un buen día!", rn: null }
  ];

  const BONJOUR = { fr: "Bonjour", uk: "Добрий день", pl: "Dzień dobry", es: "Buenos días", rn: "Amahoro" };

  const numJour = () => Math.floor(Date.now() / 86400000);
  const choisirJour = (liste, id) => (id && liste.find(x => x.id === id)) || liste[numJour() % liste.length];

  /* ---------- Blocs ---------- */
  function blocMessage() {
    if (!JOUR || !JOUR.message || !JOUR.message.fr) return "";
    return `<div class="message-prof">${ic("megaphone")}<div><span class="petit">${esc(fr(T2.messageProf))}</span><p class="consigne-texte">${esc(JOUR.message.fr)}</p>${ligneTrad(JOUR.message)}</div><button class="rond mini" data-dire="${esc(JOUR.message.fr)}" data-lg="fr" aria-label="Écouter">${ic("son")}</button></div>`;
  }

  function dernier() {
    const d = A.S.dernier; if (!d) return null;
    if (d.r.startsWith("act-")) { const a = A.D.activites.find(x => "act-" + x.id === d.r); if (a && !(A.S.progres[a.id] || {}).fini) return { r: d.r, titre: fr(a.titre), icone: "book" }; }
    if (d.r.startsWith("seq-") && window.LECONS) { const t = window.LECONS.titreSeq(d.r.slice(4)); if (t) return { r: d.r, titre: t, icone: "book", espace: window.LECONS.espaceSeq(d.r.slice(4)) }; }
    if (d.r.startsWith("atelier-")) { const c = (A.S.creations || []).find(x => d.r.slice(8).split("--")[0] === x.id); if (c) return { r: "atelier-" + c.id, titre: c.titre, icone: "palette" }; }
    return null;
  }
  function blocAujourdhui() {
    const prog = (JOUR && JOUR.programme) || [];
    const obj = JOUR && JOUR.objectif && JOUR.objectif.fr ? JOUR.objectif : null;
    const rep = dernier();
    if (!prog.length && !obj && !rep) return "";
    const nomDisc = id => { const d = A.D.disciplines.find(x => x.id === id); return d ? fr(d.t) : ""; };
    return `<section class="bloc aujourdhui carte">
      <h2>${ic("calendrier")} ${esc(fr(T2.aujourdhui))}${ligneTrad(T2.aujourdhui)}</h2>
      ${prog.length ? `<ol class="programme">${prog.map((p, i) => `<li data-espace="${esc(p.discipline || "")}">
          <span class="num-prog">${i + 1}</span>
          <span class="txt-prog">${p.discipline ? `<span class="etiquette">${esc(nomDisc(p.discipline))}</span> ` : ""}<b>${esc(p.texte.fr)}</b>${ligneTrad(p.texte)}</span>
          ${p.lien ? `<a class="rond mini" href="#${esc(p.lien)}" aria-label="Ouvrir">${ic("droite")}</a>` : ""}
        </li>`).join("")}</ol>` : ""}
      ${obj ? `<p class="objectif-jour">${ic("cible")} <span><span class="petit">${esc(fr(T2.objectif))}</span><b>${esc(obj.fr)}</b>${ligneTrad(obj)}</span></p>` : ""}
      ${rep ? `<a class="btn btn-principal reprendre" data-espace="${rep.espace || (rep.icone === "palette" ? "atelier" : "eco")}" href="#${rep.r}">${ic("jouer")} ${esc(fr(T2.reprendre))} : ${esc(rep.titre)}</a>` : ""}
    </section>`;
  }

  function blocQuestion() {
    const q = choisirJour(QUESTIONS, JOUR && JOUR.question);
    const j = journal();
    const rep = j.question && j.question.id === q.id ? j.question : null;
    let corps;
    if (q.options) {
      const opt = rep && q.options.find(o => o.id === rep.choix);
      corps = `<div class="etiquettes">${q.options.map(o => `<button class="etiq" data-question="${q.id}" data-reponse="${o.id}" aria-pressed="${rep && rep.choix === o.id}">${ic(o.icone)}<span>${esc(choix(o.t.fr))}</span></button>`).join("")}</div>
        ${opt ? `<div class="reponse-dite"><p class="consigne-texte"><b>${esc(choix(opt.t.fr))}</b>${ligneTrad(opt.t)}</p><button class="rond mini" data-dire="${esc(choix(opt.t.fr))}" data-lg="fr" aria-label="Écouter">${ic("son")}</button></div>` : ""}`;
    } else {
      corps = `<form class="ligne-compo" id="form-question" data-q="${q.id}">
          <input id="rep-question" class="champ-reponse" maxlength="120" value="${esc(rep ? rep.texte : q.libre + " ")}" aria-label="${esc(fr(T2.taReponse))}">
          <button class="btn btn-principal" data-espace="social">${ic("ok")} ${esc(fr(T2.valider))}</button>
        </form>
        ${rep ? `<div class="reponse-dite"><p class="consigne-texte"><b>${esc(rep.texte)}</b></p><button class="rond mini" data-dire="${esc(rep.texte)}" data-lg="fr" aria-label="Écouter">${ic("son")}</button></div>` : ""}`;
    }
    return `<section class="bloc">
      <h2>${ic("questionDuJour")} ${esc(fr(T2.question))}</h2>
      <p class="question-jour">${esc(choix(q.t.fr))} <button class="rond mini" data-dire="${esc(choix(q.t.fr))}" data-lg="fr" aria-label="Écouter">${ic("son")}</button></p>
      ${ligneTrad(q.t) ? `<p>${ligneTrad(q.t)}</p>` : ""}
      ${corps}
    </section>`;
  }

  function blocMotEtPhrase() {
    const motId = JOUR && JOUR.motDuJour;
    const m = (motId && A.D.mots.find(x => x.id === motId)) || A.D.mots[numJour() % A.D.mots.length];
    const p = (JOUR && JOUR.phraseUtile && JOUR.phraseUtile.fr) ? JOUR.phraseUtile : PHRASES[numJour() % PHRASES.length];
    const j = journal();
    const dansDico = A.S.dico.includes(m.id);
    return `<section class="bloc deux-cartes">
      <div class="carte-plate">
        <span class="etiquette">${ic("etoile")} ${esc(fr(A.D.ui.motDuJour))}</span>
        <div class="ligne-mot">${m.picto ? `<span class="picto petit-p"><img alt="${esc(fr(m.t))}" src="pictos/${m.picto}.png" data-id="${m.picto}" data-label="${esc(fr(m.t))}"></span>` : ""}
          <div><p class="mot-jour-fr">${esc(choix(m.t.fr))}</p>${ligneTrad(m.t)}</div></div>
        <div class="ligne-sons">${A.boutonsSon(m.t)}<button class="btn btn-secondaire" data-dico="${m.id}">${dansDico ? ic("ok") : ic("plus")} ${esc(fr(A.D.ui.monDico))}</button></div>
      </div>
      <div class="carte-plate">
        <span class="etiquette">${ic("megaphone")} ${esc(fr(T2.diLe))}</span>
        <p class="phrase-utile">${esc(p.fr)}</p>${ligneTrad(p)}
        <p class="petit" style="margin-top:8px">${texte(T2.repete, { gras: true })}</p>
        <div class="ligne-sons">${A.boutonsSon(p)}<button class="btn ${j.phraseDite ? "btn-secondaire" : "btn-principal"}" data-espace="mots" data-phrase-dite>${ic("ok")} ${esc(fr(T2.jeLaiDit))}</button></div>
      </div>
    </section>`;
  }

  function lundi() { const d = new Date(); const k = (d.getDay() + 6) % 7; d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - k); return d; }
  function blocSemaine() {
    const l0 = lundi(); const auj = new Date().toISOString().slice(0, 10);
    const jours = JOURS.map((n, i) => { const d = new Date(l0); d.setDate(l0.getDate() + i); const iso = d.toISOString().slice(0, 10); return { n, iso, j: A.S.journal[iso] || {} }; });
    const S = A.S;
    const nbStories = Object.values(S.journal).filter(j => j.hierQuoi).length;
    const nbDefis = Object.values(S.journal).filter(j => j.hierDefi || j.phraseDite).length;
    const finies = A.D.activites.filter(a => (S.progres[a.id] || {}).fini);
    const reussites = [];
    finies.forEach(a => reussites.push({ icone: "trophee", t: `Activité terminée : ${fr(a.titre)}` }));
    if (S.dico.length) reussites.push({ icone: "dico", t: `${S.dico.length} mot${S.dico.length > 1 ? "s" : ""} dans mon dico` });
    if (nbStories) reussites.push({ icone: "etincelles", t: `${nbStories} stor${nbStories > 1 ? "ies" : "y"} « Hier, j'ai… »` });
    if (nbDefis) reussites.push({ icone: "megaphone", t: `${nbDefis} défi${nbDefis > 1 ? "s" : ""} oral${nbDefis > 1 ? "aux" : ""} réussi${nbDefis > 1 ? "s" : ""}` });
    if ((S.creations || []).length) reussites.push({ icone: "palette", t: `${S.creations.length} création${S.creations.length > 1 ? "s" : ""} dans l'Atelier` });
    return `<section class="bloc deux-cartes">
      <div class="carte-plate">
        <h2>${esc(fr(T2.maSemaine))}${ligneTrad(T2.maSemaine)}</h2>
        <div class="semaine">${jours.map(x => `<div class="jour-sem ${x.iso === auj ? "auj" : ""} ${x.j.vu ? "vu" : ""}">
            <span class="nom-jour">${x.n}</span>
            <span class="pastilles-jour">
              <i class="${x.j.vu ? "on" : ""}" title="Présent">${ic("ok")}</i>
              <i class="${x.j.hierQuoi ? "on" : ""}" title="Story">${ic("etincelles")}</i>
              <i class="${x.j.question ? "on" : ""}" title="Question du jour">${ic("questionDuJour")}</i>
            </span></div>`).join("")}
        </div>
      </div>
      <div class="carte-plate">
        <h2>${esc(fr(T2.reussites))}${ligneTrad(T2.reussites)}</h2>
        ${reussites.length ? `<ul class="reussites">${reussites.slice(0, 5).map(r => `<li>${ic(r.icone)} ${esc(r.t)}</li>`).join("")}</ul>` : `<p class="petit">Tes réussites apparaîtront ici.</p>`}
      </div>
    </section>`;
  }

  function blocClasse() {
    const langues = JOUR && JOUR.langues;
    if (!langues) return "";
    const entrees = Object.entries(langues).filter(([k, n]) => A.D.langues[k] && n > 0).sort((a, b) => b[1] - a[1]);
    if (!entrees.length) return "";
    return `<section class="bloc">
      <h2>${ic("langues")} ${esc(fr(T2.notreClasse))}${ligneTrad(T2.notreClasse)}</h2>
      <div class="langues-classe">${entrees.map(([k, n]) => `<button class="langue-classe" data-dire="${esc(BONJOUR[k] || "")}" data-lg="${k}" ${A.D.langues[k].voix ? "" : "disabled"}>
          <span class="nom-langue">${esc(A.D.langues[k].nom)}</span>
          <span class="bonjour-langue" lang="${k}">${esc(BONJOUR[k] || "")}</span>
          <span class="points-langue">${Array.from({ length: n }, () => "<i></i>").join("")}</span>
        </button>`).join("")}</div>
    </section>`;
  }

  /* ---------- Page d'accueil complète ---------- */
  function page() {
    const jv = journal(); if (!jv.vu) { jv.vu = true; A.sauver(); }
    return blocMessage() + blocAujourdhui() + blocHumeur() + blocQuestion() + blocHier() + blocMotEtPhrase() + blocSemaine() + blocClasse();
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
    if (d.question && d.reponse) { j.question = (j.question && j.question.choix === d.reponse) ? null : { id: d.question, choix: d.reponse }; maj = true;
      const q = QUESTIONS.find(x => x.id === d.question), o = q && q.options.find(x => x.id === d.reponse); if (j.question && o) A.parler(choix(o.t.fr), "fr"); }
    if (d.phraseDite !== undefined) { j.phraseDite = !j.phraseDite; maj = true; }
    if (d.hierGrand !== undefined) return ouvrirGrand();
    if (d.hierFermer !== undefined) { const p = $("#story-plein"); if (p) p.remove(); return; }
    if (maj) {
      A.sauver();
      const y = window.scrollY; A.rendre(); window.scrollTo(0, y);
      if ((d.hierQuoi || d.hierAvec || d.hierOu) && phrase(j, "fr")) A.parler(phrase(j, "fr"), "fr");
    }
  });

  document.addEventListener("submit", ev => {
    if (ev.target.id !== "form-question") return;
    ev.preventDefault();
    const t = $("#rep-question").value.trim(); if (!t) return;
    journal().question = { id: ev.target.dataset.q, texte: t };
    A.sauver(); const y = window.scrollY; A.rendre(); window.scrollTo(0, y); A.parler(t, "fr");
  });

  window.ACCUEIL = { blocHumeur, blocHier, brancher, page };
  chargerJour();
  if (A.route() === "accueil" || A.route() === "") A.rendre();
})();
