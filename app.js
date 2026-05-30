// =============================================
// APP.JS — Logique partagée & par page
// Souley Group — Multi-Page Architecture
// =============================================

// ---- CHATBOT LOGIC (shared) ----
function toggleChatbot() {
  const box = document.getElementById('chatbot-box');
  if (box) box.classList.toggle('active');
}
function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const q = input.value.trim();
  if (!q) return;
  addChatMsg(q, 'user');
  input.value = '';
  showTyping();
  setTimeout(() => { removeTyping(); addChatMsg(getBotReply(q), 'bot'); }, 1200);
}
function askBotQuestion(q) {
  addChatMsg(q, 'user');
  showTyping();
  setTimeout(() => { removeTyping(); addChatMsg(getBotReply(q), 'bot'); }, 1000);
}
function addChatMsg(text, sender) {
  const area = document.getElementById('chat-messages');
  if (!area) return;
  const d = document.createElement('div');
  d.className = sender === 'user'
    ? 'bg-gold text-black rounded-xl p-3 max-w-[85%] self-end font-semibold text-right'
    : 'bg-white/5 rounded-xl p-3 border border-white/5 max-w-[85%] self-start text-gray-300';
  d.innerHTML = text.replace(/\n/g, '<br>');
  area.appendChild(d);
  area.scrollTop = area.scrollHeight;
}
function showTyping() {
  const area = document.getElementById('chat-messages');
  if (!area) return;
  const d = document.createElement('div');
  d.id = 'bot-typing';
  d.className = 'bg-white/5 rounded-xl px-4 py-3 border border-white/5 max-w-[80px] self-start flex gap-1 items-center';
  d.innerHTML = '<span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span><span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay:.1s"></span><span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay:.2s"></span>';
  area.appendChild(d);
  area.scrollTop = area.scrollHeight;
}
function removeTyping() { const t = document.getElementById('bot-typing'); if (t) t.remove(); }
function getBotReply(q) {
  const l = q.toLowerCase();
  if (l.includes('magem') || l.includes('construct') || l.includes('bâtiment') || l.includes('route'))
    return "🏗️ <b>Magem Construct</b> est notre filiale de construction : routes (RN1 Kinshasa-Matadi), bâtiments, génie civil industriel minier. <a href='services.html#construction' class='text-gold underline'>En savoir plus →</a>";
  if (l.includes('mine') || l.includes('energie') || l.includes('solaire'))
    return "⚡ Notre pôle <b>Mines & Énergie</b> facilite les investissements miniers et déploie des centrales solaires (50MW Kolwezi). <a href='services.html#mines' class='text-gold underline'>Détails →</a>";
  if (l.includes('telecom') || l.includes('fibre') || l.includes('datacenter') || l.includes('cyber'))
    return "💻 <b>Souley Telecom</b> : 150 km de fibre optique à Kinshasa, Datacenter Tier III à Lubumbashi. <a href='services.html#telecom' class='text-gold underline'>Découvrir →</a>";
  if (l.includes('fondation') || l.includes('humanitaire') || l.includes('bourse') || l.includes('santé'))
    return "💚 La <b>Fondation Souley</b> finance cliniques gratuites, bourses STEM et forages d'eau potable. <a href='fondation.html' class='text-gold underline'>Nos actions →</a>";
  if (l.includes('événement') || l.includes('event') || l.includes('forum') || l.includes('salon'))
    return "📅 Retrouvez nos prochains événements : forums, inaugurations et salons professionnels. <a href='evenements.html' class='text-gold underline'>Voir l'agenda →</a>";
  if (l.includes('contact') || l.includes('adresse') || l.includes('téléphone'))
    return "📍 <b>Kinshasa</b> : 14 Blvd du 30 Juin, Gombe — +243 81 234 56 78\n<b>Lubumbashi</b> : 188 Av. L.D. Kabila — +243 99 987 65 43\n<a href='contact.html' class='text-gold underline'>Formulaire de contact →</a>";
  if (l.includes('bonjour') || l.includes('salut') || l.includes('hello'))
    return "Bonjour ! Comment puis-je vous aider ? Posez-moi des questions sur nos divisions, projets ou événements.";
  return "Merci pour votre message. Souley Group intervient en <b>Construction</b>, <b>Mines & Énergie</b>, <b>Télécoms</b> et via notre <b>Fondation</b>. <a href='contact.html' class='text-gold underline'>Contactez-nous →</a>";
}

