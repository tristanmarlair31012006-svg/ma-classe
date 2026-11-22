/* Parcours des leçons : chapitres → séquences → étapes, mini-tests et tests de fin de chapitre.
   C'EST ICI QU'ON AJOUTE LE CONTENU. Tout ce qui porte « exemple: true » est un exemple à remplacer.

   Chapitre  : { id, discipline (histoire | geo | social | eco), titre, dejaVu: [textes], sequences: [ids], bilan: id de test, exemple }
   Séquence  : { id, titre, objectif, criteres: [{ id, t }], etapes: [...] }
     Étape   : { type: "ressource", titre, contenu: { textes: [...], liste: [...], lien: { url, label } } }
               { type: "activite", activite: id dans data.js }
               { type: "minitest", test: id de test }
               { type: "synthese", titre, contenu: { textes, liste } }
   Test      : { id, titre, questions: [{ critere, consigne, visuel?, options: [{ label, correct }], explication }] }
   Textes    : { fr, uk, pl, es, rn } comme dans data.js (rn = null tant que pas relu). */

window.PARCOURS = {
  chapitres: [
    {
      id: "eco-1", discipline: "eco", exemple: true,
      titre: { fr: "L'argent au quotidien", uk: "Гроші щодня", pl: "Pieniądze na co dzień", es: "El dinero en el día a día", rn: null },
      dejaVu: [
        { fr: "En Belgique, on paie en euros (€).", uk: "У Бельгії платять у євро (€).", pl: "W Belgii płaci się w euro (€).", es: "En Bélgica se paga en euros (€).", rn: null }
      ],
      sequences: ["argent-euro", "argent-prix"],
      bilan: "bilan-eco-1"
    },
    {
      id: "hist-1", discipline: "histoire", exemple: true,
      titre: { fr: "Se repérer dans le temps", uk: "Орієнтуватися в часі", pl: "Orientować się w czasie", es: "Situarse en el tiempo", rn: null },
      dejaVu: [],
      sequences: ["temps-siecles"],
      bilan: "bilan-hist-1"
    }
  ],

  sequences: [
    {
      id: "argent-euro",
      titre: { fr: "Reconnaître et compter les euros", uk: "Розпізнавати й рахувати євро", pl: "Rozpoznawać i liczyć euro", es: "Reconocer y contar euros", rn: null },
      objectif: { fr: "Je sais reconnaître les pièces et les billets, et calculer une somme.", uk: "Я вмію розпізнавати монети й банкноти та рахувати суму.", pl: "Umiem rozpoznać monety i banknoty oraz policzyć sumę.", es: "Sé reconocer monedas y billetes, y calcular una suma.", rn: null },
      criteres: [
        { id: "euro-forme", t: { fr: "Je reconnais une pièce et un billet.", uk: "Я розрізняю монету й банкноту.", pl: "Rozpoznaję monetę i banknot.", es: "Reconozco una moneda y un billete.", rn: null } },
        { id: "euro-somme", t: { fr: "Je calcule une somme en euros.", uk: "Я рахую суму в євро.", pl: "Liczę sumę w euro.", es: "Calculo una suma en euros.", rn: null } }
      ],
      etapes: [
        { type: "ressource",
          titre: { fr: "Les pièces et les billets", uk: "Монети й банкноти", pl: "Monety i banknoty", es: "Las monedas y los billetes", rn: null },
          contenu: {
            textes: [
              { fr: "En euros, il y a des pièces et des billets.", uk: "У євро є монети й банкноти.", pl: "W euro są monety i banknoty.", es: "En euros hay monedas y billetes.", rn: null },
              { fr: "Les pièces sont rondes et en métal. Les billets sont des rectangles en papier.", uk: "Монети круглі й металеві. Банкноти — паперові прямокутники.", pl: "Monety są okrągłe i z metalu. Banknoty to papierowe prostokąty.", es: "Las monedas son redondas y de metal. Los billetes son rectángulos de papel.", rn: null }
            ],
            liste: [
              { fr: "Pièces : 1 c, 2 c, 5 c, 10 c, 20 c, 50 c, 1 €, 2 €", uk: "Монети: 1 c, 2 c, 5 c, 10 c, 20 c, 50 c, 1 €, 2 €", pl: "Monety: 1 c, 2 c, 5 c, 10 c, 20 c, 50 c, 1 €, 2 €", es: "Monedas: 1 c, 2 c, 5 c, 10 c, 20 c, 50 c, 1 €, 2 €", rn: null },
              { fr: "Billets : 5 €, 10 €, 20 €, 50 €, 100 €, 200 €", uk: "Банкноти: 5 €, 10 €, 20 €, 50 €, 100 €, 200 €", pl: "Banknoty: 5 €, 10 €, 20 €, 50 €, 100 €, 200 €", es: "Billetes: 5 €, 10 €, 20 €, 50 €, 100 €, 200 €", rn: null }
            ]
          } },
        { type: "activite", activite: "euro" },
        { type: "minitest", test: "test-euro" },
        { type: "synthese",
          titre: { fr: "Ce que je retiens", uk: "Що я запам'ятовую", pl: "Co zapamiętuję", es: "Lo que recuerdo", rn: null },
          contenu: {
            liste: [
              { fr: "1 € = 100 centimes.", uk: "1 € = 100 центів.", pl: "1 € = 100 centów.", es: "1 € = 100 céntimos.", rn: null },
              { fr: "Pour compter, je commence par les billets, puis j'ajoute les pièces.", uk: "Щоб порахувати, я починаю з банкнот, потім додаю монети.", pl: "Żeby policzyć, zaczynam od banknotów, potem dodaję monety.", es: "Para contar, empiezo por los billetes y luego sumo las monedas.", rn: null }
            ]
          } }
      ]
    },
    {
      id: "argent-prix",
      titre: { fr: "Lire un prix et payer", uk: "Читати ціну й платити", pl: "Czytać cenę i płacić", es: "Leer un precio y pagar", rn: null },
      objectif: { fr: "Je lis un prix et je sais combien payer.", uk: "Я читаю ціну й знаю, скільки заплатити.", pl: "Czytam cenę i wiem, ile zapłacić.", es: "Leo un precio y sé cuánto pagar.", rn: null },
      criteres: [],
      etapes: [] // pas encore de contenu : la séquence s'affiche « Bientôt »
    },
    {
      id: "temps-siecles",
      titre: { fr: "Les dates et les siècles", uk: "Дати й століття", pl: "Daty i wieki", es: "Las fechas y los siglos", rn: null },
      objectif: { fr: "Je place des dates dans l'ordre et je trouve leur siècle.", uk: "Я розташовую дати по порядку й знаходжу їхнє століття.", pl: "Układam daty po kolei i znajduję ich wiek.", es: "Ordeno fechas y encuentro su siglo.", rn: null },
      criteres: [
        { id: "temps-ordre", t: { fr: "Je dis si une date est avant ou après une autre.", uk: "Я кажу, чи дата раніше, чи пізніше за іншу.", pl: "Mówię, czy data jest wcześniej, czy później niż inna.", es: "Digo si una fecha es antes o después que otra.", rn: null } },
        { id: "temps-siecle", t: { fr: "Je trouve le siècle d'une année.", uk: "Я знаходжу століття року.", pl: "Znajduję wiek danego roku.", es: "Encuentro el siglo de un año.", rn: null } }
      ],
      etapes: [
        { type: "ressource",
          titre: { fr: "Un siècle, c'est quoi ?", uk: "Що таке століття?", pl: "Co to jest wiek?", es: "¿Qué es un siglo?", rn: null },
          contenu: {
            textes: [
              { fr: "Un siècle, c'est 100 ans.", uk: "Століття — це 100 років.", pl: "Wiek to 100 lat.", es: "Un siglo son 100 años.", rn: null },
              { fr: "On écrit le siècle en chiffres romains : XIXe, XXe, XXIe.", uk: "Століття пишуть римськими цифрами: XIX, XX, XXI.", pl: "Wiek zapisuje się cyframi rzymskimi: XIX, XX, XXI.", es: "El siglo se escribe con números romanos: XIX, XX, XXI.", rn: null }
            ],
            liste: [
              { fr: "De 1801 à 1900 : XIXe siècle", uk: "З 1801 до 1900: XIX століття", pl: "Od 1801 do 1900: XIX wiek", es: "De 1801 a 1900: siglo XIX", rn: null },
              { fr: "De 1901 à 2000 : XXe siècle", uk: "З 1901 до 2000: XX століття", pl: "Od 1901 do 2000: XX wiek", es: "De 1901 a 2000: siglo XX", rn: null },
              { fr: "De 2001 à 2100 : XXIe siècle", uk: "З 2001 до 2100: XXI століття", pl: "Od 2001 do 2100: XXI wiek", es: "De 2001 a 2100: siglo XXI", rn: null }
            ]
          } },
        { type: "minitest", test: "test-siecles" },
        { type: "synthese",
          titre: { fr: "Ce que je retiens", uk: "Що я запам'ятовую", pl: "Co zapamiętuję", es: "Lo que recuerdo", rn: null },
          contenu: {
            liste: [
              { fr: "Plus le nombre est petit, plus la date est ancienne.", uk: "Що менше число, то давніша дата.", pl: "Im mniejsza liczba, tym dawniejsza data.", es: "Cuanto más pequeño es el número, más antigua es la fecha.", rn: null },
              { fr: "Nous sommes au XXIe siècle.", uk: "Ми живемо у XXI столітті.", pl: "Żyjemy w XXI wieku.", es: "Estamos en el siglo XXI.", rn: null }
            ]
          } }
      ]
    }
  ],

  tests: [
    {
      id: "test-euro",
      titre: { fr: "Mini-test : les euros", uk: "Міні-тест: євро", pl: "Mini-test: euro", es: "Mini-prueba: los euros", rn: null },
      questions: [
        { critere: "euro-forme", visuel: ["20 €"],
          consigne: { fr: "CHOISIS : 20 €, c'est…", uk: "ВИБЕРИ: 20 € — це…", pl: "WYBIERZ: 20 € to…", es: "ELIGE: 20 € es…", rn: null },
          options: [
            { label: { fr: "une pièce", uk: "монета", pl: "moneta", es: "una moneda", rn: null } },
            { label: { fr: "un billet", uk: "банкнота", pl: "banknot", es: "un billete", rn: null }, correct: true }
          ],
          explication: { fr: "20 € est un billet : un rectangle en papier.", uk: "20 € — це банкнота: паперовий прямокутник.", pl: "20 € to banknot: papierowy prostokąt.", es: "20 € es un billete: un rectángulo de papel.", rn: null } },
        { critere: "euro-forme", visuel: ["2 €"],
          consigne: { fr: "CHOISIS : 2 €, c'est…", uk: "ВИБЕРИ: 2 € — це…", pl: "WYBIERZ: 2 € to…", es: "ELIGE: 2 € es…", rn: null },
          options: [
            { label: { fr: "une pièce", uk: "монета", pl: "moneta", es: "una moneda", rn: null }, correct: true },
            { label: { fr: "un billet", uk: "банкнота", pl: "banknot", es: "un billete", rn: null } }
          ],
          explication: { fr: "2 € est une pièce. Les billets commencent à 5 €.", uk: "2 € — це монета. Банкноти починаються з 5 €.", pl: "2 € to moneta. Banknoty zaczynają się od 5 €.", es: "2 € es una moneda. Los billetes empiezan en 5 €.", rn: null } },
        { critere: "euro-somme", visuel: ["5 €", "5 €", "1 €"],
          consigne: { fr: "CALCULE : combien d'argent ?", uk: "ПОРАХУЙ: скільки грошей?", pl: "POLICZ: ile pieniędzy?", es: "CALCULA: ¿cuánto dinero hay?", rn: null },
          options: [{ label: "10 €" }, { label: "11 €", correct: true }, { label: "12 €" }],
          explication: { fr: "5 € + 5 € = 10 €, puis 10 € + 1 € = 11 €.", uk: "5 € + 5 € = 10 €, потім 10 € + 1 € = 11 €.", pl: "5 € + 5 € = 10 €, potem 10 € + 1 € = 11 €.", es: "5 € + 5 € = 10 €, y 10 € + 1 € = 11 €.", rn: null } },
        { critere: "euro-somme", visuel: ["10 €", "10 €"],
          consigne: { fr: "CALCULE : combien d'argent ?", uk: "ПОРАХУЙ: скільки грошей?", pl: "POLICZ: ile pieniędzy?", es: "CALCULA: ¿cuánto dinero hay?", rn: null },
          options: [{ label: "20 €", correct: true }, { label: "100 €" }, { label: "12 €" }],
          explication: { fr: "10 € + 10 € = 20 €.", uk: "10 € + 10 € = 20 €.", pl: "10 € + 10 € = 20 €.", es: "10 € + 10 € = 20 €.", rn: null } }
      ]
    },
    {
      id: "bilan-eco-1",
      titre: { fr: "Test de fin de chapitre : l'argent au quotidien", uk: "Тест у кінці розділу: гроші щодня", pl: "Test na koniec rozdziału: pieniądze na co dzień", es: "Prueba de fin de capítulo: el dinero en el día a día", rn: null },
      questions: [
        { critere: "euro-forme",
          consigne: { fr: "CHOISIS : quelle monnaie utilise-t-on en Belgique ?", uk: "ВИБЕРИ: яку валюту використовують у Бельгії?", pl: "WYBIERZ: jakiej waluty używa się w Belgii?", es: "ELIGE: ¿qué moneda se usa en Bélgica?", rn: null },
          options: [{ label: "le dollar ($)" }, { label: "l'euro (€)", correct: true }, { label: "le zloty (zł)" }],
          explication: { fr: "En Belgique, on paie en euros.", uk: "У Бельгії платять у євро.", pl: "W Belgii płaci się w euro.", es: "En Bélgica se paga en euros.", rn: null } },
        { critere: "euro-forme", visuel: ["50 c"],
          consigne: { fr: "CHOISIS : 50 c, c'est…", uk: "ВИБЕРИ: 50 c — це…", pl: "WYBIERZ: 50 c to…", es: "ELIGE: 50 c es…", rn: null },
          options: [
            { label: { fr: "une pièce", uk: "монета", pl: "moneta", es: "una moneda", rn: null }, correct: true },
            { label: { fr: "un billet", uk: "банкнота", pl: "banknot", es: "un billete", rn: null } }
          ],
          explication: { fr: "50 centimes, c'est une pièce.", uk: "50 центів — це монета.", pl: "50 centów to moneta.", es: "50 céntimos es una moneda.", rn: null } },
        { critere: "euro-somme", visuel: ["20 €", "5 €", "2 €"],
          consigne: { fr: "CALCULE : combien d'argent ?", uk: "ПОРАХУЙ: скільки грошей?", pl: "POLICZ: ile pieniędzy?", es: "CALCULA: ¿cuánto dinero hay?", rn: null },
          options: [{ label: "25 €" }, { label: "27 €", correct: true }, { label: "29 €" }],
          explication: { fr: "20 € + 5 € = 25 €, puis 25 € + 2 € = 27 €.", uk: "20 € + 5 € = 25 €, потім 25 € + 2 € = 27 €.", pl: "20 € + 5 € = 25 €, potem 25 € + 2 € = 27 €.", es: "20 € + 5 € = 25 €, y 25 € + 2 € = 27 €.", rn: null } },
        { critere: "euro-somme", visuel: ["10 €", "1 €", "1 €"],
          consigne: { fr: "CALCULE : combien d'argent ?", uk: "ПОРАХУЙ: скільки грошей?", pl: "POLICZ: ile pieniędzy?", es: "CALCULA: ¿cuánto dinero hay?", rn: null },
          options: [{ label: "12 €", correct: true }, { label: "11 €" }, { label: "102 €" }],
          explication: { fr: "10 € + 1 € + 1 € = 12 €.", uk: "10 € + 1 € + 1 € = 12 €.", pl: "10 € + 1 € + 1 € = 12 €.", es: "10 € + 1 € + 1 € = 12 €.", rn: null } }
      ]
    },
    {
      id: "test-siecles",
      titre: { fr: "Mini-test : les dates et les siècles", uk: "Міні-тест: дати й століття", pl: "Mini-test: daty i wieki", es: "Mini-prueba: las fechas y los siglos", rn: null },
      questions: [
        { critere: "temps-siecle",
          consigne: { fr: "CHOISIS : en quel siècle est l'année 2026 ?", uk: "ВИБЕРИ: у якому столітті 2026 рік?", pl: "WYBIERZ: w którym wieku jest rok 2026?", es: "ELIGE: ¿en qué siglo está el año 2026?", rn: null },
          options: [{ label: "XXe" }, { label: "XXIe", correct: true }, { label: "XIXe" }],
          explication: { fr: "De 2001 à 2100, c'est le XXIe siècle.", uk: "З 2001 до 2100 — це XXI століття.", pl: "Od 2001 do 2100 to XXI wiek.", es: "De 2001 a 2100 es el siglo XXI.", rn: null } },
        { critere: "temps-siecle",
          consigne: { fr: "CHOISIS : la Belgique devient indépendante en 1830. En quel siècle ?", uk: "ВИБЕРИ: Бельгія стала незалежною в 1830 році. У якому столітті?", pl: "WYBIERZ: Belgia stała się niepodległa w 1830 roku. W którym wieku?", es: "ELIGE: Bélgica se independiza en 1830. ¿En qué siglo?", rn: null },
          options: [{ label: "XVIIIe" }, { label: "XIXe", correct: true }, { label: "XXe" }],
          explication: { fr: "De 1801 à 1900, c'est le XIXe siècle.", uk: "З 1801 до 1900 — це XIX століття.", pl: "Od 1801 do 1900 to XIX wiek.", es: "De 1801 a 1900 es el siglo XIX.", rn: null } },
        { critere: "temps-ordre",
          consigne: { fr: "CHOISIS la date la plus ancienne.", uk: "ВИБЕРИ найдавнішу дату.", pl: "WYBIERZ najdawniejszą datę.", es: "ELIGE la fecha más antigua.", rn: null },
          options: [{ label: "1914" }, { label: "1830", correct: true }, { label: "2001" }],
          explication: { fr: "1830 est le plus petit nombre : c'est la date la plus ancienne.", uk: "1830 — найменше число: це найдавніша дата.", pl: "1830 to najmniejsza liczba: to najdawniejsza data.", es: "1830 es el número más pequeño: es la fecha más antigua.", rn: null } },
        { critere: "temps-ordre",
          consigne: { fr: "CHOISIS : l'année 2001 est… l'année 1999.", uk: "ВИБЕРИ: 2001 рік … 1999 року.", pl: "WYBIERZ: rok 2001 jest… roku 1999.", es: "ELIGE: el año 2001 es… del año 1999.", rn: null },
          options: [
            { label: { fr: "avant", uk: "раніше", pl: "przed", es: "antes", rn: null } },
            { label: { fr: "après", uk: "пізніше", pl: "po", es: "después", rn: null }, correct: true }
          ],
          explication: { fr: "2001 est plus grand que 1999 : c'est après.", uk: "2001 більше за 1999: це пізніше.", pl: "2001 jest większe niż 1999: to później.", es: "2001 es mayor que 1999: es después.", rn: null } }
      ]
    },
    {
      id: "bilan-hist-1",
      titre: { fr: "Test de fin de chapitre : se repérer dans le temps", uk: "Тест у кінці розділу: орієнтуватися в часі", pl: "Test na koniec rozdziału: orientować się w czasie", es: "Prueba de fin de capítulo: situarse en el tiempo", rn: null },
      questions: [
        { critere: "temps-siecle",
          consigne: { fr: "CHOISIS : en quel siècle est l'année 1914 ?", uk: "ВИБЕРИ: у якому столітті 1914 рік?", pl: "WYBIERZ: w którym wieku jest rok 1914?", es: "ELIGE: ¿en qué siglo está el año 1914?", rn: null },
          options: [{ label: "XIXe" }, { label: "XXe", correct: true }, { label: "XXIe" }],
          explication: { fr: "De 1901 à 2000, c'est le XXe siècle.", uk: "З 1901 до 2000 — це XX століття.", pl: "Od 1901 do 2000 to XX wiek.", es: "De 1901 a 2000 es el siglo XX.", rn: null } },
        { critere: "temps-ordre",
          consigne: { fr: "CHOISIS la date la plus récente.", uk: "ВИБЕРИ найпізнішу дату.", pl: "WYBIERZ najpóźniejszą datę.", es: "ELIGE la fecha más reciente.", rn: null },
          options: [{ label: "1830" }, { label: "1914" }, { label: "2026", correct: true }],
          explication: { fr: "2026 est le plus grand nombre : c'est la date la plus récente.", uk: "2026 — найбільше число: це найпізніша дата.", pl: "2026 to największa liczba: to najpóźniejsza data.", es: "2026 es el número más grande: es la fecha más reciente.", rn: null } },
        { critere: "temps-siecle",
          consigne: { fr: "CHOISIS : un siècle, c'est…", uk: "ВИБЕРИ: століття — це…", pl: "WYBIERZ: wiek to…", es: "ELIGE: un siglo es…", rn: null },
          options: [
            { label: { fr: "10 ans", uk: "10 років", pl: "10 lat", es: "10 años", rn: null } },
            { label: { fr: "100 ans", uk: "100 років", pl: "100 lat", es: "100 años", rn: null }, correct: true },
            { label: { fr: "1000 ans", uk: "1000 років", pl: "1000 lat", es: "1000 años", rn: null } }
          ],
          explication: { fr: "Un siècle, c'est 100 ans.", uk: "Століття — це 100 років.", pl: "Wiek to 100 lat.", es: "Un siglo son 100 años.", rn: null } }
      ]
    }
  ]
};
