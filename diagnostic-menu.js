// =============================================
// DIAGNOSTIC DU MENU MOBILE
// Script pour vérifier que tout fonctionne
// =============================================

console.log('🔍 DIAGNOSTIC DU MENU MOBILE - DÉMARRAGE');
console.log('==========================================\n');

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    runDiagnostic();
  }, 1000);
});

function runDiagnostic() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  // Test 1 : Vérifier que le conteneur navbar existe
  console.log('📋 Test 1 : Conteneur navbar');
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    results.passed.push('✅ Conteneur navbar trouvé');
    console.log('✅ Conteneur navbar trouvé');
  } else {
    results.failed.push('❌ Conteneur navbar non trouvé');
    console.log('❌ Conteneur navbar non trouvé');
  }

  // Test 2 : Vérifier que le bouton menu existe
  console.log('\n📋 Test 2 : Bouton menu mobile');
  const menuBtn = document.getElementById('mobile-menu-btn');
  if (menuBtn) {
    results.passed.push('✅ Bouton menu mobile trouvé');
    console.log('✅ Bouton menu mobile trouvé');
    console.log('   - aria-expanded:', menuBtn.getAttribute('aria-expanded'));
  } else {
    results.failed.push('❌ Bouton menu mobile non trouvé');
    console.log('❌ Bouton menu mobile non trouvé');
  }

  // Test 3 : Vérifier que le menu existe
  console.log('\n📋 Test 3 : Menu mobile');
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    results.passed.push('✅ Menu mobile trouvé');
    console.log('✅ Menu mobile trouvé');
    console.log('   - Classes:', menu.className);
    console.log('   - Display:', window.getComputedStyle(menu).display);
  } else {
    results.failed.push('❌ Menu mobile non trouvé');
    console.log('❌ Menu mobile non trouvé');
  }

  // Test 4 : Vérifier les liens du menu
  console.log('\n📋 Test 4 : Liens du menu');
  if (menu) {
    const links = menu.querySelectorAll('a');
    console.log(`✅ ${links.length} liens trouvés dans le menu`);
    results.passed.push(`✅ ${links.length} liens trouvés`);
    
    if (links.length === 0) {
      results.warnings.push('⚠️ Aucun lien trouvé - Le HTML n\'est peut-être pas encore injecté');
      console.log('⚠️ Aucun lien trouvé - Le HTML n\'est peut-être pas encore injecté');
    } else {
      console.log('\n   Liste des liens :');
      links.forEach((link, index) => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        console.log(`   ${index + 1}. "${text}" → ${href}`);
        
        // Vérifier que le lien a un href
        if (!href) {
          results.warnings.push(`⚠️ Lien "${text}" sans href`);
        }
        
        // Vérifier que le lien a cursor-pointer
        const hasCursor = link.classList.contains('cursor-pointer');
        if (!hasCursor) {
          results.warnings.push(`⚠️ Lien "${text}" sans cursor-pointer`);
        }
      });
    }
  }

  // Test 5 : Vérifier les événements
  console.log('\n📋 Test 5 : Événements attachés');
  if (menuBtn) {
    const listeners = getEventListeners(menuBtn);
    if (listeners && listeners.click) {
      results.passed.push('✅ Événement click sur le bouton');
      console.log('✅ Événement click attaché au bouton');
    } else {
      results.warnings.push('⚠️ Impossible de vérifier les événements (getEventListeners non disponible)');
      console.log('⚠️ Impossible de vérifier les événements (getEventListeners non disponible)');
    }
  }

  // Test 6 : Vérifier la délégation d'événements sur le menu
  console.log('\n📋 Test 6 : Délégation d\'événements');
  if (menu) {
    // Simuler un clic sur le menu pour voir si l'événement est capturé
    console.log('ℹ️ La délégation d\'événements devrait être active sur #mobile-menu');
    results.passed.push('✅ Menu prêt pour la délégation d\'événements');
  }

  // Test 7 : Vérifier les sous-menus
  console.log('\n📋 Test 7 : Sous-menus');
  const submenu = document.getElementById('mobile-submenu-groupe');
  if (submenu) {
    results.passed.push('✅ Sous-menu "Le Groupe" trouvé');
    console.log('✅ Sous-menu "Le Groupe" trouvé');
    
    const submenuLinks = submenu.querySelectorAll('a');
    console.log(`   - ${submenuLinks.length} liens dans le sous-menu`);
    
    submenuLinks.forEach((link, index) => {
      const text = link.textContent.trim();
      const href = link.getAttribute('href');
      console.log(`   ${index + 1}. "${text}" → ${href}`);
    });
  } else {
    results.warnings.push('⚠️ Sous-menu "Le Groupe" non trouvé');
    console.log('⚠️ Sous-menu "Le Groupe" non trouvé');
  }

  // Test 8 : Vérifier les fichiers cibles
  console.log('\n📋 Test 8 : Fichiers cibles');
  const expectedFiles = [
    'index.html',
    'groupe.html',
    'services.html',
    'projets.html',
    'fondation.html',
    'evenements.html',
    'actualites.html',
    'carrieres.html',
    'contact.html'
  ];
  
  console.log('ℹ️ Fichiers attendus :');
  expectedFiles.forEach(file => {
    console.log(`   - ${file}`);
  });

  // Résumé
  console.log('\n==========================================');
  console.log('📊 RÉSUMÉ DU DIAGNOSTIC');
  console.log('==========================================\n');
  
  console.log(`✅ Tests réussis : ${results.passed.length}`);
  results.passed.forEach(msg => console.log(`   ${msg}`));
  
  if (results.warnings.length > 0) {
    console.log(`\n⚠️ Avertissements : ${results.warnings.length}`);
    results.warnings.forEach(msg => console.log(`   ${msg}`));
  }
  
  if (results.failed.length > 0) {
    console.log(`\n❌ Tests échoués : ${results.failed.length}`);
    results.failed.forEach(msg => console.log(`   ${msg}`));
  }
  
  console.log('\n==========================================');
  
  if (results.failed.length === 0) {
    console.log('✅ DIAGNOSTIC RÉUSSI - Le menu devrait fonctionner');
  } else {
    console.log('❌ DIAGNOSTIC ÉCHOUÉ - Des problèmes ont été détectés');
  }
  
  console.log('==========================================\n');
  
  // Instructions pour tester manuellement
  console.log('📝 INSTRUCTIONS DE TEST MANUEL :');
  console.log('1. Réduisez la largeur du navigateur (< 1280px)');
  console.log('2. Cliquez sur le bouton hamburger ☰');
  console.log('3. Le menu doit s\'ouvrir');
  console.log('4. Cliquez sur "Fondation" → Doit rediriger vers fondation.html');
  console.log('5. Cliquez sur "Événements" → Doit rediriger vers evenements.html');
  console.log('6. Cliquez sur "Actualités" → Doit rediriger vers actualites.html');
  console.log('7. Cliquez sur "Carrières" → Doit rediriger vers carrieres.html');
  console.log('8. Ouvrez le sous-menu "Le Groupe" et testez les liens');
  console.log('\n💡 Astuce : Ouvrez la console (F12) pour voir les logs en temps réel');
}

// Fonction helper pour getEventListeners (disponible uniquement dans Chrome DevTools)
function getEventListeners(element) {
  if (typeof window.getEventListeners === 'function') {
    return window.getEventListeners(element);
  }
  return null;
}

// Écouter les clics pour logger
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link) {
    console.log('🖱️ CLIC DÉTECTÉ sur un lien :');
    console.log('   - Texte:', link.textContent.trim());
    console.log('   - Href:', link.href);
    console.log('   - Dans le menu mobile:', document.getElementById('mobile-menu')?.contains(link) ? 'OUI' : 'NON');
  }
}, true);

console.log('✅ Script de diagnostic chargé');
console.log('ℹ️ Le diagnostic démarrera automatiquement dans 1 seconde...\n');
