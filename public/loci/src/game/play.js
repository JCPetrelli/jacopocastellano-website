// Play mode: the controller that ties a Run (run.js) to the glide camera and
// the play panel. No pointer lock: the camera glides, the player clicks or
// presses keys. Views are small functions in views.js.
import { deckById } from './decks.js';
import { reducedMotion } from '../settings.js';
import { OddOne } from './oddone.js';
import { MapTest } from './maptest.js';
import { Progress } from './progress.js';
import { RouteLesson } from './route.js';
import { Run } from './run.js';
import * as reviews from './reviews.js';
import * as views from './views.js';

const BREAK_SECONDS = 60;
const FEEDBACK_MS = 1100;

export class Play {
  // `loci` are { n, label } in route order, `poses` from glide.computePoses.
  // `points` are the loci's floor positions { x, z, up }, `entrance` the spawn { x, z }.
  constructor({ el, glide, poses, loci, points, entrance, hints, camera, palace, sound, onExit }) {
    this.points = points;
    this.entrance = entrance;
    this.sound = sound;
    this.palaceName = palace.charAt(0).toUpperCase() + palace.slice(1);
    this.el = el;
    this.glide = glide;
    this.poses = poses;
    this.loci = loci;
    this.hints = hints;
    this.camera = camera;
    this.onExit = onExit;
    this.active = false;
    this.progress = new Progress(palace, loci.length);
    this.settings = { deck: 'things', length: this.progress.data.unlocked, order: 'forward', typed: false, markers: 'numbers' };
    this.view = 'setup';
    el.addEventListener('click', (e) => this.click(e));
    addEventListener('keydown', (e) => this.key(e));
  }

  open() {
    this.active = true;
    this.el.hidden = false;
    if (this.hints) this.hints.visible = false;
    // Start the glide from wherever the camera is now.
    this.glide.eye.copy(this.camera.position);
    this.glide.look.copy(this.camera.position).add(this.camera.getWorldDirection(this.glide.look.clone()).multiplyScalar(3));
    // The first time, explain the method before the list choice.
    if (!this.progress.data.seenIntro) this.show('explainer', { i: 0, first: true });
    else this.show('setup');
  }

  close() {
    this.active = false;
    this.el.hidden = true;
    if (this.hints) { this.hints.visible = false; this.hints.focus = 0; this.hints.style = 'numbers'; }
    clearInterval(this.timer);
  }

  show(view, data = {}) {
    this.view = view;
    this.data = data;
    this.render();
  }

  render() {
    const html = views[this.view]?.(this, this.data) ?? '';
    this.el.innerHTML = html;
    this.el.dataset.view = this.view;
    this.el.querySelector('[autofocus]')?.focus();
    this.announce();
  }

  // One sentence per screen for screen readers, in a live region that stays
  // in the page (the panel itself is rebuilt on every render).
  announce() {
    const live = document.getElementById('sr-live');
    if (!live) return;
    const d = this.data ?? {};
    const run = this.run;
    let text = '';
    if (this.view === 'encode') text = `Place ${d.i + 1} of ${run.length}, ${this.label(d.i)}: ${run.items[d.i]}.`;
    else if (this.view === 'recall' && d.answered === undefined) text = `Place ${d.i + 1}, ${this.label(d.i)}. What did you leave here?`;
    else if (this.view === 'recall') text = d.right ? 'Right.' : `It was the ${run.items[d.i]}.`;
    else if (this.view === 'rest') text = 'A short break. Find the odd letter, or press Space when ready.';
    else if (this.view === 'results') text = `${run.score} of ${run.length} recalled.`;
    if (text && live.textContent !== text) live.textContent = text;
  }

  label(i) { return this.loci[i].label; }

  // ---- the run ----

  async start() {
    const deck = deckById(this.settings.deck);
    const { length, order, typed } = this.settings;
    this.run = new Run({ deck, length, order, typed });
    if (this.hints) { this.hints.style = this.settings.markers; this.hints.visible = false; }
    await this.phaseTitle(`${length} places`, 'Make one image at each');
    if (!this.active) return;
    // With numbers on, the whole route shows while encoding; fainter settings show only the current place.
    if (this.hints) this.hints.visible = this.settings.markers === 'numbers';
    await this.visit(0, 'encode');
  }

  // Glide to locus i, then show `view` there.
  async visit(i, view) {
    if (this.hints) this.hints.focus = 0;
    this.show('travel', { i });
    await this.glide.to(this.poses[i]);
    if (!this.active) return;
    if (this.hints) this.hints.focus = i + 1;
    this.sound?.arrive(i + 1);
    this.asked = performance.now();
    this.show(view, { i, choices: view === 'recall' && !this.run.mode.typed ? this.run.choices() : undefined });
  }

