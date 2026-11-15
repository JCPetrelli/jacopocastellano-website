// The loading screen: a large percentage in the middle of the page, a hairline
// bar and one line saying what is happening. The download of the palace is
// most of the wait, so bytes fill the first 85%; unpacking and the camera
// poses fill the rest. The number only ever goes up and eases towards its
// target, so a burst of bytes reads as a steady count, not a jump.

const DOWNLOAD = 0.85; // share of the bar given to the download
const MB = 1024 * 1024;

export class Loader {
  constructor(el) {
    this.el = el;
    this.num = el.querySelector('.ld-num');
    this.bar = el.querySelector('.ld-fill');
    this.label = el.querySelector('.ld-label');
    this.detail = el.querySelector('.ld-detail');
    this.target = 0;
    this.shown = 0;
    this.files = new Map(); // url -> { loaded, total }
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  // Move the bar to `fraction` (0..1); never backwards.
  set(fraction, label) {
    this.target = Math.max(this.target, Math.min(1, fraction));
    if (label) this.label.textContent = label;
  }

  // A progress callback for one download; all files share the download share.
  track(url, fallbackBytes) {
    this.files.set(url, { loaded: 0, total: fallbackBytes });
    return (e) => {
      const f = this.files.get(url);
      f.loaded = e.loaded;
      if (e.lengthComputable && e.total) f.total = e.total;
      else f.total = Math.max(f.total, f.loaded * 1.05); // no size: keep some room ahead
      let loaded = 0;
      let total = 0;
      for (const v of this.files.values()) { loaded += Math.min(v.loaded, v.total); total += v.total; }
      this.set(DOWNLOAD * (loaded / total));
      this.detail.textContent = `${(loaded / MB).toFixed(1)} of ${(total / MB).toFixed(1)} MB`;
      if (loaded >= total) this.label.textContent = 'Unpacking the rooms';
    };
  }

  // After the download: `step` is 0..1 through the remaining work.
  after(step, label) {
    this.detail.textContent = '';
    this.set(DOWNLOAD + (1 - DOWNLOAD) * step, label);
  }

  tick() {
    if (this.closed) return;
    // Ease the shown number towards the target; snap when close.
    const gap = this.target - this.shown;
    this.shown = gap < 0.002 ? this.target : this.shown + gap * 0.12;
    const pct = Math.floor(this.shown * 100);
    if (this.num.textContent !== String(pct)) this.num.textContent = pct;
    this.bar.style.transform = `scaleX(${this.shown})`;
    this.el.setAttribute('aria-valuenow', pct);
    requestAnimationFrame(this.tick);
  }

  // Fill to 100, hold a moment, then fade away.
  done() {
    this.set(1, 'Ready');
    return new Promise((resolve) => {
      const wait = () => {
        if (this.shown < 1) { requestAnimationFrame(wait); return; }
        setTimeout(() => {
          this.el.classList.add('gone');
          setTimeout(() => { this.closed = true; this.el.hidden = true; resolve(); }, 700);
        }, 250);
      };
      wait();
    });
  }

  fail(message) {
    this.el.classList.add('failed');
    this.label.textContent = message;
    this.detail.textContent = 'Reload the page to try again.';
  }
}
