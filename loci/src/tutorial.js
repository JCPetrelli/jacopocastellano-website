// The tutorial (key T): a side panel that teaches the method of loci step by
// step while you walk. Steps are lists of phases (lessons.js); a phase ends by
// reaching loci or by keys. Progress is kept in localStorage per palace.
// Only palaces with a tutorial.json (worked examples) have one.
import { buildSteps } from './lessons.js';

const REACH = 2.2; // metres across the floor from a locus marker
const BELOW = -1.0; // how far the marker may sit below your feet...
const ABOVE = 4.6; // ...and above them (the paintings hang high)
const NOTE_TIME = 4000; // ms a note stays up

// Keys the panel takes while it is open, besides T.
const KEYS = ['Enter', 'KeyY', 'KeyN', 'KeyH', 'Digit1', 'Digit2', 'Digit3', 'BracketLeft', 'BracketRight'];

export class Tutorial {
  // `loci` are loci.json entries, `examples` tutorial.json, `hints` the LociHints.
  constructor({ loci, examples, hints, fromBlender, palace, el }) {
    this.loci = loci.map((l, i) => ({ n: i + 1, label: l.label, at: fromBlender(l.at) }));
    this.examples = examples.sets;
    this.hints = hints;
    this.el = el;
    this.key = `loci-forge.tutorial.${palace}`;
    this.store = this.load();
    this.steps = buildSteps(this);
    this.open = false;
    this.here = 0; // the locus you are standing at, or 0
    this.startStep(Math.min(this.store.step ?? 0, this.steps.length - 1));
  }

  load() {
    try { return JSON.parse(localStorage.getItem(this.key)) ?? {}; } catch { return {}; }
  }

  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.store)); } catch { /* private mode */ }
  }

  toggle() {
    this.open = !this.open;
    this.el.hidden = !this.open;
    if (this.open) {
      this.userHints = this.hints.visible;
      this.here = 0;
      this.noteText = '';
      this.phase.start?.(this);
      this.render();
    } else {
      this.hints.visible = this.userHints;
    }
  }

  startStep(i) {
    this.index = i;
    this.store.step = i;
    this.save();
    this.queue = this.steps[i].phases();
    this.startPhase(0);
  }

  startPhase(i) {
    this.at = i;
    this.phase = this.queue[i];
    this.here = 0; // so the locus you already stand at counts for the new phase
    if (this.open) this.phase.start?.(this);
    this.render();
  }

  // Called by a phase when it is finished.
  done() {
    if (this.at + 1 < this.queue.length) return this.startPhase(this.at + 1);
    if (this.index + 1 < this.steps.length) this.startStep(this.index + 1);
  }

  // Run `phases` right after the current one (the examples menu uses this).
  insert(phases) {
    this.queue.splice(this.at + 1, 0, ...phases);
  }

  // The locus nearest to a player standing at `pos`, if within reach, or 0.
  nearest(pos) {
    let best = 0;
    let bestD = REACH;
    for (const l of this.loci) {
      const dy = l.at.y - pos.y;
      const d = Math.hypot(l.at.x - pos.x, l.at.z - pos.z);
      if (dy > BELOW && dy < ABOVE && d < bestD) { best = l.n; bestD = d; }
    }
    return best;
  }

  label(n) {
    return this.loci[n - 1].label;
  }

  showHints(on) {
    this.hints.visible = on;
  }

  // Show one number for a moment, even with the hints off.
  flash(n) {
    this.hints.flash(n);
  }

  note(text) {
    this.noteText = text;
    clearTimeout(this.noteTimer);
    this.noteTimer = setTimeout(() => { this.noteText = ''; this.render(); }, NOTE_TIME);
    this.render();
  }

  // Once per frame while walking, before the player consumes the key presses.
  update(pressed, pos) {
    if (pressed.has('KeyT')) this.toggle();
    if (!this.open) return;
    for (const code of KEYS) if (pressed.has(code)) this.press(code);
    const n = this.nearest(pos);
    if (n !== this.here) {
      this.here = n;
      if (n) this.phase.arrive?.(this, n);
    }
    if (this.phase.tick?.(this)) this.render();
  }

  press(code) {
    if (code === 'BracketLeft') return this.startStep(Math.max(0, this.index - 1));
    if (code === 'BracketRight') return this.startStep(Math.min(this.steps.length - 1, this.index + 1));
    this.phase.key?.(this, code);
  }

  render() {
    if (!this.open) return;
    const step = this.steps[this.index];
    const phase = this.phase;
    const keys = [phase.keys, '[ ]: step', 'T: close'].filter(Boolean).join(' · ');
    const dots = this.steps.map((_, i) => `<span class="${i < this.index ? 'done' : i === this.index ? 'here' : ''}"></span>`).join('');
    this.el.innerHTML = `
      <div class="tut-head"><span>Step ${this.index + 1} of ${this.steps.length}</span><span class="tut-dots">${dots}</span></div>
      <div class="tut-title">${step.title}</div>
      <div class="tut-body">${phase.view(this)}</div>
      ${this.noteText ? `<div class="tut-note">${this.noteText}</div>` : ''}
      <div class="tut-keys">${chips(keys)}</div>`;
  }
}

// "Enter: next · Y: I had it" -> key chips followed by their labels.
function chips(text) {
  return text.split(' · ').map((part) => {
    const at = part.indexOf(': ');
    if (at < 0) return `<span class="k">${part}</span>`;
    return `<span class="k"><kbd>${part.slice(0, at)}</kbd>${part.slice(at + 2)}</span>`;
  }).join('');
}
