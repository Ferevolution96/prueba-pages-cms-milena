# Informe definitivo — Astro + Pages CMS para el Estudio Milena Carrasco

**AYAVEXA Studio · Prueba de concepto `prueba-pages-cms-milena` · 2 de noviembre de 2026**
Web de pruebas: https://ferevolution96.github.io/prueba-pages-cms-milena/ · Panel: app.pagescms.org · Horas en Europe/Madrid.

## Conclusión

> ### APTO CON CONDICIONES
> Astro + Pages CMS es viable para Milena **si AYAVEXA resuelve antes el flujo de fotografías** (el panel rechaza fotos de más de ≈3,2 MB y la web las sirve sin optimizar) y **deja aplicadas las protecciones que ya se han probado** en este repositorio (sin borrar servicios, autoría por usuario, precios mínimos validados en la compilación). Con eso, el día a día de Milena (precios, paquetes, textos, ocultar y crear sesiones) funciona sin GitHub y se publica en menos de un minuto.
>
> Si Milena necesita subir galerías grandes directamente desde la cámara o el móvil sin ningún paso previo, **WordPress sería mejor para ella**.

Justificación en la sección 9.

---

## 1. Pruebas realizadas, resultados y evidencias

Todas las pruebas se ejecutaron de verdad desde Chrome (Claude in Chrome) contra el panel real y la web publicada. «Visible» es el primer momento en que el HTML servido por GitHub Pages contenía el cambio (consulta sin caché cada 3–5 s), confirmado después recargando en el navegador. El inicio de sesión del colaborador (correo, código y aceptación de los términos) lo hizo Fernando.

### 1.1 Contenido (propietario, 16:45–17:05)

| # | Prueba | Guardado | Commit | Workflow | Visible | Tiempo | Resultado |
|---|---|---|---|---|---|---|---|
| 1a | Newborn: precio «desde» 150 → 165 € | 16:45:07 | `fb97987` | #8 ✅ 46 s | 16:45:52 | 45 s | ✅ |
| 1b | Newborn: paquete «Mini» 150 → 165 € | 16:48:35 | `1d3db9c` | #10 ✅ 35 s | 16:49:11 | 36 s | ✅ |
| 2 | Embarazo: descripción | 16:46:58 | `087fbfb` | #9 ✅ 49 s | 16:47:45 | 47 s | ✅ listado y ficha |
| 3a | Comunión: Visible → No | 16:49:37 | `d63bf8a` | #11 ✅ 31 s | 16:50:05 | 28 s | ✅ fuera del listado y URL 404 |
| 3b | Comunión: Visible → Sí | 16:51:08 | — | — | — | — | ❌ guardado perdido sin aviso |
| 3b′ | Reintento | 16:52:37 | `107b92a` | #12 ✅ 35 s | 16:53:13 | 36 s | ✅ |
| 5a–c | Texto vacío / precio −5 / letras | — | — | — | — | — | ✅ bloqueados |
| 5d | Precio vacío | 17:01:01 | `5dda453` | #18 ⛔ cancelado | no publicado | — | ❌ se guardó como `0` |
| 6 | Borrar el servicio ficticio «Familiares» | 17:02:46 | `b42cd31` | #20 ✅ 92 s | 17:04:09 | 83 s | ✅ |

### 1.2 Fotografías

