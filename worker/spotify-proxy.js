/**
 * Cloudflare Worker — Spotify API Proxy pour DJBILBOX BEATS
 *
 * DÉPLOIEMENT :
 * 1. Crée un compte Cloudflare (gratuit) → dashboard.cloudflare.com
 * 2. Va dans Workers & Pages → Create Application → Create Worker
 * 3. Colle ce code dans l'éditeur
 * 4. Dans Settings → Variables, ajoute :
 *    - SPOTIFY_CLIENT_ID     (ton client ID Spotify Developer)
 *    - SPOTIFY_CLIENT_SECRET (ton client secret Spotify Developer)
 * 5. Dans Settings → Triggers, note l'URL du worker (ex: djbilbox-spotify.ton-compte.workers.dev)
 * 6. Met cette URL dans WORKER_URL du fichier config.js de ton site
 *
 * OBTENIR LES CREDENTIALS SPOTIFY :
 * 1. Va sur developer.spotify.com/dashboard
 * 2. Crée une app (nom: "DJBILBOX Site", redirect: http://localhost)
 * 3. Copie Client ID et Client Secret
 */

const ARTIST_ID = '2wP5nwScAUiXF6Esc4x0hG';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

let cachedToken = null;
let tokenExpiry = 0;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      const token = await getSpotifyToken(env);

      if (path === '/tracks') {
        return await handleTracks(url, token);
      }
      if (path === '/albums') {
        return await handleAlbums(url, token);
      }
      if (path === '/artist') {
        return await handleArtist(token);
      }

      return jsonResponse({ error: 'Not found', endpoints: ['/artist', '/albums', '/tracks'] }, 404);
    } catch (err) {
      return jsonResponse({ error: err.message }, 500);
    }
  }
};

async function getSpotifyToken(env) {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;

  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });

  if (!resp.ok) throw new Error('Spotify auth failed: ' + resp.status);

  const data = await resp.json();
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000;
  return cachedToken;
}

async function handleArtist(token) {
  const resp = await spotifyGet(`https://api.spotify.com/v1/artists/${ARTIST_ID}`, token);
  const artist = await resp.json();
  return jsonResponse({
    id: artist.id,
    name: artist.name,
    image: artist.images?.[0]?.url || null,
    genres: artist.genres,
    followers: artist.followers?.total
  });
}

async function handleAlbums(url, token) {
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);

  const resp = await spotifyGet(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=FR&limit=${limit}&offset=${offset}`,
    token
  );
  const data = await resp.json();

  const albums = data.items.map(album => ({
    id: album.id,
    name: album.name,
    image: album.images?.[1]?.url || album.images?.[0]?.url || null,
    releaseDate: album.release_date,
    totalTracks: album.total_tracks,
    spotifyUrl: album.external_urls?.spotify
  }));

  return jsonResponse({
    albums,
    total: data.total,
    offset,
    limit,
    hasMore: offset + limit < data.total
  });
}

async function handleTracks(url, token) {
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
  const albumId = url.searchParams.get('album');

  if (albumId) {
    const resp = await spotifyGet(
      `https://api.spotify.com/v1/albums/${encodeURIComponent(albumId)}/tracks?market=FR&limit=${limit}&offset=${offset}`,
      token
    );
    const data = await resp.json();
    const albumResp = await spotifyGet(`https://api.spotify.com/v1/albums/${encodeURIComponent(albumId)}`, token);
    const albumData = await albumResp.json();

    const tracks = data.items.map(track => formatTrack(track, albumData));
    return jsonResponse({ tracks, total: data.total, offset, limit, hasMore: offset + limit < data.total });
  }

  // Get all tracks via albums (Spotify doesn't have a direct artist tracks endpoint with pagination)
  const albumsResp = await spotifyGet(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=FR&limit=50&offset=0`,
    token
  );
  const albumsData = await albumsResp.json();

  let allTracks = [];
  for (const album of albumsData.items) {
    const tracksResp = await spotifyGet(
      `https://api.spotify.com/v1/albums/${album.id}/tracks?market=FR&limit=50`,
      token
    );
    const tracksData = await tracksResp.json();
    tracksData.items.forEach(track => {
      allTracks.push(formatTrack(track, album));
    });
  }

  // Sort by release date desc
  allTracks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  const total = allTracks.length;
  const paginated = allTracks.slice(offset, offset + limit);

  return jsonResponse({
    tracks: paginated,
    total,
    offset,
    limit,
    hasMore: offset + limit < total
  });
}

function formatTrack(track, album) {
  return {
    id: track.id,
    name: track.name,
    duration: track.duration_ms,
    previewUrl: track.preview_url,
    spotifyUrl: track.external_urls?.spotify,
    albumName: album.name,
    albumImage: album.images?.[1]?.url || album.images?.[0]?.url || null,
    releaseDate: album.release_date,
    albumId: album.id
  };
}

async function spotifyGet(url, token) {
  const resp = await fetch(url, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!resp.ok) throw new Error('Spotify API error: ' + resp.status);
  return resp;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}
