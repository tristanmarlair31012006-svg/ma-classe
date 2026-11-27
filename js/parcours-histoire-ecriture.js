/* Histoire, module 2 : écrire, compter, mesurer (± 3 h, 4 séquences). Verrou : test des rappels.
   Les élèves travaillent directement sur les traces : on touche un signe SUR la tablette, on décode des chiffres
   égyptiens, on retrouve la partie grecque de la pierre de Rosette… Tâches volontairement variées d'une séquence à l'autre.
   Documents numérotés 1 à 8 sur tout le module. rn (kirundi) = null tant que pas relu. */
(function () {
  "use strict";
  const P = window.PARCOURS, D = window.DATA;
  const L = (fr, uk, pl, es) => ({ fr, uk, pl, es, rn: null });
  const IMG = "img/histoire/";
  const MONDE = "img/prerequis/continents-oceans.png";
  const crit = (id, fr, uk, pl, es) => ({ id, t: L(fr, uk, pl, es) });
  const Q = (critere, consigne, options, explication, doc) => Object.assign({ critere, consigne, options, explication }, doc ? { doc } : {});
  const o = (fr, uk, pl, es, ok) => Object.assign({ label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const RETIENS = L("Ce que je retiens", "Що я запам'ятовую", "Co zapamiętuję", "Lo que recuerdo");
  const AUTO = (fr, uk, pl, es) => ({ type: "auto", picto: 3245, verbe: "CHOISIS", consigne: L(fr, uk, pl, es) });
  const el = (id, fr, uk, pl, es, bac) => Object.assign({ id, label: L(fr, uk, pl, es) }, bac ? { bac } : {});
  const opt = (id, fr, uk, pl, es, ok) => Object.assign({ id, label: L(fr, uk, pl, es) }, ok ? { correct: true } : {});
  const pt = (id, x, y) => ({ id, x, y });
  const ASTUCE_MICRO = L("Tu peux aussi toucher le micro du clavier et parler.", "Можеш також натиснути мікрофон на клавіатурі й говорити.", "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", "También puedes tocar el micrófono del teclado y hablar.");
  const CARTE = (verbe, consigne, carte, points, bonne, bravo, erreur, aides) => ({ type: "carte", picto: null, verbe, consigne, carte, points, bonne, bravo, erreur, aides });
  const CLASSER = (consigne, bacs, elements, bravo, erreur, aides) => ({ type: "classer", picto: null, verbe: "CLASSE", consigne, bacs, elements, bravo, erreur, aides });
  const CHOIX = (consigne, options, bravo, erreur, aides, plus) => Object.assign({ type: "choix", picto: null, verbe: "CHOISIS", consigne, options, bravo, erreur, aides }, plus || {});
  const NOMBRE = (verbe, consigne, reponse, unite, bravo, erreur, aides, plus) => Object.assign({ type: "nombre", picto: null, verbe, consigne, reponse, unite, bravo, erreur, aides }, plus || {});
  const ECRIRE = (verbe, consigne, amorces, placeholder, aides, plus) => Object.assign({ type: "ecrire", picto: null, verbe, consigne, amorces, placeholder, astuce: ASTUCE_MICRO, aides }, plus || {});

  /* ---------- Documents (1 à 8) ---------- */
  const DOC = {
    ishango: { n: 1, src: IMG + "ecr-ishango.jpg",
      legende: L("Photographie de l'os d'Ishango, un os couvert d'entailles, trouvé en 1950 à Ishango (République démocratique du Congo), au bord du lac Édouard. Il a environ 20 000 ans. Institut royal des Sciences naturelles de Belgique, Bruxelles.",
        "Фотографія кістки з Ішанго, вкритої насічками, знайденої в 1950 році в Ішанго (Демократична Республіка Конго) на березі озера Едуард. Їй приблизно 20 000 років. Королівський бельгійський інститут природничих наук, Брюссель.",
        "Zdjęcie kości z Ishango, pokrytej nacięciami, znalezionej w 1950 roku w Ishango (Demokratyczna Republika Konga), nad jeziorem Edwarda. Ma około 20 000 lat. Królewski Belgijski Instytut Nauk Przyrodniczych, Bruksela.",
        "Fotografía del hueso de Ishango, un hueso cubierto de muescas, encontrado en 1950 en Ishango (República Democrática del Congo), a orillas del lago Eduardo. Tiene unos 20 000 años. Real Instituto Belga de Ciencias Naturales, Bruselas."),
      credit: "Photo : Joeykentin, 2022 (Wikimedia Commons, CC BY-SA 4.0)" },
    monde: { n: 2, src: MONDE,
      legende: L("Carte du monde : les continents et les océans.", "Карта світу: континенти й океани.", "Mapa świata: kontynenty i oceany.", "Mapa del mundo: los continentes y los océanos."),
      credit: "Réalisé par T.Marlair sur base de la carte de Cogito ergo sumo (Wikimedia Commons, CC BY-SA 3.0)" },
    tablette: { n: 3, src: IMG + "ecr-tablette-jemdet-nasr.jpg",
      legende: L("Photographie d'une tablette d'argile trouvée à Jemdet Nasr (Irak), vers − 3000. On y voit une tête avec un bol, un épi de céréale et des ronds. Ashmolean Museum, Oxford (Royaume-Uni).",
        "Фотографія глиняної таблички, знайденої в Джемдет-Насрі (Ірак), близько − 3000. На ній видно голову з мискою, колосок і кружечки. Музей Ешмола, Оксфорд (Велика Британія).",
        "Zdjęcie glinianej tabliczki znalezionej w Dżemdet Nasr (Irak), około − 3000. Widać na niej głowę z miską, kłos zboża i kółka. Ashmolean Museum, Oksford (Wielka Brytania).",
        "Fotografía de una tablilla de arcilla encontrada en Jemdet Nasr (Irak), hacia − 3000. Se ve una cabeza con un cuenco, una espiga de cereal y círculos. Ashmolean Museum, Oxford (Reino Unido)."),
      credit: "Photo : Zunkir, 2022 (Wikimedia Commons, CC BY-SA 4.0)" },
    chiffres: { n: 4, src: IMG + "ecr-chiffres-egyptiens.svg",
      legende: L("Tableau des chiffres utilisés par les Égyptiens dans les hiéroglyphes.", "Таблиця цифр, якими єгиптяни користувалися в ієрогліфах.", "Tabela cyfr używanych przez Egipcjan w hieroglifach.", "Tabla de las cifras que usaban los egipcios en los jeroglíficos."),
      credit: "Réalisé par T.Marlair" },
    rhind: { n: 5, src: IMG + "ecr-rhind.jpg",
      legende: L("Photographie d'une partie du papyrus Rhind, un rouleau couvert de problèmes de calcul, écrit par le scribe Ahmès en Égypte vers − 1550. British Museum, Londres.",
        "Фотографія частини папірусу Рінда — сувою з математичними задачами, написаного писарем Ахмесом у Єгипті близько − 1550. Британський музей, Лондон.",
        "Zdjęcie fragmentu papirusu Rhinda, zwoju pełnego zadań z rachunków, spisanego przez skrybę Ahmesa w Egipcie około − 1550. British Museum, Londyn.",
        "Fotografía de una parte del papiro Rhind, un rollo lleno de problemas de cálculo, escrito por el escriba Ahmes en Egipto hacia − 1550. British Museum, Londres."),
      credit: "Domaine public (Wikimedia Commons)" },
    coudee: { n: 6, src: IMG + "ecr-coudee-kha.jpg",
      legende: L("Photographie d'une règle pliante en bois qui mesure une coudée, retrouvée dans la tombe de l'architecte Kha, à Deir el-Médineh (Égypte), vers − 1400. Musée égyptien de Turin (Italie).",
        "Фотографія дерев'яної складаної лінійки завдовжки один лікоть, знайденої в гробниці архітектора Кха в Дейр-ель-Медіні (Єгипет), близько − 1400. Єгипетський музей Турина (Італія).",
        "Zdjęcie składanej drewnianej linijki o długości jednego łokcia, znalezionej w grobowcu architekta Cha w Deir el-Medina (Egipt), około − 1400. Muzeum Egipskie w Turynie (Włochy).",
        "Fotografía de una regla plegable de madera que mide un codo, encontrada en la tumba del arquitecto Kha, en Deir el-Medina (Egipto), hacia − 1400. Museo Egipcio de Turín (Italia)."),
      credit: "Photo : Museo Egizio, 2021 (Wikimedia Commons, CC0)" },
    rosette: { n: 7, src: IMG + "ecr-rosette.jpg",
      legende: L("Photographie de la pierre de Rosette, trouvée en Égypte en 1799. Le même texte, de − 196, y est écrit trois fois : en hiéroglyphes (en haut), en démotique (au milieu) et en grec (en bas). British Museum, Londres.",
        "Фотографія Розеттського каменю, знайденого в Єгипті в 1799 році. Той самий текст − 196 року написано на ньому тричі: ієрогліфами (вгорі), демотичним письмом (посередині) і грецькою (внизу). Британський музей, Лондон.",
        "Zdjęcie kamienia z Rosetty, znalezionego w Egipcie w 1799 roku. Ten sam tekst z − 196 roku jest na nim zapisany trzy razy: hieroglifami (na górze), pismem demotycznym (w środku) i po grecku (na dole). British Museum, Londyn.",
        "Fotografía de la piedra de Rosetta, encontrada en Egipto en 1799. El mismo texto, de − 196, está escrito tres veces: en jeroglíficos (arriba), en demótico (en el medio) y en griego (abajo). British Museum, Londres."),
      credit: "Photo : Hans Hillewaert, 2007 (Wikimedia Commons, CC BY-SA 4.0)" },
    ahiram: { n: 8, src: IMG + "ecr-ahiram.jpg",
      legende: L("Photographie du sarcophage d'Ahiram, roi de Byblos (Liban), vers − 1000. Sur le couvercle, une des plus anciennes inscriptions écrites avec l'alphabet phénicien. Musée national de Beyrouth (Liban).",
        "Фотографія саркофага Ахірама, царя Бібла (Ліван), близько − 1000. На кришці — один із найдавніших написів фінікійським алфавітом. Національний музей Бейрута (Ліван).",
        "Zdjęcie sarkofagu Ahirama, króla Byblos (Liban), około − 1000. Na pokrywie jedna z najstarszych inskrypcji zapisanych alfabetem fenickim. Muzeum Narodowe w Bejrucie (Liban).",
        "Fotografía del sarcófago de Ahiram, rey de Biblos (Líbano), hacia − 1000. En la tapa, una de las inscripciones más antiguas escritas con el alfabeto fenicio. Museo Nacional de Beirut (Líbano)."),
      credit: "Photo : O.Mustafin, 2010 (Wikimedia Commons, domaine public)" }
  };

  /* ---------- Chapitre : juste après la Préhistoire ---------- */
  const iPre = P.chapitres.findIndex(c => c.id === "hist-prehistoire");
  P.chapitres.splice(iPre + 1, 0, { id: "hist-ecriture", discipline: "histoire", verrou: { test: "bilan-pr-histoire", min: 0.5 },
    titre: L("2. Compter, écrire, mesurer : les premières écritures", "2. Рахувати, писати, вимірювати: перші писемності", "2. Liczyć, pisać, mierzyć: pierwsze pisma", "2. Contar, escribir, medir: las primeras escrituras"),
    dejaVu: [L("Tu vas enquêter sur de vrais objets : un os du Congo, une tablette d'Irak, un papyrus et une pierre d'Égypte.", "Ти досліджуватимеш справжні предмети: кістку з Конго, табличку з Іраку, папірус і камінь з Єгипту.", "Zbadasz prawdziwe przedmioty: kość z Konga, tabliczkę z Iraku, papirus i kamień z Egiptu.", "Vas a investigar objetos reales: un hueso del Congo, una tablilla de Irak, un papiro y una piedra de Egipto.")],
    sequences: ["ecr-compter", "ecr-mesopotamie", "ecr-egypte", "ecr-relire"], bilan: "bilan-hist-ecriture" });

  /* ---------- Séquences ---------- */
  P.sequences.push(
    { id: "ecr-compter",
      titre: L("Comment compter sans écrire ?", "Як рахувати, не вміючи писати?", "Jak liczyć bez pisania?", "¿Cómo contar sin escribir?"),
      objectif: L("J'émets une hypothèse sur une trace très ancienne et je la situe dans le temps et sur la carte.", "Я висуваю гіпотезу про дуже давній слід і розміщую його в часі та на карті.", "Stawiam hipotezę na temat bardzo starego śladu i umieszczam go w czasie i na mapie.", "Formulo una hipótesis sobre una huella muy antigua y la sitúo en el tiempo y en el mapa."),
      criteres: [
        crit("ecr-hypo", "J'émets une hypothèse à partir d'une trace.", "Я висуваю гіпотезу на основі сліду.", "Stawiam hipotezę na podstawie śladu.", "Formulo una hipótesis a partir de una huella."),
        crit("ecr-periode", "Je place une trace dans la bonne période.", "Я розміщую слід у правильному періоді.", "Umieszczam ślad we właściwym okresie.", "Sitúo una huella en el periodo correcto."),
        crit("ecr-congo", "Je situe Ishango, au Congo, sur la carte.", "Я знаходжу Ішанго в Конго на карті.", "Znajduję Ishango w Kongu na mapie.", "Localizo Ishango, en el Congo, en el mapa.")
      ],
      etapes: [
        { type: "ressource", titre: L("Un os plein d'entailles", "Кістка з насічками", "Kość pełna nacięć", "Un hueso lleno de muescas"),
          contenu: { textes: [
            L("Avant l'écriture, les humains savaient déjà compter. Ils faisaient des marques : des entailles sur un os ou un bâton, des cailloux, des nœuds.", "Ще до письма люди вміли рахувати. Вони робили позначки: насічки на кістці чи палиці, камінці, вузлики.", "Przed pismem ludzie już umieli liczyć. Robili znaki: nacięcia na kości lub kiju, kamyki, supły.", "Antes de la escritura, los humanos ya sabían contar. Hacían marcas: muescas en un hueso o un palo, piedrecitas, nudos."),
            L("En 1950, le chercheur belge Jean de Heinzelin trouve à Ishango, au Congo, un os couvert d'entailles. Il est aujourd'hui à Bruxelles.", "У 1950 році бельгійський дослідник Жан де Ейнзелен знайшов в Ішанго (Конго) кістку з насічками. Сьогодні вона в Брюсселі.", "W 1950 roku belgijski badacz Jean de Heinzelin znalazł w Ishango w Kongu kość pokrytą nacięciami. Dziś jest w Brukseli.", "En 1950, el investigador belga Jean de Heinzelin encontró en Ishango, en el Congo, un hueso cubierto de muescas. Hoy está en Bruselas."),
            L("Les savants ne sont pas d'accord : calendrier de la lune ? jeu de calcul ? Personne ne peut le prouver. C'est pour ça qu'on parle d'hypothèses.", "Учені не погоджуються між собою: місячний календар? гра з рахунком? Ніхто не може цього довести. Тому говорять про гіпотези.", "Naukowcy się nie zgadzają: kalendarz księżycowy? zabawa w liczenie? Nikt nie może tego udowodnić. Dlatego mówimy o hipotezach.", "Los científicos no se ponen de acuerdo: ¿calendario lunar? ¿juego de cálculo? Nadie puede demostrarlo. Por eso se habla de hipótesis.")
          ], docs: [DOC.ishango, DOC.monde] } },
        { type: "activite", activite: "ecr-act-compter" },
        { type: "minitest", test: "test-ecr-compter" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("Avant l'écriture, on compte avec des marques (entailles, cailloux…).", "До письма рахують за допомогою позначок (насічки, камінці…).", "Przed pismem liczy się za pomocą znaków (nacięcia, kamyki…).", "Antes de la escritura se cuenta con marcas (muescas, piedrecitas…)."),
          L("L'os d'Ishango (Congo, environ 20 000 ans) date de la Préhistoire.", "Кістка з Ішанго (Конго, приблизно 20 000 років) належить до доісторичних часів.", "Kość z Ishango (Kongo, około 20 000 lat) pochodzi z prehistorii.", "El hueso de Ishango (Congo, unos 20 000 años) es de la Prehistoria."),
          L("Quand on ne peut pas prouver, on émet une hypothèse : « Peut-être que… ».", "Коли не можна довести, висувають гіпотезу: «Можливо…».", "Gdy nie można udowodnić, stawiamy hipotezę: „Może…”.", "Cuando no se puede demostrar, se formula una hipótesis: «Quizás…».")
        ] } }
      ] },
    { id: "ecr-mesopotamie",
      titre: L("Pourquoi invente-t-on l'écriture en Mésopotamie ?", "Чому письмо винайшли в Месопотамії?", "Dlaczego pismo wynaleziono w Mezopotamii?", "¿Por qué se inventa la escritura en Mesopotamia?"),
      objectif: L("Je lis les signes d'une vraie tablette et j'explique à quoi servait l'écriture.", "Я читаю знаки на справжній табличці й пояснюю, для чого служило письмо.", "Czytam znaki prawdziwej tabliczki i wyjaśniam, do czego służyło pismo.", "Leo los signos de una tablilla verdadera y explico para qué servía la escritura."),
      criteres: [
        crit("ecr-signes", "Je repère des signes sur une tablette et je dis ce qu'ils veulent dire.", "Я знаходжу знаки на табличці й кажу, що вони означають.", "Znajduję znaki na tabliczce i mówię, co znaczą.", "Encuentro signos en una tablilla y digo lo que significan."),
        crit("ecr-pourquoi", "J'explique pourquoi on a inventé l'écriture.", "Я пояснюю, чому винайшли письмо.", "Wyjaśniam, dlaczego wynaleziono pismo.", "Explico por qué se inventó la escritura."),
        crit("ecr-meso", "Je situe la Mésopotamie (l'Irak) sur la carte.", "Я знаходжу Месопотамію (Ірак) на карті.", "Znajduję Mezopotamię (Irak) na mapie.", "Localizo Mesopotamia (Irak) en el mapa.")
      ],
      etapes: [
        { type: "ressource", titre: L("Des villes, des greniers, des comptes", "Міста, комори, рахунки", "Miasta, spichlerze, rachunki", "Ciudades, graneros, cuentas"),
          contenu: { textes: [
            L("La Mésopotamie, c'est la région entre deux fleuves, le Tigre et l'Euphrate. Aujourd'hui, c'est surtout l'Irak.", "Месопотамія — це край між двома річками, Тигром і Євфратом. Сьогодні це переважно Ірак.", "Mezopotamia to kraina między dwiema rzekami, Tygrysem i Eufratem. Dziś to głównie Irak.", "Mesopotamia es la región entre dos ríos, el Tigris y el Éufrates. Hoy es sobre todo Irak."),
            L("Vers − 3300, il y a de grandes villes avec des temples. Les prêtres doivent noter les récoltes, les animaux et la nourriture donnée aux travailleurs.", "Близько − 3300 там є великі міста з храмами. Жерцям треба записувати врожаї, тварин і їжу, видану робітникам.", "Około − 3300 są tam wielkie miasta ze świątyniami. Kapłani muszą zapisywać zbiory, zwierzęta i jedzenie wydawane robotnikom.", "Hacia − 3300 hay grandes ciudades con templos. Los sacerdotes tienen que anotar las cosechas, los animales y la comida dada a los trabajadores."),
            L("Ils dessinent des signes dans l'argile molle avec un roseau. Plus tard, les signes ressemblent à des clous : c'est l'écriture cunéiforme.", "Вони малюють знаки на м'якій глині очеретиною. Пізніше знаки стають схожими на цвяшки: це клинопис.", "Rysują znaki w miękkiej glinie trzciną. Później znaki przypominają gwoździe: to pismo klinowe.", "Dibujan signos en la arcilla blanda con una caña. Más tarde los signos parecen clavos: es la escritura cuneiforme.")
          ], docs: [DOC.tablette] } },
        { type: "activite", activite: "ecr-act-mesopotamie" },
        { type: "minitest", test: "test-ecr-mesopotamie" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("L'écriture est inventée en Mésopotamie (Irak) vers − 3300 : c'est la fin de la Préhistoire.", "Письмо винайшли в Месопотамії (Ірак) близько − 3300: це кінець доісторичних часів.", "Pismo wynaleziono w Mezopotamii (Irak) około − 3300: to koniec prehistorii.", "La escritura se inventa en Mesopotamia (Irak) hacia − 3300: es el fin de la Prehistoria."),
          L("On écrit d'abord pour compter : récoltes, animaux, nourriture.", "Спочатку пишуть, щоб рахувати: врожаї, тварин, їжу.", "Najpierw pisze się, żeby liczyć: zbiory, zwierzęta, jedzenie.", "Primero se escribe para contar: cosechas, animales, comida."),
          L("Les premiers signes sont des dessins ; ensuite, des signes en forme de clous (cunéiforme).", "Перші знаки — малюнки; потім знаки у формі цвяшків (клинопис).", "Pierwsze znaki to rysunki; potem znaki w kształcie gwoździ (pismo klinowe).", "Los primeros signos son dibujos; después, signos en forma de clavos (cuneiforme).")
        ] } }
      ] },
    { id: "ecr-egypte",
      titre: L("Comment les Égyptiens comptent-ils et mesurent-ils ?", "Як єгиптяни рахують і вимірюють?", "Jak Egipcjanie liczą i mierzą?", "¿Cómo cuentan y miden los egipcios?"),
      objectif: L("Je décode des chiffres égyptiens et je calcule avec une mesure ancienne.", "Я розшифровую єгипетські цифри й рахую з давньою мірою.", "Odczytuję egipskie cyfry i liczę dawną miarą.", "Descifro cifras egipcias y calculo con una medida antigua."),
      criteres: [
        crit("ecr-decoder", "Je lis un nombre écrit en hiéroglyphes.", "Я читаю число, записане ієрогліфами.", "Czytam liczbę zapisaną hieroglifami.", "Leo un número escrito en jeroglíficos."),
        crit("ecr-mesurer", "Je calcule une longueur en coudées.", "Я обчислюю довжину в ліктях.", "Obliczam długość w łokciach.", "Calculo una longitud en codos."),
        crit("ecr-usage", "Je dis à quoi sert chaque document : écrire, compter ou mesurer.", "Я кажу, для чого служить кожен документ: писати, рахувати чи вимірювати.", "Mówię, do czego służy każdy dokument: pisać, liczyć czy mierzyć.", "Digo para qué sirve cada documento: escribir, contar o medir.")
      ],
      etapes: [
        { type: "ressource", titre: L("Des scribes au bord du Nil", "Писарі на березі Нілу", "Skrybowie nad Nilem", "Escribas a orillas del Nilo"),
          contenu: { textes: [
            L("En Égypte, l'écriture apparaît vers − 3100. Les hiéroglyphes sont des petits dessins. Les scribes apprennent à écrire pendant des années.", "У Єгипті письмо з'являється близько − 3100. Ієрогліфи — це маленькі малюнки. Писарі роками вчаться писати.", "W Egipcie pismo pojawia się około − 3100. Hieroglify to małe rysunki. Skrybowie latami uczą się pisać.", "En Egipto la escritura aparece hacia − 3100. Los jeroglíficos son pequeños dibujos. Los escribas aprenden a escribir durante años."),
            L("Pour les nombres, on additionne des signes : un bâton = 1, une anse = 10, une corde enroulée = 100.", "Для чисел додають знаки: паличка = 1, дужка = 10, згорнута мотузка = 100.", "Przy liczbach dodaje się znaki: kreska = 1, łuk = 10, zwinięty sznur = 100.", "Para los números se suman signos: un palito = 1, un asa = 10, una cuerda enrollada = 100."),
            L("Chaque année, le Nil déborde et efface les limites des champs. Il faut mesurer à nouveau. On utilise la coudée : environ 52 cm, la longueur du coude au bout des doigts.", "Щороку Ніл розливається й стирає межі полів. Треба міряти знову. Використовують лікоть: приблизно 52 см, від ліктя до кінчиків пальців.", "Co roku Nil wylewa i zaciera granice pól. Trzeba mierzyć od nowa. Używa się łokcia: około 52 cm, od łokcia do końca palców.", "Cada año el Nilo se desborda y borra los límites de los campos. Hay que volver a medir. Se usa el codo: unos 52 cm, del codo a la punta de los dedos.")
          ], docs: [DOC.chiffres, DOC.rhind, DOC.coudee] } },
        { type: "activite", activite: "ecr-act-egypte" },
        { type: "minitest", test: "test-ecr-egypte" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("En Égypte, on écrit en hiéroglyphes à partir de − 3100.", "У Єгипті пишуть ієрогліфами з − 3100.", "W Egipcie pisze się hieroglifami od − 3100.", "En Egipto se escribe en jeroglíficos desde − 3100."),
          L("Chiffres égyptiens : bâton = 1, anse = 10, corde = 100. On additionne.", "Єгипетські цифри: паличка = 1, дужка = 10, мотузка = 100. Додаємо.", "Cyfry egipskie: kreska = 1, łuk = 10, sznur = 100. Dodajemy.", "Cifras egipcias: palito = 1, asa = 10, cuerda = 100. Se suman."),
          L("Les scribes calculent (papyrus Rhind) et mesurent avec la coudée (± 52 cm).", "Писарі рахують (папірус Рінда) і міряють ліктем (± 52 см).", "Skrybowie liczą (papirus Rhinda) i mierzą łokciem (± 52 cm).", "Los escribas calculan (papiro Rhind) y miden con el codo (± 52 cm).")
        ] } }
      ] },
    { id: "ecr-relire",
      titre: L("Comment a-t-on pu relire les hiéroglyphes ?", "Як вдалося знову прочитати ієрогліфи?", "Jak udało się znów odczytać hieroglify?", "¿Cómo se pudieron volver a leer los jeroglíficos?"),
      objectif: L("Je comprends comment Champollion a lu les hiéroglyphes et je range l'histoire de l'écriture sur une frise.", "Я розумію, як Шампольйон прочитав ієрогліфи, і впорядковую історію письма на стрічці часу.", "Rozumiem, jak Champollion odczytał hieroglify, i układam historię pisma na osi czasu.", "Entiendo cómo Champollion leyó los jeroglíficos y ordeno la historia de la escritura en una línea del tiempo."),
      criteres: [
        crit("ecr-rosette", "J'explique pourquoi la pierre de Rosette a aidé à lire les hiéroglyphes.", "Я пояснюю, чому Розеттський камінь допоміг прочитати ієрогліфи.", "Wyjaśniam, dlaczego kamień z Rosetty pomógł odczytać hieroglify.", "Explico por qué la piedra de Rosetta ayudó a leer los jeroglíficos."),
        crit("ecr-frise", "Je range l'histoire de l'écriture sur une frise.", "Я впорядковую історію письма на стрічці часу.", "Układam historię pisma na osi czasu.", "Ordeno la historia de la escritura en una línea del tiempo."),
        crit("ecr-alphabet", "Je sais d'où vient notre alphabet.", "Я знаю, звідки походить наш алфавіт.", "Wiem, skąd pochodzi nasz alfabet.", "Sé de dónde viene nuestro alfabeto.")
      ],
      etapes: [
        { type: "ressource", titre: L("Une pierre, trois écritures", "Один камінь, три писемності", "Jeden kamień, trzy pisma", "Una piedra, tres escrituras"),
          contenu: { textes: [
            L("Après l'Antiquité, plus personne ne sait lire les hiéroglyphes. Pendant plus de 1000 ans, ils restent un mystère.", "Після античності вже ніхто не вміє читати ієрогліфи. Понад 1000 років вони залишаються загадкою.", "Po starożytności nikt już nie umie czytać hieroglifów. Przez ponad 1000 lat pozostają tajemnicą.", "Después de la Antigüedad, nadie sabe ya leer los jeroglíficos. Durante más de 1000 años siguen siendo un misterio."),
            L("En 1799, des soldats français trouvent la pierre de Rosette. Le même texte y est écrit en hiéroglyphes, en démotique et en grec. Les savants savent lire le grec.", "У 1799 році французькі солдати знаходять Розеттський камінь. Той самий текст на ньому написано ієрогліфами, демотичним письмом і грецькою. Учені вміють читати грецьку.", "W 1799 roku francuscy żołnierze znajdują kamień z Rosetty. Ten sam tekst jest na nim zapisany hieroglifami, pismem demotycznym i po grecku. Uczeni umieją czytać po grecku.", "En 1799, unos soldados franceses encuentran la piedra de Rosetta. El mismo texto está escrito en jeroglíficos, en demótico y en griego. Los sabios saben leer griego."),
            L("En 1822, Jean-François Champollion compare les trois textes et réussit à lire les hiéroglyphes.", "У 1822 році Жан-Франсуа Шампольйон порівнює три тексти й нарешті читає ієрогліфи.", "W 1822 roku Jean-François Champollion porównuje trzy teksty i udaje mu się odczytać hieroglify.", "En 1822, Jean-François Champollion compara los tres textos y consigue leer los jeroglíficos."),
            L("Vers − 1000, les Phéniciens (au Liban) inventent un alphabet : un signe = un son. Les Grecs puis les Romains le transforment. Notre alphabet latin vient de là, comme l'alphabet cyrillique (ukrainien, russe…).", "Близько − 1000 фінікійці (у Лівані) винаходять алфавіт: один знак = один звук. Греки, а потім римляни його змінюють. Звідси наш латинський алфавіт, як і кирилиця (українська, російська…).", "Około − 1000 Fenicjanie (w Libanie) wymyślają alfabet: jeden znak = jeden dźwięk. Grecy, a potem Rzymianie go przekształcają. Stąd pochodzi nasz alfabet łaciński, tak jak cyrylica (ukraiński, rosyjski…).", "Hacia − 1000, los fenicios (en el Líbano) inventan un alfabeto: un signo = un sonido. Los griegos y luego los romanos lo transforman. De ahí viene nuestro alfabeto latino, como el cirílico (ucraniano, ruso…).")
          ], docs: [DOC.rosette, DOC.ahiram] } },
        { type: "activite", activite: "ecr-act-relire" },
        { type: "minitest", test: "test-ecr-relire" },
        { type: "synthese", titre: RETIENS, contenu: { liste: [
          L("La pierre de Rosette porte le même texte en trois écritures, dont le grec.", "На Розеттському камені той самий текст трьома писемностями, серед них грецькою.", "Na kamieniu z Rosetty jest ten sam tekst w trzech pismach, w tym po grecku.", "La piedra de Rosetta tiene el mismo texto en tres escrituras, entre ellas el griego."),
          L("Champollion lit les hiéroglyphes en 1822 en comparant les textes.", "Шампольйон читає ієрогліфи в 1822 році, порівнюючи тексти.", "Champollion odczytuje hieroglify w 1822 roku, porównując teksty.", "Champollion lee los jeroglíficos en 1822 comparando los textos."),
          L("L'alphabet phénicien (vers − 1000) est l'ancêtre de nos alphabets.", "Фінікійський алфавіт (близько − 1000) — предок наших алфавітів.", "Alfabet fenicki (około − 1000) jest przodkiem naszych alfabetów.", "El alfabeto fenicio (hacia − 1000) es el antepasado de nuestros alfabetos.")
        ] } }
      ] }
  );

  /* ---------- Activités : une tâche différente à chaque fois ---------- */
  D.activites.push(
    { id: "ecr-act-compter", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("L'énigme de l'os d'Ishango", "Загадка кістки з Ішанго", "Zagadka kości z Ishango", "El enigma del hueso de Ishango"),
      objectif: L("J'enquête sur une trace de 20 000 ans.", "Я досліджую слід, якому 20 000 років.", "Badam ślad sprzed 20 000 lat.", "Investigo una huella de 20 000 años."),
      etapes: [
        ECRIRE("ÉMETS", L("OBSERVE l'os d'Ishango (document N°1). ÉMETS une hypothèse : pourquoi quelqu'un a-t-il fait toutes ces entailles ?", "РОЗГЛЯНЬ кістку з Ішанго (документ №1). ВИСУНЬ гіпотезу: навіщо хтось зробив усі ці насічки?", "OBEJRZYJ kość z Ishango (dokument nr 1). POSTAW hipotezę: dlaczego ktoś zrobił te wszystkie nacięcia?", "OBSERVA el hueso de Ishango (documento N.º 1). FORMULA una hipótesis: ¿por qué alguien hizo todas esas muescas?"),
          ["Peut-être que", "Je pense que les entailles servaient à", "C'est possible parce que"], "Peut-être que les entailles servaient à…",
          [L("Il n'y a pas de mauvaise hypothèse si tu l'expliques. Commence par « Peut-être que… ».", "Немає поганої гіпотези, якщо ти її поясниш. Почни з «Peut-être que…».", "Nie ma złej hipotezy, jeśli ją wyjaśnisz. Zacznij od „Peut-être que…”.", "No hay hipótesis mala si la explicas. Empieza por «Peut-être que…».")],
          { image: IMG + "ecr-ishango.jpg" }),
        NOMBRE("COMPTE", L("Sur l'os, les entailles sont en groupes. Voici un dessin de 4 groupes. COMPTE les traits du groupe C.", "На кістці насічки згруповані. Ось малюнок 4 груп. ПОРАХУЙ рисочки в групі C.", "Na kości nacięcia są w grupach. Oto rysunek 4 grup. POLICZ kreski w grupie C.", "En el hueso, las muescas están en grupos. Aquí hay un dibujo de 4 grupos. CUENTA los trazos del grupo C."),
          17, "traits",
          L("Oui, 17 ! Sur le vrai os, on trouve des groupes de 11, 13, 17 et 19 entailles.", "Так, 17! На справжній кістці є групи з 11, 13, 17 і 19 насічок.", "Tak, 17! Na prawdziwej kości są grupy po 11, 13, 17 i 19 nacięć.", "¡Sí, 17! En el hueso verdadero hay grupos de 11, 13, 17 y 19 muescas."),
          L("Pas encore. Pose ton doigt sur chaque trait du groupe C et compte lentement.", "Ще ні. Торкайся пальцем кожної рисочки групи C і рахуй повільно.", "Jeszcze nie. Dotykaj palcem każdej kreski w grupie C i licz powoli.", "Todavía no. Pon el dedo en cada trazo del grupo C y cuenta despacio."),
          [L("Le groupe C est la 3e ligne.", "Група C — третій рядок.", "Grupa C to trzeci wiersz.", "El grupo C es la 3.ª línea.")],
          { image: IMG + "ecr-traits.svg" }),
        CARTE("TOUCHE", L("TOUCHE le repère d'Ishango : au centre de l'Afrique, dans l'actuelle République démocratique du Congo.", "ТОРКНИСЯ позначки Ішанго: у центрі Африки, у сучасній Демократичній Республіці Конго.", "DOTKNIJ znacznika Ishango: w środku Afryki, w dzisiejszej Demokratycznej Republice Konga.", "TOCA la marca de Ishango: en el centro de África, en la actual República Democrática del Congo."),
          MONDE, [pt("br", 30, 55), pt("ish", 57, 50), pt("in", 68, 40), pt("au", 85, 68)], "ish",
          L("Oui ! Ishango est au cœur de l'Afrique. Le Congo a été une colonie belge : c'est pour ça que l'os est à Bruxelles.", "Так! Ішанго в серці Африки. Конго було бельгійською колонією, тому кістка в Брюсселі.", "Tak! Ishango leży w sercu Afryki. Kongo było kolonią belgijską: dlatego kość jest w Brukseli.", "¡Sí! Ishango está en el corazón de África. El Congo fue una colonia belga: por eso el hueso está en Bruselas."),
          L("Pas encore. Cherche l'Afrique, puis son centre.", "Ще ні. Знайди Африку, потім її центр.", "Jeszcze nie. Znajdź Afrykę, potem jej środek.", "Todavía no. Busca África y luego su centro."),
          [L("L'Afrique est sous l'Europe.", "Африка — під Європою.", "Afryka jest pod Europą.", "África está debajo de Europa.")]),
        CLASSER(L("CLASSE ces traces dans la bonne période de la frise. Rappel : la Préhistoire finit avec l'écriture (vers − 3300).", "РОЗПОДІЛИ ці сліди за правильним періодом на стрічці часу. Нагадування: доісторичні часи закінчуються з письмом (близько − 3300).", "PRZYPORZĄDKUJ te ślady do właściwego okresu na osi czasu. Przypomnienie: prehistoria kończy się wraz z pismem (około − 3300).", "CLASIFICA estas huellas en el periodo correcto de la línea del tiempo. Recuerda: la Prehistoria termina con la escritura (hacia − 3300)."),
          [{ id: "pre", label: L("Préhistoire", "Доісторичні часи", "Prehistoria", "Prehistoria") }, { id: "ant", label: L("Antiquité", "Античність", "Starożytność", "Antigüedad") }],
          [el("ish", "l'os d'Ishango (vers − 18 000)", "кістка з Ішанго (близько − 18 000)", "kość z Ishango (około − 18 000)", "el hueso de Ishango (hacia − 18 000)", "pre"),
           el("tab", "la tablette de Jemdet Nasr (vers − 3000)", "табличка з Джемдет-Насра (близько − 3000)", "tabliczka z Dżemdet Nasr (około − 3000)", "la tablilla de Jemdet Nasr (hacia − 3000)", "ant"),
           el("bif", "le biface en silex (Paléolithique)", "біфас із кременю (палеоліт)", "pięściak z krzemienia (paleolit)", "el bifaz de sílex (Paleolítico)", "pre"),
           el("rhi", "le papyrus Rhind (vers − 1550)", "папірус Рінда (близько − 1550)", "papirus Rhinda (około − 1550)", "el papiro Rhind (hacia − 1550)", "ant"),
           el("vas", "le vase des premiers paysans (vers − 5000)", "посудина перших селян (близько − 5000)", "naczynie pierwszych rolników (około − 5000)", "el vaso de los primeros campesinos (hacia − 5000)", "pre")],
          L("Bravo ! Avant − 3300 : Préhistoire. Après : Antiquité.", "Молодець! До − 3300: доісторичні часи. Після: античність.", "Brawo! Przed − 3300: prehistoria. Po: starożytność.", "¡Bien! Antes de − 3300: Prehistoria. Después: Antigüedad."),
          L("Pas encore. Compare chaque date avec − 3300.", "Ще ні. Порівняй кожну дату з − 3300.", "Jeszcze nie. Porównaj każdą datę z − 3300.", "Todavía no. Compara cada fecha con − 3300."),
          [L("− 5000 est AVANT − 3300 : c'est encore la Préhistoire.", "− 5000 — це РАНІШЕ за − 3300: ще доісторичні часи.", "− 5000 jest PRZED − 3300: to jeszcze prehistoria.", "− 5000 es ANTES de − 3300: todavía es la Prehistoria.")]),
        AUTO("CHOISIS : est-ce que tu sais émettre une hypothèse et placer une trace dans la bonne période ?", "ВИБЕРИ: чи вмієш ти висувати гіпотезу й розміщувати слід у правильному періоді?", "WYBIERZ: czy umiesz postawić hipotezę i umieścić ślad we właściwym okresie?", "ELIGE: ¿sabes formular una hipótesis y situar una huella en el periodo correcto?")
      ] },

    { id: "ecr-act-mesopotamie", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Je lis une tablette de 5000 ans", "Я читаю табличку, якій 5000 років", "Czytam tabliczkę sprzed 5000 lat", "Leo una tablilla de 5000 años"),
      objectif: L("Je repère les signes sur la tablette et je comprends pourquoi on écrit.", "Я знаходжу знаки на табличці й розумію, навіщо пишуть.", "Znajduję znaki na tabliczce i rozumiem, po co się pisze.", "Encuentro los signos en la tablilla y entiendo por qué se escribe."),
      etapes: [
        CARTE("TOUCHE", L("Sur la tablette (document N°3), TOUCHE le signe qui veut dire « orge » (une céréale). Indice : il ressemble à un épi.", "На табличці (документ №3) ТОРКНИСЯ знака, що означає «ячмінь» (зернова культура). Підказка: він схожий на колосок.", "Na tabliczce (dokument nr 3) DOTKNIJ znaku, który znaczy „jęczmień” (zboże). Wskazówka: przypomina kłos.", "En la tablilla (documento N.º 3), TOCA el signo que significa «cebada» (un cereal). Pista: parece una espiga."),
          IMG + "ecr-tablette-jemdet-nasr.jpg", [pt("tete", 27, 46), pt("epi", 40, 38), pt("rond", 56, 31), pt("demi", 57, 45)], "epi",
          L("Oui ! Ce signe est un dessin d'épi : il veut dire « orge ».", "Так! Цей знак — малюнок колоска: він означає «ячмінь».", "Tak! Ten znak to rysunek kłosa: znaczy „jęczmień”.", "¡Sí! Este signo es el dibujo de una espiga: significa «cebada»."),
          L("Pas encore. Cherche un dessin fin avec des petites branches, comme une plante.", "Ще ні. Шукай тонкий малюнок із гілочками, як рослина.", "Jeszcze nie. Szukaj cienkiego rysunku z gałązkami, jak roślina.", "Todavía no. Busca un dibujo fino con ramitas, como una planta."),
          [L("Les ronds sont des nombres. La tête avec le bol veut dire « ration ».", "Кружечки — це числа. Голова з мискою означає «пайок».", "Kółka to liczby. Głowa z miską znaczy „racja żywności”.", "Los círculos son números. La cabeza con el cuenco significa «ración».")]),
        CHOIX(L("Les ronds sont des nombres et la tête avec un bol veut dire « ration ». CHOISIS : à quoi servait cette tablette ?", "Кружечки — числа, а голова з мискою означає «пайок». ВИБЕРИ: для чого служила ця табличка?", "Kółka to liczby, a głowa z miską znaczy „racja żywności”. WYBIERZ: do czego służyła ta tabliczka?", "Los círculos son números y la cabeza con un cuenco significa «ración». ELIGE: ¿para qué servía esta tablilla?"),
          [opt("a", "à raconter une histoire d'amour", "розповідати історію кохання", "do opowiadania historii miłosnej", "para contar una historia de amor"),
           opt("b", "à noter combien d'orge on donne aux travailleurs", "записувати, скільки ячменю дають робітникам", "do zapisania, ile jęczmienia daje się robotnikom", "para anotar cuánta cebada se da a los trabajadores", true),
           opt("c", "à décorer un temple", "прикрашати храм", "do ozdabiania świątyni", "para decorar un templo")],
          L("Oui ! Les premières écritures servent surtout à compter et à garder une trace des échanges.", "Так! Перші писемності служать передусім, щоб рахувати й зберігати запис обмінів.", "Tak! Pierwsze pisma służą głównie do liczenia i zapisywania wymian.", "¡Sí! Las primeras escrituras sirven sobre todo para contar y dejar constancia de los intercambios."),
          L("Pas encore. Relis : des nombres + « ration » + « orge ».", "Ще ні. Перечитай: числа + «пайок» + «ячмінь».", "Jeszcze nie. Przeczytaj jeszcze raz: liczby + „racja” + „jęczmień”.", "Todavía no. Vuelve a leer: números + «ración» + «cebada»."),
          [L("Une ration = la part de nourriture donnée à quelqu'un.", "Пайок = частка їжі, яку дають комусь.", "Racja = porcja jedzenia dana komuś.", "Una ración = la parte de comida que se da a alguien.")]),
        CARTE("TOUCHE", L("TOUCHE le repère de la Mésopotamie, entre le Tigre et l'Euphrate (aujourd'hui l'Irak).", "ТОРКНИСЯ позначки Месопотамії, між Тигром і Євфратом (сьогодні Ірак).", "DOTKNIJ znacznika Mezopotamii, między Tygrysem a Eufratem (dziś Irak).", "TOCA la marca de Mesopotamia, entre el Tigris y el Éufrates (hoy Irak)."),
          MONDE, [pt("eg", 55, 31), pt("mes", 60.5, 30), pt("eu", 50, 19), pt("cn", 74, 30)], "mes",
          L("Oui ! La Mésopotamie est juste à côté de l'Égypte, à l'est.", "Так! Месопотамія зовсім поруч з Єгиптом, на схід.", "Tak! Mezopotamia leży tuż obok Egiptu, na wschód.", "¡Sí! Mesopotamia está justo al lado de Egipto, al este."),
          L("Pas encore. Attention : le repère tout proche à gauche, c'est l'Égypte.", "Ще ні. Увага: близька позначка ліворуч — це Єгипет.", "Jeszcze nie. Uwaga: bliski znacznik po lewej to Egipt.", "Todavía no. Cuidado: la marca muy cerca a la izquierda es Egipto."),
          [L("La Mésopotamie est à l'est (à droite) de l'Égypte.", "Месопотамія на схід (праворуч) від Єгипту.", "Mezopotamia jest na wschód (po prawej) od Egiptu.", "Mesopotamia está al este (a la derecha) de Egipto.")]),
        ECRIRE("INVENTE", L("À toi ! INVENTE un signe-dessin pour un mot de ta vie (téléphone, ballon, pain…). DÉCRIS ton signe et dis ce qu'il veut dire.", "Твоя черга! ПРИДУМАЙ знак-малюнок для слова зі свого життя (телефон, м'яч, хліб…). ОПИШИ свій знак і скажи, що він означає.", "Twoja kolej! WYMYŚL znak-rysunek dla słowa z twojego życia (telefon, piłka, chleb…). OPISZ swój znak i powiedz, co znaczy.", "¡Te toca! INVENTA un signo-dibujo para una palabra de tu vida (teléfono, balón, pan…). DESCRIBE tu signo y di lo que significa."),
          ["Mon signe veut dire", "Il ressemble à", "Je l'ai choisi parce que"], "Mon signe veut dire « ballon ». Il ressemble à un rond avec…",
          [L("Comme les premiers scribes : un dessin simple que tout le monde reconnaît.", "Як перші писарі: простий малюнок, який усі впізнають.", "Jak pierwsi skrybowie: prosty rysunek, który każdy rozpozna.", "Como los primeros escribas: un dibujo sencillo que todos reconocen.")]),
        AUTO("CHOISIS : est-ce que tu sais lire des signes sur une tablette et dire pourquoi on a inventé l'écriture ?", "ВИБЕРИ: чи вмієш ти читати знаки на табличці й сказати, чому винайшли письмо?", "WYBIERZ: czy umiesz czytać znaki na tabliczce i powiedzieć, dlaczego wynaleziono pismo?", "ELIGE: ¿sabes leer signos en una tablilla y decir por qué se inventó la escritura?")
      ] },

    { id: "ecr-act-egypte", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Défi du scribe égyptien", "Виклик єгипетського писаря", "Wyzwanie egipskiego skryby", "Reto del escriba egipcio"),
      objectif: L("Je décode, je calcule et je mesure comme un scribe.", "Я розшифровую, рахую і вимірюю, як писар.", "Odczytuję, liczę i mierzę jak skryba.", "Descifro, calculo y mido como un escriba."),
      etapes: [
        NOMBRE("DÉCODE", L("DÉCODE ce nombre écrit en hiéroglyphes. Aide-toi du tableau (document N°4).", "РОЗШИФРУЙ це число, записане ієрогліфами. Користуйся таблицею (документ №4).", "ODCZYTAJ tę liczbę zapisaną hieroglifami. Pomóż sobie tabelą (dokument nr 4).", "DESCIFRA este número escrito en jeroglíficos. Ayúdate de la tabla (documento N.º 4)."),
          234, "",
          L("Bravo, scribe ! 2 cordes (200) + 3 anses (30) + 4 bâtons (4) = 234.", "Молодець, писарю! 2 мотузки (200) + 3 дужки (30) + 4 палички (4) = 234.", "Brawo, skrybo! 2 sznury (200) + 3 łuki (30) + 4 kreski (4) = 234.", "¡Bravo, escriba! 2 cuerdas (200) + 3 asas (30) + 4 palitos (4) = 234."),
          L("Pas encore. Compte chaque sorte de signe, puis additionne.", "Ще ні. Порахуй кожен вид знаків, потім додай.", "Jeszcze nie. Policz każdy rodzaj znaków, potem dodaj.", "Todavía no. Cuenta cada tipo de signo y luego suma."),
          [L("Les cordes valent 100 chacune. Combien de cordes ?", "Кожна мотузка — 100. Скільки мотузок?", "Każdy sznur to 100. Ile sznurów?", "Cada cuerda vale 100. ¿Cuántas cuerdas?")],
          { image: IMG + "ecr-nombre-234.svg" }),
        CLASSER(L("CLASSE chaque document : il sert surtout à écrire un texte, à compter, ou à mesurer ?", "РОЗПОДІЛИ кожен документ: він служить передусім, щоб писати текст, рахувати чи вимірювати?", "PRZYPORZĄDKUJ każdy dokument: służy głównie do pisania tekstu, liczenia czy mierzenia?", "CLASIFICA cada documento: ¿sirve sobre todo para escribir un texto, para contar o para medir?"),
          [{ id: "ecr", label: L("Écrire un texte", "Писати текст", "Pisać tekst", "Escribir un texto") }, { id: "cpt", label: L("Compter", "Рахувати", "Liczyć", "Contar") }, { id: "mes", label: L("Mesurer", "Вимірювати", "Mierzyć", "Medir") }],
          [el("cou", "la règle de Kha (document N°6)", "лінійка Кха (документ №6)", "linijka Cha (dokument nr 6)", "la regla de Kha (documento N.º 6)", "mes"),
           el("rhi", "le papyrus Rhind (document N°5)", "папірус Рінда (документ №5)", "papirus Rhinda (dokument nr 5)", "el papiro Rhind (documento N.º 5)", "cpt"),
           el("tab", "la tablette des rations (document N°3)", "табличка з пайками (документ №3)", "tabliczka z racjami (dokument nr 3)", "la tablilla de las raciones (documento N.º 3)", "cpt"),
           el("ros", "la pierre de Rosette, un décret du roi", "Розеттський камінь, указ царя", "kamień z Rosetty, dekret króla", "la piedra de Rosetta, un decreto del rey", "ecr")],
          L("Bravo ! L'écriture sert à beaucoup de choses : compter, mesurer, faire connaître les lois.", "Молодець! Письмо служить багатьом цілям: рахувати, вимірювати, оголошувати закони.", "Brawo! Pismo służy do wielu rzeczy: liczenia, mierzenia, ogłaszania praw.", "¡Bien! La escritura sirve para muchas cosas: contar, medir, dar a conocer las leyes."),
          L("Pas encore. Relis les légendes : une règle sert à… ; un problème de calcul sert à…", "Ще ні. Перечитай підписи: лінійка служить для…; математична задача — для…", "Jeszcze nie. Przeczytaj podpisy: linijka służy do…; zadanie z rachunków służy do…", "Todavía no. Vuelve a leer las leyendas: una regla sirve para…; un problema de cálculo sirve para…"),
          [L("Une règle mesure une longueur.", "Лінійка вимірює довжину.", "Linijka mierzy długość.", "Una regla mide una longitud.")]),
        NOMBRE("CALCULE", L("Une coudée mesure environ 52 cm. Un scribe mesure un champ de 3 coudées de large. CALCULE : combien de centimètres ?", "Лікоть — це приблизно 52 см. Писар міряє поле завширшки 3 лікті. ПОРАХУЙ: скільки це сантиметрів?", "Łokieć ma około 52 cm. Skryba mierzy pole o szerokości 3 łokci. POLICZ: ile to centymetrów?", "Un codo mide unos 52 cm. Un escriba mide un campo de 3 codos de ancho. CALCULA: ¿cuántos centímetros?"),
          156, "cm",
          L("Oui ! 3 × 52 = 156 cm, environ 1,5 mètre.", "Так! 3 × 52 = 156 см, приблизно 1,5 метра.", "Tak! 3 × 52 = 156 cm, około 1,5 metra.", "¡Sí! 3 × 52 = 156 cm, más o menos 1,5 metros."),
          L("Pas encore. Fais 52 + 52 + 52.", "Ще ні. Зроби 52 + 52 + 52.", "Jeszcze nie. Zrób 52 + 52 + 52.", "Todavía no. Haz 52 + 52 + 52."),
          [L("3 coudées = 3 fois 52 cm.", "3 лікті = 3 рази по 52 см.", "3 łokcie = 3 razy 52 cm.", "3 codos = 3 veces 52 cm.")],
          { image: IMG + "ecr-coudee-kha.jpg" }),
        CHOIX(L("CHOISIS : pourquoi les Égyptiens devaient-ils mesurer leurs champs chaque année ?", "ВИБЕРИ: чому єгиптянам треба було міряти поля щороку?", "WYBIERZ: dlaczego Egipcjanie musieli co roku mierzyć pola?", "ELIGE: ¿por qué los egipcios tenían que medir sus campos cada año?"),
          [opt("a", "Parce qu'ils changeaient de maison.", "Бо вони переїжджали.", "Bo zmieniali domy.", "Porque cambiaban de casa."),
           opt("b", "Parce que le roi aimait les règles.", "Бо цар любив лінійки.", "Bo król lubił linijki.", "Porque al rey le gustaban las reglas."),
           opt("c", "Parce que le Nil débordait et effaçait les limites des champs.", "Бо Ніл розливався й стирав межі полів.", "Bo Nil wylewał i zacierał granice pól.", "Porque el Nilo se desbordaba y borraba los límites de los campos.", true)],
          L("Oui ! Après la crue, il fallait retrouver la part de chaque paysan.", "Так! Після розливу треба було знову визначити ділянку кожного селянина.", "Tak! Po wylewie trzeba było odnaleźć część każdego rolnika.", "¡Sí! Después de la crecida había que encontrar la parte de cada campesino."),
          L("Pas encore. Relis le texte sur le Nil.", "Ще ні. Перечитай текст про Ніл.", "Jeszcze nie. Przeczytaj jeszcze raz tekst o Nilu.", "Todavía no. Vuelve a leer el texto sobre el Nilo."),
          [L("La crue = le moment où le fleuve sort de son lit.", "Розлив = час, коли річка виходить з берегів.", "Wylew = moment, gdy rzeka wychodzi z koryta.", "La crecida = el momento en que el río se sale de su cauce.")]),
        AUTO("CHOISIS : est-ce que tu sais décoder des chiffres égyptiens et calculer en coudées ?", "ВИБЕРИ: чи вмієш ти розшифровувати єгипетські цифри й рахувати в ліктях?", "WYBIERZ: czy umiesz odczytać egipskie cyfry i liczyć w łokciach?", "ELIGE: ¿sabes descifrar cifras egipcias y calcular en codos?")
      ] },

    { id: "ecr-act-relire", discipline: "histoire", picto: null, motsAppris: [],
      titre: L("Sur les traces de Champollion", "Слідами Шампольйона", "Śladami Champolliona", "Tras las huellas de Champollion"),
      objectif: L("Je retrouve la clé de la pierre de Rosette et je range l'histoire de l'écriture.", "Я знаходжу ключ Розеттського каменю й упорядковую історію письма.", "Odnajduję klucz do kamienia z Rosetty i układam historię pisma.", "Encuentro la clave de la piedra de Rosetta y ordeno la historia de la escritura."),
      etapes: [
        CARTE("TOUCHE", L("Sur la pierre de Rosette (document N°7), TOUCHE la partie écrite en grec : c'est elle qui a servi de clé, car les savants savaient lire le grec.", "На Розеттському камені (документ №7) ТОРКНИСЯ частини, написаної грецькою: саме вона стала ключем, бо вчені вміли читати грецьку.", "Na kamieniu z Rosetty (dokument nr 7) DOTKNIJ części zapisanej po grecku: to ona była kluczem, bo uczeni umieli czytać po grecku.", "En la piedra de Rosetta (documento N.º 7), TOCA la parte escrita en griego: fue la clave, porque los sabios sabían leer griego."),
          IMG + "ecr-rosette.jpg", [pt("hie", 45, 12), pt("dem", 50, 40), pt("gre", 50, 75)], "gre",
          L("Oui ! Le grec est en bas. En comparant, Champollion a trouvé le sens des hiéroglyphes.", "Так! Грецький текст унизу. Порівнюючи, Шампольйон зрозумів значення ієрогліфів.", "Tak! Grecki jest na dole. Porównując, Champollion odkrył znaczenie hieroglifów.", "¡Sí! El griego está abajo. Comparando, Champollion encontró el sentido de los jeroglíficos."),
          L("Pas encore. Relis la légende : hiéroglyphes en haut, démotique au milieu, grec… ?", "Ще ні. Перечитай підпис: ієрогліфи вгорі, демотичне письмо посередині, грецька…?", "Jeszcze nie. Przeczytaj podpis: hieroglify na górze, demotyczne w środku, greckie…?", "Todavía no. Vuelve a leer la leyenda: jeroglíficos arriba, demótico en el medio, griego… ?"),
          [L("La légende dit où est chaque écriture.", "Підпис каже, де яке письмо.", "Podpis mówi, gdzie jest każde pismo.", "La leyenda dice dónde está cada escritura.")]),
        CHOIX(L("CHOISIS : Champollion est-il un témoin de l'Égypte des pharaons ?", "ВИБЕРИ: чи Шампольйон — свідок Єгипту фараонів?", "WYBIERZ: czy Champollion jest świadkiem Egiptu faraonów?", "ELIGE: ¿Champollion es un testigo del Egipto de los faraones?"),
          [opt("a", "Non : il vit au 19e siècle. C'est un spécialiste qui étudie des traces.", "Ні: він живе в 19 столітті. Це фахівець, який вивчає сліди.", "Nie: żyje w XIX wieku. To specjalista, który bada ślady.", "No: vive en el siglo XIX. Es un especialista que estudia huellas.", true),
           opt("b", "Oui : il a vu les pharaons.", "Так: він бачив фараонів.", "Tak: widział faraonów.", "Sí: vio a los faraones.")],
          L("Oui ! Comme Schmerling à Engis, Champollion étudie le passé longtemps après.", "Так! Як Шмерлінг в Енжі, Шампольйон вивчає минуле набагато пізніше.", "Tak! Jak Schmerling w Engis, Champollion bada przeszłość długo potem.", "¡Sí! Como Schmerling en Engis, Champollion estudia el pasado mucho después."),
          L("Pas encore. Compare : le texte date de − 196, Champollion le lit en 1822.", "Ще ні. Порівняй: текст датується − 196 роком, Шампольйон читає його в 1822.", "Jeszcze nie. Porównaj: tekst pochodzi z − 196, Champollion czyta go w 1822.", "Todavía no. Compara: el texto es de − 196 y Champollion lo lee en 1822."),
          [L("Un témoin a vu les faits de ses yeux.", "Свідок бачив події на власні очі.", "Świadek widział wydarzenia na własne oczy.", "Un testigo vio los hechos con sus propios ojos.")]),
        { type: "ordre", picto: null, verbe: "RANGE", debut: L("le plus ancien", "найдавніше", "najdawniejsze", "lo más antiguo"), fin: L("le plus récent", "найновіше", "najnowsze", "lo más reciente"),
          consigne: L("RANGE l'histoire de l'écriture sur la frise. TOUCHE les étiquettes dans l'ordre : la 1re, puis la 2e…", "РОЗТАШУЙ історію письма на стрічці часу. ТОРКАЙСЯ карток по порядку: 1-ша, потім 2-га…", "UŁÓŻ historię pisma na osi czasu. DOTYKAJ kart po kolei: 1., potem 2.…", "ORDENA la historia de la escritura en la línea del tiempo. TOCA las etiquetas en orden: la 1.ª, luego la 2.ª…"),
          elements: [el("f1", "Os d'Ishango (vers − 18 000)", "Кістка з Ішанго (близько − 18 000)", "Kość z Ishango (około − 18 000)", "Hueso de Ishango (hacia − 18 000)"),
            el("f2", "Premières tablettes en Mésopotamie (vers − 3300)", "Перші таблички в Месопотамії (близько − 3300)", "Pierwsze tabliczki w Mezopotamii (około − 3300)", "Primeras tablillas en Mesopotamia (hacia − 3300)"),
            el("f3", "Hiéroglyphes en Égypte (vers − 3100)", "Ієрогліфи в Єгипті (близько − 3100)", "Hieroglify w Egipcie (około − 3100)", "Jeroglíficos en Egipto (hacia − 3100)"),
            el("f4", "Alphabet phénicien (vers − 1000)", "Фінікійський алфавіт (близько − 1000)", "Alfabet fenicki (około − 1000)", "Alfabeto fenicio (hacia − 1000)"),
            el("f5", "Texte de la pierre de Rosette (− 196)", "Текст Розеттського каменю (− 196)", "Tekst kamienia z Rosetty (− 196)", "Texto de la piedra de Rosetta (− 196)"),
            el("f6", "Champollion lit les hiéroglyphes (1822)", "Шампольйон читає ієрогліфи (1822)", "Champollion odczytuje hieroglify (1822)", "Champollion lee los jeroglíficos (1822)")],
          bravo: L("Bravo ! 20 000 ans d'histoire de l'écriture et du calcul.", "Молодець! 20 000 років історії письма й рахунку.", "Brawo! 20 000 lat historii pisma i liczenia.", "¡Bien! 20 000 años de historia de la escritura y del cálculo."),
          erreur: L("Pas encore. Avec « − », le plus grand nombre est le plus ancien. 1822 est à la fin.", "Ще ні. Зі знаком «−» найбільше число — найдавніше. 1822 — в кінці.", "Jeszcze nie. Ze znakiem „−” największa liczba jest najdawniejsza. 1822 jest na końcu.", "Todavía no. Con «−», el número más grande es el más antiguo. 1822 va al final."),
          aides: [L("− 3300 est avant − 3100.", "− 3300 раніше за − 3100.", "− 3300 jest przed − 3100.", "− 3300 es antes que − 3100.")] },
        CLASSER(L("Beaucoup d'écritures du monde descendent de l'alphabet phénicien. CLASSE chaque mot selon son alphabet.", "Багато писемностей світу походять від фінікійського алфавіту. РОЗПОДІЛИ кожне слово за його алфавітом.", "Wiele pism świata pochodzi od alfabetu fenickiego. PRZYPORZĄDKUJ każde słowo według alfabetu.", "Muchas escrituras del mundo descienden del alfabeto fenicio. CLASIFICA cada palabra según su alfabeto."),
          [{ id: "lat", label: L("Alphabet latin", "Латинський алфавіт", "Alfabet łaciński", "Alfabeto latino") }, { id: "cyr", label: L("Alphabet cyrillique", "Кирилиця", "Cyrylica", "Alfabeto cirílico") }, { id: "gre", label: L("Alphabet grec", "Грецький алфавіт", "Alfabet grecki", "Alfabeto griego") }, { id: "ara", label: L("Alphabet arabe", "Арабський алфавіт", "Alfabet arabski", "Alfabeto árabe") }],
          [{ id: "w1", label: "Bruxelles", bac: "lat" }, { id: "w2", label: "Київ", bac: "cyr" }, { id: "w3", label: "Αθήνα", bac: "gre" }, { id: "w4", label: "القاهرة", bac: "ara" }, { id: "w5", label: "Warszawa", bac: "lat" }, { id: "w6", label: "Madrid", bac: "lat" }],
          L("Bravo ! Des lettres différentes, mais une même grande famille née au Proche-Orient.", "Молодець! Різні літери, але одна велика родина, що народилася на Близькому Сході.", "Brawo! Różne litery, ale jedna wielka rodzina zrodzona na Bliskim Wschodzie.", "¡Bien! Letras diferentes, pero una misma gran familia nacida en Oriente Próximo."),
          L("Pas encore. L'arabe s'écrit de droite à gauche ; le grec a des lettres comme Α, Θ, Η ; le cyrillique des lettres comme К, Ї.", "Ще ні. Арабське письмо йде справа наліво; у грецькому є літери Α, Θ, Η; у кирилиці — К, Ї.", "Jeszcze nie. Arabski pisze się od prawej do lewej; grecki ma litery jak Α, Θ, Η; cyrylica litery jak К, Ї.", "Todavía no. El árabe se escribe de derecha a izquierda; el griego tiene letras como Α, Θ, Η; el cirílico letras como К, Ї."),
          [L("Si tu reconnais toutes les lettres de notre alphabet, c'est le latin.", "Якщо ти впізнаєш усі літери нашого алфавіту — це латинка.", "Jeśli rozpoznajesz wszystkie litery naszego alfabetu, to alfabet łaciński.", "Si reconoces todas las letras de nuestro alfabeto, es el latino.")]),
        AUTO("CHOISIS : est-ce que tu sais expliquer comment on a relu les hiéroglyphes ?", "ВИБЕРИ: чи вмієш ти пояснити, як знову прочитали ієрогліфи?", "WYBIERZ: czy umiesz wyjaśnić, jak znów odczytano hieroglify?", "ELIGE: ¿sabes explicar cómo se volvieron a leer los jeroglíficos?")
      ] }
  );

  /* ---------- Mini-tests et test de fin ---------- */
  P.tests.push(
    { id: "test-ecr-compter", titre: L("Mini-test : compter sans écrire", "Міні-тест: рахувати без письма", "Mini-test: liczyć bez pisania", "Mini-prueba: contar sin escribir"),
      questions: [
        Q("ecr-hypo", L("CHOISIS la phrase qui est une hypothèse.", "ВИБЕРИ речення, яке є гіпотезою.", "WYBIERZ zdanie, które jest hipotezą.", "ELIGE la frase que es una hipótesis."),
          [o("L'os d'Ishango a été trouvé au Congo.", "Кістку з Ішанго знайшли в Конго.", "Kość z Ishango znaleziono w Kongu.", "El hueso de Ishango se encontró en el Congo."), o("Peut-être que l'os servait de calendrier.", "Можливо, кістка служила календарем.", "Może kość służyła jako kalendarz.", "Quizás el hueso servía de calendario.", true), o("L'os est à Bruxelles.", "Кістка в Брюсселі.", "Kość jest w Brukseli.", "El hueso está en Bruselas.")],
          L("« Peut-être que… » : c'est une idée qu'on ne peut pas prouver. Les autres phrases sont des faits.", "«Можливо…» — це думка, яку не можна довести. Інші речення — факти.", "„Może…” to pomysł, którego nie da się udowodnić. Inne zdania to fakty.", "«Quizás…»: es una idea que no se puede demostrar. Las otras frases son hechos.")),
        Q("ecr-periode", L("CHOISIS : l'os d'Ishango date de…", "ВИБЕРИ: кістка з Ішанго належить до…", "WYBIERZ: kość z Ishango pochodzi z…", "ELIGE: el hueso de Ishango es de…"),
          [o("la Préhistoire", "доісторичних часів", "prehistorii", "la Prehistoria", true), o("l'Antiquité", "античності", "starożytności", "la Antigüedad"), o("l'époque contemporaine", "новітнього часу", "czasów współczesnych", "la época contemporánea")],
          L("Environ 20 000 ans : bien avant l'écriture. C'est la Préhistoire.", "Приблизно 20 000 років: задовго до письма. Це доісторичні часи.", "Około 20 000 lat: dużo przed pismem. To prehistoria.", "Unos 20 000 años: mucho antes de la escritura. Es la Prehistoria.")),
        Q("ecr-congo", L("CHOISIS : Ishango se trouve…", "ВИБЕРИ: Ішанго знаходиться…", "WYBIERZ: Ishango leży…", "ELIGE: Ishango está…"),
          [o("en Asie", "в Азії", "w Azji", "en Asia"), o("en Europe", "в Європі", "w Europie", "en Europa"), o("au centre de l'Afrique", "у центрі Африки", "w środku Afryki", "en el centro de África", true)],
          L("Au Congo, au centre de l'Afrique.", "У Конго, в центрі Африки.", "W Kongu, w środku Afryki.", "En el Congo, en el centro de África."))
      ] },
    { id: "test-ecr-mesopotamie", titre: L("Mini-test : la Mésopotamie", "Міні-тест: Месопотамія", "Mini-test: Mezopotamia", "Mini-prueba: Mesopotamia"),
      questions: [
        Q("ecr-pourquoi", L("CHOISIS : au début, on écrit surtout pour…", "ВИБЕРИ: спочатку пишуть переважно, щоб…", "WYBIERZ: na początku pisze się głównie, żeby…", "ELIGE: al principio se escribe sobre todo para…"),
          [o("écrire des poèmes", "писати вірші", "pisać wiersze", "escribir poemas"), o("envoyer des messages d'amour", "надсилати любовні листи", "wysyłać listy miłosne", "enviar mensajes de amor"), o("compter les récoltes et la nourriture", "рахувати врожаї та їжу", "liczyć zbiory i jedzenie", "contar las cosechas y la comida", true)],
          L("Les premières tablettes sont des comptes.", "Перші таблички — це рахунки.", "Pierwsze tabliczki to rachunki.", "Las primeras tablillas son cuentas.")),
        Q("ecr-signes", L("CHOISIS : sur la tablette, l'épi veut dire…", "ВИБЕРИ: на табличці колосок означає…", "WYBIERZ: na tabliczce kłos znaczy…", "ELIGE: en la tablilla, la espiga significa…"),
          [o("orge", "ячмінь", "jęczmień", "cebada", true), o("roi", "цар", "król", "rey"), o("eau", "вода", "woda", "agua")],
          L("Le dessin d'épi veut dire « orge ».", "Малюнок колоска означає «ячмінь».", "Rysunek kłosa znaczy „jęczmień”.", "El dibujo de la espiga significa «cebada»."), DOC.tablette),
        Q("ecr-meso", L("CHOISIS : la Mésopotamie, c'est aujourd'hui surtout…", "ВИБЕРИ: Месопотамія сьогодні — це переважно…", "WYBIERZ: Mezopotamia to dziś głównie…", "ELIGE: Mesopotamia es hoy sobre todo…"),
          [o("le Maroc", "Марокко", "Maroko", "Marruecos"), o("l'Irak", "Ірак", "Irak", "Irak", true), o("la Belgique", "Бельгія", "Belgia", "Bélgica")],
          L("Entre le Tigre et l'Euphrate : l'Irak.", "Між Тигром і Євфратом: Ірак.", "Między Tygrysem a Eufratem: Irak.", "Entre el Tigris y el Éufrates: Irak."))
      ] },
    { id: "test-ecr-egypte", titre: L("Mini-test : les scribes égyptiens", "Міні-тест: єгипетські писарі", "Mini-test: egipscy skrybowie", "Mini-prueba: los escribas egipcios"),
      questions: [
        Q("ecr-decoder", L("DÉCODE ce nombre égyptien (1 corde, 5 anses, 2 bâtons).", "РОЗШИФРУЙ це єгипетське число (1 мотузка, 5 дужок, 2 палички).", "ODCZYTAJ tę egipską liczbę (1 sznur, 5 łuków, 2 kreski).", "DESCIFRA este número egipcio (1 cuerda, 5 asas, 2 palitos)."),
          [o("152", "152", "152", "152", true), o("512", "512", "512", "512"), o("8", "8", "8", "8")],
          L("100 + 50 + 2 = 152.", "100 + 50 + 2 = 152.", "100 + 50 + 2 = 152.", "100 + 50 + 2 = 152.")),
        Q("ecr-mesurer", L("CALCULE : 2 coudées (52 cm chacune), c'est…", "ПОРАХУЙ: 2 лікті (по 52 см) — це…", "POLICZ: 2 łokcie (po 52 cm) to…", "CALCULA: 2 codos (52 cm cada uno) son…"),
          [o("54 cm", "54 см", "54 cm", "54 cm"), o("104 cm", "104 см", "104 cm", "104 cm", true), o("520 cm", "520 см", "520 cm", "520 cm")],
          L("52 + 52 = 104 cm.", "52 + 52 = 104 см.", "52 + 52 = 104 cm.", "52 + 52 = 104 cm.")),
        Q("ecr-usage", L("CHOISIS : le papyrus Rhind sert surtout à…", "ВИБЕРИ: папірус Рінда служить передусім, щоб…", "WYBIERZ: papirus Rhinda służy głównie do…", "ELIGE: el papiro Rhind sirve sobre todo para…"),
          [o("mesurer", "вимірювати", "mierzenia", "medir"), o("raconter la vie du roi", "розповідати про життя царя", "opowiadania o życiu króla", "contar la vida del rey"), o("apprendre à calculer", "вчитися рахувати", "nauki liczenia", "aprender a calcular", true)],
          L("C'est un rouleau de problèmes de calcul.", "Це сувій із математичними задачами.", "To zwój z zadaniami z rachunków.", "Es un rollo de problemas de cálculo."))
      ] },
    { id: "test-ecr-relire", titre: L("Mini-test : relire les hiéroglyphes", "Міні-тест: знову прочитати ієрогліфи", "Mini-test: odczytać hieroglify", "Mini-prueba: volver a leer los jeroglíficos"),
      questions: [
        Q("ecr-rosette", L("CHOISIS : pourquoi la pierre de Rosette a-t-elle aidé Champollion ?", "ВИБЕРИ: чому Розеттський камінь допоміг Шампольйону?", "WYBIERZ: dlaczego kamień z Rosetty pomógł Champollionowi?", "ELIGE: ¿por qué la piedra de Rosetta ayudó a Champollion?"),
          [o("Elle est très grande.", "Він дуже великий.", "Jest bardzo duży.", "Es muy grande."), o("Le même texte y est aussi écrit en grec.", "Той самий текст на ньому написано й грецькою.", "Ten sam tekst jest na nim też po grecku.", "El mismo texto también está escrito en griego.", true), o("Elle est en or.", "Він із золота.", "Jest ze złota.", "Es de oro.")],
          L("En comparant avec le grec, il trouve le sens des hiéroglyphes.", "Порівнюючи з грецьким, він знаходить значення ієрогліфів.", "Porównując z greckim, odkrywa znaczenie hieroglifów.", "Comparando con el griego, encuentra el sentido de los jeroglíficos.")),
        Q("ecr-frise", L("CHOISIS le plus récent.", "ВИБЕРИ найновіше.", "WYBIERZ najnowsze.", "ELIGE lo más reciente."),
          [o("l'alphabet phénicien", "фінікійський алфавіт", "alfabet fenicki", "el alfabeto fenicio"), o("les premières tablettes", "перші таблички", "pierwsze tabliczki", "las primeras tablillas"), o("Champollion lit les hiéroglyphes", "Шампольйон читає ієрогліфи", "Champollion odczytuje hieroglify", "Champollion lee los jeroglíficos", true)],
          L("1822, c'est après J.-C. : le plus récent.", "1822 — це після Р. Х.: найновіше.", "1822 to po Chrystusie: najnowsze.", "1822 es después de Cristo: lo más reciente.")),
        Q("ecr-alphabet", L("CHOISIS : notre alphabet vient d'abord des…", "ВИБЕРИ: наш алфавіт походить спершу від…", "WYBIERZ: nasz alfabet pochodzi najpierw od…", "ELIGE: nuestro alfabeto viene primero de los…"),
          [o("Phéniciens", "фінікійців", "Fenicjan", "fenicios", true), o("Égyptiens", "єгиптян", "Egipcjan", "egipcios"), o("Belges", "бельгійців", "Belgów", "belgas")],
          L("Les Phéniciens (Liban), puis les Grecs et les Romains.", "Фінікійці (Ліван), потім греки й римляни.", "Fenicjanie (Liban), potem Grecy i Rzymianie.", "Los fenicios (Líbano), luego los griegos y los romanos."))
      ] },
    { id: "bilan-hist-ecriture", titre: L("Test de fin : compter, écrire, mesurer", "Підсумковий тест: рахувати, писати, вимірювати", "Test końcowy: liczyć, pisać, mierzyć", "Prueba final: contar, escribir, medir"),
      questions: [
        Q("ecr-meso", L("CHOISIS : où invente-t-on l'écriture vers − 3300 ?", "ВИБЕРИ: де винайшли письмо близько − 3300?", "WYBIERZ: gdzie wynaleziono pismo około − 3300?", "ELIGE: ¿dónde se inventa la escritura hacia − 3300?"),
          [o("en Grèce", "у Греції", "w Grecji", "en Grecia"), o("en Mésopotamie", "у Месопотамії", "w Mezopotamii", "en Mesopotamia", true), o("au Congo", "у Конго", "w Kongu", "en el Congo")],
          L("En Mésopotamie (Irak).", "У Месопотамії (Ірак).", "W Mezopotamii (Irak).", "En Mesopotamia (Irak).")),
        Q("ecr-periode", L("CHOISIS : l'invention de l'écriture marque…", "ВИБЕРИ: винайдення письма позначає…", "WYBIERZ: wynalezienie pisma oznacza…", "ELIGE: la invención de la escritura marca…"),
          [o("le début de l'Antiquité", "початок античності", "początek starożytności", "el comienzo de la Antigüedad", true), o("le début du Moyen Âge", "початок середньовіччя", "początek średniowiecza", "el comienzo de la Edad Media"), o("la fin de l'Antiquité", "кінець античності", "koniec starożytności", "el fin de la Antigüedad")],
          L("Fin de la Préhistoire, début de l'Antiquité.", "Кінець доісторичних часів, початок античності.", "Koniec prehistorii, początek starożytności.", "Fin de la Prehistoria, comienzo de la Antigüedad.")),
        Q("ecr-pourquoi", L("CHOISIS : la tablette de Jemdet Nasr parle de…", "ВИБЕРИ: табличка з Джемдет-Насра розповідає про…", "WYBIERZ: tabliczka z Dżemdet Nasr mówi o…", "ELIGE: la tablilla de Jemdet Nasr habla de…"),
          [o("une guerre", "війну", "wojnie", "una guerra"), o("un dieu", "бога", "bogu", "un dios"), o("des rations d'orge", "пайки ячменю", "racjach jęczmienia", "raciones de cebada", true)],
          L("Des nombres + « ration » + « orge ».", "Числа + «пайок» + «ячмінь».", "Liczby + „racja” + „jęczmień”.", "Números + «ración» + «cebada»."), DOC.tablette),
        Q("ecr-decoder", L("DÉCODE : 3 anses et 1 bâton égyptiens =", "РОЗШИФРУЙ: 3 єгипетські дужки й 1 паличка =", "ODCZYTAJ: 3 egipskie łuki i 1 kreska =", "DESCIFRA: 3 asas y 1 palito egipcios ="),
          [o("4", "4", "4", "4"), o("31", "31", "31", "31", true), o("301", "301", "301", "301")],
          L("10 + 10 + 10 + 1 = 31.", "10 + 10 + 10 + 1 = 31.", "10 + 10 + 10 + 1 = 31.", "10 + 10 + 10 + 1 = 31.")),
        Q("ecr-hypo", L("CHOISIS : on ne sait pas à quoi servait l'os d'Ishango. Que fait l'historien ?", "ВИБЕРИ: невідомо, для чого служила кістка з Ішанго. Що робить історик?", "WYBIERZ: nie wiadomo, do czego służyła kość z Ishango. Co robi historyk?", "ELIGE: no se sabe para qué servía el hueso de Ishango. ¿Qué hace el historiador?"),
          [o("Il émet des hypothèses et les compare.", "Він висуває гіпотези й порівнює їх.", "Stawia hipotezy i je porównuje.", "Formula hipótesis y las compara.", true), o("Il invente une réponse sûre.", "Він вигадує точну відповідь.", "Wymyśla pewną odpowiedź.", "Inventa una respuesta segura."), o("Il jette l'os.", "Він викидає кістку.", "Wyrzuca kość.", "Tira el hueso.")],
          L("Quand on ne peut pas prouver, on parle d'hypothèses.", "Коли не можна довести, говорять про гіпотези.", "Gdy nie można udowodnić, mówimy o hipotezach.", "Cuando no se puede demostrar, se habla de hipótesis.")),
        Q("ecr-rosette", L("CHOISIS : la pierre de Rosette est…", "ВИБЕРИ: Розеттський камінь — це…", "WYBIERZ: kamień z Rosetty to…", "ELIGE: la piedra de Rosetta es…"),
          [o("un travail postérieur de 1822", "пізніша праця 1822 року", "praca późniejsza z 1822 roku", "un trabajo posterior de 1822"), o("une trace du passé (− 196)", "слід минулого (− 196)", "ślad przeszłości (− 196)", "una huella del pasado (− 196)", true)],
          L("Elle a été gravée en − 196 : c'est une trace. Champollion l'a seulement étudiée.", "Його вирізьблено в − 196: це слід. Шампольйон його лише вивчав.", "Wyryto go w − 196: to ślad. Champollion tylko go badał.", "Se grabó en − 196: es una huella. Champollion solo la estudió."), DOC.rosette),
        Q("ecr-mesurer", L("CHOISIS : la coudée mesure environ…", "ВИБЕРИ: лікоть — це приблизно…", "WYBIERZ: łokieć ma około…", "ELIGE: el codo mide unos…"),
          [o("5 cm", "5 см", "5 cm", "5 cm"), o("52 cm", "52 см", "52 cm", "52 cm", true), o("5 m", "5 м", "5 m", "5 m")],
          L("Environ 52 cm, du coude au bout des doigts.", "Приблизно 52 см, від ліктя до кінчиків пальців.", "Około 52 cm, od łokcia do końca palców.", "Unos 52 cm, del codo a la punta de los dedos."))
      ] }
  );
})();
