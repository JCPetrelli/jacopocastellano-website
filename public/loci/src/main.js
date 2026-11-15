// loci-forge web player: loads assets/<palace>/ exported by scripts/export_web.py.
// Open index.html?palace=<name> (default: archive).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Input } from './input.js';
import { LociHints, loadLoci, loadMarkerFont } from './loci.js';
import { Drift } from './drift.js';
import { computePoses, Glide } from './glide.js';
import { Mannequin } from './mannequin.js';
import { Menu } from './menu.js';
import { Post } from './post.js';
import { Sound } from './sound.js';
import { SettingsPanel, onChange as onSettings, settings as getSettings } from './settings.js';
import { Play } from './game/play.js';
import { buildWorld, Mover } from './physics.js';
import { Player } from './player.js';
import { Portals } from './portals.js';
import { Tutorial } from './tutorial.js';

const params = new URLSearchParams(location.search);
const palace = params.get('palace') || 'archive';
const base = `assets/${palace}/`;
document.body.dataset.palace = palace; // per-palace accent colour (style.css)

const ui = {
  overlay: document.getElementById('overlay'),
  status: document.getElementById('status'),
  progress: document.getElementById('progress'),
  prompt: document.getElementById('prompt'),
  fade: document.getElementById('fade'),
  tutorial: document.getElementById('tutorial'),
  play: document.getElementById('play'),
  hint: document.getElementById('hint'),
};

// Sound starts on the first click or key (browsers require a gesture).
const sound = new Sound(palace);
sound.volume = getSettings().volume;
const soundBtn = document.getElementById('sound');
const showSound = () => {
  soundBtn.classList.toggle('off', !sound.on);
  soundBtn.setAttribute('aria-pressed', String(sound.on));
  soundBtn.title = sound.on ? 'Sound on (M)' : 'Sound off (M)';
};
showSound();
const wake = () => sound.wake();
addEventListener('pointerdown', wake, { once: true });
addEventListener('keydown', wake, { once: true });
soundBtn.addEventListener('click', (e) => { e.stopPropagation(); sound.wake(); sound.toggle(); showSound(); });
addEventListener('keydown', (e) => {
  if (e.code === 'KeyM' && e.target.tagName !== 'INPUT') { sound.wake(); sound.toggle(); showSound(); }
});

const menu = new Menu({ palace, onChoose: (mode) => choose(mode) });
let choose = () => {};

// Blender (x, y, z) Z-up -> three (x, z, -y) Y-up
const fromBlender = ([x, y, z]) => new THREE.Vector3(x, z, -y);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0c0a);
scene.fog = new THREE.Fog(0x14110e, 14, 55);
scene.add(new THREE.HemisphereLight(0xffe0bd, 0x2b2119, 2.2));
const key = new THREE.DirectionalLight(0xffd7a8, 1.2);
key.position.set(-3, 8, 4);
scene.add(key);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.03, 200);
let lens = 24;

function fitCamera() {
  const aspect = innerWidth / innerHeight;
  // Blender's sensor fit AUTO: 36 mm across the larger side.
  const half = Math.atan(18 / lens);
  const vfov = aspect >= 1 ? 2 * Math.atan(Math.tan(half) / aspect) : 2 * half;
  camera.fov = THREE.MathUtils.radToDeg(vfov);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
addEventListener('resize', fitCamera);

const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (_url, loaded, total) => {
  ui.progress.style.width = `${Math.round((loaded / total) * 100)}%`;
};
const draco = new DRACOLoader().setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/gltf/');
const loader = new GLTFLoader(loadingManager).setDRACOLoader(draco);

// Collision and glass come from glTF extras written by the exporter
// (userData.loci_nocollide, userData.loci_glass), not from names.
function preparePalace(root) {
  const colliders = [];
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const glass = obj.userData.loci_glass;
    if (glass) {
      obj.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setRGB(...glass.color, THREE.LinearSRGBColorSpace),
        transparent: true,
        opacity: glass.opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      obj.renderOrder = 1;
    } else {
      // Lighting is baked into the atlas: draw it as is.
      obj.material = new THREE.MeshBasicMaterial({ map: obj.material.map, side: THREE.DoubleSide });
    }
    if (!obj.userData.loci_nocollide) colliders.push(obj);
  });
  return colliders;
}

