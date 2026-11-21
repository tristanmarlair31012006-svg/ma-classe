/* Contenu de l'app DASPA.
   Chaque texte : { fr, uk, pl, es, rn }. « masculin|féminin » : l'app choisit selon le profil. rn (kirundi) = null tant qu'il n'est pas relu par un locuteur.
   Pictos : identifiants ARASAAC (https://arasaac.org, CC BY-NC-SA, Gobierno de Aragón, auteur Sergio Palao). */

window.DATA = {
  langues: {
    fr: { nom: "Français", code: "FR", voix: "fr-FR" },
    uk: { nom: "Українська", code: "UK", voix: "uk-UA" },
    pl: { nom: "Polski", code: "PL", voix: "pl-PL" },
    es: { nom: "Español", code: "ES", voix: "es-ES" },
    rn: { nom: "Ikirundi", code: "RN", voix: null }
  },

  ui: {
    accueil: { fr: "Accueil", uk: "Головна", pl: "Start", es: "Inicio", rn: null },
    lecons: { fr: "Leçons", uk: "Уроки", pl: "Lekcje", es: "Lecciones", rn: null },
    atelier: { fr: "Atelier", uk: "Майстерня", pl: "Pracownia", es: "Taller", rn: null },
    mots: { fr: "Mes mots", uk: "Мої слова", pl: "Moje słowa", es: "Mis palabras", rn: null },
    bonjour: { fr: "Bonjour", uk: "Привіт", pl: "Cześć", es: "Hola", rn: null },
    humeur: { fr: "Comment tu te sens aujourd'hui ?", uk: "Як ти почуваєшся сьогодні?", pl: "Jak się dziś czujesz?", es: "¿Cómo te sientes hoy?", rn: null },
    hier: { fr: "Hier, j'ai…", uk: "Учора я…", pl: "Wczoraj…", es: "Ayer…", rn: null },
    hierDire: { fr: "DIS ta phrase à voix haute.", uk: "СКАЖИ своє речення вголос.", pl: "POWIEDZ swoje zdanie na głos.", es: "DI tu frase en voz alta.", rn: null },
    progres: { fr: "Mes progrès", uk: "Мої успіхи", pl: "Moje postępy", es: "Mis progresos", rn: null },
    continuer: { fr: "Continuer", uk: "Продовжити", pl: "Dalej", es: "Continuar", rn: null },
    suivant: { fr: "Suivant", uk: "Далі", pl: "Dalej", es: "Siguiente", rn: null },
    verifier: { fr: "Vérifier", uk: "Перевірити", pl: "Sprawdź", es: "Comprobar", rn: null },
    coupDePouce: { fr: "Coup de pouce", uk: "Підказка", pl: "Podpowiedź", es: "Una ayuda", rn: null },
    bloque: { fr: "Je suis bloqué|Je suis bloquée", uk: "Я не можу далі", pl: "Utknąłem|Utknęłam", es: "No puedo seguir", rn: null },
    question: { fr: "J'ai une question", uk: "У мене питання", pl: "Mam pytanie", es: "Tengo una pregunta", rn: null },
    fini: { fr: "J'ai fini", uk: "Я закінчив|Я закінчила", pl: "Skończyłem|Skończyłam", es: "He terminado", rn: null },
    signalActif: { fr: "Le prof a vu ton signal. Touche encore pour l'enlever.", uk: "Учитель бачить твій сигнал. Торкнись ще раз, щоб зняти.", pl: "Nauczyciel widzi twój sygnał. Dotknij jeszcze raz, aby go usunąć.", es: "El profe ve tu señal. Toca otra vez para quitarla.", rn: null },
    jeSais: { fr: "Je sais", uk: "Я знаю", pl: "Umiem", es: "Lo sé", rn: null },
    presque: { fr: "Presque", uk: "Майже", pl: "Prawie", es: "Casi", rn: null },
    pasEncore: { fr: "Pas encore", uk: "Ще ні", pl: "Jeszcze nie", es: "Todavía no", rn: null },
    bravo: { fr: "Activité terminée", uk: "Завдання виконано", pl: "Zadanie ukończone", es: "Actividad terminada", rn: null },
    tonAvis: { fr: "Ton avis", uk: "Твоя оцінка", pl: "Twoja ocena", es: "Tu opinión", rn: null },
    discuter: { fr: "Discuter", uk: "Чат", pl: "Czat", es: "Chat", rn: null },
    toutLaClasse: { fr: "Toute la classe", uk: "Увесь клас", pl: "Cała klasa", es: "Toda la clase", rn: null },
    groupe: { fr: "Groupe", uk: "Група", pl: "Grupa", es: "Grupo", rn: null },
    ecrisMessage: { fr: "ÉCRIS ton message dans ta langue. Les autres le lisent dans la leur.", uk: "НАПИШИ повідомлення своєю мовою. Інші прочитають його своєю.", pl: "NAPISZ wiadomość w swoim języku. Inni przeczytają ją w swoim.", es: "ESCRIBE tu mensaje en tu idioma. Los demás lo leen en el suyo.", rn: null },
    envoyer: { fr: "Envoyer", uk: "Надіслати", pl: "Wyślij", es: "Enviar", rn: null },
    original: { fr: "Original", uk: "Оригінал", pl: "Oryginał", es: "Original", rn: null },
    enFrancais: { fr: "En français", uk: "Французькою", pl: "Po francusku", es: "En francés", rn: null },
    tradAuto: { fr: "Traduction automatique : elle peut se tromper.", uk: "Автоматичний переклад: можливі помилки.", pl: "Tłumaczenie automatyczne: może się mylić.", es: "Traducción automática: puede equivocarse.", rn: null },
    chatPause: { fr: "Le prof a mis la discussion en pause.", uk: "Учитель поставив чат на паузу.", pl: "Nauczyciel wstrzymał czat.", es: "El profe ha pausado el chat.", rn: null },
    horsLigne: { fr: "Pas de connexion. Vérifie le wifi.", uk: "Немає з'єднання. Перевір wifi.", pl: "Brak połączenia. Sprawdź wifi.", es: "Sin conexión. Revisa el wifi.", rn: null },
    regleChat: { fr: "On écrit pour travailler ensemble. Pas d'adresse, pas de numéro de téléphone, pas de moquerie.", uk: "Пишемо, щоб працювати разом. Без адрес, номерів телефону та глузувань.", pl: "Piszemy, żeby razem pracować. Bez adresów, numerów telefonu i wyśmiewania.", es: "Escribimos para trabajar juntos. Sin direcciones, sin teléfonos, sin burlas.", rn: null },
    motsAppris: { fr: "Nouveaux mots dans ton dico", uk: "Нові слова у твоєму словнику", pl: "Nowe słowa w twoim słowniku", es: "Palabras nuevas en tu diccionario", rn: null },
    motDuJour: { fr: "Le mot du jour", uk: "Слово дня", pl: "Słowo dnia", es: "La palabra del día", rn: null },
    ajouterDico: { fr: "Ajouter à mon dico", uk: "Додати до мого словника", pl: "Dodaj do mojego słownika", es: "Añadir a mi diccionario", rn: null },
    dansDico: { fr: "Dans mon dico", uk: "У моєму словнику", pl: "W moim słowniku", es: "En mi diccionario", rn: null },
    monDico: { fr: "Mon dico", uk: "Мій словник", pl: "Mój słownik", es: "Mi diccionario", rn: null },
    dicoVide: { fr: "Ton dico est vide. Touche « Ajouter » sur un mot.", uk: "Твій словник порожній. Торкнись «Додати» біля слова.", pl: "Twój słownik jest pusty. Dotknij „Dodaj” przy słowie.", es: "Tu diccionario está vacío. Toca «Añadir» en una palabra.", rn: null },
    bientot: { fr: "Bientôt", uk: "Скоро", pl: "Wkrótce", es: "Pronto", rn: null },
    tapeCode: { fr: "TAPE ton code secret.", uk: "ВВЕДИ свій секретний код.", pl: "WPISZ swój tajny kod.", es: "ESCRIBE tu código secreto.", rn: null },
    mauvaisCode: { fr: "Ce n'est pas le bon code. Essaie encore.", uk: "Це не той код. Спробуй ще раз.", pl: "To nie jest dobry kod. Spróbuj jeszcze raz.", es: "No es el código correcto. Inténtalo otra vez.", rn: null },
    passer: { fr: "Passer", uk: "Пропустити", pl: "Pomiń", es: "Saltar", rn: null },
    reessaie: { fr: "Essaie encore", uk: "Спробуй ще", pl: "Spróbuj jeszcze", es: "Inténtalo otra vez", rn: null },
    etape: { fr: "Étape", uk: "Крок", pl: "Krok", es: "Paso", rn: null }
  },

  humeurs: [
    { id: "content", icone: "smile", t: { fr: "Je suis content|Je suis contente", uk: "Я задоволений|Я задоволена", pl: "Jestem zadowolony|Jestem zadowolona", es: "Estoy contento|Estoy contenta", rn: null } },
    { id: "calme", icone: "meh", t: { fr: "Je suis calme", uk: "Я спокійний|Я спокійна", pl: "Jestem spokojny|Jestem spokojna", es: "Estoy tranquilo|Estoy tranquila", rn: null } },
    { id: "fatigue", icone: "batterie", t: { fr: "Je suis fatigué|Je suis fatiguée", uk: "Я втомлений|Я втомлена", pl: "Jestem zmęczony|Jestem zmęczona", es: "Estoy cansado|Estoy cansada", rn: null } },
    { id: "triste", icone: "frown", t: { fr: "Je suis triste", uk: "Мені сумно", pl: "Jestem smutny|Jestem smutna", es: "Estoy triste", rn: null } },
    { id: "colere", icone: "angry", t: { fr: "Je suis en colère", uk: "Я злюся", pl: "Jestem zły|Jestem zła", es: "Estoy enfadado|Estoy enfadada", rn: null } }
  ],

  hier: [
    { id: "foot", icone: "ballon", t: { fr: "j'ai joué au football.", uk: "я грав у футбол.|я грала у футбол.", pl: "grałem w piłkę nożną.|grałam w piłkę nożną.", es: "jugué al fútbol.", rn: null } },
    { id: "famille", icone: "users", t: { fr: "j'ai vu ma famille.", uk: "я був з родиною.|я була з родиною.", pl: "byłem z rodziną.|byłam z rodziną.", es: "estuve con mi familia.", rn: null } },
    { id: "musique", icone: "musique", t: { fr: "j'ai écouté de la musique.", uk: "я слухав музику.|я слухала музику.", pl: "słuchałem muzyki.|słuchałam muzyki.", es: "escuché música.", rn: null } },
    { id: "jeux", icone: "manette", t: { fr: "j'ai joué aux jeux vidéo.", uk: "я грав у відеоігри.|я грала у відеоігри.", pl: "grałem w gry wideo.|grałam w gry wideo.", es: "jugué a videojuegos.", rn: null } },
    { id: "courses", icone: "caddie", t: { fr: "j'ai fait les courses.", uk: "я ходив по покупки.|я ходила по покупки.", pl: "robiłem zakupy.|robiłam zakupy.", es: "hice la compra.", rn: null } },
    { id: "dormir", icone: "lit", t: { fr: "j'ai beaucoup dormi.", uk: "я багато спав.|я багато спала.", pl: "dużo spałem.|dużo spałam.", es: "dormí mucho.", rn: null } }
  ],

  disciplines: [
    { id: "histoire", t: { fr: "Histoire", uk: "Історія", pl: "Historia", es: "Historia", rn: null },
      but: { fr: "Se situer dans le temps", uk: "Орієнтуватися в часі", pl: "Orientować się w czasie", es: "Situarse en el tiempo", rn: null } },
    { id: "geo", t: { fr: "Géographie", uk: "Географія", pl: "Geografia", es: "Geografía", rn: null },
      but: { fr: "Se repérer dans l'espace", uk: "Орієнтуватися в просторі", pl: "Orientować się w przestrzeni", es: "Ubicarse en el espacio", rn: null } },
    { id: "social", t: { fr: "Sciences sociales", uk: "Суспільні науки", pl: "Nauki społeczne", es: "Ciencias sociales", rn: null },
      but: { fr: "Vivre ensemble en Belgique", uk: "Жити разом у Бельгії", pl: "Żyć razem w Belgii", es: "Convivir en Bélgica", rn: null } },
    { id: "eco", t: { fr: "Sciences économiques", uk: "Економіка", pl: "Ekonomia", es: "Economía", rn: null },
      but: { fr: "L'argent et la vie de tous les jours", uk: "Гроші та щоденне життя", pl: "Pieniądze i życie codzienne", es: "El dinero y la vida diaria", rn: null } }
  ],

  activites: [
    {
      id: "euro",
      discipline: "eco",
      picto: 5092,
      titre: { fr: "L'argent en Belgique", uk: "Гроші в Бельгії", pl: "Pieniądze w Belgii", es: "El dinero en Bélgica", rn: null },
      objectif: { fr: "Je sais reconnaître et compter les euros.", uk: "Я вмію розпізнавати й рахувати євро.", pl: "Umiem rozpoznawać i liczyć euro.", es: "Sé reconocer y contar euros.", rn: null },
      motsAppris: ["euro", "piece", "billet", "payer"],
      etapes: [
        {
          type: "choix",
          picto: 5092,
          verbe: "CHOISIS",
          consigne: { fr: "CHOISIS la monnaie utilisée en Belgique.", uk: "ВИБЕРИ валюту, яку використовують у Бельгії.", pl: "WYBIERZ walutę używaną w Belgii.", es: "ELIGE la moneda que se usa en Bélgica.", rn: null },
          options: [
            { id: "euro", label: "l'euro", symbole: "€", correct: true },
            { id: "dollar", label: "le dollar", symbole: "$" },
            { id: "zloty", label: "le zloty", symbole: "zł" },
            { id: "hryvnia", label: "la hryvnia", symbole: "₴" },
            { id: "fbu", label: "le franc burundais", symbole: "FBu" }
          ],
          bravo: { fr: "Oui ! En Belgique, on paie en euros (€).", uk: "Так! У Бельгії платять у євро (€).", pl: "Tak! W Belgii płaci się w euro (€).", es: "¡Sí! En Bélgica se paga en euros (€).", rn: null },
          erreur: { fr: "Pas encore. Regarde le symbole sur les prix dans les magasins.", uk: "Ще ні. Подивись на символ на цінах у магазинах.", pl: "Jeszcze nie. Spójrz na symbol przy cenach w sklepach.", es: "Todavía no. Mira el símbolo de los precios en las tiendas.", rn: null },
          aides: [
            { fr: "Pense aux prix dans les magasins de Huy.", uk: "Згадай ціни в магазинах Юї.", pl: "Pomyśl o cenach w sklepach w Huy.", es: "Piensa en los precios de las tiendas de Huy.", rn: null },
            { fr: "C'est la monnaie de beaucoup de pays d'Europe.", uk: "Це валюта багатьох країн Європи.", pl: "To waluta wielu krajów Europy.", es: "Es la moneda de muchos países de Europa.", rn: null },
            { fr: "Son symbole est €.", uk: "Її символ — €.", pl: "Jej symbol to €.", es: "Su símbolo es €.", rn: null }
          ]
        },
        {
          type: "partage",
          picto: 4630,
          verbe: "CHOISIS",
          consigne: { fr: "Et chez toi ? CHOISIS la monnaie de ton pays.", uk: "А у тебе вдома? ВИБЕРИ валюту своєї країни.", pl: "A u ciebie? WYBIERZ walutę swojego kraju.", es: "¿Y en tu país? ELIGE la moneda de tu país.", rn: null },
          options: [
            { id: "hryvnia", label: "la hryvnia", symbole: "₴", pays: "Ukraine" },
            { id: "zloty", label: "le zloty", symbole: "zł", pays: "Pologne" },
            { id: "euro", label: "l'euro", symbole: "€", pays: "Espagne, Belgique…" },
            { id: "fbu", label: "le franc burundais", symbole: "FBu", pays: "Burundi" },
            { id: "autre", label: "une autre monnaie", symbole: "?" }
          ],
          merci: { fr: "Merci ! Chaque pays a sa monnaie. Tu pourras montrer la tienne à la classe.", uk: "Дякую! Кожна країна має свою валюту. Ти зможеш показати свою класу.", pl: "Dziękuję! Każdy kraj ma swoją walutę. Możesz pokazać swoją klasie.", es: "¡Gracias! Cada país tiene su moneda. Podrás mostrar la tuya a la clase.", rn: null },
          facultatif: true
        },
        {
          type: "classer",
          picto: 4776,
          verbe: "CLASSE",
          consigne: { fr: "CLASSE l'argent : TOUCHE un élément, puis « pièce » ou « billet ».", uk: "РОЗДІЛИ гроші: ТОРКНИСЬ одного, потім «монета» чи «банкнота».", pl: "PODZIEL pieniądze: DOTKNIJ jednego, potem „moneta” albo „banknot”.", es: "CLASIFICA el dinero: TOCA uno y luego «moneda» o «billete».", rn: null },
          bacs: [
            { id: "piece", label: { fr: "une pièce", uk: "монета", pl: "moneta", es: "una moneda", rn: null } },
            { id: "billet", label: { fr: "un billet", uk: "банкнота", pl: "banknot", es: "un billete", rn: null } }
          ],
          elements: [
            { id: "e2", valeur: "2 €", bac: "piece" },
            { id: "b10", valeur: "10 €", bac: "billet" },
            { id: "c50", valeur: "50 c", bac: "piece" },
            { id: "b5", valeur: "5 €", bac: "billet" },
            { id: "e1", valeur: "1 €", bac: "piece" },
            { id: "b20", valeur: "20 €", bac: "billet" }
          ],
          bravo: { fr: "Bravo ! Les pièces sont rondes et en métal. Les billets sont en papier.", uk: "Молодець! Монети круглі й металеві. Банкноти паперові.", pl: "Brawo! Monety są okrągłe i z metalu. Banknoty są z papieru.", es: "¡Bien! Las monedas son redondas y de metal. Los billetes son de papel.", rn: null },
          erreur: { fr: "Regarde bien la forme : rond ou rectangle ?", uk: "Подивись на форму: кругла чи прямокутна?", pl: "Spójrz na kształt: okrągły czy prostokątny?", es: "Mira bien la forma: ¿redonda o rectangular?", rn: null },
          aides: [
            { fr: "Une pièce est ronde.", uk: "Монета кругла.", pl: "Moneta jest okrągła.", es: "Una moneda es redonda.", rn: null },
            { fr: "Un billet est un rectangle en papier.", uk: "Банкнота — це паперовий прямокутник.", pl: "Banknot to papierowy prostokąt.", es: "Un billete es un rectángulo de papel.", rn: null },
            { fr: "En euros, les billets commencent à 5 €.", uk: "У євро банкноти починаються з 5 €.", pl: "W euro banknoty zaczynają się od 5 €.", es: "En euros, los billetes empiezan en 5 €.", rn: null }
          ]
        },
        {
          type: "nombre",
          picto: 2689,
          verbe: "CALCULE",
          consigne: { fr: "CALCULE : tu as 1 billet de 5 € et 2 pièces de 2 €. Combien d'argent as-tu ?", uk: "ПОРАХУЙ: у тебе 1 банкнота 5 € і 2 монети по 2 €. Скільки в тебе грошей?", pl: "POLICZ: masz 1 banknot 5 € i 2 monety po 2 €. Ile masz pieniędzy?", es: "CALCULA: tienes 1 billete de 5 € y 2 monedas de 2 €. ¿Cuánto dinero tienes?", rn: null },
          visuel: ["5 €", "2 €", "2 €"],
          reponse: 9,
          unite: "€",
          bravo: { fr: "Oui ! 5 € + 2 € + 2 € = 9 €.", uk: "Так! 5 € + 2 € + 2 € = 9 €.", pl: "Tak! 5 € + 2 € + 2 € = 9 €.", es: "¡Sí! 5 € + 2 € + 2 € = 9 €.", rn: null },
          erreur: { fr: "Pas encore. Compte chaque pièce et le billet.", uk: "Ще ні. Порахуй кожну монету й банкноту.", pl: "Jeszcze nie. Policz każdą monetę i banknot.", es: "Todavía no. Cuenta cada moneda y el billete.", rn: null },
          aides: [
            { fr: "Commence par le billet : 5 €.", uk: "Почни з банкноти: 5 €.", pl: "Zacznij od banknotu: 5 €.", es: "Empieza por el billete: 5 €.", rn: null },
            { fr: "Les pièces : 2 € + 2 € = 4 €.", uk: "Монети: 2 € + 2 € = 4 €.", pl: "Monety: 2 € + 2 € = 4 €.", es: "Las monedas: 2 € + 2 € = 4 €.", rn: null },
            { fr: "5 € + 4 € = … €", uk: "5 € + 4 € = … €", pl: "5 € + 4 € = … €", es: "5 € + 4 € = … €", rn: null }
          ]
        },
        {
          type: "ecrire",
          picto: 8985,
          verbe: "ÉCRIS",
          consigne: { fr: "ÉCRIS une phrase : qu'est-ce que tu achètes avec 9 € ?", uk: "НАПИШИ речення: що ти купиш за 9 €?", pl: "NAPISZ zdanie: co kupisz za 9 €?", es: "ESCRIBE una frase: ¿qué compras con 9 €?", rn: null },
          amorces: ["Avec 9 €, j'achète", "Je paie avec", "Ça coûte"],
          astuce: { fr: "Tu peux aussi toucher le micro du clavier et parler.", uk: "Можеш також натиснути мікрофон на клавіатурі й говорити.", pl: "Możesz też dotknąć mikrofonu na klawiaturze i mówić.", es: "También puedes tocar el micrófono del teclado y hablar.", rn: null },
          aides: [
            { fr: "Pense à un magasin de Huy.", uk: "Подумай про магазин у Юї.", pl: "Pomyśl o sklepie w Huy.", es: "Piensa en una tienda de Huy.", rn: null },
            { fr: "Choisis une amorce, puis ajoute un objet.", uk: "Вибери початок речення й додай предмет.", pl: "Wybierz początek zdania i dodaj przedmiot.", es: "Elige un comienzo y añade un objeto.", rn: null },
            { fr: "Exemple : Avec 9 €, j'achète un livre.", uk: "Приклад: Avec 9 €, j'achète un livre.", pl: "Przykład: Avec 9 €, j'achète un livre.", es: "Ejemplo: Avec 9 €, j'achète un livre.", rn: null }
          ]
        },
        {
          type: "auto",
          picto: 3245,
          verbe: "CHOISIS",
          consigne: { fr: "CHOISIS : est-ce que tu sais reconnaître et compter les euros ?", uk: "ВИБЕРИ: чи вмієш ти розпізнавати й рахувати євро?", pl: "WYBIERZ: czy umiesz rozpoznawać i liczyć euro?", es: "ELIGE: ¿sabes reconocer y contar euros?", rn: null }
        }
      ]
    }
  ],

  motsCategories: [
    { id: "argent", t: { fr: "L'argent", uk: "Гроші", pl: "Pieniądze", es: "El dinero", rn: null }, espace: "eco" },
    { id: "phrases", t: { fr: "Phrases utiles en classe", uk: "Корисні фрази в класі", pl: "Przydatne zdania w klasie", es: "Frases útiles en clase", rn: null }, espace: "social" }
  ],

  mots: [
    { id: "argent", cat: "argent", picto: 4630, t: { fr: "l'argent", uk: "гроші", pl: "pieniądze", es: "el dinero", rn: null } },
    { id: "euro", cat: "argent", picto: 5092, t: { fr: "l'euro", uk: "євро", pl: "euro", es: "el euro", rn: null } },
    { id: "piece", cat: "argent", picto: 4776, t: { fr: "une pièce", uk: "монета", pl: "moneta", es: "una moneda", rn: null } },
    { id: "billet", cat: "argent", picto: null, dessin: "billet", t: { fr: "un billet", uk: "банкнота", pl: "banknot", es: "un billete", rn: null } },
    { id: "payer", cat: "argent", picto: 9014, t: { fr: "payer", uk: "платити", pl: "płacić", es: "pagar", rn: null } },
    { id: "acheter", cat: "argent", picto: 8985, t: { fr: "acheter", uk: "купувати", pl: "kupować", es: "comprar", rn: null } },
    { id: "prix", cat: "argent", picto: 9874, t: { fr: "le prix", uk: "ціна", pl: "cena", es: "el precio", rn: null } },
    { id: "magasin", cat: "argent", picto: 9116, t: { fr: "le magasin", uk: "магазин", pl: "sklep", es: "la tienda", rn: null } },
    { id: "portefeuille", cat: "argent", picto: 2689, t: { fr: "le portefeuille", uk: "гаманець", pl: "portfel", es: "la cartera", rn: null } },
    { id: "monnaie", cat: "argent", picto: 28833, t: { fr: "rendre la monnaie", uk: "дати решту", pl: "wydać resztę", es: "dar el cambio", rn: null } },
    { id: "bonjour", cat: "phrases", picto: 6009, t: { fr: "Bonjour !", uk: "Добрий день!", pl: "Dzień dobry!", es: "¡Buenos días!", rn: null } },
    { id: "merci", cat: "phrases", picto: 8128, t: { fr: "Merci !", uk: "Дякую!", pl: "Dziękuję!", es: "¡Gracias!", rn: null } },
    { id: "comprends", cat: "phrases", picto: 27363, t: { fr: "Je ne comprends pas.", uk: "Я не розумію.", pl: "Nie rozumiem.", es: "No entiendo.", rn: null } },
    { id: "aide", cat: "phrases", picto: 32648, t: { fr: "Tu peux m'aider ?", uk: "Можеш мені допомогти?", pl: "Możesz mi pomóc?", es: "¿Me puedes ayudar?", rn: null } },
    { id: "toilettes", cat: "phrases", picto: 2430, t: { fr: "Je peux aller aux toilettes ?", uk: "Можна вийти в туалет?", pl: "Czy mogę wyjść do toalety?", es: "¿Puedo ir al baño?", rn: null } }
  ],

  amorcesChat: ["Je pense que", "Tu es d'accord ?", "Je ne comprends pas", "On cherche", "Moi, je m'occupe de", "Regarde le document"],

  atelierOutils: [
    { id: "carte", t: { fr: "Ma carte", uk: "Моя карта", pl: "Moja mapa", es: "Mi mapa", rn: null } },
    { id: "frise", t: { fr: "Ma frise", uk: "Моя стрічка часу", pl: "Moja oś czasu", es: "Mi línea del tiempo", rn: null } },
    { id: "dessin", t: { fr: "Mon dessin", uk: "Мій малюнок", pl: "Mój rysunek", es: "Mi dibujo", rn: null } },
    { id: "trace", t: { fr: "Ma trace", uk: "Мій слід", pl: "Mój ślad", es: "Mi huella", rn: null } },
    { id: "bd", t: { fr: "Ma BD", uk: "Мій комікс", pl: "Mój komiks", es: "Mi cómic", rn: null } }
  ]
};
