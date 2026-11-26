/* Prérequis DASPA : leçons de rappel (déjà vues, pas forcément maîtrisées).
   Deux chapitres placés EN PREMIER dans Histoire et Géographie (l'accueil propose donc d'abord les rappels).
   Chaque séquence : rappel (ressource) → activité si utile → mini-test → synthèse. L'autoévaluation se fait
   dans le guide de maîtrise de la séquence (Moi / Test) et dans la dernière étape « auto » des activités.
   rn (kirundi) = null tant que pas relu. Images : img/prerequis/ et img/belgique/. */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/prerequis/";
  const crit = (id, fr, uk, pl, es) => ({ id, t: L(fr, uk, pl, es) });
  const Q = (critere, consigne, options, explication, doc) => Object.assign({ critere, consigne, options, explication }, doc ? { doc } : {});
  const o = (fr, uk, pl, es, ok) => Object.assign({ label: typeof uk === "string" ? L(fr, uk, pl, es) : fr }, ok ? { correct: true } : {});
  const n = (t, ok) => Object.assign({ label: t }, ok ? { correct: true } : {});
  const RETIENS = L("Ce que je retiens", "Що я запам'ятовую", "Co zapamiętuję", "Lo que recuerdo");
  const RAPPEL = L("Rappel", "Повторення", "Powtórka", "Repaso");
  const AUTO = (fr, uk, pl, es) => ({ type: "auto", picto: 3245, verbe: "CHOISIS", consigne: L(fr, uk, pl, es) });

  /* ---------- Documents ---------- */
  const DOC = {
    frise: { n: 1, src: IMG + "frise-periodes.svg",
      legende: L("Frise des cinq grandes périodes de l'histoire, avec les dates qui les séparent.", "Стрічка часу з п'ятьма великими періодами історії та датами між ними.", "Oś czasu z pięcioma wielkimi okresami historii i datami, które je oddzielają.", "Línea del tiempo con los cinco grandes periodos de la historia y las fechas que los separan."),
      credit: "Réalisé par T.Marlair" },
    continents: { n: 1, src: IMG + "continents-oceans.png",
      legende: L("Carte du monde : les continents (en couleur) et les océans (en bleu).", "Карта світу: континенти (кольорові) та океани (синім).", "Mapa świata: kontynenty (w kolorze) i oceany (na niebiesko).", "Mapa del mundo: los continentes (en color) y los océanos (en azul)."),
      credit: "Réalisé par T.Marlair sur base de la carte de Cogito ergo sumo (Wikimedia Commons, CC BY-SA 3.0)" },
    ue: { n: 1, src: IMG + "ue-27.png",
      legende: L("Carte de l'Union européenne : les 27 pays membres sont en bleu. Le point jaune montre la Belgique.", "Карта Європейського Союзу: 27 країн-членів позначено синім. Жовта крапка — Бельгія.", "Mapa Unii Europejskiej: 27 państw członkowskich jest na niebiesko. Żółta kropka to Belgia.", "Mapa de la Unión Europea: los 27 países miembros están en azul. El punto amarillo es Bélgica."),
      credit: "Réalisé par T.Marlair sur base de la carte de Kolja21 (Wikimedia Commons, CC BY 3.0)" },
    belgique: { n: 1, src: "img/belgique/regions-aujourdhui.jpg",
      legende: L("Carte de la Belgique : les régions (couleurs) et les provinces (lignes noires).", "Карта Бельгії: регіони (кольори) і провінції (чорні лінії).", "Mapa Belgii: regiony (kolory) i prowincje (czarne linie).", "Mapa de Bélgica: las regiones (colores) y las provincias (líneas negras)."),
      credit: "Réalisé par T.Marlair sur base de la carte de Jules Rohault (Wikimedia Commons, CC BY-SA 4.0)" },
    echelle: { n: 1, src: IMG + "echelle.svg",
      legende: L("Schéma : comment utiliser l'échelle d'une carte pour calculer une distance.", "Схема: як використати масштаб карти, щоб обчислити відстань.", "Schemat: jak użyć skali mapy, żeby obliczyć odległość.", "Esquema: cómo usar la escala de un mapa para calcular una distancia."),
      credit: "Réalisé par T.Marlair" },
    hydro: { n: 1, src: IMG + "hydrographie.svg",
      legende: L("Schéma : le chemin de l'eau, de la source d'un fleuve jusqu'à la mer.", "Схема: шлях води від витоку річки до моря.", "Schemat: droga wody od źródła rzeki do morza.", "Esquema: el camino del agua, desde la fuente de un río hasta el mar."),
      credit: "Réalisé par T.Marlair" }
  };

  /* ---------- Chapitres (en tête de liste) ---------- */
  P.chapitres.unshift(
    { id: "pr-histoire", discipline: "histoire", prerequis: true,
      titre: L("Rappels : les outils de l'histoire", "Повторення: інструменти історії", "Powtórka: narzędzia historii", "Repaso: las herramientas de la historia"),
      dejaVu: [L("Tu as déjà appris tout ça. Ici, tu revois et tu vérifies si tu maîtrises.", "Ти вже це вчив(ла). Тут ти повторюєш і перевіряєш, чи добре знаєш.", "Już się tego uczyłeś/uczyłaś. Tutaj powtarzasz i sprawdzasz, czy to opanowałeś/opanowałaś.", "Ya aprendiste todo esto. Aquí lo repasas y compruebas si lo dominas.")],
      sequences: ["pr-chrono", "pr-romains", "pr-periodes", "pr-dates", "pr-vocab-hist"], bilan: "bilan-pr-histoire" }
  );
  // Le chapitre de géographie passe aussi devant les autres chapitres de géo.
  P.chapitres.unshift(
    { id: "pr-geo", discipline: "geo", prerequis: true,
      titre: L("Rappels : les outils de la géographie", "Повторення: інструменти географії", "Powtórka: narzędzia geografii", "Repaso: las herramientas de la geografía"),
      dejaVu: [L("Tu as déjà appris tout ça. Ici, tu revois et tu vérifies si tu maîtrises.", "Ти вже це вчив(ла). Тут ти повторюєш і перевіряєш, чи добре знаєш.", "Już się tego uczyłeś/uczyłaś. Tutaj powtarzasz i sprawdzasz, czy to opanowałeś/opanowałaś.", "Ya aprendiste todo esto. Aquí lo repasas y compruebas si lo dominas.")],
      sequences: ["pr-continents", "pr-ue", "pr-belgique", "pr-distances", "pr-rural", "pr-hydro", "pr-vocab-geo"], bilan: "bilan-pr-geo" }
  );

  /* ---------- Séquences : histoire ---------- */
  P.sequences.push(
    { id: "pr-chrono",
      titre: L("La chronologie", "Хронологія", "Chronologia", "La cronología"),
      objectif: L("Je place des dates dans l'ordre et je calcule une durée.", "Я розташовую дати по порядку й обчислюю тривалість.", "Układam daty po kolei i obliczam czas trwania.", "Ordeno fechas y calculo una duración."),
      criteres: [
        crit("pr-chrono-ordre", "Je mets des dates dans l'ordre, avant et après Jésus-Christ.", "Я розташовую дати по порядку, до і після Різдва Христового.", "Układam daty po kolei, przed i po narodzeniu Chrystusa.", "Ordeno fechas, antes y después de Cristo."),
        crit("pr-chrono-duree", "Je calcule le temps entre deux dates.", "Я обчислюю час між двома датами.", "Obliczam czas między dwiema datami.", "Calculo el tiempo entre dos fechas.")
      ],
      etapes: [
        { type: "ressource", titre: L("La ligne du temps", "Стрічка часу", "Oś czasu", "La línea del tiempo"),
          contenu: { textes: [
            L("La chronologie, c'est mettre les événements dans l'ordre du temps.", "Хронологія — це розташування подій у порядку часу.", "Chronologia to układanie wydarzeń w kolejności czasu.", "La cronología es poner los acontecimientos en el orden del tiempo."),
            L("Sur une ligne du temps, le passé est à gauche et le futur à droite.", "На стрічці часу минуле — ліворуч, а майбутнє — праворуч.", "Na osi czasu przeszłość jest po lewej, a przyszłość po prawej.", "En una línea del tiempo, el pasado está a la izquierda y el futuro a la derecha."),
            L("Notre calendrier compte les années à partir de la naissance de Jésus-Christ (l'an 1).", "Наш календар рахує роки від народження Ісуса Христа (1-й рік).", "Nasz kalendarz liczy lata od narodzenia Jezusa Chrystusa (rok 1).", "Nuestro calendario cuenta los años desde el nacimiento de Jesucristo (el año 1)."),
            L("Avant Jésus-Christ, on écrit « av. J.-C. » ou un signe moins : − 3000. Plus le nombre est grand, plus c'est ancien.", "До Різдва Христового пишуть «до н. е.» або знак мінус: − 3000. Чим більше число, тим давніше.", "Przed Chrystusem pisze się „p.n.e.” albo znak minus: − 3000. Im większa liczba, tym dawniej.", "Antes de Cristo se escribe «a. C.» o un signo menos: − 3000. Cuanto más grande es el número, más antiguo es.")
          ] } },
        { type: "ressource", titre: L("Calculer une durée", "Обчислити тривалість", "Obliczyć czas trwania", "Calcular una duración"),
          contenu: { textes: [
            L("Deux dates après J.-C. : la grande date moins la petite. Exemple : 2026 − 1830 = 196 ans.", "Дві дати після Р. Х.: більша дата мінус менша. Приклад: 2026 − 1830 = 196 років.", "Dwie daty po Chrystusie: większa data minus mniejsza. Przykład: 2026 − 1830 = 196 lat.", "Dos fechas después de Cristo: la fecha grande menos la pequeña. Ejemplo: 2026 − 1830 = 196 años."),
            L("Une date avant et une date après J.-C. : on additionne. Exemple : de − 50 à 50, il y a 50 + 50 = 100 ans.", "Одна дата до і одна після Р. Х.: додаємо. Приклад: від − 50 до 50 минуло 50 + 50 = 100 років.", "Jedna data przed i jedna po Chrystusie: dodajemy. Przykład: od − 50 do 50 jest 50 + 50 = 100 lat.", "Una fecha antes y una después de Cristo: se suman. Ejemplo: de − 50 a 50 hay 50 + 50 = 100 años.")
          ] } },
        { type: "minitest", test: "test-pr-chrono" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Ligne du temps : le passé à gauche, le futur à droite.", "Стрічка часу: минуле ліворуч, майбутнє праворуч.", "Oś czasu: przeszłość po lewej, przyszłość po prawej.", "Línea del tiempo: el pasado a la izquierda, el futuro a la derecha."),
          L("Avant J.-C. : plus le nombre est grand, plus c'est ancien (− 3000 est avant − 500).", "До Р. Х.: чим більше число, тим давніше (− 3000 раніше за − 500).", "Przed Chrystusem: im większa liczba, tym dawniej (− 3000 jest przed − 500).", "Antes de Cristo: cuanto más grande el número, más antiguo (− 3000 es antes que − 500)."),
          L("Durée : on soustrait (même côté) ou on additionne (de chaque côté de J.-C.).", "Тривалість: віднімаємо (з одного боку) або додаємо (по різні боки від Р. Х.).", "Czas trwania: odejmujemy (ta sama strona) albo dodajemy (po obu stronach Chrystusa).", "Duración: se resta (mismo lado) o se suma (a cada lado de Cristo).")
        ] } }
      ] },
    { id: "pr-romains",
      titre: L("Les chiffres romains", "Римські цифри", "Cyfry rzymskie", "Los números romanos"),
      objectif: L("Je lis les chiffres romains et je trouve le siècle d'une date.", "Я читаю римські цифри й визначаю століття дати.", "Czytam cyfry rzymskie i znajduję wiek danej daty.", "Leo los números romanos y encuentro el siglo de una fecha."),
      criteres: [
        crit("pr-rom-lire", "Je lis un nombre en chiffres romains.", "Я читаю число римськими цифрами.", "Czytam liczbę zapisaną cyframi rzymskimi.", "Leo un número en números romanos."),
        crit("pr-rom-siecle", "Je trouve le siècle d'une date.", "Я визначаю століття дати.", "Znajduję wiek danej daty.", "Encuentro el siglo de una fecha.")
      ],
      etapes: [
        { type: "ressource", titre: L("Les 7 lettres", "7 літер", "7 liter", "Las 7 letras"),
          contenu: { liste: [ L("I = 1 · V = 5 · X = 10 · L = 50 · C = 100 · D = 500 · M = 1000", "I = 1 · V = 5 · X = 10 · L = 50 · C = 100 · D = 500 · M = 1000", "I = 1 · V = 5 · X = 10 · L = 50 · C = 100 · D = 500 · M = 1000", "I = 1 · V = 5 · X = 10 · L = 50 · C = 100 · D = 500 · M = 1000") ],
            textes: [
              L("Une petite lettre APRÈS une grande : on ajoute. VI = 5 + 1 = 6.", "Мала літера ПІСЛЯ великої: додаємо. VI = 5 + 1 = 6.", "Mała litera PO dużej: dodajemy. VI = 5 + 1 = 6.", "Una letra pequeña DESPUÉS de una grande: se suma. VI = 5 + 1 = 6."),
              L("Une petite lettre AVANT une grande : on enlève. IV = 5 − 1 = 4. IX = 10 − 1 = 9.", "Мала літера ПЕРЕД великою: віднімаємо. IV = 5 − 1 = 4. IX = 10 − 1 = 9.", "Mała litera PRZED dużą: odejmujemy. IV = 5 − 1 = 4. IX = 10 − 1 = 9.", "Una letra pequeña ANTES de una grande: se resta. IV = 5 − 1 = 4. IX = 10 − 1 = 9."),
              L("Exemple : XIX = 10 + 9 = 19.", "Приклад: XIX = 10 + 9 = 19.", "Przykład: XIX = 10 + 9 = 19.", "Ejemplo: XIX = 10 + 9 = 19.")
            ] } },
        { type: "ressource", titre: L("Les siècles", "Століття", "Wieki", "Los siglos"),
          contenu: { textes: [
            L("Un siècle, c'est 100 ans. On écrit le siècle en chiffres romains : le XIXe siècle.", "Століття — це 100 років. Століття пишуть римськими цифрами: XIX століття.", "Wiek to 100 lat. Wiek zapisuje się cyframi rzymskimi: XIX wiek.", "Un siglo son 100 años. El siglo se escribe en números romanos: el siglo XIX."),
            L("Truc : prends les centaines de la date et ajoute 1. 1830 → 18 + 1 = 19 → XIXe siècle.", "Порада: візьми сотні з дати й додай 1. 1830 → 18 + 1 = 19 → XIX століття.", "Sposób: weź setki z daty i dodaj 1. 1830 → 18 + 1 = 19 → XIX wiek.", "Truco: toma las centenas de la fecha y suma 1. 1830 → 18 + 1 = 19 → siglo XIX."),
            L("2026 → 20 + 1 = 21 → nous sommes au XXIe siècle.", "2026 → 20 + 1 = 21 → ми живемо в XXI столітті.", "2026 → 20 + 1 = 21 → żyjemy w XXI wieku.", "2026 → 20 + 1 = 21 → estamos en el siglo XXI.")
          ] } },
        { type: "activite", activite: "pr-act-romains" },
        { type: "minitest", test: "test-pr-romains" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.", "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.", "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.", "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000."),
          L("Petite lettre avant une grande : on enlève (IV = 4).", "Мала літера перед великою: віднімаємо (IV = 4).", "Mała litera przed dużą: odejmujemy (IV = 4).", "Letra pequeña antes de una grande: se resta (IV = 4)."),
          L("Siècle = centaines + 1 (1492 → XVe siècle).", "Століття = сотні + 1 (1492 → XV століття).", "Wiek = setki + 1 (1492 → XV wiek).", "Siglo = centenas + 1 (1492 → siglo XV).")
        ] } }
      ] },
    { id: "pr-periodes",
      titre: L("Les périodes de l'histoire", "Періоди історії", "Okresy historii", "Los periodos de la historia"),
      objectif: L("Je connais les 5 périodes de l'histoire dans l'ordre, avec leurs dates.", "Я знаю 5 періодів історії по порядку, з їхніми датами.", "Znam 5 okresów historii po kolei, z ich datami.", "Conozco los 5 periodos de la historia en orden, con sus fechas."),
      criteres: [
        crit("pr-per-ordre", "Je mets les 5 périodes dans l'ordre.", "Я розташовую 5 періодів по порядку.", "Układam 5 okresów po kolei.", "Ordeno los 5 periodos."),
        crit("pr-per-dates", "Je place un événement dans la bonne période.", "Я розміщую подію у правильному періоді.", "Umieszczam wydarzenie we właściwym okresie.", "Coloco un acontecimiento en el periodo correcto.")
      ],
      etapes: [
        { type: "ressource", titre: L("5 périodes", "5 періодів", "5 okresów", "5 periodos"),
          contenu: { docs: [DOC.frise], textes: [
            L("Préhistoire : avant l'invention de l'écriture (vers − 3000).", "Доісторичні часи: до винайдення письма (близько − 3000).", "Prehistoria: przed wynalezieniem pisma (około − 3000).", "Prehistoria: antes de la invención de la escritura (hacia − 3000)."),
            L("Antiquité : de − 3000 à 476.", "Античність: від − 3000 до 476.", "Starożytność: od − 3000 do 476.", "Antigüedad: de − 3000 a 476."),
            L("Moyen Âge : de 476 à 1492.", "Середньовіччя: від 476 до 1492.", "Średniowiecze: od 476 do 1492.", "Edad Media: de 476 a 1492."),
            L("Temps modernes : de 1492 à 1789.", "Новий час: від 1492 до 1789.", "Czasy nowożytne: od 1492 do 1789.", "Edad Moderna: de 1492 a 1789."),
            L("Époque contemporaine : de 1789 à aujourd'hui.", "Новітній час: від 1789 до сьогодні.", "Czasy współczesne: od 1789 do dziś.", "Edad Contemporánea: de 1789 hasta hoy.")
          ] } },
        { type: "activite", activite: "pr-act-periodes" },
        { type: "minitest", test: "test-pr-periodes" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Préhistoire → Antiquité → Moyen Âge → Temps modernes → Époque contemporaine.", "Доісторичні часи → Античність → Середньовіччя → Новий час → Новітній час.", "Prehistoria → Starożytność → Średniowiecze → Czasy nowożytne → Czasy współczesne.", "Prehistoria → Antigüedad → Edad Media → Edad Moderna → Edad Contemporánea."),
          L("Les dates qui séparent : − 3000, 476, 1492, 1789.", "Дати-межі: − 3000, 476, 1492, 1789.", "Daty graniczne: − 3000, 476, 1492, 1789.", "Las fechas que separan: − 3000, 476, 1492, 1789.")
        ] } }
      ] },
    { id: "pr-dates",
      titre: L("Les dates clés de l'histoire", "Ключові дати історії", "Najważniejsze daty historii", "Las fechas clave de la historia"),
      objectif: L("Je connais les grandes dates et ce qui s'est passé.", "Я знаю головні дати й що тоді сталося.", "Znam najważniejsze daty i to, co się wtedy wydarzyło.", "Conozco las grandes fechas y lo que pasó."),
      criteres: [
        crit("pr-dates-lien", "Je relie une date à son événement.", "Я пов'язую дату з її подією.", "Łączę datę z wydarzeniem.", "Relaciono una fecha con su acontecimiento.")
      ],
      etapes: [
        { type: "ressource", titre: L("Les dates à connaître", "Дати, які треба знати", "Daty, które trzeba znać", "Las fechas que hay que saber"),
          contenu: { liste: [
            L("− 3000 : invention de l'écriture.", "− 3000: винайдення письма.", "− 3000: wynalezienie pisma.", "− 3000: invención de la escritura."),
            L("476 : fin de l'Empire romain d'Occident.", "476: кінець Західної Римської імперії.", "476: koniec Cesarstwa Zachodniorzymskiego.", "476: fin del Imperio romano de Occidente."),
            L("1492 : Christophe Colomb arrive en Amérique.", "1492: Христофор Колумб прибуває до Америки.", "1492: Krzysztof Kolumb dociera do Ameryki.", "1492: Cristóbal Colón llega a América."),
            L("1789 : la Révolution française.", "1789: Французька революція.", "1789: rewolucja francuska.", "1789: la Revolución francesa."),
            L("1830 : la Belgique devient indépendante.", "1830: Бельгія стає незалежною.", "1830: Belgia staje się niepodległa.", "1830: Bélgica se independiza."),
            L("1914-1918 : la Première Guerre mondiale.", "1914–1918: Перша світова війна.", "1914–1918: pierwsza wojna światowa.", "1914-1918: la Primera Guerra Mundial."),
            L("1939-1945 : la Seconde Guerre mondiale.", "1939–1945: Друга світова війна.", "1939–1945: druga wojna światowa.", "1939-1945: la Segunda Guerra Mundial."),
            L("1957 : six pays, dont la Belgique, créent la Communauté européenne (l'ancêtre de l'Union européenne).", "1957: шість країн, серед них Бельгія, створюють Європейську спільноту (попередницю Європейського Союзу).", "1957: sześć państw, w tym Belgia, tworzy Wspólnotę Europejską (poprzedniczkę Unii Europejskiej).", "1957: seis países, entre ellos Bélgica, crean la Comunidad Europea (la antecesora de la Unión Europea).")
          ] } },
        { type: "minitest", test: "test-pr-dates" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("− 3000, 476, 1492, 1789 : les débuts des périodes.", "− 3000, 476, 1492, 1789: початки періодів.", "− 3000, 476, 1492, 1789: początki okresów.", "− 3000, 476, 1492, 1789: los comienzos de los periodos."),
          L("1830 : Belgique. 1914-1918 et 1939-1945 : les guerres mondiales. 1957 : l'Europe unie commence.", "1830: Бельгія. 1914–1918 і 1939–1945: світові війни. 1957: початок об'єднаної Європи.", "1830: Belgia. 1914–1918 i 1939–1945: wojny światowe. 1957: początek zjednoczonej Europy.", "1830: Bélgica. 1914-1918 y 1939-1945: las guerras mundiales. 1957: empieza la Europa unida.")
        ] } }
      ] },
    { id: "pr-vocab-hist",
      titre: L("Les mots de l'histoire", "Слова історії", "Słowa historii", "Las palabras de la historia"),
      objectif: L("Je comprends les mots qu'on utilise souvent en histoire.", "Я розумію слова, які часто вживають на уроках історії.", "Rozumiem słowa, których często używa się na historii.", "Entiendo las palabras que se usan a menudo en historia."),
      criteres: [
        crit("pr-vh-mots", "Je connais le sens des mots de base de l'histoire.", "Я знаю значення базових слів історії.", "Znam znaczenie podstawowych słów historii.", "Conozco el significado de las palabras básicas de la historia.")
      ],
      etapes: [
        { type: "ressource", titre: L("Les mots à connaître", "Слова, які треба знати", "Słowa, które trzeba znać", "Las palabras que hay que saber"),
          contenu: { liste: [
            L("un siècle = 100 ans · un millénaire = 1000 ans", "століття = 100 років · тисячоліття = 1000 років", "wiek = 100 lat · tysiąclecie = 1000 lat", "un siglo = 100 años · un milenio = 1000 años"),
            L("un événement = quelque chose d'important qui se passe à un moment précis", "подія = щось важливе, що стається в певний момент", "wydarzenie = coś ważnego, co dzieje się w określonym momencie", "un acontecimiento = algo importante que pasa en un momento preciso"),
            L("une période = une longue partie du temps (ex. : le Moyen Âge)", "період = довгий відрізок часу (напр.: Середньовіччя)", "okres = długi odcinek czasu (np. średniowiecze)", "un periodo = una parte larga del tiempo (ej.: la Edad Media)"),
            L("une source = un document qui nous informe sur le passé", "джерело = документ, який розповідає нам про минуле", "źródło = dokument, który informuje nas o przeszłości", "una fuente = un documento que nos informa sobre el pasado"),
            L("une trace du passé = faite à l'époque · un travail postérieur = fait plus tard", "слід минулого = зроблено в той час · пізніша праця = зроблено пізніше", "ślad przeszłości = zrobiony w tamtych czasach · praca późniejsza = zrobiona później", "una huella del pasado = hecha en esa época · un trabajo posterior = hecho más tarde"),
            L("un historien, une historienne = une personne qui étudie le passé avec des sources", "історик, історикиня = людина, яка вивчає минуле за джерелами", "historyk, historyczka = osoba, która bada przeszłość na podstawie źródeł", "un historiador, una historiadora = una persona que estudia el pasado con fuentes")
          ] } },
        { type: "minitest", test: "test-pr-vocab-hist" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Siècle = 100 ans. Millénaire = 1000 ans.", "Століття = 100 років. Тисячоліття = 1000 років.", "Wiek = 100 lat. Tysiąclecie = 1000 lat.", "Siglo = 100 años. Milenio = 1000 años."),
          L("Pour savoir ce qui s'est passé, l'historien utilise des sources : des traces du passé et des travaux postérieurs.", "Щоб дізнатися, що сталося, історик використовує джерела: сліди минулого й пізніші праці.", "Żeby wiedzieć, co się stało, historyk korzysta ze źródeł: śladów przeszłości i prac późniejszych.", "Para saber lo que pasó, el historiador usa fuentes: huellas del pasado y trabajos posteriores.")
        ] } }
      ] }
  );

  /* ---------- Séquences : géographie ---------- */
  P.sequences.push(
    { id: "pr-continents",
      titre: L("Les continents et les océans", "Континенти та океани", "Kontynenty i oceany", "Los continentes y los océanos"),
      objectif: L("Je nomme et je situe les continents et les océans sur une carte du monde.", "Я називаю й знаходжу континенти та океани на карті світу.", "Nazywam i wskazuję kontynenty oraz oceany na mapie świata.", "Nombro y sitúo los continentes y los océanos en un mapa del mundo."),
      criteres: [
        crit("pr-cont-continents", "Je situe les continents sur la carte.", "Я знаходжу континенти на карті.", "Wskazuję kontynenty na mapie.", "Sitúo los continentes en el mapa."),
        crit("pr-cont-oceans", "Je situe les océans sur la carte.", "Я знаходжу океани на карті.", "Wskazuję oceany na mapie.", "Sitúo los océanos en el mapa.")
      ],
      etapes: [
        { type: "ressource", titre: L("La carte du monde", "Карта світу", "Mapa świata", "El mapa del mundo"),
          contenu: { docs: [DOC.continents], textes: [
            L("Un continent est une très grande étendue de terre.", "Континент — це дуже велика ділянка суходолу.", "Kontynent to bardzo duży obszar lądu.", "Un continente es una extensión de tierra muy grande."),
            L("Sur la carte, il y a 7 continents : Europe, Asie, Afrique, Amérique du Nord, Amérique du Sud, Océanie, Antarctique. On compte parfois l'Amérique comme un seul continent : alors il y en a 6.", "На карті 7 континентів: Європа, Азія, Африка, Північна Америка, Південна Америка, Океанія, Антарктида. Іноді Америку вважають одним континентом: тоді їх 6.", "Na mapie jest 7 kontynentów: Europa, Azja, Afryka, Ameryka Północna, Ameryka Południowa, Oceania, Antarktyda. Czasem liczy się Amerykę jako jeden kontynent: wtedy jest ich 6.", "En el mapa hay 7 continentes: Europa, Asia, África, América del Norte, América del Sur, Oceanía, Antártida. A veces se cuenta América como un solo continente: entonces hay 6."),
            L("Il y a 5 océans : Pacifique (le plus grand), Atlantique, Indien, Arctique (au nord), Austral (au sud).", "Є 5 океанів: Тихий (найбільший), Атлантичний, Індійський, Північний Льодовитий (на півночі), Південний (на півдні).", "Jest 5 oceanów: Spokojny (największy), Atlantycki, Indyjski, Arktyczny (na północy), Południowy (na południu).", "Hay 5 océanos: Pacífico (el más grande), Atlántico, Índico, Ártico (al norte), Austral (al sur)."),
            L("La Belgique est en Europe, au bord de la mer du Nord (océan Atlantique).", "Бельгія в Європі, на березі Північного моря (Атлантичний океан).", "Belgia leży w Europie, nad Morzem Północnym (Ocean Atlantycki).", "Bélgica está en Europa, a orillas del mar del Norte (océano Atlántico).")
          ] } },
        { type: "minitest", test: "test-pr-continents" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Continents : Europe, Asie, Afrique, Amérique (du Nord et du Sud), Océanie, Antarctique.", "Континенти: Європа, Азія, Африка, Америка (Північна й Південна), Океанія, Антарктида.", "Kontynenty: Europa, Azja, Afryka, Ameryka (Północna i Południowa), Oceania, Antarktyda.", "Continentes: Europa, Asia, África, América (del Norte y del Sur), Oceanía, Antártida."),
          L("Océans : Pacifique, Atlantique, Indien, Arctique, Austral.", "Океани: Тихий, Атлантичний, Індійський, Північний Льодовитий, Південний.", "Oceany: Spokojny, Atlantycki, Indyjski, Arktyczny, Południowy.", "Océanos: Pacífico, Atlántico, Índico, Ártico, Austral.")
        ] } }
      ] },
    { id: "pr-ue",
      titre: L("Les pays de l'Union européenne", "Країни Європейського Союзу", "Państwa Unii Europejskiej", "Los países de la Unión Europea"),
      objectif: L("Je sais ce qu'est l'Union européenne et je reconnais ses pays.", "Я знаю, що таке Європейський Союз, і впізнаю його країни.", "Wiem, czym jest Unia Europejska, i rozpoznaję jej państwa.", "Sé qué es la Unión Europea y reconozco sus países."),
      criteres: [
        crit("pr-ue-def", "Je sais ce qu'est l'Union européenne.", "Я знаю, що таке Європейський Союз.", "Wiem, czym jest Unia Europejska.", "Sé qué es la Unión Europea."),
        crit("pr-ue-pays", "Je dis si un pays est membre de l'UE.", "Я кажу, чи країна є членом ЄС.", "Mówię, czy państwo jest członkiem UE.", "Digo si un país es miembro de la UE.")
      ],
      etapes: [
        { type: "ressource", titre: L("27 pays ensemble", "27 країн разом", "27 państw razem", "27 países juntos"),
          contenu: { docs: [DOC.ue], textes: [
            L("L'Union européenne (UE) est un groupe de 27 pays d'Europe qui travaillent ensemble.", "Європейський Союз (ЄС) — це група з 27 країн Європи, які працюють разом.", "Unia Europejska (UE) to grupa 27 państw Europy, które współpracują.", "La Unión Europea (UE) es un grupo de 27 países de Europa que trabajan juntos."),
            L("Beaucoup de pays de l'UE utilisent la même monnaie : l'euro.", "Багато країн ЄС використовують одну валюту: євро.", "Wiele państw UE używa tej samej waluty: euro.", "Muchos países de la UE usan la misma moneda: el euro."),
            L("Des institutions importantes de l'UE sont à Bruxelles.", "Важливі установи ЄС розташовані в Брюсселі.", "Ważne instytucje UE znajdują się w Brukseli.", "Instituciones importantes de la UE están en Bruselas."),
            L("L'Ukraine n'est pas membre : c'est un pays candidat. La Suisse, la Norvège et le Royaume-Uni ne sont pas membres.", "Україна не є членом: це країна-кандидат. Швейцарія, Норвегія та Велика Британія не є членами.", "Ukraina nie jest członkiem: to kraj kandydujący. Szwajcaria, Norwegia i Wielka Brytania nie są członkami.", "Ucrania no es miembro: es un país candidato. Suiza, Noruega y el Reino Unido no son miembros.")
          ],
          liste: [
            L("Les 27 : Allemagne, Autriche, Belgique, Bulgarie, Chypre, Croatie, Danemark, Espagne, Estonie, Finlande, France, Grèce, Hongrie, Irlande, Italie, Lettonie, Lituanie, Luxembourg, Malte, Pays-Bas, Pologne, Portugal, Roumanie, Slovaquie, Slovénie, Suède, Tchéquie.",
              "27 країн: Німеччина, Австрія, Бельгія, Болгарія, Кіпр, Хорватія, Данія, Іспанія, Естонія, Фінляндія, Франція, Греція, Угорщина, Ірландія, Італія, Латвія, Литва, Люксембург, Мальта, Нідерланди, Польща, Португалія, Румунія, Словаччина, Словенія, Швеція, Чехія.",
              "27 państw: Niemcy, Austria, Belgia, Bułgaria, Cypr, Chorwacja, Dania, Hiszpania, Estonia, Finlandia, Francja, Grecja, Węgry, Irlandia, Włochy, Łotwa, Litwa, Luksemburg, Malta, Holandia, Polska, Portugalia, Rumunia, Słowacja, Słowenia, Szwecja, Czechy.",
              "Los 27: Alemania, Austria, Bélgica, Bulgaria, Chipre, Croacia, Dinamarca, España, Estonia, Finlandia, Francia, Grecia, Hungría, Irlanda, Italia, Letonia, Lituania, Luxemburgo, Malta, Países Bajos, Polonia, Portugal, Rumanía, Eslovaquia, Eslovenia, Suecia, Chequia."),
            L("Les 6 pays fondateurs (1957) : Belgique, France, Allemagne, Italie, Luxembourg, Pays-Bas.", "6 країн-засновниць (1957): Бельгія, Франція, Німеччина, Італія, Люксембург, Нідерланди.", "6 państw założycielskich (1957): Belgia, Francja, Niemcy, Włochy, Luksemburg, Holandia.", "Los 6 países fundadores (1957): Bélgica, Francia, Alemania, Italia, Luxemburgo, Países Bajos.")
          ] } },
        { type: "minitest", test: "test-pr-ue" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("L'UE : 27 pays d'Europe qui travaillent ensemble.", "ЄС: 27 країн Європи, які працюють разом.", "UE: 27 państw Europy, które współpracują.", "La UE: 27 países de Europa que trabajan juntos."),
          L("La Belgique est un pays fondateur (1957). Bruxelles accueille des institutions de l'UE.", "Бельгія — країна-засновниця (1957). У Брюсселі розташовані установи ЄС.", "Belgia jest państwem założycielskim (1957). W Brukseli mieszczą się instytucje UE.", "Bélgica es un país fundador (1957). Bruselas acoge instituciones de la UE.")
        ] } }
      ] },
    { id: "pr-belgique",
      titre: L("La Belgique fédérale", "Федеративна Бельгія", "Belgia federalna", "La Bélgica federal"),
      objectif: L("Je connais les communautés, les régions, les provinces et leurs chefs-lieux.", "Я знаю спільноти, регіони, провінції та їхні адміністративні центри.", "Znam wspólnoty, regiony, prowincje i ich stolice.", "Conozco las comunidades, las regiones, las provincias y sus capitales."),
      criteres: [
        crit("pr-be-regions", "Je connais les 3 régions et les 3 communautés.", "Я знаю 3 регіони та 3 спільноти.", "Znam 3 regiony i 3 wspólnoty.", "Conozco las 3 regiones y las 3 comunidades."),
        crit("pr-be-provinces", "Je relie une province à son chef-lieu et à sa région.", "Я пов'язую провінцію з її центром і регіоном.", "Łączę prowincję z jej stolicą i regionem.", "Relaciono una provincia con su capital y su región.")
      ],
      etapes: [
        { type: "ressource", titre: L("Régions et communautés", "Регіони та спільноти", "Regiony i wspólnoty", "Regiones y comunidades"),
          contenu: { docs: [DOC.belgique], textes: [
            L("3 régions (le territoire) : la Région flamande, la Région wallonne, la Région de Bruxelles-Capitale.", "3 регіони (територія): Фламандський, Валлонський, Брюссельський столичний.", "3 regiony (terytorium): Region Flamandzki, Region Waloński, Region Stołeczny Brukseli.", "3 regiones (el territorio): la Región Flamenca, la Región Valona, la Región de Bruselas-Capital."),
            L("3 communautés (la langue) : flamande (néerlandais), française, germanophone (allemand).", "3 спільноти (мова): фламандська (нідерландська), французька, німецькомовна (німецька).", "3 wspólnoty (język): flamandzka (niderlandzki), francuska, niemieckojęzyczna (niemiecki).", "3 comunidades (el idioma): flamenca (neerlandés), francesa, germanófona (alemán)."),
            L("Bruxelles est la capitale de la Belgique. Ce n'est pas une province.", "Брюссель — столиця Бельгії. Це не провінція.", "Bruksela jest stolicą Belgii. To nie jest prowincja.", "Bruselas es la capital de Bélgica. No es una provincia.")
          ] } },
        { type: "ressource", titre: L("Les 10 provinces", "10 провінцій", "10 prowincji", "Las 10 provincias"),
          contenu: { docs: [DOC.belgique], liste: [
            L("En Wallonie : Liège (Liège) · Namur (Namur) · Hainaut (Mons) · Luxembourg (Arlon) · Brabant wallon (Wavre).", "У Валлонії: Льєж (Льєж) · Намюр (Намюр) · Ено (Монс) · Люксембург (Арлон) · Валлонський Брабант (Вавр).", "W Walonii: Liège (Liège) · Namur (Namur) · Hainaut (Mons) · Luksemburg (Arlon) · Brabancja Walońska (Wavre).", "En Valonia: Lieja (Lieja) · Namur (Namur) · Henao (Mons) · Luxemburgo (Arlon) · Brabante Valón (Wavre)."),
            L("En Flandre : Anvers (Anvers) · Limbourg (Hasselt) · Flandre-Orientale (Gand) · Flandre-Occidentale (Bruges) · Brabant flamand (Louvain).", "У Фландрії: Антверпен (Антверпен) · Лімбург (Гасселт) · Східна Фландрія (Гент) · Західна Фландрія (Брюгге) · Фламандський Брабант (Лувен).", "We Flandrii: Antwerpia (Antwerpia) · Limburgia (Hasselt) · Flandria Wschodnia (Gandawa) · Flandria Zachodnia (Brugia) · Brabancja Flamandzka (Leuven).", "En Flandes: Amberes (Amberes) · Limburgo (Hasselt) · Flandes Oriental (Gante) · Flandes Occidental (Brujas) · Brabante Flamenco (Lovaina)."),
            L("Entre parenthèses : le chef-lieu, la ville principale de la province. Huy est dans la province de Liège.", "У дужках: адміністративний центр, головне місто провінції. Юї — у провінції Льєж.", "W nawiasach: stolica prowincji, jej główne miasto. Huy leży w prowincji Liège.", "Entre paréntesis: la capital, la ciudad principal de la provincia. Huy está en la provincia de Lieja.")
          ] } },
        { type: "activite", activite: "pr-act-provinces" },
        { type: "minitest", test: "test-pr-belgique" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("3 régions, 3 communautés, 10 provinces (5 en Flandre, 5 en Wallonie).", "3 регіони, 3 спільноти, 10 провінцій (5 у Фландрії, 5 у Валлонії).", "3 regiony, 3 wspólnoty, 10 prowincji (5 we Flandrii, 5 w Walonii).", "3 regiones, 3 comunidades, 10 provincias (5 en Flandes, 5 en Valonia)."),
          L("Bruxelles : capitale et région, pas une province.", "Брюссель: столиця й регіон, не провінція.", "Bruksela: stolica i region, nie prowincja.", "Bruselas: capital y región, no provincia."),
          L("Huy → province de Liège → chef-lieu : Liège → Région wallonne.", "Юї → провінція Льєж → центр: Льєж → Валлонський регіон.", "Huy → prowincja Liège → stolica: Liège → Region Waloński.", "Huy → provincia de Lieja → capital: Lieja → Región Valona.")
        ] } }
      ] },
    { id: "pr-distances",
      titre: L("Calculer une distance", "Обчислити відстань", "Obliczyć odległość", "Calcular una distancia"),
      objectif: L("J'utilise l'échelle d'une carte pour calculer une distance réelle.", "Я використовую масштаб карти, щоб обчислити справжню відстань.", "Używam skali mapy, żeby obliczyć rzeczywistą odległość.", "Uso la escala de un mapa para calcular una distancia real."),
      criteres: [
        crit("pr-dist-echelle", "Je lis l'échelle d'une carte.", "Я читаю масштаб карти.", "Czytam skalę mapy.", "Leo la escala de un mapa."),
        crit("pr-dist-calcul", "Je calcule une distance réelle.", "Я обчислюю справжню відстань.", "Obliczam rzeczywistą odległość.", "Calculo una distancia real.")
      ],
      etapes: [
        { type: "ressource", titre: L("L'échelle", "Масштаб", "Skala", "La escala"),
          contenu: { docs: [DOC.echelle], textes: [
            L("Une carte est plus petite que la réalité. L'échelle dit combien elle est réduite.", "Карта менша за реальність. Масштаб показує, у скільки разів її зменшено.", "Mapa jest mniejsza niż rzeczywistość. Skala mówi, ile razy ją pomniejszono.", "Un mapa es más pequeño que la realidad. La escala dice cuánto se ha reducido."),
            L("1. Mesure avec ta latte la distance sur la carte (en cm).", "1. Виміряй лінійкою відстань на карті (у см).", "1. Zmierz linijką odległość na mapie (w cm).", "1. Mide con tu regla la distancia en el mapa (en cm)."),
            L("2. Regarde l'échelle : 1 cm = combien de km ?", "2. Подивись на масштаб: 1 см = скільки км?", "2. Spójrz na skalę: 1 cm = ile km?", "2. Mira la escala: 1 cm = ¿cuántos km?"),
            L("3. Multiplie : cm × km = distance réelle.", "3. Помнож: см × км = справжня відстань.", "3. Pomnóż: cm × km = rzeczywista odległość.", "3. Multiplica: cm × km = distancia real."),
            L("Échelle 1/100 000 : 1 cm sur la carte = 100 000 cm = 1 km dans la réalité.", "Масштаб 1:100 000: 1 см на карті = 100 000 см = 1 км у реальності.", "Skala 1:100 000: 1 cm na mapie = 100 000 cm = 1 km w rzeczywistości.", "Escala 1/100 000: 1 cm en el mapa = 100 000 cm = 1 km en la realidad.")
          ] } },
        { type: "activite", activite: "pr-act-distances" },
        { type: "minitest", test: "test-pr-distances" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Distance réelle = distance sur la carte (cm) × valeur de 1 cm (km).", "Справжня відстань = відстань на карті (см) × значення 1 см (км).", "Rzeczywista odległość = odległość na mapie (cm) × wartość 1 cm (km).", "Distancia real = distancia en el mapa (cm) × valor de 1 cm (km)."),
          L("1/100 000 : 1 cm = 1 km.", "1:100 000: 1 см = 1 км.", "1:100 000: 1 cm = 1 km.", "1/100 000: 1 cm = 1 km.")
        ] } }
      ] },
    { id: "pr-rural",
      titre: L("Milieu rural et milieu urbain", "Сільська та міська місцевість", "Obszar wiejski i miejski", "Medio rural y medio urbano"),
      objectif: L("Je reconnais un milieu rural et un milieu urbain.", "Я розпізнаю сільську й міську місцевість.", "Rozpoznaję obszar wiejski i miejski.", "Reconozco un medio rural y un medio urbano."),
      criteres: [
        crit("pr-ru-reconnaitre", "Je classe des éléments : rural ou urbain.", "Я сортую елементи: сільське чи міське.", "Klasyfikuję elementy: wiejskie czy miejskie.", "Clasifico elementos: rural o urbano.")
      ],
      etapes: [
        { type: "ressource", titre: L("La ville et la campagne", "Місто і село", "Miasto i wieś", "La ciudad y el campo"),
          contenu: { textes: [
            L("Le milieu urbain, c'est la ville : beaucoup d'habitants, des immeubles, des magasins, des bus et des trains.", "Міська місцевість — це місто: багато мешканців, багатоповерхівки, магазини, автобуси й поїзди.", "Obszar miejski to miasto: dużo mieszkańców, bloki, sklepy, autobusy i pociągi.", "El medio urbano es la ciudad: muchos habitantes, edificios, tiendas, autobuses y trenes."),
            L("Le milieu rural, c'est la campagne : des champs, des prairies, des fermes, des villages et moins d'habitants.", "Сільська місцевість — це село: поля, луки, ферми, села й менше мешканців.", "Obszar wiejski to wieś: pola, łąki, gospodarstwa, wioski i mniej mieszkańców.", "El medio rural es el campo: campos, prados, granjas, pueblos y menos habitantes."),
            L("Huy est une petite ville. Autour de Huy, en Hesbaye et dans le Condroz, c'est surtout la campagne.", "Юї — невелике місто. Навколо Юї, в Есбеї та Кондрозі, переважно сільська місцевість.", "Huy to małe miasto. Wokół Huy, w Hesbaye i Condroz, jest głównie wieś.", "Huy es una ciudad pequeña. Alrededor de Huy, en Hesbaye y en el Condroz, es sobre todo campo.")
          ] } },
        { type: "activite", activite: "pr-act-rural" },
        { type: "minitest", test: "test-pr-rural" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Urbain = ville : beaucoup d'habitants, de bâtiments et de services.", "Міське = місто: багато мешканців, будівель і послуг.", "Miejskie = miasto: dużo mieszkańców, budynków i usług.", "Urbano = ciudad: muchos habitantes, edificios y servicios."),
          L("Rural = campagne : champs, fermes, villages, peu d'habitants.", "Сільське = село: поля, ферми, села, мало мешканців.", "Wiejskie = wieś: pola, gospodarstwa, wioski, mało mieszkańców.", "Rural = campo: campos, granjas, pueblos, pocos habitantes.")
        ] } }
      ] },
    { id: "pr-hydro",
      titre: L("L'hydrographie : les cours d'eau", "Гідрографія: водотоки", "Hydrografia: cieki wodne", "La hidrografía: los cursos de agua"),
      objectif: L("Je connais les mots des cours d'eau et je les utilise pour la Meuse.", "Я знаю слова про водотоки й застосовую їх до Маасу.", "Znam słowa dotyczące cieków wodnych i używam ich do opisu Mozy.", "Conozco las palabras de los cursos de agua y las uso para el Mosa."),
      criteres: [
        crit("pr-hy-mots", "Je connais source, affluent, confluent, embouchure, fleuve, rivière.", "Я знаю: витік, притока, злиття, гирло, ріка, річка.", "Znam: źródło, dopływ, ujście dopływu, ujście, rzeka, rzeka-dopływ.", "Conozco: fuente, afluente, confluencia, desembocadura, río, río afluente."),
        crit("pr-hy-meuse", "Je décris le parcours de la Meuse.", "Я описую шлях Маасу.", "Opisuję bieg Mozy.", "Describo el recorrido del Mosa.")
      ],
      etapes: [
        { type: "ressource", titre: L("Le chemin de l'eau", "Шлях води", "Droga wody", "El camino del agua"),
          contenu: { docs: [DOC.hydro], liste: [
            L("la source : l'endroit où le cours d'eau commence", "витік: місце, де починається водотік", "źródło: miejsce, gdzie zaczyna się ciek wodny", "la fuente: el lugar donde empieza el curso de agua"),
            L("un affluent : un cours d'eau qui se jette dans un autre", "притока: водотік, що впадає в інший", "dopływ: ciek wodny, który wpada do innego", "un afluente: un curso de agua que desemboca en otro"),
            L("le confluent : l'endroit où deux cours d'eau se rejoignent", "злиття: місце, де зустрічаються два водотоки", "ujście dopływu (konfluencja): miejsce, gdzie łączą się dwa cieki", "la confluencia: el lugar donde se juntan dos cursos de agua"),
            L("l'embouchure : l'endroit où le fleuve arrive dans la mer", "гирло: місце, де ріка впадає в море", "ujście: miejsce, gdzie rzeka wpada do morza", "la desembocadura: el lugar donde el río llega al mar"),
            L("un fleuve se jette dans la mer · une rivière se jette dans un autre cours d'eau", "ріка (fleuve) впадає в море · річка (rivière) впадає в інший водотік", "rzeka (fleuve) wpada do morza · rzeka (rivière) wpada do innego cieku", "un río (fleuve) desemboca en el mar · un río (rivière) desemboca en otro curso de agua")
          ] } },
        { type: "ressource", titre: L("La Meuse, notre fleuve", "Маас — наша ріка", "Moza, nasza rzeka", "El Mosa, nuestro río"),
          contenu: { textes: [
            L("La Meuse prend sa source en France. Elle traverse la Belgique (Namur, Huy, Liège), puis les Pays-Bas. Son embouchure est dans la mer du Nord : c'est un fleuve.", "Маас бере початок у Франції. Він протікає через Бельгію (Намюр, Юї, Льєж), потім Нідерланди. Його гирло — у Північному морі: це ріка (fleuve).", "Moza ma źródło we Francji. Płynie przez Belgię (Namur, Huy, Liège), potem przez Holandię. Jej ujście jest w Morzu Północnym: to rzeka (fleuve).", "El Mosa nace en Francia. Atraviesa Bélgica (Namur, Huy, Lieja) y luego los Países Bajos. Su desembocadura está en el mar del Norte: es un río (fleuve)."),
            L("À Huy, le Hoyoux se jette dans la Meuse : le Hoyoux est un affluent de la Meuse. Le confluent est à Huy.", "У Юї річка Уаю впадає в Маас: Уаю — притока Маасу. Злиття — в Юї.", "W Huy rzeka Hoyoux wpada do Mozy: Hoyoux jest dopływem Mozy. Miejsce połączenia jest w Huy.", "En Huy, el Hoyoux desemboca en el Mosa: el Hoyoux es un afluente del Mosa. La confluencia está en Huy."),
            L("À Namur, la Sambre se jette dans la Meuse. À Liège, c'est l'Ourthe.", "У Намюрі в Маас впадає Самбра. У Льєжі — Урт.", "W Namur do Mozy wpada Sambra. W Liège — Ourthe.", "En Namur, el Sambre desemboca en el Mosa. En Lieja, es el Ourthe.")
          ] } },
        { type: "minitest", test: "test-pr-hydro" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Source → cours d'eau → (affluents et confluents) → embouchure.", "Витік → водотік → (притоки й злиття) → гирло.", "Źródło → ciek → (dopływy i połączenia) → ujście.", "Fuente → curso de agua → (afluentes y confluencias) → desembocadura."),
          L("La Meuse est un fleuve : source en France, embouchure dans la mer du Nord.", "Маас — ріка: витік у Франції, гирло в Північному морі.", "Moza to rzeka: źródło we Francji, ujście w Morzu Północnym.", "El Mosa es un río: nace en Francia y desemboca en el mar del Norte."),
          L("Le Hoyoux est un affluent de la Meuse, à Huy.", "Уаю — притока Маасу, в Юї.", "Hoyoux to dopływ Mozy, w Huy.", "El Hoyoux es un afluente del Mosa, en Huy.")
        ] } }
      ] },
    { id: "pr-vocab-geo",
      titre: L("Les mots de la géographie", "Слова географії", "Słowa geografii", "Las palabras de la geografía"),
      objectif: L("Je comprends les mots qu'on utilise souvent en géographie.", "Я розумію слова, які часто вживають на уроках географії.", "Rozumiem słowa, których często używa się na geografii.", "Entiendo las palabras que se usan a menudo en geografía."),
      criteres: [
        crit("pr-vg-carte", "Je connais les éléments d'une carte (titre, légende, échelle, orientation).", "Я знаю елементи карти (назва, легенда, масштаб, орієнтація).", "Znam elementy mapy (tytuł, legenda, skala, orientacja).", "Conozco los elementos de un mapa (título, leyenda, escala, orientación)."),
        crit("pr-vg-relief", "Je connais les mots du relief et des paysages.", "Я знаю слова про рельєф і краєвиди.", "Znam słowa dotyczące rzeźby terenu i krajobrazów.", "Conozco las palabras del relieve y de los paisajes.")
      ],
      etapes: [
        { type: "ressource", titre: L("Lire une carte", "Читати карту", "Czytać mapę", "Leer un mapa"),
          contenu: { liste: [
            L("le titre : de quoi parle la carte", "назва: про що карта", "tytuł: o czym jest mapa", "el título: de qué trata el mapa"),
            L("la légende : explique les couleurs et les symboles", "легенда: пояснює кольори й умовні знаки", "legenda: objaśnia kolory i symbole", "la leyenda: explica los colores y los símbolos"),
            L("l'échelle : pour calculer les distances", "масштаб: щоб обчислювати відстані", "skala: do obliczania odległości", "la escala: para calcular las distancias"),
            L("l'orientation : Nord (en haut), Sud, Est (à droite), Ouest (à gauche) — la rose des vents", "орієнтація: Північ (вгорі), Південь, Схід (праворуч), Захід (ліворуч) — роза вітрів", "orientacja: Północ (u góry), Południe, Wschód (po prawej), Zachód (po lewej) — róża wiatrów", "la orientación: Norte (arriba), Sur, Este (a la derecha), Oeste (a la izquierda) — la rosa de los vientos"),
            L("une frontière : la limite entre deux pays · une capitale : la ville où se trouve le gouvernement", "кордон: межа між двома країнами · столиця: місто, де розташований уряд", "granica: linia między dwoma państwami · stolica: miasto, w którym jest rząd", "una frontera: el límite entre dos países · una capital: la ciudad donde está el gobierno")
          ] } },
        { type: "ressource", titre: L("Le relief et les paysages", "Рельєф і краєвиди", "Rzeźba terenu i krajobrazy", "El relieve y los paisajes"),
          contenu: { liste: [
            L("le relief : les formes du terrain (haut ou bas)", "рельєф: форми місцевості (високо чи низько)", "rzeźba terenu: kształty powierzchni (wysoko lub nisko)", "el relieve: las formas del terreno (alto o bajo)"),
            L("une plaine : un terrain bas et plat · un plateau : un terrain plat mais en hauteur", "рівнина: низька пласка місцевість · плато: пласка, але висока місцевість", "nizina: niski i płaski teren · płaskowyż: płaski, ale wysoko położony teren", "una llanura: un terreno bajo y plano · una meseta: un terreno plano pero alto"),
            L("une montagne : un relief très haut · une vallée : un creux où coule souvent un cours d'eau", "гора: дуже висока форма рельєфу · долина: заглибина, де часто тече річка", "góra: bardzo wysoka forma terenu · dolina: zagłębienie, w którym często płynie rzeka", "una montaña: un relieve muy alto · un valle: un hueco por donde suele correr un río"),
            L("Huy est dans la vallée de la Meuse.", "Юї — в долині Маасу.", "Huy leży w dolinie Mozy.", "Huy está en el valle del Mosa.")
          ] } },
        { type: "minitest", test: "test-pr-vocab-geo" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Une carte : titre, légende, échelle, orientation.", "Карта: назва, легенда, масштаб, орієнтація.", "Mapa: tytuł, legenda, skala, orientacja.", "Un mapa: título, leyenda, escala, orientación."),
          L("Nord en haut, Est à droite, Ouest à gauche, Sud en bas.", "Північ угорі, Схід праворуч, Захід ліворуч, Південь унизу.", "Północ u góry, Wschód po prawej, Zachód po lewej, Południe na dole.", "Norte arriba, Este a la derecha, Oeste a la izquierda, Sur abajo."),
          L("Plaine, plateau, montagne, vallée.", "Рівнина, плато, гора, долина.", "Nizina, płaskowyż, góra, dolina.", "Llanura, meseta, montaña, valle.")
        ] } }
      ] }
  );

  /* ---------- Activités ---------- */
  const nombre = (consigne, reponse, unite, bravo, erreur, aides) => ({ type: "nombre", picto: null, verbe: "CALCULE", consigne, reponse, unite, bravo, erreur, aides });
  D.activites.push(
    { id: "pr-act-romains", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Je lis les chiffres romains", "Я читаю римські цифри", "Czytam cyfry rzymskie", "Leo los números romanos"),
      objectif: L("Je lis des chiffres romains et je trouve un siècle.", "Я читаю римські цифри й визначаю століття.", "Czytam cyfry rzymskie i znajduję wiek.", "Leo números romanos y encuentro un siglo."),
      etapes: [
        nombre(L("ÉCRIS en chiffres : XIV = ?", "НАПИШИ цифрами: XIV = ?", "NAPISZ cyframi: XIV = ?", "ESCRIBE en cifras: XIV = ?"), 14, "",
          L("Oui ! X + IV = 10 + 4 = 14.", "Так! X + IV = 10 + 4 = 14.", "Tak! X + IV = 10 + 4 = 14.", "¡Sí! X + IV = 10 + 4 = 14."),
          L("Pas encore. IV : le I est avant le V, on enlève.", "Ще ні. IV: I стоїть перед V — віднімаємо.", "Jeszcze nie. IV: I jest przed V, więc odejmujemy.", "Todavía no. IV: la I está antes de la V, se resta."),
          [L("X = 10.", "X = 10.", "X = 10.", "X = 10."), L("IV = 5 − 1 = 4.", "IV = 5 − 1 = 4.", "IV = 5 − 1 = 4.", "IV = 5 − 1 = 4.")]),
        nombre(L("ÉCRIS en chiffres : XXI = ?", "НАПИШИ цифрами: XXI = ?", "NAPISZ cyframi: XXI = ?", "ESCRIBE en cifras: XXI = ?"), 21, "",
          L("Oui ! 10 + 10 + 1 = 21. Nous sommes au XXIe siècle.", "Так! 10 + 10 + 1 = 21. Ми в XXI столітті.", "Tak! 10 + 10 + 1 = 21. Jesteśmy w XXI wieku.", "¡Sí! 10 + 10 + 1 = 21. Estamos en el siglo XXI."),
          L("Pas encore. Additionne les lettres : X + X + I.", "Ще ні. Додай літери: X + X + I.", "Jeszcze nie. Dodaj litery: X + X + I.", "Todavía no. Suma las letras: X + X + I."),
          [L("X = 10, I = 1.", "X = 10, I = 1.", "X = 10, I = 1.", "X = 10, I = 1.")]),
        nombre(L("ÉCRIS en chiffres : MMXXVI = ?", "НАПИШИ цифрами: MMXXVI = ?", "NAPISZ cyframi: MMXXVI = ?", "ESCRIBE en cifras: MMXXVI = ?"), 2026, "",
          L("Oui ! 1000 + 1000 + 10 + 10 + 5 + 1 = 2026.", "Так! 1000 + 1000 + 10 + 10 + 5 + 1 = 2026.", "Tak! 1000 + 1000 + 10 + 10 + 5 + 1 = 2026.", "¡Sí! 1000 + 1000 + 10 + 10 + 5 + 1 = 2026."),
          L("Pas encore. M = 1000. Additionne toutes les lettres.", "Ще ні. M = 1000. Додай усі літери.", "Jeszcze nie. M = 1000. Dodaj wszystkie litery.", "Todavía no. M = 1000. Suma todas las letras."),
          [L("MM = 2000.", "MM = 2000.", "MM = 2000.", "MM = 2000."), L("XXVI = 26.", "XXVI = 26.", "XXVI = 26.", "XXVI = 26.")]),
        { type: "choix", picto: null, verbe: "CHOISIS",
          consigne: L("CHOISIS : 1492 est au…", "ВИБЕРИ: 1492 рік — це…", "WYBIERZ: rok 1492 to…", "ELIGE: 1492 está en el…"),
          options: [
            { id: "a", label: L("XIVe siècle", "XIV століття", "XIV wiek", "siglo XIV") },
            { id: "b", label: L("XVe siècle", "XV століття", "XV wiek", "siglo XV"), correct: true },
            { id: "c", label: L("XVIe siècle", "XVI століття", "XVI wiek", "siglo XVI") }
          ],
          bravo: L("Oui ! 14 + 1 = 15 → XVe siècle.", "Так! 14 + 1 = 15 → XV століття.", "Tak! 14 + 1 = 15 → XV wiek.", "¡Sí! 14 + 1 = 15 → siglo XV."),
          erreur: L("Pas encore. Prends les centaines (14) et ajoute 1.", "Ще ні. Візьми сотні (14) і додай 1.", "Jeszcze nie. Weź setki (14) i dodaj 1.", "Todavía no. Toma las centenas (14) y suma 1."),
          aides: [L("1492 → 14 centaines.", "1492 → 14 сотень.", "1492 → 14 setek.", "1492 → 14 centenas.")] },
        AUTO("CHOISIS : est-ce que tu sais lire les chiffres romains ?", "ВИБЕРИ: чи вмієш ти читати римські цифри?", "WYBIERZ: czy umiesz czytać cyfry rzymskie?", "ELIGE: ¿sabes leer los números romanos?")
      ] },
    { id: "pr-act-periodes", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Je classe dans les périodes", "Я розподіляю за періодами", "Przyporządkowuję do okresów", "Clasifico en los periodos"),
      objectif: L("Je place des événements dans la bonne période de l'histoire.", "Я розміщую події у правильному періоді історії.", "Umieszczam wydarzenia we właściwym okresie historii.", "Coloco acontecimientos en el periodo correcto de la historia."),
      etapes: [
        { type: "classer", picto: null, verbe: "CLASSE", image: IMG + "frise-periodes.svg",
          consigne: L("CLASSE : TOUCHE un événement, puis sa période.", "РОЗПОДІЛИ: ТОРКНИСЬ події, потім її періоду.", "PRZYPORZĄDKUJ: DOTKNIJ wydarzenia, potem jego okresu.", "CLASIFICA: TOCA un acontecimiento y luego su periodo."),
          bacs: [
            { id: "pre", label: L("Préhistoire", "Доісторичні часи", "Prehistoria", "Prehistoria") },
            { id: "ant", label: L("Antiquité", "Античність", "Starożytność", "Antigüedad") },
            { id: "ma", label: L("Moyen Âge", "Середньовіччя", "Średniowiecze", "Edad Media") },
            { id: "tm", label: L("Temps modernes", "Новий час", "Czasy nowożytne", "Edad Moderna") },
            { id: "con", label: L("Époque contemporaine", "Новітній час", "Czasy współczesne", "Edad Contemporánea") }
          ],
          elements: [
            { id: "chasse", bac: "pre", label: L("Des chasseurs-cueilleurs vivent sans écriture", "Мисливці-збирачі живуть без письма", "Łowcy-zbieracze żyją bez pisma", "Cazadores-recolectores viven sin escritura") },
            { id: "pyramide", bac: "ant", label: L("On construit les pyramides d'Égypte (vers − 2600)", "Будують піраміди Єгипту (близько − 2600)", "Budowa piramid w Egipcie (około − 2600)", "Se construyen las pirámides de Egipto (hacia − 2600)") },
            { id: "cesar", bac: "ant", label: L("Jules César et l'Empire romain (− 50)", "Юлій Цезар і Римська імперія (− 50)", "Juliusz Cezar i Cesarstwo Rzymskie (− 50)", "Julio César y el Imperio romano (− 50)") },
            { id: "chateau", bac: "ma", label: L("Des chevaliers dans des châteaux forts (1200)", "Лицарі в замках (1200)", "Rycerze w zamkach (1200)", "Caballeros en castillos (1200)") },
            { id: "louis", bac: "tm", label: L("Louis XIV, roi de France (1643-1715)", "Людовик XIV, король Франції (1643–1715)", "Ludwik XIV, król Francji (1643–1715)", "Luis XIV, rey de Francia (1643-1715)") },
            { id: "magellan", bac: "tm", label: L("Magellan fait le tour du monde en bateau (1519-1522)", "Магеллан пливе навколо світу (1519–1522)", "Magellan opływa świat statkiem (1519–1522)", "Magallanes da la vuelta al mundo en barco (1519-1522)") },
            { id: "belgique", bac: "con", label: L("La Belgique devient indépendante (1830)", "Бельгія стає незалежною (1830)", "Belgia staje się niepodległa (1830)", "Bélgica se independiza (1830)") },
            { id: "internet", bac: "con", label: L("Invention d'Internet (XXe siècle)", "Винайдення інтернету (XX століття)", "Wynalezienie internetu (XX wiek)", "Invención de Internet (siglo XX)") }
          ],
          bravo: L("Bravo ! Tous les événements sont dans la bonne période.", "Молодець! Усі події у правильних періодах.", "Brawo! Wszystkie wydarzenia są we właściwych okresach.", "¡Bien! Todos los acontecimientos están en el periodo correcto."),
          erreur: L("Pas encore. Regarde les dates sur la frise : − 3000, 476, 1492, 1789.", "Ще ні. Подивись на дати на стрічці: − 3000, 476, 1492, 1789.", "Jeszcze nie. Spójrz na daty na osi: − 3000, 476, 1492, 1789.", "Todavía no. Mira las fechas en la línea: − 3000, 476, 1492, 1789."),
          aides: [
            L("Avant − 3000 : Préhistoire. Entre − 3000 et 476 : Antiquité.", "До − 3000: доісторичні часи. Між − 3000 і 476: Античність.", "Przed − 3000: prehistoria. Między − 3000 a 476: starożytność.", "Antes de − 3000: Prehistoria. Entre − 3000 y 476: Antigüedad."),
            L("Entre 1492 et 1789 : Temps modernes. Après 1789 : Époque contemporaine.", "Між 1492 і 1789: Новий час. Після 1789: Новітній час.", "Między 1492 a 1789: czasy nowożytne. Po 1789: czasy współczesne.", "Entre 1492 y 1789: Edad Moderna. Después de 1789: Edad Contemporánea.")
          ] },
        AUTO("CHOISIS : est-ce que tu sais placer un événement dans sa période ?", "ВИБЕРИ: чи вмієш ти розмістити подію в її періоді?", "WYBIERZ: czy umiesz umieścić wydarzenie w jego okresie?", "ELIGE: ¿sabes colocar un acontecimiento en su periodo?")
      ] },
    { id: "pr-act-provinces", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Les provinces de Belgique", "Провінції Бельгії", "Prowincje Belgii", "Las provincias de Bélgica"),
      objectif: L("Je place chaque province dans sa région.", "Я розміщую кожну провінцію в її регіоні.", "Umieszczam każdą prowincję w jej regionie.", "Coloco cada provincia en su región."),
      etapes: [
        { type: "classer", picto: null, verbe: "CLASSE", image: "img/belgique/regions-aujourdhui.jpg",
          consigne: L("CLASSE les provinces : Région wallonne ou Région flamande ?", "РОЗПОДІЛИ провінції: Валлонський чи Фламандський регіон?", "PRZYPORZĄDKUJ prowincje: Region Waloński czy Flamandzki?", "CLASIFICA las provincias: ¿Región Valona o Región Flamenca?"),
          bacs: [
            { id: "w", label: L("Région wallonne", "Валлонський регіон", "Region Waloński", "Región Valona") },
            { id: "f", label: L("Région flamande", "Фламандський регіон", "Region Flamandzki", "Región Flamenca") }
          ],
          elements: [
            { id: "lg", bac: "w", label: L("Liège (chef-lieu : Liège)", "Льєж (центр: Льєж)", "Liège (stolica: Liège)", "Lieja (capital: Lieja)") },
            { id: "na", bac: "w", label: L("Namur (Namur)", "Намюр (Намюр)", "Namur (Namur)", "Namur (Namur)") },
            { id: "ha", bac: "w", label: L("Hainaut (Mons)", "Ено (Монс)", "Hainaut (Mons)", "Henao (Mons)") },
            { id: "lu", bac: "w", label: L("Luxembourg (Arlon)", "Люксембург (Арлон)", "Luksemburg (Arlon)", "Luxemburgo (Arlon)") },
            { id: "bw", bac: "w", label: L("Brabant wallon (Wavre)", "Валлонський Брабант (Вавр)", "Brabancja Walońska (Wavre)", "Brabante Valón (Wavre)") },
            { id: "an", bac: "f", label: L("Anvers (Anvers)", "Антверпен (Антверпен)", "Antwerpia (Antwerpia)", "Amberes (Amberes)") },
            { id: "li", bac: "f", label: L("Limbourg (Hasselt)", "Лімбург (Гасселт)", "Limburgia (Hasselt)", "Limburgo (Hasselt)") },
            { id: "fo", bac: "f", label: L("Flandre-Orientale (Gand)", "Східна Фландрія (Гент)", "Flandria Wschodnia (Gandawa)", "Flandes Oriental (Gante)") },
            { id: "fw", bac: "f", label: L("Flandre-Occidentale (Bruges)", "Західна Фландрія (Брюгге)", "Flandria Zachodnia (Brugia)", "Flandes Occidental (Brujas)") },
            { id: "bf", bac: "f", label: L("Brabant flamand (Louvain)", "Фламандський Брабант (Лувен)", "Brabancja Flamandzka (Leuven)", "Brabante Flamenco (Lovaina)") }
          ],
          bravo: L("Bravo ! 5 provinces en Wallonie, 5 en Flandre.", "Молодець! 5 провінцій у Валлонії, 5 у Фландрії.", "Brawo! 5 prowincji w Walonii, 5 we Flandrii.", "¡Bien! 5 provincias en Valonia y 5 en Flandes."),
          erreur: L("Pas encore. Relis la liste des provinces dans le rappel.", "Ще ні. Перечитай список провінцій у повторенні.", "Jeszcze nie. Przeczytaj jeszcze raz listę prowincji w powtórce.", "Todavía no. Vuelve a leer la lista de provincias en el repaso."),
          aides: [
            L("Il y a 5 provinces dans chaque région.", "У кожному регіоні 5 провінцій.", "W każdym regionie jest 5 prowincji.", "Hay 5 provincias en cada región."),
            L("Les villes avec des noms en français (Mons, Arlon, Wavre) sont en Wallonie.", "Міста з французькими назвами (Монс, Арлон, Вавр) — у Валлонії.", "Miasta o francuskich nazwach (Mons, Arlon, Wavre) są w Walonii.", "Las ciudades con nombres en francés (Mons, Arlon, Wavre) están en Valonia.")
          ] },
        { type: "choix", picto: null, verbe: "CHOISIS",
          consigne: L("CHOISIS : Bruxelles est…", "ВИБЕРИ: Брюссель — це…", "WYBIERZ: Bruksela to…", "ELIGE: Bruselas es…"),
          options: [
            { id: "a", label: L("une province", "провінція", "prowincja", "una provincia") },
            { id: "b", label: L("une région et la capitale", "регіон і столиця", "region i stolica", "una región y la capital"), correct: true },
            { id: "c", label: L("une ville de Wallonie", "місто Валлонії", "miasto w Walonii", "una ciudad de Valonia") }
          ],
          bravo: L("Oui ! Bruxelles est une région et la capitale de la Belgique.", "Так! Брюссель — регіон і столиця Бельгії.", "Tak! Bruksela to region i stolica Belgii.", "¡Sí! Bruselas es una región y la capital de Bélgica."),
          erreur: L("Pas encore. Bruxelles n'est pas une province.", "Ще ні. Брюссель — не провінція.", "Jeszcze nie. Bruksela nie jest prowincją.", "Todavía no. Bruselas no es una provincia."),
          aides: [L("Regarde la couleur orange sur la carte.", "Подивись на помаранчевий колір на карті.", "Spójrz na pomarańczowy kolor na mapie.", "Mira el color naranja en el mapa.")] },
        AUTO("CHOISIS : est-ce que tu connais les provinces de Belgique ?", "ВИБЕРИ: чи знаєш ти провінції Бельгії?", "WYBIERZ: czy znasz prowincje Belgii?", "ELIGE: ¿conoces las provincias de Bélgica?")
      ] },
    { id: "pr-act-distances", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Je calcule des distances", "Я обчислюю відстані", "Obliczam odległości", "Calculo distancias"),
      objectif: L("J'utilise l'échelle pour calculer une distance réelle.", "Я використовую масштаб, щоб обчислити справжню відстань.", "Używam skali, żeby obliczyć rzeczywistą odległość.", "Uso la escala para calcular una distancia real."),
      etapes: [
        nombre(L("CALCULE : sur la carte, 4 cm. Échelle : 1 cm = 5 km. Distance réelle ?", "ПОРАХУЙ: на карті 4 см. Масштаб: 1 см = 5 км. Справжня відстань?", "POLICZ: na mapie 4 cm. Skala: 1 cm = 5 km. Rzeczywista odległość?", "CALCULA: en el mapa, 4 cm. Escala: 1 cm = 5 km. ¿Distancia real?"), 20, "km",
          L("Oui ! 4 × 5 = 20 km.", "Так! 4 × 5 = 20 км.", "Tak! 4 × 5 = 20 km.", "¡Sí! 4 × 5 = 20 km."),
          L("Pas encore. Multiplie : 4 × 5.", "Ще ні. Помнож: 4 × 5.", "Jeszcze nie. Pomnóż: 4 × 5.", "Todavía no. Multiplica: 4 × 5."),
          [L("cm × km = distance réelle.", "см × км = справжня відстань.", "cm × km = rzeczywista odległość.", "cm × km = distancia real.")]),
        nombre(L("CALCULE : sur la carte, 8 cm. Échelle : 1 cm = 2 km. Distance réelle ?", "ПОРАХУЙ: на карті 8 см. Масштаб: 1 см = 2 км. Справжня відстань?", "POLICZ: na mapie 8 cm. Skala: 1 cm = 2 km. Rzeczywista odległość?", "CALCULA: en el mapa, 8 cm. Escala: 1 cm = 2 km. ¿Distancia real?"), 16, "km",
          L("Oui ! 8 × 2 = 16 km.", "Так! 8 × 2 = 16 км.", "Tak! 8 × 2 = 16 km.", "¡Sí! 8 × 2 = 16 km."),
          L("Pas encore. Multiplie : 8 × 2.", "Ще ні. Помнож: 8 × 2.", "Jeszcze nie. Pomnóż: 8 × 2.", "Todavía no. Multiplica: 8 × 2."),
          [L("8 × 2 = 8 + 8.", "8 × 2 = 8 + 8.", "8 × 2 = 8 + 8.", "8 × 2 = 8 + 8.")]),
        nombre(L("CALCULE : échelle 1/100 000 (1 cm = 1 km). Sur la carte, 7 cm. Distance réelle ?", "ПОРАХУЙ: масштаб 1:100 000 (1 см = 1 км). На карті 7 см. Справжня відстань?", "POLICZ: skala 1:100 000 (1 cm = 1 km). Na mapie 7 cm. Rzeczywista odległość?", "CALCULA: escala 1/100 000 (1 cm = 1 km). En el mapa, 7 cm. ¿Distancia real?"), 7, "km",
          L("Oui ! 7 × 1 = 7 km.", "Так! 7 × 1 = 7 км.", "Tak! 7 × 1 = 7 km.", "¡Sí! 7 × 1 = 7 km."),
          L("Pas encore. 1 cm = 1 km, donc 7 cm = ?", "Ще ні. 1 см = 1 км, отже 7 см = ?", "Jeszcze nie. 1 cm = 1 km, więc 7 cm = ?", "Todavía no. 1 cm = 1 km, entonces 7 cm = ?"),
          [L("Chaque centimètre vaut 1 kilomètre.", "Кожен сантиметр — це 1 кілометр.", "Każdy centymetr to 1 kilometr.", "Cada centímetro vale 1 kilómetro.")]),
        AUTO("CHOISIS : est-ce que tu sais calculer une distance avec l'échelle ?", "ВИБЕРИ: чи вмієш ти обчислити відстань за масштабом?", "WYBIERZ: czy umiesz obliczyć odległość za pomocą skali?", "ELIGE: ¿sabes calcular una distancia con la escala?")
      ] },
    { id: "pr-act-rural", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Ville ou campagne ?", "Місто чи село?", "Miasto czy wieś?", "¿Ciudad o campo?"),
      objectif: L("Je reconnais ce qu'on trouve en milieu rural et en milieu urbain.", "Я розпізнаю, що є в сільській і міській місцевості.", "Rozpoznaję, co jest na obszarze wiejskim, a co na miejskim.", "Reconozco lo que hay en el medio rural y en el medio urbano."),
      etapes: [
        { type: "classer", picto: null, verbe: "CLASSE",
          consigne: L("CLASSE : on le trouve surtout en milieu rural ou en milieu urbain ?", "РОЗПОДІЛИ: це переважно в сільській чи міській місцевості?", "PRZYPORZĄDKUJ: to głównie na wsi czy w mieście?", "CLASIFICA: ¿se encuentra sobre todo en el medio rural o en el urbano?"),
          bacs: [
            { id: "r", label: L("Milieu rural (campagne)", "Сільська місцевість (село)", "Obszar wiejski (wieś)", "Medio rural (campo)") },
            { id: "u", label: L("Milieu urbain (ville)", "Міська місцевість (місто)", "Obszar miejski (miasto)", "Medio urbano (ciudad)") }
          ],
          elements: [
            { id: "champ", bac: "r", label: L("des champs de blé", "пшеничні поля", "pola pszenicy", "campos de trigo") },
            { id: "ferme", bac: "r", label: L("une ferme avec des vaches", "ферма з коровами", "gospodarstwo z krowami", "una granja con vacas") },
            { id: "tracteur", bac: "r", label: L("un tracteur", "трактор", "traktor", "un tractor") },
            { id: "village", bac: "r", label: L("un petit village", "маленьке село", "mała wioska", "un pueblo pequeño") },
            { id: "immeuble", bac: "u", label: L("de grands immeubles", "великі багатоповерхівки", "duże bloki", "edificios altos") },
            { id: "metro", bac: "u", label: L("un métro et beaucoup de bus", "метро й багато автобусів", "metro i dużo autobusów", "un metro y muchos autobuses") },
            { id: "centre", bac: "u", label: L("un grand centre commercial", "великий торговий центр", "duże centrum handlowe", "un gran centro comercial") },
            { id: "bouchons", bac: "u", label: L("des embouteillages", "затори", "korki", "atascos") }
          ],
          bravo: L("Bravo ! Tu reconnais la ville et la campagne.", "Молодець! Ти розпізнаєш місто й село.", "Brawo! Rozpoznajesz miasto i wieś.", "¡Bien! Reconoces la ciudad y el campo."),
          erreur: L("Pas encore. Pense : où vivent beaucoup de personnes ?", "Ще ні. Подумай: де живе багато людей?", "Jeszcze nie. Pomyśl: gdzie mieszka dużo ludzi?", "Todavía no. Piensa: ¿dónde vive mucha gente?"),
          aides: [
            L("Les animaux et les cultures : à la campagne.", "Тварини й посіви: на селі.", "Zwierzęta i uprawy: na wsi.", "Los animales y los cultivos: en el campo."),
            L("Beaucoup de monde et de transports : en ville.", "Багато людей і транспорту: у місті.", "Dużo ludzi i transportu: w mieście.", "Mucha gente y transporte: en la ciudad.")
          ] },
        AUTO("CHOISIS : est-ce que tu sais reconnaître un milieu rural et un milieu urbain ?", "ВИБЕРИ: чи вмієш ти розпізнати сільську й міську місцевість?", "WYBIERZ: czy umiesz rozpoznać obszar wiejski i miejski?", "ELIGE: ¿sabes reconocer un medio rural y un medio urbano?")
      ] }
  );

  /* ---------- Tests ---------- */
  P.tests.push(
    { id: "test-pr-chrono", titre: L("Mini-test : la chronologie", "Міні-тест: хронологія", "Mini-test: chronologia", "Mini-prueba: la cronología"),
      questions: [
        Q("pr-chrono-ordre", L("CHOISIS la date la plus ancienne.", "ВИБЕРИ найдавнішу дату.", "WYBIERZ najdawniejszą datę.", "ELIGE la fecha más antigua."),
          [n("− 500"), n("− 3000", true), n("1830")],
          L("Avant J.-C., plus le nombre est grand, plus c'est ancien : − 3000 est avant − 500.", "До Р. Х. чим більше число, тим давніше: − 3000 раніше за − 500.", "Przed Chrystusem im większa liczba, tym dawniej: − 3000 jest przed − 500.", "Antes de Cristo, cuanto más grande el número, más antiguo: − 3000 es antes que − 500.")),
        Q("pr-chrono-ordre", L("CHOISIS l'ordre juste (du plus ancien au plus récent).", "ВИБЕРИ правильний порядок (від найдавнішого до найновішого).", "WYBIERZ dobrą kolejność (od najdawniejszego do najnowszego).", "ELIGE el orden correcto (del más antiguo al más reciente)."),
          [n("476 → − 50 → 1830"), n("− 50 → 476 → 1830", true), n("1830 → 476 → − 50")],
          L("− 50 (avant J.-C.), puis 476, puis 1830.", "− 50 (до Р. Х.), потім 476, потім 1830.", "− 50 (p.n.e.), potem 476, potem 1830.", "− 50 (a. C.), luego 476, luego 1830.")),
        Q("pr-chrono-duree", L("CALCULE : combien d'années entre 1914 et 1918 ?", "ПОРАХУЙ: скільки років між 1914 і 1918?", "POLICZ: ile lat między 1914 a 1918?", "CALCULA: ¿cuántos años entre 1914 y 1918?"),
          [n("3"), n("4", true), n("14")],
          L("1918 − 1914 = 4 ans.", "1918 − 1914 = 4 роки.", "1918 − 1914 = 4 lata.", "1918 − 1914 = 4 años.")),
        Q("pr-chrono-duree", L("CALCULE : combien d'années entre − 100 et 100 ?", "ПОРАХУЙ: скільки років між − 100 і 100?", "POLICZ: ile lat między − 100 a 100?", "CALCULA: ¿cuántos años entre − 100 y 100?"),
          [n("0"), n("100"), n("200", true)],
          L("Une date de chaque côté de J.-C. : on additionne. 100 + 100 = 200 ans.", "По різні боки від Р. Х.: додаємо. 100 + 100 = 200 років.", "Po obu stronach Chrystusa: dodajemy. 100 + 100 = 200 lat.", "Una fecha a cada lado de Cristo: se suman. 100 + 100 = 200 años."))
      ] },
    { id: "test-pr-romains", titre: L("Mini-test : les chiffres romains", "Міні-тест: римські цифри", "Mini-test: cyfry rzymskie", "Mini-prueba: los números romanos"),
      questions: [
        Q("pr-rom-lire", L("CHOISIS : IX = ?", "ВИБЕРИ: IX = ?", "WYBIERZ: IX = ?", "ELIGE: IX = ?"), [n("9", true), n("11"), n("4")],
          L("I avant X : on enlève. 10 − 1 = 9.", "I перед X: віднімаємо. 10 − 1 = 9.", "I przed X: odejmujemy. 10 − 1 = 9.", "I antes de X: se resta. 10 − 1 = 9.")),
        Q("pr-rom-lire", L("CHOISIS : XVIII = ?", "ВИБЕРИ: XVIII = ?", "WYBIERZ: XVIII = ?", "ELIGE: XVIII = ?"), [n("13"), n("18", true), n("23")],
          L("10 + 5 + 3 = 18.", "10 + 5 + 3 = 18.", "10 + 5 + 3 = 18.", "10 + 5 + 3 = 18.")),
        Q("pr-rom-siecle", L("CHOISIS : 1830 est au…", "ВИБЕРИ: 1830 рік — це…", "WYBIERZ: rok 1830 to…", "ELIGE: 1830 está en el…"),
          [o("XVIIIe siècle", "XVIII століття", "XVIII wiek", "siglo XVIII"), o("XIXe siècle", "XIX століття", "XIX wiek", "siglo XIX", true), o("XXe siècle", "XX століття", "XX wiek", "siglo XX")],
          L("18 + 1 = 19 → XIXe siècle.", "18 + 1 = 19 → XIX століття.", "18 + 1 = 19 → XIX wiek.", "18 + 1 = 19 → siglo XIX.")),
        Q("pr-rom-siecle", L("CHOISIS : nous sommes en 2026. Quel siècle ?", "ВИБЕРИ: зараз 2026 рік. Яке століття?", "WYBIERZ: jest rok 2026. Który wiek?", "ELIGE: estamos en 2026. ¿Qué siglo?"),
          [o("XXe siècle", "XX століття", "XX wiek", "siglo XX"), o("XXIe siècle", "XXI століття", "XXI wiek", "siglo XXI", true), o("XIIe siècle", "XII століття", "XII wiek", "siglo XII")],
          L("20 + 1 = 21 → XXIe siècle.", "20 + 1 = 21 → XXI століття.", "20 + 1 = 21 → XXI wiek.", "20 + 1 = 21 → siglo XXI."))
      ] },
    { id: "test-pr-periodes", titre: L("Mini-test : les périodes", "Міні-тест: періоди", "Mini-test: okresy", "Mini-prueba: los periodos"),
      questions: [
        Q("pr-per-ordre", L("CHOISIS : quelle période vient après le Moyen Âge ?", "ВИБЕРИ: який період іде після Середньовіччя?", "WYBIERZ: jaki okres jest po średniowieczu?", "ELIGE: ¿qué periodo viene después de la Edad Media?"),
          [o("l'Antiquité", "Античність", "starożytność", "la Antigüedad"), o("les Temps modernes", "Новий час", "czasy nowożytne", "la Edad Moderna", true), o("la Préhistoire", "доісторичні часи", "prehistoria", "la Prehistoria")],
          L("Moyen Âge → Temps modernes (en 1492).", "Середньовіччя → Новий час (у 1492).", "Średniowiecze → czasy nowożytne (w 1492).", "Edad Media → Edad Moderna (en 1492)."), DOC.frise),
        Q("pr-per-ordre", L("CHOISIS : quel événement marque la fin de la Préhistoire ?", "ВИБЕРИ: яка подія завершує доісторичні часи?", "WYBIERZ: jakie wydarzenie kończy prehistorię?", "ELIGE: ¿qué acontecimiento marca el fin de la Prehistoria?"),
          [o("l'invention de l'écriture", "винайдення письма", "wynalezienie pisma", "la invención de la escritura", true), o("la Révolution française", "Французька революція", "rewolucja francuska", "la Revolución francesa"), o("la découverte de l'Amérique", "відкриття Америки", "odkrycie Ameryki", "el descubrimiento de América")],
          L("La Préhistoire se termine avec l'invention de l'écriture, vers − 3000.", "Доісторичні часи закінчуються з винайденням письма, близько − 3000.", "Prehistoria kończy się wraz z wynalezieniem pisma, około − 3000.", "La Prehistoria termina con la invención de la escritura, hacia − 3000.")),
        Q("pr-per-dates", L("CHOISIS : 1830 est dans quelle période ?", "ВИБЕРИ: у якому періоді 1830 рік?", "WYBIERZ: w jakim okresie jest rok 1830?", "ELIGE: ¿en qué periodo está 1830?"),
          [o("les Temps modernes", "Новий час", "czasy nowożytne", "la Edad Moderna"), o("l'Époque contemporaine", "Новітній час", "czasy współczesne", "la Edad Contemporánea", true), o("le Moyen Âge", "Середньовіччя", "średniowiecze", "la Edad Media")],
          L("1830 est après 1789 : Époque contemporaine.", "1830 — після 1789: Новітній час.", "1830 jest po 1789: czasy współczesne.", "1830 es después de 1789: Edad Contemporánea.")),
        Q("pr-per-dates", L("CHOISIS : l'an 1000 est dans quelle période ?", "ВИБЕРИ: у якому періоді 1000 рік?", "WYBIERZ: w jakim okresie jest rok 1000?", "ELIGE: ¿en qué periodo está el año 1000?"),
          [o("le Moyen Âge", "Середньовіччя", "średniowiecze", "la Edad Media", true), o("l'Antiquité", "Античність", "starożytność", "la Antigüedad"), o("l'Époque contemporaine", "Новітній час", "czasy współczesne", "la Edad Contemporánea")],
          L("1000 est entre 476 et 1492 : Moyen Âge.", "1000 — між 476 і 1492: Середньовіччя.", "1000 jest między 476 a 1492: średniowiecze.", "1000 está entre 476 y 1492: Edad Media."))
      ] },
    { id: "test-pr-dates", titre: L("Mini-test : les dates clés", "Міні-тест: ключові дати", "Mini-test: najważniejsze daty", "Mini-prueba: las fechas clave"),
      questions: [
        Q("pr-dates-lien", L("CHOISIS : 1789, c'est…", "ВИБЕРИ: 1789 — це…", "WYBIERZ: 1789 to…", "ELIGE: 1789 es…"),
          [o("la Révolution française", "Французька революція", "rewolucja francuska", "la Revolución francesa", true), o("l'indépendance de la Belgique", "незалежність Бельгії", "niepodległość Belgii", "la independencia de Bélgica"), o("la fin de l'Empire romain", "кінець Римської імперії", "koniec Cesarstwa Rzymskiego", "el fin del Imperio romano")],
          L("1789 : la Révolution française.", "1789: Французька революція.", "1789: rewolucja francuska.", "1789: la Revolución francesa.")),
        Q("pr-dates-lien", L("CHOISIS : Christophe Colomb arrive en Amérique en…", "ВИБЕРИ: Христофор Колумб прибуває до Америки в…", "WYBIERZ: Krzysztof Kolumb dociera do Ameryki w…", "ELIGE: Cristóbal Colón llega a América en…"),
          [n("476"), n("1492", true), n("1914")], L("1492 : Colomb arrive en Amérique.", "1492: Колумб прибуває до Америки.", "1492: Kolumb dociera do Ameryki.", "1492: Colón llega a América.")),
        Q("pr-dates-lien", L("CHOISIS : la Seconde Guerre mondiale, c'est…", "ВИБЕРИ: Друга світова війна — це…", "WYBIERZ: druga wojna światowa to…", "ELIGE: la Segunda Guerra Mundial es…"),
          [n("1914-1918"), n("1939-1945", true), n("1830-1831")], L("1939-1945 : Seconde Guerre mondiale.", "1939–1945: Друга світова війна.", "1939–1945: druga wojna światowa.", "1939-1945: Segunda Guerra Mundial.")),
        Q("pr-dates-lien", L("CHOISIS : que se passe-t-il en 476 ?", "ВИБЕРИ: що сталося в 476 році?", "WYBIERZ: co stało się w 476 roku?", "ELIGE: ¿qué pasa en 476?"),
          [o("l'invention de l'écriture", "винайдення письма", "wynalezienie pisma", "la invención de la escritura"), o("la fin de l'Empire romain d'Occident", "кінець Західної Римської імперії", "koniec Cesarstwa Zachodniorzymskiego", "el fin del Imperio romano de Occidente", true), o("la Révolution française", "Французька революція", "rewolucja francuska", "la Revolución francesa")],
          L("476 : fin de l'Empire romain d'Occident. C'est le début du Moyen Âge.", "476: кінець Західної Римської імперії. Це початок Середньовіччя.", "476: koniec Cesarstwa Zachodniorzymskiego. To początek średniowiecza.", "476: fin del Imperio romano de Occidente. Es el comienzo de la Edad Media."))
      ] },
    { id: "test-pr-vocab-hist", titre: L("Mini-test : les mots de l'histoire", "Міні-тест: слова історії", "Mini-test: słowa historii", "Mini-prueba: las palabras de la historia"),
      questions: [
        Q("pr-vh-mots", L("CHOISIS : un siècle, c'est…", "ВИБЕРИ: століття — це…", "WYBIERZ: wiek to…", "ELIGE: un siglo son…"),
          [o("10 ans", "10 років", "10 lat", "10 años"), o("100 ans", "100 років", "100 lat", "100 años", true), o("1000 ans", "1000 років", "1000 lat", "1000 años")],
          L("Un siècle = 100 ans. 1000 ans = un millénaire.", "Століття = 100 років. 1000 років = тисячоліття.", "Wiek = 100 lat. 1000 lat = tysiąclecie.", "Un siglo = 100 años. 1000 años = un milenio.")),
        Q("pr-vh-mots", L("CHOISIS : une source, en histoire, c'est…", "ВИБЕРИ: джерело в історії — це…", "WYBIERZ: źródło w historii to…", "ELIGE: una fuente, en historia, es…"),
          [o("un document qui nous informe sur le passé", "документ, який розповідає про минуле", "dokument, który informuje o przeszłości", "un documento que nos informa sobre el pasado", true), o("l'endroit où commence une rivière", "місце, де починається річка", "miejsce, gdzie zaczyna się rzeka", "el lugar donde nace un río"), o("une période de 100 ans", "період у 100 років", "okres 100 lat", "un periodo de 100 años")],
          L("En histoire, une source est un document sur le passé. (En géographie, la source est le début d'un cours d'eau !)", "В історії джерело — це документ про минуле. (У географії витік — це початок річки!)", "W historii źródło to dokument o przeszłości. (W geografii źródło to początek rzeki!)", "En historia, una fuente es un documento sobre el pasado. (¡En geografía, la fuente es el comienzo de un río!)")),
        Q("pr-vh-mots", L("CHOISIS : une photo prise en 1918 pendant la guerre, c'est…", "ВИБЕРИ: фото, зроблене в 1918 році під час війни, — це…", "WYBIERZ: zdjęcie zrobione w 1918 roku w czasie wojny to…", "ELIGE: una foto hecha en 1918 durante la guerra es…"),
          [o("une trace du passé", "слід минулого", "ślad przeszłości", "una huella del pasado", true), o("un travail postérieur", "пізніша праця", "praca późniejsza", "un trabajo posterior")],
          L("Elle est faite à l'époque : c'est une trace du passé.", "Його зроблено в той час: це слід минулого.", "Zrobiono je w tamtych czasach: to ślad przeszłości.", "Se hizo en esa época: es una huella del pasado."))
      ] },
    { id: "test-pr-continents", titre: L("Mini-test : continents et océans", "Міні-тест: континенти й океани", "Mini-test: kontynenty i oceany", "Mini-prueba: continentes y océanos"),
      questions: [
        Q("pr-cont-continents", L("CHOISIS : la Belgique est sur quel continent ?", "ВИБЕРИ: на якому континенті Бельгія?", "WYBIERZ: na jakim kontynencie jest Belgia?", "ELIGE: ¿en qué continente está Bélgica?"),
          [o("l'Afrique", "Африка", "Afryka", "África"), o("l'Europe", "Європа", "Europa", "Europa", true), o("l'Asie", "Азія", "Azja", "Asia")], L("La Belgique est en Europe.", "Бельгія — в Європі.", "Belgia leży w Europie.", "Bélgica está en Europa."), DOC.continents),
        Q("pr-cont-continents", L("CHOISIS : le continent le plus au sud, couvert de glace, c'est…", "ВИБЕРИ: найпівденніший континент, вкритий льодом, — це…", "WYBIERZ: najbardziej wysunięty na południe kontynent pokryty lodem to…", "ELIGE: el continente más al sur, cubierto de hielo, es…"),
          [o("l'Antarctique", "Антарктида", "Antarktyda", "la Antártida", true), o("l'Océanie", "Океанія", "Oceania", "Oceanía"), o("l'Amérique du Sud", "Південна Америка", "Ameryka Południowa", "América del Sur")], L("L'Antarctique est tout au sud.", "Антарктида — на самому півдні.", "Antarktyda leży najdalej na południu.", "La Antártida está totalmente al sur.")),
        Q("pr-cont-oceans", L("CHOISIS : quel océan est entre l'Europe et l'Amérique ?", "ВИБЕРИ: який океан між Європою та Америкою?", "WYBIERZ: który ocean jest między Europą a Ameryką?", "ELIGE: ¿qué océano está entre Europa y América?"),
          [o("l'océan Indien", "Індійський океан", "Ocean Indyjski", "el océano Índico"), o("l'océan Atlantique", "Атлантичний океан", "Ocean Atlantycki", "el océano Atlántico", true), o("l'océan Pacifique", "Тихий океан", "Ocean Spokojny", "el océano Pacífico")], L("L'océan Atlantique sépare l'Europe et l'Amérique.", "Атлантичний океан розділяє Європу та Америку.", "Ocean Atlantycki oddziela Europę od Ameryki.", "El océano Atlántico separa Europa y América."), DOC.continents),
        Q("pr-cont-oceans", L("CHOISIS : le plus grand océan, c'est…", "ВИБЕРИ: найбільший океан — це…", "WYBIERZ: największy ocean to…", "ELIGE: el océano más grande es…"),
          [o("le Pacifique", "Тихий", "Spokojny", "el Pacífico", true), o("l'Arctique", "Північний Льодовитий", "Arktyczny", "el Ártico"), o("l'Indien", "Індійський", "Indyjski", "el Índico")], L("Le Pacifique est le plus grand océan.", "Тихий — найбільший океан.", "Ocean Spokojny jest największy.", "El Pacífico es el océano más grande."))
      ] },
    { id: "test-pr-ue", titre: L("Mini-test : l'Union européenne", "Міні-тест: Європейський Союз", "Mini-test: Unia Europejska", "Mini-prueba: la Unión Europea"),
      questions: [
        Q("pr-ue-def", L("CHOISIS : combien de pays sont membres de l'Union européenne ?", "ВИБЕРИ: скільки країн є членами ЄС?", "WYBIERZ: ile państw należy do UE?", "ELIGE: ¿cuántos países son miembros de la UE?"),
          [n("6"), n("27", true), n("50")], L("L'UE compte 27 pays.", "У ЄС 27 країн.", "UE liczy 27 państw.", "La UE tiene 27 países."), DOC.ue),
        Q("pr-ue-def", L("CHOISIS : la Belgique est…", "ВИБЕРИ: Бельгія — це…", "WYBIERZ: Belgia jest…", "ELIGE: Bélgica es…"),
          [o("un pays fondateur de l'UE", "країна-засновниця ЄС", "państwem założycielskim UE", "un país fundador de la UE", true), o("un pays candidat", "країна-кандидат", "krajem kandydującym", "un país candidato"), o("pas dans l'UE", "не в ЄС", "poza UE", "fuera de la UE")],
          L("La Belgique fait partie des 6 pays fondateurs (1957).", "Бельгія — одна з 6 країн-засновниць (1957).", "Belgia jest jednym z 6 państw założycielskich (1957).", "Bélgica es uno de los 6 países fundadores (1957).")),
        Q("pr-ue-pays", L("CHOISIS le pays qui est membre de l'UE.", "ВИБЕРИ країну, яка є членом ЄС.", "WYBIERZ państwo, które należy do UE.", "ELIGE el país que es miembro de la UE."),
          [o("la Suisse", "Швейцарія", "Szwajcaria", "Suiza"), o("la Pologne", "Польща", "Polska", "Polonia", true), o("la Norvège", "Норвегія", "Norwegia", "Noruega")], L("La Pologne est membre depuis 2004. La Suisse et la Norvège ne sont pas membres.", "Польща — член з 2004 року. Швейцарія та Норвегія не є членами.", "Polska jest członkiem od 2004 roku. Szwajcaria i Norwegia nie są członkami.", "Polonia es miembro desde 2004. Suiza y Noruega no son miembros.")),
        Q("pr-ue-pays", L("CHOISIS le pays qui n'est PAS membre de l'UE.", "ВИБЕРИ країну, яка НЕ є членом ЄС.", "WYBIERZ państwo, które NIE należy do UE.", "ELIGE el país que NO es miembro de la UE."),
          [o("l'Espagne", "Іспанія", "Hiszpania", "España"), o("l'Italie", "Італія", "Włochy", "Italia"), o("l'Ukraine", "Україна", "Ukraina", "Ucrania", true)], L("L'Ukraine est un pays candidat : elle n'est pas encore membre.", "Україна — країна-кандидат: вона ще не член.", "Ukraina jest krajem kandydującym: jeszcze nie jest członkiem.", "Ucrania es un país candidato: todavía no es miembro."))
      ] },
    { id: "test-pr-belgique", titre: L("Mini-test : la Belgique fédérale", "Міні-тест: федеративна Бельгія", "Mini-test: Belgia federalna", "Mini-prueba: la Bélgica federal"),
      questions: [
        Q("pr-be-regions", L("CHOISIS : combien de régions en Belgique ?", "ВИБЕРИ: скільки регіонів у Бельгії?", "WYBIERZ: ile regionów jest w Belgii?", "ELIGE: ¿cuántas regiones hay en Bélgica?"), [n("2"), n("3", true), n("10")],
          L("3 régions : flamande, wallonne, Bruxelles-Capitale.", "3 регіони: Фламандський, Валлонський, Брюссельський столичний.", "3 regiony: flamandzki, waloński, Stołeczny Brukseli.", "3 regiones: flamenca, valona, Bruselas-Capital."), DOC.belgique),
        Q("pr-be-regions", L("CHOISIS : la Communauté germanophone parle…", "ВИБЕРИ: німецькомовна спільнота говорить…", "WYBIERZ: wspólnota niemieckojęzyczna mówi po…", "ELIGE: la Comunidad germanófona habla…"),
          [o("allemand", "німецькою", "niemiecku", "alemán", true), o("néerlandais", "нідерландською", "niderlandzku", "neerlandés"), o("anglais", "англійською", "angielsku", "inglés")], L("Germanophone = qui parle allemand.", "Німецькомовна = яка говорить німецькою.", "Niemieckojęzyczna = mówiąca po niemiecku.", "Germanófona = que habla alemán.")),
        Q("pr-be-provinces", L("CHOISIS : le chef-lieu de la province de Liège est…", "ВИБЕРИ: центр провінції Льєж — це…", "WYBIERZ: stolicą prowincji Liège jest…", "ELIGE: la capital de la provincia de Lieja es…"), [n("Huy"), n("Liège", true), n("Namur")],
          L("Province de Liège → chef-lieu : Liège. Huy est dans cette province.", "Провінція Льєж → центр: Льєж. Юї — у цій провінції.", "Prowincja Liège → stolica: Liège. Huy leży w tej prowincji.", "Provincia de Lieja → capital: Lieja. Huy está en esta provincia.")),
        Q("pr-be-provinces", L("CHOISIS : Arlon est le chef-lieu de quelle province ?", "ВИБЕРИ: Арлон — центр якої провінції?", "WYBIERZ: Arlon jest stolicą której prowincji?", "ELIGE: ¿de qué provincia es capital Arlon?"),
          [o("Luxembourg", "Люксембург", "Luksemburg", "Luxemburgo", true), o("Hainaut", "Ено", "Hainaut", "Henao"), o("Limbourg", "Лімбург", "Limburgia", "Limburgo")],
          L("Arlon est le chef-lieu de la province de Luxembourg (en Belgique, à ne pas confondre avec le pays Luxembourg).", "Арлон — центр провінції Люксембург (у Бельгії; не плутати з країною Люксембург).", "Arlon jest stolicą prowincji Luksemburg (w Belgii; nie mylić z państwem Luksemburg).", "Arlon es la capital de la provincia de Luxemburgo (en Bélgica; no confundir con el país Luxemburgo)."))
      ] },
    { id: "test-pr-distances", titre: L("Mini-test : calculer une distance", "Міні-тест: обчислити відстань", "Mini-test: obliczyć odległość", "Mini-prueba: calcular una distancia"),
      questions: [
        Q("pr-dist-echelle", L("CHOISIS : à quoi sert l'échelle ?", "ВИБЕРИ: для чого потрібен масштаб?", "WYBIERZ: do czego służy skala?", "ELIGE: ¿para qué sirve la escala?"),
          [o("à calculer les distances réelles", "щоб обчислювати справжні відстані", "do obliczania rzeczywistych odległości", "para calcular las distancias reales", true), o("à trouver le nord", "щоб знайти північ", "do znalezienia północy", "para encontrar el norte"), o("à expliquer les couleurs", "щоб пояснити кольори", "do objaśnienia kolorów", "para explicar los colores")],
          L("L'échelle sert à calculer les distances. La rose des vents donne le nord, la légende explique les couleurs.", "Масштаб — для обчислення відстаней. Роза вітрів показує північ, легенда пояснює кольори.", "Skala służy do obliczania odległości. Róża wiatrów pokazuje północ, legenda objaśnia kolory.", "La escala sirve para calcular distancias. La rosa de los vientos da el norte, la leyenda explica los colores."), DOC.echelle),
        Q("pr-dist-calcul", L("CALCULE : 3 cm sur la carte, 1 cm = 10 km. Distance réelle ?", "ПОРАХУЙ: 3 см на карті, 1 см = 10 км. Справжня відстань?", "POLICZ: 3 cm na mapie, 1 cm = 10 km. Rzeczywista odległość?", "CALCULA: 3 cm en el mapa, 1 cm = 10 km. ¿Distancia real?"), [n("13 km"), n("30 km", true), n("300 km")],
          L("3 × 10 = 30 km.", "3 × 10 = 30 км.", "3 × 10 = 30 km.", "3 × 10 = 30 km.")),
        Q("pr-dist-calcul", L("CALCULE : 5 cm sur la carte, échelle 1/100 000. Distance réelle ?", "ПОРАХУЙ: 5 см на карті, масштаб 1:100 000. Справжня відстань?", "POLICZ: 5 cm na mapie, skala 1:100 000. Rzeczywista odległość?", "CALCULA: 5 cm en el mapa, escala 1/100 000. ¿Distancia real?"), [n("5 km", true), n("50 km"), n("500 km")],
          L("1/100 000 : 1 cm = 1 km. Donc 5 cm = 5 km.", "1:100 000: 1 см = 1 км. Отже, 5 см = 5 км.", "1:100 000: 1 cm = 1 km. Więc 5 cm = 5 km.", "1/100 000: 1 cm = 1 km. Entonces 5 cm = 5 km."))
      ] },
    { id: "test-pr-rural", titre: L("Mini-test : rural ou urbain", "Міні-тест: сільське чи міське", "Mini-test: wiejskie czy miejskie", "Mini-prueba: rural o urbano"),
      questions: [
        Q("pr-ru-reconnaitre", L("CHOISIS : un milieu avec des champs, des fermes et peu d'habitants est…", "ВИБЕРИ: місцевість із полями, фермами й малою кількістю мешканців — це…", "WYBIERZ: obszar z polami, gospodarstwami i małą liczbą mieszkańców to obszar…", "ELIGE: un medio con campos, granjas y pocos habitantes es…"),
          [o("rural", "сільська", "wiejski", "rural", true), o("urbain", "міська", "miejski", "urbano")], L("Champs et fermes : milieu rural.", "Поля й ферми: сільська місцевість.", "Pola i gospodarstwa: obszar wiejski.", "Campos y granjas: medio rural.")),
        Q("pr-ru-reconnaitre", L("CHOISIS : Bruxelles, avec ses immeubles et son métro, est un milieu…", "ВИБЕРИ: Брюссель із багатоповерхівками й метро — це…", "WYBIERZ: Bruksela z blokami i metrem to obszar…", "ELIGE: Bruselas, con sus edificios y su metro, es un medio…"),
          [o("rural", "сільська місцевість", "wiejski", "rural"), o("urbain", "міська місцевість", "miejski", "urbano", true)], L("Une grande ville : milieu urbain.", "Велике місто: міська місцевість.", "Duże miasto: obszar miejski.", "Una gran ciudad: medio urbano.")),
        Q("pr-ru-reconnaitre", L("CHOISIS ce qu'on trouve surtout à la campagne.", "ВИБЕРИ, що є переважно на селі.", "WYBIERZ, co jest głównie na wsi.", "ELIGE lo que hay sobre todo en el campo."),
          [o("une gare avec beaucoup de trains", "вокзал із багатьма поїздами", "dworzec z wieloma pociągami", "una estación con muchos trenes"), o("un tracteur dans un champ", "трактор у полі", "traktor na polu", "un tractor en un campo", true), o("un grand centre commercial", "великий торговий центр", "duże centrum handlowe", "un gran centro comercial")], L("Le tracteur et le champ : milieu rural.", "Трактор і поле: сільська місцевість.", "Traktor i pole: obszar wiejski.", "El tractor y el campo: medio rural."))
      ] },
    { id: "test-pr-hydro", titre: L("Mini-test : les cours d'eau", "Міні-тест: водотоки", "Mini-test: cieki wodne", "Mini-prueba: los cursos de agua"),
      questions: [
        Q("pr-hy-mots", L("CHOISIS : l'endroit où un cours d'eau commence, c'est…", "ВИБЕРИ: місце, де починається водотік, — це…", "WYBIERZ: miejsce, gdzie zaczyna się ciek wodny, to…", "ELIGE: el lugar donde empieza un curso de agua es…"),
          [o("la source", "витік", "źródło", "la fuente", true), o("l'embouchure", "гирло", "ujście", "la desembocadura"), o("le confluent", "злиття", "połączenie (konfluencja)", "la confluencia")], L("La source = le début du cours d'eau.", "Витік = початок водотоку.", "Źródło = początek cieku.", "La fuente = el comienzo del curso de agua."), DOC.hydro),
        Q("pr-hy-mots", L("CHOISIS : un cours d'eau qui se jette dans un autre cours d'eau est…", "ВИБЕРИ: водотік, що впадає в інший водотік, — це…", "WYBIERZ: ciek, który wpada do innego cieku, to…", "ELIGE: un curso de agua que desemboca en otro es…"),
          [o("un affluent", "притока", "dopływ", "un afluente", true), o("une embouchure", "гирло", "ujście", "una desembocadura"), o("une mer", "море", "morze", "un mar")], L("C'est un affluent.", "Це притока.", "To dopływ.", "Es un afluente.")),
        Q("pr-hy-meuse", L("CHOISIS : où se trouve l'embouchure de la Meuse ?", "ВИБЕРИ: де гирло Маасу?", "WYBIERZ: gdzie jest ujście Mozy?", "ELIGE: ¿dónde está la desembocadura del Mosa?"),
          [o("à Huy", "в Юї", "w Huy", "en Huy"), o("dans la mer du Nord", "у Північному морі", "w Morzu Północnym", "en el mar del Norte", true), o("en France", "у Франції", "we Francji", "en Francia")], L("La Meuse naît en France et se jette dans la mer du Nord.", "Маас починається у Франції й впадає в Північне море.", "Moza ma źródło we Francji i wpada do Morza Północnego.", "El Mosa nace en Francia y desemboca en el mar del Norte.")),
        Q("pr-hy-meuse", L("CHOISIS : le Hoyoux se jette dans la Meuse à Huy. Le Hoyoux est…", "ВИБЕРИ: Уаю впадає в Маас у Юї. Уаю — це…", "WYBIERZ: Hoyoux wpada do Mozy w Huy. Hoyoux to…", "ELIGE: el Hoyoux desemboca en el Mosa en Huy. El Hoyoux es…"),
          [o("un fleuve", "ріка, що впадає в море", "rzeka wpadająca do morza", "un río que va al mar"), o("un affluent de la Meuse", "притока Маасу", "dopływ Mozy", "un afluente del Mosa", true), o("une source", "витік", "źródło", "una fuente")], L("Il se jette dans la Meuse : c'est un affluent.", "Він впадає в Маас: це притока.", "Wpada do Mozy: to dopływ.", "Desemboca en el Mosa: es un afluente."))
      ] },
    { id: "test-pr-vocab-geo", titre: L("Mini-test : les mots de la géographie", "Міні-тест: слова географії", "Mini-test: słowa geografii", "Mini-prueba: las palabras de la geografía"),
      questions: [
        Q("pr-vg-carte", L("CHOISIS : la partie de la carte qui explique les couleurs et les symboles, c'est…", "ВИБЕРИ: частина карти, що пояснює кольори й знаки, — це…", "WYBIERZ: część mapy, która objaśnia kolory i symbole, to…", "ELIGE: la parte del mapa que explica los colores y los símbolos es…"),
          [o("la légende", "легенда", "legenda", "la leyenda", true), o("l'échelle", "масштаб", "skala", "la escala"), o("le titre", "назва", "tytuł", "el título")], L("La légende explique les couleurs et les symboles.", "Легенда пояснює кольори й знаки.", "Legenda objaśnia kolory i symbole.", "La leyenda explica los colores y los símbolos.")),
        Q("pr-vg-carte", L("CHOISIS : sur une carte, l'Est est…", "ВИБЕРИ: на карті Схід — це…", "WYBIERZ: na mapie wschód jest…", "ELIGE: en un mapa, el Este está…"),
          [o("en haut", "вгорі", "u góry", "arriba"), o("à droite", "праворуч", "po prawej", "a la derecha", true), o("à gauche", "ліворуч", "po lewej", "a la izquierda")], L("Nord en haut, Est à droite, Sud en bas, Ouest à gauche.", "Північ угорі, Схід праворуч, Південь унизу, Захід ліворуч.", "Północ u góry, wschód po prawej, południe na dole, zachód po lewej.", "Norte arriba, Este a la derecha, Sur abajo, Oeste a la izquierda.")),
        Q("pr-vg-relief", L("CHOISIS : un creux où coule souvent un cours d'eau, c'est…", "ВИБЕРИ: заглибина, де часто тече річка, — це…", "WYBIERZ: zagłębienie, w którym często płynie rzeka, to…", "ELIGE: un hueco por donde suele correr un río es…"),
          [o("un plateau", "плато", "płaskowyż", "una meseta"), o("une vallée", "долина", "dolina", "un valle", true), o("une plaine", "рівнина", "nizina", "una llanura")], L("Une vallée. Huy est dans la vallée de la Meuse.", "Долина. Юї — в долині Маасу.", "Dolina. Huy leży w dolinie Mozy.", "Un valle. Huy está en el valle del Mosa.")),
        Q("pr-vg-relief", L("CHOISIS : un terrain bas et plat, c'est…", "ВИБЕРИ: низька пласка місцевість — це…", "WYBIERZ: niski i płaski teren to…", "ELIGE: un terreno bajo y plano es…"),
          [o("une plaine", "рівнина", "nizina", "una llanura", true), o("une montagne", "гора", "góra", "una montaña"), o("un plateau", "плато", "płaskowyż", "una meseta")], L("Une plaine est basse et plate. Un plateau est plat mais en hauteur.", "Рівнина низька й пласка. Плато пласке, але високо.", "Nizina jest niska i płaska. Płaskowyż jest płaski, ale wysoko.", "Una llanura es baja y plana. Una meseta es plana pero alta."))
      ] },
    { id: "bilan-pr-histoire", titre: L("Test des rappels d'histoire", "Тест повторення з історії", "Test powtórki z historii", "Prueba de repaso de historia"),
      questions: [
        Q("pr-chrono-ordre", L("CHOISIS la date la plus récente.", "ВИБЕРИ найновішу дату.", "WYBIERZ najnowszą datę.", "ELIGE la fecha más reciente."), [n("− 1000"), n("476"), n("1957", true)], L("1957 est la plus récente.", "1957 — найновіша.", "1957 to najnowsza data.", "1957 es la más reciente.")),
        Q("pr-chrono-duree", L("CALCULE : de 1830 à 2030, combien d'années ?", "ПОРАХУЙ: від 1830 до 2030 — скільки років?", "POLICZ: od 1830 do 2030 — ile lat?", "CALCULA: de 1830 a 2030, ¿cuántos años?"), [n("100"), n("200", true), n("230")], L("2030 − 1830 = 200 ans.", "2030 − 1830 = 200 років.", "2030 − 1830 = 200 lat.", "2030 − 1830 = 200 años.")),
        Q("pr-rom-lire", L("CHOISIS : XL = ?", "ВИБЕРИ: XL = ?", "WYBIERZ: XL = ?", "ELIGE: XL = ?"), [n("40", true), n("60"), n("15")], L("X avant L : 50 − 10 = 40.", "X перед L: 50 − 10 = 40.", "X przed L: 50 − 10 = 40.", "X antes de L: 50 − 10 = 40.")),
        Q("pr-rom-siecle", L("CHOISIS : 1789 est au…", "ВИБЕРИ: 1789 рік — це…", "WYBIERZ: rok 1789 to…", "ELIGE: 1789 está en el…"),
          [o("XVIIe siècle", "XVII століття", "XVII wiek", "siglo XVII"), o("XVIIIe siècle", "XVIII століття", "XVIII wiek", "siglo XVIII", true), o("XIXe siècle", "XIX століття", "XIX wiek", "siglo XIX")], L("17 + 1 = 18 → XVIIIe siècle.", "17 + 1 = 18 → XVIII століття.", "17 + 1 = 18 → XVIII wiek.", "17 + 1 = 18 → siglo XVIII.")),
        Q("pr-per-ordre", L("CHOISIS l'ordre juste.", "ВИБЕРИ правильний порядок.", "WYBIERZ dobrą kolejność.", "ELIGE el orden correcto."),
          [o("Antiquité → Moyen Âge → Temps modernes", "Античність → Середньовіччя → Новий час", "starożytność → średniowiecze → czasy nowożytne", "Antigüedad → Edad Media → Edad Moderna", true), o("Moyen Âge → Antiquité → Temps modernes", "Середньовіччя → Античність → Новий час", "średniowiecze → starożytność → czasy nowożytne", "Edad Media → Antigüedad → Edad Moderna"), o("Temps modernes → Moyen Âge → Antiquité", "Новий час → Середньовіччя → Античність", "czasy nowożytne → średniowiecze → starożytność", "Edad Moderna → Edad Media → Antigüedad")],
          L("Préhistoire → Antiquité → Moyen Âge → Temps modernes → Époque contemporaine.", "Доісторичні часи → Античність → Середньовіччя → Новий час → Новітній час.", "Prehistoria → starożytność → średniowiecze → czasy nowożytne → czasy współczesne.", "Prehistoria → Antigüedad → Edad Media → Edad Moderna → Edad Contemporánea."), DOC.frise),
        Q("pr-per-dates", L("CHOISIS : Jules César (− 50) vit pendant…", "ВИБЕРИ: Юлій Цезар (− 50) живе в…", "WYBIERZ: Juliusz Cezar (− 50) żyje w…", "ELIGE: Julio César (− 50) vive en…"),
          [o("l'Antiquité", "Античність", "starożytności", "la Antigüedad", true), o("le Moyen Âge", "Середньовіччя", "średniowieczu", "la Edad Media"), o("la Préhistoire", "доісторичні часи", "prehistorii", "la Prehistoria")], L("− 50 est entre − 3000 et 476 : Antiquité.", "− 50 — між − 3000 і 476: Античність.", "− 50 jest między − 3000 a 476: starożytność.", "− 50 está entre − 3000 y 476: Antigüedad.")),
        Q("pr-dates-lien", L("CHOISIS : 1830, c'est…", "ВИБЕРИ: 1830 — це…", "WYBIERZ: 1830 to…", "ELIGE: 1830 es…"),
          [o("l'indépendance de la Belgique", "незалежність Бельгії", "niepodległość Belgii", "la independencia de Bélgica", true), o("la Révolution française", "Французька революція", "rewolucja francuska", "la Revolución francesa"), o("la Première Guerre mondiale", "Перша світова війна", "pierwsza wojna światowa", "la Primera Guerra Mundial")], L("1830 : la Belgique devient indépendante.", "1830: Бельгія стає незалежною.", "1830: Belgia staje się niepodległa.", "1830: Bélgica se independiza.")),
        Q("pr-vh-mots", L("CHOISIS : un millénaire, c'est…", "ВИБЕРИ: тисячоліття — це…", "WYBIERZ: tysiąclecie to…", "ELIGE: un milenio son…"),
          [o("100 ans", "100 років", "100 lat", "100 años"), o("1000 ans", "1000 років", "1000 lat", "1000 años", true), o("10 ans", "10 років", "10 lat", "10 años")], L("Un millénaire = 1000 ans.", "Тисячоліття = 1000 років.", "Tysiąclecie = 1000 lat.", "Un milenio = 1000 años."))
      ] },
    { id: "bilan-pr-geo", titre: L("Test des rappels de géographie", "Тест повторення з географії", "Test powtórki z geografii", "Prueba de repaso de geografía"),
      questions: [
        Q("pr-cont-continents", L("CHOISIS : l'Égypte est en…", "ВИБЕРИ: Єгипет знаходиться в…", "WYBIERZ: Egipt leży w…", "ELIGE: Egipto está en…"),
          [o("Afrique", "Африці", "Afryce", "África", true), o("Europe", "Європі", "Europie", "Europa"), o("Océanie", "Океанії", "Oceanii", "Oceanía")], L("L'Égypte est en Afrique.", "Єгипет — в Африці.", "Egipt leży w Afryce.", "Egipto está en África."), DOC.continents),
        Q("pr-cont-oceans", L("CHOISIS : combien d'océans ?", "ВИБЕРИ: скільки океанів?", "WYBIERZ: ile jest oceanów?", "ELIGE: ¿cuántos océanos hay?"), [n("3"), n("5", true), n("7")], L("5 océans : Pacifique, Atlantique, Indien, Arctique, Austral.", "5 океанів: Тихий, Атлантичний, Індійський, Північний Льодовитий, Південний.", "5 oceanów: Spokojny, Atlantycki, Indyjski, Arktyczny, Południowy.", "5 océanos: Pacífico, Atlántico, Índico, Ártico, Austral.")),
        Q("pr-ue-pays", L("CHOISIS le pays fondateur de l'UE.", "ВИБЕРИ країну-засновницю ЄС.", "WYBIERZ państwo założycielskie UE.", "ELIGE el país fundador de la UE."),
          [o("les Pays-Bas", "Нідерланди", "Holandia", "los Países Bajos", true), o("la Pologne", "Польща", "Polska", "Polonia"), o("la Suède", "Швеція", "Szwecja", "Suecia")], L("Fondateurs : Belgique, France, Allemagne, Italie, Luxembourg, Pays-Bas.", "Засновниці: Бельгія, Франція, Німеччина, Італія, Люксембург, Нідерланди.", "Założyciele: Belgia, Francja, Niemcy, Włochy, Luksemburg, Holandia.", "Fundadores: Bélgica, Francia, Alemania, Italia, Luxemburgo, Países Bajos.")),
        Q("pr-be-provinces", L("CHOISIS : Mons est le chef-lieu du…", "ВИБЕРИ: Монс — центр провінції…", "WYBIERZ: Mons jest stolicą prowincji…", "ELIGE: Mons es la capital de…"),
          [o("Hainaut", "Ено", "Hainaut", "Henao", true), o("Brabant wallon", "Валлонський Брабант", "Brabancja Walońska", "Brabante Valón"), o("Limbourg", "Лімбург", "Limburgia", "Limburgo")], L("Mons → province de Hainaut.", "Монс → провінція Ено.", "Mons → prowincja Hainaut.", "Mons → provincia de Henao."), DOC.belgique),
        Q("pr-be-regions", L("CHOISIS : Huy est dans la…", "ВИБЕРИ: Юї — у…", "WYBIERZ: Huy leży w…", "ELIGE: Huy está en la…"),
          [o("Région wallonne", "Валлонському регіоні", "Regionie Walońskim", "Región Valona", true), o("Région flamande", "Фламандському регіоні", "Regionie Flamandzkim", "Región Flamenca"), o("Région de Bruxelles-Capitale", "Брюссельському столичному регіоні", "Regionie Stołecznym Brukseli", "Región de Bruselas-Capital")], L("Huy est en Wallonie, dans la province de Liège.", "Юї — у Валлонії, в провінції Льєж.", "Huy leży w Walonii, w prowincji Liège.", "Huy está en Valonia, en la provincia de Lieja.")),
        Q("pr-dist-calcul", L("CALCULE : 6 cm sur la carte, 1 cm = 5 km. Distance réelle ?", "ПОРАХУЙ: 6 см на карті, 1 см = 5 км. Справжня відстань?", "POLICZ: 6 cm na mapie, 1 cm = 5 km. Rzeczywista odległość?", "CALCULA: 6 cm en el mapa, 1 cm = 5 km. ¿Distancia real?"), [n("11 km"), n("30 km", true), n("65 km")], L("6 × 5 = 30 km.", "6 × 5 = 30 км.", "6 × 5 = 30 km.", "6 × 5 = 30 km."), DOC.echelle),
        Q("pr-ru-reconnaitre", L("CHOISIS : un village entouré de prairies est en milieu…", "ВИБЕРИ: село серед лук — це…", "WYBIERZ: wioska otoczona łąkami to obszar…", "ELIGE: un pueblo rodeado de prados está en el medio…"),
          [o("rural", "сільська місцевість", "wiejski", "rural", true), o("urbain", "міська місцевість", "miejski", "urbano")], L("Village et prairies : milieu rural.", "Село й луки: сільська місцевість.", "Wioska i łąki: obszar wiejski.", "Pueblo y prados: medio rural.")),
        Q("pr-hy-mots", L("CHOISIS : l'endroit où deux cours d'eau se rejoignent, c'est…", "ВИБЕРИ: місце, де зустрічаються два водотоки, — це…", "WYBIERZ: miejsce, gdzie łączą się dwa cieki, to…", "ELIGE: el lugar donde se juntan dos cursos de agua es…"),
          [o("le confluent", "злиття", "połączenie (konfluencja)", "la confluencia", true), o("la source", "витік", "źródło", "la fuente"), o("la vallée", "долина", "dolina", "el valle")], L("Le confluent. À Huy : le Hoyoux et la Meuse.", "Злиття. У Юї: Уаю й Маас.", "Połączenie (konfluencja). W Huy: Hoyoux i Moza.", "La confluencia. En Huy: el Hoyoux y el Mosa.")),
        Q("pr-vg-carte", L("CHOISIS : le Nord, sur une carte, est…", "ВИБЕРИ: Північ на карті — це…", "WYBIERZ: północ na mapie jest…", "ELIGE: el Norte, en un mapa, está…"),
          [o("en haut", "вгорі", "u góry", "arriba", true), o("en bas", "внизу", "na dole", "abajo"), o("à gauche", "ліворуч", "po lewej", "a la izquierda")], L("Le Nord est en haut de la carte.", "Північ — угорі карти.", "Północ jest u góry mapy.", "El Norte está arriba en el mapa."))
      ] }
  );
})();
