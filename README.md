# 🏗️ Souley Group - Site Web Officiel

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)

Site web officiel du **Souley Group**, leader multisectoriel en ingénierie, énergies renouvelables et connectivité numérique en République Démocratique du Congo.

## 🌟 À propos

Souley Group est un conglomérat panafricain opérant dans quatre secteurs clés :

- 🏗️ **Magem Construct** - Construction d'infrastructures civiles, routes et bâtiments durables
- ⚡ **Mines & Énergie** - Conseil stratégique minier et déploiement de centrales solaires
- 📡 **Télécoms** - Réseaux fibre optique et hébergement de données (Datacenter)
- ❤️ **Fondation Souley** - Santé, éducation et accès à l'eau potable

## 🚀 Fonctionnalités

- ✅ Design moderne et responsive avec Tailwind CSS
- ✅ Animations fluides avec GSAP et ScrollTrigger
- ✅ Panneau d'administration complet
- ✅ Chatbot interactif
- ✅ Formulaire de contact avec validation
- ✅ Gestion des projets, événements et actualités
- ✅ Système de carrières avec filtres
- ✅ Optimisé pour le SEO avec métadonnées Open Graph
- ✅ Favicon intégré sur toutes les pages

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- MySQL (pour la base de données)

## 🛠️ Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/arnoldnzama/souleygroup.git
cd souleygroup
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos informations :
```env
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=souley_group
PORT=3000
```

4. **Importer la base de données**
```bash
mysql -u votre_utilisateur -p souley_group < database.sql
```

5. **Démarrer le serveur**
```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
souleygroup/
├── index.html              # Page d'accueil
├── groupe.html             # Page Le Groupe
├── services.html           # Page Services
├── projets.html            # Page Projets
├── fondation.html          # Page Fondation
├── actualites.html         # Page Actualités
├── evenements.html         # Page Événements
├── carrieres.html          # Page Carrières
├── contact.html            # Page Contact
├── admin.html              # Panneau d'administration
├── styles.css              # Styles personnalisés
├── app.js                  # Logique principale
├── components.js           # Composants réutilisables
├── animations.js           # Animations GSAP
├── admin.js                # Logique admin
├── server.js               # Serveur Express
├── database.sql            # Structure de la base de données
├── ico/                    # Favicon
├── logo/                   # Logos
├── img/                    # Images
├── bio/                    # Photo du fondateur
├── part/                   # Logos des partenaires
└── cahier-charge/          # Documentation du projet
```

## 🎨 Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript (Vanilla)** - Logique côté client
- **GSAP** - Animations avancées
- **Lucide Icons** - Icônes modernes

### Backend
- **Node.js** - Environnement d'exécution
- **Express.js** - Framework web
- **MySQL** - Base de données relationnelle
- **dotenv** - Gestion des variables d'environnement

## 📱 Pages disponibles

| Page | Description | URL |
|------|-------------|-----|
| Accueil | Page d'accueil avec hero slider | `/` |
| Le Groupe | Biographie du fondateur, vision, mission | `/groupe.html` |
| Services | Nos 4 divisions d'activité | `/services.html` |
| Projets | Portfolio de réalisations | `/projets.html` |
| Fondation | Actions sociales et humanitaires | `/fondation.html` |
| Actualités | Blog et communiqués de presse | `/actualites.html` |
| Événements | Conférences et inaugurations | `/evenements.html` |
| Carrières | Offres d'emploi | `/carrieres.html` |
| Contact | Formulaire de contact | `/contact.html` |
| Administration | Panneau de gestion | `/admin.html` |

## 🔧 Scripts disponibles

```bash
# Démarrer le serveur de développement
npm start

# Démarrer avec nodemon (rechargement automatique)
npm run dev
```

## 🌐 Déploiement

### Hébergement recommandé
- **Vercel** - Pour le frontend statique
- **Heroku** - Pour le backend Node.js
- **DigitalOcean** - Pour un VPS complet
- **AWS** - Pour une infrastructure scalable

### Variables d'environnement en production
Assurez-vous de configurer les variables suivantes :
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`
- `NODE_ENV=production`

## 📊 Base de données

La base de données MySQL contient les tables suivantes :
- `projects` - Projets réalisés
- `events` - Événements et conférences
- `blog_posts` - Articles de blog
- `contacts` - Messages de contact
- `jobs` - Offres d'emploi

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Souleymane Kahuka** - Fondateur & PDG
- **Développement Web** - [Arnold Nzama](https://github.com/arnoldnzama)

## 📞 Contact

**Souley Group**
- 🌐 Site web : [souleygroup.com](https://souleygroup.com)
- 📧 Email : contact@souleygroup.com
- 📱 Téléphone : +243 81 234 56 78
- 📍 Adresse : 14, Boulevard du 30 Juin, Gombe, Kinshasa, RDC

## 🙏 Remerciements

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [GSAP](https://greensock.com/gsap/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icônes
- [Unsplash](https://unsplash.com/) - Images de qualité

---

**© 2026 Souley Group. Tous droits réservés.**

*Construire l'Afrique de demain* 🌍
