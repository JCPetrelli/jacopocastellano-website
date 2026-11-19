// JC-827 — every redesign link goes through here. Going live: P = '' and LIVE = true
// (LIVE turns on indexing, Google Analytics and outbound-click tracking).
export const P = '';
export const LIVE = true;
export const nav = [
  { href: `${P}/portfolio/`, label: 'Work' },
  { href: `${P}/blog/`, label: 'Writing' },
  { href: `${P}/ai-digest/`, label: 'AI Digest' },
  { href: `${P}/store/`, label: 'Store' },
  { href: `${P}/about/`, label: 'About' },
  { href: `${P}/contact/`, label: 'Contact' },
];
export const categoryLabel: Record<string, string> = {
  video: 'Video design', software: 'Software', motion: 'Motion design', installation: 'Installation',
};
export const fmtDay = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
export const fmtLong = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
export const social = [
  { href: 'https://www.linkedin.com/in/jacopocastellano/', label: 'LinkedIn' },
  { href: 'https://github.com/JCPetrelli', label: 'GitHub' },
  { href: 'https://medium.com/@jacopocastellano', label: 'Medium' },
  { href: 'https://www.youtube.com/channel/UCiVwuK0LOAPZWaXvhNjIB0g', label: 'YouTube' },
  { href: 'https://vimeo.com/jacopocastellano', label: 'Vimeo' },
  { href: 'https://www.instagram.com/jcastellanodesign/', label: 'Instagram' },
  { href: 'https://x.com/vjcastellano', label: 'X' },
  { href: 'https://www.pinterest.de/jcastellanodesign/boards/', label: 'Pinterest' },
];
