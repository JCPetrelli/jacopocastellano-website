// The tutorial's steps. A step is a title and a function returning fresh
// phases; each phase shows its view in the panel and calls t.done() when
// finished. Phases: read (text, Enter), walk (reach loci in order), recall
// (self-graded questions), rest (a timed break) and the examples menu.
// The worked examples come from the palace's tutorial.json.

const range = (a, b) => Array.from({ length: Math.abs(b - a) + 1 }, (_, i) => (a < b ? a + i : a - i));
const shuffle = (list) => list.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

function read(html, keys = 'Enter: next') {
  return {
    view: () => html,
    keys,
    key(t, code) { if (code === 'Enter') t.done(); },
  };
}

// A strip of numbered cells: reached ones ticked, the next one lit,
// 5 and 10 marked like their badges.
function strip(t, route, reached) {
  return `<div class="tut-strip">${route.map((n, i) => {
    const kind = n % 10 === 0 ? ' decimus' : n % 5 === 0 ? ' hand' : '';
    const state = i < reached ? ' ok' : i === reached ? ' next' : '';
    return `<span class="cell${kind}${state}">${n}</span>`;
  }).join('')}</div>`;
}

// Reach the loci of `route` in order. With `hints` off, each one found
// flashes its number. `describe(n)` fills the panel for the locus just
// reached; with `hold`, the phase waits for Enter after the last one.
// `secret` hides the progress, for tasks whose answer is the target.
function walk({ route, hints, intro, labels = true, list = false, secret = false, describe, hold = false, finished = 'Well done.' }) {
  let reached = 0;
  const complete = () => reached === route.length;
  return {
    get keys() {
      if (complete()) return hold ? 'Enter: next' : '';
      return hints || secret ? '' : 'H: which is next?';
    },
    start(t) { t.showHints(hints); },
    arrive(t, n) {
      if (complete()) return;
      if (n === route[reached]) {
        reached++;
        if (!hints) t.flash(n);
        if (complete() && !hold) {
          t.note(finished);
          t.done();
        } else t.render();
        return;
      }
      // Gently point out a locus skipped over; ignore ones not on this route.
      const at = route.indexOf(n);
      if (at > reached) {
        if (!hints) t.flash(n);
        t.note(`That's ${n}, the ${lower(t.label(n))}. ${route[reached]} comes first.`);
      }
    },
    key(t, code) {
      if (code === 'KeyH' && !hints && !secret && !complete()) {
        const n = route[reached];
        t.note(`${n} is the ${lower(t.label(n))}.`);
      }
      if (code === 'Enter' && hold && complete()) t.done();
    },
    view(t) {
      const next = route[reached];
      let html = intro ?? '';
      if (describe && reached > 0) html += describe(route[reached - 1]);
      if (secret) return html;
      if (list) {
        html += `<ul class="tut-list">${route.map((n, i) => `<li class="${i < reached ? 'ok' : ''}">
          <b>${n}</b> ${i < reached || labels ? t.label(n) : '…'}</li>`).join('')}</ul>`;
      } else if (!describe) {
        html += strip(t, route, reached);
      }
      if (complete()) {
        if (hold) html += '<p class="tut-go">Enter when you are ready to go on.</p>';
      } else {
        html += `<p class="tut-go">Next: <b>${next}</b>${labels ? ` · ${t.label(next)}` : ''}</p>`;
      }
      return html;
    },
  };
}

// Questions you answer aloud and grade yourself. An item is {q, a}; with an
// answer, Enter reveals it before grading; without one (your own list),
// you grade straight away. `onDone(score, total)` runs once at the end.
function recall({ title, items, onDone }) {
  let i = 0;
  let shown = false;
  let score = 0;
  const complete = () => i === items.length;
  const grade = (t, ok) => {
    score += ok ? 1 : 0;
    i++;
    shown = false;
    if (complete()) onDone?.(score, items.length);
    t.render();
  };
  return {
    get keys() {
      if (complete()) return 'Enter: next';
      return items[i].a && !shown ? 'Enter: show the answer' : 'Y: I had it · N: I missed it';
    },
    key(t, code) {
      if (complete()) { if (code === 'Enter') t.done(); return; }
      const item = items[i];
      if (item.a && !shown) {
        if (code === 'Enter') { shown = true; t.render(); }
        return;
      }
      if (code === 'KeyY') grade(t, true);
      if (code === 'KeyN') grade(t, false);
    },
    view() {
      if (complete()) {
        const all = score === items.length;
        return `<h3>${title}</h3><p class="tut-score">${score} of ${items.length}</p>
          <p>${all ? 'Every one. The route is doing its job.'
            : 'The ones you missed are the ones to walk past again: stand at the object and see it clearly.'}</p>`;
      }
      const item = items[i];
      return `<h3>${title}</h3><p class="tut-count">${i + 1} of ${items.length}</p>
        <p class="tut-q">${item.q}</p>${shown ? `<div class="tut-a">${item.a}</div>` : ''}`;
    },
  };
}

