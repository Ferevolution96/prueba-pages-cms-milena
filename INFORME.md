# Informe PoC — Astro + Pages CMS (estudio fotográfico ficticio)

Fecha: 2026-11-02. Astro 7.4.5, Node 24. Web de pruebas: https://ferevolution96.github.io/prueba-pages-cms-milena/

## 0. Pruebas reales en el panel de Pages CMS (2 nov 2026, 16:45–17:05)

Realizadas por Claude desde Chrome (Claude in Chrome) con la sesión de la cuenta propietaria, en app.pagescms.org, sobre este repositorio. Horas en Europe/Madrid. «Visible» = primer momento en que el HTML servido por GitHub Pages contenía el cambio (consulta sin caché cada 3–5 s), confirmado después recargando la página en el navegador.

### 0.1 Tabla de resultados

| # | Prueba | Guardado | Commit | Workflow (duración) | Visible en la web | Tiempo real | Resultado |
|---|---|---|---|---|---|---|---|
| 1a | Newborn: precio «desde» 150 → 165 € | 16:45:07 | `fb97987` | #8 ✅ 46 s | 16:45:52 | **45 s** | OK |
| 1b | Newborn: paquete «Mini» 150 → 165 € | 16:48:35 | `1d3db9c` | #10 ✅ 35 s | 16:49:11 | **36 s** | OK (ficha del servicio) |
| 2 | Embarazo: editar descripción corta | 16:46:58 | `087fbfb` | #9 ✅ 49 s | 16:47:45 | **47 s** | OK en listado y en la ficha |
| 3a | Comunión: «Visible» → No | 16:49:37 | `d63bf8a` | #11 ✅ 31 s | 16:50:05 | **28 s** | OK: desaparece del listado **y** su URL devuelve 404 |
| 3b | Comunión: «Visible» → Sí (restaurar) | 16:51:08 | — | — | — | — | ❌ **Guardado perdido sin aviso** (sin commit; al recargar seguía en No) |
| 3b′ | Reintento de 3b | 16:52:37 | `107b92a` | #12 ✅ 35 s | 16:53:13 | **36 s** | OK: vuelve al listado y la URL da 200 |
| 4a | Subir captura de la web de prueba (46 KB) | 16:53:41 | `3d09fb7` | #13 ⛔ cancelado (lo sustituye #14) | — | — | OK (subida a `public/uploads/`) |
| 4b | Embarazo: sustituir Foto 2 de la galería por la captura | 16:54:33 | `24f66ab` | #14 ✅ 79 s | 16:55:46 | **73 s** | OK, la imagen carga (1150×631, `object-fit: cover`) |
| 4c | Subir 2 imágenes AYAVEXA a la vez (anverso + reverso) | 16:57:01 | `16496e7` | #15 ⛔ cancelado | — | — | ⚠️ **Solo se subió una** (reverso), sin avisar del otro archivo |
| 4d | Subir el anverso por separado | 16:57:27 | `ad883c8` | #16 ✅ 45 s | — | — | OK |
| 4e | Newborn: sustituir Foto 1 por el anverso AYAVEXA | 16:58:36 | `025b388` | #17 ✅ 63 s | ≤ 16:59:37 | **≤ 61 s** | OK. Efecto secundario: la Foto 1 es también la miniatura de la tarjeta en la portada |
| 5a | Descripción obligatoria vacía | — | — | — | — | — | ✅ Bloquea: «This field is required» + «Please fix the errors before saving» |
| 5b | Precio negativo (−5) | — | — | — | — | — | ✅ Bloquea (validación del navegador: «El valor debe ser superior o igual a 0») |
| 5c | Precio con letras («abc») | — | — | — | — | — | ✅ El campo numérico no admite letras (queda vacío) |
| 5d | Precio obligatorio **vacío** | 17:01:01 | `5dda453` | #18 ⛔ cancelado | No llegó a publicarse | — | ❌ **Se guarda como `precio_desde: 0`** pese a ser obligatorio. Restaurado a 115 a las 17:01:18 (`134e4cc`) |
| 6 | Eliminar el servicio ficticio «Familiares» | 17:02:46 | `b42cd31` | #20 ✅ 92 s | 17:04:09 | **83 s** | OK: borra solo `familiares.md`; desaparece del listado y su URL da 404. Pide confirmación con la ruta exacta |
| C | Invitar colaborador sin GitHub (fercod1496@gmail.com) | 17:04:57 | — (no genera commit) | — | — | — | ✅ La invitación se envía con solo un correo; aparece en «Collaborators» |

