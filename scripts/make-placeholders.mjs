// Genera imágenes SVG de prueba (ficticias) en public/uploads
import { writeFileSync } from 'node:fs';
const items = [
  ['hero', 'Portada de prueba', '#d9c5b2', '#8a6f5a'],
  ['newborn-1', 'Newborn 1', '#e8d5c4', '#a47c62'],
  ['newborn-2', 'Newborn 2', '#dfe3d6', '#7d8a6c'],
  ['newborn-3', 'Newborn 3', '#efe0d6', '#b3836b'],
  ['embarazo-1', 'Embarazo 1', '#e6d3d0', '#a46f6b'],
  ['embarazo-2', 'Embarazo 2', '#d8d3e0', '#7b6f95'],
  ['embarazo-3', 'Embarazo 3', '#f0e2cf', '#b08a55'],
  ['embarazo-4', 'Embarazo 4 (reemplazo)', '#cfe0e0', '#5f8a8a'],
];
for (const [f, t, bg, fg] of items) {
  writeFileSync(`public/uploads/${f}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="${bg}"/><circle cx="600" cy="360" r="140" fill="${fg}" opacity=".35"/><text x="600" y="580" font-family="Georgia,serif" font-size="56" text-anchor="middle" fill="${fg}">${t}</text><text x="600" y="640" font-family="sans-serif" font-size="28" text-anchor="middle" fill="${fg}">IMAGEN FICTICIA DE PRUEBA</text></svg>`);
}
