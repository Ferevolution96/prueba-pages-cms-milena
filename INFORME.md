# Informe PoC — Astro + Pages CMS (estudio fotográfico ficticio)

Fecha: 2026-11-02. Astro 7.4.5, Node 24. Web de pruebas: https://ferevolution96.github.io/prueba-pages-cms-milena/
Repositorio: `ferevolution96/prueba-pages-cms-milena` (público). Panel: app.pagescms.org.

## Resumen

| Área | Resultado |
|---|---|
| Editar precios, textos, visibilidad y borrar servicios | ✅ Funciona; publicado en 28–53 s (61–83 s con guardados seguidos) |
| Subir y sustituir fotos ligeras | ✅ Funciona |
| **Fotos pesadas (3–8 MB)** | ❌ **El panel rechaza toda foto de más de ≈3,2 MB** («Failed to upload file: 413»). La de 3,13 MB sube, pero se sirve sin optimizar |
| Validaciones | ⚠️ Bloquea texto vacío y precio negativo, pero **un precio vacío se guarda como 0** |
| Fiabilidad del guardado | ⚠️ Un guardado se perdió sin aviso; la subida de varias fotos a la vez solo subió una |
| Invitar colaborador sin GitHub | ✅ Invitación por correo enviada |
| Editar como colaborador | ✅ Funciona (49 s hasta la web). ⚠️ El commit queda firmado por `pages-cms[bot]`, sin rastro de quién editó, y el colaborador puede borrar servicios |

**Veredicto:** Pages CMS es suficientemente sencillo para el día a día de Milena (cambiar precios, textos y fotos), pero **no se puede entregar tal cual a una fotógrafa**: no admite fotos de cámara y tiene tres fallos que pueden publicar datos erróneos o perder cambios. El acceso de colaborador sin GitHub funciona. Ver la sección 6.

---

## 1. Método

- Pruebas ejecutadas por Claude desde Chrome (Claude in Chrome) en app.pagescms.org: sesiones 1 y 2 con la cuenta propietaria; sesión 3 con la cuenta de colaborador (fercod1496@gmail.com). El inicio de sesión del colaborador (correo + código y aceptación de los términos de Pages CMS) lo hizo Fernando. Horas en Europe/Madrid.
- Para cada prueba se registró: hora del guardado, commit en GitHub, ejecución del workflow «Deploy» (duración = creación del run → fin del job deploy) y el **primer momento en que el HTML servido por GitHub Pages contenía el cambio** (consulta sin caché cada 3–5 s), confirmado después recargando la página en el navegador.
- «Workflow en verde» no se tomó como prueba de publicación: se midió siempre sobre la web.
- Datos y fotos: todo ficticio o libre. Fotos usadas: capturas de la propia web, dos tarjetas de AYAVEXA (material propio) y fotos CC0 de Wikimedia Commons sin personas (sección 3).

## 2. Pruebas de contenido (sesión 1, 16:45–17:05)