Estado final verificado en la web (17:04): Newborn 165 €, Embarazo 120 € (descripción editada), Comunión 115 € visible; Familiares eliminado.

### 0.2 Evidencias

- Commits y ejecuciones: historial de `main` y pestaña Actions del repositorio (SHA y número de run en la tabla). Mensajes de commit con la plantilla `contenido: actualizar … (Pages CMS)`.
- Capturas tomadas durante la sesión (no subidas al repo): avisos de guardado («saved successfully»), error de campo obligatorio, aviso de precio negativo, diálogo de borrado de `familiares.md`, invitación enviada, portada y fichas tras cada cambio.
- Imágenes de prueba subidas: `public/uploads/prueba-captura-web-1.jpg`, `modelo-a2-anverso.png`, `modelo-a2-reverso.png` (material propio de AYAVEXA, sin fotos de terceros).

### 0.3 Tiempos

- Guardado → visible: **28–47 s** con un solo cambio; **61–83 s** cuando hay varios guardados seguidos (el workflow cancela el despliegue en curso y solo publica el último; el resultado final es correcto, pero tarda más).
- Ojo: la página pública llegó a servir el cambio antes de que GitHub marcara el run como terminado, y la API de GitHub mostró «in progress» durante un rato después. «Workflow en verde» y «web actualizada» no son lo mismo; se ha medido sobre la web.

### 0.4 Errores y dificultades encontrados

1. **Crítico — precio vacío = 0 €.** Un campo `number` con `required: true` vacío se guarda como `0`. El esquema de Astro (`z.number().min(0)`) lo acepta, así que la web habría mostrado «Desde 0 €». No llegó a publicarse solo porque el despliegue se canceló por el commit de corrección.
2. **Guardado perdido en silencio.** Al reactivar «Visible» y pulsar Guardar justo después, no se hizo commit ni apareció error ni aviso. Al reintentar (con una pausa de 1 s) funcionó. Milena podría creer que ha publicado algo que no está.
3. **Subida múltiple incompleta.** Al seleccionar dos imágenes a la vez solo se subió una, sin aviso.
4. Mensajes del panel en inglés («Save», «This field is required», «Please fix the errors…», «Add an item»), aunque las etiquetas de los campos estén en español. El aviso de error de la descripción siguió visible tras corregirla.
5. Sin previsualización ni borrador: cada guardado se publica.
6. Al quitar una foto de una galería, el archivo sigue en la biblioteca; la carpeta de fotos crecerá sin limpieza.
7. La Foto 1 de la galería es también la miniatura del servicio en la portada; no se indica en el panel.
8. Un servicio oculto o borrado muestra el 404 genérico de GitHub, no una página propia.
9. Las imágenes ficticias originales (SVG) no aparecen en la biblioteca «Fotografías» (solo admite jpg/png/webp), así que al sustituirlas no se ve la imagen anterior en el selector.

### 0.5 No probado o pendiente (no se afirma que funcione)

- **Edición desde la cuenta de colaborador**: invitación enviada; falta aceptar el correo e iniciar sesión con fercod1496@gmail.com y repetir una edición.
- **Fotografías reales de 3–8 MB** (y lotes de 30–50): **pendiente, no superada**. Las imágenes usadas pesan 21–46 KB.
- Uso del panel desde el móvil.
- Restaurar una versión anterior desde el panel (el botón de historial existe; no se usó).
- Precio con decimales.

### 0.6 ¿Es suficientemente sencillo para Milena?

**Sí para el uso diario previsto, con condiciones.** Cambiar un precio, un texto o una foto son 3–5 clics en formularios con etiquetas en español, y el cambio aparece en menos de un minuto. Ocultar y borrar funcionan como se espera y el borrado pide confirmación.

**No está listo para entregarlo tal cual** por los fallos 1–3: un precio vacío puede publicar «0 €» y un guardado puede perderse sin aviso. Ambos se pueden mitigar (ver 0.7), pero hay que hacerlo y volver a probar antes de dar acceso a una clienta.

### 0.7 Qué necesitaría AYAVEXA para entregarlo a una clienta real

