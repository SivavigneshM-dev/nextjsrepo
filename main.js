// LOADER
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('gone'),1900));

// CURSOR
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=0,my=0,t2x=0,t2y=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function trail(){t2x+=(mx-t2x)*.1;t2y+=(my-t2y)*.1;cur2.style.left=t2x+'px';cur2.style.top=t2y+'px';requestAnimationFrame(trail)})();
document.querySelectorAll('a,button,.fc,.mc,.tc,.gst,.pb,.hcard').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='32px';cur.style.height='32px';cur.style.opacity='.4';cur2.style.borderColor='rgba(139,92,246,.8)'});
  el.addEventListener('mouseleave',()=>{cur.style.width='16px';cur.style.height='16px';cur.style.opacity='1';cur2.style.borderColor='rgba(139,92,246,.4)'});
});

// NAV
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('s',scrollY>50));

// HERO THREE.JS
if(document.getElementById('hc')) {
  (function(){
    const cv=document.getElementById('hc');
    cv.width=innerWidth;cv.height=innerHeight;
    const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,cv.width/cv.height,.1,1000);
    cam.position.set(0,0,30);
    const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
    r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(cv.width,cv.height);
    const cnt=1200,g=new THREE.BufferGeometry(),p=new Float32Array(cnt*3);
    for(let i=0;i<cnt;i++){p[i*3]=(Math.random()-.5)*100;p[i*3+1]=(Math.random()-.5)*80;p[i*3+2]=(Math.random()-.5)*50}
    g.setAttribute('position',new THREE.BufferAttribute(p,3));
    sc.add(new THREE.Points(g,new THREE.PointsMaterial({size:.18,color:0xa78bfa,transparent:true,opacity:.55})));
    const orbs=[],od=[
      {r:4,x:10,y:3,z:-8,c:0x7c3aed,w:false,op:.12},{r:2,x:-12,y:5,z:-2,c:0xf59e0b,w:true,op:.25},
      {r:2.5,x:14,y:-5,z:-10,c:0x10b981,w:true,op:.2},{r:1.2,x:-8,y:-6,z:3,c:0xa78bfa,w:false,op:.15},
      {r:1.8,x:4,y:8,z:-5,c:0xec4899,w:true,op:.2}
    ];
    od.forEach(d=>{const m=new THREE.Mesh(new THREE.SphereGeometry(d.r,32,32),new THREE.MeshPhongMaterial({color:d.c,wireframe:d.w,transparent:true,opacity:d.op,emissive:d.c,emissiveIntensity:.05}));m.position.set(d.x,d.y,d.z);sc.add(m);orbs.push(m)});
    const tor=new THREE.Mesh(new THREE.TorusGeometry(9,.07,16,120),new THREE.MeshBasicMaterial({color:0x7c3aed,transparent:true,opacity:.18}));
    tor.rotation.x=Math.PI/2.8;sc.add(tor);
    const tor2=new THREE.Mesh(new THREE.TorusGeometry(6,.05,16,100),new THREE.MeshBasicMaterial({color:0xf59e0b,transparent:true,opacity:.12}));
    tor2.rotation.x=Math.PI/4;tor2.rotation.y=.5;sc.add(tor2);
    sc.add(new THREE.AmbientLight(0x3333aa,.4));
    const pl=new THREE.PointLight(0x8b5cf6,2,60);pl.position.set(8,8,8);sc.add(pl);
    const pl2=new THREE.PointLight(0xf59e0b,1,40);pl2.position.set(-8,-4,-4);sc.add(pl2);
    let mo={x:0,y:0};
    document.addEventListener('mousemove',e=>{mo.x=(e.clientX/innerWidth-.5)*2;mo.y=-(e.clientY/innerHeight-.5)*2});
    let t=0;
    (function anim(){t+=.005;requestAnimationFrame(anim);
      orbs.forEach((o,i)=>{o.rotation.y+=.004+i*.002;o.rotation.x+=.002;o.position.y+=Math.sin(t+i*.7)*.008});
      tor.rotation.z+=.003;tor2.rotation.z-=.002;
      cam.position.x+=(mo.x*4-cam.position.x)*.025;cam.position.y+=(mo.y*2.5-cam.position.y)*.025;
      cam.lookAt(0,0,0);r.render(sc,cam);
    })();
    window.addEventListener('resize',()=>{cv.width=innerWidth;cv.height=innerHeight;cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();r.setSize(innerWidth,innerHeight)});
  })();
}