| Prueba | Usuario | Hora | Evidencia | Resultado |
|---|---|---|---|---|
| Subir capturas y tarjetas AYAVEXA (21–46 KB) | Propietario | 16:53–16:57 | `3d09fb7`, `ad883c8`, `16496e7` | ✅ (subiendo 2 a la vez solo subió 1) |
| Sustituir foto de galería (Embarazo F2, Newborn F1) | Propietario | 16:54 / 16:58 | `24f66ab` (73 s), `025b388` (≤61 s) | ✅ |
| Fotos CC0 de Wikimedia Commons: 6,18 / 3,83 / 3,62 / 3,24 MB | Propietario | 17:25–17:27 | «Failed to upload file: 413» | ❌ rechazadas |
| Foto CC0 de 3,13 MB | Propietario | 17:26:12 | `dc68329` | ✅ |
| Sustituir Embarazo F3 por la de 3,13 MB | Propietario | 17:28:03 | `ffb10f0`, #23 55 s, visible 17:28:56 | ✅ 53 s; servida **sin optimizar** (3.286.809 bytes para una miniatura de 312×208 px) |
| Subir imagen generada de 0,45 MB | **Colaborador** | 18:01:13 | `d40f300` | ✅ ≈3 s |
| Subir imagen generada de 2,92 MB | **Colaborador** | 18:01:19 | `fe49233` | ✅ ≈5 s |
| Subir imagen generada de 5,21 MB | **Colaborador** | 18:01:31 | «Failed to upload file: 413» | ❌ mismo límite |
| Sustituir Newborn F2 por la de 0,45 MB | **Colaborador** | 18:02:24 | `31a031c`, #29 77 s, visible 18:03:42 | ✅ 78 s (en cola tras 2 subidas) |
| Enlaces rotos | — | 18:04 | Rastreo de 4 páginas y 11 recursos | ✅ todos 200 |
| Archivos antiguos | — | 18:04 | API de GitHub | ⚠️ 7 archivos sin uso siguen publicados |
| Borrar foto sin uso desde la biblioteca | **Colaborador** | 18:04:48 | aviso «deleted successfully» | ✅ desaparece de la web, pero **sigue en el historial** (repositorio: 6,9 MB tras el borrado) |

### 1.3 Colaborador sin GitHub (fercod1496@gmail.com)

| Prueba | Hora | Evidencia | Resultado |
|---|---|---|---|
| Invitación por correo | 17:04:57 | Panel «Collaborators» | ✅ solo pide correo |
| Abrir el enlace de invitación | 17:37:39 | «Invite unavailable» | ❌ caducado o consumido, sin explicación |
| Iniciar sesión con correo y código | ~17:40 | — | ✅ sin GitHub |
| Qué ve | 17:40 | Captura | ✅ solo este repositorio; sin Actions, Collaborators ni Configuration |
| Editar Comunión | 17:41:27 | `b0fe799`, #25 51 s, visible 17:42:16 | ✅ 49 s, firmado por `pages-cms[bot]` (antes de la corrección) |
| Crear sesión «Bautizo de prueba» | 18:13:46 | `77b1dcc`, #37, visible 18:15:11 | ✅ 85 s; URL limpia `/servicios/bautizo-de-prueba/` (borrada después: `4544b28`) |

### 1.4 Permisos aplicados y verificados (commit `680161a`, 18:24)

| Medida en `.pages.yml` | Comprobación | Resultado |
|---|---|---|
| `operations: { delete: false, rename: false }` en `servicios` | Menú del colaborador | ✅ Rename y Delete desaparecen; «Add an entry» sigue |
| Lo mismo | Petición directa a la API de Pages CMS como colaborador para borrar un servicio (archivo inexistente, sin riesgo) | ✅ **HTTP 403** «Deleting entries isn't allowed for "servicios"»: el bloqueo es del servidor, no solo del botón |
| `settings.commit.identity: user` + plantillas con `{userEmail}` | Edición de Embarazo como colaborador, 18:25:34 | ✅ commit `f5aab1f` con autor `fercod1496@gmail.com` y el correo en el mensaje; visible 18:26:30 (56 s) |
| `min: 1` en los precios del panel | Configuración publicada | Aplicado; el bloqueo real lo da la compilación (1.5) |

### 1.5 Seguridad y recuperación

| Prueba | Hora | Evidencia | Resultado |
|---|---|---|---|
| Historial en el panel | 18:05 | Botón de reloj del editor | ⚠️ muestra los 3 últimos cambios y enlaza a GitHub; **no permite restaurar** |
| Error simulado: Embarazo 120 → 12 € (colaborador) | 18:05:51 | `66eeddd`, visible 18:06:27 | ⚠️ el error llega a la web en 36 s; no hay revisión previa |
| Recuperar la versión anterior desde el historial de GitHub | 18:07:09 | `385a013` (contenido de `ffb10f0`), web correcta ≤18:07:43 | ✅ ≤34 s |
| Validación en la compilación: precios `.min(1)` en `src/content.config.ts` | ~18:08 | `e8efd58`, #33 ✅ | ✅ aplicada |
| Precio vacío guardado desde el panel (se convierte en 0) | 18:10:06 | `e977b91`, #34 ❌ en «npm test» (16 s), despliegue omitido | ✅ **la web siguió intacta** («Desde 115 €», 4 páginas con 200) |
| Cambio válido mientras el 0 sigue en el repositorio | 18:11:20 | `fbc1247`, #35 ❌ | ⚠️ **tampoco se publica**, aunque el panel dice «saved successfully» |
| Corregir el precio desde el panel | 18:12:21 | `7bee826`, #36 ✅, visible 18:13:00 | ✅ 39 s; se publican los dos cambios pendientes |

