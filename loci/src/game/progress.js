// Saved progress for Play, per palace, in localStorage: the ladder of list
// lengths (5 -> 10 -> 15, each unlocked by a perfect run on the rung below),
// best scores, and a capped history of runs for stats and reviews.

const RUNGS = [5, 10, 15];
const KEEP = 200; // runs kept in history

export class Progress {
  constructor(palace, maxLength) {
    this.key = `loci-forge.play.${palace}`;
    this.rungs = RUNGS.filter((n) => n <= maxLength);
    this.data = this.load();
  }

  load() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(this.key)); } catch { /* private mode or bad JSON */ }
    return { unlocked: this.rungs[0], best: {}, runs: [], ...(d ?? {}) };
  }

  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch { /* storage off */ }
  }

  isUnlocked(n) { return n <= this.data.unlocked; }
  best(n) { return this.data.best[n] ?? null; }

  // The rung a perfect run on `n` unlocks, or null.
  nextRung(n) { return this.rungs[this.rungs.indexOf(n) + 1] ?? null; }

  // Record a finished run; returns what changed, for the results screen.
  record(run) {
    const n = run.length;
    const prev = this.best(n);
    const newBest = prev === null || run.score > prev;
    if (newBest) this.data.best[n] = run.score;
    let unlocked = null;
    const next = this.nextRung(n);
    if (run.perfect && next && !this.isUnlocked(next)) {
      this.data.unlocked = next;
      unlocked = next;
    }
    this.data.runs.push({
      at: Date.now(),
      deck: run.deck.id,
      length: n,
      score: run.score,
      items: run.items,
      mode: run.mode,
      right: run.items.map((_, i) => (run.isRight ? run.isRight(i) : run.answers[i] === run.items[i])),
      ms: run.times.map(Math.round),
    });
    if (this.data.runs.length > KEEP) this.data.runs.splice(0, this.data.runs.length - KEEP);
    this.save();
    return { newBest: newBest && prev !== null, first: prev === null, prev, unlocked };
  }
}
