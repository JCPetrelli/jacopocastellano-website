// Expanding rings where a drop landed. Each ring is a real circle on the tunnel surface
// (perimeter coordinate p across, depth Z along), projected point by point — so a ring
// that reaches a corner folds onto the adjacent wall instead of floating past it.
const RING_POINTS = 96;

class Ripple {
  constructor(pt, col) {
    this.p = pt.p;
    this.Z = pt.Z;
    this.s = pt.s;
    this.col = color(col);
    this.age = 0;
    this.life = CONFIG.ripple.life * random(0.8, 1.2);
    this.maxR = CONFIG.ripple.maxRadius * random(0.7, 1.3);
    // trailing, slightly off-centre rings give the doubled outline
    const n = floor(random(CONFIG.ripple.rings[0], CONFIG.ripple.rings[1] + 1));
    this.rings = Array.from({ length: n }, (_, i) => ({
      lag: i * random(0.04, 0.09),
      dp: random(-0.015, 0.015),
      dz: random(-0.03, 0.03),
    }));
  }

  get dead() { return this.age >= this.life; }

  update() { this.age++; }

  draw() {
    const t = this.age / this.life;
    noFill();
    strokeWeight(max(1, 2 * this.s));
    for (const ring of this.rings) {
      const k = constrain(t - ring.lag, 0, 1);
      if (k <= 0) continue;
      const r = this.maxR * easeOutCubic(k);
      this.col.setAlpha(255 * pow(1 - k, 0.8));
      stroke(this.col);
      beginShape();
      for (let i = 0; i < RING_POINTS; i++) {
        const a = TAU * i / RING_POINTS;
        const [x, y] = project(this.p + ring.dp + r * cos(a), this.Z + ring.dz + r * sin(a));
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
}

function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}
