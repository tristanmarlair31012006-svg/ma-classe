/* Histoire, module 5 : les Grandes découvertes (± 3 h, 3 séquences). Verrou : test des rappels.
   Angle choisi : voyager (pourquoi, comment), « découverte… pour qui ? » (regard des Aztèques, échanges entre continents),
   et les cartes qui changent (Cantino 1502, Ortelius d'Anvers 1570, Mercator né en Flandre).
   Savoir-faire : frise, carte, toucher sur une carte ancienne, critiquer une carte (continent imaginaire), point de vue, recherche.
   Documents numérotés 1 à 5. rn (kirundi) = null tant que pas relu. */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/histoire/", MONDE = "img/prerequis/continents-oceans.png", ORTELIUS = IMG + "gd-ortelius-1570.jpg";
  const crit = (id, fr, uk, pl, es) => ({ id, t: L(fr, uk, pl, es) });
  const Q = (critere, consigne, options, explication, doc) => Object.assign({ critere, consigne, options, explication }, doc ? { doc } : {});
  const o = (fr, uk, pl, es, ok) => Object.assign({ label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const RETIENS = L("Ce que je retiens", "Що я запам'ятовую", "Co zapamiętuję", "Lo que recuerdo");
  const AUTO = (fr, uk, pl, es) => ({ type: "auto", picto: 3245, verbe: "CHOISIS", consigne: L(fr, uk, pl, es) });
  const el = (id, fr, uk, pl, es, bac) => Object.assign({ id, label: L(fr, uk, pl, es) }, bac ? { bac } : {});
  const opt = (id, fr, uk, pl, es, ok) => Object.assign({ id, label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const pt = (id, x, y) => ({ id, x, y });
  const ASTUCE_MICRO = L("Tu peux aussi toucher le micro du clavier et parler.", "Можеш також натиснути мікрофон на клавіатурі й говорити.", "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", "También puedes tocar el micrófono del teclado y hablar.");
  const CARTE = (consigne, carte, points, bonne, bravo, erreur, aides) => ({ type: "carte", picto: null, verbe: "TOUCHE", consigne, carte, points, bonne, bravo, erreur, aides });
  const CLASSER = (consigne, bacs, elements, bravo, erreur, aides) => ({ type: "classer", picto: null, verbe: "CLASSE", consigne, bacs, elements, bravo, erreur, aides });
  const CHOIX = (verbe, consigne, options, bravo, erreur, aides, plus) => Object.assign({ type: "choix", picto: null, verbe, consigne, options, bravo, erreur, aides }, plus || {});
  const ECRIRE = (verbe, consigne, amorces, placeholder, aides, plus) => Object.assign({ type: "ecrire", picto: null, verbe, consigne, amorces, placeholder, astuce: ASTUCE_MICRO, aides }, plus || {});
  const PTS_ORTELIUS = [pt("ams", 35, 58), pt("afr", 64, 49), pt("asie", 80, 29), pt("australe", 50, 78)];

  /* ---------- Documents (1 à 5) ---------- */
  const DOC = {
    caravelle: { n: 1, src: IMG + "gd-caravelle.jpg",
      legende: L("Photographie de la Boa Esperança, une copie de caravelle portugaise construite à notre époque, amarrée à Lagos (Portugal) en 2015.", "Фотографія «Боа Есперанса» — копії португальської каравели, збудованої в наш час, пришвартованої в Лагуші (Португалія) у 2015 році.", "Zdjęcie Boa Esperança, kopii portugalskiej karaweli zbudowanej w naszych czasach, zacumowanej w Lagos (Portugalia) w 2015 roku.", "Fotografía de la Boa Esperança, una copia de carabela portuguesa construida en nuestra época, amarrada en Lagos (Portugal) en 2015."),
      credit: "Photo : Norbert Nagel, 2015 (Wikimedia Commons, CC BY-SA 4.0)" },
    cantino: { n: 2, src: IMG + "gd-cantino.jpg",
      legende: L("Planisphère de Cantino, une carte du monde dessinée par un cartographe portugais inconnu en 1502. Biblioteca Estense, Modène (Italie).", "Планісфера Кантіно — карта світу, намальована невідомим португальським картографом у 1502 році. Бібліотека Естенсе, Модена (Італія).", "Planisfera Cantina, mapa świata narysowana przez nieznanego portugalskiego kartografa w 1502 roku. Biblioteca Estense, Modena (Włochy).", "Planisferio de Cantino, un mapa del mundo dibujado por un cartógrafo portugués desconocido en 1502. Biblioteca Estense, Módena (Italia)."),
      credit: "Domaine public (Wikimedia Commons)" },
    monde: { n: 3, src: MONDE,
      legende: L("Carte du monde aujourd'hui : les continents et les océans.", "Карта світу сьогодні: континенти й океани.", "Mapa świata dzisiaj: kontynenty i oceany.", "Mapa del mundo hoy: los continentes y los océanos."),
      credit: "Réalisé par T.Marlair sur base de la carte de Cogito ergo sumo (Wikimedia Commons, CC BY-SA 3.0)" },
    codex: { n: 4, src: IMG + "gd-codex-florentin.jpg",
      legende: L("Dessin du Codex de Florence, un livre réalisé au Mexique avec des auteurs nahuas (aztèques) sous la direction du moine espagnol Bernardino de Sahagún, terminé vers 1585. Il montre des Nahuas malades de la variole. Bibliothèque Laurentienne, Florence (Italie).",
        "Малюнок із Флорентійського кодексу — книжки, створеної в Мексиці авторами-науа (ацтеками) під керівництвом іспанського ченця Бернардіно де Саагуна, завершеної близько 1585 року. На ньому науа, хворі на віспу. Бібліотека Лауренціана, Флоренція (Італія).",
        "Rysunek z Kodeksu Florenckiego, księgi stworzonej w Meksyku przez autorów Nahua (Azteków) pod kierunkiem hiszpańskiego mnicha Bernardina de Sahagúna, ukończonej około 1585 roku. Pokazuje Nahua chorych na ospę. Biblioteka Laurenziana, Florencja (Włochy).",
        "Dibujo del Códice Florentino, un libro hecho en México con autores nahuas (aztecas) bajo la dirección del monje español Bernardino de Sahagún, terminado hacia 1585. Muestra a nahuas enfermos de viruela. Biblioteca Laurenciana, Florencia (Italia)."),
      credit: "Domaine public (Wikimedia Commons)" },
    ortelius: { n: 5, src: ORTELIUS,
      legende: L("Carte du monde (« Typus Orbis Terrarum ») d'Abraham Ortelius, publiée à Anvers en 1570 dans le premier atlas moderne.", "Карта світу («Typus Orbis Terrarum») Авраама Ортелія, видана в Антверпені в 1570 році в першому сучасному атласі.", "Mapa świata („Typus Orbis Terrarum”) Abrahama Orteliusa, wydana w Antwerpii w 1570 roku w pierwszym nowoczesnym atlasie.", "Mapa del mundo («Typus Orbis Terrarum») de Abraham Ortelius, publicado en Amberes en 1570 en el primer atlas moderno."),
      credit: "Domaine public (Wikimedia Commons)" }
  };

  /* ---------- Chapitre ---------- */
  const iAv = P.chapitres.findIndex(c => c.id === "hist-moyen-age");
  P.chapitres.splice(iAv + 1, 0, { id: "hist-decouvertes", discipline: "histoire", verrou: { test: "bilan-pr-histoire", min: 0.5 },
    titre: L("5. Les Grandes découvertes", "5. Великі географічні відкриття", "5. Wielkie odkrycia geograficzne", "5. Los grandes descubrimientos"),
    dejaVu: [L("Tu vas suivre les marins européens, écouter le point de vue des Aztèques et voir comment les cartes du monde changent, jusqu'à Anvers.", "Ти підеш слідами європейських мореплавців, почуєш погляд ацтеків і побачиш, як змінюються карти світу, аж до Антверпена.", "Pójdziesz śladem europejskich żeglarzy, poznasz punkt widzenia Azteków i zobaczysz, jak zmieniają się mapy świata, aż do Antwerpii.", "Vas a seguir a los marinos europeos, escuchar el punto de vista de los aztecas y ver cómo cambian los mapas del mundo, hasta Amberes.")],
    sequences: ["gd-partir", "gd-pour-qui", "gd-cartes"], bilan: "bilan-hist-decouvertes" });

  /* ---------- Séquences ---------- */
  P.sequences.push(
    { id: "gd-partir",
      titre: L("Pourquoi les Européens partent-ils sur les océans ?", "Чому європейці вирушають в океани?", "Dlaczego Europejczycy wypływają na oceany?", "¿Por qué los europeos se lanzan a los océanos?"),
      objectif: L("Je situe les voyages sur une frise et sur une carte, et je dis si un document est une trace ou une copie.", "Я розміщую подорожі на стрічці часу й на карті та кажу, чи документ — слід, чи копія.", "Umieszczam podróże na osi czasu i na mapie oraz mówię, czy dokument jest śladem, czy kopią.", "Sitúo los viajes en una línea del tiempo y en un mapa, y digo si un documento es una huella o una copia."),
      criteres: [
        crit("gd-frise", "Je range les grands voyages sur une frise.", "Я впорядковую великі подорожі на стрічці часу.", "Układam wielkie podróże na osi czasu.", "Ordeno los grandes viajes en una línea del tiempo."),
        crit("gd-carte", "Je situe le Portugal et l'Espagne, d'où partent les marins.", "Я знаходжу Португалію та Іспанію, звідки вирушають мореплавці.", "Znajduję Portugalię i Hiszpanię, skąd wypływają żeglarze.", "Localizo Portugal y España, de donde salen los marinos."),
        crit("gd-trace", "Je dis si un document vient de l'époque ou s'il a été fait plus tard.", "Я кажу, чи документ з тієї епохи, чи зроблений пізніше.", "Mówię, czy dokument pochodzi z epoki, czy powstał później.", "Digo si un documento viene de la época o se hizo más tarde.")
      ],
      etapes: [
        { type: "ressource", titre: L("Les épices, l'or et la mer", "Прянощі, золото й море", "Przyprawy, złoto i morze", "Las especias, el oro y el mar"),
          contenu: { textes: [
            L("Au 15e siècle, les Européens veulent des épices (poivre, cannelle…), de la soie et de l'or d'Asie et d'Afrique. Mais ces produits passent par beaucoup d'intermédiaires : ils coûtent très cher.", "У XV столітті європейці хочуть прянощів (перець, кориця…), шовку й золота з Азії та Африки. Але ці товари проходять через багатьох посередників і дуже дорогі.", "W XV wieku Europejczycy chcą przypraw (pieprz, cynamon…), jedwabiu i złota z Azji i Afryki. Ale te towary przechodzą przez wielu pośredników: są bardzo drogie.", "En el siglo XV, los europeos quieren especias (pimienta, canela…), seda y oro de Asia y África. Pero estos productos pasan por muchos intermediarios: cuestan muy caros."),
            L("Le Portugal et l'Espagne cherchent une route par la mer. Ils utilisent la caravelle, un bateau léger, la boussole et des cartes de plus en plus précises.", "Португалія та Іспанія шукають морський шлях. Вони використовують каравелу — легкий корабель, компас і дедалі точніші карти.", "Portugalia i Hiszpania szukają drogi morskiej. Używają karaweli, lekkiego statku, kompasu i coraz dokładniejszych map.", "Portugal y España buscan una ruta por mar. Usan la carabela, un barco ligero, la brújula y mapas cada vez más precisos."),
            L("1488 : Bartolomeu Dias passe le sud de l'Afrique. 1492 : Christophe Colomb arrive en Amérique. 1498 : Vasco de Gama arrive en Inde. 1519-1522 : l'expédition de Magellan fait le premier tour du monde.", "1488: Бартоломеу Діаш оминає південь Африки. 1492: Христофор Колумб припливає до Америки. 1498: Васко да Гама досягає Індії. 1519–1522: експедиція Магеллана здійснює першу навколосвітню подорож.", "1488: Bartolomeu Dias opływa południe Afryki. 1492: Krzysztof Kolumb dociera do Ameryki. 1498: Vasco da Gama dociera do Indii. 1519–1522: wyprawa Magellana odbywa pierwszą podróż dookoła świata.", "1488: Bartolomeu Dias pasa el sur de África. 1492: Cristóbal Colón llega a América. 1498: Vasco da Gama llega a la India. 1519-1522: la expedición de Magallanes da la primera vuelta al mundo.")
          ], docs: [DOC.caravelle, DOC.cantino, DOC.monde] } },
        { type: "activite", activite: "gd-act-partir" },
        { type: "minitest", test: "test-gd-partir" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Les Européens partent sur les océans pour les épices, l'or et le commerce.", "Європейці вирушають в океани заради прянощів, золота й торгівлі.", "Europejczycy wypływają na oceany po przyprawy, złoto i handel.", "Los europeos se lanzan a los océanos por las especias, el oro y el comercio."),
          L("1492 : Colomb en Amérique. 1498 : Vasco de Gama en Inde. 1519-1522 : premier tour du monde.", "1492: Колумб в Америці. 1498: Васко да Гама в Індії. 1519–1522: перша навколосвітня подорож.", "1492: Kolumb w Ameryce. 1498: Vasco da Gama w Indiach. 1519–1522: pierwsza podróż dookoła świata.", "1492: Colón en América. 1498: Vasco da Gama en la India. 1519-1522: primera vuelta al mundo."),
          L("Une copie moderne (la caravelle de Lagos) aide à imaginer, mais c'est un travail postérieur.", "Сучасна копія (каравела в Лагуші) допомагає уявити, але це пізніша праця.", "Nowoczesna kopia (karawela z Lagos) pomaga wyobrazić sobie przeszłość, ale to praca późniejsza.", "Una copia moderna (la carabela de Lagos) ayuda a imaginar, pero es un trabajo posterior.")
        ] } }
      ] },
    { id: "gd-pour-qui",
      titre: L("Une « découverte »… pour qui ?", "«Відкриття»… для кого?", "„Odkrycie”… dla kogo?", "¿Un «descubrimiento»… para quién?"),
      objectif: L("Je regarde l'arrivée des Européens du point de vue des peuples d'Amérique et je classe les échanges entre continents.", "Я дивлюся на прибуття європейців очима народів Америки й класифікую обміни між континентами.", "Patrzę na przybycie Europejczyków z punktu widzenia ludów Ameryki i klasyfikuję wymiany między kontynentami.", "Miro la llegada de los europeos desde el punto de vista de los pueblos de América y clasifico los intercambios entre continentes."),
      criteres: [
        crit("gd-point-de-vue", "Je raconte un événement d'un autre point de vue.", "Я розповідаю про подію з іншої точки зору.", "Opowiadam o wydarzeniu z innego punktu widzenia.", "Cuento un acontecimiento desde otro punto de vista."),
        crit("gd-echanges", "Je classe les produits échangés entre l'Amérique et le reste du monde.", "Я класифікую товари, якими обмінювалися Америка й решта світу.", "Klasyfikuję produkty wymieniane między Ameryką a resztą świata.", "Clasifico los productos intercambiados entre América y el resto del mundo."),
        crit("gd-codex", "Je dis qui a fait un document et ce que cela change.", "Я кажу, хто зробив документ і що це змінює.", "Mówię, kto zrobił dokument i co to zmienia.", "Digo quién hizo un documento y qué cambia eso.")
      ],
      etapes: [
        { type: "ressource", titre: L("L'Amérique n'était pas vide", "Америка не була порожньою", "Ameryka nie była pusta", "América no estaba vacía"),
          contenu: { textes: [
            L("Quand Colomb arrive dans les Caraïbes en 1492, des millions de personnes vivent déjà en Amérique : les Taïnos, les Aztèques, les Mayas, les Incas…", "Коли Колумб припливає до Карибів у 1492 році, в Америці вже живуть мільйони людей: таїно, ацтеки, майя, інки…", "Gdy Kolumb dociera na Karaiby w 1492 roku, w Ameryce żyją już miliony ludzi: Tainowie, Aztekowie, Majowie, Inkowie…", "Cuando Colón llega al Caribe en 1492, millones de personas viven ya en América: los taínos, los aztecas, los mayas, los incas…"),
            L("Les Espagnols conquièrent leurs empires. Les maladies venues d'Europe, comme la variole, tuent énormément d'habitants. Plus tard, des millions d'Africains sont réduits en esclavage et déportés en Amérique.", "Іспанці завойовують їхні імперії. Хвороби з Європи, як-от віспа, вбивають величезну кількість людей. Пізніше мільйони африканців поневолюють і вивозять до Америки.", "Hiszpanie podbijają ich imperia. Choroby z Europy, jak ospa, zabijają ogromną liczbę mieszkańców. Później miliony Afrykanów zostają zniewolone i wywiezione do Ameryki.", "Los españoles conquistan sus imperios. Las enfermedades venidas de Europa, como la viruela, matan a muchísimos habitantes. Más tarde, millones de africanos son esclavizados y deportados a América."),
            L("Les continents échangent aussi des plantes et des animaux : la tomate, la pomme de terre et le chocolat arrivent en Europe ; le cheval et le blé arrivent en Amérique.", "Континенти також обмінюються рослинами й тваринами: помідор, картопля й шоколад приходять до Європи; кінь і пшениця — до Америки.", "Kontynenty wymieniają się też roślinami i zwierzętami: pomidor, ziemniak i czekolada trafiają do Europy; koń i pszenica do Ameryki.", "Los continentes también intercambian plantas y animales: el tomate, la patata y el chocolate llegan a Europa; el caballo y el trigo llegan a América.")
          ], docs: [DOC.codex] } },
        { type: "activite", activite: "gd-act-pour-qui" },
        { type: "minitest", test: "test-gd-pour-qui" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("L'Amérique était habitée : pour ses peuples, c'est une invasion plus qu'une « découverte ».", "Америка була заселена: для її народів це радше вторгнення, ніж «відкриття».", "Ameryka była zamieszkana: dla jej ludów to raczej najazd niż „odkrycie”.", "América estaba habitada: para sus pueblos es más una invasión que un «descubrimiento»."),
          L("Les maladies européennes et la conquête font des millions de morts ; la traite déporte des millions d'Africains.", "Європейські хвороби й завоювання забирають мільйони життів; работоргівля вивозить мільйони африканців.", "Choroby europejskie i podbój powodują miliony ofiar; handel niewolnikami wywozi miliony Afrykanów.", "Las enfermedades europeas y la conquista causan millones de muertos; la trata deporta a millones de africanos."),
          L("Les continents échangent des plantes et des animaux (tomate, pomme de terre, cheval…).", "Континенти обмінюються рослинами й тваринами (помідор, картопля, кінь…).", "Kontynenty wymieniają się roślinami i zwierzętami (pomidor, ziemniak, koń…).", "Los continentes intercambian plantas y animales (tomate, patata, caballo…).")
        ] } }
      ] },
    { id: "gd-cartes",
      titre: L("Comment la carte du monde change-t-elle ?", "Як змінюється карта світу?", "Jak zmienia się mapa świata?", "¿Cómo cambia el mapa del mundo?"),
      objectif: L("Je compare des cartes anciennes, je repère une erreur et je cherche un savant né en Belgique.", "Я порівнюю старовинні карти, знаходжу помилку й шукаю вченого, народженого в Бельгії.", "Porównuję dawne mapy, znajduję błąd i szukam uczonego urodzonego w Belgii.", "Comparo mapas antiguos, encuentro un error y busco a un sabio nacido en Bélgica."),
      criteres: [
        crit("gd-ancienne", "Je repère des continents sur une carte ancienne.", "Я знаходжу континенти на старовинній карті.", "Znajduję kontynenty na dawnej mapie.", "Encuentro continentes en un mapa antiguo."),
        crit("gd-erreur", "Je repère une erreur sur une carte ancienne.", "Я знаходжу помилку на старовинній карті.", "Znajduję błąd na dawnej mapie.", "Encuentro un error en un mapa antiguo."),
        crit("gd-mercator", "Je trouve sur Internet une information sur Mercator.", "Я знаходжу в інтернеті інформацію про Меркатора.", "Znajduję w internecie informację o Merkatorze.", "Encuentro en Internet una información sobre Mercator.")
      ],
      etapes: [
        { type: "ressource", titre: L("Des cartes faites en Belgique", "Карти, зроблені в Бельгії", "Mapy zrobione w Belgii", "Mapas hechos en Bélgica"),
          contenu: { textes: [
            L("Après les voyages, les cartographes dessinent les nouvelles terres. En 1502, la carte de Cantino montre déjà une partie de l'Amérique et toute l'Afrique.", "Після подорожей картографи малюють нові землі. У 1502 році карта Кантіно вже показує частину Америки й усю Африку.", "Po podróżach kartografowie rysują nowe ziemie. W 1502 roku mapa Cantina pokazuje już część Ameryki i całą Afrykę.", "Después de los viajes, los cartógrafos dibujan las nuevas tierras. En 1502, el mapa de Cantino ya muestra una parte de América y toda África."),
            L("Au 16e siècle, Anvers est un grand port et une ville de cartographes. En 1570, Abraham Ortelius y publie le premier atlas moderne. Gérard Mercator, né en Flandre, invente une façon de dessiner le monde encore utilisée aujourd'hui.", "У XVI столітті Антверпен — великий порт і місто картографів. У 1570 році Авраам Ортелій видає там перший сучасний атлас. Герард Меркатор, народжений у Фландрії, винаходить спосіб малювати світ, яким користуються й досі.", "W XVI wieku Antwerpia to wielki port i miasto kartografów. W 1570 roku Abraham Ortelius wydaje tam pierwszy nowoczesny atlas. Gerard Merkator, urodzony we Flandrii, wymyśla sposób rysowania świata używany do dziś.", "En el siglo XVI, Amberes es un gran puerto y una ciudad de cartógrafos. En 1570, Abraham Ortelius publica allí el primer atlas moderno. Gerardo Mercator, nacido en Flandes, inventa una forma de dibujar el mundo que todavía se usa hoy."),
            L("Mais les cartes anciennes contiennent aussi des erreurs : on dessine parfois des terres qu'on imagine sans les avoir vues.", "Але старовинні карти містять і помилки: інколи малюють землі, які лише уявляють, не бачивши їх.", "Ale dawne mapy zawierają też błędy: czasem rysuje się ziemie, które się sobie wyobraża, nie widząc ich.", "Pero los mapas antiguos también tienen errores: a veces se dibujan tierras que se imaginan sin haberlas visto.")
          ], docs: [DOC.cantino, DOC.ortelius] } },
        { type: "activite", activite: "gd-act-cartes" },
        { type: "minitest", test: "test-gd-cartes" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Les voyages changent la carte du monde : l'Amérique apparaît.", "Подорожі змінюють карту світу: з'являється Америка.", "Podróże zmieniają mapę świata: pojawia się Ameryka.", "Los viajes cambian el mapa del mundo: aparece América."),
          L("Anvers est un centre de cartographie : Ortelius (atlas, 1570) ; Mercator est né en Flandre.", "Антверпен — центр картографії: Ортелій (атлас, 1570); Меркатор народився у Фландрії.", "Antwerpia to ośrodek kartografii: Ortelius (atlas, 1570); Merkator urodził się we Flandrii.", "Amberes es un centro de cartografía: Ortelius (atlas, 1570); Mercator nació en Flandes."),
          L("Une carte est un document : elle peut contenir des erreurs ou des terres imaginées.", "Карта — це документ: вона може містити помилки чи вигадані землі.", "Mapa to dokument: może zawierać błędy lub wyobrażone ziemie.", "Un mapa es un documento: puede contener errores o tierras imaginadas.")
        ] } }
      ] }
  );

  /* ---------- Activités ---------- */
  D.activites.push(
    { id: "gd-act-partir", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Carnet de bord", "Бортовий журнал", "Dziennik pokładowy", "Cuaderno de bitácora"),
      objectif: L("Je situe, je range et je calcule comme un navigateur.", "Я знаходжу, впорядковую й рахую, як мореплавець.", "Znajduję, układam i liczę jak żeglarz.", "Localizo, ordeno y calculo como un navegante."),
      etapes: [
        CARTE(L("Sur la carte du monde (document N°3), TOUCHE le repère d'où partent les marins : le Portugal et l'Espagne.", "На карті світу (документ №3) ТОРКНИСЯ позначки, звідки вирушають мореплавці: Португалія та Іспанія.", "Na mapie świata (dokument nr 3) DOTKNIJ znacznika, skąd wypływają żeglarze: Portugalia i Hiszpania.", "En el mapa del mundo (documento N.º 3), TOCA la marca de donde salen los marinos: Portugal y España."),
          MONDE, [pt("ib", 46, 24), pt("car", 27, 35), pt("in", 68, 40), pt("cn", 74, 30)], "ib",
          L("Oui ! La péninsule Ibérique, au sud-ouest de l'Europe, face à l'océan Atlantique.", "Так! Піренейський півострів, на південному заході Європи, біля Атлантичного океану.", "Tak! Półwysep Iberyjski, na południowym zachodzie Europy, nad Oceanem Atlantyckim.", "¡Sí! La península ibérica, al suroeste de Europa, frente al océano Atlántico."),
          L("Pas encore. Cherche l'Europe, puis son coin en bas à gauche, au bord de l'océan.", "Ще ні. Знайди Європу, потім її лівий нижній куток біля океану.", "Jeszcze nie. Znajdź Europę, potem jej lewy dolny róg nad oceanem.", "Todavía no. Busca Europa y luego su esquina de abajo a la izquierda, junto al océano."),
          [L("Ils partent vers l'ouest et vers le sud : il faut être au bord de l'Atlantique.", "Вони пливуть на захід і на південь: треба бути біля Атлантики.", "Płyną na zachód i na południe: trzeba być nad Atlantykiem.", "Salen hacia el oeste y el sur: hay que estar junto al Atlántico.")]),
        { type: "ordre", picto: null, verbe: "RANGE", debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("le plus récent", "найновіше", "najnowsze", "lo más reciente"),
          consigne: L("RANGE les grands voyages sur la frise. TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", "РОЗТАШУЙ великі подорожі на стрічці часу. ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", "UŁÓŻ wielkie podróże na osi czasu. DOTYKAJ kart po kolei: 1., potem 2.…", "ORDENA los grandes viajes en la línea del tiempo. TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…"),
          elements: [el("v1", "Dias passe le sud de l'Afrique (1488)", "Діаш оминає південь Африки (1488)", "Dias opływa południe Afryki (1488)", "Dias pasa el sur de África (1488)"),
            el("v2", "Colomb arrive en Amérique (1492)", "Колумб припливає до Америки (1492)", "Kolumb dociera do Ameryki (1492)", "Colón llega a América (1492)"),
            el("v3", "Vasco de Gama arrive en Inde (1498)", "Васко да Гама досягає Індії (1498)", "Vasco da Gama dociera do Indii (1498)", "Vasco da Gama llega a la India (1498)"),
            el("v4", "Carte de Cantino (1502)", "Карта Кантіно (1502)", "Mapa Cantina (1502)", "Mapa de Cantino (1502)"),
            el("v5", "Premier tour du monde (1519-1522)", "Перша навколосвітня подорож (1519–1522)", "Pierwsza podróż dookoła świata (1519–1522)", "Primera vuelta al mundo (1519-1522)")],
          bravo: L("Bravo ! En 35 ans, les Européens font le tour du globe.", "Молодець! За 35 років європейці обходять земну кулю.", "Brawo! W 35 lat Europejczycy opływają kulę ziemską.", "¡Bien! En 35 años, los europeos dan la vuelta al globo."),
          erreur: L("Pas encore. Range les dates de la plus petite à la plus grande.", "Ще ні. Упорядкуй дати від найменшої до найбільшої.", "Jeszcze nie. Ułóż daty od najmniejszej do największej.", "Todavía no. Ordena las fechas de la más pequeña a la más grande."),
          aides: [L("1488 est la plus ancienne.", "1488 — найдавніша.", "1488 jest najdawniejsza.", "1488 es la más antigua.")] },
        { type: "nombre", picto: null, verbe: "CALCULE", unite: "ans", reponse: 3,
          consigne: L("L'expédition de Magellan part en 1519 et revient en 1522. CALCULE : combien d'années dure le voyage ?", "Експедиція Магеллана вирушає в 1519 році й повертається в 1522. ПОРАХУЙ: скільки років триває подорож?", "Wyprawa Magellana wyrusza w 1519 roku i wraca w 1522. POLICZ: ile lat trwa podróż?", "La expedición de Magallanes sale en 1519 y vuelve en 1522. CALCULA: ¿cuántos años dura el viaje?"),
          bravo: L("Oui ! 3 ans en mer. Magellan lui-même meurt pendant le voyage.", "Так! 3 роки в морі. Сам Магеллан гине під час подорожі.", "Tak! 3 lata na morzu. Sam Magellan ginie w czasie podróży.", "¡Sí! 3 años en el mar. El propio Magallanes muere durante el viaje."),
          erreur: L("Pas encore. Fais 1522 − 1519.", "Ще ні. Зроби 1522 − 1519.", "Jeszcze nie. Zrób 1522 − 1519.", "Todavía no. Haz 1522 − 1519."),
          aides: [L("Grande date − petite date.", "Більша дата − менша дата.", "Większa data − mniejsza data.", "Fecha grande − fecha pequeña.")] },
        CLASSER(L("CLASSE les documents : de l'époque des voyages (trace) ou faits bien plus tard (travail postérieur) ?", "РОЗПОДІЛИ документи: з епохи подорожей (слід) чи зроблені набагато пізніше (пізніша праця)?", "PRZYPORZĄDKUJ dokumenty: z epoki podróży (ślad) czy zrobione dużo później (praca późniejsza)?", "CLASIFICA los documentos: ¿de la época de los viajes (huella) o hechos mucho más tarde (trabajo posterior)?"),
          [{ id: "trace", label: L("Trace du passé", "Слід минулого", "Ślad przeszłości", "Huella del pasado") }, { id: "post", label: L("Travail postérieur", "Пізніша праця", "Praca późniejsza", "Trabajo posterior") }],
          [el("car", "la caravelle Boa Esperança de Lagos (document N°1)", "каравела «Боа Есперанса» в Лагуші (документ №1)", "karawela Boa Esperança z Lagos (dokument nr 1)", "la carabela Boa Esperança de Lagos (documento N.º 1)", "post"),
           el("can", "la carte de Cantino de 1502 (document N°2)", "карта Кантіно 1502 року (документ №2)", "mapa Cantina z 1502 roku (dokument nr 2)", "el mapa de Cantino de 1502 (documento N.º 2)", "trace"),
           el("film", "un film d'aventure sur Christophe Colomb", "пригодницький фільм про Христофора Колумба", "film przygodowy o Krzysztofie Kolumbie", "una película de aventuras sobre Cristóbal Colón", "post"),
           el("jour", "le journal de bord écrit par un marin pendant le voyage", "бортовий журнал, написаний моряком під час подорожі", "dziennik pokładowy pisany przez marynarza w czasie podróży", "el diario de a bordo escrito por un marinero durante el viaje", "trace")],
          L("Bravo ! La caravelle de Lagos ressemble au passé, mais elle a été construite à notre époque.", "Молодець! Каравела в Лагуші схожа на минуле, але її збудовано в наш час.", "Brawo! Karawela z Lagos przypomina przeszłość, ale zbudowano ją w naszych czasach.", "¡Bien! La carabela de Lagos parece del pasado, pero se construyó en nuestra época."),
          L("Pas encore. Relis la légende du document N°1 : « une copie… construite à notre époque ».", "Ще ні. Перечитай підпис документа №1: «копія… збудована в наш час».", "Jeszcze nie. Przeczytaj podpis dokumentu nr 1: „kopia… zbudowana w naszych czasach”.", "Todavía no. Vuelve a leer la leyenda del documento N.º 1: «una copia… construida en nuestra época»."),
          [L("QUAND le document a-t-il été fait ?", "КОЛИ зроблено документ?", "KIEDY powstał dokument?", "¿CUÁNDO se hizo el documento?")]),
        AUTO("CHOISIS : est-ce que tu sais situer les grands voyages dans le temps et dans l'espace ?", "ВИБЕРИ: чи вмієш ти розмістити великі подорожі в часі й просторі?", "WYBIERZ: czy umiesz umieścić wielkie podróże w czasie i przestrzeni?", "ELIGE: ¿sabes situar los grandes viajes en el tiempo y en el espacio?")
      ] },

    { id: "gd-act-pour-qui", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("L'autre côté de l'histoire", "Інший бік історії", "Druga strona historii", "El otro lado de la historia"),
      objectif: L("Je change de point de vue et je classe les échanges.", "Я змінюю точку зору й класифікую обміни.", "Zmieniam punkt widzenia i klasyfikuję wymiany.", "Cambio de punto de vista y clasifico los intercambios."),
      etapes: [
        CARTE(L("Sur la carte du monde, TOUCHE le repère des Caraïbes, où Colomb arrive en 1492.", "На карті світу ТОРКНИСЯ позначки Карибів, куди Колумб припливає в 1492 році.", "Na mapie świata DOTKNIJ znacznika Karaibów, dokąd Kolumb dociera w 1492 roku.", "En el mapa del mundo, TOCA la marca del Caribe, adonde llega Colón en 1492."),
          MONDE, [pt("ib", 46, 24), pt("car", 27, 35), pt("afr", 55, 52), pt("in", 68, 40)], "car",
          L("Oui ! Les îles des Caraïbes, entre l'Amérique du Nord et l'Amérique du Sud. Colomb croit être arrivé en Inde !", "Так! Карибські острови, між Північною та Південною Америкою. Колумб думає, що припливув до Індії!", "Tak! Wyspy Karaibskie, między Ameryką Północną a Południową. Kolumb myśli, że dotarł do Indii!", "¡Sí! Las islas del Caribe, entre América del Norte y América del Sur. ¡Colón cree que ha llegado a la India!"),
          L("Pas encore. Traverse l'océan Atlantique vers l'ouest (à gauche).", "Ще ні. Перетни Атлантичний океан на захід (ліворуч).", "Jeszcze nie. Przepłyń Ocean Atlantycki na zachód (w lewo).", "Todavía no. Cruza el océano Atlántico hacia el oeste (a la izquierda)."),
          [L("Colomb navigue vers l'ouest.", "Колумб пливе на захід.", "Kolumb płynie na zachód.", "Colón navega hacia el oeste.")]),
        CLASSER(L("CLASSE : ce produit vient d'Amérique, ou il est arrivé EN Amérique avec les Européens ?", "РОЗПОДІЛИ: цей продукт походить з Америки чи прибув ДО Америки з європейцями?", "PRZYPORZĄDKUJ: ten produkt pochodzi z Ameryki czy przybył DO Ameryki z Europejczykami?", "CLASIFICA: ¿este producto viene de América o llegó A América con los europeos?"),
          [{ id: "am", label: L("Vient d'Amérique", "З Америки", "Z Ameryki", "Viene de América") }, { id: "vers", label: L("Arrive en Amérique", "Прибуває до Америки", "Przybywa do Ameryki", "Llega a América") }],
          [el("tom", "la tomate", "помідор", "pomidor", "el tomate", "am"), el("pdt", "la pomme de terre", "картопля", "ziemniak", "la patata", "am"), el("cho", "le chocolat (cacao)", "шоколад (какао)", "czekolada (kakao)", "el chocolate (cacao)", "am"), el("mais", "le maïs", "кукурудза", "kukurydza", "el maíz", "am"),
           el("che", "le cheval", "кінь", "koń", "el caballo", "vers"), el("ble", "le blé", "пшениця", "pszenica", "el trigo", "vers"), el("var", "la variole (une maladie)", "віспа (хвороба)", "ospa (choroba)", "la viruela (una enfermedad)", "vers")],
          L("Bravo ! Les frites belges et la pizza n'existeraient pas sans la pomme de terre et la tomate d'Amérique.", "Молодець! Бельгійської картоплі фрі й піци не було б без американських картоплі та помідора.", "Brawo! Belgijskich frytek i pizzy nie byłoby bez ziemniaka i pomidora z Ameryki.", "¡Bien! Las patatas fritas belgas y la pizza no existirían sin la patata y el tomate de América."),
          L("Pas encore. Relis la dernière phrase de la leçon.", "Ще ні. Перечитай останнє речення уроку.", "Jeszcze nie. Przeczytaj jeszcze raz ostatnie zdanie lekcji.", "Todavía no. Vuelve a leer la última frase de la lección."),
          [L("Avant 1492, il n'y avait pas de chevaux en Amérique.", "До 1492 року в Америці не було коней.", "Przed 1492 rokiem w Ameryce nie było koni.", "Antes de 1492 no había caballos en América.")]),
        CHOIX("CRITIQUE", L("CRITIQUE le document N°4 : il a été fait avec des auteurs nahuas (aztèques). Pourquoi est-ce précieux pour l'historien ?", "ПРОАНАЛІЗУЙ документ №4: його створено разом з авторами-науа (ацтеками). Чому це цінно для історика?", "PRZEANALIZUJ dokument nr 4: powstał z udziałem autorów Nahua (Azteków). Dlaczego to cenne dla historyka?", "ANALIZA el documento N.º 4: se hizo con autores nahuas (aztecas). ¿Por qué es valioso para el historiador?"),
          [opt("a", "Parce qu'il montre ce qu'ont vécu les vaincus, pas seulement les conquérants.", "Бо він показує, що пережили переможені, а не лише завойовники.", "Bo pokazuje, co przeżyli pokonani, a nie tylko zdobywcy.", "Porque muestra lo que vivieron los vencidos, no solo los conquistadores.", true), opt("b", "Parce qu'il est très coloré.", "Бо він дуже кольоровий.", "Bo jest bardzo kolorowy.", "Porque tiene muchos colores."), opt("c", "Parce qu'il a été fait en 2020.", "Бо його зроблено у 2020 році.", "Bo powstał w 2020 roku.", "Porque se hizo en 2020.")],
          L("Oui ! Mais attention : un moine espagnol dirigeait le travail. On garde un œil critique.", "Так! Але увага: роботою керував іспанський чернець. Зберігаємо критичний погляд.", "Tak! Ale uwaga: pracą kierował hiszpański mnich. Zachowujemy krytyczne spojrzenie.", "¡Sí! Pero cuidado: un monje español dirigía el trabajo. Mantenemos una mirada crítica."),
          L("Pas encore. Relis la légende : QUI a fait ce livre ?", "Ще ні. Перечитай підпис: ХТО зробив цю книжку?", "Jeszcze nie. Przeczytaj podpis: KTO zrobił tę księgę?", "Todavía no. Vuelve a leer la leyenda: ¿QUIÉN hizo este libro?"),
          [L("Souvent, ce sont les vainqueurs qui écrivent l'histoire.", "Часто історію пишуть переможці.", "Często historię piszą zwycięzcy.", "A menudo son los vencedores quienes escriben la historia.")]),
        ECRIRE("RACONTE", L("RACONTE l'arrivée des bateaux européens du point de vue d'un jeune Taïno ou Aztèque. Que vois-tu ? Que ressens-tu ?", "РОЗКАЖИ про прибуття європейських кораблів очима юного таїно чи ацтека. Що ти бачиш? Що відчуваєш?", "OPOWIEDZ o przybyciu europejskich statków z punktu widzenia młodego Taino lub Azteka. Co widzisz? Co czujesz?", "CUENTA la llegada de los barcos europeos desde el punto de vista de un joven taíno o azteca. ¿Qué ves? ¿Qué sientes?"),
          ["Un jour, je vois arriver", "Ces hommes ont", "J'ai peur parce que", "Je me demande"], "Un jour, je vois arriver sur la mer…",
          [L("Pense aux grands bateaux, aux chevaux (inconnus en Amérique), aux armes, aux maladies.", "Подумай про великі кораблі, коней (невідомих в Америці), зброю, хвороби.", "Pomyśl o wielkich statkach, koniach (nieznanych w Ameryce), broni, chorobach.", "Piensa en los grandes barcos, los caballos (desconocidos en América), las armas, las enfermedades.")]),
        AUTO("CHOISIS : est-ce que tu sais regarder un événement d'un autre point de vue ?", "ВИБЕРИ: чи вмієш ти подивитися на подію з іншої точки зору?", "WYBIERZ: czy umiesz spojrzeć na wydarzenie z innego punktu widzenia?", "ELIGE: ¿sabes mirar un acontecimiento desde otro punto de vista?")
      ] },

    { id: "gd-act-cartes", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Détective de cartes anciennes", "Детектив старовинних карт", "Detektyw dawnych map", "Detective de mapas antiguos"),
      objectif: L("Je lis une carte de 1570, je trouve son erreur et je cherche qui était Mercator.", "Я читаю карту 1570 року, знаходжу її помилку й шукаю, ким був Меркатор.", "Czytam mapę z 1570 roku, znajduję jej błąd i szukam, kim był Merkator.", "Leo un mapa de 1570, encuentro su error y busco quién era Mercator."),
      etapes: [
        CARTE(L("Sur la carte d'Ortelius de 1570 (document N°5), TOUCHE l'Amérique du Sud.", "На карті Ортелія 1570 року (документ №5) ТОРКНИСЯ Південної Америки.", "Na mapie Orteliusa z 1570 roku (dokument nr 5) DOTKNIJ Ameryki Południowej.", "En el mapa de Ortelius de 1570 (documento N.º 5), TOCA América del Sur."),
          ORTELIUS, PTS_ORTELIUS, "ams",
          L("Oui ! 70 ans après Colomb, sa forme est déjà assez juste.", "Так! Через 70 років після Колумба її форма вже досить точна.", "Tak! 70 lat po Kolumbie jej kształt jest już dość dokładny.", "¡Sí! 70 años después de Colón, su forma ya es bastante correcta."),
          L("Pas encore. Compare avec la carte d'aujourd'hui : l'Amérique du Sud est à gauche, sous l'équateur.", "Ще ні. Порівняй із сучасною картою: Південна Америка ліворуч, під екватором.", "Jeszcze nie. Porównaj z dzisiejszą mapą: Ameryka Południowa jest po lewej, pod równikiem.", "Todavía no. Compara con el mapa de hoy: América del Sur está a la izquierda, bajo el ecuador."),
          [L("Elle ressemble à un triangle, pointe vers le bas.", "Вона схожа на трикутник вершиною вниз.", "Przypomina trójkąt zwrócony wierzchołkiem w dół.", "Parece un triángulo con la punta hacia abajo.")]),
        CARTE(L("Cette carte contient une grande ERREUR : un continent immense qui n'existe pas comme ça. TOUCHE-le.", "Ця карта містить велику ПОМИЛКУ: величезний континент, якого насправді немає в такому вигляді. ТОРКНИСЯ його.", "Ta mapa zawiera duży BŁĄD: ogromny kontynent, który nie istnieje w takiej postaci. DOTKNIJ go.", "Este mapa tiene un gran ERROR: un continente inmenso que no existe así. TÓCALO."),
          ORTELIUS, PTS_ORTELIUS, "australe",
          L("Oui ! La « Terra Australis » : on l'a imaginée sans l'avoir vue. Sur la carte, Ortelius écrit même « pas encore connue ».", "Так! «Terra Australis» — її уявили, не бачивши. На карті Ортелій навіть пише «ще не відома».", "Tak! „Terra Australis”: wyobrażono ją sobie, nie widząc jej. Na mapie Ortelius pisze nawet „jeszcze nieznana”.", "¡Sí! La «Terra Australis»: se imaginó sin haberla visto. En el mapa, Ortelius incluso escribe «aún no conocida»."),
          L("Pas encore. Compare avec la carte d'aujourd'hui : quel continent est beaucoup trop grand en bas ?", "Ще ні. Порівняй із сучасною картою: який континент унизу занадто великий?", "Jeszcze nie. Porównaj z dzisiejszą mapą: który kontynent na dole jest o wiele za duży?", "Todavía no. Compara con el mapa de hoy: ¿qué continente es demasiado grande abajo?"),
          [L("Lis les lettres sur la bande du bas : « Terra Australis Nondum Cognita ».", "Прочитай літери на нижній смузі: «Terra Australis Nondum Cognita».", "Przeczytaj litery na dolnym pasie: „Terra Australis Nondum Cognita”.", "Lee las letras de la franja de abajo: «Terra Australis Nondum Cognita».")]),
        CHOIX("CHERCHE", L("RECHERCHE : tape « Gérard Mercator naissance » dans un moteur de recherche. CHERCHE : où Mercator est-il né ?", "ПОШУК: набери «Gérard Mercator naissance» у пошуковику. ЗНАЙДИ: де народився Меркатор?", "WYSZUKIWANIE: wpisz „Gérard Mercator naissance” w wyszukiwarce. ZNAJDŹ: gdzie urodził się Merkator?", "BÚSQUEDA: escribe «Gérard Mercator naissance» en un buscador. BUSCA: ¿dónde nació Mercator?"),
          [opt("a", "à Rupelmonde, en Flandre (Belgique)", "у Рюпелмонде, у Фландрії (Бельгія)", "w Rupelmonde, we Flandrii (Belgia)", "en Rupelmonde, en Flandes (Bélgica)", true), opt("b", "à Lisbonne, au Portugal", "у Лісабоні, в Португалії", "w Lizbonie, w Portugalii", "en Lisboa, en Portugal"), opt("c", "à Rome, en Italie", "у Римі, в Італії", "w Rzymie, we Włoszech", "en Roma, en Italia")],
          L("Oui ! Mercator est né en 1512 à Rupelmonde, près d'Anvers. Sa carte du monde de 1569 inspire encore les cartes de nos téléphones.", "Так! Меркатор народився в 1512 році в Рюпелмонде, біля Антверпена. Його карта світу 1569 року досі надихає карти в наших телефонах.", "Tak! Merkator urodził się w 1512 roku w Rupelmonde, niedaleko Antwerpii. Jego mapa świata z 1569 roku wciąż inspiruje mapy w naszych telefonach.", "¡Sí! Mercator nació en 1512 en Rupelmonde, cerca de Amberes. Su mapa del mundo de 1569 todavía inspira los mapas de nuestros teléfonos."),
          L("Pas encore. Cherche le nom d'une ville belge dans les résultats.", "Ще ні. Шукай назву бельгійського міста в результатах.", "Jeszcze nie. Szukaj nazwy belgijskiego miasta w wynikach.", "Todavía no. Busca el nombre de una ciudad belga en los resultados."),
          [L("La leçon dit qu'il est né en Flandre.", "В уроці сказано, що він народився у Фландрії.", "Lekcja mówi, że urodził się we Flandrii.", "La lección dice que nació en Flandes.")]),
        ECRIRE("COMPARE", L("COMPARE la carte de Cantino (1502) et celle d'Ortelius (1570). Qu'est-ce qui a changé en 70 ans ?", "ПОРІВНЯЙ карту Кантіно (1502) і карту Ортелія (1570). Що змінилося за 70 років?", "PORÓWNAJ mapę Cantina (1502) i mapę Orteliusa (1570). Co się zmieniło w ciągu 70 lat?", "COMPARA el mapa de Cantino (1502) y el de Ortelius (1570). ¿Qué ha cambiado en 70 años?"),
          ["En 1502, on voit", "En 1570, on voit en plus", "Cela a changé grâce aux voyages de"], "En 1502, on voit seulement une partie de l'Amérique. En 1570…",
          [L("Regarde surtout l'Amérique et l'océan Pacifique.", "Подивись насамперед на Америку й Тихий океан.", "Spójrz przede wszystkim na Amerykę i Ocean Spokojny.", "Mira sobre todo América y el océano Pacífico.")]),
        AUTO("CHOISIS : est-ce que tu sais lire et critiquer une carte ancienne ?", "ВИБЕРИ: чи вмієш ти читати й аналізувати старовинну карту?", "WYBIERZ: czy umiesz czytać i krytycznie oceniać dawną mapę?", "ELIGE: ¿sabes leer y analizar un mapa antiguo?")
      ] }
  );

  /* ---------- Mini-tests et test de fin ---------- */
  P.tests.push(
    { id: "test-gd-partir", titre: L("Mini-test : partir sur les océans", "Міні-тест: вирушити в океани", "Mini-test: wypłynąć na oceany", "Mini-prueba: lanzarse a los océanos"),
      questions: [
        Q("gd-frise", L("CHOISIS : Christophe Colomb arrive en Amérique en…", "ВИБЕРИ: Христофор Колумб припливає до Америки в…", "WYBIERZ: Krzysztof Kolumb dociera do Ameryki w…", "ELIGE: Cristóbal Colón llega a América en…"),
          [o("1066", "1066", "1066", "1066"), o("1492", "1492", "1492", "1492", true), o("1830", "1830", "1830", "1830")],
          L("12 octobre 1492, dans les Caraïbes.", "12 жовтня 1492 року, на Карибах.", "12 października 1492 roku, na Karaibach.", "12 de octubre de 1492, en el Caribe.")),
        Q("gd-carte", L("CHOISIS : quel pays envoie Vasco de Gama en Inde ?", "ВИБЕРИ: яка країна посилає Васко да Гаму до Індії?", "WYBIERZ: który kraj wysyła Vasco da Gamę do Indii?", "ELIGE: ¿qué país envía a Vasco da Gama a la India?"),
          [o("le Portugal", "Португалія", "Portugalia", "Portugal", true), o("la Belgique", "Бельгія", "Belgia", "Bélgica"), o("la Chine", "Китай", "Chiny", "China")],
          L("Le Portugal, au bord de l'Atlantique.", "Португалія, біля Атлантики.", "Portugalia, nad Atlantykiem.", "Portugal, junto al Atlántico.")),
        Q("gd-trace", L("CHOISIS : la caravelle de Lagos (2015) est…", "ВИБЕРИ: каравела в Лагуші (2015) — це…", "WYBIERZ: karawela z Lagos (2015) to…", "ELIGE: la carabela de Lagos (2015) es…"),
          [o("une trace du passé", "слід минулого", "ślad przeszłości", "una huella del pasado"), o("un travail postérieur", "пізніша праця", "praca późniejsza", "un trabajo posterior", true)],
          L("C'est une copie construite à notre époque.", "Це копія, збудована в наш час.", "To kopia zbudowana w naszych czasach.", "Es una copia construida en nuestra época."), DOC.caravelle)
      ] },
    { id: "test-gd-pour-qui", titre: L("Mini-test : une découverte pour qui ?", "Міні-тест: відкриття для кого?", "Mini-test: odkrycie dla kogo?", "Mini-prueba: ¿un descubrimiento para quién?"),
      questions: [
        Q("gd-point-de-vue", L("CHOISIS : en 1492, l'Amérique était…", "ВИБЕРИ: у 1492 році Америка була…", "WYBIERZ: w 1492 roku Ameryka była…", "ELIGE: en 1492, América estaba…"),
          [o("vide", "порожньою", "pusta", "vacía"), o("habitée par des millions de personnes", "заселена мільйонами людей", "zamieszkana przez miliony ludzi", "habitada por millones de personas", true), o("sous la mer", "під морем", "pod morzem", "bajo el mar")],
          L("Taïnos, Aztèques, Mayas, Incas… y vivaient déjà.", "Таїно, ацтеки, майя, інки… вже там жили.", "Tainowie, Aztekowie, Majowie, Inkowie… już tam żyli.", "Taínos, aztecas, mayas, incas… ya vivían allí.")),
        Q("gd-echanges", L("CHOISIS : quel produit vient d'Amérique ?", "ВИБЕРИ: який продукт походить з Америки?", "WYBIERZ: który produkt pochodzi z Ameryki?", "ELIGE: ¿qué producto viene de América?"),
          [o("le blé", "пшениця", "pszenica", "el trigo"), o("le cheval", "кінь", "koń", "el caballo"), o("la pomme de terre", "картопля", "ziemniak", "la patata", true)],
          L("La pomme de terre arrive d'Amérique en Europe.", "Картопля приходить з Америки до Європи.", "Ziemniak przybywa z Ameryki do Europy.", "La patata llega de América a Europa.")),
        Q("gd-codex", L("CHOISIS : le Codex de Florence montre surtout…", "ВИБЕРИ: Флорентійський кодекс показує передусім…", "WYBIERZ: Kodeks Florencki pokazuje głównie…", "ELIGE: el Códice Florentino muestra sobre todo…"),
          [o("des Nahuas malades de la variole", "науа, хворих на віспу", "Nahua chorych na ospę", "nahuas enfermos de viruela", true), o("une fête à Anvers", "свято в Антверпені", "święto w Antwerpii", "una fiesta en Amberes"), o("une caravelle", "каравелу", "karawelę", "una carabela")],
          L("La variole, venue d'Europe, a tué énormément d'habitants.", "Віспа, що прийшла з Європи, вбила величезну кількість людей.", "Ospa, przybyła z Europy, zabiła ogromną liczbę mieszkańców.", "La viruela, venida de Europa, mató a muchísimos habitantes."), DOC.codex)
      ] },
    { id: "test-gd-cartes", titre: L("Mini-test : les cartes changent", "Міні-тест: карти змінюються", "Mini-test: mapy się zmieniają", "Mini-prueba: los mapas cambian"),
      questions: [
        Q("gd-mercator", L("CHOISIS : Mercator est né…", "ВИБЕРИ: Меркатор народився…", "WYBIERZ: Merkator urodził się…", "ELIGE: Mercator nació…"),
          [o("en Flandre (Belgique)", "у Фландрії (Бельгія)", "we Flandrii (Belgia)", "en Flandes (Bélgica)", true), o("en Égypte", "в Єгипті", "w Egipcie", "en Egipto"), o("en Amérique", "в Америці", "w Ameryce", "en América")],
          L("À Rupelmonde, en 1512.", "У Рюпелмонде, у 1512 році.", "W Rupelmonde, w 1512 roku.", "En Rupelmonde, en 1512.")),
        Q("gd-erreur", L("CHOISIS : la « Terra Australis » de la carte de 1570 est…", "ВИБЕРИ: «Terra Australis» на карті 1570 року — це…", "WYBIERZ: „Terra Australis” na mapie z 1570 roku to…", "ELIGE: la «Terra Australis» del mapa de 1570 es…"),
          [o("une terre imaginée, pas encore vue", "уявна земля, ще не бачена", "wyobrażona ziemia, jeszcze nie widziana", "una tierra imaginada, aún no vista", true), o("la Belgique", "Бельгія", "Belgia", "Bélgica"), o("l'Amérique", "Америка", "Ameryka", "América")],
          L("Ortelius écrit lui-même qu'elle n'est « pas encore connue ».", "Ортелій сам пише, що вона «ще не відома».", "Ortelius sam pisze, że jest „jeszcze nieznana”.", "El propio Ortelius escribe que «aún no se conoce»."), DOC.ortelius),
        Q("gd-ancienne", L("CHOISIS : Ortelius publie son atlas à…", "ВИБЕРИ: Ортелій видає свій атлас у…", "WYBIERZ: Ortelius wydaje swój atlas w…", "ELIGE: Ortelius publica su atlas en…"),
          [o("Huy", "Юї", "Huy", "Huy"), o("Anvers", "Антверпені", "Antwerpii", "Amberes", true), o("Lisbonne", "Лісабоні", "Lizbonie", "Lisboa")],
          L("Anvers, grand port et ville de cartographes au 16e siècle.", "Антверпен — великий порт і місто картографів у XVI столітті.", "Antwerpia, wielki port i miasto kartografów w XVI wieku.", "Amberes, gran puerto y ciudad de cartógrafos en el siglo XVI."))
      ] },
    { id: "bilan-hist-decouvertes", titre: L("Test de fin : les Grandes découvertes", "Підсумковий тест: Великі географічні відкриття", "Test końcowy: wielkie odkrycia geograficzne", "Prueba final: los grandes descubrimientos"),
      questions: [
        Q("gd-frise", L("CHOISIS l'ordre juste.", "ВИБЕРИ правильний порядок.", "WYBIERZ dobrą kolejność.", "ELIGE el orden correcto."),
          [o("Colomb (1492) → Vasco de Gama (1498) → tour du monde (1519-1522)", "Колумб (1492) → Васко да Гама (1498) → навколосвітня подорож (1519–1522)", "Kolumb (1492) → Vasco da Gama (1498) → podróż dookoła świata (1519–1522)", "Colón (1492) → Vasco da Gama (1498) → vuelta al mundo (1519-1522)", true),
           o("tour du monde (1519-1522) → Colomb (1492) → Vasco de Gama (1498)", "навколосвітня подорож (1519–1522) → Колумб (1492) → Васко да Гама (1498)", "podróż dookoła świata (1519–1522) → Kolumb (1492) → Vasco da Gama (1498)", "vuelta al mundo (1519-1522) → Colón (1492) → Vasco da Gama (1498)"),
           o("Vasco de Gama (1498) → Colomb (1492) → tour du monde (1519-1522)", "Васко да Гама (1498) → Колумб (1492) → навколосвітня подорож (1519–1522)", "Vasco da Gama (1498) → Kolumb (1492) → podróż dookoła świata (1519–1522)", "Vasco da Gama (1498) → Colón (1492) → vuelta al mundo (1519-1522)")],
          L("De la plus petite date à la plus grande.", "Від найменшої дати до найбільшої.", "Od najmniejszej daty do największej.", "De la fecha más pequeña a la más grande.")),
        Q("gd-carte", L("CHOISIS : pourquoi les Européens cherchent-ils une route par la mer ?", "ВИБЕРИ: чому європейці шукають морський шлях?", "WYBIERZ: dlaczego Europejczycy szukają drogi morskiej?", "ELIGE: ¿por qué los europeos buscan una ruta por mar?"),
          [o("pour faire des vacances", "щоб відпочити", "żeby pojechać na wakacje", "para irse de vacaciones"), o("pour avoir les épices et l'or moins cher", "щоб мати прянощі й золото дешевше", "żeby mieć tańsze przyprawy i złoto", "para tener las especias y el oro más baratos", true), o("pour fuir la neige", "щоб утекти від снігу", "żeby uciec przed śniegiem", "para huir de la nieve")],
          L("Sans intermédiaires, le commerce rapporte plus.", "Без посередників торгівля приносить більше.", "Bez pośredników handel przynosi więcej.", "Sin intermediarios, el comercio da más beneficios.")),
        Q("gd-point-de-vue", L("CHOISIS : pour les peuples d'Amérique, l'arrivée des Européens est surtout…", "ВИБЕРИ: для народів Америки прибуття європейців — це передусім…", "WYBIERZ: dla ludów Ameryki przybycie Europejczyków to przede wszystkim…", "ELIGE: para los pueblos de América, la llegada de los europeos es sobre todo…"),
          [o("une conquête et des maladies", "завоювання та хвороби", "podbój i choroby", "una conquista y enfermedades", true), o("une fête", "свято", "święto", "una fiesta"), o("une découverte de l'Europe", "відкриття Європи", "odkrycie Europy", "un descubrimiento de Europa")],
          L("C'est le même événement, mais vu d'un autre côté.", "Це та сама подія, але побачена з іншого боку.", "To samo wydarzenie, ale widziane z drugiej strony.", "Es el mismo acontecimiento, pero visto desde el otro lado.")),
        Q("gd-echanges", L("CHOISIS : quel animal arrive en Amérique avec les Européens ?", "ВИБЕРИ: яка тварина прибуває до Америки з європейцями?", "WYBIERZ: jakie zwierzę przybywa do Ameryki z Europejczykami?", "ELIGE: ¿qué animal llega a América con los europeos?"),
          [o("le cheval", "кінь", "koń", "el caballo", true), o("le lama", "лама", "lama", "la llama"), o("le dindon", "індик", "indyk", "el pavo")],
          L("Il n'y avait pas de chevaux en Amérique avant 1492.", "До 1492 року в Америці не було коней.", "Przed 1492 rokiem w Ameryce nie było koni.", "No había caballos en América antes de 1492.")),
        Q("gd-codex", L("CHOISIS : pourquoi faut-il garder un œil critique sur le Codex de Florence ?", "ВИБЕРИ: чому треба критично ставитися до Флорентійського кодексу?", "WYBIERZ: dlaczego trzeba krytycznie patrzeć na Kodeks Florencki?", "ELIGE: ¿por qué hay que mirar con ojo crítico el Códice Florentino?"),
          [o("Il est trop vieux pour être lu.", "Він занадто старий, щоб його читати.", "Jest za stary, by go czytać.", "Es demasiado viejo para leerlo."), o("Un moine espagnol dirigeait le travail.", "Роботою керував іспанський чернець.", "Pracą kierował hiszpański mnich.", "Un monje español dirigía el trabajo.", true), o("Il est en couleur.", "Він кольоровий.", "Jest w kolorze.", "Está en color.")],
          L("Même un document précieux a un auteur à interroger.", "Навіть цінний документ має автора, про якого треба питати.", "Nawet cenny dokument ma autora, którego trzeba przepytać.", "Incluso un documento valioso tiene un autor al que hay que interrogar.")),
        Q("gd-erreur", L("CHOISIS : une carte ancienne…", "ВИБЕРИ: старовинна карта…", "WYBIERZ: dawna mapa…", "ELIGE: un mapa antiguo…"),
          [o("est toujours parfaitement exacte", "завжди абсолютно точна", "jest zawsze idealnie dokładna", "siempre es perfectamente exacto"), o("peut contenir des erreurs : c'est un document à critiquer", "може містити помилки: це документ, який треба аналізувати", "może zawierać błędy: to dokument do krytycznej oceny", "puede contener errores: es un documento que hay que analizar", true)],
          L("Comme la Terra Australis d'Ortelius.", "Як Terra Australis Ортелія.", "Jak Terra Australis Orteliusa.", "Como la Terra Australis de Ortelius.")),
        Q("gd-mercator", L("CHOISIS : au 16e siècle, quelle ville belge est un grand centre des cartes ?", "ВИБЕРИ: яке бельгійське місто в XVI столітті — великий центр картографії?", "WYBIERZ: które belgijskie miasto w XVI wieku jest wielkim ośrodkiem kartografii?", "ELIGE: en el siglo XVI, ¿qué ciudad belga es un gran centro de mapas?"),
          [o("Anvers", "Антверпен", "Antwerpia", "Amberes", true), o("Arlon", "Арлон", "Arlon", "Arlon"), o("Ostende", "Остенде", "Ostenda", "Ostende")],
          L("Anvers : Ortelius y publie son atlas en 1570.", "Антверпен: Ортелій видає там свій атлас у 1570 році.", "Antwerpia: Ortelius wydaje tam swój atlas w 1570 roku.", "Amberes: Ortelius publica allí su atlas en 1570."))
      ] }
  );
})();
