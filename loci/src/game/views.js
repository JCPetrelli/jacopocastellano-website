// The play panel's views, one function per screen: (play, data) -> HTML.
// Copy is short and plain; every screen says what to do next.
import { DECKS } from './decks.js';
import { card } from './explainer.js';
import * as reviews from './reviews.js';
import { stats as computeStats } from './stats.js';

export const explainer = (play, { i = 0, first = false }) => card(i, { first });

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

// Prompts that push the player to bind the item to the place, never an image.
const PROMPTS = [
  (place) => `Make it touch the ${place}. What is it doing there?`,
  (place) => `Make it huge, or make hundreds of them. How does the ${place} cope?`,
  (place) => `Add a sound or a smell. What do you hear at the ${place}?`,
  (place) => `Something happens here. What does it do to the ${place}?`,
];

export function setup(play) {
  const { deck, length } = play.settings;
  const lengths = [5, 10, 15].filter((n) => n <= play.loci.length);
  return `
    <section class="play-card setup">
      <div class="eyebrow">Play</div>
      <h2>Remember a list</h2>
      <p class="play-lede">You will glide past ${length} places. At each one you get a word: picture it
        <em>doing something</em> to the place. After a short break, you bring the list back.</p>
      <div class="play-label">List</div>
      <div class="decks">${DECKS.map((d) => `
        <button class="deck ${d.id === deck ? 'on' : ''}" data-act="deck" data-value="${d.id}" aria-pressed="${d.id === deck}">
          <span class="d-name">${d.name}</span><span class="d-blurb">${d.blurb}</span></button>`).join('')}
      </div>
      <div class="play-label">Length</div>
      <div class="lengths">${lengths.map((n) => {
        const open = play.progress.isUnlocked(n);
        const best = play.progress.best(n);
        const below = lengths[lengths.indexOf(n) - 1];
        const title = open ? (best === null ? 'Not played yet' : `Best: ${best} of ${n}`) : `A perfect ${below} unlocks ${n}`;
        return `<button class="chip ${n === length ? 'on' : ''} ${open ? '' : 'locked'}" data-act="length" data-value="${n}"
          aria-pressed="${n === length}" ${open ? '' : 'aria-disabled="true"'} title="${title}">${n}${best !== null ? `<small>${best}</small>` : ''}</button>`;
      }).join('')}
        <span class="ladder-note">${(() => {
          const next = lengths.find((n) => !play.progress.isUnlocked(n));
          return next ? `A perfect ${lengths[lengths.indexOf(next) - 1]} unlocks ${next}.` : 'Every length is open.';
        })()}</span>
      </div>
      <div class="play-row">
        <div><div class="play-label">Recall</div>
          <div class="seg">${[['forward', 'In order'], ['backward', 'Backwards'], ['random', 'Any order']].map(([v, t]) => `
            <button class="${play.settings.order === v ? 'on' : ''}" data-act="order" data-value="${v}" aria-pressed="${play.settings.order === v}">${t}</button>`).join('')}</div></div>
        <div><div class="play-label">Markers</div>
          <div class="seg">${[['numbers', 'Numbers'], ['glow', 'Glow'], ['none', 'None']].map(([v, t]) => `
            <button class="${play.settings.markers === v ? 'on' : ''}" data-act="markers" data-value="${v}" aria-pressed="${play.settings.markers === v}"
              title="${v === 'numbers' ? 'Numbered markers on the route' : v === 'glow' ? 'Only a faint glow at the current place' : 'No markers: you find the place yourself'}">${t}</button>`).join('')}</div></div>
        <div><div class="play-label">Answer</div>
          <div class="seg">${[['choose', 'Choose'], ['type', 'Type it']].map(([v, t]) => {
            const on = (v === 'type') === play.settings.typed;
            return `<button class="${on ? 'on' : ''}" data-act="typed" data-value="${v}" aria-pressed="${on}">${t}</button>`;
          }).join('')}</div></div>
      </div>
      <div class="play-actions">
        <button class="primary" data-act="start" autofocus>Begin</button>
        <button class="quiet" data-act="exit">Back</button>
        <button class="skip" data-act="route">${play.progress.data.routeKnown?.[length] ? 'Walk the route again' : 'Learn the route first'}</button>
        <button class="skip" data-act="how">How it works</button>
        <button class="skip" data-act="stats">Your progress</button>
      </div>
    </section>`;
}

