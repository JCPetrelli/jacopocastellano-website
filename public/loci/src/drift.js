// Behind the title screen: the camera drifts slowly towards one locus at a
// time, then fades through black to the next, in a shuffled order. The object
// is framed right of centre so the menu on the left never covers it.
// Under reduced motion it holds one still shot.
import * as THREE from 'three';
import { reducedMotion } from './settings.js';

const SHOT = 11; // seconds per shot
const PUSH = 0.28; // fraction of the way towards the locus covered in a shot
const FADE = 0.9; // seconds of fade at each end
const OFFSET = 0.32; // sideways shift of the gaze, so the object sits right of centre

const ease = (t) => t * t * (3 - 2 * t);

export class Drift {
  constructor(camera, poses, fadeEl) {
    this.camera = camera;
    this.poses = poses;
    this.fade = fadeEl;

    this.order = poses.map((_, i) => i).sort(() => Math.random() - 0.5);
    this.k = 0;
    this.t = 0;
    this.running = false;
    this._side = new THREE.Vector3();
    this._look = new THREE.Vector3();
  }

  start() {
    if (!this.poses.length) return;
    this.running = true;
    this.t = 0;
    this.fade.classList.remove('on');
    this.apply(0);
  }

  stop() {
    this.running = false;
    this.fade.classList.remove('on');
  }

  get pose() { return this.poses[this.order[this.k % this.order.length]]; }

  update(dt) {
    if (!this.running || reducedMotion()) return;
    this.t += dt;
    if (this.t > SHOT - FADE) this.fade.classList.add('on');
    if (this.t >= SHOT) {
      this.t = 0;
      this.k++;
      this.fade.classList.remove('on');
    }
    this.apply(this.t / SHOT);
  }

  apply(u) {
    const { eye, target } = this.pose;
    const k = ease(u) * PUSH;
    this.camera.position.lerpVectors(eye, target, k);
    const dist = this.camera.position.distanceTo(target);
    // Shift the gaze left of the target (the target then sits right of centre),
    // and turn a touch during the shot for life.
    this._side.subVectors(target, eye).cross(this.camera.up).normalize();
    this._look.copy(target).addScaledVector(this._side, -dist * (OFFSET - 0.06 * u));
    this.camera.lookAt(this._look);
  }
}
