/* ScaleX — overlay de diagnostico de scroll (TEMPORARIO) — v2
 * ---------------------------------------------------------------------------
 * So roda com ?sxdebug=1 na URL. Sem o parametro este arquivo nao faz
 * absolutamente nada: nenhum listener, nenhum hook, nenhum no no DOM.
 *
 * O QUE A v1 JA RESPONDEU (iPhone real, 41s):
 *   rAF pior=64ms | >100ms=0 | bloq.total=0.3s
 *   E nas 9 travadas visuais (16,5s de 41,4s): DEDO:nao em TODAS.
 *   => a main thread NAO trava, e o dedo nao estava na tela. A pagina nao
 *      esta "sem responder": ela esta parada quando deveria estar deslizando.
 *      O que falta acontecer ali e o MOMENTUM.
 *
 * O QUE A v2 INVESTIGA:
 *   No iOS, scroll programatico durante o momentum o cancela. Suspeito
 *   principal: ScrollTrigger.refresh(), que restaura a posicao de scroll ao
 *   recalcular, e e chamado por refreshOnLazyImages() a cada imagem que
 *   carrega (footer do site, sem gate de mobile). Bate com "so na primeira
 *   descida", e nao aparece como bloqueio porque custa ~2ms.
 *
 *   NAO reproduz no Chrome: o fling do Chrome sobrevive ao refresh()
 *   (1335px/985ms com, 1329px/1001ms sem). O do iOS nao. Dai este overlay.
 *
 * Todos os listeners sao PASSIVOS e os hooks so observam e repassam: o
 * overlay nao pode alterar o que mede.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  try {
    if (!/[?&]sxdebug=1/.test(window.location.search)) return;
  } catch (e) { return; }

  var startedAt = Date.now();

  // ====================== hooks (observam, nao alteram) ======================
  var refreshCount = 0, lastRefreshAt = -1e9;
  var progCount = 0, lastProgAt = -1e9, lastProgWho = '';

  function now() {
    try { return performance.now(); } catch (e) { return Date.now(); }
  }

  function markProg(who) {
    progCount++; lastProgAt = now(); lastProgWho = who;
  }

  // scroll programatico: window.scrollTo / scrollBy / scrollIntoView / scrollTop=
  (function hookProgrammaticScroll() {
    try {
      ['scrollTo', 'scrollBy'].forEach(function (m) {
        var o = window[m];
        if (typeof o !== 'function') return;
        window[m] = function () { markProg(m); return o.apply(this, arguments); };
      });
    } catch (e) {}

    try {
      var sivo = Element.prototype.scrollIntoView;
      if (typeof sivo === 'function') {
        Element.prototype.scrollIntoView = function () {
          markProg('scrollIntoView'); return sivo.apply(this, arguments);
        };
      }
    } catch (e) {}

    // scrollTop= nas duas raizes de scroll, sem tocar no prototype global
    try {
      var d = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');
      if (d && d.set && d.get) {
        [document.documentElement, document.body].forEach(function (el) {
          if (!el) return;
          try {
            Object.defineProperty(el, 'scrollTop', {
              configurable: true,
              get: function () { return d.get.call(this); },
              set: function (v) { markProg('scrollTop='); return d.set.call(this, v); }
            });
          } catch (e) {}
        });
      }
    } catch (e) {}
  })();

  // ScrollTrigger.refresh() — o suspeito principal. Espera a lib existir.
  (function hookScrollTrigger() {
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      try {
        var ST = window.ScrollTrigger;
        if (ST && typeof ST.refresh === 'function' && !ST.__sxHooked) {
          var orig = ST.refresh;
          ST.refresh = function () {
            refreshCount++; lastRefreshAt = now();
            return orig.apply(this, arguments);
          };
          ST.__sxHooked = true;
          clearInterval(t);
        }
      } catch (e) {}
      if (tries > 200) clearInterval(t);
    }, 100);
  })();

  // ====================== overlay ======================
  function boot() {
    var fingerDown = false;
    var lastY = window.scrollY || 0;
    var lastRaf = 0;
    var maxGap = 0, gaps100 = 0, blockedTotal = 0;

    var freezeStart = 0, freezeGapSum = 0;
    var glidePeak = 0, glideFrames = 0, prevDy = 0;   // deslize atual
    var kills = 0, decays = 0;
    var log = [];

    function push(line) { log.unshift(line); if (log.length > 6) log.pop(); }
    function ago(t0) { return t0 < -1e8 ? '-' : Math.round(now() - t0) + 'ms'; }

    var box = document.createElement('div');
    box.setAttribute('data-sx-debug', '');
    box.style.cssText = [
      'position:fixed', 'left:0', 'right:0',
      'bottom:calc(env(safe-area-inset-bottom,0px))',
      'z-index:2147483647', 'pointer-events:none',
      'font:700 11px/1.35 ui-monospace,Menlo,Consolas,monospace',
      'background:rgba(0,0,0,.86)', 'color:#0f0',
      'padding:6px 8px', 'white-space:pre', 'letter-spacing:.2px',
      '-webkit-font-smoothing:none'
    ].join(';');
    (document.body || document.documentElement).appendChild(box);

    var head = document.createElement('div');
    head.style.cssText = 'font:900 15px/1.3 ui-monospace,Menlo,monospace;color:#fff';
    box.appendChild(head);
    var body = document.createElement('div');
    box.appendChild(body);

    var opt = { passive: true, capture: true };
    document.addEventListener('touchstart', function () { fingerDown = true; }, opt);
    document.addEventListener('touchend', function (e) {
      if (!e.touches || e.touches.length === 0) fingerDown = false;
    }, opt);
    document.addEventListener('touchcancel', function () { fingerDown = false; }, opt);

    var painted = 0;
    function tick(t) {
      requestAnimationFrame(tick);

      if (lastRaf) {
        var gap = t - lastRaf;
        if (gap > maxGap) maxGap = gap;
        if (gap > 100) gaps100++;
        if (gap > 32) {
          blockedTotal += gap - 16.7;
          if (freezeStart) freezeGapSum += gap - 16.7;
        }
      }
      lastRaf = t;

      var y = window.scrollY || 0;
      var dy = y - lastY;
      lastY = y;

      // ---------- deslize: pico e ultimo frame ----------
      // Janela fixa de N frames NAO serve: num decaimento normal a parte
      // rapida (70,64,60...) sai da janela antes da parada, e o detector
      // classificaria so as mortes, deixando o denominador sempre zero.
      // Por isso o pico e do DESLIZE INTEIRO, nao dos ultimos N frames.
      var adx = Math.abs(dy);

      if (adx > 150) {
        // salto programatico (scrollTo), nao e momentum — observado em teste
        // como falso positivo de v=1500px/frame
        glidePeak = 0; glideFrames = 0; prevDy = 0;
      } else {
        if (adx > 0.5) { glideFrames++; if (adx > glidePeak) glidePeak = adx; }

        if (!fingerDown && adx < 1 && glidePeak > 12 && glideFrames >= 4) {
          // Parou vindo de velocidade real, com o dedo fora da tela.
          // Ainda estava rapido no frame anterior => MORTE.
          // Vinha desacelerando => decaimento normal.
          // 0.35 e nao 0.5: no video anterior houve paradas vindas de ~36% do
          // pico, que a 0.5 seriam sub-reportadas. O pico vai no log para eu
          // poder julgar a razao pelo video em vez de confiar so no binario.
          if (prevDy > glidePeak * 0.35) {
            kills++;
            push('MOMENTUM MORTO v=' + Math.round(prevDy) + '/pico' + Math.round(glidePeak) +
                 ' y=' + Math.round(y) +
                 ' | refresh ' + ago(lastRefreshAt) +
                 ' | ' + (lastProgWho || 'prog') + ' ' + ago(lastProgAt));
          } else {
            decays++;
          }
          glidePeak = 0; glideFrames = 0;
        }
        prevDy = adx;
      }

      // ---------- travada com o dedo na tela (detector da v1) ----------
      if (fingerDown && Math.abs(dy) < 1) {
        if (!freezeStart) { freezeStart = t; freezeGapSum = 0; }
      } else if (freezeStart) {
        var dur = t - freezeStart;
        if (dur > 250) {
          var pct = dur > 0 ? Math.round(freezeGapSum / dur * 100) : 0;
          push((dur / 1000).toFixed(2) + 's DEDO-PARADO y=' + Math.round(y) +
               ' | main thread ' + Math.round(freezeGapSum) + 'ms (' + pct + '%)');
        }
        freezeStart = 0;
      }

      // ---------- render ~8x/s ----------
      if (t - painted > 125) {
        painted = t;

        if (!box.isConnected) {
          try { (document.body || document.documentElement).appendChild(box); } catch (e) {}
        }

        var pend = 0, imgs = document.images;
        for (var i = 0; i < imgs.length; i++) if (!imgs[i].complete) pend++;

        head.textContent =
          (fingerDown ? 'DEDO:SIM' : 'DEDO:nao') +
          '  y=' + Math.round(y) +
          '  v=' + Math.round(dy) +
          '  MORTO:' + kills + '/' + (kills + decays);

        body.textContent =
          'REFRESH=' + refreshCount + ' (' + ago(lastRefreshAt) + ')' +
          '  PROG=' + progCount + ' (' + ago(lastProgAt) + ')\n' +
          'rAF pior=' + Math.round(maxGap) + 'ms  >100=' + gaps100 +
          '  bloq=' + (blockedTotal / 1000).toFixed(1) + 's' +
          '  img=' + pend +
          '  t=' + ((Date.now() - startedAt) / 1000).toFixed(0) + 's\n' +
          (log.length ? log.join('\n') : '(sem eventos ainda)');

        box.style.color = freezeStart ? '#f33' : (kills ? '#ff0' : '#0f0');
      }
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