// ======================================================
// HOME PAGE (index.html)
// ======================================================
const heroSlides = [
  { badge:'Ingénierie & Infrastructures', title:'Construire l\'Afrique de <span class="text-gold">demain</span>', sub:'Leader multisectoriel en ingénierie, énergies renouvelables et connectivité numérique en RDC.', color:'gold' },
  { badge:'Transition Énergétique', title:'Énergies <span class="text-energy">durables</span> & Progrès', sub:'Centrales solaires autonomes et conseil stratégique pour l\'industrie minière congolaise.', color:'energy' },
  { badge:'Connectivité Souveraine', title:'Réseaux & <span class="text-electric">Datacenters</span>', sub:'Fibre optique métropolitaine et hébergement de données souverain Tier III en RDC.', color:'electric' },
  { badge:'Impact Solidaire', title:'Fondation <span class="text-emerald-400">Humanitaire</span>', sub:'Cliniques gratuites, bourses d\'études STEM et forages d\'eau potable pour la RDC.', color:'emerald-400' }
];
let currentSlide = 0, slideTimer;

function initHomePage() {
  startSlideShow();
  
  // Attendre que GSAP soit complètement chargé
  setTimeout(() => {
    initStatsCounter();
  }, 100);
}

function startSlideShow() { slideTimer = setInterval(() => setSlide((currentSlide+1)%4), 6000); }

window.setSlide = function(i) {
  clearInterval(slideTimer);
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('opacity-100','scale-100');
  slides[currentSlide].classList.add('opacity-0','scale-95');
  if(dots[currentSlide]){dots[currentSlide].classList.remove('bg-gold');dots[currentSlide].classList.add('bg-white/30');}
  currentSlide = i;
  slides[currentSlide].classList.remove('opacity-0','scale-95');
  slides[currentSlide].classList.add('opacity-100','scale-100');
  if(dots[currentSlide]){dots[currentSlide].classList.add('bg-gold');dots[currentSlide].classList.remove('bg-white/30');}
  const s = heroSlides[i];
  const badge = document.getElementById('hero-badge');
  const title = document.getElementById('hero-title');
  const sub = document.getElementById('hero-subtitle');
  const num = document.getElementById('slide-num');
  if(badge) badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-${s.color} animate-ping"></span> ${s.badge}`;
  if(title) title.innerHTML = s.title;
  if(sub) sub.textContent = s.sub;
  if(num) num.textContent = `0${i+1}`;
  if(typeof gsap!=='undefined'){
    gsap.fromTo('#hero-title',{opacity:0,y:30},{opacity:1,y:0,duration:.7});
    gsap.fromTo('#hero-subtitle',{opacity:0,y:20},{opacity:1,y:0,duration:.7,delay:.1});
  }
  startSlideShow();
};

function initStatsCounter() {
  const runCounter = (el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = (el.id === 'stat-projets' || el.id === 'stat-staff' || el.id === 'stat-partenaires') ? '+' : '';
    if (typeof animateCounter === 'function') {
      animateCounter(el, target, 2.5, suffix);
      return;
    }
    if (typeof gsap !== 'undefined') {
      const obj = {v:0};
      gsap.to(obj, {
        v: target,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.floor(obj.v) + suffix; },
        onComplete: () => gsap.to(el, {scale:1.1, duration:.2, yoyo:true, repeat:1, ease:'power2.inOut'})
      });
      return;
    }
    el.textContent = target + suffix;
  };

  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined') {
    ['stat-projets','stat-staff','stat-provinces','stat-partenaires'].forEach(id => {
      const el = document.getElementById(id);
      if (el) runCounter(el);
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  ['stat-projets','stat-staff','stat-provinces','stat-partenaires'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    ScrollTrigger.create({
      trigger: el, start:'top 90%',
      once: true,
      onEnter: () => runCounter(el)
    });
    if (ScrollTrigger.isInViewport(el, 0.1)) runCounter(el);
  });
}

// ======================================================
// GROUPE PAGE (groupe.html)
// ======================================================
window.setTimelineYear = function(year) {
  document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
  document.querySelectorAll('.timeline-detail-card').forEach(c => c.classList.add('hidden'));
  const dot = document.getElementById(`time-dot-${year}`);
  const card = document.getElementById(`time-detail-${year}`);
  if(dot) dot.classList.add('active');
  if(card) {
    card.classList.remove('hidden');
    // Utiliser l'animation améliorée
    if (typeof animateTimelineChange === 'function') {
      animateTimelineChange(year);
    } else if(typeof gsap!=='undefined') {
      gsap.fromTo(card,{opacity:0,x:-20},{opacity:1,x:0,duration:.5});
    }
  }
};

