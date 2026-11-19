// One share card per page. Keys are the page path without slashes
// ("/" → "index", "/blog/foo/" → "blog/foo"); the card is served at /og/<key>.png.
// Pages that pass their own image (portfolio items, blog posts with `image:`,
// orchestra-instruments) never use these cards. A page missing here falls back
// to the neutral site card (DEFAULT_KEY).
import { getCollection } from 'astro:content';
import type { OgCard } from './ogCard';

export const DEFAULT_KEY = 'index';

const clip = (s: string | undefined, n = 110) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function ogKey(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, '').replace(/\/index\.html$|\.html$/, '') || DEFAULT_KEY;
}

let cache: Promise<Map<string, OgCard>> | undefined;

export function getOgCards(): Promise<Map<string, OgCard>> {
  cache ??= (async () => {
    const cards = new Map<string, OgCard>([
      ['index', { title: 'Jacopo Castellano', section: 'Software & Video Design', subtitle: 'Senior Software Engineer & Video Designer' }],
      ['about', { title: 'About', section: 'Jacopo Castellano' }],
      ['contact', { title: 'Contact', section: 'Jacopo Castellano' }],
      ['blog', { title: 'Blog', section: 'Jacopo Castellano', subtitle: 'Software engineering, video design, the creative process' }],
      ['portfolio', { title: 'Portfolio', section: 'Jacopo Castellano', subtitle: 'Video design, software and creative projects' }],
      ['store', { title: 'Store', section: 'Jacopo Castellano', subtitle: '3D model packs and animation packs' }],
      ['ai-digest/archive', { title: 'AI Digest Archive', section: 'AI Digest' }],
    ]);

    const digests = (await getCollection('aiDigest')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    cards.set('ai-digest', {
      title: 'AI Digest',
      section: 'Updated every 48 hours',
      subtitle: digests[0] ? `Latest edition: ${fmt(digests[0].data.date)}` : 'Everything you need to know about AI, in a 2-minute read',
    });
    for (const d of digests) {
      cards.set(`ai-digest/archive/${d.id}`, { title: `AI Digest — ${fmt(d.data.date)}`, section: 'AI Digest', subtitle: clip(d.data.points[0]?.headline) });
    }

    for (const post of await getCollection('blog', ({ data }) => !data.draft)) {
      cards.set(`blog/${post.id}`, { title: post.data.title, section: 'Blog', subtitle: fmt(post.data.date) });
    }
    return cards;
  })();
  return cache;
}

/** Share-image path for a page: its own card if registered, else the neutral site card. */
export async function ogImageFor(pathname: string): Promise<string> {
  const key = ogKey(pathname);
  return `/og/${(await getOgCards()).has(key) ? key : DEFAULT_KEY}.png`;
}
