# Informe PoC — Astro + Pages CMS (estudio fotográfico ficticio)

Fecha: 2026-11-02. Astro 7.4.5, Node 24. Documentación consultada: pagescms.org/docs (sin número de versión visible en las páginas leídas).

## 1. Qué está hecho y cómo se ha comprobado

| Prueba | Tipo | Resultado |
|---|---|---|
| Compilación `astro build` | Local | OK (3 páginas) |
| `.pages.yml`: claves, tipos de campo y rutas | Automática propia (`tests/cms.test.mjs`) | OK. **No es el validador oficial**: solo comprueba contra las claves que se leyeron en la documentación |
| SEO básico (title, description, canonical, og, h1, alt) | Automática sobre `dist/` | OK. Se añade `noindex` por ser demo |
| Enlaces WhatsApp (`wa.me/…?text=` con el servicio) | Automática + navegador | Generados correctamente. **No abiertos en WhatsApp** |
| Responsive 390 / 768 / 1440 px (3 páginas) | Local, navegador integrado | Sin desbordamiento horizontal. Revisión visual solo a 390 px |
| Cambio de tarifa | **Simulado**: edité el `.md` a mano, como haría el CMS | Se refleja (250→275 €) |
| Edición de textos | Igual que la anterior | Equivalente |
| Ocultar servicio (`visible: false`) | Simulado | Desaparece del listado y su URL no se genera |
| Crear servicio nuevo | Simulado | Se genera `/servicios/comunion/` y aparece en el listado |
| Sustituir foto | Simulado (mismo nombre de fichero) | Cambia en `dist` |
| Dato inválido (precio = "abc") | Simulado | **El build falla** con mensaje claro; en CI no se despliega y la web publicada se queda como estaba |
| Volver a versión anterior | Local con `git revert` | OK |

**NO probado (no se afirma que funcione):**
- Pages CMS real: no se ha iniciado sesión, ni instalado la GitHub App, ni abierto el panel. El `.pages.yml` nunca se ha cargado en el servicio; puede haber diferencias de interpretación (sobre todo `list` + `collapsible` en objetos, `rich-text` con `switcher: false` y el campo `body`).
- Flujo GitHub → Actions → Pages: el workflow está escrito pero **nunca ejecutado** (no hay repositorio remoto; requiere tu autorización y tu cuenta).
- Que un guardado del CMS aparezca en la web publicada, y cuánto tarda.
- Rendimiento, subida de muchas fotos reales, accesibilidad por teclado y lector de pantalla.

## 2. Respuestas a las 7 preguntas

1. **¿Milena puede gestionar sin código?** Probablemente sí para lo configurado (formularios en español). Sin confirmar hasta probar el panel real. Necesitará invitación o cuenta y entender que «guardar» = publicar.
2. **¿Qué puede y qué no puede editar?** Puede (según `.pages.yml`): servicios (nombre, descripción, precio, orden, visibilidad, texto, paquetes, galería con texto alternativo, SEO), datos generales (nombre, frase, WhatsApp) y fotos. No ve diseño, código ni `.pages.yml`; según la documentación, los colaboradores no pueden editar `.pages.yml` ni gestionar colaboradores. Cambiar el diseño, añadir secciones o campos nuevos exige a AYAVEXA tocar código. Crear un servicio nuevo sí funciona sin código, porque la plantilla es dinámica.
3. **¿Cuánto tarda un cambio?** No medido. Estimación sin verificar: commit inmediato + build de Actions (el build local tarda ≈1,4 s; en CI se suman instalación y despliegue, del orden de 1–3 min).
4. **Muchas fotografías:** la documentación leída no menciona límite de subida ni redimensionado automático. Riesgos probables: fotos de 5–10 MB directas de cámara en el repositorio (el repo crece, la web carga lenta) y sin optimización, porque las imágenes de `public/` se sirven tal cual. `extensions` limita el formato, no el peso. Mitigaciones: pedir JPG/WebP ≤ 300 KB, probar las acciones de media que menciona la documentación, o alojar galerías grandes en un servicio de imágenes. Hay que probar con 30–50 fotos reales.
5. **Costes recurrentes:** previsiblemente 0 € (Pages CMS alojado, GitHub y Pages gratuitos para repos públicos; Pages en repos privados puede requerir plan de pago, por verificar). Dominio propio ≈ 10–15 €/año si se quiere. **No se han verificado precios actuales.** Un repo público implica que cualquiera puede ver el contenido y su historial.
6. **Mantenimiento de AYAVEXA:** actualizar Astro y dependencias (unas veces al año), vigilar que el workflow siga en verde, resolver builds rotos por contenido, revisar cambios de Pages CMS, gestionar invitaciones y cuentas de GitHub, formación y soporte. El repo es la copia de seguridad.
7. **¿Frente a WordPress?** Provisional: tiene sentido si el sitio es mayormente fijo (servicios, precios, galerías) y Milena acepta un editor más limitado: coste cero, rapidez y poca superficie de ataque. WordPress es mejor si necesita maquetar páginas libres, formularios, plugins, tienda, reservas o previsualizar antes de publicar. Falta la evidencia clave: la experiencia real de edición. Decisión tras las pruebas pendientes.

## 3. Limitaciones conocidas
- Sin borrador ni previsualización: cada guardado es un commit en `main` y se despliega.
- La URL de un servicio sale del nombre del fichero (`{primary}`) y no cambia si luego se renombra el servicio.
- Un servicio oculto deja de existir (404 en su URL antigua).
- Subir una foto con el mismo nombre puede sustituir la existente o renombrarse; sin confirmar el comportamiento del CMS.
- Las imágenes ficticias son SVG; el selector solo permite subir jpg/png/webp. Las rutas guardadas son `/uploads/…`; `src/lib.ts` añade el prefijo si se despliega en subcarpeta.
- Los colaboradores se guardan en la base de datos de Pages CMS, no en el repo.
- El WhatsApp es un campo editable: un error rompe el botón (hay validación por patrón).

## 4. Pruebas pendientes (requieren tus cuentas) y tareas
1. Subir el repo (público) y comprobar el workflow. Anotar el tiempo real commit→web.
2. Abrir en app.pagescms.org: ¿carga `.pages.yml` sin avisos? ¿se ven bien las listas de paquetes y galería?
3. Repetir en el panel real: cambiar tarifa, editar texto, crear, ocultar y borrar servicio, subir y sustituir foto, con una invitación de colaborador.
4. Subir ~30–50 fotos de 3–8 MB; medir tamaño del repo y tiempo de build.
5. Revisar costes y planes actuales de GitHub, Pages CMS y dominio.
6. Si se sigue adelante: textos legales, política de privacidad, imágenes reales con licencia, titularidad de cuentas y quién paga el dominio.
