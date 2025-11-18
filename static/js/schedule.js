function formatTimeRange(startStr, endStr) {
  const start = new Date(startStr);
  const end   = new Date(endStr);
  const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
  return `${start.toLocaleTimeString(undefined, opts)}–${end.toLocaleTimeString(undefined, opts)}`;
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
function renderDetails(sessions, detailsContainer) {
  detailsContainer.innerHTML = '';

  sessions.forEach(session => {
    const html = `
      <section id="session-${session.id}" class="card shadow-xs border-0 rounded-4 p-3">
        <h5 class="fw-bold mb-1">${session.title}</h5>
        <p class="text-secondary mb-1">${formatTimeRange(session.startTime, session.endTime)}</p>
        ${session.location ? `<p class="text-secondary mb-1">${session.location}</p>` : ""}
        ${session.description ? `<p class="small mb-0">${session.description}</p>` : ""}
      </section>
    `;
    detailsContainer.insertAdjacentHTML('beforeend', html);
  });
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
  renderOverview(sessions, overview);
  renderDetails(sessions, details);
}

// -----------------------------
// Run when DOM is ready
// -----------------------------
document.addEventListener('DOMContentLoaded', initializeScheduleUI);
