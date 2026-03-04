// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jacopocastellano.com',
  integrations: [sitemap({
    serialize(item) {
      item.lastmod = new Date();
      return item;
    },
  })],
  build: {
    // Generate clean URLs without .html extension
    format: 'directory',
  },
});
