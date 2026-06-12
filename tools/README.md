# Sync Spotify → player du site

Récupère automatiquement **tous** les titres de l'artiste DJBILBOX BEATS
(`2wP5nwScAUiXF6Esc4x0hG`) via l'API Web Spotify et met à jour le tableau
`TRACKS` dans `../index.html` (entre les marqueurs `// <<<TRACKS_AUTO_START>>>`
et `// <<<TRACKS_AUTO_END>>>`).

## 1. Identifiants Spotify (gratuit, une seule fois)

1. https://developer.spotify.com/dashboard → **Create App**
2. Nom/description quelconques, Redirect URI : `http://localhost` (non utilisé)
3. Copier **Client ID** et **Client Secret**

Aucun login utilisateur : on utilise le flow *Client Credentials* (catalogue public).

## 2. Lancer

PowerShell, depuis le dossier `site/` :

```powershell
$env:SPOTIFY_CLIENT_ID="ton_client_id"
$env:SPOTIFY_CLIENT_SECRET="ton_client_secret"

# Rapport seul — n'écrit RIEN, liste les nouveaux titres :
node tools/spotify-sync.mjs

# Appliquer — régénère TRACKS dans index.html :
node tools/spotify-sync.mjs --write

# + fusionner les doublons single/album par nom :
node tools/spotify-sync.mjs --write --dedupe-name
```

## 3. Curation

- Les **tags** que tu as mis à la main sont **préservés** (par `trackId`).
- Pour bloquer des titres/albums purgés (ex. voix IA) et empêcher leur retour :
  ajoute leurs ids dans `ALBUM_EXCLUDE` / `TRACK_EXCLUDE` en haut de
  `spotify-sync.mjs`.
- Lance toujours le **rapport** d'abord pour voir ce qui va changer.

## Ne jamais committer tes identifiants

Ils restent dans les variables d'environnement de ta session. Rien n'est écrit
sur disque.
