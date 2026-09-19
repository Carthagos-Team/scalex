(function(){
/* Home performance build, 2026-09-18. Based on 50.io9w2w.
 * Replace the existing Home hero script tag; do not load both files.
 * Preserves baked parameters, DPR, bloom levels and explicit quality overrides.
 * Adds idle scheduling, a cached X mask and bypasses inactive post passes.
 * window.SCALEX.performance reports work performed; .invalidate() wakes a frame
 * after deliberate changes to window.SCALEX.P. The authoring tool is unchanged.
 */
/*! ScaleX hero · self-contained · baked 2026-09-15 00:50 UTC
 *
 *  ONE FILE. Host it, then paste exactly this into Webflow, Page Settings, Before </body>:
 *
 *      <script src="https://YOUR-CDN/scalex-hero.js" defer></script>
 *
 *  Nothing else. The params are baked in below and three.js r128 + GSAP 3.12.5 are
 *  fetched by the file itself, in order, and only if the page has not already loaded
 *  them. r128 is pinned on purpose: r152 changed colour management and would shift
 *  the approved palette.
 *
 *  Pin the URL to a tag (jsDelivr off a GitHub release). Never @main, or a push
 *  reships the client's hero without anyone asking for it.
 *
 *  Per-page overrides, if you ever need one, still work: set window.COOKED_PARAMS to a
 *  PARTIAL object before this tag and it merges over the baked values.
 *  window.SCALEX_QUALITY and window.SCALEX_SCROLL_TRIGGER work the same way.
 *
 *  DOM: nothing required. It mints #stage, its CSS and the hero blob if absent, and
 *  drives scroll off .next, else the element after .hero, else raw window scroll.
 *
 *  WebGL does not render in the Designer canvas, only in Preview and published.
 *
 *  Not minified on purpose: the console wiring self-disables when there is no panel.
 *  `npx terser scalex-hero.js -c -m -o scalex-hero.js` if you want it smaller.
 */
window.__SCALEX_ROLE = "hero";
window.__SCALEX_NS = "SCALEX";
window.__SCALEX_SELF_CONTAINED = true;
window.__SCALEX_BUILD = "50.io9w2w.home-perf-1";
var __SCALEX_BAKED = {"px":3,"levels":6,"lens":260,"lensF":0.75,"lensOn":false,"lensStr":1.15,"lensFx":{"reveal":true,"brighten":false,"invert":false,"desat":false,"ripple":false,"condense":false},"par":2,"drift":3,"dither":true,"comp":"C","ditherMode":"off","dot":1.3,"glow":0.8,"glowR":0.6,"glowOn":true,"order":"ditherTop","ui":true,"introDur":2.4,"introStagger":0.6,"introEaseIn":2,"introEaseOut":2,"introOffX":0,"introOffY":0,"introOffZ":0,"introSpin":18,"partFan":false,"echoOn":false,"introMode":"fan","introDelay":0,"introSpinX":0,"introSpinY":0,"introScale":1,"introOffX1":0,"introOffY1":0,"introOffZ1":0,"introSpinX1":0,"introSpinY1":0,"introSpin1":18,"introScale1":1,"mouseOn":true,"mMove":0.6,"mScale":0.4,"mRot":0.5,"mDelay":0.35,"mInvert":false,"mZPush":0,"mRoll":0,"mReact":0,"mReactR":220,"mCasAmt":0.9,"mCasDelay":0.4,"scrTurn":0.5,"scrDolly":7.1,"scrRise":2.2,"scrDelay":0.15,"scrCas":1,"bScroll":"rotate","bAxis":"y","bRot":83,"bScale":0.6,"grHue":0,"grSat":1,"grBright":1,"tintOn":false,"tintA":"#955AE6","tintB":"#4C2CAB","tintAmt":1,"tintDesat":1,"tintGain":2,"tintAngle":-15,"gradOn":true,"gradA":"#955AE6","gradB":"#4C2CAB","gradAngle":-35,"gradGain":1.8,"blobOn":true,"blobSize":820,"blobOp":0.55,"blobFeather":60,"gCell":32,"gBase":0.17,"gBright":1.6,"gScale":0.3,"gMaskR":200,"gMaskShape":"x","gVig":1,"gVigR":0.3,"gXRotate":0,"gIntroDur":1.5,"gEaseIn":2,"gEaseOut":2,"gIntroDir":"leftRight","gExpandOn":true,"gExpandFrom":0.6,"gExpandDur":2,"gMoveMode":"off","gMoveAmt":2,"gMoveDur":1.6,"gridOn":false,"gPostSep":true,"gMouseOn":true,"gDitherMode":"off","gPx":3,"gLevels":6,"gDot":1.3,"gTeaseOn":false,"gIntroAt":2.65,"gBlackAt":0.05,"gTeaseLookOn":true,"gTeaseCell":32,"gTeaseTileSc":1.75,"gTeaseOp":1,"gTeaseBlend":0.6,"gSwpReveal":true,"gSwpShape":"linear","gSwpFeath":0.12,"gSwpSpeed":1,"gSwpCycles":1,"gSwpBias":0,"gSwpDiam":3.1,"gSwpCol":"#ffffff","gSwpColMix":0,"gUiAt":4.85,"gUiFade":1.7,"gBurnScale":2.6,"gBurnAmt":0.45,"gBurnRim":0.12,"gBurnFlick":0.35,"gRevMaskOn":false,"gRevMaskAt":3.5,"gRevMaskDur":1.4,"gRevMaskSoft":0.4,"gXMove":"zoomOut","gXMoveAmt":2.6,"gSwpAt":0,"gSwpDur":2.7,"gSwpGain":1,"gSwpAng":0,"gSwpWide":0.13,"gSwpSoft":1,"gSwpRegion":"all","gSwpTravel":1.6,"gGlimpseAt":1.6,"gGlimpseDur":0.9,"gGlimpseStr":0,"gLeakAt":0,"gLeakDur":2.4,"gLeakGain":0,"gLeakAng":90,"gLeakWide":0.7,"gLeakTravel":0.6,"gXFrom":0.2,"gXSpin":0,"gIntroMode":"pop","gStagger":0.5,"gTrail":0,"gFieldX":0,"gFieldY":220,"gMaskOffX":0,"gMaskOffY":0,"gEaseMode":"curve","gC1x":0.4,"gC1y":-0.115,"gC2x":0.6,"gC2y":1.115,"gMEaseMode":"curve","gMC1x":0.37,"gMC1y":0.155,"gMC2x":0,"gMC2y":0.921,"gTileOffX":0,"gTileOffY":70,"gTileSpin":0,"gTileScale":0.7,"gTileFade":0.35,"gTileOffX1":0,"gTileOffY1":-70,"gTileSpin1":0,"gTileScale1":0.7,"gTileFade1":0.35,"gRot":0,"gMRot":0,"gGap":0.24,"gTileSc":1.75,"gXSize":4.5,"gXFeather":0.04,"gMaskOp":0.35,"gGridOpIn":1,"gGridOpOut":1,"gWaveOn":false,"gWaveAmp":10,"gWaveFreq":1.6,"gWaveSpeed":1,"gWaveCursor":true,"gPushOn":false,"gPushAmt":30,"gGradOn":true,"gGradA":"#6b6cff","gGradB":"#6b6cff","gGradAngle":-35,"gGradGain":1,"gScrOn":true,"gScrSlide":400,"gScrMask":0.5,"gScrFade":0.1,"gScrGlow":3.45,"gScrEase":2.1,"gPTrig":"both","gPFrom":"fixed","gPShape":"logo","gPRegion":"all","gPSpeed":17,"gPWidth":6.8,"gPThick":483,"gPFadeIn":0.5,"gPFadeOut":1,"gPStart":0,"gPBirth":"center","gPRot":0,"gPAnchorX":0.537109375,"gPAnchorY":0.5042145593869731,"gPAnchorOn":true,"gPDilOn":false,"gPDilate":2,"gPGainIn":0.03,"gPGainOut":1.4,"gPFeathO":1,"gPFeathI":1,"gPHead":1,"gPCol":"#a187e8","gPReach":2,"gPGrow":1,"gPHue":0.4,"gPLife":4,"gPFirst":3,"gPAuto":7,"gPAutoStr":1,"gQOn":false,"gQSteps":6,"gPar":0.2,"gScaleM":0.005,"gSphere":0,"gDelay":0.3,"gMaskDelay":-2,"gMaskEase":false,"gRevealDur":2,"gRevealDelay":3.4,"gRevealEase":1,"gRevealMode":"fade","gMouseMode":"parallax","gParAmt":10,"gXFade":1,"gMaskAX":0.533984375,"gMaskAY":0.5057471264367817,"gMaskAnchorOn":true,"iters":10,"s0":1.46,"s1":1.3,"p0x":-1.55,"p0y":1.15,"p0z":-0.3,"p1x":0,"p1y":3.85,"p1z":9.3,"r0x":0,"r0y":0,"r0z":3,"r1x":0,"r1y":0,"r1z":-2,"delayD":0,"delayS":0,"skew":0,"stx":1,"sty":1,"frontFade":0.45,"opMul":1,"tintHold":0};
var __SCALEX_P = Object.assign({}, __SCALEX_BAKED, window.COOKED_PARAMS || {});
(function(){
  var NEED = [
    ["THREE", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"],
    ["gsap", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"],
    ["ScrollTrigger", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"]
  ];
  function have(n){ return n === "ScrollTrigger"
    ? !!(window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger))
    : !!window[n]; }
  function load(url){ return new Promise(function(res, rej){
    var s = document.createElement("script"); s.src = url; s.async = false;
    s.onload = res;
    s.onerror = function(){ rej(new Error("[ScaleX hero] could not load " + url)); };
    document.head.appendChild(s);
  }); }
  function domReady(){ return document.readyState !== "loading"
    ? Promise.resolve()
    : new Promise(function(r){ document.addEventListener("DOMContentLoaded", r, { once: true }); }); }
  var chain = Promise.resolve();
  NEED.forEach(function(d){ chain = chain.then(function(){ return have(d[0]) ? null : load(d[1]); }); });
  var MYROLE = "hero";
  function gate(){
    var L = window.ScaleXLoader;
    if (MYROLE === "hero" && L && L.heroReady && L.heroReady.then){
      return L.heroReady.then(function(){});   // the loader owns the screen until it is done
    }
    return Promise.resolve();
  }
  /* HARDWARE CHECK -------------------------------------------------------------------
     This engine is a multi-pass fullscreen post pipeline: it assumes a real GPU. Where
     WebGL falls back to a software rasteriser (SwiftShader on a headless/GPU-less box,
     llvmpipe on Linux, Microsoft Basic Render) every pass runs on the CPU instead. One
     frame measured ~78ms there, so the render loop saturates the main thread for as long
     as the hero is alive and the page never goes quiet. The hero is decoration: the
     headline, copy and buttons above it are complete without it, so on those machines we
     simply do not mount and leave the flat background.

     Fails OPEN on purpose. Anything we cannot POSITIVELY identify as a software
     rasteriser gets the full effect, because a false positive would silently delete the
     hero from a real visitor's browser. Set window.SCALEX_FORCE = true to override. */
  function softwareWebGL(){
    try {
      var c = document.createElement("canvas");
      var gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) return true;                 // no WebGL at all: the renderer would throw anyway
      var ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (!ext) return false;               // identity withheld: assume a real GPU
      var id = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "") + " " +
               String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || "");
      return /swiftshader|llvmpipe|softpipe|software rasterizer|microsoft basic render/i.test(id);
    } catch (e) { return false; }
  }
  chain.then(domReady).then(function(){
    if (window.SCALEX_FORCE !== true && softwareWebGL()){
      window.__SCALEX_SKIPPED = "software-webgl";
      return null;                       // no context, no loop, no main-thread cost
    }
    return gate().then(function(){ __scalexMain(); });
  }).catch(function(e){ console.error(e); });
})();
function __scalexMain(){
/* =========================================================================
   ScaleX hero — motion prototype
   Signature: the static dither texture from the design becomes a LIVE
   ordered-dither render pass. Geometry is clean 3D underneath; the screen
   quantizes it into the brand's halftone language in real time. A focus
   lens around the cursor resolves noise -> signal.
   ========================================================================= */
(() => {
/* Pristine copy of the page markup and of this script's own source, both captured before
   any runtime DOM mutation. The bake buttons build their exports out of these.
   Only captured when the console is present: in a deployed build there is nothing to bake,
   and serialising a whole Webflow page's outerHTML on every load is pure waste. */
const HAS_CONSOLE = !!document.getElementById('panel');
const PRISTINE = HAS_CONSOLE ? ('<!DOCTYPE html>\n' + document.documentElement.outerHTML) : '';
// textContent is empty for an external <script>, which is exactly the deployed case
const SELF_JS = HAS_CONSOLE && document.currentScript ? document.currentScript.textContent : '';
/* ---------- build stamp -------------------------------------------------------------------
   Three artifacts come out of this file and they drift: an engine deployed without its params,
   a v01 mistaken for a rev01. A hash of the console's own source is a cheap, exact identity —
   it changes when and only when the engine changes, needs no build step, and every artifact
   carries the same one, so a test page can say "this engine is not from your console". */
function fnv1a(str){
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
}
// In a bake the literal is injected before the engine runs, so it wins; in the console the
// hash is computed live off the source that is executing right now.
const BUILD = window.__SCALEX_BUILD || ('50.' + (SELF_JS ? fnv1a(SELF_JS) : 'nosrc'));
window.__SCALEX_BUILD = BUILD;
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

/* ---------- quality tier (mobile performance) ------------------------------
   The renderer is fill-rate bound: every frame draws the blend stack (many large
   transparent quads = heavy overdraw) then runs fullscreen post passes. Mobile
   GPUs are tile-based, so pixel count and render-target churn cost much more
   there than on desktop. This tier trims those without touching the look logic.

   WEBFLOW / LEO: force a tier by setting this BEFORE this script loads:
     <script>window.SCALEX_QUALITY = 'low';<\/script>     // 'low' | 'high'
   or pass overrides:
     <script>window.SCALEX_QUALITY = { tier:'low', dpr:1, maxIters:4, fps:30 };<\/script>
   Leave it unset for automatic detection.
--------------------------------------------------------------------------- */
const QCFG = (typeof window.SCALEX_QUALITY === 'string')
  ? { tier: window.SCALEX_QUALITY }
  : (window.SCALEX_QUALITY || {});
const Q_COARSE = window.matchMedia('(pointer: coarse)').matches;
const Q_NARROW = window.matchMedia('(max-width: 900px)').matches;
const Q_WEAK   = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
const Q_LOW    = QCFG.tier ? (QCFG.tier === 'low') : (Q_COARSE && (Q_NARROW || Q_WEAK));
const Q = {
  mobile:   Q_LOW,
  dpr:      QCFG.dpr      ?? (Q_LOW ? 1.0 : 1.5),   // 1.5 -> 1.0 is 2.25x fewer fragments
  glow:     QCFG.glow     ?? !Q_LOW,                // the 13-pass bloom pyramid
  maxIters: QCFG.maxIters ?? (Q_LOW ? 4 : 999),     // transparent copies -> overdraw
  hover:    QCFG.hover    ?? !Q_COARSE,             // touch devices have no hover
  fps:      QCFG.fps      ?? 0,                     // 0 = uncapped; 30 halves GPU load
  pauseOffscreen: QCFG.pauseOffscreen ?? true
};

/* pause everything when the hero is scrolled away or the tab is hidden.
   (the canvas is position:fixed, so once the hero anchor is past, following
   sections cover it and there is nothing to draw) */
let RENDER_ON = !document.hidden, _qVis = !document.hidden, _qOn = true, _fpsLast = 0;
let __schedulerReady = false, __rafId = 0, __stopped = false, __wakeTimer = 0;
let __idle = false, __inTick = false, __lastTick = 0, __hasRendered = false;
let __contextLost = false;
let __heroObserver = null, __fallbackVisibility = null, __scrollTrigger = null, __rawScroll = null;
const perf = { frames:0, passes:0, lastFramePasses:0, maskBuilds:0, state:'initializing' };
function autoPulseEnabled(){
  return !PRM && gridLive() && (P.gPTrig === 'auto' || P.gPTrig === 'both') && gLag.reveal > 0.98;
}
function syncIdleTime(){
  if (!__schedulerReady || !__idle || !RENDER_ON || __stopped) return;
  const now = performance.now(), dt = Math.max(0, (now - __lastTick) / 1000);
  __lastTick = now;
  clock.elapsedTime += dt;
  if (gridLive()) gLag.tC += dt;
  if (autoPulseEnabled()) pAutoT += dt;
}
function wakeRender(){
  if (!__schedulerReady || __stopped || !RENDER_ON || __inTick) return;
  syncIdleTime();
  __idle = false;
  if (__wakeTimer){ clearTimeout(__wakeTimer); __wakeTimer = 0; }
  if (!__rafId) __rafId = requestAnimationFrame(tick);
  perf.state = 'active';
}
function updateRenderGate(){
  const next = _qVis && (_qOn || !Q.pauseOffscreen) && !__contextLost;
  if (next === RENDER_ON) return;
  if (!next) syncIdleTime();
  RENDER_ON = next;
  if (!__schedulerReady) return;
  if (__stopped) return;
  if (!next){
    if (__rafId) cancelAnimationFrame(__rafId);
    if (__wakeTimer) clearTimeout(__wakeTimer);
    __rafId = __wakeTimer = 0;
    __idle = false;
    perf.state = 'suspended';
  } else {
    __lastTick = performance.now();
    wakeRender();
  }
}
function __visibilityChanged(){ _qVis = !document.hidden; updateRenderGate(); }
document.addEventListener('visibilitychange', __visibilityChanged);

/* ---------- stage host ----------------------------------------------------------------
   In a Webflow build there may be no #stage div and no site CSS for it, and the renderer
   needs both (it sizes off stage.clientWidth). Mint whatever is missing so the hero can
   never fail to mount because someone forgot a div. No-ops on this prototype page.      */
(() => {
  const root = document.body || document.documentElement;
  if (!document.getElementById('stage')){
    const el = document.createElement('div');
    el.id = 'stage';
    root.insertBefore(el, root.firstChild);       // behind everything: z-index 0, fixed
  }
  if (!document.getElementById('scalex-stage-css') && document.head){
    const st = document.createElement('style');
    st.id = 'scalex-stage-css';
    st.textContent =
      '#stage{position:fixed;inset:0;z-index:0}' +
      '#stage canvas{display:block;width:100%;height:100%}' +
      '.hero-blob{position:absolute;left:50%;top:calc(50% + .5px);' +
      'transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;will-change:filter}';
    document.head.appendChild(st);
  }
})();

/* ---------- renderer / scene ---------- */
const stage = document.getElementById('stage');
const heroAnchor = document.querySelector('.hero') || stage.closest('section, header');
if (heroAnchor && 'IntersectionObserver' in window){
  __heroObserver = new IntersectionObserver(es => {
    _qOn = es[0].isIntersecting; updateRenderGate();
  }, { rootMargin:'15% 0px' });
  __heroObserver.observe(heroAnchor);
} else if (Q.pauseOffscreen){
  // A fixed #stage never leaves the viewport. Use the first viewport as a
  // conservative fallback when the host page has no semantic hero section.
  __fallbackVisibility = () => {
    _qOn = (window.scrollY || 0) < window.innerHeight * 1.15;
    updateRenderGate();
  };
  window.addEventListener('scroll', __fallbackVisibility, { passive:true });
  __fallbackVisibility();
}
const __sxOwnCanvas = stage.tagName === 'CANVAS';
const renderer = new THREE.WebGLRenderer(__sxOwnCanvas ? { canvas: stage, antialias:false,
  powerPreference: Q.mobile ? 'default' : 'high-performance' } : { antialias:false,
  powerPreference: Q.mobile ? 'default' : 'high-performance' });
const DPR = Math.min(window.devicePixelRatio || 1, Q.dpr);
renderer.setPixelRatio(DPR);
__sxOwnCanvas || stage.appendChild(renderer.domElement);
function onHeroContextLost(e){ e.preventDefault(); __contextLost = true; updateRenderGate(); }
function onHeroContextRestored(){ maskCacheKey = ''; __contextLost = false; updateRenderGate(); }
renderer.domElement.addEventListener('webglcontextlost', onHeroContextLost);
renderer.domElement.addEventListener('webglcontextrestored', onHeroContextRestored);

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
  STACKS.forEach((grp, si) => {
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
    const n = Math.max(2, Math.min(Math.round(P.iters), Q.maxIters));
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
      // pin the transparent draw order. With depthWrite off, three.js re-sorts the
      // translucent sheets by camera distance EVERY FRAME; drifting/cascading copies at
      // near-equal distance keep swapping order, so back copies flicker on top of front
      // ones. Deterministic order instead: trailing copies draw first, the leading copy
      // (i=0) draws last — always on top. Groups are spaced so earlier groups (the main
      // X) stay above later companions (echo).
      const ro = (STACKS.length - si) * 1000 + (n - 1 - i);
      bl.cur.forEach(g => { const mesh = new THREE.Mesh(g, m); mesh.renderOrder = ro; unit.add(mesh); });
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
  introMode:'fan', introDelay:0, introSpinX:0, introSpinY:0, introScale:1,
  introOffX1:0, introOffY1:0, introOffZ1:0, introSpinX1:0, introSpinY1:0, introSpin1:18, introScale1:1,
  mouseOn:true, mMove:0.6, mScale:0.4, mRot:0.5, mDelay:0.35,
  mInvert:false, mZPush:0, mRoll:0, mReact:0, mReactR:220, mCasAmt:0.9, mCasDelay:0.4,
  scrTurn:0.5, scrDolly:4.5, scrRise:2.2, scrDelay:0.15, scrCas:1,
  bScroll:'rotate', bAxis:'y', bRot:83, bScale:0.6,
  grHue:0, grSat:1, grBright:1,
  tintOn:false, tintA:'#955AE6', tintB:'#4C2CAB', tintAmt:1, tintDesat:1, tintGain:2.0, tintAngle:-15,
  gradOn:true, gradA:'#955AE6', gradB:'#4C2CAB', gradAngle:-35, gradGain:1.8,
  blobOn:true, blobSize:820, blobOp:0.55, blobFeather:60,
  gCell:25, gBase:0.17, gBright:1.05, gScale:0.5, gMaskR:320, gMaskShape:'x',
  gVig:1.0, gVigR:0.48, gXRotate:0, gIntroDur:3, gEaseIn:2, gEaseOut:2, gIntroDir:'centerOut', gExpandOn:true, gExpandFrom:0.65, gExpandDur:1.6, gMoveMode:'off', gMoveAmt:2, gMoveDur:1.6,
  gridOn:false,   // GRID AS BACKGROUND in the stack comps (A/B); comp C always has it
  gPostSep:true,  // grid gets its OWN dither pass, independent of the monolith's
  gMouseOn:true,  // grid cursor interaction, independent of the monolith's mouse toggle
  gDitherMode:'off', gPx:3, gLevels:6, gDot:1.3,
  gTeaseOn:false, gIntroAt:2.0,
  gBlackAt:0.5,                      // opening beat: hold everything dark for this long
  gTeaseLookOn:false,                // the teased grid can differ from the settled one
  gTeaseCell:32, gTeaseTileSc:1.75, gTeaseOp:1, gTeaseBlend:0.6,
  gSwpReveal:false,                  // sweep acts as a window onto the grid instead of a light
  gSwpShape:'linear', gSwpFeath:0.12, gSwpSpeed:1, gSwpCycles:1, gSwpBias:0, gSwpDiam:1.6,
  gSwpCol:'#ffffff', gSwpColMix:0,
  gUiAt:0, gUiFade:0.6,              // UI (nav, copy, blob) holds off until the mask is in
  gBurnScale:2.6, gBurnAmt:0.45, gBurnRim:0.12, gBurnFlick:0.35,
  gRevMaskOn:false, gRevMaskAt:2.5, gRevMaskDur:1.2, gRevMaskSoft:0.35,   // grid reveals outward from the mask
  gXMove:'off', gXMoveAmt:2,         // MASK intro move: scale / zoom, mirroring the grid's
  gTeaseOn:false,
  gSwpAt:0.5, gSwpDur:1.5, gSwpGain:0.9, gSwpAng:0, gSwpWide:0.16, gSwpSoft:1, gSwpRegion:'all', gSwpTravel:1.3,
  gGlimpseAt:1.6, gGlimpseDur:0.9, gGlimpseStr:1,
  gLeakAt:0, gLeakDur:2.4, gLeakGain:0.35, gLeakAng:90, gLeakWide:0.7, gLeakTravel:0.6, gXFrom:0.3, gXSpin:0,
  // GRID / INTRO SLIDE. Every default here is the value that reproduces the POP intro, so
  // switching mode with the sliders untouched changes nothing on screen: stagger 0.5 is the
  // span that used to be hardcoded, entry scale 0.4 is the legacy tile pop, entry opacity 0
  // is the legacy fade-up, and all travel is zero.
  gIntroMode:'pop', gStagger:0.5, gTrail:0, gFieldX:0, gFieldY:0, gMaskOffX:0, gMaskOffY:0,
  // grid intro ease. POWER is the two-exponent ratio the file has always used and stays the
  // default, so nothing shifts. CURVE is a real cubic bezier (CSS convention, P0 0,0 and
  // P3 1,1), which POWER cannot express: a held start, a hard snap, or overshoot past 1.
  gEaseMode:'power', gC1x:0.42, gC1y:0, gC2x:0.58, gC2y:1,
  // and the same again for the big X, on its own clock
  gMEaseMode:'power', gMC1x:0.42, gMC1y:0, gMC2x:0.58, gMC2y:1,
  gTileOffX:0,  gTileOffY:0,  gTileSpin:0,  gTileScale:0.4,  gTileFade:0,
  gTileOffX1:0, gTileOffY1:0, gTileSpin1:0, gTileScale1:0.4, gTileFade1:0,
  gRot:0, gMRot:0, gGap:0.24, gTileSc:1.45, gXSize:5, gXFeather:0.36, gMaskOp:0,
  gGridOpIn:1, gGridOpOut:1, gWaveOn:false, gWaveAmp:8, gWaveFreq:1.6, gWaveSpeed:1, gWaveCursor:false, gPushOn:false, gPushAmt:30,
  gGradOn:true, gGradA:'#6b6cff', gGradB:'#6b6cff', gGradAngle:-35, gGradGain:1,
  gScrOn:true, gScrSlide:120, gScrMask:0.5, gScrFade:0.15, gScrGlow:1.8, gScrEase:1.4,
  gPTrig:'both', gPFrom:'mask', gPShape:'round', gPRegion:'all', gPSpeed:12, gPWidth:3, gPThick:87, gPFadeIn:0, gPFadeOut:1, gPStart:0, gPBirth:'center', gPRot:0, gPAnchorX:0.5, gPAnchorY:0.5, gPAnchorOn:true, gPDilOn:false, gPDilate:0.5, gPGainIn:0.5, gPGainOut:1.4, gPFeathO:1, gPFeathI:1, gPHead:0.9, gPCol:'#a78bfa', gPReach:0.8,
  gPGrow:0.6, gPHue:0.8, gPLife:1.6, gPFirst:1.2, gPAuto:4.5, gPAutoStr:0.7, gQOn:false, gQSteps:6,
  gPar:0, gScaleM:0.005, gSphere:0, gDelay:0.3, gMaskDelay:0.52, gMaskEase:false, gRevealDur:1, gRevealDelay:1, gRevealEase:1, gRevealMode:'fade', gMouseMode:'parallax', gParAmt:0, gXFade:1,
  // where the X actually LIVES. Until now the mask was pinned to the dead centre of the
  // viewport in every mode but FOLLOW, with no way to move it. Normalised 0..1 in screen
  // terms (y counts DOWN, same as the pulse anchor), 0.5/0.5 = centre = the old behaviour.
  gMaskAX:0.5, gMaskAY:0.5, gMaskAnchorOn:true,
  iters:10, s0:1.46, s1:1.30,
  p0x:-1.55, p0y:1.15, p0z:-0.3, p1x:0, p1y:3.85, p1z:9.3,
  r0x:0, r0y:0, r0z:3, r1x:0, r1y:0, r1z:-2, delayD:0, delayS:0.35, skew:0, stx:1, sty:1, frontFade:0.45
}, __SCALEX_P);
// True when the params came from a bake of ANY shape. The paste block sets COOKED_PARAMS;
// the self-contained engine has no COOKED_PARAMS at all and sets __SCALEX_SELF_CONTAINED
// instead. Testing COOKED_PARAMS alone read a one-file build as "this is the console".
const BAKED_PARAMS = !!(window.COOKED_PARAMS || window.__SCALEX_SELF_CONTAINED);

/* ---------- stale paste block guard -------------------------------------------------------
   BAKE FOR WEBFLOW writes TWO files: the engine and the paste block that carries the params.
   Deploy the engine and forget the paste block and nothing breaks loudly: every key added
   since that block was written simply falls back to the engine default, and the hero renders
   a look nobody chose. That is silent and it costs an afternoon to find. So on a cooked build
   only, name the missing keys once, in the console.                                         */
(() => {
  if (window.__SCALEX_SELF_CONTAINED) return;          // one-file build: params travel with it
  const ck = window.COOKED_PARAMS;
  if (!ck || typeof ck !== 'object') return;           // the console preview has no block
  const missing = Object.keys(P).filter(k => !(k in ck));
  if (!missing.length) return;
  console.warn('[ScaleX hero] the paste block is older than this engine. ' + missing.length +
    ' param' + (missing.length > 1 ? 's are' : ' is') + ' missing and fell back to engine defaults: ' +
    missing.join(', ') + '. Re-run BAKE FOR WEBFLOW and replace the paste block as well as the .js.');
})();

/* ---- per-composition blend/deform sets (render params stay global) ----
   switching FIELD/MONOLITH swaps these keys into P and refreshes the panel. */
const COMP_KEYS = ['iters','s0','s1','p0x','p0y','p0z','p1x','p1y','p1z',
                   'r0x','r0y','r0z','r1x','r1y','r1z','delayD','delayS','skew','stx','sty'];
// per-comp LOOK keys: each composition now carries its own approved look/motion state,
// stashed and restored on comp switch (client-approved presets baked in below)
const LOOK_KEYS = ['ditherMode','px','levels','dot','glow','glowR','glowOn','order',
  'grHue','grSat','grBright','tintOn','tintA','tintB','tintAmt','tintDesat','tintGain','tintAngle',
  'gradOn','gradA','gradB','gradAngle','gradGain',
  'gGradOn','gGradA','gGradB','gGradAngle','gGradGain',
  'gScrOn','gScrSlide','gScrMask','gScrFade','gScrGlow','gScrEase',
  // These are seeded onto every comp by fillDefaults, so they MUST also be stored back by
  // syncComp. While they were seeded but not stored, saving a preset and loading it again
  // wrote the seeded DEFAULT over the real value: the slide intro, both curves and the mask
  // anchor silently reset on every round trip.
  // mask placement
  'gMaskAX','gMaskAY','gMaskAnchorOn','gXRotate',
  // grid intro slide
  'gIntroMode','gStagger','gTrail','gFieldX','gFieldY','gMaskOffX','gMaskOffY',
  'gMoveMode','gMoveAmt','gMoveDur',
  'gridOn','gPostSep','gMouseOn','gDitherMode','gPx','gLevels','gDot','gTeaseOn','gIntroAt',
  'gBlackAt','gTeaseLookOn','gTeaseCell','gTeaseTileSc','gTeaseOp','gTeaseBlend','gSwpReveal','gBurnScale','gBurnAmt','gBurnRim','gBurnFlick','gRevMaskOn','gRevMaskAt','gRevMaskDur','gRevMaskSoft','gXMove','gXMoveAmt',
  'gSwpShape','gSwpFeath','gSwpSpeed','gSwpCycles','gSwpBias','gSwpDiam','gSwpCol','gSwpColMix','gUiAt','gUiFade','gSwpAt','gSwpDur','gSwpGain','gSwpAng','gSwpWide','gSwpSoft','gSwpRegion','gSwpTravel',
  'gGlimpseAt','gGlimpseDur','gGlimpseStr','gLeakAt','gLeakDur','gLeakGain','gLeakAng','gLeakWide','gLeakTravel',
  // tile entry, FIRST then LAST endpoint
  'gTileOffX','gTileOffY','gTileSpin','gTileScale','gTileFade','gTileOffX1','gTileOffY1','gTileSpin1','gTileScale1','gTileFade1',
  // the two ease curves
  'gEaseMode','gC1x','gC1y','gC2x','gC2y','gMEaseMode','gMC1x','gMC1y','gMC2x','gMC2y',
  'gPTrig','gPFrom','gPShape','gPRegion','gPSpeed','gPWidth','gPThick','gPFadeIn','gPFadeOut','gPStart','gPBirth','gPRot','gPAnchorX','gPAnchorY','gPAnchorOn','gPDilOn','gPDilate','gPGainIn','gPGainOut','gPFeathO','gPFeathI','gPHead','gPCol','gPReach','gPGrow','gPHue','gPLife',
  'gPFirst','gPAuto','gPAutoStr','gQOn','gQSteps',
  'lensOn','lens','lensF','lensStr',
  'mouseOn','mMove','mScale','mRot','mDelay','mInvert','mZPush','mRoll','mReact','mReactR','mCasAmt','mCasDelay',
  'drift','par',
  'introDur','introStagger','introEaseIn','introEaseOut','introOffX','introOffY','introOffZ','introSpin','partFan',
  'introMode','introDelay','introSpinX','introSpinY','introScale',
  'introOffX1','introOffY1','introOffZ1','introSpinX1','introSpinY1','introSpin1','introScale1',
  'scrTurn','scrDolly','scrRise','scrDelay','scrCas',
  'bScroll','bAxis','bRot','bScale','echoOn',
  'blobOn','blobSize','blobOp','blobFeather',
  'frontFade','opMul','tintHold'];
const SWAP_KEYS = COMP_KEYS.concat(LOOK_KEYS);
const COMP = {
  // A — exploratory field (original defaults)
  A: { iters:10, s0:1.46, s1:1.30,
       p0x:-1.55, p0y:1.15, p0z:-0.3, p1x:0, p1y:3.85, p1z:9.3,
       r0x:0, r0y:0, r0z:3, r1x:0, r1y:0, r1z:-2, delayD:0, delayS:0.35, skew:0, stx:1, sty:1,
       ditherMode:'dots', px:3, levels:6, dot:1.3, glow:0.8, glowR:0.6, glowOn:true, order:'ditherTop',
       grHue:0, grSat:1, grBright:1, tintOn:false, tintA:'#955AE6', tintB:'#4C2CAB', tintAmt:1, tintDesat:1, tintGain:2, tintAngle:-15,
       gradOn:true, gradA:'#955AE6', gradB:'#4C2CAB', gradAngle:-35, gradGain:1.8,
       gGradOn:true, gGradA:'#6b6cff', gGradB:'#6b6cff', gGradAngle:-35, gGradGain:1,
       gScrOn:true, gScrSlide:120, gScrMask:0.5, gScrFade:0.15, gScrGlow:1.8, gScrEase:1.4,
  gPTrig:'both', gPFrom:'mask', gPShape:'round', gPRegion:'all', gPSpeed:12, gPWidth:3, gPThick:87, gPFadeIn:0, gPFadeOut:1, gPStart:0, gPBirth:'center', gPRot:0, gPAnchorX:0.5, gPAnchorY:0.5, gPAnchorOn:true, gPDilOn:false, gPDilate:0.5, gPGainIn:0.5, gPGainOut:1.4, gPFeathO:1, gPFeathI:1, gPHead:0.9, gPCol:'#a78bfa', gPReach:0.8,
       gPGrow:0.6, gPHue:0.8, gPLife:1.6, gPFirst:1.2, gPAuto:4.5, gPAutoStr:0.7, gQOn:false, gQSteps:6,
       lensOn:false, lens:260, lensF:0.75, lensStr:1.15,
       lensFx:{ reveal:true, brighten:false, invert:false, desat:false, ripple:false, condense:false },
       mouseOn:true, mMove:0.6, mScale:0.4, mRot:0.5, mDelay:0.35, mInvert:false, mZPush:0, mRoll:0, mReact:0, mReactR:220, mCasAmt:0.9, mCasDelay:0.4,
       drift:3, par:2,
       introDur:2.4, introStagger:0.6, introEaseIn:2, introEaseOut:2, introOffX:0, introOffY:0, introOffZ:0, introSpin:18, partFan:false,
       scrTurn:0.5, scrDolly:4.5, scrRise:2.2, scrDelay:0.15, scrCas:1,
       bScroll:'rotate', bAxis:'y', bRot:83, bScale:0.6, echoOn:false,
       blobOn:true, blobSize:820, blobOp:0.55, blobFeather:60,
       frontFade:0.45, opMul:1, tintHold:0 },
  // B — APPROVED "interact / fewer X" (client preset, blue palette, lens + cascade on)
  B: { iters:6, s0:2, s1:1.76,
       p0x:-6.831, p0y:-3.14, p0z:-2.756, p1x:0.4, p1y:-2.8, p1z:5.95,
       r0x:0, r0y:1, r0z:33, r1x:0, r1y:32, r1z:33, delayD:3, delayS:0.13, skew:0, stx:1, sty:0.8,
       ditherMode:'bayer', px:2, levels:7, dot:1.3, glow:0, glowR:0.6, glowOn:true, order:'ditherTop',
       grHue:-15, grSat:0.7, grBright:1.48, tintOn:true, tintA:'#2715b2', tintB:'#2c45aa', tintAmt:1, tintDesat:1, tintGain:2, tintAngle:-15,
       gradOn:true, gradA:'#5451d6', gradB:'#0f145c', gradAngle:157, gradGain:1.7,
       gGradOn:true, gGradA:'#6b6cff', gGradB:'#6b6cff', gGradAngle:-35, gGradGain:1,
       gScrOn:true, gScrSlide:120, gScrMask:0.5, gScrFade:0.15, gScrGlow:1.8, gScrEase:1.4,
  gPTrig:'both', gPFrom:'mask', gPShape:'round', gPRegion:'all', gPSpeed:12, gPWidth:3, gPThick:87, gPFadeIn:0, gPFadeOut:1, gPStart:0, gPBirth:'center', gPRot:0, gPAnchorX:0.5, gPAnchorY:0.5, gPAnchorOn:true, gPDilOn:false, gPDilate:0.5, gPGainIn:0.5, gPGainOut:1.4, gPFeathO:1, gPFeathI:1, gPHead:0.9, gPCol:'#a78bfa', gPReach:0.8,
       gPGrow:0.6, gPHue:0.8, gPLife:1.6, gPFirst:1.2, gPAuto:4.5, gPAutoStr:0.7, gQOn:false, gQSteps:6,
       lensOn:true, lens:600, lensF:4, lensStr:0.6,
       lensFx:{ reveal:true, brighten:true, invert:false, desat:true, ripple:false, condense:false },
       mouseOn:true, mMove:0.2, mScale:0.7, mRot:0.2, mDelay:1.32, mInvert:false, mZPush:0, mRoll:0, mReact:1.4, mReactR:220, mCasAmt:1.1, mCasDelay:0.92,
       drift:2, par:2,
       introDur:3.5, introStagger:0.02, introEaseIn:2, introEaseOut:5, introOffX:0, introOffY:0, introOffZ:0, introSpin:10, partFan:false,
       scrTurn:0, scrDolly:0, scrRise:10, scrDelay:0.01, scrCas:1,
       bScroll:'rotate', bAxis:'z', bRot:0, bScale:0.6, echoOn:false,
       blobOn:true, blobSize:910, blobOp:0.18, blobFeather:60,
       frontFade:0, opMul:2.2, tintHold:0.6 },
  // C — APPROVED "grid static 3" (client preset: parallax mask, big X, slow bloom)
  C: { iters:10, s0:1.46, s1:1.30,
       p0x:-1.55, p0y:1.15, p0z:-0.3, p1x:0, p1y:3.85, p1z:9.3,
       r0x:0, r0y:0, r0z:3, r1x:0, r1y:0, r1z:-2, delayD:0, delayS:0, skew:0, stx:1, sty:1,
       ditherMode:'off', px:3, levels:6, dot:1.3, glow:0.8, glowR:0.6, glowOn:true, order:'ditherTop',
       grHue:0, grSat:1, grBright:1, tintOn:false, tintA:'#955AE6', tintB:'#4C2CAB', tintAmt:1, tintDesat:1, tintGain:2, tintAngle:-15,
       gradOn:true, gradA:'#955AE6', gradB:'#4C2CAB', gradAngle:-35, gradGain:1.8,
       gGradOn:true, gGradA:'#6b6cff', gGradB:'#6b6cff', gGradAngle:-35, gGradGain:1,
       gScrOn:true, gScrSlide:120, gScrMask:0.5, gScrFade:0.15, gScrGlow:1.8, gScrEase:1.4,
  gPTrig:'both', gPFrom:'mask', gPShape:'round', gPRegion:'all', gPSpeed:12, gPWidth:3, gPThick:87, gPFadeIn:0, gPFadeOut:1, gPStart:0, gPBirth:'center', gPRot:0, gPAnchorX:0.5, gPAnchorY:0.5, gPAnchorOn:true, gPDilOn:false, gPDilate:0.5, gPGainIn:0.5, gPGainOut:1.4, gPFeathO:1, gPFeathI:1, gPHead:0.9, gPCol:'#a78bfa', gPReach:0.8,
       gPGrow:0.6, gPHue:0.8, gPLife:1.6, gPFirst:1.2, gPAuto:4.5, gPAutoStr:0.7, gQOn:false, gQSteps:6,
       lensOn:false, lens:260, lensF:0.75, lensStr:1.15,
       lensFx:{ reveal:true, brighten:false, invert:false, desat:false, ripple:false, condense:false },
       mouseOn:true, mMove:0.6, mScale:0.4, mRot:0.5, mDelay:0.35, mInvert:false, mZPush:0, mRoll:0, mReact:0, mReactR:220, mCasAmt:0.9, mCasDelay:0.4,
       drift:3, par:2,
       introDur:2.4, introStagger:0.6, introEaseIn:2, introEaseOut:2, introOffX:0, introOffY:0, introOffZ:0, introSpin:18, partFan:false,
       scrTurn:0.5, scrDolly:7.1, scrRise:2.2, scrDelay:0.15, scrCas:1,
       bScroll:'rotate', bAxis:'y', bRot:83, bScale:0.6, echoOn:false,
       blobOn:true, blobSize:820, blobOp:0.55, blobFeather:60,
       frontFade:0.45, opMul:1, tintHold:0 }
};
// backfill new intro-entry keys on each preset so existing looks are unchanged:
// the END entry defaults to the START entry (uniform), mode=fan, no trail delay.
// Seed any key a preset predates. Called on the built-in comps at boot AND on every
// loaded preset or bake, so a file saved before a control existed comes back complete
// instead of leaving that control reading undefined.
function fillDefaults(c){
  if (!c || typeof c !== 'object') return c;
  if (c.introMode   === undefined) c.introMode   = 'fan';
  if (c.introDelay  === undefined) c.introDelay  = 0;
  if (c.introSpinX  === undefined) c.introSpinX  = 0;
  if (c.introSpinY  === undefined) c.introSpinY  = 0;
  if (c.introScale  === undefined) c.introScale  = 1;
  if (c.introOffX1  === undefined) c.introOffX1  = c.introOffX ?? 0;
  if (c.introOffY1  === undefined) c.introOffY1  = c.introOffY ?? 0;
  if (c.introOffZ1  === undefined) c.introOffZ1  = c.introOffZ ?? 0;
  if (c.introSpinX1 === undefined) c.introSpinX1 = 0;
  if (c.introSpinY1 === undefined) c.introSpinY1 = 0;
  if (c.introSpin1  === undefined) c.introSpin1  = c.introSpin ?? 18;
  if (c.introScale1 === undefined) c.introScale1 = 1;
  // grid intro slide: absent on anything saved before GRID / INTRO SLIDE existed. Seeded
  // with the values that reproduce the POP entrance, so an older look stays POP and the
  // slide stays dormant until it is dialled.
  if (c.gXRotate      === undefined) c.gXRotate      = 0;
  if (c.gMaskAX       === undefined) c.gMaskAX       = 0.5;
  if (c.gMaskAY       === undefined) c.gMaskAY       = 0.5;
  if (c.gMaskAnchorOn === undefined) c.gMaskAnchorOn = true;
  if (c.gMEaseMode === undefined) c.gMEaseMode = 'power';
  if (c.gMC1x === undefined) c.gMC1x = 0.42;
  if (c.gMC1y === undefined) c.gMC1y = 0;
  if (c.gMC2x === undefined) c.gMC2x = 0.58;
  if (c.gMC2y === undefined) c.gMC2y = 1;
  if (c.gEaseMode === undefined) c.gEaseMode = 'power';
  if (c.gC1x === undefined) c.gC1x = 0.42;
  if (c.gC1y === undefined) c.gC1y = 0;
  if (c.gC2x === undefined) c.gC2x = 0.58;
  if (c.gC2y === undefined) c.gC2y = 1;
  if (c.gIntroMode  === undefined) c.gIntroMode  = 'pop';
  if (c.gStagger    === undefined) c.gStagger    = 0.5;
  if (c.gTrail      === undefined) c.gTrail      = 0;
  if (c.gFieldX     === undefined) c.gFieldX     = 0;
  if (c.gFieldY     === undefined) c.gFieldY     = 0;
  if (c.gMaskOffX   === undefined) c.gMaskOffX   = 0;
  if (c.gMaskOffY   === undefined) c.gMaskOffY   = 0;
  if (c.gTileOffX   === undefined) c.gTileOffX   = 0;
  if (c.gTileOffY   === undefined) c.gTileOffY   = 0;
  if (c.gTileSpin   === undefined) c.gTileSpin   = 0;
  if (c.gTileScale  === undefined) c.gTileScale  = 0.4;
  if (c.gTileFade   === undefined) c.gTileFade   = 0;
  // the LAST endpoint defaults to the FIRST, so a travel dialled on one pose is uniform
  // across the field until the other endpoint is deliberately moved
  if (c.gTileOffX1  === undefined) c.gTileOffX1  = c.gTileOffX;
  if (c.gTileOffY1  === undefined) c.gTileOffY1  = c.gTileOffY;
  if (c.gTileSpin1  === undefined) c.gTileSpin1  = c.gTileSpin;
  if (c.gTileScale1 === undefined) c.gTileScale1 = c.gTileScale;
  if (c.gTileFade1  === undefined) c.gTileFade1  = c.gTileFade;
  // grid colour: absent on presets saved before GRID / COLOR existed — seed with the
  // legacy flat tint so older looks come back byte-identical.
  if (c.gGradOn    === undefined) c.gGradOn    = true;
  if (c.gGradA     === undefined) c.gGradA     = '#6b6cff';
  if (c.gGradB     === undefined) c.gGradB     = '#6b6cff';
  if (c.gGradAngle === undefined) c.gGradAngle = -35;
  if (c.gGradGain  === undefined) c.gGradGain  = 1;
  // pulse: absent on presets saved before GRID / PULSE existed. Seeded with gain 0 so an
  // older look comes back exactly as it was and the feature stays dormant until dialled.
  if (c.gScrOn     === undefined) c.gScrOn     = true;
  if (c.gScrSlide  === undefined) c.gScrSlide  = 120;
  if (c.gScrMask   === undefined) c.gScrMask   = 0.5;
  if (c.gScrFade   === undefined) c.gScrFade   = 0.15;
  if (c.gScrGlow   === undefined) c.gScrGlow   = 1.8;
  if (c.gScrEase   === undefined) c.gScrEase   = 1.4;
  if (c.gPTrig     === undefined) c.gPTrig     = 'off';
  if (c.gPFrom     === undefined) c.gPFrom     = 'mask';
  if (c.gPShape    === undefined) c.gPShape    = 'round';
  if (c.gPRegion   === undefined) c.gPRegion   = 'all';
  // one shared gain became a gain per side; the region segment still gates which sides
  // are live, so an old value simply lands on both and the look is unchanged.
  if (c.gPGainIn === undefined || c.gPGainOut === undefined){
    var _g = (c.gPGain !== undefined) ? c.gPGain : 0;
    c.gPGainIn = _g; c.gPGainOut = _g;
  }
  if (c.gPHead     === undefined) c.gPHead     = 0.9;
  if (c.gPCol      === undefined) c.gPCol      = '#a78bfa';
  if (c.gPReach    === undefined) c.gPReach    = 0.8;
  if (c.gPSpeed    === undefined) c.gPSpeed    = 12;
  if (c.gPWidth    === undefined) c.gPWidth    = 3;
  // THICKNESS UNIT CHANGE. It used to be counted in cells, so its real size moved whenever
  // `grid cell` was touched and the number meant nothing on its own. It is pixels now, and
  // anything saved before this converts exactly: old cells x that preset's own cell size.
  if (c.gPThick    === undefined) c.gPThick    = (c.gPWidth ?? 3) * (c.gCell ?? 29);
  if (c.gPFadeIn   === undefined) c.gPFadeIn   = 0;    // 0 / 1 reproduce the original decay
  if (c.gPFadeOut  === undefined) c.gPFadeOut  = 1;
  if (c.gPStart    === undefined) c.gPStart    = 0;
  if (c.gPAnchorX  === undefined) c.gPAnchorX  = 0.5;
  if (c.gPAnchorY  === undefined) c.gPAnchorY  = 0.5;
  if (c.gPAnchorOn === undefined) c.gPAnchorOn = true;
  if (c.gPBirth    === undefined) c.gPBirth    = 'center';
  if (c.gPRot      === undefined) c.gPRot      = 0;
  if (c.gPDilOn    === undefined) c.gPDilOn    = false;
  if (c.gPDilate   === undefined) c.gPDilate   = 0.5;
  if (c.gPGrow     === undefined) c.gPGrow     = 0.6;
  if (c.gPHue      === undefined) c.gPHue      = 0.8;
  if (c.gPLife     === undefined) c.gPLife     = 1.6;
  if (c.gPFirst    === undefined) c.gPFirst    = 1.2;
  if (c.gPAuto     === undefined) c.gPAuto     = 4.5;
  if (c.gPAutoStr  === undefined) c.gPAutoStr  = 0.7;
  if (c.gQOn       === undefined) c.gQOn       = false;
  if (c.gQSteps    === undefined) c.gQSteps    = 6;
  return c;
}
Object.values(COMP).forEach(fillDefaults);
// seed P from whichever comp is active at load (skip if baked — COOKED_PARAMS already has them)
if (!BAKED_PARAMS) Object.assign(P, COMP[P.comp] || COMP.A);
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

/* ---------- UI HOLD ------------------------------------------------------------------
   Keeps the page's own chrome (nav, hero copy, buttons) out of the opening until its cue.
   Works three ways so it survives the trip to Webflow, where this file has no markup of
   its own:
     1. writes --scalex-ui on <html>  -> host page CSS can read it
     2. writes --uiOp on <body>       -> this prototype's own demo markup reads it
     3. if window.SCALEX_UI_SELECTOR is set (string or array of selectors), applies opacity
        and pointer-events directly to those elements, so Webflow needs no CSS at all
   pointer-events is part of it deliberately: an invisible nav is still clickable, and a
   visitor clicking something they cannot see during the first seconds is a real bug. */
let _uiHoldLast = -1, _uiSelCache = null, _uiSelKey = '';
function markScalexReady(){
  if (document.documentElement) document.documentElement.classList.add('scalex-ready');
}
function applyUiHold(v){
  markScalexReady();
  v = Math.max(0, Math.min(1, v));
  if (Math.abs(v - _uiHoldLast) < 0.002) return;    // only touch the DOM when it changes
  _uiHoldLast = v;
  const txt = v.toFixed(3);
  if (document.documentElement) document.documentElement.style.setProperty('--scalex-ui', txt);
  if (document.body){
    document.body.style.setProperty('--uiOp', txt);
    document.body.classList.toggle('scalex-ui-held', v < 0.99);
  }
  const sel = (typeof window !== 'undefined') ? window.SCALEX_UI_SELECTOR : null;
  if (sel){
    const key = Array.isArray(sel) ? sel.join(',') : String(sel);
    if (key !== _uiSelKey){ _uiSelKey = key; _uiSelCache = null; }
    if (!_uiSelCache){
      try { _uiSelCache = Array.prototype.slice.call(document.querySelectorAll(key)); }
      catch (e) { _uiSelCache = []; }
    }
    for (let i = 0; i < _uiSelCache.length; i++){
      const el = _uiSelCache[i];
      el.style.opacity = txt;
      el.style.pointerEvents = (v < 0.99) ? 'none' : '';
    }
  }
}

// soft oval "blob" behind the hero copy — a DOM/UI element (survives bake), driven by P
function applyBlob(){
  let el = document.querySelector('.hero-blob');
  if (!el){
    // Webflow build: no markup for it, so mint one over the stage. Appended AFTER the
    // canvas so it paints on top of the grid and still sits under the site's own hero.
    const host = document.getElementById('stage');
    if (!host || !host.firstChild) return;
    el = document.createElement('div');
    el.className = 'hero-blob';
    host.appendChild(el);
  }
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
function destroy(){
  if (__stopped) return;
  __stopped = true;
  if (__rafId) cancelAnimationFrame(__rafId);
  if (__wakeTimer) clearTimeout(__wakeTimer);
  if (__heroObserver) __heroObserver.disconnect();
  if (__fallbackVisibility) window.removeEventListener('scroll', __fallbackVisibility);
  document.removeEventListener('visibilitychange', __visibilityChanged);
  if (__scrollTrigger) __scrollTrigger.kill();
  if (__rawScroll) window.removeEventListener('scroll', __rawScroll);
  window.removeEventListener('pointermove', onHeroPointerMove);
  window.removeEventListener('resize', onHeroResize);
  window.removeEventListener('orientationchange', onHeroOrientation);
  if (maskCacheRT) maskCacheRT.dispose();
  if (maskCacheMat) maskCacheMat.dispose();
  renderer.domElement.removeEventListener('webglcontextlost', onHeroContextLost);
  renderer.domElement.removeEventListener('webglcontextrestored', onHeroContextRestored);
  perf.state = 'destroyed';
  try {
    renderer.dispose();
    const el = renderer.domElement;
    if (!__sxOwnCanvas && el && el.parentNode) el.parentNode.removeChild(el);
    if (renderer.forceContextLoss) renderer.forceContextLoss();
  } catch (e) { /* teardown is best-effort: never throw at the handover */ }
  SX.mounted = false;   // mark THIS instance, not whatever currently holds window.SCALEX
}
const SX = { compA, compB, camera, P, rebuildStacks, quality: Q, mounted: true, destroy, performance: perf, invalidate: wakeRender };
window.SCALEX = SX;   // debug handles (cookString attached later)

/* ---------- post pipeline: dither pass + multi-octave glow (Deep-Glow-style) ---------- */
const rt    = new THREE.WebGLRenderTarget(2, 2);   // scene render
const auxRT = new THREE.WebGLRenderTarget(2, 2);   // intermediate full-res
const outRT = new THREE.WebGLRenderTarget(2, 2);   // fully-composited frame, fed to the grade pass
const gRT   = new THREE.WebGLRenderTarget(2, 2);   // grid layer, raw
const gRT2  = new THREE.WebGLRenderTarget(2, 2);   // grid layer, after its OWN post pass
const postScene = new THREE.Scene();
const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
postScene.add(quad);
// load the dither pass for one layer. keepA=1 preserves coverage so the layer can be
// composited afterwards instead of being flattened onto black.
function setDither(mode, px, levels, dot, keepA){
  ditherMat.uniforms.uAmt.value = (mode && mode !== 'off') ? 1 : 0;
  ditherMat.uniforms.uMode.value = mode === 'bayer' ? 0 : 1;
  ditherMat.uniforms.uPx.value = px * DPR;
  ditherMat.uniforms.uLevels.value = levels;
  ditherMat.uniforms.uDot.value = dot;
  ditherMat.uniforms.uKeepA.value = keepA;
}

function blit(mat, target){
  perf.passes++;
  quad.material = mat;
  renderer.setRenderTarget(target);
  renderer.render(postScene, postCam);
}

const VERT = `void main(){ gl_Position = vec4(position.xy, 0., 1.); }`;

// premultiplied OVER: composites two independently post-processed layers
const overMat = new THREE.ShaderMaterial({
  uniforms: { tUnder:{value:null}, tOver:{value:null}, uRes:{value:new THREE.Vector2(2,2)} },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tUnder, tOver; uniform vec2 uRes;
    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      vec4 u = texture2D(tUnder, uv);
      vec4 o = texture2D(tOver, uv);
      // o.rgb is already premultiplied (the stack is rendered onto a transparent clear),
      // so this is the plain OVER operator and reproduces drawing straight onto the grid.
      gl_FragColor = vec4(u.rgb * (1.0 - o.a) + o.rgb, 1.0);
    }`
});

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
/* ---------- grid intro ease: one curve, three consumers ----------------------------------
   The tiles ease in the fragment shader, the field travel and the pattern expansion ease in
   JS. Before this they each ran their own copy of the pow formula, which was fine while
   there was only one formula. With a hand-drawn curve in play they have to agree exactly or
   the graph on screen is a lie, so everything goes through gridEase() and the shader reads a
   table built from that same function.                                                    */
const CURVES = { grid:null, mask:null };   // filled once the panel is built, below
const EASE_N = 256;
const easeData = new Uint8Array(EASE_N * 4);
const easeTex = new THREE.DataTexture(easeData, EASE_N, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
easeTex.minFilter = THREE.LinearFilter;
easeTex.magFilter = THREE.LinearFilter;
easeTex.wrapS = THREE.ClampToEdgeWrapping;
easeTex.wrapT = THREE.ClampToEdgeWrapping;
easeTex.generateMipmaps = false;
easeTex.needsUpdate = true;
// CSS cubic-bezier: P0 (0,0), P3 (1,1), solve x(t) = x for t, return y(t).
function bezSolve(x, x1, x2){
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  let t = x;
  for (let i = 0; i < 8; i++){                       // Newton, which converges for sane handles
    const f = ((ax * t + bx) * t + cx) * t - x;
    if (Math.abs(f) < 1e-6) return t;
    const d = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(d) < 1e-6) break;
    t -= f / d;
  }
  let lo = 0, hi = 1; t = x;                          // bisection fallback for the pathological ones
  for (let i = 0; i < 24; i++){
    const v = ((ax * t + bx) * t + cx) * t;
    if (Math.abs(v - x) < 1e-6) break;
    if (v > x) hi = t; else lo = t;
    t = (lo + hi) * 0.5;
  }
  return t;
}
function bezY(x, x1, y1, x2, y2){
  const t = bezSolve(Math.min(1, Math.max(0, x)), x1, x2);
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  return ((ay * t + by) * t + cy) * t;
}
// The one authority on the grid intro ease. p and the result are both 0..1, except that a
// CURVE with handles above 1 deliberately overshoots, which is the whole point of having it.
function gridEase(p){
  p = Math.min(1, Math.max(0, p));
  if (P.gEaseMode === 'curve') return bezY(p, P.gC1x, P.gC1y, P.gC2x, P.gC2y);
  const a = Math.pow(p, Math.max(0.1, P.gEaseIn));
  const b = Math.pow(1 - p, Math.max(0.1, P.gEaseOut));
  return (a / (a + b + 1e-6)) || 0;
}
// THE BIG X. Its own clock (gRevealDelay / gRevealDur), its own shape. POWER is the
// smoothstep this file has always used, with gRevealEase biasing the input; CURVE is a
// bezier. Nothing here touches the shader: rvE is consumed on the CPU to set uMaskOp,
// uXSize, uXRot and the mask's entry travel, so the mask curve costs no fragment work.
function maskEase(p){
  p = Math.min(1, Math.max(0, p));
  if (P.gMEaseMode === 'curve') return bezY(p, P.gMC1x, P.gMC1y, P.gMC2x, P.gMC2y);
  const q = Math.pow(p, 1 / Math.max(0.1, P.gRevealEase));
  return q * q * (3 - 2 * q);
}
// Rebuild the table the shader reads. Called on any curve change, never per frame. The
// encode range tracks the curve's own min/max, so an overshoot to 1.4 still gets the full
// 256 levels instead of being clipped or squeezed into a fixed -0.5..1.5 window.
function rebuildEaseLUT(){
  const ys = new Array(EASE_N);
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < EASE_N; i++){
    const y = gridEase(i / (EASE_N - 1));
    ys[i] = y; if (y < lo) lo = y; if (y > hi) hi = y;
  }
  if (!isFinite(lo) || !isFinite(hi)) { lo = 0; hi = 1; }
  const span = (hi - lo) > 1e-6 ? (hi - lo) : 1;
  for (let i = 0; i < EASE_N; i++){
    const v = Math.round(((ys[i] - lo) / span) * 255);
    const k = i * 4;
    easeData[k] = easeData[k+1] = easeData[k+2] = Math.min(255, Math.max(0, v));
    easeData[k+3] = 255;
  }
  easeTex.needsUpdate = true;
  gridMat.uniforms.tEase.value = easeTex;
  gridMat.uniforms.uEaseLo.value = lo;
  gridMat.uniforms.uEaseScale.value = span;
  gridMat.uniforms.uEaseOn.value = (P.gEaseMode === 'curve') ? 1 : 0;
  if (CURVES.grid) CURVES.grid.draw();
}

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

/* ---------- ribbon tile: a second front shape, drawn the same way as the X glyph -------
   A banner with swallowtail ends: both long edges sag toward the centre and each end is
   notched inward. Fitted into the same central 70% as the X so the r / 0.35 convention in
   glyphCov carries over unchanged and the two shapes share their sizing maths.          */
const ribCanvas = document.createElement('canvas');
ribCanvas.width = ribCanvas.height = 128;
(() => {
  const RIB_W = 200, RIB_H = 90;                // design space, 2.22 : 1
  const RIB = [[0,0], [100,26], [200,0], [164,45], [200,90], [100,64], [0,90], [36,45]];
  const ctx = ribCanvas.getContext('2d');
  const k = (128 * 0.70) / Math.max(RIB_W, RIB_H);
  const offX = (128 - RIB_W * k) / 2, offY = (128 - RIB_H * k) / 2;
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#ffffff';
  ctx.save();
  ctx.translate(offX, offY); ctx.scale(k, k);
  ctx.beginPath();
  RIB.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
  ctx.closePath(); ctx.fill();
  ctx.restore();
})();
const ribTex = new THREE.CanvasTexture(ribCanvas);
ribTex.minFilter = THREE.LinearFilter;
ribTex.magFilter = THREE.LinearFilter;
ribTex.wrapS = THREE.ClampToEdgeWrapping;
ribTex.wrapT = THREE.ClampToEdgeWrapping;
ribTex.generateMipmaps = false;

// Cache the unchanged glyph blur, not its moving screen position. The original
// shader remains available for minification and nonlinear override effects.
let maskCacheRT = null, maskCacheMat = null, maskCacheKey = '';
function updateMaskCache(){
  const U = gridMat.uniforms;
  const feather = Math.max(0, U.uXFeather.value);
  const size = U.uMaskR.value * 2 * U.uXSize.value;
  const expansion = (P.gExpandOn ? P.gExpandFrom + (1 - P.gExpandFrom) * U.uExpand.value : 1) * U.uMoveS.value;
  const safe = P.comp === 'C' && P.gMaskShape === 'x' && feather <= 0.25 &&
    size * Math.max(0.05, expansion) > 256 * Math.pow(2, feather * 5) &&
    !P.gWaveOn && !P.gPushOn && !P.gPDilOn && P.gSphere === 0 && Math.abs(P.gScaleM) <= 0.01;
  U.uMaskCacheOn.value = safe ? 1 : 0;
  if (!safe) return;
  const pad = feather * 0.13 + 0.01;
  const key = String(feather);
  if (!maskCacheRT){
    maskCacheRT = new THREE.WebGLRenderTarget(1024, 1024, {
      minFilter:THREE.LinearFilter, magFilter:THREE.LinearFilter,
      depthBuffer:false, stencilBuffer:false, generateMipmaps:false
    });
    maskCacheMat = new THREE.ShaderMaterial({
      uniforms:{ tX:{value:xTileFlat}, uFeather:{value:feather}, uPad:{value:pad} },
      vertexShader:VERT,
      fragmentShader:`
        uniform sampler2D tX;
        uniform float uFeather, uPad;
        void main(){
          vec2 uv = (gl_FragCoord.xy / 1024.0) * (1.0 + 2.0 * uPad) - uPad;
          float o = uFeather * 0.13;
          float g = 0.0; float wsum = 0.0;
          for (int i = -2; i <= 2; i++){
            for (int j = -2; j <= 2; j++){
              vec2 suv = uv + vec2(float(i), float(j)) * o * 0.5;
              float w = 1.0 - 0.16 * float(abs(i) + abs(j));
              float s = 0.0;
              if (suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0) s = texture2D(tX, suv).r;
              g += s * w; wsum += w;
            }
          }
          g /= wsum;
          float lo = 0.5 - min(0.49, 0.45 + uFeather * 0.5);
          g = smoothstep(lo, 0.55, g);
          gl_FragColor = vec4(g, g, g, 1.0);
        }`
    });
  }
  if (key !== maskCacheKey){
    maskCacheMat.uniforms.uFeather.value = feather;
    maskCacheMat.uniforms.uPad.value = pad;
    blit(maskCacheMat, maskCacheRT);
    maskCacheKey = key;
    perf.maskBuilds++;
  }
  U.tMaskCache.value = maskCacheRT.texture;
  U.uMaskCachePad.value = pad;
}

const gridMat = new THREE.ShaderMaterial({
  uniforms: {
    tX:      { value: xTileTex },
    tMaskCache: { value: null },
    uMaskCacheOn: { value: 0 },
    uMaskCachePad: { value: 0 },
    tXflat:  { value: xTileFlat },
    tRib:    { value: ribTex },
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
    uGridOpIn: { value: 1 },         // grid opacity INSIDE the mask
    uGridOpOut:{ value: 1 },         // grid opacity OUTSIDE the mask
    uWaveOn: { value: 0 },           // ripple wave toggle
    uWaveAmp:{ value: 8 },           // wave amplitude in device px (fed as P.gWaveAmp * DPR)
    uWaveFreq:{ value: 1.6 },        // wave spatial frequency
    uWaveSpeed:{ value: 1 },         // wave travel speed
    uWaveCursor:{ value: 1 },        // 1 = rings radiate from cursor, 0 = diagonal sweep
    uPushOn: { value: 0 },           // cursor push/repel toggle
    uPushAmt:{ value: 30 },          // push distance in device px (fed as P.gPushAmt * DPR)
    uGScaleM:{ value: 0 },           // local magnify around cursor
    uGSphere:{ value: 0 },           // fisheye bulge/pinch around cursor
    uBright: { value: 1.5 },         // brightness boost inside mask
    uScale:  { value: 0.5 },         // tile scale-up inside mask (0..1 extra)
    uVig:    { value: 0.6 },         // vignette strength (0 none .. 1 strong)
    uVigR:   { value: 0.9 },         // vignette radius (fraction of half-diagonal)
    uIntro:  { value: 1 },           // intro progress 0..1
    uIntroDir:{ value: 0 },          // stagger axis: 0 center-out, 1 edges-in, 2 down, 3 up, 4 left, 5 right
    uGEaseIn:{ value: 2 },           // grid intro ease-in power
    uGEaseOut:{ value: 2 },          // grid intro ease-out power
    // --- INTRO / SLIDE: the travel half of the entrance, ported from the stack's ENTRY set.
    // Three independent subjects, because they read as three different ideas:
    //   FIELD  the whole lattice arrives as one rigid sheet (global, no stagger)
    //   TILE   each tile settles from its own pose, START->END across the stagger axis
    //   MASK   the X itself travels in, on the mask's own reveal clock
    // All zero by default, and uSlideOn 0 skips the entire path, so POP is untouched.
    tEase:   { value: easeTex },     // 256x1 ease LUT, built in JS from the active curve
    uEaseOn: { value: 0 },           // 0 = POWER (the pow path below), 1 = sample the LUT
    uEaseLo: { value: 0 },           // LUT decode: y = lo + texel * scale. Range adapts to
    uEaseScale:{ value: 1 },         // the curve, so an overshoot keeps full 8-bit precision
    uSlideOn:{ value: 0 },           // 0 = POP (legacy), 1 = SLIDE
    uGStagger:{ value: 0.5 },        // spread of the per-tile windows across the timeline
    uGTrail: { value: 0 },           // flat delay holding every tile behind the leading one
    uFieldOff:{ value: new THREE.Vector2(0, 0) },   // px, already scaled by remaining travel
    uMaskOff: { value: new THREE.Vector2(0, 0) },   // px, already scaled by remaining travel
    uTileOffA:{ value: new THREE.Vector2(0, 0) },   // px at entry, first tile in
    uTileOffB:{ value: new THREE.Vector2(0, 0) },   // px at entry, last tile in
    uTileSpinA:{ value: 0 },         // radians at entry, first tile in
    uTileSpinB:{ value: 0 },         // radians at entry, last tile in
    uTileScaleA:{ value: 0.4 },      // scale at entry, first tile in (0.4 = the legacy pop)
    uTileScaleB:{ value: 0.4 },      // scale at entry, last tile in
    uTileFadeA:{ value: 0 },         // opacity at entry, first tile in (0 = legacy fade-up)
    uTileFadeB:{ value: 0 },         // opacity at entry, last tile in
    uExpandOn:{ value: 1 },          // intro expansion toggle
    uExpand: { value: 1 },           // expansion progress 0..1 (eased)
    uExpandFrom:{ value: 0.35 },     // pattern start scale (grows to 1)
    uMoveS:  { value: 1 },           // INTRO MOVE: extra sheet scale (SCALE UP / SCALE DOWN)
    // ---- TEASE: a travelling light SWEEP and a broad light LEAK, used before the main
    // intro to show the field and then the X without committing to the entrance yet ----
    uSwpGain:{ value: 0 },           // 0 = off; envelope is driven CPU-side
    uSwpPos: { value: 0 },           // band centre, 0..1 across the sweep axis
    uSwpAng: { value: 0 },           // sweep travel direction, radians
    uSwpWide:{ value: 0.18 },        // band half-width in screen fractions
    uSwpSoft:{ value: 1 },           // multiplier on the feather (kept for older presets)
    uSwpFeath:{ value: 0.12 },       // feather distance BEYOND the solid core
    uSwpRegion:{ value: 0 },         // 0 all, 1 inside mask only, 2 outside mask only
    uSwpReveal:{ value: 0 },         // 1 = the sweep GATES the grid (grid shows only in the band)
    uSwpShape:{ value: 0 },          // 0 linear, 1 radial, 2 diamond, 3 X/star
    uSwpBias: { value: 0 },          // -1 hard leading edge .. +1 hard trailing edge
    uSwpDiam:{ value: 1.6 },         // diamond aspect
    uSwpCol: { value: new THREE.Vector3(1,1,1) },
    uSwpColMix:{ value: 0 },         // how far the band pushes tiles toward the sweep colour
    uRevOn:   { value: 0 },          // 1 = the radial reveal is armed
    uHoldDark:{ value: 0 },          // 1 = entrance is held by the tease: dark unless revealed
    uRestPose:{ value: 0 },          // 1 = draw tiles in their RESTING pose (teaser only)
    uOpenOn:  { value: 0 },          // 1 = the opening sequence still governs visibility
    uRevMask: { value: 1 },          // 0..1 radial reveal growing out of the mask anchor
    uRevSoft: { value: 0.35 },       // softness of that reveal's edge (vignette feel)
    uBlackout:{ value: 0 },          // 1 = hold the whole grid dark (opening beat)
    uBurnScale:{ value: 2.6 },       // film-burn noise frequency
    uBurnAmt: { value: 0.45 },       // how far the boundary is chewed about
    uBurnRim: { value: 0.12 },       // thickness of the hot rim
    uBurnFlick:{ value: 0.35 },      // flicker depth
    uMaskVis: { value: 1 },          // mask reveal progress: the X itself counts as visible
    uLeakGain:{ value: 0 },          // broad wash strength (0 = off)
    uLeakPos:{ value: 0.5 },
    uLeakAng:{ value: 0 },
    uLeakWide:{ value: 0.8 },
    uXRot:   { value: 0 },           // X-mask intro rotation (radians)
    uRot:    { value: 0 },           // static tile rotation (radians)
    uMRot:   { value: 0 },           // extra tile rotation inside the mask (radians)
    uGap:    { value: 0 },           // spacing: shrinks glyph within its cell (0..0.8)
    uTileSc: { value: 1 },           // base glyph scale within cell
    // grid colour: two-stop ramp across the viewport (the mode-C analogue of the
    // "element gradient" that colours the blend stacks in FIELD / MONOLITH).
    // Defaults are both stops = #6b6cff at gain 1, i.e. the previous flat tint exactly.
    uGradA:  { value: new THREE.Vector3(107/255, 108/255, 1.0) },   // #6b6cff
    uGradB:  { value: new THREE.Vector3(107/255, 108/255, 1.0) },   // #6b6cff
    uGradAngle:{ value: 0 },         // ramp direction (radians)
    uGradGain: { value: 1 },         // colour brightness multiplier (pushes past 1 for bloom)
    uGradOn:  { value: 1 },          // 0 = flat colour A, 1 = A -> B ramp
    /* ---- AMPLIFY: expanding fronts of gain ("ScaleX multiplies") ----
       Each slot is vec4(originX 0..1, originY 0..1, startTime, strength). Origins are
       normalised so a resize or DPR change never teleports a live pulse. Gain from every
       live slot SUMS: where two fronts cross, the tiles hit harder than either alone —
       that accumulation is the whole metaphor. A dead slot carries strength 0. */
    uPulse:  { value: [new THREE.Vector4(0,0,-1e6,0), new THREE.Vector4(0,0,-1e6,0),
                       new THREE.Vector4(0,0,-1e6,0), new THREE.Vector4(0,0,-1e6,0)] },
    uPSpeed: { value: 12 },          // front travel speed, cells per second
    uPWidth: { value: 3 },           // LEGACY thickness in cells; kept only so old presets migrate
    uPThick: { value: 87 },          // front thickness in device px (3 cells x the old 29px default)
    uPFadeIn:{ value: 0 },           // attack, as a fraction of the pulse life. 0 = full at birth
    uPFadeOut:{ value: 1 },          // release, same units. 1 = decays across the whole life
    uPGainIn: { value: 0 },          // strength inside the X (0 = feature off there)
    uPGainOut:{ value: 0 },          // strength in the dim field outside it
    uPFeathO:{ value: 1 },           // pulse OUTER (leading) edge softness, 1 = legacy
    uPFeathI:{ value: 1 },           // pulse INNER (trailing) edge softness, 1 = legacy
    uPHead:  { value: 0.9 },         // ceiling on the brightness the pulse may ADD
    uPCol:   { value: new THREE.Vector3(167/255, 139/255, 250/255) },  // #a78bfa
    uPGrow:  { value: 0.6 },         // how much tiles swell inside the front
    uPHue:   { value: 0.8 },         // pull toward the pulse colour
    uPLife:  { value: 1.6 },         // seconds before a pulse dies
    uPShape: { value: 0 },           // 0 = round, 1 = analytic star, 2 = the mask's logo X
    uScrollY:{ value: 0 },           // scroll slide in device px (positive reads as up)
    uPStart: { value: 0 },
    uPBirth: { value: 0 },           // 0 = born at the origin, 1 = born on the mask outline
    uPRot:   { value: 0 },           // front rotation, radians. Carries the mask's own angle
                                     // plus the pulse's offset, so X EDGE stays congruent           // radius the front is BORN at, in mask extents (1 = its edge)
    uPDiamond:{ value: 1.85 },       // diamond front aspect, width : height
    uPDilate:{ value: 0 },           // grid magnification where the front passes (0 = off)
    uPReach: { value: 0.8 },         // how far the front lifts the dim field toward mask brightness
    uQOn:    { value: 0 },           // quantize the gain to doubling steps
    uQSteps: { value: 6 },           // gain levels per unit (higher = finer steps)
    uTime:   { value: 0 }
  },
  vertexShader: VERT,
  fragmentShader: `
    uniform sampler2D tX;
    uniform sampler2D tMaskCache;
    uniform float uMaskCacheOn, uMaskCachePad;
    uniform sampler2D tXflat;
    uniform sampler2D tRib;
    uniform vec2 uRes, uMouse;
    uniform float uCell, uBase, uMaskR, uMaskShape, uXSize, uXFeather, uMaskOp, uGPar, uGScaleM, uGSphere, uBright, uScale, uVig, uVigR, uIntro, uIntroDir, uGEaseIn, uGEaseOut, uExpandOn, uExpand, uExpandFrom, uMoveS, uSwpGain, uSwpPos, uSwpAng, uSwpWide, uSwpSoft, uSwpFeath, uSwpRegion, uSwpReveal, uSwpShape, uBurnScale, uBurnAmt, uBurnRim, uBurnFlick, uSwpBias, uSwpDiam, uSwpColMix, uRevOn, uHoldDark, uRestPose, uOpenOn, uRevMask, uRevSoft, uBlackout, uMaskVis, uLeakGain, uLeakPos, uLeakAng, uLeakWide, uXRot, uRot, uMRot, uGap, uTileSc, uTime, uGridOpIn, uGridOpOut, uWaveOn, uWaveAmp, uWaveFreq, uWaveSpeed, uWaveCursor, uPushOn, uPushAmt;
    uniform vec2 uMouseN, uMouseLag;
    uniform sampler2D tEase;
    uniform float uEaseOn, uEaseLo, uEaseScale;
    uniform vec2 uFieldOff, uMaskOff, uTileOffA, uTileOffB;
    uniform float uSlideOn, uGStagger, uGTrail, uTileSpinA, uTileSpinB, uTileScaleA, uTileScaleB, uTileFadeA, uTileFadeB;
    uniform float uGradAngle, uGradGain, uGradOn;
    uniform vec3 uGradA, uGradB, uSwpCol;
    uniform vec4 uPulse[4];
    uniform float uScrollY, uPSpeed, uPWidth, uPThick, uPFadeIn, uPFadeOut, uPGainIn, uPGainOut, uPFeathO, uPFeathI, uPHead, uPGrow, uPHue, uPLife, uPShape, uPStart, uPBirth, uPRot, uPDiamond, uPDilate, uPReach, uQOn, uQSteps;
    uniform vec3 uPCol;

    // --- value noise, just enough for an organic edge. Cheap on purpose: this runs per
    // pixel alongside everything else in this shader. ---
    float bHash(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
    float bNoise(vec2 q){
      vec2 i = floor(q), f = fract(q);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(bHash(i), bHash(i + vec2(1,0)), f.x),
                 mix(bHash(i + vec2(0,1)), bHash(i + vec2(1,1)), f.x), f.y);
    }
    float bFbm(vec2 q){
      return bNoise(q) * 0.55 + bNoise(q * 2.03) * 0.28 + bNoise(q * 4.11) * 0.17;
    }

    float maskAt(vec2 p){
      // uMaskOff travels the mask on its OWN reveal clock, so the X can arrive from a
      // direction while the lattice arrives from another. Zero at rest and in POP mode.
      vec2 d = p - uMouse - uMaskOff;
      // single assign-then-return. Early returns inside nested conditionals make ANGLE's
      // HLSL translator emit a "potentially uninitialized" temp, which is a real hazard on
      // some D3D drivers, so every branch writes res and the function returns once.
      float res = 0.0;
      if (uMaskShape > 1.5){
        // FILM BURN: an irregular hole eating outward, with a hot rim at the boundary and
        // a slow flicker on top. The boundary is a circle pushed around by fbm, so the edge
        // crawls instead of being a clean arc; the rim is what reads as the burn itself.
        float rad = max(1.0, uMaskR);
        float dn = length(d) / rad;
        vec2 nq = d / rad * max(0.2, uBurnScale) + vec2(uTime * 0.05, uTime * 0.037);
        float n = bFbm(nq) - 0.5;
        float edge = 1.0 + n * uBurnAmt;                            // warped boundary
        float inside = 1.0 - smoothstep(edge - 0.12, edge + 0.06, dn);
        float rimD = (dn - edge) / max(0.02, uBurnRim);
        float rim = exp(-rimD * rimD);                              // hot ring on the boundary
        float flick = 1.0 - uBurnFlick * (0.5 - bNoise(vec2(uTime * 6.0, 3.7)));
        res = clamp((inside * 0.55 + rim * 1.25) * flick, 0.0, 1.0);
      } else if (uMaskShape < 0.5){
        res = 1.0 - smoothstep(0.0, uMaskR, length(d));             // round
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
        float g;
        if (uMaskCacheOn > 0.5){
          vec2 cuv = (uv + uMaskCachePad) / (1.0 + 2.0 * uMaskCachePad);
          g = texture2D(tMaskCache, clamp(cuv, 0.0, 1.0)).r;
        } else {
        g = 0.0; float wsum = 0.0;
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

        }
        // radial fade at the mask extent (also widens slightly with feather)
        float fade = 1.0 - smoothstep(0.5 - 0.1 * f, 1.0 + 0.3 * f, length(d) / (uMaskR * uXSize));
        res = g * fade;
      }
      return res;
    }

    // Coverage of the SAME logo-X glyph the mask uses, centred on p and scaled so the
    // glyph's tips sit at radius r. The mask's uv convention puts the texture edge at
    // scl/2 and the glyph occupies the central 70%, so its tips land at 0.35 * scl:
    // scl = r / 0.35. Sampling tXflat (no mipmaps) keeps this safe inside a loop, where
    // texture derivatives are undefined.
    float glyphCov(vec2 p, float r, float fw){
      float scl = max(1.0, r) / 0.35;
      vec2 uv = p / scl + 0.5;
      if (uv.x <= 0.0 || uv.x >= 1.0 || uv.y <= 0.0 || uv.y >= 1.0) return 0.0;
      // fw scales the alpha window: 1.0 -> smoothstep(0.35,0.65), the original constants
      float h = clamp(0.15 * fw, 0.003, 0.49);
      return smoothstep(0.5 - h, 0.5 + h, texture2D(tXflat, uv).r);
    }

    // Radius metric for the cheap fronts. The logo front has no analytic radius (it is a
    // texture lookup), so it falls back to a plain circle wherever a scalar is needed.
    float frontMetric(vec2 pd){
      // the two texture-based fronts have no analytic radius; the warp uses a plain circle
      if (uPShape > 3.5) return sqrt(dot(pd, pd) + 1e-4);
      if (uPShape > 2.5){
        // DIAMOND: |x| + |y| * aspect. Contours are rhombi with their vertices on the
        // axes, wide and low like an isometric plane.
        return abs(pd.x) + abs(pd.y) * uPDiamond;
      }
      float L2 = dot(pd, pd) + 1e-4;
      if (uPShape > 1.5) return sqrt(L2);
      // STAR: the wave runs faster along the diagonals, so the contour is a four-armed
      // star. star = |sin 2theta|, written without atan as 2|xy| / (x^2 + y^2).
      float star  = 2.0 * abs(pd.x * pd.y) / L2;
      float aniso = mix(1.0, 0.55 + 0.45 * star, clamp(uPShape, 0.0, 1.0));
      return sqrt(L2) / max(0.2, aniso);
    }

    // How far a live front has travelled, shared by the warp and the shading pass so the
    // two never disagree about where the wave is.
    float frontRadius(float age){
      // mExtent is the mask's own edge in front-radius units. For the ROUND mask that is
      // just uMaskR. For the X it is 0.70 * uMaskR * uXSize, which is not an approximation:
      // maskAt draws the glyph across uMaskR * 2 * uXSize pixels, glyphCov draws it across
      // r / 0.35, and setting those equal gives r = 0.70 * uMaskR * uXSize. So a LOGO front
      // at exactly this radius is congruent with the mask outline, pixel for pixel.
      float mExtent = (uMaskShape < 0.5) ? uMaskR : (0.70 * uMaskR * uXSize);
      // BIRTH. CENTER leaves the start where the front start slider puts it (0 = a point at
      // origin, today's default). X EDGE locks it to mExtent, so the wave is shed BY the
      // mask instead of passing out through it, and it stays locked when the mask is
      // resized or the X rescaled rather than needing the slider retuned.
      float r0 = (uPBirth > 0.5) ? mExtent : (uPStart * mExtent);
      return r0 + age * uPSpeed * uCell;
    }

    // Pulse envelope over its own lifetime. u is the normalised age.
    //   attack  ramps 0 -> 1 across the first uPFadeIn of the life
    //   release ramps 1 -> 0 across the last  uPFadeOut of the life
    // The caller still squares the result, which is what makes 0 / 1 reproduce the original
    // (1 - u)^2 decay exactly: attack 1, release (1 - u), squared.
    float pulseEnv(float u){
      float atk = (uPFadeIn  <= 0.0001) ? 1.0 : clamp(u / uPFadeIn, 0.0, 1.0);
      float rel = (uPFadeOut <= 0.0001) ? 1.0 : clamp((1.0 - u) / uPFadeOut, 0.0, 1.0);
      return atk * rel;
    }

    // Per-PIXEL front influence, used only to warp the sampling coordinate before the grid
    // lattice is derived (the shading pass samples per TILE, which does not exist yet here).
    // Also reports the origin AND the current radius of the strongest contributor, because
    // the dilation has to scale around the front line itself, not around the origin: at a
    // radius of 170px, scaling about the origin mostly DRAGS the lattice inward, and only
    // the derivative of that map magnifies anything.
    float pulseInfluence(vec2 p, out vec2 org, out float fr){
      float g = 0.0, best = 0.0;
      org = p; fr = 0.0;
      for (int i = 0; i < 4; i++){
        vec4 pl = uPulse[i];
        if (pl.w <= 0.0) continue;
        float age = uTime - pl.z;
        if (age < 0.0 || age > uPLife) continue;
        vec2 o = pl.xy * uRes;
        float f = frontRadius(age);
        vec2 wd = p - o;
        if (uPRot > 0.0001 || uPRot < -0.0001){
          float pc = cos(uPRot), ps = sin(uPRot);
          wd = mat2(pc, -ps, ps, pc) * wd;
        }
        float band = 1.0 - smoothstep(0.0, max(1.0, uPThick), abs(frontMetric(wd) - f));
        float life = pulseEnv(age / max(0.05, uPLife));
        float c = band * life * life * pl.w;
        if (c > best){ best = c; org = o; fr = f; }
        g += c;
      }
      return g;
    }

    // ---- INTRO SCHEDULING ------------------------------------------------------------
    // metricAt: WHEN a tile goes, as 0 (first in) .. 1 (last in). It is also the axis the
    // START -> END entry poses interpolate along, exactly as the stack's t runs 0..1 across
    // its layers. gl_FragCoord.y counts UP from the bottom, so the y cases read inverted
    // against screen intuition; the labels in the panel are set from a measured render.
    float metricAt(vec2 cc){
      // single exit, for the same X4000 reason as introP below
      float r = length(cc - uRes * 0.5) / (length(uRes) * 0.5);
      float m = r;                                                                  // 0 center-out
      if      (uIntroDir > 0.5 && uIntroDir < 1.5) m = 1.0 - r;                      // 1 edges-in
      else if (uIntroDir > 1.5 && uIntroDir < 2.5) m = cc.y / uRes.y;                // 2 from bottom
      else if (uIntroDir > 2.5 && uIntroDir < 3.5) m = 1.0 - cc.y / uRes.y;          // 3 from top
      else if (uIntroDir > 3.5 && uIntroDir < 4.5) m = cc.x / uRes.x;                // 4 from left
      else if (uIntroDir > 4.5 && uIntroDir < 5.5) m = 1.0 - cc.x / uRes.x;          // 5 from right
      // Diagonals. Named for where the wave TRAVELS, matching the six above: an arrow
      // pointing up-right reveals from the bottom-left corner first.
      else if (uIntroDir > 5.5 && uIntroDir < 6.5) m = (cc.x / uRes.x + cc.y / uRes.y) * 0.5;              // 6 travel up-right
      else if (uIntroDir > 6.5 && uIntroDir < 7.5) m = 1.0 - (cc.x / uRes.x + cc.y / uRes.y) * 0.5;        // 7 travel down-left
      else if (uIntroDir > 7.5 && uIntroDir < 8.5) m = (1.0 - cc.x / uRes.x + cc.y / uRes.y) * 0.5;        // 8 travel up-left
      else if (uIntroDir > 8.5)                    m = 1.0 - (1.0 - cc.x / uRes.x + cc.y / uRes.y) * 0.5;  // 9 travel down-right
      return m;
    }
    // introP: that tile's own eased 0..1. uGStagger spreads the windows across the
    // timeline (0.5 = the legacy hardcoded span), uGTrail holds every tile behind the
    // leading one by a flat amount, matching the stack's "trail delay".
    float introP(float metric){
      float span = max(0.02, 1.0 - uGStagger);
      float off  = metric * (1.0 - span) + (metric > 1e-4 ? uGTrail : 0.0);
      float p = clamp((uIntro - off) / span, 0.0, 1.0);
      // CURVE mode: one fetch instead of a Newton solve. introP runs up to three times per
      // fragment inside the slide fixed point, so the bezier is inverted once in JS into a
      // 256-wide table rather than per pixel. Half-texel offset so p 0..1 lands on centres.
      //
      // The table is sampled UNCONDITIONALLY and the result selected after. Returning early
      // out of a branch that also holds the texture read is what ANGLE's HLSL backend cannot
      // prove initialised (warning X4000), and sampling inside divergent flow is poor form
      // anyway since the gradient is undefined there. One exit, one assignment, no fetch
      // under a condition. The table is 256x1 with no mips, so the extra read is a cache hit.
      float lut = uEaseLo + texture2D(tEase, vec2((p * 255.0 + 0.5) / 256.0, 0.5)).r * uEaseScale;
      float a = pow(p, uGEaseIn);
      float b = pow(1.0 - p, uGEaseOut);
      float res = a / (a + b + 1e-6);
      if (uEaseOn > 0.5) res = lut;
      return res;
    }

    // Same convention as glyphCov, against the ribbon tile.
    float ribbonCov(vec2 p, float r, float fw){
      float scl = max(1.0, r) / 0.35;
      vec2 uv = p / scl + 0.5;
      if (uv.x <= 0.0 || uv.x >= 1.0 || uv.y <= 0.0 || uv.y >= 1.0) return 0.0;
      float h = clamp(0.15 * fw, 0.003, 0.49);
      return smoothstep(0.5 - h, 0.5 + h, texture2D(tRib, uv).r);
    }

    void main(){
      vec2 frag = gl_FragCoord.xy;
      vec2 ctrScreen = uRes * 0.5;

      // ---- intro EXPANSION: the whole pattern scales outward from the screen center
      //      (matches the X concept: scale / expansion) ----
      // expansion and the INTRO MOVE's scale share one warp: both are a sheet scale about
      // the centre, so multiplying them keeps a single sampling transform.
      float ez = (uExpandOn > 0.5) ? mix(uExpandFrom, 1.0, uExpand) : 1.0;
      ez *= uMoveS;
      if (ez < 0.999 || ez > 1.001){
        frag = ctrScreen + (frag - ctrScreen) / max(0.05, ez);
      }

      // ---- SCROLL SLIDE: the whole field, grid and mask together, translates with the
      // page. Sampling from lower y shows what was below, so the pattern reads as moving
      // UP for a positive value. Applied here, before every other warp, so the mask rides
      // with the lattice instead of the two shearing apart.
      frag.y -= uScrollY;

      // ---- mouse interaction: warp the sampling coordinate ----
      // parallax: whole grid drifts opposite the cursor for a depth feel
      frag -= uMouseN * uGPar * uCell;
      // WAVE: travelling ripple. Rings radiate out from the cursor (uWaveCursor = 1) or
      // sweep diagonally across the whole field (0). Displaces the sampling coordinate,
      // so tiles appear to undulate without changing the grid pitch.
      if (uWaveOn > 0.5 && uWaveAmp > 0.001){
        float ph = uTime * uWaveSpeed * 2.2;
        vec2 wd;
        if (uWaveCursor > 0.5){
          vec2 rv = frag - uMouseLag;
          float rl = max(1.0, length(rv));
          float ring = sin(rl / uCell * uWaveFreq - ph);
          float fall = exp(-rl / (uMaskR * 2.2));      // ripple decays away from cursor
          wd = (rv / rl) * ring * fall;
        } else {
          vec2 dir = normalize(vec2(0.85, 0.53));
          float sweep = sin(dot(frag / uCell, dir) * uWaveFreq - ph);
          wd = vec2(-dir.y, dir.x) * sweep;            // transverse displacement
        }
        frag += wd * uWaveAmp;
      }

      // PUSH: tiles shove away from (or get pulled toward) the cursor, strongest at the
      // centre of the influence falloff and easing to nothing at its edge.
      if (uPushOn > 0.5 && abs(uPushAmt) > 0.001){
        vec2 pv = frag - uMouseLag;
        float pl = max(1.0, length(pv));
        float pf = exp(-pl / (uMaskR * 0.9));
        frag -= (pv / pl) * uPushAmt * pf;
      }

      // PULSE DILATE: the lattice itself magnifies where the front passes, so the grid
      // opens up as the wave crosses it instead of only the glyphs fattening. Same maths
      // as the cursor scale below, but centred on the pulse and travelling with it, and it
      // has to happen HERE, before the cell grid is derived from frag.
      if (uPDilate != 0.0){
        vec2 pOrg; float pFront;
        float pg = pulseInfluence(frag, pOrg, pFront);
        if (pg > 0.001){
          // Contract the neighbourhood around the front LINE, so a tile sitting on the
          // front is magnified in place rather than dragged toward the origin. Every front
          // metric here is homogeneous, so scaling the offset vector scales the metric by
          // the same factor and this works for the round, star and diamond shapes alike.
          vec2 toP = frag - pOrg;
          float m0 = max(0.001, frontMetric(toP));
          float rr = pFront + (m0 - pFront) / (1.0 + uPDilate * pg);
          frag = pOrg + toP * (rr / m0);
        }
      }

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

      // mRaw is the mask SHAPE (the X), independent of how far the mask is dialled in.
      // The pulse region gate reads mRaw so it follows the glyph, not the mask opacity.
      float mRaw = clamp(maskAt(frag), 0.0, 1.0);
      float m = mRaw * uMaskOp;

      // --- per-tile intro reveal: each tile's "distance metric" gates when it appears ---
      // FIELD travel: a rigid offset of the sampling coordinate, so the whole lattice
      // arrives as one sheet. Applied before the lattice is derived and NOT to frag itself
      // so the vignette and the mask stay anchored to the viewport.
      vec2 lat = frag - uFieldOff;
      vec2 cell = floor(lat / uCell);
      vec2 cellCtr = (cell + 0.5) * uCell;
      float metric = metricAt(cellCtr);               // 0 (reveals first) .. 1 (last)
      float ip = (uRestPose > 0.5) ? 1.0 : introP(metric);
      vec2 srcPos = lat;                              // where in tile space this pixel reads
      float eT = metric;                              // START -> END blend for the entry pose

      // TILE travel. A tile drawn away from home would leave its own cell's uv window and
      // simply vanish, so the displacement is INVERTED instead of applied: the tile visible
      // at this pixel is the one whose home is lat minus travel. travel depends on that tile's
      // own progress, which depends on which tile it is, so this is a fixed point. Two
      // iterations converge wherever the stagger is smooth (gradient under one cell per
      // cell), which every direction here satisfies. Skipped entirely in POP mode.
      if (uSlideOn > 0.5){
        for (int it = 0; it < 2; it++){
          vec2 tOff = mix(uTileOffA, uTileOffB, eT) * (1.0 - ip);
          srcPos  = lat - tOff;
          cell    = floor(srcPos / uCell);
          cellCtr = (cell + 0.5) * uCell;
          metric  = metricAt(cellCtr);
          ip      = (uRestPose > 0.5) ? 1.0 : introP(metric);
          eT      = metric;
        }
      }
      // entry pose for THIS tile, interpolated along the same axis that ordered it
      float qi = 1.0 - ip;                                          // remaining travel
      float eScale = uSlideOn > 0.5 ? mix(uTileScaleA, uTileScaleB, eT) : 0.4;
      float eFade  = uSlideOn > 0.5 ? mix(uTileFadeA,  uTileFadeB,  eT) : 0.0;
      float eSpin  = uSlideOn > 0.5 ? mix(uTileSpinA,  uTileSpinB,  eT) * qi : 0.0;
      // opacity is its own curve: at eFade 0 this is the legacy ip fade-up, at 1 the
      // tile is solid for the whole trip so the travel actually reads.
      float iop = mix(eFade, 1.0, ip);

      // ---- PULSE: accumulate the gain of every live front at this tile ----
      // Radius is measured from the TILE CENTRE, not the pixel, so the front advances
      // tile by tile: a chain reaction through a lattice rather than a smooth ripple.
      float gain = 0.0;
      if (uPGainIn > 0.0001 || uPGainOut > 0.0001){
        for (int i = 0; i < 4; i++){
          vec4 pl = uPulse[i];
          if (pl.w <= 0.0) continue;
          float age = uTime - pl.z;
          if (age < 0.0 || age > uPLife) continue;
          vec2 pd = cellCtr - pl.xy * uRes;
          // Rotate the sampling coordinate exactly as maskAt does, so the LOGO and RIBBON
          // fronts turn with the mask instead of staying axis-aligned while it tilts, and
          // the anisotropic STAR and DIAMOND metrics turn too.
          if (uPRot > 0.0001 || uPRot < -0.0001){
            float pc = cos(uPRot), ps = sin(uPRot);
            pd = mat2(pc, -ps, ps, pc) * pd;
          }
          // FRONT START (inside frontRadius): the wave is born at uPStart mask extents, so
          // 1.0 means "shed from the edge of the X" and it tracks the mask when resized.
          float front = frontRadius(age);
          float wide  = max(1.0, uPThick);   // px, not cells: the cell size no longer moves it
          float band;
          if (uPShape > 3.5){
            // RIBBON front: the shell between the banner at the leading and trailing radius
            band = clamp(ribbonCov(pd, front, uPFeathO) - ribbonCov(pd, front - wide, uPFeathI), 0.0, 1.0);
          } else if (uPShape > 1.5 && uPShape < 2.5){
            // LOGO X front: the shell between the glyph at the leading and trailing radius,
            // so the wavefront IS the mask's X expanding, not an approximation of it.
            band = clamp(glyphCov(pd, front, uPFeathO) - glyphCov(pd, front - wide, uPFeathI), 0.0, 1.0);
          } else {
            // ROUND / STAR / DIAMOND all reduce to a radius metric and a band around it.
            // signed: + is AHEAD of the front (outer edge), - is BEHIND it (inner edge),
            // so each side gets its own falloff distance. Both at 1.0 = the old symmetric band.
            float sd = frontMetric(pd) - front;
            band = sd >= 0.0
              ? 1.0 - smoothstep(0.0, max(0.5, wide * uPFeathO), sd)
              : 1.0 - smoothstep(0.0, max(0.5, wide * uPFeathI), -sd);
          }
          float life  = pulseEnv(age / max(0.05, uPLife));
          gain += band * life * life * pl.w;                          // += is the multiply
        }
        // Per-region strength, blended across the glyph's own feather. Inside the X the
        // grid already sits near the top of its range, so it needs far less gain than the
        // dim field does; one shared number could only ever be right in one of the two
        // places. Setting either side to 0 confines the pulse to the other.
        gain *= mix(uPGainOut, uPGainIn, mRaw);
      }
      // countable amplification: snap gain to a fixed ladder, so brightness, tile growth
      // and the colour shift all step together and the boost reads as countable rather
      // than vague. uQSteps = levels per unit of gain; low values give a hard-edged
      // single-step front, high values approach the smooth ramp.
      // Nearest-level, not floor: floor drops the top partial step, and since a travelling
      // front never reaches its nominal peak (life-squared decay), floor at low step
      // counts silently disables the whole control.
      if (uQOn > 0.5) gain = floor(gain * uQSteps + 0.5) / max(1.0, uQSteps);
      float gmul = 1.0 + gain;

      // tile lookup; scale up toward cursor AND scale up during intro (tiles pop in)
      // tile transform: gap (spacing), base scale, cursor grow, intro grow, pulse grow
      // entry scale: mix(0.4, 1, ip) is exactly the legacy 0.4 + 0.6*ip, so a POP intro
      // and a SLIDE intro with the entry scale left at 0.4 grow identically.
      float grow = uTileSc * (1.0 - uGap) * (1.0 + uScale * m) * mix(eScale, 1.0, ip)
                 * (1.0 + gain * uPGrow);
      vec2 local = (srcPos - cellCtr) / uCell;        // -0.5..0.5 within cell
      // rotate the sample space: static rotation + extra rotation under the mask + entry spin
      float ang = uRot + uMRot * m + eSpin;
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

      // ---- REACH: make the front carry out into the dim field -------------------------
      // A pure multiply is useless out here. Inside the mask the grid sits at ~1.06 and a
      // x1.5 pulse lands at 1.6; outside it sits at uBase (0.26) and the same x1.5 lands
      // at 0.39, which is invisible and blooms not at all. So the pulse ALSO acts as
      // travelling mask influence: where the front is, the grid is lifted along the very
      // same dim -> bright ramp the X itself uses, and it partly opens the vignette that
      // otherwise crushes the outer field to nothing. This is what lets the amplification
      // leave the glyph instead of only ever reading inside it.
      float reach = clamp(gain * uPReach, 0.0, 1.0);
      float mp = clamp(m + reach, 0.0, 1.0);          // mask influence + the passing front

      // permanent vignette: bright center, darker edges (makes whole grid readable)
      float vd = length((frag - ctrScreen + vec2(0.0, uScrollY)) / uRes);   // 0 center .. ~0.5 corner
                                                     // (slide removed: the vignette is a viewport device, it must not travel)
      float vig = 1.0 - uVig * smoothstep(uVigR * 0.5, 0.75, vd);
      vig = mix(vig, 1.0, reach * 0.85);              // the front punches most of the way through

      // ---- HEADROOM: the pulse adds energy, it does not clip the frame to white ---------
      // The lift and the multiply compound, and the grid colour is blue-dominant: at rest
      // the blue channel is already at ~1.06, so any total much past 2.3 drives red and
      // green over 1.0 too and the whole mask goes flat white. So the pulse's ADDED
      // brightness is rolled off exponentially toward uPHead instead of running free.
      // Computed as an addition on top of the resting value, which is what keeps a
      // pulse-off render bit-identical no matter how gBright is dialled.
      float restB = uBase + (uBright - uBase) * m;              // no pulse anywhere in this
      float fullB = (uBase + (uBright - uBase) * mp) * gmul;    // what the pulse would ask for
      float add = max(0.0, fullB - restB);
      if (uPHead > 0.0001) add = uPHead * (1.0 - exp(-add / uPHead));
      else add = 0.0;
      // ---- TEASE light: a narrow travelling SWEEP plus a broad soft LEAK. Both are a
      // band along an arbitrary axis; the sweep is narrow and hard, the leak wide and soft.
      // Region-gated by the same mask value the pulse uses, so a sweep can light the field,
      // the X alone, or everything.
      float teaseAdd = 0.0;
      float swpBand = 0.0;
      if (uSwpGain > 0.0001 || uLeakGain > 0.0001){
        vec2 c2 = frag - ctrScreen;
        float span = max(1.0, length(uRes));
        if (uSwpGain > 0.0001){
          // SHAPE: LINEAR is a straight wipe along uSwpAng. The other three are contours
          // expanding from the centre, so the "wipe" becomes a ring, a rhombus, or an X.
          float ca = cos(uSwpAng), sa = sin(uSwpAng);
          vec2 pr = vec2(c2.x * ca + c2.y * sa, -c2.x * sa + c2.y * ca);   // rotated
          float half_ = max(1.0, span * 0.5);
          float b;
          if (uSwpShape > 4.5){
            // BURN WIPE: a radial front whose boundary is chewed by fbm and flickers, so the
            // grid appears to be eaten into rather than wiped. Same noise the BURN mask uses.
            vec2 nq = pr / half_ * max(0.2, uBurnScale) + vec2(uTime * 0.05, uTime * 0.037);
            float nn = bFbm(nq) - 0.5;
            float t = length(pr) / half_ + nn * uBurnAmt;
            float core = max(0.0, uSwpWide);
            float fth  = max(0.002, uSwpFeath) * max(0.05, uSwpSoft);
            float sd = t - uSwpPos;
            float fL = max(0.002, fth * (1.0 + uSwpBias));
            float fT = max(0.002, fth * (1.0 - uSwpBias));
            b = (sd >= 0.0) ? 1.0 - smoothstep(core, core + fL, sd)
                            : 1.0 - smoothstep(core, core + fT, -sd);
            b *= 1.0 - uBurnFlick * (0.5 - bNoise(vec2(uTime * 6.0, 1.3)));
          } else if (uSwpShape > 3.5){
            // SCALEX LOGO: the glyph has no analytic distance, so the band is the difference
            // between two coverages of the mark at slightly different sizes. Same construction
            // the logo pulse uses, which is why the two read as the same family.
            float rad = max(1.0, uSwpPos * half_ * 2.2);
            float wpx = max(2.0, (max(0.004, uSwpWide) + max(0.002, uSwpFeath) * max(0.05, uSwpSoft)) * half_ * 2.2);
            float lead  = glyphCov(pr, rad,       max(0.05, 1.0 + uSwpBias));
            float trail = glyphCov(pr, rad - wpx, max(0.05, 1.0 - uSwpBias));
            b = clamp(lead - trail, 0.0, 1.0);
          } else {
            float t;
            if (uSwpShape < 0.5){
              t = dot(c2, vec2(ca, sa)) / span + 0.5;               // 0..1 across the screen
            } else if (uSwpShape < 1.5){
              t = length(pr) / half_;                               // RADIAL ring
            } else if (uSwpShape < 2.5){
              t = (abs(pr.x) + abs(pr.y) * uSwpDiam) / half_;       // DIAMOND
            } else {
              float L2 = dot(pr, pr) + 1e-4;                        // X / STAR: fast on diagonals
              float star = 2.0 * abs(pr.x * pr.y) / L2;
              t = sqrt(L2) / half_ / max(0.2, 0.55 + 0.45 * star);
            }
            // WIDTH is the solid core; FEATHER is the falloff beyond it. Separating the two
            // means widening the band no longer softens it, and vice versa.
            float core = max(0.0, uSwpWide);
            float fth  = max(0.002, uSwpFeath) * max(0.05, uSwpSoft);
            float fLead  = max(0.002, fth * (1.0 + uSwpBias));
            float fTrail = max(0.002, fth * (1.0 - uSwpBias));
            float sd = t - uSwpPos;
            b = (sd >= 0.0) ? 1.0 - smoothstep(core, core + fLead, sd)
                            : 1.0 - smoothstep(core, core + fTrail, -sd);
          }
          float rg = uSwpRegion < 0.5 ? 1.0 : (uSwpRegion < 1.5 ? mRaw : 1.0 - mRaw);
          swpBand = b * rg;
          // the band always carries its light; in REVEAL mode it ALSO gates what is visible,
          // so the grid appears to exist only where the sweep is passing.
          teaseAdd += b * uSwpGain * rg;
        }
        if (uLeakGain > 0.0001){
          vec2 d2 = vec2(cos(uLeakAng), sin(uLeakAng));
          float t2 = dot(c2, d2) / span + 0.5;
          float w2 = max(0.02, uLeakWide);
          float b2 = 1.0 - smoothstep(0.0, w2, abs(t2 - uLeakPos));
          teaseAdd += b2 * b2 * uLeakGain;                        // squared = softer shoulder
        }
      }
      float bright = restB + add + teaseAdd;
      // opacity is split by mask region: OUT is the ambient field, IN is under the mask,
      // blended by the same influence that drives brightness (soft at the feather), so a
      // front travelling through the outer field carries the IN-mask opacity with it.
      float gop = mix(uGridOpOut, uGridOpIn, mp);
      // ---- OPENING VISIBILITY. Three gates, combined as a maximum so each can take over
      // from the last without a seam: the sweep window, the reveal growing out of the mask
      // anchor, and a blackout that outranks both. At rest uRevMask is 1 and this is inert.
      if (uOpenOn > 0.5){
        // BASE: dark while the entrance is held, and dark whenever the sweep is acting as a
        // window. Otherwise the field is simply present and the gates below only add to it.
        float vis = (uHoldDark > 0.5 || uSwpReveal > 0.5) ? 0.0 : 1.0;
        if (uRevOn > 0.5){
          // radial reveal from the mask anchor, eased at its edge for a vignette falloff
          float dNorm = length(frag - uMouseLag) / max(1.0, length(uRes) * 0.6);
          float edge = uRevMask * 1.35;                       // travels past 1 so it finishes
          vis = max(vis, 1.0 - smoothstep(edge - max(0.02, uRevSoft), edge + max(0.02, uRevSoft), dNorm));
        }
        // the sweep reveals wherever it passes, and the mask arriving is itself a reveal
        vis = max(vis, swpBand);
        vis = max(vis, mRaw * uMaskVis);
        gop *= clamp(vis, 0.0, 1.0);
      }
      gop *= (1.0 - clamp(uBlackout, 0.0, 1.0));
      // colour ramp: screen-space, same angle convention as the grade-pass tint, so
      // "grid grad angle" and "tint angle" point the same way. Sampled per pixel, so a
      // single tile still carries the ramp across itself (as the 3D element gradient does).
      vec2 guv = gl_FragCoord.xy / uRes;
      vec2 gdir = vec2(cos(uGradAngle), sin(uGradAngle));
      float gt = clamp(dot(guv - 0.5, gdir) + 0.5, 0.0, 1.0);
      vec3 gcol = mix(uGradA, uGradB, gt * uGradOn) * uGradGain;   // uGradOn 0 => flat colour A
      // amplified tiles ride toward the pulse's own colour
      gcol = mix(gcol, uPCol * uGradGain, clamp(gain * uPHue, 0.0, 1.0));
      // the sweep can carry its own colour, strongest at the centre of the band
      gcol = mix(gcol, uSwpCol * uGradGain, clamp(swpBand * uSwpColMix, 0.0, 1.0));

      vec3 col = gcol * tex * bright * vig * iop * gop;  // iop = intro fade (ip, or held solid)
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
    uKeepA:  { value: 0 },        // 1 = carry the source alpha through (layer compositing)
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
    uniform float uPx, uLevels, uMode, uDot, uLensR, uLensF, uLensOn, uLxReveal, uLxBright, uLxInvert, uLxDesat, uLxRipple, uLxCondense, uLensStr, uTime, uReact, uReactR, uAmt, uKeepA;

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

      // uKeepA carries this layer's coverage through the post pass, so the grid and the
      // stack can each be dithered on their own and composited afterwards.
      float outA = mix(1.0, texture2D(tSrc, gl_FragCoord.xy / uRes).a, uKeepA);
      gl_FragColor = vec4(col, outA);
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
function resize(){
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, !__sxOwnCanvas);
  const W = Math.floor(w * DPR), H = Math.floor(h * DPR);
  rt.setSize(W, H);
  auxRT.setSize(W, H);
  outRT.setSize(W, H);
  gRT.setSize(W, H);
  gRT2.setSize(W, H);
  mipSize.length = 0;
  for (let i = 0; i < GLOW_LEVELS; i++){
    const mw = Math.max(2, W >> (i + 1)), mh = Math.max(2, H >> (i + 1));
    mipSize.push(new THREE.Vector2(mw, mh));
    // only (re)allocate the 12 glow mips when the glow pass can actually run.
    // comp B ships with glow:0, so this was 12 pointless GPU allocations per resize.
    if (Q.glow){ downRT[i].setSize(mw, mh); upRT[i].setSize(mw, mh); }
  }
  ditherMat.uniforms.uRes.value.set(W, H);
  compMat.uniforms.uRes.value.set(W, H);
  gradeMat.uniforms.uRes.value.set(W, H);
  gridMat.uniforms.uRes.value.set(W, H);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
// Mobile browsers fire `resize` continuously while the URL bar hides/shows during
// scroll, and it only changes height. Reallocating render targets on each one is
// what makes scrolling stutter on phones, so height-only jitter within the browser
// chrome range is ignored, and real resizes are coalesced into one per frame.
let _rzQueued = false, _rzW = 0, _rzH = 0;
function requestResize(force){
  if (__stopped) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  if (!force && Q.mobile && w === _rzW && Math.abs(h - _rzH) < 150) return;
  if (_rzQueued) return;
  _rzQueued = true;
  requestAnimationFrame(() => {
    _rzQueued = false;
    if (__stopped) return;
    _rzW = stage.clientWidth; _rzH = stage.clientHeight;
    resize();
    wakeRender();
  });
}
function onHeroResize(){ requestResize(false); if (__fallbackVisibility) __fallbackVisibility(); }
function onHeroOrientation(){ requestResize(true); }
window.addEventListener('resize', onHeroResize, { passive:true });
window.addEventListener('orientationchange', onHeroOrientation, { passive:true });
resize();
_rzW = stage.clientWidth; _rzH = stage.clientHeight;

/* ---------- pointer ---------- */
const mouse = { x:0, y:0, sx:0, sy:0, px:-9999, py:-9999 };
const _AXIS = { x:new THREE.Vector3(1,0,0), y:new THREE.Vector3(0,1,0), z:new THREE.Vector3(0,0,1) };
const gLag = { nx:0, ny:0, px:-9999, py:-9999, mpx:-9999, mpy:-9999, msx:0, msy:0, mtx:-9999, mty:-9999, mp:1, reveal:0, tC:0, tlk:0 };   // lagged cursors (+ first-touch reveal 0..1, tC = time since entering grid C)
function onHeroPointerMove(e){
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.px = e.clientX * DPR;
  mouse.py = (window.innerHeight - e.clientY) * DPR;
  wakeRender();
}
window.addEventListener('pointermove', onHeroPointerMove, { passive:true });

/* ---------- scroll : the turn ---------- */
let scrollT = 0;       // smoothed scroll progress used by the scene
let scrollRaw = 0;     // raw ScrollTrigger progress
let introT = 0;   // multiplier intro progress 0->1
let gridT = 0, gridE = 0, gridM = 0;   // the grid's own intro + expansion + intro-move clocks
// The grid is the whole picture in comp C, and an optional BACKGROUND LAYER under the
// stacks in A/B. Everything that used to key off `comp === 'C'` keys off this instead,
// so the grid's clocks, pulse and controls behave identically wherever it is drawn.
const gridLive = () => P.comp === 'C' || !!P.gridOn;
function applyGridBgClass(){
  if (document.body) document.body.classList.toggle('grid-bg', P.comp !== 'C' && !!P.gridOn);
}
const gridUnder = () => P.comp !== 'C' && !!P.gridOn;
// pulse state lives here (ahead of the loop) so resets can reach it without a TDZ hazard
const PULSE_N = 4;
let pulseHead = 0, pAutoT = 0, pFirstDone = false;
let anchorEl = null;          // the FIXED-origin gizmo, minted on first use (console only)
// kill every live pulse (comp switch / intro replay) so a stale front never survives a reset
function clearPulses(){
  gridMat.uniforms.uPulse.value.forEach(v => v.set(0, 0, -1e6, 0));
  pAutoT = 0;
  pFirstDone = false;   // the opening beat is owed again after a replay or a comp switch
}
/* Everything a COLD LOAD starts from. The comp switch already reset all of this; REPLAY
   INTRO reset only introT, so the button replayed the tiles over a mask that was still
   sitting at reveal 1 from the first load. Anyone tuning the mask entrance was tuning
   something the console never played back, and only the bake, a genuine cold load, showed
   the real timing. One function now, so the two paths cannot drift apart again. */
function resetGridIntro(){
  wakeRender();
  introT = 0;
  gLag.reveal = 0; gLag.tC = 0;          // mask bloom starts over
  gLag.mpx = -9999; gLag.mpy = -9999;    // and re-acquires its position
  gridT = 0; gridE = 0; gridM = 0;       // grid tile reveal + expansion + move restart
  clearPulses();
}
function replayIntro(){ resetGridIntro(); [compA, compB].forEach(c => c.children.forEach(g => g.children.forEach(u => { u.userData.introDone = false; }))); }
gsap.registerPlugin(ScrollTrigger);
/* The section that follows the hero drives the scroll transform. On this page that is
   `.next`; in a Webflow build that class will not exist, so fall back to whatever element
   actually follows the hero, and then to raw window scroll. Without this the whole scroll
   response silently flatlines at 0 on the handed-off build. */
(() => {
  const hero = document.querySelector('.hero');
  // WEBFLOW / LEO: name your own section with window.SCALEX_SCROLL_TRIGGER = '.my-section'
  const hook = typeof window.SCALEX_SCROLL_TRIGGER === 'string'
             ? document.querySelector(window.SCALEX_SCROLL_TRIGGER) : null;
  const anchor = hook
              || document.querySelector('.next')
              || (hero && hero.nextElementSibling)
              || null;
  if (anchor){
    __scrollTrigger = ScrollTrigger.create({
      trigger: anchor, start: 'top bottom', end: 'top 15%', scrub: 0.6,
      onUpdate: st => { scrollRaw = st.progress; wakeRender(); }
    });
  } else {
    const onScroll = __rawScroll = () => {
      scrollRaw = Math.min(1, Math.max(0, (window.scrollY || 0) / Math.max(1, window.innerHeight)));
      wakeRender();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();

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
  // A preset can carry a value outside the slider's authored range (reveal duration 4 on a
  // 0..2 slider, X intro fade 5 on a 0..1 slider). The handle then parks at the end while
  // P holds the real number, and the first drag silently collapses the param. Stretch the
  // range to fit instead, so every stored value is reachable.
  const grow = v => {
    if (!isFinite(v)) return;
    const lo = parseFloat(slider.min), hi = parseFloat(slider.max);
    if (isFinite(hi) && v > hi) slider.max = String(v);
    if (isFinite(lo) && v < lo) slider.min = String(v);
  };
  grow(P[key]);
  BINDERS.push({ key, refresh: () => { grow(P[key]); slider.value = P[key]; num.value = P[key]; } });
}
// gIntroDir is one parameter shown in two places: the radial pair and the 3x3 pad. Paint
// both from the same value or one of them will lie about what is selected.
function paintIntroDir(){
  document.querySelectorAll('#gIntroSeg button, #gIntroPad button')
    .forEach(x => x.classList.toggle('on', x.dataset.gintro === P.gIntroDir));
  const mid = $('gIntroMid');
  if (mid) mid.classList.toggle('on', P.gIntroDir === 'centerOut' || P.gIntroDir === 'edgesIn');
}
function refreshPanel(){
  BINDERS.forEach(b => b.refresh());
  // toggles
  const setChk = (id, v) => { const el = $(id); if (el) el.checked = v; };
  setChk('uDither', P.dither); setChk('uGlowOn', P.glowOn); setChk('uLensOn', P.lensOn);
  setChk('uUI', P.ui); setChk('uMouseOn', P.mouseOn); setChk('uMInvert', P.mInvert); setChk('uPartFan', P.partFan); setChk('uGMaskEase', P.gMaskEase); setChk('uGExpandOn', P.gExpandOn); setChk('uGWaveOn', P.gWaveOn); setChk('uGWaveCursor', P.gWaveCursor); setChk('uGPushOn', P.gPushOn);
  setChk('uGTeaseOn', P.gTeaseOn); setChk('uGridOn', P.gridOn); setChk('uGPostSep', P.gPostSep); setChk('uGMouseOn', P.gMouseOn); setChk('uGSwpReveal', P.gSwpReveal); setChk('uGTeaseLookOn', P.gTeaseLookOn); refreshTimeline(); buildTimeline(); layoutTimeline(); setChk('uGRevMaskOn', P.gRevMaskOn); applyGridBgClass();
  if ($('uGSwpCol')) $('uGSwpCol').value = P.gSwpCol || '#ffffff';
  document.querySelectorAll('#gSwpShapeSeg button, #gSwpShapeSeg2 button').forEach(x => x.classList.toggle('on', x.dataset.gswps === (P.gSwpShape || 'linear')));
  document.querySelectorAll('#gXMoveSeg button, #gXMoveSeg2 button').forEach(x => x.classList.toggle('on', x.dataset.gxmove === (P.gXMove || 'off')));
  document.querySelectorAll('#gDitherSeg button').forEach(x => x.classList.toggle('on', x.dataset.gdm === (P.gDitherMode || 'off')));
  document.querySelectorAll('#gSwpRegionSeg button').forEach(x => x.classList.toggle('on', x.dataset.gswpr === (P.gSwpRegion || 'all')));
  setChk('uBlobOn', P.blobOn); applyBlob();
  setChk('uTintOn', P.tintOn);
  if ($('uTintA')){ $('uTintA').value = P.tintA; $('uTintB').value = P.tintB; }
  setChk('uGradOn', P.gradOn);
  if ($('uGradA')){ $('uGradA').value = P.gradA; $('uGradB').value = P.gradB; }
  setChk('uGGradOn', P.gGradOn);
  if ($('uGGradA')){ $('uGGradA').value = P.gGradA; $('uGGradB').value = P.gGradB; }
  setChk('uGScrOn', P.gScrOn); setChk('uGQOn', P.gQOn); setChk('uGPDilOn', P.gPDilOn); setChk('uGPAnchorOn', P.gPAnchorOn);
  setChk('uGMaskAnchorOn', P.gMaskAnchorOn);
  if (typeof applyAnchor === 'function') applyAnchor();
  if (typeof applyMaskGizmo === 'function') applyMaskGizmo();
  if (CURVES.grid){ CURVES.grid.refresh(); CURVES.mask.refresh(); }
  if (typeof rebuildEaseLUT === 'function') rebuildEaseLUT();
  document.querySelectorAll('#gPTrigSeg button').forEach(x => x.classList.toggle('on', x.dataset.gptrig === P.gPTrig));
  document.querySelectorAll('#gPFromSeg button').forEach(x => x.classList.toggle('on', x.dataset.gpfrom === P.gPFrom));
  document.querySelectorAll('#gPShapeSeg button').forEach(x => x.classList.toggle('on', x.dataset.gpshape === P.gPShape));
  if ($('uGPCol')) $('uGPCol').value = P.gPCol;
  document.querySelectorAll('#gPRegionSeg button').forEach(x => x.classList.toggle('on', x.dataset.gpregion === P.gPRegion));
  document.querySelectorAll('#gPBirthSeg button').forEach(x => x.classList.toggle('on', x.dataset.gpbirth === P.gPBirth));
  applyBirthState();
  // segmented controls
  document.querySelectorAll('#compSeg button').forEach(x => x.classList.toggle('on', x.dataset.comp === P.comp));
  document.querySelectorAll('#ditherModeSeg button').forEach(x => x.classList.toggle('on', x.dataset.dmode === P.ditherMode));
  document.querySelectorAll('#orderSeg button').forEach(x => x.classList.toggle('on', x.dataset.order === P.order));
  setChk('uLxReveal', P.lensFx.reveal); setChk('uLxBright', P.lensFx.brighten);
  setChk('uLxInvert', P.lensFx.invert); setChk('uLxDesat', P.lensFx.desat);
  setChk('uLxRipple', P.lensFx.ripple); setChk('uLxCondense', P.lensFx.condense);
  document.querySelectorAll('#gMaskSeg button').forEach(x => x.classList.toggle('on', x.dataset.gmask === P.gMaskShape));
  paintIntroDir();
  document.querySelectorAll('#gMoveSeg button, #gMoveSeg2 button').forEach(x => x.classList.toggle('on', x.dataset.gmove === (P.gMoveMode || 'off')));
  document.querySelectorAll('#gIntroModeSeg button').forEach(x => x.classList.toggle('on', x.dataset.gimode === P.gIntroMode));
  if (typeof refreshGridEntrySliders === 'function') refreshGridEntrySliders();
  document.querySelectorAll('#gRevSeg button').forEach(x => x.classList.toggle('on', x.dataset.grev === P.gRevealMode));
  document.querySelectorAll('#gMouseSeg button').forEach(x => x.classList.toggle('on', x.dataset.gmouse === P.gMouseMode));
  document.querySelectorAll('#bScrollSeg button').forEach(x => x.classList.toggle('on', x.dataset.bscroll === P.bScroll));
  document.querySelectorAll('#bAxisSeg button').forEach(x => x.classList.toggle('on', x.dataset.baxis === P.bAxis));
  document.querySelectorAll('#introModeSeg button').forEach(x => x.classList.toggle('on', x.dataset.imode === P.introMode));
  if (typeof refreshEntrySliders === 'function') refreshEntrySliders();
  document.body.classList.toggle('mode-C', P.comp === 'C');
  document.body.classList.toggle('comp-B', P.comp === 'B');
}
bind('uPx','px'); bind('uLevels','levels'); bind('uLens','lens'); bind('uLensF','lensF'); bind('uLensStr','lensStr'); bind('uPar','par'); bind('uDrift','drift');
bind('uGlow','glow'); bind('uGlowR','glowR'); bind('uDot','dot'); bind('uIntroDur','introDur');
bind('uIntroEaseIn','introEaseIn'); bind('uIntroEaseOut','introEaseOut');
bind('uIntroStagger','introStagger'); bind('uIntroDelay','introDelay');
bind('uMMove','mMove'); bind('uMScale','mScale'); bind('uMRot','mRot'); bind('uMDelay','mDelay');
bind('uMZPush','mZPush'); bind('uMRoll','mRoll'); bind('uMReact','mReact'); bind('uMReactR','mReactR');
bind('uMCasAmt','mCasAmt'); bind('uMCasDelay','mCasDelay');
bind('uScrTurn','scrTurn'); bind('uScrDolly','scrDolly'); bind('uScrRise','scrRise'); bind('uScrDelay','scrDelay');
bind('uBRot','bRot'); bind('uBScale','bScale');
bind('uGrHue','grHue'); bind('uGrSat','grSat'); bind('uGrBright','grBright');
bind('uTintAmt','tintAmt'); bind('uTintDesat','tintDesat'); bind('uTintGain','tintGain'); bind('uTintAngle','tintAngle');
// the element gradient is baked into vertex colours, so every change rebuilds the stacks.
// In mode C nothing 3D is on screen, so skip the rebuild there (the comp switch does one).
const regrad = () => { if (P.comp !== 'C') rebuildStacks(); };
bind('uGradAngle','gradAngle', regrad);
bind('uGradGain','gradGain', regrad);
if ($('uGradOn')){
  $('uGradOn').checked = P.gradOn;
  $('uGradOn').addEventListener('change', e => { P.gradOn = e.target.checked; regrad(); });
}
if ($('uGradA')){
  $('uGradA').value = P.gradA; $('uGradB').value = P.gradB;
  $('uGradA').addEventListener('input', e => { P.gradA = e.target.value; regrad(); });
  $('uGradB').addEventListener('input', e => { P.gradB = e.target.value; regrad(); });
}
// GRID / COLOR — the mode-C counterpart: fed straight to the grid shader, no rebuild needed
bind('uGGradAngle','gGradAngle');
bind('uGGradGain','gGradGain');
if ($('uGGradOn')){
  $('uGGradOn').checked = P.gGradOn;
  $('uGGradOn').addEventListener('change', e => P.gGradOn = e.target.checked);
}
if ($('uGGradA')){
  $('uGGradA').value = P.gGradA; $('uGGradB').value = P.gGradB;
  $('uGGradA').addEventListener('input', e => P.gGradA = e.target.value);
  $('uGGradB').addEventListener('input', e => P.gGradB = e.target.value);
}
// GRID / PULSE
bind('uGPSpeed','gPSpeed'); bind('uGPRot','gPRot'); bind('uGPThick','gPThick'); bind('uGPFadeIn','gPFadeIn'); bind('uGPFadeOut','gPFadeOut'); bind('uGScrSlide','gScrSlide'); bind('uGScrMask','gScrMask'); bind('uGScrFade','gScrFade');
bind('uGScrGlow','gScrGlow'); bind('uGScrEase','gScrEase');
if ($('uGScrOn')){ $('uGScrOn').checked = P.gScrOn;
  $('uGScrOn').addEventListener('change', e => P.gScrOn = e.target.checked); }
bind('uGPStart','gPStart');
bind('uGPAnchorX','gPAnchorX', () => { useFixedOrigin(); applyAnchor(); });
bind('uGPAnchorY','gPAnchorY', () => { useFixedOrigin(); applyAnchor(); }); bind('uGPDilate','gPDilate'); bind('uGPGainIn','gPGainIn'); bind('uGPGainOut','gPGainOut'); bind('uGPFeathO','gPFeathO'); bind('uGPFeathI','gPFeathI'); bind('uGPHead','gPHead');
bind('uGPReach','gPReach'); bind('uGPGrow','gPGrow'); bind('uGPHue','gPHue'); bind('uGPLife','gPLife');
bind('uGPFirst','gPFirst'); bind('uGPAuto','gPAuto'); bind('uGPAutoStr','gPAutoStr'); bind('uGQSteps','gQSteps');
// GRID / INTRO SLIDE. Timing and the two global travels bind straight through; the tile
// rows go through the endpoint selector below, so one set of sliders edits two poses.
bind('uGStagger','gStagger'); bind('uGTrail','gTrail');
bind('uGFieldX','gFieldX'); bind('uGFieldY','gFieldY');
bind('uGMaskOffX','gMaskOffX', () => applyMaskGizmo());
bind('uGMaskOffY','gMaskOffY', () => applyMaskGizmo());
// mask placement: sliders and the draggable handle are two views of the same two numbers
bind('uGMaskAX','gMaskAX', () => applyMaskGizmo());
bind('uGMaskAY','gMaskAY', () => applyMaskGizmo());
if ($('uGMaskAnchorOn')){
  $('uGMaskAnchorOn').checked = P.gMaskAnchorOn;
  $('uGMaskAnchorOn').addEventListener('change', e => { P.gMaskAnchorOn = e.target.checked; applyMaskGizmo(); });
}
// ENTRY FIRST / ENTRY LAST — the grid's version of the stack's ENTRY START / END gizmo.
// The stack interpolates its entry pose across the layer index; the grid interpolates it
// across the same metric that orders the tiles, so "first in" and "last in" can arrive
// from opposite directions and everything between them blends.
const GIE_KEYS = {
  start: { offX:'gTileOffX',  offY:'gTileOffY',  spin:'gTileSpin',  scale:'gTileScale',  fade:'gTileFade'  },
  end:   { offX:'gTileOffX1', offY:'gTileOffY1', spin:'gTileSpin1', scale:'gTileScale1', fade:'gTileFade1' }
};
const GIE_SLIDERS = { offX:'uGTOffX', offY:'uGTOffY', spin:'uGTSpin', scale:'uGTScale', fade:'uGTFade' };
let gIntroEdit = 'start';
const GIE_NUM = {};
for (const f in GIE_SLIDERS){
  const el = $(GIE_SLIDERS[f]); if (!el) continue;
  const num = document.createElement('input');
  num.type = 'number'; num.className = 'val'; num.step = el.step || 'any';
  num.value = el.value;
  el.nextElementSibling.replaceWith(num);
  GIE_NUM[f] = num;
  const applyVal = v => { if (isFinite(v)) P[GIE_KEYS[gIntroEdit][f]] = v; };
  el.addEventListener('input', () => { num.value = el.value; applyVal(parseFloat(el.value)); });
  const fromNum = () => { const v = parseFloat(num.value); if (!isFinite(v)) return; el.value = v; applyVal(v); };
  num.addEventListener('input', fromNum);
  num.addEventListener('change', fromNum);
}
function refreshGridEntrySliders(){
  const map = GIE_KEYS[gIntroEdit];
  for (const f in GIE_SLIDERS){
    const el = $(GIE_SLIDERS[f]); if (!el) continue;
    const v = P[map[f]];
    const hi = parseFloat(el.max), lo = parseFloat(el.min);
    if (isFinite(v)){ if (isFinite(hi) && v > hi) el.max = String(v); if (isFinite(lo) && v < lo) el.min = String(v); }
    el.value = v;
    if (GIE_NUM[f]) GIE_NUM[f].value = v;
  }
}
if ($('gEntrySeg')) $('gEntrySeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  gIntroEdit = b.dataset.gie;
  $('gEntrySeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  refreshGridEntrySliders();
});
if ($('gIntroModeSeg')) $('gIntroModeSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  P.gIntroMode = b.dataset.gimode;
  $('gIntroModeSeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  // Every slide default is the value that reproduces POP, which is correct but means a
  // first press of SLIDE would change nothing on screen and read as a dead toggle. So the
  // FIRST press, and only while no travel has been dialled at all, seeds a legible move:
  // the sheet drops in, the first tiles rise and the last ones fall, and the tiles stay
  // part-visible while they travel. Touch any of these and the seed never fires again.
  const untouched = !P.gFieldX && !P.gFieldY && !P.gMaskOffX && !P.gMaskOffY &&
                    !P.gTileOffX && !P.gTileOffY && !P.gTileOffX1 && !P.gTileOffY1 &&
                    !P.gTileSpin && !P.gTileSpin1;
  // the controls for the mode you just picked should not be behind a closed group
  if ($('gSlideGrp') && P.gIntroMode === 'slide') $('gSlideGrp').open = true;
  applyMaskGizmo();   // the entry handle only exists while the mask travels
  if (P.gIntroMode === 'slide' && untouched){
    P.gFieldY = 220;
    P.gTileOffY = 70; P.gTileOffY1 = -70;          // opposite ends arrive from opposite sides
    P.gTileFade = 0.35; P.gTileFade1 = 0.35;       // visible while travelling, or the move is lost
    P.gTileScale = 0.7; P.gTileScale1 = 0.7;
    refreshPanel();
  }
  replayIntro();   // structural, same as the stack's mode switch
});
if ($('uGPAnchorOn')){
  $('uGPAnchorOn').checked = P.gPAnchorOn;
  $('uGPAnchorOn').addEventListener('change', e => { P.gPAnchorOn = e.target.checked; applyAnchor(); });
}
if ($('uGPDilOn')){
  $('uGPDilOn').checked = P.gPDilOn;
  $('uGPDilOn').addEventListener('change', e => P.gPDilOn = e.target.checked);
}
if ($('uGPCol')){
  $('uGPCol').value = P.gPCol;
  $('uGPCol').addEventListener('input', e => P.gPCol = e.target.value);
}
if ($('uGQOn')){
  $('uGQOn').checked = P.gQOn;
  $('uGQOn').addEventListener('change', e => P.gQOn = e.target.checked);
}
[['gPTrigSeg','gptrig','gPTrig'],['gPFromSeg','gpfrom','gPFrom'],
 ['gPShapeSeg','gpshape','gPShape'],['gPRegionSeg','gpregion','gPRegion'],
 ['gPBirthSeg','gpbirth','gPBirth']]
.forEach(([segId, attr, key]) => {
  if (!$(segId)) return;
  $(segId).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P[key] = b.dataset[attr];
    $(segId).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    if (typeof applyAnchor === 'function') applyAnchor();
    if (typeof applyMaskGizmo === 'function') applyMaskGizmo();
    if (key === 'gPBirth'){
      // The whole point of X EDGE is a wave shed by the outline, and only the LOGO X front
      // has that outline. If the shape is still the untouched default, move it across on the
      // first press so the mode shows what it is for; any deliberate shape choice is left be.
      if (P.gPBirth === 'edge' && P.gPShape === 'round'){
        P.gPShape = 'logo';
        document.querySelectorAll('#gPShapeSeg button').forEach(x => x.classList.toggle('on', x.dataset.gpshape === 'logo'));
      }
      applyBirthState();
      pulseNow(P.gPAutoStr || 1);   // fire one immediately so the change is visible
    }
  });
});
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
bind('uGTileSc','gTileSc'); bind('uGGap','gGap'); bind('uGRot','gRot'); bind('uGMRot','gMRot'); bind('uGXRotate','gXRotate');
bind('uGXSize','gXSize'); bind('uGXFeather','gXFeather'); bind('uGMaskOp','gMaskOp');
bind('uGPar','gPar'); bind('uGScaleM','gScaleM'); bind('uGSphere','gSphere'); bind('uGDelay','gDelay'); bind('uGMaskDelay','gMaskDelay');
bind('uGRevealDur','gRevealDur'); bind('uGRevealEase','gRevealEase', () => { if (CURVES.mask) CURVES.mask.draw(); }); bind('uGRevealDelay','gRevealDelay'); bind('uGXFade','gXFade');
bind('uGParAmt','gParAmt');
bind('uGGridOpIn','gGridOpIn'); bind('uGGridOpOut','gGridOpOut'); bind('uGWaveAmp','gWaveAmp'); bind('uGWaveFreq','gWaveFreq'); bind('uGWaveSpeed','gWaveSpeed'); bind('uGPushAmt','gPushAmt');
[['uGWaveOn','gWaveOn'],['uGWaveCursor','gWaveCursor'],['uGPushOn','gPushOn']].forEach(([id,key]) => {
  if ($(id)){ $(id).checked = P[key]; $(id).addEventListener('change', e => P[key] = e.target.checked); }
});
bind('uGVig','gVig'); bind('uGVigR','gVigR'); bind('uGIntroDur','gIntroDur');
bind('uGEaseIn','gEaseIn', () => rebuildEaseLUT()); bind('uGEaseOut','gEaseOut', () => rebuildEaseLUT());
bind('uGExpandFrom','gExpandFrom'); bind('uGExpandDur','gExpandDur'); bind('uGMoveAmt','gMoveAmt'); bind('uGMoveDur','gMoveDur');
if ($('uGridOn')){
  $('uGridOn').checked = P.gridOn;
  $('uGridOn').addEventListener('change', e => {
    P.gridOn = e.target.checked;
    applyGridBgClass();
    if (P.gridOn) resetGridIntro();   // the background plays its entrance when switched on
  });
}
if ($('uGMouseOn')){
  $('uGMouseOn').checked = P.gMouseOn;
  $('uGMouseOn').addEventListener('change', e => P.gMouseOn = e.target.checked);
}
bind('uGPx','gPx'); bind('uGLevels','gLevels'); bind('uGDot','gDot');
if ($('uGPostSep')){
  $('uGPostSep').checked = P.gPostSep;
  $('uGPostSep').addEventListener('change', e => P.gPostSep = e.target.checked);
}
if ($('gDitherSeg')) $('gDitherSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  P.gDitherMode = b.dataset.gdm;
  document.querySelectorAll('#gDitherSeg button').forEach(x => x.classList.toggle('on', x === b));
});
bind('uGIntroAt','gIntroAt'); bind('uGBlackAt','gBlackAt');
bind('uGTeaseCell','gTeaseCell'); bind('uGTeaseTileSc','gTeaseTileSc'); bind('uGTeaseOp','gTeaseOp'); bind('uGTeaseBlend','gTeaseBlend');
if ($('uGTeaseLookOn')){
  $('uGTeaseLookOn').checked = P.gTeaseLookOn;
  $('uGTeaseLookOn').addEventListener('change', e => { P.gTeaseLookOn = e.target.checked; replayIntro(); });
}

/* ---------- OPENING TIMELINE -------------------------------------------------------------
   Sliders are the wrong instrument for timing: the thing you are actually editing is where
   beats sit RELATIVE to each other, and that relationship is invisible in a column of
   numbers. This is an AE-style track view over the same params. Drag a bar to move its
   trigger, drag its right edge to change its duration. Not a timecode editor: there is no
   scrubbing, the playhead only reports where the opening currently is.
   Console only; the baked export never sees any of it. */
const TL_TRACKS = [
  { lab:'BLACK',  s:null,           d:'gBlackAt',    sid:null,            did:'uGBlackAt',    col:'#4b4b66' },
  { lab:'WIPE',   s:'gSwpAt',       d:'gSwpDur',     sid:'uGSwpAt',       did:'uGSwpDur',     col:'#5b53ff' },
  { lab:'GRID',   s:'gIntroAt',     d:'gIntroDur',   sid:'uGIntroAt',     did:'uGIntroDur',   col:'#8b5cf6' },
  { lab:'MASK',   s:'gRevealDelay', d:'gRevealDur',  sid:'uGRevealDelay', did:'uGRevealDur',  col:'#22b8cf' },
  { lab:'REVEAL', s:'gRevMaskAt',   d:'gRevMaskDur', sid:'uGRevMaskAt',   did:'uGRevMaskDur', col:'#e879f9' },
  { lab:'UI',     s:'gUiAt',        d:'gUiFade',     sid:'uGUiAt',        did:'uGUiFade',     col:'#f59e0b' }
];
let tlSpan = 6, tlBuilt = false, tlHead = null;

// write a value to P and keep the matching slider + number field in step, so the two
// editing surfaces never disagree about the same parameter
function tlSet(key, id, v){
  v = Math.max(0, Math.round(v * 20) / 20);            // snap to 0.05s
  P[key] = v;
  const el = id && $(id);
  if (el){
    el.value = v;
    const num = el.nextElementSibling;
    if (num && num.tagName === 'INPUT') num.value = v;
  }
  return v;
}

function tlEnd(t){ return (t.s ? (P[t.s] || 0) : 0) + (P[t.d] || 0); }

function buildTimeline(){
  const host = $('teaseTL'); if (!host || tlBuilt) return;
  host.innerHTML = '';
  TL_TRACKS.forEach((t, i) => {
    const row = document.createElement('div'); row.className = 'tl-row';
    const lab = document.createElement('div'); lab.className = 'tl-lab'; lab.textContent = t.lab;
    const trk = document.createElement('div'); trk.className = 'tl-trk';
    const bar = document.createElement('div'); bar.className = 'tl-bar'; bar.style.background = t.col;
    const txt = document.createElement('div'); txt.className = 'tl-t';
    const h   = document.createElement('div'); h.className = 'tl-h';
    bar.appendChild(txt); bar.appendChild(h);
    trk.appendChild(bar); row.appendChild(lab); row.appendChild(trk); host.appendChild(row);
    t._bar = bar; t._txt = txt; t._trk = trk;

    let mode = null, grabX = 0, startAt = 0, startDur = 0;
    const secPerPx = () => tlSpan / Math.max(1, trk.clientWidth);
    const down = e => {
      if (!P.gTeaseOn) return;
      mode = (e.target === h) ? 'dur' : (t.s ? 'move' : 'dur');   // BLACK has no start to move
      grabX = e.clientX; startAt = t.s ? (P[t.s] || 0) : 0; startDur = P[t.d] || 0;
      bar.classList.add('drag'); bar.setPointerCapture(e.pointerId); e.preventDefault();
    };
    const move = e => {
      if (!mode) return;
      const dt = (e.clientX - grabX) * secPerPx();
      if (mode === 'move') tlSet(t.s, t.sid, startAt + dt);
      else                 tlSet(t.d, t.did, Math.max(0.05, startDur + dt));
      layoutTimeline();
    };
    const up = e => { if (!mode) return; mode = null; bar.classList.remove('drag');
                      try { bar.releasePointerCapture(e.pointerId); } catch(err){}
                      replayIntro(); };
    bar.addEventListener('pointerdown', down);
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', up);
    bar.addEventListener('pointercancel', up);
  });
  const axis = document.createElement('div'); axis.className = 'tl-axis'; axis.id = 'tlAxis';
  host.appendChild(axis);
  tlHead = document.createElement('div'); tlHead.className = 'tl-head';
  TL_TRACKS[0]._trk.parentNode.parentNode.style.position = 'relative';
  host.style.position = 'relative';
  host.appendChild(tlHead);
  tlBuilt = true;
  layoutTimeline();
}

function layoutTimeline(){
  if (!tlBuilt) return;
  const maxEnd = TL_TRACKS.reduce((m, t) => Math.max(m, tlEnd(t)), 0);
  tlSpan = Math.max(4, Math.ceil((maxEnd + 0.5) * 2) / 2);
  TL_TRACKS.forEach(t => {
    const a = t.s ? (P[t.s] || 0) : 0, d = Math.max(0.05, P[t.d] || 0);
    t._bar.style.left  = (a / tlSpan * 100) + '%';
    t._bar.style.width = (d / tlSpan * 100) + '%';
    t._txt.textContent = (t.s ? a.toFixed(1) + '→' : '') + (a + d).toFixed(1);
    t._bar.style.display = (t.lab === 'REVEAL' && !P.gRevMaskOn) ? 'none' : '';
  });
  const axis = $('tlAxis');
  if (axis){
    axis.innerHTML = '';
    const step = tlSpan <= 6 ? 1 : (tlSpan <= 12 ? 2 : 5);
    for (let t = 0; t <= tlSpan + 0.001; t += step){
      const sp = document.createElement('span');
      sp.style.left = (t / tlSpan * 100) + '%'; sp.textContent = t + 's';
      axis.appendChild(sp);
    }
  }
}

function tlPlayhead(){
  if (!tlBuilt || !tlHead) return;
  const trk = TL_TRACKS[0]._trk;
  const x0 = trk.offsetLeft;
  const w  = trk.clientWidth;
  const on = !!P.gTeaseOn && P.comp === 'C';
  tlHead.style.display = on ? '' : 'none';
  if (!on) return;
  const t = Math.min(tlSpan, gLag.tC || 0);
  tlHead.style.left = (x0 + (t / tlSpan) * w) + 'px';
}

// A live read of the opening, because these beats are absolute times and the gaps between
// them are the thing you actually tune. Cheap enough to refresh every frame.
function refreshTimeline(){
  const el = $('teaseTimeline'); if (!el) return;
  if (!P.gTeaseOn){ el.textContent = 'tease off — grid plays its intro immediately'; return; }
  const n = v => (Math.round(v * 100) / 100);
  const swpEnd = n((P.gSwpAt || 0) + (P.gSwpDur || 0));
  const gap = n((P.gIntroAt || 0) - swpEnd);
  const L = [
    'black 0–' + n(P.gBlackAt),
    'wipe ' + n(P.gSwpAt) + '–' + swpEnd,
    'grid ' + n(P.gIntroAt) + ' (+' + n(P.gIntroDur) + ')',
    'mask ' + n(P.gRevealDelay) + ' (+' + n(P.gRevealDur) + ')',
    'UI ' + n(P.gUiAt)
  ];
  el.textContent = L.join('  ·  ') + (Math.abs(gap) > 0.01
    ? ('   [' + (gap > 0 ? 'gap ' : 'overlap ') + Math.abs(gap) + 's after wipe]') : '   [grid follows wipe]');
}
if ($('uGRevMaskOn')){
  $('uGRevMaskOn').checked = P.gRevMaskOn;
  $('uGRevMaskOn').addEventListener('change', e => { P.gRevMaskOn = e.target.checked; replayIntro(); });
}
bind('uGRevMaskAt','gRevMaskAt'); bind('uGRevMaskDur','gRevMaskDur'); bind('uGRevMaskSoft','gRevMaskSoft');
bind('uGXMoveAmt','gXMoveAmt');
bind('uGSwpFeath','gSwpFeath'); bind('uGBurnScale','gBurnScale'); bind('uGBurnAmt','gBurnAmt');
bind('uGBurnRim','gBurnRim'); bind('uGBurnFlick','gBurnFlick');
bind('uGSwpSpeed','gSwpSpeed'); bind('uGSwpCycles','gSwpCycles'); bind('uGSwpBias','gSwpBias');
bind('uGSwpDiam','gSwpDiam'); bind('uGSwpColMix','gSwpColMix');
bind('uGUiAt','gUiAt'); bind('uGUiFade','gUiFade');
if ($('uGSwpCol')){
  $('uGSwpCol').value = P.gSwpCol || '#ffffff';
  $('uGSwpCol').addEventListener('input', e => P.gSwpCol = e.target.value);
}
function paintSwpShape(){
  document.querySelectorAll('#gSwpShapeSeg button, #gSwpShapeSeg2 button').forEach(x =>
    x.classList.toggle('on', x.dataset.gswps === (P.gSwpShape || 'linear')));
}
['gSwpShapeSeg','gSwpShapeSeg2'].forEach(id => {
  if ($(id)) $(id).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gSwpShape = b.dataset.gswps; paintSwpShape(); replayIntro();
  });
});
paintSwpShape();
if ($('uGSwpReveal')){
  $('uGSwpReveal').checked = P.gSwpReveal;
  $('uGSwpReveal').addEventListener('change', e => { P.gSwpReveal = e.target.checked; replayIntro(); });
}
function paintXMove(){
  document.querySelectorAll('#gXMoveSeg button, #gXMoveSeg2 button').forEach(x =>
    x.classList.toggle('on', x.dataset.gxmove === (P.gXMove || 'off')));
}
['gXMoveSeg','gXMoveSeg2'].forEach(id => {
  if ($(id)) $(id).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gXMove = b.dataset.gxmove; paintXMove(); replayIntro();
  });
});
paintXMove(); bind('uGSwpAt','gSwpAt'); bind('uGSwpDur','gSwpDur'); bind('uGSwpGain','gSwpGain');
bind('uGSwpAng','gSwpAng'); bind('uGSwpWide','gSwpWide'); bind('uGSwpSoft','gSwpSoft'); bind('uGSwpTravel','gSwpTravel');
bind('uGGlimpseAt','gGlimpseAt'); bind('uGGlimpseDur','gGlimpseDur'); bind('uGGlimpseStr','gGlimpseStr');
bind('uGLeakAt','gLeakAt'); bind('uGLeakDur','gLeakDur'); bind('uGLeakGain','gLeakGain');
bind('uGLeakAng','gLeakAng'); bind('uGLeakWide','gLeakWide'); bind('uGLeakTravel','gLeakTravel');
if ($('uGTeaseOn')){
  $('uGTeaseOn').checked = P.gTeaseOn;
  $('uGTeaseOn').addEventListener('change', e => { P.gTeaseOn = e.target.checked; replayIntro(); });
}
if ($('gSwpRegionSeg')) $('gSwpRegionSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  P.gSwpRegion = b.dataset.gswpr;
  document.querySelectorAll('#gSwpRegionSeg button').forEach(x => x.classList.toggle('on', x === b));
}); bind('uGXFrom','gXFrom'); bind('uGXSpin','gXSpin');
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
    paintIntroDir();
    replayIntro();   // the direction reorders the whole entrance; play it, don't describe it
  });
  if ($('gIntroPad')) $('gIntroPad').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gIntroDir = b.dataset.gintro;
    paintIntroDir();
    replayIntro();
  });
  paintIntroDir();   // initial paint covers the pad too
  // INTRO MOVE lives across two rows, so paint both from the single value
  function paintMove(){
    document.querySelectorAll('#gMoveSeg button, #gMoveSeg2 button').forEach(x =>
      x.classList.toggle('on', x.dataset.gmove === (P.gMoveMode || 'off')));
  }
  ['gMoveSeg','gMoveSeg2'].forEach(id => {
    if ($(id)) $(id).addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      P.gMoveMode = b.dataset.gmove;
      paintMove();
      replayIntro();   // structural: play it rather than describe it
    });
  });
  paintMove();

  if ($('gRevSeg')) $('gRevSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gRevealMode = b.dataset.grev;
    document.querySelectorAll('#gRevSeg button').forEach(x => x.classList.toggle('on', x === b));
  });
  if ($('gMouseSeg')) $('gMouseSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    P.gMouseMode = b.dataset.gmouse;
    document.querySelectorAll('#gMouseSeg button').forEach(x => x.classList.toggle('on', x === b));
    applyMaskGizmo();   // FOLLOW makes the anchor inert; the handle has to say so
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

/* ---------- intro: opening-animation mode + separate START/END entry ---------- */
// each blend endpoint gets its own entry transform (offset + spin + scale); per-copy
// values are lerped along the blend so the two ends can enter differently.
const IE_KEYS = {
  start: { offX:'introOffX',  offY:'introOffY',  offZ:'introOffZ',  spinX:'introSpinX',  spinY:'introSpinY',  spinZ:'introSpin',  scale:'introScale'  },
  end:   { offX:'introOffX1', offY:'introOffY1', offZ:'introOffZ1', spinX:'introSpinX1', spinY:'introSpinY1', spinZ:'introSpin1', scale:'introScale1' }
};
const IE_SLIDERS = { offX:'uIEOffX', offY:'uIEOffY', offZ:'uIEOffZ', spinX:'uIESpinX', spinY:'uIESpinY', spinZ:'uIESpinZ', scale:'uIEScale' };
let introEdit = 'start';
const IE_NUM = {};   // field -> editable number field (created below)
// upgrade each entry row's static <output> into an editable number field + two-way sync,
// matching the bound sliders. Writes target the active endpoint (START or END).
for (const f in IE_SLIDERS){
  const el = $(IE_SLIDERS[f]); if (!el) continue;
  const num = document.createElement('input');
  num.type = 'number'; num.className = 'val'; num.step = el.step || 'any';
  num.value = el.value;
  el.nextElementSibling.replaceWith(num);
  IE_NUM[f] = num;
  const applyVal = v => { if (isFinite(v)) P[IE_KEYS[introEdit][f]] = v; };
  el.addEventListener('input', () => { num.value = el.value; applyVal(parseFloat(el.value)); });
  const fromNum = () => { const v = parseFloat(num.value); if (!isFinite(v)) return; el.value = v; applyVal(v); };
  num.addEventListener('input', fromNum);
  num.addEventListener('change', fromNum);
}
function refreshEntrySliders(){
  const map = IE_KEYS[introEdit];
  for (const f in IE_SLIDERS){
    const el = $(IE_SLIDERS[f]); if (!el) continue;
    el.value = P[map[f]];
    if (IE_NUM[f]) IE_NUM[f].value = P[map[f]];
  }
}
if ($('introEntrySeg')) $('introEntrySeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  introEdit = b.dataset.ie;
  $('introEntrySeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  refreshEntrySliders();
});
if ($('introModeSeg')) $('introModeSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  P.introMode = b.dataset.imode;
  $('introModeSeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  replayIntro();   // mode change is structural — replay so you see it immediately
});
refreshEntrySliders();
refreshGridEntrySliders();   // seed the grid entry rows from the armed endpoint (FIRST)
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
  // stash current comp's full state (spine + look); load the target's
  if (COMP[P.comp]){ SWAP_KEYS.forEach(k => { COMP[P.comp][k] = P[k]; }); COMP[P.comp].lensFx = { ...P.lensFx }; }
  if (COMP[next]){ Object.assign(P, COMP[next]); if (COMP[next].lensFx) P.lensFx = { ...COMP[next].lensFx }; }
  P.comp = next;
  document.querySelectorAll('#compSeg button').forEach(x => x.classList.toggle('on', x === b));
  compA.visible = P.comp === 'A';
  compB.visible = P.comp === 'B';   // C: both 3D comps hidden, grid shader takes over
  document.body.classList.toggle('mode-C', P.comp === 'C');
  applyGridBgClass();
  if (gridLive()) resetGridIntro();   // replay grid intro + re-bloom the mask
  if (COMP[next]) rebuildStacks();
  applyBlob();
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
  const inject = '<scr' + 'ipt>window.__SCALEX_BUILD=' + JSON.stringify(BUILD)
               + ';window.COOKED_PARAMS=' + JSON.stringify(exportParams()) + ';</scr' + 'ipt>\n';
  html = html.replace('<script', inject + '<script');   // before the first script tag
  return html;
}
/* Params as a DELIVERABLE sees them. `ui elements` is a console preview toggle for judging
   the grid with the copy hidden; it is not a property of the design. Baking it carried
   body.ui-off into the export, and the review file came out with no headline, no nav and no
   hero fade. Forced on for every export; the live console keeps whatever state you left it in. */
