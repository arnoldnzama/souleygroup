const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Mock Data
let mockProjects = [
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

let mockBlog = [
  {id:1,title:'Investissement de 15M$ dans la souveraineté numérique',excerpt:'Construction du premier réseau de datacenters souverains en RDC.',category:'Technologie',read_time:'4 min',image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',date_created:new Date().toISOString()},
  {id:2,title:'Inauguration de la maternité de Kipushi',excerpt:'Clinique pédiatrique gratuite alimentée en énergie solaire.',category:'Fondation',read_time:'3 min',image:'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',date_created:new Date().toISOString()},
  {id:3,title:'Transition énergétique minière',excerpt:'Intégration de l\'énergie solaire dans les gisements congolais.',category:'Énergie',read_time:'5 min',image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',date_created:new Date().toISOString()}
];

let mockContacts = [];

let mockEvents = [
  {id:1,title:'Forum Panafricain de l\'Infrastructure Durable 2026',description:'Le plus grand rassemblement d\'experts en infrastructure...',date_event:'2026-07-15T09:00:00',end_date:'2026-07-15T18:00:00',location:'Pullman Grand Hôtel, Kinshasa Gombe',division:'groupe',image:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',type:'conference',is_featured:1,is_past:0},
  {id:2,title:'Inauguration Datacenter Souley',description:'Cérémonie officielle d\'ouverture...',date_event:'2026-09-20T10:00:00',end_date:null,location:'Lubumbashi, Haut-Katanga',division:'telecom',image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',type:'inauguration',is_featured:0,is_past:0},
  {id:3,title:'Salon Mines & Énergie Katanga',description:'Exposition des innovations en exploitation minière...',date_event:'2026-06-10T08:00:00',end_date:null,location:'Centre des Congrès, Kolwezi',division:'mines',image:'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',type:'salon',is_featured:0,is_past:0},
  {id:4,title:'Atelier Cybersécurité RDC',description:'Formation et sensibilisation aux enjeux...',date_event:'2026-08-05T09:00:00',end_date:null,location:'Fleuve Congo Hôtel, Kinshasa',division:'telecom',image:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',type:'atelier',is_featured:0,is_past:0},
  {id:5,title:'Cérémonie Remise Bourses 2025',description:'Remise officielle des bourses Souley Tech...',date_event:'2025-12-18T14:00:00',end_date:null,location:'Palais du Peuple, Kinshasa',division:'fondation',image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',type:'inauguration',is_featured:0,is_past:1},
  {id:6,title:'Forum Construction Durable 2025',description:'Échanges sur les pratiques de construction verte...',date_event:'2025-06-22T09:00:00',end_date:null,location:'Hôtel Karavia, Lubumbashi',division:'construction',image:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',type:'conference',is_featured:0,is_past:1}
];

// DB Connection
let db;
async function initDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'souley_group'
    });
    console.log('Connecté à la base de données MySQL.');
  } catch (error) {
    console.log('Base de données non disponible, utilisation du mode Mock (mémoire).');
    db = null;
  }
}
initDB();

// API Routes - Projects
app.get('/api/projects', async (req, res) => {
  if (db) {
    try {
      const [rows] = await db.query('SELECT * FROM projects ORDER BY date_created DESC');
      res.json({ status: 'success', data: rows });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    res.json({ status: 'success', data: mockProjects });
  }
});

app.post('/api/projects', async (req, res) => {
  const p = req.body;
  if (db) {
    try {
      const [result] = await db.query('INSERT INTO projects (title, description, division, image, client, location, year, impact) VALUES (?,?,?,?,?,?,?,?)', [p.title, p.description, p.division, p.image, p.client, p.location, p.year, p.impact]);
      res.json({ status: 'success', id: result.insertId });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    const newProject = { id: Date.now(), ...p, date_created: new Date().toISOString() };
    mockProjects.unshift(newProject);
    res.json({ status: 'success', id: newProject.id });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  if (db) {
    try {
      await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    mockProjects = mockProjects.filter(x => x.id !== parseInt(req.params.id));
    res.json({ status: 'success' });
  }
});

// API Routes - Blog
app.get('/api/blog', async (req, res) => {
  if (db) {
    try {
      const [rows] = await db.query('SELECT * FROM blog ORDER BY date_created DESC');
      res.json({ status: 'success', data: rows });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    res.json({ status: 'success', data: mockBlog });
  }
});

app.post('/api/blog', async (req, res) => {
  const p = req.body;
  if (db) {
    try {
      const [result] = await db.query('INSERT INTO blog (title, excerpt, content, category, read_time, image) VALUES (?,?,?,?,?,?)', [p.title, p.excerpt, p.content, p.category, p.read_time, p.image]);
      res.json({ status: 'success', id: result.insertId });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    const newPost = { id: Date.now(), ...p, date_created: new Date().toISOString() };
    mockBlog.unshift(newPost);
    res.json({ status: 'success', id: newPost.id });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  if (db) {
    try {
      await db.query('DELETE FROM blog WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    mockBlog = mockBlog.filter(x => x.id !== parseInt(req.params.id));
    res.json({ status: 'success' });
  }
});

// API Routes - Contacts
app.get('/api/contacts', async (req, res) => {
  if (db) {
    try {
      const [rows] = await db.query('SELECT * FROM contacts ORDER BY date_sent DESC');
      res.json({ status: 'success', data: rows });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    res.json({ status: 'success', data: mockContacts });
  }
});

app.post('/api/contacts', async (req, res) => {
  const p = req.body;
  if (db) {
    try {
      const [result] = await db.query('INSERT INTO contacts (name, email, subject, message) VALUES (?,?,?,?)', [p.name, p.email, p.subject, p.message]);
      res.json({ status: 'success', id: result.insertId });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    const newContact = { id: Date.now(), ...p, date_sent: new Date().toISOString(), is_read: 0 };
    mockContacts.unshift(newContact);
    res.json({ status: 'success', id: newContact.id });
  }
});

app.put('/api/contacts/:id/read', async (req, res) => {
  if (db) {
    try {
      await db.query('UPDATE contacts SET is_read = 1 WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    const c = mockContacts.find(x => x.id === parseInt(req.params.id));
    if (c) c.is_read = 1;
    res.json({ status: 'success' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  if (db) {
    try {
      await db.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    mockContacts = mockContacts.filter(x => x.id !== parseInt(req.params.id));
    res.json({ status: 'success' });
  }
});

// API Routes - Events
app.get('/api/events', async (req, res) => {
  if (db) {
    try {
      const [rows] = await db.query('SELECT * FROM events ORDER BY date_event DESC');
      res.json({ status: 'success', data: rows });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    res.json({ status: 'success', data: mockEvents.sort((a,b) => new Date(b.date_event) - new Date(a.date_event)) });
  }
});

app.get('/api/events/upcoming', async (req, res) => {
  if (db) {
    try {
      const [rows] = await db.query('SELECT * FROM events WHERE is_past = 0 ORDER BY date_event ASC');
      res.json({ status: 'success', data: rows });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    res.json({ status: 'success', data: mockEvents.filter(x => !x.is_past).sort((a,b) => new Date(a.date_event) - new Date(b.date_event)) });
  }
});

app.get('/api/events/past', async (req, res) => {
  if (db) {
    try {
      const [rows] = await db.query('SELECT * FROM events WHERE is_past = 1 ORDER BY date_event DESC');
      res.json({ status: 'success', data: rows });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    res.json({ status: 'success', data: mockEvents.filter(x => x.is_past).sort((a,b) => new Date(b.date_event) - new Date(a.date_event)) });
  }
});

app.post('/api/events', async (req, res) => {
  const p = req.body;
  if (db) {
    try {
      const [result] = await db.query('INSERT INTO events (title, description, date_event, location, division, image, type, is_featured, is_past) VALUES (?,?,?,?,?,?,?,?,?)', 
        [p.title, p.description, p.date_event, p.location, p.division, p.image, p.type, p.is_featured?1:0, p.is_past?1:0]);
      res.json({ status: 'success', id: result.insertId });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    const newEvent = { id: Date.now(), ...p, date_created: new Date().toISOString() };
    mockEvents.unshift(newEvent);
    res.json({ status: 'success', id: newEvent.id });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  if (db) {
    try {
      await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
  } else {
    mockEvents = mockEvents.filter(x => x.id !== parseInt(req.params.id));
    res.json({ status: 'success' });
  }
});

// Fallback all routes to index.html for SPA-like behavior if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
