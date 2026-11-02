// @ts-check
import { defineConfig } from 'astro/config';

// `site` se sobreescribe en CI con la URL real del despliegue (variable SITE_URL).
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
});