// GLOBE THREE.JS
if(document.getElementById('gc')) {
  (function(){
    const cv=document.getElementById('gc');
    const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(42,cv.offsetWidth/cv.offsetHeight,.1,100);
    cam.position.set(0,0,5.5);
    const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
    r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(cv.offsetWidth,cv.offsetHeight);
    const core=new THREE.Mesh(new THREE.SphereGeometry(2,64,64),new THREE.MeshPhongMaterial({color:0x0a0a14,emissive:0x100820,emissiveIntensity:.8,shininess:50}));
    sc.add(core);
    sc.add(new THREE.Mesh(new THREE.SphereGeometry(2.02,24,24),new THREE.MeshBasicMaterial({color:0x7c3aed,transparent:true,opacity:.08,wireframe:true})));
    sc.add(new THREE.Mesh(new THREE.SphereGeometry(2.25,32,32),new THREE.MeshBasicMaterial({color:0x7c3aed,transparent:true,opacity:.04,side:THREE.BackSide})));
    const cities=[[.5,1.1,1.7],[-.4,1.3,1.6],[1.3,.6,1.4],[-1.6,.4,1],[.9,-.9,1.6],[1.8,.3,.7],[-.9,-1.3,1.2],[.2,1.8,.7],[-1.3,.9,1.3],[1.6,-.7,1],[.6,-1.7,1],[-.8,.5,1.8],[1.1,1.1,1.2],[-.5,-.8,1.8],[1.5,1,-.7]];
    cities.forEach(([x,y,z])=>{const l=Math.sqrt(x*x+y*y+z*z);const d=new THREE.Mesh(new THREE.SphereGeometry(.04,8,8),new THREE.MeshBasicMaterial({color:0xf59e0b}));d.position.set(x/l*2.07,y/l*2.07,z/l*2.07);sc.add(d)});
    sc.add(new THREE.AmbientLight(0x112244,1.2));
    const dl=new THREE.DirectionalLight(0x7c3aed,1.8);dl.position.set(4,4,4);sc.add(dl);
    const dl2=new THREE.DirectionalLight(0xf59e0b,.6);dl2.position.set(-4,-2,-3);sc.add(dl2);
    let drag=false,lx=0,vx=0,ry=0;
    cv.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;vx=0});
    window.addEventListener('mouseup',()=>drag=false);
    window.addEventListener('mousemove',e=>{if(drag){vx=(e.clientX-lx)*.012;lx=e.clientX}});
    cv.addEventListener('touchstart',e=>{drag=true;lx=e.touches[0].clientX;vx=0},{passive:true});
    window.addEventListener('touchend',()=>drag=false);
    window.addEventListener('touchmove',e=>{if(drag){vx=(e.touches[0].clientX-lx)*.012;lx=e.touches[0].clientX}},{passive:true});
    (function anim(){requestAnimationFrame(anim);if(!drag){vx*=.94;vx+=.004}ry+=vx;core.rotation.y=ry;r.render(sc,cam)})();
    window.addEventListener('resize',()=>{cam.aspect=cv.offsetWidth/cv.offsetHeight;cam.updateProjectionMatrix();r.setSize(cv.offsetWidth,cv.offsetHeight)});
  })();
}

// HERO COUNTERS
function countTo(el,target,suffix,prefix,dur){
  let cur=0,step=target/(dur/16);
  const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t)}
    const v=target>=1000?Math.round(cur).toLocaleString():Math.round(cur);
    el.textContent=(prefix||'')+v+(suffix||'');},16);
}
if(document.getElementById('hn1')) {
  setTimeout(()=>{
    countTo(document.getElementById('hn1'),500,'+','',1800);
    countTo(document.getElementById('hn2'),10,'M+','$',1800);
    countTo(document.getElementById('hn3'),96,'%','',1800);
  },2000);
}

// SCROLL REVEAL
const ro=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

// PROGRAM STEPS
const po=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.pstep').forEach((s,i)=>setTimeout(()=>s.classList.add('vis'),i*160))})},{threshold:.1});
const psel=document.getElementById('psteps');if(psel)po.observe(psel);

// METRIC COUNTERS
const mo2=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.mn[data-t]').forEach(el=>countTo(el,+el.dataset.t,el.dataset.s,'',2000));mo2.unobserve(e.target)}})},{threshold:.3});
const ms=document.getElementById('metrics');if(ms)mo2.observe(ms);

// SIGNUP
function doSignup(){
  const inp=document.getElementById('ei'),btn=document.getElementById('eb');
  const v=inp.value.trim();
  if(!v||!v.includes('@')){inp.style.borderColor='#ef4444';inp.placeholder='Enter a valid email!';setTimeout(()=>{inp.style.borderColor='';inp.placeholder='Enter your college email...'},2500);return}
  btn.textContent='✓ You\'re In!';btn.style.background='linear-gradient(135deg,#10b981,#059669)';
  inp.value='';inp.placeholder='Welcome to Grapreneur! 🎉';
  setTimeout(()=>{btn.textContent='Get Started →';btn.style.background=''},3200);
}
if(document.getElementById('ei')) {
  document.getElementById('ei').addEventListener('keydown',e=>{if(e.key==='Enter')doSignup()});
}