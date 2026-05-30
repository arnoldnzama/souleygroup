CREATE DATABASE IF NOT EXISTS `souley_group` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `souley_group`;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `division` VARCHAR(50) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `client` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `year` VARCHAR(10) NOT NULL,
  `impact` TEXT NOT NULL,
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `blog` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` VARCHAR(500) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `read_time` VARCHAR(20) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Direction de la Communication',
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `date_sent` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_read` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `date_event` DATETIME NOT NULL,
  `end_date` DATETIME DEFAULT NULL,
  `location` VARCHAR(255) NOT NULL,
  `division` VARCHAR(50) NOT NULL DEFAULT 'groupe',
  `image` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'conference',
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_past` TINYINT(1) DEFAULT 0,
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertion des projets
INSERT INTO `projects` (`title`, `description`, `division`, `image`, `client`, `location`, `year`, `impact`) VALUES
('Modernisation Route Nationale 1 (Kinshasa-Matadi)', 'Réhabilitation lourde, élargissement des voies et renforcement de la chaussée.', 'construction', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80', 'Ministère Infrastructures', 'Kinshasa - Kongo Central', '2025', 'Réduction du temps de trajet de 40%.'),
('Complexe Résidentiel "Congo Horizon"', 'Éco-quartier intelligent de 120 appartements avec énergie solaire autonome.', 'construction', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'Investisseurs Privés', 'Kinshasa Gombe', '2026', 'Autonomie énergétique 100%.'),
('Mine Intelligente de Kolwezi', 'Fondations d\'usine, concasseurs et soutènements miniers automatisés.', 'construction', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80', 'Mining Corp Global', 'Kolwezi (Lualaba)', '2024', 'Capacité de production augmentée.'),
('Centrale Solaire 50MW', 'Conseil et facilitation pour une centrale photovoltaïque connectée SNEL.', 'mines', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80', 'Green Power RDC', 'Kolwezi (Lualaba)', '2025', '45 000 foyers alimentés en vert.'),
('Accompagnement Tenke Fungurume', 'Facilitation administrative et conformité RSE pour les investissements miniers.', 'mines', 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80', 'Tenke Fungurume Mining', 'Lualaba', '2024', 'Charte ESG locale établie.'),
('Fibre Optique FTTX Kinshasa (150km)', 'Dorsale fibre sous-terraine haut débit à travers Kinshasa.', 'telecom', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80', 'Réseau National Télécoms', 'Kinshasa', '2025', '800+ entreprises connectées.'),
('Datacenter Souley Tier III', 'Centre de données souverain avec refroidissement écologique.', 'telecom', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 'Souley Telecom', 'Lubumbashi', '2026', 'Latence réseau réduite à 5ms.'),
('Hôpital Communautaire Kipushi', 'Clinique pédiatrique 45 lits avec télémédecine et énergie solaire.', 'fondation', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 'Fondation Souley', 'Kipushi (Haut-Katanga)', '2025', '15 000 mères et enfants/an.'),
('Bourses Souley Tech (Filles RDC)', 'Bourses STEM, mentorat et équipement informatique pour jeunes filles.', 'fondation', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 'Fondation Souley', 'Kinshasa - Lubumbashi', '2024-2026', '85 diplômées insérées.');

-- Insertion des articles de blog
INSERT INTO `blog` (`title`, `excerpt`, `content`, `category`, `read_time`, `image`) VALUES
('Investissement de 15M$ dans la souveraineté numérique', 'Construction du premier réseau de datacenters souverains en RDC.', '<p>Contenu de l\'article ici...</p>', 'Technologie', '4 min', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'),
('Inauguration de la maternité de Kipushi', 'Clinique pédiatrique gratuite alimentée en énergie solaire.', '<p>Contenu de l\'article ici...</p>', 'Fondation', '3 min', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'),
('Transition énergétique minière', 'Intégration de l\'énergie solaire dans les gisements congolais.', '<p>Contenu de l\'article ici...</p>', 'Énergie', '5 min', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80');

-- Insertion des événements
INSERT INTO `events` (`title`, `description`, `date_event`, `location`, `division`, `image`, `type`, `is_featured`, `is_past`) VALUES
('Forum Panafricain de l\'Infrastructure Durable 2026', 'Le plus grand rassemblement d\'experts en infrastructure...', '2026-07-15 09:00:00', 'Pullman Grand Hôtel, Kinshasa Gombe', 'groupe', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', 'conference', 1, 0),
('Inauguration Datacenter Souley', 'Cérémonie officielle d\'ouverture...', '2026-09-20 10:00:00', 'Lubumbashi, Haut-Katanga', 'telecom', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 'inauguration', 0, 0),
('Salon Mines & Énergie Katanga', 'Exposition des innovations en exploitation minière...', '2026-06-10 08:00:00', 'Centre des Congrès, Kolwezi', 'mines', 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80', 'salon', 0, 0),
('Atelier Cybersécurité RDC', 'Formation et sensibilisation aux enjeux...', '2026-08-05 09:00:00', 'Fleuve Congo Hôtel, Kinshasa', 'telecom', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80', 'atelier', 0, 0),
('Cérémonie Remise Bourses 2025', 'Remise officielle des bourses Souley Tech...', '2025-12-18 14:00:00', 'Palais du Peuple, Kinshasa', 'fondation', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 'inauguration', 0, 1),
('Forum Construction Durable 2025', 'Échanges sur les pratiques de construction verte...', '2025-06-22 09:00:00', 'Hôtel Karavia, Lubumbashi', 'construction', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80', 'conference', 0, 1);
