let userTable; // store DataTable instance

async function loadUsers() {
  const container = document.getElementById('user-container');
  if (!container) {
    console.error('User container not found!');
    return;
  }

  try {
    const response = await fetch('/api/v1/users/');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const users = await response.json();
    allUsers = users; // keep for reference (optional)

    renderTable(users);

  } catch (err) {
    console.error('Failed to load users', err);
    container.innerHTML = '<p class="text-danger">Could not load users.</p>';
  }
}

function renderTable(users) {
  const container = document.getElementById('user-container');
  if (!container) return;

  // Clear any previous content
  container.innerHTML = `
    <table id="user-table" class="table table-hover table-bordered align-middle mb-0" style="width:100%">
      <thead class="table table-striped align-middle">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Activity</th>
          <th>Pres. ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  // Destroy previous DataTable instance if it exists
  if (userTable) {
    userTable.destroy();
  }

  // Initialize DataTable
  userTable = new DataTable('#user-table', {
    data: users,
    columns: [
      { data: null, render: (data, type, row, meta) => meta.row + 1 }, // index
      { data: 'name', defaultContent: '—' },
      { data: 'email', defaultContent: '—' },
      { data: 'activity', defaultContent: '—' },
      { data: 'presentation_id', defaultContent: '—' },
      { data: 'status', defaultContent: '—' },
      {
        data: 'id',
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          return `
            <div class="dropdown">
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Options
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" onclick="viewPresentation(${data})">View Presentation</a></li>
                <li><a class="dropdown-item" onclick="editUser(${data})">Edit</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" onclick="removeUser(${data})">Delete</a></li>
              </ul>
            </div>
          `;
        }
      }
    ],
    responsive: true,
    pageLength: 10,
    order: [[1, 'asc']], // default sort by Name
  });
}

removeUser = async function(userId) {
  if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    return;
  }

  try {
    const response = await fetch(`/api/v1/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    await loadUsers(); // Refresh the user list
  
  } catch (err) {
    console.error('Failed to delete user', err);
    alert('Could not delete user.');
  }
}

// Initialize after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
});
