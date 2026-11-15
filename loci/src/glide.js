// Guided camera for Play: a viewing pose per locus and a smooth glide between
// poses, so the player never has to steer (low motion, no pointer lock).
// A pose stands back from the locus marker, on a real floor at eye height,
// with a clear line of sight; it prefers the side you approach from.
import * as THREE from 'three';
import { reducedMotion } from './settings.js';

const EYE = 1.6; // metres above the floor
const DISTANCES = [3.2, 2.6, 3.8, 2.0, 4.6, 5.6];
const ANGLES = [0, 30, -30, 60, -60, 90, -90, 120, -120, 150, -150, 180].map(THREE.MathUtils.degToRad);
const LOOK_DROP = 0.8; // look a little below the floating number, at the object
const CLEARANCE = 0.35; // the eye must be this far from any surface
const SPEED = 2.4; // m/s along the glide
const MIN_TIME = 1.4;
const MAX_TIME = 4.2;

const _ray = new THREE.Ray();
const _dir = new THREE.Vector3();
const _hit = {};

function firstHit(bvh, from, dir, far) {
  _ray.origin.copy(from);
  _ray.direction.copy(dir);
  const hit = bvh.raycastFirst(_ray, THREE.DoubleSide);
  return hit && hit.distance <= far ? hit : null;
}

// How cluttered the view from `eye` towards `target` is: rays fanned round the
// gaze that hit something within NEAR count against the pose (0 = open).
const NEAR = 2.0;
// Offsets across the 18 mm lens's wide view (side, up), in tangent units.
const FAN = [[0, 0], [-0.45, 0], [0.45, 0], [-0.85, 0], [0.85, 0], [-0.4, 0.3], [0.4, 0.3], [-0.4, -0.3], [0.4, -0.3], [-0.8, -0.35], [0.8, -0.35], [0, 0.4], [0, -0.4]];
const _yaw = new THREE.Vector3();
function clutter(bvh, eye, target) {
  const fwd = new THREE.Vector3().subVectors(target, eye).normalize();
  const side = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(side, fwd);
  let sum = 0;
  for (const [h, v] of FAN) {
    _yaw.copy(fwd).addScaledVector(side, h).addScaledVector(up, v).normalize();
    const hit = firstHit(bvh, eye, _yaw, NEAR);
    if (hit) sum += 1 - hit.distance / NEAR;
  }
  return sum;
}

// Other loci's numbers too close to the eye, or floating in front of this one.
function crowd(markers, at, eye, target) {
  const gaze = new THREE.Vector3().subVectors(target, eye);
  const far = gaze.length();
  gaze.normalize();
  let sum = 0;
  for (const m of markers) {
    if (m === at) continue;
    const to = new THREE.Vector3().subVectors(m, eye);
    const d = to.length();
    if (d < 1.6) sum += 1;
    else if (d < far && to.normalize().dot(gaze) > 0.985) sum += 1;
  }
  return sum;
}

function clearLine(bvh, a, b) {
  const d = _dir.subVectors(b, a);
  const len = d.length();
  d.divideScalar(len);
  const hit = firstHit(bvh, a, d, len);
  return !hit || hit.distance > len - 1.0; // a hit near the end is the object itself
}

// The floor under (x, z), searching down from `top`, if within `depth`.
function floorBelow(bvh, x, z, top, depth) {
  const hit = firstHit(bvh, new THREE.Vector3(x, top, z), new THREE.Vector3(0, -1, 0), depth);
  return hit ? hit.point.y : null;
}

// Find a viewing pose for a locus marker at `at`, approached from `from`.
export function poseFor({ floor: bvh, view, markers }, at, from) {
  const target = at.clone();
  target.y -= LOOK_DROP;
  const approach = new THREE.Vector2(from.x - at.x, from.z - at.z);
  const base = approach.lengthSq() > 1e-4 ? Math.atan2(approach.y, approach.x) : 0;
  let best = null;
  const why = { nofloor: 0, high: 0, tight: 0, blocked: 0 };
  for (const dist of DISTANCES) {
    for (const da of ANGLES) {
      const a = base + da;
      const x = at.x + Math.cos(a) * dist;
      const z = at.z + Math.sin(a) * dist;
      const floor = floorBelow(bvh, x, z, at.y + 0.5, 6);
      if (floor === null) { why.nofloor++; continue; }
      const eye = new THREE.Vector3(x, floor + EYE, z);
      if (eye.y > at.y + 1.2) { why.high++; continue; } // looking down on it from far above
      view.closestPointToPoint(eye, _hit);
      if (_hit.distance < CLEARANCE) { why.tight++; continue; }
      if (!clearLine(view, eye, target)) { why.blocked++; continue; }
      // Prefer the approach side, then a comfortable distance.
      const score = Math.abs(da) * 1.0 + Math.abs(dist - 3.2) * 0.6 + clutter(view, eye, target) * 2.5 + crowd(markers, at, eye, target) * 3;
      if (!best || score < best.score) best = { eye, target, score };
    }
  }
  if (!best) {
    // Nothing clear: hover in front of the marker rather than fail.
    const eye = new THREE.Vector3(at.x + Math.cos(base) * 2, at.y, at.z + Math.sin(base) * 2);
    best = { eye, target, score: Infinity, fallback: true, why };
  }
  return best;
}

