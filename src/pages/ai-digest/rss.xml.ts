import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// Escape text destined for an HTML attribute or body inside the RSS description.
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET(context: APIContext) {
  const editions = (await getCollection('aiDigest')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: '🤖 AI Digest — Jacopo Castellano',
    description:
      'The 6 most important things happening in AI right now, deduplicated across dozens of sources. A ~2-minute read, updated every 48 hours.',
    site: context.site!,
    items: editions.map((edition) => {
      const { date, window, sources, points } = edition.data;
      const day = date.toISOString().slice(0, 10);

      // The optional sanitize-html/linkedom deps aren't installed, so we render
      // the digest as HTML inside `description` (rendered by virtually every
      // reader) rather than the `content` field, which would require them.
      const body = points
        .map((p, i) => {
          const links = p.sources
            .map((s) => `<a href="${esc(s.url)}">${esc(s.name)}</a>`)
            .join(' &middot; ');
          return (
            `<p><strong>${i + 1}. ${esc(p.headline)}</strong> ${esc(p.body)}<br>` +
            `<em>Sources:</em> ${links}</p>`
          );
        })
        .join('\n');

      return {
        title: `AI Digest — ${day}`,
        link: `/ai-digest/archive/${edition.id}/`,
        pubDate: date,
        description:
          `<p><em>${points.length} points &middot; ${window} window &middot; ${sources} sources.</em></p>\n${body}`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
