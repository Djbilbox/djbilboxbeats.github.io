/* ============================================================
   HUMPIRE — petit serveur d'enregistrement d'assets.
   La page tools/humpire-assets.html dessine chaque visuel sur un
   canvas et POSTe le PNG ici ; on l'écrit dans img/streetwear/.

   Volontairement verrouillé :
   - écoute uniquement sur 127.0.0.1
   - n'écrit que dans img/streetwear/
   - n'accepte que des noms [a-z0-9-]+.png ou .jpg
   - refuse tout corps > 12 Mo

   Lancer :  node tools/asset-server.mjs
   Arrêter : Ctrl+C (ou le kill du process)
   ============================================================ */

import http from 'node:http';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'img', 'streetwear');
const PORT = 9099;
const MAX_BYTES = 12 * 1024 * 1024;
/* sous-dossiers autorisés, liste fermée */
const SAFE_NAME = /^(photos\/|racing\/|web\/|moto\/)?[a-z0-9][a-z0-9-]{0,60}\.(png|jpg)$/;

await mkdir(OUT_DIR, { recursive: true });

const server = http.createServer((req, res) => {
  /* CORS : la page est servie depuis un autre port en local */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type,x-filename');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') { res.writeHead(204).end(); return; }

  if (req.method !== 'POST' || req.url !== '/save') {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
    return;
  }

  const name = String(req.headers['x-filename'] || '').toLowerCase();
  if (!SAFE_NAME.test(name)) {
    res.writeHead(400, { 'content-type': 'text/plain' }).end('bad filename');
    return;
  }

  const chunks = [];
  let size = 0;
  let aborted = false;

  req.on('data', (c) => {
    if (aborted) return;
    size += c.length;
    if (size > MAX_BYTES) {
      aborted = true;
      res.writeHead(413, { 'content-type': 'text/plain' }).end('too large');
      req.destroy();
      return;
    }
    chunks.push(c);
  });

  req.on('end', async () => {
    if (aborted) return;
    const buf = Buffer.concat(chunks);
    /* signature PNG ou JPEG — on n'écrit rien d'autre */
    const isPng  = buf.length >= 8 && buf.readUInt32BE(0) === 0x89504e47;
    const isJpeg = buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    if (!(isPng || isJpeg)) {
      res.writeHead(400, { 'content-type': 'text/plain' }).end('not an image');
      return;
    }
    const dest = path.join(OUT_DIR, name);
    /* ceinture et bretelles : la destination doit rester sous OUT_DIR */
    if (!path.resolve(dest).startsWith(path.resolve(OUT_DIR) + path.sep)) {
      res.writeHead(400, { 'content-type': 'text/plain' }).end('bad path');
      return;
    }
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    console.log(`saved  ${name}  ${(buf.length / 1024).toFixed(0)} KB`);
    res.writeHead(200, { 'content-type': 'text/plain' }).end('ok');
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`asset-server → http://127.0.0.1:${PORT}/save`);
  console.log(`writing into ${OUT_DIR}`);
});
