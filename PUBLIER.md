# Mettre l'app en ligne

Adresse de l'app : **https://ma-classe-arh-daspa.pages.dev**

L'app est hébergée gratuitement par **Cloudflare Pages**. Elle se met à jour toute seule à chaque changement sur GitHub. Le même compte Cloudflare sert pour le serveur de la classe (discussion et suivi, voir `serveur/LISEZMOI.md`).

L'ancienne adresse GitHub Pages (`tristanmarlair31012006-svg.github.io/ma-classe`) marche encore. Quand la nouvelle est en ligne, tu peux la couper : dépôt → Settings → Pages → **Unpublish site**.

## 1. Le compte Cloudflare (une seule fois, environ 10 minutes)

1. Crée un compte gratuit sur **dash.cloudflare.com** (adresse e-mail + mot de passe). Aucune carte bancaire n'est demandée.
2. **L'identifiant du compte** : sur la page d'accueil du tableau de bord, menu **⋯** à côté du nom du compte → **Copier l'ID du compte**. Garde-le.
3. **La clé d'accès (token)** : en haut à droite, icône de profil → **Profil** → **Jetons API** → **Créer un jeton** → modèle **« Edit Cloudflare Workers »** (« Modifier les Workers Cloudflare » si l’interface est en français ; il couvre aussi Pages) → **Continuer** → **Créer le jeton**. Copie-le tout de suite : il ne s'affiche qu'une fois.

## 2. Les secrets dans GitHub

Dépôt `ma-classe` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Crée :

| Nom | Valeur |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | le jeton de l'étape 1.3 |
| `CLOUDFLARE_ACCOUNT_ID` | l'identifiant de l'étape 1.2 |
| `CODE_CLASSE` | un code de 6 chiffres que tu donneras aux tablettes |
| `CLE_PROF` | une clé longue, pour ta tablette seulement |

(`AZURE_CLE` et `AZURE_REGION` viendront plus tard, pour la traduction de la discussion.)

## 3. Lancer la mise en ligne

Dépôt → **Actions** → **Site de la classe** → **Run workflow**. Puis **Serveur de la classe** → **Run workflow**.
Après 1 à 2 minutes, l'app est sur **https://ma-classe-arh-daspa.pages.dev** et l'adresse du serveur s'affiche dans le journal du second (`https://daspa-discussion.….workers.dev`).

Si le nom `ma-classe-arh-daspa` était déjà pris chez Cloudflare, l'adresse reçoit un petit ajout : elle s'affiche à la fin du journal « Publier ». Dans ce cas, préviens Claude pour mettre la bonne adresse dans `serveur/wrangler.toml` (ligne `ORIGINES`).

## 4. Installer l'app sur chaque iPad

1. Ouvre l'adresse dans **Safari** (pas Chrome).
2. Bouton **Partager**, puis **Sur l'écran d'accueil**, puis **Ajouter**.
3. Ouvre l'app depuis l'icône « Ma classe », puis **Prof** (code **2468**, à changer tout de suite) et crée le profil de l'élève.
4. Toujours en mode prof : **Adresse du serveur** et **Code de la classe**. Sur ta tablette seulement : la **Clé prof**.
5. Ouvre une fois chaque partie (Leçons, Atelier, Mes mots) avec le wifi. Ensuite l'app marche aussi sans connexion (sauf discussion et suivi).

## Modifier l'app plus tard

1. Les changements poussés sur GitHub sont publiés tout seuls.
2. **Important** : dans `sw.js`, la ligne `const VERSION = "v…";` doit changer à chaque mise à jour.
3. Sur les iPad : ouvre l'app avec le wifi, ferme-la, puis rouvre-la. Les profils, créations et progrès sont gardés.

## Une sauvegarde de temps en temps

Mode prof, puis **Sauvegarder cette tablette**, puis partage le fichier vers ton OneDrive ou Teams.
Si un iPad est réinitialisé : réinstalle l'app, mode prof, puis **Restaurer une sauvegarde**.
