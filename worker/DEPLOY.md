# Déploiement du Cloudflare Worker (Spotify Proxy)

## Prérequis
1. Un compte Cloudflare gratuit (dashboard.cloudflare.com)
2. Un compte Spotify Developer (developer.spotify.com)

## Étape 1 : Créer l'app Spotify Developer
1. Va sur https://developer.spotify.com/dashboard
2. Clique "Create App"
   - Name: `DJBILBOX Site`
   - Redirect URI: `http://localhost` (pas utilisé mais requis)
   - APIs: Web API
3. Note ton **Client ID** et **Client Secret**

## Étape 2 : Déployer le Worker
1. Va sur https://dashboard.cloudflare.com
2. Menu gauche → **Workers & Pages**
3. Clique **Create** → **Create Worker**
4. Donne un nom : `djbilbox-spotify`
5. Clique "Deploy" puis "Edit Code"
6. Supprime le code par défaut, colle le contenu de `spotify-proxy.js`
7. Clique "Deploy"

## Étape 3 : Configurer les secrets
1. Retour au dashboard du worker
2. **Settings** → **Variables and Secrets**
3. Ajoute deux variables (type "Secret") :
   - `SPOTIFY_CLIENT_ID` = ton Client ID
   - `SPOTIFY_CLIENT_SECRET` = ton Client Secret
4. Clique "Save"

## Étape 4 : Configurer ton site
1. Note l'URL de ton worker : `https://djbilbox-spotify.TON-SOUS-DOMAINE.workers.dev`
2. Dans le fichier `config.js` de ton site, remplace :
   ```js
   WORKER_URL: 'https://djbilbox-spotify.TONCOMPTE.workers.dev'
   ```
   par ton URL réelle.

## Étape 5 : Tester
- Ouvre `https://ton-worker.workers.dev/artist` → tu dois voir tes infos artiste
- Ouvre `https://ton-worker.workers.dev/tracks?limit=5` → tu dois voir tes tracks

## Limites (plan gratuit)
- 100 000 requêtes/jour
- Token Spotify caché en mémoire du worker (auto-refresh)
- Aucune donnée utilisateur n'est stockée côté serveur

## En cas de problème
- Erreur 401 : vérifie Client ID/Secret dans les variables
- CORS : le worker renvoie déjà les headers, pas besoin de config supplémentaire
- Pas de tracks : vérifie que ton profil artiste Spotify a bien des releases publiques