function exportParams(){ return Object.assign({}, P, { ui: true }); }
function syncComp(){ if (COMP[P.comp]){ SWAP_KEYS.forEach(k => { COMP[P.comp][k] = P[k]; }); COMP[P.comp].lensFx = { ...P.lensFx }; } }

/* ================= BAKE 1 · REVIEW =====================================================
   One standalone file: the whole page, console removed, current params frozen in. Drop it
   on any static host and the client sees exactly what is on screen right now.           */
function cookReview(){
  syncComp();
  downloadBlob(new Blob([cookString()], { type: 'text/html' }), 'scalex-hero-review.html');
}

/* ================= BAKE 2 · WEBFLOW HANDOFF ============================================
   Two files, because Webflow cannot hold this inline: the engine as an external script,
   and a small paste block for Page Settings. Everything that only exists as a reference
   on this prototype page is dropped: the Figma navbar and headline vectors, the hero fade,
   the philosophy section, and the console. In Webflow those are real elements built by
   hand, so shipping them as baked markup would only fight the site.                      */
const WF_JS_NAME = 'scalex-hero.js';
const WF_PRE_NAME = 'scalex-preloader.js';
const TEST_PAGE = [];
/* Two roles, one engine source.
   'preloader' bakes the opening (tease on, site chrome off) and publishes Leo's existing
   handoff: window.ScaleXLoader.heroReady, a promise the rest of the site already awaits.
   'hero' bakes the settled piece with the opening disabled, and waits on that promise
   before mounting so only one WebGL context is ever alive. */
