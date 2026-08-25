/* ScaleX — Heartbeat Sync
   Faixa de texto/imagens seguindo um path SVG que reage ao scroll e ao
   wheel (GSAP + ScrollTrigger + MorphSVGPlugin). Aplicado hoje apenas
   na Home. Consolidado a partir de 6 scripts que existiam separados no
   Webflow so por causa do limite de 2000 caracteres por script
   registrado — mantida a mesma ordem de execucao de antes (estilos ->
   Part1..Part5, todos operando sobre o namespace window.SXHB).
*/

(function () {
  var s = document.createElement('style');
  s.setAttribute('data-heartbeat-styles', '');
  s.textContent =
    '.heartbeat-sync svg{display:block;width:120%;height:auto;overflow:visible;margin:8vw 0 0 -10%}' +
    '.heartbeat-sync text{font-family:inherit;font-weight:500}' +
    '.heartbeat-sync__container{position:relative}' +
    /* O script de estilos do shutter fixa as linhas em 3em e nao tem
       variante. Este gancho permite alterar a altura por wrapper via
       data-shutter-height. O seletor de atributo tem especificidade
       maior, entao vence independente da ordem de carregamento. */
    "[data-shutter-scroll-transition][data-shutter-height='1.5em'] [data-shutter-scroll-row]{height:1.5em}" +
    "[data-shutter-scroll-transition][data-shutter-height='2em'] [data-shutter-scroll-row]{height:2em}" +
    "[data-shutter-scroll-transition][data-shutter-height='4em'] [data-shutter-scroll-row]{height:4em}";
  document.head.appendChild(s);
})();
window.SXHB = window.SXHB || {};
(function (H) {
  H.GAP = 90;
  H.IMG_HEIGHT = 310;
  H.segments = [];
  H.totalLength = 0;
  H.scrollProgress = 0;
  H.prevScroll = null;
  H.sizeImages = function () {
    var imgs = [].slice.call(H.track.querySelectorAll('image.heartbeat-sync__segment'));
    return Promise.all(imgs.map(function (img) {
      return new Promise(function (resolve) {
        var probe = new Image();
        function apply() {
          img.setAttribute('width', Math.round((H.IMG_HEIGHT * probe.naturalWidth) / probe.naturalHeight));
          img.setAttribute('height', H.IMG_HEIGHT);
          resolve();
        }
        probe.onload = apply;
        probe.onerror = resolve;
        probe.src = img.getAttribute('href');
        if (probe.complete) apply();
      });
    }));
  };
})(window.SXHB);
(function (H) {
  H.measureTextWidth = function (textEl, content) {
    var fontSize = parseFloat(textEl.getAttribute('font-size')) || 350;
    var canvas = H._canvas || (H._canvas = document.createElement('canvas'));
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(textEl);
    ctx.font = cs.fontWeight + ' ' + fontSize + 'px ' + cs.fontFamily;
    return ctx.measureText(content).width;
  };
  H.measureSegments = function () {
    H.segments = [].slice.call(H.track.children).map(function (el) {
      if (el.tagName === 'image') {
        var w = +el.getAttribute('width');
        var h = +el.getAttribute('height');
        return { type: 'image', el: el, size: w, width: w, height: h };
      }
      var tp = el.querySelector('textPath');
      return { type: 'text', el: el, textPath: tp, size: H.measureTextWidth(el, tp.textContent) };
    });
    H.totalLength = H.segments.reduce(function (sum, seg, i) {
      return sum + seg.size + (i < H.segments.length - 1 ? H.GAP : 0);
    }, 0);
  };
})(window.SXHB);
(function (H) {
  H.placeImageOnPath = function (el, len, width, height) {
    var pl = H.svgPath.getTotalLength();
    if (len < -width || len > pl + width) { el.style.opacity = 0; return; }
    el.style.opacity = 1;
    var clamped = gsap.utils.clamp(0, pl, len);
    var pt = H.svgPath.getPointAtLength(clamped);
    var next = H.svgPath.getPointAtLength(gsap.utils.clamp(0, pl, clamped + 1));
    var angle = (Math.atan2(next.y - pt.y, next.x - pt.x) * 180) / Math.PI;
    el.setAttribute('x', pt.x - width / 2);
    el.setAttribute('y', pt.y - height);
    el.setAttribute('transform', 'rotate(' + angle + ' ' + pt.x + ' ' + pt.y + ')');
  };
  H.update = function () {
    var pl = H.svgPath.getTotalLength();
    var cursor = pl + H.totalLength - H.scrollProgress * (pl + H.totalLength);
    for (var i = H.segments.length - 1; i >= 0; i--) {
      var seg = H.segments[i];
      cursor -= seg.size;
      if (seg.type === 'image') {
        H.placeImageOnPath(seg.el, cursor + seg.size / 2, seg.width, seg.height);
      } else {
        seg.textPath.setAttribute('startOffset', (cursor / pl) * 100 + '%');
        seg.el.style.opacity = cursor >= pl || cursor + seg.size <= 0 ? 0 : 1;
      }
      cursor -= H.GAP;
    }
  };
  H.bumpAmplitude = function (amount) {
    H.amplitudeTo(Math.abs(amount));
    clearTimeout(H.wheelTimeout);
    H.wheelTimeout = setTimeout(function () { H.amplitudeTo(0); }, 66);
  };
  H.handleWheel = function (e) { H.bumpAmplitude(e.deltaY); };
})(window.SXHB);
(function (H) {
  H.boot = function () {
    if (H.booted) return;
    var root = document.querySelector('.heartbeat-sync');
    if (!root) return;
    H.pinHeight = root.querySelector('.heartbeat-sync__pin-height');
    H.container = root.querySelector('.heartbeat-sync__container');
    H.svgPath = root.querySelector('#heartbeat-sync-line');
    H.track = root.querySelector('#heartbeat-sync-track');
    if (!H.pinHeight || !H.container || !H.svgPath || !H.track) return;
    H.booted = true;
    H.root = root;
    H.morphTl = gsap.timeline({ paused: true }).to('#heartbeat-sync-line', {
      morphSVG: '#heartbeat-sync-wave', duration: 1, ease: 'none'
    });
    var amplitude = { value: 0 };
    H.amplitudeTo = gsap.quickTo(amplitude, 'value', {
      duration: 1,
      ease: 'power2',
      onUpdate: function () {
        H.morphTl.progress(gsap.utils.clamp(0, 1, amplitude.value / 50));
        H.update();
      }
    });
    var fontJobs = [].slice.call(H.track.querySelectorAll('text.heartbeat-sync__segment')).map(function (el) {
      return document.fonts.load('500 ' + (el.getAttribute('font-size') || '350') + 'px LayGrotesk');
    });
    Promise.all([document.fonts.ready].concat(fontJobs, [H.sizeImages()])).then(H.start);
  };
})(window.SXHB);
(function (H) {
  H.start = function () {
    H.measureSegments();
    H.update();
    var hint = H.root.querySelector('.heartbeat-sync__scroll');
    if (hint) {
      gsap.to(hint, {
        autoAlpha: 0, duration: 0.2,
        scrollTrigger: { trigger: H.root, start: 'top top', end: 'top top-=1', toggleActions: 'play none reverse none' }
      });
    }
    H.scrollSt = ScrollTrigger.create({
      trigger: H.pinHeight,
      start: 'top top',
      end: 'bottom bottom',
      pin: H.container,
      scrub: true,
      onUpdate: function (self) {
        var scroll = self.scroll();
        if (H.prevScroll != null) H.bumpAmplitude(scroll - H.prevScroll);
        H.prevScroll = scroll;
        H.scrollProgress = self.progress;
        H.update();
      }
    });
    H.root.addEventListener('wheel', H.handleWheel, { passive: true });
    ScrollTrigger.refresh();
  };
  (function wait() {
    if (window.gsap && window.ScrollTrigger && window.MorphSVGPlugin && H.boot) H.boot();
    else setTimeout(wait, 50);
  })();
})(window.SXHB);
