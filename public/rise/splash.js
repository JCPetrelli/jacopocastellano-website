// Streaks and droplets thrown off a wall back into the tunnel. Gravity here points
// into the wall — in this world things fall outwards.
class Splash {
  constructor(pt) {
    const [ox, oy] = WALLS[pt.wall].out;
    this.gx = ox;           // gravity direction
    this.gy = oy;
    this.parts = [];
    const { streaks, dots } = CONFIG.splash;
    const nStreaks = floor(random(streaks[0], streaks[1] + 1) * pt.s);
    const nDots = floor(random(dots[0], dots[1] + 1));
    for (let i = 0; i < nStreaks; i++) this.parts.push(this.spawn(pt, 'streak'));
    for (let i = 0; i < nDots; i++) this.parts.push(this.spawn(pt, 'dot'));
  }

  spawn(pt, kind) {
    // mostly straight off the wall (-out), fanned along it (tangent)
    const g = randomGaussian(0, 0.55);
    const speed = random(3, kind === 'dot' ? 7 : 10) * pt.s;
    const nx = -this.gx, ny = -this.gy;   // inward normal
    const tx = abs(ny), ty = abs(nx);     // tangent along the wall
    return {
      kind, x: pt.x, y: pt.y, s: pt.s,
      vx: (nx * cos(g) + tx * sin(g) * 1.3) * speed,
      vy: (ny * cos(g) + ty * sin(g) * 1.3) * speed,
      col: color(pickColor()),
      age: 0,
      life: CONFIG.splash.life * random(0.6, 1.3),
    };
  }

  get dead() { return this.parts.length === 0; }

  update() {
    const g = CONFIG.splash.gravity;
    for (const p of this.parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx = (p.vx + this.gx * g * p.s) * 0.97;
      p.vy = (p.vy + this.gy * g * p.s) * 0.97;
      p.age++;
    }
    this.parts = this.parts.filter(p => p.age < p.life);
  }

  draw() {
    for (const p of this.parts) {
      p.col.setAlpha(255 * (1 - p.age / p.life));
      if (p.kind === 'streak') {
        stroke(p.col);
        strokeWeight(max(1, 1.5 * p.s));
        line(p.x, p.y, p.x - p.vx * 3.5, p.y - p.vy * 3.5);
      } else {
        noStroke();
        fill(p.col);
        circle(p.x, p.y, 3.5 * p.s);
      }
    }
  }
}