function webflowEngineBase(role){
  if (!SELF_JS) return '';
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const S = '<scr' + 'ipt', E = '</scr' + 'ipt>';
  // The params are baked INTO the engine. The old split shipped an engine plus a separate
  // paste block, and deploying one without the other degraded silently: every key added
  // since that block was written fell back to an engine default and the hero rendered a look
  // nobody chose. One file cannot drift from itself.
  const P0 = exportParams();
  if (role === 'preloader'){
    P0.gTeaseOn = true;      // the opening IS this file's whole job
    P0.ui = false;           // the page's own chrome belongs to the hero, not the loader
  } else if (role === 'hero'){
    P0.gTeaseOn = false;     // the loader already played it; never replay behind the page
  }
  const baked = JSON.stringify(P0);
  // Same reason for the CDN tags: three separate script lines are three more things to get
  // wrong or half-update. The engine fetches what it needs, in order, and only if absent.
  const boot =
    'window.__SCALEX_ROLE = ' + JSON.stringify(role || 'hero') + ';\n' +
    'window.__SCALEX_NS = ' + JSON.stringify(role === 'preloader' ? 'SCALEX_PRE' : 'SCALEX') + ';\n' +
    'window.__SCALEX_SELF_CONTAINED = true;\n' +
    'window.__SCALEX_BUILD = ' + JSON.stringify(BUILD) + ';\n' +
    'var __SCALEX_BAKED = ' + baked + ';\n' +
    'var __SCALEX_P = Object.assign({}, __SCALEX_BAKED, window.COOKED_PARAMS || {});\n' +
    '(function(){\n' +
    '  var NEED = [\n' +
    '    ["THREE", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"],\n' +
    '    ["gsap", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"],\n' +
    '    ["ScrollTrigger", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"]\n' +
    '  ];\n' +
    '  function have(n){ return n === "ScrollTrigger"\n' +
    '    ? !!(window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger))\n' +
    '    : !!window[n]; }\n' +
    '  function load(url){ return new Promise(function(res, rej){\n' +
    '    var s = document.createElement("script"); s.src = url; s.async = false;\n' +
    '    s.onload = res;\n' +
    '    s.onerror = function(){ rej(new Error("[ScaleX hero] could not load " + url)); };\n' +
    '    document.head.appendChild(s);\n' +
    '  }); }\n' +
    '  function domReady(){ return document.readyState !== "loading"\n' +
    '    ? Promise.resolve()\n' +
    '    : new Promise(function(r){ document.addEventListener("DOMContentLoaded", r, { once: true }); }); }\n' +
    '  var chain = Promise.resolve();\n' +
    '  NEED.forEach(function(d){ chain = chain.then(function(){ return have(d[0]) ? null : load(d[1]); }); });\n' +
    '  var MYROLE = ' + JSON.stringify(role || 'hero') + ';\n' +
'  function gate(){\n' +
'    var L = window.ScaleXLoader;\n' +
'    if (MYROLE === "hero" && L && L.heroReady && L.heroReady.then){\n' +
'      return L.heroReady.then(function(){});   // the loader owns the screen until it is done\n' +
'    }\n' +
'    return Promise.resolve();\n' +
'  }\n' +
'  chain.then(domReady).then(gate).then(function(){ __scalexMain(); })\n' +
    '       .catch(function(e){ console.error(e); });\n' +
    '})();\n';
  return '/*! ScaleX hero · self-contained · baked ' + stamp + ' UTC\n'
    + ' *\n'
    + ' *  ONE FILE. Host it, then paste exactly this into Webflow, Page Settings, Before </body>:\n'
    + ' *\n'
    + ' *      ' + S + ' src="https://YOUR-CDN/' + WF_JS_NAME + '" defer>' + E + '\n'
    + ' *\n'
    + ' *  Nothing else. The params are baked in below and three.js r128 + GSAP 3.12.5 are\n'
    + ' *  fetched by the file itself, in order, and only if the page has not already loaded\n'
    + ' *  them. r128 is pinned on purpose: r152 changed colour management and would shift\n'
    + ' *  the approved palette.\n'
    + ' *\n'
    + ' *  Pin the URL to a tag (jsDelivr off a GitHub release). Never @main, or a push\n'
    + ' *  reships the client\'s hero without anyone asking for it.\n'
    + ' *\n'
    + ' *  Per-page overrides, if you ever need one, still work: set window.COOKED_PARAMS to a\n'
    + ' *  PARTIAL object before this tag and it merges over the baked values.\n'
    + ' *  window.SCALEX_QUALITY and window.SCALEX_SCROLL_TRIGGER work the same way.\n'
    + ' *\n'
    + ' *  DOM: nothing required. It mints #stage, its CSS and the hero blob if absent, and\n'
    + ' *  drives scroll off .next, else the element after .hero, else raw window scroll.\n'
    + ' *\n'
    + ' *  WebGL does not render in the Designer canvas, only in Preview and published.\n'
    + ' *\n'
    + ' *  Not minified on purpose: the console wiring self-disables when there is no panel.\n'
    + ' *  `npx terser ' + WF_JS_NAME + ' -c -m -o ' + WF_JS_NAME + '` if you want it smaller.\n'
    + ' */\n'
    + boot
    + 'function __scalexMain(){\n'
    + SELF_JS.replace(/^\s+/, '')
             .replace('}, window.COOKED_PARAMS || {});', '}, __SCALEX_P);')
             // the test-page template is console furniture; it has no business in a deployed file
             .replace(/\/\*TESTPAGE_START\*\/[\s\S]*?\/\*TESTPAGE_END\*\//, '')
    + '\n}\n';
}
/* The harness is emitted from the console so it cannot fall behind the engine: it is stamped
   with this build, and it says so when the .js you drop on it came from a different one. */
function testPageString(){
  return TEST_PAGE.join('\n').replace('/*BUILD*/null', JSON.stringify(BUILD));
}
function cookTestPage(){
  const html = testPageString();
  downloadBlob(new Blob([html], { type: 'text/html' }), 'scalex-hero-test.html');
  const note = $('cookNote');
  if (note) note.textContent = 'baked scalex-hero-test.html (' + Math.round(html.length / 1024)
    + ' kb, build ' + BUILD + '). open it and drop a baked .js on it.';
}

/* ---------- BAKE 2b · the integration note that ships WITH the engine ----------
   The UI hold only means something if the host page knows about it, so the handoff
   carries its own instructions rather than relying on them being remembered. */
function webflowReadme(){
  const nl = String.fromCharCode(10);
  const F = '```';
  const L = [];
  L.push('# ScaleX hero — Webflow integration');
  L.push('');
  L.push('Build `' + BUILD + '`. Two files: `' + WF_JS_NAME + '` (engine + baked params) and this note.');
  L.push('');
  L.push('## 1. Host the engine');
  L.push('');
  L.push('Webflow cannot host `.js`, so upload `' + WF_JS_NAME + '` somewhere it can be served');
  L.push('(Netlify, S3, or GitHub + jsDelivr). Pin a **tag**, never `@main`, or a future commit');
  L.push('silently reaches production.');
  L.push('');
  L.push('## 2. Add the mount point');
  L.push('');
  L.push('In the hero section (set the section to `position: relative`), add an empty div:');
  L.push('');
  L.push(F + 'html');
  L.push('<div id="scalex-hero" style="position:absolute;inset:0;z-index:0"></div>');
  L.push(F);
  L.push('');
  L.push('Put the page content above it (`position: relative; z-index: 1`). If the div is absent');
  L.push('the script mints a fixed, full-viewport stage instead, which is usually what you want');
  L.push('for a full-bleed hero.');
  L.push('');
  L.push('## 3. Load it');
  L.push('');
  L.push('Page settings, before `</body>`:');
  L.push('');
  L.push(F + 'html');
  L.push('<script src="https://YOUR-CDN/' + WF_JS_NAME + '" defer></' + 'script>');
  L.push(F);
  L.push('');
  L.push('Custom code only renders on a **published** site on a paid plan. It will not appear in');
  L.push('the Designer canvas, so verify on the `.webflow.io` staging domain.');
  L.push('');
  L.push('## 4. The UI hold (this is the part that needs you)');
  L.push('');
  L.push('The opening keeps the page chrome out until the mask arrives:');
  L.push('');
  L.push('- UI appears at: **' + (P.gUiAt || 0) + 's**, fading over **' + (P.gUiFade || 0.6) + 's**');
  L.push('- measured from the moment the hero starts, not from page load');
  L.push('');
  L.push('The engine publishes the value; the page decides what it applies to. Two ways:');
  L.push('');
  L.push('### Option A — CSS variable (recommended)');
  L.push('');
  L.push('The engine writes `--scalex-ui` (0 to 1) on `<html>` every frame. Add this to the page');
  L.push('`<head>`, replacing the selectors with your own nav and hero content classes:');
  L.push('');
  L.push(F + 'html');
  L.push('<style>');
  L.push('  .nav, .hero-content {');
  L.push('    opacity: var(--scalex-ui, 1);');
  L.push('  }');
  L.push('  html:not(.scalex-ready) .nav,');
  L.push('  html:not(.scalex-ready) .hero-content { opacity: 0; }');
  L.push('  body.scalex-ui-held .nav,');
  L.push('  body.scalex-ui-held .hero-content { pointer-events: none; }');
  L.push('</style>');
  L.push(F);
  L.push('');
  L.push('The `pointer-events` rule matters: an element at `opacity: 0` is still clickable, and a');
  L.push('visitor can otherwise hit an invisible nav during the opening. `body.scalex-ui-held` is');
  L.push('set by the engine while the hold is active and removed when the UI is fully in.');
  L.push('');
  L.push('The `:not(.scalex-ready)` pair is belt and braces: it keeps the chrome hidden in the');
  L.push('gap between first paint and the engine booting, so nothing flashes on a slow connection.');
  L.push('Drop it if you would rather the chrome be visible when JS fails.');
  L.push('');
  L.push('### Option B — let the engine do it');
  L.push('');
  L.push('Set a selector **before** the script tag and the engine applies opacity and');
  L.push('pointer-events itself, no CSS needed:');
  L.push('');
  L.push(F + 'html');
  L.push('<script>window.SCALEX_UI_SELECTOR = ".nav, .hero-content";</' + 'script>');
  L.push(F);
  L.push('');
  L.push('Simpler, but it writes inline styles, so Webflow interactions on the same elements can');
  L.push('fight it. Prefer Option A if the nav has its own animations.');
  L.push('');
  L.push('## 5. Opening timeline as baked');
  L.push('');
  L.push('| time | beat |');
  L.push('| --- | --- |');
  if (P.gTeaseOn){
    L.push('| 0 – ' + (P.gBlackAt || 0) + 's | black hold |');
    L.push('| ' + (P.gSwpAt || 0) + ' – ' + ((P.gSwpAt || 0) + (P.gSwpDur || 0)) + 's | ' + (P.gSwpShape || 'linear') + ' light sweep' + (P.gSwpReveal ? ' (grid visible only in the band)' : '') + ' |');
    L.push('| ' + (P.gIntroAt || 0) + 's | grid intro + X mask' + (P.gXMove && P.gXMove !== 'off' ? ' (' + P.gXMove + ')' : '') + ' |');
    L.push('| ' + (P.gRevMaskAt || 0) + ' – ' + ((P.gRevMaskAt || 0) + (P.gRevMaskDur || 0)) + 's | grid reveals outward from the mask |');
    L.push('| ' + (P.gUiAt || 0) + ' – ' + ((P.gUiAt || 0) + (P.gUiFade || 0)) + 's | UI fades up |');
  } else {
    L.push('| 0s | no tease: the hero plays its intro immediately |');
    L.push('| ' + (P.gUiAt || 0) + ' – ' + ((P.gUiAt || 0) + (P.gUiFade || 0)) + 's | UI fades up |');
  }
  L.push('');
  L.push('## 6. Overrides and notes');
  L.push('');
  L.push('- Per-page params: set `window.COOKED_PARAMS = { ... }` before the script. Partial objects');
  L.push('  are fine; anything you omit keeps its baked value.');
  L.push('- Scroll section: `window.SCALEX_SCROLL_TRIGGER = ".my-section"` before the script.');
  L.push('- Quality tier: `window.SCALEX_QUALITY = "low" | "high"` before the script.');
  L.push('- `prefers-reduced-motion` skips the opening and shows the settled state immediately.');
  L.push('- The engine loads three.js r128 and GSAP from cdnjs if they are not already present,');
  L.push('  and will not double-load them if Webflow already provides them.');
  L.push('');
  return L.join(nl);
}


/* Role shim appended to the built engine.
   preloader: publishes the handoff the site already awaits (window.ScaleXLoader.heroReady),
   runs the opening, then releases its WebGL context.
   hero: waits on that promise before playing its own entrance, so the two never overlap. */
function webflowEngine(role){
  const base = webflowEngineBase(role);
  if (!base) return '';
  // Each file gets its own closure. __scalexMain, __SCALEX_BAKED and __SCALEX_P are
  // top-level declarations; with two engines on one page the second parse silently
  // replaced the first's params and identity. Scoping them is what makes the pair safe.
  const wrap = (body) => '(function(){\n' + body + '\n}());\n';
  const q = JSON.stringify;
  if (role === 'preloader'){
    return wrap(base + [
      '',
      '/* --- preloader handoff: resolves window.ScaleXLoader.heroReady --- */',
      '(function(){',
      '  if (!window.ScaleXLoader){',
      '    var r; var p = new Promise(function(f){ r = f; });',
      '    window.ScaleXLoader = { heroReady: p, _resolve: r };',
      '  }',
      '  var done = false;',
      '  function finish(){',
      '    if (done) return; done = true;',
      '    var mine = window.SCALEX;   // capture before the hero mounts and replaces it',
      '    try { document.documentElement.classList.remove("sx-loading"); } catch(e){}',
      '    try { window.dispatchEvent(new CustomEvent("scalex:preloader-done")); } catch(e){}',
      '    if (window.ScaleXLoader._resolve) window.ScaleXLoader._resolve();',
      '    setTimeout(function(){',
      '      try { mine && mine.destroy && mine.destroy(); } catch(e){}',
      '    }, 400);',
      '  }',
      '  // the opening ends when its last beat does; read that from the baked params',
      '  var P = window.__SCALEX_P || {};',
      '  var ends = [ (P.gBlackAt||0),',
      '               (P.gSwpAt||0) + (P.gSwpDur||0),',
      '               (P.gIntroAt||0) + (P.gIntroDur||0),',
      '               (P.gRevealDelay||0) + (P.gRevealDur||0),',
      '               P.gRevMaskOn ? (P.gRevMaskAt||0) + (P.gRevMaskDur||0) : 0,',
      '               (P.gUiAt||0) + (P.gUiFade||0) ];',
      '  var span = 0; for (var i = 0; i < ends.length; i++) if (ends[i] > span) span = ends[i];',
      '  setTimeout(finish, Math.max(400, (span + 0.25) * 1000));',
      '  setTimeout(finish, 6000);   // fail-safe: a dead GPU must never strand the page',
      '}());',
      ''
    ].join('\n'));
  }
  return wrap(base + [
    '',
    '/* --- hero --- */',
    '/* The mount itself is gated on window.ScaleXLoader.heroReady in the bootstrap above,',
    '   so there is nothing to do here: the entrance plays once, when the loader is done,',
    '   and only one WebGL context is ever alive. */',
    ''
  ].join('\n'));
}


/* ---------- SHARED-ENGINE BUILD (3 files) -------------------------------------------------
   Matches the pattern already in the repo: a preset carries only data, the engine is loaded
   once and cached across pages. The self-contained pair is simpler to deploy but ships the
   engine twice; this mode is the one to use once both roles are live on the same page.

     scalex-engine.js            the engine, no params of its own
     scalex-preloader.preset.js  pushes the opening onto the queue
     scalex-hero.preset.js       pushes the hero onto the queue

   Presets push onto window.SCALEX_QUEUE, so load order between them does not matter and the
   engine drains whatever is present. __scalexMain takes its params as an argument, which is
   what lets one engine run two independent instances. */
const WF_ENGINE_NAME = 'scalex-engine.js';
const WF_PRE_PRESET  = 'scalex-preloader.preset.js';
const WF_HERO_PRESET = 'scalex-hero.preset.js';

function presetFile(role){
  const P0 = exportParams();
  if (role === 'preloader'){ P0.gTeaseOn = true; P0.ui = false; }
  else { P0.gTeaseOn = false; }
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  return '/*! ScaleX ' + role + ' preset — build ' + BUILD + ' — ' + stamp + '\n'
       + ' *  Data only. Load in any order; load ' + WF_ENGINE_NAME + ' after both.\n'
       + ' *  Re-export from the authoring build rather than editing by hand.\n'
       + ' */\n'
       + '(window.SCALEX_QUEUE = window.SCALEX_QUEUE || []).push({\n'
       + '  role: ' + JSON.stringify(role) + ',\n'
       + '  params: ' + JSON.stringify(P0) + '\n'
       + '});\n';
}

function sharedEngineFile(){
  if (!SELF_JS) return '';
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const body = SELF_JS.replace(/^\s+/, '')
    // params now arrive per instance instead of from a page-level global
    .replace('}, window.COOKED_PARAMS || {});', '}, __SX_ARGS.params || {});')
    // each instance publishes under its own namespace; only the hero owns window.SCALEX
    .replace('window.SCALEX = SX;',
             'window[__SX_ARGS.ns] = SX; if (__SX_ARGS.role !== "preloader") window.SCALEX = SX;')
    // later lines decorate the handle via window.SCALEX, which does not exist for the
    // preloader role. Point them at the local instance instead: same object, always defined.
    .replace(/window\.SCALEX\.(cookString|cookWebflow|build)\s*=/g, 'SX.$1 =')
    .replace(/if \(window\.SCALEX\) window\.SCALEX\./g, 'if (SX) SX.')
    .replace(/\/\*TESTPAGE_START\*\/[\s\S]*?\/\*TESTPAGE_END\*\//, '');

  const head =
    '/*! ScaleX engine — build ' + BUILD + ' — ' + stamp + '\n'
    + ' *  Shared WebGL engine. Carries no look of its own: every instance is described by a\n'
    + ' *  preset pushed onto window.SCALEX_QUEUE before this file loads.\n'
    + ' *\n'
    + ' *  <script src="scalex-preloader.preset.js" defer></' + 'script>\n'
    + ' *  <script src="scalex-hero.preset.js"      defer></' + 'script>\n'
    + ' *  <script src="scalex-engine.js"           defer></' + 'script>\n'
    + ' *\n'
    + ' *  Roles: "preloader" runs the opening, publishes window.ScaleXLoader.heroReady and\n'
    + ' *  tears itself down; "hero" waits on that promise, so one context is alive at a time.\n'
    + ' *  Also callable directly: window.ScaleXEngine.mount({ role, params }).\n'
    + ' */\n';

  const runtime = [
    '(function(){',
    '  var DEPS = [',
    '    ["THREE", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"],',
    '    ["gsap", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"],',
    '    ["ScrollTrigger", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"]',
    '  ];',
    '  function have(n){ return n === "ScrollTrigger"',
    '    ? !!(window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger))',
    '    : !!window[n]; }',
    '  function load(u){ return new Promise(function(res, rej){',
    '    var s = document.createElement("script"); s.src = u; s.async = false;',
    '    s.onload = res; s.onerror = function(){ rej(new Error("[ScaleX] could not load " + u)); };',
    '    document.head.appendChild(s);',
    '  }); }',
    '  function domReady(){ return document.readyState !== "loading" ? Promise.resolve()',
    '    : new Promise(function(r){ document.addEventListener("DOMContentLoaded", r, { once:true }); }); }',
    '  var ready = Promise.resolve();',
    '  DEPS.forEach(function(d){ ready = ready.then(function(){ return have(d[0]) ? null : load(d[1]); }); });',
    '  ready = ready.then(domReady);',
    '',
    '  function loaderAPI(){',
    '    if (!window.ScaleXLoader){',
    '      var r; var p = new Promise(function(f){ r = f; });',
    '      window.ScaleXLoader = { heroReady: p, _resolve: r };',
    '    }',
    '    return window.ScaleXLoader;',
    '  }',
    '',
    '  function runPreloader(args){',
    '    var L = loaderAPI();',
    '    __scalexMain(args);',
    '    var mine = window[args.ns];',
    '    var done = false;',
    '    function finish(){',
    '      if (done) return; done = true;',
    '      try { document.documentElement.classList.remove("sx-loading"); } catch(e){}',
    '      try { window.dispatchEvent(new CustomEvent("scalex:preloader-done")); } catch(e){}',
    '      if (L._resolve) L._resolve();',
    '      setTimeout(function(){ try { mine && mine.destroy && mine.destroy(); } catch(e){} }, 400);',
    '    }',
    '    var P = args.params || {};',
    '    var ends = [ (P.gBlackAt||0), (P.gSwpAt||0)+(P.gSwpDur||0),',
    '                 (P.gIntroAt||0)+(P.gIntroDur||0), (P.gRevealDelay||0)+(P.gRevealDur||0),',
    '                 P.gRevMaskOn ? (P.gRevMaskAt||0)+(P.gRevMaskDur||0) : 0,',
    '                 (P.gUiAt||0)+(P.gUiFade||0) ];',
    '    var span = 0; for (var i=0;i<ends.length;i++) if (ends[i] > span) span = ends[i];',
    '    setTimeout(finish, Math.max(400, (span + 0.25) * 1000));',
    '    setTimeout(finish, 6000);   // fail-safe: a dead GPU must never strand the page',
    '  }',
    '',
    '  function mount(opts){',
    '    opts = opts || {};',
    '    var role = opts.role === "preloader" ? "preloader" : "hero";',
    '    var args = { role: role, ns: role === "preloader" ? "SCALEX_PRE" : "SCALEX",',
    '                 params: opts.params || {} };',
    '    return ready.then(function(){',
    '      if (role === "preloader") return runPreloader(args);',
    '      var L = window.ScaleXLoader;',
    '      if (L && L.heroReady && L.heroReady.then) return L.heroReady.then(function(){ __scalexMain(args); });',
    '      __scalexMain(args);',
    '    }).catch(function(e){ console.error(e); });',
    '  }',
    '',
    '  // a preloader in the queue means the hero must wait, so register the promise NOW,',
    '  // before anything mounts, rather than when the preloader happens to start',
    '  var Q = window.SCALEX_QUEUE || [];',
    '  for (var i = 0; i < Q.length; i++) if (Q[i] && Q[i].role === "preloader") { loaderAPI(); break; }',
    '  Q.forEach(mount);',
    '  window.SCALEX_QUEUE = { push: mount };   // late presets still work',
    '  window.ScaleXEngine = { mount: mount, build: ' + JSON.stringify(BUILD) + ' };',
    '}());',
    ''
  ].join('\n');

  return head + 'function __scalexMain(__SX_ARGS){\n' + body + '\n}\n' + runtime;
}

function cookShared(){
  syncComp();
  const eng = sharedEngineFile();
  if (!eng){
    const n = $('cookNote');
    if (n) n.textContent = 'cannot read this script\u2019s own source, so the engine cannot be built.';
    return;
  }
  downloadBlob(new Blob([presetFile('preloader')], { type: 'application/javascript' }), WF_PRE_PRESET);
  setTimeout(() => downloadBlob(new Blob([presetFile('hero')], { type: 'application/javascript' }), WF_HERO_PRESET), 300);
  setTimeout(() => downloadBlob(new Blob([eng], { type: 'application/javascript' }), WF_ENGINE_NAME), 600);
  const tag = '<scr' + 'ipt src="https://YOUR-CDN/' + WF_PRE_PRESET + '" defer></scr' + 'ipt>\n'
            + '<scr' + 'ipt src="https://YOUR-CDN/' + WF_HERO_PRESET + '" defer></scr' + 'ipt>\n'
            + '<scr' + 'ipt src="https://YOUR-CDN/' + WF_ENGINE_NAME + '" defer></scr' + 'ipt>';
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tag).catch(() => {});
  const note = $('cookNote');
  if (note) note.textContent = 'baked shared engine (' + Math.round(eng.length / 1024) + ' kb) + 2 presets, build '
    + BUILD + '. three paste lines on your clipboard.';
}

function cookWebflow(){
  syncComp();
  const pre  = webflowEngine('preloader');
  const hero = webflowEngine('hero');
  if (!pre || !hero){
    const n = $('cookNote');
    if (n) n.textContent = 'cannot read this script\u2019s own source, so the engine files cannot be built.';
    return;
  }
  // Two files: the dev deploys the loader and the hero separately. Each carries its own
  // baked params, so neither can be shipped against the wrong look.
  downloadBlob(new Blob([pre],  { type: 'application/javascript' }), WF_PRE_NAME);
  setTimeout(() => downloadBlob(new Blob([hero], { type: 'application/javascript' }), WF_JS_NAME), 400);
  const tag = '<scr' + 'ipt src="https://YOUR-CDN/' + WF_PRE_NAME + '" defer></scr' + 'ipt>\n'
            + '<scr' + 'ipt src="https://YOUR-CDN/' + WF_JS_NAME + '" defer></scr' + 'ipt>';
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tag).catch(() => {});
  const note = $('cookNote');
  if (note) note.textContent = 'baked ' + WF_PRE_NAME + ' (' + Math.round(pre.length / 1024)
    + ' kb) + ' + WF_JS_NAME + ' (' + Math.round(hero.length / 1024) + ' kb), build ' + BUILD
    + '. both paste lines on your clipboard.';
}

