// Rise, as the home page hero background: black-and-white rain that falls upwards and
// sideways, out of the centre and onto the walls of a rectangular tunnel.
// The canvas fills #rise-bg; clicking inside the hero sends a drop to the wall under
// the cursor. Drawing stops while the hero is off screen, and a single still frame is
// shown to visitors who prefer reduced motion.

let drops = [];
let ripples = [];
let splashes = [];
let host;

function setup() {
  host = document.getElementById('rise-bg');
  const c = createCanvas(host.clientWidth, host.clientHeight);
  c.parent(host);
  pixelDensity(min(2, displayDensity()));
  // pre-simulate so the first frame is already raining
  for (let i = 0; i < CONFIG.warmupFrames; i++) step(1000 / 60);

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    render();
    noLoop();
    return;
  }
  new IntersectionObserver(([e]) => (e.isIntersecting ? loop() : noLoop())).observe(host);
  host.closest('.hero').addEventListener('click', (ev) => {
    if (ev.target.closest('a, button')) return;
    const r = host.getBoundingClientRect();
    const pt = wallPointAt(ev.clientX - r.left, ev.clientY - r.top);
    if (pt) drops.push(new Drop(pt));
  });
}

function draw() {
  step(min(deltaTime, 50));
  render();
}

function step(dtMs) {
  let n = CONFIG.spawnPerSecond * (dtMs / 1000);
  while (random() < n) { drops.push(new Drop(randomWallPoint())); n--; }

  for (const r of ripples) r.update();
  for (const d of drops) {
    d.update();
    if (d.landed) land(d);
  }
  for (const s of splashes) s.update();

  drops = drops.filter(d => !d.landed);
  ripples = ripples.filter(r => !r.dead);
  splashes = splashes.filter(s => !s.dead);
}

function render() {
  background(CONFIG.background);
  drawTunnelEdges();
  // everything is cut at the tunnel mouth, so the frame stays a clean rectangle
  const oy = CONFIG.outer * unit(), ox = oy * aspect();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(width / 2 - ox, height / 2 - oy, ox * 2, oy * 2);
  drawingContext.clip();
  // far things first so near ones overlap them
  ripples.sort((a, b) => a.s - b.s);
  for (const r of ripples) r.draw();
  drops.sort((a, b) => a.k - b.k);
  for (const d of drops) d.draw();
  for (const s of splashes) s.draw();
  drawingContext.restore();
}

function land(d) {
  ripples.push(new Ripple(d.target, d.color));
  if (random() < 0.7) splashes.push(new Splash(d.target));
}

function windowResized() {
  resizeCanvas(host.clientWidth, host.clientHeight);
  // wall points are cached in screen space, so start the rain afresh at the new size
  drops = []; ripples = []; splashes = [];
  for (let i = 0; i < CONFIG.warmupFrames; i++) step(1000 / 60);
}
