// =============================================
// ANIMATIONS AVANCÉES — Souley Group
// Animations fluides et dynamiques inspirées de Figma
// =============================================

// ---- CONFIGURATION GSAP ----
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Configuration globale
  gsap.config({
    nullTargetWarn: false,
    trialWarn: false
  });
}

// ---- ANIMATIONS AU CHARGEMENT DE LA PAGE ----
function initPageLoadAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Animation du logo
  gsap.from('header img', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.2
  });
  
  // Animation des liens de navigation
  gsap.from('nav a, nav button', {
    duration: 0.6,
    y: -20,
    opacity: 0,
    stagger: 0.05,
    ease: 'power2.out',
    delay: 0.4
  });
  
  // Animation de la barre de progression
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    gsap.from(progressBar, {
      duration: 0.8,
      scaleX: 0,
      transformOrigin: 'left',
      ease: 'power2.out'
    });
  }
}

// ---- ANIMATIONS DE SCROLL REVEAL ----
function initScrollRevealAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  // Animation des cartes (projets, services, etc.)
  gsap.utils.toArray('.project-card, .glass-panel, .event-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: index * 0.1
    });
  });
  
  // Animation des titres de section
  gsap.utils.toArray('section h2, section h3').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
  
  // Animation des paragraphes
  gsap.utils.toArray('section p').forEach(p => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        start: 'top 92%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  
  // Animation des boutons
  gsap.utils.toArray('.btn-premium, button[class*="bg-gold"]').forEach((btn, index) => {
    gsap.from(btn, {
      scrollTrigger: {
        trigger: btn,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: index * 0.1
    });
  });
}

// ---- ANIMATIONS HOVER AVANCÉES ----
function initHoverAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Cartes de projet avec effet de levée
  document.querySelectorAll('.project-card, .event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -12,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
      });
      
      const img = this.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        boxShadow: '0 0 0 rgba(0,0,0,0)'
      });
      
      const img = this.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  });
  
  // Boutons avec effet de pulsation
  document.querySelectorAll('.btn-premium').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Liens avec effet de glissement
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -2,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
    
    link.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
  });
}

// ---- ANIMATIONS DE PARALLAXE ----
function initParallaxAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  // Parallaxe sur les images de hero
  gsap.utils.toArray('.page-hero img, section[id="hero"] img').forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 150,
      ease: 'none'
    });
  });
  
  // Parallaxe sur les éléments de fond
  gsap.utils.toArray('.cyber-grid, .cyber-grid-animated').forEach(grid => {
    gsap.to(grid, {
      scrollTrigger: {
        trigger: grid,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      },
      backgroundPosition: '0 100px',
      ease: 'none'
    });
  });
}

// ---- ANIMATIONS DE COMPTEUR AMÉLIORÉES ----
function animateCounter(element, target, duration = 2.5, suffix = '') {
  if (typeof gsap === 'undefined') return;
  
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration: duration,
    ease: 'power2.out',
    onUpdate: function() {
      element.textContent = Math.floor(obj.value) + suffix;
    },
    onComplete: function() {
      // Animation de pulsation à la fin
      gsap.to(element, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  });
}

// ---- ANIMATIONS DE MODAL ----
function animateModalOpen(modalId) {
  if (typeof gsap === 'undefined') return;
  
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  
  const content = modal.querySelector('.glass-panel');
  if (content) {
    gsap.from(content, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  }
}

function animateModalClose(modalId) {
  if (typeof gsap === 'undefined') return;
  
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  const content = modal.querySelector('.glass-panel');
  if (content) {
    gsap.to(content, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
      }
    });
  }
}

// ---- ANIMATIONS DE FILTRES ----
function animateFilterChange(gridId) {
  if (typeof gsap === 'undefined') return;
  
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  const items = grid.children;
  gsap.killTweensOf(items);
  gsap.fromTo(items, {
    opacity: 0,
    y: 28
  }, {
    opacity: 1,
    y: 0,
    duration: 0.45,
    stagger: 0.05,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });
}

// ---- ANIMATIONS DE TEXTE (TYPING EFFECT) ----
function animateTextReveal(element, delay = 0) {
  if (typeof gsap === 'undefined') return;
  
  const text = element.textContent;
  element.textContent = '';
  element.style.opacity = 1;
  
  const chars = text.split('');
  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = 0;
    element.appendChild(span);
    
    gsap.to(span, {
      opacity: 1,
      duration: 0.05,
      delay: delay + (index * 0.03),
      ease: 'none'
    });
  });
}

// ---- ANIMATIONS DE NAVIGATION ----
function animateMobileMenuToggle(isOpen) {
  if (typeof gsap === 'undefined') return;
  
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  
  const links = menu.querySelectorAll('.mobile-nav-link, .mobile-submenu-wrapper, .mobile-menu-actions');
  gsap.killTweensOf(links);
  
  if (isOpen) {
    // Menu s'ouvre - animer les liens
    gsap.set(links, { x: -50, opacity: 0 });
    gsap.to(links, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.1
    });
  } else {
    // Menu se ferme - animer les liens
    gsap.to(links, {
      x: -30,
      opacity: 0,
      duration: 0.25,
      stagger: 0.02,
      ease: 'power2.in'
    });
  }
}

// ---- ANIMATIONS DE TIMELINE ----
function animateTimelineChange(year) {
  if (typeof gsap === 'undefined') return;
  
  const card = document.getElementById(`time-detail-${year}`);
  if (!card) return;
  
  gsap.from(card, {
    opacity: 0,
    x: -30,
    duration: 0.6,
    ease: 'power3.out'
  });
  
  // Animation de la ligne de progression
  const dots = document.querySelectorAll('.timeline-dot');
  dots.forEach((dot, index) => {
    const dotYear = [2018, 2021, 2023, 2026][index];
    if (dotYear <= year) {
      gsap.to(dot, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    }
  });
}

// ---- ANIMATIONS DE PARTICULES (EFFET ÉTOILES) ----
function createFloatingParticles(containerId, count = 20) {
  const container = document.getElementById(containerId);
  if (!container || typeof gsap === 'undefined') return;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(212, 160, 23, ${Math.random() * 0.5 + 0.3});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
    `;
    container.appendChild(particle);
    
    gsap.to(particle, {
      y: -100 - Math.random() * 100,
      x: (Math.random() - 0.5) * 100,
      opacity: 0,
      duration: 3 + Math.random() * 3,
      repeat: -1,
      delay: Math.random() * 3,
      ease: 'none'
    });
  }
}

// ---- ANIMATIONS DE CHARGEMENT ----
function showLoadingAnimation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-12 gap-4">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p class="text-sm text-gray-400 animate-pulse">Chargement en cours...</p>
    </div>
  `;
}

// ---- INITIALISATION GLOBALE ----
function initAllAnimations() {
  // Attendre que GSAP soit chargé
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, animations disabled');
    return;
  }
  
  // Initialiser toutes les animations
  initPageLoadAnimations();
  initScrollRevealAnimations();
  initHoverAnimations();
  initParallaxAnimations();
  
  // Ajouter des particules flottantes au hero
  if (document.getElementById('hero')) {
    createFloatingParticles('hero', 15);
  }
  
  console.log('✨ Animations initialisées avec succès');
}

// Auto-initialisation au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}

// Export des fonctions pour utilisation externe
window.animateModalOpen = animateModalOpen;
window.animateModalClose = animateModalClose;
window.animateFilterChange = animateFilterChange;
window.animateTimelineChange = animateTimelineChange;
window.animateMobileMenuToggle = animateMobileMenuToggle;
window.animateCounter = animateCounter;