const hubsData = {
  global: { title:'SOULEY GROUP RDC', sub:'Siège social national', desc:'Opérations sur 8 provinces : construction, énergie solaire, connectivité numérique.' },
  kinshasa: { title:'SIÈGE KINSHASA', sub:'Direction Générale & Télécoms', desc:'Coordination des chantiers Magem, déploiement fibre optique (150 km), facilitation ministérielle.', color:'gold' },
  lubumbashi: { title:'DIRECTION LUBUMBASHI', sub:'Mines, Datacenter & Fondation', desc:'Partenariats miniers Katanga, Datacenter Tier III, cliniques et bourses de la Fondation Souley.', color:'electric' },
  kolwezi: { title:'HUB KOLWEZI', sub:'Génie Civil Minier & Solaire', desc:'Infrastructures lourdes sur gisements, centrale solaire photovoltaïque 50MW.', color:'energy' }
};

window.selectMapHub = function(key) {
  const t = document.getElementById('map-info-title');
  const s = document.getElementById('map-info-subtitle');
  const d = document.getElementById('map-info-desc');
  const hub = hubsData[key];
  if(!t||!hub) return;
  t.textContent = hub.title;
  s.textContent = hub.sub;
  d.textContent = hub.desc;
  const colorMap = {kinshasa:'text-gold',lubumbashi:'text-electric',kolwezi:'text-energy'};
  t.className = `text-xs font-bold ${colorMap[key]||'text-steel'} uppercase tracking-wider block mb-1`;
  if(typeof gsap!=='undefined') gsap.fromTo('#map-info-box',{opacity:.8,y:10},{opacity:1,y:0,duration:.4});
};

function initGroupePage() {
  if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.fade-in-up').forEach(el => {
      ScrollTrigger.create({ trigger:el, start:'top 90%', onEnter:()=>el.classList.add('visible') });
    });
  }
}

// ======================================================
// SERVICES PAGE (services.html)
// ======================================================
window.setActiveDivisionTab = function(tabId) {
  document.querySelectorAll('.division-content-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.division-tab').forEach(b => {
    b.className = 'division-tab px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 transition-all text-gray-400';
  });
  const panel = document.getElementById(`div-panel-${tabId}`);
  const btn = document.getElementById(`tab-btn-${tabId}`);
  if(panel) panel.classList.remove('hidden');
  const colors = {construction:'border-gold/30 bg-gold/10 text-gold',mines:'border-energy/30 bg-energy/10 text-energy',telecom:'border-electric/30 bg-electric/10 text-electric',fondation:'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'};
  if(btn) btn.className = `division-tab px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider ${colors[tabId]||''} transition-all`;
  if(panel && typeof gsap!=='undefined') gsap.fromTo(panel,{opacity:0,y:30},{opacity:1,y:0,duration:.6});
};

function initServicesPage() {
  const hash = window.location.hash.replace('#','');
  if(hash && ['construction','mines','telecom','fondation'].includes(hash)) {
    setTimeout(()=>setActiveDivisionTab(hash),300);
  }
}