// A break before recall, so the answers come from memory and not from the
// last few seconds. Enter skips it.
function rest(seconds, html) {
  let end = 0;
  let shown = -1;
  const left = () => Math.max(0, Math.ceil((end - performance.now()) / 1000));
  return {
    keys: 'Enter: skip',
    start() { if (!end) end = performance.now() + seconds * 1000; },
    tick() {
      if (left() === shown) return false;
      shown = left();
      return true;
    },
    key(t, code) { if (code === 'Enter') t.done(); },
    view() {
      const s = left();
      return `${html}<p class="tut-score">${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}</p>
        ${s ? '' : '<p>Time is up. Press Enter to recall.</p>'}`;
    },
  };
}

// --- The worked examples -----------------------------------------------------

function exampleCard(t, set, n) {
  const item = set.items[n - set.start];
  let html = `<div class="tut-card"><div class="tut-item"><b>${n}</b> ${item.item}</div>`;
  if (item.image) {
    html += `<p class="tut-image">${item.image}</p><p class="tut-hook">${item.hook}</p>`;
  } else if (item.nudge) {
    html += `<p class="tut-hook">Your turn. ${item.nudge}</p>`;
  } else {
    html += `<p class="tut-hook">Your turn. Make the image yourself: what is ${item.item.replace(/ \(.*/, '')}
      doing to the ${lower(t.label(n))}? Make it move and make it loud.</p>`;
  }
  return `${html}</div>`;
}

function practise(t, set) {
  const route = range(set.start, set.start + set.items.length - 1);
  const answer = (n) => {
    const item = set.items[n - set.start];
    return `<b>${item.item}</b>${item.image ? `<br><span class="tut-image">${item.image}</span>` : ''}`;
  };
  let total = 0;
  let got = 0;
  const keep = (score, count) => {
    got += score;
    total += count;
  };
  return [
    read(`<h3>${set.title}</h3><p>${set.intro}</p>
      <p>The loci hints stay on. At each locus, look at the object and play the image out for a few seconds before walking on.</p>`),
    walk({
      route, hints: true, hold: true,
      intro: `<h3>${set.title}</h3>`,
      describe: (n) => exampleCard(t, set, n),
    }),
    read(`<h3>Walk it once in your head</h3>
      <p>Close your eyes. Start at locus ${set.start}, the ${lower(t.label(set.start))}, and walk the route in your mind,
      seeing each image where you left it. Then press Enter and answer each question aloud before you check.</p>`),
    recall({
      title: 'In order',
      items: route.map((n) => ({ q: `Locus ${n}, the ${lower(t.label(n))}: what is there?`, a: answer(n) })),
      onDone: keep,
    }),
    recall({
      title: 'Out of order',
      items: shuffle(route).slice(0, 4).map((n) => ({ q: `What is on locus <b>${n}</b>?`, a: answer(n) })),
      onDone: (score, count) => {
        keep(score, count);
        t.store.scores = { ...t.store.scores, [set.id]: `${got}/${total}` };
        t.save();
      },
    }),
  ];
}