function progress(play, i) {
  const run = play.run;
  return `<div class="play-progress" aria-hidden="true">${run.items.map((_, k) => {
    const done = run.phase === 'recall' ? run.order.indexOf(k) < run.index : k < i;
    return `<span class="${k === i ? 'here' : done ? 'done' : ''}"></span>`;
  }).join('')}</div>`;
}

export function travel(play, { i }) {
  const phase = play.run.phase === 'recall' ? 'Recall' : 'Remember';
  return `<section class="play-card travel"><div class="eyebrow">${phase} · place ${i + 1}</div>
    <div class="travel-place">${esc(play.label(i))}</div>${progress(play, i)}</section>`;
}

export function encode(play, { i }) {
  const place = play.label(i);
  const prompt = PROMPTS[i % PROMPTS.length](esc(lower(place)));
  return `
    <section class="play-card encode">
      <div class="eyebrow">Place ${i + 1} of ${play.run.length} · ${esc(place)}</div>
      <div class="item">${esc(play.run.items[i])}</div>
      <p class="play-prompt">${prompt}</p>
      ${progress(play, i)}
      <div class="play-actions">
        <button class="primary" data-act="next" autofocus>Image made <kbd>Space</kbd></button>
      </div>
    </section>`;
}

export function rest(play, { left }) {
  return `
    <section class="play-card rest">
      <div class="eyebrow">A short break · <span data-left>${left}</span> s</div>
      <h2>Find the odd letter</h2>
      <p class="play-lede">One letter differs from the rest. A minute of something else makes the recall honest.
        <span class="or">Or look away and count back from 200 in sevens.</span></p>
      ${play.odd.html()}
      <div class="odd-found">Found <b data-found>${play.odd.found}</b></div>
      <div class="play-actions"><button class="quiet" data-act="skip">I'm ready <kbd>Space</kbd></button></div>
    </section>`;
}

function typedField(done, answered, right) {
  if (done) {
    return answered === null ? '' : `<div class="typed-answer ${right ? 'right' : 'wrong'}">${esc(answered)}</div>`;
  }
  return `<form class="typed-row" onsubmit="return false">
    <input id="typed" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type the word" aria-label="Your answer" autofocus>
    <button class="primary" type="button" data-act="submit">Check <kbd>Enter</kbd></button></form>`;
}

