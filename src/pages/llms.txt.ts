// llms.txt (https://llmstxt.org): a plain-text map of the site for AI tools.
// Built from the content collections, so new posts appear on the next deploy.
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

const line = (title: string, url: string, note?: string) =>
  `- [${title}](${url})${note ? `: ${note.replace(/\s+/g, ' ').trim()}` : ''}`;

export async function GET(context: APIContext) {
  const site = context.site!.href.replace(/\/$/, '');
  const byDate = <T extends { data: { date: Date } }>(a: T, b: T) =>
    b.data.date.valueOf() - a.data.date.valueOf();

  const blog = (await getCollection('blog', ({ data }) => !data.draft)).sort(byDate);
  const portfolio = (await getCollection('portfolio')).sort(byDate);
  const digests = (await getCollection('aiDigest')).sort(byDate);

  const text = [
    '# Jacopo Castellano',
    '',
    '> Personal site of Jacopo Castellano, a Berlin-based senior software engineer and video designer. ' +
      'It holds his blog on software, AI and creative coding, a portfolio of software, video, motion and ' +
      'installation work, a free AI news digest updated every 48 hours, and a store of 3D model and animation packs.',
    '',
    '## Main pages',
    line('Home', `${site}/`),
    line('About', `${site}/about/`, 'Background, skills and experience.'),
    line('Contact', `${site}/contact/`),
    line('Blog', `${site}/blog/`, 'All articles, newest first. RSS: ' + `${site}/rss.xml`),
    line('Portfolio', `${site}/portfolio/`),
    line('AI Digest', `${site}/ai-digest/`, 'The latest AI developments in a 2-minute read. RSS: ' + `${site}/ai-digest/rss.xml`),
    line('Store', `${site}/store/`, '3D model packs and animation packs.'),
    '',
    '## Blog',
    ...blog.map((p) => line(p.data.title, `${site}/blog/${p.id}/`, p.data.description)),
    '',
    '## Portfolio',
    ...portfolio.map((p) => line(p.data.title, `${site}/portfolio/${p.id}/`, p.data.description)),
    '',
    '## Optional',
    line('AI Digest archive', `${site}/ai-digest/archive/`),
    ...digests.slice(0, 10).map((d) => line(`AI Digest ${d.id}`, `${site}/ai-digest/archive/${d.id}/`)),
    line('Sitemap', `${site}/sitemap-index.xml`),
    '',
  ].join('\n');

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