if ($('cookBtn')) $('cookBtn').addEventListener('click', cookReview);
if ($('cookWfBtn')) $('cookWfBtn').addEventListener('click', cookWebflow);
if ($('cookSharedBtn')) $('cookSharedBtn').addEventListener('click', cookShared);
if ($('cookTestBtn')) $('cookTestBtn').addEventListener('click', cookTestPage);
if ($('buildNote')) $('buildNote').textContent = 'build ' + BUILD;
// built here rather than from refreshPanel: that runs before these declarations are
// initialised, so the call was silently doing nothing.
if (HAS_CONSOLE){ try { buildTimeline(); layoutTimeline(); } catch(e){ console.warn('timeline', e); } }
window.SCALEX.cookString = cookString;
window.SCALEX.cookWebflow = { engine: webflowEngine, testPage: testPageString, sharedEngine: sharedEngineFile, preset: presetFile };
window.SCALEX.build = BUILD;

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
  // C was missing here, so every GRID / C tweak was dropped on save. All three now.
  const data = { version: 1, P: { ...P }, COMP: { A: { ...COMP.A }, B: { ...COMP.B }, C: { ...COMP.C } } };
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), 'scalex-preset.json');
}
function applyLoadedData(data, bakeAuthoritative){
  // legacy: presets/bakes from _47 carry a single `gGridOp`. Map it onto both regions
  // so their intended grid opacity survives instead of silently resetting to 1.
  const migrate = o => {
    if (!o || typeof o !== 'object') return;
    if (o.gGridOp !== undefined){
      if (o.gGridOpIn === undefined)  o.gGridOpIn  = o.gGridOp;
      if (o.gGridOpOut === undefined) o.gGridOpOut = o.gGridOp;
      delete o.gGridOp;
    }
    // a single pulse gain plus a region segment became one gain per region
    if (o.gPGain !== undefined && o.gPGainIn === undefined){
      o.gPGainIn = o.gPGain; o.gPGainOut = o.gPGain;   // gPRegion still gates, unchanged
      delete o.gPGain;
    }
  };
  migrate(data.P);
  if (data.COMP) Object.keys(data.COMP).forEach(k => migrate(data.COMP[k]));
  // seed keys the saved file predates, on the incoming data and on the comps it lands in
  fillDefaults(data.P);
  if (data.COMP) Object.keys(data.COMP).forEach(k => fillDefaults(data.COMP[k]));
  if (data.COMP){
    Object.keys(data.COMP).forEach(k => {
      if (!COMP[k] || !data.COMP[k]) return;
      Object.assign(COMP[k], data.COMP[k]);
      if (data.COMP[k].lensFx) COMP[k].lensFx = { ...data.COMP[k].lensFx };
    });
  }
  if (data.P){ Object.assign(P, data.P); }
  if (!P.lensFx || typeof P.lensFx !== 'object') P.lensFx = { reveal:true, brighten:false, invert:false, desat:false, ripple:false, condense:false };
  else P.lensFx = { ...P.lensFx };
  if (bakeAuthoritative){
    // HTML import: the bake's live state (COOKED_PARAMS) is authoritative — stash it
    // into its comp slot so switching comps round-trips the imported look.
    syncComp();
  } else {
    // JSON preset: the active comp's stored set is authoritative (matches SAVE semantics)
    Object.assign(P, COMP[P.comp] || COMP.A);
    if (COMP[P.comp] && COMP[P.comp].lensFx) P.lensFx = { ...COMP[P.comp].lensFx };
  }
  fillDefaults(P);
  Object.values(COMP).forEach(fillDefaults);
  compA.visible = P.comp === 'A';
  compB.visible = P.comp === 'B';
  document.body.classList.toggle('mode-C', P.comp === 'C');
  document.body.classList.toggle('comp-B', P.comp === 'B');
  rebuildStacks();
  applyBlob();
  refreshPanel();
}

