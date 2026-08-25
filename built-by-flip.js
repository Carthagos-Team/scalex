(function(){
var SEED='34%';
var C='.section_built-by{position:relative}.sx-stage{position:absolute;top:0;left:calc(50% - 50vw);width:100vw;height:100vh;z-index:0}.built-by_card{position:relative;z-index:2}.built-by_background.sx-full{position:absolute;top:0;left:0;width:100%;height:100%;max-width:none;object-fit:cover}.built-by_background.sx-seed{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:'+SEED+';height:auto;aspect-ratio:16/10;max-width:none;object-fit:cover;display:block}';
function b(){
if(!(window.gsap&&window.ScrollTrigger&&window.Flip))return setTimeout(b,60);
var sc=document.querySelector('.section_built-by');if(!sc)return;
var wp=sc.querySelector('.built-by_overlay-wrapper'),im=sc.querySelector('.built-by_background'),cd=sc.querySelector('.built-by_card');
if(!wp||!im||!cd)return;
gsap.registerPlugin(ScrollTrigger,Flip);
document.head.insertAdjacentHTML('beforeend','<style>'+C+'</style>');
gsap.matchMedia().add('(min-width:992px)',function(){
var sg=document.createElement('div');sg.className='sx-stage';sc.insertBefore(sg,sc.firstChild);
var fl=null,p={v:0};
function mk(){
if(fl)fl.kill();
im.classList.remove('sx-full');im.classList.remove('sx-seed');gsap.set(im,{clearProps:'all'});
sg.appendChild(im);im.classList.add('sx-seed');
var st=Flip.getState(im);
im.classList.remove('sx-seed');im.classList.add('sx-full');
fl=Flip.from(st,{duration:1,ease:'none',paused:true,scale:false});fl.progress(p.v);
}
ScrollTrigger.getAll().forEach(function(t){if(t.trigger===cd)t.kill()});
gsap.set(cd,{clearProps:'all'});
var tl=gsap.timeline({scrollTrigger:{trigger:sc,start:'top top',end:'+=100%',pin:true,scrub:.6,onRefresh:mk}});
tl.to(p,{v:1,duration:.75,ease:'none',onUpdate:function(){if(fl)fl.progress(p.v)}},0);
tl.fromTo(cd,{autoAlpha:0,yPercent:8,filter:'blur(14px)',clipPath:'inset(0% 0% 100% 0%)'},{autoAlpha:1,yPercent:0,filter:'blur(0px)',clipPath:'inset(0% 0% 0% 0%)',duration:.28,ease:'power2.out'},.72);
ScrollTrigger.refresh();
return function(){if(fl)fl.kill();wp.appendChild(im);im.classList.remove('sx-full');im.classList.remove('sx-seed');gsap.set([im,cd],{clearProps:'all'});sg.remove()};
});
}
var f=document.createElement('script');f.src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js';f.onload=b;document.head.appendChild(f);
})();
