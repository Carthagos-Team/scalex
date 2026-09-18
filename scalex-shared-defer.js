/* scalex-shared-defer.js — bundle deferrable site-wide */
/* fonte: typography-no-widows.js (samuelcardoso-cc/scalex@34eb866) */
(function(){var s=document.createElement('style');s.textContent='h1,h2,h3,h4,h5,h6,[data-nowidow="balance"]{text-wrap:balance}p,li,figcaption,blockquote,dd{text-wrap:pretty}[data-nowidow="off"],[data-nowidow="off"] *{text-wrap:wrap}';document.head.appendChild(s);var P=!!(window.CSS&&CSS.supports&&CSS.supports('text-wrap','pretty')),SEL='h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,dd',SKIP='.navbar_menu-link,[data-highlight-text],[data-nowidow="off"],pre,code',G=/\b(the|and|an|a|by|of|for)([ \t\n\r]+)(?=(\S+))/gi,T;function fix(e){if(e.dataset.widow||e.closest(SKIP)||e.querySelector(SEL))return;e.dataset.widow='1';var k=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),a=[],n;while(n=k.nextNode()){if(n.nodeValue.trim())a.push(n)}if(!a.length)return;a.forEach(function(d){var o=d.nodeValue,v=o.replace(G,function(m,w,x,y){return w.length+y.length>16?m:w+'\u00A0'});if(v!==o)d.nodeValue=v});if(P)return;var t=e.textContent.trim().split(/\s+/);if(t.length<4||t[t.length-1].length>14)return;var d=a[a.length-1],v=d.nodeValue,r=v.match(/\s*$/)[0],c=v.slice(0,v.length-r.length);if(/\u00A0\S+$/.test(c))return;var i=c.lastIndexOf(' ');if(i<0)return;d.nodeValue=c.slice(0,i)+'\u00A0'+c.slice(i+1)+r}function run(f){if(f){document.querySelectorAll('[data-widow]').forEach(function(e){delete e.dataset.widow})}document.querySelectorAll(SEL).forEach(fix)}window.ScaleXNoWidows={run:run};function q(){clearTimeout(T);T=setTimeout(function(){run()},150)}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){run()})}else{run()}new MutationObserver(q).observe(document.documentElement,{childList:true,subtree:true})})();

