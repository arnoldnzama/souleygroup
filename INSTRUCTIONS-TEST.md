# 🧪 Instructions de Test - Menu Mobile

## Comment Tester le Menu Mobile

### Option 1 : Test avec la Page de Test

1. **Ouvrir le fichier de test**
   ```
   Ouvrir : h:\souley\test-menu-mobile.html
   ```

2. **Ouvrir la console JavaScript**
   - Appuyer sur `F12`
   - Aller dans l'onglet "Console"

3. **Réduire la largeur du navigateur**
   - Largeur < 1280px pour voir le menu mobile
   - Ou utiliser le mode responsive (Ctrl+Shift+M dans Chrome)

4. **Vérifier le diagnostic**
   - La console affichera automatiquement un diagnostic complet
   - Chercher "✅ DIAGNOSTIC RÉUSSI" ou "❌ DIAGNOSTIC ÉCHOUÉ"

5. **Tester les liens**
   - Cliquer sur le bouton hamburger ☰
   - Cliquer sur chaque lien
   - Vérifier dans la console que les clics sont détectés

---

### Option 2 : Test sur une Page Réelle

1. **Ouvrir n'importe quelle page du site**
   ```
   Exemples :
   - h:\souley\index.html
   - h:\souley\groupe.html
   - h:\souley\fondation.html
   ```

2. **Ouvrir la console (F12)**

3. **Réduire la largeur du navigateur (< 1280px)**

4. **Tester le menu**
   - Cliquer sur ☰
   - Le menu doit s'ouvrir
   - Cliquer sur "Fondation"
   - La page fondation.html doit se charger
   - Le menu doit se fermer automatiquement

---

## 📋 Checklist de Test

### Menu Principal

- [ ] Clic sur ☰ → Menu s'ouvre
- [ ] Clic sur "Accueil" → Redirige vers index.html
- [ ] Clic sur "Le Groupe" → Redirige vers groupe.html
- [ ] Clic sur "Services" → Redirige vers services.html
- [ ] Clic sur "Projets" → Redirige vers projets.html
- [ ] **Clic sur "Fondation" → Redirige vers fondation.html** ⚠️
- [ ] **Clic sur "Événements" → Redirige vers evenements.html** ⚠️
- [ ] **Clic sur "Actualités" → Redirige vers actualites.html** ⚠️
- [ ] **Clic sur "Carrières" → Redirige vers carrieres.html** ⚠️
- [ ] Clic sur "Contact" → Redirige vers contact.html

### Sous-menu "Le Groupe"

- [ ] Clic sur la flèche → Sous-menu s'ouvre
- [ ] **Clic sur "Notre Vision" → Redirige vers groupe.html** ⚠️
- [ ] **Clic sur "Nos Projets" → Redirige vers projets.html** ⚠️
- [ ] **Clic sur "Magem Construct" → Redirige vers services.html#construction** ⚠️
- [ ] **Clic sur "Mines & Énergie" → Redirige vers services.html#mines** ⚠️
- [ ] **Clic sur "Télécoms" → Redirige vers services.html#telecom** ⚠️
- [ ] **Clic sur "Fondation" → Redirige vers fondation.html** ⚠️

### Comportement

- [ ] Le menu se ferme automatiquement après navigation
- [ ] Le curseur est en forme de main sur les liens
- [ ] Pas d'erreurs dans la console
- [ ] Le menu se ferme au clic en dehors
- [ ] Le menu se ferme avec la touche Escape

---

## 🔍 Que Chercher dans la Console

### Messages Attendus (Bon Signe ✅)

```
🔍 DIAGNOSTIC DU MENU MOBILE - DÉMARRAGE
✅ Conteneur navbar trouvé
✅ Bouton menu mobile trouvé
✅ Menu mobile trouvé
✅ 15 liens trouvés dans le menu
✅ DIAGNOSTIC RÉUSSI - Le menu devrait fonctionner
```

### Messages de Clic (Quand vous cliquez sur un lien)

