# DESIGN.md – App DASPA (iPad)

Dérivé du système « FHGES – T. Marlair » (feuilles A4), adapté à l'écran d'iPad et à des élèves primo-arrivants de 13 à 18 ans.
Règle d'or reprise : **une couleur = un repère, jamais une décoration.**

## 1. Principes

1. **Une seule chose à faire par écran.** Une consigne, une action, un bouton principal.
2. **Rien que du texte, jamais.** Chaque consigne a un picto ARASAAC, un bouton 🔊 et une traduction à afficher.
3. **Le français reste visible.** La traduction s'affiche sous le français, en plus petit. Elle ne le remplace jamais.
4. **Même endroit, même fonction.** Navigation en bas, aide en haut à droite, bouton « Suivant » en bas à droite. Ces éléments ne bougent pas d'un écran à l'autre.
5. **Ton adolescent, pas enfantin.** Ils ont 13-18 ans : pas de mascotte, pas de confettis ni d'animaux. Le picto sert à comprendre, pas à décorer.

## 2. Couleur

Fond clair et chaud, comme du papier, et pas de mode sombre (la classe est éclairée).

| Token | Valeur | Rôle |
|---|---|---|
| `fond` | `#fbf7ef` | Fond de l'app |
| `papier` | `#ffffff` | Cartes, zone de travail |
| `creme` | `#fff6e5` | Encadrés d'aide, consigne en cours |
| `ink` | `#2b2b2b` | Texte (13,3:1 sur `fond`) |
| `ink-muted` | `#62666b` | Traduction, aides grises (5,4:1) |
| `bordure` | `#d9d4cc` | Contours 2 px |
| `ombre` | `#2b2b2b` | Ombre décalée (voir § 5) |

**Une couleur par espace de l'app.** Le texte blanc sur ces couleurs passe partout à 4,5:1 ou plus.

**Les 4 disciplines** (mêmes couleurs que les leçons papier) :

| Discipline | Token | Valeur | Fond clair | Ce qu'elle apporte aux élèves |
|---|---|---|---|---|
| Histoire | `histoire` | `#8a4b14` | `#f6e7cf` | Se situer dans le temps, relier son histoire à celle de la Belgique |
| Géographie | `geo` | `#2b6e45` | `#e3f1ea` | Se repérer : Huy, la Belgique, l'Europe, son pays d'origine |
| Sciences sociales | `social` | `#6a4c96` | `#efe8f7` | Vivre ensemble en Belgique : école, commune, droits et devoirs, services, codes sociaux |
| Sciences économiques | `eco` | `#b93a26` | `#fde3dc` | Vie courante : budget, euro, achats, banque, travail, factures |

**Les autres espaces :**

| Espace | Token | Valeur | Fond clair |
|---|---|---|---|
| Atelier (créations) | `atelier` | `#a85d00` (texte blanc en gras uniquement) | `#fde9cc` |
| Mes mots (mot du jour, imagier, phrases utiles, mon dico) | `mots` | `#1d5f91` | `#dceaf7` |
| Accueil (humeur du jour, progrès) | neutre | `ink` sur `fond` | `creme` |

**États** (toujours accompagnés d'une icône et d'un mot, jamais la couleur seule) :
- `ok` `#2e7d32` : réussi
- `erreur` `#c62828` : à revoir
- `attention` `#8a5a00` : presque

## 3. Typographie

- **Comic Neue** (400, 700) pour tout le français : c'est la police des leçons, les élèves la retrouvent sur papier et sur écran.
- **Andika** (400, 700) pour **toutes les traductions**. Comic Neue ne contient ni le cyrillique (ukrainien) ni les lettres polonaises (ą, ł, ś…). Andika a été dessinée par SIL pour les lecteurs débutants et couvre le latin étendu et le cyrillique.
- Repli : `"Comic Sans MS", "Chalkboard SE"` puis `system-ui`.

| Style | Taille / interligne | Poids | Usage |
|---|---|---|---|
| `titre-ecran` | 32 / 40 | 700 | Titre d'un écran |
| `titre-carte` | 24 / 32 | 700 | Titre de carte, de bandeau |
| `consigne` | 22 / 32 | 400, verbe en 700 MAJUSCULES | Consignes |
| `texte` | 20 / 30 | 400 | Texte courant, minimum pour un texte à lire |
| `traduction` | 18 / 27 | 400 (Andika) | Ligne traduite, `ink-muted` |
| `bouton` | 20 / 24 | 700 | Boutons |
| `petit` | 16 / 22 | 400 | Étiquettes, légendes |

Texte jamais sous 16 px. Lignes de 60 caractères maximum, alignées à gauche. Pas d'italique (difficile pour les débutants), sauf « texte adapté ».

## 4. Espacement et mise en page

- Échelle de 8 : `4, 8, 16, 24, 32, 48, 64`.
- Écran pensé pour **iPad à l'horizontale** (1024 à 1180 × 768 à 820), mais aussi utilisable à la verticale.
- Marge d'écran 32 px. Écart entre blocs 24 à 32 px.
- **Cible tactile minimum : 56 × 56 px**, avec 12 px d'écart entre deux boutons.
- Activité : consigne en haut (bandeau), zone de travail au centre, barre d'actions en bas (Coup de pouce · 🔊 · Suivant).

## 5. Forme et profondeur

La signature visuelle reprend celle des leçons : **une ombre décalée nette** (pas de flou), comme du papier découpé posé sur la table.