// Pull the per-comp COMP literal out of a baked artefact, if it carries one. Both the
// self-contained HTML bake and the Webflow .js deliverable embed the same declaration.
function extractCOMP(text){
  const cm = text.match(/const COMP = \{[\s\S]*?\n\};/);
  if (!cm) return null;
  try { return (new Function('return ' + cm[0].replace(/^const COMP = /, '').replace(/;\s*$/, '')))(); }
  catch(e){ console.warn('import: COMP literal parse failed, importing P only', e); return null; }
}

/* LOAD accepts three shapes, all of which the tool itself produces:
     .json  a saved preset            -> { P, COMP }, the active comp's set is authoritative
     .html  a baked standalone export -> window.COOKED_PARAMS + COMP literal
     .js    the Webflow deliverable   -> var __SCALEX_BAKED + COMP literal
   The two baked shapes are treated as authoritative for their own comp, so the imported
   look survives a comp switch instead of being overwritten by whatever was stashed. */
function loadPreset(file){
  const r = new FileReader();
  r.onload = () => {
    try {
      const text = r.result;
      const name = (file.name || '').toLowerCase();
      // Trust the extension first. Content sniffing alone is unsafe here: a baked HTML
      // page embeds the Webflow generator, so it literally contains the string
      // "var __SCALEX_BAKED =" and would be misread as a deliverable.
      let kind = /\.json$/.test(name) ? 'json'
               : /\.html?$/.test(name) ? 'html'
               : /\.js$/.test(name)    ? 'js'
               : null;
      if (!kind){
        if (/^\s*[<]/.test(text) || /<!DOCTYPE/i.test(text)) kind = 'html';
        else if (/var\s+__SCALEX_BAKED\s*=\s*\{/.test(text)) kind = 'js';
        else kind = 'json';
      }
      const isJs = kind === 'js', isHtml = kind === 'html';

      if (isJs){
        const pm = text.match(/var\s+__SCALEX_BAKED\s*=\s*(\{[\s\S]*?\});\s*\n/);
        if (!pm){ console.error('js import: no __SCALEX_BAKED found — not a ScaleX deliverable?'); return; }
        const data = { P: JSON.parse(pm[1]) };
        const comp = extractCOMP(text); if (comp) data.COMP = comp;
        applyLoadedData(data, true);
      } else if (isHtml){
        const pm = text.match(/window\.COOKED_PARAMS=(\{.*?\});/);
        if (!pm){ console.error('html import: no COOKED_PARAMS found — not a baked export?'); return; }
        const data = { P: JSON.parse(pm[1]) };
        const comp = extractCOMP(text); if (comp) data.COMP = comp;
        applyLoadedData(data, true);
      } else {
        applyLoadedData(JSON.parse(text), false);
      }
    } catch(err){ console.error('preset load failed', err); }
  };
  r.readAsText(file);
}
if ($('saveBtn')) $('saveBtn').addEventListener('click', savePreset);
if ($('loadBtn')) $('loadBtn').addEventListener('click', () => $('loadFile')?.click());
if ($('loadFile')) $('loadFile').addEventListener('change', e => { const f = e.target.files[0]; if (f) loadPreset(f); e.target.value=''; });

let gizmoGrab = false;   // true while an on-screen handle is being dragged (freezes camera/hover)

/* ---------- on-screen transform gizmo (MOTION CONSOLE only; never baked) ----------
   AE-style handles: 3 translate arrows + 3 rotate arcs (in-quadrant, never crossing
   the arrows), anchored to the active
   comp's primary stack group at the START or END pose. Dragging writes straight
   into the existing p0/p1 (position) and r0/r1 (rotation) params — no new state,
   so BAKE stays clean. Rendered in its own pass after the post pipeline (depth
   cleared) so the dither/glow never touch it. Entire block is gated behind
   !window.COOKED_PARAMS, so a baked export never builds it. */
let GIZMO = null;
if (!BAKED_PARAMS){
  const AX = ['x','y','z'];
  const AXVEC = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)];
  const COLS = [0xff4f63, 0x4fe08a, 0x4f8dff];   // X red, Y green, Z blue (AE convention)
  const POSK = { start:['p0x','p0y','p0z'], end:['p1x','p1y','p1z'] };
  const ROTK = { start:['r0x','r0y','r0z'], end:['r1x','r1y','r1z'] };
  const ENDS = ['start','end'];
  const DIM  = 0.28;   // opacity of the inactive endpoint's handles

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
  // per-handle materials are transparent so the inactive endpoint can be dimmed
  const solid = col => new THREE.MeshBasicMaterial({ color: col, fog:false, transparent:true, opacity:1 });

  const RING_R = 1.34, ARROW_REACH = 0.95;
  // AE-style rotation arcs: each arc lives in the quadrant BETWEEN two axes (never on
  // an axis), so it can't overlap the straight position arrows. PAD trims the arc ends
  // back from the axes; the grabbable range is [PAD, HALF_PI - PAD].
  const HALF_PI = Math.PI / 2, ARC_PAD = HALF_PI * 0.26, ARC_SWEEP = HALF_PI - 2 * ARC_PAD;
  // rotation about axis i sweeps from positive-U toward positive-V (matches the drag frame)
  const UIDX = [1, 2, 0], VIDX = [2, 0, 1];
  // orient a group so its local +X->U, +Y->V, +Z->axis-i (arc plane = U,V; normal = i)
  function arcOrient(obj, i){
    const bx = AXVEC[UIDX[i]].clone(), by = AXVEC[VIDX[i]].clone();
    const bz = bx.clone().cross(by);
    obj.setRotationFromMatrix(new THREE.Matrix4().makeBasis(bx, by, bz));
  }

  /* Both blend endpoints get their own handle set. The ACTIVE target (EDIT START /
     EDIT END) is drawn full-strength and takes tie-breaks; the other is dimmed but
     still pickable — grabbing it flips the active target. A spine line links the two
     hubs so the interpolation axis stays legible even when one endpoint drifts under
     the panel or off-screen (which is exactly what the comp-B end pose does). */
  function buildGizmo(){
    const scene = new THREE.Scene();
    const parts = {};   // 'start'|'end' -> { root, vis }

    function orient(obj, axisIdx, isRing){
      if (isRing){
        if (axisIdx === 0) obj.rotation.y =  Math.PI / 2;      // ring normal -> X
        else if (axisIdx === 1) obj.rotation.x = Math.PI / 2;  // ring normal -> Y
      } else {
        if (axisIdx === 0) obj.rotation.z = -Math.PI / 2;      // +Y -> +X
        else if (axisIdx === 2) obj.rotation.x = Math.PI / 2;  // +Y -> +Z
      }
    }
    function buildSet(){
      const root = new THREE.Group();
      scene.add(root);
      const vis = {};
      AX.forEach((axis, i) => {
        const col = COLS[i];
        // translate arrow
        const arrow = new THREE.Group();
        const shaftLen = 0.62, start = 0.1;
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, shaftLen, 8), solid(col));
        shaft.position.y = start + shaftLen / 2;
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 14), solid(col));
        tip.position.y = start + shaftLen + 0.09;
        // position arrows paint over the rotation arcs so they're never visually hidden
        [shaft, tip].forEach(m => { m.material.depthTest = false; m.renderOrder = 3; });
        arrow.add(shaft, tip);
        orient(arrow, i, false);
        root.add(arrow);
        vis['move:' + axis] = { mesh: [shaft, tip], base: col };
        // rotate arc (AE-style): a padded quarter-arc in the U/V quadrant + a grab blob
        // at its midpoint, so nothing sits on top of the position arrows
        const arcHolder = new THREE.Group();
        const arc = new THREE.Mesh(new THREE.TorusGeometry(RING_R, 0.02, 8, 40, ARC_SWEEP), solid(col));
        arc.rotation.z = ARC_PAD;                 // shift arc start off the U axis into the gap
        const mid = new THREE.Vector3(Math.cos(HALF_PI / 2), Math.sin(HALF_PI / 2), 0).multiplyScalar(RING_R);
        const blob = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 12), solid(col));
        blob.position.copy(mid);                  // centered at 45deg, on the arc
        [arc, blob].forEach(m => { m.renderOrder = 1; });
        arcHolder.add(arc, blob);
        arcOrient(arcHolder, i);
        root.add(arcHolder);
        vis['rotate:' + axis] = { mesh: [arc, blob], base: col };
      });
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), solid(0xffffff));
      hub.material.depthTest = false; hub.renderOrder = 4;
      root.add(hub);
      vis['hub'] = { mesh: [hub], base: 0xffffff };
      return { root, vis };
    }
    ENDS.forEach(k => { parts[k] = buildSet(); });

    const spineGeo = new THREE.BufferGeometry();
    spineGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
    const spine = new THREE.Line(spineGeo, new THREE.LineDashedMaterial({ color: 0x8f86c9, transparent:true, opacity:0.4, dashSize:0.22, gapSize:0.16 }));
    spine.frustumCulled = false;
    scene.add(spine);

    const G = {
      scene, parts, spine,
      enabled: true, target: 'start', drag: null, ray: null,
      hovered: null,               // 'end:kind:axis'
      gap: { start: 1, end: 1 },

      primary(){ return (P.comp === 'A' ? compA : compB).children[0] || null; },
      root(){ return parts[this.target].root; },

      anchorWorld(which){
        const grp = this.primary(); if (!grp) return null;
        grp.updateWorldMatrix(true, false);
        const gapMul = (grp.userData.blend && grp.userData.blend.gapMul) || 1;
        this.gap[which] = gapMul;
        const k = POSK[which];
        const local = new THREE.Vector3(P[k[0]] * gapMul, P[k[1]] * gapMul, -P[k[2]] * gapMul);
        return local.applyMatrix4(grp.matrixWorld);
      },

      _toPx(w){
        const el = renderer.domElement, W = el.clientWidth, H = el.clientHeight;
        const v = w.clone().project(camera);
        return [(v.x*0.5+0.5)*W, (-v.y*0.5+0.5)*H, v.z];
      },

      // screen-space pick across BOTH endpoints; nearest handle wins, active endpoint
      // gets a small bias so overlapping handles resolve to the one you're editing
      pickAt(ndc){
        const el = renderer.domElement, W = el.clientWidth, H = el.clientHeight;
        const cx = (ndc.x*0.5+0.5)*W, cy = (-ndc.y*0.5+0.5)*H;
        const segDist = (ax, ay, bx, by) => {
          const dx = bx-ax, dy = by-ay, l2 = dx*dx + dy*dy;
          let t = l2 > 0 ? ((cx-ax)*dx + (cy-ay)*dy) / l2 : 0; t = Math.max(0, Math.min(1, t));
          return Math.hypot(cx - (ax+t*dx), cy - (ay+t*dy));
        };
        let best = null, bestScore = Infinity, bestRaw = Infinity;
        // rotation handles carry a small penalty so a position arrow wins when both are
        // under the cursor (e.g. a foreshortened X arrow crowded by two arc ends)
        const ROT_PEN = 6;
        ENDS.forEach(which => {
          const root = parts[which].root;
          if (!root.visible) return;
          const S = root.scale.x;
          const r = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)]
                      .map(v => v.applyQuaternion(root.quaternion).normalize());
          const eBias = (which === this.target) ? 0 : 4;
          for (let i = 0; i < 3; i++){
            const a = this._toPx(root.position.clone().add(r[i].clone().multiplyScalar(0.12 * S)));
            const b = this._toPx(root.position.clone().add(r[i].clone().multiplyScalar(ARROW_REACH * S)));
            const dM = (a[2] < 1 && b[2] < 1) ? segDist(a[0], a[1], b[0], b[1]) : Infinity;
            { const sc = dM + eBias; if (sc < bestScore){ bestScore = sc; bestRaw = dM; best = { end:which, kind:'move', axis:AX[i] }; } }
            const u = r[UIDX[i]], v = r[VIDX[i]];
            let prev = null;
            for (let s = 0; s <= 24; s++){
              const th = ARC_PAD + ARC_SWEEP * (s / 24);   // only the visible padded arc is grabbable
              const wp = root.position.clone()
                .add(u.clone().multiplyScalar(Math.cos(th) * RING_R * S))
                .add(v.clone().multiplyScalar(Math.sin(th) * RING_R * S));
              const pp = this._toPx(wp);
              if (prev && prev[2] < 1 && pp[2] < 1){
                const dR = segDist(prev[0], prev[1], pp[0], pp[1]);
                const sc = dR + eBias + ROT_PEN;
                if (sc < bestScore){ bestScore = sc; bestRaw = dR; best = { end:which, kind:'rotate', axis:AX[i] }; }
              }
              prev = pp;
            }
          }
        });
        return (best && bestRaw <= 15) ? best : null;
      },

      updateAnchor(){
        ENDS.forEach(which => {
          const root = parts[which].root;
          const world = this.anchorWorld(which);
          if (!world){ root.visible = false; return; }
          root.visible = true;
          root.position.copy(world);
          const pos = new THREE.Vector3(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
          this.primary().matrixWorld.decompose(pos, q, sc);
          root.quaternion.copy(q);
          const dist = camera.position.distanceTo(world);
          root.scale.setScalar(Math.max(0.45, dist * 0.07));
          const op = (which === this.target) ? 1 : DIM;
          Object.keys(parts[which].vis).forEach(key => {
            parts[which].vis[key].mesh.forEach(m => { m.material.opacity = op; });
          });
        });
        const pa = parts.start.root.position, pb = parts.end.root.position;
        const arr = this.spine.geometry.attributes.position.array;
        arr[0]=pa.x; arr[1]=pa.y; arr[2]=pa.z; arr[3]=pb.x; arr[4]=pb.y; arr[5]=pb.z;
        this.spine.geometry.attributes.position.needsUpdate = true;
        this.spine.computeLineDistances();   // required for the dashed material
      },

      axisDir(i){ return AXVEC[i].clone().applyQuaternion(this.root().quaternion).normalize(); },

      paint(which, key, col){ const v = parts[which].vis[key]; if (v) v.mesh.forEach(m => m.material.color.setHex(col)); },
      resetAll(){ ENDS.forEach(w => Object.keys(parts[w].vis).forEach(key => this.paint(w, key, parts[w].vis[key].base))); },
      hover(ud){
        const key = ud ? ud.end + ':' + ud.kind + ':' + ud.axis : null;
        if (key === this.hovered) return;
        this.resetAll(); this.hovered = key;
        if (this.drag) return;
        if (ud) this.paint(ud.end, ud.kind + ':' + ud.axis, 0xffffff);
        document.body.style.cursor = key ? 'pointer' : '';
      },

      setTarget(which){
        if (this.target === which) return;
        this.target = which;
        const seg = document.getElementById('gizTargetSeg');
        if (seg) seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.giz === which));
      },

      beginDrag(ud){
        this.setTarget(ud.end);              // grabbing an endpoint makes it the active one
        const root = this.root();
        const i = AX.indexOf(ud.axis);
        gizmoGrab = true;
        this.resetAll(); this.paint(ud.end, ud.kind + ':' + ud.axis, 0xffffff);
        const gapMul = this.gap[ud.end] || 1;
        if (ud.kind === 'move'){
          const A = this.axisDir(i);
          const posKey = POSK[this.target][i];
          const s0 = lineParam(this.ray.origin, this.ray.direction, root.position.clone(), A);
          this.drag = { kind:'move', axis:ud.axis, axisVec:A, pivot:root.position.clone(),
                        posKey, base:P[posKey], s0, gapMul };
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
        parts.start.root.visible = on; parts.end.root.visible = on; this.spine.visible = on;
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
    GIZMO.setTarget(b.dataset.giz);
  });
  const gizChk = document.getElementById('uGizmo');
  if (gizChk) gizChk.addEventListener('change', e => { GIZMO.enabled = e.target.checked; if (!e.target.checked) GIZMO.endDrag(); });

  if (window.SCALEX) window.SCALEX.gizmo = GIZMO;   // debug handle (null in baked export)
}

