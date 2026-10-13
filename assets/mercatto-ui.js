(() => {
  const path = window.location.pathname.toLowerCase();
  const page = path.includes('/cpc/') ? 'cpc' : path.includes('/rcs/') ? 'rcs' : 'home';
  const currentTheme = () => document.documentElement.dataset.theme || 'light';

  document.body.dataset.page = page;

  const button = document.createElement('button');
  button.className = 'mer-theme';
  button.type = 'button';
  button.innerHTML = `
    <svg class="mer-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>
    <span class="mer-theme-label"></span>`;

  const placement = page === 'home'
    ? document.querySelector('.topbar')
    : page === 'cpc'
      ? document.querySelector('.side')
      : document.querySelector('.top');
  if (!placement) return;
  placement.appendChild(button);

  const icon = button.querySelector('.mer-theme-icon');
  const label = button.querySelector('.mer-theme-label');
  const updateThemeButton = () => {
    const dark = currentTheme() === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    button.title = dark ? 'Ativar tema claro' : 'Ativar tema escuro';
    label.textContent = dark ? 'Tema claro' : 'Tema escuro';
    icon.innerHTML = dark
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>'
      : '<path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z"/>';
  };

  updateThemeButton();
  button.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('mercatto-theme', next); } catch (_) { /* Preferência opcional. */ }
    updateThemeButton();
  });
})();