| # | Prueba | Guardado | Commit | Workflow | Visible en la web | Tiempo real | Resultado |
|---|---|---|---|---|---|---|---|
| 1a | Newborn: precio «desde» 150 → 165 € | 16:45:07 | `fb97987` | #8 ✅ 46 s | 16:45:52 | **45 s** | OK |
| 1b | Newborn: paquete «Mini» 150 → 165 € | 16:48:35 | `1d3db9c` | #10 ✅ 35 s | 16:49:11 | **36 s** | OK (ficha del servicio) |
| 2 | Embarazo: editar descripción corta | 16:46:58 | `087fbfb` | #9 ✅ 49 s | 16:47:45 | **47 s** | OK en listado y ficha |
| 3a | Comunión: «Visible» → No | 16:49:37 | `d63bf8a` | #11 ✅ 31 s | 16:50:05 | **28 s** | OK: desaparece del listado **y** su URL devuelve 404 |
| 3b | Comunión: «Visible» → Sí | 16:51:08 | — | — | — | — | ❌ **Guardado perdido sin aviso** (sin commit; al recargar seguía en No) |
| 3b′ | Reintento de 3b | 16:52:37 | `107b92a` | #12 ✅ 35 s | 16:53:13 | **36 s** | OK: vuelve al listado y la URL da 200 |
| 4a | Subir captura de la web (46 KB) | 16:53:41 | `3d09fb7` | #13 ⛔ cancelado | — | — | OK |
| 4b | Embarazo: sustituir Foto 2 por la captura | 16:54:33 | `24f66ab` | #14 ✅ 79 s | 16:55:46 | **73 s** | OK, la imagen carga |
| 4c | Subir 2 imágenes a la vez | 16:57:01 | `16496e7` | #15 ⛔ cancelado | — | — | ⚠️ **Solo se subió una**, sin avisar |
| 4d | Subir la segunda por separado | 16:57:27 | `ad883c8` | #16 ✅ 45 s | — | — | OK |
| 4e | Newborn: sustituir Foto 1 por la tarjeta AYAVEXA | 16:58:36 | `025b388` | #17 ✅ 63 s | ≤ 16:59:37 | **≤ 61 s** | OK. La Foto 1 es también la miniatura de la portada |
| 5a | Descripción obligatoria vacía | — | — | — | — | — | ✅ Bloquea: «This field is required» |
| 5b | Precio negativo (−5) | — | — | — | — | — | ✅ Bloquea (validación del navegador) |
| 5c | Precio con letras («abc») | — | — | — | — | — | ✅ El campo no admite letras |
| 5d | Precio obligatorio **vacío** | 17:01:01 | `5dda453` | #18 ⛔ cancelado | No llegó a publicarse | — | ❌ **Se guarda como `precio_desde: 0`**. Restaurado a 115 a las 17:01:18 (`134e4cc`) |
| 6 | Eliminar el servicio ficticio «Familiares» | 17:02:46 | `b42cd31` | #20 ✅ 92 s | 17:04:09 | **83 s** | OK: borra solo `familiares.md`; listado y URL (404) correctos |
| C1 | Invitar colaborador (fercod1496@gmail.com) | 17:04:57 | — | — | — | — | ✅ Solo pide un correo; no exige cuenta de GitHub |

## 3. Prueba de fotos pesadas (sesión 2, 17:24–17:30)

Fotos libres (licencia **CC0**, dominio público) de Wikimedia Commons, sin personas ni marcas:

| Foto (nombre en Commons → nombre subido) | Autor | Peso | Resolución |
|---|---|---|---|
| Yellow hawkweed flowers in Gåseberg → `flores-amarillas-cc0.jpg` | W.carter | 6,18 MB | 4378×3283 |
| New oak leaves with female flowers → `roble-hojas-cc0.jpg` | W.carter | 5,41 MB | 3720×2790 |
| A banch of flowers 0001 → `flores-ramo-cc0.jpg` | Iurie Nistor | 3,83 MB | 6256×4172 |
| Flowers from Ciocana → `flores-ciocana-cc0.jpg` | Iurie Nistor | 3,13 MB | 6256×4172 |

Las fotos se descargaron en el propio navegador y se subieron una a una por el botón de subida del panel (la subida múltiple falla, ver 4c).

### 3.1 Subida

