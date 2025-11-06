    const toggle = () => {
      document.body.classList.toggle('sidebar-mini');
      const expanded = !document.body.classList.contains('sidebar-mini');
      document.getElementById('toggleSidebar').setAttribute('aria-expanded', expanded);
    };
    document.getElementById('toggleSidebar').addEventListener('click', toggle);

    // Optional: keyboard shortcut (Ctrl/Cmd + \)
    window.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === '\\') {
        e.preventDefault(); toggle();
      }
    });

// --- Auth UI updater: fetch /me and populate the sidebar auth area -------------
(async function(){
  async function updateAuthUI(){
    try {
      const resp = await fetch('/me', { credentials: 'same-origin' });
      const loginBtn = document.getElementById('login-btn');
      const logoutBtn = document.getElementById('logout-btn');
      const userName = document.getElementById('user-name');
      const userPic = document.getElementById('user-pic');

      if (!resp.ok) {
        if (loginBtn) loginBtn.style.display = '';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userName) userName.textContent = '';
        if (userPic) { userPic.style.display = 'none'; userPic.src = ''; }
        return;
      }

      const data = await resp.json();
      if (data && data.authenticated) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = '';
        if (userName) userName.textContent = data.name || data.email || '';
        if (userPic) {
          if (data.picture) { userPic.src = data.picture; userPic.style.display = ''; }
          else { userPic.style.display = 'none'; userPic.src = ''; }
        }
      } else {
        if (loginBtn) loginBtn.style.display = '';
        if (logoutBtn) logoutBtn.style.display = 'none';
      }
    } catch (e) {
      console.error('sidebar auth helper error', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
  } else {
    updateAuthUI();
  }

})();