Estado final de la web (18:27): Newborn 165 €, Embarazo 120 €, Comunión 115 €; todas las páginas responden 200.

## 2. Tiempos reales de publicación

| Situación | Guardado → visible | Workflow |
|---|---|---|
| Cambio aislado de texto, precio o visibilidad | **28–56 s** (mediana ≈40 s) | 31–51 s |
| Foto ya subida, sustituida en una galería | 53 s | 55 s |
| Crear una sesión nueva | 85 s | build más lento ese día (54 s) |
| Varios guardados seguidos (el workflow cancela el anterior y publica el último) | 61–83 s | — |
| Recuperación desde GitHub | ≤34 s | — |
| Subida de una foto al panel | 2–5 s (sin publicar hasta que se usa y se guarda) | — |

## 3. Pruebas pendientes o bloqueadas

- **Fotos de cámara de 3–8 MB: bloqueadas** por el límite de subida del panel (≈3,2 MB). No se pueden probar «tal cual» con Pages CMS alojado.
- Lote de 30–50 fotos reales y tamaño del repositorio resultante.
- Uso del panel desde el móvil.
- Validación del campo WhatsApp y página «Datos generales» en el panel.
- Precios con decimales.
- Despliegue real en IONOS (no hay autorización ni acceso; sección 7 solo es análisis).
- Inventario de URLs del WordPress actual (no se conoce el dominio).
- Qué ve Milena si una compilación falla: no hay aviso en el panel; GitHub envía correo «Run failed» solo a la cuenta propietaria (se vieron estos correos en su bandeja).

## 4. Riesgos encontrados

| Riesgo | Gravedad | Estado |
|---|---|---|
| Fotos de cámara rechazadas (413) con un error incomprensible | Alta | **Abierto**: requiere solución (sección 6) |
| Fotos servidas sin optimizar (MB por miniatura) | Alta | Abierto |
| Un dato inválido bloquea **todas** las publicaciones siguientes sin que Milena lo vea | Alta | Mitigable: aviso de fallo a AYAVEXA y validación en el panel |
| Precio vacío guardado como 0 | Media | **Mitigado**: la compilación lo rechaza y la web no cambia |
| Guardado perdido sin aviso (1 vez en ≈25 guardados) | Media | Abierto; instruir a Milena para esperar el aviso verde |
| Borrar una foto en uso deja la imagen rota (el diálogo no comprueba si se usa, verificado en el código fuente) | Media | Abierto; no hay `operations` para la biblioteca de fotos |
| Colaborador podía borrar o renombrar servicios | Media | **Resuelto** con `operations` (403 en servidor) |
| Cambios firmados por `pages-cms[bot]` | Media | **Resuelto** con `identity: user` |
| Los errores se publican al instante (sin borrador ni revisión) | Media | Asumido; recuperación en ≈30 s desde GitHub |
| Dependencia del servicio alojado app.pagescms.org (gratuito, sin contrato) | Media | Alternativa: autoalojarlo (licencia MIT) |
| Historial público: todo lo subido queda visible para siempre | Media | Usar repositorio privado en producción |
| Avisos de mantenimiento en el workflow: acciones en Node.js 20 obsoletas y `ubuntu-latest` migrando a Ubuntu 26 desde el 19/10/2026 | Baja | Actualizar versiones de las acciones |

## 5. Limitaciones de Pages CMS (versión alojada, comprobadas)

