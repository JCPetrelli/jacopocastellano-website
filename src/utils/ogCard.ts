// Renders a 1200×630 share card (Open Graph / Twitter) as PNG.
// satori turns the layout into an SVG with text as paths, sharp rasterises it,
// so the result does not depend on fonts installed on the build machine.
import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) =>
  readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 300 | 400; style: 'normal' }[]> | undefined;
function loadFonts() {
  fontsPromise ??= Promise.all([
    font('inter', 'inter-latin-300-normal.woff'),
    font('inter', 'inter-latin-400-normal.woff'),
  ]).then(([inter300, inter400]) => [
    { name: 'Inter', data: inter300, weight: 300, style: 'normal' },
    { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
  ]);
  return fontsPromise;
}

export interface OgCard {
  title: string;
  section?: string;
  subtitle?: string;
}

// Same look as the site: white, black ink, Inter Light, hairlines, one pill.
const C = { bg: '#ffffff', text: '#000000', muted: '#6d6d6d', hairline: 'rgba(0,0,0,0.12)' };

function titleSize(title: string) {
  if (title.length <= 14) return 128;
  if (title.length <= 36) return 104;
  if (title.length <= 60) return 80;
  if (title.length <= 90) return 64;
  return 54;
}

// Minimal hyperscript helper so this stays a plain .ts file (no JSX).
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string | null)[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.filter((c) => c !== null) },
});

// No em dashes on the cards: " — " becomes ", ", a bare "—" becomes "-".
const noEmDash = (s?: string) => s?.replace(/\s*—\s*/g, (m) => (m.trim() === m ? '-' : ', '));

export async function renderOgCard(card: OgCard): Promise<Buffer> {
  const title = noEmDash(card.title)!;
  const section = noEmDash(card.section);
  const subtitle = noEmDash(card.subtitle);
  const size = titleSize(title);
  // satori adds padding on top of width/height, so the content box is sized explicitly.
  const tree = h(
    'div',
    { width: 1200 - 144, height: 630 - 112, flexDirection: 'column', justifyContent: 'space-between', padding: '56px 72px', background: C.bg, color: C.text, fontFamily: 'Inter', fontWeight: 400 },
    h(
      'div',
      { justifyContent: 'space-between', alignItems: 'center', fontSize: 22 },
      h('div', { width: 340 }, 'Jacopo Castellano'),
      h('div', { fontSize: 22, letterSpacing: 1 }, '..:::: JC ::::..'),
      h('div', { width: 340, justifyContent: 'flex-end', fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: C.muted }, 'jacopocastellano.com')
    ),
    h(
      'div',
      { flexDirection: 'column' },
      h('div', { fontWeight: 300, fontSize: size, lineHeight: 1.02, letterSpacing: -size * 0.035, maxWidth: 1056 }, title),
      subtitle ? h('div', { marginTop: 24, fontSize: 28, fontWeight: 300, color: C.muted, maxWidth: 1000 }, subtitle) : null
    ),
    h(
      'div',
      { alignItems: 'center', borderTop: `1px solid ${C.hairline}`, paddingTop: 24 },
      h(
        'div',
        { border: `1px solid ${C.text}`, borderRadius: 75, padding: '8px 22px', fontSize: 16, letterSpacing: 2, textTransform: 'uppercase' },
        section ?? 'Software & Video Design'
      )
    )
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