/* fonte: scalex-mobile-scroll-fix.js (Carthagos-Team/scalex@698fac7) */
/* ScaleX — correções de scroll mobile
 * ---------------------------------------------------------------------------
 * Diagnóstico (Playwright + CDP, iPhone emulado 393x852 @DPR3, CPU 4x slowdown,
 * rede 4G, gesto de toque real via Input.synthesizeScrollGesture, trace do
 * DevTools cobrindo carga + 1ª descida + subida + 2ª descida):
 *
 *   - A main thread fica ~1% ocupada durante o scroll (204ms de RunTask em 21s)
 *     e tem ZERO long tasks >50ms. LayoutShift cumulativo = 0. Maior Layout:
 *     2,3ms. Ou seja: o travamento NÃO é JavaScript, não é GSAP/ScrollTrigger,
 *     não é reflow. Todas as tentativas anteriores miraram aí e por isso
 *     nenhuma mudou nada.
 *   - O custo está fora da main thread: decode de imagem, raster e GPU, em
 *     trabalho que só acontece UMA vez (na primeira vez que cada coisa entra
 *     na tela). É esse "uma vez só" que produz o sintoma de travar só na
 *     primeira descida.
 *
 * Medições A/B (GPU real, frames >32ms em 1ª descida / subida / 2ª descida):
 *   baseline ................................. 9 / 2 / 1
 *   todas as imagens bloqueadas .............. 2 / 0 / 0
 *   só os 3 arquivos .lottie bloqueados ...... 0 / 0 / 0
 *
 * Tudo aqui é gated para mobile/touch. O desktop não muda — já foi aprovado
 * pelo cliente e medido como saudável.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var isMobile = window.matchMedia('(max-width: 991px)').matches;
  var isCoarse = window.matchMedia('(pointer: coarse)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ---------------------------------------------------------------------
   * [A3] O mapa mundi engole o scroll vertical da página.
   *
   * O jsvectormap aplica `touch-action: none` no seu container. Com o dedo
   * em cima do mapa, a página inteira para de rolar — medido: o scroll
   * congela em scrollY≈11527 e não sai mais do lugar, em qualquer direção.
   * Isso é um bug funcional independente do jank, e trava o usuário real
   * do mesmo jeito que travou a primeira rodada de medição.
   *
   * `pan-y` devolve o scroll vertical para a página e mantém o pan
   * horizontal / tap do mapa.
   *
   * Gated por (pointer: coarse) e não por largura: um notebook com tela de
   * toque em largura desktop cai na mesma armadilha. Em mouse a regra é
   * inerte — touch-action só afeta entrada por toque.
   * ------------------------------------------------------------------- */
  if (isCoarse) {
    // Injetado via onReady além da tentativa imediata: se este script for
    // avaliado antes de <head> existir, appendChild em null lança e a regra
    // some silenciosamente (foi exatamente o que aconteceu no primeiro teste).
    // CAUSA RAIZ: jsvectormap.min.css traz a regra GLOBAL E SEM ESCOPO
    //     svg { -ms-touch-action: none; touch-action: none }
    // que aplica touch-action:none a TODO <svg> da pagina — badges Lottie,
    // icones, logos, o grafico do heartbeat, setas. Onde o dedo cair num svg,
    // o scroll vertical morre. Sao dezenas de zonas mortas pela pagina.
    // Medido com dedo controlado (dispatchTouchEvent passo a passo): na faixa
    // y6000-6999 a eficiencia do scroll era de 1% — o dedo pediu 5824px e a
    // pagina andou 39px.
    //
    // Alem disso, o container do mapa tem handler proprio: com 1 dedo ele
    // arrasta o mapa (transX/transY) e chama preventDefault() num listener
    // nao-passivo. Ai touch-action sozinho nao basta — testado. Como o mapa
    // aqui e decorativo (o codigo da Home so pinta regioes, com
    // zoomOnScroll:false, zoomButtons:false e nenhum handler de clique),
    // tira-lo do caminho do toque e o que libera o scroll. Perde-se so o
    // tooltip por toque.
    var MAP_CSS =
      '@media (pointer: coarse){' +
      'svg{touch-action:auto !important}' +
      '.jvm-container,.jvm-container svg{touch-action:pan-y !important;pointer-events:none !important}' +
      '}';

    var injectMapCss = function () {
      try {
        if (document.querySelector('style[data-scalex-mobile-scroll-fix="map-touch-action"]')) return true;
        var host = document.head || document.documentElement;
        if (!host) return false;
        var st = document.createElement('style');
        st.setAttribute('data-scalex-mobile-scroll-fix', 'map-touch-action');
        st.textContent = MAP_CSS;
        host.appendChild(st);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (!injectMapCss()) onReady(injectMapCss);
  }

  if (!isMobile) return;

  /* ---------------------------------------------------------------------
   * [A2] Badges Share/Support/Source: 3 Lotties com renderer SVG, autoplay
   * e loop=0 — tocam UMA vez, na primeira vez que entram na tela, e nunca
   * mais. Renderer SVG repinta a árvore DOM a cada frame. Custo one-shot =
   * exatamente o sintoma "só trava na primeira descida". Bloquear só esses
   * 3 arquivos levou os frames longos de 9/2/1 para 0/0/0.
   *
   * O que NÃO funciona (testado):
   *   - remover data-animation-type, como foi feito no depth-tiles: o badge
   *     fica invisível;
   *   - só data-autoplay="0": o badge fica EM BRANCO, porque o frame 0 da
   *     animação é vazio.
   *
   * O que funciona: autoplay=0 + pular para o último frame pela própria API
   * de lottie do Webflow. Verificado por screenshot — o resultado é
   * visualmente idêntico ao estado final de hoje.
   * ------------------------------------------------------------------- */
  var BADGE = '.carry_step-icon';

  onReady(function () {
    try {
      document.querySelectorAll(BADGE + '[data-animation-type="lottie"]').forEach(function (el) {
        el.setAttribute('data-autoplay', '0');
      });
    } catch (e) {}
  });

  (function freezeBadgeLotties() {
    var done = (typeof WeakSet === 'function') ? new WeakSet() : null;
    var tries = 0;
    var MAX = 300; // ~60s a cada 200ms: cobre o lottie que só registra ao entrar na tela

    var timer = setInterval(function () {
      tries++;
      var anims = null;

      try {
        var L = window.Webflow && window.Webflow.require && window.Webflow.require('lottie');
        anims = L && L.lottie && L.lottie.getRegisteredAnimations();
      } catch (e) {}

      if (anims && anims.length) {
        anims.forEach(function (a) {
          try {
            if (!a.wrapper || !a.wrapper.closest || !a.wrapper.closest(BADGE)) return;
            if (done && done.has(a)) return;
            a.goToAndStop(Math.max(0, (a.totalFrames || 1) - 1), true);
            if (done) done.add(a);
          } catch (e) {}
        });
      }

      if (tries >= MAX) clearInterval(timer);
    }, 200);
  })();

  /* ---------------------------------------------------------------------
   * [A1] Imagens lazy.
   *
   * Na 1ª descida o trace mostrou 14 requests + 16 decodes + 16 uploads de
   * textura; na subida, ZERO; na 2ª descida, quase nada. Decode e upload
   * são cacheados depois — esse é o mecanismo do "só na primeira passada".
   *
   * Agravante: as 30 imagens são loading="lazy", nenhuma tem width/height,
   * e várias estão entre 2,3x e 3,9x acima da resolução em que são exibidas
   * (fator linear) — até ~15x mais pixels para decodificar:
   *
   *   first.avif / second.avif ....... 1872px para uma caixa de 483px @DPR3
   *   img_carry.avif ................. 1503px para 483px
   *   Arjun Sethi.avif ............... 700px para 237px
   *
   * Aqui a gente só ANTECIPA: um IntersectionObserver com margem de 2 telas
   * dispara o fetch e o decode antes da imagem chegar perto do viewport,
   * tirando os dois de cima do gesto. Continua carregando só o que o usuário
   * está se aproximando — não puxa as 30 de uma vez.
   *
   * ISTO É MITIGAÇÃO, NÃO A CORREÇÃO DE RAIZ. Redimensionar os assets e pôr
   * width/height nas imagens continua pendente e é trabalho manual no
   * Designer — dá menos bytes, menos decode e mata reflow de imagem.
   *
   * Nota de implementação: NÃO usar MutationObserver no documento inteiro.
   * Com GSAP/SplitText mutando DOM o tempo todo isso vira tempestade de
   * callbacks (testado: trava a página). A lista é enumerada uma vez.
   * ------------------------------------------------------------------- */
  if (!('IntersectionObserver' in window)) return;

  function warm(img) {
    try { img.loading = 'eager'; } catch (e) {}

    function decode() {
      if (img.decode) {
        img.decode().catch(function () {});
      }
    }

    if (img.complete && img.naturalWidth) {
      decode();
      return;
    }

    // Fallback para browsers que não re-disparam o fetch ao trocar
    // loading=lazy -> eager: aquece o cache HTTP com o MESMO candidato do
    // srcset (por isso srcset/sizes são copiados antes do src) e só então
    // pede o decode do elemento real.
    try {
      var pre = new Image();
      if (img.srcset) pre.srcset = img.srcset;
      if (img.sizes) pre.sizes = img.sizes;
      if (img.src) pre.src = img.src;
      pre.onload = pre.onerror = decode;
    } catch (e) {
      decode();
    }
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        warm(en.target);
      });
    },
    { rootMargin: '200% 0px 200% 0px' }
  );

  onReady(function () {
    try {
      document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
        io.observe(img);
      });
    } catch (e) {}
  });
})();
