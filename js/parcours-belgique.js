/* Module d'histoire : « Comment est née la Belgique ? » (DASPA, 13-19 ans).
   S'ajoute à window.PARCOURS (js/parcours.js). Images dans img/belgique/ (sources et licences dans chaque document).
   Les légendes ne disent jamais « trace du passé » ou « travail postérieur » : c'est l'élève qui tranche.
   rn (kirundi) = null tant que pas relu. */
(function () {
  "use strict";
  const P = window.PARCOURS;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/belgique/";

  /* ---------- Documents ---------- */
  const DOC = {
    carte: { n: 1, src: IMG + "carte-1815.jpg",
      legende: L("Carte du Royaume-Uni des Pays-Bas, réalisée par Carl Ferdinand Weiland à Weimar (Allemagne) en 1815.",
        "Карта Об'єднаного королівства Нідерландів, створена Карлом Фердинандом Вайландом у Веймарі (Німеччина) в 1815 році.",
        "Mapa Zjednoczonego Królestwa Niderlandów, wykonana przez Carla Ferdinanda Weilanda w Weimarze (Niemcy) w 1815 roku.",
        "Mapa del Reino Unido de los Países Bajos, hecho por Carl Ferdinand Weiland en Weimar (Alemania) en 1815."),
      credit: "Boston Public Library, Norman B. Leventhal Map Center (Wikimedia Commons, CC BY 2.0)" },
    fort: { n: 2, src: IMG + "fort-huy.jpg",
      legende: L("Photographie d'un mur du fort de Huy. Le fort a été construit entre 1818 et 1823 par le gouvernement du roi hollandais, sur la colline au-dessus de la Meuse.",
        "Фотографія стіни форту в Юї. Форт збудували між 1818 і 1823 роками за наказом уряду нідерландського короля, на пагорбі над річкою Маас.",
        "Zdjęcie muru fortu w Huy. Fort zbudowano w latach 1818–1823 z rozkazu rządu króla holenderskiego, na wzgórzu nad Mozą.",
        "Fotografía de un muro del fuerte de Huy. El fuerte se construyó entre 1818 y 1823 por orden del gobierno del rey holandés, en la colina sobre el río Mosa."),
      credit: "Photo : Marc Ryckaert, 2008 (Wikimedia Commons, CC BY 3.0)" },
    wappers: { n: 3, src: IMG + "wappers-1835.jpg",
      legende: L("Peinture de Gustave Wappers montrant les combats de septembre 1830 sur la Grand-Place de Bruxelles, peinte en 1835. Musées royaux des Beaux-Arts de Belgique, Bruxelles.",
        "Картина Гюстава Ваперса про бої у вересні 1830 року на Гран-Плас у Брюсселі, намальована в 1835 році. Королівські музеї витончених мистецтв Бельгії, Брюссель.",
        "Obraz Gustave'a Wappersa przedstawiający walki we wrześniu 1830 roku na Grand-Place w Brukseli, namalowany w 1835 roku. Królewskie Muzea Sztuk Pięknych Belgii, Bruksela.",
        "Pintura de Gustave Wappers que muestra los combates de septiembre de 1830 en la Grand-Place de Bruselas, pintada en 1835. Museos Reales de Bellas Artes de Bélgica, Bruselas."),
      credit: "Google Art Project (Wikimedia Commons, domaine public)" },
    soubre: { n: 4, src: IMG + "soubre-1878.jpg",
      legende: L("Peinture de Charles Soubre montrant le départ des volontaires de Liège pour aller se battre à Bruxelles en septembre 1830. Elle a été peinte à Liège en 1878.",
        "Картина Шарля Субра: добровольці з Льєжа вирушають битися до Брюсселя у вересні 1830 року. Її намалювали в Льєжі в 1878 році.",
        "Obraz Charles'a Soubre'a: ochotnicy z Liège wyruszają walczyć do Brukseli we wrześniu 1830 roku. Namalowano go w Liège w 1878 roku.",
        "Pintura de Charles Soubre: los voluntarios de Lieja salen a luchar a Bruselas en septiembre de 1830. Se pintó en Lieja en 1878."),
      credit: "Charles Soubre (1821-1895) (Wikimedia Commons, CC BY-SA 3.0)" },
    serment: { n: 5, src: IMG + "serment-1831.jpg",
      legende: L("Gravure montrant le roi Léopold Ier qui prête serment, place Royale à Bruxelles, le 21 juillet 1831. Dessin d'Henri Hendrickx publié dans un livre en 1856.",
        "Гравюра: король Леопольд I складає присягу на Королівській площі в Брюсселі 21 липня 1831 року. Малюнок Анрі Гендрікса, надрукований у книжці в 1856 році.",
        "Rycina: król Leopold I składa przysięgę na placu Królewskim w Brukseli 21 lipca 1831 roku. Rysunek Henriego Hendrickxa wydrukowany w książce w 1856 roku.",
        "Grabado: el rey Leopoldo I presta juramento en la plaza Real de Bruselas el 21 de julio de 1831. Dibujo de Henri Hendrickx publicado en un libro en 1856."),
      credit: "L. Hymans, 25e anniversaire de l'inauguration du Roi, Bruxelles, 1856 (Wikimedia Commons, domaine public)" },
    cockerill: { n: 6, src: IMG + "cockerill-1852.jpg",
      legende: L("Lithographie montrant les usines Cockerill (hauts-fourneaux, ateliers, charbonnages) au bord de la Meuse, à Seraing près de Liège. Réalisée par Adrien Canelle vers 1852.",
        "Літографія із заводами Кокеріля (доменні печі, майстерні, вугільні шахти) на березі Маасу в Серені біля Льєжа. Автор — Адрієн Канель, близько 1852 року.",
        "Litografia z zakładami Cockerill (wielkie piece, warsztaty, kopalnie węgla) nad Mozą w Seraing koło Liège. Wykonał ją Adrien Canelle około 1852 roku.",
        "Litografía de las fábricas Cockerill (altos hornos, talleres, minas de carbón) a orillas del Mosa, en Seraing, cerca de Lieja. Hecha por Adrien Canelle hacia 1852."),
      credit: "Album « La Belgique industrielle », J. Géruzet, 1852-1855 (Wikimedia Commons, domaine public)" },
    loncin: { n: 7, src: IMG + "loncin-1918.jpg",
      legende: L("Photographie du fort de Loncin, près de Liège, en novembre 1918. Le fort a explosé le 15 août 1914, pendant l'attaque de l'armée allemande.",
        "Фотографія форту Лонсен біля Льєжа в листопаді 1918 року. Форт вибухнув 15 серпня 1914 року під час атаки німецької армії.",
        "Zdjęcie fortu Loncin koło Liège w listopadzie 1918 roku. Fort wybuchł 15 sierpnia 1914 roku podczas ataku armii niemieckiej.",
        "Fotografía del fuerte de Loncin, cerca de Lieja, en noviembre de 1918. El fuerte explotó el 15 de agosto de 1914, durante el ataque del ejército alemán."),
      credit: "Library of Congress, Washington (Wikimedia Commons, domaine public)" },
    regions: { n: 8, src: IMG + "regions-aujourdhui.jpg",
      legende: L("Carte des régions de Belgique aujourd'hui. Jaune : Région flamande. Rouge et bleu : Région wallonne (bleu : on parle allemand). Orange : Région de Bruxelles-Capitale.",
        "Карта регіонів Бельгії сьогодні. Жовтий: Фламандський регіон. Червоний і синій: Валлонський регіон (синій: там говорять німецькою). Помаранчевий: Брюссельський столичний регіон.",
        "Mapa regionów Belgii dzisiaj. Żółty: Region Flamandzki. Czerwony i niebieski: Region Waloński (niebieski: mówi się po niemiecku). Pomarańczowy: Region Stołeczny Brukseli.",
        "Mapa de las regiones de Bélgica hoy. Amarillo: Región Flamenca. Rojo y azul: Región Valona (azul: se habla alemán). Naranja: Región de Bruselas-Capital."),
      credit: "Réalisé par T.Marlair sur base de la carte de Jules Rohault (Wikimedia Commons, CC BY-SA 4.0)" }
  };

  /* ---------- Phrases qui reviennent ---------- */
  const RETIENS = L("Ce que je retiens", "Що я запам'ятовую", "Co zapamiętuję", "Lo que recuerdo");
  const OPT_TRACE = { label: L("une trace du passé : faite à l'époque", "слід минулого: зроблено в той час", "ślad przeszłości: zrobiony w tamtych czasach", "una huella del pasado: hecha en esa época") };
  const OPT_POST = { label: L("un travail postérieur : fait plus tard", "пізніша праця: зроблено пізніше", "praca późniejsza: zrobiona później", "un trabajo posterior: hecho más tarde") };
  const trace = ok => Object.assign({}, OPT_TRACE, ok ? { correct: true } : {});
  const post = ok => Object.assign({}, OPT_POST, ok ? { correct: true } : {});
  const crit = (id, fr, uk, pl, es) => ({ id, t: L(fr, uk, pl, es) });

  /* ---------- Chapitre ---------- */
  P.chapitres.push({
    id: "hist-belgique", discipline: "histoire",
    titre: L("Comment est née la Belgique ?", "Як виникла Бельгія?", "Jak powstała Belgia?", "¿Cómo nació Bélgica?"),
    dejaVu: [
      L("Un siècle, c'est 100 ans. 1830, c'est le XIXe siècle.", "Століття — це 100 років. 1830 рік — це XIX століття.", "Wiek to 100 lat. Rok 1830 to XIX wiek.", "Un siglo son 100 años. 1830 es el siglo XIX."),
      L("Une trace du passé est faite à l'époque. Un travail postérieur est fait plus tard.", "Слід минулого зроблено в той час. Пізнішу працю зроблено пізніше.", "Ślad przeszłości powstał w tamtych czasach. Praca późniejsza powstała później.", "Una huella del pasado se hizo en esa época. Un trabajo posterior se hizo más tarde.")
    ],
    sequences: ["be-avant", "be-1830", "be-1831", "be-industrie", "be-guerres", "be-aujourdhui"],
    bilan: "bilan-hist-belgique"
  });

  /* ---------- Séquences ---------- */
  P.sequences.push(
    {
      id: "be-avant",
      titre: L("Avant la Belgique : le roi hollandais (1815-1830)", "До Бельгії: нідерландський король (1815–1830)", "Przed Belgią: król holenderski (1815–1830)", "Antes de Bélgica: el rey holandés (1815-1830)"),
      objectif: L("Je sais qui gouvernait nos régions avant 1830. Je lis une carte ancienne.", "Я знаю, хто керував нашими землями до 1830 року. Я читаю стару карту.", "Wiem, kto rządził naszymi ziemiami przed 1830 rokiem. Czytam starą mapę.", "Sé quién gobernaba nuestras regiones antes de 1830. Leo un mapa antiguo."),
      criteres: [
        crit("be-avant-roi", "Je sais qui était le roi avant 1830.", "Я знаю, хто був королем до 1830 року.", "Wiem, kto był królem przed 1830 rokiem.", "Sé quién era el rey antes de 1830."),
        crit("be-avant-trace", "Je dis si un document est une trace du passé.", "Я кажу, чи документ — слід минулого.", "Mówię, czy dokument jest śladem przeszłości.", "Digo si un documento es una huella del pasado.")
      ],
      etapes: [
        { type: "ressource",
          titre: L("Nos régions en 1815", "Наші землі в 1815 році", "Nasze ziemie w 1815 roku", "Nuestras regiones en 1815"),
          contenu: {
            docs: [DOC.carte],
            textes: [
              L("En 1815, la Belgique n'existe pas encore.", "У 1815 році Бельгії ще немає.", "W 1815 roku Belgii jeszcze nie ma.", "En 1815, Bélgica todavía no existe."),
              L("Nos régions et les Pays-Bas forment un seul pays : le Royaume-Uni des Pays-Bas.", "Наші землі та Нідерланди утворюють одну країну: Об'єднане королівство Нідерландів.", "Nasze ziemie i Niderlandy tworzą jeden kraj: Zjednoczone Królestwo Niderlandów.", "Nuestras regiones y los Países Bajos forman un solo país: el Reino Unido de los Países Bajos."),
              L("Le roi est hollandais. Il s'appelle Guillaume Ier.", "Король — нідерландець. Його звати Віллем I.", "Król jest Holendrem. Nazywa się Wilhelm I.", "El rey es holandés. Se llama Guillermo I.")
            ]
          } },
        { type: "ressource",
          titre: L("Un fort à Huy", "Форт у Юї", "Fort w Huy", "Un fuerte en Huy"),
          contenu: {
            docs: [DOC.fort],
            textes: [
              L("Le roi hollandais fait construire des forts pour protéger son pays.", "Нідерландський король будує форти, щоб захистити свою країну.", "Król holenderski buduje forty, żeby chronić swój kraj.", "El rey holandés manda construir fuertes para proteger su país."),
              L("Le fort de Huy est encore là aujourd'hui. Tu peux le voir depuis le pont.", "Форт у Юї досі стоїть. Його видно з мосту.", "Fort w Huy wciąż stoi. Widać go z mostu.", "El fuerte de Huy sigue ahí hoy. Lo puedes ver desde el puente.")
            ]
          } },
        { type: "minitest", test: "test-be-avant" },
        { type: "synthese", titre: RETIENS,
          contenu: { liste: [
            L("1815 : nos régions font partie du Royaume-Uni des Pays-Bas.", "1815: наші землі входять до Об'єднаного королівства Нідерландів.", "1815: nasze ziemie należą do Zjednoczonego Królestwa Niderlandów.", "1815: nuestras regiones forman parte del Reino Unido de los Países Bajos."),
            L("Le roi est le Hollandais Guillaume Ier.", "Король — нідерландець Віллем I.", "Królem jest Holender Wilhelm I.", "El rey es el holandés Guillermo I."),
            L("1818-1823 : construction du fort de Huy.", "1818–1823: будівництво форту в Юї.", "1818–1823: budowa fortu w Huy.", "1818-1823: construcción del fuerte de Huy.")
          ] } }
      ]
    },
    {
      id: "be-1830",
      titre: L("La révolution de 1830", "Революція 1830 року", "Rewolucja 1830 roku", "La revolución de 1830"),
      objectif: L("Je raconte la révolution de 1830. Je compare deux peintures.", "Я розповідаю про революцію 1830 року. Я порівнюю дві картини.", "Opowiadam o rewolucji 1830 roku. Porównuję dwa obrazy.", "Cuento la revolución de 1830. Comparo dos pinturas."),
      criteres: [
        crit("be-1830-faits", "Je sais ce qui s'est passé en 1830.", "Я знаю, що сталося в 1830 році.", "Wiem, co się stało w 1830 roku.", "Sé lo que pasó en 1830."),
        crit("be-1830-trace", "Je dis si une peinture est une trace du passé ou un travail postérieur.", "Я кажу, чи картина — слід минулого, чи пізніша праця.", "Mówię, czy obraz jest śladem przeszłości, czy pracą późniejszą.", "Digo si una pintura es una huella del pasado o un trabajo posterior.")
      ],
      etapes: [
        { type: "ressource",
          titre: L("Les Belges ne sont pas contents", "Бельгійці незадоволені", "Belgowie są niezadowoleni", "Los belgas no están contentos"),
          contenu: {
            textes: [
              L("Beaucoup d'habitants trouvent que le roi hollandais décide tout seul.", "Багато жителів вважають, що нідерландський король усе вирішує сам.", "Wielu mieszkańców uważa, że król holenderski decyduje o wszystkim sam.", "Muchos habitantes piensan que el rey holandés lo decide todo él solo."),
              L("En août 1830, une révolte commence à Bruxelles.", "У серпні 1830 року в Брюсселі починається повстання.", "W sierpniu 1830 roku w Brukseli zaczyna się bunt.", "En agosto de 1830 empieza una revuelta en Bruselas."),
              L("En septembre 1830, il y a des combats dans les rues de Bruxelles contre l'armée hollandaise.", "У вересні 1830 року на вулицях Брюсселя точаться бої проти нідерландської армії.", "We wrześniu 1830 roku na ulicach Brukseli trwają walki z armią holenderską.", "En septiembre de 1830 hay combates en las calles de Bruselas contra el ejército holandés.")
            ],
            docs: [DOC.wappers]
          } },
        { type: "ressource",
          titre: L("Des volontaires de Liège", "Добровольці з Льєжа", "Ochotnicy z Liège", "Voluntarios de Lieja"),
          contenu: {
            docs: [DOC.soubre],
            textes: [
              L("Des habitants de Liège partent à Bruxelles pour aider les révolutionnaires. Leur chef s'appelle Charles Rogier.", "Жителі Льєжа їдуть до Брюсселя, щоб допомогти повстанцям. Їхнього командира звати Шарль Рожьє.", "Mieszkańcy Liège jadą do Brukseli, żeby pomóc powstańcom. Ich dowódca nazywa się Charles Rogier.", "Habitantes de Lieja van a Bruselas para ayudar a los revolucionarios. Su jefe se llama Charles Rogier."),
              L("Le 4 octobre 1830, la Belgique déclare son indépendance.", "4 жовтня 1830 року Бельгія проголошує незалежність.", "4 października 1830 roku Belgia ogłasza niepodległość.", "El 4 de octubre de 1830, Bélgica declara su independencia.")
            ]
          } },
        { type: "ressource",
          titre: L("Compare les deux peintures", "Порівняй дві картини", "Porównaj dwa obrazy", "Compara las dos pinturas"),
          contenu: {
            docs: [DOC.wappers, DOC.soubre],
            textes: [
              L("REGARDE la date de l'événement : 1830.", "ПОДИВИСЬ на дату події: 1830.", "SPÓJRZ na datę wydarzenia: 1830.", "MIRA la fecha del acontecimiento: 1830."),
              L("REGARDE la date de chaque peinture. Calcule : combien d'années après 1830 ?", "ПОДИВИСЬ на дату кожної картини. Порахуй: скільки років після 1830?", "SPÓJRZ na datę każdego obrazu. Policz: ile lat po 1830?", "MIRA la fecha de cada pintura. Calcula: ¿cuántos años después de 1830?"),
              L("Les peintres ne sont pas des photographes. Ils montrent les héros et le drapeau belge.", "Художники — не фотографи. Вони показують героїв і бельгійський прапор.", "Malarze to nie fotografowie. Pokazują bohaterów i flagę Belgii.", "Los pintores no son fotógrafos. Muestran a los héroes y la bandera belga.")
            ]
          } },
        { type: "minitest", test: "test-be-1830" },
        { type: "synthese", titre: RETIENS,
          contenu: { liste: [
            L("Septembre 1830 : combats à Bruxelles contre l'armée hollandaise. Des Liégeois viennent aider.", "Вересень 1830: бої в Брюсселі проти нідерландської армії. Льєжці приходять на допомогу.", "Wrzesień 1830: walki w Brukseli z armią holenderską. Mieszkańcy Liège przychodzą pomóc.", "Septiembre de 1830: combates en Bruselas contra el ejército holandés. Llegan liejenses a ayudar."),
            L("4 octobre 1830 : la Belgique est indépendante.", "4 жовтня 1830: Бельгія незалежна.", "4 października 1830: Belgia jest niepodległa.", "4 de octubre de 1830: Bélgica es independiente."),
            L("Une peinture faite plusieurs années après l'événement est un travail postérieur.", "Картина, намальована через кілька років після події, — це пізніша праця.", "Obraz namalowany kilka lat po wydarzeniu to praca późniejsza.", "Una pintura hecha varios años después del acontecimiento es un trabajo posterior.")
          ] } }
      ]
    },
    {
      id: "be-1831",
      titre: L("Une Constitution et un roi (1831)", "Конституція і король (1831)", "Konstytucja i król (1831)", "Una Constitución y un rey (1831)"),
      objectif: L("Je sais comment la Belgique s'organise en 1831. Je place des dates sur une ligne du temps.", "Я знаю, як Бельгія влаштувалася в 1831 році. Я розміщую дати на стрічці часу.", "Wiem, jak Belgia zorganizowała się w 1831 roku. Umieszczam daty na osi czasu.", "Sé cómo se organiza Bélgica en 1831. Coloco fechas en una línea del tiempo."),
      criteres: [
        crit("be-1831-faits", "Je sais ce qu'est la Constitution et qui est le premier roi.", "Я знаю, що таке Конституція і хто перший король.", "Wiem, co to jest Konstytucja i kto jest pierwszym królem.", "Sé qué es la Constitución y quién es el primer rey."),
        crit("be-1831-temps", "Je mets les dates dans l'ordre.", "Я розташовую дати по порядку.", "Układam daty po kolei.", "Ordeno las fechas.")
      ],
      etapes: [
        { type: "ressource",
          titre: L("La Constitution", "Конституція", "Konstytucja", "La Constitución"),
          contenu: {
            textes: [
              L("La Constitution, ce sont les règles les plus importantes du pays.", "Конституція — це найважливіші правила країни.", "Konstytucja to najważniejsze zasady kraju.", "La Constitución son las reglas más importantes del país."),
              L("La Belgique écrit sa Constitution le 7 février 1831.", "Бельгія ухвалює свою Конституцію 7 лютого 1831 року.", "Belgia uchwala swoją Konstytucję 7 lutego 1831 roku.", "Bélgica escribe su Constitución el 7 de febrero de 1831."),
              L("Texte adapté de la Constitution de 1831 : « Tous les pouvoirs viennent de la Nation. » Cela veut dire : le pouvoir vient du peuple, pas seulement du roi.", "Адаптований текст Конституції 1831 року: «Уся влада походить від нації». Це означає: влада походить від народу, а не тільки від короля.", "Tekst uproszczony z Konstytucji z 1831 roku: „Cała władza pochodzi od Narodu”. To znaczy: władza pochodzi od ludu, nie tylko od króla.", "Texto adaptado de la Constitución de 1831: «Todos los poderes vienen de la Nación». Quiere decir: el poder viene del pueblo, no solo del rey.")
            ],
            liste: [
              L("Texte adapté par T.Marlair sur base de l'article 25 de la Constitution belge de 1831 (aujourd'hui article 33).", "Текст адаптував T.Marlair на основі статті 25 Конституції Бельгії 1831 року (сьогодні стаття 33).", "Tekst uproszczony przez T.Marlair na podstawie art. 25 Konstytucji Belgii z 1831 roku (dziś art. 33).", "Texto adaptado por T.Marlair a partir del artículo 25 de la Constitución belga de 1831 (hoy artículo 33).")
            ]
          } },
        { type: "ressource",
          titre: L("Le premier roi des Belges", "Перший король бельгійців", "Pierwszy król Belgów", "El primer rey de los belgas"),
          contenu: {
            docs: [DOC.serment],
            textes: [
              L("Le 21 juillet 1831, Léopold Ier devient le premier roi des Belges.", "21 липня 1831 року Леопольд I стає першим королем бельгійців.", "21 lipca 1831 roku Leopold I zostaje pierwszym królem Belgów.", "El 21 de julio de 1831, Leopoldo I se convierte en el primer rey de los belgas."),
              L("Il promet de respecter la Constitution. C'est le serment.", "Він обіцяє поважати Конституцію. Це присяга.", "Obiecuje przestrzegać Konstytucji. To jest przysięga.", "Promete respetar la Constitución. Es el juramento."),
              L("Aujourd'hui, le 21 juillet est la fête nationale belge.", "Сьогодні 21 липня — національне свято Бельгії.", "Dziś 21 lipca to święto narodowe Belgii.", "Hoy, el 21 de julio es la fiesta nacional belga.")
            ]
          } },
        { type: "activite", activite: "be-trace" },
        { type: "minitest", test: "test-be-1831" },
        { type: "synthese", titre: RETIENS,
          contenu: { liste: [
            L("7 février 1831 : la Constitution belge.", "7 лютого 1831: Конституція Бельгії.", "7 lutego 1831: Konstytucja Belgii.", "7 de febrero de 1831: la Constitución belga."),
            L("21 juillet 1831 : Léopold Ier, premier roi des Belges. C'est la fête nationale.", "21 липня 1831: Леопольд I, перший король бельгійців. Це національне свято.", "21 lipca 1831: Leopold I, pierwszy król Belgów. To święto narodowe.", "21 de julio de 1831: Leopoldo I, primer rey de los belgas. Es la fiesta nacional."),
            L("Ligne du temps : 1815 → 1830 → 1831.", "Стрічка часу: 1815 → 1830 → 1831.", "Oś czasu: 1815 → 1830 → 1831.", "Línea del tiempo: 1815 → 1830 → 1831.")
          ] } }
      ]
    },
    {
      id: "be-industrie",
      titre: L("La Belgique des usines (XIXe siècle)", "Бельгія заводів (XIX століття)", "Belgia fabryk (XIX wiek)", "La Bélgica de las fábricas (siglo XIX)"),
      objectif: L("Je décris une image d'usine. Je sais pourquoi Liège est une région d'industrie.", "Я описую зображення заводу. Я знаю, чому Льєж — промисловий регіон.", "Opisuję obraz fabryki. Wiem, dlaczego Liège to region przemysłowy.", "Describo una imagen de fábrica. Sé por qué Lieja es una región industrial."),
      criteres: [
        crit("be-ind-decrire", "Je trouve des éléments dans une image.", "Я знаходжу елементи на зображенні.", "Znajduję elementy na obrazie.", "Encuentro elementos en una imagen."),
        crit("be-ind-faits", "Je sais ce qu'on fabrique dans les usines de Liège.", "Я знаю, що виробляють на заводах Льєжа.", "Wiem, co produkuje się w fabrykach Liège.", "Sé qué se fabrica en las fábricas de Lieja.")
      ],
      etapes: [
        { type: "ressource",
          titre: L("Les usines de Seraing", "Заводи в Серені", "Fabryki w Seraing", "Las fábricas de Seraing"),
          contenu: {
            docs: [DOC.cockerill],
            textes: [
              L("En 1817, John Cockerill, un Anglais, installe une grande usine à Seraing, près de Liège.", "У 1817 році англієць Джон Кокеріль відкриває великий завод у Серені біля Льєжа.", "W 1817 roku Anglik John Cockerill zakłada dużą fabrykę w Seraing koło Liège.", "En 1817, John Cockerill, un inglés, instala una gran fábrica en Seraing, cerca de Lieja."),
              L("Avec le charbon des mines, on fabrique du fer, des machines, des locomotives.", "З вугілля шахт виробляють залізо, машини, локомотиви.", "Z węgla z kopalń produkuje się żelazo, maszyny, lokomotywy.", "Con el carbón de las minas se fabrica hierro, máquinas, locomotoras."),
              L("Beaucoup de personnes viennent travailler dans les usines et les mines. Le travail est dur, même pour les enfants.", "Багато людей приїжджають працювати на заводах і шахтах. Праця важка, навіть для дітей.", "Wiele osób przyjeżdża pracować w fabrykach i kopalniach. Praca jest ciężka, nawet dla dzieci.", "Mucha gente viene a trabajar en las fábricas y las minas. El trabajo es duro, incluso para los niños.")
            ],
            liste: [
              L("CHERCHE dans l'image : les cheminées, la fumée, la Meuse, un bateau.", "ЗНАЙДИ на зображенні: димарі, дим, Маас, човен.", "ZNAJDŹ na obrazie: kominy, dym, Mozę, statek.", "BUSCA en la imagen: las chimeneas, el humo, el Mosa, un barco.")
            ]
          } },
        { type: "activite", activite: "be-usine" },
        { type: "minitest", test: "test-be-industrie" },
        { type: "synthese", titre: RETIENS,
          contenu: { liste: [
            L("Au XIXe siècle, la région de Liège a beaucoup d'usines et de mines de charbon.", "У XIX столітті в регіоні Льєжа багато заводів і вугільних шахт.", "W XIX wieku region Liège ma wiele fabryk i kopalń węgla.", "En el siglo XIX, la región de Lieja tiene muchas fábricas y minas de carbón."),
            L("1817 : John Cockerill s'installe à Seraing.", "1817: Джон Кокеріль оселяється в Серені.", "1817: John Cockerill osiedla się w Seraing.", "1817: John Cockerill se instala en Seraing."),
            L("La Meuse sert à transporter le charbon et le fer.", "Маасом перевозять вугілля і залізо.", "Mozą transportuje się węgiel i żelazo.", "El Mosa sirve para transportar el carbón y el hierro.")
          ] } }
      ]
    },
    {
      id: "be-guerres",
      titre: L("Les deux guerres près de chez nous", "Дві війни поруч із нами", "Dwie wojny blisko nas", "Las dos guerras cerca de nosotros"),
      objectif: L("Je relie des lieux proches de Huy à la Première et à la Seconde Guerre mondiale.", "Я пов'язую місця біля Юї з Першою та Другою світовими війнами.", "Łączę miejsca koło Huy z pierwszą i drugą wojną światową.", "Relaciono lugares cerca de Huy con la Primera y la Segunda Guerra Mundial."),
      criteres: [
        crit("be-guerres-dates", "Je connais les dates des deux guerres mondiales.", "Я знаю дати двох світових воєн.", "Znam daty obu wojen światowych.", "Conozco las fechas de las dos guerras mundiales."),
        crit("be-guerres-lieux", "Je relie un lieu à un événement.", "Я пов'язую місце з подією.", "Łączę miejsce z wydarzeniem.", "Relaciono un lugar con un acontecimiento.")
      ],
      etapes: [
        { type: "ressource",
          titre: L("1914 : le fort de Loncin", "1914: форт Лонсен", "1914: fort Loncin", "1914: el fuerte de Loncin"),
          contenu: {
            docs: [DOC.loncin],
            textes: [
              L("En août 1914, l'armée allemande entre en Belgique. C'est le début de la Première Guerre mondiale (1914-1918).", "У серпні 1914 року німецька армія входить до Бельгії. Це початок Першої світової війни (1914–1918).", "W sierpniu 1914 roku armia niemiecka wkracza do Belgii. To początek pierwszej wojny światowej (1914–1918).", "En agosto de 1914, el ejército alemán entra en Bélgica. Es el comienzo de la Primera Guerra Mundial (1914-1918)."),
              L("Les forts autour de Liège se défendent. Au fort de Loncin, une bombe fait exploser les munitions. Plus de 300 soldats belges meurent.", "Форти навколо Льєжа обороняються. У форті Лонсен бомба підриває боєприпаси. Гинуть понад 300 бельгійських солдатів.", "Forty wokół Liège bronią się. W forcie Loncin bomba wysadza amunicję. Ginie ponad 300 belgijskich żołnierzy.", "Los fuertes alrededor de Lieja se defienden. En el fuerte de Loncin, una bomba hace explotar las municiones. Mueren más de 300 soldados belgas.")
            ]
          } },
        { type: "ressource",
          titre: L("1940-1944 : le fort de Huy devient une prison", "1940–1944: форт у Юї стає в'язницею", "1940–1944: fort w Huy staje się więzieniem", "1940-1944: el fuerte de Huy se convierte en cárcel"),
          contenu: {
            docs: [DOC.fort],
            textes: [
              L("En mai 1940, l'armée allemande occupe à nouveau la Belgique. C'est la Seconde Guerre mondiale (1939-1945).", "У травні 1940 року німецька армія знову окуповує Бельгію. Це Друга світова війна (1939–1945).", "W maju 1940 roku armia niemiecka znowu okupuje Belgię. To druga wojna światowa (1939–1945).", "En mayo de 1940, el ejército alemán ocupa otra vez Bélgica. Es la Segunda Guerra Mundial (1939-1945)."),
              L("Les Allemands enferment des prisonniers au fort de Huy : environ 7 000 personnes, souvent des résistants.", "Німці тримають ув'язнених у форті в Юї: приблизно 7 000 людей, часто учасників опору.", "Niemcy więżą ludzi w forcie w Huy: około 7 000 osób, często członków ruchu oporu.", "Los alemanes encierran a prisioneros en el fuerte de Huy: unas 7 000 personas, a menudo miembros de la resistencia."),
              L("Le fort construit par le roi hollandais en 1818 sert donc encore plus de 100 ans après.", "Отже, форт, збудований нідерландським королем у 1818 році, служить і понад 100 років потому.", "Fort zbudowany przez króla holenderskiego w 1818 roku służy więc jeszcze ponad 100 lat później.", "El fuerte construido por el rey holandés en 1818 sigue sirviendo más de 100 años después.")
            ]
          } },
        { type: "minitest", test: "test-be-guerres" },
        { type: "synthese", titre: RETIENS,
          contenu: { liste: [
            L("1914-1918 : Première Guerre mondiale. Les forts de Liège résistent en août 1914.", "1914–1918: Перша світова війна. Форти Льєжа чинять опір у серпні 1914 року.", "1914–1918: pierwsza wojna światowa. Forty Liège bronią się w sierpniu 1914 roku.", "1914-1918: Primera Guerra Mundial. Los fuertes de Lieja resisten en agosto de 1914."),
            L("1940-1945 : la Belgique est occupée. Le fort de Huy est une prison allemande.", "1940–1945: Бельгія окупована. Форт у Юї — німецька в'язниця.", "1940–1945: Belgia jest okupowana. Fort w Huy to niemieckie więzienie.", "1940-1945: Bélgica está ocupada. El fuerte de Huy es una cárcel alemana."),
            L("Un même lieu peut être une trace de plusieurs époques.", "Одне й те саме місце може бути слідом кількох епох.", "To samo miejsce może być śladem kilku epok.", "Un mismo lugar puede ser una huella de varias épocas.")
          ] } }
      ]
    },
    {
      id: "be-aujourdhui",
      titre: L("La Belgique aujourd'hui", "Бельгія сьогодні", "Belgia dzisiaj", "Bélgica hoy"),
      objectif: L("Je lis la carte des régions. Je sais quelles langues on parle en Belgique.", "Я читаю карту регіонів. Я знаю, якими мовами говорять у Бельгії.", "Czytam mapę regionów. Wiem, jakimi językami mówi się w Belgii.", "Leo el mapa de las regiones. Sé qué idiomas se hablan en Bélgica."),
      criteres: [
        crit("be-auj-carte", "Je trouve une région sur la carte.", "Я знаходжу регіон на карті.", "Znajduję region na mapie.", "Encuentro una región en el mapa."),
        crit("be-auj-langues", "Je connais les 3 langues de la Belgique.", "Я знаю 3 мови Бельгії.", "Znam 3 języki Belgii.", "Conozco los 3 idiomas de Bélgica.")
      ],
      etapes: [
        { type: "ressource",
          titre: L("3 régions, 3 langues", "3 регіони, 3 мови", "3 regiony, 3 języki", "3 regiones, 3 idiomas"),
          contenu: {
            docs: [DOC.regions],
            textes: [
              L("Depuis 1993, la Belgique est un État fédéral : le pays est partagé en régions qui décident certaines choses elles-mêmes.", "З 1993 року Бельгія — федеративна держава: країна поділена на регіони, які деякі речі вирішують самі.", "Od 1993 roku Belgia jest państwem federalnym: kraj jest podzielony na regiony, które same decydują o niektórych sprawach.", "Desde 1993, Bélgica es un Estado federal: el país está dividido en regiones que deciden algunas cosas por sí mismas."),
              L("On parle 3 langues officielles : le néerlandais, le français et l'allemand.", "Є 3 офіційні мови: нідерландська, французька і німецька.", "Są 3 języki urzędowe: niderlandzki, francuski i niemiecki.", "Se hablan 3 idiomas oficiales: el neerlandés, el francés y el alemán."),
              L("Huy est en Wallonie. Ici, on parle français.", "Юї — у Валлонії. Тут говорять французькою.", "Huy leży w Walonii. Tutaj mówi się po francusku.", "Huy está en Valonia. Aquí se habla francés.")
            ]
          } },
        { type: "activite", activite: "be-frise" },
        { type: "minitest", test: "test-be-aujourdhui" },
        { type: "synthese", titre: RETIENS,
          contenu: { liste: [
            L("3 régions : la Région flamande, la Région wallonne, la Région de Bruxelles-Capitale.", "3 регіони: Фламандський, Валлонський, Брюссельський столичний.", "3 regiony: Region Flamandzki, Region Waloński, Region Stołeczny Brukseli.", "3 regiones: la Región Flamenca, la Región Valona, la Región de Bruselas-Capital."),
            L("3 langues : néerlandais, français, allemand.", "3 мови: нідерландська, французька, німецька.", "3 języki: niderlandzki, francuski, niemiecki.", "3 idiomas: neerlandés, francés, alemán."),
            L("Ligne du temps : 1815 → 1830 → 1831 → 1914 → 1940 → 1993 → aujourd'hui.", "Стрічка часу: 1815 → 1830 → 1831 → 1914 → 1940 → 1993 → сьогодні.", "Oś czasu: 1815 → 1830 → 1831 → 1914 → 1940 → 1993 → dziś.", "Línea del tiempo: 1815 → 1830 → 1831 → 1914 → 1940 → 1993 → hoy.")
          ] } }
      ]
    }
  );


  /* ---------- Activités (ajoutées à DATA.activites, même moteur que l'activité « euro ») ---------- */
  const AUTO = (fr, uk, pl, es) => ({ type: "auto", picto: 3245, verbe: "CHOISIS", consigne: L(fr, uk, pl, es) });
  const TRACE_BAC = { id: "trace", label: L("Trace du passé (faite à l'époque)", "Слід минулого (зроблено в той час)", "Ślad przeszłości (z tamtych czasów)", "Huella del pasado (hecha en esa época)") };
  const POST_BAC = { id: "post", label: L("Travail postérieur (fait plus tard)", "Пізніша праця (зроблено пізніше)", "Praca późniejsza (zrobiona później)", "Trabajo posterior (hecho más tarde)") };
  window.DATA.activites.push(
    {
      id: "be-trace", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Trace du passé ou travail postérieur ?", "Слід минулого чи пізніша праця?", "Ślad przeszłości czy praca późniejsza?", "¿Huella del pasado o trabajo posterior?"),
      objectif: L("Je classe des documents : trace du passé ou travail postérieur.", "Я сортую документи: слід минулого чи пізніша праця.", "Klasyfikuję dokumenty: ślad przeszłości czy praca późniejsza.", "Clasifico documentos: huella del pasado o trabajo posterior."),
      etapes: [
        { type: "classer", picto: null, verbe: "CLASSE",
          consigne: L("CLASSE les documents : TOUCHE un document, puis « trace du passé » ou « travail postérieur ».", "РОЗСОРТУЙ документи: ТОРКНИСЬ документа, потім «слід минулого» чи «пізніша праця».", "PODZIEL dokumenty: DOTKNIJ dokumentu, potem „ślad przeszłości” albo „praca późniejsza”.", "CLASIFICA los documentos: TOCA un documento y luego «huella del pasado» o «trabajo posterior»."),
          bacs: [TRACE_BAC, POST_BAC],
          elements: [
            { id: "carte", img: IMG + "carte-1815.jpg", bac: "trace", label: L("Carte de 1815, faite en 1815", "Карта 1815 року, зроблена в 1815 році", "Mapa z 1815 roku, zrobiona w 1815", "Mapa de 1815, hecho en 1815") },
            { id: "fort", img: IMG + "fort-huy.jpg", bac: "trace", label: L("Fort de Huy, construit en 1818-1823", "Форт у Юї, збудований у 1818–1823", "Fort w Huy, zbudowany w 1818–1823", "Fuerte de Huy, construido en 1818-1823") },
            { id: "wappers", img: IMG + "wappers-1835.jpg", bac: "post", label: L("Combats de 1830, peints en 1835", "Бої 1830 року, намальовані в 1835", "Walki z 1830 roku, namalowane w 1835", "Combates de 1830, pintados en 1835") },
            { id: "soubre", img: IMG + "soubre-1878.jpg", bac: "post", label: L("Volontaires de 1830, peints en 1878", "Добровольці 1830 року, намальовані в 1878", "Ochotnicy z 1830 roku, namalowani w 1878", "Voluntarios de 1830, pintados en 1878") },
            { id: "serment", img: IMG + "serment-1831.jpg", bac: "post", label: L("Serment de 1831, gravure de 1856", "Присяга 1831 року, гравюра 1856", "Przysięga z 1831 roku, rycina z 1856", "Juramento de 1831, grabado de 1856") }
          ],
          bravo: L("Bravo ! Fait à l'époque = trace du passé. Fait plus tard = travail postérieur.", "Молодець! Зроблено в той час — слід минулого. Зроблено пізніше — пізніша праця.", "Brawo! Zrobione w tamtych czasach = ślad przeszłości. Zrobione później = praca późniejsza.", "¡Bien! Hecho en esa época = huella del pasado. Hecho más tarde = trabajo posterior."),
          erreur: L("Pas encore. Compare deux dates : la date de l'événement et la date du document.", "Ще ні. Порівняй дві дати: дату події та дату документа.", "Jeszcze nie. Porównaj dwie daty: datę wydarzenia i datę dokumentu.", "Todavía no. Compara dos fechas: la del acontecimiento y la del documento."),
          aides: [
            L("Cherche deux dates sur chaque étiquette.", "Знайди дві дати на кожній картці.", "Znajdź dwie daty na każdej karcie.", "Busca dos fechas en cada etiqueta."),
            L("Si les deux dates sont pareilles, c'est fait à l'époque.", "Якщо дві дати однакові — це зроблено в той час.", "Jeśli obie daty są takie same, zrobiono to w tamtych czasach.", "Si las dos fechas son iguales, se hizo en esa época."),
            L("1835 est après 1830 : le tableau est fait plus tard.", "1835 — після 1830: картину зроблено пізніше.", "1835 jest po 1830: obraz zrobiono później.", "1835 es después de 1830: el cuadro se hizo más tarde.")
          ] },
        { type: "nombre", picto: null, verbe: "CALCULE",
          consigne: L("CALCULE : le serment a lieu en 1831. La gravure est publiée en 1856. Combien d'années après ?", "ПОРАХУЙ: присяга була в 1831 році. Гравюру надруковано в 1856 році. Через скільки років?", "POLICZ: przysięga była w 1831 roku. Rycinę wydano w 1856 roku. Ile lat później?", "CALCULA: el juramento es en 1831. El grabado se publica en 1856. ¿Cuántos años después?"),
          reponse: 25, unite: "ans",
          bravo: L("Oui ! 1856 − 1831 = 25 ans. C'est un travail postérieur.", "Так! 1856 − 1831 = 25 років. Це пізніша праця.", "Tak! 1856 − 1831 = 25 lat. To praca późniejsza.", "¡Sí! 1856 − 1831 = 25 años. Es un trabajo posterior."),
          erreur: L("Pas encore. Fais 1856 − 1831.", "Ще ні. Порахуй 1856 − 1831.", "Jeszcze nie. Policz 1856 − 1831.", "Todavía no. Haz 1856 − 1831."),
          aides: [
            L("La plus grande date moins la plus petite date.", "Більша дата мінус менша дата.", "Większa data minus mniejsza data.", "La fecha más grande menos la más pequeña."),
            L("De 1831 à 1851 : 20 ans. De 1851 à 1856 : … ans.", "Від 1831 до 1851: 20 років. Від 1851 до 1856: … років.", "Od 1831 do 1851: 20 lat. Od 1851 do 1856: … lat.", "De 1831 a 1851: 20 años. De 1851 a 1856: … años.")
          ] },
        AUTO("CHOISIS : est-ce que tu sais dire si un document est une trace du passé ou un travail postérieur ?", "ВИБЕРИ: чи вмієш ти сказати, документ — це слід минулого чи пізніша праця?", "WYBIERZ: czy umiesz powiedzieć, czy dokument to ślad przeszłości, czy praca późniejsza?", "ELIGE: ¿sabes decir si un documento es una huella del pasado o un trabajo posterior?")
      ]
    },
    {
      id: "be-usine", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("J'observe les usines de Seraing", "Я розглядаю заводи в Серені", "Oglądam fabryki w Seraing", "Observo las fábricas de Seraing"),
      objectif: L("Je trouve des éléments dans une image et je la décris.", "Я знаходжу елементи на зображенні й описую його.", "Znajduję elementy na obrazie i opisuję go.", "Encuentro elementos en una imagen y la describo."),
      etapes: [
        { type: "classer", picto: null, verbe: "CLASSE", image: IMG + "cockerill-1852.jpg",
          consigne: L("REGARDE l'image. CLASSE : ce que tu vois et ce que tu ne vois pas.", "ПОДИВИСЬ на зображення. РОЗСОРТУЙ: що ти бачиш і чого не бачиш.", "SPÓJRZ na obraz. PODZIEL: co widzisz, a czego nie widzisz.", "MIRA la imagen. CLASIFICA: lo que ves y lo que no ves."),
          bacs: [
            { id: "oui", label: L("Je le vois", "Я це бачу", "Widzę to", "Lo veo") },
            { id: "non", label: L("Je ne le vois pas", "Я цього не бачу", "Nie widzę tego", "No lo veo") }
          ],
          elements: [
            { id: "chem", bac: "oui", label: L("des cheminées", "димарі", "kominy", "chimeneas") },
            { id: "fumee", bac: "oui", label: L("de la fumée", "дим", "dym", "humo") },
            { id: "meuse", bac: "oui", label: L("la Meuse", "Маас", "Moza", "el Mosa") },
            { id: "bateau", bac: "oui", label: L("un bateau", "човен", "statek", "un barco") },
            { id: "voiture", bac: "non", label: L("une voiture", "автомобіль", "samochód", "un coche") },
            { id: "avion", bac: "non", label: L("un avion", "літак", "samolot", "un avión") }
          ],
          bravo: L("Bravo ! En 1852, il n'y a pas encore de voitures ni d'avions.", "Молодець! У 1852 році ще немає ні автомобілів, ні літаків.", "Brawo! W 1852 roku nie ma jeszcze samochodów ani samolotów.", "¡Bien! En 1852 todavía no hay coches ni aviones."),
          erreur: L("Regarde encore l'image, de gauche à droite.", "Подивись ще раз на зображення, зліва направо.", "Spójrz jeszcze raz na obraz, od lewej do prawej.", "Mira otra vez la imagen, de izquierda a derecha."),
          aides: [
            L("La rivière est en bas de l'image.", "Річка — внизу зображення.", "Rzeka jest na dole obrazu.", "El río está abajo en la imagen."),
            L("La voiture est inventée vers 1886, l'avion vers 1903.", "Автомобіль винайшли близько 1886 року, літак — близько 1903.", "Samochód wynaleziono około 1886 roku, samolot około 1903.", "El coche se inventa hacia 1886, el avión hacia 1903.")
          ] },
        { type: "ecrire", picto: null, verbe: "ÉCRIS", image: IMG + "cockerill-1852.jpg",
          consigne: L("ÉCRIS une ou deux phrases pour décrire l'image.", "НАПИШИ одне-два речення, щоб описати зображення.", "NAPISZ jedno lub dwa zdania, żeby opisać obraz.", "ESCRIBE una o dos frases para describir la imagen."),
          amorces: ["Je vois", "Il y a", "Au bord de la Meuse,"], placeholder: "Je vois des cheminées…",
          astuce: L("Tu peux aussi toucher le micro du clavier et parler.", "Можеш також натиснути мікрофон на клавіатурі й говорити.", "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", "También puedes tocar el micrófono del teclado y hablar."),
          aides: [
            L("Commence par ce qui est le plus grand.", "Почни з того, що найбільше.", "Zacznij od tego, co jest największe.", "Empieza por lo más grande."),
            L("Exemple : Je vois des usines et de la fumée.", "Приклад: Je vois des usines et de la fumée.", "Przykład: Je vois des usines et de la fumée.", "Ejemplo: Je vois des usines et de la fumée.")
          ] },
        AUTO("CHOISIS : est-ce que tu sais décrire une image d'usine ?", "ВИБЕРИ: чи вмієш ти описати зображення заводу?", "WYBIERZ: czy umiesz opisać obraz fabryki?", "ELIGE: ¿sabes describir una imagen de fábrica?")
      ]
    },
    {
      id: "be-frise", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Ma frise de la Belgique", "Моя стрічка часу Бельгії", "Moja oś czasu Belgii", "Mi línea del tiempo de Bélgica"),
      objectif: L("Je place les grands événements de la Belgique sur une frise du temps.", "Я розміщую головні події Бельгії на стрічці часу.", "Umieszczam najważniejsze wydarzenia Belgii na osi czasu.", "Coloco los grandes acontecimientos de Bélgica en una línea del tiempo."),
      etapes: [
        { type: "classer", picto: null, verbe: "CLASSE",
          consigne: L("CLASSE les événements sur la frise : TOUCHE un événement, puis la bonne période.", "РОЗСОРТУЙ події на стрічці часу: ТОРКНИСЬ події, потім правильного періоду.", "UMIEŚĆ wydarzenia na osi czasu: DOTKNIJ wydarzenia, potem właściwego okresu.", "CLASIFICA los acontecimientos en la línea del tiempo: TOCA un acontecimiento y luego el periodo correcto."),
          bacs: [
            { id: "p1", label: L("1815-1829 : avant la Belgique", "1815–1829: до Бельгії", "1815–1829: przed Belgią", "1815-1829: antes de Bélgica") },
            { id: "p2", label: L("1830-1831 : naissance de la Belgique", "1830–1831: народження Бельгії", "1830–1831: narodziny Belgii", "1830-1831: nacimiento de Bélgica") },
            { id: "p3", label: L("1914-1945 : les deux guerres", "1914–1945: дві війни", "1914–1945: dwie wojny", "1914-1945: las dos guerras") },
            { id: "p4", label: L("Depuis 1993 : la Belgique fédérale", "З 1993: федеративна Бельгія", "Od 1993: Belgia federalna", "Desde 1993: la Bélgica federal") }
          ],
          elements: [
            { id: "roi", bac: "p1", img: IMG + "carte-1815.jpg", label: L("Le roi hollandais Guillaume Ier", "Нідерландський король Віллем I", "Król holenderski Wilhelm I", "El rey holandés Guillermo I") },
            { id: "fort", bac: "p1", img: IMG + "fort-huy.jpg", label: L("On construit le fort de Huy", "Будують форт у Юї", "Budowa fortu w Huy", "Se construye el fuerte de Huy") },
            { id: "revol", bac: "p2", img: IMG + "wappers-1835.jpg", label: L("Combats à Bruxelles et indépendance", "Бої в Брюсселі та незалежність", "Walki w Brukseli i niepodległość", "Combates en Bruselas e independencia") },
            { id: "leo", bac: "p2", img: IMG + "serment-1831.jpg", label: L("Léopold Ier devient roi", "Леопольд I стає королем", "Leopold I zostaje królem", "Leopoldo I se convierte en rey") },
            { id: "loncin", bac: "p3", img: IMG + "loncin-1918.jpg", label: L("Le fort de Loncin explose", "Вибух форту Лонсен", "Wybuch fortu Loncin", "Explota el fuerte de Loncin") },
            { id: "prison", bac: "p3", label: L("Le fort de Huy devient une prison allemande", "Форт у Юї стає німецькою в'язницею", "Fort w Huy staje się niemieckim więzieniem", "El fuerte de Huy se convierte en cárcel alemana") },
            { id: "fed", bac: "p4", img: IMG + "regions-aujourdhui.jpg", label: L("La Belgique devient un État fédéral", "Бельгія стає федеративною державою", "Belgia staje się państwem federalnym", "Bélgica se convierte en un Estado federal") }
          ],
          bravo: L("Bravo ! Ta frise est juste : 1815 → 1830 → 1831 → 1914 → 1940 → 1993.", "Молодець! Твоя стрічка правильна: 1815 → 1830 → 1831 → 1914 → 1940 → 1993.", "Brawo! Twoja oś czasu jest dobra: 1815 → 1830 → 1831 → 1914 → 1940 → 1993.", "¡Bien! Tu línea del tiempo es correcta: 1815 → 1830 → 1831 → 1914 → 1940 → 1993."),
          erreur: L("Pas encore. Relis les synthèses « Ce que je retiens » des séquences.", "Ще ні. Перечитай підсумки «Що я запам'ятовую».", "Jeszcze nie. Przeczytaj jeszcze raz podsumowania „Co zapamiętuję”.", "Todavía no. Vuelve a leer las síntesis «Lo que recuerdo»."),
          aides: [
            L("Le fort de Huy sert à deux époques : construit vers 1820, prison en 1940.", "Форт у Юї служить у дві епохи: збудований близько 1820, в'язниця в 1940.", "Fort w Huy służy w dwóch epokach: zbudowany około 1820, więzienie w 1940.", "El fuerte de Huy sirve en dos épocas: construido hacia 1820, cárcel en 1940."),
            L("Le fort de Loncin explose en 1914.", "Форт Лонсен вибухає в 1914 році.", "Fort Loncin wybucha w 1914 roku.", "El fuerte de Loncin explota en 1914."),
            L("L'État fédéral, c'est 1993.", "Федеративна держава — це 1993 рік.", "Państwo federalne to rok 1993.", "El Estado federal es 1993.")
          ] },
        { type: "nombre", picto: null, verbe: "CALCULE",
          consigne: L("CALCULE : la Belgique est née en 1830. En 2030, elle aura quel âge ?", "ПОРАХУЙ: Бельгія народилася в 1830 році. Скільки їй буде у 2030 році?", "POLICZ: Belgia powstała w 1830 roku. Ile lat będzie miała w 2030 roku?", "CALCULA: Bélgica nació en 1830. ¿Cuántos años tendrá en 2030?"),
          reponse: 200, unite: "ans",
          bravo: L("Oui ! 2030 − 1830 = 200 ans. Deux siècles !", "Так! 2030 − 1830 = 200 років. Два століття!", "Tak! 2030 − 1830 = 200 lat. Dwa wieki!", "¡Sí! 2030 − 1830 = 200 años. ¡Dos siglos!"),
          erreur: L("Pas encore. Fais 2030 − 1830.", "Ще ні. Порахуй 2030 − 1830.", "Jeszcze nie. Policz 2030 − 1830.", "Todavía no. Haz 2030 − 1830."),
          aides: [
            L("Un siècle, c'est 100 ans.", "Століття — це 100 років.", "Wiek to 100 lat.", "Un siglo son 100 años."),
            L("De 1830 à 1930 : 100 ans. De 1930 à 2030 : … ans.", "Від 1830 до 1930: 100 років. Від 1930 до 2030: … років.", "Od 1830 do 1930: 100 lat. Od 1930 do 2030: … lat.", "De 1830 a 1930: 100 años. De 1930 a 2030: … años.")
          ] },
        { type: "ecrire", picto: null, verbe: "ÉCRIS",
          consigne: L("ÉCRIS une phrase : un événement de l'histoire de la Belgique qui s'est passé près de Huy.", "НАПИШИ речення: подія з історії Бельгії, яка сталася біля Юї.", "NAPISZ zdanie: wydarzenie z historii Belgii, które miało miejsce koło Huy.", "ESCRIBE una frase: un acontecimiento de la historia de Bélgica que pasó cerca de Huy."),
          amorces: ["En 1914,", "En 1940,", "À Huy,", "À Liège,"], placeholder: "En 1914, à Loncin…",
          astuce: L("Tu peux aussi toucher le micro du clavier et parler.", "Можеш також натиснути мікрофон на клавіатурі й говорити.", "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", "También puedes tocar el micrófono del teclado y hablar."),
          aides: [
            L("Pense aux forts : Huy et Loncin.", "Згадай форти: Юї та Лонсен.", "Pomyśl o fortach: Huy i Loncin.", "Piensa en los fuertes: Huy y Loncin."),
            L("Exemple : En 1940, le fort de Huy devient une prison.", "Приклад: En 1940, le fort de Huy devient une prison.", "Przykład: En 1940, le fort de Huy devient une prison.", "Ejemplo: En 1940, le fort de Huy devient une prison.")
          ] },
        AUTO("CHOISIS : est-ce que tu sais placer les grands événements de la Belgique dans le temps ?", "ВИБЕРИ: чи вмієш ти розмістити головні події Бельгії в часі?", "WYBIERZ: czy umiesz umieścić najważniejsze wydarzenia Belgii w czasie?", "ELIGE: ¿sabes situar en el tiempo los grandes acontecimientos de Bélgica?")
      ]
    }
  );

  /* ---------- Tests ---------- */
  const Q = (critere, consigne, options, explication, doc) => Object.assign({ critere, consigne, options, explication }, doc ? { doc } : {});
  P.tests.push(
    { id: "test-be-avant",
      titre: L("Mini-test : avant la Belgique", "Міні-тест: до Бельгії", "Mini-test: przed Belgią", "Mini-prueba: antes de Bélgica"),
      questions: [
        Q("be-avant-roi", L("CHOISIS : en 1815, qui est le roi de nos régions ?", "ВИБЕРИ: хто в 1815 році король наших земель?", "WYBIERZ: kto w 1815 roku jest królem naszych ziem?", "ELIGE: en 1815, ¿quién es el rey de nuestras regiones?"),
          [{ label: L("un roi belge", "бельгійський король", "król belgijski", "un rey belga") }, { label: L("le roi hollandais Guillaume Ier", "нідерландський король Віллем I", "król holenderski Wilhelm I", "el rey holandés Guillermo I"), correct: true }, { label: L("le roi de France", "король Франції", "król Francji", "el rey de Francia") }],
          L("En 1815, la Belgique n'existe pas. Le roi est le Hollandais Guillaume Ier.", "У 1815 році Бельгії немає. Король — нідерландець Віллем I.", "W 1815 roku Belgii nie ma. Królem jest Holender Wilhelm I.", "En 1815, Bélgica no existe. El rey es el holandés Guillermo I.")),
        Q("be-avant-trace", L("CHOISIS : la carte a été faite en 1815. Elle montre l'année 1815. C'est…", "ВИБЕРИ: карту зробили в 1815 році. Вона показує 1815 рік. Це…", "WYBIERZ: mapę zrobiono w 1815 roku. Pokazuje rok 1815. To jest…", "ELIGE: el mapa se hizo en 1815. Muestra el año 1815. Es…"),
          [trace(true), post(false)],
          L("La carte est faite à l'époque : c'est une trace du passé.", "Карту зроблено в той час: це слід минулого.", "Mapa powstała w tamtych czasach: to ślad przeszłości.", "El mapa se hizo en esa época: es una huella del pasado."), DOC.carte),
        Q("be-avant-trace", L("CHOISIS : le fort de Huy, construit en 1818-1823, c'est…", "ВИБЕРИ: форт у Юї, збудований у 1818–1823 роках, — це…", "WYBIERZ: fort w Huy, zbudowany w latach 1818–1823, to…", "ELIGE: el fuerte de Huy, construido en 1818-1823, es…"),
          [trace(true), post(false)],
          L("Le fort a été construit à l'époque du roi hollandais : c'est une trace du passé.", "Форт збудували за часів нідерландського короля: це слід минулого.", "Fort zbudowano w czasach króla holenderskiego: to ślad przeszłości.", "El fuerte se construyó en la época del rey holandés: es una huella del pasado."), DOC.fort)
      ] },
    { id: "test-be-1830",
      titre: L("Mini-test : la révolution de 1830", "Міні-тест: революція 1830 року", "Mini-test: rewolucja 1830 roku", "Mini-prueba: la revolución de 1830"),
      questions: [
        Q("be-1830-faits", L("CHOISIS : en septembre 1830, on se bat à…", "ВИБЕРИ: у вересні 1830 року бої точаться в…", "WYBIERZ: we wrześniu 1830 roku walki toczą się w…", "ELIGE: en septiembre de 1830 se lucha en…"),
          [{ label: "Huy" }, { label: L("Bruxelles", "Брюсселі", "Brukseli", "Bruselas"), correct: true }, { label: "Paris" }],
          L("Les combats de septembre 1830 ont lieu à Bruxelles.", "Бої вересня 1830 року відбуваються в Брюсселі.", "Walki we wrześniu 1830 roku toczą się w Brukseli.", "Los combates de septiembre de 1830 tienen lugar en Bruselas.")),
        Q("be-1830-faits", L("CHOISIS : quand la Belgique déclare-t-elle son indépendance ?", "ВИБЕРИ: коли Бельгія проголошує незалежність?", "WYBIERZ: kiedy Belgia ogłasza niepodległość?", "ELIGE: ¿cuándo declara Bélgica su independencia?"),
          [{ label: L("le 4 octobre 1830", "4 жовтня 1830", "4 października 1830", "el 4 de octubre de 1830"), correct: true }, { label: L("le 21 juillet 1831", "21 липня 1831", "21 lipca 1831", "el 21 de julio de 1831") }, { label: "1815" }],
          L("Le 4 octobre 1830, la Belgique déclare son indépendance.", "4 жовтня 1830 року Бельгія проголошує незалежність.", "4 października 1830 roku Belgia ogłasza niepodległość.", "El 4 de octubre de 1830, Bélgica declara su independencia.")),
        Q("be-1830-trace", L("CHOISIS : l'événement a lieu en 1830. Wappers peint ce tableau en 1835. C'est…", "ВИБЕРИ: подія відбулася в 1830 році. Ваперс малює цю картину в 1835 році. Це…", "WYBIERZ: wydarzenie miało miejsce w 1830 roku. Wappers maluje ten obraz w 1835 roku. To…", "ELIGE: el acontecimiento tiene lugar en 1830. Wappers pinta este cuadro en 1835. Es…"),
          [trace(false), post(true)],
          L("Le tableau est peint 5 ans après l'événement : c'est un travail postérieur.", "Картину намальовано через 5 років після події: це пізніша праця.", "Obraz namalowano 5 lat po wydarzeniu: to praca późniejsza.", "El cuadro se pinta 5 años después del acontecimiento: es un trabajo posterior."), DOC.wappers),
        Q("be-1830-trace", L("CALCULE : Soubre peint son tableau en 1878. Combien d'années après 1830 ?", "ПОРАХУЙ: Субр малює картину в 1878 році. Скільки років після 1830?", "POLICZ: Soubre maluje obraz w 1878 roku. Ile lat po 1830?", "CALCULA: Soubre pinta su cuadro en 1878. ¿Cuántos años después de 1830?"),
          [{ label: "8" }, { label: "48", correct: true }, { label: "148" }],
          L("1878 − 1830 = 48 ans. C'est un travail postérieur.", "1878 − 1830 = 48 років. Це пізніша праця.", "1878 − 1830 = 48 lat. To praca późniejsza.", "1878 − 1830 = 48 años. Es un trabajo posterior."), DOC.soubre)
      ] },
    { id: "test-be-1831",
      titre: L("Mini-test : une Constitution et un roi", "Міні-тест: Конституція і король", "Mini-test: Konstytucja i król", "Mini-prueba: una Constitución y un rey"),
      questions: [
        Q("be-1831-faits", L("CHOISIS : la Constitution, c'est…", "ВИБЕРИ: Конституція — це…", "WYBIERZ: Konstytucja to…", "ELIGE: la Constitución es…"),
          [{ label: L("les règles les plus importantes du pays", "найважливіші правила країни", "najważniejsze zasady kraju", "las reglas más importantes del país"), correct: true }, { label: L("le drapeau du pays", "прапор країни", "flaga kraju", "la bandera del país") }, { label: L("le palais du roi", "палац короля", "pałac króla", "el palacio del rey") }],
          L("La Constitution, ce sont les règles les plus importantes du pays.", "Конституція — це найважливіші правила країни.", "Konstytucja to najważniejsze zasady kraju.", "La Constitución son las reglas más importantes del país.")),
        Q("be-1831-faits", L("CHOISIS : qui est le premier roi des Belges ?", "ВИБЕРИ: хто перший король бельгійців?", "WYBIERZ: kto jest pierwszym królem Belgów?", "ELIGE: ¿quién es el primer rey de los belgas?"),
          [{ label: "Guillaume Ier" }, { label: "Léopold Ier", correct: true }, { label: "Charles Rogier" }],
          L("Léopold Ier devient roi le 21 juillet 1831.", "Леопольд I стає королем 21 липня 1831 року.", "Leopold I zostaje królem 21 lipca 1831 roku.", "Leopoldo I se convierte en rey el 21 de julio de 1831."), DOC.serment),
        Q("be-1831-temps", L("CHOISIS la date la plus ancienne.", "ВИБЕРИ найдавнішу дату.", "WYBIERZ najdawniejszą datę.", "ELIGE la fecha más antigua."),
          [{ label: L("21 juillet 1831", "21 липня 1831", "21 lipca 1831", "21 de julio de 1831") }, { label: L("4 octobre 1830", "4 жовтня 1830", "4 października 1830", "4 de octubre de 1830"), correct: true }, { label: L("7 février 1831", "7 лютого 1831", "7 lutego 1831", "7 de febrero de 1831") }],
          L("Ordre : 4 octobre 1830 → 7 février 1831 → 21 juillet 1831.", "Порядок: 4 жовтня 1830 → 7 лютого 1831 → 21 липня 1831.", "Kolejność: 4 października 1830 → 7 lutego 1831 → 21 lipca 1831.", "Orden: 4 de octubre de 1830 → 7 de febrero de 1831 → 21 de julio de 1831.")),
        Q("be-1831-temps", L("CHOISIS : la gravure du serment est publiée en 1856. Le serment a lieu en 1831. La gravure est…", "ВИБЕРИ: гравюру присяги надруковано в 1856 році. Присяга була в 1831 році. Гравюра —…", "WYBIERZ: rycinę przysięgi wydano w 1856 roku. Przysięga była w 1831 roku. Rycina to…", "ELIGE: el grabado del juramento se publica en 1856. El juramento es en 1831. El grabado es…"),
          [trace(false), post(true)],
          L("La gravure est faite 25 ans plus tard : c'est un travail postérieur.", "Гравюру зроблено через 25 років: це пізніша праця.", "Rycinę wykonano 25 lat później: to praca późniejsza.", "El grabado se hace 25 años más tarde: es un trabajo posterior."), DOC.serment)
      ] },
    { id: "test-be-industrie",
      titre: L("Mini-test : la Belgique des usines", "Міні-тест: Бельгія заводів", "Mini-test: Belgia fabryk", "Mini-prueba: la Bélgica de las fábricas"),
      questions: [
        Q("be-ind-decrire", L("REGARDE le document. CHOISIS ce qui sort des cheminées.", "ПОДИВИСЬ на документ. ВИБЕРИ, що виходить із димарів.", "SPÓJRZ na dokument. WYBIERZ, co wychodzi z kominów.", "MIRA el documento. ELIGE lo que sale de las chimeneas."),
          [{ label: L("de la fumée", "дим", "dym", "humo"), correct: true }, { label: L("de l'eau", "вода", "woda", "agua") }, { label: L("des fleurs", "квіти", "kwiaty", "flores") }],
          L("La fumée vient du charbon qu'on brûle dans les usines.", "Дим іде від вугілля, яке спалюють на заводах.", "Dym pochodzi z węgla spalanego w fabrykach.", "El humo viene del carbón que se quema en las fábricas."), DOC.cockerill),
        Q("be-ind-decrire", L("REGARDE le document. Quelle rivière passe devant les usines ?", "ПОДИВИСЬ на документ. Яка річка тече перед заводами?", "SPÓJRZ na dokument. Jaka rzeka płynie przed fabrykami?", "MIRA el documento. ¿Qué río pasa delante de las fábricas?"),
          [{ label: L("la Meuse", "Маас", "Moza", "el Mosa"), correct: true }, { label: L("la Seine", "Сена", "Sekwana", "el Sena") }, { label: L("le Danube", "Дунай", "Dunaj", "el Danubio") }],
          L("Seraing est au bord de la Meuse, comme Huy et Liège.", "Серен стоїть на березі Маасу, як Юї та Льєж.", "Seraing leży nad Mozą, tak jak Huy i Liège.", "Seraing está a orillas del Mosa, como Huy y Lieja.")),
        Q("be-ind-faits", L("CHOISIS : avec le charbon, les usines de Liège fabriquent…", "ВИБЕРИ: з вугілля заводи Льєжа виробляють…", "WYBIERZ: z węgla fabryki Liège produkują…", "ELIGE: con el carbón, las fábricas de Lieja fabrican…"),
          [{ label: L("du chocolat", "шоколад", "czekoladę", "chocolate") }, { label: L("du fer et des machines", "залізо і машини", "żelazo i maszyny", "hierro y máquinas"), correct: true }, { label: L("des vêtements", "одяг", "ubrania", "ropa") }],
          L("Avec le charbon, on fabrique du fer, des machines et des locomotives.", "З вугілля виробляють залізо, машини й локомотиви.", "Z węgla produkuje się żelazo, maszyny i lokomotywy.", "Con el carbón se fabrica hierro, máquinas y locomotoras."))
      ] },
    { id: "test-be-guerres",
      titre: L("Mini-test : les deux guerres", "Міні-тест: дві війни", "Mini-test: dwie wojny", "Mini-prueba: las dos guerras"),
      questions: [
        Q("be-guerres-dates", L("CHOISIS : la Première Guerre mondiale, c'est…", "ВИБЕРИ: Перша світова війна — це…", "WYBIERZ: pierwsza wojna światowa to…", "ELIGE: la Primera Guerra Mundial es…"),
          [{ label: "1830-1831" }, { label: "1914-1918", correct: true }, { label: "1939-1945" }],
          L("La Première Guerre mondiale dure de 1914 à 1918.", "Перша світова війна триває з 1914 до 1918 року.", "Pierwsza wojna światowa trwa od 1914 do 1918 roku.", "La Primera Guerra Mundial dura de 1914 a 1918.")),
        Q("be-guerres-lieux", L("CHOISIS : le fort de Loncin explose en…", "ВИБЕРИ: форт Лонсен вибухає в…", "WYBIERZ: fort Loncin wybucha w…", "ELIGE: el fuerte de Loncin explota en…"),
          [{ label: L("août 1914", "серпні 1914", "sierpniu 1914", "agosto de 1914"), correct: true }, { label: L("mai 1940", "травні 1940", "maju 1940", "mayo de 1940") }, { label: "1831" }],
          L("Le fort de Loncin explose le 15 août 1914.", "Форт Лонсен вибухає 15 серпня 1914 року.", "Fort Loncin wybucha 15 sierpnia 1914 roku.", "El fuerte de Loncin explota el 15 de agosto de 1914."), DOC.loncin),
        Q("be-guerres-lieux", L("CHOISIS : de 1940 à 1944, le fort de Huy est…", "ВИБЕРИ: з 1940 до 1944 року форт у Юї —…", "WYBIERZ: od 1940 do 1944 roku fort w Huy to…", "ELIGE: de 1940 a 1944, el fuerte de Huy es…"),
          [{ label: L("une école", "школа", "szkoła", "una escuela") }, { label: L("une prison allemande", "німецька в'язниця", "niemieckie więzienie", "una cárcel alemana"), correct: true }, { label: L("une usine", "завод", "fabryka", "una fábrica") }],
          L("Les Allemands y enferment environ 7 000 personnes.", "Німці тримають там приблизно 7 000 людей.", "Niemcy więżą tam około 7 000 osób.", "Los alemanes encierran allí a unas 7 000 personas."), DOC.fort),
        Q("be-guerres-dates", L("CHOISIS : la photo du fort de Loncin est prise en 1918, à la fin de la guerre. C'est…", "ВИБЕРИ: фото форту Лонсен зроблено в 1918 році, наприкінці війни. Це…", "WYBIERZ: zdjęcie fortu Loncin zrobiono w 1918 roku, pod koniec wojny. To…", "ELIGE: la foto del fuerte de Loncin se hizo en 1918, al final de la guerra. Es…"),
          [trace(true), post(false)],
          L("La photo est prise pendant la Première Guerre mondiale : c'est une trace du passé.", "Фото зроблено під час Першої світової війни: це слід минулого.", "Zdjęcie zrobiono w czasie pierwszej wojny światowej: to ślad przeszłości.", "La foto se hizo durante la Primera Guerra Mundial: es una huella del pasado."), DOC.loncin)
      ] },
    { id: "test-be-aujourdhui",
      titre: L("Mini-test : la Belgique aujourd'hui", "Міні-тест: Бельгія сьогодні", "Mini-test: Belgia dzisiaj", "Mini-prueba: Bélgica hoy"),
      questions: [
        Q("be-auj-carte", L("REGARDE la carte. Huy est dans quelle région ?", "ПОДИВИСЬ на карту. У якому регіоні Юї?", "SPÓJRZ na mapę. W którym regionie jest Huy?", "MIRA el mapa. ¿En qué región está Huy?"),
          [{ label: L("la Région flamande", "Фламандський регіон", "Region Flamandzki", "la Región Flamenca") }, { label: L("la Région wallonne", "Валлонський регіон", "Region Waloński", "la Región Valona"), correct: true }, { label: L("la Région de Bruxelles-Capitale", "Брюссельський столичний регіон", "Region Stołeczny Brukseli", "la Región de Bruselas-Capital") }],
          L("Huy est dans la partie rouge : la Région wallonne.", "Юї — у червоній частині: Валлонський регіон.", "Huy leży w czerwonej części: Region Waloński.", "Huy está en la parte roja: la Región Valona."), DOC.regions),
        Q("be-auj-langues", L("CHOISIS : quelle langue n'est PAS une langue officielle de la Belgique ?", "ВИБЕРИ: яка мова НЕ є офіційною в Бельгії?", "WYBIERZ: który język NIE jest językiem urzędowym Belgii?", "ELIGE: ¿qué idioma NO es oficial en Bélgica?"),
          [{ label: L("le français", "французька", "francuski", "el francés") }, { label: L("l'anglais", "англійська", "angielski", "el inglés"), correct: true }, { label: L("le néerlandais", "нідерландська", "niderlandzki", "el neerlandés") }],
          L("Les 3 langues officielles sont le néerlandais, le français et l'allemand.", "3 офіційні мови: нідерландська, французька і німецька.", "3 języki urzędowe to niderlandzki, francuski i niemiecki.", "Los 3 idiomas oficiales son el neerlandés, el francés y el alemán.")),
        Q("be-auj-carte", L("REGARDE la carte. Dans la partie bleue, on parle…", "ПОДИВИСЬ на карту. У синій частині говорять…", "SPÓJRZ na mapę. W niebieskiej części mówi się po…", "MIRA el mapa. En la parte azul se habla…"),
          [{ label: L("allemand", "німецькою", "niemiecku", "alemán"), correct: true }, { label: L("néerlandais", "нідерландською", "niderlandzku", "neerlandés") }, { label: L("espagnol", "іспанською", "hiszpańsku", "español") }],
          L("Dans l'est de la Belgique, près de l'Allemagne, on parle allemand.", "На сході Бельгії, біля Німеччини, говорять німецькою.", "Na wschodzie Belgii, przy Niemczech, mówi się po niemiecku.", "En el este de Bélgica, cerca de Alemania, se habla alemán."), DOC.regions)
      ] },
    { id: "bilan-hist-belgique",
      titre: L("Test de fin de chapitre : comment est née la Belgique ?", "Тест у кінці розділу: як виникла Бельгія?", "Test na koniec rozdziału: jak powstała Belgia?", "Prueba de fin de capítulo: ¿cómo nació Bélgica?"),
      questions: [
        Q("be-1831-temps", L("CHOISIS : dans quel ordre ?", "ВИБЕРИ: у якому порядку?", "WYBIERZ: w jakiej kolejności?", "ELIGE: ¿en qué orden?"),
          [{ label: L("roi hollandais → révolution → Léopold Ier", "нідерландський король → революція → Леопольд I", "król holenderski → rewolucja → Leopold I", "rey holandés → revolución → Leopoldo I"), correct: true },
           { label: L("Léopold Ier → révolution → roi hollandais", "Леопольд I → революція → нідерландський король", "Leopold I → rewolucja → król holenderski", "Leopoldo I → revolución → rey holandés") },
           { label: L("révolution → roi hollandais → Léopold Ier", "революція → нідерландський король → Леопольд I", "rewolucja → król holenderski → Leopold I", "revolución → rey holandés → Leopoldo I") }],
          L("1815 : roi hollandais. 1830 : révolution. 1831 : Léopold Ier.", "1815: нідерландський король. 1830: революція. 1831: Леопольд I.", "1815: król holenderski. 1830: rewolucja. 1831: Leopold I.", "1815: rey holandés. 1830: revolución. 1831: Leopoldo I.")),
        Q("be-1830-faits", L("CHOISIS : en quelle année la Belgique devient-elle indépendante ?", "ВИБЕРИ: у якому році Бельгія стає незалежною?", "WYBIERZ: w którym roku Belgia staje się niepodległa?", "ELIGE: ¿en qué año se independiza Bélgica?"),
          [{ label: "1815" }, { label: "1830", correct: true }, { label: "1914" }],
          L("La Belgique devient indépendante en 1830.", "Бельгія стає незалежною в 1830 році.", "Belgia staje się niepodległa w 1830 roku.", "Bélgica se independiza en 1830.")),
        Q("be-1831-faits", L("CHOISIS : pourquoi le 21 juillet est-il la fête nationale ?", "ВИБЕРИ: чому 21 липня — національне свято?", "WYBIERZ: dlaczego 21 lipca to święto narodowe?", "ELIGE: ¿por qué el 21 de julio es la fiesta nacional?"),
          [{ label: L("Léopold Ier devient roi.", "Леопольд I стає королем.", "Leopold I zostaje królem.", "Leopoldo I se convierte en rey."), correct: true }, { label: L("La guerre se termine.", "Закінчується війна.", "Kończy się wojna.", "Termina la guerra.") }, { label: L("Le fort de Huy est construit.", "Збудовано форт у Юї.", "Zbudowano fort w Huy.", "Se construye el fuerte de Huy.") }],
          L("Le 21 juillet 1831, Léopold Ier prête serment : il devient le premier roi des Belges.", "21 липня 1831 року Леопольд I складає присягу: він стає першим королем бельгійців.", "21 lipca 1831 roku Leopold I składa przysięgę: zostaje pierwszym królem Belgów.", "El 21 de julio de 1831, Leopoldo I presta juramento: se convierte en el primer rey de los belgas.")),
        Q("be-1830-trace", L("CHOISIS : Soubre peint les volontaires de 1830 en 1878. Son tableau est…", "ВИБЕРИ: Субр малює добровольців 1830 року в 1878 році. Його картина —…", "WYBIERZ: Soubre maluje ochotników z 1830 roku w 1878 roku. Jego obraz to…", "ELIGE: Soubre pinta a los voluntarios de 1830 en 1878. Su cuadro es…"),
          [trace(false), post(true)],
          L("48 ans après l'événement : c'est un travail postérieur.", "Через 48 років після події: це пізніша праця.", "48 lat po wydarzeniu: to praca późniejsza.", "48 años después del acontecimiento: es un trabajo posterior."), DOC.soubre),
        Q("be-ind-faits", L("CHOISIS : au XIXe siècle, autour de Liège, il y a beaucoup…", "ВИБЕРИ: у XIX столітті навколо Льєжа багато…", "WYBIERZ: w XIX wieku wokół Liège jest dużo…", "ELIGE: en el siglo XIX, alrededor de Lieja, hay muchas…"),
          [{ label: L("d'usines et de mines de charbon", "заводів і вугільних шахт", "fabryk i kopalń węgla", "fábricas y minas de carbón"), correct: true }, { label: L("de plages", "пляжів", "plaż", "playas") }, { label: L("de volcans", "вулканів", "wulkanów", "volcanes") }],
          L("La région de Liège est une grande région d'industrie.", "Регіон Льєжа — великий промисловий регіон.", "Region Liège to duży region przemysłowy.", "La región de Lieja es una gran región industrial.")),
        Q("be-guerres-lieux", L("CHOISIS : le fort de Huy est une trace de quelles époques ?", "ВИБЕРИ: форт у Юї — слід яких епох?", "WYBIERZ: fort w Huy to ślad jakich epok?", "ELIGE: el fuerte de Huy es una huella de ¿qué épocas?"),
          [{ label: L("du roi hollandais et de la Seconde Guerre mondiale", "нідерландського короля і Другої світової війни", "króla holenderskiego i drugiej wojny światowej", "del rey holandés y de la Segunda Guerra Mundial"), correct: true },
           { label: L("seulement d'aujourd'hui", "тільки сьогодення", "tylko dzisiejszych czasów", "solo de hoy") },
           { label: L("de la Préhistoire", "доісторичних часів", "prehistorii", "de la Prehistoria") }],
          L("Construit en 1818-1823 par le roi hollandais, il devient une prison allemande en 1940-1944.", "Збудований у 1818–1823 роках нідерландським королем, він стає німецькою в'язницею в 1940–1944 роках.", "Zbudowany w latach 1818–1823 przez króla holenderskiego, w latach 1940–1944 staje się niemieckim więzieniem.", "Construido en 1818-1823 por el rey holandés, se convierte en cárcel alemana en 1940-1944."), DOC.fort),
        Q("be-auj-langues", L("CHOISIS : à Huy, on parle…", "ВИБЕРИ: у Юї говорять…", "WYBIERZ: w Huy mówi się po…", "ELIGE: en Huy se habla…"),
          [{ label: L("français", "французькою", "francusku", "francés"), correct: true }, { label: L("néerlandais", "нідерландською", "niderlandzku", "neerlandés") }, { label: L("allemand", "німецькою", "niemiecku", "alemán") }],
          L("Huy est en Wallonie, dans la partie où l'on parle français.", "Юї — у Валлонії, у частині, де говорять французькою.", "Huy leży w Walonii, w części, gdzie mówi się po francusku.", "Huy está en Valonia, en la parte donde se habla francés."))
      ] }
  );
})();