1. **Blindar precios en el build**: `precio_desde` y `precio` con `.min(1)` (o permitir vacío explícito y mostrar «Consultar»). Así un 0 accidental rompe el build y la web sigue como estaba en lugar de publicar «Desde 0 €».
2. **Procedimiento de comprobación** para la clienta: tras guardar, esperar el aviso verde «saved successfully»; si no aparece, volver a guardar. Mejor aún, pedirle que mire la web al minuto.
3. **Probar el flujo de colaborador completo** (aceptar invitación, iniciar sesión, editar, ver qué autor queda en el commit) y decidir la titularidad: repositorio y cuenta de GitHub a nombre de quién, quién gestiona las invitaciones.
4. **Optimización de imágenes** antes de usar fotos de cámara: límite de peso o redimensionado automático en el build; probar con fotos de 3–8 MB.
5. Página 404 propia y aviso de que la Foto 1 es la portada del servicio.
6. Guía breve en español con capturas (el panel muestra botones y errores en inglés).
7. Avisos por correo de fallos del workflow para AYAVEXA y un procedimiento para revertir un cambio.
8. Pendientes de la fase anterior: textos legales y privacidad, imágenes con licencia, costes y dominio.

---

## 1. Fase anterior: comprobaciones locales y simuladas

| Prueba | Tipo | Resultado |
|---|---|---|
| Compilación `astro build` | Local | OK (3 páginas) |
| `.pages.yml`: claves, tipos de campo y rutas | Automática propia (`tests/cms.test.mjs`) | OK. **No es el validador oficial**: solo comprueba contra las claves que se leyeron en la documentación |
| SEO básico (title, description, canonical, og, h1, alt) | Automática sobre `dist/` | OK. Se añade `noindex` por ser demo |
| Enlaces WhatsApp (`wa.me/…?text=` con el servicio) | Automática + navegador | Generados correctamente. **No abiertos en WhatsApp** |
| Responsive 390 / 768 / 1440 px (3 páginas) | Local, navegador integrado | Sin desbordamiento horizontal. Revisión visual solo a 390 px |
| Cambio de tarifa, textos, ocultar, crear, sustituir foto | Simulado editando el `.md` a mano | Coherente con lo medido después en el panel real (sección 0) |
| Dato inválido (precio = "abc") | Simulado | El build falla con mensaje claro. **En el panel real no se puede escribir «abc»; el riesgo real es el precio vacío guardado como 0 (sección 0.4)** |
| Volver a versión anterior | Local con `git revert` | OK |

## 2. Respuestas a las 7 preguntas (actualizadas con las pruebas reales)

1. **¿Milena puede gestionar sin código?** Sí para lo configurado, según las pruebas en el panel real. Necesitará invitación, entender que «guardar» = publicar y comprobar el aviso de guardado (ver 0.4).
2. **¿Qué puede y qué no puede editar?** Puede: servicios (nombre, descripción, precio, orden, visibilidad, texto, paquetes, galería con texto alternativo, SEO), datos generales (nombre, frase, WhatsApp) y fotos. No ve diseño, código ni `.pages.yml`. Cambiar el diseño, añadir secciones o campos nuevos exige a AYAVEXA tocar código.
3. **¿Cuánto tarda un cambio?** Medido: 28–47 s con un cambio aislado; hasta 61–83 s con guardados seguidos.
4. **Muchas fotografías:** sin probar con fotos reales grandes. La documentación leída no menciona redimensionado automático y las imágenes de `public/` se sirven tal cual. Pendiente la prueba con 3–8 MB.
5. **Costes recurrentes:** previsiblemente 0 € (repositorio público). **No se han verificado precios actuales.** Un repo público implica que cualquiera puede ver el contenido y su historial.
6. **Mantenimiento de AYAVEXA:** actualizar Astro y dependencias, vigilar el workflow, resolver builds rotos por contenido, revisar cambios de Pages CMS, gestionar invitaciones, formación y soporte.
7. **¿Frente a WordPress?** Pages CMS encaja si el sitio es mayormente fijo y se aceptan sus limitaciones (sin previsualización, panel parcialmente en inglés). WordPress es mejor si necesita maquetar páginas libres, formularios, reservas o previsualizar.

## 3. Limitaciones conocidas

- Sin borrador ni previsualización: cada guardado es un commit en `main` y se despliega.
- La URL de un servicio sale del nombre del fichero (`{primary}`) y no cambia si luego se renombra el servicio.
- Un servicio oculto deja de existir (404 en su URL antigua).
- Las rutas guardadas son `/uploads/…`; `src/lib.ts` añade el prefijo de la subcarpeta. Verificado en la web publicada.
- Los colaboradores se guardan en la base de datos de Pages CMS, no en el repo.
- El WhatsApp es un campo editable con validación por patrón (no probada en el panel).
