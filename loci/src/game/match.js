// Typed answers: forgiving about case, articles, plurals and one slip of the
// keyboard, because the test is memory, not spelling.

const norm = (s) => String(s ?? '').toLowerCase().trim()
  .replace(/^(the|a|an|some)\s+/, '')
  .replace(/[^a-z\s]/g, '')
  .replace(/\s+/g, ' ');

const singular = (s) => s.replace(/(ies)$/, 'y').replace(/(oes|ses|xes|ches|shes)$/, (m) => m.slice(0, -2)).replace(/s$/, '');

function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[a.length][b.length];
}

export function matches(typed, item) {
  const a = singular(norm(typed));
  const b = singular(norm(item));
  if (!a) return false;
  if (a === b) return true;
  return b.length >= 5 && distance(a, b) <= 1;
}