/* ---------- loop ---------- */
// Active time is advanced by the scheduler, including idle gaps but excluding suspension.
const clock = { elapsedTime: 0 };
let frames = 0, fpsT = 0;

/* ---------- pulse system (GRID / PULSE) ----------
   A four-slot ring buffer feeding uPulse. Oldest slot is recycled, so rapid clicks stack
   overlapping fronts instead of cancelling. Origins are stored normalised (0..1, y-up to
   match gl_FragCoord) so a resize never moves a pulse that is already travelling.
   No GSAP: the front profile is analytic in the shader, which is smoother than a tween
   and allocates nothing per frame.                                                     */
function firePulse(nx, ny, strength){
  if (PRM || !(strength > 0)) return;
  if (!__inTick) syncIdleTime();
  const v = gridMat.uniforms.uPulse.value[pulseHead++ % PULSE_N];
  v.set(nx, ny, clock.elapsedTime, strength);
  wakeRender();
}
/* Where a pulse is born, normalised 0..1 and y-UP to match gl_FragCoord. One function, so
   the click, the console button and the auto-beat can never disagree about the origin.
     mask   - the X itself, wherever the mask has drifted to
     cursor - the raw pointer (falls back to the mask when there is no pointer, e.g. touch)
     fixed  - the anchor, placed by the on-screen gizmo or by the two sliders             */
