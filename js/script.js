/**
 * Stackly Magazine & Magazine - Core UI Scripts
 * Theme, Sidebar (flat + accordion), Tilt, GSAP, Ripple, Lazy Loading
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initFloatingLabels();
  initRippleButtons();
  initTilt();
  initPageAnimations();
  initLazyImages();
  initMobileMenu();
  initAosSupport();
});

/* Theme toggle removed */

/* ─── Sidebar (handles BOTH flat links and accordion sublinks) ─── */
function initSidebar() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const toggleBtn = document.querySelector('.sidebar-toggle');

  if (!sidebar) return;

  // ── Mobile toggle ──
  toggleBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay?.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  });

  overlay?.addEventListener('click', closeSidebar);

  // ── Close button (mobile only) ──
  const closeBtn = sidebar.querySelector('.sidebar-close');
  closeBtn?.addEventListener('click', closeSidebar);

  // ── Accordion: parent links expand/collapse submenu (admin dashboard) ──
  document.querySelectorAll('.sidebar-link.parent').forEach((parentLink) => {
    parentLink.addEventListener('click', (e) => {
      e.preventDefault();
      const group = parentLink.closest('.sidebar-group');
      if (!group) return;
      const isOpen = group.classList.contains('open');
      document.querySelectorAll('.sidebar-group').forEach((g) => {
        if (g !== group) g.classList.remove('open');
      });
      group.classList.toggle('open', !isOpen);
    });
  });

  // ── Sub-links navigate sections (admin dashboard) ──
  document.querySelectorAll('.sidebar-sublink[data-section]').forEach((subLink) => {
    subLink.addEventListener('click', (e) => {
      e.preventDefault();
      const section = subLink.dataset.section;
      document.querySelectorAll('.sidebar-link.parent').forEach((l) => l.classList.remove('active'));
      document.querySelectorAll('.sidebar-sublink').forEach((l) => l.classList.remove('active'));
      document.querySelectorAll('.sidebar-link:not(.parent)').forEach((l) => l.classList.remove('active'));
      subLink.classList.add('active');
      const parentLink = subLink.closest('.sidebar-group')?.querySelector('.sidebar-link.parent');
      if (parentLink) parentLink.classList.add('active');
      switchSection(section);
    });
  });

  // ── Flat sidebar links (customer dashboard — no accordion) ──
  document.querySelectorAll('.sidebar-link[data-section]:not(.parent)').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      document.querySelectorAll('.sidebar-link').forEach((l) => l.classList.remove('active'));
      document.querySelectorAll('.sidebar-sublink').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      switchSection(section);
    });
  });

  // ── Logout ──
  const logoutBtn = document.querySelector('.sidebar-logout');
  logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    Auth.logout();
  });
}

/* Helper: switch the visible dashboard section */
function switchSection(section) {
  // Always scroll the main container and window back to the top
  const mainContent = document.querySelector('.dashboard-main');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
  window.scrollTo(0, 0);

  document.querySelectorAll('.dashboard-section').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `section-${section}`);
  });

  if (window.innerWidth <= 1024) closeSidebar();

  setTimeout(() => {
    if (typeof Dashboard !== 'undefined') Dashboard.resizeCharts?.();
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    } else if (typeof gsap !== 'undefined') {
      gsap.killTweensOf(`#section-${section} .section-panel-inner > *`);
      gsap.fromTo(`#section-${section} .section-panel-inner > *`, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out'
      });
    }
  }, 150);
}

function closeSidebar() {
  document.querySelector('.dashboard-sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-overlay')?.classList.remove('active');
  document.body.classList.remove('sidebar-open');
}

function initMobileMenu() {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeSidebar();
  });
}

/* ─── Floating Labels ─── */
function initFloatingLabels() {
  document.querySelectorAll('.input-group input, .input-group select, .input-group textarea').forEach((input) => {
    const update = () => {
      const group = input.closest('.input-group');
      if (!group) return;
      group.classList.toggle('has-value', input.value.trim() !== '' || input === document.activeElement);
    };
    input.addEventListener('focus', update);
    input.addEventListener('blur', update);
    input.addEventListener('input', update);
    input.addEventListener('change', update);
    update();
  });
}

/* ─── Ripple Effect ─── */
function initRippleButtons() {
  document.querySelectorAll('.btn-ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ─── Vanilla Tilt ─── */
function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.15,
    scale: 1.02
  });
}

