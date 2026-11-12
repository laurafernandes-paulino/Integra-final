const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// Áreas
const AR=[["Construção Civil","construcao-civil"],["Indústria","industria"],["Varejo","varejo"],["Serviços","servicos"],["Agronegócio","agronegocio"],["Saúde","saude"],["Educação","educacao"],["Logística","logistica"],["Finanças","financas"],["Energia e Utilities","energia-utilities"],["Alimentos e Bebidas","alimentos-bebidas"]];
$('#ar').innerHTML=AR.map(([n,f],i)=>`<li class="${i%3==1&&i<9?'dn':''} ${i==9?'a':''} ${i==10?'b':''}"><button class="ar" aria-pressed="${i==0}"><img src="img/${f}.png" alt="">${n}</button></li>`).join('');
$$('.ar').forEach(b=>b.onclick=()=>{const w=b.getAttribute('aria-pressed')=='true';$$('.ar').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed',String(!w))});
// Rotas
const V=['home','empresa','login','cadastro','eva'];
function route(){let h=location.hash.slice(1)||'home',sec=null;if(h=='areas'){h='home';sec='areas'}if(!V.includes(h))h='home';
$$('.view').forEach(v=>v.classList.toggle('on',v.id=='v-'+h));
$('.hd').style.display=h=='eva'?'none':'';$('#top').style.display=(h=='home'||h=='empresa')?'':'none';$('#ft').style.display=h=='eva'?'none':'';$('#fab').style.display=h=='eva'?'none':'';
$('#nav').classList.remove('o');$('#mt').setAttribute('aria-expanded','false');
sec?document.getElementById(sec).scrollIntoView():scrollTo(0,0)}
addEventListener('hashchange',route);route();
// Menu e dropdown
$('#mt').onclick=()=>{const o=$('#nav').classList.toggle('o');$('#mt').setAttribute('aria-expanded',o)};
// Abas
$$('.tb').forEach(b=>b.onclick=()=>{$$('.tb').forEach(x=>x.setAttribute('aria-selected','false'));b.setAttribute('aria-selected','true');$$('.tp').forEach((p,i)=>p.classList.toggle('on',i==b.dataset.t))});
// Forms (demonstração: não enviam dados)
$('#lf').onsubmit=e=>{e.preventDefault();location.hash='#cadastro'};
$('#cf').onsubmit=e=>{e.preventDefault();$('#cm').textContent='Cadastro recebido. Verifique seu e-mail para continuar.'};
// Chat: a IA sera integrada por outro grupo.
// Ao enviar, dispara o evento "eva:enviar" (event.detail = texto digitado).
// Para exibir a resposta da IA, chame: evaResponder("texto")
const bot=$('#ms').querySelector('img').src;
window.evaResponder=t=>{const m=document.createElement('div');m.className='m';m.innerHTML='<img alt="EVA"><span></span>';m.firstChild.src=bot;m.lastChild.textContent=t;$('#ms').append(m);m.scrollIntoView({block:'end'})};
$('#chf').onsubmit=e=>{e.preventDefault();const i=$('#ci'),t=i.value.trim();if(!t)return;
const u=document.createElement('div');u.className='m u';u.innerHTML='<span></span>';u.firstChild.textContent=t;$('#ms').append(u);i.value='';
dispatchEvent(new CustomEvent('eva:enviar',{detail:t}))};
// Aviso de suporte
try{if(sessionStorage.getItem('av')!='1')setTimeout(()=>$('#av').classList.add('on'),1500)}catch(e){setTimeout(()=>$('#av').classList.add('on'),1500)}
$('#avx').onclick=()=>{$('#av').classList.remove('on');try{sessionStorage.setItem('av','1')}catch(e){}};