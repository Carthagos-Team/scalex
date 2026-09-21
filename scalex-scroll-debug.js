/* ScaleX — overlay de diagnostico de scroll (TEMPORARIO)
 * ---------------------------------------------------------------------------
 * So roda com ?sxdebug=1 na URL. Sem o parametro este arquivo nao faz
 * absolutamente nada — visitante nenhum ve, nenhum listener e registrado.
 *
 * Existe para responder UMA pergunta que nenhuma emulacao respondeu:
 * durante as travadas de 1-3s na primeira descida, a main thread esta
 * bloqueada ou nao?
 *
 *   - Se estiver bloqueada  -> e trabalho de JS/decode/layout.
 *   - Se NAO estiver        -> e entrada/compositor, outra familia de causa.
 *
 * E mede o que so o aparelho sabe: se o DEDO estava na tela durante a
 * travada. Isso separa "usuario pausou" de "pagina nao respondeu".
 *
 * Todos os listeners sao PASSIVOS: o overlay nao pode alterar o que mede.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  try {
    if (!/[?&]sxdebug=1/.test(window.location.search)) return;
  } catch (e) { return; }

  var startedAt = Date.now();

  function boot() {
    // ---------------- estado ----------------
    var fingerDown = false;
    var lastY = window.scrollY || 0;
    var lastRaf = 0;
    var maxGap = 0;
    var gaps100 = 0;
    var blockedTotal = 0;

    var freezeStart = 0;      // quando o scroll parou COM o dedo na tela
    var freezeGapSum = 0;     // quanto a main thread ficou bloqueada nessa travada
    var log = [];

    function push(line) {
      log.unshift(line);
      if (log.length > 7) log.pop();
    }

    // ---------------- UI ----------------
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

    // ---------------- toque (passivo) ----------------
    var opt = { passive: true, capture: true };
    document.addEventListener('touchstart', function () {
      fingerDown = true;
    }, opt);
    document.addEventListener('touchend', function (e) {
      if (!e.touches || e.touches.length === 0) fingerDown = false;
    }, opt);
    document.addEventListener('touchcancel', function () { fingerDown = false; }, opt);

    // ---------------- loop de medicao ----------------
    var painted = 0;
    function tick(t) {
      requestAnimationFrame(tick);

      if (lastRaf) {
        var gap = t - lastRaf;
        if (gap > maxGap) maxGap = gap;
        if (gap > 100) gaps100++;
        // tudo acima de ~32ms e frame perdido; acumula como "bloqueio"
        if (gap > 32) {
          blockedTotal += gap - 16.7;
          if (freezeStart) freezeGapSum += gap - 16.7;
        }
      }
      lastRaf = t;

      var y = window.scrollY || 0;
      var dy = y - lastY;
      lastY = y;

      // ---- deteccao de travada: dedo na tela e scroll parado ----
      if (fingerDown && Math.abs(dy) < 1) {
        if (!freezeStart) { freezeStart = t; freezeGapSum = 0; }
      } else {
        if (freezeStart) {
          var dur = t - freezeStart;
          if (dur > 250) {
            // ESTA e a linha que responde a pergunta
            var pct = dur > 0 ? Math.round(freezeGapSum / dur * 100) : 0;
            push(
              (dur / 1000).toFixed(2) + 's TRAVOU y=' + Math.round(y) +
              ' | main thread bloqueada ' + Math.round(freezeGapSum) + 'ms (' + pct + '%)'
            );
          }
          freezeStart = 0;
        }
      }

      // ---- render do overlay, ~8x/s para nao virar parte do problema ----
      if (t - painted > 125) {
        painted = t;

        // algum script da pagina remove nos soltos do body; o overlay se
        // reanexa sozinho em vez de sumir no meio da gravacao.
        if (!box.isConnected) {
          try { (document.body || document.documentElement).appendChild(box); } catch (e) {}
        }

        var pend = 0, imgs = document.images;
        for (var i = 0; i < imgs.length; i++) if (!imgs[i].complete) pend++;

        var frozenNow = freezeStart ? ((t - freezeStart) / 1000).toFixed(2) + 's' : '-';
        head.textContent =
          (fingerDown ? 'DEDO:SIM' : 'DEDO:nao') +
          '  y=' + Math.round(y) +
          '  v=' + Math.round(dy) +
          '  TRAVA:' + frozenNow;

        body.textContent =
          'rAF pior=' + Math.round(maxGap) + 'ms  >100ms=' + gaps100 +
          '  bloq.total=' + (blockedTotal / 1000).toFixed(1) + 's' +
          '  img pend=' + pend +
          '  t=' + ((Date.now() - startedAt) / 1000).toFixed(0) + 's\n' +
          (log.length ? log.join('\n') : '(sem travadas ainda)');

        // vermelho enquanto trava, verde quando normal
        box.style.color = freezeStart ? '#f33' : '#0f0';
      }
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