| Hora | Archivo | Peso | Resultado |
|---|---|---|---|
| 17:25:10 | `flores-amarillas-cc0.jpg` | 6,18 MB | ❌ «Failed to upload file: 413» |
| 17:25:19 | `flores-ramo-cc0.jpg` | 3,83 MB | ❌ 413 |
| 17:26:12 | `flores-ciocana-cc0.jpg` | 3,13 MB | ✅ Subida en ≈2 s (commit `dc68329`, 17:26:14; run #22 ✅ 56 s) |
| ~17:27 | `limite-362-cc0.jpg` (la de 3,83 MB recomprimida) | 3,62 MB | ❌ 413 |
| ~17:27 | `limite-324-cc0.jpg` (la de 3,83 MB recomprimida) | 3,24 MB | ❌ 413 |

**Límite real del panel: entre 3,13 MB (sube) y 3,24 MB (falla).** Los resultados encajan con un tope de unos 4,5 MB por petición en el servidor de Pages CMS, sobre el archivo ya codificado (≈ +33 %). Es una deducción a partir de las medidas, no un dato oficial. La subida rechazada no deja rastro en el repositorio. El error solo muestra «413», sin explicación.

**Consecuencia:** una foto normal de cámara (5–15 MB) o de móvil moderno (3–8 MB) **no se puede subir**. Milena tendría que reducirlas antes, y el panel no le diría cuánto.

### 3.2 Publicación y peso servido

| Prueba | Guardado | Commit | Workflow | Visible | Tiempo real |
|---|---|---|---|---|---|
| Embarazo: sustituir Foto 3 por `flores-ciocana-cc0.jpg` (3,13 MB) | 17:28:03 | `ffb10f0` | #23 ✅ 55 s (build 15 s) | 17:28:56 | **53 s** |

- La foto pesada **no ralentiza la compilación** (build de 15 s, igual que con fotos ligeras).
- **La web la sirve sin optimizar**: el visitante descarga **3.286.809 bytes** (3,13 MB) de una imagen de 6256×4172 px que se muestra a **312×208 px**. Con varias fotos así, una ficha pesaría decenas de MB en el móvil. Las imágenes de `public/uploads/` se copian tal cual; no hay redimensionado ni formato moderno (WebP/AVIF).
- Cada foto subida queda para siempre en el historial del repositorio, aunque luego se quite de la galería.

### 3.3 Fotos adjuntadas en el chat

Las dos fotos enviadas por Fernando (manos y pies) **no se usaron**: pesan 81 KB y 151 KB (no sirven para la prueba de peso), muestran a personas reales y no constaba su licencia. Se sustituyeron por las fotos CC0 anteriores, a petición suya.

## 3b. Prueba de colaborador sin cuenta de GitHub (sesión 3, 17:37–17:43)

| Paso | Hora | Resultado |
|---|---|---|
| Invitación enviada desde «Collaborators» | 17:04:57 | ✅ Solo pide un correo. Llega un correo en inglés de no-reply@mail.pagescms.org con un enlace de acceso |
| Abrir el enlace de la invitación | 17:37:39 | ❌ «Invite unavailable – This invitation is no longer available». Probablemente se consumió en un intento anterior de acceso (había un correo de «código temporal» de las 17:22) o caducó; el panel no explica el motivo |
| Iniciar sesión como colaborador | ~17:40 | ✅ Pantalla «Sign in to Pages CMS» → correo → código de un solo uso enviado al buzón. **No necesita cuenta de GitHub** |
| Qué ve el colaborador | 17:40 | ✅ Solo el repositorio al que fue invitado (no los demás del propietario). Menú: Servicios, Datos generales y Fotografías; **no** ve Actions, Collaborators ni Configuration |
| Qué puede hacer | 17:42 | ⚠️ Editar, crear («Add an entry»), **renombrar y borrar** servicios (no se probó a borrar) |
| Editar la descripción de Comunión | guardado 17:41:27 | ✅ Commit `b0fe799`, run #25 ✅ 51 s, visible en la web 17:42:16 → **49 s**. Confirmado recargando la portada |
| Autoría del cambio en Git | — | ⚠️ Autor del commit: **`pages-cms[bot]`** (actor del workflow también el bot). Los cambios del propietario aparecen como «Fernando». En el historial de Git **no queda qué colaborador hizo el cambio** |

Al cerrar la sesión del propietario para entrar como colaborador, hay que volver a iniciar sesión con «Sign in with GitHub» para recuperar el acceso de administrador.

## 4. Errores y dificultades encontrados

1. **Bloqueante para una fotógrafa — límite de ≈3,2 MB por foto** con un error incomprensible («Failed to upload file: 413»).
2. **Fotos servidas sin optimizar** (3,13 MB para una miniatura).
3. **Precio vacío = 0 €.** Un campo `number` obligatorio vacío se guarda como `0`. El esquema de Astro (`z.number().min(0)`) lo acepta, así que la web habría mostrado «Desde 0 €». No se publicó solo porque el despliegue se canceló al llegar la corrección.
4. **Guardado perdido en silencio** al guardar justo después de cambiar un interruptor: sin commit, sin error y sin aviso. Al reintentarlo funcionó.
5. **Subida múltiple incompleta**: de dos archivos, solo subió uno, sin avisar.
6. Botones, avisos y errores del panel en inglés («Save», «This field is required», «Please fix the errors…», «Failed to upload file: 413»), aunque las etiquetas de los campos estén en español. El aviso de error siguió visible tras corregir el campo.
7. Sin previsualización ni borrador: cada guardado se publica.
8. Con guardados seguidos, el workflow cancela el despliegue anterior y solo publica el último: el resultado final es correcto, pero tarda 61–83 s en verse.
9. La Foto 1 de cada galería es también la miniatura de la portada, y el panel no lo indica.
10. Quitar una foto de la galería no la borra de la biblioteca ni del repositorio.
11. Un servicio oculto o borrado muestra el 404 genérico de GitHub.
12. Las imágenes SVG originales no aparecen en la biblioteca «Fotografías» (solo admite jpg/png/webp).
13. El enlace de invitación dejó de valer («Invite unavailable») sin indicar el motivo ni ofrecer reenviarla; la clienta tendría que entrar por «Sign in» con su correo.
14. Los cambios de un colaborador se firman como `pages-cms[bot]`: en Git no queda constancia de quién editó. Si hay varias personas editando, no se puede saber quién hizo qué desde GitHub.
15. Un colaborador puede borrar servicios (con confirmación). No hay un rol de «solo editar».
16. El correo de invitación, la pantalla de acceso y los avisos están en inglés.

## 5. No probado o pendiente (no se afirma que funcione)

- Subida de fotos y borrado de servicios desde la cuenta de colaborador.
- Si Pages CMS muestra en algún sitio (fuera de Git) qué colaborador hizo cada cambio.
- Lote de 30–50 fotos reales (con el límite actual no se podrían subir sin reducirlas antes).
- Uso del panel desde el móvil.
- Restaurar una versión anterior desde el panel.
- Validación del campo WhatsApp en el panel y precios con decimales.
- Página de datos generales.

## 6. ¿Es suficientemente sencillo para Milena?

**Para textos y precios, sí.** Son 3–5 clics en formularios con etiquetas en español, y el cambio aparece en menos de un minuto.

**Para fotos, no tal cual.** Una fotógrafa sube fotos de cámara; con el límite de ≈3,2 MB y un error en inglés sin explicación, se atascaría en la tarea que más hará. Además, aunque las reduzca, la web las serviría enormes.

**Riesgos de fiabilidad:** el precio a 0 €, el guardado perdido y la subida múltiple incompleta hacen que hoy no se pueda dar acceso a una clienta sin antes poner protecciones.

## 7. Qué necesita AYAVEXA para entregarlo a una clienta real

1. **Resolver las fotos** (lo más importante). Opciones, de menos a más trabajo:
   - Guía y herramienta para que Milena exporte las fotos a JPG de ~2500 px y ≤ 2,5 MB antes de subirlas (por ejemplo, un preajuste en su programa de edición).
   - Optimización en el build: generar en la compilación versiones redimensionadas y WebP/AVIF, en lugar de servir `public/uploads/` tal cual. Reduce el peso servido, pero **no** quita el límite de subida del panel.
   - Alojar las galerías en un servicio de imágenes con su propio subidor; el CMS guardaría solo la URL.
2. **Blindar precios**: `precio_desde` y `precio` con `.min(1)` (o vacío explícito → «Consultar»), para que un 0 accidental rompa el build y la web quede como estaba.
3. **Procedimiento de comprobación** para la clienta: esperar el aviso verde «saved successfully»; si no aparece, volver a guardar; subir las fotos de una en una; mirar la web al minuto.
4. **Acceso de la clienta**: el acceso por correo sin GitHub funciona. Falta decidir la titularidad del repositorio y de las cuentas, explicar a la clienta que entra por «Sign in» con su correo y un código (el enlace de invitación puede caducar), y asumir que puede borrar servicios y que en Git sus cambios aparecen como `pages-cms[bot]`.
5. Página 404 propia e indicar en el panel que la Foto 1 es la portada del servicio.
6. Guía breve en español con capturas, traduciendo los mensajes en inglés más comunes.
7. Avisos de fallo del workflow: GitHub ya envía correos «Run failed» a la cuenta propietaria (se vieron en su bandeja); decidir quién los recibe en AYAVEXA y cómo se revierte un cambio.
8. Pendientes de la fase anterior: textos legales y privacidad, imágenes con licencia, costes y dominio. El repositorio es público: todo lo que se suba (incluidas fotos de clientes) queda visible en el historial.

---

## Anexo A. Fase anterior: comprobaciones locales y simuladas

| Prueba | Tipo | Resultado |
|---|---|---|
| Compilación `astro build` | Local | OK (3 páginas) |
| `.pages.yml`: claves, tipos de campo y rutas | Automática propia (`tests/cms.test.mjs`) | OK. No es el validador oficial |
| SEO básico (title, description, canonical, og, h1, alt) | Automática sobre `dist/` | OK. `noindex` por ser demo |
| Enlaces WhatsApp (`wa.me/…?text=`) | Automática + navegador | Generados correctamente. No abiertos en WhatsApp |
| Responsive 390 / 768 / 1440 px | Local | Sin desbordamiento horizontal. Revisión visual solo a 390 px |
| Cambios de contenido simulados editando el `.md` | Simulado | Coherentes con lo medido después en el panel real |
| Precio = "abc" | Simulado | El build falla. En el panel real no se puede escribir «abc»; el riesgo real es el precio vacío guardado como 0 |
| Volver a versión anterior | Local con `git revert` | OK |

## Anexo B. Respuestas a las 7 preguntas (con las pruebas reales)

1. **¿Milena puede gestionar sin código?** Textos, precios y visibilidad, sí. Fotos, solo si se resuelve el límite de tamaño (sección 7.1).
2. **¿Qué puede y qué no puede editar?** Puede: servicios (nombre, descripción, precio, orden, visibilidad, texto, paquetes, galería con texto alternativo, SEO), datos generales y fotos. No ve diseño, código ni `.pages.yml`. Cambios de diseño o campos nuevos los hace AYAVEXA.
3. **¿Cuánto tarda un cambio?** Medido: 28–53 s con un cambio aislado; 61–83 s con guardados seguidos.
4. **Muchas fotografías:** el panel no admite fotos de más de ≈3,2 MB y la web las sirve sin optimizar. Hace falta una de las soluciones de la sección 7.1.
5. **Costes recurrentes:** previsiblemente 0 € con repositorio público (no verificados los precios actuales). Una solución de alojamiento de imágenes podría tener coste.
6. **Mantenimiento de AYAVEXA:** dependencias, vigilancia del workflow, builds rotos por contenido, cambios de Pages CMS, invitaciones, formación y soporte, y el flujo de fotos.
7. **¿Frente a WordPress?** Pages CMS encaja para un sitio mayormente fijo con pocas fotos ya optimizadas. Para una fotógrafa que actualiza galerías a menudo, WordPress (o un servicio de galerías) gestiona mejor la subida y el redimensionado de fotos grandes. Decisión condicionada a cómo se resuelva la sección 7.1.

## Anexo C. Limitaciones conocidas de la configuración

- Sin borrador ni previsualización: cada guardado es un commit en `main` y se despliega.
- La URL de un servicio sale del nombre del fichero (`{primary}`) y no cambia si luego se renombra el servicio.
- Un servicio oculto deja de existir (404 en su URL).
- Las rutas guardadas son `/uploads/…`; `src/lib.ts` añade el prefijo de la subcarpeta (verificado en la web publicada).
- Los colaboradores se guardan en la base de datos de Pages CMS, no en el repo.
