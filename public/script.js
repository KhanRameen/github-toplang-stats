const baseUrl = '/api/stats';
let currentUrl = '';
let debounceTimer = null;
let checkTimer = null;
let selectedTheme = '';

/* ── Theme toggle ── */
function toggleTheme() {
  const isDark = document.getElementById('theme-toggle').checked;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
  document.getElementById('theme-lbl').textContent = isDark ? 'dark' : 'light';
}

/* ── Swatch selection ── */

async function initThemes() {
  try {
    const res = await fetch('/api/themes');
    const themesResponse= await res.json();
    buildThemeDropdown(themesResponse.data);
  } catch {
    buildThemeDropdown({}); // fallback to default-only if fetch fails
  }
}

function buildThemeDropdown(themes) {
  const container = document.getElementById('theme-select-container');

  const selected = document.createElement('div');
  selected.className = 'theme-selected';
  selected.id = 'theme-selected';
  selected.innerHTML = `
    <span class="theme-option-name">github default</span>
    <span class="theme-option-dots" id="selected-dots"></span>
    <span class="theme-chevron">▾</span>
  `;

  const list = document.createElement('div');
  list.className = 'theme-list';
  list.id = 'theme-list';

  // Default option
  const defaultOpt = document.createElement('div');
  defaultOpt.className = 'theme-option active';
  defaultOpt.dataset.value = '';
  defaultOpt.innerHTML = `<span class="theme-option-name">github default</span><span class="theme-option-dots"></span>`;
  list.appendChild(defaultOpt);

  // All theme options
  for (const [name, colors] of Object.entries(themes)){
    const opt = document.createElement('div');
    opt.className = 'theme-option';
    opt.dataset.value = name;
    const dots = colors.slice(0, 5).map(c =>
      `<span class="dot" style="background:${c.trim()}"></span>`
    ).join('');
    opt.innerHTML = `<span class="theme-option-name">${name}</span><span class="theme-option-dots">${dots}</span>`;
    list.appendChild(opt);
  }

  container.appendChild(selected);
  container.appendChild(list);

  // Toggle open/close
  selected.addEventListener('click', () => {
    list.classList.toggle('open');
    selected.classList.toggle('open');
  });

  // Select a theme
  list.addEventListener('click', e => {
    const opt = e.target.closest('.theme-option');
    if (!opt) return;
    list.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    selectedTheme = opt.dataset.value;
    document.querySelector('#theme-selected .theme-option-name').textContent = opt.querySelector('.theme-option-name').textContent;
    document.getElementById('selected-dots').innerHTML = opt.querySelector('.theme-option-dots').innerHTML;
    list.classList.remove('open');
    selected.classList.remove('open');
    update();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!container.contains(e.target)) {
      list.classList.remove('open');
      selected.classList.remove('open');
    }
  });
}



/* ── Account check ── */
function setStatus(state, text) {
  const badge = document.getElementById('status-badge');
  const txt = document.getElementById('status-text');
  badge.className = 'status-badge ' + state;
  txt.textContent = text;
}

async function checkUser(username) {
  setStatus('checking', 'checking account…');
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (res.ok) {
      const data = await res.json();
      setStatus('valid', `${data.public_repos} public repos`);
      return true;
    } else {
      setStatus('invalid', 'account not found');
      return false;
    }
  } catch {
    setStatus('checking', 'could not verify');
    return true; // allow preview anyway
  }
}

/* ── Update preview ── */
async function update() {
  const username = document.getElementById('username').value.trim();
  const hide = document.getElementById('hide').value.trim();

  if (!username) {
    setStatus('hidden', '');
    resetPreview();
    return;
  }

  clearTimeout(checkTimer);
  checkTimer = setTimeout(() => checkUser(username), 600);

  let url = `${baseUrl}?username=${encodeURIComponent(username)}`;
  if (selectedTheme) url += `&theme=${encodeURIComponent(selectedTheme)}`;
  if (hide) url += `&hide=${encodeURIComponent(hide)}`;

  currentUrl = url;
  updateReadmeCode(url);

  const area = document.getElementById('preview-area');
  const img = document.getElementById('preview');
  const ph = document.getElementById('placeholder');

  area.classList.add('loading');
  img.style.display = 'none';
  ph.style.display = 'none';

  img.onload = () => {
    area.classList.remove('loading');
    img.style.display = 'block';
  };
  img.onerror = () => {
    area.classList.remove('loading');
    ph.style.display = '';
  };
  img.src = url;
}

function resetPreview() {
  currentUrl = '';
  const img = document.getElementById('preview');
  img.style.display = 'none';
  img.src = '';
  document.getElementById('placeholder').style.display = '';
  document.getElementById('preview-area').classList.remove('loading');
  document.getElementById('readme-block').style.display = 'none';
}

function updateReadmeCode(url) {
  const full = `${window.location.origin}${url}`;
  document.getElementById('readme-code').textContent = `<img src="${full}" />`;
}

/* ── Copy helpers ── */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function copyMarkdown() {
  if (!currentUrl) return toast('enter a username first');
  const md = `<img src="${window.location.origin}${currentUrl}" />`;
  navigator.clipboard.writeText(md).then(() => toast('markdown copied ✓'));
}


function copyUrl() {
  if (!currentUrl) return toast('enter a username first');
  navigator.clipboard.writeText(`${window.location.origin}${currentUrl}`)
    .then(() => toast('url copied ✓'));
}

function showReadme() {
  if (!currentUrl) return toast('enter a username first');
  const block = document.getElementById('readme-block');
  block.style.display = block.style.display === 'none' ? '' : 'none';
}

function copyReadme() {
  const code = document.getElementById('readme-code').textContent;
  navigator.clipboard.writeText(code).then(() => toast('copied ✓'));
}

/* ── Event listeners ── */
document.getElementById('username').addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(update, 420);
});

document.getElementById('hide').addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(update, 420);
});

initThemes()
