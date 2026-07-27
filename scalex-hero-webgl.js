/* =========================================================================
   SCALEX — Hero WebGL Background (fractal fly-through)
   Arquivo unico: parametros visuais (COOKED_PARAMS) + motor completo.

   COMO USAR NO WEBFLOW:
   1. Suba este arquivo num repositorio publico do GitHub.
   2. Referencie via jsDelivr no footer do site (Site Settings > Custom Code):

      <script>
        (function () {
          if (window.location.pathname !== '/') return;
          var heroImg = document.querySelector('.hero_background-wrapper');
          if (heroImg) heroImg.style.display = 'none';
          var stage = document.createElement('div');
          stage.id = 'stage';
          stage.style.position = 'fixed';
          stage.style.inset = '0';
          stage.style.zIndex = '0';
          stage.style.pointerEvents = 'none';
          document.body.insertBefore(stage, document.body.firstChild);
        })();
      </script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/SEU-USUARIO/SEU-REPO@main/scalex-hero-webgl.js"></script>

   3. E no <head> (Site Settings > Custom Code), o CSS do #stage:

      <style>
        #stage { background-color: #050208; }
        #stage canvas { display: block; width: 100%; height: 100%; }
      </style>

   Substitua SEU-USUARIO/SEU-REPO pelo caminho real do seu repositorio.
   Toda vez que voce atualizar este arquivo no GitHub, a versao servida via
   @main atualiza sozinha (uso @main = sempre a ultima versao; troque por
   uma tag/commit fixo se quiser congelar uma versao especifica em produção).
   ========================================================================= */

window.COOKED_PARAMS={"px":2,"levels":7,"lens":600,"lensF":4,"lensOn":true,"lensStr":0.6,"lensFx":{"reveal":true,"brighten":true,"invert":false,"desat":true,"ripple":false,"condense":false},"par":2,"drift":2,"dither":true,"comp":"B","ditherMode":"bayer","dot":1.3,"glow":0,"glowR":0.6,"glowOn":true,"order":"ditherTop","ui":false,"introDur":3.5,"introStagger":0.02,"introEaseIn":2,"introEaseOut":5,"introOffX":0,"introOffY":0,"introOffZ":0,"introSpin":10,"partFan":false,"echoOn":false,"mouseOn":true,"mMove":0.2,"mScale":0.7,"mRot":0.2,"mDelay":1.32,"mInvert":false,"mZPush":0,"mRoll":0,"mReact":1.4,"mReactR":220,"mCasAmt":1.1,"mCasDelay":0.92,"scrTurn":0,"scrDolly":0,"scrRise":10,"scrDelay":0,"scrCas":1,"bScroll":"rotate","bAxis":"z","bRot":0,"bScale":0.6,"grHue":-15,"grSat":0.7,"grBright":1.48,"tintOn":true,"tintA":"#2715b2","tintB":"#2c45aa","tintAmt":1,"tintDesat":1,"tintGain":2,"tintAngle":-15,"gradOn":true,"gradA":"#5451d6","gradB":"#0f145c","gradAngle":157,"gradGain":1.7,"blobOn":true,"blobSize":910,"blobOp":0.18,"blobFeather":60,"gCell":29,"gBase":0.26,"gBright":1.6,"gScale":0.5,"gMaskR":320,"gMaskShape":"x","gVig":1,"gVigR":0.3,"gIntroDur":1.8,"gEaseIn":2,"gEaseOut":4,"gIntroDir":"centerOut","gExpandOn":true,"gExpandFrom":0.35,"gExpandDur":1.6,"gXFrom":0.3,"gXSpin":0,"gRot":0,"gMRot":0,"gGap":0.24,"gTileSc":1.45,"gXSize":5,"gXFeather":0.36,"gMaskOp":0.6,"gPar":0.3,"gScaleM":0.05,"gSphere":0,"gDelay":0.3,"gMaskDelay":0.52,"gMaskEase":false,"gRevealDur":0.55,"gRevealDelay":4,"gRevealMode":"fade","gMouseMode":"parallax","gParAmt":50,"gXFade":1,"iters":6,"s0":2,"s1":1.76,"p0x":-6.831,"p0y":-3.14,"p0z":-2.756,"p1x":0.4,"p1y":-2.8,"p1z":5.95,"r0x":0,"r0y":1,"r0z":33,"r1x":0,"r1y":32,"r1z":33,"delayD":3,"delayS":0.13,"skew":0,"stx":1,"sty":0.8,"frontFade":0,"opMul":2.2,"tintHold":0.6};

/* =========================================================================
   ScaleX hero — motion prototype
   Signature: the static dither texture from the design becomes a LIVE
   ordered-dither render pass. Geometry is clean 3D underneath; the screen
   quantizes it into the brand's halftone language in real time. A focus
   lens around the cursor resolves noise -> signal.
   ========================================================================= */