```
🖱️ CLIC DÉTECTÉ sur un lien :
   - Texte: Fondation
   - Href: http://localhost/fondation.html
   - Dans le menu mobile: OUI
```

### Messages d'Erreur (Mauvais Signe ❌)

```
❌ Conteneur navbar non trouvé
❌ Menu mobile non trouvé
⚠️ Aucun lien trouvé
```

---

## 🐛 Si Ça Ne Fonctionne Pas

### 1. Vider le Cache
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### 2. Vérifier les Fichiers
```powershell
# Dans PowerShell, vérifier que tous les fichiers existent
cd h:\souley
dir *.html
```

Fichiers requis :
- index.html
- groupe.html
- services.html
- projets.html
- fondation.html
- evenements.html
- actualites.html
- carrieres.html
- contact.html

### 3. Vérifier components.js
```powershell
# Vérifier que le fichier existe et n'est pas vide
Get-Content h:\souley\components.js | Measure-Object -Line
```

Devrait afficher environ 300+ lignes.

### 4. Vérifier la Console JavaScript
- Ouvrir F12
- Onglet Console
- Chercher des erreurs en rouge
- Copier les erreurs et les analyser

---

## 📱 Test sur Mobile Réel

### Méthode 1 : Serveur Local

1. **Installer un serveur HTTP simple**
   ```powershell
   # Avec Python
   cd h:\souley
   python -m http.server 8000
   ```

2. **Trouver votre IP locale**
   ```powershell
   ipconfig
   # Chercher "Adresse IPv4"
   ```

3. **Accéder depuis le mobile**
   ```
   http://[VOTRE_IP]:8000
   Exemple : http://192.168.1.100:8000
   ```

### Méthode 2 : Chrome Remote Debugging

1. Connecter le téléphone en USB
2. Activer le débogage USB sur le téléphone
3. Dans Chrome : `chrome://inspect`
4. Sélectionner votre appareil

---

## 📊 Résultats Attendus

### ✅ Si Tout Fonctionne

- Tous les liens redirigent correctement
- Le menu se ferme automatiquement
- Pas d'erreurs dans la console
- Le curseur change sur les liens
- Les sous-menus s'ouvrent/ferment

### ❌ Si Ça Ne Fonctionne Pas

**Symptômes possibles :**
- Clic sur un lien → Rien ne se passe
- Menu ne se ferme pas
- Erreurs JavaScript dans la console
- Liens non cliquables

**Actions :**
1. Vérifier la console pour les erreurs
2. Vider le cache (Ctrl+F5)
3. Vérifier que components.js est bien chargé
4. Vérifier que les fichiers HTML existent
5. Tester sur un autre navigateur

---

## 💡 Astuces de Débogage

### Voir les Événements Attachés (Chrome uniquement)

1. Ouvrir DevTools (F12)
2. Onglet "Elements"
3. Sélectionner `#mobile-menu`
4. Onglet "Event Listeners" à droite
5. Chercher "click" → Devrait avoir 1 événement

### Logger les Clics Manuellement

Coller dans la console :
```javascript
document.addEventListener('click', (e) => {
  console.log('Clic sur:', e.target);
  const link = e.target.closest('a');
  if (link) {
    console.log('Lien trouvé:', link.href);
  }
}, true);
```

### Forcer l'Ouverture du Menu

Coller dans la console :
```javascript
const menu = document.getElementById('mobile-menu');
menu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
menu.classList.add('opacity-100');
menu.style.display = 'flex';
```

---

## 📞 Rapport de Bug

Si après tous ces tests, le menu ne fonctionne toujours pas, noter :

1. **Navigateur et version** : _________________
2. **Système d'exploitation** : _________________
3. **Largeur de l'écran** : _________________
4. **Erreurs dans la console** : _________________
5. **Liens qui ne fonctionnent pas** : _________________
6. **Comportement observé** : _________________

---

**Date** : 1er juin 2026  
**Version** : 3.3  
**Fichiers de test** :
- test-menu-mobile.html
- diagnostic-menu.js
