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
  const site = new URL(context.site!).origin;

  // Full article in <content:encoded>, so feed readers and importers (Substack) get the whole text, not only the
  // summary. Root-relative links and images become absolute; the cover goes first; the last line credits the original.
  const absolute = (html: string) => html.replace(/(src|href)="\/(?!\/)/g, `$1="${site}/`);
  const content = (post: (typeof posts)[number]) => {
    const url = `${site}/blog/${post.id}/`;
    const cover = post.data.image ? `<p><img src="${post.data.image}" alt="${post.data.title.replace(/"/g, '&quot;')}"></p>` : '';
    const credit = `<p><em>Originally published at <a href="${url}">jacopocastellano.com</a>.</em></p>`;
    return absolute(cover + (post.rendered?.html ?? '') + credit);
  };

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
      content: content(post),
    })),
  });
}
