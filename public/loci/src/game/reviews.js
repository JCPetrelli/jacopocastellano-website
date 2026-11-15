// Kept lists and their review schedule (the "Rule of Five" spacing): a kept
// list comes back after 1 day, 1 week, 1 month and 3 months. Reviews are
// recall only, on the same places. Stored inside Progress.data.kept.

export const DAY = 86400000;
export const SCHEDULE = [1, 7, 30, 90]; // days after keeping
const LABELS = { 1: '1 day', 7: '1 week', 30: '1 month', 90: '3 months' };

export function keep(data, run, now = Date.now()) {
  data.kept ??= [];
  const id = `k${now.toString(36)}`;
  data.kept.push({
    id, at: now, deck: run.deck.id, deckName: run.deck.name,
    items: run.items, mode: run.mode,
    reviews: SCHEDULE.map((days) => ({ days, due: now + days * DAY, score: null })),
  });
  return id;
}

export const nextReview = (k) => k.reviews.find((r) => r.score === null) ?? null;

// Kept lists whose next review is due, oldest due first.
export function due(data, now = Date.now()) {
  return (data.kept ?? [])
    .filter((k) => { const r = nextReview(k); return r && r.due <= now; })
    .sort((a, b) => nextReview(a).due - nextReview(b).due);
}

// The next review coming up (not yet due), for a quiet "next review" line.
export function upcoming(data, now = Date.now()) {
  const next = (data.kept ?? []).map((k) => ({ k, r: nextReview(k) })).filter((x) => x.r && x.r.due > now)
    .sort((a, b) => a.r.due - b.r.due)[0];
  return next ?? null;
}

export function complete(data, id, score, now = Date.now()) {
  const k = (data.kept ?? []).find((x) => x.id === id);
  const r = k && nextReview(k);
  if (!r) return null;
  r.score = score;
  r.doneAt = now;
  return { kept: k, review: r, next: nextReview(k) };
}

export const label = (days) => LABELS[days] ?? `${days} days`;

export function ago(ms) {
  const d = Math.round(ms / DAY);
  if (d < 1) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 14) return `${d} days ago`;
  if (d < 60) return `${Math.round(d / 7)} weeks ago`;
  return `${Math.round(d / 30)} months ago`;
}

export function when(ms) {
  const d = Math.max(1, Math.round(ms / DAY));
  return d === 1 ? 'tomorrow' : d < 14 ? `in ${d} days` : d < 60 ? `in ${Math.round(d / 7)} weeks` : `in ${Math.round(d / 30)} months`;
}
