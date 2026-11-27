/* Histoire, module 4 : le Moyen Âge à Huy (± 3 h 30, 4 séquences). Verrou : test des rappels.
   Demande de Tristan : la collégiale de Huy, le château de Huy (Li Tchestia), le château de Moha, la charte de 1066.
   Tout se passe autour de l'école : on touche les bâtiments sur une gravure de 1595, on compare avec le fort d'aujourd'hui,
   on enquête sur Internet (mots-clés, deux sites pour vérifier), on raisonne en « don / contre-don ».
   Documents numérotés 1 à 5. rn (kirundi) = null tant que pas relu. */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/histoire/";
  const BELGIQUE = "img/belgique/regions-aujourdhui.jpg", GRAVURE = IMG + "ma-huy-1595.jpg";
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
  const ORDRE = (consigne, elements, bravo, erreur, aides) => ({ type: "ordre", picto: null, verbe: "RANGE", debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("le plus récent", "найновіше", "najnowsze", "lo más reciente"), consigne, elements, bravo, erreur, aides });
  // Points de la gravure de 1595 (en % de l'image)
  const PTS_GRAVURE = [pt("chateau", 46, 10), pt("collegiale", 44, 36), pt("pont", 59, 57), pt("remparts", 19, 77)];

  /* ---------- Documents (1 à 5) ---------- */
  const DOC = {
    belgique: { n: 1, src: BELGIQUE,
      legende: L("Carte de la Belgique avec Huy et Liège, au bord de la Meuse.", "Карта Бельгії з Юї та Льєжем на березі Маасу.", "Mapa Belgii z Huy i Liège nad Mozą.", "Mapa de Bélgica con Huy y Lieja, a orillas del Mosa."),
      credit: "Réalisé par T.Marlair sur base de la carte de Jules Rohault (Wikimedia Commons, CC BY-SA 4.0)" },
    gravure: { n: 2, src: GRAVURE,
      legende: L("Gravure représentant la prise de Huy par l'armée des Provinces-Unies (Pays-Bas) le 5 février 1595, faite aux Pays-Bas vers 1613-1615. En haut : le château ; au milieu : la collégiale ; en bas : la Meuse, le pont et les remparts. Rijksmuseum, Amsterdam.",
        "Гравюра, що зображує захоплення Юї армією Сполучених провінцій (Нідерланди) 5 лютого 1595 року, зроблена в Нідерландах близько 1613–1615 років. Угорі — замок; посередині — колегіальна церква; унизу — Маас, міст і мури. Рейксмузеум, Амстердам.",
        "Rycina przedstawiająca zdobycie Huy przez armię Zjednoczonych Prowincji (Niderlandy) 5 lutego 1595 roku, wykonana w Niderlandach około 1613–1615. Na górze: zamek; w środku: kolegiata; na dole: Moza, most i mury obronne. Rijksmuseum, Amsterdam.",
        "Grabado que representa la toma de Huy por el ejército de las Provincias Unidas (Países Bajos) el 5 de febrero de 1595, hecho en los Países Bajos hacia 1613-1615. Arriba: el castillo; en el medio: la colegiata; abajo: el Mosa, el puente y las murallas. Rijksmuseum, Ámsterdam."),
      credit: "Rijksmuseum, Amsterdam (RP-P-OB-80.168, domaine public / CC0)" },
    collegiale: { n: 3, src: IMG + "ma-collegiale.jpg",
      legende: L("Photographie de la collégiale Notre-Dame de Huy vue depuis le fort, avec la Meuse et le pont. La collégiale gothique est commencée en 1311.",
        "Фотографія колегіальної церкви Нотр-Дам у Юї, знята з форту, з Маасом і мостом. Готичну колегіальну церкву почали будувати в 1311 році.",
        "Zdjęcie kolegiaty Najświętszej Marii Panny w Huy widzianej z fortu, z Mozą i mostem. Gotycką kolegiatę zaczęto budować w 1311 roku.",
        "Fotografía de la colegiata de Nuestra Señora de Huy vista desde el fuerte, con el Mosa y el puente. La colegiata gótica se empieza en 1311."),
      credit: "Photo : Nenea hartia, 2021 (Wikimedia Commons, CC BY-SA 4.0)" },
    fort: { n: 4, src: IMG + "ma-fort-huy.jpg",
      legende: L("Photographie d'un mur du fort de Huy, construit entre 1818 et 1823 par les Hollandais sur la colline où se trouvait l'ancien château (Li Tchestia).",
        "Фотографія стіни форту Юї, збудованого між 1818 і 1823 роками голландцями на пагорбі, де стояв старий замок (Лі Честія).",
        "Zdjęcie muru fortu w Huy, zbudowanego w latach 1818–1823 przez Holendrów na wzgórzu, gdzie stał dawny zamek (Li Tchestia).",
        "Fotografía de un muro del fuerte de Huy, construido entre 1818 y 1823 por los holandeses en la colina donde estaba el antiguo castillo (Li Tchestia)."),
      credit: "Photo : Marc Ryckaert, 2008 (Wikimedia Commons, CC BY 3.0)" },
    moha: { n: 5, src: IMG + "ma-moha.jpg",
      legende: L("Photographie des ruines du château féodal de Moha (Wanze), construit sur un rocher au-dessus de la vallée de la Mehaigne, à quelques kilomètres de Huy.",
        "Фотографія руїн феодального замку Моа (Ванзе), збудованого на скелі над долиною Мегені, за кілька кілометрів від Юї.",
        "Zdjęcie ruin zamku feudalnego w Moha (Wanze), zbudowanego na skale nad doliną Mehaigne, kilka kilometrów od Huy.",
        "Fotografía de las ruinas del castillo feudal de Moha (Wanze), construido sobre una roca encima del valle del Mehaigne, a pocos kilómetros de Huy."),
      credit: "Photo : Jean-Pol Grandmont, 2007 (Wikimedia Commons, CC BY 3.0)" }
  };

  /* ---------- Chapitre : après les Romains ---------- */
  const iAv = P.chapitres.findIndex(c => c.id === "hist-romains");
  P.chapitres.splice(iAv + 1, 0, { id: "hist-moyen-age", discipline: "histoire", verrou: { test: "bilan-pr-histoire", min: 0.5 },
    titre: L("4. Le Moyen Âge à Huy", "4. Середньовіччя в Юї", "4. Średniowiecze w Huy", "4. La Edad Media en Huy"),
    dejaVu: [L("Tu vas découvrir le Moyen Âge dans la ville de ton école : la charte, la collégiale, le château et, tout près, le château de Moha.", "Ти відкриєш середньовіччя в місті своєї школи: хартія, колегіальна церква, замок і, зовсім поруч, замок Моа.", "Odkryjesz średniowiecze w mieście twojej szkoły: kartę, kolegiatę, zamek i, tuż obok, zamek w Moha.", "Vas a descubrir la Edad Media en la ciudad de tu escuela: la carta, la colegiata, el castillo y, muy cerca, el castillo de Moha.")],
    sequences: ["ma-charte", "ma-collegiale", "ma-chateau", "ma-moha"], bilan: "bilan-hist-moyen-age" });

  /* ---------- Séquences ---------- */
  P.sequences.push(
    { id: "ma-charte",
      titre: L("Pourquoi les habitants de Huy deviennent-ils libres en 1066 ?", "Чому мешканці Юї стають вільними в 1066 році?", "Dlaczego mieszkańcy Huy stają się wolni w 1066 roku?", "¿Por qué los habitantes de Huy se vuelven libres en 1066?"),
      objectif: L("J'explique l'échange entre le prince-évêque et les habitants de Huy, et je vérifie une date sur deux sites.", "Я пояснюю обмін між князем-єпископом і мешканцями Юї та перевіряю дату на двох сайтах.", "Wyjaśniam wymianę między księciem-biskupem a mieszkańcami Huy i sprawdzam datę na dwóch stronach.", "Explico el intercambio entre el príncipe-obispo y los habitantes de Huy, y compruebo una fecha en dos sitios."),
      criteres: [
        crit("ma-echange", "J'explique ce que chacun donne et reçoit avec la charte.", "Я пояснюю, що кожен дає й отримує завдяки хартії.", "Wyjaśniam, co każdy daje i otrzymuje dzięki karcie.", "Explico lo que cada uno da y recibe con la carta."),
        crit("ma-verifier", "Je vérifie une information sur deux sites.", "Я перевіряю інформацію на двох сайтах.", "Sprawdzam informację na dwóch stronach.", "Compruebo una información en dos sitios."),
        crit("ma-situer", "Je situe Huy et Liège sur la carte.", "Я знаходжу Юї та Льєж на карті.", "Znajduję Huy i Liège na mapie.", "Localizo Huy y Lieja en el mapa.")
      ],
      etapes: [
        { type: "ressource", titre: L("Un échange : de l'argent contre des libertés", "Обмін: гроші в обмін на свободи", "Wymiana: pieniądze za wolności", "Un intercambio: dinero a cambio de libertades"),
          contenu: { textes: [
            L("Au Moyen Âge, Huy fait partie de la principauté de Liège. Elle est dirigée par un prince-évêque : un chef religieux qui est aussi le seigneur du pays.", "У середньовіччі Юї входить до Льєзького князівства. Ним керує князь-єпископ — релігійний очільник, який водночас є володарем краю.", "W średniowieczu Huy należy do księstwa Liège. Rządzi nim książę-biskup: przywódca religijny, który jest też panem kraju.", "En la Edad Media, Huy forma parte del principado de Lieja. Lo gobierna un príncipe-obispo: un jefe religioso que también es el señor del país."),
            L("En 1053, le comte de Flandre attaque Huy et détruit l'église. Le prince-évêque Théoduin veut la reconstruire, mais il n'a pas assez d'argent.", "У 1053 році граф Фландрії нападає на Юї й руйнує церкву. Князь-єпископ Теодуїн хоче її відбудувати, але йому бракує грошей.", "W 1053 roku hrabia Flandrii atakuje Huy i niszczy kościół. Książę-biskup Teoduin chce go odbudować, ale nie ma dość pieniędzy.", "En 1053, el conde de Flandes ataca Huy y destruye la iglesia. El príncipe-obispo Teoduino quiere reconstruirla, pero no tiene suficiente dinero."),
            L("Les marchands et artisans de Huy sont riches. Ils donnent la moitié de leurs biens. En échange, le 27 août 1066, Théoduin leur accorde une charte : un texte officiel qui leur donne des libertés. C'est une des premières chartes de ce genre en Europe.", "Купці й ремісники Юї багаті. Вони віддають половину свого майна. Натомість 27 серпня 1066 року Теодуїн дає їм хартію — офіційний документ, що надає їм свободи. Це одна з перших таких хартій у Європі.", "Kupcy i rzemieślnicy z Huy są bogaci. Oddają połowę swojego majątku. W zamian 27 sierpnia 1066 roku Teoduin nadaje im kartę: oficjalny tekst, który daje im wolności. To jedna z pierwszych takich kart w Europie.", "Los comerciantes y artesanos de Huy son ricos. Dan la mitad de sus bienes. A cambio, el 27 de agosto de 1066, Teoduino les concede una carta: un texto oficial que les da libertades. Es una de las primeras cartas de este tipo en Europa.")
          ], docs: [DOC.belgique, DOC.gravure] } },
        { type: "activite", activite: "ma-act-charte" },
        { type: "minitest", test: "test-ma-charte" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("1066 : le prince-évêque Théoduin accorde une charte de libertés aux habitants de Huy.", "1066: князь-єпископ Теодуїн надає мешканцям Юї хартію свобод.", "1066: książę-biskup Teoduin nadaje mieszkańcom Huy kartę wolności.", "1066: el príncipe-obispo Teoduino concede una carta de libertades a los habitantes de Huy."),
          L("C'est un échange : les habitants donnent de l'argent pour reconstruire l'église, ils reçoivent des libertés.", "Це обмін: мешканці дають гроші на відбудову церкви, а отримують свободи.", "To wymiana: mieszkańcy dają pieniądze na odbudowę kościoła, otrzymują wolności.", "Es un intercambio: los habitantes dan dinero para reconstruir la iglesia y reciben libertades."),
          L("Pour être sûr d'une information, je la vérifie sur deux sites.", "Щоб бути певним інформації, я перевіряю її на двох сайтах.", "Żeby być pewnym informacji, sprawdzam ją na dwóch stronach.", "Para estar seguro de una información, la compruebo en dos sitios.")
        ] } }
      ] },
    { id: "ma-collegiale",
      titre: L("Que nous raconte la collégiale de Huy ?", "Що розповідає колегіальна церква Юї?", "Co opowiada kolegiata w Huy?", "¿Qué nos cuenta la colegiata de Huy?"),
      objectif: L("Je lis un monument comme une trace : ses parties, ses dates, ses transformations.", "Я читаю пам'ятку як слід: її частини, дати, перебудови.", "Czytam zabytek jak ślad: jego części, daty, przebudowy.", "Leo un monumento como una huella: sus partes, sus fechas, sus transformaciones."),
      criteres: [
        crit("ma-monument", "Je repère un monument sur une gravure ancienne.", "Я знаходжу пам'ятку на старовинній гравюрі.", "Znajduję zabytek na dawnej rycinie.", "Encuentro un monumento en un grabado antiguo."),
        crit("ma-etapes", "Je range les étapes de la construction sur une frise.", "Я впорядковую етапи будівництва на стрічці часу.", "Układam etapy budowy na osi czasu.", "Ordeno las etapas de la construcción en una línea del tiempo."),
        crit("ma-rondia", "Je trouve sur Internet ce qu'est Li Rondia.", "Я знаходжу в інтернеті, що таке Лі Рондія.", "Znajduję w internecie, czym jest Li Rondia.", "Encuentro en Internet qué es Li Rondia.")
      ],
      etapes: [
        { type: "ressource", titre: L("Une église construite plusieurs fois", "Церква, яку будували кілька разів", "Kościół budowany kilka razy", "Una iglesia construida varias veces"),
          contenu: { textes: [
            L("Une collégiale est une grande église où prient ensemble plusieurs prêtres, les chanoines.", "Колегіальна церква — це великий храм, де разом моляться кілька священників, канонiки.", "Kolegiata to duży kościół, w którym modli się razem kilku księży, kanonicy.", "Una colegiata es una gran iglesia donde rezan juntos varios sacerdotes, los canónigos."),
            L("De l'église inaugurée en 1066, il reste surtout la crypte, une salle sous l'église.", "Від церкви, освяченої в 1066 році, залишилася переважно крипта — зала під церквою.", "Z kościoła poświęconego w 1066 roku została głównie krypta, sala pod kościołem.", "De la iglesia inaugurada en 1066 queda sobre todo la cripta, una sala bajo la iglesia."),
            L("En 1311, on commence une nouvelle collégiale, plus grande, de style gothique : hautes fenêtres, vitraux, une grande rosace. Les Hutois appellent cette rosace « Li Rondia ».", "У 1311 році починають нову, більшу колегіальну церкву в готичному стилі: високі вікна, вітражі, велика троянда. Мешканці Юї називають цю троянду «Лі Рондія».", "W 1311 roku zaczyna się budowę nowej, większej kolegiaty w stylu gotyckim: wysokie okna, witraże, wielka rozeta. Mieszkańcy Huy nazywają tę rozetę „Li Rondia”.", "En 1311 se empieza una nueva colegiata, más grande, de estilo gótico: ventanas altas, vidrieras, un gran rosetón. Los de Huy llaman a ese rosetón «Li Rondia»."),
            L("Avec li Pontia (le pont), li Bassinia (la fontaine) et li Tchestia (le château), c'est une des quatre « merveilles » de Huy.", "Разом із Лі Понтія (міст), Лі Басінія (фонтан) і Лі Честія (замок) це одне з чотирьох «див» Юї.", "Razem z li Pontia (most), li Bassinia (fontanna) i li Tchestia (zamek) to jeden z czterech „cudów” Huy.", "Con li Pontia (el puente), li Bassinia (la fuente) y li Tchestia (el castillo), es una de las cuatro «maravillas» de Huy.")
          ], docs: [DOC.collegiale, DOC.gravure] } },
        { type: "activite", activite: "ma-act-collegiale" },
        { type: "minitest", test: "test-ma-collegiale" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("La collégiale de Huy est reconstruite plusieurs fois : église de 1066 (il reste la crypte), puis collégiale gothique à partir de 1311.", "Колегіальну церкву Юї перебудовували кілька разів: церква 1066 року (залишилася крипта), потім готична колегіальна церква з 1311 року.", "Kolegiatę w Huy odbudowywano kilka razy: kościół z 1066 roku (została krypta), potem gotycka kolegiata od 1311 roku.", "La colegiata de Huy se reconstruye varias veces: iglesia de 1066 (queda la cripta) y luego colegiata gótica a partir de 1311."),
          L("Li Rondia, c'est la grande rosace de la collégiale.", "Лі Рондія — велика троянда колегіальної церкви.", "Li Rondia to wielka rozeta kolegiaty.", "Li Rondia es el gran rosetón de la colegiata."),
          L("Un monument est une trace qui change avec le temps : il faut chercher l'âge de chaque partie.", "Пам'ятка — це слід, що змінюється з часом: треба шукати вік кожної частини.", "Zabytek to ślad, który zmienia się z czasem: trzeba szukać wieku każdej części.", "Un monumento es una huella que cambia con el tiempo: hay que buscar la edad de cada parte.")
        ] } }
      ] },
    { id: "ma-chateau",
      titre: L("Où est passé le château de Huy ?", "Куди подівся замок Юї?", "Gdzie podział się zamek w Huy?", "¿Adónde fue el castillo de Huy?"),
      objectif: L("Je compare une gravure de 1595 et le fort d'aujourd'hui, et je range l'histoire de la colline sur une frise.", "Я порівнюю гравюру 1595 року й сучасний форт та впорядковую історію пагорба на стрічці часу.", "Porównuję rycinę z 1595 roku i dzisiejszy fort oraz układam historię wzgórza na osi czasu.", "Comparo un grabado de 1595 y el fuerte de hoy, y ordeno la historia de la colina en una línea del tiempo."),
      criteres: [
        crit("ma-comparer", "Je compare deux documents du même lieu à deux époques.", "Я порівнюю два документи про одне місце в різні епохи.", "Porównuję dwa dokumenty o tym samym miejscu w dwóch epokach.", "Comparo dos documentos del mismo lugar en dos épocas."),
        crit("ma-auteur", "Je dis qui a fait un document et dans quel camp il était.", "Я кажу, хто зробив документ і на чиєму боці він був.", "Mówię, kto zrobił dokument i po której był stronie.", "Digo quién hizo un documento y de qué lado estaba."),
        crit("ma-frise", "Je range l'histoire du château sur une frise.", "Я впорядковую історію замку на стрічці часу.", "Układam historię zamku na osi czasu.", "Ordeno la historia del castillo en una línea del tiempo.")
      ],
      etapes: [
        { type: "ressource", titre: L("Li Tchestia, le château disparu", "Лі Честія, зниклий замок", "Li Tchestia, zaginiony zamek", "Li Tchestia, el castillo desaparecido"),
          contenu: { textes: [
            L("Sur la colline au-dessus de Huy, il y avait un château fort : li Tchestia. Il est cité pour la première fois en 890. C'était une des résidences des princes-évêques de Liège.", "На пагорбі над Юї стояв замок — Лі Честія. Уперше його згадано в 890 році. Це була одна з резиденцій князів-єпископів Льєжа.", "Na wzgórzu nad Huy stał zamek: li Tchestia. Po raz pierwszy wspomniano go w 890 roku. Była to jedna z rezydencji książąt-biskupów Liège.", "En la colina encima de Huy había un castillo: li Tchestia. Se cita por primera vez en 890. Era una de las residencias de los príncipes-obispos de Lieja."),
            L("Pendant les guerres, le château est attaqué plusieurs fois. En 1717, un traité de paix exige sa destruction : les Hutois le démontent eux-mêmes, pierre par pierre.", "Під час воєн замок кілька разів атакують. У 1717 році мирний договір вимагає його знищити: мешканці Юї самі розбирають його камінь за каменем.", "W czasie wojen zamek był kilka razy atakowany. W 1717 roku traktat pokojowy nakazuje jego zburzenie: mieszkańcy Huy sami rozbierają go kamień po kamieniu.", "Durante las guerras, el castillo es atacado varias veces. En 1717, un tratado de paz exige su destrucción: los de Huy lo desmontan ellos mismos, piedra a piedra."),
            L("Plus de 100 ans plus tard, de 1818 à 1823, les Hollandais construisent un fort au même endroit. Du vieux château, il reste surtout un puits de 90 mètres de profondeur.", "Через понад 100 років, з 1818 по 1823 рік, голландці будують на тому ж місці форт. Від старого замку залишився переважно колодязь глибиною 90 метрів.", "Ponad 100 lat później, w latach 1818–1823, Holendrzy budują w tym samym miejscu fort. Ze starego zamku została głównie studnia o głębokości 90 metrów.", "Más de 100 años después, de 1818 a 1823, los holandeses construyen un fuerte en el mismo lugar. Del viejo castillo queda sobre todo un pozo de 90 metros de profundidad.")
          ], docs: [DOC.gravure, DOC.fort] } },
        { type: "activite", activite: "ma-act-chateau" },
        { type: "minitest", test: "test-ma-chateau" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Le château de Huy (li Tchestia) existe dès 890 ; il est démonté en 1717.", "Замок Юї (Лі Честія) існує з 890 року; його розібрали в 1717 році.", "Zamek w Huy (li Tchestia) istnieje od 890 roku; rozebrano go w 1717 roku.", "El castillo de Huy (li Tchestia) existe desde 890; se desmonta en 1717."),
          L("Le fort que l'on voit aujourd'hui n'est pas le château du Moyen Âge : il date de 1818-1823.", "Форт, який ми бачимо сьогодні, — не середньовічний замок: він датується 1818–1823 роками.", "Fort, który widzimy dziś, nie jest średniowiecznym zamkiem: pochodzi z lat 1818–1823.", "El fuerte que se ve hoy no es el castillo de la Edad Media: es de 1818-1823."),
          L("La gravure de 1595 a été faite par le camp vainqueur : elle peut être partiale.", "Гравюру 1595 року зробив бік переможців: вона може бути упередженою.", "Rycinę z 1595 roku zrobiła strona zwycięzców: może być stronnicza.", "El grabado de 1595 lo hizo el bando vencedor: puede ser parcial.")
        ] } }
      ] },
    { id: "ma-moha",
      titre: L("Pourquoi construire un château sur un rocher ? L'exemple de Moha", "Навіщо будувати замок на скелі? Приклад Моа", "Po co budować zamek na skale? Przykład Moha", "¿Por qué construir un castillo sobre una roca? El ejemplo de Moha"),
      objectif: L("J'observe des ruines, je cherche leur histoire sur Internet et je comprends la vie dans un château fort.", "Я розглядаю руїни, шукаю їхню історію в інтернеті й розумію життя в замку.", "Oglądam ruiny, szukam ich historii w internecie i rozumiem życie w zamku.", "Observo unas ruinas, busco su historia en Internet y entiendo la vida en un castillo."),
      criteres: [
        crit("ma-ruines", "J'observe des ruines et j'en tire des informations.", "Я розглядаю руїни й роблю висновки.", "Oglądam ruiny i wyciągam z nich informacje.", "Observo unas ruinas y saco información."),
        crit("ma-moha-recherche", "Je trouve sur un site l'histoire du château.", "Я знаходжу на сайті історію замку.", "Znajduję na stronie historię zamku.", "Encuentro en un sitio la historia del castillo."),
        crit("ma-defense", "J'explique comment un château protège.", "Я пояснюю, як замок захищає.", "Wyjaśniam, jak zamek chroni.", "Explico cómo protege un castillo.")
      ],
      etapes: [
        { type: "ressource", titre: L("Une forteresse au-dessus de la Mehaigne", "Фортеця над Мегенню", "Twierdza nad Mehaigne", "Una fortaleza sobre el Mehaigne"),
          contenu: { textes: [
            L("À Moha (commune de Wanze), à quelques kilomètres de Huy, les comtes de Moha construisent un château fort sur un rocher. Les ruines que l'on voit datent surtout des 12e et 14e siècles.", "У Моа (громада Ванзе), за кілька кілометрів від Юї, графи Моа будують замок на скелі. Руїни, які ми бачимо, переважно з XII і XIV століть.", "W Moha (gmina Wanze), kilka kilometrów od Huy, hrabiowie Moha budują zamek na skale. Ruiny, które widzimy, pochodzą głównie z XII i XIV wieku.", "En Moha (municipio de Wanze), a pocos kilómetros de Huy, los condes de Moha construyen un castillo sobre una roca. Las ruinas que se ven son sobre todo de los siglos XII y XIV."),
            L("Vers 1225, le château devient la propriété des princes-évêques de Liège. En 1376, il ne résiste pas à une attaque des Hutois.", "Близько 1225 року замок переходить у власність князів-єпископів Льєжа. У 1376 році він не витримує нападу мешканців Юї.", "Około 1225 roku zamek przechodzi na własność książąt-biskupów Liège. W 1376 roku nie wytrzymuje ataku mieszkańców Huy.", "Hacia 1225, el castillo pasa a ser propiedad de los príncipes-obispos de Lieja. En 1376 no resiste un ataque de los de Huy."),
            L("Depuis 1992, une association protège les ruines et les fait visiter.", "З 1992 року асоціація охороняє руїни й проводить екскурсії.", "Od 1992 roku stowarzyszenie chroni ruiny i oprowadza po nich.", "Desde 1992, una asociación protege las ruinas y organiza visitas.")
          ], docs: [DOC.moha] } },
        { type: "activite", activite: "ma-act-moha" },
        { type: "minitest", test: "test-ma-moha" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Un château fort sur un rocher se défend mieux : on voit venir l'ennemi et il est difficile d'y monter.", "Замок на скелі легше обороняти: видно ворога здалеку, і туди важко піднятися.", "Zamek na skale łatwiej obronić: widać nadchodzącego wroga i trudno się tam dostać.", "Un castillo sobre una roca se defiende mejor: se ve venir al enemigo y es difícil subir."),
          L("Le château de Moha est détruit par les Hutois en 1376.", "Замок Моа зруйнували мешканці Юї в 1376 році.", "Zamek w Moha został zniszczony przez mieszkańców Huy w 1376 roku.", "El castillo de Moha fue destruido por los de Huy en 1376."),
          L("Des ruines sont des traces : elles montrent comment on se protégeait au Moyen Âge.", "Руїни — це сліди: вони показують, як захищалися в середньовіччі.", "Ruiny to ślady: pokazują, jak broniono się w średniowieczu.", "Las ruinas son huellas: muestran cómo uno se protegía en la Edad Media.")
        ] } }
      ] }
  );

  /* ---------- Activités ---------- */
  D.activites.push(
    { id: "ma-act-charte", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("L'affaire de 1066", "Справа 1066 року", "Sprawa z 1066 roku", "El asunto de 1066"),
      objectif: L("Je situe, je comprends l'échange et je vérifie la date.", "Я знаходжу місце, розумію обмін і перевіряю дату.", "Znajduję miejsce, rozumiem wymianę i sprawdzam datę.", "Localizo, entiendo el intercambio y compruebo la fecha."),
      etapes: [
        CARTE(L("Huy fait partie de la principauté de Liège. TOUCHE le repère de Liège, la ville du prince-évêque (document N°1).", "Юї входить до Льєзького князівства. ТОРКНИСЯ позначки Льєжа, міста князя-єпископа (документ №1).", "Huy należy do księstwa Liège. DOTKNIJ znacznika Liège, miasta księcia-biskupa (dokument nr 1).", "Huy forma parte del principado de Lieja. TOCA la marca de Lieja, la ciudad del príncipe-obispo (documento N.º 1)."),
          BELGIQUE, [pt("bxl", 48, 34), pt("lie", 77, 44.5), pt("nam", 60.5, 52), pt("arl", 80, 84)], "lie",
          L("Oui ! Liège est à environ 30 km de Huy, en suivant la Meuse.", "Так! Льєж приблизно за 30 км від Юї, уздовж Маасу.", "Tak! Liège leży około 30 km od Huy, wzdłuż Mozy.", "¡Sí! Lieja está a unos 30 km de Huy, siguiendo el Mosa."),
          L("Pas encore. Trouve Huy, puis suis la Meuse vers l'est (à droite).", "Ще ні. Знайди Юї, потім іди вздовж Маасу на схід (праворуч).", "Jeszcze nie. Znajdź Huy, potem idź wzdłuż Mozy na wschód (w prawo).", "Todavía no. Busca Huy y sigue el Mosa hacia el este (a la derecha)."),
          [L("Les noms des villes sont écrits sur la carte.", "Назви міст підписано на карті.", "Nazwy miast są napisane na mapie.", "Los nombres de las ciudades están escritos en el mapa.")]),
        CLASSER(L("La charte est un échange. CLASSE : qu'est-ce que chacun DONNE ?", "Хартія — це обмін. РОЗПОДІЛИ: що кожен ДАЄ?", "Karta to wymiana. PRZYPORZĄDKUJ: co każdy DAJE?", "La carta es un intercambio. CLASIFICA: ¿qué DA cada uno?"),
          [{ id: "eveque", label: L("Le prince-évêque Théoduin donne…", "Князь-єпископ Теодуїн дає…", "Książę-biskup Teoduin daje…", "El príncipe-obispo Teoduino da…") }, { id: "hutois", label: L("Les habitants de Huy donnent…", "Мешканці Юї дають…", "Mieszkańcy Huy dają…", "Los habitantes de Huy dan…") }],
          [el("lib", "des libertés écrites dans une charte", "свободи, записані в хартії", "wolności zapisane w karcie", "libertades escritas en una carta", "eveque"),
           el("prot", "un texte officiel qui les protège", "офіційний текст, що їх захищає", "oficjalny tekst, który ich chroni", "un texto oficial que los protege", "eveque"),
           el("moitie", "la moitié de leurs biens", "половину свого майна", "połowę swojego majątku", "la mitad de sus bienes", "hutois"),
           el("argent", "l'argent pour reconstruire l'église", "гроші на відбудову церкви", "pieniądze na odbudowę kościoła", "el dinero para reconstruir la iglesia", "hutois")],
          L("Bravo ! Chacun y gagne : c'est un « don contre-don ».", "Молодець! Кожен виграє: це «дар за дар».", "Brawo! Każdy zyskuje: to „dar za dar”.", "¡Bien! Cada uno gana algo: es un «don y contradón»."),
          L("Pas encore. Qui a besoin d'argent ? Qui veut des libertés ?", "Ще ні. Кому потрібні гроші? Хто хоче свобод?", "Jeszcze nie. Kto potrzebuje pieniędzy? Kto chce wolności?", "Todavía no. ¿Quién necesita dinero? ¿Quién quiere libertades?"),
          [L("Relis la 3e phrase de la leçon.", "Перечитай третє речення уроку.", "Przeczytaj jeszcze raz trzecie zdanie lekcji.", "Vuelve a leer la 3.ª frase de la lección.")]),
        CHOIX("VÉRIFIE", L("VÉRIFIE la date sur deux sites. Tape « charte de Huy 1066 » dans un moteur de recherche et ouvre DEUX résultats sérieux. CHOISIS la date exacte que tu trouves.", "ПЕРЕВІР дату на двох сайтах. Набери «charte de Huy 1066» у пошуковику й відкрий ДВА серйозні результати. ВИБЕРИ точну дату, яку знайдеш.", "SPRAWDŹ datę na dwóch stronach. Wpisz „charte de Huy 1066” w wyszukiwarce i otwórz DWA poważne wyniki. WYBIERZ dokładną datę, którą znajdziesz.", "COMPRUEBA la fecha en dos sitios. Escribe «charte de Huy 1066» en un buscador y abre DOS resultados serios. ELIGE la fecha exacta que encuentres."),
          [opt("a", "1er janvier 1066", "1 січня 1066", "1 stycznia 1066", "1 de enero de 1066"), opt("b", "27 août 1066", "27 серпня 1066", "27 sierpnia 1066", "27 de agosto de 1066", true), opt("c", "14 juillet 1789", "14 липня 1789", "14 lipca 1789", "14 de julio de 1789")],
          L("Oui ! 27 août 1066. Si deux sites sérieux donnent la même date, on peut lui faire confiance.", "Так! 27 серпня 1066. Якщо два серйозні сайти дають ту саму дату, їй можна довіряти.", "Tak! 27 sierpnia 1066. Jeśli dwie poważne strony podają tę samą datę, można jej ufać.", "¡Sí! 27 de agosto de 1066. Si dos sitios serios dan la misma fecha, se puede confiar en ella."),
          L("Pas encore. Cherche le jour et le mois dans les résultats.", "Ще ні. Шукай день і місяць у результатах.", "Jeszcze nie. Szukaj dnia i miesiąca w wynikach.", "Todavía no. Busca el día y el mes en los resultados."),
          [L("La date est aussi dans le texte de la leçon.", "Дата є й у тексті уроку.", "Data jest też w tekście lekcji.", "La fecha también está en el texto de la lección.")]),
        ECRIRE("EXPLIQUE", L("EXPLIQUE avec tes mots : pourquoi les habitants de Huy acceptent-ils de donner autant d'argent ?", "ПОЯСНИ своїми словами: чому мешканці Юї погоджуються дати стільки грошей?", "WYJAŚNIJ własnymi słowami: dlaczego mieszkańcy Huy zgadzają się dać tyle pieniędzy?", "EXPLICA con tus palabras: ¿por qué los habitantes de Huy aceptan dar tanto dinero?"),
          ["Les habitants de Huy donnent de l'argent parce que", "En échange, ils reçoivent", "Pour eux, c'est important car"], "Les habitants de Huy donnent de l'argent parce que…",
          [L("Pense à ce qu'ils reçoivent : être plus libres, être protégés par un texte.", "Подумай, що вони отримують: більше свободи, захист офіційним текстом.", "Pomyśl, co otrzymują: więcej wolności, ochronę przez tekst.", "Piensa en lo que reciben: ser más libres, estar protegidos por un texto.")]),
        AUTO("CHOISIS : est-ce que tu sais expliquer la charte de 1066 et vérifier une date ?", "ВИБЕРИ: чи вмієш ти пояснити хартію 1066 року й перевірити дату?", "WYBIERZ: czy umiesz wyjaśnić kartę z 1066 roku i sprawdzić datę?", "ELIGE: ¿sabes explicar la carta de 1066 y comprobar una fecha?")
      ] },

    { id: "ma-act-collegiale", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Lire un monument", "Читати пам'ятку", "Czytać zabytek", "Leer un monumento"),
      objectif: L("Je repère la collégiale, je range ses étapes et je trouve Li Rondia.", "Я знаходжу колегіальну церкву, впорядковую її етапи й знаходжу Лі Рондію.", "Znajduję kolegiatę, układam jej etapy i znajduję Li Rondię.", "Encuentro la colegiata, ordeno sus etapas y encuentro Li Rondia."),
      etapes: [
        CARTE(L("Sur la gravure de 1595 (document N°2), TOUCHE la collégiale : la grande église avec un clocher pointu, au milieu de la ville.", "На гравюрі 1595 року (документ №2) ТОРКНИСЯ колегіальної церкви: великий храм із гострою дзвіницею посеред міста.", "Na rycinie z 1595 roku (dokument nr 2) DOTKNIJ kolegiaty: dużego kościoła ze spiczastą wieżą w środku miasta.", "En el grabado de 1595 (documento N.º 2), TOCA la colegiata: la gran iglesia con un campanario puntiagudo, en el medio de la ciudad."),
          GRAVURE, PTS_GRAVURE, "collegiale",
          L("Oui ! En 1595, la collégiale gothique est déjà là, au pied de la colline.", "Так! У 1595 році готична колегіальна церква вже стоїть біля підніжжя пагорба.", "Tak! W 1595 roku gotycka kolegiata już stoi u stóp wzgórza.", "¡Sí! En 1595 la colegiata gótica ya está ahí, al pie de la colina."),
          L("Pas encore. Cherche le clocher le plus haut et le plus pointu, entre le château et le pont.", "Ще ні. Шукай найвищу й найгострішу дзвіницю між замком і мостом.", "Jeszcze nie. Szukaj najwyższej i najbardziej spiczastej wieży między zamkiem a mostem.", "Todavía no. Busca el campanario más alto y puntiagudo, entre el castillo y el puente."),
          [L("Le château est tout en haut. La collégiale est en dessous.", "Замок — на самій горі. Колегіальна церква — нижче.", "Zamek jest na samej górze. Kolegiata jest poniżej.", "El castillo está arriba del todo. La colegiata está debajo.")]),
        ORDRE(L("RANGE l'histoire de la collégiale. TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", "РОЗТАШУЙ історію колегіальної церкви. ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", "UŁÓŻ historię kolegiaty. DOTYKAJ kart po kolei: 1., potem 2.…", "ORDENA la historia de la colegiata. TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…"),
          [el("c1", "Le comte de Flandre détruit l'église (1053)", "Граф Фландрії руйнує церкву (1053)", "Hrabia Flandrii niszczy kościół (1053)", "El conde de Flandes destruye la iglesia (1053)"),
           el("c2", "Nouvelle église inaugurée et charte (1066)", "Освячення нової церкви й хартія (1066)", "Poświęcenie nowego kościoła i karta (1066)", "Nueva iglesia inaugurada y carta (1066)"),
           el("c3", "Début de la collégiale gothique (1311)", "Початок готичної колегіальної церкви (1311)", "Początek gotyckiej kolegiaty (1311)", "Comienzo de la colegiata gótica (1311)"),
           el("c4", "La gravure montre la collégiale (1595)", "Гравюра показує колегіальну церкву (1595)", "Rycina pokazuje kolegiatę (1595)", "El grabado muestra la colegiata (1595)"),
           el("c5", "Photo de la collégiale depuis le fort (2021)", "Фото колегіальної церкви з форту (2021)", "Zdjęcie kolegiaty z fortu (2021)", "Foto de la colegiata desde el fuerte (2021)")],
          L("Bravo ! Un même monument traverse presque 1000 ans.", "Молодець! Одна пам'ятка існує майже 1000 років.", "Brawo! Ten sam zabytek przetrwał prawie 1000 lat.", "¡Bien! Un mismo monumento atraviesa casi 1000 años."),
          L("Pas encore. Commence par la date la plus petite : 1053.", "Ще ні. Почни з найменшої дати: 1053.", "Jeszcze nie. Zacznij od najmniejszej daty: 1053.", "Todavía no. Empieza por la fecha más pequeña: 1053."),
          [L("Toutes ces dates sont après J.-C. : la plus petite est la plus ancienne.", "Усі ці дати — після Р. Х.: найменша — найдавніша.", "Wszystkie te daty są po Chrystusie: najmniejsza jest najdawniejsza.", "Todas estas fechas son después de Cristo: la más pequeña es la más antigua.")]),
        CHOIX("CHERCHE", L("RECHERCHE : tape « Li Rondia Huy » dans un moteur de recherche. CHERCHE : qu'est-ce que Li Rondia ?", "ПОШУК: набери «Li Rondia Huy» у пошуковику. ЗНАЙДИ: що таке Лі Рондія?", "WYSZUKIWANIE: wpisz „Li Rondia Huy” w wyszukiwarce. ZNAJDŹ: czym jest Li Rondia?", "BÚSQUEDA: escribe «Li Rondia Huy» en un buscador. BUSCA: ¿qué es Li Rondia?"),
          [opt("a", "le pont sur la Meuse", "міст через Маас", "most na Mozie", "el puente sobre el Mosa"), opt("b", "la grande rosace (vitrail rond) de la collégiale", "велика троянда (кругле вікно-вітраж) колегіальної церкви", "wielka rozeta (okrągły witraż) kolegiaty", "el gran rosetón (vidriera redonda) de la colegiata", true), opt("c", "le château", "замок", "zamek", "el castillo")],
          L("Oui ! Li Rondia, en wallon, c'est « la ronde » : la grande rosace.", "Так! Лі Рондія валлонською — «кругла»: велика троянда.", "Tak! Li Rondia po walońsku to „okrągła”: wielka rozeta.", "¡Sí! Li Rondia, en valón, es «la redonda»: el gran rosetón."),
          L("Pas encore. Indice : « rond »…", "Ще ні. Підказка: «rond» (круглий)…", "Jeszcze nie. Wskazówka: „rond” (okrągły)…", "Todavía no. Pista: «rond» (redondo)…"),
          [L("Le pont, c'est li Pontia ; le château, li Tchestia.", "Міст — це Лі Понтія; замок — Лі Честія.", "Most to li Pontia; zamek to li Tchestia.", "El puente es li Pontia; el castillo, li Tchestia.")]),
        CHOIX("CHOISIS", L("CHOISIS : de l'église de 1066, qu'est-ce qui reste aujourd'hui ?", "ВИБЕРИ: що залишилося сьогодні від церкви 1066 року?", "WYBIERZ: co zostało dziś z kościoła z 1066 roku?", "ELIGE: ¿qué queda hoy de la iglesia de 1066?"),
          [opt("a", "tout le bâtiment", "уся будівля", "cały budynek", "todo el edificio"), opt("b", "rien du tout", "зовсім нічого", "zupełnie nic", "nada en absoluto"), opt("c", "surtout la crypte, sous l'église", "переважно крипта під церквою", "głównie krypta pod kościołem", "sobre todo la cripta, bajo la iglesia", true)],
          L("Oui ! Un monument mélange souvent des parties de plusieurs époques.", "Так! Пам'ятка часто поєднує частини різних епох.", "Tak! Zabytek często łączy części z różnych epok.", "¡Sí! Un monumento a menudo mezcla partes de varias épocas."),
          L("Pas encore. Relis la 2e phrase de la leçon.", "Ще ні. Перечитай друге речення уроку.", "Jeszcze nie. Przeczytaj jeszcze raz drugie zdanie lekcji.", "Todavía no. Vuelve a leer la 2.ª frase de la lección."),
          [L("Une crypte = une salle sous une église.", "Крипта = зала під церквою.", "Krypta = sala pod kościołem.", "Una cripta = una sala bajo una iglesia.")]),
        AUTO("CHOISIS : est-ce que tu sais lire un monument comme une trace du passé ?", "ВИБЕРИ: чи вмієш ти читати пам'ятку як слід минулого?", "WYBIERZ: czy umiesz czytać zabytek jak ślad przeszłości?", "ELIGE: ¿sabes leer un monumento como una huella del pasado?")
      ] },

    { id: "ma-act-chateau", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Avant / après sur la colline", "До / після на пагорбі", "Przed / po na wzgórzu", "Antes / después en la colina"),
      objectif: L("Je compare deux documents, je critique l'auteur et je range la frise.", "Я порівнюю два документи, аналізую автора й упорядковую стрічку часу.", "Porównuję dwa dokumenty, analizuję autora i układam oś czasu.", "Comparo dos documentos, analizo al autor y ordeno la línea del tiempo."),
      etapes: [
        CARTE(L("Sur la gravure (document N°2), TOUCHE le château, li Tchestia.", "На гравюрі (документ №2) ТОРКНИСЯ замку Лі Честія.", "Na rycinie (dokument nr 2) DOTKNIJ zamku, li Tchestia.", "En el grabado (documento N.º 2), TOCA el castillo, li Tchestia."),
          GRAVURE, PTS_GRAVURE, "chateau",
          L("Oui ! En 1595, un vrai château fort, avec des tours, domine la ville.", "Так! У 1595 році над містом височіє справжній замок із вежами.", "Tak! W 1595 roku nad miastem góruje prawdziwy zamek z wieżami.", "¡Sí! En 1595, un verdadero castillo con torres domina la ciudad."),
          L("Pas encore. Regarde tout en haut de la colline.", "Ще ні. Подивись на саму вершину пагорба.", "Jeszcze nie. Spójrz na sam szczyt wzgórza.", "Todavía no. Mira arriba del todo de la colina."),
          [L("Un château a des tours et des murs épais.", "Замок має вежі й товсті стіни.", "Zamek ma wieże i grube mury.", "Un castillo tiene torres y muros gruesos.")]),
        CLASSER(L("COMPARE la gravure de 1595 (document N°2) et le fort d'aujourd'hui (document N°4). CLASSE chaque phrase.", "ПОРІВНЯЙ гравюру 1595 року (документ №2) і сучасний форт (документ №4). РОЗПОДІЛИ кожне речення.", "PORÓWNAJ rycinę z 1595 roku (dokument nr 2) i dzisiejszy fort (dokument nr 4). PRZYPORZĄDKUJ każde zdanie.", "COMPARA el grabado de 1595 (documento N.º 2) y el fuerte de hoy (documento N.º 4). CLASIFICA cada frase."),
          [{ id: "ch", label: L("Le château (1595)", "Замок (1595)", "Zamek (1595)", "El castillo (1595)") }, { id: "fo", label: L("Le fort (1818-1823)", "Форт (1818–1823)", "Fort (1818–1823)", "El fuerte (1818-1823)") }, { id: "deux", label: L("Les deux", "Обидва", "Oba", "Los dos") }],
          [el("tours", "Il a des tours pointues avec des toits.", "Він має гострі вежі з дахами.", "Ma spiczaste wieże z dachami.", "Tiene torres puntiagudas con tejados.", "ch"),
           el("plat", "Il a des murs droits et plats, sans toits pointus.", "Він має прямі рівні стіни без гострих дахів.", "Ma proste, płaskie mury bez spiczastych dachów.", "Tiene muros rectos y planos, sin tejados puntiagudos.", "fo"),
           el("colline", "Il est sur la colline au-dessus de Huy.", "Він стоїть на пагорбі над Юї.", "Stoi na wzgórzu nad Huy.", "Está en la colina encima de Huy.", "deux"),
           el("eveque", "C'est une résidence des princes-évêques.", "Це резиденція князів-єпископів.", "To rezydencja książąt-biskupów.", "Es una residencia de los príncipes-obispos.", "ch"),
           el("holl", "Il est construit par les Hollandais.", "Його збудували голландці.", "Zbudowali go Holendrzy.", "Lo construyen los holandeses.", "fo"),
           el("defense", "Il sert à défendre la ville et la Meuse.", "Він служить для захисту міста й Маасу.", "Służy do obrony miasta i Mozy.", "Sirve para defender la ciudad y el Mosa.", "deux")],
          L("Bravo ! Même endroit, même rôle de défense, mais deux constructions différentes.", "Молодець! Те саме місце, та сама оборонна роль, але дві різні споруди.", "Brawo! To samo miejsce, ta sama rola obronna, ale dwie różne budowle.", "¡Bien! Mismo lugar, mismo papel de defensa, pero dos construcciones diferentes."),
          L("Pas encore. Regarde bien les deux images et relis les légendes.", "Ще ні. Уважно подивись на обидва зображення й перечитай підписи.", "Jeszcze nie. Przyjrzyj się obu obrazom i przeczytaj podpisy.", "Todavía no. Mira bien las dos imágenes y vuelve a leer las leyendas."),
          [L("« Les deux » = vrai pour le château ET pour le fort.", "«Обидва» = правда і для замку, І для форту.", "„Oba” = prawda dla zamku I dla fortu.", "«Los dos» = verdad para el castillo Y para el fuerte.")]),
        CHOIX("CRITIQUE", L("CRITIQUE la gravure : elle a été faite aux Pays-Bas, le pays de l'armée qui a pris Huy en 1595. Que faut-il en penser ?", "ПРОАНАЛІЗУЙ гравюру: її зроблено в Нідерландах, країні армії, що захопила Юї в 1595 році. Що про це думати?", "PRZEANALIZUJ rycinę: zrobiono ją w Niderlandach, kraju armii, która zdobyła Huy w 1595 roku. Co o tym myśleć?", "ANALIZA el grabado: se hizo en los Países Bajos, el país del ejército que tomó Huy en 1595. ¿Qué hay que pensar?"),
          [opt("a", "Elle est forcément fausse.", "Вона обов'язково неправдива.", "Na pewno jest fałszywa.", "Seguro que es falso."), opt("b", "Elle montre la victoire du camp vainqueur : utile, mais elle peut être partiale.", "Вона показує перемогу переможців: корисна, але може бути упередженою.", "Pokazuje zwycięstwo zwycięzców: przydatna, ale może być stronnicza.", "Muestra la victoria del bando vencedor: útil, pero puede ser parcial.", true), opt("c", "C'est une photo, donc c'est exact.", "Це фото, тож точне.", "To zdjęcie, więc jest dokładne.", "Es una foto, así que es exacto.")],
          L("Oui ! Un document n'est ni vrai ni faux d'office : on se demande QUI l'a fait et POURQUOI.", "Так! Документ не є автоматично правдивим чи хибним: питаємо, ХТО його зробив і НАВІЩО.", "Tak! Dokument nie jest z góry prawdziwy ani fałszywy: pytamy, KTO go zrobił i PO CO.", "¡Sí! Un documento no es verdadero ni falso de entrada: nos preguntamos QUIÉN lo hizo y POR QUÉ."),
          L("Pas encore. En 1595, la photo n'existe pas. Et l'auteur est du côté des vainqueurs.", "Ще ні. У 1595 році фотографії не існує. А автор — на боці переможців.", "Jeszcze nie. W 1595 roku nie ma fotografii. A autor jest po stronie zwycięzców.", "Todavía no. En 1595 la fotografía no existe. Y el autor está del lado de los vencedores."),
          [L("Les vainqueurs aiment montrer leurs victoires.", "Переможці люблять показувати свої перемоги.", "Zwycięzcy lubią pokazywać swoje zwycięstwa.", "A los vencedores les gusta mostrar sus victorias.")]),
        ORDRE(L("RANGE l'histoire de la colline de Huy. TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", "РОЗТАШУЙ історію пагорба Юї. ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", "UŁÓŻ historię wzgórza w Huy. DOTYKAJ kart po kolei: 1., potem 2.…", "ORDENA la historia de la colina de Huy. TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…"),
          [el("h1", "Le château est cité pour la 1re fois (890)", "Замок уперше згадано (890)", "Pierwsza wzmianka o zamku (890)", "El castillo se cita por 1.ª vez (890)"),
           el("h2", "Prise de Huy par l'armée des Pays-Bas (1595)", "Захоплення Юї нідерландською армією (1595)", "Zdobycie Huy przez armię Niderlandów (1595)", "Toma de Huy por el ejército de los Países Bajos (1595)"),
           el("h3", "Les Hutois démontent le château (1717)", "Мешканці Юї розбирають замок (1717)", "Mieszkańcy Huy rozbierają zamek (1717)", "Los de Huy desmontan el castillo (1717)"),
           el("h4", "Les Hollandais construisent le fort (1818-1823)", "Голландці будують форт (1818–1823)", "Holendrzy budują fort (1818–1823)", "Los holandeses construyen el fuerte (1818-1823)"),
           el("h5", "Le fort devient une prison allemande (1940-1944)", "Форт стає німецькою в'язницею (1940–1944)", "Fort staje się niemieckim więzieniem (1940–1944)", "El fuerte se convierte en una prisión alemana (1940-1944)")],
          L("Bravo ! Plus de 1000 ans d'histoire sur une seule colline.", "Молодець! Понад 1000 років історії на одному пагорбі.", "Brawo! Ponad 1000 lat historii na jednym wzgórzu.", "¡Bien! Más de 1000 años de historia en una sola colina."),
          L("Pas encore. Range les dates de la plus petite à la plus grande.", "Ще ні. Упорядкуй дати від найменшої до найбільшої.", "Jeszcze nie. Ułóż daty od najmniejszej do największej.", "Todavía no. Ordena las fechas de la más pequeña a la más grande."),
          [L("890 est la date la plus ancienne.", "890 — найдавніша дата.", "890 to najdawniejsza data.", "890 es la fecha más antigua.")]),
        AUTO("CHOISIS : est-ce que tu sais comparer deux documents et critiquer leur auteur ?", "ВИБЕРИ: чи вмієш ти порівнювати два документи й аналізувати їхнього автора?", "WYBIERZ: czy umiesz porównać dwa dokumenty i przeanalizować ich autora?", "ELIGE: ¿sabes comparar dos documentos y analizar a su autor?")
      ] },

    { id: "ma-act-moha", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Mission au château de Moha", "Місія в замку Моа", "Misja w zamku Moha", "Misión en el castillo de Moha"),
      objectif: L("J'observe les ruines, je fais une recherche et j'explique la défense d'un château.", "Я розглядаю руїни, шукаю інформацію й пояснюю оборону замку.", "Oglądam ruiny, szukam informacji i wyjaśniam obronę zamku.", "Observo las ruinas, hago una búsqueda y explico la defensa de un castillo."),
      etapes: [
        CARTE(L("Sur la photo des ruines (document N°5), TOUCHE ce sur quoi le château est construit.", "На фото руїн (документ №5) ТОРКНИСЯ того, на чому збудовано замок.", "Na zdjęciu ruin (dokument nr 5) DOTKNIJ tego, na czym zbudowano zamek.", "En la foto de las ruinas (documento N.º 5), TOCA aquello sobre lo que está construido el castillo."),
          IMG + "ma-moha.jpg", [pt("mur", 26, 41), pt("tour", 72, 47), pt("rocher", 39, 79), pt("drapeau", 75, 26)], "rocher",
          L("Oui ! Le château est posé sur un grand rocher, une falaise de calcaire.", "Так! Замок стоїть на великій скелі — вапняковій кручі.", "Tak! Zamek stoi na wielkiej skale, wapiennym urwisku.", "¡Sí! El castillo está sobre una gran roca, un acantilado de caliza."),
          L("Pas encore. Regarde sous les murs.", "Ще ні. Подивись під стінами.", "Jeszcze nie. Spójrz pod mury.", "Todavía no. Mira debajo de los muros."),
          [L("Le mur et la tour sont construits PAR-DESSUS quelque chose.", "Стіна й вежа збудовані ПОВЕРХ чогось.", "Mur i wieża są zbudowane NA czymś.", "El muro y la torre están construidos ENCIMA de algo.")]),
        CHOIX("CHOISIS", L("CHOISIS : pourquoi construire un château sur un rocher ?", "ВИБЕРИ: навіщо будувати замок на скелі?", "WYBIERZ: po co budować zamek na skale?", "ELIGE: ¿por qué construir un castillo sobre una roca?"),
          [opt("a", "Pour voir venir l'ennemi et être difficile à attaquer.", "Щоб бачити ворога здалеку й щоб на замок було важко напасти.", "Żeby widzieć nadchodzącego wroga i być trudnym do zaatakowania.", "Para ver venir al enemigo y ser difícil de atacar.", true), opt("b", "Parce que la vue est jolie pour les touristes.", "Бо гарний краєвид для туристів.", "Bo widok jest ładny dla turystów.", "Porque la vista es bonita para los turistas."), opt("c", "Parce qu'il n'y avait pas de place en bas.", "Бо внизу не було місця.", "Bo na dole nie było miejsca.", "Porque no había sitio abajo.")],
          L("Oui ! En hauteur, on surveille la vallée, et les ennemis doivent grimper.", "Так! Згори видно долину, а ворогам доводиться дертися вгору.", "Tak! Z wysoka pilnuje się doliny, a wrogowie muszą się wspinać.", "¡Sí! En lo alto se vigila el valle, y los enemigos tienen que trepar."),
          L("Pas encore. Pense à la guerre, pas aux vacances.", "Ще ні. Подумай про війну, а не про відпочинок.", "Jeszcze nie. Pomyśl o wojnie, nie o wakacjach.", "Todavía no. Piensa en la guerra, no en las vacaciones."),
          [L("Au Moyen Âge, il y a beaucoup de guerres entre seigneurs.", "У середньовіччі між сеньйорами багато воєн.", "W średniowieczu jest wiele wojen między panami.", "En la Edad Media hay muchas guerras entre señores.")]),
        CHOIX("CHERCHE", L("RECHERCHE : ouvre la page « Histoire » du site du château de Moha. CHERCHE : en quelle année les Hutois détruisent-ils le château ?", "ПОШУК: відкрий сторінку «Histoire» на сайті замку Моа. ЗНАЙДИ: у якому році мешканці Юї руйнують замок?", "WYSZUKIWANIE: otwórz stronę „Histoire” na stronie zamku Moha. ZNAJDŹ: w którym roku mieszkańcy Huy niszczą zamek?", "BÚSQUEDA: abre la página «Histoire» del sitio del castillo de Moha. BUSCA: ¿en qué año destruyen el castillo los de Huy?"),
          [opt("a", "1066", "1066", "1066", "1066"), opt("b", "1376", "1376", "1376", "1376", true), opt("c", "1830", "1830", "1830", "1830")],
          L("Oui ! En 1376. Les Hutois et le château de Moha étaient souvent en conflit.", "Так! У 1376 році. Мешканці Юї та замок Моа часто ворогували.", "Tak! W 1376 roku. Mieszkańcy Huy i zamek Moha często byli w konflikcie.", "¡Sí! En 1376. Los de Huy y el castillo de Moha estaban a menudo en conflicto."),
          L("Pas encore. Cherche « 1376 » ou « Hutois » sur la page.", "Ще ні. Шукай «1376» або «Hutois» на сторінці.", "Jeszcze nie. Szukaj „1376” albo „Hutois” na stronie.", "Todavía no. Busca «1376» o «Hutois» en la página."),
          [L("Si le site ne s'ouvre pas, relis la leçon : la date y est.", "Якщо сайт не відкривається, перечитай урок: дата там є.", "Jeśli strona się nie otwiera, przeczytaj lekcję: data tam jest.", "Si el sitio no se abre, vuelve a leer la lección: la fecha está ahí.")],
          { lien: { url: "https://chateaumoha.be/histoire", site: "chateaumoha.be (association des Amis du château féodal de Moha)", label: L("Ouvrir l'histoire du château de Moha", "Відкрити історію замку Моа", "Otwórz historię zamku Moha", "Abrir la historia del castillo de Moha") } }),
        ECRIRE("IMAGINE", L("IMAGINE : tu es un guetteur en haut de la tour de Moha en 1376. Tu vois arriver les Hutois. DÉCRIS ce que tu vois et ce que tu fais.", "УЯВИ: ти вартовий на вежі Моа в 1376 році. Ти бачиш, як наближаються мешканці Юї. ОПИШИ, що ти бачиш і що робиш.", "WYOBRAŹ SOBIE: jesteś strażnikiem na wieży w Moha w 1376 roku. Widzisz nadchodzących mieszkańców Huy. OPISZ, co widzisz i co robisz.", "IMAGINA: eres un vigía en lo alto de la torre de Moha en 1376. Ves llegar a los de Huy. DESCRIBE lo que ves y lo que haces."),
          ["Du haut de la tour, je vois", "Je préviens", "Nous nous défendons avec"], "Du haut de la tour, je vois arriver…",
          [L("Utilise ce que tu as appris : la tour, le rocher, les murs, la vallée.", "Використай те, що дізнався(-лася): вежа, скеля, стіни, долина.", "Wykorzystaj to, czego się nauczyłeś/nauczyłaś: wieża, skała, mury, dolina.", "Usa lo que has aprendido: la torre, la roca, los muros, el valle.")]),
        AUTO("CHOISIS : est-ce que tu sais expliquer comment un château fort protège ?", "ВИБЕРИ: чи вмієш ти пояснити, як захищає замок?", "WYBIERZ: czy umiesz wyjaśnić, jak zamek chroni?", "ELIGE: ¿sabes explicar cómo protege un castillo?")
      ] }
  );

  /* ---------- Mini-tests et test de fin ---------- */
  P.tests.push(
    { id: "test-ma-charte", titre: L("Mini-test : la charte de 1066", "Міні-тест: хартія 1066 року", "Mini-test: karta z 1066 roku", "Mini-prueba: la carta de 1066"),
      questions: [
        Q("ma-echange", L("CHOISIS : qui accorde la charte de Huy ?", "ВИБЕРИ: хто надає хартію Юї?", "WYBIERZ: kto nadaje kartę Huy?", "ELIGE: ¿quién concede la carta de Huy?"),
          [o("le roi des Belges", "король бельгійців", "król Belgów", "el rey de los belgas"), o("le prince-évêque Théoduin", "князь-єпископ Теодуїн", "książę-biskup Teoduin", "el príncipe-obispo Teoduino", true), o("Jules César", "Юлій Цезар", "Juliusz Cezar", "Julio César")],
          L("Théoduin, prince-évêque de Liège.", "Теодуїн, князь-єпископ Льєжа.", "Teoduin, książę-biskup Liège.", "Teoduino, príncipe-obispo de Lieja.")),
        Q("ma-echange", L("CHOISIS : en échange, les habitants de Huy donnent…", "ВИБЕРИ: натомість мешканці Юї дають…", "WYBIERZ: w zamian mieszkańcy Huy dają…", "ELIGE: a cambio, los habitantes de Huy dan…"),
          [o("des soldats", "солдатів", "żołnierzy", "soldados"), o("leur château", "свій замок", "swój zamek", "su castillo"), o("la moitié de leurs biens", "половину свого майна", "połowę swojego majątku", "la mitad de sus bienes", true)],
          L("Pour reconstruire l'église.", "Щоб відбудувати церкву.", "Żeby odbudować kościół.", "Para reconstruir la iglesia.")),
        Q("ma-verifier", L("CHOISIS : comment être plus sûr d'une date trouvée sur Internet ?", "ВИБЕРИ: як бути певнішим у даті, знайденій в інтернеті?", "WYBIERZ: jak być pewniejszym daty znalezionej w internecie?", "ELIGE: ¿cómo estar más seguro de una fecha encontrada en Internet?"),
          [o("La vérifier sur un 2e site sérieux.", "Перевірити її на другому серйозному сайті.", "Sprawdzić ją na drugiej poważnej stronie.", "Comprobarla en un 2.º sitio serio.", true), o("Prendre le premier résultat.", "Узяти перший результат.", "Wziąć pierwszy wynik.", "Tomar el primer resultado."), o("Demander à un ami au hasard.", "Спитати випадкового друга.", "Zapytać przypadkowego kolegę.", "Preguntar a un amigo al azar.")],
          L("Deux sources sérieuses d'accord = plus de confiance.", "Два серйозні джерела, що збігаються = більше довіри.", "Dwa zgodne poważne źródła = więcej zaufania.", "Dos fuentes serias de acuerdo = más confianza."))
      ] },
    { id: "test-ma-collegiale", titre: L("Mini-test : la collégiale", "Міні-тест: колегіальна церква", "Mini-test: kolegiata", "Mini-prueba: la colegiata"),
      questions: [
        Q("ma-etapes", L("CHOISIS : la collégiale gothique est commencée en…", "ВИБЕРИ: готичну колегіальну церкву почали в…", "WYBIERZ: gotycką kolegiatę zaczęto budować w…", "ELIGE: la colegiata gótica se empieza en…"),
          [o("1066", "1066", "1066", "1066"), o("1311", "1311", "1311", "1311", true), o("1818", "1818", "1818", "1818")],
          L("1311 ; l'église de 1066 était plus ancienne.", "1311; церква 1066 року була давнішою.", "1311; kościół z 1066 roku był starszy.", "1311; la iglesia de 1066 era más antigua.")),
        Q("ma-rondia", L("CHOISIS : Li Rondia, c'est…", "ВИБЕРИ: Лі Рондія — це…", "WYBIERZ: Li Rondia to…", "ELIGE: Li Rondia es…"),
          [o("la grande rosace de la collégiale", "велика троянда колегіальної церкви", "wielka rozeta kolegiaty", "el gran rosetón de la colegiata", true), o("le fort", "форт", "fort", "el fuerte"), o("la fontaine", "фонтан", "fontanna", "la fuente")],
          L("La fontaine, c'est li Bassinia.", "Фонтан — це Лі Басінія.", "Fontanna to li Bassinia.", "La fuente es li Bassinia.")),
        Q("ma-monument", L("CHOISIS : la collégiale est…", "ВИБЕРИ: колегіальна церква —…", "WYBIERZ: kolegiata to…", "ELIGE: la colegiata es…"),
          [o("une grande église", "великий храм", "duży kościół", "una gran iglesia", true), o("un château", "замок", "zamek", "un castillo"), o("un pont", "міст", "most", "un puente")],
          L("Une grande église où prient les chanoines.", "Великий храм, де моляться каноніки.", "Duży kościół, w którym modlą się kanonicy.", "Una gran iglesia donde rezan los canónigos."), DOC.collegiale)
      ] },
    { id: "test-ma-chateau", titre: L("Mini-test : le château de Huy", "Міні-тест: замок Юї", "Mini-test: zamek w Huy", "Mini-prueba: el castillo de Huy"),
      questions: [
        Q("ma-comparer", L("CHOISIS : le fort de Huy d'aujourd'hui date de…", "ВИБЕРИ: сучасний форт Юї датується…", "WYBIERZ: dzisiejszy fort w Huy pochodzi z…", "ELIGE: el fuerte de Huy de hoy es de…"),
          [o("890", "890", "890", "890"), o("1066", "1066", "1066", "1066"), o("1818-1823", "1818–1823", "1818–1823", "1818-1823", true)],
          L("Il a été construit par les Hollandais, après la disparition du château.", "Його збудували голландці після зникнення замку.", "Zbudowali go Holendrzy po zniknięciu zamku.", "Lo construyeron los holandeses, después de la desaparición del castillo.")),
        Q("ma-auteur", L("CHOISIS : la gravure de 1595 a été faite…", "ВИБЕРИ: гравюру 1595 року зробили…", "WYBIERZ: rycina z 1595 roku została wykonana…", "ELIGE: el grabado de 1595 se hizo…"),
          [o("par le camp vainqueur, aux Pays-Bas", "на боці переможців, у Нідерландах", "przez stronę zwycięzców, w Niderlandach", "por el bando vencedor, en los Países Bajos", true), o("par les Hutois", "мешканцями Юї", "przez mieszkańców Huy", "por los de Huy"), o("en 2021", "у 2021 році", "w 2021 roku", "en 2021")],
          L("Elle peut donc être partiale.", "Тож вона може бути упередженою.", "Może więc być stronnicza.", "Por eso puede ser parcial."), DOC.gravure),
        Q("ma-frise", L("CHOISIS : qui démonte le château en 1717 ?", "ВИБЕРИ: хто розбирає замок у 1717 році?", "WYBIERZ: kto rozbiera zamek w 1717 roku?", "ELIGE: ¿quién desmonta el castillo en 1717?"),
          [o("les Hollandais", "голландці", "Holendrzy", "los holandeses"), o("les Hutois eux-mêmes", "самі мешканці Юї", "sami mieszkańcy Huy", "los propios de Huy", true), o("les Romains", "римляни", "Rzymianie", "los romanos")],
          L("Un traité de paix l'exigeait.", "Цього вимагав мирний договір.", "Wymagał tego traktat pokojowy.", "Lo exigía un tratado de paz."))
      ] },
    { id: "test-ma-moha", titre: L("Mini-test : le château de Moha", "Міні-тест: замок Моа", "Mini-test: zamek w Moha", "Mini-prueba: el castillo de Moha"),
      questions: [
        Q("ma-defense", L("CHOISIS : un château sur un rocher, c'est surtout pour…", "ВИБЕРИ: замок на скелі — передусім для…", "WYBIERZ: zamek na skale jest głównie po to, żeby…", "ELIGE: un castillo sobre una roca es sobre todo para…"),
          [o("se défendre", "оборони", "się bronić", "defenderse", true), o("faire du sport", "спорту", "uprawiać sport", "hacer deporte"), o("cultiver", "землеробства", "uprawiać ziemię", "cultivar")],
          L("On voit loin et c'est difficile à attaquer.", "Видно далеко, і на нього важко напасти.", "Widać daleko i trudno go zaatakować.", "Se ve lejos y es difícil de atacar.")),
        Q("ma-moha-recherche", L("CHOISIS : en 1376, le château de Moha est détruit par…", "ВИБЕРИ: у 1376 році замок Моа зруйнували…", "WYBIERZ: w 1376 roku zamek w Moha został zniszczony przez…", "ELIGE: en 1376, el castillo de Moha es destruido por…"),
          [o("les Romains", "римляни", "Rzymian", "los romanos"), o("un tremblement de terre", "землетрус", "trzęsienie ziemi", "un terremoto"), o("les Hutois", "мешканці Юї", "mieszkańców Huy", "los de Huy", true)],
          L("Les Hutois l'attaquent en 1376.", "Мешканці Юї нападають на нього в 1376 році.", "Mieszkańcy Huy atakują go w 1376 roku.", "Los de Huy lo atacan en 1376.")),
        Q("ma-ruines", L("CHOISIS : les ruines de Moha sont…", "ВИБЕРИ: руїни Моа —…", "WYBIERZ: ruiny w Moha to…", "ELIGE: las ruinas de Moha son…"),
          [o("une trace du passé", "слід минулого", "ślad przeszłości", "una huella del pasado", true), o("un travail postérieur", "пізніша праця", "praca późniejsza", "un trabajo posterior")],
          L("Ce sont de vraies pierres du Moyen Âge.", "Це справжні камені середньовіччя.", "To prawdziwe kamienie ze średniowiecza.", "Son piedras reales de la Edad Media."), DOC.moha)
      ] },
    { id: "bilan-hist-moyen-age", titre: L("Test de fin : le Moyen Âge à Huy", "Підсумковий тест: середньовіччя в Юї", "Test końcowy: średniowiecze w Huy", "Prueba final: la Edad Media en Huy"),
      questions: [
        Q("ma-echange", L("CHOISIS : la charte de Huy date de…", "ВИБЕРИ: хартія Юї датується…", "WYBIERZ: karta Huy pochodzi z…", "ELIGE: la carta de Huy es de…"),
          [o("1066", "1066", "1066", "1066", true), o("1311", "1311", "1311", "1311"), o("1717", "1717", "1717", "1717")],
          L("27 août 1066.", "27 серпня 1066 року.", "27 sierpnia 1066.", "27 de agosto de 1066.")),
        Q("ma-echange", L("CHOISIS : une charte, c'est…", "ВИБЕРИ: хартія — це…", "WYBIERZ: karta to…", "ELIGE: una carta es…"),
          [o("un texte officiel qui donne des droits", "офіційний текст, що дає права", "oficjalny tekst, który daje prawa", "un texto oficial que da derechos", true), o("une carte de géographie", "географічна карта", "mapa geograficzna", "un mapa de geografía"), o("une église", "церква", "kościół", "una iglesia")],
          L("Ici : des libertés pour les habitants de Huy.", "Тут: свободи для мешканців Юї.", "Tutaj: wolności dla mieszkańców Huy.", "Aquí: libertades para los habitantes de Huy.")),
        Q("ma-monument", L("CHOISIS : sur la gravure de 1595, tout en haut de la colline, on voit…", "ВИБЕРИ: на гравюрі 1595 року на самій вершині пагорба видно…", "WYBIERZ: na rycinie z 1595 roku na samym szczycie wzgórza widać…", "ELIGE: en el grabado de 1595, arriba del todo de la colina, se ve…"),
          [o("le château", "замок", "zamek", "el castillo", true), o("le fort hollandais", "голландський форт", "fort holenderski", "el fuerte holandés"), o("le pont", "міст", "most", "el puente")],
          L("Le fort hollandais n'existe pas encore en 1595.", "Голландського форту ще немає в 1595 році.", "Fortu holenderskiego jeszcze nie ma w 1595 roku.", "El fuerte holandés aún no existe en 1595."), DOC.gravure),
        Q("ma-frise", L("CHOISIS l'ordre juste.", "ВИБЕРИ правильний порядок.", "WYBIERZ dobrą kolejność.", "ELIGE el orden correcto."),
          [o("charte (1066) → collégiale gothique (1311) → Moha détruit (1376) → château démonté (1717)", "хартія (1066) → готична колегіальна церква (1311) → зруйнування Моа (1376) → розбирання замку (1717)", "karta (1066) → gotycka kolegiata (1311) → zniszczenie Moha (1376) → rozebranie zamku (1717)", "carta (1066) → colegiata gótica (1311) → Moha destruido (1376) → castillo desmontado (1717)", true),
           o("collégiale gothique (1311) → charte (1066) → château démonté (1717) → Moha détruit (1376)", "готична колегіальна церква (1311) → хартія (1066) → розбирання замку (1717) → зруйнування Моа (1376)", "gotycka kolegiata (1311) → karta (1066) → rozebranie zamku (1717) → zniszczenie Moha (1376)", "colegiata gótica (1311) → carta (1066) → castillo desmontado (1717) → Moha destruido (1376)"),
           o("Moha détruit (1376) → charte (1066) → collégiale gothique (1311) → château démonté (1717)", "зруйнування Моа (1376) → хартія (1066) → готична колегіальна церква (1311) → розбирання замку (1717)", "zniszczenie Moha (1376) → karta (1066) → gotycka kolegiata (1311) → rozebranie zamku (1717)", "Moha destruido (1376) → carta (1066) → colegiata gótica (1311) → castillo desmontado (1717)")],
          L("De la plus petite date à la plus grande.", "Від найменшої дати до найбільшої.", "Od najmniejszej daty do największej.", "De la fecha más pequeña a la más grande.")),
        Q("ma-comparer", L("CHOISIS : le fort de Huy est-il le château du Moyen Âge ?", "ВИБЕРИ: чи форт Юї — це середньовічний замок?", "WYBIERZ: czy fort w Huy to średniowieczny zamek?", "ELIGE: ¿el fuerte de Huy es el castillo de la Edad Media?"),
          [o("Oui", "Так", "Tak", "Sí"), o("Non, il est construit en 1818-1823 au même endroit", "Ні, його збудовано в 1818–1823 роках на тому ж місці", "Nie, zbudowano go w latach 1818–1823 w tym samym miejscu", "No, se construyó en 1818-1823 en el mismo lugar", true)],
          L("Même endroit, construction différente.", "Те саме місце, інша споруда.", "To samo miejsce, inna budowla.", "Mismo lugar, construcción diferente.")),
        Q("ma-defense", L("CHOISIS : à quelle époque le château de Moha est-il construit ?", "ВИБЕРИ: у яку епоху збудовано замок Моа?", "WYBIERZ: w jakiej epoce zbudowano zamek w Moha?", "ELIGE: ¿en qué época se construye el castillo de Moha?"),
          [o("la Préhistoire", "доісторичні часи", "prehistoria", "la Prehistoria"), o("le Moyen Âge", "середньовіччя", "średniowiecze", "la Edad Media", true), o("l'époque contemporaine", "новітній час", "czasy współczesne", "la época contemporánea")],
          L("Ses ruines datent surtout des 12e et 14e siècles.", "Його руїни переважно з XII і XIV століть.", "Jego ruiny pochodzą głównie z XII i XIV wieku.", "Sus ruinas son sobre todo de los siglos XII y XIV.")),
        Q("ma-verifier", L("CHOISIS : pour trouver vite la rosace de Huy, quels mots-clés taper ?", "ВИБЕРИ: які ключові слова набрати, щоб швидко знайти троянду Юї?", "WYBIERZ: jakie słowa kluczowe wpisać, żeby szybko znaleźć rozetę w Huy?", "ELIGE: para encontrar rápido el rosetón de Huy, ¿qué palabras clave escribir?"),
          [o("« Li Rondia Huy »", "«Li Rondia Huy»", "„Li Rondia Huy”", "«Li Rondia Huy»", true), o("« église »", "«église»", "„église”", "«église»"), o("« belle fenêtre ronde quelque part »", "«belle fenêtre ronde quelque part»", "„belle fenêtre ronde quelque part”", "«belle fenêtre ronde quelque part»")],
          L("Le nom exact + le lieu.", "Точна назва + місце.", "Dokładna nazwa + miejsce.", "El nombre exacto + el lugar."))
      ] }
  );
})();