  async advance() {
    const run = this.run;
    if (run.phase === 'encode') {
      if (run.next()) return this.visit(run.locus, 'encode');
      run.advancePhase();
      return this.startBreak();
    }
    if (run.phase === 'recall') {
      if (run.next()) return this.visit(run.locus, 'recall');
      run.advancePhase();
      if (this.hints) { this.hints.visible = true; this.hints.focus = 0; }
      if (run.review) {
        const r = reviews.complete(this.progress.data, run.review, run.score);
        this.progress.save();
        if (run.perfect) this.sound?.unlock();
        return this.show('results', { review: r });
      }
      const change = this.progress.record(run);
      if (change.unlocked || run.perfect) this.sound?.unlock();
      return this.show('results', change);
    }
  }

  // A title card between phases: large words that fade in and out.
  async phaseTitle(title, sub) {
    this.show('phase', { title, sub });
    await new Promise((r) => setTimeout(r, reducedMotion() ? 900 : 1700));
  }

  async startBreak() {
    await this.phaseTitle('The break', 'A minute of something else');
    if (!this.active) return;
    if (this.hints) this.hints.visible = false;
    let left = BREAK_SECONDS;
    this.odd = new OddOne();
    this.show('rest', { left });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      left--;
      if (left <= 0) return this.endBreak();
      const t = this.el.querySelector('[data-left]');
      if (t) t.textContent = left;
    }, 1000);
  }

  async endBreak() {
    clearInterval(this.timer);
    if (this.run.phase !== 'break') return;
    this.run.advancePhase();
    const how = { forward: 'Place by place, from the first', backward: 'Backwards, from the last place', random: 'The places in any order' }[this.run.mode.order];
    await this.phaseTitle('Bring them back', how);
    if (!this.active) return;
    this.visit(this.run.locus, 'recall');
  }

  pickOdd(i, button) {
    if (this.odd.pick(i)) {
      this.sound?.tick();
      const grid = this.el.querySelector('.odd-grid');
      grid.outerHTML = this.odd.html();
      const f = this.el.querySelector('[data-found]');
      if (f) f.textContent = this.odd.found;
    } else {
      button.classList.remove('no');
      void button.offsetWidth; // restart the shake
      button.classList.add('no');
    }
  }

  // A review of a kept list: recall only, same items, same order.
  openReview(id) {
    const k = (this.progress.data.kept ?? []).find((x) => x.id === id);
    if (!k) return this.open();
    this.open();
    this.reviewing = k;
    this.show('reviewIntro', { kept: k });
  }

  async startReview() {
    const k = this.reviewing;
    const deck = deckById(k.deck);
    this.run = new Run({ deck, length: k.items.length, items: k.items, order: k.mode?.order ?? 'forward', typed: !!k.mode?.typed, review: k.id });
    if (this.hints) this.hints.visible = false;
    await this.visit(this.run.locus, 'recall');
  }

  keepList() {
    if (this.run.keptId) return;
    this.run.keptId = reviews.keep(this.progress.data, this.run);
    this.progress.save();
    this.render();
  }

  // Esc: leave at once outside a run; inside one, ask first (Esc again leaves).
  escape() {
    const inRun = ['encode', 'recall', 'rest', 'travel', 'routeWalk', 'routeTravel', 'routeQuiz'].includes(this.view);
    if (this.view === 'leave') return this.onExit();
    if (!inRun) return this.onExit();
    this.paused = { view: this.view, data: this.data };
    this.show('leave');
  }

  // ---- Learn the route: walk the empty loci, then a short quiz ----

  async startRoute() {
    this.route = new RouteLesson(this.loci.map((l) => l.label), this.settings.length);
    if (this.hints) this.hints.visible = false;
    await this.phaseTitle('The route', `${this.route.length} places, empty`);
    if (!this.active) return;
    this.routeVisit();
  }

  async routeVisit() {
    const i = this.route.index;
    if (this.hints) this.hints.focus = 0;
    this.show('routeTravel', { i });
    await this.glide.to(this.poses[i]);
    if (!this.active || !this.route) return;
    if (this.hints) this.hints.focus = i + 1;
    this.sound?.arrive(i + 1);
    this.show('routeWalk', { i });
  }

  async routeNext() {
    if (this.route.next()) return this.routeVisit();
    if (this.hints) this.hints.focus = 0;
    await this.phaseTitle('Without looking', 'What stands where?');
    if (!this.active) return;
    this.show('routeQuiz', { choices: this.route.choices() });
  }

  routePick(label) {
    if (this.data.answered !== undefined) return;
    const right = this.route.answer(label);
    if (right) this.sound?.right(); else this.sound?.wrong();
    this.show('routeQuiz', { ...this.data, answered: label, right });
    setTimeout(() => {
      if (!this.active || this.view !== 'routeQuiz') return;
      if (this.route.nextQuestion()) this.show('routeQuiz', { choices: this.route.choices() });
      else {
        this.progress.data.routeKnown ??= {};
        if (this.route.perfect) this.progress.data.routeKnown[this.route.length] = Date.now();
        this.progress.save();
        this.show('routeDone');
      }
    }, right ? 900 : 1700);
  }

  finishIntro() {
    this.progress.data.seenIntro = true;
    this.progress.save();
    this.show('setup');
  }

  submitTyped() {
    const input = this.el.querySelector('#typed');
    const v = input?.value.trim();
    if (v) this.pick(v);
    else input?.focus();
  }

  pick(choice) {
    if (this.data.answered !== undefined) return;
    const right = this.run.answer(choice, performance.now() - this.asked);
    if (right) this.sound?.right(); else this.sound?.wrong();
    this.show('recall', { ...this.data, answered: choice, right });
    setTimeout(() => this.active && this.advance(), right ? FEEDBACK_MS : FEEDBACK_MS * 1.8);
  }

  // ---- input ----

  click(e) {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const { act, value } = b.dataset;
    if (act === 'deck') { this.settings.deck = value; this.render(); }
    if (act === 'length' && this.progress.isUnlocked(+value)) { this.settings.length = +value; this.render(); }
    if (act === 'start') this.start();
    if (act === 'next') this.advance();
    if (act === 'skip') this.endBreak();
    if (act === 'odd') this.pickOdd(+value, b);
    if (act === 'order') { this.settings.order = value; this.render(); }
    if (act === 'markers') { this.settings.markers = value; this.render(); }
    if (act === 'typed') { this.settings.typed = value === 'type'; this.render(); }
    if (act === 'pick') this.pick(value);
    if (act === 'submit') this.submitTyped();
    if (act === 'unknown') this.pick(null);
    if (act === 'again') this.start();
    if (act === 'climb') { this.settings.length = +value; this.start(); }
    if (act === 'setup') this.show('setup');
    if (act === 'exit') this.onExit();
    if (act === 'leave') this.onExit();
    if (act === 'stay') this.show(this.paused.view, this.paused.data);
    if (act === 'map') { this.resultsData = this.data; this.map = new MapTest(this.points, this.run.items, this.entrance); this.show('map'); }
    if (act === 'map-item') { this.map.select(value); this.render(); }
    if (act === 'map-dot') { this.map.tap(+value); this.render(); }
    if (act === 'map-check') { const n = this.map.check(); if (n === this.map.items.length) this.sound?.unlock(); else this.sound?.arrive(1); this.render(); }
    if (act === 'map-done') this.show('results', this.resultsData);
    if (act === 'route') this.startRoute();
    if (act === 'route-next') this.routeNext();
    if (act === 'route-pick') this.routePick(value);
    if (act === 'keep') this.keepList();
    if (act === 'stats') this.show('stats');
    if (act === 'review-start') this.startReview();
    if (act === 'how') this.show('explainer', { i: 0 });
    if (act === 'ex-next') this.show('explainer', { ...this.data, i: this.data.i + 1 });
    if (act === 'ex-back') this.show('explainer', { ...this.data, i: this.data.i - 1 });
    if (act === 'ex-done') this.finishIntro();
  }

  key(e) {
    if (!this.active) return;
    if (e.code === 'Escape') { e.preventDefault(); return this.escape(); }
    // While typing an answer, keys belong to the text field (Enter submits).
    if (e.target.id === 'typed') {
      if (e.code === 'Enter') { e.preventDefault(); this.submitTyped(); }
      return;
    }
    const v = this.view;
    const go = e.code === 'Space' || e.code === 'Enter';
    if (v === 'explainer' && go) {
      e.preventDefault();
      if (this.data.i < 2) this.show('explainer', { ...this.data, i: this.data.i + 1 }); else this.finishIntro();
    } else if (v === 'routeWalk' && go) { e.preventDefault(); this.routeNext(); }
    else if (v === 'routeQuiz' && /^Digit[1-4]$/.test(e.code)) {
      const c = this.data.choices?.[+e.code.slice(5) - 1];
      if (c) this.routePick(c);
    } else if (v === 'routeDone' && go) { e.preventDefault(); this.show('setup'); }
    else if (v === 'reviewIntro' && go) { e.preventDefault(); this.startReview(); }
    else if (v === 'setup' && e.code === 'Enter') this.start();
    else if (v === 'encode' && go) { e.preventDefault(); this.advance(); }
    else if (v === 'rest' && go) { e.preventDefault(); this.endBreak(); }
    else if (v === 'recall' && /^Digit[1-4]$/.test(e.code)) {
      const c = this.data.choices?.[+e.code.slice(5) - 1];
      if (c) this.pick(c);
    } else if (v === 'recall' && (e.code === 'Digit0' || e.code === 'KeyD')) this.pick(null); else if (v === 'results' && go) { e.preventDefault(); this.start(); }
  }
}
