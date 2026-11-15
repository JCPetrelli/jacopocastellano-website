// The method in three cards, shown before the first run (and from "How it
// works" on the setup screen). The drawings are abstract diagrams in gold
// line: a route, a place being touched, a review timeline. They never show an
// example mnemonic image; those are the player's to make.

const draw = (d, extra = '') => `<path d="${d}" class="ink" ${extra}/>`;

const ROUTE = `<svg viewBox="0 0 240 150" class="ex-art" aria-hidden="true">
  ${draw('M24 120 C 60 120, 50 40, 96 40 S 150 110, 190 96 S 214 40, 222 28', 'pathLength="1"')}
  ${[[24, 120, 1], [70, 64, 2], [120, 66, 3], [168, 104, 4], [214, 44, 5]].map(([x, y, n], i) => `
    <g class="stop" style="--d:${0.35 + i * 0.22}s"><circle cx="${x}" cy="${y}" r="${n === 5 ? 11 : 9}" class="${n === 5 ? 'gold' : ''}"/>
    <text x="${x}" y="${y + 4.5}">${n}</text></g>`).join('')}
</svg>`;

const TOUCH = `<svg viewBox="0 0 240 150" class="ex-art" aria-hidden="true">
  <rect x="78" y="70" width="84" height="56" rx="4" class="ink" pathLength="1"/>
  ${draw('M78 126 L 64 140 M162 126 L 176 140', 'pathLength="1"')}
  <g class="stop" style="--d:0.6s"><circle cx="120" cy="52" r="20" class="gold"/></g>
  ${draw('M120 72 L 120 70', 'pathLength="1"')}
  <g class="stop" style="--d:0.9s">${draw('M150 40 q 8 12 0 24 M160 34 q 13 18 0 36', 'pathLength="1"')}${draw('M90 40 q -8 12 0 24 M80 34 q -13 18 0 36', 'pathLength="1"')}</g>
  <g class="stop" style="--d:1.1s">${draw('M104 30 l -6 -10 M136 30 l 6 -10 M120 26 l 0 -12', 'pathLength="1"')}</g>
</svg>`;

const RETURN = `<svg viewBox="0 0 240 150" class="ex-art" aria-hidden="true">
  ${draw('M20 96 L 222 96', 'pathLength="1"')}
  ${[[20, 'now'], [62, '1 day'], [112, '1 week'], [166, '1 month'], [216, '3 months']].map(([x, t], i) => `
    <g class="stop" style="--d:${0.3 + i * 0.2}s"><circle cx="${x}" cy="96" r="${i ? 7 : 5}" class="${i ? 'gold' : ''}"/>
    <text x="${x}" y="124" class="small">${t}</text></g>`).join('')}
  ${draw('M20 60 C 40 62, 50 80, 62 82 C 74 60, 100 66, 112 74 C 130 56, 150 60, 166 66 C 186 52, 200 54, 216 56', 'pathLength="1" class="ink faint"')}
</svg>`;

export const CARDS = [
  {
    art: ROUTE,
    title: 'Places keep the order',
    text: `Walk a route you know and stop at the same places, always in the same order. The places are the
      wax tablet; what you leave on them is the writing. Learn the empty route first.`,
  },
  {
    art: TOUCH,
    title: 'Make the image do something',
    text: `Picture the thing <em>touching</em> the place: sitting on it, breaking it, pouring out of it. Make it move,
      make it too big, give it a sound or a smell. If pictures don't come, tell yourself what happens there.`,
  },
  {
    art: RETURN,
    title: 'Come back to it',
    text: `Walk the route again and each image is waiting. One session gives a small boost; coming back after a day,
      a week and a month makes the list last.`,
  },
];

export function card(i, { first }) {
  const c = CARDS[i];
  const last = i === CARDS.length - 1;
  return `
    <section class="play-card explainer">
      <div class="ex-dots">${CARDS.map((_, k) => `<span class="${k === i ? 'here' : ''}"></span>`).join('')}</div>
      ${c.art}
      <h2>${c.title}</h2>
      <p>${c.text}</p>
      <div class="play-actions">
        ${i > 0 ? '<button class="quiet" data-act="ex-back">Back</button>' : ''}
        <button class="primary" data-act="${last ? 'ex-done' : 'ex-next'}" autofocus>${last ? (first ? 'Choose a list' : 'Done') : 'Next'} <kbd>Space</kbd></button>
        ${!last ? '<button class="skip" data-act="ex-done">Skip</button>' : ''}
      </div>
    </section>`;
}