function examplesMenu(t) {
  const sets = t.examples.slice(0, 3);
  return {
    keys: `1–${sets.length}: choose a list · Enter: move on`,
    view: () => `<p>Three lists to practise on. Each one comes with example images, so you can see what a good image looks like.
      The last list hands the images over to you, one locus at a time.</p>
      <ol class="tut-sets">${sets.map((s) => `<li><b>${s.title}</b> · loci ${s.start}–${s.start + s.items.length - 1}
        ${t.store.scores?.[s.id] ? `<span class="tut-best">last score ${t.store.scores[s.id]}</span>` : ''}</li>`).join('')}</ol>`,
    key(t, code) {
      const k = ['Digit1', 'Digit2', 'Digit3'].indexOf(code);
      if (sets[k]) {
        t.insert([...practise(t, sets[k]), examplesMenu(t)]);
        t.done();
      } else if (code === 'Enter') t.done();
    },
  };
}

// --- The steps -------------------------------------------------------------------

const REVIEWS = ['tomorrow', 'in a week', 'in a month', 'in three months'];

export function buildSteps(t) {
  const count = t.loci.length;
  const all = range(1, count);
  const landmarks = all.filter((n) => n === 1 || n % 5 === 0);
  const labelled = (n) => `<b>${n}</b> · ${t.label(n)}`;

  return [
    {
      title: 'Where the method comes from',
      phases: () => [
        read(`<h3>A banquet in Thessaly</h3>
          <p>About 2,500 years ago the poet Simonides was reciting at a banquet when he was called outside.
          While he was out, the roof of the hall fell in, and the guests were crushed beyond recognition.
          Simonides could name every one of them, because he remembered <em>where each had been sitting</em>.</p>
          <p>Cicero tells the story; Quintilian, a century later, already called parts of it a legend.
          The lesson is real: <b>order brings light to memory.</b></p>`),
        read(`<h3>Two ideas</h3>
          <p><b>The order of the places keeps the order of things.</b> Walk a fixed route and anything you leave on it
          comes back in sequence, forwards or backwards.</p>
          <p><b>The places are the wax tablet; the images are the letters.</b> The places stay for good; the images you
          write on them can be wiped and replaced.</p>
          <p>First you learn the places of this Archive until you can walk it with your eyes closed. Then you put images on them.</p>`),
      ],
    },
    {
      title: 'The landmarks: 1, 5, 10, 15',
      phases: () => [
        read(`<p>A long route is learned from its landmarks. The old Roman handbook marks every fifth place:
          a <b>golden hand</b> on the fifth, and on the tenth a friend called <b>Decimus</b> ("tenth").</p>
          <p>The loci hints are on. Walk to the four landmarks in order: the door you came in by, the gold hand,
          the purple Decimus and the last door.</p>`),
        walk({ route: landmarks, hints: true, list: true, finished: 'Four landmarks. Now the places in between.' }),
      ],
    },
    {
      title: 'Fill in the gaps',
      phases: () => [
        read(`<p>Now walk the whole route, 1 to ${count}. Count along and check yourself at each landmark:
          5 should be the gold hand, 10 the Decimus.</p>
          <p>At every locus, stop for a moment and take in the object: its shape, its colour, what stands next to it.</p>`),
        walk({ route: all, hints: true, finished: `The whole route. Now once more, without the numbers.` }),
      ],
    },
    {
      title: 'Walk without the numbers',
      phases: () => [
        read(`<p>The numbers go off. Walk the route again, 1 to ${count}, from memory. Each locus you reach
          in the right order shows its number for a moment.</p>
          <p>If you're stuck, H tells you which place comes next.</p>`),
        walk({ route: all, hints: false, labels: false, finished: 'The route from memory. It is becoming yours.' }),
      ],
    },
    {
      title: 'Anywhere on the route',
      phases: () => {
        // Three different targets, none at the ends, so "after" and "before" always exist.
        const [a, b, c] = shuffle(range(2, count - 1));
        const back = range(Math.min(10, count), Math.min(10, count) - 4);
        // H would give the answer away, so these tasks carry no progress and no help.
        const task = (intro, n) => walk({ route: [n], hints: false, labels: false, secret: true, intro: `<p>${intro}</p>`, finished: `Yes: ${n}, the ${lower(t.label(n))}.` });
        return [
          read(`<p>A good palace can be entered anywhere: you should be able to find any number, or say what comes
            before or after any place, without walking from the start. The numbers stay off.</p>`),
          task(`Walk to locus <b>${a}</b>.`, a),
          task(`Walk to the locus that comes <b>after</b> the ${lower(t.label(b - 1))}.`, b),
          task(`Walk to the locus that comes <b>before</b> the ${lower(t.label(c + 1))}.`, c),
          walk({
            route: back, hints: false, labels: false,
            intro: `<p>Now backwards: walk from <b>${back[0]}</b> down to <b>${back.at(-1)}</b>.</p>`,
            finished: 'Backwards too.',
          }),
        ];
      },
    },
    {
      title: 'The walk in your head',
      phases: () => [
        read(`<p>Now leave the Archive without moving. Close your eyes and walk the route in your mind,
          from the door to the last door, seeing each place.</p>
          <p>Then press Enter: for each number, name the place aloud before you check.</p>`),
        recall({ title: 'Every place, in order', items: all.map((n) => ({ q: `What is locus <b>${n}</b>?`, a: labelled(n) })) }),
        recall({ title: 'Jumping about', items: shuffle(all).slice(0, 5).map((n) => ({ q: `What is locus <b>${n}</b>?`, a: labelled(n) })) }),
      ],
    },
    {
      title: 'Making images',
      phases: () => [
        read(`<h3>What makes an image stick</h3>
          <ul class="tut-rules">
            <li><b>It touches the place.</b> It sits on it, breaks it, climbs it, pours out of it. An image floating nearby slips away.</li>
            <li><b>It moves.</b> Something is happening, not just standing there.</li>
            <li><b>It is exaggerated:</b> too big, too many, too loud.</li>
            <li><b>It uses a second sense:</b> a sound, a smell, heat, a taste.</li>
            <li><b>It stands out from the others.</b> One strange image among ordinary ones is memorable;
              if every one is strange, none of them is.</li>
            <li><b>One image per place.</b></li>
          </ul>`),
        read(`<h3>If you don't see pictures</h3>
          <p>Some people have no mental images at all, and the method still works for them. Ask instead
          <em>what happens here?</em> and tell yourself a one-line story about the thing and the place.
          The link between item and place is what matters, not how vivid the picture is.</p>`),
      ],
    },
    {
      title: 'Worked examples',
      phases: () => [examplesMenu(t)],
    },
    {
      title: 'Your own list',
      phases: () => [
        read(`<p>Now a list of your own. Write down five things you want to remember, in order: errands, the points of
          a talk, a shopping list. Keep the paper out of sight once you start.</p>
          <p>Walk loci 1 to 5 and make an image for each thing on its place. Nobody makes the images for you now:
          yours will outlast anyone else's.</p>`),
        walk({
          route: range(1, 5), hints: true, hold: true,
          describe: (n) => `<div class="tut-card"><div class="tut-item"><b>${n}</b> ${t.label(n)}</div>
            <p class="tut-hook">Your thing number ${n} goes here. Does it touch the ${lower(t.label(n))}? Does it move?
            Is it too big or too loud? Can you hear or smell it?</p></div>`,
        }),
        rest(120, `<h3>A short break</h3><p>Look away from the Archive and count backwards from 200 in sevens, aloud.</p>`),
        recall({ title: 'Your list, in order', items: range(1, 5).map((n) => ({ q: `Locus ${n}, the ${lower(t.label(n))}: say your thing.` })) }),
        recall({ title: 'Your list, backwards', items: range(5, 1).map((n) => ({ q: `Locus ${n}: say your thing.` })) }),
        read(`<p>When five come back every time, try ten, then all ${count}, on the same places.
          The worked examples show how the images carry on up the stairs.</p>`),
      ],
    },
    {
      title: 'Coming back',
      phases: () => {
        return [
          read(`<h3>Wiping the tablet</h3>
            <p>The places stay; the images can go. To reuse the route for a new list, walk it once and see every
            place empty and clean. Old images fade faster if you give the palace a rest of a day, or use the Garden
            for the next list.</p>
            <h3>Making a list last</h3>
            <p>One session gives a modest gain. The big gains come from coming back: walk the route in your head and
            recall your list</p>
            <ul class="tut-rules">${REVIEWS.map((name) => `<li>${name}</li>`).join('')}</ul>
            <p>The method is strongest for things in order. It holds a list for you; it doesn't make you understand it.</p>`,
          'Enter: finish'),
          read(`<h3>The end of the tutorial</h3><p>Press [ to go back to any step, or T to close.</p>`, ''),
        ];
      },
    },
  ];
}
