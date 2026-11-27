/* Histoire, module 1 : la Préhistoire (± 3 h, 4 séquences).
   Ouvert seulement quand le test des rappels d'histoire est réussi (verrou). Placé juste après les rappels.
   Chaque séquence : documents → activité (frise / carte / savoir-faire) → mini-test → synthèse.
   Savoir-faire travaillés : lire une frise, situer sur une carte, distinguer trace / travail postérieur,
   décrire une trace et en tirer une information, comparer deux modes de vie.
   rn (kirundi) = null tant que pas relu. Images : img/histoire/ (sources dans les légendes). */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/histoire/";
  const crit = (id, fr, uk, pl, es) => ({ id, t: L(fr, uk, pl, es) });
  const Q = (critere, consigne, options, explication, doc) => Object.assign({ critere, consigne, options, explication }, doc ? { doc } : {});
  const o = (fr, uk, pl, es, ok) => Object.assign({ label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const RETIENS = L("Ce que je retiens", "Що я запам'ятовую", "Co zapamiętuję", "Lo que recuerdo");
  const AUTO = (fr, uk, pl, es) => ({ type: "auto", picto: 3245, verbe: "CHOISIS", consigne: L(fr, uk, pl, es) });
  const el = (id, fr, uk, pl, es, bac) => Object.assign({ id, label: L(fr, uk, pl, es) }, bac ? { bac } : {});
  const opt = (id, fr, uk, pl, es, ok) => Object.assign({ id, label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const ASTUCE_MICRO = L("Tu peux aussi toucher le micro du clavier et parler.", "Можеш також натиснути мікрофон на клавіатурі й говорити.", "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", "También puedes tocar el micrófono del teclado y hablar.");
  const CONSIGNE_ORDRE = (fr, uk, pl, es) => L(fr + " TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", uk + " ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", pl + " DOTYKAJ kart po kolei: 1., potem 2.…", es + " TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…");
  const ANCIEN = L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo");
  const RECENT = L("le plus récent", "найновіше", "najnowsze", "lo más reciente");
  const TRACE = { id: "trace", label: L("Trace du passé", "Слід минулого", "Ślad przeszłości", "Huella del pasado") };
  const POST = { id: "post", label: L("Travail postérieur", "Пізніша праця", "Praca późniejsza", "Trabajo posterior") };
  const MONDE = "img/prerequis/continents-oceans.png", BELGIQUE = "img/belgique/regions-aujourdhui.jpg";

  /* ---------- Documents ---------- */
  const DOC = {
    monde: { n: 1, src: MONDE,
      legende: L("Carte du monde : les continents et les océans.", "Карта світу: континенти й океани.", "Mapa świata: kontynenty i oceany.", "Mapa del mundo: los continentes y los océanos."),
      credit: "Réalisé par T.Marlair sur base de la carte de Cogito ergo sumo (Wikimedia Commons, CC BY-SA 3.0)" },
    biface: { n: 1, src: IMG + "pre-biface.jpg",
      legende: L("Photographie d'un biface en silex (une pierre taillée des deux côtés), trouvé à Presles-et-Boves (France). Paléolithique, il y a plusieurs centaines de milliers d'années. Musée Saint-Remi, Reims.",
        "Фотографія біфаса з кременю (каменя, обробленого з двох боків), знайденого в Прель-е-Бов (Франція). Палеоліт, кілька сотень тисяч років тому. Музей Сен-Ремі, Реймс.",
        "Zdjęcie pięściaka z krzemienia (kamienia obrobionego z dwóch stron), znalezionego w Presles-et-Boves (Francja). Paleolit, kilkaset tysięcy lat temu. Muzeum Saint-Remi, Reims.",
        "Fotografía de un bifaz de sílex (una piedra tallada por los dos lados), encontrado en Presles-et-Boves (Francia). Paleolítico, hace varios cientos de miles de años. Museo Saint-Remi, Reims."),
      credit: "Photo : Vassil, 2016 (Wikimedia Commons, CC0)" },
    replique: { n: 2, src: IMG + "pre-replique.jpg",
      legende: L("Photographie d'une copie des peintures de la grotte de Lascaux (France), exposée au musée Anthropos de Brno (République tchèque). Les vraies peintures ont environ 17 000 ans.",
        "Фотографія копії малюнків печери Ласко (Франція) у музеї «Антропос» у Брно (Чехія). Справжнім малюнкам приблизно 17 000 років.",
        "Zdjęcie kopii malowideł z jaskini Lascaux (Francja), wystawionej w muzeum Anthropos w Brnie (Czechy). Prawdziwe malowidła mają około 17 000 lat.",
        "Fotografía de una copia de las pinturas de la cueva de Lascaux (Francia), expuesta en el museo Anthropos de Brno (República Checa). Las pinturas verdaderas tienen unos 17 000 años."),
      credit: "Photo : HTO, 2009 (Wikimedia Commons, domaine public)" },
    belgique: { n: 1, src: BELGIQUE,
      legende: L("Carte de la Belgique avec Huy et Liège, au bord de la Meuse.", "Карта Бельгії з Юї та Льєжем на березі Маасу.", "Mapa Belgii z Huy i Liège nad Mozą.", "Mapa de Bélgica con Huy y Lieja, a orillas del Mosa."),
      credit: "Réalisé par T.Marlair sur base de la carte de Jules Rohault (Wikimedia Commons, CC BY-SA 4.0)" }
  };

  /* ---------- Chapitre (juste après les rappels d'histoire) ---------- */
  const chapitre = { id: "hist-prehistoire", discipline: "histoire", verrou: { test: "bilan-pr-histoire", min: 0.5 },
    titre: L("1. La Préhistoire : les premiers humains", "1. Доісторичні часи: перші люди", "1. Prehistoria: pierwsi ludzie", "1. La Prehistoria: los primeros humanos"),
    dejaVu: [L("Tu vas découvrir comment vivaient les premiers humains, en Afrique, en Europe et près de Huy.", "Ти дізнаєшся, як жили перші люди в Африці, Європі та біля Юї.", "Odkryjesz, jak żyli pierwsi ludzie w Afryce, w Europie i niedaleko Huy.", "Vas a descubrir cómo vivían los primeros humanos, en África, en Europa y cerca de Huy.")],
    sequences: ["pre-temps", "pre-chasseurs", "pre-engis", "pre-paysans"], bilan: "bilan-hist-prehistoire" };
  const iPr = P.chapitres.findIndex(c => c.id === "pr-histoire");
  P.chapitres.splice(iPr + 1, 0, chapitre);

  /* ---------- Séquences ---------- */
  P.sequences.push(
    /* 1. Quand et où ? */
    { id: "pre-temps",
      titre: L("Quand et où vivent les premiers humains ?", "Коли й де живуть перші люди?", "Kiedy i gdzie żyją pierwsi ludzie?", "¿Cuándo y dónde viven los primeros humanos?"),
      objectif: L("Je place la Préhistoire sur la frise et je situe l'Afrique de l'Est sur la carte.", "Я розміщую доісторичні часи на стрічці часу й знаходжу Східну Африку на карті.", "Umieszczam prehistorię na osi czasu i znajduję Afrykę Wschodnią na mapie.", "Sitúo la Prehistoria en la línea del tiempo y localizo África del Este en el mapa."),
      criteres: [
        crit("pre-frise", "Je range les grands moments de la Préhistoire sur la frise.", "Я впорядковую головні моменти доісторичних часів на стрічці часу.", "Układam najważniejsze momenty prehistorii na osi czasu.", "Ordeno los grandes momentos de la Prehistoria en la línea del tiempo."),
        crit("pre-carte", "Je situe l'Afrique de l'Est et l'Europe sur une carte du monde.", "Я знаходжу Східну Африку та Європу на карті світу.", "Znajduję Afrykę Wschodnią i Europę na mapie świata.", "Localizo África del Este y Europa en un mapa del mundo.")
      ],
      etapes: [
        { type: "ressource", titre: L("La plus longue période de l'histoire", "Найдовший період історії", "Najdłuższy okres historii", "El periodo más largo de la historia"),
          contenu: { textes: [
            L("La Préhistoire commence avec les premiers humains, il y a environ 3 millions d'années. Elle finit quand l'écriture est inventée, vers − 3300.", "Доісторичні часи починаються з перших людей, приблизно 3 мільйони років тому. Вони закінчуються, коли винайшли письмо, близько − 3300 року.", "Prehistoria zaczyna się od pierwszych ludzi, około 3 milionów lat temu. Kończy się, gdy wynaleziono pismo, około − 3300.", "La Prehistoria empieza con los primeros humanos, hace unos 3 millones de años. Termina cuando se inventa la escritura, hacia − 3300."),
            L("Les premiers humains vivent en Afrique de l'Est. Ensuite, très lentement, des humains partent vers l'Asie et l'Europe.", "Перші люди живуть у Східній Африці. Потім дуже повільно люди переходять до Азії та Європи.", "Pierwsi ludzie żyją w Afryce Wschodniej. Potem, bardzo powoli, ludzie wędrują do Azji i Europy.", "Los primeros humanos viven en África del Este. Después, muy lentamente, unos humanos se van hacia Asia y Europa."),
            L("Pour parler de temps très anciens, on dit « il y a … ans ». Il y a 3 millions d'années, c'est beaucoup plus ancien qu'il y a 17 000 ans.", "Щоб говорити про дуже давні часи, кажуть «… років тому». 3 мільйони років тому — це набагато давніше, ніж 17 000 років тому.", "Mówiąc o bardzo dawnych czasach, mówimy „… lat temu”. 3 miliony lat temu to dużo dawniej niż 17 000 lat temu.", "Para hablar de tiempos muy antiguos se dice «hace … años». Hace 3 millones de años es mucho más antiguo que hace 17 000 años.")
          ], docs: [DOC.monde] } },
        { type: "activite", activite: "pre-act-temps" },
        { type: "minitest", test: "test-pre-temps" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("La Préhistoire : des premiers humains (il y a 3 millions d'années) à l'écriture (vers − 3300).", "Доісторичні часи: від перших людей (3 мільйони років тому) до письма (близько − 3300).", "Prehistoria: od pierwszych ludzi (3 miliony lat temu) do pisma (około − 3300).", "La Prehistoria: de los primeros humanos (hace 3 millones de años) a la escritura (hacia − 3300)."),
          L("Les premiers humains vivent en Afrique de l'Est, puis partent vers l'Asie et l'Europe.", "Перші люди живуть у Східній Африці, потім переходять до Азії та Європи.", "Pierwsi ludzie żyją w Afryce Wschodniej, potem wędrują do Azji i Europy.", "Los primeros humanos viven en África del Este y luego se van hacia Asia y Europa.")
        ] } }
      ] },

    /* 2. Chasseurs-cueilleurs + savoir-faire trace / travail postérieur */
    { id: "pre-chasseurs",
      titre: L("Chasser, cueillir, se déplacer", "Полювати, збирати, переміщатися", "Polować, zbierać, wędrować", "Cazar, recolectar, desplazarse"),
      objectif: L("Je décris une trace du passé et je dis ce qu'elle m'apprend. Je distingue une trace et un travail postérieur.", "Я описую слід минулого й кажу, що він мені розповідає. Я розрізняю слід і пізнішу працю.", "Opisuję ślad przeszłości i mówię, czego mnie uczy. Odróżniam ślad od pracy późniejszej.", "Describo una huella del pasado y digo lo que me enseña. Distingo una huella y un trabajo posterior."),
      criteres: [
        crit("pre-decrire", "Je décris un objet préhistorique : la matière, la forme, l'usage.", "Я описую доісторичний предмет: матеріал, форму, використання.", "Opisuję przedmiot z prehistorii: materiał, kształt, użycie.", "Describo un objeto prehistórico: el material, la forma, el uso."),
        crit("pre-trace", "Je dis si un document est une trace du passé ou un travail postérieur.", "Я кажу, чи документ — слід минулого, чи пізніша праця.", "Mówię, czy dokument jest śladem przeszłości, czy pracą późniejszą.", "Digo si un documento es una huella del pasado o un trabajo posterior."),
        crit("pre-nomade", "J'explique pourquoi les chasseurs-cueilleurs sont nomades.", "Я пояснюю, чому мисливці-збирачі — кочівники.", "Wyjaśniam, dlaczego łowcy-zbieracze są koczownikami.", "Explico por qué los cazadores-recolectores son nómadas.")
      ],
      etapes: [
        { type: "ressource", titre: L("La vie des chasseurs-cueilleurs", "Життя мисливців-збирачів", "Życie łowców-zbieraczy", "La vida de los cazadores-recolectores"),
          contenu: { textes: [
            L("Pendant presque toute la Préhistoire (le Paléolithique), les humains chassent des animaux, pêchent et cueillent des plantes et des fruits.", "Майже весь час доісторичних часів (палеоліт) люди полюють на тварин, ловлять рибу та збирають рослини й плоди.", "Przez prawie całą prehistorię (paleolit) ludzie polują na zwierzęta, łowią ryby i zbierają rośliny i owoce.", "Durante casi toda la Prehistoria (el Paleolítico), los humanos cazan animales, pescan y recolectan plantas y frutos."),
            L("Ils sont nomades : ils se déplacent pour suivre les animaux et trouver de la nourriture selon les saisons.", "Вони кочівники: переміщуються за тваринами й шукають їжу залежно від пори року.", "Są koczownikami: przemieszczają się za zwierzętami i szukają jedzenia zależnie od pory roku.", "Son nómadas: se desplazan para seguir a los animales y encontrar comida según las estaciones."),
            L("Ils taillent la pierre (le silex) pour faire des outils. Ils maîtrisent le feu depuis environ 400 000 ans.", "Вони обробляють камінь (кремінь), щоб робити знаряддя. Вони вміють користуватися вогнем приблизно 400 000 років.", "Obrabiają kamień (krzemień), żeby robić narzędzia. Panują nad ogniem od około 400 000 lat.", "Tallan la piedra (el sílex) para hacer herramientas. Dominan el fuego desde hace unos 400 000 años."),
            L("Il y a environ 17 000 ans, des humains peignent des animaux sur les murs de la grotte de Lascaux, en France.", "Приблизно 17 000 років тому люди малювали тварин на стінах печери Ласко у Франції.", "Około 17 000 lat temu ludzie malowali zwierzęta na ścianach jaskini Lascaux we Francji.", "Hace unos 17 000 años, unos humanos pintaron animales en las paredes de la cueva de Lascaux, en Francia.")
          ], docs: [DOC.biface, DOC.replique] } },
        { type: "ressource", titre: L("Méthode : trace ou travail postérieur ?", "Метод: слід чи пізніша праця?", "Metoda: ślad czy praca późniejsza?", "Método: ¿huella o trabajo posterior?"),
          contenu: { liste: [
            L("Une trace du passé a été faite À L'ÉPOQUE (ex. : le biface, taillé par un humain préhistorique).", "Слід минулого зроблено В ТОЙ ЧАС (напр.: біфас, оброблений доісторичною людиною).", "Ślad przeszłości powstał W TAMTYCH CZASACH (np. pięściak obrobiony przez człowieka prehistorycznego).", "Una huella del pasado se hizo EN ESA ÉPOCA (ej.: el bifaz, tallado por un humano prehistórico)."),
            L("Un travail postérieur a été fait PLUS TARD, par des gens d'aujourd'hui (ex. : une copie, un dessin d'artiste, un film).", "Пізнішу працю зроблено ПІЗНІШЕ, сучасними людьми (напр.: копія, малюнок художника, фільм).", "Praca późniejsza powstała PÓŹNIEJ, zrobiona przez ludzi dzisiaj (np. kopia, rysunek artysty, film).", "Un trabajo posterior se hizo MÁS TARDE, por gente de hoy (ej.: una copia, un dibujo de artista, una película)."),
            L("Pour décider, je lis la légende : QUI l'a fait ? QUAND ?", "Щоб вирішити, я читаю підпис: ХТО це зробив? КОЛИ?", "Żeby zdecydować, czytam podpis: KTO to zrobił? KIEDY?", "Para decidir, leo la leyenda: ¿QUIÉN lo hizo? ¿CUÁNDO?")
          ] } },
        { type: "activite", activite: "pre-act-chasseurs" },
        { type: "minitest", test: "test-pre-chasseurs" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Au Paléolithique, les humains sont chasseurs-cueilleurs et nomades.", "У палеоліті люди — мисливці-збирачі й кочівники.", "W paleolicie ludzie są łowcami-zbieraczami i koczownikami.", "En el Paleolítico, los humanos son cazadores-recolectores y nómadas."),
          L("Ils taillent le silex, maîtrisent le feu et peignent dans les grottes.", "Вони обробляють кремінь, користуються вогнем і малюють у печерах.", "Obrabiają krzemień, panują nad ogniem i malują w jaskiniach.", "Tallan el sílex, dominan el fuego y pintan en las cuevas."),
          L("Trace = faite à l'époque. Travail postérieur = fait plus tard. Je lis la légende pour savoir.", "Слід = зроблено в той час. Пізніша праця = зроблено пізніше. Я читаю підпис, щоб знати.", "Ślad = zrobiony w tamtych czasach. Praca późniejsza = zrobiona później. Czytam podpis, żeby wiedzieć.", "Huella = hecha en esa época. Trabajo posterior = hecho más tarde. Leo la leyenda para saberlo.")
        ] } }
      ] },

    /* 3. La Préhistoire près de chez nous */
    { id: "pre-engis",
      titre: L("La Préhistoire près de Huy", "Доісторичні часи біля Юї", "Prehistoria niedaleko Huy", "La Prehistoria cerca de Huy"),
      objectif: L("Je situe Engis sur la carte et je comprends pourquoi on y a fait une découverte importante.", "Я знаходжу Енжі на карті й розумію, чому там зробили важливе відкриття.", "Znajduję Engis na mapie i rozumiem, dlaczego dokonano tam ważnego odkrycia.", "Localizo Engis en el mapa y entiendo por qué allí se hizo un descubrimiento importante."),
      criteres: [
        crit("pre-engis-carte", "Je situe Engis, entre Huy et Liège, au bord de la Meuse.", "Я знаходжу Енжі між Юї та Льєжем на березі Маасу.", "Znajduję Engis między Huy a Liège, nad Mozą.", "Localizo Engis, entre Huy y Lieja, a orillas del Mosa."),
        crit("pre-engis-calcul", "Je calcule depuis combien de temps une découverte a été faite.", "Я обчислюю, скільки часу минуло від відкриття.", "Obliczam, ile czasu minęło od odkrycia.", "Calculo cuánto tiempo hace que se hizo un descubrimiento.")
      ],
      etapes: [
        { type: "ressource", titre: L("Un crâne dans une grotte d'Engis", "Череп у печері Енжі", "Czaszka w jaskini w Engis", "Un cráneo en una cueva de Engis"),
          contenu: { textes: [
            L("Engis est un village au bord de la Meuse, entre Huy et Liège. Il y a des grottes dans les rochers.", "Енжі — село на березі Маасу між Юї та Льєжем. У скелях там є печери.", "Engis to wieś nad Mozą, między Huy a Liège. W skałach są jaskinie.", "Engis es un pueblo a orillas del Mosa, entre Huy y Lieja. Hay cuevas en las rocas."),
            L("En 1829-1830, le médecin Philippe-Charles Schmerling fouille ces grottes. Il trouve des os d'animaux, des outils en silex et le crâne d'un enfant.", "У 1829–1830 роках лікар Філіпп-Шарль Шмерлінг розкопує ці печери. Він знаходить кістки тварин, знаряддя з кременю й череп дитини.", "W latach 1829–1830 lekarz Philippe-Charles Schmerling prowadzi wykopaliska w tych jaskiniach. Znajduje kości zwierząt, narzędzia z krzemienia i czaszkę dziecka.", "En 1829-1830, el médico Philippe-Charles Schmerling excava esas cuevas. Encuentra huesos de animales, herramientas de sílex y el cráneo de un niño."),
            L("Bien plus tard, les savants comprennent que c'est un enfant néandertalien : une autre espèce humaine, qui vivait en Europe avant nous. C'est le premier fossile de Néandertalien jamais découvert.", "Набагато пізніше вчені зрозуміли, що це дитина-неандерталець — інший вид людей, що жив у Європі до нас. Це перша знахідка неандертальця в історії.", "Dużo później naukowcy zrozumieli, że to dziecko neandertalczyka: innego gatunku człowieka, który żył w Europie przed nami. To pierwsza skamielina neandertalczyka, jaką kiedykolwiek odkryto.", "Mucho más tarde, los científicos entienden que es un niño neandertal: otra especie humana que vivía en Europa antes que nosotros. Es el primer fósil de neandertal jamás descubierto."),
            L("Aujourd'hui, à Ramioul (Flémalle), tout près, le Préhistomuseum montre la vie à la Préhistoire.", "Сьогодні зовсім поруч, у Раміулі (Флемаль), Музей доісторії показує життя в доісторичні часи.", "Dziś w pobliskim Ramioul (Flémalle) Préhistomuseum pokazuje życie w prehistorii.", "Hoy, muy cerca, en Ramioul (Flémalle), el Préhistomuseum muestra la vida en la Prehistoria.")
          ], docs: [DOC.belgique] } },
        { type: "activite", activite: "pre-act-engis" },
        { type: "minitest", test: "test-pre-engis" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("À Engis, près de Huy, Schmerling a trouvé en 1829-1830 le crâne d'un enfant néandertalien.", "В Енжі, біля Юї, Шмерлінг у 1829–1830 роках знайшов череп дитини-неандертальця.", "W Engis, niedaleko Huy, Schmerling znalazł w latach 1829–1830 czaszkę dziecka neandertalczyka.", "En Engis, cerca de Huy, Schmerling encontró en 1829-1830 el cráneo de un niño neandertal."),
          L("Les archéologues fouillent le sol pour trouver des traces du passé.", "Археологи розкопують землю, щоб знайти сліди минулого.", "Archeolodzy kopią w ziemi, żeby znaleźć ślady przeszłości.", "Los arqueólogos excavan el suelo para encontrar huellas del pasado.")
        ] } }
      ] },

    /* 4. Néolithique */
    { id: "pre-paysans",
      titre: L("Devenir paysans : le Néolithique", "Стати селянами: неоліт", "Zostać rolnikami: neolit", "Hacerse campesinos: el Neolítico"),
      objectif: L("Je compare la vie des nomades et des premiers paysans, et je situe le Proche-Orient sur la carte.", "Я порівнюю життя кочівників і перших селян та знаходжу Близький Схід на карті.", "Porównuję życie koczowników i pierwszych rolników oraz znajduję Bliski Wschód na mapie.", "Comparo la vida de los nómadas y de los primeros campesinos, y localizo Oriente Próximo en el mapa."),
      criteres: [
        crit("pre-comparer", "Je compare nomade et sédentaire.", "Я порівнюю кочівника й осілу людину.", "Porównuję koczownika i osiadłego.", "Comparo nómada y sedentario."),
        crit("pre-neo-carte", "Je situe le Proche-Orient, où naît l'agriculture.", "Я знаходжу Близький Схід, де виникло землеробство.", "Znajduję Bliski Wschód, gdzie narodziło się rolnictwo.", "Localizo Oriente Próximo, donde nace la agricultura.")
      ],
      etapes: [
        { type: "ressource", titre: L("Les premiers villages", "Перші села", "Pierwsze wioski", "Las primeras aldeas"),
          contenu: { textes: [
            L("Vers − 10 000, au Proche-Orient (aujourd'hui l'Irak, la Syrie, la Turquie…), des humains commencent à cultiver des céréales et à élever des animaux.", "Близько − 10 000 року на Близькому Сході (сьогодні Ірак, Сирія, Туреччина…) люди починають вирощувати зернові й розводити тварин.", "Około − 10 000 na Bliskim Wschodzie (dziś Irak, Syria, Turcja…) ludzie zaczynają uprawiać zboża i hodować zwierzęta.", "Hacia − 10 000, en Oriente Próximo (hoy Irak, Siria, Turquía…), unos humanos empiezan a cultivar cereales y a criar animales."),
            L("Ils deviennent sédentaires : ils restent au même endroit, construisent des maisons et forment des villages. Ils fabriquent des poteries pour garder les graines.", "Вони стають осілими: залишаються на одному місці, будують будинки й утворюють села. Вони роблять глиняний посуд, щоб зберігати зерно.", "Stają się osiadli: zostają w jednym miejscu, budują domy i tworzą wioski. Robią naczynia gliniane, żeby przechowywać ziarno.", "Se vuelven sedentarios: se quedan en el mismo lugar, construyen casas y forman aldeas. Fabrican cerámica para guardar las semillas."),
            L("Ce nouveau mode de vie arrive très lentement en Europe. Vers − 5300, les premiers paysans s'installent en Hesbaye, tout près de Huy, sur les bonnes terres.", "Цей новий спосіб життя дуже повільно приходить до Європи. Близько − 5300 року перші селяни оселяються в Есбаї, зовсім поруч із Юї, на добрих землях.", "Ten nowy sposób życia bardzo powoli dociera do Europy. Około − 5300 pierwsi rolnicy osiedlają się w Hesbaye, tuż obok Huy, na dobrych ziemiach.", "Esta nueva forma de vida llega muy lentamente a Europa. Hacia − 5300, los primeros campesinos se instalan en Hesbaye, muy cerca de Huy, en las buenas tierras.")
          ], docs: [DOC.monde] } },
        { type: "activite", activite: "pre-act-paysans" },
        { type: "minitest", test: "test-pre-paysans" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Néolithique : les humains cultivent, élèvent et deviennent sédentaires.", "Неоліт: люди обробляють землю, розводять тварин і стають осілими.", "Neolit: ludzie uprawiają ziemię, hodują zwierzęta i stają się osiadli.", "Neolítico: los humanos cultivan, crían animales y se vuelven sedentarios."),
          L("L'agriculture naît au Proche-Orient vers − 10 000 et arrive près de Huy vers − 5300.", "Землеробство виникає на Близькому Сході близько − 10 000 року і доходить до околиць Юї близько − 5300.", "Rolnictwo rodzi się na Bliskim Wschodzie około − 10 000 i dociera w okolice Huy około − 5300.", "La agricultura nace en Oriente Próximo hacia − 10 000 y llega cerca de Huy hacia − 5300."),
          L("La Préhistoire finit avec l'invention de l'écriture, vers − 3300.", "Доісторичні часи закінчуються з винаходом письма, близько − 3300.", "Prehistoria kończy się wraz z wynalezieniem pisma, około − 3300.", "La Prehistoria termina con la invención de la escritura, hacia − 3300.")
        ] } }
      ] }
  );

  /* ---------- Activités ---------- */
  const CARTE = (consigne, carte, points, bonne, bravo, erreur, aides) => ({ type: "carte", picto: null, verbe: "TOUCHE", consigne, carte, points, bonne, bravo, erreur, aides });
  const ORDRE = (consigne, elements, bravo, erreur, aides) => ({ type: "ordre", picto: null, verbe: "RANGE", consigne, elements, bravo, erreur, aides, debut: ANCIEN, fin: RECENT });
  const CLASSER = (consigne, bacs, elements, bravo, erreur, aides) => ({ type: "classer", picto: null, verbe: "CLASSE", consigne, bacs, elements, bravo, erreur, aides });
  const CHOIX = (consigne, options, bravo, erreur, aides, plus) => Object.assign({ type: "choix", picto: null, verbe: "CHOISIS", consigne, options, bravo, erreur, aides }, plus || {});
  const ECRIRE = (consigne, amorces, placeholder, aides) => ({ type: "ecrire", picto: null, verbe: "ÉCRIS", consigne, amorces, placeholder, astuce: ASTUCE_MICRO, aides });
  const pt = (id, x, y) => ({ id, x, y });

  D.activites.push(
    { id: "pre-act-temps", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Frise et carte des premiers humains", "Стрічка часу й карта перших людей", "Oś czasu i mapa pierwszych ludzi", "Línea del tiempo y mapa de los primeros humanos"),
      objectif: L("Je range les moments de la Préhistoire et je trouve où vivent les premiers humains.", "Я впорядковую моменти доісторичних часів і знаходжу, де жили перші люди.", "Układam momenty prehistorii i znajduję, gdzie żyją pierwsi ludzie.", "Ordeno los momentos de la Prehistoria y encuentro dónde viven los primeros humanos."),
      etapes: [
        ORDRE(CONSIGNE_ORDRE("RANGE sur la frise, du plus ancien au plus récent.", "РОЗТАШУЙ на стрічці часу від найдавнішого до найновішого.", "UŁÓŻ na osi czasu od najdawniejszego do najnowszego.", "ORDENA en la línea del tiempo, del más antiguo al más reciente."),
          [el("t1", "Premiers humains en Afrique (il y a 3 millions d'années)", "Перші люди в Африці (3 мільйони років тому)", "Pierwsi ludzie w Afryce (3 miliony lat temu)", "Primeros humanos en África (hace 3 millones de años)"),
           el("t2", "Les humains maîtrisent le feu (il y a 400 000 ans)", "Люди опановують вогонь (400 000 років тому)", "Ludzie panują nad ogniem (400 000 lat temu)", "Los humanos dominan el fuego (hace 400 000 años)"),
           el("t3", "Peintures de Lascaux (il y a 17 000 ans)", "Малюнки Ласко (17 000 років тому)", "Malowidła z Lascaux (17 000 lat temu)", "Pinturas de Lascaux (hace 17 000 años)"),
           el("t4", "Premiers paysans au Proche-Orient (− 10 000)", "Перші селяни на Близькому Сході (− 10 000)", "Pierwsi rolnicy na Bliskim Wschodzie (− 10 000)", "Primeros campesinos en Oriente Próximo (− 10 000)"),
           el("t5", "Premiers paysans près de Huy (− 5300)", "Перші селяни біля Юї (− 5300)", "Pierwsi rolnicy niedaleko Huy (− 5300)", "Primeros campesinos cerca de Huy (− 5300)"),
           el("t6", "Invention de l'écriture : fin de la Préhistoire (− 3300)", "Винайдення письма: кінець доісторичних часів (− 3300)", "Wynalezienie pisma: koniec prehistorii (− 3300)", "Invención de la escritura: fin de la Prehistoria (− 3300)")],
          L("Bravo ! Tu as rangé 3 millions d'années d'histoire.", "Молодець! Ти впорядкував(-ла) 3 мільйони років історії.", "Brawo! Ułożyłeś/ułożyłaś 3 miliony lat historii.", "¡Bien! Has ordenado 3 millones de años de historia."),
          L("Pas encore. Compare les nombres : 3 millions d'années, c'est le plus loin dans le passé.", "Ще ні. Порівняй числа: 3 мільйони років — це найдалі в минулому.", "Jeszcze nie. Porównaj liczby: 3 miliony lat to najdalej w przeszłości.", "Todavía no. Compara los números: 3 millones de años es lo más lejano en el pasado."),
          [L("D'abord les « il y a … ans » : le plus grand nombre est le plus ancien.", "Спочатку «… років тому»: найбільше число — найдавніше.", "Najpierw „… lat temu”: największa liczba jest najdawniejsza.", "Primero los «hace … años»: el número más grande es el más antiguo."),
           L("Puis les dates avec « − » : − 10 000 est avant − 5300.", "Потім дати з «−»: − 10 000 раніше за − 5300.", "Potem daty z „−”: − 10 000 jest przed − 5300.", "Luego las fechas con «−»: − 10 000 es antes que − 5300.")]),
        CARTE(L("TOUCHE le repère où vivent les premiers humains : l'Afrique de l'Est.", "ТОРКНИСЯ позначки, де живуть перші люди: Східна Африка.", "DOTKNIJ znacznika, gdzie żyją pierwsi ludzie: Afryka Wschodnia.", "TOCA la marca donde viven los primeros humanos: África del Este."),
          MONDE, [pt("eu", 50, 19), pt("afe", 59, 47), pt("cn", 74, 30), pt("am", 27, 35)], "afe",
          L("Oui ! L'Afrique de l'Est, à droite du continent africain.", "Так! Східна Африка, праворуч на африканському континенті.", "Tak! Afryka Wschodnia, po prawej stronie kontynentu afrykańskiego.", "¡Sí! África del Este, a la derecha del continente africano."),
          L("Pas encore. Cherche l'Afrique, puis son côté droit (l'Est).", "Ще ні. Знайди Африку, потім її правий бік (схід).", "Jeszcze nie. Znajdź Afrykę, potem jej prawą stronę (wschód).", "Todavía no. Busca África y luego su lado derecho (el Este)."),
          [L("Sur une carte, l'Est est à droite.", "На карті схід — праворуч.", "Na mapie wschód jest po prawej.", "En un mapa, el Este está a la derecha.")]),
        CARTE(L("TOUCHE le repère où arrivent ensuite des humains : l'Europe.", "ТОРКНИСЯ позначки, куди потім приходять люди: Європа.", "DOTKNIJ znacznika, dokąd potem docierają ludzie: Europa.", "TOCA la marca adonde llegan después unos humanos: Europa."),
          MONDE, [pt("afe", 59, 47), pt("am", 27, 35), pt("eu", 50, 19), pt("in", 68, 40)], "eu",
          L("Oui ! L'Europe, au nord de l'Afrique. C'est là que se trouve la Belgique.", "Так! Європа, на північ від Африки. Там знаходиться Бельгія.", "Tak! Europa, na północ od Afryki. Tam leży Belgia.", "¡Sí! Europa, al norte de África. Allí está Bélgica."),
          L("Pas encore. L'Europe est au-dessus (au nord) de l'Afrique.", "Ще ні. Європа — над Африкою (на півночі).", "Jeszcze nie. Europa jest nad Afryką (na północy).", "Todavía no. Europa está encima (al norte) de África."),
          [L("Le nord est en haut de la carte.", "Північ — угорі карти.", "Północ jest na górze mapy.", "El norte está arriba en el mapa.")]),
        AUTO("CHOISIS : est-ce que tu sais placer la Préhistoire dans le temps et dans l'espace ?", "ВИБЕРИ: чи вмієш ти розмістити доісторичні часи в часі й просторі?", "WYBIERZ: czy umiesz umieścić prehistorię w czasie i przestrzeni?", "ELIGE: ¿sabes situar la Prehistoria en el tiempo y en el espacio?")
      ] },

    { id: "pre-act-chasseurs", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("J'enquête sur une pierre taillée", "Я досліджую оброблений камінь", "Badam obrobiony kamień", "Investigo una piedra tallada"),
      objectif: L("Je décris une trace du passé et je la distingue d'un travail postérieur.", "Я описую слід минулого й відрізняю його від пізнішої праці.", "Opisuję ślad przeszłości i odróżniam go od pracy późniejszej.", "Describo una huella del pasado y la distingo de un trabajo posterior."),
      etapes: [
        CHOIX(L("REGARDE le biface. CHOISIS : en quelle matière est-il fait ?", "ПОДИВИСЬ на біфас. ВИБЕРИ: з якого матеріалу він зроблений?", "SPÓJRZ na pięściak. WYBIERZ: z jakiego materiału jest zrobiony?", "MIRA el bifaz. ELIGE: ¿de qué material está hecho?"),
          [opt("a", "en métal", "з металу", "z metalu", "de metal"), opt("b", "en pierre (silex)", "з каменю (кременю)", "z kamienia (krzemienia)", "de piedra (sílex)", true), opt("c", "en plastique", "з пластику", "z plastiku", "de plástico")],
          L("Oui ! En silex, une pierre dure qu'on peut tailler.", "Так! З кременю — твердого каменю, який можна обробляти.", "Tak! Z krzemienia, twardego kamienia, który można obrabiać.", "¡Sí! De sílex, una piedra dura que se puede tallar."),
          L("Pas encore. Lis la légende : « biface en silex ».", "Ще ні. Прочитай підпис: «біфас з кременю».", "Jeszcze nie. Przeczytaj podpis: „pięściak z krzemienia”.", "Todavía no. Lee la leyenda: «bifaz de sílex»."),
          [L("À la Préhistoire, on ne connaît pas encore le métal.", "У доісторичні часи метал ще не знали.", "W prehistorii nie znano jeszcze metalu.", "En la Prehistoria todavía no se conoce el metal.")],
          { image: IMG + "pre-biface.jpg" }),
        CHOIX(L("CHOISIS : à quoi servait sans doute ce biface ?", "ВИБЕРИ: для чого, мабуть, служив цей біфас?", "WYBIERZ: do czego prawdopodobnie służył ten pięściak?", "ELIGE: ¿para qué servía seguramente este bifaz?"),
          [opt("a", "à couper la viande et le bois", "різати м'ясо й дерево", "do cięcia mięsa i drewna", "para cortar la carne y la madera", true), opt("b", "à écrire", "писати", "do pisania", "para escribir"), opt("c", "à décorer la maison", "прикрашати дім", "do ozdabiania domu", "para decorar la casa")],
          L("Oui ! Ses bords sont tranchants : c'est un outil pour couper.", "Так! Його краї гострі: це знаряддя для різання.", "Tak! Jego krawędzie są ostre: to narzędzie do cięcia.", "¡Sí! Sus bordes cortan: es una herramienta para cortar."),
          L("Pas encore. Regarde les bords : ils sont pointus et coupants.", "Ще ні. Подивись на краї: вони гострі й ріжучі.", "Jeszcze nie. Spójrz na krawędzie: są ostre i tnące.", "Todavía no. Mira los bordes: son puntiagudos y cortantes."),
          [L("Les chasseurs devaient découper les animaux.", "Мисливцям треба було розрізати тварин.", "Łowcy musieli kroić zwierzęta.", "Los cazadores tenían que cortar los animales.")],
          { image: IMG + "pre-biface.jpg" }),
        CLASSER(L("CLASSE : fait à la Préhistoire (trace) ou fait plus tard (travail postérieur) ? Pense à QUI l'a fait et QUAND.", "РОЗПОДІЛИ: зроблено в доісторичні часи (слід) чи пізніше (пізніша праця)? Подумай, ХТО це зробив і КОЛИ.", "PRZYPORZĄDKUJ: zrobione w prehistorii (ślad) czy później (praca późniejsza)? Pomyśl, KTO to zrobił i KIEDY.", "CLASIFICA: ¿hecho en la Prehistoria (huella) o más tarde (trabajo posterior)? Piensa QUIÉN lo hizo y CUÁNDO."),
          [TRACE, POST],
          [el("biface", "le biface en silex du musée de Reims", "біфас з кременю з музею Реймса", "pięściak z krzemienia z muzeum w Reims", "el bifaz de sílex del museo de Reims", "trace"),
           el("copie", "la copie de Lascaux au musée de Brno", "копія Ласко в музеї Брно", "kopia Lascaux w muzeum w Brnie", "la copia de Lascaux en el museo de Brno", "post"),
           el("os", "un os de renne gravé, trouvé dans une grotte", "гравірована кістка оленя, знайдена в печері", "grawerowana kość renifera znaleziona w jaskini", "un hueso de reno grabado, encontrado en una cueva", "trace"),
           el("dessin", "un dessin d'un campement préhistorique fait par un artiste en 2015", "малюнок доісторичної стоянки, зроблений художником у 2015 році", "rysunek obozowiska prehistorycznego wykonany przez artystę w 2015 roku", "un dibujo de un campamento prehistórico hecho por un artista en 2015", "post"),
           el("vraies", "les vraies peintures sur les murs de la grotte de Lascaux", "справжні малюнки на стінах печери Ласко", "prawdziwe malowidła na ścianach jaskini Lascaux", "las pinturas verdaderas en las paredes de la cueva de Lascaux", "trace"),
           el("film", "un film d'animation sur les hommes préhistoriques", "мультфільм про доісторичних людей", "film animowany o ludziach prehistorycznych", "una película de animación sobre los humanos prehistóricos", "post")],
          L("Bravo ! Une copie ressemble au passé, mais elle est faite aujourd'hui : c'est un travail postérieur.", "Молодець! Копія схожа на минуле, але зроблена сьогодні: це пізніша праця.", "Brawo! Kopia przypomina przeszłość, ale jest zrobiona dzisiaj: to praca późniejsza.", "¡Bien! Una copia se parece al pasado, pero está hecha hoy: es un trabajo posterior."),
          L("Pas encore. Une copie, un dessin d'artiste ou un film sont faits plus tard.", "Ще ні. Копію, малюнок художника чи фільм зроблено пізніше.", "Jeszcze nie. Kopia, rysunek artysty czy film są zrobione później.", "Todavía no. Una copia, un dibujo de artista o una película se hacen más tarde."),
          [L("Demande-toi : est-ce qu'un humain préhistorique l'a fait lui-même ?", "Запитай себе: чи доісторична людина зробила це сама?", "Zapytaj siebie: czy człowiek prehistoryczny sam to zrobił?", "Pregúntate: ¿lo hizo un humano prehistórico él mismo?")]),
        CHOIX(L("CHOISIS : pourquoi a-t-on fait des copies de Lascaux ?", "ВИБЕРИ: чому зробили копії Ласко?", "WYBIERZ: dlaczego zrobiono kopie Lascaux?", "ELIGE: ¿por qué se hicieron copias de Lascaux?"),
          [opt("a", "pour protéger la vraie grotte, fermée aux visiteurs", "щоб захистити справжню печеру, закриту для відвідувачів", "żeby chronić prawdziwą jaskinię, zamkniętą dla zwiedzających", "para proteger la cueva verdadera, cerrada a los visitantes", true), opt("b", "parce que les vraies peintures ont disparu", "бо справжні малюнки зникли", "bo prawdziwe malowidła zniknęły", "porque las pinturas verdaderas desaparecieron"), opt("c", "pour faire des peintures plus belles", "щоб зробити гарніші малюнки", "żeby zrobić ładniejsze malowidła", "para hacer pinturas más bonitas")],
          L("Oui ! Trop de visiteurs abîmaient les peintures. La grotte est fermée depuis 1963.", "Так! Забагато відвідувачів псували малюнки. Печеру закрито з 1963 року.", "Tak! Zbyt wielu zwiedzających niszczyło malowidła. Jaskinia jest zamknięta od 1963 roku.", "¡Sí! Demasiados visitantes estropeaban las pinturas. La cueva está cerrada desde 1963."),
          L("Pas encore. Les vraies peintures existent toujours. Il faut les protéger.", "Ще ні. Справжні малюнки досі існують. Їх треба захищати.", "Jeszcze nie. Prawdziwe malowidła wciąż istnieją. Trzeba je chronić.", "Todavía no. Las pinturas verdaderas siguen existiendo. Hay que protegerlas."),
          [L("Notre souffle et la chaleur des visiteurs abîment les murs.", "Наше дихання й тепло відвідувачів псують стіни.", "Nasz oddech i ciepło zwiedzających niszczą ściany.", "Nuestro aliento y el calor de los visitantes estropean las paredes.")]),
        ECRIRE(L("ÉCRIS : qu'est-ce que le biface nous apprend sur la vie des humains préhistoriques ?", "НАПИШИ: що біфас розповідає нам про життя доісторичних людей?", "NAPISZ: czego pięściak uczy nas o życiu ludzi prehistorycznych?", "ESCRIBE: ¿qué nos enseña el bifaz sobre la vida de los humanos prehistóricos?"),
          ["Le biface nous apprend que", "Les humains savaient", "Ils l'utilisaient pour"], "Le biface nous apprend que les humains…",
          [L("Pense à : la matière, le travail pour le tailler, à quoi il servait.", "Подумай про: матеріал, роботу, щоб його обробити, для чого він служив.", "Pomyśl o: materiale, pracy, żeby go obrobić, do czego służył.", "Piensa en: el material, el trabajo para tallarlo, para qué servía.")]),
        AUTO("CHOISIS : est-ce que tu sais décrire une trace et la distinguer d'un travail postérieur ?", "ВИБЕРИ: чи вмієш ти описати слід і відрізнити його від пізнішої праці?", "WYBIERZ: czy umiesz opisać ślad i odróżnić go od pracy późniejszej?", "ELIGE: ¿sabes describir una huella y distinguirla de un trabajo posterior?")
      ] },

    { id: "pre-act-engis", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Une découverte près de chez nous", "Відкриття біля нас", "Odkrycie niedaleko nas", "Un descubrimiento cerca de casa"),
      objectif: L("Je situe Engis et je calcule depuis quand on connaît le crâne.", "Я знаходжу Енжі й обчислюю, відколи відомий череп.", "Znajduję Engis i obliczam, od kiedy znamy czaszkę.", "Localizo Engis y calculo desde cuándo se conoce el cráneo."),
      etapes: [
        CARTE(L("TOUCHE le repère d'Engis : au bord de la Meuse, entre Huy et Liège.", "ТОРКНИСЯ позначки Енжі: на березі Маасу, між Юї та Льєжем.", "DOTKNIJ znacznika Engis: nad Mozą, między Huy a Liège.", "TOCA la marca de Engis: a orillas del Mosa, entre Huy y Lieja."),
          BELGIQUE, [pt("ost", 10, 24), pt("nam", 55, 52), pt("eng", 73.4, 46.4), pt("arl", 80, 84)], "eng",
          L("Oui ! Engis est entre Huy et Liège. C'est à environ 15 km de l'école.", "Так! Енжі між Юї та Льєжем. Це приблизно 15 км від школи.", "Tak! Engis leży między Huy a Liège. To około 15 km od szkoły.", "¡Sí! Engis está entre Huy y Lieja. Está a unos 15 km de la escuela."),
          L("Pas encore. Trouve Huy et Liège, puis le repère entre les deux.", "Ще ні. Знайди Юї та Льєж, потім позначку між ними.", "Jeszcze nie. Znajdź Huy i Liège, potem znacznik między nimi.", "Todavía no. Busca Huy y Lieja, y luego la marca entre las dos."),
          [L("Huy et Liège sont écrits sur la carte, à droite.", "Юї та Льєж підписані на карті праворуч.", "Huy i Liège są napisane na mapie, po prawej.", "Huy y Lieja están escritos en el mapa, a la derecha.")]),
        { type: "nombre", picto: null, verbe: "CALCULE", unite: "ans", reponse: 196,
          consigne: L("CALCULE : Schmerling trouve le crâne en 1830. Combien d'années jusqu'en 2026 ?", "ПОРАХУЙ: Шмерлінг знаходить череп у 1830 році. Скільки років до 2026?", "POLICZ: Schmerling znajduje czaszkę w 1830 roku. Ile lat do 2026?", "CALCULA: Schmerling encuentra el cráneo en 1830. ¿Cuántos años hasta 2026?"),
          bravo: L("Oui ! 2026 − 1830 = 196 ans. Mais le crâne lui-même a des dizaines de milliers d'années !", "Так! 2026 − 1830 = 196 років. Але самому черепу десятки тисяч років!", "Tak! 2026 − 1830 = 196 lat. Ale sama czaszka ma dziesiątki tysięcy lat!", "¡Sí! 2026 − 1830 = 196 años. ¡Pero el cráneo tiene decenas de miles de años!"),
          erreur: L("Pas encore. Fais : grande date − petite date.", "Ще ні. Зроби: більша дата − менша дата.", "Jeszcze nie. Zrób: większa data − mniejsza data.", "Todavía no. Haz: fecha grande − fecha pequeña."),
          aides: [L("2026 − 1830 = ?", "2026 − 1830 = ?", "2026 − 1830 = ?", "2026 − 1830 = ?")] },
        CHOIX(L("CHOISIS : la date de la découverte (1830) et l'âge du crâne, c'est la même chose ?", "ВИБЕРИ: дата відкриття (1830) і вік черепа — це те саме?", "WYBIERZ: data odkrycia (1830) i wiek czaszki to to samo?", "ELIGE: ¿la fecha del descubrimiento (1830) y la edad del cráneo son lo mismo?"),
          [opt("a", "Oui, l'enfant a vécu en 1830.", "Так, дитина жила в 1830 році.", "Tak, dziecko żyło w 1830 roku.", "Sí, el niño vivió en 1830."), opt("b", "Non : l'enfant a vécu il y a très longtemps, on l'a seulement trouvé en 1830.", "Ні: дитина жила дуже давно, її лише знайшли в 1830 році.", "Nie: dziecko żyło bardzo dawno, znaleziono je dopiero w 1830 roku.", "No: el niño vivió hace muchísimo tiempo, solo se encontró en 1830.", true)],
          L("Oui ! On distingue le moment où on vit et le moment où on découvre une trace.", "Так! Ми розрізняємо час, коли жили, і час, коли знайшли слід.", "Tak! Odróżniamy czas, gdy ktoś żył, od czasu, gdy odkryto ślad.", "¡Sí! Se distingue el momento en que se vive y el momento en que se descubre una huella."),
          L("Pas encore. En 1830, ce sont les fouilles. L'enfant a vécu bien avant, à la Préhistoire.", "Ще ні. У 1830 році — розкопки. Дитина жила набагато раніше, у доісторичні часи.", "Jeszcze nie. W 1830 roku są wykopaliska. Dziecko żyło dużo wcześniej, w prehistorii.", "Todavía no. En 1830 son las excavaciones. El niño vivió mucho antes, en la Prehistoria."),
          [L("Néandertal = une espèce humaine très ancienne.", "Неандерталець — дуже давній вид людей.", "Neandertalczyk = bardzo stary gatunek człowieka.", "Neandertal = una especie humana muy antigua.")]),
        ECRIRE(L("ÉCRIS : as-tu déjà visité une grotte ou un musée ? Ou : connais-tu un lieu préhistorique dans ton pays ?", "НАПИШИ: чи бував(-ла) ти в печері або музеї? Або: чи знаєш доісторичне місце у своїй країні?", "NAPISZ: czy byłeś/byłaś kiedyś w jaskini albo muzeum? Albo: czy znasz miejsce z prehistorii w swoim kraju?", "ESCRIBE: ¿has visitado alguna vez una cueva o un museo? O: ¿conoces un lugar prehistórico en tu país?"),
          ["J'ai déjà visité", "Dans mon pays, il y a", "Je voudrais visiter"], "Dans mon pays, il y a…",
          [L("Tu peux écrire dans ta langue puis demander de l'aide pour le français.", "Можеш написати своєю мовою, а потім попросити допомоги з французькою.", "Możesz napisać w swoim języku, a potem poprosić o pomoc z francuskim.", "Puedes escribir en tu idioma y luego pedir ayuda para el francés.")]),
        AUTO("CHOISIS : est-ce que tu sais situer Engis et expliquer la découverte ?", "ВИБЕРИ: чи вмієш ти знайти Енжі й пояснити відкриття?", "WYBIERZ: czy umiesz znaleźć Engis i wyjaśnić odkrycie?", "ELIGE: ¿sabes localizar Engis y explicar el descubrimiento?")
      ] },

    { id: "pre-act-paysans", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Nomades ou paysans ?", "Кочівники чи селяни?", "Koczownicy czy rolnicy?", "¿Nómadas o campesinos?"),
      objectif: L("Je compare deux modes de vie et je situe le Proche-Orient.", "Я порівнюю два способи життя й знаходжу Близький Схід.", "Porównuję dwa sposoby życia i znajduję Bliski Wschód.", "Comparo dos formas de vida y localizo Oriente Próximo."),
      etapes: [
        CLASSER(L("CLASSE : vie des chasseurs-cueilleurs (Paléolithique) ou des premiers paysans (Néolithique) ?", "РОЗПОДІЛИ: життя мисливців-збирачів (палеоліт) чи перших селян (неоліт)?", "PRZYPORZĄDKUJ: życie łowców-zbieraczy (paleolit) czy pierwszych rolników (neolit)?", "CLASIFICA: ¿vida de los cazadores-recolectores (Paleolítico) o de los primeros campesinos (Neolítico)?"),
          [{ id: "pal", label: L("Chasseurs-cueilleurs", "Мисливці-збирачі", "Łowcy-zbieracze", "Cazadores-recolectores") }, { id: "neo", label: L("Premiers paysans", "Перші селяни", "Pierwsi rolnicy", "Primeros campesinos") }],
          [el("nomade", "Ils se déplacent souvent (nomades).", "Вони часто переміщуються (кочівники).", "Często się przemieszczają (koczownicy).", "Se desplazan a menudo (nómadas).", "pal"),
           el("chasse", "Ils trouvent la nourriture en chassant et en cueillant.", "Вони добувають їжу полюванням і збиранням.", "Zdobywają jedzenie, polując i zbierając.", "Consiguen la comida cazando y recolectando.", "pal"),
           el("tente", "Ils dorment sous des abris ou dans des grottes.", "Вони сплять у сховищах або в печерах.", "Śpią w schronieniach albo w jaskiniach.", "Duermen en refugios o en cuevas.", "pal"),
           el("sed", "Ils restent au même endroit (sédentaires).", "Вони залишаються на одному місці (осілі).", "Zostają w jednym miejscu (osiadli).", "Se quedan en el mismo lugar (sedentarios).", "neo"),
           el("cultive", "Ils cultivent des céréales et élèvent des animaux.", "Вони вирощують зернові й розводять тварин.", "Uprawiają zboża i hodują zwierzęta.", "Cultivan cereales y crían animales.", "neo"),
           el("pot", "Ils fabriquent des poteries pour garder les graines.", "Вони роблять глиняний посуд, щоб зберігати зерно.", "Robią naczynia gliniane, żeby przechowywać ziarno.", "Fabrican cerámica para guardar las semillas.", "neo")],
          L("Bravo ! Tu sais comparer les deux modes de vie.", "Молодець! Ти вмієш порівнювати два способи життя.", "Brawo! Umiesz porównać dwa sposoby życia.", "¡Bien! Sabes comparar las dos formas de vida."),
          L("Pas encore. Les paysans restent près de leurs champs. Les chasseurs suivent les animaux.", "Ще ні. Селяни залишаються біля своїх полів. Мисливці йдуть за тваринами.", "Jeszcze nie. Rolnicy zostają przy swoich polach. Łowcy idą za zwierzętami.", "Todavía no. Los campesinos se quedan cerca de sus campos. Los cazadores siguen a los animales."),
          [L("Un champ ne bouge pas : celui qui cultive doit rester.", "Поле не рухається: хто обробляє землю, мусить залишатися.", "Pole się nie rusza: kto uprawia, musi zostać.", "Un campo no se mueve: quien cultiva debe quedarse.")]),
        CARTE(L("TOUCHE le repère du Proche-Orient, où naît l'agriculture (aujourd'hui l'Irak, la Syrie…).", "ТОРКНИСЯ позначки Близького Сходу, де виникло землеробство (сьогодні Ірак, Сирія…).", "DOTKNIJ znacznika Bliskiego Wschodu, gdzie narodziło się rolnictwo (dziś Irak, Syria…).", "TOCA la marca de Oriente Próximo, donde nace la agricultura (hoy Irak, Siria…)."),
          MONDE, [pt("am", 27, 35), pt("po", 60, 31), pt("cn", 74, 30), pt("afe", 59, 47)], "po",
          L("Oui ! Le Proche-Orient, entre l'Afrique, l'Europe et l'Asie.", "Так! Близький Схід — між Африкою, Європою та Азією.", "Tak! Bliski Wschód, między Afryką, Europą a Azją.", "¡Sí! Oriente Próximo, entre África, Europa y Asia."),
          L("Pas encore. Cherche juste au-dessus de l'Afrique, à droite de la mer Méditerranée.", "Ще ні. Шукай трохи вище Африки, праворуч від Середземного моря.", "Jeszcze nie. Szukaj tuż nad Afryką, na prawo od Morza Śródziemnego.", "Todavía no. Busca justo encima de África, a la derecha del mar Mediterráneo."),
          [L("Si tu viens de Syrie ou d'Irak, c'est chez toi !", "Якщо ти з Сирії чи Іраку, це твій дім!", "Jeśli pochodzisz z Syrii albo Iraku, to twoje strony!", "Si vienes de Siria o de Irak, ¡es tu tierra!")]),
        ORDRE(CONSIGNE_ORDRE("RANGE le chemin de l'agriculture, du plus ancien au plus récent.", "РОЗТАШУЙ шлях землеробства від найдавнішого до найновішого.", "UŁÓŻ drogę rolnictwa od najdawniejszego do najnowszego.", "ORDENA el camino de la agricultura, del más antiguo al más reciente."),
          [el("a1", "Proche-Orient (− 10 000)", "Близький Схід (− 10 000)", "Bliski Wschód (− 10 000)", "Oriente Próximo (− 10 000)"),
           el("a2", "Grèce (− 6500)", "Греція (− 6500)", "Grecja (− 6500)", "Grecia (− 6500)"),
           el("a3", "Hesbaye, près de Huy (− 5300)", "Есбай, біля Юї (− 5300)", "Hesbaye, niedaleko Huy (− 5300)", "Hesbaye, cerca de Huy (− 5300)")],
          L("Bravo ! L'agriculture voyage lentement du Proche-Orient jusque chez nous.", "Молодець! Землеробство повільно мандрує з Близького Сходу до нас.", "Brawo! Rolnictwo powoli wędruje z Bliskiego Wschodu do nas.", "¡Bien! La agricultura viaja lentamente de Oriente Próximo hasta nosotros."),
          L("Pas encore. − 10 000 est le plus ancien.", "Ще ні. − 10 000 — найдавніше.", "Jeszcze nie. − 10 000 jest najdawniejsze.", "Todavía no. − 10 000 es lo más antiguo."),
          [L("Avec « − », le plus grand nombre est le plus ancien.", "Зі знаком «−» найбільше число — найдавніше.", "Ze znakiem „−” największa liczba jest najdawniejsza.", "Con «−», el número más grande es el más antiguo.")]),
        ECRIRE(L("ÉCRIS deux phrases pour comparer : avant, les humains… ; au Néolithique, ils…", "НАПИШИ два речення, щоб порівняти: раніше люди… ; у неоліті вони…", "NAPISZ dwa zdania, żeby porównać: wcześniej ludzie… ; w neolicie oni…", "ESCRIBE dos frases para comparar: antes, los humanos… ; en el Neolítico, ellos…"),
          ["Avant, les humains", "Au Néolithique, ils", "La grande différence, c'est que"], "Avant, les humains étaient nomades. Au Néolithique…",
          [L("Utilise les mots : nomade, sédentaire, chasser, cultiver.", "Вживай слова: nomade, sédentaire, chasser, cultiver.", "Użyj słów: nomade, sédentaire, chasser, cultiver.", "Usa las palabras: nomade, sédentaire, chasser, cultiver.")]),
        AUTO("CHOISIS : est-ce que tu sais comparer la vie des nomades et des premiers paysans ?", "ВИБЕРИ: чи вмієш ти порівняти життя кочівників і перших селян?", "WYBIERZ: czy umiesz porównać życie koczowników i pierwszych rolników?", "ELIGE: ¿sabes comparar la vida de los nómadas y de los primeros campesinos?")
      ] }
  );

  /* ---------- Mini-tests et bilan ---------- */
  P.tests.push(
    { id: "test-pre-temps", titre: L("Mini-test : quand et où ?", "Міні-тест: коли й де?", "Mini-test: kiedy i gdzie?", "Mini-prueba: ¿cuándo y dónde?"),
      questions: [
        Q("pre-frise", L("CHOISIS : la Préhistoire finit avec…", "ВИБЕРИ: доісторичні часи закінчуються з…", "WYBIERZ: prehistoria kończy się wraz z…", "ELIGE: la Prehistoria termina con…"),
          [o("l'invention de l'écriture", "винайденням письма", "wynalezieniem pisma", "la invención de la escritura", true), o("la maîtrise du feu", "опануванням вогню", "opanowaniem ognia", "el dominio del fuego"), o("la naissance de Jésus-Christ", "народженням Ісуса Христа", "narodzeniem Jezusa Chrystusa", "el nacimiento de Jesucristo")],
          L("L'écriture (vers − 3300) marque la fin de la Préhistoire.", "Письмо (близько − 3300) позначає кінець доісторичних часів.", "Pismo (około − 3300) oznacza koniec prehistorii.", "La escritura (hacia − 3300) marca el fin de la Prehistoria.")),
        Q("pre-frise", L("CHOISIS le plus ancien.", "ВИБЕРИ найдавніше.", "WYBIERZ najdawniejsze.", "ELIGE lo más antiguo."),
          [o("les peintures de Lascaux", "малюнки Ласко", "malowidła z Lascaux", "las pinturas de Lascaux"), o("la maîtrise du feu", "опанування вогню", "opanowanie ognia", "el dominio del fuego", true), o("les premiers paysans", "перші селяни", "pierwsi rolnicy", "los primeros campesinos")],
          L("Le feu (il y a 400 000 ans) est bien avant Lascaux (17 000 ans).", "Вогонь (400 000 років тому) набагато раніше за Ласко (17 000 років).", "Ogień (400 000 lat temu) jest dużo wcześniej niż Lascaux (17 000 lat).", "El fuego (hace 400 000 años) es mucho antes que Lascaux (17 000 años).")),
        Q("pre-carte", L("CHOISIS : où vivent les premiers humains ?", "ВИБЕРИ: де живуть перші люди?", "WYBIERZ: gdzie żyją pierwsi ludzie?", "ELIGE: ¿dónde viven los primeros humanos?"),
          [o("en Afrique de l'Est", "у Східній Африці", "w Afryce Wschodniej", "en África del Este", true), o("en Belgique", "у Бельгії", "w Belgii", "en Bélgica"), o("en Amérique", "в Америці", "w Ameryce", "en América")],
          L("Les premiers humains vivent en Afrique de l'Est.", "Перші люди живуть у Східній Африці.", "Pierwsi ludzie żyją w Afryce Wschodniej.", "Los primeros humanos viven en África del Este."))
      ] },
    { id: "test-pre-chasseurs", titre: L("Mini-test : chasseurs-cueilleurs", "Міні-тест: мисливці-збирачі", "Mini-test: łowcy-zbieracze", "Mini-prueba: cazadores-recolectores"),
      questions: [
        Q("pre-nomade", L("CHOISIS : pourquoi les chasseurs-cueilleurs sont-ils nomades ?", "ВИБЕРИ: чому мисливці-збирачі — кочівники?", "WYBIERZ: dlaczego łowcy-zbieracze są koczownikami?", "ELIGE: ¿por qué los cazadores-recolectores son nómadas?"),
          [o("pour suivre les animaux et trouver à manger", "щоб іти за тваринами й знаходити їжу", "żeby iść za zwierzętami i znaleźć jedzenie", "para seguir a los animales y encontrar comida", true), o("pour visiter des pays", "щоб відвідувати країни", "żeby zwiedzać kraje", "para visitar países"), o("parce qu'ils n'aiment pas les grottes", "бо не люблять печер", "bo nie lubią jaskiń", "porque no les gustan las cuevas")],
          L("Ils se déplacent pour trouver de la nourriture selon les saisons.", "Вони переміщуються, щоб знаходити їжу залежно від пори року.", "Przemieszczają się, żeby znaleźć jedzenie zależnie od pory roku.", "Se desplazan para encontrar comida según las estaciones.")),
        Q("pre-trace", L("CHOISIS : la copie de Lascaux au musée de Brno est…", "ВИБЕРИ: копія Ласко в музеї Брно — це…", "WYBIERZ: kopia Lascaux w muzeum w Brnie to…", "ELIGE: la copia de Lascaux en el museo de Brno es…"),
          [o("une trace du passé", "слід минулого", "ślad przeszłości", "una huella del pasado"), o("un travail postérieur", "пізніша праця", "praca późniejsza", "un trabajo posterior", true)],
          L("Elle a été faite à notre époque : c'est un travail postérieur.", "Її зроблено в наш час: це пізніша праця.", "Zrobiono ją w naszych czasach: to praca późniejsza.", "Se hizo en nuestra época: es un trabajo posterior."), DOC.replique),
        Q("pre-decrire", L("CHOISIS : quelle information vient de la légende d'un document ?", "ВИБЕРИ: яка інформація походить з підпису документа?", "WYBIERZ: jaka informacja pochodzi z podpisu dokumentu?", "ELIGE: ¿qué información viene de la leyenda de un documento?"),
          [o("où il a été trouvé et quand il a été fait", "де його знайшли й коли зробили", "gdzie go znaleziono i kiedy go zrobiono", "dónde se encontró y cuándo se hizo", true), o("s'il est joli", "чи він гарний", "czy jest ładny", "si es bonito"), o("son prix", "його ціна", "jego cena", "su precio")],
          L("La légende dit QUOI, OÙ, QUAND et QUI.", "Підпис каже ЩО, ДЕ, КОЛИ і ХТО.", "Podpis mówi CO, GDZIE, KIEDY i KTO.", "La leyenda dice QUÉ, DÓNDE, CUÁNDO y QUIÉN."))
      ] },
    { id: "test-pre-engis", titre: L("Mini-test : la Préhistoire près de Huy", "Міні-тест: доісторичні часи біля Юї", "Mini-test: prehistoria niedaleko Huy", "Mini-prueba: la Prehistoria cerca de Huy"),
      questions: [
        Q("pre-engis-carte", L("CHOISIS : où se trouve Engis ?", "ВИБЕРИ: де знаходиться Енжі?", "WYBIERZ: gdzie leży Engis?", "ELIGE: ¿dónde está Engis?"),
          [o("entre Huy et Liège, au bord de la Meuse", "між Юї та Льєжем, на березі Маасу", "między Huy a Liège, nad Mozą", "entre Huy y Lieja, a orillas del Mosa", true), o("à la mer, près d'Ostende", "біля моря, поблизу Остенде", "nad morzem, koło Ostendy", "en el mar, cerca de Ostende"), o("en France", "у Франції", "we Francji", "en Francia")],
          L("Engis est entre Huy et Liège, au bord de la Meuse.", "Енжі між Юї та Льєжем, на березі Маасу.", "Engis leży między Huy a Liège, nad Mozą.", "Engis está entre Huy y Lieja, a orillas del Mosa.")),
        Q("pre-engis-calcul", L("CALCULE : on trouve le crâne en 1830. Combien d'années jusqu'en 2030 ?", "ПОРАХУЙ: череп знаходять у 1830 році. Скільки років до 2030?", "POLICZ: czaszkę znaleziono w 1830 roku. Ile lat do 2030?", "CALCULA: el cráneo se encuentra en 1830. ¿Cuántos años hasta 2030?"),
          [o("100 ans", "100 років", "100 lat", "100 años"), o("200 ans", "200 років", "200 lat", "200 años", true), o("2000 ans", "2000 років", "2000 lat", "2000 años")],
          L("2030 − 1830 = 200 ans.", "2030 − 1830 = 200 років.", "2030 − 1830 = 200 lat.", "2030 − 1830 = 200 años.")),
        Q("pre-engis-calcul", L("CHOISIS : qui a trouvé le crâne d'Engis ?", "ВИБЕРИ: хто знайшов череп з Енжі?", "WYBIERZ: kto znalazł czaszkę z Engis?", "ELIGE: ¿quién encontró el cráneo de Engis?"),
          [o("le médecin Schmerling", "лікар Шмерлінг", "lekarz Schmerling", "el médico Schmerling", true), o("un roi de Belgique", "король Бельгії", "król Belgii", "un rey de Bélgica"), o("un enfant néandertalien", "дитина-неандерталець", "dziecko neandertalczyka", "un niño neandertal")],
          L("Philippe-Charles Schmerling, en 1829-1830.", "Філіпп-Шарль Шмерлінг, у 1829–1830 роках.", "Philippe-Charles Schmerling, w latach 1829–1830.", "Philippe-Charles Schmerling, en 1829-1830."))
      ] },
    { id: "test-pre-paysans", titre: L("Mini-test : les premiers paysans", "Міні-тест: перші селяни", "Mini-test: pierwsi rolnicy", "Mini-prueba: los primeros campesinos"),
      questions: [
        Q("pre-comparer", L("CHOISIS : « sédentaire » veut dire…", "ВИБЕРИ: «осілий» означає…", "WYBIERZ: „osiadły” znaczy…", "ELIGE: «sedentario» quiere decir…"),
          [o("qui reste au même endroit", "той, хто залишається на одному місці", "który zostaje w jednym miejscu", "que se queda en el mismo lugar", true), o("qui se déplace tout le temps", "той, хто постійно переміщується", "który ciągle się przemieszcza", "que se desplaza todo el tiempo"), o("qui chasse les animaux", "той, хто полює на тварин", "który poluje na zwierzęta", "que caza animales")],
          L("Sédentaire = rester au même endroit. Le contraire : nomade.", "Осілий = залишатися на одному місці. Протилежне: кочівник.", "Osiadły = zostawać w jednym miejscu. Przeciwieństwo: koczownik.", "Sedentario = quedarse en el mismo lugar. Lo contrario: nómada.")),
        Q("pre-neo-carte", L("CHOISIS : où naît l'agriculture ?", "ВИБЕРИ: де виникає землеробство?", "WYBIERZ: gdzie rodzi się rolnictwo?", "ELIGE: ¿dónde nace la agricultura?"),
          [o("au Proche-Orient", "на Близькому Сході", "na Bliskim Wschodzie", "en Oriente Próximo", true), o("en Belgique", "у Бельгії", "w Belgii", "en Bélgica"), o("en Amérique", "в Америці", "w Ameryce", "en América")],
          L("Au Proche-Orient, vers − 10 000.", "На Близькому Сході, близько − 10 000.", "Na Bliskim Wschodzie, około − 10 000.", "En Oriente Próximo, hacia − 10 000.")),
        Q("pre-comparer", L("CHOISIS ce qui change au Néolithique.", "ВИБЕРИ, що змінюється в неоліті.", "WYBIERZ, co zmienia się w neolicie.", "ELIGE lo que cambia en el Neolítico."),
          [o("Les humains cultivent et construisent des villages.", "Люди обробляють землю й будують села.", "Ludzie uprawiają ziemię i budują wioski.", "Los humanos cultivan y construyen aldeas.", true), o("Les humains inventent la voiture.", "Люди винаходять автомобіль.", "Ludzie wynajdują samochód.", "Los humanos inventan el coche."), o("Les humains arrêtent de manger de la viande.", "Люди перестають їсти м'ясо.", "Ludzie przestają jeść mięso.", "Los humanos dejan de comer carne.")],
          L("Ils cultivent, élèvent des animaux et vivent dans des villages.", "Вони обробляють землю, розводять тварин і живуть у селах.", "Uprawiają ziemię, hodują zwierzęta i żyją w wioskach.", "Cultivan, crían animales y viven en aldeas."))
      ] },
    { id: "bilan-hist-prehistoire", titre: L("Test de fin : la Préhistoire", "Підсумковий тест: доісторичні часи", "Test końcowy: prehistoria", "Prueba final: la Prehistoria"),
      questions: [
        Q("pre-frise", L("CHOISIS l'ordre juste (du plus ancien au plus récent).", "ВИБЕРИ правильний порядок (від найдавнішого до найновішого).", "WYBIERZ dobrą kolejność (od najdawniejszego do najnowszego).", "ELIGE el orden correcto (del más antiguo al más reciente)."),
          [o("feu → Lascaux → premiers paysans → écriture", "вогонь → Ласко → перші селяни → письмо", "ogień → Lascaux → pierwsi rolnicy → pismo", "fuego → Lascaux → primeros campesinos → escritura", true), o("Lascaux → feu → écriture → premiers paysans", "Ласко → вогонь → письмо → перші селяни", "Lascaux → ogień → pismo → pierwsi rolnicy", "Lascaux → fuego → escritura → primeros campesinos"), o("premiers paysans → feu → Lascaux → écriture", "перші селяни → вогонь → Ласко → письмо", "pierwsi rolnicy → ogień → Lascaux → pismo", "primeros campesinos → fuego → Lascaux → escritura")],
          L("Feu (400 000 ans), Lascaux (17 000 ans), paysans (− 10 000), écriture (− 3300).", "Вогонь (400 000 років), Ласко (17 000 років), селяни (− 10 000), письмо (− 3300).", "Ogień (400 000 lat), Lascaux (17 000 lat), rolnicy (− 10 000), pismo (− 3300).", "Fuego (400 000 años), Lascaux (17 000 años), campesinos (− 10 000), escritura (− 3300).")),
        Q("pre-carte", L("CHOISIS : les premiers humains viennent…", "ВИБЕРИ: перші люди походять…", "WYBIERZ: pierwsi ludzie pochodzą…", "ELIGE: los primeros humanos vienen…"),
          [o("d'Afrique de l'Est", "зі Східної Африки", "z Afryki Wschodniej", "de África del Este", true), o("d'Europe", "з Європи", "z Europy", "de Europa"), o("d'Asie", "з Азії", "z Azji", "de Asia")],
          L("D'Afrique de l'Est, puis ils partent vers l'Asie et l'Europe.", "Зі Східної Африки, потім вони йдуть до Азії та Європи.", "Z Afryki Wschodniej, potem wędrują do Azji i Europy.", "De África del Este, y luego se van hacia Asia y Europa.")),
        Q("pre-decrire", L("CHOISIS : le biface est en…", "ВИБЕРИ: біфас зроблений з…", "WYBIERZ: pięściak jest z…", "ELIGE: el bifaz es de…"),
          [o("silex", "кременю", "krzemienia", "sílex", true), o("fer", "заліза", "żelaza", "hierro"), o("bois", "дерева", "drewna", "madera")],
          L("En silex, une pierre dure qu'on taille.", "З кременю — твердого каменю, який обробляють.", "Z krzemienia, twardego kamienia, który się obrabia.", "De sílex, una piedra dura que se talla."), DOC.biface),
        Q("pre-trace", L("CHOISIS la trace du passé.", "ВИБЕРИ слід минулого.", "WYBIERZ ślad przeszłości.", "ELIGE la huella del pasado."),
          [o("le crâne trouvé à Engis", "череп, знайдений в Енжі", "czaszka znaleziona w Engis", "el cráneo encontrado en Engis", true), o("un dessin d'artiste de 2015", "малюнок художника 2015 року", "rysunek artysty z 2015 roku", "un dibujo de artista de 2015"), o("la copie de Lascaux", "копія Ласко", "kopia Lascaux", "la copia de Lascaux")],
          L("Le crâne vient vraiment de la Préhistoire : c'est une trace.", "Череп справді з доісторичних часів: це слід.", "Czaszka naprawdę pochodzi z prehistorii: to ślad.", "El cráneo viene de verdad de la Prehistoria: es una huella.")),
        Q("pre-engis-carte", L("CHOISIS : Engis se trouve…", "ВИБЕРИ: Енжі знаходиться…", "WYBIERZ: Engis leży…", "ELIGE: Engis está…"),
          [o("près de Huy", "біля Юї", "niedaleko Huy", "cerca de Huy", true), o("près de Bruxelles", "біля Брюсселя", "niedaleko Brukseli", "cerca de Bruselas"), o("en Afrique", "в Африці", "w Afryce", "en África")],
          L("Engis est entre Huy et Liège.", "Енжі між Юї та Льєжем.", "Engis leży między Huy a Liège.", "Engis está entre Huy y Lieja.")),
        Q("pre-comparer", L("CHOISIS : un paysan du Néolithique est…", "ВИБЕРИ: селянин неоліту —…", "WYBIERZ: rolnik z neolitu jest…", "ELIGE: un campesino del Neolítico es…"),
          [o("sédentaire", "осілий", "osiadły", "sedentario", true), o("nomade", "кочівник", "koczownik", "nómada")],
          L("Il reste près de ses champs : il est sédentaire.", "Він залишається біля своїх полів: він осілий.", "Zostaje przy swoich polach: jest osiadły.", "Se queda cerca de sus campos: es sedentario.")),
        Q("pre-neo-carte", L("CHOISIS : vers − 5300, les premiers paysans s'installent…", "ВИБЕРИ: близько − 5300 перші селяни оселяються…", "WYBIERZ: około − 5300 pierwsi rolnicy osiedlają się…", "ELIGE: hacia − 5300, los primeros campesinos se instalan…"),
          [o("en Hesbaye, près de Huy", "в Есбаї, біля Юї", "w Hesbaye, niedaleko Huy", "en Hesbaye, cerca de Huy", true), o("à Lascaux", "у Ласко", "w Lascaux", "en Lascaux"), o("à Bruxelles", "у Брюсселі", "w Brukseli", "en Bruselas")],
          L("En Hesbaye, sur les bonnes terres près de Huy.", "В Есбаї, на добрих землях біля Юї.", "W Hesbaye, na dobrych ziemiach niedaleko Huy.", "En Hesbaye, en las buenas tierras cerca de Huy."))
      ] }
  );
})();
