/* ScaleX — Shutter Scroll Transition
   Reveal/cover em "persianas" acionado por scroll (GSAP + ScrollTrigger).
   Aplicado hoje apenas na Home. Consolidado a partir de 5 scripts que
   existiam separados no Webflow só por causa do limite de 2000
   caracteres por script registrado — sem esse limite no GitHub, o
   arquivo inteiro roda como um bloco so, na mesma ordem de execucao
   de antes (estilos -> definicoes -> boot).
*/

(function () {
  var css =
    "[data-shutter-scroll-panel]{display:flex;flex-direction:column;width:100%;}" +
    "[data-shutter-scroll-row]{height:3em;width:100%;background-color:currentColor;backface-visibility:hidden;will-change:transform;}";
  var style = document.createElement("style");
  style.setAttribute("data-shutter-scroll-styles", "");
  style.textContent = css;
  document.head.appendChild(style);
})();
/* Shutter Scroll Transition — GSAP + ScrollTrigger
   Registrado como 3 inline scripts (limite de 2000 caracteres por script
   registrado no Webflow); todos rodam no mesmo escopo global, na ordem em
   que aparecem na pagina, entao as funcoes/consts do bloco 1 e 2 ja
   existem quando o bloco 3 chama initShutterScrollTransition(). */

const shutterDefaults = {
  rows: 6,
  mode: "cover",
  scrollStart: { cover: "bottom bottom", reveal: "top bottom" },
  scrollEnd: { cover: "bottom top", reveal: "top center" },
  scrub: 0.3,
  duration: 0.1,
  stagger: 0.01,
};
const shutterBreakpoints = {
  mobile: "(max-width: 478px)",
  landscape: "(max-width: 767px)",
  tablet: "(max-width: 991px)",
};
const shutterInstances = [];
let shutterMM = null;

function shutterGetMode(wrapper) {
  return wrapper.dataset.mode === "reveal" ? "reveal" : shutterDefaults.mode;
}

function shutterGetRows(wrapper) {
  const base = parseInt(wrapper.dataset.rows, 10) || shutterDefaults.rows;
  if (window.matchMedia(shutterBreakpoints.mobile).matches) {
    return parseInt(wrapper.dataset.rowsMobile, 10) || base;
  }
  if (window.matchMedia(shutterBreakpoints.landscape).matches) {
    return parseInt(wrapper.dataset.rowsLandscape, 10) || base;
  }
  if (window.matchMedia(shutterBreakpoints.tablet).matches) {
    return parseInt(wrapper.dataset.rowsTablet, 10) || base;
  }
  return base;
}

function shutterGetScrollStart(wrapper, mode) {
  return wrapper.dataset.scrollStart || shutterDefaults.scrollStart[mode];
}

function shutterGetScrollEnd(wrapper, mode) {
  return wrapper.dataset.scrollEnd || shutterDefaults.scrollEnd[mode];
}

function shutterCreateRow() {
  const row = document.createElement("div");
  row.classList.add("shutter-scroll-transition__row");
  row.setAttribute("data-shutter-scroll-row", "");
  return row;
}
function shutterBuildRows(wrapper, rows) {
  const panel = document.createElement("div");
  panel.classList.add("shutter-scroll-transition__panel");
  panel.setAttribute("data-shutter-scroll-panel", "");

  const fragment = document.createDocumentFragment();
  for (let r = 0; r < rows; r++) {
    fragment.appendChild(shutterCreateRow());
  }
  panel.appendChild(fragment);
  wrapper.appendChild(panel);

  return { panel };
}

function shutterCollectRows(panel) {
  return Array.from(panel.children);
}

function shutterCreateAnimation(wrapper, rows, section, mode) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: shutterGetScrollStart(wrapper, mode),
      end: shutterGetScrollEnd(wrapper, mode),
      scrub: shutterDefaults.scrub,
      invalidateOnRefresh: true,
    },
  });

  const fromScale = mode === "cover" ? 0 : 1;
  const toScale = mode === "cover" ? 1 : 0;
  const origin = mode === "cover" ? "bottom center" : "top center";

  gsap.set(rows, {
    scaleY: fromScale,
    transformOrigin: origin,
  });

  tl.to(rows, {
    scaleY: toScale,
    duration: shutterDefaults.duration,
    stagger: { each: shutterDefaults.stagger, from: "end" },
    ease: "none",
  });

  return tl;
}

function shutterSetupInstance(wrapper) {
  const section = wrapper.closest("section") || wrapper.parentElement;
  const rows = shutterGetRows(wrapper);
  const mode = shutterGetMode(wrapper);

  const { panel } = shutterBuildRows(wrapper, rows);
  const rowList = shutterCollectRows(panel);
  const tl = shutterCreateAnimation(wrapper, rowList, section, mode);

  return { wrapper, tl };
}

function shutterDestroyInstance(instance) {
  if (instance.tl) {
    instance.tl.scrollTrigger?.kill();
    instance.tl.kill();
  }
  const panel = instance.wrapper.querySelector("[data-shutter-scroll-panel]");
  if (panel) panel.remove();
}
function shutterBuildAll() {
  const wrappers = document.querySelectorAll("[data-shutter-scroll-transition]");
  wrappers.forEach((wrapper) => {
    shutterInstances.push(shutterSetupInstance(wrapper));
  });
  ScrollTrigger.refresh();
}

function shutterDestroyAll() {
  shutterInstances.forEach(shutterDestroyInstance);
  shutterInstances.length = 0;
}

function initShutterScrollTransition() {
  const wrappers = document.querySelectorAll("[data-shutter-scroll-transition]");
  if (!wrappers.length) return;

  shutterMM = gsap.matchMedia();

  shutterMM.add(
    {
      isDesktop: "(min-width: 992px)",
      isTablet: "(min-width: 768px) and (max-width: 991px)",
      isLandscape: "(min-width: 479px) and (max-width: 767px)",
      isMobile: "(max-width: 478px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions.reduceMotion) return;

      shutterBuildAll();

      return () => {
        shutterDestroyAll();
      };
    }
  );
}

gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  initShutterScrollTransition();
});
(function () {
  /* O Part3 registra o init em DOMContentLoaded. Se este boot rodasse
     antes desse evento, os dois construiriam e os tiles apareceriam
     em dobro. Esperar 'load' garante que o listener do Part3 ja
     disparou (ou nunca foi registrado, se o gsap faltou). So entao
     verificamos se ha paineis e, se nao houver, construimos. */
  function dedupe() {
    var n = 0;
    document.querySelectorAll('[data-shutter-scroll-transition]').forEach(function (w) {
      var panels = w.querySelectorAll('[data-shutter-scroll-panel]');
      for (var i = 1; i < panels.length; i++) { panels[i].remove(); n++; }
    });
    return n;
  }
  function go() {
    if (dedupe()) console.warn('[shutter] paineis duplicados removidos');
    if (document.querySelector('[data-shutter-scroll-panel]')) return;
    if (!document.querySelector('[data-shutter-scroll-transition]')) return;
    if (!window.gsap || !window.ScrollTrigger) return;
    if (typeof initShutterScrollTransition !== 'function') return;
    try {
      gsap.registerPlugin(ScrollTrigger);
      initShutterScrollTransition();
    } catch (e) {
      console.error('[shutter] boot falhou:', e);
    }
  }
  function start() {
    var n = 0;
    (function w() {
      if (window.gsap && window.ScrollTrigger) return setTimeout(go, 0);
      if (++n < 200) setTimeout(w, 50);
    })();
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