1. **Subida máxima ≈3,2 MB por archivo.** El panel envía la foto codificada en base64 (verificado en su código fuente) y el servidor rechaza la petición con 413. Coincide con el límite de 4,5 MB por petición de las funciones de Vercel: es una deducción técnica, no un dato publicado por Pages CMS.
2. Sin redimensionado ni optimización de imágenes.
3. Sin borrador ni previsualización; sin restauración de versiones desde el panel.
4. Permisos solo por colección (`create`, `rename`, `delete`) y **iguales para todos los usuarios**: no hay roles. No existe restricción equivalente para borrar fotos de la biblioteca.
5. Interfaz, correos y errores en inglés; solo las etiquetas de los campos son personalizables.
6. Subida múltiple poco fiable (de 2 archivos subió 1).
7. Invitaciones que caducan o se consumen sin explicación.
8. Borrar una foto no comprueba si se está usando.

## 6. Soluciones técnicas viables

| Problema | Solución | Estado |
|---|---|---|
| Borrar o renombrar servicios | `operations: { delete: false, rename: false }` | ✅ Probado (403 en servidor) |
| Autoría de los cambios | `settings.commit.identity: user` + `{userEmail}` en las plantillas | ✅ Probado |
| Precios 0 o vacíos | `.min(1)` en el esquema de Astro: la compilación falla y la web no cambia | ✅ Probado |
| Peso servido de las fotos | Optimizar en la compilación: generar tamaños y WebP/AVIF. Astro solo optimiza imágenes de `src/` (las de `public/` se copian tal cual), así que habría que mover la biblioteca a `src/` con el helper `image()` o añadir un paso con `sharp` en el workflow | Por implementar |
| Límite de subida de 3,2 MB | a) Preajuste de exportación para Milena (JPG ~2500 px, ≤2,5 MB); b) autoalojar Pages CMS sin ese límite (por verificar); c) galerías en un servicio de imágenes externo | **Decisión pendiente** |
| Bloqueo silencioso tras un dato inválido | Avisos de fallo del workflow a AYAVEXA (correo o notificación) y procedimiento de corrección | Por configurar |
| Fotos huérfanas | Revisión periódica por AYAVEXA (script que liste archivos sin uso) | Por implementar |
| Idioma | Guía breve en español con capturas y glosario de botones | Por redactar |

## 7. Arquitectura propuesta para producción (análisis, sin acceso al hosting de Milena)

**Flujo:** Milena edita en Pages CMS → commit en un repositorio **privado** de GitHub → GitHub Actions compila Astro (con validación y optimización de fotos) → si todo va bien, sube la web estática por **SFTP** al hosting de IONOS. Si la compilación falla, no se sube nada.

- **SFTP en IONOS:** el hosting Linux de IONOS ofrece SFTP por el puerto 22 con un servidor propio por contrato; los contratos desde el 29/08/2024 crean cuentas «SFTP/SSH» y los anteriores usan un usuario SFTP principal. **Hay que confirmar qué tarifa tiene Milena** (Piensa Solutions pertenece a IONOS). Las credenciales irían como *secrets* del repositorio.
- **Automatización:** paso de despliegue en el mismo workflow (cliente SFTP en el runner, sin acciones de terceros). Riesgo: durante la subida la web puede quedar a medias unos segundos. Si hay SSH, mitigar subiendo a una carpeta nueva y cambiando el destino al final.
- **Dominio y correo:** si la web sigue en el mismo hosting, **no hace falta tocar los DNS**; el correo (registros MX) no se ve afectado. Antes de sustituir WordPress: exportación completa y copia de seguridad de ficheros y base de datos.
- **Redirecciones:** el hosting Linux de IONOS admite `.htaccess` con redirecciones 301 (`RedirectPermanent`). Habrá que inventariar las URLs actuales de WordPress (sitemap) y generar el `.htaccess` desde el repositorio.
- **Copias de seguridad:** el repositorio de Git es una copia completa con historial. IONOS además hace copias diarias del espacio web con unos 14 días de retención según su ayuda (la propia página indica también 6 días en su resumen; confirmar).
- **Formularios:** una web estática no procesa formularios. Opciones: el botón de WhatsApp actual, un script PHP mínimo en el propio hosting de IONOS (si el plan incluye PHP, como es habitual en su hosting Linux) o un servicio externo de formularios (comprobar precio y RGPD).
- **Fotos:** optimización en la compilación (sección 6) para que el visitante descargue cientos de KB y no varios MB.
- **Límites de GitHub para galerías** (documentación oficial): repositorio idealmente < 1 GB y < 5 GB «muy recomendado»; archivos > 100 MiB bloqueados (> 50 MiB avisa; 25 MiB desde el navegador). Cada foto subida y luego sustituida sigue ocupando espacio en el historial. Ejemplo: 400 fotos de 2,5 MB ≈ 1 GB. Si se usara GitHub Pages: sitio ≤ 1 GB y ancho de banda «blando» de 100 GB/mes. Con IONOS, el límite de la web lo marca su plan.

