// Post-processing: a soft bloom on bright spots (lamps, windows), a vignette,
// fine film grain and a light colour grade per palace. It switches itself off
// if frames get slow, and keeps the grain still under reduced motion.
import * as THREE from 'three';
import { reducedMotion } from './settings.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Per palace: bloom strength, vignette, warmth of shadows (r, g, b lift), saturation.
const GRADES = {
  archive: { bloom: 0.38, vignette: 0.42, lift: [0.018, 0.010, 0.0], gain: [1.03, 1.0, 0.95], sat: 0.95 },
  garden: { bloom: 0.18, vignette: 0.28, lift: [0.006, 0.006, 0.012], gain: [1.02, 1.01, 0.98], sat: 1.05 },
  default: { bloom: 0.3, vignette: 0.35, lift: [0.01, 0.008, 0.004], gain: [1, 1, 1], sat: 1 },
};

const FinishShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    vignette: { value: 0.35 },
    grain: { value: 0.02 },
    lift: { value: new THREE.Vector3() },
    gain: { value: new THREE.Vector3(1, 1, 1) },
    sat: { value: 1 },
    aspect: { value: 1 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float time, vignette, grain, sat, aspect;
    uniform vec3 lift, gain;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec3 col = c.rgb * gain + lift * (1.0 - c.rgb);
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, sat);
      vec2 d = (vUv - 0.5) * vec2(aspect, 1.0);
      col *= 1.0 - vignette * smoothstep(0.35, 1.05, length(d));
      col += (hash(vUv * 1024.0 + fract(time) * 37.0) - 0.5) * grain;
      gl_FragColor = vec4(col, c.a);
    }`,
};

export class Post {
  constructor(renderer, scene, camera, palace) {
    this.renderer = renderer;
    this.enabled = true;

    const g = GRADES[palace] ?? GRADES.default;
    const size = renderer.getSize(new THREE.Vector2());
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.bloom = new UnrealBloomPass(size, g.bloom, 0.55, 0.8);
    this.composer.addPass(this.bloom);
    this.finish = new ShaderPass(FinishShader);
    const u = this.finish.uniforms;
    u.vignette.value = g.vignette;
    u.lift.value.set(...g.lift);
    u.gain.value.set(...g.gain);
    u.sat.value = g.sat;
    this.composer.addPass(this.finish);
    this.composer.addPass(new OutputPass());
    this.slow = 0;
    this.last = 0;
    this.fullRate = true; // set by the loops: false while frames are paced
    this.scene = scene;
    this.camera = camera;
    this.setSize();
    addEventListener('resize', () => this.setSize());
  }

  // The effects are soft, so they don't need retina resolution: cap at 1.5.
  setSize() {
    this.composer.setPixelRatio(Math.min(this.renderer.getPixelRatio(), this.lowRes ? 1 : 1.5));
    this.composer.setSize(innerWidth, innerHeight);
    this.finish.uniforms.aspect.value = innerWidth / innerHeight;
  }

  render() {
    if (!this.enabled) return this.renderer.render(this.scene, this.camera);
    const now = performance.now();
    // Frames slower than ~30 fps for two seconds count as slow, but only while
    // the loop is meant to run at full rate (paced idle frames are slow on purpose).
    const dt = now - this.last;
    this.last = now;
    if (this.fullRate && dt > 34 && dt < 500) this.slow += dt;
    else if (this.fullRate) this.slow = Math.max(0, this.slow - dt);
    // Slow frames: first drop to 1× resolution, then turn the effects off.
    if (this.slow > 2000 && !this.forced) {
      this.slow = 0;
      if (!this.lowRes) { this.lowRes = true; this.renderer.setPixelRatio(1); this.setSize(); console.info('post: 1x resolution (slow frames)'); }
      else { this.enabled = false; console.info('post: off (slow frames)'); }
    }
    if (!reducedMotion()) this.finish.uniforms.time.value = now / 1000;
    this.composer.render();
  }
}
