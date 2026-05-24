import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    category: z.enum(['video', 'software', 'motion', 'installation']),
    featured: z.boolean().default(false),
    thumbnail: z.string(),
    images: z.array(z.string()).optional(),
    video: z.string().optional(),
    tags: z.array(z.string()).default([]),
    client: z.string().optional(),
    role: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const aiDigest = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/ai-digest' }),
  schema: z.object({
    date: z.coerce.date(),
    window: z.string().default('48h'),
    sources: z.number(),
    articles: z.number(),
    points: z.array(
      z.object({
        headline: z.string(),
        body: z.string(),
        sources: z.array(z.object({ name: z.string(), url: z.string() })),
      })
    ),
  }),
});

export const collections = { portfolio, blog, aiDigest };