async function main() {
  // palace.json is always refetched; its export time versions the other assets,
  // so a re-export is never hidden behind the browser's cache.
  const info = await (await fetch(`${base}palace.json`, { cache: 'no-cache' })).json();
  const v = `?v=${encodeURIComponent(info.exported)}`;
  document.title = `${ui.overlay.querySelector('#title').textContent} · Loci, a memory palace game`;
  lens = getSettings().lens ?? info.walker.lens;
  new SettingsPanel({ button: document.getElementById('gear'), el: document.getElementById('settings'), palace, defaultLens: info.walker.lens });
  onSettings((st) => {
    sound.setVolume(st.volume);
    if (st.lens) { lens = st.lens; fitCamera(); }
  });
  fitCamera();
  if (info.sky?.background) {
    scene.background.setRGB(...info.sky.background, THREE.LinearSRGBColorSpace);
    scene.fog.color.copy(scene.background);
  }
  if (info.sky?.fog) [scene.fog.near, scene.fog.far] = info.sky.fog;

  ui.status.textContent = 'Loading palace…';
  const [palaceGltf, mannequinGltf, lociData, examples] = await Promise.all([
    loader.loadAsync(`${base}palace.glb${v}`),
    loader.loadAsync(`${base}mannequin.glb${v}`),
    loadLoci(`${base}loci.json`),
    loadLoci(`${base}tutorial.json`),
    loadMarkerFont(),
  ]);
  scene.add(palaceGltf.scene);
  const hints = lociData ? new LociHints(lociData.loci, fromBlender) : null;
  if (hints) scene.add(hints.group);
  // Only a palace with worked examples (tutorial.json) has the tutorial.
  const tutorial = hints && examples
    ? new Tutorial({ loci: lociData.loci, examples, hints, fromBlender, palace, el: ui.tutorial })
    : null;
  if (tutorial) ui.hint.textContent = `T: tutorial · ${ui.hint.textContent}`;
  const portals = new Portals(lociData?.portals ?? [], lociData?.loci ?? [], fromBlender, palace);
  const arrival = portals.arrival(params.get('from'));
  const colliders = preparePalace(palaceGltf.scene);
  const drawn = [];
  palaceGltf.scene.traverse((o) => { if (o.isMesh) drawn.push(o); });

  ui.status.textContent = 'Building collision…';
  await new Promise((r) => setTimeout(r));
  const mover = new Mover(buildWorld(colliders), { height: info.walker.eye_height + 0.13 });

  const mannequin = new Mannequin(mannequinGltf.scene);
  scene.add(mannequin.root);
  const player = new Player({
    mannequin, mover, camera,
    settings: info.walker,
    spawn: arrival?.spawn ?? fromBlender(info.spawn.location),
    yaw: arrival?.yaw ?? info.spawn.yaw,
  });
  player.place();

  // Viewing poses for the guided glide (Play), computed once from the collision world.
  const lociAt = (lociData?.loci ?? []).map((l) => fromBlender(l.at));
  const t0 = performance.now();
  const viewBvh = buildWorld(drawn);
  const t1 = performance.now();
  const poses = computePoses(mover.bvh, viewBvh, lociAt, player.pos.clone().setY(player.pos.y + info.walker.eye_height));
  const timings = { viewBvh: Math.round(t1 - t0), poses: Math.round(performance.now() - t1) };
  const glide = new Glide(camera, { view: viewBvh, veil: document.getElementById('veil') });
  const viewWorld = viewBvh;
  hints?.addThreads((p) => {
    const hit = viewWorld.raycastFirst(new THREE.Ray(p, new THREE.Vector3(0, -1, 0)), THREE.DoubleSide);
    return hit ? hit.point.y : null;
  });

  const input = new Input(renderer.domElement);
  window.loci = { timings, viewBvh, player, input, mover, scene, camera, renderer, hints, portals, tutorial, poses, glide, mannequin }; // for the console and tests
  ui.status.textContent = 'Ready';
  // Play: no pointer lock, the camera glides; its own loop runs while it is open.
  const play = poses.length ? new Play({
    el: ui.play, glide, poses, hints, camera, palace, sound,
    // Top-down plan positions; a locus 3 m above the spawn floor counts as upstairs.
    points: lociAt.map((p) => ({ x: p.x, z: p.z, up: p.y - player.pos.y > 4 })),
    entrance: { x: player.pos.x, z: player.pos.z },
    loci: lociData.loci.map((l, i) => ({ n: i + 1, label: l.label })),
    onExit: () => {
      play.close();
      player.place();
      ui.overlay.classList.remove('hidden');
      refreshReviews().then(() => menu.render(false));
  startTitle();
      menu.render(false);
    },
  }) : null;
  window.loci.play = play;
  window.loci.sound = sound;
  const clock = new THREE.Clock();
  // Run `step(dt)` at most `fps()` times a second (0 = every frame); the
  // skipped frames' time is carried over so motion keeps its speed.
  const IDLE_FPS = 24;
  const DRIFT_FPS = 30;
  let carried = 0;
  const paced = (fps, step) => () => {
    carried += clock.getDelta();
    const f = fps();
    if (f && carried < 1 / f - 0.002) return;
    step(Math.min(carried, 0.25)); // time-based motion: slow machines skip, never crawl
    carried = 0;
  };

  // Play renders at full rate only while the camera glides; a still screen
  // (a card waiting for the player) drops to IDLE_FPS to keep laptops cool.
  const playLoop = paced(() => (glide.busy ? 0 : IDLE_FPS), (dt) => {
    post.fullRate = glide.busy;
    glide.update(dt);
    hints?.update(clock.elapsedTime);
    render();
  });

  // Kept lists due for review appear on the title screen.
  const refreshReviews = async () => {
    if (!play) return;
    const R = await import('./game/reviews.js');
    const data = play.progress.data;
    const list = R.due(data).map((k) => {
      const r = R.nextReview(k);
      return { id: k.id, title: k.deckName, detail: `${k.items.length} places · kept ${R.ago(Date.now() - k.at)} · the ${R.label(r.days)} review` };
    });
    const up = R.upcoming(data);
    menu.setReviews(list, up ? `Next review: ${up.k.deckName}, ${R.when(up.r.due - Date.now())}` : '');
  };
  window.loci.refreshReviews = refreshReviews;
  window.loci.menuRender = () => menu.render(false);

  choose = (mode) => {
    stopTitle();
    if (mode.startsWith('review:')) {
      if (tutorial?.open) tutorial.toggle();
      ui.overlay.classList.add('hidden');
      mannequin.root.visible = false;
      play.openReview(mode.slice(7));
      clock.getDelta();
      renderer.setAnimationLoop(playLoop);
      return;
    }
    if (mode === 'play') {
      if (tutorial?.open) tutorial.toggle();
      ui.overlay.classList.add('hidden');
      mannequin.root.visible = false;
      play.open();
      clock.getDelta();
      renderer.setAnimationLoop(playLoop);
      return;
    }
    if (mode === 'learn' && tutorial && !tutorial.open) tutorial.toggle();
    if (mode === 'walk' && tutorial?.open) tutorial.toggle();
    input.lock();
  };
  await refreshReviews();
  // Walking needs a keyboard and mouse; on a touch-only device Play still works.
  const touchOnly = matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches;
  menu.ready({
    learn: touchOnly ? 'needs a keyboard' : tutorial ? true : 'in the Archive',
    play: !!play,
    walk: touchOnly ? 'needs a keyboard' : true,
  });

  // Only run the loop while walking; when paused, the last frame stays on screen.
  const post = new Post(renderer, scene, camera, palace);
  if (params.has('nopost')) post.enabled = false;
  window.loci.post = post;
  const render = () => post.render();

  // The title screen's drift runs until the player first starts walking or
  // playing; after a pause the menu shows the frozen frame instead.
  const drift = new Drift(camera, poses, document.getElementById('veil'));
  window.loci.drift = drift;
  // The drift is slow: 30 fps is smooth enough for it.
  const titleLoop = paced(() => DRIFT_FPS, (dt) => {
    post.fullRate = false;
    drift.update(dt);
    hints?.update(clock.elapsedTime);
    render();
  });
  const startTitle = () => {
    mannequin.root.visible = false;
    drift.start();
    clock.getDelta();
    renderer.setAnimationLoop(titleLoop);
  };
  const stopTitle = () => {
    drift.stop();
    mannequin.root.visible = true;
  };
  window.loci.startTitle = startTitle;
  startTitle();
  let leaving = false;
  const loop = () => {
    post.fullRate = true;
    // Read key presses before player.update consumes them.
    if (hints && input.pressed.has('KeyL')) hints.toggle();
    tutorial?.update(input.pressed, player.pos);
    const door = leaving ? null : portals.near(player.pos);
    ui.prompt.hidden = !door;
    if (door) {
      ui.prompt.textContent = `E: through the ${door.label.toLowerCase()} to the ${door.to}`;
      if (input.pressed.has('KeyE')) {
        leaving = true;
        ui.fade.classList.add('on');
        setTimeout(() => portals.go(door), 600);
      }
    }
    player.update(Math.min(clock.getDelta(), 0.05), input);
    hints?.update(clock.elapsedTime);
    render();
  };
  input.onLockChange = (locked) => {
    ui.overlay.classList.toggle('hidden', locked);
    if (!locked) menu.paused();
    clock.getDelta();
    renderer.setAnimationLoop(locked ? loop : null);
  };
  addEventListener('resize', render);
  render();
}

main().catch((err) => {
  console.error(err);
  ui.status.textContent = `Could not load "${palace}": ${err.message}`;
});
