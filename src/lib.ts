import sitio from './data/sitio.json';

// Antepone BASE_URL a rutas absolutas (necesario en GitHub Pages de proyecto).
export const url = (p: string) =>
  p.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + p : p;

export const euros = (n: number) => `${n.toLocaleString('es-ES')} €`;

export const whatsapp = (texto: string) =>
  `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`;
