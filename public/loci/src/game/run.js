// One memory run, as plain state with no DOM or three.js, so it is easy to
// test: the list to remember, then phases encode -> break -> recall -> results.
// Recall asks for each locus in turn; an answer is the item picked (or null).

import { matches } from './match.js';

export const PHASES = ['encode', 'break', 'recall', 'results'];

export function shuffle(list, rand = Math.random) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class Run {
  // `deck` from decks.js, `length` items (one per locus, from locus 1).
  // `order`: 'forward', 'backward' or 'random' recall; `typed`: answers are typed.
  // `items` replays a kept list (a review), which starts straight at recall.
  constructor({ deck, length, order = 'forward', typed = false, items = null, review = null, rand = Math.random }) {
    this.deck = deck;
    this.length = length;
    this.rand = rand;
    this.items = items ? items.slice() : shuffle(deck.items, rand).slice(0, length);
    this.review = review; // kept-list id, or null
    this.phase = items ? 'recall' : 'encode';
    this.index = 0; // locus index (0-based) within the current phase
    this.mode = { order, typed };
    const forward = this.items.map((_, i) => i);
    this.order = order === 'backward' ? forward.reverse() : order === 'random' ? shuffle(forward, rand) : forward;
    this.answers = new Array(length).fill(undefined);
    this.times = new Array(length).fill(0); // ms from question to answer
    this.streak = 0;
    this.bestStreak = 0;
    this.started = Date.now();
  }

  get locus() { return this.phase === 'recall' ? this.order[this.index] : this.index; }
  get item() { return this.items[this.locus]; }

  // Move on inside encode/recall; returns false at the end of the phase.
  next() {
    if (this.index + 1 < this.length) { this.index++; return true; }
    return false;
  }

  advancePhase() {
    this.phase = PHASES[Math.min(PHASES.indexOf(this.phase) + 1, PHASES.length - 1)];
    this.index = 0;
  }

  // Four choices for the current recall question: the answer, two other items
  // from this run (the real test: which item went where) and one from the deck.
  choices(n = 4) {
    const answer = this.item;
    const fromRun = shuffle(this.items.filter((x) => x !== answer), this.rand).slice(0, n - 2);
    const fresh = shuffle(this.deck.items.filter((x) => !this.items.includes(x)), this.rand);
    const pool = [answer, ...fromRun, ...fresh].slice(0, n);
    return shuffle(pool, this.rand);
  }

  // `choice` is the item picked, or null for "I don't know".
  answer(choice, ms = 0) {
    this.answers[this.locus] = choice;
    this.times[this.locus] = ms;
    const right = choice !== null && (this.mode.typed ? matches(choice, this.item) : choice === this.item);
    this.streak = right ? this.streak + 1 : 0;
    this.bestStreak = Math.max(this.bestStreak, this.streak);
    return right;
  }

  isRight(i) {
    const a = this.answers[i];
    return a != null && (this.mode.typed ? matches(a, this.items[i]) : a === this.items[i]);
  }

  get score() { return this.items.filter((_, i) => this.isRight(i)).length; }
  get perfect() { return this.score === this.length; }
}
