import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  return rss({
    title: 'Jacopo Castellano',
    description: 'Articles on AI, automation, and software.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
