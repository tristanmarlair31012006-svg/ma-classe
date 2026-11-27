/* Prérequis DASPA : activités interactives en plus (chargé APRÈS parcours-prerequis.js).
   Nouveau type d'étape « ordre » (remettre dans l'ordre, voir app.js) : les éléments sont écrits dans le BON ordre,
   l'écran les mélange. Chaque activité finit par une autoévaluation (« auto »).
   Chaque activité est insérée dans sa séquence, juste avant le mini-test. rn (kirundi) = null tant que pas relu. */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/prerequis/";
  const AUTO = (fr, uk, pl, es) => ({ type: "auto", picto: 3245, verbe: "CHOISIS", consigne: L(fr, uk, pl, es) });
  const el = (id, fr, uk, pl, es, bac) => Object.assign({ id, label: L(fr, uk, pl, es) }, bac ? { bac } : {});
  const ORDRE = (consigne, elements, bravo, erreur, aides, plus) => Object.assign({ type: "ordre", picto: null, verbe: "RANGE", consigne, elements, bravo, erreur, aides }, plus || {});
  const CLASSER = (consigne, bacs, elements, bravo, erreur, aides, plus) => Object.assign({ type: "classer", picto: null, verbe: "CLASSE", consigne, bacs, elements, bravo, erreur, aides }, plus || {});
  const CHOIX = (consigne, options, bravo, erreur, aides, plus) => Object.assign({ type: "choix", picto: null, verbe: "CHOISIS", consigne, options, bravo, erreur, aides }, plus || {});
  const opt = (id, fr, uk, pl, es, ok) => Object.assign({ id, label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const ASTUCE_MICRO = L("Tu peux aussi toucher le micro du clavier et parler.", "Можеш також натиснути мікрофон на клавіатурі й говорити.", "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", "También puedes tocar el micrófono del teclado y hablar.");
  const CONSIGNE_ORDRE = (fr, uk, pl, es) => L(fr + " TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", uk + " ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", pl + " DOTYKAJ kart po kolei: 1., potem 2.…", es + " TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…");

  const activites = [
    /* ---------- Chronologie ---------- */
    { seq: "pr-chrono", act: {
      id: "pr-act-chrono", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Je range les dates", "Я впорядковую дати", "Układam daty", "Ordeno las fechas"),
      objectif: L("Je mets des dates dans l'ordre et je calcule une durée.", "Я розташовую дати по порядку й обчислюю тривалість.", "Układam daty po kolei i obliczam czas trwania.", "Ordeno fechas y calculo una duración."),
      etapes: [
        ORDRE(CONSIGNE_ORDRE("RANGE les dates de la plus ancienne à la plus récente.", "РОЗТАШУЙ дати від найдавнішої до найновішої.", "UŁÓŻ daty od najdawniejszej do najnowszej.", "ORDENA las fechas de la más antigua a la más reciente."),
          [el("d1", "− 3000", "− 3000", "− 3000", "− 3000"), el("d2", "− 500", "− 500", "− 500", "− 500"), el("d3", "− 50", "− 50", "− 50", "− 50"), el("d4", "476", "476", "476", "476"), el("d5", "1492", "1492", "1492", "1492"), el("d6", "2026", "2026", "2026", "2026")],
          L("Bravo ! Avant J.-C., le plus grand nombre est le plus ancien.", "Молодець! До Р. Х. більше число — давніше.", "Brawo! Przed Chrystusem większa liczba jest dawniejsza.", "¡Bien! Antes de Cristo, el número más grande es el más antiguo."),
          L("Pas encore. Les dates avec « − » viennent d'abord. Et − 3000 est avant − 500.", "Ще ні. Дати з «−» ідуть першими. І − 3000 раніше за − 500.", "Jeszcze nie. Daty z „−” są pierwsze. A − 3000 jest przed − 500.", "Todavía no. Las fechas con «−» van primero. Y − 3000 es antes que − 500."),
          [L("Commence par les dates avant J.-C. (avec le signe −).", "Почни з дат до Р. Х. (зі знаком −).", "Zacznij od dat przed Chrystusem (ze znakiem −).", "Empieza por las fechas antes de Cristo (con el signo −)."),
           L("Parmi elles, le plus grand nombre est le plus ancien : − 3000.", "Серед них найбільше число — найдавніше: − 3000.", "Spośród nich największa liczba jest najdawniejsza: − 3000.", "Entre ellas, el número más grande es el más antiguo: − 3000.")],
          { debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("le plus récent", "найновіше", "najnowsze", "lo más reciente") }),
        CHOIX(L("CHOISIS : sur une ligne du temps, − 500 est… de 200.", "ВИБЕРИ: на стрічці часу − 500 стоїть… від 200.", "WYBIERZ: na osi czasu − 500 jest… od 200.", "ELIGE: en una línea del tiempo, − 500 está… de 200."),
          [opt("a", "à gauche (avant)", "ліворуч (раніше)", "po lewej (wcześniej)", "a la izquierda (antes)", true), opt("b", "à droite (après)", "праворуч (пізніше)", "po prawej (później)", "a la derecha (después)")],
          L("Oui ! Le passé est à gauche. − 500 est avant 200.", "Так! Минуле ліворуч. − 500 раніше за 200.", "Tak! Przeszłość jest po lewej. − 500 jest przed 200.", "¡Sí! El pasado está a la izquierda. − 500 es antes que 200."),
          L("Pas encore. − 500 est avant Jésus-Christ, donc avant 200.", "Ще ні. − 500 — до Р. Х., отже раніше за 200.", "Jeszcze nie. − 500 jest przed Chrystusem, więc przed 200.", "Todavía no. − 500 es antes de Cristo, por lo tanto antes de 200."),
          [L("Sur la ligne du temps, le passé est à gauche.", "На стрічці часу минуле — ліворуч.", "Na osi czasu przeszłość jest po lewej.", "En la línea del tiempo, el pasado está a la izquierda.")]),
        { type: "nombre", picto: null, verbe: "CALCULE", unite: "ans", reponse: 1000,
          consigne: L("CALCULE : combien d'années entre − 500 et 500 ?", "ПОРАХУЙ: скільки років між − 500 і 500?", "POLICZ: ile lat między − 500 a 500?", "CALCULA: ¿cuántos años entre − 500 y 500?"),
          bravo: L("Oui ! Une date de chaque côté de J.-C. : 500 + 500 = 1000 ans.", "Так! По різні боки від Р. Х.: 500 + 500 = 1000 років.", "Tak! Po obu stronach Chrystusa: 500 + 500 = 1000 lat.", "¡Sí! Una fecha a cada lado de Cristo: 500 + 500 = 1000 años."),
          erreur: L("Pas encore. Une date avant, une après J.-C. : on additionne.", "Ще ні. Одна дата до, одна після Р. Х.: додаємо.", "Jeszcze nie. Jedna data przed, jedna po Chrystusie: dodajemy.", "Todavía no. Una fecha antes y otra después de Cristo: se suman."),
          aides: [L("De − 500 à 0 : 500 ans. De 0 à 500 : 500 ans.", "Від − 500 до 0: 500 років. Від 0 до 500: 500 років.", "Od − 500 do 0: 500 lat. Od 0 do 500: 500 lat.", "De − 500 a 0: 500 años. De 0 a 500: 500 años.")] },
        AUTO("CHOISIS : est-ce que tu sais ranger des dates et calculer une durée ?", "ВИБЕРИ: чи вмієш ти впорядковувати дати й обчислювати тривалість?", "WYBIERZ: czy umiesz układać daty i obliczać czas trwania?", "ELIGE: ¿sabes ordenar fechas y calcular una duración?")
      ] } },

    /* ---------- Dates clés ---------- */
    { seq: "pr-dates", act: {
      id: "pr-act-dates", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Les grandes dates dans l'ordre", "Головні дати по порядку", "Najważniejsze daty po kolei", "Las grandes fechas en orden"),
      objectif: L("Je range les grands événements de l'histoire sans regarder les dates.", "Я впорядковую головні події історії, не дивлячись на дати.", "Układam najważniejsze wydarzenia historii bez patrzenia na daty.", "Ordeno los grandes acontecimientos de la historia sin mirar las fechas."),
      etapes: [
        ORDRE(CONSIGNE_ORDRE("RANGE les événements du plus ancien au plus récent.", "РОЗТАШУЙ події від найдавнішої до найновішої.", "UŁÓŻ wydarzenia od najdawniejszego do najnowszego.", "ORDENA los acontecimientos del más antiguo al más reciente."),
          [el("e1", "Invention de l'écriture", "Винайдення письма", "Wynalezienie pisma", "Invención de la escritura"),
           el("e2", "Fin de l'Empire romain d'Occident", "Кінець Західної Римської імперії", "Koniec Cesarstwa Zachodniorzymskiego", "Fin del Imperio romano de Occidente"),
           el("e3", "Christophe Colomb arrive en Amérique", "Христофор Колумб прибуває до Америки", "Krzysztof Kolumb dociera do Ameryki", "Cristóbal Colón llega a América"),
           el("e4", "Révolution française", "Французька революція", "Rewolucja francuska", "Revolución francesa"),
           el("e5", "Indépendance de la Belgique", "Незалежність Бельгії", "Niepodległość Belgii", "Independencia de Bélgica"),
           el("e6", "Première Guerre mondiale", "Перша світова війна", "Pierwsza wojna światowa", "Primera Guerra Mundial"),
           el("e7", "Seconde Guerre mondiale", "Друга світова війна", "Druga wojna światowa", "Segunda Guerra Mundial"),
           el("e8", "Six pays créent la Communauté européenne", "Шість країн створюють Європейську спільноту", "Sześć państw tworzy Wspólnotę Europejską", "Seis países crean la Comunidad Europea")],
          L("Bravo ! − 3000 → 476 → 1492 → 1789 → 1830 → 1914 → 1939 → 1957.", "Молодець! − 3000 → 476 → 1492 → 1789 → 1830 → 1914 → 1939 → 1957.", "Brawo! − 3000 → 476 → 1492 → 1789 → 1830 → 1914 → 1939 → 1957.", "¡Bien! − 3000 → 476 → 1492 → 1789 → 1830 → 1914 → 1939 → 1957."),
          L("Pas encore. Relis la liste des dates dans le rappel, puis réessaie.", "Ще ні. Перечитай список дат у повторенні й спробуй знову.", "Jeszcze nie. Przeczytaj listę dat w powtórce i spróbuj jeszcze raz.", "Todavía no. Vuelve a leer la lista de fechas en el repaso e inténtalo de nuevo."),
          [L("L'écriture est la plus ancienne (− 3000).", "Письмо — найдавніше (− 3000).", "Pismo jest najdawniejsze (− 3000).", "La escritura es la más antigua (− 3000)."),
           L("La Belgique (1830) vient avant les deux guerres mondiales.", "Бельгія (1830) — перед двома світовими війнами.", "Belgia (1830) jest przed dwiema wojnami światowymi.", "Bélgica (1830) va antes de las dos guerras mundiales."),
           L("La Communauté européenne (1957) vient après la Seconde Guerre mondiale.", "Європейська спільнота (1957) — після Другої світової війни.", "Wspólnota Europejska (1957) jest po drugiej wojnie światowej.", "La Comunidad Europea (1957) va después de la Segunda Guerra Mundial.")],
          { debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("le plus récent", "найновіше", "najnowsze", "lo más reciente") }),
        CHOIX(L("CHOISIS : en quelle année commence la Révolution française ?", "ВИБЕРИ: у якому році починається Французька революція?", "WYBIERZ: w którym roku zaczyna się rewolucja francuska?", "ELIGE: ¿en qué año empieza la Revolución francesa?"),
          [opt("a", "1492", "1492", "1492", "1492"), opt("b", "1789", "1789", "1789", "1789", true), opt("c", "1830", "1830", "1830", "1830")],
          L("Oui ! 1789 : la Révolution française. C'est le début de l'Époque contemporaine.", "Так! 1789: Французька революція. Це початок Новітнього часу.", "Tak! 1789: rewolucja francuska. To początek czasów współczesnych.", "¡Sí! 1789: la Revolución francesa. Es el comienzo de la Edad Contemporánea."),
          L("Pas encore. 1492 : Colomb. 1830 : la Belgique.", "Ще ні. 1492: Колумб. 1830: Бельгія.", "Jeszcze nie. 1492: Kolumb. 1830: Belgia.", "Todavía no. 1492: Colón. 1830: Bélgica."),
          [L("C'est aussi la fin des Temps modernes.", "Це також кінець Нового часу.", "To także koniec czasów nowożytnych.", "Es también el fin de la Edad Moderna.")]),
        { type: "ecrire", picto: null, verbe: "ÉCRIS",
          consigne: L("ÉCRIS une phrase avec une date clé et ce qui s'est passé.", "НАПИШИ речення з ключовою датою і тим, що сталося.", "NAPISZ zdanie z ważną datą i tym, co się stało.", "ESCRIBE una frase con una fecha clave y lo que pasó."),
          amorces: ["En 1830,", "En 1789,", "En 1492,", "De 1914 à 1918,"], placeholder: "En 1830, la Belgique…", astuce: ASTUCE_MICRO,
          aides: [L("Exemple : En 1492, Christophe Colomb arrive en Amérique.", "Приклад: En 1492, Christophe Colomb arrive en Amérique.", "Przykład: En 1492, Christophe Colomb arrive en Amérique.", "Ejemplo: En 1492, Christophe Colomb arrive en Amérique.")] },
        AUTO("CHOISIS : est-ce que tu connais les dates clés de l'histoire ?", "ВИБЕРИ: чи знаєш ти ключові дати історії?", "WYBIERZ: czy znasz najważniejsze daty historii?", "ELIGE: ¿conoces las fechas clave de la historia?")
      ] } },

    /* ---------- Mots de l'histoire ---------- */
    { seq: "pr-vocab-hist", act: {
      id: "pr-act-vocab-hist", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Les mots de l'historien", "Слова історика", "Słowa historyka", "Las palabras del historiador"),
      objectif: L("J'utilise les mots de l'histoire : temps, source, trace, travail postérieur.", "Я вживаю слова історії: час, джерело, слід, пізніша праця.", "Używam słów historii: czas, źródło, ślad, praca późniejsza.", "Uso las palabras de la historia: tiempo, fuente, huella, trabajo posterior."),
      etapes: [
        ORDRE(CONSIGNE_ORDRE("RANGE du plus court au plus long.", "РОЗТАШУЙ від найкоротшого до найдовшого.", "UŁÓŻ od najkrótszego do najdłuższego.", "ORDENA del más corto al más largo."),
          [el("t1", "un an", "рік", "rok", "un año"), el("t2", "une décennie (10 ans)", "десятиліття (10 років)", "dekada (10 lat)", "una década (10 años)"), el("t3", "un siècle (100 ans)", "століття (100 років)", "wiek (100 lat)", "un siglo (100 años)"), el("t4", "un millénaire (1000 ans)", "тисячоліття (1000 років)", "tysiąclecie (1000 lat)", "un milenio (1000 años)")],
          L("Bravo ! 1 → 10 → 100 → 1000 ans.", "Молодець! 1 → 10 → 100 → 1000 років.", "Brawo! 1 → 10 → 100 → 1000 lat.", "¡Bien! 1 → 10 → 100 → 1000 años."),
          L("Pas encore. Regarde le nombre d'années entre parenthèses.", "Ще ні. Подивись на кількість років у дужках.", "Jeszcze nie. Spójrz na liczbę lat w nawiasach.", "Todavía no. Mira el número de años entre paréntesis."),
          [L("Un siècle = 100 ans.", "Століття = 100 років.", "Wiek = 100 lat.", "Un siglo = 100 años.")],
          { debut: L("le plus court", "найкоротше", "najkrótsze", "lo más corto"), fin: L("le plus long", "найдовше", "najdłuższe", "lo más largo") }),
        CLASSER(L("CLASSE : fait à l'époque (trace du passé) ou fait plus tard (travail postérieur) ?", "РОЗПОДІЛИ: зроблено в той час (слід минулого) чи пізніше (пізніша праця)?", "PRZYPORZĄDKUJ: zrobione w tamtych czasach (ślad przeszłości) czy później (praca późniejsza)?", "CLASIFICA: ¿hecho en esa época (huella del pasado) o más tarde (trabajo posterior)?"),
          [{ id: "trace", label: L("Trace du passé", "Слід минулого", "Ślad przeszłości", "Huella del pasado") }, { id: "post", label: L("Travail postérieur", "Пізніша праця", "Praca późniejsza", "Trabajo posterior") }],
          [el("piece", "une pièce de monnaie romaine trouvée dans le sol", "римська монета, знайдена в землі", "rzymska moneta znaleziona w ziemi", "una moneda romana encontrada en el suelo", "trace"),
           el("lettre", "une lettre écrite par un soldat en 1915", "лист солдата, написаний у 1915 році", "list napisany przez żołnierza w 1915 roku", "una carta escrita por un soldado en 1915", "trace"),
           el("casque", "un casque de soldat de 1914", "солдатський шолом 1914 року", "hełm żołnierza z 1914 roku", "un casco de soldado de 1914", "trace"),
           el("film", "un film de 2010 sur les chevaliers", "фільм 2010 року про лицарів", "film z 2010 roku o rycerzach", "una película de 2010 sobre caballeros", "post"),
           el("manuel", "un manuel d'histoire écrit en 2020", "підручник історії, написаний у 2020 році", "podręcznik historii napisany w 2020 roku", "un libro de historia escrito en 2020", "post"),
           el("maquette", "une maquette de pyramide faite au musée", "макет піраміди, зроблений у музеї", "makieta piramidy zrobiona w muzeum", "una maqueta de pirámide hecha en el museo", "post")],
          L("Bravo ! Fait à l'époque = trace. Fait plus tard = travail postérieur.", "Молодець! Зроблено в той час — слід. Пізніше — пізніша праця.", "Brawo! Zrobione w tamtych czasach = ślad. Później = praca późniejsza.", "¡Bien! Hecho en esa época = huella. Hecho más tarde = trabajo posterior."),
          L("Pas encore. Demande-toi : est-ce que ça date de l'époque, ou est-ce qu'on l'a fait aujourd'hui ?", "Ще ні. Запитай себе: це з тієї епохи чи це зробили сьогодні?", "Jeszcze nie. Zapytaj siebie: czy to pochodzi z tamtych czasów, czy zrobiono to dziś?", "Todavía no. Pregúntate: ¿es de esa época o se hizo hoy?"),
          [L("La pièce romaine a 2000 ans : elle date de l'époque.", "Римській монеті 2000 років: вона з тієї епохи.", "Rzymska moneta ma 2000 lat: pochodzi z tamtych czasów.", "La moneda romana tiene 2000 años: es de esa época."),
           L("Le film de 2010 parle des chevaliers, mais il est fait bien plus tard.", "Фільм 2010 року про лицарів, але зроблений набагато пізніше.", "Film z 2010 roku jest o rycerzach, ale powstał dużo później.", "La película de 2010 habla de caballeros, pero se hizo mucho más tarde.")]),
        AUTO("CHOISIS : est-ce que tu connais les mots de l'histoire ?", "ВИБЕРИ: чи знаєш ти слова історії?", "WYBIERZ: czy znasz słowa historii?", "ELIGE: ¿conoces las palabras de la historia?")
      ] } },

    /* ---------- Continents ---------- */
    { seq: "pr-continents", act: {
      id: "pr-act-continents", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Les pays et leurs continents", "Країни та їхні континенти", "Państwa i ich kontynenty", "Los países y sus continentes"),
      objectif: L("Je place des pays sur leur continent.", "Я розміщую країни на їхніх континентах.", "Przyporządkowuję państwa do kontynentów.", "Coloco países en su continente."),
      etapes: [
        CLASSER(L("CLASSE chaque pays dans son continent. Aide-toi de la carte.", "РОЗПОДІЛИ кожну країну за її континентом. Користуйся картою.", "PRZYPORZĄDKUJ każde państwo do kontynentu. Pomóż sobie mapą.", "CLASIFICA cada país en su continente. Ayúdate del mapa."),
          [{ id: "eu", label: L("Europe", "Європа", "Europa", "Europa") }, { id: "af", label: L("Afrique", "Африка", "Afryka", "África") }, { id: "as", label: L("Asie", "Азія", "Azja", "Asia") }, { id: "am", label: L("Amérique", "Америка", "Ameryka", "América") }, { id: "oc", label: L("Océanie", "Океанія", "Oceania", "Oceanía") }],
          [el("be", "Belgique", "Бельгія", "Belgia", "Bélgica", "eu"), el("ua", "Ukraine", "Україна", "Ukraina", "Ucrania", "eu"), el("pl", "Pologne", "Польща", "Polska", "Polonia", "eu"), el("es", "Espagne", "Іспанія", "Hiszpania", "España", "eu"),
           el("bi", "Burundi", "Бурунді", "Burundi", "Burundi", "af"), el("ma", "Maroc", "Марокко", "Maroko", "Marruecos", "af"),
           el("cn", "Chine", "Китай", "Chiny", "China", "as"), el("sy", "Syrie", "Сирія", "Syria", "Siria", "as"),
           el("br", "Brésil", "Бразилія", "Brazylia", "Brasil", "am"), el("ca", "Canada", "Канада", "Kanada", "Canadá", "am"),
           el("au", "Australie", "Австралія", "Australia", "Australia", "oc")],
          L("Bravo ! Tu connais les continents des pays.", "Молодець! Ти знаєш континенти країн.", "Brawo! Znasz kontynenty państw.", "¡Bien! Conoces los continentes de los países."),
          L("Pas encore. Regarde la carte du monde dans le rappel.", "Ще ні. Подивись на карту світу в повторенні.", "Jeszcze nie. Spójrz na mapę świata w powtórce.", "Todavía no. Mira el mapa del mundo en el repaso."),
          [L("Le Burundi et le Maroc sont en Afrique.", "Бурунді та Марокко — в Африці.", "Burundi i Maroko leżą w Afryce.", "Burundi y Marruecos están en África."),
           L("La Syrie et la Chine sont en Asie. L'Australie est en Océanie.", "Сирія та Китай — в Азії. Австралія — в Океанії.", "Syria i Chiny leżą w Azji. Australia leży w Oceanii.", "Siria y China están en Asia. Australia está en Oceanía.")],
          { image: IMG + "continents-oceans.png" }),
        CHOIX(L("CHOISIS : quel océan est entre l'Afrique et l'Australie ?", "ВИБЕРИ: який океан між Африкою та Австралією?", "WYBIERZ: który ocean jest między Afryką a Australią?", "ELIGE: ¿qué océano está entre África y Australia?"),
          [opt("a", "l'océan Atlantique", "Атлантичний океан", "Ocean Atlantycki", "el océano Atlántico"), opt("b", "l'océan Indien", "Індійський океан", "Ocean Indyjski", "el océano Índico", true), opt("c", "l'océan Arctique", "Північний Льодовитий океан", "Ocean Arktyczny", "el océano Ártico")],
          L("Oui ! L'océan Indien est entre l'Afrique, l'Asie et l'Australie.", "Так! Індійський океан — між Африкою, Азією та Австралією.", "Tak! Ocean Indyjski leży między Afryką, Azją i Australią.", "¡Sí! El océano Índico está entre África, Asia y Australia."),
          L("Pas encore. Regarde sous l'Asie, sur la carte.", "Ще ні. Подивись під Азією на карті.", "Jeszcze nie. Spójrz pod Azję na mapie.", "Todavía no. Mira debajo de Asia en el mapa."),
          [L("L'Arctique est tout au nord. L'Atlantique est près de l'Europe.", "Північний Льодовитий — на самій півночі. Атлантичний — біля Європи.", "Arktyczny jest na samej północy. Atlantycki jest blisko Europy.", "El Ártico está totalmente al norte. El Atlántico está cerca de Europa.")],
          { image: IMG + "continents-oceans.png" }),
        AUTO("CHOISIS : est-ce que tu sais situer les continents et les océans ?", "ВИБЕРИ: чи вмієш ти знаходити континенти й океани?", "WYBIERZ: czy umiesz wskazać kontynenty i oceany?", "ELIGE: ¿sabes situar los continentes y los océanos?")
      ] } },

    /* ---------- Union européenne ---------- */
    { seq: "pr-ue", act: {
      id: "pr-act-ue", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Dans l'UE ou pas ?", "У ЄС чи ні?", "W UE czy nie?", "¿En la UE o no?"),
      objectif: L("Je reconnais les pays membres de l'Union européenne.", "Я впізнаю країни — члени Європейського Союзу.", "Rozpoznaję państwa członkowskie Unii Europejskiej.", "Reconozco los países miembros de la Unión Europea."),
      etapes: [
        CLASSER(L("CLASSE : ce pays est-il membre de l'Union européenne ? Aide-toi de la carte.", "РОЗПОДІЛИ: ця країна — член Європейського Союзу? Користуйся картою.", "PRZYPORZĄDKUJ: czy to państwo należy do Unii Europejskiej? Pomóż sobie mapą.", "CLASIFICA: ¿este país es miembro de la Unión Europea? Ayúdate del mapa."),
          [{ id: "oui", label: L("Membre de l'UE", "Член ЄС", "Członek UE", "Miembro de la UE") }, { id: "non", label: L("Pas membre", "Не член", "Nie jest członkiem", "No es miembro") }],
          [el("be", "Belgique", "Бельгія", "Belgia", "Bélgica", "oui"), el("pl", "Pologne", "Польща", "Polska", "Polonia", "oui"), el("es", "Espagne", "Іспанія", "Hiszpania", "España", "oui"), el("ro", "Roumanie", "Румунія", "Rumunia", "Rumanía", "oui"), el("se", "Suède", "Швеція", "Szwecja", "Suecia", "oui"),
           el("ua", "Ukraine", "Україна", "Ukraina", "Ucrania", "non"), el("ch", "Suisse", "Швейцарія", "Szwajcaria", "Suiza", "non"), el("no", "Norvège", "Норвегія", "Norwegia", "Noruega", "non"), el("gb", "Royaume-Uni", "Велика Британія", "Wielka Brytania", "Reino Unido", "non")],
          L("Bravo ! Tu reconnais les pays de l'UE.", "Молодець! Ти впізнаєш країни ЄС.", "Brawo! Rozpoznajesz państwa UE.", "¡Bien! Reconoces los países de la UE."),
          L("Pas encore. Sur la carte, les pays membres sont en bleu.", "Ще ні. На карті країни-члени позначено синім.", "Jeszcze nie. Na mapie państwa członkowskie są na niebiesko.", "Todavía no. En el mapa, los países miembros están en azul."),
          [L("Le Royaume-Uni a quitté l'UE en 2020.", "Велика Британія вийшла з ЄС у 2020 році.", "Wielka Brytania opuściła UE w 2020 roku.", "El Reino Unido dejó la UE en 2020."),
           L("L'Ukraine est candidate : pas encore membre.", "Україна — кандидат: ще не член.", "Ukraina kandyduje: jeszcze nie jest członkiem.", "Ucrania es candidata: todavía no es miembro.")],
          { image: IMG + "ue-27.png" }),
        { type: "nombre", picto: null, verbe: "ÉCRIS", unite: "pays", reponse: 27,
          consigne: L("ÉCRIS le nombre : combien de pays sont membres de l'Union européenne ?", "НАПИШИ число: скільки країн — члени Європейського Союзу?", "NAPISZ liczbę: ile państw należy do Unii Europejskiej?", "ESCRIBE el número: ¿cuántos países son miembros de la Unión Europea?"),
          bravo: L("Oui ! 27 pays.", "Так! 27 країн.", "Tak! 27 państw.", "¡Sí! 27 países."),
          erreur: L("Pas encore. Relis le titre du rappel : « … pays ensemble ».", "Ще ні. Перечитай назву повторення: «… країн разом».", "Jeszcze nie. Przeczytaj tytuł powtórki: „… państw razem”.", "Todavía no. Vuelve a leer el título del repaso: «… países juntos»."),
          aides: [L("C'est entre 25 et 30.", "Це між 25 і 30.", "To między 25 a 30.", "Está entre 25 y 30.")] },
        AUTO("CHOISIS : est-ce que tu reconnais les pays de l'Union européenne ?", "ВИБЕРИ: чи впізнаєш ти країни Європейського Союзу?", "WYBIERZ: czy rozpoznajesz państwa Unii Europejskiej?", "ELIGE: ¿reconoces los países de la Unión Europea?")
      ] } },

    /* ---------- Hydrographie ---------- */
    { seq: "pr-hydro", act: {
      id: "pr-act-hydro", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Le voyage de la Meuse", "Подорож Маасу", "Podróż Mozy", "El viaje del Mosa"),
      objectif: L("Je suis la Meuse de sa source à son embouchure.", "Я простежую Маас від витоку до гирла.", "Śledzę Mozę od źródła do ujścia.", "Sigo el Mosa desde su fuente hasta su desembocadura."),
      etapes: [
        ORDRE(CONSIGNE_ORDRE("RANGE les étapes du voyage de l'eau de la Meuse, de la source à la mer.", "РОЗТАШУЙ етапи подорожі води Маасу, від витоку до моря.", "UŁÓŻ etapy podróży wody Mozy, od źródła do morza.", "ORDENA las etapas del viaje del agua del Mosa, de la fuente al mar."),
          [el("m1", "La source, en France", "Витік, у Франції", "Źródło, we Francji", "La fuente, en Francia"),
           el("m2", "Namur : la Sambre se jette dans la Meuse", "Намюр: Самбра впадає в Маас", "Namur: Sambra wpada do Mozy", "Namur: el Sambre desemboca en el Mosa"),
           el("m3", "Huy : le Hoyoux se jette dans la Meuse", "Юї: Уаю впадає в Маас", "Huy: Hoyoux wpada do Mozy", "Huy: el Hoyoux desemboca en el Mosa"),
           el("m4", "Liège : l'Ourthe se jette dans la Meuse", "Льєж: Урт впадає в Маас", "Liège: Ourthe wpada do Mozy", "Lieja: el Ourthe desemboca en el Mosa"),
           el("m5", "Les Pays-Bas", "Нідерланди", "Holandia", "Los Países Bajos"),
           el("m6", "L'embouchure, dans la mer du Nord", "Гирло, у Північному морі", "Ujście, w Morzu Północnym", "La desembocadura, en el mar del Norte")],
          L("Bravo ! France → Namur → Huy → Liège → Pays-Bas → mer du Nord.", "Молодець! Франція → Намюр → Юї → Льєж → Нідерланди → Північне море.", "Brawo! Francja → Namur → Huy → Liège → Holandia → Morze Północne.", "¡Bien! Francia → Namur → Huy → Lieja → Países Bajos → mar del Norte."),
          L("Pas encore. La Meuse passe d'abord à Namur, puis à Huy, puis à Liège.", "Ще ні. Маас спочатку тече через Намюр, потім Юї, потім Льєж.", "Jeszcze nie. Moza płynie najpierw przez Namur, potem Huy, potem Liège.", "Todavía no. El Mosa pasa primero por Namur, luego por Huy y luego por Lieja."),
          [L("Commence par la source et finis par l'embouchure.", "Почни з витоку й закінчи гирлом.", "Zacznij od źródła i skończ na ujściu.", "Empieza por la fuente y termina por la desembocadura."),
           L("Huy est entre Namur et Liège.", "Юї — між Намюром і Льєжем.", "Huy leży między Namur a Liège.", "Huy está entre Namur y Lieja.")],
          { debut: L("en amont (vers la source)", "вгору за течією (до витоку)", "w górę rzeki (do źródła)", "aguas arriba (hacia la fuente)"), fin: L("en aval (vers la mer)", "вниз за течією (до моря)", "w dół rzeki (do morza)", "aguas abajo (hacia el mar)"), image: IMG + "hydrographie.svg" }),
        CLASSER(L("CLASSE : fleuve (se jette dans la mer) ou affluent (se jette dans un autre cours d'eau) ?", "РОЗПОДІЛИ: ріка (впадає в море) чи притока (впадає в інший водотік)?", "PRZYPORZĄDKUJ: rzeka główna (wpada do morza) czy dopływ (wpada do innego cieku)?", "CLASIFICA: ¿río principal (desemboca en el mar) o afluente (desemboca en otro curso de agua)?"),
          [{ id: "fl", label: L("Fleuve", "Ріка (до моря)", "Rzeka główna (do morza)", "Río principal (al mar)") }, { id: "af", label: L("Affluent", "Притока", "Dopływ", "Afluente") }],
          [el("meuse", "la Meuse", "Маас", "Moza", "el Mosa", "fl"), el("escaut", "l'Escaut", "Шельда", "Skalda", "el Escalda", "fl"),
           el("hoyoux", "le Hoyoux", "Уаю", "Hoyoux", "el Hoyoux", "af"), el("sambre", "la Sambre", "Самбра", "Sambra", "el Sambre", "af"), el("ourthe", "l'Ourthe", "Урт", "Ourthe", "el Ourthe", "af")],
          L("Bravo ! La Meuse et l'Escaut vont jusqu'à la mer. Les autres se jettent dans la Meuse.", "Молодець! Маас і Шельда течуть до моря. Інші впадають у Маас.", "Brawo! Moza i Skalda płyną do morza. Pozostałe wpadają do Mozy.", "¡Bien! El Mosa y el Escalda llegan al mar. Los otros desembocan en el Mosa."),
          L("Pas encore. Relis : où se jettent la Sambre, le Hoyoux et l'Ourthe ?", "Ще ні. Перечитай: куди впадають Самбра, Уаю й Урт?", "Jeszcze nie. Przeczytaj: dokąd wpadają Sambra, Hoyoux i Ourthe?", "Todavía no. Vuelve a leer: ¿dónde desembocan el Sambre, el Hoyoux y el Ourthe?"),
          [L("L'Escaut est l'autre grand fleuve de Belgique : il traverse la Flandre.", "Шельда — інша велика ріка Бельгії: вона тече через Фландрію.", "Skalda to druga duża rzeka Belgii: płynie przez Flandrię.", "El Escalda es el otro gran río de Bélgica: atraviesa Flandes.")]),
        AUTO("CHOISIS : est-ce que tu connais les mots des cours d'eau ?", "ВИБЕРИ: чи знаєш ти слова про водотоки?", "WYBIERZ: czy znasz słowa dotyczące cieków wodnych?", "ELIGE: ¿conoces las palabras de los cursos de agua?")
      ] } },

    /* ---------- Mots de la géographie ---------- */
    { seq: "pr-vocab-geo", act: {
      id: "pr-act-vocab-geo", discipline: "geo", picto: null, motsAppris: [],
      titre: L("Carte et relief", "Карта і рельєф", "Mapa i rzeźba terenu", "Mapa y relieve"),
      objectif: L("Je classe les mots de la géographie et je m'oriente.", "Я сортую слова географії й орієнтуюся.", "Klasyfikuję słowa geografii i orientuję się w terenie.", "Clasifico las palabras de la geografía y me oriento."),
      etapes: [
        CLASSER(L("CLASSE les mots : élément d'une carte ou forme du relief ?", "РОЗПОДІЛИ слова: елемент карти чи форма рельєфу?", "PRZYPORZĄDKUJ słowa: element mapy czy forma terenu?", "CLASIFICA las palabras: ¿elemento de un mapa o forma del relieve?"),
          [{ id: "carte", label: L("Élément d'une carte", "Елемент карти", "Element mapy", "Elemento de un mapa") }, { id: "relief", label: L("Forme du relief", "Форма рельєфу", "Forma terenu", "Forma del relieve") }],
          [el("titre", "le titre", "назва", "tytuł", "el título", "carte"), el("legende", "la légende", "легенда", "legenda", "la leyenda", "carte"), el("echelle", "l'échelle", "масштаб", "skala", "la escala", "carte"), el("rose", "la rose des vents", "роза вітрів", "róża wiatrów", "la rosa de los vientos", "carte"),
           el("plaine", "une plaine", "рівнина", "nizina", "una llanura", "relief"), el("plateau", "un plateau", "плато", "płaskowyż", "una meseta", "relief"), el("montagne", "une montagne", "гора", "góra", "una montaña", "relief"), el("vallee", "une vallée", "долина", "dolina", "un valle", "relief")],
          L("Bravo ! Tu sais lire une carte et nommer le relief.", "Молодець! Ти вмієш читати карту й називати рельєф.", "Brawo! Umiesz czytać mapę i nazywać formy terenu.", "¡Bien! Sabes leer un mapa y nombrar el relieve."),
          L("Pas encore. Le relief, c'est la forme du terrain : haut, bas, plat, creux.", "Ще ні. Рельєф — це форма місцевості: високо, низько, пласко, заглибина.", "Jeszcze nie. Rzeźba terenu to jego kształt: wysoko, nisko, płasko, zagłębienie.", "Todavía no. El relieve es la forma del terreno: alto, bajo, plano, hueco."),
          [L("La légende et l'échelle sont dans un coin de la carte.", "Легенда й масштаб — у кутку карти.", "Legenda i skala są w rogu mapy.", "La leyenda y la escala están en una esquina del mapa.")]),
        CHOIX(L("CHOISIS : la Pologne est à … de la Belgique.", "ВИБЕРИ: Польща розташована на … від Бельгії.", "WYBIERZ: Polska leży na … od Belgii.", "ELIGE: Polonia está al … de Bélgica."),
          [opt("a", "l'Est", "схід", "wschód", "Este", true), opt("b", "l'Ouest", "захід", "zachód", "Oeste"), opt("c", "le Sud", "південь", "południe", "Sur")],
          L("Oui ! Sur la carte, la Pologne est à droite de la Belgique : à l'Est.", "Так! На карті Польща праворуч від Бельгії: на сході.", "Tak! Na mapie Polska jest po prawej od Belgii: na wschodzie.", "¡Sí! En el mapa, Polonia está a la derecha de Bélgica: al Este."),
          L("Pas encore. Sur la carte, à droite, c'est l'Est.", "Ще ні. На карті праворуч — це схід.", "Jeszcze nie. Na mapie po prawej to wschód.", "Todavía no. En el mapa, a la derecha es el Este."),
          [L("Nord en haut, Sud en bas, Ouest à gauche, Est à droite.", "Північ угорі, Південь унизу, Захід ліворуч, Схід праворуч.", "Północ u góry, południe na dole, zachód po lewej, wschód po prawej.", "Norte arriba, Sur abajo, Oeste a la izquierda, Este a la derecha.")],
          { image: IMG + "ue-27.png" }),
        CHOIX(L("CHOISIS : l'Espagne est au … de la Belgique.", "ВИБЕРИ: Іспанія розташована на … від Бельгії.", "WYBIERZ: Hiszpania leży na … od Belgii.", "ELIGE: España está al … de Bélgica."),
          [opt("a", "Nord", "півночі", "północ", "Norte"), opt("b", "Sud-Ouest", "південному заході", "południowy zachód", "Suroeste", true), opt("c", "Nord-Est", "північному сході", "północny wschód", "Noreste")],
          L("Oui ! L'Espagne est en bas et à gauche de la Belgique : au Sud-Ouest.", "Так! Іспанія внизу й ліворуч від Бельгії: на південному заході.", "Tak! Hiszpania jest niżej i po lewej od Belgii: na południowym zachodzie.", "¡Sí! España está abajo y a la izquierda de Bélgica: al Suroeste."),
          L("Pas encore. En bas = Sud. À gauche = Ouest.", "Ще ні. Унизу = південь. Ліворуч = захід.", "Jeszcze nie. Na dole = południe. Po lewej = zachód.", "Todavía no. Abajo = Sur. A la izquierda = Oeste."),
          [L("Cherche le point jaune (Belgique), puis l'Espagne.", "Знайди жовту крапку (Бельгія), потім Іспанію.", "Znajdź żółtą kropkę (Belgia), potem Hiszpanię.", "Busca el punto amarillo (Bélgica) y luego España.")],
          { image: IMG + "ue-27.png" }),
        AUTO("CHOISIS : est-ce que tu connais les mots de la géographie ?", "ВИБЕРИ: чи знаєш ти слова географії?", "WYBIERZ: czy znasz słowa geografii?", "ELIGE: ¿conoces las palabras de la geografía?")
      ] } }
  ];

  for (const { seq, act } of activites) {
    D.activites.push(act);
    const s = P.sequences.find(x => x.id === seq);
    const i = s.etapes.findIndex(e => e.type === "minitest");
    s.etapes.splice(i < 0 ? s.etapes.length : i, 0, { type: "activite", activite: act.id });
  }

  /* ---------- Compléments aux activités déjà là ---------- */
  const add = (id, etape, avantAuto) => { const a = D.activites.find(x => x.id === id); if (!a) return; const k = a.etapes.findIndex(e => e.type === "auto"); a.etapes.splice(avantAuto && k >= 0 ? k : 0, 0, etape); };
  // Périodes : d'abord remettre les 5 périodes dans l'ordre.
  add("pr-act-periodes", ORDRE(CONSIGNE_ORDRE("RANGE les 5 périodes de l'histoire.", "РОЗТАШУЙ 5 періодів історії.", "UŁÓŻ 5 okresów historii.", "ORDENA los 5 periodos de la historia."),
    [el("p1", "Préhistoire", "Доісторичні часи", "Prehistoria", "Prehistoria"), el("p2", "Antiquité", "Античність", "Starożytność", "Antigüedad"), el("p3", "Moyen Âge", "Середньовіччя", "Średniowiecze", "Edad Media"), el("p4", "Temps modernes", "Новий час", "Czasy nowożytne", "Edad Moderna"), el("p5", "Époque contemporaine", "Новітній час", "Czasy współczesne", "Edad Contemporánea")],
    L("Bravo ! Préhistoire → Antiquité → Moyen Âge → Temps modernes → Époque contemporaine.", "Молодець! Доісторичні часи → Античність → Середньовіччя → Новий час → Новітній час.", "Brawo! Prehistoria → Starożytność → Średniowiecze → Czasy nowożytne → Czasy współczesne.", "¡Bien! Prehistoria → Antigüedad → Edad Media → Edad Moderna → Edad Contemporánea."),
    L("Pas encore. Regarde la frise : de gauche à droite.", "Ще ні. Подивись на стрічку: зліва направо.", "Jeszcze nie. Spójrz na oś: od lewej do prawej.", "Todavía no. Mira la línea: de izquierda a derecha."),
    [L("« Contemporaine » veut dire « de notre temps » : elle est à la fin.", "«Новітній» означає «наш час»: він у кінці.", "„Współczesne” znaczy „nasze czasy”: są na końcu.", "«Contemporánea» quiere decir «de nuestro tiempo»: va al final.")],
    { debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("aujourd'hui", "сьогодні", "dzisiaj", "hoy") }), false);
  // Rural / urbain : décrire son propre quartier.
  add("pr-act-rural", { type: "ecrire", picto: null, verbe: "ÉCRIS",
    consigne: L("ÉCRIS : là où tu habites à Huy, c'est plutôt rural ou urbain ? Pourquoi ?", "НАПИШИ: там, де ти живеш у Юї, — це радше село чи місто? Чому?", "NAPISZ: tam, gdzie mieszkasz w Huy, jest raczej wieś czy miasto? Dlaczego?", "ESCRIBE: donde vives en Huy, ¿es más bien rural o urbano? ¿Por qué?"),
    amorces: ["J'habite dans un milieu", "Près de chez moi, il y a", "C'est urbain parce que", "C'est rural parce que"], placeholder: "Près de chez moi, il y a…", astuce: ASTUCE_MICRO,
    aides: [L("Pense à ce que tu vois : des champs ? des immeubles ? des bus ?", "Подумай, що ти бачиш: поля? будинки? автобуси?", "Pomyśl, co widzisz: pola? bloki? autobusy?", "Piensa en lo que ves: ¿campos? ¿edificios? ¿autobuses?")] }, true);
})();
