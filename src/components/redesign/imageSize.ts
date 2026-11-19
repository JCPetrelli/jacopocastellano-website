// JC-827 — real pixel size of an image in public/, read once at build time.
import sharp from 'sharp';
import path from 'node:path';

const cache: Map<string, { w: number; h: number } | null> = ((globalThis as any).__imgSizeCache ??= new Map());

export async function imageSize(src: string) {
  if (cache.has(src)) return cache.get(src)!;
  let v: { w: number; h: number } | null = null;
  try {
    const m = await sharp(path.join(process.cwd(), 'public', decodeURI(src.split('?')[0]))).metadata();
    if (m.width && m.height) v = { w: m.width, h: m.height };
  } catch { v = null; }
  cache.set(src, v);
  return v;
}
