import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  // Strict readers (e.g. Feedly) require an atom:link rel="self" to subscribe.
  const selfUrl = new URL('/rss.xml', context.site).href;

  return rss({
    title: 'Jacopo Castellano Blog',
    description:
      'Senior Software Engineer & Video Designer crafting elegant digital experiences at the intersection of code and visual storytelling.',
    site: context.site!,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>`,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