## 8. Costes

| Concepto | Coste | Fuente / nota |
|---|---|---|
| Pages CMS (versión alojada) | 0 € | Su web: «100% free», licencia MIT. Sin SLA |
| GitHub, repositorio privado | 0 € | Plan Free: 12 USD/mes de cómputo de Actions incluidos (≈2.000 min Linux). Cada publicación consume ≈1–2 min; de sobra para el uso previsto |
| GitHub, repositorio público | 0 € | Actions gratis en públicos, pero el contenido y su historial quedan visibles |
| Hosting, dominio y correo | El que ya paga Milena en IONOS | Plan y precio desconocidos: **por confirmar** |
| Formulario de contacto | 0 € (PHP propio) o el plan del servicio externo | Por decidir |
| Mantenimiento de AYAVEXA | Horas por definir | Dependencias de Astro y acciones, vigilancia del workflow, correcciones de contenido, gestión de fotos y accesos |

## 9. Comparación con WordPress

| Criterio | Astro + Pages CMS | WordPress |
|---|---|---|
| Editar precios, paquetes y textos | ✅ 3–5 pasos, formularios limitados a lo necesario | ✅ más opciones, más fácil equivocarse |
| Subir fotos de cámara | ❌ máx. ≈3,2 MB; hay que reducirlas antes | ✅ subida grande y redimensionado automático |
| Optimización de fotos | Hay que programarla | Integrada |
| Previsualizar antes de publicar | ❌ | ✅ |
| Restaurar versiones | Solo AYAVEXA, desde GitHub (≈30 s) | Revisiones en el propio editor |
| Seguridad y mantenimiento | Web estática: sin base de datos ni plugins que actualizar | Actualizaciones constantes y superficie de ataque mayor |
| Rendimiento | Excelente si las fotos se optimizan | Depende de plugins y caché |
| Riesgo de romper el diseño | Muy bajo: Milena no ve el diseño | Medio |
| Idioma del panel | Parcialmente en inglés | Español |
| Coste | 0 € de software; hosting actual | Hosting actual + plugins de pago habituales |
| Dependencias | GitHub + app.pagescms.org | Hosting propio |

**Por qué «APTO CON CONDICIONES» y no «APTO»:** en una fotógrafa, la tarea más frecuente es subir fotos, y es justo la que falla tal cual (pruebas de 1.2). **Por qué no «NO RECOMENDADO»:** todo lo demás funcionó en pruebas reales, y los tres problemas de seguridad encontrados (borrado de servicios, autoría anónima, precio 0) se han resuelto y verificado en este repositorio. El problema de las fotos tiene soluciones conocidas, pero cuestan trabajo o un paso extra para Milena.

## 10. Experiencia de Milena (evaluación)

| Operación | Pasos medidos | Puntos confusos |
|---|---|---|
| Cambiar un precio | 4: Servicios → Editar → escribir → Guardar | Ninguno relevante; esperar ~1 min para verlo |
| Editar un paquete | 4–5 (+2 para añadir uno: «Add an item») | Los paquetes se despliegan dentro del formulario largo |
| Modificar un texto | 3–4 | Ninguno |
| Ocultar una sesión | 3: Editar → interruptor «Visible» → Guardar | Un guardado se perdió una vez sin aviso |
| Crear una sesión | 5 como mínimo (Add an entry → nombre, descripción, precio → Guardar); más si añade paquetes y fotos | «Orden en el listado» puede no entenderse |
| Añadir o sustituir una foto | 7–8: Editar → bajar a la galería → abrir «Foto N» → quitar la actual (icono pequeño) → Select/Upload → elegir → texto alternativo → Guardar | **El más confuso:** las fotos están plegadas como «Foto 1/2/3» sin miniatura; hay que borrar antes de sustituir; la Foto 1 es también la portada; error «413» si pesa demasiado |
| Publicar | 0 pasos extra: se publica al guardar, sin usar GitHub | No hay aviso si la publicación falla |

