// Stats from the run history (Progress.data.runs): totals, accuracy, answer
// time, a day streak and accuracy per locus, so the player can see which
// places let images slip. Pure functions; reviews are not runs and don't count.

const DAY = 86400000;
const dayKey = (t) => new Date(t).toDateString();

export function stats(data, loci, now = Date.now()) {
  const runs = data.runs ?? [];
  const per = loci.map(() => ({ tries: 0, right: 0, ms: 0 }));
  let tries = 0;
  let right = 0;
  let ms = 0;
  let bestStreak = 0;
  for (const r of runs) {
    let streak = 0;
    r.right.forEach((ok, i) => {
      if (!per[i]) return;
      per[i].tries++;
      tries++;
      if (ok) { per[i].right++; right++; streak++; bestStreak = Math.max(bestStreak, streak); } else streak = 0;
      per[i].ms += r.ms?.[i] ?? 0;
      ms += r.ms?.[i] ?? 0;
    });
  }
  // Consecutive days with at least one run, ending today or yesterday.
  const days = new Set(runs.map((r) => dayKey(r.at)));
  let dayStreak = 0;
  let t = days.has(dayKey(now)) ? now : now - DAY;
  while (days.has(dayKey(t))) { dayStreak++; t -= DAY; }

  const places = per.map((p, i) => ({
    n: i + 1, label: loci[i].label, tries: p.tries,
    rate: p.tries ? p.right / p.tries : null,
    ms: p.tries ? p.ms / p.tries : null,
  }));
  const rated = places.filter((p) => p.tries >= 2);
  const weakest = rated.filter((p) => p.rate < 1).sort((a, b) => a.rate - b.rate || b.ms - a.ms).slice(0, 3);
  return {
    runs: runs.length,
    recalled: right,
    accuracy: tries ? right / tries : null,
    avgMs: tries ? ms / tries : null,
    bestStreak,
    dayStreak,
    places,
    weakest,
  };
}
