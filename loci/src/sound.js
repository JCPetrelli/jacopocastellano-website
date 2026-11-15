// Generated sound, no files: a quiet room tone per palace and soft bell
// chimes for game events. The browser only allows audio after a click or key,
// so nothing plays until then. Muting is remembered.

const KEY = 'loci-forge.sound';
const PENTA = [0, 2, 4, 7, 9]; // semitones of a major pentatonic

const hz = (semitones, base = 440) => base * 2 ** (semitones / 12);

export class Sound {
  constructor(palace) {
    this.palace = palace;
    this.ctx = null;
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch { /* storage off */ }
    this.on = saved !== 'off';
    this.volume = 0.8;
  }

  // Create the audio graph on the first user gesture.
  wake() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);
    // A short, dark reverb shared by everything, so chimes sit in the room.
    this.verb = ctx.createConvolver();
    this.verb.buffer = this.impulse(2.6);
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    this.verb.connect(wet).connect(this.master);
    this.bus = ctx.createGain();
    this.bus.connect(this.master);
    this.bus.connect(this.verb);
    this.ambience();
    this.setOn(this.on);
  }

  setOn(on) {
    this.on = on;
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch { /* storage off */ }
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(on ? 1.1 * this.volume : 0, t, on ? 1.2 : 0.15);
  }

  setVolume(v) {
    this.volume = v;
    this.setOn(this.on);
  }

  toggle() { this.setOn(!this.on); return this.on; }

  impulse(seconds) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    }
    return buf;
  }

  noise(seconds = 4) {
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; } // brown-ish
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    return src;
  }

  lfo(target, rate, depth) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.value = rate;
    g.gain.value = depth;
    o.connect(g).connect(target);
    o.start();
  }

  ambience() {
    const ctx = this.ctx;
    const room = ctx.createGain();
    room.gain.value = 0.0;
    room.gain.setTargetAtTime(1, ctx.currentTime, 3);
    room.connect(this.master);
    // Room tone: filtered noise breathing slowly.
    const n = this.noise();
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = this.palace === 'garden' ? 900 : 380;
    const ng = ctx.createGain();
    ng.gain.value = this.palace === 'garden' ? 0.05 : 0.035;
    n.connect(lp).connect(ng).connect(room);
    this.lfo(lp.frequency, 0.05, this.palace === 'garden' ? 500 : 120);
    this.lfo(ng.gain, 0.08, 0.015);
    n.start();
    if (this.palace === 'garden') {
      this.windChimes();
    } else {
      // A warm, almost subliminal drone: A1 and E2, gently detuned.
      for (const [f, det] of [[55, -4], [82.4, 3], [110, 6]]) {
        const o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.value = f;
        o.detune.value = det;
        const g = ctx.createGain();
        g.gain.value = 0.012;
        const f2 = ctx.createBiquadFilter();
        f2.type = 'lowpass';
        f2.frequency.value = 260;
        o.connect(f2).connect(g).connect(room);
        this.lfo(g.gain, 0.03 + Math.random() * 0.04, 0.006);
        o.start();
      }
    }
  }

  windChimes() {
    const next = () => {
      if (!this.ctx) return;
      if (this.on) this.bell(hz(PENTA[Math.floor(Math.random() * 5)] + 12 * Math.floor(Math.random() * 2), 880), 0.025, 3.5);
      setTimeout(next, 2500 + Math.random() * 7000);
    };
    setTimeout(next, 4000);
  }

  // A soft bell: a sine with an inharmonic partial and an exponential tail.
  bell(freq, gain = 0.08, decay = 2.2, when = 0) {
    if (!this.ctx || !this.on) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + when;
    for (const [mult, g] of [[1, 1], [2.76, 0.35], [5.4, 0.12]]) {
      const o = ctx.createOscillator();
      o.frequency.value = freq * mult;
      const e = ctx.createGain();
      e.gain.setValueAtTime(0, t);
      e.gain.linearRampToValueAtTime(gain * g, t + 0.008);
      e.gain.exponentialRampToValueAtTime(0.0001, t + decay / mult ** 0.5);
      o.connect(e).connect(this.bus);
      o.start(t);
      o.stop(t + decay + 0.1);
    }
  }

  // Game events.
  arrive(n = 1) { this.bell(hz(PENTA[(n - 1) % 5], 523.25), 0.05, 2.4); }
  right() { this.bell(659.25, 0.06, 1.8); this.bell(987.77, 0.05, 2.2, 0.12); }
  wrong() { this.bell(196, 0.05, 1.6); }
  unlock() { [0, 4, 7, 12].forEach((s, i) => this.bell(hz(s, 523.25), 0.05, 2.6, i * 0.14)); }
  tick() { this.bell(1318.5, 0.015, 0.4); }
}