// ======================================================
// PROJETS PAGE (projets.html)
// ======================================================
let allProjects = [];
const fallbackProjects = [
  {id:1,title:'Modernisation Route Nationale 1 (Kinshasa-Matadi)',description:'Réhabilitation lourde, élargissement des voies et renforcement de la chaussée.',division:'construction',image:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',client:'Ministère Infrastructures',location:'Kinshasa - Kongo Central',year:'2025',impact:'Réduction du temps de trajet de 40%.'},
  {id:2,title:'Complexe Résidentiel "Congo Horizon"',description:'Éco-quartier intelligent de 120 appartements avec énergie solaire autonome.',division:'construction',image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',client:'Investisseurs Privés',location:'Kinshasa Gombe',year:'2026',impact:'Autonomie énergétique 100%.'},
  {id:3,title:'Mine Intelligente de Kolwezi',description:'Fondations d\'usine, concasseurs et soutènements miniers automatisés.',division:'construction',image:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',client:'Mining Corp Global',location:'Kolwezi (Lualaba)',year:'2024',impact:'Capacité de production augmentée.'},
  {id:4,title:'Centrale Solaire 50MW',description:'Conseil et facilitation pour une centrale photovoltaïque connectée SNEL.',division:'mines',image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',client:'Green Power RDC',location:'Kolwezi (Lualaba)',year:'2025',impact:'45 000 foyers alimentés en vert.'},
  {id:5,title:'Accompagnement Tenke Fungurume',description:'Facilitation administrative et conformité RSE pour les investissements miniers.',division:'mines',image:'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',client:'Tenke Fungurume Mining',location:'Lualaba',year:'2024',impact:'Charte ESG locale établie.'},
  {id:6,title:'Fibre Optique FTTX Kinshasa (150km)',description:'Dorsale fibre sous-terraine haut débit à travers Kinshasa.',division:'telecom',image:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',client:'Réseau National Télécoms',location:'Kinshasa',year:'2025',impact:'800+ entreprises connectées.'},
  {id:7,title:'Datacenter Souley Tier III',description:'Centre de données souverain avec refroidissement écologique.',division:'telecom',image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',client:'Souley Telecom',location:'Lubumbashi',year:'2026',impact:'Latence réseau réduite à 5ms.'},
  {id:8,title:'Hôpital Communautaire Kipushi',description:'Clinique pédiatrique 45 lits avec télémédecine et énergie solaire.',division:'fondation',image:'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',client:'Fondation Souley',location:'Kipushi (Haut-Katanga)',year:'2025',impact:'15 000 mères et enfants/an.'},
  {id:9,title:'Bourses Souley Tech (Filles RDC)',description:'Bourses STEM, mentorat et équipement informatique pour jeunes filles.',division:'fondation',image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',client:'Fondation Souley',location:'Kinshasa - Lubumbashi',year:'2024-2026',impact:'85 diplômées insérées.'}
];

async function initProjetsPage() {
  // Charger immédiatement les données fallback
  allProjects = fallbackProjects;
  renderProjects(allProjects);
  
  // Essayer de charger depuis l'API en arrière-plan
  try {
    const r = await fetch('/api/projects');
    if (r.ok) {
      const d = await r.json();
      if (d.status === 'success' && d.data.length) {
        allProjects = d.data;
        renderProjects(allProjects);
      }
    }
  } catch(e) {
    // Garder les données fallback
    console.log('Using fallback project data');
  }
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  grid.innerHTML = '';
  const colors = {construction:'bg-gold text-black',mines:'bg-energy text-white',telecom:'bg-electric text-white',fondation:'bg-emerald-500 text-white'};
  const names = {construction:'Magem Construct',mines:'Mines & Énergie',telecom:'Télécoms',fondation:'Fondation'};
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col glow-steel';
    card.dataset.division = p.division;
    card.innerHTML = `
      <div class="relative overflow-hidden aspect-[16/10] bg-black">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <span class="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${colors[p.division]||''}">${names[p.division]||p.division}</span>
      </div>
      <div class="p-6 flex flex-col gap-4 flex-1 justify-between">
        <div>
          <h3 class="font-display font-bold text-sm text-white line-clamp-2 uppercase leading-tight mb-2">${p.title}</h3>
          <p class="text-xs text-gray-400 line-clamp-3 leading-relaxed">${p.description}</p>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-white/5">
          <span class="text-[10px] text-gray-500 flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${(p.location||'').split(' - ')[0]}</span>
          <button onclick="openProjectModal(${p.id})" class="text-xs font-bold text-gold hover:text-white flex items-center gap-1 transition-colors">Détails <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  
  // Animer l'apparition des cartes
  if (typeof animateFilterChange === 'function') {
    animateFilterChange('projects-grid');
  }
  if(typeof lucide !== 'undefined') lucide.createIcons();
}

window.filterProjects = function(div) {
  document.querySelectorAll('.filter-btn').forEach(b => { b.className='filter-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-400 transition-colors'; });
  const a = document.getElementById(`filter-${div}`);
  if(a) a.className='filter-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 bg-gold text-black transition-colors';
  renderProjects(div==='all' ? allProjects : allProjects.filter(p=>p.division===div));
};

window.openProjectModal = function(id) {
  const p = allProjects.find(x=>x.id===id);
  if(!p) return;
  const m = document.getElementById('project-modal');
  document.getElementById('modal-image').src = p.image;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.description;
  document.getElementById('modal-client').textContent = p.client;
  document.getElementById('modal-location').textContent = p.location;
  document.getElementById('modal-year').textContent = p.year;
  document.getElementById('modal-impact').textContent = p.impact;
  const names = {construction:'Magem Construct',mines:'Mines & Énergie',telecom:'Télécoms',fondation:'Fondation'};
  const colors = {construction:'bg-gold text-black',mines:'bg-energy text-white',telecom:'bg-electric text-white',fondation:'bg-emerald-500 text-white'};
  const badge = document.getElementById('modal-division');
  badge.textContent = names[p.division]||p.division;
  badge.className = `px-2.5 py-1 rounded font-black uppercase text-[10px] tracking-wider mb-2 inline-block ${colors[p.division]||''}`;
  
  // Utiliser l'animation améliorée
  if (typeof animateModalOpen === 'function') {
    animateModalOpen('project-modal');
  } else {
    m.classList.remove('opacity-0','pointer-events-none');
    m.classList.add('opacity-100','pointer-events-auto');
  }
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const m = document.getElementById('project-modal');
  if(m) {
    // Utiliser l'animation améliorée
    if (typeof animateModalClose === 'function') {
      animateModalClose('project-modal');
    } else {
      m.classList.remove('opacity-100','pointer-events-auto');
      m.classList.add('opacity-0','pointer-events-none');
    }
  }
  document.body.style.overflow = 'auto';
};

// ======================================================
// ACTUALITÉS PAGE (actualites.html)
// ======================================================
const fallbackBlog = [
  {id:1,title:'Investissement de 15M$ dans la souveraineté numérique',excerpt:'Construction du premier réseau de datacenters souverains en RDC.',category:'Technologie',read_time:'4 min',image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',date_created:new Date().toISOString()},
  {id:2,title:'Inauguration de la maternité de Kipushi',excerpt:'Clinique pédiatrique gratuite alimentée en énergie solaire.',category:'Fondation',read_time:'3 min',image:'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',date_created:new Date().toISOString()},
  {id:3,title:'Transition énergétique minière',excerpt:'Intégration de l\'énergie solaire dans les gisements congolais.',category:'Énergie',read_time:'5 min',image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',date_created:new Date().toISOString()}
];

async function initActualitesPage() {
  // Charger immédiatement les données fallback
  renderBlog(fallbackBlog);
  
  // Essayer de charger depuis l'API en arrière-plan
  try {
    const r = await fetch('/api/blog');
    if (r.ok) {
      const d = await r.json();
      if (d.status === 'success' && d.data.length) {
        renderBlog(d.data);
      }
    }
  } catch(e) {
    console.log('Using fallback blog data');
  }
}

function renderBlog(posts) {
  const grid = document.getElementById('blog-grid');
  if(!grid) return;
  grid.innerHTML = '';
  posts.forEach(p => {
    const tagColors = {Technologie:'bg-electric/15 text-electric border-electric/20','Énergie':'bg-energy/15 text-energy border-energy/20',Fondation:'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'};
    const date = new Date(p.date_created).toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'});
    const card = document.createElement('article');
    card.className = 'glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col glow-steel transition-all';
    card.innerHTML = `
      <div class="relative overflow-hidden aspect-[16/10] bg-black"><img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover"></div>
      <div class="p-6 flex flex-col gap-3 flex-1 justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded ${tagColors[p.category]||'bg-steel/15 text-steel border-steel/20'}">${p.category}</span>
            <span class="text-[10px] text-gray-500">${date}</span>
          </div>
          <h3 class="font-display font-bold text-sm text-white line-clamp-2 uppercase leading-tight hover:text-gold transition-colors">${p.title}</h3>
          <p class="text-xs text-gray-400 line-clamp-3 leading-relaxed mt-2">${p.excerpt}</p>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
          <span class="text-[10px] text-gray-500 font-mono flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${p.read_time}</span>
          <span class="text-xs font-bold text-gold flex items-center gap-1">Lire <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  if(typeof lucide !== 'undefined') lucide.createIcons();
}

// ======================================================
// ÉVÉNEMENTS PAGE (evenements.html)
// ======================================================
const fallbackEvents = [
  {id:1,title:'Forum Panafricain de l\'Infrastructure Durable 2026',description:'Le plus grand rassemblement d\'experts africains et internationaux en infrastructure durable. Tables rondes, keynotes et networking stratégique.',date_event:'2026-07-15T09:00:00',end_date:'2026-07-15T18:00:00',location:'Pullman Grand Hôtel, Kinshasa Gombe',division:'groupe',image:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',type:'conference',is_featured:1,is_past:0},
  {id:2,title:'Inauguration Datacenter Souley',description:'Cérémonie officielle d\'ouverture du premier datacenter souverain Tier III en RDC.',date_event:'2026-09-20T10:00:00',location:'Lubumbashi, Haut-Katanga',division:'telecom',image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',type:'inauguration',is_featured:0,is_past:0},
  {id:3,title:'Salon Mines & Énergie Katanga',description:'Exposition des innovations en exploitation minière durable et transition énergétique.',date_event:'2026-06-10T08:00:00',location:'Centre des Congrès, Kolwezi',division:'mines',image:'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',type:'salon',is_featured:0,is_past:0},
  {id:4,title:'Atelier Cybersécurité RDC',description:'Formation et sensibilisation aux enjeux de cybersécurité pour les entreprises congolaises.',date_event:'2026-08-05T09:00:00',location:'Fleuve Congo Hôtel, Kinshasa',division:'telecom',image:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',type:'atelier',is_featured:0,is_past:0},
  {id:5,title:'Cérémonie Remise Bourses 2025',description:'Remise officielle des bourses Souley Tech aux 30 nouvelles lauréates.',date_event:'2025-12-18T14:00:00',location:'Palais du Peuple, Kinshasa',division:'fondation',image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',type:'inauguration',is_featured:0,is_past:1},
  {id:6,title:'Forum Construction Durable 2025',description:'Échanges sur les pratiques de construction verte et résiliente en Afrique centrale.',date_event:'2025-06-22T09:00:00',location:'Hôtel Karavia, Lubumbashi',division:'construction',image:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',type:'conference',is_featured:0,is_past:1}
];
let allEvents = [];

async function initEvenementsPage() {
  // Charger immédiatement les données fallback
  allEvents = fallbackEvents;
  renderEventsGrid(allEvents.filter(e=>!e.is_past), 'events-grid');
  renderEventsGrid(allEvents.filter(e=>e.is_past), 'past-events-grid');
  
  // Essayer de charger depuis l'API en arrière-plan
  try {
    const r = await fetch('/api/events');
    if (r.ok) {
      const d = await r.json();
      if (d.status === 'success' && d.data.length) {
        allEvents = d.data;
        renderEventsGrid(allEvents.filter(e=>!e.is_past), 'events-grid');
        renderEventsGrid(allEvents.filter(e=>e.is_past), 'past-events-grid');
      }
    }
  } catch(e) {
    console.log('Using fallback events data');
  }
}

function renderEventsGrid(events, gridId) {
  const grid = document.getElementById(gridId);
  if(!grid) return;
  grid.innerHTML = '';
  if(!events.length) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500 text-xs">Aucun événement pour le moment.</div>';
    return;
  }
  const typeColors = {conference:'bg-steel text-white',inauguration:'bg-gold text-black',salon:'bg-energy text-white',atelier:'bg-electric text-white'};
  const typeLabels = {conference:'Conférence',inauguration:'Inauguration',salon:'Salon',atelier:'Atelier'};
  events.forEach(ev => {
    const d = new Date(ev.date_event);
    const day = d.getDate();
    const month = d.toLocaleDateString('fr-FR',{month:'short'}).toUpperCase();
    const year = d.getFullYear();
    const fullDate = d.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    const card = document.createElement('div');
    card.className = 'event-card glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col';
    card.dataset.type = ev.type;
    card.innerHTML = `
      <div class="relative overflow-hidden aspect-[16/10] bg-black">
        <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div class="event-badge"><div class="event-date-badge"><span class="day">${day}</span><span class="month">${month}</span></div></div>
        <span class="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${typeColors[ev.type]||'bg-steel text-white'}">${typeLabels[ev.type]||ev.type}</span>
      </div>
      <div class="p-6 flex flex-col gap-3 flex-1 justify-between">
        <div>
          <h3 class="font-display font-bold text-sm text-white line-clamp-2 uppercase leading-tight mb-2">${ev.title}</h3>
          <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">${ev.description}</p>
        </div>
        <div class="flex flex-col gap-2 pt-4 border-t border-white/5">
          <span class="text-[10px] text-silver flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${fullDate}</span>
          <span class="text-[10px] text-silver flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${ev.location}</span>
        </div>
        ${!ev.is_past ? `<a href="contact.html" class="mt-3 text-center bg-white/5 border border-white/10 hover:border-gold/30 text-white font-bold uppercase tracking-wider text-[10px] py-2.5 rounded-lg transition-all hover:bg-gold hover:text-black">S'inscrire</a>` : ''}
      </div>`;
    grid.appendChild(card);
  });
  if(typeof lucide !== 'undefined') lucide.createIcons();
}

window.filterEvents = function(type) {
  document.querySelectorAll('.event-filter-btn').forEach(b => {
    b.className = 'event-filter-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-400 transition-colors';
  });
  const a = document.getElementById(`efilter-${type}`);
  if(a) a.className = 'event-filter-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 bg-steel text-white transition-colors';
  const upcoming = allEvents.filter(e => !e.is_past);
  renderEventsGrid(type==='all' ? upcoming : upcoming.filter(e=>e.type===type), 'events-grid');
};

// ======================================================
// CONTACT PAGE (contact.html)
// ======================================================
function initContactPage() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('contact-alert');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('form-name').value,
      email: document.getElementById('form-email').value,
      subject: document.getElementById('form-subject').value,
      message: document.getElementById('form-message').value
    };
    try {
      const r = await fetch('/api/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result = await r.json();
      showContactAlert(result.status==='success'?'success':'error', result.message||'Envoyé !');
      if(result.status==='success') form.reset();
    } catch(e) {
      showContactAlert('error', 'Erreur réseau. Réessayez.');
    }
  });
}

function showContactAlert(type, msg) {
  const box = document.getElementById('contact-alert');
  if(!box) return;
  box.className = type==='success' ? 'p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm' : 'p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm';
  box.textContent = msg;
  box.classList.remove('hidden');
  setTimeout(()=>box.classList.add('hidden'),5000);
}

// ======================================================
// CARRIÈRES PAGE (carrieres.html)
// ======================================================
const fallbackJobs = [
  {id:1,title:'Ingénieur Génie Civil Senior',division:'construction',location:'Kinshasa',type:'CDI',description:'Superviser les chantiers de construction routière et bâtiments. Coordination des équipes techniques et suivi qualité.',requirements:['Diplôme d\'ingénieur en génie civil','5+ ans d\'expérience en gestion de chantiers','Maîtrise AutoCAD et logiciels BIM','Permis de conduire valide']},
  {id:2,title:'Chef de Projet Énergie Solaire',division:'mines',location:'Kolwezi',type:'CDI',description:'Piloter le déploiement de centrales solaires photovoltaïques. Gestion budgétaire et relations avec les partenaires.',requirements:['Formation en énergies renouvelables','3+ ans en gestion de projets solaires','Connaissance des normes IEC','Anglais courant']},
  {id:3,title:'Ingénieur Réseau Fibre Optique',division:'telecom',location:'Kinshasa',type:'CDI',description:'Conception et déploiement de réseaux FTTH. Supervision des installations et maintenance préventive.',requirements:['Diplôme en télécommunications','Expérience en déploiement fibre optique','Maîtrise des protocoles GPON/EPON','Disponibilité pour déplacements']},
  {id:4,title:'Administrateur Datacenter',division:'telecom',location:'Lubumbashi',type:'CDI',description:'Gestion et maintenance du datacenter Tier III. Supervision des infrastructures critiques et sécurité.',requirements:['Certification CCNA/CCNP','Expérience en gestion datacenter','Connaissance virtualisation (VMware, Hyper-V)','Disponibilité 24/7 (astreintes)']},
  {id:5,title:'Coordinateur Projets Humanitaires',division:'fondation',location:'Kinshasa',type:'CDD 12 mois',description:'Coordination des programmes santé, éducation et eau potable. Suivi budgétaire et reporting aux bailleurs.',requirements:['Formation en gestion de projets humanitaires','2+ ans en ONG ou fondation','Excellentes capacités rédactionnelles','Empathie et engagement social']},
  {id:6,title:'Conducteur de Travaux',division:'construction',location:'Matadi',type:'CDI',description:'Encadrement des équipes sur chantiers routiers. Respect des délais, budgets et normes de sécurité.',requirements:['BTS Travaux Publics ou équivalent','3+ ans comme conducteur de travaux','Leadership et gestion d\'équipe','Résistance physique et stress']},
  {id:7,title:'Technicien Maintenance Solaire',division:'mines',location:'Kolwezi',type:'CDI',description:'Maintenance préventive et corrective des installations photovoltaïques. Diagnostic pannes et optimisation.',requirements:['Formation électrotechnique','Expérience en maintenance solaire','Lecture de schémas électriques','Permis de conduire']},
  {id:8,title:'Chargé de Communication',division:'fondation',location:'Kinshasa',type:'CDI',description:'Gestion des réseaux sociaux, rédaction de contenus et organisation d\'événements pour la Fondation Souley.',requirements:['Licence en communication/journalisme','Maîtrise réseaux sociaux et outils digitaux','Créativité et sens de l\'initiative','Portfolio requis']}
];
let allJobs = [];

async function initCarrieresPage() {
  try {
    const r = await fetch('/api/jobs'); const d = await r.json();
    allJobs = (d.status==='success' && d.data.length) ? d.data : fallbackJobs;
  } catch(e) { allJobs = fallbackJobs; }
  renderJobs(allJobs);
}

function renderJobs(jobs) {
  const grid = document.getElementById('jobs-grid');
  if(!grid) return;
  grid.innerHTML = '';
  if(!jobs.length) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400 text-sm">Aucune offre disponible pour le moment. Consultez notre page régulièrement.</div>';
    return;
  }
  const divColors = {construction:'bg-gold/10 text-gold border-gold/20',mines:'bg-energy/10 text-energy border-energy/20',telecom:'bg-electric/10 text-electric border-electric/20',fondation:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'};
  const divNames = {construction:'Magem Construct',mines:'Mines & Énergie',telecom:'Télécoms',fondation:'Fondation'};
  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'glass-panel rounded-2xl border border-white/5 p-6 flex flex-col gap-4 glow-steel transition-all hover:border-gold/30';
    card.dataset.division = job.division;
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded ${divColors[job.division]||'bg-steel/10 text-steel border-steel/20'} mb-2 inline-block">${divNames[job.division]||job.division}</span>
          <h3 class="font-display font-bold text-base text-white mb-1 leading-tight">${job.title}</h3>
          <div class="flex items-center gap-3 text-xs text-gray-400 mt-2">
            <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${job.location}</span>
            <span class="flex items-center gap-1"><i data-lucide="briefcase" class="w-3.5 h-3.5"></i> ${job.type}</span>
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">${job.description}</p>
      <div class="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
        <button onclick="openJobModal(${job.id})" class="text-xs font-bold text-gold hover:text-white flex items-center gap-1 transition-colors">Voir détails <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></button>
        <a href="contact.html" class="px-4 py-2 bg-gold/10 border border-gold/20 text-gold rounded-lg text-xs font-bold hover:bg-gold hover:text-black transition-all">Postuler</a>
      </div>`;
    grid.appendChild(card);
  });
  if(typeof lucide !== 'undefined') lucide.createIcons();
}

window.filterJobs = function(div) {
  document.querySelectorAll('.job-filter-btn').forEach(b => { b.className='job-filter-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-400 transition-colors'; });
  const a = document.getElementById(`job-filter-${div}`);
  if(a) a.className='job-filter-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 bg-gold text-black transition-colors';
  renderJobs(div==='all' ? allJobs : allJobs.filter(j=>j.division===div));
};

window.openJobModal = function(id) {
  const job = allJobs.find(j=>j.id===id);
  if(!job) return;
  const m = document.getElementById('job-modal');
  const divNames = {construction:'Magem Construct',mines:'Mines & Énergie',telecom:'Télécoms',fondation:'Fondation'};
  document.getElementById('modal-job-division').textContent = divNames[job.division]||job.division;
  document.getElementById('modal-job-title').textContent = job.title;
  document.getElementById('modal-job-location').textContent = job.location;
  document.getElementById('modal-job-type').textContent = job.type;
  document.getElementById('modal-job-description').textContent = job.description;
  const reqList = document.getElementById('modal-job-requirements');
  reqList.innerHTML = '';
  (job.requirements||[]).forEach(req => {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-2';
    li.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-gold mt-0.5 flex-shrink-0"></i><span>${req}</span>`;
    reqList.appendChild(li);
  });
  m.classList.remove('opacity-0','pointer-events-none');
  m.classList.add('opacity-100','pointer-events-auto');
  document.body.style.overflow = 'hidden';
  
};

window.closeJobModal = function() {
  const m = document.getElementById('job-modal');
  if(m){ m.classList.remove('opacity-100','pointer-events-auto'); m.classList.add('opacity-0','pointer-events-none'); }
  document.body.style.overflow = 'auto';
};
