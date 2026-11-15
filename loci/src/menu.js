// The title screen: palace name, the three modes (Learn, Play, Walk) and the
// palace picker. It shows a loading bar until the palace is ready, then the
// modes; when the player pauses (Esc) it comes back with "Resume" on top.

export const PALACES = [
  { id: 'archive', name: 'The Archive', blurb: 'A dusty hall of books, lit through the roof' },
  { id: 'garden', name: 'The Garden', blurb: 'A walled Japanese garden in afternoon sun' },
];

const MODES = [
  { id: 'learn', name: 'Learn', desc: 'A guided first walk: the route, the images, the recall.' },
  { id: 'play', name: 'Play', desc: 'Memorise a list along the route, then bring it back.' },
  { id: 'walk', name: 'Walk', desc: 'Wander the palace freely and learn its places.' },
];

export class Menu {
  // `available` maps mode id -> false to disable it (e.g. Learn without a tutorial).
  constructor({ palace, onChoose }) {
    this.palace = palace;
    this.onChoose = onChoose;
    this.el = {
      title: document.getElementById('title'),
      loading: document.getElementById('loading'),
      modes: document.getElementById('modes'),
      palaces: document.getElementById('palaces'),
    };
    const info = PALACES.find((p) => p.id === palace);
    this.el.title.textContent = info?.name ?? palace;
    this.renderPalaces();
  }

  renderPalaces() {
    this.el.palaces.innerHTML = `<span class="label">Palace</span>${PALACES.map((p) => (
      p.id === this.palace
        ? `<span class="palace current" title="${p.blurb}">${p.name}</span>`
        : `<a class="palace" href="?palace=${p.id}" title="${p.blurb}">${p.name}</a>`
    )).join('')}`;
  }

  // Called once the palace has loaded.
  ready(available = {}) {
    this.available = available;
    this.el.loading.hidden = true;
    this.render(false);
    this.el.modes.hidden = false;
    this.el.modes.querySelector('button:not([disabled])')?.focus();
  }

  // Kept lists due for review: [{ id, title, detail }], shown above the modes.
  setReviews(list, upcoming) {
    this.reviews = list;
    this.upcoming = upcoming;
  }

  render(paused) {
    const resume = paused
      ? `<button class="mode resume" data-mode="resume"><span class="m-name">Resume</span>
         <span class="m-desc">Back where you were.</span></button>`
      : '';
    const due = (this.reviews ?? []).map((r) => `<button class="mode review" data-mode="review:${r.id}">
        <span class="m-name">${r.title} <small>review due</small></span><span class="m-desc">${r.detail}</span></button>`).join('');
    const soon = !due && this.upcoming ? `<div class="next-review">${this.upcoming}</div>` : '';
    this.el.modes.innerHTML = resume + due + MODES.map((m) => {
      // false = not yet, a string = why not here (e.g. "in the Archive").
      const why = this.available[m.id];
      const off = why === false || typeof why === 'string';
      return `<button class="mode" data-mode="${m.id}" ${off ? 'disabled' : ''}>
        <span class="m-name">${m.name}${off ? ` <small>${typeof why === 'string' ? why : 'soon'}</small>` : ''}</span>
        <span class="m-desc">${m.desc}</span></button>`;
    }).join('') + soon;
    for (const b of this.el.modes.querySelectorAll('button')) {
      b.addEventListener('click', () => this.onChoose(b.dataset.mode));
    }
  }

  paused() {
    this.render(true);
    this.el.modes.querySelector('button')?.focus();
  }
}
