/* =============================================================
   ScaleX — Loader "corte no X"
   -------------------------------------------------------------
   A chapa azul da marca tem um RECORTE em forma do X. O recorte
   nasce como um ponto no centro, cresce ate o X do logo (branco),
   o branco fica TRANSPARENTE — o X passa a ser uma janela para a
   hero — e um unico zoom continuo abre o corte ate a chapa sair
   inteira da viewport.

   POR QUE A ANCORA DO ZOOM NAO E O CENTRO
   ---------------------------------------
   Escalar em torno de P mapeia a forma para P + k*(S - P). Um ponto
   Q da tela e coberto se a pre-imagem P + (Q - P)/k estiver dentro
   da forma; com k -> infinito essa pre-imagem tende a P. Ou seja: se
   P estiver no interior solido da marca, a viewport inteira acaba
   coberta. Se P estiver num VAZIO, sempre sobra cunha azul.

   O centro geometrico do X da ScaleX (128,160 no espaco 256x320) cai
   exatamente num vazio — o X sao tres pecas soltas (o chevron ">" e
   duas barras), sem centro solido. Por isso o zoom ancorado no centro
   nunca limpava a tela.

   A solucao: durante o zoom a ancora interpola do centro (para os
   frames iniciais ficarem centralizados, fieis ao Figma) para
   (154,222), que fica DENTRO da barra inferior-direita e e a ancora
   de maior folga inscrita em toda proporcao de tela testada.

   POR QUE O ZOOM E EM ESPACO LOG
   ------------------------------
   Zoom e percebido multiplicativamente. Animar a altura linearmente
   de 0.30 a ~20 vh distribui mal a sensacao de velocidade. Anima-se
   z = log(h) e aplica-se h = exp(z): taxa de zoom percebida constante
   (a tecnica de dolly de camera).

   Requer GSAP (+ CustomEase). Ambos ja estao no site, carregados no
   topo do footer pela integracao nativa do Webflow — por isso este
   script registra a promise de forma SINCRONA e so anima quando o
   GSAP aparece.

   Expoe window.ScaleXLoader.heroReady: a timeline de entrada da hero
   espera por essa promise (ver INSTALL-loader.md).
   ============================================================= */
