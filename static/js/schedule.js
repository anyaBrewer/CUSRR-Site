function formatTimeRange(startStr, endStr) {
  const start = new Date(startStr);
  const end   = new Date(endStr);
  const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
  return `${start.toLocaleTimeString(undefined, opts)}–${end.toLocaleTimeString(undefined, opts)}`;
}

function truncate(text, maxLen = 200) {
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + '…';
}

function formatPresenterName(p) {
  if (!p) return '';
  const first = p.firstname || p.first_name || p.first || '';
  const last  = p.lastname  || p.last_name  || p.last  || '';
  if (first || last) return `${first} ${last}`.trim();
  if (p.name) return p.name;
  if (p.email) return p.email;
  return '';
}


// -----------------------------
// Fetch Data
// -----------------------------
async function fetchDays() {
  const res = await fetch('/api/v1/block-schedule/days');
  return await res.json();
}

async function fetchScheduleByDay(day) {
  const res = await fetch(`/api/v1/block-schedule/day/${day}`);
  return await res.json();
}

async function get_presentations_by_day(day) {
  const res = await fetch(`/api/v1/presentations/day/${day}`);
  return await res.json();
}

// -----------------------------
// Render Overview Blocks (Top Section)
// -----------------------------
function renderOverview(sessions, overviewContainer) {
  overviewContainer.innerHTML = '';

  sessions.forEach((session, index) => {
    const html = `
      <div class="col-12 col-md-6">
        <a href="#session-${session.id}" 
           class="card shadow-xs border-0 rounded-4 text-center p-3 text-decoration-none text-dark move-on-hover">
          <h6 class="mb-1 fw-bold">${session.title}</h6>
          <p class="text-sm text-secondary mb-0">${formatTimeRange(session.startTime, session.endTime)}</p>
        </a>
      </div>
    `;
    overviewContainer.insertAdjacentHTML('beforeend', html);
  });
}

// -----------------------------
// Render Full Details (Bottom Section)
// -----------------------------
function renderDetails(sessions, detailsContainer, presentations) {
  detailsContainer.innerHTML = '';

  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];

    // start section and include session metadata
    let html = `
      <section id="session-${session.id}" class="card shadow-xs border-0 rounded-4 p-3 mb-3">
        <h5 class="fw-bold mb-1">${session.title}</h5>
        <p class="text-secondary mb-1">${formatTimeRange(session.startTime, session.endTime)}</p>
        ${session.location ? `<p class="text-secondary mb-1">${session.location}</p>` : ""}
        ${session.description ? `<p class="small mb-0">${session.description}</p>` : ""}
    `;

    // find presentations that belong to this session/block
    let session_presentations = [];
    if (presentations && Array.isArray(presentations)) {
      const match = presentations.find(item => item.block && item.block.id === session.id);
      if (match && Array.isArray(match.presentations)) {
        session_presentations = match.presentations;
      }
    }

    // if there are presentations, render them inside the session card in a row (3 per row using col-lg-4)
    if (session_presentations.length > 0) {
      html += `<div class="row gx-3 gy-3 mt-3">`;
     

      session_presentations.forEach((presentation, j) => {
        const col = `
             <div class="col-12 col-md-6 col-lg-4">
        <div class="card border-0 shadow-xs rounded-4 h-100 p-3" id="poster-${session.id}-${j}">
          <h6 class="fw-bold mb-1">${presentation.title}</h6>
          <p class="text-sm text-secondary mb-1">${(presentation.presenters || []).map(formatPresenterName).filter(Boolean).join(", ")}</p>
          <p class="text-sm mb-0">${presentation.abstract ? truncate(presentation.abstract, 75) : ""}</p>
        </div>
      </div>
        `;
        html += col;
      });

      html += `</div>`; // close row
    }

    html += `</section>`; // close section
    detailsContainer.insertAdjacentHTML('beforeend', html);
  }
}

// -----------------------------
// Main UI Init
// -----------------------------
async function initializeScheduleUI() {
  const daySelect = document.getElementById('day-select');
  const overview = document.getElementById('schedule-overview');
  const details = document.getElementById('schedule-details');

  const days = await fetchDays();

  // Populate day selector
  daySelect.innerHTML = '';
  days.forEach(day => {
    const opt = document.createElement('option');
    opt.value = day;
    opt.textContent = day;
    daySelect.appendChild(opt);
  });

  // Auto-load first day
  if (days.length > 0) {
    loadForDay(days[0], overview, details);
  }

  // On day change
  daySelect.addEventListener('change', () => {
    loadForDay(daySelect.value, overview, details);
  });
}

// -----------------------------
// Load & Render Both Sections
// -----------------------------
async function loadForDay(day, overview, details) {
  const sessions = await fetchScheduleByDay(day);
  const presentations = await get_presentations_by_day(day);
  renderOverview(sessions, overview);
  renderDetails(sessions, details, presentations);
}

// -----------------------------
// Run when DOM is ready
// -----------------------------
document.addEventListener('DOMContentLoaded', initializeScheduleUI);
