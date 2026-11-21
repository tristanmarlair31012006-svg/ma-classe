# Publier l'app sur GitHub Pages

Une seule fois, environ 15 minutes. Ensuite l'app a une adresse du type `https://ton-pseudo.github.io/ma-classe/`.

## 1. Créer le dépôt

1. Connecte-toi sur **github.com** et clique sur **New repository** (bouton vert).
2. Nom : `ma-classe`. Visibilité : **Public** (GitHub Pages gratuit l'exige). L'app ne contient aucune donnée d'élève : celles-ci restent sur les iPad.
3. Clique sur **Create repository**.

## 2. Envoyer les fichiers

1. Sur la page du dépôt, clique sur **uploading an existing file**.
2. Glisse **tout le contenu** du dossier `daspa-app` : `index.html`, `sw.js`, `manifest.webmanifest`, et les dossiers `css`, `js`, `fonts`, `icones`.
   - N'envoie **pas** le dossier `serveur` : il va sur Cloudflare (voir `serveur/LISEZMOI.md`).
   - Le dossier `outils` est facultatif.
3. Clique sur **Commit changes**.

## 3. Activer GitHub Pages

1. Va dans **Settings → Pages**.
2. Source : **Deploy from a branch**. Branche : **main**, dossier **/ (root)**. Clique sur **Save**.
3. Après 1 à 2 minutes, l'adresse s'affiche en haut de la page.

## 4. Installer l'app sur chaque iPad

1. Ouvre l'adresse dans **Safari** (pas Chrome).
2. Bouton **Partager**, puis **Sur l'écran d'accueil**, puis **Ajouter**.
3. Ouvre l'app depuis l'icône « Ma classe », puis **Prof** (code **2468**, à changer tout de suite) et crée le profil de l'élève.
4. Ouvre une fois chaque partie (Leçons, Atelier, Mes mots) avec le wifi. Après ça, l'app marche aussi sans connexion.

## Modifier l'app plus tard

1. Remplace les fichiers modifiés dans le dépôt (même méthode qu'à l'étape 2).
2. **Important** : dans `sw.js`, change la ligne `const VERSION = "v1";` en `"v2"`, puis `"v3"`, et ainsi de suite à chaque mise à jour.
3. Sur les iPad : ouvre l'app avec le wifi, ferme-la, puis rouvre-la. La nouvelle version est là. Les profils, créations et progrès sont gardés.

## Une sauvegarde de temps en temps

Mode prof, puis **Sauvegarder cette tablette**, puis partage le fichier vers ton OneDrive ou Teams.
Si un iPad est réinitialisé : réinstalle l'app, mode prof, puis **Restaurer une sauvegarde**.
