/* Histoire, module 3 : les Romains chez nous (± 3 h, 3 séquences + test de fin). Verrou : test des rappels.
   Nouveauté : RECHERCHES SUR INTERNET guidées (lien sûr ou mots-clés à taper), avec savoir-faire de recherche :
   choisir ses mots-clés, juger un site, relever l'info, citer sa source. Toujours des traces réelles légendées.
   Documents numérotés 1 à 6 sur tout le module. rn (kirundi) = null tant que pas relu. */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/histoire/";
  const UE = "img/prerequis/ue-27.png", BELGIQUE = "img/belgique/regions-aujourdhui.jpg";
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
  const LIEN_AMBIORIX = { url: "https://fr.vikidia.org/wiki/Ambiorix", site: "fr.vikidia.org (encyclopédie pour les jeunes)", label: L("Ouvrir la page « Ambiorix » sur Vikidia", "Відкрити сторінку «Ambiorix» на Vikidia", "Otwórz stronę „Ambiorix” na Vikidii", "Abrir la página «Ambiorix» en Vikidia") };
  const LIEN_TONGRES = { url: "https://fr.wikipedia.org/wiki/Tongres", site: "fr.wikipedia.org (encyclopédie)", label: L("Ouvrir la page « Tongres » sur Wikipédia", "Відкрити сторінку «Tongres» у Вікіпедії", "Otwórz stronę „Tongres” w Wikipedii", "Abrir la página «Tongres» en Wikipedia") };

  /* ---------- Documents (1 à 6) ---------- */
  const DOC = {
    ue: { n: 1, src: UE,
      legende: L("Carte de l'Union européenne aujourd'hui. Le point jaune montre la Belgique.", "Карта Європейського Союзу сьогодні. Жовта крапка — Бельгія.", "Mapa Unii Europejskiej dzisiaj. Żółta kropka to Belgia.", "Mapa de la Unión Europea hoy. El punto amarillo es Bélgica."),
      credit: "Réalisé par T.Marlair sur base de la carte de Kolja21 (Wikimedia Commons, CC BY 3.0)" },
    ambiorix: { n: 3, src: IMG + "rom-ambiorix.jpg",
      legende: L("Photographie de la statue d'Ambiorix, chef des Éburons, réalisée par le sculpteur Jules Bertin et installée en 1866 sur la Grand-Place de Tongres.",
        "Фотографія статуї Амбіорікса, вождя ебуронів, створеної скульптором Жулем Бертеном і встановленої в 1866 році на Великій площі Тонгерена.",
        "Zdjęcie pomnika Ambioryksa, wodza Eburonów, wykonanego przez rzeźbiarza Jules'a Bertina i ustawionego w 1866 roku na Rynku w Tongeren.",
        "Fotografía de la estatua de Ambiórix, jefe de los eburones, hecha por el escultor Jules Bertin e instalada en 1866 en la Plaza Mayor de Tongeren."),
      credit: "Photo : Ad Meskens, 2012 (Wikimedia Commons, CC BY-SA 3.0)" },
    muraille: { n: 4, src: IMG + "rom-muraille.jpg",
      legende: L("Photographie de vestiges de la muraille romaine qui entourait la ville de Tongres (Atuatuca Tungrorum).", "Фотографія залишків римського муру, що оточував місто Тонгерен (Атуатука Тунгрорум).", "Zdjęcie pozostałości rzymskiego muru, który otaczał miasto Tongeren (Atuatuca Tungrorum).", "Fotografía de restos de la muralla romana que rodeaba la ciudad de Tongeren (Atuatuca Tungrorum)."),
      credit: "Photo : Romaine, 2011 (Wikimedia Commons, CC0)" },
    sesterce: { n: 5, src: IMG + "rom-monnaie.jpg",
      legende: L("Photographie des deux faces d'un sesterce, une pièce de monnaie romaine en laiton frappée sous l'empereur Hadrien (117-138). Diamètre : 32 mm.",
        "Фотографія двох боків сестерція — римської латунної монети часів імператора Адріана (117–138). Діаметр: 32 мм.",
        "Zdjęcie obu stron sesterca, rzymskiej monety z mosiądzu wybitej za cesarza Hadriana (117–138). Średnica: 32 mm.",
        "Fotografía de las dos caras de un sestercio, una moneda romana de latón acuñada bajo el emperador Adriano (117-138). Diámetro: 32 mm."),
      credit: "Photo : Jebulon (Wikimedia Commons, CC0)" },
    belgique: { n: 6, src: BELGIQUE,
      legende: L("Carte de la Belgique avec Huy et Liège, au bord de la Meuse.", "Карта Бельгії з Юї та Льєжем на березі Маасу.", "Mapa Belgii z Huy i Liège nad Mozą.", "Mapa de Bélgica con Huy y Lieja, a orillas del Mosa."),
      credit: "Réalisé par T.Marlair sur base de la carte de Jules Rohault (Wikimedia Commons, CC BY-SA 4.0)" }
  };
  // Document N°2 = texte de César, affiché comme texte dans la ressource.
  const CESAR = L("Document N°2 : Extrait de « La Guerre des Gaules », écrit par Jules César, général romain, vers − 50. Texte adapté par T.Marlair. — « Toute la Gaule est divisée en trois parties. Les Belges habitent l'une d'elles. De tous ces peuples, les Belges sont les plus braves, parce qu'ils sont les plus loin de la province romaine et que les marchands viennent rarement chez eux. »",
    "Документ №2: Уривок із «Записок про Галльську війну» Юлія Цезаря, римського полководця, близько − 50. Текст адаптовано. — «Уся Галлія поділена на три частини. Белги живуть в одній із них. З усіх цих народів белги найхоробріші, бо вони найдалі від римської провінції, і купці рідко до них приходять.»",
    "Dokument nr 2: Fragment „Wojny galijskiej”, napisanej przez Juliusza Cezara, rzymskiego wodza, około − 50. Tekst uproszczony. — „Cała Galia dzieli się na trzy części. Belgowie zamieszkują jedną z nich. Ze wszystkich tych ludów Belgowie są najdzielniejsi, bo mieszkają najdalej od prowincji rzymskiej i kupcy rzadko do nich przychodzą.”",
    "Documento N.º 2: Fragmento de «La guerra de las Galias», escrito por Julio César, general romano, hacia − 50. Texto adaptado. — «Toda la Galia está dividida en tres partes. Los belgas habitan una de ellas. De todos estos pueblos, los belgas son los más valientes, porque están más lejos de la provincia romana y los mercaderes rara vez van a su tierra.»");

  /* ---------- Chapitre : après « Compter, écrire, mesurer » ---------- */
  const iAv = P.chapitres.findIndex(c => c.id === "hist-ecriture");
  P.chapitres.splice(iAv + 1, 0, { id: "hist-romains", discipline: "histoire", verrou: { test: "bilan-pr-histoire", min: 0.5 },
    titre: L("3. Les Romains chez nous", "3. Римляни в наших краях", "3. Rzymianie u nas", "3. Los romanos en nuestra tierra"),
    dejaVu: [L("Tu vas faire de vraies recherches sur Internet, comme un historien, et travailler sur des traces romaines de Tongres et de Liège.", "Ти робитимеш справжні пошуки в інтернеті, як історик, і працюватимеш із римськими слідами з Тонгерена та Льєжа.", "Będziesz prowadzić prawdziwe poszukiwania w internecie, jak historyk, i pracować na rzymskich śladach z Tongeren i Liège.", "Vas a hacer búsquedas reales en Internet, como un historiador, y a trabajar con huellas romanas de Tongeren y Lieja.")],
    sequences: ["rom-conquete", "rom-tongres", "rom-chez-nous"], bilan: "bilan-hist-romains" });

  /* ---------- Séquences ---------- */
  P.sequences.push(
    { id: "rom-conquete",
      titre: L("Comment les Romains arrivent-ils chez nous ?", "Як римляни приходять у наші краї?", "Jak Rzymianie docierają do nas?", "¿Cómo llegan los romanos a nuestra tierra?"),
      objectif: L("Je situe Rome et nos régions, je cherche des informations sur Ambiorix et je critique deux documents.", "Я знаходжу Рим і наші краї, шукаю інформацію про Амбіорікса й аналізую два документи.", "Znajduję Rzym i nasze okolice, szukam informacji o Ambioryksie i analizuję dwa dokumenty.", "Localizo Roma y nuestras regiones, busco información sobre Ambiórix y analizo dos documentos."),
      criteres: [
        crit("rom-carte", "Je situe Rome et calcule la distance jusqu'à chez nous.", "Я знаходжу Рим і обчислюю відстань до нас.", "Znajduję Rzym i obliczam odległość do nas.", "Localizo Roma y calculo la distancia hasta aquí."),
        crit("rom-recherche", "Je trouve une information sur un site Internet.", "Я знаходжу інформацію на сайті.", "Znajduję informację na stronie internetowej.", "Encuentro una información en un sitio web."),
        crit("rom-critique", "Je dis qui est l'auteur d'un document et s'il peut être partial.", "Я кажу, хто автор документа і чи може він бути упередженим.", "Mówię, kto jest autorem dokumentu i czy może być stronniczy.", "Digo quién es el autor de un documento y si puede ser parcial.")
      ],
      etapes: [
        { type: "ressource", titre: L("César contre les Belges", "Цезар проти белгів", "Cezar przeciw Belgom", "César contra los belgas"),
          contenu: { textes: [
            L("Entre − 58 et − 51, le général romain Jules César conquiert la Gaule : la France, la Belgique et une partie de l'Allemagne d'aujourd'hui.", "Між − 58 і − 51 римський полководець Юлій Цезар завойовує Галлію: сьогоднішні Францію, Бельгію та частину Німеччини.", "Między − 58 a − 51 rzymski wódz Juliusz Cezar podbija Galię: dzisiejszą Francję, Belgię i część Niemiec.", "Entre − 58 y − 51, el general romano Julio César conquista la Galia: la Francia, la Bélgica y parte de la Alemania de hoy."),
            L("Chez nous vivent des peuples gaulois, comme les Éburons, entre la Meuse et le Rhin. En − 54, leur chef Ambiorix se révolte et bat une partie de l'armée romaine. César se venge durement.", "У наших краях живуть галльські народи, як-от ебурони, між Маасом і Рейном. У − 54 їхній вождь Амбіорікс повстає й розбиває частину римського війська. Цезар жорстоко мститься.", "U nas żyją ludy galijskie, jak Eburonowie, między Mozą a Renem. W − 54 ich wódz Ambioryks buntuje się i pokonuje część armii rzymskiej. Cezar okrutnie się mści.", "En nuestra tierra viven pueblos galos, como los eburones, entre el Mosa y el Rin. En − 54, su jefe Ambiórix se rebela y vence a una parte del ejército romano. César se venga con dureza."),
            CESAR
          ], docs: [DOC.ue, DOC.ambiorix] } },
        { type: "activite", activite: "rom-act-conquete" },
        { type: "minitest", test: "test-rom-conquete" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("De − 58 à − 51, Jules César conquiert la Gaule, avec nos régions.", "Від − 58 до − 51 Юлій Цезар завойовує Галлію разом із нашими краями.", "Od − 58 do − 51 Juliusz Cezar podbija Galię, razem z naszymi okolicami.", "De − 58 a − 51, Julio César conquista la Galia, con nuestras regiones."),
          L("En − 54, Ambiorix, chef des Éburons, se révolte contre les Romains.", "У − 54 Амбіорікс, вождь ебуронів, повстає проти римлян.", "W − 54 Ambioryks, wódz Eburonów, buntuje się przeciw Rzymianom.", "En − 54, Ambiórix, jefe de los eburones, se rebela contra los romanos."),
          L("César est un témoin, mais aussi l'ennemi des Belges : son texte peut être partial. La statue de 1866 est un travail postérieur.", "Цезар — свідок, але й ворог белгів: його текст може бути упередженим. Статуя 1866 року — пізніша праця.", "Cezar jest świadkiem, ale też wrogiem Belgów: jego tekst może być stronniczy. Pomnik z 1866 roku to praca późniejsza.", "César es un testigo, pero también el enemigo de los belgas: su texto puede ser parcial. La estatua de 1866 es un trabajo posterior.")
        ] } }
      ] },
    { id: "rom-tongres",
      titre: L("À quoi ressemble une ville romaine chez nous ?", "Яким було римське місто в наших краях?", "Jak wyglądało rzymskie miasto u nas?", "¿Cómo es una ciudad romana en nuestra tierra?"),
      objectif: L("J'observe des traces romaines de Tongres et je cherche ce qui reste des Romains aujourd'hui.", "Я розглядаю римські сліди з Тонгерена й шукаю, що залишилося від римлян сьогодні.", "Oglądam rzymskie ślady z Tongeren i szukam, co zostało po Rzymianach dzisiaj.", "Observo huellas romanas de Tongeren y busco lo que queda de los romanos hoy."),
      criteres: [
        crit("rom-trace", "Je lis une pièce de monnaie romaine.", "Я читаю римську монету.", "Odczytuję rzymską monetę.", "Leo una moneda romana."),
        crit("rom-recherche2", "Je cherche une information et je cite ma source.", "Я шукаю інформацію й називаю джерело.", "Szukam informacji i podaję źródło.", "Busco una información y cito mi fuente."),
        crit("rom-continuite", "Je dis ce qui a changé et ce qui continue depuis les Romains.", "Я кажу, що змінилося, а що триває від римлян.", "Mówię, co się zmieniło, a co trwa od czasów Rzymian.", "Digo lo que ha cambiado y lo que continúa desde los romanos.")
      ],
      etapes: [
        { type: "ressource", titre: L("Tongres, la plus vieille ville de Belgique", "Тонгерен — найстаріше місто Бельгії", "Tongeren, najstarsze miasto Belgii", "Tongeren, la ciudad más antigua de Bélgica"),
          contenu: { textes: [
            L("Vers − 10, les Romains installent un camp militaire à Tongres. Il devient une ville : Atuatuca Tungrorum. C'est la plus vieille ville de Belgique.", "Близько − 10 римляни ставлять військовий табір у Тонгерені. Він стає містом: Атуатука Тунгрорум. Це найстаріше місто Бельгії.", "Około − 10 Rzymianie zakładają obóz wojskowy w Tongeren. Staje się miastem: Atuatuca Tungrorum. To najstarsze miasto Belgii.", "Hacia − 10, los romanos instalan un campamento militar en Tongeren. Se convierte en ciudad: Atuatuca Tungrorum. Es la ciudad más antigua de Bélgica."),
            L("Les Romains construisent des routes en pierre, des murailles, des temples et des bains publics (les thermes). On paie avec des pièces romaines et on parle latin.", "Римляни будують кам'яні дороги, мури, храми й громадські лазні (терми). Платять римськими монетами й говорять латиною.", "Rzymianie budują kamienne drogi, mury, świątynie i łaźnie publiczne (termy). Płaci się rzymskimi monetami i mówi po łacinie.", "Los romanos construyen caminos de piedra, murallas, templos y baños públicos (las termas). Se paga con monedas romanas y se habla latín."),
            L("Le français vient du latin. Le mois de juillet porte le nom de Jules César.", "Французька мова походить від латини. Липень французькою (juillet) названо на честь Юлія Цезаря.", "Francuski pochodzi od łaciny. Lipiec po francusku (juillet) nosi imię Juliusza Cezara.", "El francés viene del latín. El mes de julio lleva el nombre de Julio César.")
          ], docs: [DOC.muraille, DOC.sesterce] } },
        { type: "activite", activite: "rom-act-tongres" },
        { type: "minitest", test: "test-rom-tongres" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Tongres (Atuatuca Tungrorum), fondée vers − 10, est la plus vieille ville de Belgique.", "Тонгерен (Атуатука Тунгрорум), заснований близько − 10, — найстаріше місто Бельгії.", "Tongeren (Atuatuca Tungrorum), założone około − 10, jest najstarszym miastem Belgii.", "Tongeren (Atuatuca Tungrorum), fundada hacia − 10, es la ciudad más antigua de Bélgica."),
          L("Les Romains apportent des routes, des villes en pierre, la monnaie et le latin.", "Римляни приносять дороги, кам'яні міста, гроші й латину.", "Rzymianie przynoszą drogi, kamienne miasta, pieniądze i łacinę.", "Los romanos traen caminos, ciudades de piedra, la moneda y el latín."),
          L("Quand je fais une recherche, je note toujours le site où j'ai trouvé l'information.", "Коли я шукаю, я завжди записую сайт, де знайшов(-ла) інформацію.", "Gdy szukam, zawsze zapisuję stronę, na której znalazłem/znalazłam informację.", "Cuando busco, siempre anoto el sitio donde encontré la información.")
        ] } }
      ] },
    { id: "rom-chez-nous",
      titre: L("Les Romains près de Huy et de Liège : comment le savoir ?", "Римляни біля Юї та Льєжа: як про це дізнатися?", "Rzymianie niedaleko Huy i Liège: jak to sprawdzić?", "Los romanos cerca de Huy y Lieja: ¿cómo saberlo?"),
      objectif: L("Je mène une petite enquête sur Internet, je juge les sites et je range l'époque romaine sur la frise.", "Я проводжу невелике розслідування в інтернеті, оцінюю сайти й розміщую римську епоху на стрічці часу.", "Prowadzę małe śledztwo w internecie, oceniam strony i układam epokę rzymską na osi czasu.", "Hago una pequeña investigación en Internet, juzgo los sitios y ordeno la época romana en la línea del tiempo."),
      criteres: [
        crit("rom-motscles", "Je choisis de bons mots-clés pour une recherche.", "Я обираю добрі ключові слова для пошуку.", "Wybieram dobre słowa kluczowe do wyszukiwania.", "Elijo buenas palabras clave para una búsqueda."),
        crit("rom-fiable", "Je dis si un site est fiable ou s'il faut vérifier.", "Я кажу, чи сайт надійний, чи треба перевірити.", "Mówię, czy strona jest wiarygodna, czy trzeba sprawdzić.", "Digo si un sitio es fiable o si hay que comprobar."),
        crit("rom-frise", "Je range l'époque romaine sur une frise.", "Я розміщую римську епоху на стрічці часу.", "Układam epokę rzymską na osi czasu.", "Ordeno la época romana en una línea del tiempo.")
      ],
      etapes: [
        { type: "ressource", titre: L("Méthode : bien chercher sur Internet", "Метод: добре шукати в інтернеті", "Metoda: dobrze szukać w internecie", "Método: buscar bien en Internet"),
          contenu: { liste: [
            L("1. Je choisis 2 ou 3 mots-clés précis (ex. : « villa romaine Liège »), pas une longue phrase.", "1. Я обираю 2–3 точні ключові слова (напр.: «villa romaine Liège»), а не довге речення.", "1. Wybieram 2–3 dokładne słowa kluczowe (np. „villa romaine Liège”), a nie długie zdanie.", "1. Elijo 2 o 3 palabras clave precisas (ej.: «villa romaine Liège»), no una frase larga."),
            L("2. Je regarde QUI a fait le site : un musée, une ville, une encyclopédie ? Ou une personne inconnue ?", "2. Я дивлюся, ХТО зробив сайт: музей, місто, енциклопедія? Чи невідома людина?", "2. Sprawdzam, KTO zrobił stronę: muzeum, miasto, encyklopedia? Czy nieznana osoba?", "2. Miro QUIÉN hizo el sitio: ¿un museo, una ciudad, una enciclopedia? ¿O una persona desconocida?"),
            L("3. Je vérifie l'information sur un deuxième site.", "3. Я перевіряю інформацію на другому сайті.", "3. Sprawdzam informację na drugiej stronie.", "3. Compruebo la información en un segundo sitio."),
            L("4. J'écris d'où vient l'information (le nom du site).", "4. Я записую, звідки інформація (назву сайту).", "4. Zapisuję, skąd pochodzi informacja (nazwę strony).", "4. Escribo de dónde viene la información (el nombre del sitio).")
          ], docs: [DOC.belgique] } },
        { type: "activite", activite: "rom-act-chez-nous" },
        { type: "minitest", test: "test-rom-chez-nous" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Sous la place Saint-Lambert, à Liège, on a trouvé une villa gallo-romaine (Archéoforum).", "Під площею Сен-Ламбер у Льєжі знайшли галло-римську віллу (Археофорум).", "Pod placem Saint-Lambert w Liège znaleziono willę galijsko-rzymską (Archéoforum).", "Bajo la plaza Saint-Lambert, en Lieja, se encontró una villa galorromana (Archéoforum)."),
          L("Une bonne recherche : des mots-clés précis, un site sérieux, une 2e vérification, la source notée.", "Добрий пошук: точні ключові слова, серйозний сайт, друга перевірка, записане джерело.", "Dobre wyszukiwanie: dokładne słowa kluczowe, poważna strona, drugie sprawdzenie, zapisane źródło.", "Una buena búsqueda: palabras clave precisas, un sitio serio, una 2.ª comprobación, la fuente anotada."),
          L("L'époque romaine chez nous dure environ 500 ans, de César (− 57) à la fin de l'Empire romain d'Occident (476).", "Римська епоха в наших краях триває близько 500 років: від Цезаря (− 57) до кінця Західної Римської імперії (476).", "Epoka rzymska u nas trwa około 500 lat, od Cezara (− 57) do końca Cesarstwa Zachodniorzymskiego (476).", "La época romana en nuestra tierra dura unos 500 años, de César (− 57) al fin del Imperio romano de Occidente (476).")
        ] } }
      ] }
  );

  /* ---------- Activités ---------- */
  D.activites.push(
    { id: "rom-act-conquete", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Enquête sur Ambiorix", "Розслідування про Амбіорікса", "Śledztwo o Ambioryksie", "Investigación sobre Ambiórix"),
      objectif: L("Je situe, je calcule, je cherche sur Internet et je critique.", "Я знаходжу, рахую, шукаю в інтернеті й аналізую.", "Znajduję, liczę, szukam w internecie i analizuję.", "Localizo, calculo, busco en Internet y analizo."),
      etapes: [
        CARTE(L("Sur la carte (document N°1), TOUCHE le repère de Rome, la ville d'où partent les armées romaines.", "На карті (документ №1) ТОРКНИСЯ позначки Рима, звідки вирушають римські армії.", "Na mapie (dokument nr 1) DOTKNIJ znacznika Rzymu, skąd wyruszają rzymskie armie.", "En el mapa (documento N.º 1), TOCA la marca de Roma, la ciudad de donde salen los ejércitos romanos."),
          UE, [pt("par", 35, 64), pt("rom", 48.5, 78), pt("mad", 24, 80), pt("gre", 62, 85)], "rom",
          L("Oui ! Rome est au centre de l'Italie, la « botte » au sud de l'Europe.", "Так! Рим у центрі Італії, «чобота» на півдні Європи.", "Tak! Rzym leży w środku Włoch, „buta” na południu Europy.", "¡Sí! Roma está en el centro de Italia, la «bota» al sur de Europa."),
          L("Pas encore. Cherche le pays en forme de botte, puis son milieu.", "Ще ні. Знайди країну у формі чобота, потім її середину.", "Jeszcze nie. Znajdź kraj w kształcie buta, potem jego środek.", "Todavía no. Busca el país en forma de bota y luego su centro."),
          [L("L'Italie ressemble à une botte.", "Італія схожа на чобіт.", "Włochy przypominają but.", "Italia parece una bota.")]),
        { type: "nombre", picto: null, verbe: "CALCULE", unite: "jours", reponse: 44,
          consigne: L("De Rome à Tongres, il y a environ 1100 km. Un soldat romain marche environ 25 km par jour. CALCULE : combien de jours de marche ?", "Від Рима до Тонгерена приблизно 1100 км. Римський солдат проходить приблизно 25 км на день. ПОРАХУЙ: скільки днів ходу?", "Z Rzymu do Tongeren jest około 1100 km. Rzymski żołnierz przechodzi około 25 km dziennie. POLICZ: ile dni marszu?", "De Roma a Tongeren hay unos 1100 km. Un soldado romano camina unos 25 km al día. CALCULA: ¿cuántos días de marcha?"),
          bravo: L("Oui ! 1100 ÷ 25 = 44 jours, plus d'un mois de marche.", "Так! 1100 ÷ 25 = 44 дні — понад місяць ходу.", "Tak! 1100 ÷ 25 = 44 dni, ponad miesiąc marszu.", "¡Sí! 1100 ÷ 25 = 44 días, más de un mes de marcha."),
          erreur: L("Pas encore. Divise la distance par les km d'un jour.", "Ще ні. Поділи відстань на кілометри за день.", "Jeszcze nie. Podziel odległość przez km na dzień.", "Todavía no. Divide la distancia entre los km de un día."),
          aides: [L("4 × 25 = 100. Combien de fois 100 dans 1100 ?", "4 × 25 = 100. Скільки разів по 100 у 1100?", "4 × 25 = 100. Ile razy 100 mieści się w 1100?", "4 × 25 = 100. ¿Cuántas veces 100 hay en 1100?")] },
        CHOIX("CHERCHE", L("RECHERCHE : ouvre la page Vikidia sur Ambiorix. CHERCHE : quel peuple dirige Ambiorix ?", "ПОШУК: відкрий сторінку Vikidia про Амбіорікса. ЗНАЙДИ: яким народом керує Амбіорікс?", "WYSZUKIWANIE: otwórz stronę Vikidii o Ambioryksie. ZNAJDŹ: jakim ludem dowodzi Ambioryks?", "BÚSQUEDA: abre la página de Vikidia sobre Ambiórix. BUSCA: ¿qué pueblo dirige Ambiórix?"),
          [opt("a", "les Éburons", "ебурони", "Eburonowie", "los eburones", true), opt("b", "les Romains", "римляни", "Rzymianie", "los romanos"), opt("c", "les Égyptiens", "єгиптяни", "Egipcjanie", "los egipcios")],
          L("Oui ! La page dit qu'Ambiorix est un chef des Éburons, installés entre la Meuse et le Rhin.", "Так! На сторінці сказано, що Амбіорікс — вождь ебуронів, які жили між Маасом і Рейном.", "Tak! Strona mówi, że Ambioryks jest wodzem Eburonów, osiadłych między Mozą a Renem.", "¡Sí! La página dice que Ambiórix es un jefe de los eburones, instalados entre el Mosa y el Rin."),
          L("Pas encore. Lis la première phrase de la page.", "Ще ні. Прочитай перше речення сторінки.", "Jeszcze nie. Przeczytaj pierwsze zdanie strony.", "Todavía no. Lee la primera frase de la página."),
          [L("Si le lien ne marche pas, relis le texte de la leçon.", "Якщо посилання не працює, перечитай текст уроку.", "Jeśli link nie działa, przeczytaj jeszcze raz tekst lekcji.", "Si el enlace no funciona, vuelve a leer el texto de la lección.")],
          { lien: LIEN_AMBIORIX }),
        CLASSER(L("CRITIQUE les documents N°2 et N°3. CLASSE chaque phrase dans le bon document.", "ПРОАНАЛІЗУЙ документи №2 і №3. РОЗПОДІЛИ кожне речення до правильного документа.", "PRZEANALIZUJ dokumenty nr 2 i nr 3. PRZYPORZĄDKUJ każde zdanie do właściwego dokumentu.", "ANALIZA los documentos N.º 2 y N.º 3. CLASIFICA cada frase en el documento correcto."),
          [{ id: "cesar", label: L("Document N°2 : texte de César", "Документ №2: текст Цезаря", "Dokument nr 2: tekst Cezara", "Documento N.º 2: texto de César") }, { id: "statue", label: L("Document N°3 : statue de 1866", "Документ №3: статуя 1866 року", "Dokument nr 3: pomnik z 1866 roku", "Documento N.º 3: estatua de 1866") }],
          [el("c1", "Fait à l'époque des faits, par un témoin.", "Зроблено в час подій, свідком.", "Zrobione w czasie wydarzeń, przez świadka.", "Hecho en la época de los hechos, por un testigo.", "cesar"),
           el("c2", "Son auteur est l'ennemi des Belges.", "Його автор — ворог белгів.", "Jego autor jest wrogiem Belgów.", "Su autor es el enemigo de los belgas.", "cesar"),
           el("s1", "Fait plus de 1900 ans après les faits.", "Зроблено понад 1900 років після подій.", "Zrobione ponad 1900 lat po wydarzeniach.", "Hecho más de 1900 años después de los hechos.", "statue"),
           el("s2", "Fait par des Belges fiers de leur héros, après 1830.", "Зроблено бельгійцями, гордими своїм героєм, після 1830 року.", "Zrobione przez Belgów dumnych ze swojego bohatera, po 1830 roku.", "Hecho por belgas orgullosos de su héroe, después de 1830.", "statue")],
          L("Bravo ! Les deux peuvent être partiaux : César veut montrer sa victoire, la statue veut rendre les Belges fiers.", "Молодець! Обидва можуть бути упередженими: Цезар хоче показати свою перемогу, статуя — щоб бельгійці пишалися.", "Brawo! Oba mogą być stronnicze: Cezar chce pokazać swoje zwycięstwo, pomnik ma sprawić, że Belgowie będą dumni.", "¡Bien! Los dos pueden ser parciales: César quiere mostrar su victoria, la estatua quiere hacer que los belgas estén orgullosos."),
          L("Pas encore. Relis les légendes : QUI a fait le document ? QUAND ?", "Ще ні. Перечитай підписи: ХТО зробив документ? КОЛИ?", "Jeszcze nie. Przeczytaj podpisy: KTO zrobił dokument? KIEDY?", "Todavía no. Vuelve a leer las leyendas: ¿QUIÉN hizo el documento? ¿CUÁNDO?"),
          [L("César écrit vers − 50. La statue date de 1866.", "Цезар пише близько − 50. Статуя — 1866 року.", "Cezar pisze około − 50. Pomnik pochodzi z 1866 roku.", "César escribe hacia − 50. La estatua es de 1866.")]),
        AUTO("CHOISIS : est-ce que tu sais chercher une information et dire si un auteur peut être partial ?", "ВИБЕРИ: чи вмієш ти знайти інформацію й сказати, чи автор може бути упередженим?", "WYBIERZ: czy umiesz znaleźć informację i powiedzieć, czy autor może być stronniczy?", "ELIGE: ¿sabes buscar una información y decir si un autor puede ser parcial?")
      ] },

    { id: "rom-act-tongres", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Détective à Tongres", "Детектив у Тонгерені", "Detektyw w Tongeren", "Detective en Tongeren"),
      objectif: L("Je lis une pièce romaine, je cherche sur Wikipédia et je compare hier et aujourd'hui.", "Я читаю римську монету, шукаю у Вікіпедії й порівнюю минуле та сьогодення.", "Odczytuję rzymską monetę, szukam w Wikipedii i porównuję dawniej i dziś.", "Leo una moneda romana, busco en Wikipedia y comparo ayer y hoy."),
      etapes: [
        CARTE(L("Sur le sesterce (document N°5), TOUCHE le nom de l'empereur écrit en latin.", "На сестерції (документ №5) ТОРКНИСЯ імені імператора, написаного латиною.", "Na sestercu (dokument nr 5) DOTKNIJ imienia cesarza zapisanego po łacinie.", "En el sestercio (documento N.º 5), TOCA el nombre del emperador escrito en latín."),
          IMG + "rom-monnaie.jpg", [pt("visage", 33, 42), pt("nom", 17, 70), pt("rome", 67, 52), pt("sc", 70, 74)], "nom",
          L("Oui ! On lit « HADRIANVS » : Hadrien. Les Romains écrivent V à la place de U.", "Так! Читаємо «HADRIANVS» — Адріан. Римляни писали V замість U.", "Tak! Czytamy „HADRIANVS”: Hadrian. Rzymianie pisali V zamiast U.", "¡Sí! Se lee «HADRIANVS»: Adriano. Los romanos escriben V en lugar de U."),
          L("Pas encore. Cherche des lettres autour de la tête, en bas à gauche.", "Ще ні. Шукай літери навколо голови, внизу ліворуч.", "Jeszcze nie. Szukaj liter wokół głowy, na dole po lewej.", "Todavía no. Busca letras alrededor de la cabeza, abajo a la izquierda."),
          [L("Le nom commence par H.", "Ім'я починається з H.", "Imię zaczyna się na H.", "El nombre empieza por H.")]),
        CHOIX("CHERCHE", L("RECHERCHE : ouvre la page Wikipédia sur Tongres. CHERCHE : comment les Romains appelaient-ils Tongres ?", "ПОШУК: відкрий сторінку Вікіпедії про Тонгерен. ЗНАЙДИ: як римляни називали Тонгерен?", "WYSZUKIWANIE: otwórz stronę Wikipedii o Tongeren. ZNAJDŹ: jak Rzymianie nazywali Tongeren?", "BÚSQUEDA: abre la página de Wikipedia sobre Tongeren. BUSCA: ¿cómo llamaban los romanos a Tongeren?"),
          [opt("a", "Lutèce", "Лютеція", "Lutecja", "Lutecia"), opt("b", "Atuatuca Tungrorum", "Атуатука Тунгрорум", "Atuatuca Tungrorum", "Atuatuca Tungrorum", true), opt("c", "Rome", "Рим", "Rzym", "Roma")],
          L("Oui ! Atuatuca Tungrorum. Lutèce, c'est l'ancien nom de Paris.", "Так! Атуатука Тунгрорум. Лютеція — давня назва Парижа.", "Tak! Atuatuca Tungrorum. Lutecja to dawna nazwa Paryża.", "¡Sí! Atuatuca Tungrorum. Lutecia es el antiguo nombre de París."),
          L("Pas encore. Cherche le mot « romain » dans la page (sur iPad : bouton partager › Rechercher dans la page).", "Ще ні. Шукай слово «romain» на сторінці (на iPad: кнопка «Поділитися» › «Знайти на сторінці»).", "Jeszcze nie. Szukaj słowa „romain” na stronie (na iPadzie: przycisk Udostępnij › Znajdź na stronie).", "Todavía no. Busca la palabra «romain» en la página (en el iPad: botón compartir › Buscar en la página)."),
          [L("Le nom romain est aussi écrit dans la légende du document N°4.", "Римська назва є й у підписі документа №4.", "Rzymska nazwa jest też w podpisie dokumentu nr 4.", "El nombre romano también está en la leyenda del documento N.º 4.")],
          { lien: LIEN_TONGRES }),
        ECRIRE("CITE", L("CITE ta source : sur quel site as-tu trouvé l'information ? Qui écrit ce site ?", "НАЗВИ джерело: на якому сайті ти знайшов(-ла) інформацію? Хто пише цей сайт?", "PODAJ źródło: na jakiej stronie znalazłeś/znalazłaś informację? Kto pisze tę stronę?", "CITA tu fuente: ¿en qué sitio encontraste la información? ¿Quién escribe ese sitio?"),
          ["J'ai trouvé l'information sur le site", "Ce site est écrit par", "Je pense que ce site est sérieux parce que"], "J'ai trouvé l'information sur le site Wikipédia…",
          [L("Wikipédia est écrite par des bénévoles. Ils doivent donner leurs sources en bas de la page.", "Вікіпедію пишуть волонтери. Вони мають указувати джерела внизу сторінки.", "Wikipedię piszą wolontariusze. Muszą podawać źródła na dole strony.", "Wikipedia la escriben voluntarios. Deben dar sus fuentes al final de la página.")]),
        CLASSER(L("CLASSE : qu'est-ce qui a CHANGÉ depuis les Romains, et qu'est-ce qui CONTINUE encore aujourd'hui ?", "РОЗПОДІЛИ: що ЗМІНИЛОСЯ від часів римлян, а що ТРИВАЄ й сьогодні?", "PRZYPORZĄDKUJ: co się ZMIENIŁO od czasów Rzymian, a co TRWA do dziś?", "CLASIFICA: ¿qué ha CAMBIADO desde los romanos y qué CONTINÚA todavía hoy?"),
          [{ id: "cont", label: L("Continue aujourd'hui", "Триває сьогодні", "Trwa do dziś", "Continúa hoy") }, { id: "chg", label: L("A changé", "Змінилося", "Zmieniło się", "Ha cambiado") }],
          [el("lat", "Des mots français viennent du latin.", "Французькі слова походять із латини.", "Słowa francuskie pochodzą z łaciny.", "Palabras francesas vienen del latín.", "cont"),
           el("jui", "Le mois de juillet porte le nom de Jules César.", "Місяць juillet названо на честь Юлія Цезаря.", "Miesiąc juillet nosi imię Juliusza Cezara.", "El mes de julio lleva el nombre de Julio César.", "cont"),
           el("ses", "On paie avec des sesterces.", "Платять сестерціями.", "Płaci się sestercami.", "Se paga con sestercios.", "chg"),
           el("esc", "Des personnes sont esclaves.", "Деякі люди — раби.", "Niektórzy ludzie są niewolnikami.", "Algunas personas son esclavas.", "chg"),
           el("vil", "Tongres est encore une ville habitée.", "Тонгерен досі є заселеним містом.", "Tongeren nadal jest zamieszkanym miastem.", "Tongeren sigue siendo una ciudad habitada.", "cont"),
           el("emp", "Un empereur dirige nos régions.", "Нашими краями керує імператор.", "Naszymi okolicami rządzi cesarz.", "Un emperador gobierna nuestras regiones.", "chg")],
          L("Bravo ! L'histoire, c'est aussi voir ce qui change et ce qui reste.", "Молодець! Історія — це й бачити, що змінюється, а що залишається.", "Brawo! Historia to też dostrzeganie, co się zmienia, a co zostaje.", "¡Bien! La historia también es ver lo que cambia y lo que queda."),
          L("Pas encore. Pour chaque phrase, demande-toi : est-ce encore vrai en 2026 ?", "Ще ні. Для кожного речення запитай себе: чи це ще правда у 2026 році?", "Jeszcze nie. Przy każdym zdaniu zapytaj się: czy to nadal prawda w 2026 roku?", "Todavía no. Para cada frase, pregúntate: ¿sigue siendo verdad en 2026?"),
          [L("Aujourd'hui, on paie en euros.", "Сьогодні платять у євро.", "Dziś płaci się w euro.", "Hoy se paga en euros.")]),
        AUTO("CHOISIS : est-ce que tu sais chercher une information et citer ta source ?", "ВИБЕРИ: чи вмієш ти знайти інформацію й назвати джерело?", "WYBIERZ: czy umiesz znaleźć informację i podać źródło?", "ELIGE: ¿sabes buscar una información y citar tu fuente?")
      ] },

    { id: "rom-act-chez-nous", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Mon enquête sur Internet", "Моє розслідування в інтернеті", "Moje śledztwo w internecie", "Mi investigación en Internet"),
      objectif: L("Je choisis mes mots-clés, je juge les sites, je trouve l'info et je range la frise.", "Я обираю ключові слова, оцінюю сайти, знаходжу інформацію й упорядковую стрічку часу.", "Wybieram słowa kluczowe, oceniam strony, znajduję informację i układam oś czasu.", "Elijo mis palabras clave, juzgo los sitios, encuentro la información y ordeno la línea del tiempo."),
      etapes: [
        CHOIX("CHOISIS", L("Tu veux savoir si les Romains ont habité à Liège. CHOISIS les meilleurs mots-clés à taper dans le moteur de recherche.", "Ти хочеш дізнатися, чи жили римляни в Льєжі. ВИБЕРИ найкращі ключові слова для пошукової системи.", "Chcesz się dowiedzieć, czy Rzymianie mieszkali w Liège. WYBIERZ najlepsze słowa kluczowe do wyszukiwarki.", "Quieres saber si los romanos vivieron en Lieja. ELIGE las mejores palabras clave para el buscador."),
          [opt("a", "« romains »", "«romains»", "„romains”", "«romains»"), opt("b", "« villa romaine Liège »", "«villa romaine Liège»", "„villa romaine Liège”", "«villa romaine Liège»", true), opt("c", "« est-ce que les gens d'avant ils habitaient où ? »", "«est-ce que les gens d'avant ils habitaient où ?»", "„est-ce que les gens d'avant ils habitaient où ?”", "«est-ce que les gens d'avant ils habitaient où ?»")],
          L("Oui ! 3 mots précis : le QUOI (villa romaine) et le OÙ (Liège).", "Так! 3 точні слова: ЩО (villa romaine) і ДЕ (Liège).", "Tak! 3 dokładne słowa: CO (villa romaine) i GDZIE (Liège).", "¡Sí! 3 palabras precisas: el QUÉ (villa romaine) y el DÓNDE (Liège)."),
          L("Pas encore. Un seul mot, c'est trop vague. Une longue phrase, c'est trop flou.", "Ще ні. Одне слово — занадто загально. Довге речення — занадто розмито.", "Jeszcze nie. Jedno słowo to za mało. Długie zdanie jest zbyt niejasne.", "Todavía no. Una sola palabra es demasiado vaga. Una frase larga es demasiado confusa."),
          [L("Il faut dire QUOI et OÙ.", "Треба сказати ЩО і ДЕ.", "Trzeba powiedzieć CO i GDZIE.", "Hay que decir QUÉ y DÓNDE.")]),
        CHOIX("CHERCHE", L("RECHERCHE : ouvre ton moteur de recherche et tape « Archéoforum Liège ». CHERCHE : qu'a-t-on trouvé sous la place Saint-Lambert ?", "ПОШУК: відкрий пошукову систему й набери «Archéoforum Liège». ЗНАЙДИ: що знайшли під площею Сен-Ламбер?", "WYSZUKIWANIE: otwórz wyszukiwarkę i wpisz „Archéoforum Liège”. ZNAJDŹ: co znaleziono pod placem Saint-Lambert?", "BÚSQUEDA: abre tu buscador y escribe «Archéoforum Liège». BUSCA: ¿qué se encontró bajo la plaza Saint-Lambert?"),
          [opt("a", "un stade de football", "футбольний стадіон", "stadion piłkarski", "un estadio de fútbol"), opt("b", "une pyramide", "піраміду", "piramidę", "una pirámide"), opt("c", "les restes d'une villa gallo-romaine", "залишки галло-римської вілли", "pozostałości willi galijsko-rzymskiej", "los restos de una villa galorromana", true)],
          L("Oui ! Sous la place Saint-Lambert, l'Archéoforum montre une villa gallo-romaine et des traces encore plus anciennes.", "Так! Під площею Сен-Ламбер Археофорум показує галло-римську віллу й ще давніші сліди.", "Tak! Pod placem Saint-Lambert Archéoforum pokazuje willę galijsko-rzymską i jeszcze starsze ślady.", "¡Sí! Bajo la plaza Saint-Lambert, el Archéoforum muestra una villa galorromana y huellas aún más antiguas."),
          L("Pas encore. Ouvre le site de la ville de Liège ou celui de l'Archéoforum et lis la description.", "Ще ні. Відкрий сайт міста Льєж або Археофоруму й прочитай опис.", "Jeszcze nie. Otwórz stronę miasta Liège albo Archéoforum i przeczytaj opis.", "Todavía no. Abre el sitio de la ciudad de Lieja o el del Archéoforum y lee la descripción."),
          [L("« Gallo-romain » = des Gaulois qui vivent à la façon des Romains.", "«Галло-римський» = галли, що живуть як римляни.", "„Galijsko-rzymski” = Galowie żyjący na sposób rzymski.", "«Galorromano» = galos que viven a la manera de los romanos.")]),
        CLASSER(L("JUGE ces sites : on peut leur faire confiance, ou il faut vérifier ailleurs ?", "ОЦІНИ ці сайти: їм можна довіряти чи треба перевірити деінде?", "OCEŃ te strony: można im ufać, czy trzeba sprawdzić gdzie indziej?", "JUZGA estos sitios: ¿se puede confiar en ellos o hay que comprobar en otro lugar?"),
          [{ id: "ok", label: L("Plutôt fiable", "Скоріше надійний", "Raczej wiarygodna", "Bastante fiable") }, { id: "verif", label: L("Je dois vérifier", "Треба перевірити", "Muszę sprawdzić", "Tengo que comprobar") }],
          [el("musee", "le site officiel d'un musée", "офіційний сайт музею", "oficjalna strona muzeum", "el sitio oficial de un museo", "ok"),
           el("ville", "le site de la ville de Liège", "сайт міста Льєж", "strona miasta Liège", "el sitio de la ciudad de Lieja", "ok"),
           el("tiktok", "une vidéo TikTok sans source", "відео в TikTok без джерела", "film na TikToku bez źródła", "un vídeo de TikTok sin fuente", "verif"),
           el("blog", "un blog sans nom d'auteur", "блог без імені автора", "blog bez nazwiska autora", "un blog sin nombre de autor", "verif"),
           el("ia", "une réponse d'intelligence artificielle sans sources", "відповідь штучного інтелекту без джерел", "odpowiedź sztucznej inteligencji bez źródeł", "una respuesta de inteligencia artificial sin fuentes", "verif"),
           el("vikidia", "une encyclopédie qui donne ses sources", "енциклопедія, що вказує джерела", "encyklopedia, która podaje źródła", "una enciclopedia que da sus fuentes", "ok")],
          L("Bravo ! Un site sérieux dit qui l'a écrit et d'où vient l'information.", "Молодець! Серйозний сайт каже, хто його написав і звідки інформація.", "Brawo! Poważna strona mówi, kto ją napisał i skąd pochodzi informacja.", "¡Bien! Un sitio serio dice quién lo escribió y de dónde viene la información."),
          L("Pas encore. Demande-toi : est-ce que je sais QUI a écrit ? Est-ce qu'il donne ses sources ?", "Ще ні. Запитай себе: чи знаю я, ХТО написав? Чи вказано джерела?", "Jeszcze nie. Zapytaj się: czy wiem, KTO to napisał? Czy podaje źródła?", "Todavía no. Pregúntate: ¿sé QUIÉN lo escribió? ¿Da sus fuentes?"),
          [L("Une IA peut se tromper : il faut toujours vérifier.", "ШІ може помилятися: завжди треба перевіряти.", "SI może się mylić: zawsze trzeba sprawdzać.", "Una IA puede equivocarse: siempre hay que comprobar.")]),
        CARTE(L("Sur la carte (document N°6), TOUCHE le repère de Tongres : au nord de Liège.", "На карті (документ №6) ТОРКНИСЯ позначки Тонгерена: на північ від Льєжа.", "Na mapie (dokument nr 6) DOTKNIJ znacznika Tongeren: na północ od Liège.", "En el mapa (documento N.º 6), TOCA la marca de Tongeren: al norte de Lieja."),
          BELGIQUE, [pt("nam", 55, 52), pt("ton", 74.5, 37.5), pt("arl", 80, 84), pt("ost", 10, 24)], "ton",
          L("Oui ! Tongres est à environ 20 km au nord de Liège. Une route romaine y passait.", "Так! Тонгерен приблизно за 20 км на північ від Льєжа. Через нього проходила римська дорога.", "Tak! Tongeren leży około 20 km na północ od Liège. Przechodziła tam rzymska droga.", "¡Sí! Tongeren está a unos 20 km al norte de Lieja. Por allí pasaba una calzada romana."),
          L("Pas encore. Trouve Liège, puis monte un peu (le nord est en haut).", "Ще ні. Знайди Льєж, потім трохи вгору (північ — угорі).", "Jeszcze nie. Znajdź Liège, potem idź trochę w górę (północ jest na górze).", "Todavía no. Busca Lieja y luego sube un poco (el norte está arriba)."),
          [L("Liège est écrit sur la carte, à droite.", "Льєж підписано на карті праворуч.", "Liège jest napisane na mapie, po prawej.", "Lieja está escrita en el mapa, a la derecha.")]),
        { type: "ordre", picto: null, verbe: "RANGE", debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("le plus récent", "найновіше", "najnowsze", "lo más reciente"),
          consigne: L("RANGE l'époque romaine chez nous sur la frise. TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", "РОЗТАШУЙ римську епоху в наших краях на стрічці часу. ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", "UŁÓŻ epokę rzymską u nas na osi czasu. DOTYKAJ kart po kolei: 1., potem 2.…", "ORDENA la época romana en nuestra tierra en la línea del tiempo. TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…"),
          elements: [el("r1", "César bat les Belges (− 57)", "Цезар перемагає белгів (− 57)", "Cezar pokonuje Belgów (− 57)", "César vence a los belgas (− 57)"),
            el("r2", "Révolte d'Ambiorix (− 54)", "Повстання Амбіорікса (− 54)", "Bunt Ambioryksa (− 54)", "Rebelión de Ambiórix (− 54)"),
            el("r3", "Camp romain à Tongres (vers − 10)", "Римський табір у Тонгерені (близько − 10)", "Obóz rzymski w Tongeren (około − 10)", "Campamento romano en Tongeren (hacia − 10)"),
            el("r4", "Sesterce de l'empereur Hadrien (117-138)", "Сестерцій імператора Адріана (117–138)", "Sesterc cesarza Hadriana (117–138)", "Sestercio del emperador Adriano (117-138)"),
            el("r5", "Fin de l'Empire romain d'Occident (476)", "Кінець Західної Римської імперії (476)", "Koniec Cesarstwa Zachodniorzymskiego (476)", "Fin del Imperio romano de Occidente (476)"),
            el("r6", "Statue d'Ambiorix à Tongres (1866)", "Статуя Амбіорікса в Тонгерені (1866)", "Pomnik Ambioryksa w Tongeren (1866)", "Estatua de Ambiórix en Tongeren (1866)")],
          bravo: L("Bravo ! Attention : la statue de 1866 parle des Romains, mais elle a été faite bien plus tard.", "Молодець! Увага: статуя 1866 року розповідає про римлян, але зроблена набагато пізніше.", "Brawo! Uwaga: pomnik z 1866 roku mówi o Rzymianach, ale powstał dużo później.", "¡Bien! Atención: la estatua de 1866 habla de los romanos, pero se hizo mucho más tarde."),
          erreur: L("Pas encore. D'abord les dates avec « − » (la plus grande d'abord), puis les dates sans « − ».", "Ще ні. Спершу дати з «−» (найбільша спочатку), потім дати без «−».", "Jeszcze nie. Najpierw daty z „−” (największa najpierw), potem daty bez „−”.", "Todavía no. Primero las fechas con «−» (la mayor primero) y luego las fechas sin «−»."),
          aides: [L("− 57 est avant − 54.", "− 57 раніше за − 54.", "− 57 jest przed − 54.", "− 57 es antes que − 54.")] },
        AUTO("CHOISIS : est-ce que tu sais faire une recherche sérieuse sur Internet ?", "ВИБЕРИ: чи вмієш ти серйозно шукати в інтернеті?", "WYBIERZ: czy umiesz rzetelnie szukać w internecie?", "ELIGE: ¿sabes hacer una búsqueda seria en Internet?")
      ] }
  );

  /* ---------- Mini-tests et test de fin ---------- */
  P.tests.push(
    { id: "test-rom-conquete", titre: L("Mini-test : la conquête romaine", "Міні-тест: римське завоювання", "Mini-test: podbój rzymski", "Mini-prueba: la conquista romana"),
      questions: [
        Q("rom-carte", L("CHOISIS : Rome se trouve…", "ВИБЕРИ: Рим знаходиться…", "WYBIERZ: Rzym leży…", "ELIGE: Roma está…"),
          [o("en Italie", "в Італії", "we Włoszech", "en Italia", true), o("en Belgique", "у Бельгії", "w Belgii", "en Bélgica"), o("en Grèce", "у Греції", "w Grecji", "en Grecia")],
          L("Rome est la capitale de l'Italie.", "Рим — столиця Італії.", "Rzym jest stolicą Włoch.", "Roma es la capital de Italia.")),
        Q("rom-recherche", L("CHOISIS : Ambiorix était le chef…", "ВИБЕРИ: Амбіорікс був вождем…", "WYBIERZ: Ambioryks był wodzem…", "ELIGE: Ambiórix era el jefe…"),
          [o("des Romains", "римлян", "Rzymian", "de los romanos"), o("des Phéniciens", "фінікійців", "Fenicjan", "de los fenicios"), o("des Éburons", "ебуронів", "Eburonów", "de los eburones", true)],
          L("Les Éburons vivaient entre la Meuse et le Rhin.", "Ебурони жили між Маасом і Рейном.", "Eburonowie żyli między Mozą a Renem.", "Los eburones vivían entre el Mosa y el Rin.")),
        Q("rom-critique", L("CHOISIS : pourquoi le texte de César peut-il être partial ?", "ВИБЕРИ: чому текст Цезаря може бути упередженим?", "WYBIERZ: dlaczego tekst Cezara może być stronniczy?", "ELIGE: ¿por qué el texto de César puede ser parcial?"),
          [o("Parce qu'il est très court.", "Бо він дуже короткий.", "Bo jest bardzo krótki.", "Porque es muy corto."), o("Parce que César est l'ennemi des Belges et veut montrer sa victoire.", "Бо Цезар — ворог белгів і хоче показати свою перемогу.", "Bo Cezar jest wrogiem Belgów i chce pokazać swoje zwycięstwo.", "Porque César es el enemigo de los belgas y quiere mostrar su victoria.", true), o("Parce qu'il est écrit en 1866.", "Бо його написано в 1866 році.", "Bo został napisany w 1866 roku.", "Porque está escrito en 1866.")],
          L("Un auteur qui participe à la guerre raconte souvent à son avantage.", "Автор, що бере участь у війні, часто розповідає на свою користь.", "Autor, który bierze udział w wojnie, często opowiada na swoją korzyść.", "Un autor que participa en la guerra a menudo cuenta las cosas a su favor."))
      ] },
    { id: "test-rom-tongres", titre: L("Mini-test : Tongres romaine", "Міні-тест: римський Тонгерен", "Mini-test: rzymskie Tongeren", "Mini-prueba: Tongeren romana"),
      questions: [
        Q("rom-trace", L("CHOISIS : sur le sesterce, la femme assise représente…", "ВИБЕРИ: на сестерції сидяча жінка зображує…", "WYBIERZ: na sestercu siedząca kobieta przedstawia…", "ELIGE: en el sestercio, la mujer sentada representa…"),
          [o("la ville de Rome", "місто Рим", "miasto Rzym", "la ciudad de Roma", true), o("la reine des Belges", "королеву белгів", "królową Belgów", "la reina de los belgas"), o("une Égyptienne", "єгиптянку", "Egipcjankę", "una egipcia")],
          L("Les Romains représentaient leur ville comme une déesse.", "Римляни зображували своє місто як богиню.", "Rzymianie przedstawiali swoje miasto jako boginię.", "Los romanos representaban su ciudad como una diosa."), DOC.sesterce),
        Q("rom-recherche2", L("CHOISIS : quand je fais une recherche, je dois…", "ВИБЕРИ: коли я шукаю, я маю…", "WYBIERZ: gdy szukam, muszę…", "ELIGE: cuando hago una búsqueda, debo…"),
          [o("copier le premier résultat", "скопіювати перший результат", "skopiować pierwszy wynik", "copiar el primer resultado"), o("noter le site où j'ai trouvé l'information", "записати сайт, де знайшов(-ла) інформацію", "zapisać stronę, na której znalazłem/znalazłam informację", "anotar el sitio donde encontré la información", true), o("ne rien noter", "нічого не записувати", "niczego nie zapisywać", "no anotar nada")],
          L("Citer sa source, c'est dire d'où vient l'information.", "Назвати джерело — це сказати, звідки інформація.", "Podać źródło to powiedzieć, skąd pochodzi informacja.", "Citar la fuente es decir de dónde viene la información.")),
        Q("rom-continuite", L("CHOISIS ce qui CONTINUE depuis les Romains.", "ВИБЕРИ те, що ТРИВАЄ від часів римлян.", "WYBIERZ to, co TRWA od czasów Rzymian.", "ELIGE lo que CONTINÚA desde los romanos."),
          [o("Payer en sesterces", "Платити сестерціями", "Płacić sestercami", "Pagar con sestercios"), o("Avoir un empereur", "Мати імператора", "Mieć cesarza", "Tener un emperador"), o("Des mots français qui viennent du latin", "Французькі слова, що походять із латини", "Słowa francuskie pochodzące z łaciny", "Palabras francesas que vienen del latín", true)],
          L("Le français vient du latin : c'est une continuité.", "Французька походить із латини: це тяглість.", "Francuski pochodzi od łaciny: to ciągłość.", "El francés viene del latín: es una continuidad."))
      ] },
    { id: "test-rom-chez-nous", titre: L("Mini-test : enquête sur Internet", "Міні-тест: пошук в інтернеті", "Mini-test: śledztwo w internecie", "Mini-prueba: investigación en Internet"),
      questions: [
        Q("rom-motscles", L("CHOISIS les meilleurs mots-clés pour trouver les thermes romains de Tongres.", "ВИБЕРИ найкращі ключові слова, щоб знайти римські терми Тонгерена.", "WYBIERZ najlepsze słowa kluczowe, by znaleźć rzymskie termy w Tongeren.", "ELIGE las mejores palabras clave para encontrar las termas romanas de Tongeren."),
          [o("« thermes romains Tongres »", "«thermes romains Tongres»", "„thermes romains Tongres”", "«thermes romains Tongres»", true), o("« bains »", "«bains»", "„bains”", "«bains»"), o("« histoire »", "«histoire»", "„histoire”", "«histoire»")],
          L("QUOI (thermes romains) + OÙ (Tongres).", "ЩО (thermes romains) + ДЕ (Tongres).", "CO (thermes romains) + GDZIE (Tongres).", "QUÉ (thermes romains) + DÓNDE (Tongres).")),
        Q("rom-fiable", L("CHOISIS le site le plus fiable.", "ВИБЕРИ найнадійніший сайт.", "WYBIERZ najbardziej wiarygodną stronę.", "ELIGE el sitio más fiable."),
          [o("le site du Musée gallo-romain de Tongres", "сайт Галло-римського музею Тонгерена", "strona Muzeum Galijsko-Rzymskiego w Tongeren", "el sitio del Museo Galorromano de Tongeren", true), o("un commentaire anonyme", "анонімний коментар", "anonimowy komentarz", "un comentario anónimo"), o("une vidéo sans source", "відео без джерела", "film bez źródła", "un vídeo sin fuente")],
          L("Un musée a des spécialistes qui étudient les traces.", "У музеї працюють фахівці, які вивчають сліди.", "Muzeum ma specjalistów, którzy badają ślady.", "Un museo tiene especialistas que estudian las huellas.")),
        Q("rom-frise", L("CHOISIS : l'Empire romain d'Occident prend fin en…", "ВИБЕРИ: Західна Римська імперія закінчується в…", "WYBIERZ: Cesarstwo Zachodniorzymskie kończy się w…", "ELIGE: el Imperio romano de Occidente termina en…"),
          [o("− 54", "− 54", "− 54", "− 54"), o("476", "476", "476", "476", true), o("1866", "1866", "1866", "1866")],
          L("476 : c'est le début du Moyen Âge.", "476: це початок середньовіччя.", "476: to początek średniowiecza.", "476: es el comienzo de la Edad Media."))
      ] },
    { id: "bilan-hist-romains", titre: L("Test de fin : les Romains chez nous", "Підсумковий тест: римляни в наших краях", "Test końcowy: Rzymianie u nas", "Prueba final: los romanos en nuestra tierra"),
      questions: [
        Q("rom-carte", L("CHOISIS : qui conquiert la Gaule entre − 58 et − 51 ?", "ВИБЕРИ: хто завойовує Галлію між − 58 і − 51?", "WYBIERZ: kto podbija Galię między − 58 a − 51?", "ELIGE: ¿quién conquista la Galia entre − 58 y − 51?"),
          [o("Ambiorix", "Амбіорікс", "Ambioryks", "Ambiórix"), o("Jules César", "Юлій Цезар", "Juliusz Cezar", "Julio César", true), o("Champollion", "Шампольйон", "Champollion", "Champollion")],
          L("Le général romain Jules César.", "Римський полководець Юлій Цезар.", "Rzymski wódz Juliusz Cezar.", "El general romano Julio César.")),
        Q("rom-critique", L("CHOISIS : la statue d'Ambiorix de 1866 est…", "ВИБЕРИ: статуя Амбіорікса 1866 року — це…", "WYBIERZ: pomnik Ambioryksa z 1866 roku to…", "ELIGE: la estatua de Ambiórix de 1866 es…"),
          [o("une trace de l'époque romaine", "слід римської епохи", "ślad z epoki rzymskiej", "una huella de la época romana"), o("un travail postérieur", "пізніша праця", "praca późniejsza", "un trabajo posterior", true)],
          L("Elle a été faite plus de 1900 ans après Ambiorix.", "Її зроблено через понад 1900 років після Амбіорікса.", "Powstał ponad 1900 lat po Ambioryksie.", "Se hizo más de 1900 años después de Ambiórix."), DOC.ambiorix),
        Q("rom-trace", L("CHOISIS : le sesterce est…", "ВИБЕРИ: сестерцій — це…", "WYBIERZ: sesterc to…", "ELIGE: el sestercio es…"),
          [o("une pièce de monnaie romaine", "римська монета", "rzymska moneta", "una moneda romana", true), o("une statue", "статуя", "pomnik", "una estatua"), o("un bain public", "громадська лазня", "łaźnia publiczna", "un baño público")],
          L("Une pièce en laiton de l'empereur Hadrien.", "Латунна монета імператора Адріана.", "Mosiężna moneta cesarza Hadriana.", "Una moneda de latón del emperador Adriano.")),
        Q("rom-recherche2", L("CHOISIS : la plus vieille ville de Belgique est…", "ВИБЕРИ: найстаріше місто Бельгії —…", "WYBIERZ: najstarsze miasto Belgii to…", "ELIGE: la ciudad más antigua de Bélgica es…"),
          [o("Bruxelles", "Брюссель", "Bruksela", "Bruselas"), o("Huy", "Юї", "Huy", "Huy"), o("Tongres", "Тонгерен", "Tongeren", "Tongeren", true)],
          L("Tongres, l'ancienne Atuatuca Tungrorum.", "Тонгерен, давня Атуатука Тунгрорум.", "Tongeren, dawne Atuatuca Tungrorum.", "Tongeren, la antigua Atuatuca Tungrorum.")),
        Q("rom-fiable", L("CHOISIS : une IA te donne une date sans source. Que fais-tu ?", "ВИБЕРИ: ШІ дає тобі дату без джерела. Що ти робиш?", "WYBIERZ: SI podaje ci datę bez źródła. Co robisz?", "ELIGE: una IA te da una fecha sin fuente. ¿Qué haces?"),
          [o("Je la vérifie sur un site sérieux.", "Я перевіряю її на серйозному сайті.", "Sprawdzam ją na poważnej stronie.", "La compruebo en un sitio serio.", true), o("Je la copie tout de suite.", "Я одразу її копіюю.", "Od razu ją kopiuję.", "La copio enseguida."), o("Je l'invente autrement.", "Я вигадую іншу.", "Wymyślam inną.", "Me invento otra.")],
          L("Toujours vérifier sur une 2e source.", "Завжди перевіряй на другому джерелі.", "Zawsze sprawdzaj w drugim źródle.", "Siempre comprobar en una 2.ª fuente.")),
        Q("rom-continuite", L("CHOISIS : quel mois porte le nom de Jules César ?", "ВИБЕРИ: який місяць названо на честь Юлія Цезаря?", "WYBIERZ: który miesiąc nosi imię Juliusza Cezara?", "ELIGE: ¿qué mes lleva el nombre de Julio César?"),
          [o("janvier", "січень", "styczeń", "enero"), o("juillet", "липень", "lipiec", "julio", true), o("mars", "березень", "marzec", "marzo")],
          L("Juillet vient de Julius (Jules).", "Juillet походить від Julius (Юлій).", "Juillet pochodzi od Julius (Juliusz).", "Julio viene de Julius.")),
        Q("rom-frise", L("CHOISIS l'ordre juste.", "ВИБЕРИ правильний порядок.", "WYBIERZ dobrą kolejność.", "ELIGE el orden correcto."),
          [o("Ambiorix (− 54) → camp de Tongres (− 10) → fin de l'Empire (476)", "Амбіорікс (− 54) → табір у Тонгерені (− 10) → кінець імперії (476)", "Ambioryks (− 54) → obóz w Tongeren (− 10) → koniec cesarstwa (476)", "Ambiórix (− 54) → campamento de Tongeren (− 10) → fin del Imperio (476)", true),
           o("camp de Tongres (− 10) → Ambiorix (− 54) → fin de l'Empire (476)", "табір у Тонгерені (− 10) → Амбіорікс (− 54) → кінець імперії (476)", "obóz w Tongeren (− 10) → Ambioryks (− 54) → koniec cesarstwa (476)", "campamento de Tongeren (− 10) → Ambiórix (− 54) → fin del Imperio (476)"),
           o("fin de l'Empire (476) → Ambiorix (− 54) → camp de Tongres (− 10)", "кінець імперії (476) → Амбіорікс (− 54) → табір у Тонгерені (− 10)", "koniec cesarstwa (476) → Ambioryks (− 54) → obóz w Tongeren (− 10)", "fin del Imperio (476) → Ambiórix (− 54) → campamento de Tongeren (− 10)")],
          L("− 54 est avant − 10, et 476 vient après.", "− 54 раніше за − 10, а 476 — після.", "− 54 jest przed − 10, a 476 potem.", "− 54 es antes que − 10, y 476 viene después."))
      ] }
  );
})();