(function () {
  'use strict';

  if (window.ScaleXLoader) return; // idempotente

  /* ---------- escopo ----------
     Roda so na home. window.SX_LOADER_FORCE = true libera em
     qualquer rota (usado pelo harness de teste local). */
  if (!window.SX_LOADER_FORCE && location.pathname !== '/') return;

  /* ---------- config ---------- */
  var BRAND_BLUE = '#4A48E4';
  var X_WHITE = '#FFFFFF';

  var H_LOGO = 0.30;   // altura do X (fracao da viewport) no pose do logo

  /* Ritmo calibrado contra a referencia, medido quadro a quadro a 25fps:
     ela leva 0.28s da tela vazia ate o X legivel e 0.84s de corte visivel.
     A primeira versao daqui gastava 1.03s antes do zoom (0.75 + 0.28) —
     3.7x mais que a referencia, e era isso que tirava o "dinamico".
     Mantemos um dwell curto porque, ao contrario da referencia, os frames
     do Figma pedem que o X da marca seja lido antes do corte. */
  var D_IN = 0.55;     // ponto -> X do logo
  var D_DWELL = 0.18;  // o logo pousa e respira
  var D_ZOOM = 1.30;   // zoom unico e continuo (~0.90s visiveis)
  /* O fade do branco tem que cair ONDE JA HA CRESCIMENTO. Na primeira
     versao ele comecava em 0.10s do zoom — bem na parte lenta do
     power2.in — e o resultado, medido nos frames, era ~0.4s de troca
     de cor com o X praticamente parado. Comecando em 0.30s o X vai de
     0.37 a 0.98 vh durante o fade: a transparencia acontece com a
     marca visivelmente crescendo, como na referencia. */
  var D_FADE = 0.40;   // branco -> transparente
  var T_FADE = 0.30;   // offset do fade dentro do zoom
  var T_HERO = 0.75;   // quando a hero e liberada, dentro do zoom

  /* A ancora usa um ease mais tardio que o zoom de proposito: assim o
     crescimento visivel comeca centrado (fiel aos frames do Figma) e o
     desvio so acontece no fim, quando o X ja esta saindo da tela. */
  var EASE_ANCHOR = 'power3.in';

  /* Ease do zoom. NAO usar o "drift" da referencia aqui.
     Medido quadro a quadro: drift (C0.65,0 0,1.04) segura em y~0 ate
     x~0.65, entao 65% da duracao nao sai do lugar e todo o range se
     espreme no final — o zoom inteiro colapsou em 0.32s visiveis.
     Funciona na referencia porque o blowout dela e ~4x; o nosso
     precisa ser ~17x (marca fina e solta, sem centro solido), ou seja
     2.7x mais range em espaco log.

     power2.in em espaco LOG = taxa de zoom que cresce linearmente
     (aceleracao de dolly). Como os ultimos ~2 nats acontecem com o X
     ja fora da tela, acelerar no fim gasta o tempo onde ha algo
     para ver: ~72% da duracao fica na faixa visivel. */
  var EASE_ZOOM = 'power2.in';
  var EASE_IN = 'expo.out';

  var ANCHOR_FROM = [128, 160]; // centro do desenho (cai num vazio)
  var ANCHOR_TO = [154, 222];   // interior da barra inferior-direita

  var MAX_WAIT = 4000;  // fail-safe: nunca segura a pagina mais que isso
  var GSAP_WAIT = 3000; // desiste de esperar o GSAP

  /* ---------- motor WebGL da hero: carga adiada ----------
     O motor (three.min.js + scalex-hero-webgl-alt3.js — a variante que a
     Home usa hoje; se a Home trocar de variante, atualizar aqui tambem)
     tem DOIS relogios internos independentes de qualquer coisa que a
     pagina faca:
       - "intro" (window.SCALEX.replayIntro() reseta): padrao expande,
         tiles aparecem em stagger, ~2.4-3.5s.
       - "reveal" (SEM api publica de reset): uma mascara em X que se
         abre via fade, mas so COMEÇA depois de gRevealDelay segundos
         reais desde o mount do script — 1 a 4s, direto do config.
     Em paginas sem loader (Ethos etc.) os dois relogios comecam a contar
     no load da pagina, exatamente quando o texto tambem e liberado —
     por isso o fundo "anima junto" com o texto la.
     Na Home, os scripts do motor carregavam estaticos no footer, ou
     seja, os relogios comecavam a contar ~2.5s ANTES da chapa abrir —
     quando o corte finalmente revela a hero, o "intro" ja foi resetado
     por replayIntro() (abaixo, mantido como reforço), mas o "reveal"
     nao tem API de reset e ja pode ter disparado fora de sincronia.
     A correcao robusta: nao carregar o motor estaticamente. Os dois
     <script> dele foram REMOVIDOS do footer da Home (ver INSTALL) e
     este loader os injeta agora, no exato instante do releaseHero() —
     os relogios do motor so comecam a contar dali, em sincronia com o
     texto, reproduzindo fielmente o que acontece nas paginas sem loader.
     O <link rel=preload> abaixo evita que isso custe tempo de rede: os
     arquivos ja estao no cache do navegador bem antes do release. */
  var WEBGL_URLS = [
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdn.jsdelivr.net/gh/samuelcardoso-cc/scalex@main/scalex-hero-webgl-alt3.js'
  ];
  var webglInjected = false;

  function preloadWebgl() {
    var head = document.head;
    if (!head) return;
    for (var i = 0; i < WEBGL_URLS.length; i++) {
      var link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = WEBGL_URLS[i];
      head.appendChild(link);
    }
  }

  function loadWebglNow() {
    if (webglInjected) return;
    webglInjected = true;
    var parent = document.body || document.head;
    for (var i = 0; i < WEBGL_URLS.length; i++) {
      var s = document.createElement('script');
      s.src = WEBGL_URLS[i];
      s.async = false; // preserva a ordem: three.min.js antes do motor
      parent.appendChild(s);
    }
  }

  // Elementos da hero mantidos escondidos enquanto o loader roda, para
  // nao piscarem por dentro do recorte antes de animarem. Seletores
  // expandidos de proposito: :is() com combinador (".hero_actions > *")
  // tem suporte mais recente que o resto do snippet.
  var HOLD = [
    '.hero_background-wrapper',
    '.hero_index',
    '.hero_heading',
    '.hero_paragraph',
    '.hero_actions > *'
  ];

  // Escala final do zoom, derivada da proporcao da tela. Validado por
  // busca do maior retangulo inscrito na ancora (154,222): margem de
  // 1.33x (1:1) a 1.93x (retrato) sobre o minimo necessario.
  function hBlow() {
    return Math.max(12, 11 * window.innerWidth / window.innerHeight);
  }

  /* ---------- geometria do X (espaco original 256 x 320) ---------- */
  var VB_H = 320;
  var RAW = [
    'M152.496 177.947C151.608 176.740 149.79 176.740 148.902 177.947L120.736 216.165C120.16 216.947 120.16 218.019 120.736 218.801L195.332 320H252.786C254.619 320 255.67 317.919 254.584 316.455L152.496 177.955V177.947Z',
    'M118.498 158.192L43.0355 52.9012C42.7301 52.4821 42.2612 52.2334 41.7569 52.2334H1.59258C0.285505 52.2334 -0.460383 53.7607 0.313919 54.8334L74.3841 158.192C74.5901 158.476 74.6896 158.817 74.6896 159.158C74.6896 159.499 74.5901 159.84 74.3841 160.124L0.313919 263.483C-0.460383 264.563 0.285505 266.083 1.59258 266.083H41.764C42.2683 266.083 42.7443 265.834 43.0426 265.415L118.505 160.124C118.711 159.84 118.811 159.499 118.811 159.158C118.811 158.817 118.711 158.476 118.505 158.192H118.498Z',
    'M152.496 142.053C151.608 143.260 149.79 143.260 148.902 142.053L120.736 103.835C120.16 103.053 120.16 101.981 120.736 101.199L195.339 0H252.793C254.626 0 255.677 2.08138 254.591 3.54474L152.503 142.045L152.496 142.053Z'
  ];

  var ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, Z: 0 };

  function parsePath(d) {
    var t = d.match(/[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
    var out = [], i = 0;
    while (i < t.length) {
      var c = t[i].toUpperCase(); i++;
      var n = ARGS[c];
      if (n === 0) { out.push({ c: c, a: [] }); continue; }
      while (i < t.length && !/^[MLHVCZ]$/i.test(t[i])) {
        out.push({ c: c, a: t.slice(i, i + n).map(Number) });
        i += n;
      }
    }
    return out;
  }

  var SHAPE = RAW.map(parsePath);

  /* Path do X em px: screen = (cx,cy) + k * (raw - (ax,ay)).
     k = 0 colapsa todos os pontos na ancora => recorte inexistente
     (o "ponto" inicial, sem precisar de um path separado). */
  function xPath(k, ax, ay, cx, cy) {
    var out = '';
    for (var s = 0; s < SHAPE.length; s++) {
      var cmds = SHAPE[s];
      for (var i = 0; i < cmds.length; i++) {
        var c = cmds[i].c, a = cmds[i].a;
        if (c === 'Z') { out += 'Z'; continue; }
        if (c === 'H') { out += 'H' + (cx + (a[0] - ax) * k).toFixed(2); continue; }
        if (c === 'V') { out += 'V' + (cy + (a[0] - ay) * k).toFixed(2); continue; }
        var p = [];
        for (var j = 0; j < a.length; j += 2) {
          p.push(
            (cx + (a[j] - ax) * k).toFixed(2),
            (cy + (a[j + 1] - ay) * k).toFixed(2)
          );
        }
        out += c + p.join(' ');
      }
    }
    return out;
  }

  /* ---------- handoff: registrado JA, de forma sincrona ----------
     O bloco de text reveals roda no footer do site, ANTES do footer
     da pagina. Este script vive no <head> da home justamente para
     que window.ScaleXLoader exista quando aquele bloco for avaliado. */
  var resolveHero;
  var heroReady = new Promise(function (r) { resolveHero = r; });

  var state = { h: 0, z: 0, a: 0 };

  window.ScaleXLoader = {
    heroReady: heroReady,
    state: state
  };

  var root = document.documentElement;
  root.classList.add('sx-pre', 'sx-loading');

  /* Fail-safe duro: se qualquer coisa abaixo falhar (GSAP ausente,
     excecao, erro de rede no meio), a pagina nunca fica presa. */
  var settled = false;
  function bail() {
    if (settled) return;
    settled = true;
    resolveHero();
    root.classList.remove('sx-pre', 'sx-loading', 'sx-mounted');
    var el = document.querySelector('.sx-loader');
    if (el) el.remove();
    if (window.lenis && window.lenis.start) window.lenis.start();
  }
  setTimeout(bail, MAX_WAIT + GSAP_WAIT + 4000);

  /* ---------- CSS ---------- */
  var css = document.createElement('style');
  css.textContent =
    // pre-pintura: a marca aparece antes de qualquer JS/DOM do loader
    'html.sx-pre::before{content:"";position:fixed;top:0;right:0;bottom:0;left:0;' +
      'background:' + BRAND_BLUE + ';z-index:2147482999;}' +
    'html.sx-mounted::before{display:none;}' +
    '.sx-loader{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;}' +
    '.sx-loader__defs{position:absolute;width:0;height:0;overflow:hidden;}' +
    '.sx-loader__plate{position:absolute;top:0;right:0;bottom:0;left:0;' +
      'background:' + BRAND_BLUE + ';' +
      '-webkit-clip-path:url(#sx-cut);clip-path:url(#sx-cut);}' +
    '.sx-loader__x{position:absolute;top:0;right:0;bottom:0;left:0;' +
      'background:' + X_WHITE + ';' +
      '-webkit-clip-path:url(#sx-fill);clip-path:url(#sx-fill);}' +
    'html.sx-loading,html.sx-loading body{overflow:hidden !important;}' +
    HOLD.map(function (s) { return 'html.sx-loading ' + s; }).join(',') +
      '{opacity:0 !important;}';

  (document.head || root).appendChild(css);

  /* ---------- DOM ---------- */
  var wrap = document.createElement('div');
  wrap.className = 'sx-loader';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<svg class="sx-loader__defs" aria-hidden="true">' +
      '<defs>' +
        // chapa: retangulo da viewport + X com evenodd => o X vira furo
        '<clipPath id="sx-cut" clipPathUnits="userSpaceOnUse">' +
          '<path id="sx-cut-path" clip-rule="evenodd" d="" />' +
        '</clipPath>' +
        // preenchimento branco: so o X
        '<clipPath id="sx-fill" clipPathUnits="userSpaceOnUse">' +
          '<path id="sx-fill-path" d="" />' +
        '</clipPath>' +
      '</defs>' +
    '</svg>' +
    '<div class="sx-loader__plate"></div>' +
    '<div class="sx-loader__x"></div>';

  var cutPath, fillPath, xFill;

  function render() {
    if (!cutPath) return;
    var vw = window.innerWidth, vh = window.innerHeight;
    var k = state.h * vh / VB_H;
    var ax = ANCHOR_FROM[0] + (ANCHOR_TO[0] - ANCHOR_FROM[0]) * state.a;
    var ay = ANCHOR_FROM[1] + (ANCHOR_TO[1] - ANCHOR_FROM[1]) * state.a;
    var x = xPath(k, ax, ay, vw / 2, vh / 2);
    cutPath.setAttribute('d', 'M0 0H' + vw + 'V' + vh + 'H0Z' + x);
    fillPath.setAttribute('d', x);
  }

  function mount() {
    if (cutPath) return;
    (document.body || root).appendChild(wrap);
    cutPath = wrap.querySelector('#sx-cut-path');
    fillPath = wrap.querySelector('#sx-fill-path');
    xFill = wrap.querySelector('.sx-loader__x');
    render();
    // a chapa real ja esta pintando: solta a pre-pintura, senao ela
    // ficaria azul atras do recorte e bloquearia a hero
    root.classList.add('sx-mounted');
    if (window.lenis && window.lenis.stop) window.lenis.stop();
    preloadWebgl();
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });

  window.addEventListener('resize', render);

  /* ---------- reduced motion: pula tudo ---------- */
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bail();
    return;
  }

  /* ---------- espera o GSAP ---------- */
  function whenGsap(cb) {
    if (window.gsap) return cb();
    var t0 = Date.now();
    var iv = setInterval(function () {
      if (window.gsap) { clearInterval(iv); cb(); }
      else if (Date.now() - t0 > GSAP_WAIT) { clearInterval(iv); bail(); }
    }, 50);
  }

  /* ---------- pagina pronta ---------- */
  var pageReady = new Promise(function (resolve) {
    if (document.readyState === 'complete') return resolve();
    window.addEventListener('load', resolve, { once: true });
    setTimeout(resolve, MAX_WAIT);
  });

  function releaseHero() {
    resolveHero();

    // Carrega o motor WebGL agora (ver nota grande acima, perto de
    // WEBGL_URLS) — os relogios internos dele (intro + reveal) so
    // comecam a contar a partir deste instante, em sincronia com o
    // texto. Reforco defensivo: se por algum motivo o motor JA estava
    // rodando (ex. tags estaticas nao removidas), replayIntro() ainda
    // reseta o que ele expoe publicamente.
    if (window.SCALEX && typeof window.SCALEX.replayIntro === 'function') {
      try { window.SCALEX.replayIntro(); } catch (e) {}
    } else {
      loadWebglNow();
    }

    // A hero aplica seus gsap.set() em microtask; solta o hold no frame
    // seguinte para nao existir 1 frame com o conteudo no estado final.
    requestAnimationFrame(function () {
      root.classList.remove('sx-loading');
      if (window.lenis && window.lenis.start) window.lenis.start();
    });
  }

  function finish() {
    settled = true;
    wrap.remove();
    root.classList.remove('sx-pre', 'sx-loading', 'sx-mounted');
    if (window.lenis && window.lenis.start) window.lenis.start();
  }

  /* ---------- timeline ---------- */
  whenGsap(function () {
    var gsap = window.gsap;
    if (document.readyState !== 'loading' && !cutPath) mount();

    // Disponibiliza o ease da referencia para comparacao em QA, mas o
    // zoom usa EASE_ZOOM (ver nota no topo sobre por que drift falha aqui).
    if (window.CustomEase) {
      try { window.CustomEase.create('sxDrift', 'M0,0 C0.65,0 0,1.04 1,1'); } catch (e) {}
    }

    /* Fase 1 + 2: ponto -> X do logo, e o dwell.
       A entrada desacelera ao chegar no pose (expo.out). O dwell e uma
       pausa DELIBERADA — o logo se apresenta antes da camera avancar
       (staging), diferente das paradas acidentais que existiam quando
       o zoom era picado em varios tweens. */
    function introTimeline() {
      return gsap.timeline()
        .to(state, { h: H_LOGO, duration: D_IN, ease: EASE_IN, onUpdate: render })
        .to({}, { duration: D_DWELL });
    }

    /* Fase 3: UM zoom continuo, em espaco log, com a ancora no MESMO
       tween — sincronia garantida, sem tranco. O branco vira
       transparente sobre o inicio do zoom, e a hero e liberada com o
       corte ja aberto o suficiente para ela aparecer por dentro. */
    function zoomTimeline() {
      var L = Math.log(H_LOGO);
      var U = Math.log(hBlow());
      state.z = L;

      return gsap.timeline()
        .fromTo(state,
          { z: L },
          {
            z: U, duration: D_ZOOM, ease: EASE_ZOOM,
            onUpdate: function () { state.h = Math.exp(state.z); render(); }
          }
        )
        // mesma janela do zoom, ease mais tardio: centrado no inicio,
        // desvia so quando ja esta fora da tela
        .fromTo(state, { a: 0 }, { a: 1, duration: D_ZOOM, ease: EASE_ANCHOR }, '<')
        .to(xFill, { autoAlpha: 0, duration: D_FADE, ease: 'power2.inOut' }, '<' + T_FADE)
        .add(releaseHero, '<' + (T_HERO - T_FADE));
    }

    /* Replay manual, para QA — nao espera o load da pagina. */
    window.ScaleXLoader.play = function (onDone) {
      state.h = 0; state.a = 0;
      if (xFill) { xFill.style.visibility = ''; xFill.style.opacity = 1; }
      render();
      return gsap.timeline()
        .add(introTimeline())
        .add(zoomTimeline())
        .add(function () { finish(); if (onDone) onDone(); });
    };

    // Fluxo real: toca a intro de imediato e segura o zoom ate a
    // pagina terminar de carregar (com fail-safe de MAX_WAIT).
    var intro = introTimeline().pause();
    var introDone = new Promise(function (r) { intro.eventCallback('onComplete', r); });
    intro.play();

    Promise.all([introDone, pageReady]).then(function () {
      zoomTimeline().add(finish);
    });
  });

  /* ---------- QA (inofensivo em producao) ---------- */
  window.ScaleXLoader.check = function () {
    if (!cutPath) return 'loader nao montado';
    state.h = hBlow(); state.a = 1; render();
    if (xFill) xFill.style.visibility = 'hidden';
    var bad = 0, N = 40;
    for (var i = 0; i <= N; i++) {
      for (var j = 0; j <= N; j++) {
        var el = document.elementFromPoint(
          i * (window.innerWidth - 1) / N,
          j * (window.innerHeight - 1) / N
        );
        if (el && el.classList && el.classList.contains('sx-loader__plate')) bad++;
      }
    }
    var total = (N + 1) * (N + 1);
    return bad
      ? 'FALHA: ' + bad + '/' + total + ' pontos ainda com chapa'
      : 'OK: chapa 100% fora da viewport (' + total + ' pontos)';
  };
})();
