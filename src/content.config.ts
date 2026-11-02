import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/servicios' }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
    precio_desde: z.number().min(0),
    visible: z.boolean().default(true),
    orden: z.number().default(100),
    paquetes: z.array(z.object({
      nombre: z.string(),
      precio: z.number().min(0),
      incluye: z.string(),
    })).default([]),
    galeria: z.array(z.object({
      imagen: z.string(),
      alt: z.string().default(''),
    })).default([]),
    seo: z.object({
      titulo: z.string().optional(),
      descripcion: z.string().optional(),
    }).default({}),
  }),
});

export const collections = { servicios };