/* ─── GSAP Page Animations ─── */
function initPageAnimations() {
  if (typeof gsap === 'undefined') return;

  // Only run on auth pages
  if (document.querySelector('.auth-page')) {
    // Main elements (auth-left-content and auth-card) are animated by AOS
    // We only animate the decorative floating elements (ambient orbs and shape blobs) with GSAP
    gsap.killTweensOf('.shape-blob');
    
    if(false) gsap.fromTo('.floating-food', { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.6,
      stagger: 0.1, ease: 'back.out(1.7)', delay: 0.8
    });
    gsap.to('.shape-blob', {
      x: 'random(-20, 20)', y: 'random(-20, 20)',
      duration: 'random(4, 8)', repeat: -1, yoyo: true,
      ease: 'sine.inOut', stagger: 0.5
    });
  }
}

function animateDashboardEntrance() {
  if (typeof gsap === 'undefined') return;

  // If AOS is loaded, it will handle the cards and content panels.
  // We only animate the sidebar and navbar with GSAP.
  if (typeof AOS !== 'undefined') {
    gsap.killTweensOf('.dashboard-sidebar, .dashboard-navbar');
    gsap.fromTo('.dashboard-sidebar', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    gsap.fromTo('.dashboard-navbar', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
  } else {
    // Fallback if AOS is not available: animate everything with GSAP
    gsap.killTweensOf('.dashboard-sidebar, .dashboard-navbar, .stat-card, .chart-card, .table-card, .content-section');
    gsap.fromTo('.dashboard-sidebar', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    gsap.fromTo('.dashboard-navbar', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
    gsap.fromTo('.stat-card', { opacity: 0 }, {
      opacity: 1, duration: 0.5,
      stagger: 0.08, ease: 'power3.out', delay: 0.2
    });
    gsap.fromTo('.chart-card, .table-card, .content-section', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6,
      stagger: 0.06, ease: 'power3.out', delay: 0.4
    });
  }
}

function animateCounter(el, target, duration = 2) {
  if (typeof gsap === 'undefined') {
    el.textContent = target;
    return;
  }
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      const isCurrency = el.dataset.currency === 'true';
      const isDecimal = el.dataset.decimal === 'true';
      if (isCurrency) {
        el.textContent = '$' + Math.floor(obj.val).toLocaleString();
      } else if (isDecimal) {
        el.textContent = obj.val.toFixed(1);
      } else {
        el.textContent = Math.floor(obj.val).toLocaleString();
      }
    }
  });
}

/* ─── Lazy Loading ─── */
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    images.forEach((img) => observer.observe(img));
  }
}

/* ─── Toast Notifications ─── */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-notification');
  existing?.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
  document.body.appendChild(toast);

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(toast, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    setTimeout(() => {
      gsap.to(toast, {
        y: 50, opacity: 0, duration: 0.3,
        onComplete: () => toast.remove()
      });
    }, 3500);
  } else {
    setTimeout(() => toast.remove(), 3500);
  }
}

function setInputState(group, state, message) {
  group.classList.remove('input-success', 'input-error');
  const msgEl = group.querySelector('.input-message');
  if (state) group.classList.add(`input-${state}`);
  if (msgEl) msgEl.textContent = message || '';
}

/* ─── AOS Support & Dynamic Card Anim Injection ─── */
function initAosSupport() {
  if (typeof AOS === 'undefined') return;

  // If we are on a dashboard, inject the AOS attributes dynamically
  if (document.querySelector('.admin-dashboard') || document.querySelector('.customer-dashboard')) {
    initDashboardAos();
  }

  AOS.init({
    once: false,
    mirror: true,
    duration: 800,
    easing: 'ease-out-cubic'
  });
}

function initDashboardAos() {
  // 1. Add data-aos to page headers
  document.querySelectorAll('.page-header').forEach((el) => {
    el.setAttribute('data-aos', 'fade-down');
  });

  // 2. Add staggered data-aos to stat cards in each stats-grid
  document.querySelectorAll('.stats-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', (index * 80).toString());
    });
  });

  // 3. Add staggered data-aos to chart cards in each charts-grid
  document.querySelectorAll('.charts-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.chart-card');
    cards.forEach((card, index) => {
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', (index * 80).toString());
    });
  });

  // 4. Add data-aos to table cards and other dashboard panels
  document.querySelectorAll('.table-card, .content-section, .fav-list, .timeline, .notification-list').forEach((el) => {
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', '100');
  });
}

/* ── Navbar Logout Button (mobile) ── */
document.addEventListener('DOMContentLoaded', () => {
  const navLogout = document.getElementById('navbarLogoutBtn');
  if (navLogout) {
    navLogout.addEventListener('click', () => {
      // Use same logout logic as sidebar button
      const sidebarLogout = document.querySelector('.sidebar-logout');
      if (sidebarLogout) {
        sidebarLogout.click();
      } else if (typeof Auth !== 'undefined' && Auth.logout) {
        Auth.logout();
      } else {
        window.location.href = 'login.html';
      }
    });
  }
});
