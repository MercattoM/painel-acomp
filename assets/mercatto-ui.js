(() => {
  const path = window.location.pathname.toLowerCase();
  const page = path.includes('/cpc/') ? 'cpc' : path.includes('/rcs/') ? 'rcs' : 'home';
  const prefix = page === 'home' ? '' : '../';
  const currentTheme = () => document.documentElement.dataset.theme || 'light';

  document.body.dataset.page = page;

  const links = [
    { id: 'home', label: 'Central', href: `${prefix}index.html`, icon: '<path d="m3 9 9-7 9 7v11a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1Z"/>' },
    { id: 'cpc', label: 'Painel CPC', href: `${prefix}cpc/index.html`, icon: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 14h3v4H7zm7-7h3v11h-3zM7 7h3v4H7z"/>' },
    { id: 'rcs', label: 'Painel RCS', href: `${prefix}rcs/index.html`, icon: '<path d="M4 19V5m0 14h16"/><path d="m7 15 4-5 3 3 5-7"/>' }
  ];

  const sidebar = document.createElement('aside');
  sidebar.className = 'mer-side';
  sidebar.innerHTML = `
    <a class="mer-brand" href="${prefix}index.html" aria-label="Central Mercatto — início">
      <img src="${prefix}assets/mercatto-oficial.jpg" alt="Mercatto — Sempre conectada a você">
    </a>
    <div class="mer-nav-caption">Navegação</div>
    <nav class="mer-links" aria-label="Navegação entre painéis">
      ${links.map(item => `<a class="mer-link" href="${item.href}" title="${item.label}" aria-label="${item.label}"${item.id === page ? ' aria-current="page"' : ''}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item.icon}</svg>
        <span>${item.label}</span>
      </a>`).join('')}
    </nav>
    <div class="mer-side-bottom">
      <button class="mer-theme" type="button" aria-pressed="false">
        <svg class="mer-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>
        <span class="mer-theme-label"></span>
      </button>
      <div class="mer-side-note">Mercatto · Sempre conectada a você</div>
    </div>`;

  const layout = document.createElement('div');
  layout.className = 'mer-layout';
  const content = document.createElement('div');
  content.className = 'mer-content';
  while (document.body.firstChild) content.appendChild(document.body.firstChild);
  layout.append(sidebar, content);
  document.body.appendChild(layout);

  const button = sidebar.querySelector('.mer-theme');
  const icon = sidebar.querySelector('.mer-theme-icon');
  const label = sidebar.querySelector('.mer-theme-label');
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
