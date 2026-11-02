# Prueba Astro + Pages CMS (ficticia)

Prueba de concepto de AYAVEXA Studio. **Todo el contenido, precios, imágenes y el número de WhatsApp (`34600000000`) son ficticios.** No contiene datos de ninguna clienta real.

## Uso local
```bash
npm install
npm run dev      # http://localhost:4321
npm test         # build + pruebas automáticas (tests/cms.test.mjs)
```

## Estructura
- `src/content/servicios/*.md` — un fichero por servicio (lo edita el CMS). El nombre del fichero es la URL: `/servicios/<nombre>/`.
- `src/data/sitio.json` — nombre, frase, WhatsApp (lo edita el CMS).
- `public/uploads/` — fotos (las sube el CMS).
- `.pages.yml` — qué ve y puede editar la clienta en Pages CMS.
- `src/pages`, `src/layouts` — diseño. **No aparecen en el CMS.**
- `.github/workflows/deploy.yml` — build + GitHub Pages en cada push a `main`.

## Probar el panel (pasos para ti, requieren cuentas)
1. Crea un repositorio **público** en tu GitHub (p. ej. `prueba-pages-cms-milena`) y súbelo: `git remote add origin <url>` + `git push -u origin main`. (No lo he subido yo.)
2. En el repo: Settings → Pages → Source: **GitHub Actions**. Comprueba en la pestaña Actions que el despliegue sale verde y abre la URL.
3. Entra en https://app.pagescms.org con GitHub, instala la GitHub App sobre ese repo y ábrelo.
4. Deberías ver "Servicios" y "Datos generales". Ejecuta las pruebas pendientes de `INFORME.md` (sección 4).
5. Para simular a Milena sin GitHub: Collaborators → invita un email tuyo secundario.

## Volver atrás
Cada guardado del CMS es un commit. En GitHub: commit → "Revert". O `git revert <hash>`.