function pulseOrigin(){
  const cw = renderer.domElement.width || 1, ch = renderer.domElement.height || 1;
  if (P.gPFrom === 'fixed'){ const a = anchorXY(); return [a[0], 1 - a[1]]; }   // anchor is stored y-DOWN
  if (P.gPFrom === 'cursor' && P.gMouseOn && mouse.px > -9000) return [mouse.px / cw, mouse.py / ch];
  return [(gLag.mpx < -9000) ? 0.5 : gLag.mpx / cw, (gLag.mpy < -9000) ? 0.5 : gLag.mpy / ch];
}
function pulseNow(strength){ const o = pulseOrigin(); firePulse(o[0], o[1], strength); }
function firePulseAtClient(cx, cy, strength){
  firePulse(cx / Math.max(1, window.innerWidth), 1 - cy / Math.max(1, window.innerHeight), strength);
}
// click / tap. The listener sits on the canvas, so presses that land on real navigation
// in a Webflow build never reach it, and nothing needs guarding against there.
renderer.domElement.addEventListener('pointerdown', e => {
  if (P.comp !== 'C' || P.gPTrig === 'off' || P.gPTrig === 'auto') return;
  if (P.gPFrom === 'cursor') firePulseAtClient(e.clientX, e.clientY, 1);   // where you pressed
  else pulseNow(1);
}, { passive:true });
if ($('pulseBtn')) $('pulseBtn').addEventListener('click', () => pulseNow(1));

/* ---------- FIXED-origin anchor gizmo (console only) ------------------------------------
   A draggable crosshair for placing the pulse origin by eye, because typing two normalised
   numbers to line a wavefront up with a headline is not a design workflow. Built as a DOM
   handle rather than drawn into the canvas: it needs no render-loop budget, it is precise
   at the pixel, and it disappears from every bake for free (HAS_CONSOLE is false there).  */
function applyAnchor(){
  if (!HAS_CONSOLE) return;
  if (!anchorEl){
    anchorEl = document.createElement('div');
    anchorEl.id = 'pulseAnchor';
    anchorEl.title = 'pulse origin — drag to place';
    anchorEl.appendChild(document.createElement('span'));
    document.body.appendChild(anchorEl);
    let dragging = false;
    const move = e => {
      if (!dragging) return;
      useFixedOrigin();
      P.gPAnchorX = Math.min(1, Math.max(0, e.clientX / Math.max(1, window.innerWidth)));
      P.gPAnchorY = Math.min(1, Math.max(0, e.clientY / Math.max(1, window.innerHeight)));
      applyAnchor();
      BINDERS.forEach(b => { if (b.key === 'gPAnchorX' || b.key === 'gPAnchorY') b.refresh(); });
    };
    anchorEl.addEventListener('pointerdown', e => {
      dragging = true; anchorEl.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation();
    });
    anchorEl.addEventListener('pointermove', move);
    anchorEl.addEventListener('pointerup', e => { dragging = false; anchorEl.releasePointerCapture(e.pointerId); });
    anchorEl.addEventListener('pointercancel', () => { dragging = false; });
  }
  const a = anchorXY();
  anchorEl.style.left = (a[0] * 100) + '%';
  anchorEl.style.top  = (a[1] * 100) + '%';
  // Shown whenever the handle is enabled, NOT only in FIXED mode. Gating it on the mode
  // made it invisible exactly when someone is looking for it, and left the two sliders
  // silently inert. Touching either now selects FIXED, because that is what touching them
  // means; the segment updates so it is a visible switch and not a hidden one.
  anchorEl.classList.toggle('on', gridLive() && !!P.gPAnchorOn);
  anchorEl.classList.toggle('idle', P.gPFrom !== 'fixed');
}
// `front start` is superseded while X EDGE is armed. Dim the row rather than leave a live
// slider that silently does nothing.
function applyBirthState(){
  const row = $('gPStartRow'); if (!row) return;
  row.classList.toggle('dim', P.gPBirth === 'edge');
}

/* ---------- ease curve editor (console only) ---------------------------------------------
   A graph editor for the grid intro ease, in the shape motion people already use: the curve,
   its two control handles on tangent lines from the endpoints, and a playhead that runs the
   curve while the intro plays so the shape and the motion are visibly the same object.
   In POWER mode it still draws the real curve, so the two exponent sliders finally have a
   picture; touching a handle switches to CURVE and seeds the bezier from what was on screen,
   so the switch is continuous rather than a jump.                                          */
const EASE_PRESETS = {
  linear:[0,0,1,1], in:[0.42,0,1,1], out:[0,0,0.58,1],
  inout:[0.42,0,0.58,1], expo:[0.16,1,0.3,1], back:[0.34,1.56,0.64,1]
};
/* One editor was fine. Two copies of it would drift apart the first time either was
   touched, so the whole thing is a factory bound to a param set: which keys hold the mode
   and the four handles, and which function evaluates the curve for real. The grid editor
   and the mask editor are then the same code with different wiring, and a fix to one is a
   fix to both.                                                                            */
function makeCurveEditor(cfg){
  const ed = { cfg, playhead: -1 };
  const K = cfg.keys;                       // {mode, c1x, c1y, c2x, c2y}
  // Fit the drawing box to what the curve actually spans, so an overshoot is visible
  // instead of drawn off the top edge.
  function bounds(){
    let lo = 0, hi = 1;
    for (let i = 0; i <= 64; i++){ const y = cfg.eval(i / 64); if (y < lo) lo = y; if (y > hi) hi = y; }
    if (P[K.mode] === 'curve'){
      lo = Math.min(lo, P[K.c1y], P[K.c2y]); hi = Math.max(hi, P[K.c1y], P[K.c2y]);
    }
    const pad = 0.06 * Math.max(1e-3, hi - lo);
    return { lo: lo - pad, hi: hi + pad };
  }
  ed.draw = function(){
    const cv = $(cfg.canvas); if (!cv) return;
    const g = cv.getContext('2d'), W = cv.width, H = cv.height, M = 26;
    const B = bounds();
    const X = u => M + u * (W - 2 * M);
    const Y = v => H - M - ((v - B.lo) / (B.hi - B.lo)) * (H - 2 * M);
    g.clearRect(0, 0, W, H);
    g.lineWidth = 1;
    g.strokeStyle = 'rgba(255,255,255,.07)';
    for (let i = 0; i <= 4; i++){ g.beginPath(); g.moveTo(X(i / 4), Y(B.lo)); g.lineTo(X(i / 4), Y(B.hi)); g.stroke(); }
    g.strokeStyle = 'rgba(255,255,255,.16)';
    [0, 1].forEach(v => { g.beginPath(); g.moveTo(X(0), Y(v)); g.lineTo(X(1), Y(v)); g.stroke(); });
    const curve = P[K.mode] === 'curve';
    const col = cfg.color;
    if (curve){
      g.strokeStyle = col + '80'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(X(0), Y(0)); g.lineTo(X(P[K.c1x]), Y(P[K.c1y])); g.stroke();
      g.beginPath(); g.moveTo(X(1), Y(1)); g.lineTo(X(P[K.c2x]), Y(P[K.c2y])); g.stroke();
    }
    g.strokeStyle = curve ? col : col + '8c';
    g.lineWidth = 2.5; g.beginPath();
    for (let i = 0; i <= 160; i++){
      const u = i / 160, v = cfg.eval(u);
      i ? g.lineTo(X(u), Y(v)) : g.moveTo(X(u), Y(v));
    }
    g.stroke();
    if (curve){
      g.fillStyle = col;
      [[P[K.c1x], P[K.c1y]], [P[K.c2x], P[K.c2y]]].forEach(pt => {
        g.beginPath(); g.arc(X(pt[0]), Y(pt[1]), 7, 0, 6.2832); g.fill();
      });
    }
    const pt = ed.playhead;
    if (pt >= 0 && pt <= 1){
      g.fillStyle = '#7CE0C0';
      g.beginPath(); g.arc(X(pt), Y(cfg.eval(pt)), 4.5, 0, 6.2832); g.fill();
    }
  };
  // Fit a bezier to whatever is currently drawn, so switching to CURVE lands ON the shape
  // rather than near it. For any fixed pair of x handles the two y values are a plain 2x2
  // least-squares solve, so the x pair is swept over a coarse grid and the best wins.
  ed.seed = function(){
    const SAMP = 48;
    let best = null;
    for (let i = 1; i <= 9; i++){
      const x1 = i * 0.05;
      for (let j = 1; j <= 9; j++){
        const x2 = 0.55 + j * 0.05;
        let a11 = 0, a12 = 0, a22 = 0, r1 = 0, r2 = 0;
        const ts = [], tg = [];
        for (let k = 1; k < SAMP; k++){
          const x = k / SAMP, t = bezSolve(x, x1, x2);
          ts.push(t); tg.push(cfg.eval(x) - t * t * t);
        }
        for (let k = 0; k < ts.length; k++){
          const t = ts[k], u = 3 * (1 - t) * (1 - t) * t, v = 3 * (1 - t) * t * t;
          a11 += u * u; a12 += u * v; a22 += v * v; r1 += u * tg[k]; r2 += v * tg[k];
        }
        const det = a11 * a22 - a12 * a12;
        if (Math.abs(det) < 1e-9) continue;
        const y1 = ( r1 * a22 - r2 * a12) / det, y2 = (-r1 * a12 + r2 * a11) / det;
        let err = 0;
        for (let k = 0; k < ts.length; k++){
          const t = ts[k];
          const y = 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
          const d = Math.abs(y - (tg[k] + t * t * t));
          if (d > err) err = d;
        }
        if (!best || err < best.err) best = { x1, y1, x2, y2, err };
      }
    }
    if (!best){ P[K.c1x] = 1/3; P[K.c1y] = 1/3; P[K.c2x] = 2/3; P[K.c2y] = 2/3; return; }
    P[K.c1x] = +best.x1.toFixed(3); P[K.c1y] = +best.y1.toFixed(3);
    P[K.c2x] = +best.x2.toFixed(3); P[K.c2y] = +best.y2.toFixed(3);
  };
  ed.setMode = function(mode, seed){
    if (mode === 'curve' && P[K.mode] !== 'curve' && seed) ed.seed();
    P[K.mode] = mode;
    document.querySelectorAll('#' + cfg.modeSeg + ' button').forEach(x => x.classList.toggle('on', x.dataset.cmode === mode));
    if (cfg.onChange) cfg.onChange();
    ed.draw();
  };
  ed.refresh = function(){
    document.querySelectorAll('#' + cfg.modeSeg + ' button').forEach(x => x.classList.toggle('on', x.dataset.cmode === P[K.mode]));
    ed.draw();
  };
  const cv = $(cfg.canvas);
  if (cv){
    let drag = 0;
    const toXY = e => {
      const r = cv.getBoundingClientRect(), M = 26, W = cv.width, H = cv.height, B = bounds();
      const px = (e.clientX - r.left) / r.width * W, py = (e.clientY - r.top) / r.height * H;
      return [ (px - M) / (W - 2 * M), B.lo + (H - M - py) / (H - 2 * M) * (B.hi - B.lo) ];
    };
    const pick = e => {
      const [u, v] = toXY(e);
      const d1 = Math.hypot(u - P[K.c1x], v - P[K.c1y]), d2 = Math.hypot(u - P[K.c2x], v - P[K.c2y]);
      return (Math.min(d1, d2) > 0.16) ? 0 : (d1 <= d2 ? 1 : 2);
    };
    const apply = e => {
      const [u, v] = toXY(e);
      // x stays inside 0..1 or the bezier stops being a function of time; y runs free so
      // the curve can overshoot, which is what the power ease could never do
      const cx = Math.min(1, Math.max(0, u)), cy = Math.min(2, Math.max(-1, v));
      if (drag === 1){ P[K.c1x] = +cx.toFixed(3); P[K.c1y] = +cy.toFixed(3); }
      else           { P[K.c2x] = +cx.toFixed(3); P[K.c2y] = +cy.toFixed(3); }
      if (cfg.onChange) cfg.onChange();
      ed.draw();
    };
    cv.addEventListener('pointerdown', e => {
      // First press in POWER arms CURVE and shows the handles; it must NOT also fling one to
      // the cursor. After that only a press near a handle grabs it, so the graph can be read
      // without being edited.
      if (P[K.mode] !== 'curve'){ ed.setMode('curve', true); e.preventDefault(); return; }
      drag = pick(e);
      if (!drag) return;
      try { cv.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault(); apply(e);
    });
    cv.addEventListener('pointermove', e => { if (drag) apply(e); });
    const stop = e => { drag = 0; try { cv.releasePointerCapture(e.pointerId); } catch (_) {} };
    cv.addEventListener('pointerup', stop);
    cv.addEventListener('pointercancel', stop);
  }
  if ($(cfg.modeSeg)) $(cfg.modeSeg).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    ed.setMode(b.dataset.cmode, true);
    replayIntro();
  });
  if ($(cfg.preSeg)) $(cfg.preSeg).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const c = EASE_PRESETS[b.dataset.cpre]; if (!c) return;
    P[K.c1x] = c[0]; P[K.c1y] = c[1]; P[K.c2x] = c[2]; P[K.c2y] = c[3];
    ed.setMode('curve', false);
    replayIntro();
  });
  return ed;
}
// THE SMALL x: the tile field, the field slide and the expansion. Its curve feeds the
// shader through the LUT, because the tiles ease per fragment.
const gridCurveEd = makeCurveEditor({
  canvas:'easeCurve', modeSeg:'gEaseModeSeg', preSeg:'gEasePreSeg', color:'#A78BFA',
  keys:{ mode:'gEaseMode', c1x:'gC1x', c1y:'gC1y', c2x:'gC2x', c2y:'gC2y' },
  eval: p => gridEase(p),
  onChange: () => rebuildEaseLUT()
});
// THE BIG X: the mask reveal. Everything it drives (opacity, scale-in, spin-in, and the
// mask's entry travel) is computed on the CPU, so this one needs no LUT and no shader path.
const maskCurveEd = makeCurveEditor({
  canvas:'maskCurve', modeSeg:'gMEaseModeSeg', preSeg:'gMEasePreSeg', color:'#7CE0C0',
  keys:{ mode:'gMEaseMode', c1x:'gMC1x', c1y:'gMC1y', c2x:'gMC2x', c2y:'gMC2y' },
  eval: p => maskEase(p)
});
CURVES.grid = gridCurveEd; CURVES.mask = maskCurveEd;

/* ---------- live pulse-origin readout (console only) -------------------------------------
   Three FROM modes can resolve to nearly the same point (an anchor parked on the mask centre
   does exactly that), and then the segment looks dead when it is working perfectly. This
   marks where the NEXT pulse is actually born, every frame, so the question is answered by
   looking instead of by firing and guessing.                                               */
let pulseLiveEl = null, pulseLiveLast = '';
function applyPulseLive(){
  if (!HAS_CONSOLE) return;
  if (!pulseLiveEl){
    pulseLiveEl = document.createElement('div');
    pulseLiveEl.id = 'pulseLive';
    pulseLiveEl.title = 'where the next pulse is born';
    document.body.appendChild(pulseLiveEl);
  }
  const on = gridLive() && P.gPTrig !== 'off';
  pulseLiveEl.classList.toggle('on', on);
  if (!on) return;
  const o = pulseOrigin();                       // normalised, y counts UP like gl_FragCoord
  const x = o[0] * window.innerWidth, y = (1 - o[1]) * window.innerHeight;
  pulseLiveEl.style.left = x.toFixed(1) + 'px';
  pulseLiveEl.style.top  = y.toFixed(1) + 'px';
  // the number that decides whether the shell reads as a ring or a flash
  const U = gridMat.uniforms;
  const ext = (U.uMaskShape.value < 0.5) ? U.uMaskR.value : (0.70 * U.uMaskR.value * U.uXSize.value);
  const r0 = (P.gPBirth === 'edge') ? ext : (P.gPStart * ext);
  const tr = $('gPThickOut');
  if (tr) tr.textContent = 'birth radius: ' + Math.round(r0 / DPR) + ' px   (thickness ' + Math.round(P.gPThick) + ' px)';
  const txt = P.gPFrom + '  ' + o[0].toFixed(3) + ', ' + o[1].toFixed(3);
  if (txt !== pulseLiveLast){
    pulseLiveLast = txt;
    const r = $('gPFromOut');
    if (r) r.textContent = 'origin now: ' + txt;
  }
}

/* ---------- MASK placement gizmo (console only) ------------------------------------------
   Two handles and the path between them, the same read as a motion path anywhere else:
     FILLED diamond  the anchor, where the X rests. Sets gMaskAX / gMaskAY.
     HOLLOW diamond  where the X enters from during a SLIDE intro. Sets gMaskOffX / gMaskOffY.
   The entry offset is stored in device pixels and +y means "starts high", so the hollow
   handle sits at anchor MINUS the offset in CSS terms, which is why the y sign flips twice
   on the way in and out. Both handles are DOM, so they cost no render budget and vanish
   from every bake for free.                                                               */
let maskAnchorEl = null, maskEntryEl = null, maskPathEl = null;
function mkHandle(id, title, onDrag){
  const el = document.createElement('div');
  el.id = id; el.title = title;
  el.appendChild(document.createElement('span'));
  document.body.appendChild(el);
  let dragging = false;
  const move = e => {
    if (!dragging) return;
    onDrag(e.clientX, e.clientY);
    applyMaskGizmo();
  };
  // capture can be refused (no live pointer for that id); the drag still works without it,
  // so it must never be the thing that throws into someone's console.
  const cap = (fn, e) => { try { fn(e.pointerId); } catch (_) {} };
  el.addEventListener('pointerdown', e => {
    dragging = true; cap(id => el.setPointerCapture(id), e); e.preventDefault(); e.stopPropagation();
  });
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerup', e => { dragging = false; cap(id => el.releasePointerCapture(id), e); });
  el.addEventListener('pointercancel', () => { dragging = false; });
  return el;
}
function applyMaskGizmo(){
  if (!HAS_CONSOLE) return;
  const W = Math.max(1, window.innerWidth), H = Math.max(1, window.innerHeight);
  if (!maskAnchorEl){
    maskAnchorEl = mkHandle('maskAnchor', 'mask anchor — drag to place the X', (cx, cy) => {
      P.gMaskAX = Math.min(1, Math.max(0, cx / W));
      P.gMaskAY = Math.min(1, Math.max(0, cy / H));
      BINDERS.forEach(b => { if (b.key === 'gMaskAX' || b.key === 'gMaskAY') b.refresh(); });
    });
    maskEntryEl = mkHandle('maskEntry', 'mask entry — drag to aim where the X slides in from', (cx, cy) => {
      // CSS pixels here, device pixels in the param, and +y is UP in the offset convention
      P.gMaskOffX = Math.round((cx - P.gMaskAX * W));
      P.gMaskOffY = Math.round((P.gMaskAY * H - cy));
      BINDERS.forEach(b => { if (b.key === 'gMaskOffX' || b.key === 'gMaskOffY') b.refresh(); });
    });
    maskPathEl = document.createElement('div');
    maskPathEl.id = 'maskPath';
    document.body.appendChild(maskPathEl);
  }
  const ax = P.gMaskAX * W, ay = P.gMaskAY * H;
  const ex = ax + P.gMaskOffX, ey = ay - P.gMaskOffY;
  maskAnchorEl.style.left = ax + 'px'; maskAnchorEl.style.top = ay + 'px';
  maskEntryEl.style.left  = ex + 'px'; maskEntryEl.style.top  = ey + 'px';
  const onC = gridLive() && !!P.gMaskAnchorOn;
  maskAnchorEl.classList.toggle('on', onC);
  // FOLLOW mode makes the cursor the position, so the anchor is inert there and says so
  maskAnchorEl.classList.toggle('idle', P.gMouseMode === 'follow');
  // the entry handle only means anything while the mask actually travels
  const entryOn = onC && P.gIntroMode === 'slide';
  maskEntryEl.classList.toggle('on', entryOn);
  // NOT dimmed in FOLLOW: the anchor is inert there but the entrance still travels
  const len = Math.hypot(ex - ax, ey - ay);
  maskPathEl.classList.toggle('on', entryOn && len > 2);
  maskPathEl.style.left = ax + 'px';
  maskPathEl.style.top  = ay + 'px';
  maskPathEl.style.width = len + 'px';
  maskPathEl.style.transform = 'rotate(' + Math.atan2(ey - ay, ex - ax) + 'rad)';
}
window.addEventListener('resize', () => { if (maskAnchorEl) applyMaskGizmo(); });

