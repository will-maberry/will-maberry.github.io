if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. SYSTEM INITIALIZATION
  window.scrollTo(0, 0);

  // 2. SYSTEM DATE INJECTION
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    dateEl.textContent = `${yyyy}.${mm}.${dd}`;
  }

  // 3. SYSTEM STATUS PULSE
  const status = document.getElementById('sys-status');
  const logs = [
    "INGESTING_DATA", "BUILDING_FORECAST", 
    "CALIBRATING_THRESHOLDS", "PIPELINE_ACTIVE", "SYSTEM_READY"
  ];
  if (status) {
    let i = 0;
    setInterval(() => {
      status.innerText = logs[i];
      i = (i + 1) % logs.length;
    }, 4000);
  }

  // 4. THEME ARBITER (Dark/Light)
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const getSystemTheme = () => (prefersDark.matches ? 'dark' : 'light');
  const updateToggleLabel = () => {
    if (!themeToggle) return;
    const current = document.documentElement.getAttribute('data-theme') || getSystemTheme();
    themeToggle.textContent = current.toUpperCase();
  };

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', storedTheme);
  }
  updateToggleLabel();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || getSystemTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggleLabel();
    });
  }

  prefersDark.addEventListener('change', () => {
    if (!localStorage.getItem('theme')) updateToggleLabel();
  });

  // 5. REDACTION TOGGLE
  const redactions = document.querySelectorAll('.redaction');
  redactions.forEach((redaction) => {
    redaction.addEventListener('click', (e) => {
      e.preventDefault();
      redaction.classList.toggle('is-open');
    });
  });

  // 6. JITTER ENGINE
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const jitterTargets = document.querySelectorAll('.jitter');
  if (!prefersReducedMotion) {
    jitterTargets.forEach((el) => {
      const x = (Math.random() * 10 - 5).toFixed(2);
      const y = (Math.random() * 10 - 5).toFixed(2);
      el.style.translate = `${x}px ${y}px`;
      el.animate(
        [
          { translate: `${x}px ${y}px` },
          { translate: `${(Math.random() * 10 - 5).toFixed(2)}px ${(Math.random() * 10 - 5).toFixed(2)}px` },
          { translate: `${x}px ${y}px` }
        ],
        {
          duration: 5000 + Math.random() * 5000,
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      );
    });
  }

  // 7. SMART TOOLTIP EDGE DETECTION
  const strikes = document.querySelectorAll('.highlight');
  const edgeThreshold = 130; 
  strikes.forEach(strike => {
    strike.addEventListener('mouseenter', function() {
      this.classList.remove('edge-left', 'edge-right');
      const rect = this.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      if (rect.left < edgeThreshold) {
        this.classList.add('edge-left');
      } else if (viewportWidth - rect.right < edgeThreshold) {
        this.classList.add('edge-right');
      }
    });
  });

  // 8. FRAGMENT STAGGER ENGINE (Fade-Up Entry)
  const fragments = document.querySelectorAll('.grid .fragment');
  fragments.forEach((fragment, index) => {
    const delay = index * 120; 
    fragment.style.animationDelay = `${delay}ms`;
    
    requestAnimationFrame(() => {
      fragment.classList.add('is-visible');
    });
  });
});
