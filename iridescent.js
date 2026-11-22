// JC-827: liquid iridescent hero backdrop (WebGL, domain-warped noise).
// Palette: sage -> amber -> oxblood, pulled toward black.
(function () {
  const canvas = document.getElementById('iri');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) { canvas.classList.add('iri-fallback'); return; }

  const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}
vec3 pal(float x){
  vec3 sage=vec3(.627,.878,.671), amber=vec3(1.,.675,.18), ox=vec3(.647,.176,.145), ink=vec3(.02);
  x=clamp(x,0.,1.);
  if(x<.33) return mix(ink,ox,x/.33);
  if(x<.62) return mix(ox,amber,(x-.33)/.29);
  if(x<.85) return mix(amber,sage,(x-.62)/.23);
  return mix(sage,ink,(x-.85)/.15);
}
void main(){
  vec2 uv=gl_FragCoord.xy/r; vec2 p=uv*vec2(r.x/r.y,1.)*1.1;
  float T=t*.045;
  vec2 q=vec2(fbm(p+T),fbm(p+vec2(5.2,1.3)-T));
  vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+T*1.3+m*.4),fbm(p+3.*q+vec2(8.3,2.8)-T));
  float f=fbm(p+3.5*w);
  vec3 c=pal(f*1.1-.12+.12*sin(T*3.+uv.x*2.));
  float sheen=pow(abs(sin((w.x-w.y)*9.+T*4.)),18.)*.35;
  c+=sheen*vec3(1.,.95,.85);
  c*=smoothstep(1.2,.2,length(uv-.5))*.82;
  gl_FragColor=vec4(c,1.);
}`;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { canvas.classList.add('iri-fallback'); return; }
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm');

  // Render at reduced resolution: the texture is soft, and it keeps the GPU (and the Mac) cool.
  const SCALE = 0.5;
  function resize() {
    const w = Math.max(1, Math.floor(canvas.clientWidth * SCALE));
    const hh = Math.max(1, Math.floor(canvas.clientHeight * SCALE));
    if (canvas.width !== w || canvas.height !== hh) { canvas.width = w; canvas.height = hh; gl.viewport(0, 0, w, hh); }
  }
  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(frame); }).observe(canvas);

  const t0 = performance.now();
  let last = 0;
  function frame(now) {
    if (!visible) return;
    if (now - last > 1000 / 30) { // cap at 30 fps
      last = now;
      resize();
      mx += (tx - mx) * 0.03; my += (ty - my) * 0.03;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, still ? 20 : (now - t0) / 1000 + 20);
      gl.uniform2f(uM, mx, -my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.classList.add('is-ready'); // JC-973: fade in after the first frame
    }
    if (!still) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
