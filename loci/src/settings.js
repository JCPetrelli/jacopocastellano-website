// Player settings, remembered in localStorage: field of view (lens), volume,
// a motion override (system / reduced / full) and a reset of this palace's
// progress. `reducedMotion()` is what every animated module asks.

const KEY = 'loci-forge.settings';
const DEFAULTS = { lens: null, volume: 0.8, motion: 'system' };

let current = load();
const listeners = new Set();

function load() {
  try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY)) ?? {}) }; } catch { return { ...DEFAULTS }; }
}

export const settings = () => current;

export function update(patch) {
  current = { ...current, ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(current)); } catch { /* storage off */ }
  document.body.classList.toggle('reduce-motion', reducedMotion());
  for (const fn of listeners) fn(current);
}

export const onChange = (fn) => listeners.add(fn);

export function reducedMotion() {
  if (current.motion === 'reduce') return true;
  if (current.motion === 'full') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Delete this palace's saved progress (Play and tutorial), keep the settings.
export function resetProgress(palace) {
  for (const k of [`loci-forge.play.${palace}`, `loci-forge.tutorial.${palace}`]) {
    try { localStorage.removeItem(k); } catch { /* storage off */ }
  }
}

// The panel behind the gear button.
export class SettingsPanel {
  constructor({ button, el, palace, defaultLens }) {
    this.button = button;
    this.el = el;
    this.palace = palace;
    this.defaultLens = defaultLens;
    this.confirming = false;
    button.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });
    el.addEventListener('input', (e) => this.input(e));
    el.addEventListener('click', (e) => this.click(e));
    addEventListener('keydown', (e) => { if (e.code === 'Escape' && !el.hidden) { e.stopImmediatePropagation(); this.toggle(false); } }, true);
    document.body.classList.toggle('reduce-motion', reducedMotion());
  }

  toggle(open = this.el.hidden) {
    this.el.hidden = !open;
    this.button.setAttribute('aria-expanded', String(open));
    this.confirming = false;
    if (open) { this.render(); this.el.querySelector('input')?.focus(); }
  }

  render() {
    const s = current;
    const lens = s.lens ?? this.defaultLens;
    const seg = (name, opts) => opts.map(([v, t]) => `<button class="${s[name] === v ? 'on' : ''}" data-set="${name}" data-value="${v}" aria-pressed="${s[name] === v}">${t}</button>`).join('');
    this.el.innerHTML = `
      <div class="set-title">Settings</div>
      <label class="set-row"><span>View <small>${lens} mm</small></span>
        <input type="range" min="14" max="35" step="1" value="${lens}" data-set="lens" aria-label="Field of view, lens in millimetres">
        <span class="set-ends"><small>wide</small><small>narrow</small></span></label>
      <label class="set-row"><span>Volume <small>${Math.round(s.volume * 100)}%</small></span>
        <input type="range" min="0" max="1" step="0.05" value="${s.volume}" data-set="volume" aria-label="Volume"></label>
      <div class="set-row"><span>Motion</span><div class="seg">${seg('motion', [['system', 'System'], ['reduce', 'Reduced'], ['full', 'Full']])}</div></div>
      <div class="set-row reset">${this.confirming
        ? `<span>Delete scores, kept lists and tutorial progress in this palace?</span>
           <div class="set-actions"><button class="danger" data-reset="yes">Delete</button><button class="quiet" data-reset="no">Keep</button></div>`
        : '<button class="quiet" data-reset="ask">Reset progress…</button>'}</div>`;
  }

  input(e) {
    const k = e.target.dataset.set;
    if (!k) return;
    update({ [k]: +e.target.value });
    const label = e.target.closest('.set-row').querySelector('small');
    if (label) label.textContent = k === 'lens' ? `${e.target.value} mm` : `${Math.round(e.target.value * 100)}%`;
  }

  click(e) {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.set) { update({ [b.dataset.set]: b.dataset.value }); this.render(); }
    if (b.dataset.reset === 'ask') { this.confirming = true; this.render(); }
    if (b.dataset.reset === 'no') { this.confirming = false; this.render(); }
    if (b.dataset.reset === 'yes') { resetProgress(this.palace); location.reload(); }
  }
}