- Rayons : `6` (étiquettes), `12` (cartes), `18` (bandeaux), `999` (pastilles, boutons ronds).
- Contour : 2 px `bordure`, ou 2 px `ink` sur les éléments importants.
- Ombre : `4px 4px 0 ink` sur les cartes et les boutons principaux. Quand on appuie, le bouton glisse de 4 px et l'ombre disparaît, ce qui donne un vrai retour tactile.
- Pas de dégradé, pas de flou, pas de transparence en verre dépoli.

## 6. Composants

- **Bouton principal** : fond couleur de l'espace, texte blanc 700, ombre décalée, 56 px de haut minimum. Désactivé : fond `bordure`, texte `ink-muted`, sans ombre.
- **Bouton secondaire** : fond `papier`, contour 2 px `ink`, ombre décalée.
- **Bouton discret** : texte souligné, sans fond (« Passer », « Retour »).
- **Focus** (clavier ou accessibilité) : anneau de 3 px `mots` décalé de 3 px.
- **Consigne** : pastille numérotée (32 px, couleur de l'espace) + picto ARASAAC 48 px + texte FR + 🔊 + ligne traduite repliable.
- **Bascule de langue** : pastille en haut à droite avec le code de la langue (FR · UK · PL · ES · RN). Un appui affiche ou masque toutes les traductions de l'écran.
- **Coup de pouce** : 3 niveaux, de plus en plus précis, ouverts l'un après l'autre.
- **Signaux** : 3 boutons ronds « Je suis bloqué » · « J'ai une question » · « J'ai fini », chacun avec son picto.
- **Feux d'autoévaluation** : 3 gros boutons avec picto et mot (vert « Je sais », orange « Presque », rouge « Pas encore »).
- **Amorces de phrase** : pastilles `creme` qu'on touche pour les insérer dans sa réponse.
- **Carte de mot** (dico, imagier) : picto, mot FR en gras, traduction, 🔊, bouton « Ajouter à mon dico ».
- **Barre de navigation** (en bas, fixe) : Accueil · Leçons · Atelier · Mes mots. Icône + mot, l'onglet actif est dans sa couleur. « Leçons » ouvre 4 grandes tuiles : Histoire, Géo, Sciences sociales, Sciences économiques.

## 7. Images et icônes

- **Pictos ARASAAC** (licence CC BY-NC-SA, crédit affiché dans « À propos ») pour tout le contenu : consignes, mots, humeurs.
- **Icônes d'interface** : un seul jeu au trait (Lucide), 24 px, épaisseur 2, couleur `ink` ou couleur de l'espace.
- **Pas d'emoji comme icône**, sauf 🔊 si aucune icône n'est disponible.
- **Photos et traces du passé** : vraies photos, avec un cadre `papier`, une ombre décalée et une étiquette « Document N°X ».

## 8. À éviter

Dégradés violet-bleu, verre dépoli, sections toutes centrées, trois cartes identiques côte à côte, texte en dégradé, mascotte, emoji décoratifs, police sous 16 px, couleur sans icône pour dire juste ou faux.

## 9. Leçons (séquences)

- **Choix libre** : l'onglet Leçons s'ouvre sur « Aujourd'hui, je travaille… » avec les 4 matières et « Un peu de tout » (une prochaine étape par matière).
- **Matière** : chapitres → séquences, avec l'encadré « Déjà vu en classe » (prérequis), puis le test de fin de chapitre (verrouillé tant que les séquences ne sont pas finies).
- **Séquence** : objectif, étapes (ressource · activité · mini-test · synthèse) à gauche, guide de maîtrise à droite (« Moi » = autoévaluation, « Test » = résultat du mini-test).
- **Niveaux** : vert « Je maîtrise » (≥ 80 %), orange « Presque » (≥ 50 %), rouge « Pas encore ». Toujours icône + mot.
- **Évaluation** : avancement (étapes faites) + critères maîtrisés, visibles dans le mode prof.
- Le contenu se met dans `js/parcours.js` (et un fichier par module, ex. `js/parcours-belgique.js`).
- **Documents** : `contenu.docs` (ressource) ou `doc` (question de test) = `{ n, src, legende, credit }`. Cadre papier + « Document N°X » + légende (nature, sujet, lieu, date, conservation, auteur) + licence en petit. Jamais « trace » ou « travail postérieur » dans la légende. Images dans `img/<module>/`, ajoutées à `sw.js`.

## 10. Tirage au sort des groupes (Atelier → En classe)

- Liste de la classe saisie par le prof (code prof), **gardée sur la tablette uniquement** (jamais dans le dépôt).
- Présents du jour à cocher, groupes de 2, 3 ou 4 ; les élèves en trop rejoignent un groupe existant.
- « On garde ces groupes » enregistre le tirage : les suivants évitent au maximum de remettre ensemble les mêmes élèves (les tirages récents comptent plus).

## 11. Suivi de la classe (mode prof → « Ouvrir le suivi de la classe », route `#suivi`)

- **Progression** : une carte par élève (n° de tablette, prénom, vu il y a…, avancement global, barres par matière, séquence en cours, tests). Carte en pointillés + alerte si aucune activité depuis plus de 2 jours. Tri : avancement, activité, prénom, n° de tablette.
- **Feedback** : 9 messages prêts et traduits (bravo · conseil · attention) ou texte libre en français. L'élève le voit en haut de son accueil et touche « J'ai lu » ; le prof voit « lu ».
- **Cahier de cotes** : travail en classe (3 couleurs), proposition /20 (moitié avancement, moitié critères), cote, remarque. Reste sur la tablette du prof ; « Copier le tableau » pour Excel.
- Envoyé au serveur par les tablettes élèves : prénom, n° de tablette, langue, avancement, tests. Rien d'autre.
