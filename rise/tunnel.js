// Geometry of the tunnel, in true perspective.
// World: a rectangular tube with side walls at X = ±A and ceiling / floor at Y = ±1,
// where A = width / height, running away from the camera along Z. Screen: X, Y scaled by
// focal / Z around the centre, so the near end fills the outer rectangle and the far end
// shrinks to the inner one.
//
// Around the tube's cross-section we use one perimeter coordinate p in [0, 4A + 4),
// clockwise from the top-left corner: top 0–2A, right 2A–2A+2, bottom 2A+2–4A+2,
// left 4A+2–4A+4. Distances along p are true world distances, so a ripple stays round
// on every wall, and one that grows past a corner wraps onto the neighbouring wall.
//   axis 'h'  ceiling / floor;  axis 'v'  side walls
//   out       unit vector from the room into the wall (the "down" of that wall)
//   p(u)      perimeter coordinate of a point at u in [-1, 1] across the wall
const WALLS = {
  top:    { axis: 'h', out: [0, -1], p: u => aspect() * (u + 1) },
  right:  { axis: 'v', out: [1, 0],  p: u => 2 * aspect() + 1 + u },
  bottom: { axis: 'h', out: [0, 1],  p: u => 2 * aspect() + 2 + aspect() * (1 - u) },
  left:   { axis: 'v', out: [-1, 0], p: u => 4 * aspect() + 3 - u },
};

// vertical scale of the tunnel; the horizontal one is aspect() times larger
function unit() { return height; }
function aspect() { return width / height; }

// focal length chosen so the near edge sits at Z = 1 / flatten: a ripple there is
// `flatten` times as deep as it is wide on screen
function focal() {
  return CONFIG.outer * unit() / CONFIG.flatten;
}

// half-height of the tunnel's cross-section on screen at screen-depth z (0 = near, 1 = far)
function halfSizeAt(z) {
  return lerp(CONFIG.outer, CONFIG.inner, z) * unit();
}

// the world point (X, Y) on the tube's cross-section at perimeter coordinate p (wraps around)
function perimeterXY(p) {
  const A = aspect(), P = 4 * A + 4;
  p = ((p % P) + P) % P;
  if (p < 2 * A) return [-A + p, -1];
  p -= 2 * A;
  if (p < 2) return [A, -1 + p];
  p -= 2;
  if (p < 2 * A) return [A - p, 1];
  p -= 2 * A;
  return [-A, 1 - p];
}

function project(p, Z) {
  const [X, Y] = perimeterXY(p);
  const k = focal() / Z;
  return [width / 2 + X * k, height / 2 + Y * k];
}

// point on a wall: u in [-1, 1] runs across it, z in [0, 1] into the distance (screen-linear)
function wallPoint(name, u, z) {
  const p = WALLS[name].p(u);
  const Z = focal() / halfSizeAt(z);
  const [x, y] = project(p, Z);
  return { wall: name, p, Z, x, y, s: lerp(CONFIG.depthScale[1], CONFIG.depthScale[0], z) };
}

function randomWallPoint() {
  return wallPoint(random(CONFIG.walls), random(-1, 1), random(0.02, 0.95));
}

// inverse of wallPoint for a screen position, or null if it isn't on an active wall
function wallPointAt(mx, my) {
  const A = aspect();
  const dx = (mx - width / 2) / A, dy = my - height / 2;
  const name = abs(dy) > abs(dx) ? (dy < 0 ? 'top' : 'bottom') : (dx < 0 ? 'left' : 'right');
  if (!CONFIG.walls.includes(name)) return null;
  const hs = max(abs(dx), abs(dy));
  if (hs === 0) return null;
  const z = constrain(map(hs / unit(), CONFIG.outer, CONFIG.inner, 0, 1), 0, 1);
  const u = WALLS[name].axis === 'h' ? dx / hs : dy / hs;
  return wallPoint(name, u, z);
}

function drawTunnelEdges() {
  if (!CONFIG.edgeAlpha) return;
  const cx = width / 2, cy = height / 2, A = aspect();
  const o = CONFIG.outer * unit(), i = CONFIG.inner * unit();
  stroke(255, CONFIG.edgeAlpha);
  strokeWeight(1);
  noFill();
  rectMode(RADIUS);
  rect(cx, cy, o * A, o);
  rect(cx, cy, i * A, i);
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    line(cx + sx * i * A, cy + sy * i, cx + sx * o * A, cy + sy * o);
  }
}
