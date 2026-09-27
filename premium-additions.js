(function(){
  const q=s=>document.querySelector(s), qa=s=>Array.from(document.querySelectorAll(s));
  const audio=q('#premium-audio-element'), toggle=q('#premium-audio-toggle'), progress=q('#premium-progress'), fill=q('#premium-progress span');
  if(!audio||!toggle)return;
  const setPlaying=playing=>{toggle.textContent=playing?'Ⅱ':'▶';toggle.setAttribute('aria-label',playing?'Pause preview':'Play preview');};
  const start=()=>audio.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));
  toggle.addEventListener('click',()=>audio.paused?start():(audio.pause(),setPlaying(false)));
  q('#premium-audio-close')?.addEventListener('click',()=>q('#premium-audio')?.remove());
  q('#premium-volume')?.addEventListener('input',e=>audio.volume=e.target.value);
  audio.addEventListener('timeupdate',()=>{if(audio.duration)fill.style.width=(audio.currentTime/audio.duration*100)+'%';});
  progress.addEventListener('click',e=>{if(audio.duration)audio.currentTime=e.offsetX/progress.clientWidth*audio.duration;});
  qa('[data-premium-track]').forEach(button=>button.addEventListener('click',()=>{q('#premium-track').textContent=button.dataset.premiumTrack+' · welcome preview';start();}));
  qa('[data-premium-video]').forEach(card=>card.querySelector('button').addEventListener('click',()=>{const iframe=document.createElement('iframe');iframe.src=card.dataset.premiumVideo;iframe.title='Gospel worship video placeholder';iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;card.innerHTML='';card.appendChild(iframe);}));
  const form=q('#premium-booking-form'), success=q('#premium-booking-success');
  form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;success.classList.add('show');const d=new FormData(form);const body=['Name: '+d.get('name'),'Organization / church: '+d.get('organization'),'Email: '+d.get('email'),'Phone: '+d.get('phone'),'Event date: '+d.get('date'),'City / venue: '+d.get('city'),'Details: '+d.get('details')].join('%0A');window.location.href='mailto:butho.vutela@gmail.com?subject=Ministry booking enquiry&body='+body;});
  if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches&&window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);gsap.utils.toArray('.premium-section,.premium-worship').forEach(el=>gsap.fromTo(el,{opacity:.2,y:20},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:el,start:'top 88%',once:true}}));}
  start();
})();
