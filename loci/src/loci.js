// Loci hints: floating numbers over the places to hang images on, in walking
// order. Read from assets/<palace>/loci.json, copied there by the exporter
// from palaces/<palace>/loci.json. Toggled with L.
import * as THREE from 'three';

const SIZE = 0.42; // metres
const BOB = 0.05; // metres of float up and down
const FLASH = 2; // seconds a number shows when the tutorial flashes it
const SERIF = '"Cormorant Garamond", Georgia, "Times New Roman", serif';
// Numerals need lining figures (Cormorant's old-style 1 reads as I), which a
// canvas can't switch on, so they use Playfair Display.
const NUMERAL = '"Playfair Display", Georgia, serif';

// Every fifth locus gets a pointing hand (the manuscript manicule) and every
// tenth a "Decimus", as the Rhetorica ad Herennium (III.18) marks them, so the
// learner can count along. Shape tells them apart too, not only colour.
const STYLES = {
  plain: { fill: 'rgba(14, 12, 10, 0.62)', ring: '#d6b278', text: '#f3e9d8' },
  hand: { fill: 'rgba(214, 178, 120, 0.94)', ring: '#f6ecd9', text: '#17120c' },
  decimus: { fill: 'rgba(62, 24, 70, 0.9)', ring: '#d6b278', text: '#f3e9d8', double: true },
};

function badge(n) {
  const kind = n % 10 === 0 ? 'decimus' : n % 5 === 0 ? 'hand' : 'plain';
  const style = STYLES[kind];
  const px = 256;
  const c = px / 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  const g = canvas.getContext('2d');
  g.beginPath();
  g.arc(c, c, c - 10, 0, Math.PI * 2);
  g.fillStyle = style.fill;
  g.fill();
  g.lineWidth = 5;
  g.strokeStyle = style.ring;
  g.stroke();
  if (style.double) {
    g.beginPath();
    g.arc(c, c, c - 24, 0, Math.PI * 2);
    g.lineWidth = 2.5;
    g.stroke();
  }
  g.fillStyle = style.text;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  let y = c + 6;
  if (kind !== 'plain') {
    // A small mark above the number: the manicule, or the Roman X.
    g.font = kind === 'hand' ? `66px "Apple Symbols", "Segoe UI Symbol", ${SERIF}` : `500 40px ${SERIF}`;
    g.fillText(kind === 'hand' ? '☞' : 'X'.repeat(n / 10), c, 64);
    y = c + 26;
  }
  g.font = `500 ${kind !== 'plain' ? 84 : n > 9 ? 96 : 112}px ${NUMERAL}`;
  g.fillText(String(n), c, y);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// A soft round glow, shared by every marker (shown on the active one).
let haloTexture = null;
function halo() {
  if (haloTexture) return haloTexture;
  const px = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  const g = canvas.getContext('2d');
  const grad = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  grad.addColorStop(0, 'rgba(255, 222, 160, 0.55)');
  grad.addColorStop(0.45, 'rgba(214, 178, 120, 0.18)');
  grad.addColorStop(1, 'rgba(214, 178, 120, 0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, px, px);
  haloTexture = new THREE.CanvasTexture(canvas);
  haloTexture.colorSpace = THREE.SRGBColorSpace;
  return haloTexture;
}

// Make sure the numerals' web font is in before drawing badges on canvas.
export async function loadMarkerFont() {
  try { await Promise.all([document.fonts.load(`500 100px ${SERIF}`), document.fonts.load(`500 100px ${NUMERAL}`)]); } catch { /* fallback serif */ }
}

// A palace's loci.json ({loci, portals}), or null for a palace without one.
// no-cache: it is edited by hand between exports.
export async function loadLoci(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  return res.ok ? res.json() : null;
}

export class LociHints {
  // `fromBlender` maps a Blender [x, y, z] to a three.js Vector3.
  constructor(loci, fromBlender) {
    this.group = new THREE.Group();
    this.group.visible = this.shown = false;
    this.flashUntil = 0;
    this.focus = 0; // a number kept lit on its own (Play), 0 for none
    // How the focused locus shows in Play: 'numbers' (badge, thread, halo),
    // 'glow' (only the halo: a faint, unnumbered cue) or 'none'.
    this.style = 'numbers';
    this.markers = loci.map((locus, i) => {
      const map = badge(i + 1);
      // Two sprites per number: a solid one hidden by walls, and a faint one
      // drawn through them, so the whole route stays readable from anywhere.
      const front = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false }));
      const behind = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, opacity: 0.22, depthTest: false, depthWrite: false }));
      const marker = new THREE.Group();
      behind.renderOrder = 2;
      front.renderOrder = 3;
      for (const sprite of [behind, front]) {
        sprite.scale.setScalar(SIZE);
        marker.add(sprite);
      }
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.scale.setScalar(SIZE * 2.6);
      glow.renderOrder = 1;
      glow.visible = false;
      marker.add(glow);
      marker.position.copy(fromBlender(locus.at));
      marker.userData = { base: marker.position.y, label: locus.label, n: i + 1, glow, front };
      this.group.add(marker);
      return marker;
    });
  }

  // A fine thread of light from each number down to the thing it marks.
  // `below(pos)` returns the height of the first surface under pos, or null.
  addThreads(below) {
    const mat = new THREE.LineBasicMaterial({ color: 0xd6b278, transparent: true, opacity: 0.32, depthWrite: false });
    for (const m of this.markers) {
      const top = m.position.clone();
      const y = below(top);
      if (y === null || top.y - y < SIZE) continue;
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -SIZE * 0.55, 0), new THREE.Vector3(0, y - top.y + 0.02, 0)]);
      const line = new THREE.Line(geo, mat);
      line.renderOrder = 1;
      m.add(line);
      m.userData.thread = line;
    }
  }

  // `visible` is the hints' own state (key L, or the tutorial); a flashed
  // number shows on its own for a moment even while they are off.
  get visible() { return this.shown; }

  set visible(on) { this.shown = on; }

  toggle() {
    this.shown = !this.shown;
    return this.shown;
  }

  flash(n) {
    this.flashN = n;
    this.flashUntil = performance.now() + FLASH * 1000;
  }

  update(time) {
    const flashing = this.flashUntil > performance.now();
    this.group.visible = this.shown || flashing || this.focus > 0;
    if (!this.group.visible) return;
    for (const m of this.markers) {
      const focused = m.userData.n === this.focus;
      m.visible = this.shown || (focused && this.style !== 'none') || (flashing && m.userData.n === this.flashN);
      const bare = focused && !this.shown && this.style === 'glow';
      for (const c of m.children) if (c !== m.userData.glow) c.visible = !bare;
      const active = m.userData.n === this.focus;
      // The thread hangs from a fixed point, so only the active number bobs.
      m.position.y = m.userData.base + (active ? Math.sin(time * 1.6) * BOB : 0);
      m.userData.glow.visible = active;
      if (active) {
        const pulse = 1 + Math.sin(time * 2.2) * 0.08;
        m.userData.glow.scale.setScalar(SIZE * 2.6 * pulse);
      }
      m.userData.front.scale.setScalar(SIZE * (active ? 1.18 : 1));
    }
  }
}
