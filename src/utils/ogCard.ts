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

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 600; style: 'normal' }[]> | undefined;
function loadFonts() {
  fontsPromise ??= Promise.all([
    font('inter', 'inter-latin-400-normal.woff'),
    font('inter', 'inter-latin-600-normal.woff'),
    font('cormorant-garamond', 'cormorant-garamond-latin-600-normal.woff'),
  ]).then(([inter400, inter600, serif600]) => [
    { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
    { name: 'Inter', data: inter600, weight: 600, style: 'normal' },
    { name: 'Cormorant Garamond', data: serif600, weight: 600, style: 'normal' },
  ]);
  return fontsPromise;
}

export interface OgCard {
  title: string;
  section?: string;
  subtitle?: string;
}

const C = { bg: '#0a0a0a', text: '#f5f5f5', muted: '#a0a0a0', subtle: '#666666', border: '#222222' };

function titleSize(title: string) {
  if (title.length <= 28) return 96;
  if (title.length <= 50) return 80;
  if (title.length <= 80) return 64;
  return 54;
}

// Minimal hyperscript helper so this stays a plain .ts file (no JSX).
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string | null)[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.filter((c) => c !== null) },
});

export async function renderOgCard({ title, section, subtitle }: OgCard): Promise<Buffer> {
  const tree = h(
    'div',
    { width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: C.bg, fontFamily: 'Inter' },
    h(
      'div',
      { fontSize: 24, fontWeight: 600, letterSpacing: 4, color: C.muted, textTransform: 'uppercase' },
      section ?? 'Jacopo Castellano'
    ),
    h(
      'div',
      { flexDirection: 'column' },
      h('div', { fontFamily: 'Cormorant Garamond', fontWeight: 600, fontSize: titleSize(title), lineHeight: 1.08, color: C.text, maxWidth: 1040 }, title),
      subtitle ? h('div', { marginTop: 28, fontSize: 30, color: C.muted }, subtitle) : null
    ),
    h(
      'div',
      { justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 28, fontSize: 24, color: C.subtle },
      h('div', {}, 'Jacopo Castellano'),
      h('div', {}, 'jacopocastellano.com')
    )
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
