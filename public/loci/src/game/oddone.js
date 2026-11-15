// The break's distractor: a grid of letters where one is a look-alike
// (a "d" among "b"s). Finding it keeps the mind busy for a minute so the
// recall afterwards tests memory, not the echo of the last word.

const PAIRS = [['b', 'd'], ['p', 'q'], ['E', 'F'], ['O', 'Q'], ['C', 'G'], ['m', 'n'], ['u', 'v'], ['h', 'n'], ['P', 'R'], ['l', 'I']];

export class OddOne {
  constructor(rand = Math.random) {
    this.rand = rand;
    this.found = 0;
    this.new();
  }

  get size() { return Math.min(6, 4 + Math.floor(this.found / 3)); } // 4x4, then 5x5, then 6x6

  new() {
    const [a, b] = PAIRS[Math.floor(this.rand() * PAIRS.length)];
    const flip = this.rand() < 0.5;
    this.common = flip ? b : a;
    this.odd = flip ? a : b;
    this.at = Math.floor(this.rand() * this.size * this.size);
  }

  // Returns true when `i` is the odd cell (and deals a new grid).
  pick(i) {
    if (i !== this.at) return false;
    this.found++;
    this.new();
    return true;
  }

  html() {
    const n = this.size;
    const cells = Array.from({ length: n * n }, (_, i) => (
      `<button class="odd-cell" data-act="odd" data-value="${i}" aria-label="${i === this.at ? this.odd : this.common}, square ${i + 1}">${i === this.at ? this.odd : this.common}</button>`
    )).join('');
    return `<div class="odd-grid" style="--n:${n}">${cells}</div>`;
  }
}
