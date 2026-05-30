const API_BASE = 'http://localhost:3000/api';

// Navigation
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.admin-tab').forEach(t => {
      t.classList.remove('active', 'bg-white/10', 'text-gold', 'border-r-4', 'border-gold');
      t.classList.add('hover:bg-white/5');
    });
    tab.classList.add('active', 'bg-white/10', 'text-gold', 'border-r-4', 'border-gold');
    tab.classList.remove('hover:bg-white/5');

    const target = tab.getAttribute('data-target');
    document.querySelectorAll('.admin-view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`view-${target}`).classList.remove('hidden');

    document.getElementById('page-title').textContent = tab.textContent.trim();
  });
});

// Modals
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// Fetch Data
async function fetchDashboard() {
  try {
    const [pRes, eRes, bRes, cRes] = await Promise.all([
      fetch(`${API_BASE}/projects`), fetch(`${API_BASE}/events`),
      fetch(`${API_BASE}/blog`), fetch(`${API_BASE}/contacts`)
    ]);
    const p = await pRes.json(), e = await eRes.json(), b = await bRes.json(), c = await cRes.json();
    
    document.getElementById('dash-count-projects').textContent = p.data.length;
    document.getElementById('dash-count-events').textContent = e.data.length;
    document.getElementById('dash-count-blog').textContent = b.data.length;
    document.getElementById('dash-count-contacts').textContent = c.data.length;

    renderProjects(p.data);
    renderEvents(e.data);
    renderContacts(c.data);
    // Blog rendering would go here
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
  }
}

// Renderers
function renderProjects(data) {
  const tbody = document.getElementById('table-projects');
  tbody.innerHTML = data.map(p => `
    <tr class="hover:bg-gray-50">
      <td class="p-4 text-gray-500">#${p.id}</td>
      <td class="p-4 font-medium">${p.title}</td>
      <td class="p-4"><span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs uppercase">${p.division}</span></td>
      <td class="p-4">${p.client}</td>
      <td class="p-4 text-right">
        <button onclick="deleteEntity('projects', ${p.id})" class="text-red-500 hover:text-red-700 p-2"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderEvents(data) {
  const tbody = document.getElementById('table-events');
  tbody.innerHTML = data.map(e => `
    <tr class="hover:bg-gray-50">
      <td class="p-4 font-medium">${e.title}</td>
      <td class="p-4">${new Date(e.date_event).toLocaleDateString()}</td>
      <td class="p-4"><span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs uppercase">${e.type}</span></td>
      <td class="p-4">${e.is_past ? '<span class="text-gray-400 text-xs">Passé</span>' : '<span class="text-green-600 font-bold text-xs">À venir</span>'}</td>
      <td class="p-4 text-right">
        <button onclick="deleteEntity('events', ${e.id})" class="text-red-500 hover:text-red-700 p-2"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function renderContacts(data) {
  const tbody = document.getElementById('table-contacts');
  tbody.innerHTML = data.map(c => `
    <tr class="hover:bg-gray-50 ${c.is_read ? 'opacity-60' : 'font-bold'}">
      <td class="p-4">
        ${c.is_read ? '<span class="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>' : '<span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>'}
      </td>
      <td class="p-4">${c.name}</td>
      <td class="p-4">${c.subject}</td>
      <td class="p-4 text-sm text-gray-500">${new Date(c.date_sent).toLocaleDateString()}</td>
      <td class="p-4 text-right">
        ${!c.is_read ? `<button onclick="markAsRead(${c.id})" class="text-blue-500 hover:text-blue-700 p-2" title="Marquer comme lu"><i data-lucide="check" class="w-4 h-4"></i></button>` : ''}
        <button onclick="deleteEntity('contacts', ${c.id})" class="text-red-500 hover:text-red-700 p-2"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

// Actions
async function deleteEntity(type, id) {
  if(confirm('Supprimer cet élément ?')) {
    await fetch(`${API_BASE}/${type}/${id}`, { method: 'DELETE' });
    fetchDashboard();
  }
}

async function markAsRead(id) {
  await fetch(`${API_BASE}/contacts/${id}/read`, { method: 'PUT' });
  fetchDashboard();
}

// Forms
document.getElementById('form-project').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    title: document.getElementById('p-title').value,
    division: document.getElementById('p-division').value,
    client: document.getElementById('p-client').value,
    location: document.getElementById('p-location').value,
    year: document.getElementById('p-year').value,
    image: document.getElementById('p-image').value,
    description: document.getElementById('p-desc').value,
    impact: document.getElementById('p-impact').value
  };
  await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  closeModal('modal-project');
  e.target.reset();
  fetchDashboard();
});

document.getElementById('form-event').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    title: document.getElementById('e-title').value,
    date_event: document.getElementById('e-date').value,
    type: document.getElementById('e-type').value,
    location: document.getElementById('e-location').value,
    division: document.getElementById('e-division').value,
    image: document.getElementById('e-image').value,
    description: document.getElementById('e-desc').value,
    is_featured: document.getElementById('e-featured').checked,
    is_past: document.getElementById('e-past').checked
  };
  await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  closeModal('modal-event');
  e.target.reset();
  fetchDashboard();
});

// Init
lucide.createIcons();
fetchDashboard();