// clamp + repair: a preset that predates the anchor, or a hand-typed value, can never
// leave the origin at NaN or off-screen
function anchorXY(){
  const x = Number(P.gPAnchorX), y = Number(P.gPAnchorY);
  return [Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0.5,
          Number.isFinite(y) ? Math.min(1, Math.max(0, y)) : 0.5];
}
function useFixedOrigin(){
  if (P.gPFrom === 'fixed') return;
  P.gPFrom = 'fixed';
  const seg = $('gPFromSeg');
  if (seg) seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.gpfrom === 'fixed'));
  applyAnchor();
}
applyAnchor();   // a preset that loads with FIXED shows its handle straight away
applyMaskGizmo();
rebuildEaseLUT();   // the table has to exist before the first frame, console or bake
// Sleep only when every visible C animation has settled. Unknown/authoring
// configurations keep their continuous loop, so overrides remain compatible.
function gridIsSettled(){
  if (HAS_CONSOLE || P.comp !== 'C' || P.gTeaseOn) return false;
  if (!PRM && (P.gWaveOn || P.gMaskShape === 'burn' ||
      (P.lensOn && P.lensFx.ripple))) return false;
  if (gridT < 1 || gridE < 1 || gridM < 1) return false;
  const revealTarget = P.gMouseMode === 'follow' ? (mouse.px > -9000 ? 1 : 0) : 1;
  if (Math.abs(gLag.reveal - revealTarget) > 1e-6) return false;
  if (Math.abs(scrollRaw - scrollT) > 1e-5) return false;
  if (Math.abs(mouse.sx - mouse.x) > 1e-5 || Math.abs(mouse.sy - mouse.y) > 1e-5 ||
      Math.abs(gLag.nx - mouse.x) > 1e-5 || Math.abs(gLag.ny - mouse.y) > 1e-5 ||
      Math.abs(gLag.px - mouse.px) > 0.02 || Math.abs(gLag.py - mouse.py) > 0.02 ||
      Math.abs(gLag.mpx - gLag.mtx) > 0.02 || Math.abs(gLag.mpy - gLag.mty) > 0.02 ||
      (P.gMaskEase && gLag.mp < 1)) return false;
  if (!PRM && P.gPTrig !== 'off'){
    const life = Math.max(0.05, P.gPLife);
    if (gridMat.uniforms.uPulse.value.some(v => v.w > 0 && clock.elapsedTime - v.z < life)) return false;
  }
  return true;
}
function scheduleNextFrame(){
  if (__stopped || !RENDER_ON) return;
  if (!gridIsSettled()){
    __rafId = requestAnimationFrame(tick);
    return;
  }
  __idle = true;
  perf.state = 'idle';
  if (autoPulseEnabled()){
    const wait = pFirstDone ? Math.max(0.4, P.gPAuto) : Math.max(0, P.gPFirst);
    __wakeTimer = setTimeout(() => { __wakeTimer = 0; wakeRender(); },
      Math.max(1, Math.ceil((wait - pAutoT) * 1000)));
  }
}
function tick(){
  __rafId = 0;
  if (__stopped || !RENDER_ON) return;
  const now = performance.now();
  if (Q.fps > 0 && now - _fpsLast < (1000 / Q.fps) - 1){
    __rafId = requestAnimationFrame(tick);
    return;
  }
  _fpsLast = now;
  const elapsed = __hasRendered ? Math.max(0, (now - __lastTick) / 1000) : 0;
  __hasRendered = true;
  __lastTick = now;
  const dt = Math.min(elapsed, 0.05);
  clock.elapsedTime += elapsed;
  const t = clock.elapsedTime;
  const __passesBefore = perf.passes;
  __inTick = true;

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
  // The anchor is where the X rests. PARALLAX drifts around it, STATIC sits on it, and
  // FOLLOW ignores it because the cursor is the position in that mode. gMaskAY counts DOWN
  // in screen terms, gl_FragCoord counts UP, hence the flip.
  const maskAX = Math.min(1, Math.max(0, P.gMaskAX));
  const maskAY = 1 - Math.min(1, Math.max(0, P.gMaskAY));
  if (!P.gMouseOn){                     // grid mouse master off: the X rests on its anchor
    gmx = renderer.domElement.width * maskAX;
    gmy = renderer.domElement.height * maskAY;
  } else if (P.gMouseMode === 'parallax'){
    const cw = renderer.domElement.width, ch = renderer.domElement.height;
    const nx = (mouse.px > -9000) ? (mouse.px / cw) * 2 - 1 : 0;   // -1..1 across the screen
    const ny = (mouse.py > -9000) ? (mouse.py / ch) * 2 - 1 : 0;
    gmx = cw * maskAX + nx * P.gParAmt * DPR;
    gmy = ch * maskAY + ny * P.gParAmt * DPR;
  } else if (P.gMouseMode === 'off'){
    gmx = renderer.domElement.width * maskAX;
    gmy = renderer.domElement.height * maskAY;
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
  const mouseOn = P.mouseOn && !PRM && Q.hover;

  // first-touch reveal: the grid mask blooms in gently the first time the cursor is
  // present (and eases back out if it leaves), instead of popping at full size.
  // in parallax/static modes the mask is ambient: it blooms in on entry regardless of cursor.
  // "mask start delay" sequences it AFTER the grid intro: the reveal may not begin
  // until gRevealDelay seconds have passed since entering grid mode.
  if (gridLive()) gLag.tC += dt;
  // outside the grid comps nothing sequences the chrome, so release it explicitly
  if (!gridLive() || !P.gTeaseOn) applyUiHold(1);
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
  /* The grid's intro and expansion run on their OWN clocks. They used to be derived as
     introT * (introDur / gIntroDur), and introT caps at 1, so any grid duration LONGER than
     the stack's introDur could never finish: uIntro capped at introDur/gIntroDur and the
     outermost tiles stayed permanently dim and undersized. The shipped 3s against introDur
     2.4s pinned it at 0.8, leaving the corner tiles at about 69% brightness forever. */
  if (PRM){ gridT = 1; gridE = 1; gridM = 1; }
  else {
    // TEASE hold: the main entrance waits until the tease has had its turn. gLag.tC is the
    // grid-entry clock, so this is measured from the moment GRID/C takes over, not page load.
    const heldForTease = P.gTeaseOn && gridLive() && gLag.tC < P.gIntroAt;
    if (!heldForTease){
      gridT = Math.min(1, gridT + dt / Math.max(0.2, P.gIntroDur));
      gridE = Math.min(1, gridE + dt / Math.max(0.2, P.gExpandDur));
      gridM = Math.min(1, gridM + dt / Math.max(0.2, P.gMoveDur));
    }
  }
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

        // ---- intro: collapsed FAN OPEN, or ASSEMBLE (settle from per-endpoint entry) ----
        if (introActive){
          // per-copy window: proportional stagger + a flat "trail delay" that holds every
          // copy behind the leading one (us.t === 0)
          const winStart = Math.min(0.98, us.t * stagger + (us.t > 1e-4 ? P.introDelay : 0));
          const win = Math.max(0.0001, 1 - winStart);
          const p = smoother((introT - winStart) / win);   // 0..1 eased, per copy
          const q = 1 - p;

          // entry transform, interpolated START endpoint (us.t=0) -> END endpoint (us.t=1),
          // so the two ends of the blend can open from different directions / spins / scales
          const et = us.t, D2R = Math.PI / 180;
          const eOffX = P.introOffX + (P.introOffX1 - P.introOffX) * et;
          const eOffY = P.introOffY + (P.introOffY1 - P.introOffY) * et;
          const eOffZ = P.introOffZ + (P.introOffZ1 - P.introOffZ) * et;
          const eSpinX = (P.introSpinX + (P.introSpinX1 - P.introSpinX) * et) * D2R;
          const eSpinY = (P.introSpinY + (P.introSpinY1 - P.introSpinY) * et) * D2R;
          const eSpinZ = (P.introSpin  + (P.introSpin1  - P.introSpin ) * et) * D2R;
          const eScale =  P.introScale + (P.introScale1 - P.introScale) * et;

          if (P.introMode === 'assemble'){
            // ALTERNATIVE: no collapse to a single front X. Each layer settles into its
            // idle pose from its own offset / spin / scale — reads as the stack assembling.
            unit.position.set(idlePos.x + q * eOffX, idlePos.y + q * eOffY, idlePos.z + q * eOffZ);
            const sc = us.baseScale * (eScale + (1 - eScale) * p);   // baseScale*eScale -> baseScale
            unit.scale.set(sc, sc, 1);
            unit.rotation.set(idleRX + q * eSpinX, idleRY + q * eSpinY, idleRZ + q * eSpinZ);
            const mc = unit.children; if (mc.length === 3) mc.forEach(m => m.rotation.set(0, 0, 0));
          } else {
            // FAN OPEN (default): collapsed front X -> live idle, spin/offset/scale decay to 0
            const fr = grp.userData.front;
            unit.position.lerpVectors(fr.pos, idlePos, p);
            const scFrom = fr.scale * eScale;
            const sc = scFrom + (us.baseScale - scFrom) * p;
            unit.scale.set(sc, sc, 1);
            unit.rotation.set(
              fr.rot.x + (idleRX - fr.rot.x) * p + q * eSpinX,
              fr.rot.y + (idleRY - fr.rot.y) * p + q * eSpinY,
              fr.rot.z + (idleRZ - fr.rot.z) * p + q * eSpinZ
            );
            unit.position.x += q * eOffX;
            unit.position.y += q * eOffY;
            unit.position.z += q * eOffZ;
            // per-part divergent fan: decays to 0 by p=1 so it leaves no residual at handoff
            if (P.partFan){
              const mc = unit.children;   // [arm_b, chevron, arm_t]
              if (mc.length === 3){
                mc[0].rotation.set(0, 0,  q * 0.5 * us.t);
                mc[1].rotation.set(0, q * -0.6 * us.t, 0);
                mc[2].rotation.set(0, 0, -q * 0.7 * us.t);
              }
            }
          }
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

  const fastGrid = P.comp === 'C' && (!P.dither || P.ditherMode === 'off') && !P.lensOn;
  const hasGlow = P.glowOn && P.glow > 0.001 && Q.glow;
  const neutralGrade = P.grHue === 0 && P.grSat === 1 && P.grBright === 1 && !P.tintOn;
  const directGrid = fastGrid && !hasGlow && neutralGrade;
  // Fast path removes identity post passes without changing active effects.
  if (gridLive()){
    /* ---- SCROLL: mode C answers the page the way the stacks do, minus any rotation.
       One eased progress drives four things: the field slides, the mask scales, the grid
       fades, and the glow lifts as it goes. scrollT is already smoothed by the shared
       "scroll delay", so this adds no second easing of its own. At progress 0 every term
       is identity, which is why the hero at rest is untouched.                          */
    const sc = P.gScrOn ? Math.pow(Math.min(1, Math.max(0, scrollT)), Math.max(0.1, P.gScrEase)) : 0;
    const scMask = 1 + (P.gScrMask - 1) * sc;      // 1 = unchanged, <1 shrinks, >1 expands
    const scOp   = 1 + (P.gScrFade - 1) * sc;      // multiplies BOTH grid opacities
    gridMat.uniforms.uScrollY.value = sc * P.gScrSlide * DPR;
    compMat.uniforms.uIntensity.value = P.glow * (1 + (P.gScrGlow - 1) * sc);
    gridMat.uniforms.uMouse.value.set(gLag.mpx, gLag.mpy);
    gridMat.uniforms.uCell.value = P.gCell * DPR;
    gridMat.uniforms.uGridOpIn.value = P.gGridOpIn * scOp;
    gridMat.uniforms.uGridOpOut.value = P.gGridOpOut * scOp;
    gridMat.uniforms.uWaveOn.value = (P.gWaveOn && !PRM && (P.gMouseOn || !P.gWaveCursor)) ? 1 : 0;
    gridMat.uniforms.uWaveAmp.value = P.gWaveAmp * DPR;
    gridMat.uniforms.uWaveFreq.value = P.gWaveFreq;
    gridMat.uniforms.uWaveSpeed.value = P.gWaveSpeed;
    gridMat.uniforms.uWaveCursor.value = P.gWaveCursor ? 1 : 0;
    gridMat.uniforms.uPushOn.value = (P.gPushOn && !PRM && P.gMouseOn) ? 1 : 0;
    gridMat.uniforms.uPushAmt.value = P.gPushAmt * DPR;
    gridMat.uniforms.uBase.value = P.gBase;
    hex2vec(P.gGradA, gridMat.uniforms.uGradA.value);
    hex2vec(P.gGradB, gridMat.uniforms.uGradB.value);
    gridMat.uniforms.uGradAngle.value = P.gGradAngle * (Math.PI / 180);
    gridMat.uniforms.uGradGain.value = P.gGradGain;
    gridMat.uniforms.uGradOn.value = P.gGradOn ? 1 : 0;
    // auto-beat: a slow heartbeat out of the mask, so the hero has life before contact
    // and so touch devices (Q.hover false, no cursor at all) still get the whole effect.
    // The OPENING beat has its own delay, counted from the moment the mask intro finishes
    // blooming, and only the beats after it use the repeat interval. Sharing one number
    // meant the entrance could not be timed against the intro without also changing the
    // rhythm of everything that followed.
    if (!PRM && (P.gPTrig === 'auto' || P.gPTrig === 'both')){
      if (gLag.reveal > 0.98){
        pAutoT += dt;                                   // clock starts at mask completion
        const wait = pFirstDone ? Math.max(0.4, P.gPAuto) : Math.max(0, P.gPFirst);
        if (pAutoT >= wait){
          pAutoT = 0;
          pFirstDone = true;
          pulseNow(P.gPAutoStr);
        }
      } else {
        pAutoT = 0;                                     // hold while the mask is still blooming
      }
    } else {
      pAutoT = 0;
      pFirstDone = false;
    }
    const pulseOn = P.gPTrig !== 'off' && !PRM;
    // The region segment MUTES a side rather than overwriting its slider, so flipping to
    // IN X and back to ALL restores the outside gain you had dialled instead of losing it.
    // Both zero => the shader skips the whole pulse loop.
    const rIn  = P.gPRegion !== 'out';
    const rOut = P.gPRegion !== 'in';
    gridMat.uniforms.uPGainIn.value  = (pulseOn && rIn)  ? P.gPGainIn  : 0;
    gridMat.uniforms.uPGainOut.value = (pulseOn && rOut) ? P.gPGainOut : 0;
    gridMat.uniforms.uPFeathO.value = P.gPFeathO;
    gridMat.uniforms.uPFeathI.value = P.gPFeathI;
    gridMat.uniforms.uPHead.value = P.gPHead;
    hex2vec(P.gPCol, gridMat.uniforms.uPCol.value);
    gridMat.uniforms.uPSpeed.value = P.gPSpeed;
    gridMat.uniforms.uPWidth.value = P.gPWidth;
    gridMat.uniforms.uPThick.value = P.gPThick * DPR;
    gridMat.uniforms.uPFadeIn.value = P.gPFadeIn;
    gridMat.uniforms.uPFadeOut.value = P.gPFadeOut;
    gridMat.uniforms.uPStart.value = P.gPStart;
    gridMat.uniforms.uPBirth.value = (P.gPBirth === 'edge') ? 1 : 0;
    // The front inherits the mask's STATIC angle so a rotated mask still sheds a congruent
    // wave; gPRot is an offset on top of that. The intro spin is deliberately not included,
    // or every pulse would counter-spin during the entrance.
    gridMat.uniforms.uPRot.value = (P.gXRotate + P.gPRot) * Math.PI / 180;
    gridMat.uniforms.uPGrow.value = P.gPGrow;
    gridMat.uniforms.uPReach.value = P.gPReach;
    gridMat.uniforms.uPHue.value = P.gPHue;
    gridMat.uniforms.uPLife.value = P.gPLife;
    // legacy presets saved 'x' for the analytic star; keep them rendering as they did
    gridMat.uniforms.uPShape.value = { round:0, star:1, x:1, logo:2, diamond:3, ribbon:4 }[P.gPShape] ?? 0;
    gridMat.uniforms.uPDilate.value = (pulseOn && P.gPDilOn) ? P.gPDilate : 0;
    gridMat.uniforms.uQOn.value = P.gQOn ? 1 : 0;
    gridMat.uniforms.uQSteps.value = P.gQSteps;
    // Reveal shape. The smoothstep alone spends its first quarter doing almost nothing:
    // over a 4s reveal the mask is still under 16% at one second, which reads as a delay
    // that no delay slider can remove. `reveal ease` biases the ramp BEFORE the smoothstep,
    // so the entrance can start sooner without shortening the whole move. 1 = unchanged.
    // ---- TEASE envelopes. One clock (gLag.tC, time since GRID/C took over) drives three
    // windows: the grid SWEEP, the broad LEAK, and the mask GLIMPSE. Each is a raised-cosine
    // in and out, so nothing pops, and all are inert unless the tease is switched on. ----
    const teaseOn = !!P.gTeaseOn && !PRM;
    const env = (t0, dur) => {
      if (!teaseOn) return 0;
      const d = Math.max(0.05, dur);
      const x = (gLag.tC - t0) / d;
      if (x <= 0 || x >= 1) return 0;
      return 0.5 - 0.5 * Math.cos(2 * Math.PI * x);   // 0 -> 1 -> 0
    };
    const ramp = (t0, dur) => {                        // 0 -> 1 position ramp for travel
      const d = Math.max(0.05, dur);
      return Math.max(0, Math.min(1, (gLag.tC - t0) / d));
    };
    const swpE = env(P.gSwpAt, P.gSwpDur);
    const leakE = env(P.gLeakAt, P.gLeakDur);
    const glimpseE = env(P.gGlimpseAt, P.gGlimpseDur) * (P.gGlimpseStr === undefined ? 1 : P.gGlimpseStr);
    gridMat.uniforms.uSwpGain.value = swpE * (P.gSwpGain || 0);
    gridMat.uniforms.uSwpReveal.value = (teaseOn && P.gSwpReveal) ? 1 : 0;
    gridMat.uniforms.uSwpShape.value = { linear:0, radial:1, diamond:2, xstar:3, logo:4, burn:5 }[P.gSwpShape] ?? 0;
    gridMat.uniforms.uSwpBias.value = P.gSwpBias || 0;
    gridMat.uniforms.uSwpFeath.value = P.gSwpFeath === undefined ? 0.12 : P.gSwpFeath;
    gridMat.uniforms.uSwpDiam.value = P.gSwpDiam === undefined ? 1.6 : P.gSwpDiam;
    gridMat.uniforms.uSwpColMix.value = P.gSwpColMix || 0;
    hex2vec(P.gSwpCol || '#ffffff', gridMat.uniforms.uSwpCol.value);
    // opening beat: everything dark, then the sweep window, then the reveal out of the mask
    gridMat.uniforms.uBlackout.value = (teaseOn && gLag.tC < (P.gBlackAt || 0)) ? 1 : 0;
    gridMat.uniforms.uRevSoft.value = P.gRevMaskSoft === undefined ? 0.35 : P.gRevMaskSoft;
    // opt-in: switching the tease on must not blank the field by itself
    // computed once here: both the visibility gate below and the intro feed further down
    // need to know whether the entrance is currently being held by the tease.
    const introHeld = !!P.gTeaseOn && gridLive() && !PRM && gLag.tC < (P.gIntroAt || 0);
    const revOn = teaseOn && !!P.gRevMaskOn;
    gridMat.uniforms.uRevOn.value = revOn ? 1 : 0;
    gridMat.uniforms.uRevMask.value = !revOn ? 1
      : Math.max(0, Math.min(1, (gLag.tC - (P.gRevMaskAt || 0)) / Math.max(0.05, P.gRevMaskDur || 1)));
    // while the entrance is held the field stays dark; the sweep, the mask and the radial
    // reveal are the only things that bring it up. Without this the grid, now sitting at
    // rest during the hold, would simply be on screen before the tease ever runs.
    gridMat.uniforms.uHoldDark.value = introHeld ? 1 : 0;
    gridMat.uniforms.uRestPose.value = introHeld ? 1 : 0;
    // OPENING SCOPE: the visibility gate must stop governing once the opening is over, or a
    // sweep left in window mode would keep the field switched off for the rest of the page.
    const swpEnd = (P.gSwpAt || 0) + (P.gSwpDur || 0);
    const revEnd = (P.gRevMaskAt || 0) + (P.gRevMaskDur || 0);
    const openActive = teaseOn && (
      introHeld ||
      (P.gSwpReveal && gLag.tC < swpEnd) ||
      (revOn && gLag.tC < revEnd));
    gridMat.uniforms.uOpenOn.value = openActive ? 1 : 0;
    if (HAS_CONSOLE && typeof refreshTimeline === 'function'){ refreshTimeline(); layoutTimeline(); tlPlayhead(); }
    // travel: the band crosses the screen over the window, centred so it is mid-screen at peak
    // position: the ramp is scaled by SPEED and wrapped by CYCLES, so one window can carry
    // several passes. Shaped sweeps start at the centre, so they run 0..1 instead of centred.
    {
      const cyc = Math.max(1, Math.round(P.gSwpCycles || 1));
      const spd = Math.max(0.05, P.gSwpSpeed === undefined ? 1 : P.gSwpSpeed);
      const trav = P.gSwpTravel === undefined ? 1.3 : P.gSwpTravel;
      let r = ramp(P.gSwpAt, P.gSwpDur) * spd * cyc;
      r = cyc > 1 ? (r % 1) : Math.min(1, r);
      gridMat.uniforms.uSwpPos.value = (P.gSwpShape && P.gSwpShape !== 'linear')
        ? r * trav                        // contours expand outward from the centre
        : 0.5 + (r - 0.5) * trav;         // linear wipe crosses the frame
    }
    gridMat.uniforms.uSwpAng.value = (P.gSwpAng || 0) * (Math.PI / 180);
    gridMat.uniforms.uSwpWide.value = P.gSwpWide === undefined ? 0.16 : P.gSwpWide;
    gridMat.uniforms.uSwpSoft.value = P.gSwpSoft === undefined ? 1 : P.gSwpSoft;
    gridMat.uniforms.uSwpRegion.value = P.gSwpRegion === 'in' ? 1 : (P.gSwpRegion === 'out' ? 2 : 0);
    gridMat.uniforms.uLeakGain.value = leakE * (P.gLeakGain || 0);
    gridMat.uniforms.uLeakPos.value = 0.5 + (ramp(P.gLeakAt, P.gLeakDur) - 0.5) * (P.gLeakTravel === undefined ? 0.6 : P.gLeakTravel);
    gridMat.uniforms.uLeakAng.value = (P.gLeakAng || 0) * (Math.PI / 180);
    gridMat.uniforms.uLeakWide.value = P.gLeakWide === undefined ? 0.7 : P.gLeakWide;

    const rv = gLag.reveal;
    // the GLIMPSE borrows the mask's own reveal path, so the X appears fully formed
    // (correct size, no spin) for its moment and then withdraws, with no separate code path.
    const rvE = Math.max(maskEase(rv), Math.max(0, Math.min(1, glimpseE)));
    gridMat.uniforms.uMaskVis.value = rvE;   // the X's own arrival counts toward visibility
    // UI HOLD: nav, hero copy and blob stay out until their cue, then fade up. Measured on
    // the same grid clock as everything else, so it reads as one sequence, not two.
    applyUiHold((!teaseOn) ? 1
      : Math.max(0, Math.min(1, (gLag.tC - (P.gUiAt || 0)) / Math.max(0.05, P.gUiFade || 0.6))));
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
    // MASK INTRO MOVE — the mask's counterpart to the grid's intro move. SCALE animates the
    // X glyph, ZOOM animates the mask radius, both settling onto their final values as the
    // reveal completes. 'off' leaves the legacy gXFrom behaviour alone.
    let xmS = 1, xmZ = 1;
    {
      const mm = P.gXMove || 'off';
      const amt = Math.max(1.001, P.gXMoveAmt || 2);
      const e = rvE;                                   // rides the mask's own reveal curve
      if (mm === 'scaleUp')        xmS = 1 / amt + (1 - 1 / amt) * e;
      else if (mm === 'scaleDown') xmS = amt + (1 - amt) * e;
      else if (mm === 'zoomIn')    xmZ = 1 / amt + (1 - 1 / amt) * e;
      else if (mm === 'zoomOut')   xmZ = amt + (1 - amt) * e;
    }
    gridMat.uniforms.uMaskR.value = P.gMaskR * DPR * rMul * scMask * xmZ;
    gridMat.uniforms.uMaskShape.value = P.gMaskShape === 'x' ? 1 : (P.gMaskShape === 'burn' ? 2 : 0);
    gridMat.uniforms.uBurnScale.value = P.gBurnScale === undefined ? 2.6 : P.gBurnScale;
    gridMat.uniforms.uBurnAmt.value = P.gBurnAmt === undefined ? 0.45 : P.gBurnAmt;
    gridMat.uniforms.uBurnRim.value = P.gBurnRim === undefined ? 0.12 : P.gBurnRim;
    gridMat.uniforms.uBurnFlick.value = P.gBurnFlick === undefined ? 0.35 : P.gBurnFlick;
    // MASK MOVE, when armed, OWNS the glyph scale: the legacy "X intro scale" (gXFrom) also
    // multiplies here and starts the X small, which would cancel a SCALE DOWN. Bypassing it
    // keeps the two controls from fighting instead of silently averaging.
    const xfLegacy = (P.gXMove && P.gXMove !== 'off') ? 1 : (P.gXFrom + (1 - P.gXFrom) * rvE);
    // dividing: a LARGER divisor = a BIGGER glyph, so xmS > 1 at the start means 'starts big'
    gridMat.uniforms.uXSize.value = P.gXSize / Math.max(0.05, xfLegacy * xmS);
    // uXRot rotates the MASK GLYPH. Two contributions: the intro spin, which decays to zero
    // as the reveal completes, and a static angle that persists at rest. Before this the
    // static half did not exist, so the only rotation control anywhere near the mask was
    // `mask rotate`, which is uMRot and turns the TILES inside it, not the X.
    gridMat.uniforms.uXRot.value = (1 - rvE) * P.gXSpin * (Math.PI / 180) + P.gXRotate * (Math.PI / 180);
    gridMat.uniforms.uXFeather.value = P.gXFeather;
    // opMul goes NEGATIVE for any X intro fade above 1, which drove the mask influence
    // below zero and darkened the grid inside the X rather than just delaying it.
    gridMat.uniforms.uMaskOp.value = Math.max(0, P.gMaskOp * opMul);
    gridMat.uniforms.uMouseN.value.set(mouseOn ? gLag.nx : 0, mouseOn ? gLag.ny : 0);
    gridMat.uniforms.uMouseLag.value.set(gLag.px, gLag.py);
    gridMat.uniforms.uGPar.value = (P.gMouseOn && !PRM) ? P.gPar : 0;
    gridMat.uniforms.uGScaleM.value = (P.gMouseOn && !PRM) ? P.gScaleM : 0;
    gridMat.uniforms.uGSphere.value = (P.gMouseOn && !PRM) ? P.gSphere : 0;
    gridMat.uniforms.uBright.value = P.gBright;
    gridMat.uniforms.uScale.value = (P.gMouseOn && !PRM) ? P.gScale : 0;
    gridMat.uniforms.uVig.value = P.gVig;
    gridMat.uniforms.uVigR.value = P.gVigR;
    gridMat.uniforms.uIntroDir.value = { centerOut:0, edgesIn:1, topDown:2, bottomUp:3, leftRight:4, rightLeft:5,
                                         diagUR:6, diagDL:7, diagUL:8, diagDR:9 }[P.gIntroDir] ?? 0;
    gridMat.uniforms.uRot.value = P.gRot * Math.PI / 180;
    gridMat.uniforms.uMRot.value = (P.gMouseOn && !PRM) ? P.gMRot * Math.PI / 180 : 0;
    gridMat.uniforms.uGap.value = P.gGap;
    gridMat.uniforms.uTileSc.value = P.gTileSc;
    // grid intro progress: its own duration, sharing the introT replay trigger
    // While the TEASE holds the entrance, the grid sits at REST rather than at the intro's
    // first frame. Otherwise there is nothing for the sweep to light: POP pins tile opacity
    // at 0 before the intro runs, and SLIDE only looked right because its tile-fade happened
    // to be non-zero. Feeding 1 here makes both modes behave the same during the tease.
    // the grid intro runs on its OWN clock. The teaser no longer writes here: it asks for a
    // resting pose through uRestPose instead, so intro params and preloader params are
    // independent and changing one cannot silently alter the other.
    gridMat.uniforms.uIntro.value = gridT;
    const exP = gridE;
    const gea = Math.max(0.1, P.gEaseIn), geb = Math.max(0.1, P.gEaseOut);
    // expansion rides the SAME curve as the tiles; gridEase is the single source
    gridMat.uniforms.uExpand.value = gridEase(exP);
    gridMat.uniforms.uGEaseIn.value = gea;
    gridMat.uniforms.uGEaseOut.value = geb;
    gridMat.uniforms.uEaseOn.value = (P.gEaseMode === 'curve') ? 1 : 0;
    // playheads: each graph tracks its OWN clock, and only redraws while that clock moves,
    // so a settled hero costs nothing
    if (HAS_CONSOLE) applyPulseLive();
    if (HAS_CONSOLE && CURVES.grid){
      if (CURVES.grid.playhead !== gridT){ CURVES.grid.playhead = gridT; CURVES.grid.draw(); }
      if (CURVES.mask.playhead !== rv){ CURVES.mask.playhead = rv; CURVES.mask.draw(); }
    }
    gridMat.uniforms.uExpandOn.value = P.gExpandOn ? 1 : 0;
    gridMat.uniforms.uExpandFrom.value = P.gExpandFrom;
    // ---- INTRO MOVE: a scale or a Z-zoom laid over the tile reveal, on its own clock ----
    // SCALE UP / DOWN warp the whole sheet about the centre (the lattice travels with it).
    // ZOOM IN / OUT scale only the glyph inside each cell, so the field keeps its pitch
    // and the tiles alone read as coming toward or receding from the viewer.
    {
      const mv = P.gMoveMode || 'off';
      const amt = Math.max(1.001, P.gMoveAmt || 1);
      const e = PRM ? 1 : gridEase(gridM);
      let sheet = 1, glyph = 1;
      if (mv === 'scaleUp')        sheet = 1 / amt + (1 - 1 / amt) * e;   // starts small, grows in
      else if (mv === 'scaleDown') sheet = amt + (1 - amt) * e;           // starts large, settles down
      else if (mv === 'zoomIn')    glyph = 1 / amt + (1 - 1 / amt) * e;   // tiles rush toward final size
      else if (mv === 'zoomOut')   glyph = amt + (1 - amt) * e;           // tiles recede to final size
      gridMat.uniforms.uMoveS.value = sheet;
      gridMat.uniforms.uTileSc.value = P.gTileSc * glyph;
    }
    // FIRST-GRID LOOK: the grid shown during the opening can have its own pitch, tile size
    // and opacity, blending to the settled values as the opening ends. Kept as a separate
    // set rather than animating the real params, so the settled grid is never disturbed.
    if (P.gTeaseLookOn && teaseOn){
      if (openActive) gLag.tlk = 1;
      else if (gLag.tlk > 0) gLag.tlk = Math.max(0, gLag.tlk - dt / Math.max(0.05, P.gTeaseBlend || 0.6));
    } else gLag.tlk = 0;
    const tlk = gLag.tlk || 0;
    if (tlk > 0.0001){
      const e = tlk * tlk * (3 - 2 * tlk);                        // smooth the handover
      gridMat.uniforms.uCell.value   = (P.gCell   + (P.gTeaseCell   - P.gCell)   * e) * DPR;
      gridMat.uniforms.uTileSc.value = (P.gTileSc + (P.gTeaseTileSc - P.gTileSc) * e);
      const opMulT = 1 + ((P.gTeaseOp === undefined ? 1 : P.gTeaseOp) - 1) * e;
      gridMat.uniforms.uGridOpIn.value  *= opMulT;
      gridMat.uniforms.uGridOpOut.value *= opMulT;
    }
    // ---- INTRO / SLIDE ---------------------------------------------------------------
    // Stagger and trail apply in both modes: at 0.5 / 0 they reproduce the span that used
    // to be hardcoded in the shader, so nothing shifts until they are touched.
    gridMat.uniforms.uGStagger.value = Math.min(0.98, Math.max(0, P.gStagger));
    gridMat.uniforms.uGTrail.value   = Math.min(0.95, Math.max(0, P.gTrail));
    const slide = (P.gIntroMode === 'slide') && !PRM;
    gridMat.uniforms.uSlideOn.value = slide ? 1 : 0;
    if (slide){
      // FIELD rides the grid intro clock, eased with the same powers as the tiles but
      // with no stagger: one sheet, one timeline.
      const fq = 1 - gridEase(gridT);
      gridMat.uniforms.uFieldOff.value.set(P.gFieldX * DPR * fq, P.gFieldY * DPR * fq);
      // MASK rides the mask's OWN reveal (rvE), so it arrives with its fade rather than
      // with the lattice. Leaving it at 0,0 pins the X while the grid travels under it.
      const mq = 1 - rvE;
      gridMat.uniforms.uMaskOff.value.set(P.gMaskOffX * DPR * mq, P.gMaskOffY * DPR * mq);
      // TILE endpoints are passed raw; the shader scales each tile by its own remaining travel.
      gridMat.uniforms.uTileOffA.value.set(P.gTileOffX * DPR, P.gTileOffY * DPR);
      gridMat.uniforms.uTileOffB.value.set(P.gTileOffX1 * DPR, P.gTileOffY1 * DPR);
      gridMat.uniforms.uTileSpinA.value = P.gTileSpin * Math.PI / 180;
      gridMat.uniforms.uTileSpinB.value = P.gTileSpin1 * Math.PI / 180;
      gridMat.uniforms.uTileScaleA.value = P.gTileScale;
      gridMat.uniforms.uTileScaleB.value = P.gTileScale1;
      gridMat.uniforms.uTileFadeA.value = P.gTileFade;
      gridMat.uniforms.uTileFadeB.value = P.gTileFade1;
    } else {
      gridMat.uniforms.uFieldOff.value.set(0, 0);
      gridMat.uniforms.uMaskOff.value.set(0, 0);
    }
    gridMat.uniforms.uTime.value = t;
    updateMaskCache();
    blit(gridMat, directGrid ? null : ((gridUnder() && P.gPostSep) ? gRT : rt));
  }
  // SEPARATE POST: the grid was blitted into gRT (not rt) above, gets its own dither, and
  // the stack is rendered on a transparent clear and dithered with its own settings. The
  // two are then composited. This is what lets the background carry a different halftone
  // (or none) from the monolith in front of it.
  const splitPost = gridUnder() && P.gPostSep;
  if (splitPost){
    // the cursor lens is a screen effect, not a layer effect: mute it for the per-layer
    // passes and let the shared pass below apply it once to the finished composite.
    const lensWas = ditherMat.uniforms.uLensOn.value;
    ditherMat.uniforms.uLensOn.value = 0;
    // 1. grid layer, its own dither
    setDither(P.gDitherMode, P.gPx, P.gLevels, P.gDot, 0);
    ditherMat.uniforms.tSrc.value = gRT.texture;
    blit(ditherMat, gRT2);
    // 2. stack layer, rendered onto nothing so its coverage survives
    const prevBg = scene.background;
    const prevAlpha = renderer.getClearAlpha();
    scene.background = null;
    renderer.setRenderTarget(rt);
    renderer.setClearColor(0x000000, 0);
    renderer.clear(true, true, true);
    renderer.render(scene, camera);
    renderer.setClearColor(0x000000, prevAlpha);
    scene.background = prevBg;
    // 3. stack's own dither, coverage preserved
    setDither(P.ditherMode, P.px, P.levels, P.dot, 1);
    ditherMat.uniforms.tSrc.value = rt.texture;
    blit(ditherMat, auxRT);
    // 4. composite: grid under, stack over
    overMat.uniforms.tUnder.value = gRT2.texture;
    overMat.uniforms.tOver.value = auxRT.texture;
    overMat.uniforms.uRes.value.set(rt.width, rt.height);
    blit(overMat, rt);
    // restore for the shared pass, and make sure it does not dither a second time
    ditherMat.uniforms.uLensOn.value = lensWas;
    ditherMat.uniforms.uAmt.value = 0;
    ditherMat.uniforms.uKeepA.value = 0;
  } else if (P.comp !== 'C'){
    renderer.setRenderTarget(rt);
    if (gridUnder()){
      // shared post: the grid already filled rt; paint the stack straight over it.
      const prevBg = scene.background;
      scene.background = null;
      renderer.autoClear = false;
      renderer.clearDepth();
      renderer.render(scene, camera);
      renderer.autoClear = true;
      scene.background = prevBg;
    } else {
      renderer.render(scene, camera);
    }
  }

  if (fastGrid){
    if (hasGlow){
      const glowTex = renderGlow(rt.texture);
      compMat.uniforms.tBase.value = rt.texture;
      compMat.uniforms.tGlow.value = glowTex;
      blit(compMat, neutralGrade ? null : outRT);
    }
    if (!neutralGrade){
      gradeMat.uniforms.tSrc.value = hasGlow ? outRT.texture : rt.texture;
      blit(gradeMat, null);
    }
  } else {
  if (!P.glowOn || P.glow <= 0.001 || !Q.glow){
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
  }

  // on-screen transform handles (console only; no-op when baked)
  if (GIZMO) GIZMO.render();

  perf.frames++;
  perf.lastFramePasses = perf.passes - __passesBefore;
  __inTick = false;
  scheduleNextFrame();

  // fps
  frames++; fpsT += dt;
  if (fpsT >= 0.5){
    const fpsEl = document.getElementById('fps');
    if (fpsEl) fpsEl.textContent = Math.round(frames / fpsT) + ' fps';
    frames = 0; fpsT = 0;
  }
}
__schedulerReady = true;
__lastTick = performance.now();
if (!RENDER_ON) perf.state = "suspended";
wakeRender();
})();

}

/* --- hero --- */
/* The mount itself is gated on window.ScaleXLoader.heroReady in the bootstrap above,
   so there is nothing to do here: the entrance plays once, when the loader is done,
   and only one WebGL context is ever alive. */

}());