**Interfaz en inglés:** es un inconveniente **moderado**, no bloqueante. Las etiquetas y ayudas de los campos están en español (las define AYAVEXA), pero los botones (Save, Add an item, Upload, Select, Delete), los avisos, los errores, el correo de invitación y la pantalla de acceso están en inglés. Con una guía de una página y un glosario de 10 palabras es asumible. El problema real son los mensajes de error («Failed to upload file: 413», «Invite unavailable»), que no explican qué hacer.

## 11. Decisiones a consultar con Milena

1. **Fotos:** ¿acepta exportar las fotos reducidas (≤2,5 MB) antes de subirlas, o necesita subir directamente desde cámara o móvil? Esta respuesta decide entre Pages CMS y WordPress.
2. ¿Cuántas fotos por galería y con qué frecuencia las actualiza?
3. ¿Quién será la titular de las cuentas (GitHub, IONOS, dominio)? ¿AYAVEXA o ella?
4. ¿Con qué correo accederá al panel? ¿Habrá más personas editando?
5. ¿Puede crear sesiones nuevas ella sola, o prefiere pedirlo a AYAVEXA?
6. ¿Le basta con que los cambios se publiquen al guardar, sin previsualización?
7. Datos de su contrato con IONOS/Piensa Solutions: tarifa, acceso SFTP/SSH, PHP, espacio y fecha de alta.
8. Formulario de contacto: ¿WhatsApp es suficiente o quiere un formulario? ¿Qué datos pedirá (RGPD)?
9. ¿Qué URLs del WordPress actual tienen tráfico o posicionamiento que haya que conservar?
10. Mantenimiento: qué incluye la cuota de AYAVEXA y el tiempo de respuesta si una publicación falla.
11. Textos legales, política de privacidad y licencias de las fotos.

---

## Anexo A. Configuración final del repositorio de pruebas

- `.pages.yml`: `operations` sin borrar ni renombrar servicios; `settings.commit.identity: user`; plantillas de commit con `{userEmail}`; `min: 1` en los precios.
- `src/content.config.ts`: `precio_desde` y `paquetes[].precio` con `.min(1)`.
- Workflow `Deploy`: `deploy` depende de `build`; si la compilación falla, no se publica nada (comprobado en los runs #34 y #35).
- Sitio sin enlaces rotos (4 páginas, 11 recursos con respuesta 200).

## Anexo B. Fuentes

- Pages CMS, documentación oficial: [Operations](https://pagescms.org/docs/configuration/content/operations/), [Collaborators](https://pagescms.org/docs/configuration/collaborators/), [Settings](https://pagescms.org/docs/configuration/settings/), [web](https://pagescms.org/) y código fuente en `github.com/pages-cms/pages-cms` (último commit consultado `6f4e860`, 08/06/2026).
- Vercel: [límite de 4,5 MB por petición (413)](https://vercel.com/kb/guide/how-to-bypass-vercel-body-size-limit-serverless-functions).
- GitHub: [límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [archivos grandes](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github), [facturación de Actions](https://docs.github.com/billing/managing-billing-for-your-products/managing-billing-for-github-actions).
- Astro: [imágenes](https://docs.astro.build/en/guides/assets).
- IONOS: [SFTP en hosting](https://www.ionos.com/help/hosting/setting-up-and-managing-ftp-access/connection-details-for-ftp/sftp-in-ionos-web-hosting/), [ayuda FTP/SSH](https://ionos.es/ayuda/hosting/ftp-ssh-archivos-web), [301 con .htaccess](https://www.ionos.com/help/domains/forwarding-a-domain/manually-setting-up-a-301-redirect-using-htaccess), [restauración de copias](https://www.ionos.ca/help/hosting/backup-restore-files/restoring-deletedoverwritten-files-for-linux-web-hosting-packages/).
- Fotos de prueba: Wikimedia Commons, licencia CC0 (W.carter, Iurie Nistor); imágenes generadas en el navegador; capturas y tarjetas propias de AYAVEXA.