(() => {
/* Guard: so ativa na home real (essa build de canvas so foi pensada pro hero da
   home) e so quando GSAP/ScrollTrigger ja estiverem prontos (carregados nativamente
   pelo Webflow, sem precisar de outro <script src> aqui). */
if (!window.gsap || !window.ScrollTrigger) return;
/* pristine copy of the page markup, captured before any runtime DOM mutation —
   this is what the Cook button bakes into a console-free export */
const PRISTINE = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
const PRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- palette (sampled from bg_elemeng_dither.png) ---------- */
const COL = {
  bg:    0x050208,
  deep:  0x1b1033,
  mid:   0x4a3483,
  brand: 0x7c4bea,
  hot:   0xa78bfa,
  rim:   0xc9b8ff
};

/* ---------- renderer / scene ---------- */
const stage = document.querySelector('.hero_canvas');
const renderer = new THREE.WebGLRenderer({ canvas: stage, antialias:false, powerPreference:'high-performance' });
const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
renderer.setPixelRatio(DPR);

const scene = new THREE.Scene();
scene.background = new THREE.Color(COL.bg);
scene.fog = new THREE.Fog(COL.bg, 16, 34);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 16);

/* ---------- no lights: flat unlit sheets (matches ref's graphic, non-3D look) ---------- */

/* ---------- shape builders ---------- */
/* ---------- logo X from X_element.svg (3 paths, parsed inline) ---------- */
const X_PATHS = [
  "M807.841 942.582C803.137 936.186 793.504 936.186 788.8 942.582L639.587 1145.02C636.539 1149.16 636.539 1154.84 639.587 1158.98L1034.76 1695.03H1339.13C1348.84 1695.03 1354.41 1684.01 1348.66 1676.26L807.841 942.62V942.582Z",
  "M627.767 837.939L510.919 674.896L349.251 449.352L227.999 280.213C226.381 277.993 223.897 276.676 221.226 276.676H8.45245C1.52811 276.676 -2.42329 284.766 1.67863 290.448L394.071 837.939C395.162 839.444 395.689 841.25 395.689 843.056C395.689 844.862 395.162 846.668 394.071 848.174L1.67863 1395.66C-2.42329 1401.38 1.52811 1409.44 8.45245 1409.44H221.263C223.935 1409.44 226.456 1408.12 228.037 1405.9L349.288 1236.76L510.957 1011.22L627.805 848.174C628.896 846.668 629.423 844.862 629.423 843.056C629.423 841.25 628.896 839.444 627.805 837.939H627.767Z",
  "M807.841 752.448C803.137 758.844 793.504 758.844 788.8 752.448L639.587 550.008C636.539 545.869 636.539 540.187 639.587 536.048L1034.8 -0.00360107H1339.17C1348.88 -0.00360107 1354.45 11.0215 1348.69 18.7729L807.879 752.41L807.841 752.448Z"
];
const X_VB = { w: 1351, h: 1695 };

function parseSvgPath(d){          // minimal absolute M/L/H/V/C/Z parser, y flipped
  const sh = new THREE.Shape();
  const tok = d.match(/[MLHVCZ]|-?\.?\d+(?:\.\d+)?(?:e-?\d+)?/gi);
  let i = 0, x = 0, y = 0, sx = 0, sy = 0, last = '';
  const num = () => parseFloat(tok[i++]);
  while (i < tok.length){
    let c = tok[i];
    if (/^[MLHVCZ]$/i.test(c)) { i++; } else { c = last === 'M' ? 'L' : last; } // implicit repeat
    switch (c.toUpperCase()){
      case 'M': x = num(); y = num(); sh.moveTo(x, -y); sx = x; sy = y; break;
      case 'L': x = num(); y = num(); sh.lineTo(x, -y); break;
      case 'H': x = num(); sh.lineTo(x, -y); break;
      case 'V': y = num(); sh.lineTo(x, -y); break;
      case 'C': { const a=num(),b=num(),c2=num(),d2=num(); x=num(); y=num(); sh.bezierCurveTo(a,-b,c2,-d2,x,-y); break; }
      case 'Z': sh.closePath(); x = sx; y = sy; break;
    }
    last = c.toUpperCase();
  }
  return sh;
}

/* ---------- geometry vocabulary: ONLY the logo and its real parts ---------- */
const X_SHAPES = X_PATHS.map(parseSvgPath);
// part indices: 0 = bottom-right arm, 1 = left chevron, 2 = top-right arm
function partGeos(indices, fullXHeight){
  const k = fullXHeight / X_VB.h;            // scale as if the full X were this tall
  const geos = indices.map(i => {
    const g = new THREE.ShapeGeometry(X_SHAPES[i]);   // flat plane, no extrusion/bevel
    g.translate(-X_VB.w / 2, X_VB.h / 2, 0);
    g.scale(k, k, k);
    return g;
  });
  // center the combined bounding box so parts pivot around themselves
  const box = new THREE.Box3();
  geos.forEach(g => { g.computeBoundingBox(); box.union(g.boundingBox); });
  const c = box.getCenter(new THREE.Vector3());
  geos.forEach(g => g.translate(-c.x, -c.y, -c.z));
  return geos;
}
const WHOLE_X = idx => partGeos([0, 1, 2], ...[].concat(idx));
const CHEV    = idx => partGeos([1],       ...[].concat(idx));
const ARM_T   = idx => partGeos([2],       ...[].concat(idx));
const ARM_B   = idx => partGeos([0],       ...[].concat(idx));
/* ---------- blend stacks (Illustrator-blend-style echoes, rebuildable) ---------- */
const bgC = new THREE.Color(COL.bg);
const STACKS = [];
function stack(geos, baseColor, gapMul = 1){
  const grp = new THREE.Group();
  grp.userData.blend = { geos: Array.isArray(geos) ? geos : [geos], baseColor, gapMul };
  STACKS.push(grp);
  return grp;
}
function rebuildStacks(){
  // deformation: shear + stretch, baked into geometry so the X deforms but never breaks
  const D = new THREE.Matrix4().set(
    P.stx, P.skew, 0, 0,
    0,     P.sty,  0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
  STACKS.forEach(grp => {
    const bl = grp.userData.blend;
    if (bl.cur) bl.cur.forEach(g => g.dispose());
    bl.cur = bl.geos.map(g => g.clone().applyMatrix4(D));
    // ---- per-element GRADIENT (Figma-ref style): bake a vertex-color ramp across the
    //      whole X (all its parts together) along gradAngle. The dither pass then
    //      quantizes the gradient itself — gradient + dither ON the element. ----
    if (P.gradOn){
      const ang = P.gradAngle * (Math.PI / 180);
      const dx = Math.cos(ang), dy = Math.sin(ang);
      let lo = Infinity, hi = -Infinity;
      bl.cur.forEach(g => {
        const pos = g.attributes.position;
        for (let k = 0; k < pos.count; k++){
          const d = pos.getX(k) * dx + pos.getY(k) * dy;
          if (d < lo) lo = d; if (d > hi) hi = d;
        }
      });
      const span = Math.max(1e-6, hi - lo);
      const cA = new THREE.Color(P.gradA), cB = new THREE.Color(P.gradB), cc = new THREE.Color();
      bl.cur.forEach(g => {
        const pos = g.attributes.position;
        const arr = new Float32Array(pos.count * 3);
        for (let k = 0; k < pos.count; k++){
          const tt = ((pos.getX(k) * dx + pos.getY(k) * dy) - lo) / span;
          cc.copy(cA).lerp(cB, tt).multiplyScalar(P.gradGain);
          arr[k*3] = cc.r; arr[k*3+1] = cc.g; arr[k*3+2] = cc.b;
        }
        g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
      });
    }
    grp.children.forEach(ch => ch.traverse(o => { if (o.isMesh) o.material.dispose(); }));
    grp.clear();
    const cset = COMP[P.comp] || {};
    const opMul = cset.opMul || 1;          // per-comp opacity/brightness boost
    const tintHold = cset.tintHold || 0;    // per-comp: keep more saturated color (less wash to bg)
    const n = Math.max(2, Math.round(P.iters));
    const DEG = Math.PI / 180;
    for (let i = 0; i < n; i++){
      const t = i / (n - 1);
      // flat sheet look: unlit color ramped toward bg, translucent so layers accumulate.
      // with the element gradient on, vertex colors carry the hue and this becomes the ramp.
      const c = (P.gradOn ? new THREE.Color(0xffffff) : new THREE.Color(bl.baseColor)).lerp(bgC, t * 0.86 * (1 - tintHold));
      // leading-edge fade: smoothly dissolve the first copies so the protruding start
      // copies don't read as a detached "ghost" blade. frontFade = fade width along the
      // iteration (0 = off/solid leading edge; higher = longer, softer dissolve).
      let ff = 1;
      if (P.frontFade > 0.001){ const x = Math.min(1, t / P.frontFade); ff = x * x * (3 - 2 * x); }
      const baseOp = Math.min(1, (0.10 + 0.52 * (1 - t)) * ff * opMul);
      const m = new THREE.MeshBasicMaterial({
        color: c, transparent: true,
        vertexColors: !!P.gradOn,
        opacity: baseOp,    // softer, more translucent layering
        depthWrite: false, side: THREE.DoubleSide,
        blending: THREE.NormalBlending
      });
      const unit = new THREE.Group();
      bl.cur.forEach(g => unit.add(new THREE.Mesh(g, m)));
      unit.userData.t = t;                 // blend position, used by intro stagger
      unit.userData.baseOp = baseOp;
      // blend interpolation: start state -> end state (position is a 3D spine)
      const px = (P.p0x + (P.p1x - P.p0x) * t) * bl.gapMul;
      const py = (P.p0y + (P.p1y - P.p0y) * t) * bl.gapMul;
      const pz = -(P.p0z + (P.p1z - P.p0z) * t) * bl.gapMul;
      unit.position.set(px, py, pz);
      unit.userData.basePos = new THREE.Vector3(px, py, pz);
      const s = P.s0 + (P.s1 - P.s0) * t;
      unit.scale.set(s, s, 1);
      unit.userData.baseScale = s;
      unit.rotation.set(
        (P.r0x + (P.r1x - P.r0x) * t) * DEG,
        (P.r0y + (P.r1y - P.r0y) * t) * DEG,
        (P.r0z + (P.r1z - P.r0z) * t) * DEG
      );
      unit.userData.baseRot = { x: unit.rotation.x, y: unit.rotation.y, z: unit.rotation.z };
      if (i === 0){
        grp.userData.front = {
          pos: new THREE.Vector3(px, py, pz),
          scale: s,
          rot: { x: unit.rotation.x, y: unit.rotation.y, z: unit.rotation.z }
        };
      }
      grp.add(unit);
    }
  });
}

/* ---------- composition A : two whole X marks, corner-anchored, never broken ---------- */
const compA = new THREE.Group();
{
  const defs = [
    // bottom-left: large intact X, cropped by the viewport corner
    { geo: WHOLE_X(11.0), pos:[-8.6,-4.8,-3],  rot:-0.20, col:COL.brand },
    // top-right: mirrored counterpart
    { geo: WHOLE_X(11.0), pos:[8.6, 4.8,-3],   rot:Math.PI-0.20, col:COL.brand }
  ];
  defs.forEach(d => {
    const grp = stack(d.geo, d.col);
    grp.position.set(...d.pos);
    grp.rotation.z = d.rot;
    grp.userData.seed = Math.random() * 10;
    compA.add(grp);
  });
}
scene.add(compA);

/* ---------- composition B : monolith X ---------- */
const compB = new THREE.Group();
{
  const bigX = stack(WHOLE_X(10.2), COL.brand, 1.45);
  bigX.position.set(7.0, 0.2, -3);
  bigX.rotation.z = -0.18;
  bigX.userData.turn = true;
  bigX.userData.turnBase = { x: 0, y: -0.35, z: -0.18 };   // resting pose; scroll transform builds on this
  compB.add(bigX);

  // companion: a second intact X, small and deep — never a fragment
  const echoX = stack(WHOLE_X(5.0), COL.deep);
  echoX.position.set(-9.6, 3.8, -10);
  echoX.rotation.z = 0.25;
  echoX.userData.seed = 3;
  echoX.userData.echo = true;   // toggleable "companion X" (the deep left-side echo)
  compB.add(echoX);
}
compB.visible = false;
scene.add(compB);

/* blend + deform params must exist before first build.
   In a cooked export, window.COOKED_PARAMS overrides the defaults. */
const P = Object.assign({
  px:3, levels:6, lens:260, lensF:0.75, lensOn:false, lensStr:1,
  lensFx:{ reveal:true, brighten:false, invert:false, desat:false, ripple:false, condense:false },
  par:2, drift: PRM ? 0 : 3, dither:true, comp:'C',
  ditherMode:'off', dot:1.3,
  glow:0.8, glowR:0.6, glowOn:false, order:'ditherTop', ui:true,
  introDur:2.4, introStagger:0.6, introEaseIn:2, introEaseOut:2, introOffX:0, introOffY:0, introOffZ:0, introSpin:18, partFan:false, echoOn:false,
  mouseOn:true, mMove:0.6, mScale:0.4, mRot:0.5, mDelay:0.35,
  mInvert:false, mZPush:0, mRoll:0, mReact:0, mReactR:220, mCasAmt:0.9, mCasDelay:0.4,
  scrTurn:0.5, scrDolly:4.5, scrRise:2.2, scrDelay:0.15, scrCas:1,
  bScroll:'rotate', bAxis:'y', bRot:83, bScale:0.6,
  grHue:0, grSat:1, grBright:1,
  tintOn:false, tintA:'#955AE6', tintB:'#4C2CAB', tintAmt:1, tintDesat:1, tintGain:2.0, tintAngle:-15,
  gradOn:true, gradA:'#955AE6', gradB:'#4C2CAB', gradAngle:-35, gradGain:1.8,
  blobOn:true, blobSize:820, blobOp:0.55, blobFeather:60,
  gCell:29, gBase:0.26, gBright:1.6, gScale:0.5, gMaskR:320, gMaskShape:'x',
  gVig:1.0, gVigR:0.8, gIntroDur:1.8, gEaseIn:2, gEaseOut:2, gIntroDir:'centerOut', gExpandOn:true, gExpandFrom:0.35, gExpandDur:1.6, gXFrom:0.3, gXSpin:0,
  gRot:0, gMRot:0, gGap:0.28, gTileSc:0.85, gXSize:2.2, gXFeather:0.4, gMaskOp:0.55,
  gPar:0.3, gScaleM:0, gSphere:0, gDelay:0.3, gMaskDelay:0.08, gMaskEase:false, gRevealDur:0.55, gRevealDelay:1.6, gRevealMode:'fade', gMouseMode:'follow', gParAmt:120, gXFade:1,
  iters:10, s0:1.46, s1:1.30,
  p0x:-1.55, p0y:1.15, p0z:-0.3, p1x:0, p1y:3.85, p1z:9.3,
  r0x:0, r0y:0, r0z:3, r1x:0, r1y:0, r1z:-2, delayD:0, delayS:0.35, skew:0, stx:1, sty:1, frontFade:0.45
}, window.COOKED_PARAMS || {});

/* ---- per-composition blend/deform sets (render params stay global) ----
   switching FIELD/MONOLITH swaps these keys into P and refreshes the panel. */
const COMP_KEYS = ['iters','s0','s1','p0x','p0y','p0z','p1x','p1y','p1z',
                   'r0x','r0y','r0z','r1x','r1y','r1z','delayD','delayS','skew','stx','sty'];
const COMP = {
  A: { iters:10, s0:1.46, s1:1.30,
       p0x:-1.55, p0y:1.15, p0z:-0.3, p1x:0, p1y:3.85, p1z:9.3,
       r0x:0, r0y:0, r0z:3, r1x:0, r1y:0, r1z:-2, delayD:0, delayS:0.35, skew:0, stx:1, sty:1 },
  // B preset — tuned to the reference: bright, wide horizontal fan of upright splaying blades
  B: { iters:20, s0:1.5, s1:1.5,
       p0x:-4.6, p0y:0.0, p0z:1.2, p1x:4.6, p1y:0.0, p1z:1.2,
       r0x:0, r0y:0, r0z:22, r1x:0, r1y:0, r1z:-22, delayD:2, delayS:0.5, skew:0, stx:0.6, sty:1.25,
       opMul:2.2, tintHold:0.6 }
};
// seed P from whichever comp is active at load (skip if baked — COOKED_PARAMS already has them)
if (!window.COOKED_PARAMS) Object.assign(P, COMP[P.comp] || COMP.A);
rebuildStacks();

// hex "#rrggbb" -> THREE.Vector3 (cached; used by the hard-light tint uniforms)
const _hexCache = {};
function hex2vec(hex, out){
  let v = _hexCache[hex];
  if (!v){
    const n = parseInt(String(hex).replace('#',''), 16) || 0;
    v = _hexCache[hex] = [((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255];
  }
  out.set(v[0], v[1], v[2]);
  return out;
}

// soft oval "blob" behind the hero copy — a DOM/UI element (survives bake), driven by P
function applyBlob(){
  const el = document.querySelector('.hero-blob');
  if (!el) return;
  el.style.display = P.blobOn ? 'block' : 'none';
  el.style.width  = P.blobSize + 'px';
  el.style.height = (P.blobSize * 0.6) + 'px';
  const op = P.blobOp;
  // near-solid ellipse core fading to transparent; the gaussian blur does the feathering
  el.style.background = 'radial-gradient(ellipse at center, rgba(0,0,0,' + op + ') 0%, rgba(0,0,0,' + (op * 0.85) + ') 42%, rgba(0,0,0,0) 72%)';
  el.style.filter = 'blur(' + P.blobFeather + 'px)';
}
applyBlob();
compA.visible = P.comp === 'A';
compB.visible = P.comp === 'B';
if (document.body) document.body.classList.toggle('mode-C', P.comp === 'C');
if (document.body) document.body.classList.toggle('comp-B', P.comp === 'B');
window.SCALEX = { compA, compB, camera, P, rebuildStacks };   // debug handles (cookString attached later)

/* ---------- post pipeline: dither pass + multi-octave glow (Deep-Glow-style) ---------- */
const rt    = new THREE.WebGLRenderTarget(2, 2);   // scene render
const auxRT = new THREE.WebGLRenderTarget(2, 2);   // intermediate full-res
const outRT = new THREE.WebGLRenderTarget(2, 2);   // fully-composited frame, fed to the grade pass
const postScene = new THREE.Scene();
const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
postScene.add(quad);
function blit(mat, target){
  quad.material = mat;
  renderer.setRenderTarget(target);
  renderer.render(postScene, postCam);
}

const VERT = `void main(){ gl_Position = vec4(position.xy, 0., 1.); }`;

/* ---------- X-grid background (mode C): tile texture rendered from the logo SVG ---------- */
const xTileCanvas = document.createElement('canvas');
xTileCanvas.width = xTileCanvas.height = 128;
(() => {
  const ctx = xTileCanvas.getContext('2d');
  // draw the glyph into the central 70% of the canvas, leaving a transparent margin
  // so the X never touches the texture edge (mip averaging at the border was drawing
  // a faint box/seam around each tile).
  const inset = 0.70;
  const box = 128 * inset;
  const k = box / Math.max(X_VB.w, X_VB.h);
  const offX = (128 - X_VB.w * k) / 2, offY = (128 - X_VB.h * k) / 2;
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#ffffff';
  ctx.save();
  ctx.translate(offX, offY); ctx.scale(k, k);
  X_PATHS.forEach(d => ctx.fill(new Path2D(d)));
  ctx.restore();
})();
const xTileTex = new THREE.CanvasTexture(xTileCanvas);
xTileTex.minFilter = THREE.LinearMipmapLinearFilter;
xTileTex.magFilter = THREE.LinearFilter;
xTileTex.wrapS = THREE.ClampToEdgeWrapping;   // no cross-tile bleed at the seam
xTileTex.wrapT = THREE.ClampToEdgeWrapping;
xTileTex.generateMipmaps = true;
// non-mipmapped copy for the tiled grid (avoids the mip-derivative seam at cell edges)
const xTileFlat = new THREE.CanvasTexture(xTileCanvas);
xTileFlat.minFilter = THREE.LinearFilter;
xTileFlat.magFilter = THREE.LinearFilter;
xTileFlat.wrapS = THREE.ClampToEdgeWrapping;
xTileFlat.wrapT = THREE.ClampToEdgeWrapping;
xTileFlat.generateMipmaps = false;

const gridMat = new THREE.ShaderMaterial({
  uniforms: {
    tX:      { value: xTileTex },
    tXflat:  { value: xTileFlat },
    uRes:    { value: new THREE.Vector2(2, 2) },
    uMouse:  { value: new THREE.Vector2(-9999, -9999) },
    uCell:   { value: 54 },          // tile pitch in px
    uBase:   { value: 0.10 },        // ambient tile brightness
    uMaskR:  { value: 320 },         // mask radius px
    uMaskShape:{ value: 0 },         // 0 round, 1 X-shaped
    uXSize:  { value: 1 },           // X-mask glyph scale (smaller => bigger X)
    uXFeather:{ value: 0.7 },        // X-mask edge softness 0..1
    uMaskOp: { value: 1 },           // mask influence / opacity
    uMouseN: { value: new THREE.Vector2(0, 0) },  // normalized smoothed mouse (-1..1)
    uMouseLag:{ value: new THREE.Vector2(-9999, -9999) }, // lagged px cursor for push/swirl
    uGPar:   { value: 0 },           // grid parallax drift
    uGScaleM:{ value: 0 },           // local magnify around cursor
    uGSphere:{ value: 0 },           // fisheye bulge/pinch around cursor
    uBright: { value: 1.5 },         // brightness boost inside mask
    uScale:  { value: 0.5 },         // tile scale-up inside mask (0..1 extra)
    uVig:    { value: 0.6 },         // vignette strength (0 none .. 1 strong)
    uVigR:   { value: 0.9 },         // vignette radius (fraction of half-diagonal)
    uIntro:  { value: 1 },           // intro progress 0..1
    uIntroDir:{ value: 0 },          // 0 center-out, 1 edges-in, 2 top-down
    uGEaseIn:{ value: 2 },           // grid intro ease-in power
    uGEaseOut:{ value: 2 },          // grid intro ease-out power
    uExpandOn:{ value: 1 },          // intro expansion toggle
    uExpand: { value: 1 },           // expansion progress 0..1 (eased)
    uExpandFrom:{ value: 0.35 },     // pattern start scale (grows to 1)
    uXRot:   { value: 0 },           // X-mask intro rotation (radians)
    uRot:    { value: 0 },           // static tile rotation (radians)
    uMRot:   { value: 0 },           // extra tile rotation inside the mask (radians)
    uGap:    { value: 0 },           // spacing: shrinks glyph within its cell (0..0.8)
    uTileSc: { value: 1 },           // base glyph scale within cell
    uTint:   { value: new THREE.Color(0x6b6cff) },
    uTime:   { value: 0 }
  },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tX;
    uniform sampler2D tXflat;
    uniform vec2 uRes, uMouse;
    uniform float uCell, uBase, uMaskR, uMaskShape, uXSize, uXFeather, uMaskOp, uGPar, uGScaleM, uGSphere, uBright, uScale, uVig, uVigR, uIntro, uIntroDir, uGEaseIn, uGEaseOut, uExpandOn, uExpand, uExpandFrom, uXRot, uRot, uMRot, uGap, uTileSc, uTime;
    uniform vec2 uMouseN, uMouseLag;
    uniform vec3 uTint;

    float maskAt(vec2 p){
      vec2 d = p - uMouse;
      if (uMaskShape < 0.5){
        return 1.0 - smoothstep(0.0, uMaskR, length(d));            // round
      } else {
        // giant logo-X mask: sample the X glyph centered on the cursor.
        // uXSize scales the glyph within the mask (smaller value => bigger X).
        // intro spin: the X rotates in as it reveals (uXRot -> 0 at rest)
        if (uXRot > 0.0001 || uXRot < -0.0001){
          float ca = cos(uXRot), sa = sin(uXRot);
          d = mat2(ca, -sa, sa, ca) * d;
        }
        float scl = uMaskR * 2.0 * uXSize;
        vec2 uv = d / scl + 0.5;
        // feather = blur of the glyph edge. Combine mip LOD bias (cheap, strong, smooth)
        // with a wide multi-tap spread. uXFeather is UNBOUNDED — higher = much softer.
        float f = max(uXFeather, 0.0);
        float lod = f * 5.0;                         // mip bias: strong blur at high feather
        float o = f * 0.13;                          // tap spread in uv units, scales with feather
        float g = 0.0; float wsum = 0.0;
        for (int i = -2; i <= 2; i++){
          for (int j = -2; j <= 2; j++){
            vec2 suv = uv + vec2(float(i), float(j)) * o * 0.5;
            float w = 1.0 - 0.16 * float(abs(i) + abs(j));
            float s = 0.0;
            if (suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0) s = texture2D(tX, suv, lod).r;
            g += s * w; wsum += w;
          }
        }
        g /= wsum;
        // remap: crisp when feather ~0, smooth glow as feather rises (lower threshold floor)
        float lo = 0.5 - min(0.49, 0.45 + f * 0.5);
        g = smoothstep(lo, 0.5 + 0.05, g);
        // radial fade at the mask extent (also widens slightly with feather)
        float fade = 1.0 - smoothstep(0.5 - 0.1 * f, 1.0 + 0.3 * f, length(d) / (uMaskR * uXSize));
        return g * fade;
      }
    }

    void main(){
      vec2 frag = gl_FragCoord.xy;
      vec2 ctrScreen = uRes * 0.5;

      // ---- intro EXPANSION: the whole pattern scales outward from the screen center
      //      (matches the X concept: scale / expansion) ----
      if (uExpandOn > 0.5 && uExpand < 0.999){
        float ez = mix(uExpandFrom, 1.0, uExpand);
        frag = ctrScreen + (frag - ctrScreen) / max(0.05, ez);
      }

      // ---- mouse interaction: warp the sampling coordinate ----
      // parallax: whole grid drifts opposite the cursor for a depth feel
      frag -= uMouseN * uGPar * uCell;
      // cursor-centered scale + spherize (uses the LAGGED cursor; falls off with distance)
      vec2 toC = frag - uMouseLag;
      float dC = length(toC);
      float infl = exp(-dC / (uMaskR * 1.2));          // proximity 0..1
      // SCALE: magnify (or shrink) the grid locally around the cursor.
      // Sampling closer to the cursor center => glyphs appear larger.
      if (uGScaleM != 0.0){
        float s = 1.0 / (1.0 + uGScaleM * infl);       // >0 magnifies, <0 shrinks
        toC *= s;
      }
      // SPHERIZE: fisheye lens — bulge (>0) or pinch (<0) along the radius.
      if (uGSphere != 0.0){
        float nd = clamp(dC / (uMaskR * 1.6), 0.0, 1.0);
        float warp = 1.0 + uGSphere * (1.0 - nd * nd) * 0.9;   // dome falloff
        toC *= warp;
      }
      frag = uMouseLag + toC;

      float m = clamp(maskAt(frag), 0.0, 1.0) * uMaskOp;

      // --- per-tile intro reveal: each tile's "distance metric" gates when it appears ---
      vec2 cell = floor(frag / uCell);
      vec2 cellCtr = (cell + 0.5) * uCell;
      float halfDiag = length(uRes) * 0.5;
      float metric;                                   // 0 (reveals first) .. 1 (last)
      if (uIntroDir < 0.5)      metric = length(cellCtr - ctrScreen) / halfDiag;          // center-out
      else if (uIntroDir < 1.5) metric = 1.0 - length(cellCtr - ctrScreen) / halfDiag;    // edges-in
      else                      metric = cellCtr.y / uRes.y;                          // top-down
      float span = 0.5;
      float ip = clamp((uIntro - metric * (1.0 - span)) / span, 0.0, 1.0);
      // parametric per-tile ease: in power = uGEaseIn, out power = uGEaseOut (2/2 ~ smoothstep)
      float ipa = pow(ip, uGEaseIn);
      float ipb = pow(1.0 - ip, uGEaseOut);
      ip = ipa / (ipa + ipb + 1e-6);

      // tile lookup; scale up toward cursor AND scale up during intro (tiles pop in)
      // tile transform: gap (spacing), base scale, cursor grow, intro grow
      float grow = uTileSc * (1.0 - uGap) * (1.0 + uScale * m) * (0.4 + 0.6 * ip);
      vec2 local = (frag - cellCtr) / uCell;          // -0.5..0.5 within cell
      // rotate the sample space: static rotation + extra rotation under the mask
      float ang = uRot + uMRot * m;
      float cs = cos(ang), sn = sin(ang);
      local = mat2(cs, -sn, sn, cs) * local;
      vec2 uv = (local / grow) / 0.70 + 0.5;   // /0.70 compensates the texture padding inset
      float tex = 0.0;
      // sample the NON-mipmapped tile texture: per-cell uv resets at each seam, which
      // would spike the hardware mip-derivative and paint a grey box line around every
      // tile. With no mips there is no LOD selection, so no seam artifact.
      if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0){
        tex = texture2D(tXflat, uv).r;
      }

      // permanent vignette: bright center, darker edges (makes whole grid readable)
      float vd = length((frag - ctrScreen) / uRes);   // 0 center .. ~0.5 corner
      float vig = 1.0 - uVig * smoothstep(uVigR * 0.5, 0.75, vd);

      float bright = uBase + (uBright - uBase) * m;    // dim ambient -> bright in mask
      vec3 col = uTint * tex * bright * vig * ip;      // ip fades tile in during intro
      gl_FragColor = vec4(col, 1.0);
    }`
});

/* dither material (input texture is set per pass) */
const ditherMat = new THREE.ShaderMaterial({
  uniforms: {
    tSrc:    { value: null },
    uRes:    { value: new THREE.Vector2(2, 2) },
    uPx:     { value: 2 },
    uLevels: { value: 6 },
    uMode:   { value: 1 },        // 0 = bayer bands, 1 = halftone dots (ref look)
    uDot:    { value: 1.15 },     // dot size gain for halftone mode
    uMouse:  { value: new THREE.Vector2(-9999, -9999) },
    uLensR:  { value: 260 * DPR },
    uLensF:  { value: 0.75 },
    uLensOn: { value: 0 },        // lens enabled
    uLxReveal:  { value: 1 },
    uLxBright:  { value: 0 },
    uLxInvert:  { value: 0 },
    uLxDesat:   { value: 0 },
    uLxRipple:  { value: 0 },
    uLxCondense:{ value: 0 },
    uLensStr: { value: 1 },       // lens effect strength
    uTime:    { value: 0 },       // for ripple animation
    uReact:  { value: 0 },        // cursor dot-swell amount
    uReactR: { value: 220 },      // cursor wake radius (px)
    uAmt:    { value: 1 }
  },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tSrc;
    uniform vec2 uRes, uMouse;
    uniform float uPx, uLevels, uMode, uDot, uLensR, uLensF, uLensOn, uLxReveal, uLxBright, uLxInvert, uLxDesat, uLxRipple, uLxCondense, uLensStr, uTime, uReact, uReactR, uAmt;

    // O(1) recursive ordered-dither threshold (classic Bayer construction)
    float bayer2(vec2 a){ a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
    float bayer8(vec2 a){
      return bayer2(a * 0.125) * 0.015625
           + bayer2(a * 0.25)  * 0.0625
           + bayer2(a * 0.5)   * 0.25
           + bayer2(a);
    }

    void main(){
      vec2 frag = gl_FragCoord.xy;
      vec2 uv   = frag / uRes;
      vec3 clean = texture2D(tSrc, uv).rgb;
      vec3 effect;

      if (uMode < 0.5){
        // --- Bayer ordered-dither bands ---
        vec2 cell = floor(frag / uPx);
        vec2 uvP  = (cell * uPx + uPx * 0.5) / uRes;
        vec3 src  = texture2D(tSrc, uvP).rgb;
        float b = bayer8(cell);
        float L = max(uLevels - 1.0, 1.0);
        effect = clamp(floor(src * L + b - 0.5) / L, 0.0, 1.0);
      } else {
        // --- Halftone dots over smooth gradient (ref.png look) ---
        vec2 cellId = floor(frag / uPx);
        vec2 ctr    = (cellId + 0.5) * uPx;
        vec3 src    = texture2D(tSrc, ctr / uRes).rgb;
        float lum   = dot(src, vec3(0.299, 0.587, 0.114));
        vec2  local = (frag - ctr) / uPx;              // -0.5..0.5 within cell
        float dist  = length(local) * 2.0;             // 0 center -> ~1 edge
        float r     = sqrt(clamp(lum, 0.0, 1.0)) * uDot;
        // cursor wake: dots swell near the pointer
        if (uReact > 0.001){
          float prox = 1.0 - smoothstep(0.0, uReactR, distance(frag, uMouse));
          r *= 1.0 + prox * uReact;
        }
        float aa    = 1.5 / uPx;                       // edge softness ~1.5px
        float dot_  = 1.0 - smoothstep(r - aa, r + aa, dist);
        // dot carries full color; gap is near-black so the grid reads crisply
        effect = src * dot_;
      }

      // dither amount mixes between clean and the dithered effect FIRST,
      // so the lens (below) operates on the visible image regardless of dither on/off.
      vec3 base = mix(clean, effect, uAmt);

      // ---- cursor lens: independent effects that STACK (any combination) ----
      vec3 col = base;
      if (uLensOn > 0.5){
        float d = distance(frag, uMouse);
        float inner = uLensR * (1.0 - uLensF);
        float lens = 1.0 - smoothstep(inner, uLensR, d);   // 1 inside lens
        float amt = lens * uLensStr;

        // RIPPLE first (it resamples the source image), then color effects chain on top
        if (uLxRipple > 0.5){
          vec2 dir = normalize(frag - uMouse + 1e-4);
          float wave = sin(d * 0.08 - uTime * 4.0) * amt * 14.0;
          vec2 ruv = (frag + dir * wave) / uRes;
          col = mix(col, texture2D(tSrc, ruv).rgb, lens);
        }
        if (uLxReveal > 0.5){
          col = mix(col, clean, amt);
        }
        if (uLxDesat > 0.5){
          float g = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(col, vec3(g), amt);
        }
        if (uLxInvert > 0.5){
          col = mix(col, vec3(1.0) - col, amt);
        }
        if (uLxBright > 0.5){
          col = col + col * amt * 1.6;
        }
        if (uLxCondense > 0.5){
          col = mix(col, col * (0.35 + 0.65 * (1.0 - amt)), amt);
        }
      }

      gl_FragColor = vec4(col, 1.0);
    }`
});

/* glow: dual-Kawase mip pyramid. prefilter -> down chain -> weighted up chain -> composite */
const GLOW_LEVELS = 6;
const downRT = [], upRT = [];
for (let i = 0; i < GLOW_LEVELS; i++){
  downRT.push(new THREE.WebGLRenderTarget(2, 2));
  upRT.push(new THREE.WebGLRenderTarget(2, 2));
}
const preMat = new THREE.ShaderMaterial({   // soft luminance weighting, no hard threshold
  uniforms: { tSrc:{value:null}, uHalf:{value:new THREE.Vector2()} },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tSrc; uniform vec2 uHalf;
    vec3 w(vec3 c){ float l = dot(c, vec3(0.2126,0.7152,0.0722)); return c * smoothstep(0.16, 0.82, l); }
    void main(){
      vec2 uv = gl_FragCoord.xy * uHalf * 2.0;
      vec3 s = w(texture2D(tSrc, uv).rgb) * 4.0;
      s += w(texture2D(tSrc, uv - uHalf).rgb);
      s += w(texture2D(tSrc, uv + uHalf).rgb);
      s += w(texture2D(tSrc, uv + vec2(uHalf.x, -uHalf.y)).rgb);
      s += w(texture2D(tSrc, uv - vec2(uHalf.x, -uHalf.y)).rgb);
      gl_FragColor = vec4(s / 8.0, 1.0);
    }`
});
const downMat = new THREE.ShaderMaterial({
  uniforms: { tSrc:{value:null}, uHalf:{value:new THREE.Vector2()} },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tSrc; uniform vec2 uHalf;
    void main(){
      vec2 uv = gl_FragCoord.xy * uHalf * 2.0;
      vec3 s = texture2D(tSrc, uv).rgb * 4.0;
      s += texture2D(tSrc, uv - uHalf).rgb;
      s += texture2D(tSrc, uv + uHalf).rgb;
      s += texture2D(tSrc, uv + vec2(uHalf.x, -uHalf.y)).rgb;
      s += texture2D(tSrc, uv - vec2(uHalf.x, -uHalf.y)).rgb;
      gl_FragColor = vec4(s / 8.0, 1.0);
    }`
});
const upMat = new THREE.ShaderMaterial({
  uniforms: { tSrc:{value:null}, tAdd:{value:null}, uHalf:{value:new THREE.Vector2()}, uSpread:{value:0.7} },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tSrc, tAdd; uniform vec2 uHalf; uniform float uSpread;
    void main(){
      vec2 res = 0.5 / uHalf;
      vec2 uv = gl_FragCoord.xy / res;
      vec3 s  = texture2D(tSrc, uv + vec2(-uHalf.x*2.0, 0.0)).rgb;
      s += texture2D(tSrc, uv + vec2(-uHalf.x,  uHalf.y)).rgb * 2.0;
      s += texture2D(tSrc, uv + vec2(0.0,  uHalf.y*2.0)).rgb;
      s += texture2D(tSrc, uv + vec2( uHalf.x,  uHalf.y)).rgb * 2.0;
      s += texture2D(tSrc, uv + vec2( uHalf.x*2.0, 0.0)).rgb;
      s += texture2D(tSrc, uv + vec2( uHalf.x, -uHalf.y)).rgb * 2.0;
      s += texture2D(tSrc, uv + vec2(0.0, -uHalf.y*2.0)).rgb;
      s += texture2D(tSrc, uv + vec2(-uHalf.x, -uHalf.y)).rgb * 2.0;
      gl_FragColor = vec4(s / 12.0 * uSpread + texture2D(tAdd, uv).rgb, 1.0);
    }`
});
const compMat = new THREE.ShaderMaterial({   // base + tonemapped glow
  uniforms: { tBase:{value:null}, tGlow:{value:null}, uRes:{value:new THREE.Vector2()}, uIntensity:{value:0.8} },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tBase, tGlow; uniform vec2 uRes; uniform float uIntensity;
    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      vec3 base = texture2D(tBase, uv).rgb;
      vec3 glow = texture2D(tGlow, uv).rgb;
      glow = vec3(1.0) - exp(-glow * uIntensity * 0.85);   // soft-clip accumulation
      gl_FragColor = vec4(base + glow * (1.0 - base * 0.55), 1.0);  // screen-leaning add, keeps hue
    }`
});

// final ADJUSTMENT LAYER — Figma-style hard-light tint + hue / saturation / brightness,
// applied to the fully composited frame (after dither, glow, lens, grid — everything).
// The tint replicates the ref stack: grayscale dither base + gradient vector on HARD LIGHT.
const gradeMat = new THREE.ShaderMaterial({
  uniforms: { tSrc:{value:null}, uRes:{value:new THREE.Vector2()},
              uHue:{value:0}, uSat:{value:1}, uBright:{value:1},
              uTintOn:{value:1}, uTintAmt:{value:1}, uTintDesat:{value:1}, uTintGain:{value:2.0},
              uTintAngle:{value:0},
              uTintA:{value:new THREE.Vector3(0.584,0.353,0.902)},   // #955AE6
              uTintB:{value:new THREE.Vector3(0.298,0.173,0.671)} }, // #4C2CAB
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tSrc; uniform vec2 uRes;
    uniform float uHue, uSat, uBright, uTintOn, uTintAmt, uTintDesat, uTintGain, uTintAngle;
    uniform vec3 uTintA, uTintB;
    float hl(float b, float s){ return s <= 0.5 ? 2.0*b*s : 1.0 - 2.0*(1.0-b)*(1.0-s); }
    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      vec3 c = texture2D(tSrc, uv).rgb;
      if (uTintOn > 0.5){
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        vec3 base = clamp(mix(c, vec3(l), uTintDesat) * uTintGain, 0.0, 1.0);  // the "baked grayscale dither" layer (gain-lifted)
        vec2 dir = vec2(cos(uTintAngle), sin(uTintAngle));
        float g = clamp(dot(uv - 0.5, dir) + 0.5, 0.0, 1.0);
        vec3 tint = mix(uTintA, uTintB, g);                    // the gradient vector layer
        vec3 blended = vec3(hl(base.r, tint.r), hl(base.g, tint.g), hl(base.b, tint.b));
        float m = smoothstep(0.0, 0.05, l);                    // vector exists only over the artwork
        c = mix(c, blended, uTintAmt * m);                     // layer opacity
      }
      if (uHue > 0.001 || uHue < -0.001){
        // luma-preserving hue rotation (YIQ)
        mat3 toYIQ = mat3(0.299, 0.596, 0.211,  0.587, -0.274, -0.523,  0.114, -0.322, 0.312);
        mat3 toRGB = mat3(1.0, 1.0, 1.0,  0.956, -0.272, -1.106,  0.621, -0.647, 1.703);
        vec3 yiq = toYIQ * c;
        float ang = atan(yiq.z, yiq.y) + uHue;
        float chroma = length(yiq.yz);
        yiq.y = chroma * cos(ang);
        yiq.z = chroma * sin(ang);
        c = toRGB * yiq;
      }
      float l2 = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l2), c, uSat);
      gl_FragColor = vec4(max(c * uBright, 0.0), 1.0);
    }`
});

const mipSize = [];
function renderGlow(srcTexture){
  let src = srcTexture;
  for (let i = 0; i < GLOW_LEVELS; i++){
    const mat = i === 0 ? preMat : downMat;
    mat.uniforms.tSrc.value = src;
    mat.uniforms.uHalf.value.set(0.5 / mipSize[i].x, 0.5 / mipSize[i].y);
    blit(mat, downRT[i]);
    src = downRT[i].texture;
  }
  let up = downRT[GLOW_LEVELS - 1].texture;
  for (let i = GLOW_LEVELS - 2; i >= 0; i--){
    upMat.uniforms.tSrc.value = up;
    upMat.uniforms.tAdd.value = downRT[i].texture;
    upMat.uniforms.uHalf.value.set(0.5 / mipSize[i].x, 0.5 / mipSize[i].y);
    upMat.uniforms.uSpread.value = 0.35 + P.glowR * 0.62;  // radius -> octave falloff
    blit(upMat, upRT[i]);
    up = upRT[i].texture;
  }
  return up;
}

/* ---------- sizing ---------- */
/* ---------- sizing ---------- */
function resize(){
  // Fallback: se o canvas ainda nao tiver dimensoes reais no momento exato
  // desta chamada (comum logo apos o load, antes do layout do hero assentar,
  // ou quando o canvas esta confinado a um elemento em vez de fixed na
  // viewport inteira), usa o tamanho da janela em vez de deixar cair pra 0 -
  // um framebuffer 0x0 trava o WebGL (GL_INVALID_FRAMEBUFFER_OPERATION) e
  // nunca mais se recupera sozinho.
  const w = stage.clientWidth || window.innerWidth;
  const h = stage.clientHeight || window.innerHeight;
  renderer.setSize(w, h);
  const W = Math.floor(w * DPR), H = Math.floor(h * DPR);
  rt.setSize(W, H);
  auxRT.setSize(W, H);
  outRT.setSize(W, H);
  mipSize.length = 0;
  for (let i = 0; i < GLOW_LEVELS; i++){
    const mw = Math.max(2, W >> (i + 1)), mh = Math.max(2, H >> (i + 1));
    mipSize.push(new THREE.Vector2(mw, mh));
    downRT[i].setSize(mw, mh);
    upRT[i].setSize(mw, mh);
  }
  ditherMat.uniforms.uRes.value.set(W, H);
  compMat.uniforms.uRes.value.set(W, H);
  gradeMat.uniforms.uRes.value.set(W, H);
  gridMat.uniforms.uRes.value.set(W, H);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
// Observa o proprio elemento (nao so a janela): como o canvas agora fica
// confinado ao hero (position:absolute, nao mais fixed na viewport inteira),
// o tamanho dele pode mudar sem a JANELA mudar de tamanho - por exemplo,
// assim que o layout do hero termina de assentar logo apos o load. Sem isso,
// se o primeiro resize() pegasse o canvas ainda com 0x0, nada disparava um
// novo resize depois (o listener de window so reage a resize da JANELA).
if (typeof ResizeObserver !== 'undefined') {
  const ro = new ResizeObserver(function () { resize(); });
  ro.observe(stage);
}
resize();

/* ---------- pointer ---------- */
const mouse = { x:0, y:0, sx:0, sy:0, px:-9999, py:-9999 };
const _AXIS = { x:new THREE.Vector3(1,0,0), y:new THREE.Vector3(0,1,0), z:new THREE.Vector3(0,0,1) };
const gLag = { nx:0, ny:0, px:-9999, py:-9999, mpx:-9999, mpy:-9999, msx:0, msy:0, mtx:-9999, mty:-9999, mp:1, reveal:0, tC:0 };   // lagged cursors (+ first-touch reveal 0..1, tC = time since entering grid C)
window.addEventListener('pointermove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.px = e.clientX * DPR;
  mouse.py = (window.innerHeight - e.clientY) * DPR;
});

/* ---------- scroll : the turn ---------- */
let scrollT = 0;       // smoothed scroll progress used by the scene
let scrollRaw = 0;     // raw ScrollTrigger progress
let introT = 0;   // multiplier intro progress 0->1
function replayIntro(){ introT = 0; [compA, compB].forEach(c => c.children.forEach(g => g.children.forEach(u => { u.userData.introDone = false; }))); }
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: '.hero_wrapper', start: 'bottom bottom', end: 'bottom 15%', scrub: 0.6,
  onUpdate: st => { scrollRaw = st.progress; }
});

/* ---------- params / panel (all wiring no-ops in a cooked export) ---------- */
const $ = id => document.getElementById(id);
const BINDERS = [];   // registry for refreshing sliders+fields from P
function bind(id, key, onChange){
  const slider = $(id);
  if (!slider) return;   // cooked export: no console
  // replace the static readout with an editable number field (two-way sync)
  const num = document.createElement('input');
  num.type = 'number';
  num.className = 'val';
  num.step = slider.step || 'any';
  num.value = P[key];
  slider.value = P[key];
  slider.nextElementSibling.replaceWith(num);
  const apply = v => { P[key] = v; if (onChange) onChange(); };
  slider.addEventListener('input', () => {
    num.value = slider.value;
    apply(parseFloat(slider.value));
  });
  const fromNum = () => {
    const v = parseFloat(num.value);
    if (!isFinite(v)) return;
    slider.value = v;        // slider clamps visually; the param takes the typed value
    apply(v);
  };
  num.addEventListener('input', fromNum);
  num.addEventListener('change', fromNum);
  BINDERS.push({ key, refresh: () => { slider.value = P[key]; num.value = P[key]; } });
}
function refreshPanel(){
  BINDERS.forEach(b => b.refresh());
  // toggles
  const setChk = (id, v) => { const el = $(id); if (el) el.checked = v; };
  setChk('uDither', P.dither); setChk('uGlowOn', P.glowOn); setChk('uLensOn', P.lensOn);
  setChk('uUI', P.ui); setChk('uMouseOn', P.mouseOn); setChk('uMInvert', P.mInvert); setChk('uPartFan', P.partFan); setChk('uGMaskEase', P.gMaskEase); setChk('uGExpandOn', P.gExpandOn);
  setChk('uBlobOn', P.blobOn); applyBlob();
  setChk('uTintOn', P.tintOn);
  if ($('uTintA')){ $('uTintA').value = P.tintA; $('uTintB').value = P.tintB; }
  setChk('uGradOn', P.gradOn);
  if ($('uGradA')){ $('uGradA').value = P.gradA; $('uGradB').value = P.gradB; }
  // segmented controls
  document.querySelectorAll('#compSeg button').forEach(x => x.classList.toggle('on', x.dataset.comp === P.comp));
  document.querySelectorAll('#ditherModeSeg button').forEach(x => x.classList.toggle('on', x.dataset.dmode === P.ditherMode));
  document.querySelectorAll('#orderSeg button').forEach(x => x.classList.toggle('on', x.dataset.order === P.order));
  setChk('uLxReveal', P.lensFx.reveal); setChk('uLxBright', P.lensFx.brighten);
  setChk('uLxInvert', P.lensFx.invert); setChk('uLxDesat', P.lensFx.desat);
  setChk('uLxRipple', P.lensFx.ripple); setChk('uLxCondense', P.lensFx.condense);
  document.querySelectorAll('#gMaskSeg button').forEach(x => x.classList.toggle('on', x.dataset.gmask === P.gMaskShape));
  document.querySelectorAll('#gIntroSeg button').forEach(x => x.classList.toggle('on', x.dataset.gintro === P.gIntroDir));
  document.querySelectorAll('#gRevSeg button').forEach(x => x.classList.toggle('on', x.dataset.grev === P.gRevealMode));
  document.querySelectorAll('#gMouseSeg button').forEach(x => x.classList.toggle('on', x.dataset.gmouse === P.gMouseMode));
  document.querySelectorAll('#bScrollSeg button').forEach(x => x.classList.toggle('on', x.dataset.bscroll === P.bScroll));
  document.querySelectorAll('#bAxisSeg button').forEach(x => x.classList.toggle('on', x.dataset.baxis === P.bAxis));
  document.body.classList.toggle('mode-C', P.comp === 'C');
  document.body.classList.toggle('comp-B', P.comp === 'B');
}
bind('uPx','px'); bind('uLevels','levels'); bind('uLens','lens'); bind('uLensF','lensF'); bind('uLensStr','lensStr'); bind('uPar','par'); bind('uDrift','drift');
bind('uGlow','glow'); bind('uGlowR','glowR'); bind('uDot','dot'); bind('uIntroDur','introDur');
bind('uIntroEaseIn','introEaseIn'); bind('uIntroEaseOut','introEaseOut');
bind('uIntroStagger','introStagger'); bind('uIntroOffX','introOffX'); bind('uIntroOffY','introOffY'); bind('uIntroOffZ','introOffZ'); bind('uIntroSpin','introSpin');
bind('uMMove','mMove'); bind('uMScale','mScale'); bind('uMRot','mRot'); bind('uMDelay','mDelay');
bind('uMZPush','mZPush'); bind('uMRoll','mRoll'); bind('uMReact','mReact'); bind('uMReactR','mReactR');
bind('uMCasAmt','mCasAmt'); bind('uMCasDelay','mCasDelay');
bind('uScrTurn','scrTurn'); bind('uScrDolly','scrDolly'); bind('uScrRise','scrRise'); bind('uScrDelay','scrDelay');
bind('uBRot','bRot'); bind('uBScale','bScale');
bind('uGrHue','grHue'); bind('uGrSat','grSat'); bind('uGrBright','grBright');
bind('uTintAmt','tintAmt'); bind('uTintDesat','tintDesat'); bind('uTintGain','tintGain'); bind('uTintAngle','tintAngle');
bind('uGradAngle','gradAngle', rebuildStacks);
bind('uGradGain','gradGain', rebuildStacks);
if ($('uGradOn')){
  $('uGradOn').checked = P.gradOn;
  $('uGradOn').addEventListener('change', e => { P.gradOn = e.target.checked; rebuildStacks(); });
}
if ($('uGradA')){
  $('uGradA').value = P.gradA; $('uGradB').value = P.gradB;
  $('uGradA').addEventListener('input', e => { P.gradA = e.target.value; rebuildStacks(); });
  $('uGradB').addEventListener('input', e => { P.gradB = e.target.value; rebuildStacks(); });
}
if ($('uTintA')){
  $('uTintA').value = P.tintA; $('uTintB').value = P.tintB;
  $('uTintA').addEventListener('input', e => P.tintA = e.target.value);
  $('uTintB').addEventListener('input', e => P.tintB = e.target.value);
}
if ($('uTintOn')){
  $('uTintOn').checked = P.tintOn;
  $('uTintOn').addEventListener('change', e => P.tintOn = e.target.checked);
}
bind('uBlobSize','blobSize', applyBlob); bind('uBlobOp','blobOp', applyBlob); bind('uBlobFeather','blobFeather', applyBlob);
bind('uGCell','gCell'); bind('uGBase','gBase'); bind('uGBright','gBright'); bind('uGScale','gScale'); bind('uGMaskR','gMaskR');
bind('uGTileSc','gTileSc'); bind('uGGap','gGap'); bind('uGRot','gRot'); bind('uGMRot','gMRot');
bind('uGXSize','gXSize'); bind('uGXFeather','gXFeather'); bind('uGMaskOp','gMaskOp');
bind('uGPar','gPar'); bind('uGScaleM','gScaleM'); bind('uGSphere','gSphere'); bind('uGDelay','gDelay'); bind('uGMaskDelay','gMaskDelay');
bind('uGRevealDur','gRevealDur'); bind('uGRevealDelay','gRevealDelay'); bind('uGXFade','gXFade');
bind('uGParAmt','gParAmt');
bind('uGVig','gVig'); bind('uGVigR','gVigR'); bind('uGIntroDur','gIntroDur');
bind('uGEaseIn','gEaseIn'); bind('uGEaseOut','gEaseOut');
bind('uGExpandFrom','gExpandFrom'); bind('uGExpandDur','gExpandDur'); bind('uGXFrom','gXFrom'); bind('uGXSpin','gXSpin');
if ($('uGExpandOn')){
  $('uGExpandOn').checked = P.gExpandOn;
  $('uGExpandOn').addEventListener('change', e => P.gExpandOn = e.target.checked);
}
if ($('orderSeg')){
  $('orderSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.order = b.dataset.order;
    document.querySelectorAll('#orderSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  document.querySelectorAll('#orderSeg button').forEach(x => x.classList.toggle('on', x.dataset.order === P.order));
}
if ($('ditherModeSeg')){
  $('ditherModeSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.ditherMode = b.dataset.dmode;
    document.querySelectorAll('#ditherModeSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  document.querySelectorAll('#ditherModeSeg button').forEach(x => x.classList.toggle('on', x.dataset.dmode === P.ditherMode));
}
if ($('gMaskSeg')){
  $('gMaskSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gMaskShape = b.dataset.gmask;
    document.querySelectorAll('#gMaskSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  document.querySelectorAll('#gMaskSeg button').forEach(x => x.classList.toggle('on', x.dataset.gmask === P.gMaskShape));
}
if ($('gIntroSeg')){
  $('gIntroSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gIntroDir = b.dataset.gintro;
    document.querySelectorAll('#gIntroSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  document.querySelectorAll('#gIntroSeg button').forEach(x => x.classList.toggle('on', x.dataset.gintro === P.gIntroDir));

  if ($('gRevSeg')) $('gRevSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gRevealMode = b.dataset.grev;
    document.querySelectorAll('#gRevSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  if ($('gMouseSeg')) $('gMouseSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gMouseMode = b.dataset.gmouse;
    document.querySelectorAll('#gMouseSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  if ($('bScrollSeg')) $('bScrollSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.bScroll = b.dataset.bscroll;
    document.querySelectorAll('#bScrollSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  if ($('bAxisSeg')) $('bAxisSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.bAxis = b.dataset.baxis;
    document.querySelectorAll('#bAxisSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
}
[['uLxReveal','reveal'],['uLxBright','brighten'],['uLxInvert','invert'],
 ['uLxDesat','desat'],['uLxRipple','ripple'],['uLxCondense','condense']].forEach(([id,key]) => {
  const el = $(id); if (!el) return;
  el.checked = P.lensFx[key];
  el.addEventListener('change', e => { P.lensFx[key] = e.target.checked; });
});
bind('uIters','iters', rebuildStacks);
bind('uFrontFade','frontFade', rebuildStacks);
bind('uS0','s0', rebuildStacks);
bind('uS1','s1', rebuildStacks);
bind('uP0x','p0x', rebuildStacks);
bind('uP0y','p0y', rebuildStacks);
bind('uP0z','p0z', rebuildStacks);
bind('uP1x','p1x', rebuildStacks);
bind('uP1y','p1y', rebuildStacks);
bind('uP1z','p1z', rebuildStacks);
bind('uR0x','r0x', rebuildStacks);
bind('uR0y','r0y', rebuildStacks);
bind('uR0z','r0z', rebuildStacks);
bind('uR1x','r1x', rebuildStacks);
bind('uR1y','r1y', rebuildStacks);
bind('uR1z','r1z', rebuildStacks);
bind('uDelayD','delayD');
bind('uDelayS','delayS');
bind('uScrCas','scrCas');
bind('uSkew','skew', rebuildStacks);
bind('uStX','stx', rebuildStacks);
bind('uStY','sty', rebuildStacks);
if ($('uDither')){
  $('uDither').checked = P.dither;
  $('uDither').addEventListener('change', e => P.dither = e.target.checked);
}
if ($('uGlowOn')){
  $('uGlowOn').checked = P.glowOn;
  $('uGlowOn').addEventListener('change', e => P.glowOn = e.target.checked);
}
if ($('uLensOn')){
  $('uLensOn').checked = P.lensOn;
  $('uLensOn').addEventListener('change', e => P.lensOn = e.target.checked);
}
if ($('uMouseOn')){
  $('uMouseOn').checked = P.mouseOn;
  $('uMouseOn').addEventListener('change', e => P.mouseOn = e.target.checked);
}
if ($('uMInvert')){
  $('uMInvert').checked = P.mInvert;
  $('uMInvert').addEventListener('change', e => P.mInvert = e.target.checked);
}
if ($('uEchoOn')){
  $('uEchoOn').checked = P.echoOn;
  $('uEchoOn').addEventListener('change', e => P.echoOn = e.target.checked);
}
if ($('uBlobOn')){
  $('uBlobOn').checked = P.blobOn;
  $('uBlobOn').addEventListener('change', e => { P.blobOn = e.target.checked; applyBlob(); });
}
if ($('uPartFan')){
  $('uPartFan').checked = P.partFan;
  $('uPartFan').addEventListener('change', e => P.partFan = e.target.checked);
}
if ($('uGMaskEase')){
  $('uGMaskEase').checked = P.gMaskEase;
  $('uGMaskEase').addEventListener('change', e => P.gMaskEase = e.target.checked);
}
if ($('replayBtn')) $('replayBtn').addEventListener('click', replayIntro);
function applyUI(){ document.body.classList.toggle('ui-off', !P.ui); }
applyUI();
if ($('uUI')){
  $('uUI').checked = P.ui;
  $('uUI').addEventListener('change', e => { P.ui = e.target.checked; applyUI(); });
}
if ($('compSeg')) $('compSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const next = b.dataset.comp;
  if (next === P.comp) return;
  // stash current comp's blend keys (only A/B have them); load target's
  if (COMP[P.comp]) COMP_KEYS.forEach(k => { COMP[P.comp][k] = P[k]; });
  if (COMP[next]) Object.assign(P, COMP[next]);
  P.comp = next;
  document.querySelectorAll('#compSeg button').forEach(x => x.classList.toggle('on', x === b));
  compA.visible = P.comp === 'A';
  compB.visible = P.comp === 'B';   // C: both 3D comps hidden, grid shader takes over
  document.body.classList.toggle('mode-C', P.comp === 'C');
  if (P.comp === 'C'){ introT = 0; gLag.reveal = 0; gLag.mpx = -9999; gLag.mpy = -9999; gLag.tC = 0; }   // replay grid intro + re-bloom the mask
  if (COMP[next]) rebuildStacks();
  refreshPanel();
});
if ($('panelHead')) $('panelHead').addEventListener('click', () => {
  const p = $('panel');
  p.classList.toggle('closed');
  $('panelCaret').textContent = p.classList.contains('closed') ? '+' : '–';
});
if (PRM && $('uDrift')) $('uDrift').value = 0;

/* ---------- COOK: bake current state into a console-free standalone html ---------- */
function cookString(){
  let html = PRISTINE.replace(/<aside class="panel"[\s\S]*?<\/aside>/, '');
  const inject = '<scr' + 'ipt>window.COOKED_PARAMS=' + JSON.stringify(P) + ';</scr' + 'ipt>\n';
  html = html.replace('<script', inject + '<script');   // before the first script tag
  return html;
}
function syncComp(){ if (COMP[P.comp]) COMP_KEYS.forEach(k => { COMP[P.comp][k] = P[k]; }); }
function cook(){
  syncComp();
  const blob = new Blob([cookString()], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'scalex-hero-baked.html';
  a.click();
  URL.revokeObjectURL(a.href);
}
if ($('cookBtn')) $('cookBtn').addEventListener('click', cook);
window.SCALEX.cookString = cookString;

function downloadBlob(blob, filename){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 1000);
}

/* ---------- save / load preset (JSON of all params + both comp sets) ---------- */
function savePreset(){
  syncComp();
  const data = { version: 1, P: { ...P }, COMP: { A: { ...COMP.A }, B: { ...COMP.B } } };
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'scalex-preset.json');
}
function loadPreset(file){
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      if (data.P){ Object.assign(P, data.P); }
      if (!P.lensFx || typeof P.lensFx !== 'object') P.lensFx = { reveal:true, brighten:false, invert:false, desat:false, ripple:false, condense:false };
      if (data.COMP){ Object.assign(COMP.A, data.COMP.A || {}); Object.assign(COMP.B, data.COMP.B || {}); }
      // the active comp's blend keys come from its COMP set (authoritative)
      Object.assign(P, COMP[P.comp] || COMP.A);
      compA.visible = P.comp === 'A';
      compB.visible = P.comp === 'B';
      rebuildStacks();
      refreshPanel();
    } catch(err){ console.error('preset load failed', err); }
  };
  r.readAsText(file);
}
if ($('saveBtn')) $('saveBtn').addEventListener('click', savePreset);
if ($('loadBtn')) $('loadBtn').addEventListener('click', () => $('loadFile')?.click());
if ($('loadFile')) $('loadFile').addEventListener('change', e => { const f = e.target.files[0]; if (f) loadPreset(f); e.target.value=''; });

let gizmoGrab = false;   // true while an on-screen handle is being dragged (freezes camera/hover)

/* ---------- on-screen transform gizmo (MOTION CONSOLE only; never baked) ----------
   AE-style handles: 3 translate arrows + 3 rotate rings, anchored to the active
   comp's primary stack group at the START or END pose. Dragging writes straight
   into the existing p0/p1 (position) and r0/r1 (rotation) params — no new state,
   so BAKE stays clean. Rendered in its own pass after the post pipeline (depth
   cleared) so the dither/glow never touch it. Entire block is gated behind
   !window.COOKED_PARAMS, so a baked export never builds it. */
let GIZMO = null;
if (!window.COOKED_PARAMS){
  const AX = ['x','y','z'];
  const AXVEC = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)];
  const COLS = [0xff4f63, 0x4fe08a, 0x4f8dff];   // X red, Y green, Z blue (AE convention)
  const POSK = { start:['p0x','p0y','p0z'], end:['p1x','p1y','p1z'] };
  const ROTK = { start:['r0x','r0y','r0z'], end:['r1x','r1y','r1z'] };

  const binderMap = {};
  BINDERS.forEach(b => { binderMap[b.key] = b; });

  function lineParam(O, D, P0, A){   // closest param s on line P0+sA to ray O+tD (A unit)
    const w0 = P0.clone().sub(O);
    const a = A.dot(A), b = A.dot(D), c = D.dot(D), d = A.dot(w0), e = D.dot(w0);
    const denom = a*c - b*b;
    if (Math.abs(denom) < 1e-6) return d / a;
    return (b*e - c*d) / denom;
  }
  function rayPlane(ray, p0, n){
    const denom = ray.direction.dot(n);
    if (Math.abs(denom) < 1e-6) return null;
    const t = p0.clone().sub(ray.origin).dot(n) / denom;
    if (t < 0) return null;
    return ray.origin.clone().add(ray.direction.clone().multiplyScalar(t));
  }
  function ndcFrom(cx, cy){
    const r = renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
  }
  const solid = col => new THREE.MeshBasicMaterial({ color: col, fog:false, transparent:false });

  const RING_R = 1.34, ARROW_REACH = 0.95;

  function buildGizmo(){
    const scene = new THREE.Scene();
    const root  = new THREE.Group();
    scene.add(root);
    const vis = {};   // key 'kind:axis' -> { mesh, base }

    function orient(obj, axisIdx, isRing){
      // base geometry built along +Y (arrow) / around +Z (ring); rotate into axis frame
      if (isRing){
        if (axisIdx === 0) obj.rotation.y =  Math.PI / 2;   // ring normal -> X
        else if (axisIdx === 1) obj.rotation.x = Math.PI / 2; // ring normal -> Y
      } else {
        if (axisIdx === 0) obj.rotation.z = -Math.PI / 2;   // +Y -> +X
        else if (axisIdx === 2) obj.rotation.x = Math.PI / 2; // +Y -> +Z
      }
    }
    AX.forEach((axis, i) => {
      const col = COLS[i];
      // ---- translate arrow ----
      const arrow = new THREE.Group();
      const shaftLen = 0.62, start = 0.1;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, shaftLen, 8), solid(col));
      shaft.position.y = start + shaftLen / 2;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 14), solid(col));
      tip.position.y = start + shaftLen + 0.09;
      arrow.add(shaft, tip);
      orient(arrow, i, false);
      root.add(arrow);
      vis['move:' + axis] = { mesh: [shaft, tip], base: col };
      // ---- rotate ring (outside the arrow tips) ----
      const ring = new THREE.Mesh(new THREE.TorusGeometry(RING_R, 0.017, 10, 64), solid(col));
      orient(ring, i, true);
      root.add(ring);
      vis['rotate:' + axis] = { mesh: [ring], base: col };
    });
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), solid(0xffffff));
    root.add(hub);

    const G = {
      scene, root, vis,
      enabled: true, target: 'start', drag: null, ray: null, gapMul: 1,
      hovered: null,

      primary(){ return (P.comp === 'A' ? compA : compB).children[0] || null; },

      // screen-space pick: nearest projected handle to the cursor (depth/foreshorten robust)
      pickAt(ndc){
        const el = renderer.domElement;
        const W = el.clientWidth, H = el.clientHeight;
        const cx = (ndc.x * 0.5 + 0.5) * W, cy = (-ndc.y * 0.5 + 0.5) * H;
        const S = root.scale.x;
        const r = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)]
                    .map(v => v.applyQuaternion(root.quaternion).normalize());
        const toPx = w => { const v = w.clone().project(camera); return [(v.x*0.5+0.5)*W, (-v.y*0.5+0.5)*H, v.z]; };
        const segDist = (ax, ay, bx, by) => {
          const dx = bx-ax, dy = by-ay, l2 = dx*dx + dy*dy;
          let t = l2 > 0 ? ((cx-ax)*dx + (cy-ay)*dy) / l2 : 0; t = Math.max(0, Math.min(1, t));
          return Math.hypot(cx - (ax+t*dx), cy - (ay+t*dy));
        };
        let best = null, bestD = Infinity;
        for (let i = 0; i < 3; i++){
          // translate arrow as a projected segment
          const a = toPx(root.position.clone().add(r[i].clone().multiplyScalar(0.12 * S)));
          const b = toPx(root.position.clone().add(r[i].clone().multiplyScalar(ARROW_REACH * S)));
          const dM = (a[2] < 1 && b[2] < 1) ? segDist(a[0], a[1], b[0], b[1]) : Infinity;
          if (dM < bestD){ bestD = dM; best = { kind:'move', axis:AX[i] }; }
          // rotate ring as a projected polyline
          let u, v;
          if (i === 0){ u = r[1]; v = r[2]; } else if (i === 1){ u = r[2]; v = r[0]; } else { u = r[0]; v = r[1]; }
          let prev = null;
          for (let s = 0; s <= 48; s++){
            const th = s / 48 * Math.PI * 2;
            const wp = root.position.clone()
              .add(u.clone().multiplyScalar(Math.cos(th) * RING_R * S))
              .add(v.clone().multiplyScalar(Math.sin(th) * RING_R * S));
            const pp = toPx(wp);
            if (prev && prev[2] < 1 && pp[2] < 1){
              const dR = segDist(prev[0], prev[1], pp[0], pp[1]);
              if (dR < bestD){ bestD = dR; best = { kind:'rotate', axis:AX[i] }; }
            }
            prev = pp;
          }
        }
        return bestD <= 15 ? best : null;
      },

      updateAnchor(){
        const grp = this.primary(); if (!grp) return;
        grp.updateWorldMatrix(true, false);
        this.gapMul = (grp.userData.blend && grp.userData.blend.gapMul) || 1;
        const k = POSK[this.target];
        const local = new THREE.Vector3(P[k[0]] * this.gapMul, P[k[1]] * this.gapMul, -P[k[2]] * this.gapMul);
        const world = local.applyMatrix4(grp.matrixWorld);
        root.position.copy(world);
        const pos = new THREE.Vector3(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
        grp.matrixWorld.decompose(pos, q, sc);
        root.quaternion.copy(q);
        const dist = camera.position.distanceTo(world);
        root.scale.setScalar(Math.max(0.45, dist * 0.07));
      },

      axisDir(i){ return AXVEC[i].clone().applyQuaternion(root.quaternion).normalize(); },

      paint(key, col){ const v = this.vis[key]; if (v) v.mesh.forEach(m => m.material.color.setHex(col)); },
      resetAll(){ Object.keys(this.vis).forEach(key => this.paint(key, this.vis[key].base)); },
      hover(ud){
        const key = ud ? ud.kind + ':' + ud.axis : null;
        if (key === this.hovered) return;
        this.resetAll(); this.hovered = key;
        if (this.drag) return;
        if (key) this.paint(key, 0xffffff);
        document.body.style.cursor = key ? 'pointer' : '';
      },

      beginDrag(ud){
        const i = AX.indexOf(ud.axis);
        gizmoGrab = true;
        this.resetAll(); this.paint(ud.kind + ':' + ud.axis, 0xffffff);
        if (ud.kind === 'move'){
          const A = this.axisDir(i);
          const posKey = POSK[this.target][i];
          const s0 = lineParam(this.ray.origin, this.ray.direction, root.position.clone(), A);
          this.drag = { kind:'move', axis:ud.axis, axisVec:A, pivot:root.position.clone(),
                        posKey, base:P[posKey], s0, gapMul:this.gapMul };
        } else {
          const r = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)]
                    .map(v => v.applyQuaternion(root.quaternion));
          let n, u, v;
          if (i === 0){ n = r[0]; u = r[1]; v = r[2]; }
          else if (i === 1){ n = r[1]; u = r[2]; v = r[0]; }
          else { n = r[2]; u = r[0]; v = r[1]; }
          const pt = rayPlane(this.ray, root.position, n);
          const rel = pt ? pt.clone().sub(root.position) : new THREE.Vector3();
          const a0 = Math.atan2(rel.dot(v), rel.dot(u));
          const rotKey = ROTK[this.target][i];
          this.drag = { kind:'rotate', axis:ud.axis, rotKey, base:P[rotKey],
                        pivot:root.position.clone(), n, u, v, lastAng:a0, accum:0 };
        }
      },

      moveDrag(){
        const dr = this.drag; if (!dr) return;
        if (dr.kind === 'move'){
          const s = lineParam(this.ray.origin, this.ray.direction, dr.pivot, dr.axisVec);
          let d = (s - dr.s0) / dr.gapMul;
          if (dr.axis === 'z') d = -d;
          P[dr.posKey] = +(dr.base + d).toFixed(3);
          rebuildStacks();
          const b = binderMap[dr.posKey]; if (b) b.refresh();
        } else {
          const pt = rayPlane(this.ray, dr.pivot, dr.n); if (!pt) return;
          const rel = pt.clone().sub(dr.pivot);
          const ang = Math.atan2(rel.dot(dr.v), rel.dot(dr.u));
          dr.accum += Math.atan2(Math.sin(ang - dr.lastAng), Math.cos(ang - dr.lastAng));
          dr.lastAng = ang;
          P[dr.rotKey] = Math.round(dr.base + dr.accum * 180 / Math.PI);
          rebuildStacks();
          const b = binderMap[dr.rotKey]; if (b) b.refresh();
        }
      },

      endDrag(){ gizmoGrab = false; this.drag = null; this.resetAll(); this.hovered = null; document.body.style.cursor = ''; },

      render(){
        const on = this.enabled && (P.comp === 'A' || P.comp === 'B');
        root.visible = on;
        if (!on) return;
        if (!this.drag) this.updateAnchor();
        renderer.setRenderTarget(null);
        renderer.autoClear = false;
        renderer.clearDepth();
        renderer.render(scene, camera);
        renderer.autoClear = true;
      }
    };
    return G;
  }

  GIZMO = buildGizmo();

  const raycaster = new THREE.Raycaster();
  function pickable(){ return GIZMO && GIZMO.enabled && (P.comp === 'A' || P.comp === 'B'); }
  renderer.domElement.addEventListener('pointerdown', e => {
    if (!pickable()) return;
    const ndc = ndcFrom(e.clientX, e.clientY);
    const ud = GIZMO.pickAt(ndc);
    if (ud){
      e.preventDefault();
      raycaster.setFromCamera(ndc, camera);
      GIZMO.ray = raycaster.ray;
      GIZMO.beginDrag(ud);
      try { renderer.domElement.setPointerCapture(e.pointerId); } catch (_){}
    }
  });
  renderer.domElement.addEventListener('pointermove', e => {
    if (GIZMO && GIZMO.drag){
      raycaster.setFromCamera(ndcFrom(e.clientX, e.clientY), camera);
      GIZMO.ray = raycaster.ray;
      GIZMO.moveDrag();
      e.preventDefault();
    } else if (pickable()){
      GIZMO.hover(GIZMO.pickAt(ndcFrom(e.clientX, e.clientY)));
    }
  });
  window.addEventListener('pointerup', e => {
    if (GIZMO && GIZMO.drag){ GIZMO.endDrag(); try { renderer.domElement.releasePointerCapture(e.pointerId); } catch (_){} }
  });

  const gizSeg = document.getElementById('gizTargetSeg');
  if (gizSeg) gizSeg.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    GIZMO.target = b.dataset.giz;
    gizSeg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  });
  const gizChk = document.getElementById('uGizmo');
  if (gizChk) gizChk.addEventListener('change', e => { GIZMO.enabled = e.target.checked; if (!e.target.checked) GIZMO.endDrag(); });

  if (window.SCALEX) window.SCALEX.gizmo = GIZMO;   // debug handle (null in baked export)
}

/* ---------- loop ---------- */
const clock = new THREE.Clock();
let frames = 0, fpsT = 0;
function tick(){
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  // eased pointer — smoothing rate is the mouse "delay" control (frame-rate independent)
  const mTau = Math.max(0.001, P.mDelay) * 0.5;
  const mEase = (PRM || gizmoGrab) ? (gizmoGrab ? 0 : 1) : 1 - Math.exp(-dt / mTau);
  mouse.sx += (mouse.x - mouse.sx) * mEase;
  mouse.sy += (mouse.y - mouse.sy) * mEase;
  // separately-lagged cursor for grid push/swirl/parallax (its own delay)
  const gTau = Math.max(0.001, P.gDelay) * 0.5;
  const gEase = PRM ? 1 : 1 - Math.exp(-dt / gTau);
  gLag.nx += (mouse.x  - gLag.nx) * gEase;
  gLag.ny += (mouse.y  - gLag.ny) * gEase;
  gLag.px += (mouse.px - gLag.px) * gEase;
  gLag.py += (mouse.py - gLag.py) * gEase;
  // mask cursor target by interaction mode: FOLLOW the cursor (default),
  // PARALLAX gently around screen center, or STATIC center (no mouse interaction)
  let gmx = mouse.px, gmy = mouse.py;
  if (P.gMouseMode === 'parallax'){
    const cw = renderer.domElement.width, ch = renderer.domElement.height;
    const nx = (mouse.px > -9000) ? (mouse.px / cw) * 2 - 1 : 0;   // -1..1 across the screen
    const ny = (mouse.py > -9000) ? (mouse.py / ch) * 2 - 1 : 0;
    gmx = cw * 0.5 + nx * P.gParAmt * DPR;
    gmy = ch * 0.5 + ny * P.gParAmt * DPR;
  } else if (P.gMouseMode === 'off'){
    gmx = renderer.domElement.width * 0.5;
    gmy = renderer.domElement.height * 0.5;
  }
  // mask follows its target with its own delay
  if (gLag.mpx < -9000){ gLag.mpx = gmx; gLag.mpy = gmy; gLag.msx = gmx; gLag.msy = gmy; gLag.mp = 1; }
  if (P.gMaskEase){
    // ease-in-out: travel from a captured start to the target over the delay, smootherstep'd.
    // retarget (and recapture start) whenever the target moves enough.
    const moved = Math.hypot(gmx - gLag.mtx, gmy - gLag.mty);
    if (moved > 1.5){
      gLag.msx = gLag.mpx; gLag.msy = gLag.mpy;     // start = current position
      gLag.mtx = gmx; gLag.mty = gmy;               // target
      gLag.mp = 0;                                  // restart progress
    }
    gLag.mp = Math.min(1, gLag.mp + dt / Math.max(0.05, P.gMaskDelay));
    const e = gLag.mp * gLag.mp * gLag.mp * (gLag.mp * (gLag.mp * 6 - 15) + 10); // smootherstep
    gLag.mpx = gLag.msx + (gLag.mtx - gLag.msx) * e;
    gLag.mpy = gLag.msy + (gLag.mty - gLag.msy) * e;
    if (PRM){ gLag.mpx = gmx; gLag.mpy = gmy; }
  } else {
    // plain exponential smoothing (ease-out only)
    const gmTau = Math.max(0.001, P.gMaskDelay) * 0.5;
    const gmEase = PRM ? 1 : 1 - Math.exp(-dt / gmTau);
    gLag.mtx = gmx; gLag.mty = gmy;                 // keep retarget anchor current
    gLag.mpx += (gmx - gLag.mpx) * gmEase;
    gLag.mpy += (gmy - gLag.mpy) * gmEase;
  }
  const mouseOn = P.mouseOn && !PRM;

  // first-touch reveal: the grid mask blooms in gently the first time the cursor is
  // present (and eases back out if it leaves), instead of popping at full size.
  // in parallax/static modes the mask is ambient: it blooms in on entry regardless of cursor.
  // "mask start delay" sequences it AFTER the grid intro: the reveal may not begin
  // until gRevealDelay seconds have passed since entering grid mode.
  if (P.comp === 'C') gLag.tC += dt;
  const gRevTarget = (P.gMouseMode === 'follow') ? ((mouse.px > -9000) ? 1 : 0) : 1;
  if (PRM){
    gLag.reveal = gRevTarget;
  } else {
    const step = dt / Math.max(0.05, P.gRevealDur);
    if (gLag.reveal < gRevTarget){
      if (gLag.tC >= P.gRevealDelay) gLag.reveal = Math.min(gRevTarget, gLag.reveal + step);
    } else {
      gLag.reveal = Math.max(gRevTarget, gLag.reveal - step);
    }
  }

  // smooth scroll progress (scroll delay = extra easing on top of GSAP scrub)
  const sTau = Math.max(0.001, P.scrDelay) * 0.5;
  scrollT += (scrollRaw - scrollT) * (1 - Math.exp(-dt / sTau));

  // camera parallax + scroll dolly
  const par = mouseOn ? P.par : 0;
  camera.position.x = mouse.sx * 1.1 * par;
  camera.position.y = mouse.sy * 0.7 * par - scrollT * P.scrRise;
  camera.position.z = 16 - scrollT * P.scrDolly;
  camera.lookAt(0, -scrollT * P.scrRise, 0);

  // cursor light in world space
  // (cursor light removed with the flat-sheet refactor)

  // ---- multiplier intro: copies "multiply" outward, smoothly, on load ----
  if (introT < 1 && !PRM){
    introT = Math.min(1, introT + dt / Math.max(0.2, P.introDur));
  } else if (PRM){ introT = 1; }
  // smootherstep (Ken Perlin): zero velocity at both ends -> no pop, no abrupt stop
  // parametric intro ease: x^a / (x^a + (1-x)^b). `a` = ease IN power (higher = slower,
  // softer start), `b` = ease OUT power (higher = softer landing). a=b=2 ~ smoothstep feel.
  const smoother = x => {
    x = Math.max(0, Math.min(1, x));
    const a = Math.max(0.1, P.introEaseIn), b = Math.max(0.1, P.introEaseOut);
    const xa = Math.pow(x, a), xb = Math.pow(1 - x, b);
    return xa / (xa + xb);
  };

  // idle drift + the scroll turn, with per-copy delay (follow-through along the blend)
  const drift = P.drift;
  const delayD = P.delayD;   // drift ripple lag
  const delayS = P.delayS;   // scroll follow-through lag
  const introActive = introT < 1;
  const stagger = P.introStagger;       // 0 = all together, 1 = fully sequential
  const introSpin = P.introSpin;        // degrees of extra spin each copy eases out of
  const _tmpPos = new THREE.Vector3();  // reused per-unit idle position (cascade target)
  const _axisVec = _AXIS;
  [compA, compB].forEach(comp => {
    if (!comp.visible) return;
    // hover response: multiple independent channels toward (or away from) the cursor
    const sign = P.mInvert ? -1 : 1;
    const hx = mouseOn ? mouse.sx * sign : 0;
    const hy = mouseOn ? mouse.sy * sign : 0;
    const mag = Math.hypot(hx, hy);
    const mv  = mouseOn ? P.mMove  : 0;
    const mr  = mouseOn ? P.mRot   : 0;
    const msc = mouseOn ? P.mScale : 0;
    const mzp = mouseOn ? P.mZPush : 0;
    const mrl = mouseOn ? P.mRoll  : 0;
    comp.position.x = hx * mv;
    comp.position.y = hy * mv;
    comp.position.z = mag * mzp * -1.2;                  // cursor distance pushes depth
    comp.rotation.y = scrollT * P.scrTurn + hx * mr * 0.35;
    comp.rotation.x = scrollT * P.scrTurn * -0.3 - hy * mr * 0.35;
    comp.rotation.z = hx * mrl * 0.25;                   // roll/banking toward cursor
    const hsc = 1 + mag * msc * 0.12;
    comp.scale.setScalar(hsc);
    comp.children.forEach(grp => {
      // companion "echo" groups are toggleable; hide them (and skip animating) when off
      if (grp.userData.echo && !P.echoOn){ grp.visible = false; return; }
      if (grp.userData.echo) grp.visible = true;
      const s = grp.userData.seed ?? 0;
      const units = grp.children;
      const n = units.length;
      for (let i = 0; i < n; i++){
        const unit = units[i];
        const tn = n > 1 ? i / (n - 1) : 0;
        const lagD = tn * delayD;                     // drift phase lag at this copy
        const lagS = tn * delayS;                     // scroll lag at this copy
        const us = unit.userData;
        if (us.f === undefined) us.f = scrollT;       // lagged scroll follower
        const rate = lagS > 0.001 ? 1 - Math.exp(-dt / (lagS * 0.4)) : 1;
        us.f += (scrollT - us.f) * rate;
        const trail = us.f - scrollT;                 // 0 at rest; offset while moving

        // ---- per-copy MOUSE cascade: each copy chases the cursor with its own lag, so
        //      the reaction ripples through the stack and settles to 0 once the cursor stops ----
        const lagM = tn * P.mCasDelay;
        if (us.mx === undefined){ us.mx = hx; us.my = hy; }
        const mrate = (lagM > 0.001 && !PRM) ? 1 - Math.exp(-dt / (lagM * 0.4)) : 1;
        us.mx += (hx - us.mx) * mrate;
        us.my += (hy - us.my) * mrate;
        const casX = (us.mx - hx) * P.mCasAmt;        // trailing offset (0 when settled)
        const casY = (us.my - hy) * P.mCasAmt;

        // ---- idle DRIFT position wave, phase-shifted per copy (cascade via "drift delay") ----
        let driftPX = 0, driftPY = 0;
        if (drift && !PRM){
          const dph = t * 0.6 - lagD * 1.3;
          driftPX = Math.sin(dph + s)         * 0.05 * drift;
          driftPY = Math.cos(dph * 0.85 + s)  * 0.05 * drift;
        }

        // compute idle target transform, then intro eases FROM collapse TO it
        const br = us.baseRot;
        const bp = us.basePos;
        const idlePos = _tmpPos.set(bp.x + casX + driftPX, bp.y + casY + driftPY, bp.z);
        let idleRX, idleRY, idleRZ;
        if (grp.userData.turn){
          idleRX = br.x + casY * 0.16;
          idleRY = br.y + casX * 0.22 + (PRM ? 0 : Math.sin(t * 0.18 - lagD) * 0.06 * drift);
          idleRZ = br.z;
        } else {
          idleRX = br.x + trail * -0.3 + casY * 0.16 + ((PRM || !drift) ? 0 : Math.sin(t * 0.25 + s - lagD) * 0.05 * drift);
          idleRY = br.y + trail * 0.9  + casX * 0.22 + ((PRM || !drift) ? 0 : Math.cos(t * 0.21 + s * 1.7 - lagD) * 0.06 * drift);
          idleRZ = br.z;
        }

        // ---- fan-open intro: collapsed front X -> the live idle transform (seamless at p=1) ----
        if (introActive){
          const winStart = us.t * stagger;
          const win = Math.max(0.0001, 1 - winStart);
          const p = smoother((introT - winStart) / win);   // 0..1 eased, per copy
          const fr = grp.userData.front;

          // position: collapsed front pos -> idle pos
          unit.position.lerpVectors(fr.pos, idlePos, p);
          const sc = fr.scale + (us.baseScale - fr.scale) * p;
          unit.scale.set(sc, sc, 1);
          // rotation: collapsed front rot -> idle rot, plus a spin that fully decays by p=1
          unit.rotation.set(
            fr.rot.x + (idleRX - fr.rot.x) * p,
            fr.rot.y + (idleRY - fr.rot.y) * p,
            fr.rot.z + (idleRZ - fr.rot.z) * p + (1 - p) * introSpin * (Math.PI / 180)
          );
          // per-part divergent fan: decays to 0 by p=1 so it leaves no residual at handoff
          if (P.partFan){
            const q = 1 - p;
            const mc = unit.children;   // [arm_b, chevron, arm_t]
            if (mc.length === 3){
              mc[0].rotation.set(0, 0,  q * 0.5 * us.t);
              mc[1].rotation.set(0, q * -0.6 * us.t, 0);
              mc[2].rotation.set(0, 0, -q * 0.7 * us.t);
            }
          }
          // directional entry drift, also fully decayed by p=1
          const io = comp.userData.introOff;
          const ox = io ? io.x : P.introOffX;
          const oy = io ? io.y : P.introOffY;
          const oz = io ? io.z : P.introOffZ;
          const q2 = 1 - p;
          unit.position.x += q2 * ox;
          unit.position.y += q2 * oy;
          unit.position.z += q2 * oz;
          unit.children.forEach(m => { m.material.opacity = us.baseOp * Math.min(1, p * 1.4); });
          unit.visible = p > 0.002;
          us.introDone = false;
        } else {
          // idle: apply the live drift transform every frame (continuous, matches intro at p=1)
          unit.position.copy(idlePos);
          unit.scale.set(us.baseScale, us.baseScale, 1);
          unit.rotation.set(idleRX, idleRY, idleRZ);
          if (us.introDone !== true){
            unit.children.forEach(m => { m.rotation.set(0,0,0); m.material.opacity = us.baseOp; });
            unit.visible = true;
            us.introDone = true;
          }
        }
      }
      if (grp.userData.turn){
        const tb = grp.userData.turnBase || { x:0, y:-0.35, z:-0.18 };
        const axis = (P.bAxis === 'x' || P.bAxis === 'z') ? P.bAxis : 'y';
        if (P.bScroll === 'scale'){
          grp.rotation.set(tb.x, tb.y, tb.z);
          grp.scale.setScalar(Math.max(0.02, 1 + scrollT * P.bScale));
        } else {
          grp.scale.setScalar(1);
          grp.rotation.set(tb.x, tb.y, tb.z);
          grp.rotation[axis] += scrollT * P.bRot * (Math.PI / 180);
        }
        // ---- scroll ECHO: each copy re-evaluates the scroll transform at its own lagged
        //      scroll value (us.f), so the motion cascades through the stack and converges
        //      exactly to the group transform once scrolling stops ----
        if (P.scrCas > 0.001){
          const av = _axisVec[axis];
          const rad = P.bRot * (Math.PI / 180);
          grp.children.forEach(unit => {
            const us = unit.userData;
            if (us.f === undefined) return;
            const d = (us.f - scrollT) * P.scrCas;         // lag differential (0 at rest)
            if (P.bScroll === 'scale'){
              const sBase = Math.max(0.02, 1 + scrollT * P.bScale);
              const sMine = Math.max(0.02, 1 + (scrollT + d) * P.bScale);
              const k = sMine / sBase;
              unit.position.multiplyScalar(k);
              unit.scale.multiplyScalar(k);
            } else {
              const a = d * rad;
              unit.position.applyAxisAngle(av, a);          // sweep around the group axis
              unit.rotation[axis] += a;                     // and turn with it
            }
          });
        }
      } else if (P.scrCas > 0.001 && !grp.userData.echo){
        // non-turn groups (FIELD/A): positional echo of the comp-level scroll turn
        grp.children.forEach(unit => {
          const us = unit.userData;
          if (us.f === undefined) return;
          const a = (us.f - scrollT) * P.scrCas * P.scrTurn;
          if (a > 0.0001 || a < -0.0001) unit.position.applyAxisAngle(_axisVec.y, a);
        });
      }
    });
  });

  // uniforms
  ditherMat.uniforms.uPx.value = P.px * DPR;
  ditherMat.uniforms.uLevels.value = P.levels;
  gradeMat.uniforms.uHue.value = P.grHue * (Math.PI / 180);
  gradeMat.uniforms.uSat.value = P.grSat;
  gradeMat.uniforms.uBright.value = P.grBright;
  gradeMat.uniforms.uTintOn.value = P.tintOn ? 1 : 0;
  gradeMat.uniforms.uTintAmt.value = P.tintAmt;
  gradeMat.uniforms.uTintDesat.value = P.tintDesat;
  gradeMat.uniforms.uTintGain.value = P.tintGain;
  gradeMat.uniforms.uTintAngle.value = P.tintAngle * (Math.PI / 180);
  hex2vec(P.tintA, gradeMat.uniforms.uTintA.value);
  hex2vec(P.tintB, gradeMat.uniforms.uTintB.value);
  ditherMat.uniforms.uMode.value = P.ditherMode === 'dots' ? 1 : 0;
  ditherMat.uniforms.uDot.value = P.dot;
  ditherMat.uniforms.uLensR.value = P.lens * DPR;
  ditherMat.uniforms.uLensF.value = P.lensF;
  ditherMat.uniforms.uLensOn.value = P.lensOn ? 1 : 0;
  ditherMat.uniforms.uLxReveal.value   = P.lensFx.reveal   ? 1 : 0;
  ditherMat.uniforms.uLxBright.value   = P.lensFx.brighten ? 1 : 0;
  ditherMat.uniforms.uLxInvert.value   = P.lensFx.invert   ? 1 : 0;
  ditherMat.uniforms.uLxDesat.value    = P.lensFx.desat    ? 1 : 0;
  ditherMat.uniforms.uLxRipple.value   = P.lensFx.ripple   ? 1 : 0;
  ditherMat.uniforms.uLxCondense.value = P.lensFx.condense ? 1 : 0;
  ditherMat.uniforms.uLensStr.value = P.lensStr;
  ditherMat.uniforms.uTime.value = t;
  ditherMat.uniforms.uReact.value = (P.mouseOn && !PRM) ? P.mReact : 0;
  ditherMat.uniforms.uReactR.value = P.mReactR * DPR;
  ditherMat.uniforms.uAmt.value = (P.dither && P.ditherMode !== 'off') ? 1 : 0;
  ditherMat.uniforms.uMouse.value.set(mouse.px, mouse.py);
  compMat.uniforms.uIntensity.value = P.glow;

  // render pipeline: [3D scene | X-grid] -> rt -> [glow + dither in chosen order] -> screen
  if (P.comp === 'C'){
    gridMat.uniforms.uMouse.value.set(gLag.mpx, gLag.mpy);
    gridMat.uniforms.uCell.value = P.gCell * DPR;
    gridMat.uniforms.uBase.value = P.gBase;
    const rv = gLag.reveal, rvE = rv * rv * (3 - 2 * rv);   // smoothstep the linear reveal
    let rMul, opMul;
    if (P.gMaskShape === 'x'){
      // X mask intro is fully decoupled from the round reveal modes. Its entrance is
      // composed of independent controls on the shared reveal timing:
      // scale-in (X intro scale), spin-in (X intro spin), fade-in (X intro fade).
      rMul  = 1;                                     // radius is not the X's animator
      opMul = 1 - P.gXFade * (1 - rvE);              // fade amount: 1 = from transparent, 0 = no fade
    } else if (P.gRevealMode === 'grow'){ // ROUND, spotlight: a bright disc expands from a point
      rMul  = Math.max(0.02, rvE);
      opMul = Math.min(1, rv * 4);        // opacity snaps on fast; the radius does the animating
    } else {                              // ROUND, fade + slight grow: soft bloom
      rMul  = 0.82 + 0.18 * rvE;
      opMul = rvE;
    }
    gridMat.uniforms.uMaskR.value = P.gMaskR * DPR * rMul;
    gridMat.uniforms.uMaskShape.value = P.gMaskShape === 'x' ? 1 : 0;
    gridMat.uniforms.uXSize.value = P.gXSize / Math.max(0.05, P.gXFrom + (1 - P.gXFrom) * rvE);  // X scales IN with the reveal
    gridMat.uniforms.uXRot.value = (1 - rvE) * P.gXSpin * (Math.PI / 180);                       // and spins in
    gridMat.uniforms.uXFeather.value = P.gXFeather;
    gridMat.uniforms.uMaskOp.value = P.gMaskOp * opMul;
    gridMat.uniforms.uMouseN.value.set(mouseOn ? gLag.nx : 0, mouseOn ? gLag.ny : 0);
    gridMat.uniforms.uMouseLag.value.set(gLag.px, gLag.py);
    gridMat.uniforms.uGPar.value = (P.mouseOn && !PRM) ? P.gPar : 0;
    gridMat.uniforms.uGScaleM.value = (P.mouseOn && !PRM) ? P.gScaleM : 0;
    gridMat.uniforms.uGSphere.value = (P.mouseOn && !PRM) ? P.gSphere : 0;
    gridMat.uniforms.uBright.value = P.gBright;
    gridMat.uniforms.uScale.value = (P.mouseOn && !PRM) ? P.gScale : 0;
    gridMat.uniforms.uVig.value = P.gVig;
    gridMat.uniforms.uVigR.value = P.gVigR;
    gridMat.uniforms.uIntroDir.value = { centerOut:0, edgesIn:1, topDown:2 }[P.gIntroDir] ?? 0;
    gridMat.uniforms.uRot.value = P.gRot * Math.PI / 180;
    gridMat.uniforms.uMRot.value = (P.mouseOn && !PRM) ? P.gMRot * Math.PI / 180 : 0;
    gridMat.uniforms.uGap.value = P.gGap;
    gridMat.uniforms.uTileSc.value = P.gTileSc;
    // grid intro progress: its own duration, sharing the introT replay trigger
    gridMat.uniforms.uIntro.value = PRM ? 1 : Math.min(1, introT * (P.introDur / Math.max(0.2, P.gIntroDur)));
    const exP = PRM ? 1 : Math.min(1, introT * (Math.max(0.2, P.introDur) / Math.max(0.2, P.gExpandDur)));
    const gea = Math.max(0.1, P.gEaseIn), geb = Math.max(0.1, P.gEaseOut);
    const gxa = Math.pow(exP, gea), gxb = Math.pow(1 - exP, geb);
    gridMat.uniforms.uExpand.value = (gxa / (gxa + gxb)) || 0;
    gridMat.uniforms.uGEaseIn.value = gea;
    gridMat.uniforms.uGEaseOut.value = geb;
    gridMat.uniforms.uExpandOn.value = P.gExpandOn ? 1 : 0;
    gridMat.uniforms.uExpandFrom.value = P.gExpandFrom;
    gridMat.uniforms.uTime.value = t;
    blit(gridMat, rt);
  } else {
    renderer.setRenderTarget(rt);
    renderer.render(scene, camera);
  }

  if (!P.glowOn || P.glow <= 0.001){
    ditherMat.uniforms.tSrc.value = rt.texture;
    blit(ditherMat, outRT);
  } else if (P.order === 'ditherTop'){
    // glow first, dither quantizes the halo into the halftone ramp
    const glowTex = renderGlow(rt.texture);
    compMat.uniforms.tBase.value = rt.texture;
    compMat.uniforms.tGlow.value = glowTex;
    blit(compMat, auxRT);
    ditherMat.uniforms.tSrc.value = auxRT.texture;
    blit(ditherMat, outRT);
  } else {
    // dither first, glow blooms smoothly from the dithered image
    ditherMat.uniforms.tSrc.value = rt.texture;
    blit(ditherMat, auxRT);
    const glowTex = renderGlow(auxRT.texture);
    compMat.uniforms.tBase.value = auxRT.texture;
    compMat.uniforms.tGlow.value = glowTex;
    blit(compMat, outRT);
  }

  // final adjustment layer: grade the fully-composited frame, present to screen
  gradeMat.uniforms.tSrc.value = outRT.texture;
  blit(gradeMat, null);

  // on-screen transform handles (console only; no-op when baked)
  if (GIZMO) GIZMO.render();

  // fps
  frames++; fpsT += dt;
  if (fpsT >= 0.5){
    const fpsEl = document.getElementById('fps');
    if (fpsEl) fpsEl.textContent = Math.round(frames / fpsT) + ' fps';
    frames = 0; fpsT = 0;
  }
}
tick();
})();
