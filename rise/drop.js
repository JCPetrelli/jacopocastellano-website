// A drop flying out of the vanishing point towards a spot on a wall. It speeds up and
// grows as it comes closer, the way something approaching the camera would.
class Drop {
  constructor(target) {
    this.target = target;
    const jitter = CONFIG.inner * unit() * 0.6;
    this.x0 = width / 2 + random(-jitter, jitter);
    this.y0 = height / 2 + random(-jitter, jitter);
    this.x = this.x0;
    this.y = this.y0;
    this.k = 0;
    this.age = 0;
    this.frames = random(...CONFIG.drop.frames);
    this.angle = atan2(target.y - this.y0, target.x - this.x0);
    this.color = pickColor();
    this.landed = false;
  }

  update() {
    this.age++;
    const p = min(1, this.age / this.frames);
    this.k = p * p; // accelerating on screen: perspective
    this.x = lerp(this.x0, this.target.x, this.k);
    this.y = lerp(this.y0, this.target.y, this.k);
    if (p >= 1) this.landed = true;
  }

  draw() {
    const d = CONFIG.drop.size * lerp(0.15, this.target.s, this.k);
    noStroke();
    fill(this.color);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    ellipse(0, 0, d * 1.5, d * 0.8); // stretched along its flight
    pop();
  }
}
