/* ScaleX — Depth Tiles
   Carrossel 3D de tiles com efeito de profundidade (GSAP + IntersectionObserver).
   Aplicado hoje apenas na Home. Consolidado a partir de 3 scripts que
   existiam separados no Webflow so por causa do limite de 2000
   caracteres por script registrado — mantida a mesma ordem de execucao
   de antes (config/helpers -> render/loop -> init, todos operando sobre
   o namespace window.SXDT).
*/

window.SXDT = window.SXDT || {};
(function (D) {
  D.cfg = { xMul: 0.65, backScale: 0.5, backOpacity: 1, backDark: 1, rotY: 5, persp: 75, move: 1.5, startDelay: 0.5, pause: 0.125 };
  D.rel = function (I, index) {
    var n = I.count;
    var r = index - I.state.progress;
    r = ((((r + n / 2) % n) + n) % n) - n / 2;
    return gsap.utils.clamp(-2, 2, r);
  };
  D.status = function (I) {
    var n = I.count;
    var cur = ((Math.round(I.state.progress) % n) + n) % n;
    if (cur === I.activeIdx) return;
    I.activeIdx = cur;
    I.tiles.forEach(function (t, i) {
      t.setAttribute('data-depth-tiles-item-status', i === cur ? 'active' : 'not-active');
    });
  };
})(window.SXDT);
(function (D) {
  D.render = function (I) {
    var c = D.cfg;
    var radius = I.tiles[0].offsetWidth * c.xMul;
    D.status(I);
    I.tiles.forEach(function (tile, index) {
      var rel = D.rel(I, index);
      var ang = (rel / 2) * Math.PI;
      var depth = (Math.cos(ang) + 1) / 2;
      gsap.set(tile, {
        x: rel <= -2 || rel >= 2 ? 0 : Math.sin(ang) * radius,
        scale: gsap.utils.interpolate(c.backScale, 1, depth),
        opacity: gsap.utils.interpolate(c.backOpacity, 1, depth),
        rotateY: Math.sin(ang) * -c.rotY,
        filter: 'brightness(' + gsap.utils.interpolate(c.backDark, 1, depth) + ')',
        zIndex: Math.round(gsap.utils.interpolate(1, 1000, depth))
      });
    });
  };
  D.next = function (I) {
    if (!I.active) return;
    I.tl = gsap.timeline({
      paused: true,
      onComplete: function () {
        if (I.active) I.call = gsap.delayedCall(D.cfg.pause, function () { D.next(I); });
      }
    });
    I.tl.to(I.state, {
      progress: I.state.progress + 1,
      duration: D.cfg.move,
      ease: 'depth',
      onUpdate: function () { D.render(I); }
    });
    I.tl.play();
  };
})(window.SXDT);
(function (D) {
D.pause = function (I) {
if (!I.active) return;
I.active = false;
if (I.tl) I.tl.pause();
if (I.call) { I.call.kill(); I.call = null; }
if (I.startCall) { I.startCall.kill(); I.startCall = null; }
};
D.play = function (I) {
if (I.active) return;
I.active = true;
if (!I.started) {
I.started = true;
I.startCall = gsap.delayedCall(D.cfg.startDelay, function () { D.next(I); });
return;
}
if (I.tl && I.tl.progress() < 1) I.tl.play();
else D.next(I);
};
D.next = function (I) {
if (!I.active) return;
if (I.call) { I.call.kill(); I.call = null; }
I.tl = gsap.timeline({ paused: true, onComplete: function () {
if (I.active) I.call = gsap.delayedCall(D.cfg.pause, function () { D.next(I); });
} });
I.tl.to(I.state, { progress: I.state.progress + 1, duration: D.cfg.move,
ease: D.ease, onUpdate: function () { D.render(I); } });
I.tl.play();
};
D.init = function () {
if (D.done) return;
var nodes = document.querySelectorAll('[data-depth-tiles-init]');
if (!nodes.length) return;
D.done = true;
try { if (window.CustomEase) { gsap.registerPlugin(CustomEase);
CustomEase.create('depth', 'M0,0 C0.6,0 0,1 1,1'); D.ease = 'depth'; } } catch (e) {}
if (!D.ease) D.ease = 'power2.inOut';
nodes.forEach(function (c) {
var list = c.querySelector('[data-depth-tiles-list]');
var tiles = [].slice.call(c.querySelectorAll('[data-depth-tiles-item]'));
if (tiles.length < 2) return;
var I = { list: list, tiles: tiles, count: tiles.length, state: { progress: 0 },
active: false, started: false, activeIdx: -1 };
gsap.set(list, { perspective: D.cfg.persp + 'em' });
gsap.set(tiles, { transformStyle: 'preserve-3d', transformPerspective: D.cfg.persp * 16 });
D.render(I);
new IntersectionObserver(function (es) {
es.forEach(function (e) { e.isIntersecting ? D.play(I) : D.pause(I); });
}, { threshold: 0 }).observe(c);
});
};
var n = 0;
(function w() { if (window.gsap && D.render) return D.init(); if (++n < 200) setTimeout(w, 50); })();
})(window.SXDT);
