// The map round: after a run, place each item on an unlabelled top-down map
// of the loci it went to (a map-placement test, as in van der Kamp's study).
// Pure state; the view draws dots from `points` (x, z in metres) scaled to a box.

export class MapTest {
  // `points[i]` is { x, z, up } for locus i (up: on an upper floor);
  // `items[i]` the item placed at locus i; `entrance` { x, z } for orientation.
  constructor(points, items, entrance) {
    this.points = points.slice(0, items.length);
    this.items = items;
    this.entrance = entrance;
    this.assigned = new Array(items.length).fill(null); // dot -> item
    this.selected = null; // item waiting to be placed
    this.checked = false;
    this.box = this.bounds();
  }

  bounds() {
    const xs = [...this.points.map((p) => p.x), this.entrance.x];
    const zs = [...this.points.map((p) => p.z), this.entrance.z];
    const pad = 1.5;
    const minX = Math.min(...xs) - pad;
    const maxX = Math.max(...xs) + pad;
    const minZ = Math.min(...zs) - pad;
    const maxZ = Math.max(...zs) + pad;
    return { minX, minZ, w: maxX - minX, h: maxZ - minZ };
  }

  // Position as percentages of the map box.
  at(p) {
    const b = this.box;
    return { left: ((p.x - b.minX) / b.w) * 100, top: ((p.z - b.minZ) / b.h) * 100 };
  }

  get aspect() { return this.box.w / this.box.h; }

  isPlaced(item) { return this.assigned.includes(item); }
  get complete() { return this.assigned.every((a) => a !== null); }

  select(item) {
    if (this.checked) return;
    this.selected = this.selected === item ? null : item;
  }

  // Tap a dot: place the selected item there (moving it if placed elsewhere),
  // or clear the dot when nothing is selected.
  tap(dot) {
    if (this.checked) return;
    if (this.selected === null) { this.assigned[dot] = null; return; }
    const was = this.assigned.indexOf(this.selected);
    if (was >= 0) this.assigned[was] = null;
    this.assigned[dot] = this.selected;
    this.selected = null;
  }

  check() {
    this.checked = true;
    return this.score;
  }

  isRight(dot) { return this.assigned[dot] === this.items[dot]; }
  get score() { return this.items.filter((_, i) => this.isRight(i)).length; }
}