// Poses for every locus in route order; the first is approached from `start`.
// `floor` is the collision BVH (where you can stand), `view` a BVH of every
// drawn mesh, walk-through decor included (what you can see).
export function computePoses(floor, view, loci, start) {
  const ctx = { floor, view, markers: loci };
  return loci.map((at, i) => poseFor(ctx, at, i === 0 ? start : loci[i - 1]));
}

const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);

// ---- Path planning: never glide through a wall or a floor ----
const PATH_SAMPLES = 24;
const PATH_CLEAR = 0.3; // metres the eye keeps from surfaces along the way

// Is the polyline sampled from `curve` clear of geometry?
export function curveClear(view, curve) {
  const pts = curve.getPoints(PATH_SAMPLES);
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const d = _dir.subVectors(b, a);
    const len = d.length();
    if (len < 1e-4) continue;
    d.divideScalar(len);
    if (firstHit(view, a, d, len + PATH_CLEAR)) return false;
  }
  for (let i = 2; i < pts.length - 2; i += 3) {
    view.closestPointToPoint(pts[i], _hit);
    if (_hit.distance < PATH_CLEAR) return false;
  }
  return true;
}

function arc(from, to) {
  const span = from.distanceTo(to);
  const lift = Math.min(0.6, span * 0.08);
  const c1 = from.clone().lerp(to, 1 / 3); c1.y += lift;
  const c2 = from.clone().lerp(to, 2 / 3); c2.y += lift;
  return new THREE.CubicBezierCurve3(from.clone(), c1, c2, to.clone());
}

// A clear curve from `from` to `to`: the gentle arc if it is clear, else a
// smooth curve through one detour point; null if neither (the caller cuts).
export function planPath(view, from, to) {
  const direct = arc(from, to);
  if (!view || curveClear(view, direct)) return direct;
  const mid = from.clone().lerp(to, 0.5);
  const along = new THREE.Vector3().subVectors(to, from).setY(0);
  const side = new THREE.Vector3(-along.z, 0, along.x).normalize();
  if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
  let best = null;
  for (const up of [0, 0.8, 1.6, 2.4, -0.6]) {
    for (const off of [0, 1, -1, 2, -2, 3, -3, 4.5, -4.5]) {
      const m = mid.clone().addScaledVector(side, off);
      m.y += up;
      const curve = new THREE.CatmullRomCurve3([from.clone(), m, to.clone()], false, 'centripetal');
      if (!curveClear(view, curve)) continue;
      const cost = Math.abs(off) + Math.abs(up) * 1.3;
      if (!best || cost < best.cost) best = { curve, cost };
    }
    if (best) break;
  }
  return best?.curve ?? null;
}

export class Glide {
  // `view` is the BVH of drawn meshes (for path checks), `veil` a fade element.
  constructor(camera, { view = null, veil = null } = {}) {
    this.camera = camera;
    this.view = view;
    this.veil = veil;
    this.eye = new THREE.Vector3();
    this.look = new THREE.Vector3();
    this.anim = null;

  }

  get busy() { return !!this.anim; }

  // Jump straight to a pose.
  set(pose) {
    this.anim = null;
    this.eye.copy(pose.eye);
    this.look.copy(pose.target);
    this.apply();
  }

  // Glide to a pose; resolves when there. With reduced motion it cuts.
  to(pose) {
    if (reducedMotion()) { this.set(pose); return Promise.resolve(); }
    const from = { eye: this.eye.clone(), look: this.look.clone() };
    const curve = planPath(this.view, from.eye, pose.eye);
    this.anim?.resolve();
    this.lastCut = !curve;
    if (!curve) return this.cut(pose);
    const time = THREE.MathUtils.clamp(curve.getLength() / SPEED, MIN_TIME, MAX_TIME);
    return new Promise((resolve) => {
      this.anim = { curve, from, pose, time, t: 0, resolve };
    });
  }

  // No clear path: fade through black and reappear at the pose.
  cut(pose) {
    if (!this.veil) { this.set(pose); return Promise.resolve(); }
    this.veil.classList.add('on');
    return new Promise((resolve) => {
      setTimeout(() => {
        this.set(pose);
        this.veil.classList.remove('on');
        setTimeout(resolve, 350);
      }, 600);
    });
  }

  update(dt) {
    const a = this.anim;
    if (!a) return false;
    a.t = Math.min(1, a.t + dt / a.time);
    const k = smoother(a.t);
    a.curve.getPoint(k, this.eye);
    // The gaze turns a little ahead of the body, so the next locus comes into view early.
    this.look.lerpVectors(a.from.look, a.pose.target, smoother(Math.min(1, a.t * 1.35)));
    this.apply();
    if (a.t >= 1) {
      this.anim = null;
      a.resolve();
    }
    return true;
  }

  apply() {
    this.camera.position.copy(this.eye);
    this.camera.lookAt(this.look);
  }
}
