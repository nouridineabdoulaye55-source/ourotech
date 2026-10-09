/* OUROTECH – comportements du site */
(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var menu=$('#menu'),bg=$('#burger');
function closeMenu(){menu.classList.remove('open');bg.setAttribute('aria-expanded','false')}
bg.onclick=function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
$$('#menu a').forEach(function(a){a.onclick=closeMenu});
/* Thème : choix mémorisé, sinon thème du système */
var root=document.documentElement,tb=$('#theme'),mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null,tc=$('meta[name=theme-color]');
function stored(){try{var s=localStorage.getItem('ouro-theme');return s==='light'||s==='dark'?s:null}catch(e){return null}}
function applyTheme(t){root.dataset.theme=t;if(tc)tc.content=t==='dark'?'#0b1220':'#ffffff';tb.setAttribute('aria-label',t==='dark'?'Passer en mode clair':'Passer en mode sombre');tb.title=tb.getAttribute('aria-label')}
applyTheme(root.dataset.theme||(mq&&mq.matches?'dark':'light'));
tb.onclick=function(){var n=root.dataset.theme==='dark'?'light':'dark';applyTheme(n);try{localStorage.setItem('ouro-theme',n)}catch(e){}};
if(mq){var sys=function(e){if(!stored())applyTheme(e.matches?'dark':'light')};mq.addEventListener?mq.addEventListener('change',sys):mq.addListener(sys)}
window.addEventListener('storage',function(e){if(e.key==='ouro-theme'&&(e.newValue==='light'||e.newValue==='dark'))applyTheme(e.newValue)});
 
/* Année du copyright */
var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
/* Image manquante : motif neutre avec icône (remplacé dès que vous ajoutez la photo) */
var P={bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',dish:'<path d="M4 4a12 12 0 0 0 16 16zM14 10l6-6M16 16v4"/>',panel:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h3M8 12h3M8 16h3M14 8h2M14 12h2M14 16h2"/>',lamp:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z"/>'};
function ph(i){if(!i.parentNode||i.dataset.done)return;i.dataset.done=1;var d=document.createElement('div');d.className='ph';d.setAttribute('role','img');d.setAttribute('aria-label',i.alt);d.innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[i.dataset.icon]||P.bolt)+'</svg>';i.replaceWith(d)}
document.addEventListener('error',function(e){if(e.target.tagName==='IMG')ph(e.target)},true);
$$('img[data-icon]').forEach(function(i){if(i.complete&&i.naturalWidth===0)ph(i)});
/* filtres */
$$('.filters button').forEach(function(b){b.onclick=function(){$$('.filters button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});$$('.gal button').forEach(function(g){g.hidden=b.dataset.f!=='all'&&g.dataset.cat!==b.dataset.f})}});
/* modale */
var m=$('#modal'),last;
$$('.gal button').forEach(function(g){g.onclick=function(){last=g;var el=$('img,.ph',g).cloneNode(true);el.removeAttribute('loading');$('#mi').replaceChildren(el);$('#mc').textContent=el.alt||el.getAttribute('aria-label')||'';m.classList.add('on');$('.x',m).focus()}});
function close(){m.classList.remove('on');if(last)last.focus()}
$('.x',m).onclick=close;m.onclick=function(e){if(e.target===m)close()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();closeMenu()}});
/* formulaire */
var f=$('#qf'),num;
$$('button[type=submit]',f).forEach(function(b){b.onclick=function(){num=b.dataset.n}});
f.onsubmit=function(e){e.preventDefault();var ok=true,d=new FormData(f);
 $$('[required]',f).forEach(function(i){var v=i.value.trim(),er=i.parentNode.querySelector('.err'),bad=!v;
  if(i.name==='tel'&&v&&!/^\+?[0-9 ]{8,15}$/.test(v))bad=true;
  i.setAttribute('aria-invalid',bad);er.textContent=bad?(i.name==='tel'&&v?'Entrez un numéro valide.':'Ce champ est obligatoire.'):'';if(bad&&ok){ok=false;i.focus()}});
 if(!ok)return;
 var t='Bonjour OUROTECH, je vous contacte depuis votre site internet.\n\nNom : '+d.get('nom').trim()+'\nTéléphone : '+d.get('tel').trim()+'\nQuartier / localité : '+d.get('lieu').trim()+'\nService : '+d.get('service')+'\nDescription : '+d.get('desc').trim()+(d.get('date')?'\nDate souhaitée : '+d.get('date'):'')+'\n\nMerci de me répondre pour un devis.';
 window.open('https://wa.me/'+(num||'22893356876')+'?text='+encodeURIComponent(t),'_blank','noopener')};
})();