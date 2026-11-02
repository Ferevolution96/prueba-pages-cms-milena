// Pruebas automáticas locales: validan .pages.yml contra las claves documentadas
// y comprueban el HTML generado en dist/ (ejecutar tras `npm run build`).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';

const base = (process.env.BASE_PATH || '').replace(/\/$/, ''); // CI sirve bajo /<repo>
const cfg = parse(readFileSync('.pages.yml', 'utf8'));
const TIPOS = ['block','boolean','code','date','file','image','number','object','reference','rich-text','select','string','text','uuid'];
const CAMPO_KEYS = ['name','label','type','component','required','pattern','hidden','readonly','description','options','default','list','fields','blocks','blockKey'];
const walk = (fields, f) => fields.forEach((x) => { f(x); if (x.fields) walk(x.fields, f); });

test('claves de nivel superior válidas', () => {
  for (const k of Object.keys(cfg)) assert.ok(['media','content','components','settings','actions'].includes(k), k);
});
test('campos con tipo y claves conocidas', () => {
  for (const c of cfg.content.filter((c) => c.fields))
    walk(c.fields, (f) => {
      assert.ok(TIPOS.includes(f.type), `${f.name}: tipo ${f.type}`);
      for (const k of Object.keys(f)) assert.ok(CAMPO_KEYS.includes(k), `${f.name}: clave ${k}`);
    });
});
test('imagenes referencian una fuente media existente', () => {
  const fuentes = cfg.media.map((m) => m.name);
  for (const c of cfg.content) walk(c.fields, (f) => f.type === 'image' && assert.ok(fuentes.includes(f.options.media)));
});
test('la colección apunta a carpetas reales', () => {
  for (const c of cfg.content) assert.ok(existsSync(c.path), c.path);
  assert.ok(existsSync(cfg.media[0].input));
});
test('páginas generadas: SEO y WhatsApp', () => {
  for (const s of ['newborn', 'embarazo']) {
    const h = readFileSync(`dist/servicios/${s}/index.html`, 'utf8');
    assert.match(h, /<title>[^<]+<\/title>/);
    assert.match(h, /<meta name="description" content="[^"]+"/);
    assert.match(h, /rel="canonical"/);
    assert.match(h, /href="https:\/\/wa\.me\/\d+\?text=[^"]+"/);
    assert.match(h, /<h1>/);
    assert.ok(!/<img(?![^>]*\balt=)/.test(h), 'img sin alt');
  }
});
test('las imágenes referenciadas existen en dist', () => {
  for (const f of readdirSync('dist/servicios')) {
    const h = readFileSync(`dist/servicios/${f}/index.html`, 'utf8');
    for (const [, src] of h.matchAll(/<img[^>]*src="([^"]+)"/g)) assert.ok(existsSync('dist' + src.replace(base, '')), src);
  }
});
