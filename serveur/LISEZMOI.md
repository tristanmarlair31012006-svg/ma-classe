# Mettre en ligne la discussion de la classe

Le serveur fait deux choses :
1. il fait passer les messages d'un iPad à l'autre ;
2. il demande la traduction de chaque message à Microsoft Translator.

Il n'enregistre aucun message sur disque. Les messages restent en mémoire pendant le cours, puis ils disparaissent quand tu cliques sur « Tout effacer » ou quand le serveur se met en veille. Le serveur tourne dans un centre de données de l'Union européenne.

Temps total : environ 30 minutes, à faire une seule fois.

---

## Étape 1 – La clé de traduction (Microsoft Azure)

1. Va sur **azure.microsoft.com/free/students** et inscris-toi avec ton adresse e-mail ULiège. Aucune carte bancaire n'est demandée.
2. Dans le portail Azure, cherche **« Translator »** puis clique sur **Créer**.
3. Remplis :
   - Région : **West Europe**
   - Nom : `daspa-traduction`
   - Niveau tarifaire : **F0 (gratuit)**, soit 2 millions de caractères par mois. Pour une classe de 15 élèves, c'est largement assez.
4. Une fois la ressource créée, ouvre **Clés et point de terminaison**. Note la **Clé 1** et la **région** (`westeurope`).

## Étape 2 – Le serveur (Cloudflare)

1. Crée un compte gratuit sur **dash.cloudflare.com**.
2. Sur ton ordinateur, ouvre le Terminal dans le dossier `serveur`, puis tape :

```bash
npm install
npx wrangler login
```

3. Crée les 4 secrets. Chaque commande te demande la valeur :

```bash
npx wrangler secret put AZURE_CLE      # la Clé 1 d'Azure
npx wrangler secret put AZURE_REGION   # westeurope
npx wrangler secret put CODE_CLASSE    # un code de 6 chiffres pour les élèves
npx wrangler secret put CLE_PROF       # une clé longue, pour toi seul
```

4. Dans `wrangler.toml`, remplace `https://TON-PSEUDO.github.io` par l'adresse de l'app sur GitHub Pages.
5. Mets en ligne :

```bash
npx wrangler deploy
```

Le terminal affiche une adresse du type `https://daspa-discussion.ton-compte.workers.dev`. C'est l'**adresse du serveur**.

## Étape 3 – Brancher les iPad

Sur chaque iPad : touche **Prof** (en bas à gauche), puis remplis **Adresse du serveur** et **Code de la classe**.
Sur **ta** tablette uniquement, ajoute aussi la **Clé prof**. Elle te permet de mettre la discussion en pause, de supprimer un message ou de tout effacer.

---

## Avant d'ouvrir la discussion aux élèves

- [ ] Accord de la direction et de Mme Henrot.
- [ ] Information aux parents (et autorisation si l'école le demande). Les messages passent par Microsoft Translator et Cloudflare.
- [ ] Règles de la discussion expliquées en classe. Elles s'affichent aussi au-dessus de la discussion.
- [ ] Test avec un élève kirundophone : la traduction automatique du kirundi est la plus fragile.

## Tester en local (facultatif)

Crée un fichier `.dev.vars` avec :

```
CODE_CLASSE=123456
CLE_PROF=test
TRADUCTION_FACTICE=1
TEST_LOCAL=1
```

puis lance `npx wrangler dev`. Ce fichier ne doit jamais être publié : il est déjà dans `.gitignore`.
