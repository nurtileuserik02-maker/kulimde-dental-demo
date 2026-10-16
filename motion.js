// Motion enhancement: no content is hidden while waiting for scripts or observers.
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const root=document.documentElement;
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const hero=document.querySelector('.hero');
const portrait=document.querySelector('.hero-visual');
const header=document.querySelector('.header');
const float=document.createElement('a');float.className='mobile-booking';float.href='#booking';float.textContent='Записаться на приём ↗';float.hidden=true;document.body.append(float);
let ticking=false;
function paintScroll(){ticking=false;const max=root.scrollHeight-innerHeight;const value=max>0?scrollY/max:0;progress.style.transform=`scaleX(${value})`;header.classList.toggle('is-scrolled',scrollY>35);if(!reduce.matches){portrait.style.setProperty('--portrait-shift',`${Math.min(scrollY*.055,28)}px`);document.querySelectorAll('.smile path').forEach(path=>{const rect=path.closest('svg').getBoundingClientRect();const amount=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.65)));path.style.setProperty('--line-progress',String(amount));});}}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(paintScroll);}},{passive:true});addEventListener('resize',paintScroll,{passive:true});reduce.addEventListener('change',()=>{portrait.style.removeProperty('--portrait-shift');paintScroll();});paintScroll();
if('IntersectionObserver'in window){
 const entrances=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;el.classList.add('motion-enter');if(!reduce.matches&&el.animate){const siblings=[...el.parentElement.children];const delay=Math.min(siblings.indexOf(el)*85,255);el.animate([{opacity:.2,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay,easing:'cubic-bezier(.2,.75,.3,1)',fill:'backwards'});}entrances.unobserve(el);}),{threshold:.14});
 document.querySelectorAll('.service-card,.steps article,.gallery-photo,.gallery-art,.team-empty,.contacts-grid>div').forEach(el=>entrances.observe(el));
 const nav=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>{if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('section[id]').forEach(el=>nav.observe(el));
 let heroVisible=true,bookingVisible=false;const sync=()=>{float.hidden=heroVisible||bookingVisible;};new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;sync();}).observe(hero);new IntersectionObserver(entries=>{bookingVisible=entries[0].isIntersecting;sync();}).observe(document.querySelector('#booking'));
}
document.querySelectorAll('.button').forEach(button=>{button.addEventListener('pointermove',e=>{if(reduce.matches||!fine.matches)return;const r=button.getBoundingClientRect();button.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)*.045}px`);button.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)*.065}px`);});button.addEventListener('pointerleave',()=>{button.style.setProperty('--mx','0px');button.style.setProperty('--my','0px');});});
