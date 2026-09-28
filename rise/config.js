// Tunables for "rise" on the home page hero: rain in reverse, seen from inside a
// rectangular tunnel whose mouth has the same proportions as the hero.
const CONFIG = {
  background: '#000000',
  palette: ['#ffffff', '#e2e2e2', '#bdbdbd', '#8c8c8c'],

  walls: ['top', 'bottom', 'left', 'right'],  // drop any to leave that side open
  outer: 0.48,      // near rectangle half-size, as a fraction of the canvas width and height
  inner: 0.06,      // far rectangle half-size (the vanishing point)
  edgeAlpha: 26,    // faint tunnel edges; 0 hides them
  depthScale: [0.3, 1.25], // size multiplier at the far and near edge of a wall

  spawnPerSecond: 14,
  warmupFrames: 240,
  flatten: 0.3,     // ripple depth / width at the near edge — sets the perspective

  drop: { frames: [45, 80], size: 7 },
  ripple: { maxRadius: 0.22, life: 130, rings: [2, 3] }, // radius in side-wall half-heights
  splash: { streaks: [8, 16], dots: [4, 9], gravity: 0.3, life: 40 },
};

function pickColor() {
  return random(CONFIG.palette);
}
