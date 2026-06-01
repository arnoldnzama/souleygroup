// =============================================
// COMPOSANTS PARTAGÉS — Souley Group
// Navbar + Footer + Chatbot injectés dynamiquement
// Palette adaptée au logo sg.png
// =============================================

const TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1B3A5C', dark: '#0F2439', deeper: '#0A1628' },
        steel: { DEFAULT: '#3D6B99', light: '#5A8ABF' },
        silver: { DEFAULT: '#8A9BB0', light: '#A8B5C5' },
        gold: { DEFAULT: '#D4A017', dark: '#b38410' },
        electric: '#008CFF',
        energy: '#00B26F',
        charcoal: '#0C1018',
        creme: '#F0F2F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      }
    }
  }
};
if (typeof tailwind !== 'undefined') tailwind.config = TAILWIND_CONFIG;

// ---- NAVBAR ----
function initNavbar(currentPage) {
  const c = document.getElementById('navbar-container');
  if (!c) return;

  const pages = [
    { id:'accueil',   label:'Accueil',      href:'index.html' },
    { id:'groupe',    label:'Le Groupe',     href:'groupe.html', hasMega:true },
    { id:'services',  label:'Services',      href:'services.html' },
    { id:'projets',   label:'Projets',       href:'projets.html' },
    { id:'fondation', label:'Fondation',     href:'fondation.html' },
    { id:'evenements',label:'Événements',    href:'evenements.html' },
    { id:'actualites',label:'Actualités',    href:'actualites.html' },
    { id:'carrieres', label:'Carrières',     href:'carrieres.html' },
    { id:'contact',   label:'Contact',       href:'contact.html' },
  ];

  const navLinks = pages.map(p => {
    const active = p.id === currentPage;
    const cls = active ? 'text-navy font-bold border-b-2 border-gold' : 'text-gray-600 hover:text-navy';
    if (p.hasMega) {
      return `<div class="relative group/menu">
        <a href="${p.href}" class="flex items-center gap-1.5 text-[13px] font-medium ${cls} transition-all py-1 border-b-2 border-transparent hover:border-gold">
          ${p.label}
          <svg class="w-3 h-3 transition-transform group-hover/menu:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </a>
        <div class="absolute top-full left-0 mt-0 w-[900px] bg-white shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300 z-50 border-t-2 border-gold">
          <div class="grid grid-cols-12 gap-8 p-8">
            <div class="col-span-4 space-y-6">
              <div>
                <h4 class="font-display font-bold text-xs uppercase tracking-widest text-navy mb-4">
                  Identité
                </h4>
                <div class="space-y-1">
                  <a href="groupe.html" class="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors group/link">
                    <span class="text-sm text-gray-700 group-hover/link:text-gold transition-colors">Notre Vision</span>
                  </a>
                  <a href="projets.html" class="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors group/link">
                    <span class="text-sm text-gray-700 group-hover/link:text-gold transition-colors">Nos Projets</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-span-8 border-l border-gray-200 pl-8">
              <h4 class="font-display font-bold text-xs uppercase tracking-widest text-navy mb-4">
                Nos Divisions
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <a href="services.html#construction" class="flex flex-col gap-2 p-4 rounded hover:bg-gray-50 border border-gray-100 hover:border-gold/30 transition-all group/div">
                  <div class="text-sm font-bold text-navy group-hover/div:text-gold transition-colors">Magem Construct</div>
                  <p class="text-xs text-gray-600 leading-relaxed">Routes, bâtiments et infrastructures durables</p>
                </a>
                <a href="services.html#mines" class="flex flex-col gap-2 p-4 rounded hover:bg-gray-50 border border-gray-100 hover:border-gold/30 transition-all group/div">
                  <div class="text-sm font-bold text-navy group-hover/div:text-gold transition-colors">Mines & Énergie</div>
                  <p class="text-xs text-gray-600 leading-relaxed">Conseil stratégique et centrales solaires</p>
                </a>
                <a href="services.html#telecom" class="flex flex-col gap-2 p-4 rounded hover:bg-gray-50 border border-gray-100 hover:border-gold/30 transition-all group/div">
                  <div class="text-sm font-bold text-navy group-hover/div:text-gold transition-colors">Télécoms</div>
                  <p class="text-xs text-gray-600 leading-relaxed">Réseaux fibre optique et hébergement</p>
                </a>
                <a href="fondation.html" class="flex flex-col gap-2 p-4 rounded hover:bg-gray-50 border border-gray-100 hover:border-gold/30 transition-all group/div">
                  <div class="text-sm font-bold text-navy group-hover/div:text-gold transition-colors">Fondation</div>
                  <p class="text-xs text-gray-600 leading-relaxed">Santé, éducation et accès à l'eau</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }
    return `<a href="${p.href}" class="text-[13px] font-medium ${cls} transition-all py-1 border-b-2 border-transparent hover:border-gold">${p.label}</a>`;
  }).join('');

  const mobileLinks = pages.filter(p => p.id !== 'contact').map(p => {
    const cls = p.id === currentPage ? 'is-active' : '';
    if (p.hasMega) {
      return `
        <li class="mobile-nav-item mobile-nav-item--split">
          <a href="${p.href}" class="mobile-nav-link ${cls}">${p.label}</a>
          <button type="button" class="mobile-nav-toggle" aria-controls="mobile-sub-groupe" aria-expanded="false" data-submenu-toggle="groupe" aria-label="Afficher le sous-menu Le Groupe">
            <svg class="mobile-nav-chevron" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
        </li>
        <li class="mobile-nav-sub-wrap" id="mobile-sub-groupe" hidden>
          <ul class="mobile-nav-sub">
            <li><a href="groupe.html" class="mobile-nav-sublink">Notre Vision</a></li>
            <li><a href="projets.html" class="mobile-nav-sublink">Nos Projets</a></li>
            <li class="mobile-nav-sub-label">Nos Divisions</li>
            <li><a href="services.html#construction" class="mobile-nav-sublink">Magem Construct</a></li>
            <li><a href="services.html#mines" class="mobile-nav-sublink">Mines &amp; Énergie</a></li>
            <li><a href="services.html#telecom" class="mobile-nav-sublink">Télécoms</a></li>
            <li><a href="fondation.html" class="mobile-nav-sublink">Fondation</a></li>
          </ul>
        </li>`;
    }
    return `<li class="mobile-nav-item"><a href="${p.href}" class="mobile-nav-link ${cls}">${p.label}</a></li>`;
  }).join('');

  c.innerHTML = `
  <div class="fixed top-0 left-0 w-full h-[2px] bg-gold z-[9999] origin-left scale-x-0" id="scroll-progress"></div>
  <header class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white border-b border-gray-200" id="navbar">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="navbar-inner flex items-center justify-between min-h-[80px] sm:min-h-[88px] md:min-h-[96px] xl:min-h-[80px] py-2 xl:py-0">
        <a href="index.html" class="flex items-center gap-3 group relative shrink-0">
          <img src="logo/sg.png" alt="Souley Group" class="site-logo site-logo--header h-20 sm:h-24 md:h-28 xl:h-24 w-auto group-hover:opacity-80 transition-opacity">
        </a>
        <nav class="hidden xl:flex items-center gap-8" aria-label="Navigation principale">${navLinks}</nav>
        <div class="desktop-nav-actions hidden xl:flex items-center gap-4">
          <a href="contact.html" class="text-[13px] font-medium text-white bg-gold hover:bg-gold-dark transition-colors px-6 py-2.5 rounded">Contact</a>
          <button type="button" class="text-gray-600 hover:text-navy transition-colors" aria-label="Rechercher">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>
        <button class="xl:hidden mobile-menu-btn text-navy hover:text-gold transition-colors focus:outline-none relative" id="mobile-menu-btn" type="button" aria-controls="mobile-menu-panel" aria-expanded="false" aria-label="Ouvrir le menu">
          <svg class="w-7 h-7 menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg class="w-7 h-7 close-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-drawer xl:hidden" id="mobile-drawer" aria-hidden="true">
    <button type="button" class="mobile-drawer-backdrop" id="mobile-menu-backdrop" aria-label="Fermer le menu" tabindex="-1"></button>
    <nav class="mobile-drawer-panel" id="mobile-menu-panel" aria-label="Menu mobile et tablette">
      <div class="mobile-drawer-scroll">
        <ul class="mobile-nav-list">${mobileLinks}</ul>
      </div>
      <div class="mobile-drawer-footer">
        <a href="contact.html" class="mobile-drawer-contact">Contact</a>
      </div>
    </nav>
  </div>`;

  // Scroll
  const navbar = document.getElementById('navbar');
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (bar && h > 0) bar.style.transform = `scaleX(${s/h})`;
    if (navbar) { if(s>50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); }
  });

  initMobileDrawer();
}

const MOBILE_NAV_BREAKPOINT = 1280;

function syncNavHeight() {
  const inner = document.querySelector('#navbar .navbar-inner');
  if (inner) {
    document.documentElement.style.setProperty('--nav-height', `${inner.offsetHeight}px`);
  }
}

function initMobileDrawer() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const panel = document.getElementById('mobile-menu-panel');
  if (!btn || !drawer || !panel) return;

  const menuIcon = btn.querySelector('.menu-icon');
  const closeIcon = btn.querySelector('.close-icon');
  let isOpen = false;

  const openMenu = () => {
    if (isOpen) return;
    syncNavHeight();
    isOpen = true;
    document.documentElement.classList.add('mobile-menu-active');
    drawer.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Fermer le menu');
    document.body.style.overflow = 'hidden';
    if (menuIcon && closeIcon) {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  };

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    document.documentElement.classList.remove('mobile-menu-active');
    drawer.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
    if (menuIcon && closeIcon) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
    panel.querySelectorAll('[data-submenu-toggle]').forEach((toggle) => {
      const id = toggle.getAttribute('data-submenu-toggle');
      const sub = document.getElementById(`mobile-sub-${id}`);
      if (sub) sub.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('is-open');
    });
  };

  btn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  panel.querySelectorAll('[data-submenu-toggle]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const id = toggle.getAttribute('data-submenu-toggle');
      const sub = document.getElementById(`mobile-sub-${id}`);
      if (!sub) return;
      const willOpen = sub.hidden;
      sub.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', String(willOpen));
      toggle.classList.toggle('is-open', willOpen);
    });
  });

  panel.addEventListener('click', (e) => {
    if (e.target.closest('[data-submenu-toggle]')) return;
    const link = e.target.closest('a[href]');
    if (!link || !panel.contains(link)) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      syncNavHeight();
      if (window.innerWidth >= MOBILE_NAV_BREAKPOINT && isOpen) closeMenu();
    }, 100);
  };
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', syncNavHeight);
  syncNavHeight();
}

window.toggleMobileSubmenu = function(id) {
  const toggle = document.querySelector(`[data-submenu-toggle="${id}"]`);
  if (toggle) toggle.click();
}

// ---- FOOTER ----
function initFooter() {
  const c = document.getElementById('footer-container');
  if (!c) return;
  c.innerHTML = `
  <footer class="bg-white pt-16 pb-8 border-t border-gray-200 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div class="flex flex-col gap-4">
          <img src="logo/sg.png" alt="Souley Group" class="site-logo site-logo--footer h-28 sm:h-32 xl:h-24 w-auto self-start">
          <p class="text-sm text-gray-600 leading-relaxed">Bâtir l'excellence industrielle et l'émergence technologique en RDC.</p>
          <div class="flex items-center gap-3 mt-2">
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gold hover:border-gold transition-all">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gold hover:border-gold transition-all">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gold hover:border-gold transition-all">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="font-display font-bold text-sm uppercase tracking-widest text-navy border-l-2 border-gold pl-3">Navigation</h4>
          <div class="flex flex-col gap-2 text-sm text-gray-600">
            <a href="index.html" class="hover:text-gold transition-colors">Accueil</a>
            <a href="groupe.html" class="hover:text-gold transition-colors">Le Groupe</a>
            <a href="services.html" class="hover:text-gold transition-colors">Nos Services</a>
            <a href="projets.html" class="hover:text-gold transition-colors">Projets</a>
            <a href="evenements.html" class="hover:text-gold transition-colors">Événements</a>
            <a href="carrieres.html" class="hover:text-gold transition-colors">Carrières</a>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="font-display font-bold text-sm uppercase tracking-widest text-navy border-l-2 border-gold pl-3">Divisions</h4>
          <div class="flex flex-col gap-2 text-sm text-gray-600">
            <a href="services.html#construction" class="hover:text-gold transition-colors">Magem Construct</a>
            <a href="services.html#mines" class="hover:text-gold transition-colors">Mines &amp; Énergie</a>
            <a href="services.html#telecom" class="hover:text-gold transition-colors">Télécoms</a>
            <a href="fondation.html" class="hover:text-gold transition-colors">Fondation</a>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="font-display font-bold text-sm uppercase tracking-widest text-navy border-l-2 border-gold pl-3">Newsletter</h4>
          <p class="text-sm text-gray-600 leading-relaxed">Recevez nos communiqués de presse.</p>
          <div class="flex gap-2">
            <input type="email" placeholder="email@exemple.com" class="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-navy focus:outline-none focus:border-gold transition-colors">
            <button class="px-4 py-2.5 bg-gold text-white font-bold rounded-lg hover:bg-gold-dark transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <span>© 2026 Souley Group S.A. Tous droits réservés.</span>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-gold transition-colors">Mentions Légales</a>
          <a href="#" class="hover:text-gold transition-colors">Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// ---- CHATBOT ----
function initChatbot() {
  const c = document.getElementById('chatbot-container');
  if (!c) return;
  c.innerHTML = `
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <div class="chatbot-container w-[350px] max-w-[90vw] h-[450px] glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col bg-[#0e1218]/95 mb-1" id="chatbot-box">
      <div class="bg-gradient-to-r from-navy to-steel/40 px-4 py-3.5 flex items-center justify-between border-b border-white/5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <div><h4 class="font-display font-bold text-xs text-white">Assistant Souley</h4><span class="text-[9px] text-emerald-400 font-medium flex items-center gap-1"><span class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span> En ligne</span></div>
        </div>
        <button onclick="toggleChatbot()" class="text-gray-400 hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs" id="chat-messages">
        <div class="bg-white/5 rounded-xl p-3 border border-white/5 max-w-[85%] self-start text-gray-300">Bonjour ! Comment puis-je vous aider ?</div>
      </div>
      <div class="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-black/25">
        <button onclick="askBotQuestion('Magem Construct')" class="px-2.5 py-1 bg-white/5 hover:bg-gold/10 hover:text-gold rounded-full text-[10px] text-gray-400 font-medium transition-colors">Magem Construct</button>
        <button onclick="askBotQuestion('Mines & Énergie')" class="px-2.5 py-1 bg-white/5 hover:bg-gold/10 hover:text-gold rounded-full text-[10px] text-gray-400 font-medium transition-colors">Mines</button>
        <button onclick="askBotQuestion('Fibre & Télécom')" class="px-2.5 py-1 bg-white/5 hover:bg-gold/10 hover:text-gold rounded-full text-[10px] text-gray-400 font-medium transition-colors">Télécom</button>
        <button onclick="askBotQuestion('Événements')" class="px-2.5 py-1 bg-white/5 hover:bg-gold/10 hover:text-gold rounded-full text-[10px] text-gray-400 font-medium transition-colors">Événements</button>
      </div>
      <div class="p-3 border-t border-white/5 flex gap-2 bg-black/40">
        <input type="text" id="chat-input" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold placeholder-gray-600" placeholder="Votre question...">
        <button onclick="sendChatMessage()" class="w-10 h-10 rounded-xl bg-gold text-black flex items-center justify-center hover:bg-gold-dark transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        </button>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <a href="https://wa.me/243812345678" target="_blank" class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24z"/></svg></a>
      <button onclick="toggleChatbot()" class="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      </button>
    </div>
  </div>`;
  const inp = document.getElementById('chat-input');
  if (inp) inp.addEventListener('keypress', e => { if(e.key==='Enter') sendChatMessage(); });
}