export function recall(play, { i, choices, answered, right }) {
  const run = play.run;
  const item = run.items[i];
  const done = answered !== undefined;
  const say = !done ? ''
    : right ? (run.streak >= 3 ? `Yes. ${run.streak} in a row.` : 'Yes.')
    : answered === null ? `It was the ${esc(item)}. Picture it at the ${esc(lower(play.label(i)))} now.`
    : `It was the ${esc(item)}. See it there now.`;
  return `
    <section class="play-card recall ${done ? (right ? 'is-right' : 'is-wrong') : ''}">
      <div class="eyebrow">${run.mode.order === 'forward' ? `Place ${i + 1} of ${run.length}` : `${run.index + 1} of ${run.length} · place ${i + 1}`}</div>
      <h2>What did you leave at the ${esc(lower(play.label(i)))}?</h2>
      ${run.mode.typed ? typedField(done, answered, right) : `<div class="choices">${choices.map((c, k) => {
        const state = !done ? '' : c === item ? 'right' : c === answered ? 'wrong' : 'dim';
        return `<button class="choice ${state}" data-act="pick" data-value="${esc(c)}" ${done ? 'disabled' : ''}>
          <kbd>${k + 1}</kbd>${esc(c)}${state === 'right' ? '<span class="mark" aria-label="right"> ✓</span>' : state === 'wrong' ? '<span class="mark" aria-label="wrong"> ✗</span>' : ''}</button>`;
      }).join('')}</div>`}
      ${done ? '' : `<button class="unknown" data-act="unknown">I don't remember${run.mode.typed ? '' : ' <kbd>0</kbd>'}</button>`}
      <p class="feedback" role="status" aria-live="polite">${say}</p>
      ${progress(play, i)}
    </section>`;
}

export function stats(play) {
  const s = computeStats(play.progress.data, play.loci);
  const pct = (x) => (x === null ? '—' : `${Math.round(x * 100)}%`);
  const tile = (value, label) => `<div class="tile"><div class="tile-v">${value}</div><div class="tile-l">${label}</div></div>`;
  const bars = s.places.map((p) => {
    const h = p.rate === null ? 0 : Math.max(4, p.rate * 100);
    const tip = p.tries ? `${p.n}. ${p.label}: ${p.tries ? Math.round(p.rate * 100) : 0}% of ${p.tries}` : `${p.n}. ${p.label}: not played yet`;
    const weak = s.weakest.some((w) => w.n === p.n);
    return `<div class="bar-col ${weak ? 'weak' : ''}" title="${esc(tip)}" aria-label="${esc(tip)}">
      <div class="bar-track"><div class="bar" style="height:${h}%"></div></div><div class="bar-n">${p.n}</div></div>`;
  }).join('');
  return `
    <section class="play-card setup stats">
      <div class="eyebrow">Your progress · ${esc(play.palaceName ?? '')}</div>
      <h2>${s.runs ? `${s.recalled} things remembered` : 'Nothing played yet'}</h2>
      <div class="tiles">
        ${tile(s.runs, s.runs === 1 ? 'run' : 'runs')}
        ${tile(pct(s.accuracy), 'recalled')}
        ${tile(s.bestStreak, 'best streak')}
        ${tile(s.dayStreak, s.dayStreak === 1 ? 'day in a row' : 'days in a row')}
      </div>
      <div class="play-label">Recall by place</div>
      <div class="bars" role="img" aria-label="Share recalled at each place">${bars}</div>
      ${s.weakest.length ? `<div class="play-label">Places to strengthen</div>
        <ol class="tally weak-list">${s.weakest.map((w) => `<li><span class="t-place">${esc(w.label)}</span>
          <span class="t-item">${Math.round(w.rate * 100)}%</span></li>`).join('')}</ol>
        <p class="play-lede small">Images slip where they don't touch the place. Next time, make the thing break, climb or soak these.</p>`
        : `<p class="play-lede small">${s.runs ? 'No weak places yet. Play a few more runs to see a pattern.' : 'Play a list and your recall per place shows up here.'}</p>`}
      <div class="play-actions">
        <button class="primary" data-act="setup" autofocus>Back to lists</button>
      </div>
    </section>`;
}

export function map(play) {
  const m = play.map;
  const dots = m.points.map((p, i) => {
    const { left, top } = m.at(p);
    const a = m.assigned[i];
    const state = m.checked ? (m.isRight(i) ? 'right' : 'wrong') : a ? 'filled' : '';
    const label = m.checked ? `${a ?? 'empty'}${m.isRight(i) ? ', right' : `, should be ${m.items[i]}`}` : a ? `holds ${a}` : 'empty place';
    return `<button class="map-dot ${state} ${p.up ? 'up' : ''}" style="left:${left}%;top:${top}%" data-act="map-dot" data-value="${i}" aria-label="Place on the map: ${esc(label)}">
      ${a ? `<span class="map-tag">${esc(a)}${m.checked && !m.isRight(i) ? ` <s>→ ${esc(m.items[i])}</s>` : ''}</span>` : ''}</button>`;
  }).join('');
  const ent = m.at(m.entrance);
  return `
    <section class="play-card map-card">
      <div class="eyebrow">Bonus · the map</div>
      <h2>${m.checked ? `${m.score} of ${m.items.length} on the map` : 'Where did each one go?'}</h2>
      <p class="play-lede small">${m.checked ? (m.score === m.items.length ? 'You know the palace from above, too.' : 'The places you mixed up are the ones to walk again.')
        : 'The palace from above, without numbers. Pick a word, then the place where you left it.'}</p>
      <div class="map-plate" style="aspect-ratio:${m.aspect.toFixed(3)}">
        <span class="map-entrance" style="left:${ent.left}%;top:${ent.top}%">entrance</span>
        ${dots}
      </div>
      ${m.checked ? '' : `<div class="map-items">${m.items.slice().sort().map((it) => `
        <button class="chip-word ${m.selected === it ? 'on' : ''} ${m.isPlaced(it) ? 'placed' : ''}" data-act="map-item" data-value="${esc(it)}" aria-pressed="${m.selected === it}">${esc(it)}</button>`).join('')}</div>`}
      <div class="play-actions">
        ${m.checked ? '<button class="primary" data-act="map-done" autofocus>Back to results</button>'
          : `<button class="primary" data-act="map-check" ${m.complete ? '' : 'disabled'}>Check</button>
             <button class="quiet" data-act="map-done">Skip</button>`}
      </div>
    </section>`;
}

export function phase(play, { title, sub }) {
  return `<section class="phase-title" aria-live="polite"><div class="pt-title">${esc(title)}</div><div class="pt-sub">${esc(sub)}</div></section>`;
}

export function leave(play) {
  const run = play.run;
  return `
    <section class="play-card leave">
      <h2>Leave this run?</h2>
      <p class="play-lede small">${run.phase === 'encode' ? 'The images you made so far will fade unused.' : 'This run will not count.'}</p>
      <div class="play-actions">
        <button class="primary" data-act="stay" autofocus>Keep going</button>
        <button class="quiet" data-act="leave">Leave <kbd>Esc</kbd></button>
      </div>
    </section>`;
}

export function routeTravel(play, { i }) {
  return `<section class="play-card travel"><div class="eyebrow">The route · place ${i + 1}</div>
    <div class="travel-place">${esc(play.label(i))}</div></section>`;
}

export function routeWalk(play, { i }) {
  const r = play.route;
  const mark = (i + 1) % 10 === 0 ? ' · the tenth, marked X' : (i + 1) % 5 === 0 ? ' · the fifth, marked with a hand' : '';
  return `
    <section class="play-card encode">
      <div class="eyebrow">Place ${i + 1} of ${r.length}${mark}</div>
      <div class="item route-name">${esc(play.label(i))}</div>
      <p class="play-prompt">Look at it for a moment. Nothing goes here yet: just learn the place and where it comes in the walk.</p>
      <div class="play-actions"><button class="primary" data-act="route-next" autofocus>Next place <kbd>Space</kbd></button></div>
    </section>`;
}

export function routeQuiz(play, { choices, answered, right }) {
  const r = play.route;
  const n = r.asked + 1;
  const truth = r.labels[r.asked];
  const done = answered !== undefined;
  return `
    <section class="play-card recall route-quiz ${done ? (right ? 'is-right' : 'is-wrong') : ''}">
      <div class="eyebrow">Question ${r.q + 1} of ${r.questions.length}</div>
      <h2>What stands at place ${n}?</h2>
      <div class="choices">${choices.map((c, k) => {
        const state = !done ? '' : c === truth ? 'right' : c === answered ? 'wrong' : 'dim';
        return `<button class="choice ${state}" data-act="route-pick" data-value="${esc(c)}" ${done ? 'disabled' : ''}><kbd>${k + 1}</kbd>${esc(c)}</button>`;
      }).join('')}</div>
      <p class="feedback" role="status">${!done ? '' : right ? 'Yes.' : `Place ${n} is the ${esc(lower(truth))}.`}</p>
    </section>`;
}

export function routeDone(play) {
  const r = play.route;
  return `
    <section class="play-card setup">
      <div class="eyebrow">The route</div>
      <h2>${r.right} of ${r.questions.length}</h2>
      <p class="play-lede">${r.perfect ? `You know the first ${r.length} places. Now give them something to hold.`
        : 'Walk it once more, or begin anyway: the places get easier as images land on them.'}</p>
      <div class="play-actions">
        <button class="primary" data-act="setup" autofocus>Choose a list <kbd>Space</kbd></button>
        ${r.perfect ? '' : '<button class="quiet" data-act="route">Walk it again</button>'}
      </div>
    </section>`;
}

export function reviewIntro(play, { kept }) {
  const r = reviews.nextReview(kept);
  return `
    <section class="play-card setup">
      <div class="eyebrow">Review · ${reviews.label(r.days)}</div>
      <h2>${esc(kept.deckName)}</h2>
      <p class="play-lede">You kept this list of ${kept.items.length} ${reviews.ago(Date.now() - kept.at)}.
        Before you begin, walk the route in your head and see what waits at each place. Then answer place by place.</p>
      <div class="play-actions">
        <button class="primary" data-act="review-start" autofocus>Begin the review <kbd>Space</kbd></button>
        <button class="quiet" data-act="exit">Not now</button>
      </div>
    </section>`;
}

export function results(play, change = {}) {
  const run = play.run;
  return `
    <section class="play-card results">
      <div class="eyebrow">${esc(run.deck.name)} · ${run.length} places${run.mode.order !== 'forward' ? ` · ${run.mode.order === 'backward' ? 'backwards' : 'any order'}` : ''}${run.mode.typed ? ' · typed' : ''}</div>
      <h2>${run.score} of ${run.length}</h2>
      ${change.review ? `<div class="badge-line">${change.review.next ? `Next review ${reviews.when(change.review.next.due - Date.now())}` : 'All four reviews done'}</div>` : ''}
      ${change.unlocked ? `<div class="badge-line unlock">${change.unlocked} places unlocked</div>`
        : change.newBest ? `<div class="badge-line">New best, up from ${change.prev}</div>`
        : !run.review && !change.first && play.progress.best(run.length) !== null ? `<div class="badge-line quiet-line">Best: ${play.progress.best(run.length)} of ${run.length}</div>` : ''}
      <p class="play-lede">${run.review ? (run.perfect ? 'Every one is still there.'
        : 'Walk to the places that faded and make those images again, stranger than before.')
        : run.perfect ? 'Every one came back. Try a longer list on the same places.'
        : 'The misses are where the image didn\'t touch the place. Next time make those images break, climb or soak the place.'}</p>
      <ol class="tally">${run.items.map((it, k) => {
        const a = run.answers[k];
        const ok = run.isRight(k);
        return `<li class="${ok ? 'ok' : 'miss'}"><span class="t-place">${esc(play.label(k))}</span>
          <span class="t-item">${esc(it)}${ok ? '' : a ? ` <s>${esc(a)}</s>` : ' <i>not recalled</i>'}</span></li>`;
      }).join('')}</ol>
      <div class="play-actions">
        ${change.unlocked ? `<button class="primary" data-act="climb" data-value="${change.unlocked}" autofocus>Try ${change.unlocked}</button>
        <button class="quiet" data-act="again">Another ${run.length}</button>`
        : '<button class="primary" data-act="again" autofocus>New list <kbd>Space</kbd></button>'}
        ${run.review ? '' : run.keptId ? '<span class="kept">Kept · review tomorrow</span>'
          : '<button class="quiet keep" data-act="keep" title="Bring this list back after a day, a week and a month">Keep this list</button>'}
        <button class="quiet" data-act="setup">Change list</button>
        ${run.length >= 3 ? '<button class="quiet" data-act="map">Bonus: the map</button>' : ''}
        <button class="quiet" data-act="stats">Progress</button>
        <button class="quiet" data-act="exit">Menu</button>
      </div>
    </section>`;
}
