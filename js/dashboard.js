/**
 * Stackly News & Magazine — Dashboard Module
 * Charts, Tables, Counters, Mock Corporate Data
 */

const Dashboard = (() => {
  let charts = {};

  const chartColors = {
    primary: '#DC2626',
    secondary: '#EF4444',
    accent: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
    purple: '#8B5CF6',
    cream: '#F4F7FE',
    grid: 'rgba(0,0,0,0.06)'
  };

  const getThemeColors = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      text: isDark ? '#E8E8E8' : '#1A1A1A',
      grid: isDark ? 'rgba(255,255,255,0.08)' : chartColors.grid,
      bg: isDark ? '#2D2D2D' : '#FFFFFF'
    };
  };

  const defaultChartOptions = () => {
    const theme = getThemeColors();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: theme.text, font: { family: 'Poppins', size: 12 } }
        }
      },
      scales: {
        x: {
          grid: { color: theme.grid },
          ticks: { color: theme.text, font: { family: 'Poppins', size: 11 } }
        },
        y: {
          grid: { color: theme.grid },
          ticks: { color: theme.text, font: { family: 'Poppins', size: 11 } }
        }
      }
    };
  };

  const initAdminCharts = () => {
    destroyCharts();

    // ── Admin Dashboard Overview Charts ──
    const adminOrdersCtx = document.getElementById('adminOrdersChart');
    if (adminOrdersCtx) {
      charts.adminOrders = new Chart(adminOrdersCtx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Publishing Activity',
            data: [18, 26, 22, 35, 42, 38, 30],
            borderColor: chartColors.primary,
            backgroundColor: 'rgba(220, 38, 38, 0.12)',
            fill: true,
            tension: 0.45,
            pointBackgroundColor: chartColors.primary,
            pointRadius: 5,
            pointHoverRadius: 7
          }, {
            label: 'Stories Published',
            data: [12, 20, 18, 28, 35, 30, 25],
            borderColor: chartColors.accent,
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            fill: true,
            tension: 0.45,
            pointBackgroundColor: chartColors.accent,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const adminCatCtx = document.getElementById('adminCategoriesChart');
    if (adminCatCtx) {
      charts.adminCategories = new Chart(adminCatCtx, {
        type: 'doughnut',
        data: {
          labels: ['Technology', 'World Affairs', 'Culture', 'Politics', 'Science'],
          datasets: [{
            data: [32, 22, 18, 16, 12],
            backgroundColor: [
              chartColors.primary,
              chartColors.secondary,
              chartColors.accent,
              chartColors.success,
              chartColors.purple
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: getThemeColors().text, font: { family: 'Poppins', size: 11 }, padding: 12 }
            }
          }
        }
      });
    }

    const adminRevCtx = document.getElementById('adminRevenueChart');
    if (adminRevCtx) {
      charts.adminRevenue = new Chart(adminRevCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Ad Revenue ($K)',
            data: [320, 380, 410, 395, 460, 510],
            backgroundColor: 'rgba(220,38,38,0.85)',
            borderRadius: 8,
            borderSkipped: false
          }, {
            label: 'Content Costs ($K)',
            data: [210, 240, 260, 250, 285, 305],
            backgroundColor: 'rgba(245,158,11,0.6)',
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const adminSalesCtx = document.getElementById('adminSalesChart');
    if (adminSalesCtx) {
      charts.adminSales = new Chart(adminSalesCtx, {
        type: 'radar',
        data: {
          labels: ['Technology', 'Finance', 'Culture', 'Politics', 'Science', 'Sports'],
          datasets: [{
            label: 'Team Score',
            data: [92, 85, 88, 78, 95, 90],
            backgroundColor: 'rgba(220,38,38,0.2)',
            borderColor: chartColors.primary,
            pointBackgroundColor: chartColors.primary,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: getThemeColors().text, font: { family: 'Poppins', size: 11 } } }
          },
          scales: {
            r: {
              grid: { color: chartColors.grid },
              ticks: { display: false },
              pointLabels: { color: getThemeColors().text, font: { family: 'Poppins', size: 11 } }
            }
          }
        }
      });
    }

    // ── Reports Charts ──
    const adminRev2Ctx = document.getElementById('adminRevenueChart2');
    if (adminRev2Ctx) {
      charts.adminRevenue2 = new Chart(adminRev2Ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Ad Revenue ($K)',
            data: [320, 380, 410, 395, 460, 510],
            borderColor: chartColors.primary,
            backgroundColor: 'rgba(220,38,38,0.12)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: chartColors.primary,
            pointRadius: 5
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const adminSales2Ctx = document.getElementById('adminSalesChart2');
    if (adminSales2Ctx) {
      charts.adminSales2 = new Chart(adminSales2Ctx, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3 (proj)', 'Q4 (proj)'],
          datasets: [{
            label: 'Articles Delivered',
            data: [34, 42, 50, 55],
            backgroundColor: ['rgba(220,38,38,0.85)', 'rgba(245,158,11,0.85)', 'rgba(239,68,68,0.7)', 'rgba(16,185,129,0.7)'],
            borderRadius: 8
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const adminResCtx = document.getElementById('adminReservationsChart');
    if (adminResCtx) {
      charts.adminReservations = new Chart(adminResCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Headcount',
            data: [185, 192, 198, 204, 210, 218],
            borderColor: chartColors.success,
            backgroundColor: 'rgba(16,185,129,0.12)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: chartColors.success,
            pointRadius: 5
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const adminCustCtx = document.getElementById('adminCustomerChart');
    if (adminCustCtx) {
      charts.adminCustomer = new Chart(adminCustCtx, {
        type: 'pie',
        data: {
          labels: ['Engineering', 'Ops', 'Sales', 'HR', 'Legal', 'Other'],
          datasets: [{
            data: [35, 20, 18, 12, 8, 7],
            backgroundColor: [
              chartColors.primary,
              chartColors.secondary,
              chartColors.accent,
              chartColors.success,
              chartColors.info,
              chartColors.purple
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: getThemeColors().text, font: { family: 'Poppins', size: 11 }, padding: 10 }
            }
          }
        }
      });
    }
  };

  const initCustomerCharts = () => {
    destroyCharts();

    const actCtx = document.getElementById('customerActivityChart');
    if (actCtx) {
      charts.customerActivity = new Chart(actCtx, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Meetings Attended',
            data: [8, 12, 9, 14],
            backgroundColor: 'rgba(220,38,38,0.85)',
            borderRadius: 8
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const ordCtx = document.getElementById('customerOrdersChart');
    if (ordCtx) {
      charts.customerOrders = new Chart(ordCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Stories Published',
            data: [14, 18, 22, 19, 28, 32],
            borderColor: chartColors.primary,
            backgroundColor: 'rgba(220,38,38,0.12)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: chartColors.primary,
            pointRadius: 5
          }]
        },
        options: { ...defaultChartOptions() }
      });
    }

    const favCtx = document.getElementById('customerFavChart');
    if (favCtx) {
      charts.customerFav = new Chart(favCtx, {
        type: 'doughnut',
        data: {
          labels: ['Engineering', 'Strategy', 'Compliance', 'Research'],
          datasets: [{
            data: [40, 28, 18, 14],
            backgroundColor: [
              chartColors.primary,
              chartColors.accent,
              chartColors.secondary,
              chartColors.success
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: getThemeColors().text, font: { family: 'Poppins', size: 11 }, padding: 10 }
            }
          }
        }
      });
    }
  };

  const destroyCharts = () => {
    Object.values(charts).forEach(c => { try { c.destroy(); } catch(e) {} });
    charts = {};
  };

  const initCounters = () => {
    const isAdmin = document.body.classList.contains('admin-dashboard');
    const mockData = isAdmin
      ? { totalOrders: 87, totalCustomers: 218, menuItems: 342, monthlyRevenue: 510000 }
      : { ordersPlaced: 24, rewardPoints: 1250, reservations: 4, couponsAvailable: 18 };

    document.querySelectorAll('[data-counter]').forEach(el => {
      const key = el.getAttribute('data-counter');
      const target = mockData[key] ?? 0;
      const isCurrency = el.hasAttribute('data-currency');
      const duration = 1400;
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);
        el.textContent = isCurrency ? '$' + value.toLocaleString() : value.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  };

  const initTables = () => {
    document.querySelectorAll('.data-table-wrapper').forEach(wrapper => {
      const perPage = parseInt(wrapper.getAttribute('data-per-page')) || 5;
      const tbody = wrapper.querySelector('tbody');
      if (!tbody) return;

      let allRows = Array.from(tbody.querySelectorAll('tr'));
      let filtered = [...allRows];
      let currentPage = 1;

      const pagContainer = wrapper.querySelector('.table-pagination');
      const searchInput = wrapper.querySelector('.table-search');

      const render = () => {
        const start = (currentPage - 1) * perPage;
        allRows.forEach(r => r.style.display = 'none');
        filtered.slice(start, start + perPage).forEach(r => r.style.display = '');
        renderPag();
      };

      const renderPag = () => {
        if (!pagContainer) return;
        const total = Math.ceil(filtered.length / perPage);
        pagContainer.innerHTML = '';
        if (total <= 1) return;
        for (let i = 1; i <= total; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.className = 'pag-btn' + (i === currentPage ? ' active' : '');
          btn.addEventListener('click', () => { currentPage = i; render(); });
          pagContainer.appendChild(btn);
        }
      };

      wrapper.querySelectorAll('th[data-sort]').forEach((th, idx) => {
        th.style.cursor = 'pointer';
        let asc = true;
        th.addEventListener('click', () => {
          filtered.sort((a, b) => {
            const A = a.cells[idx]?.textContent.trim() ?? '';
            const B = b.cells[idx]?.textContent.trim() ?? '';
            const nA = parseFloat(A.replace(/[^0-9.-]/g, ''));
            const nB = parseFloat(B.replace(/[^0-9.-]/g, ''));
            if (!isNaN(nA) && !isNaN(nB)) return asc ? nA - nB : nB - nA;
            return asc ? A.localeCompare(B) : B.localeCompare(A);
          });
          asc = !asc;
          currentPage = 1;
          render();
        });
      });

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          const q = searchInput.value.toLowerCase();
          filtered = allRows.filter(r => r.textContent.toLowerCase().includes(q));
          currentPage = 1;
          render();
        });
      }

      render();
    });
  };

  const initLoyalty = () => {
    const fill = document.querySelector('.loyalty-fill');
    if (fill) {
      setTimeout(() => { fill.style.width = '62.5%'; }, 600);
    }
  };

  const initSectionCharts = (sectionId) => {
    const isAdmin = document.body.classList.contains('admin-dashboard');
    if (isAdmin) initAdminCharts();
    else initCustomerCharts();
  };

  const init = () => {
    initCounters();
    initTables();
    initLoyalty();
    const isAdmin = document.body.classList.contains('admin-dashboard');
    if (isAdmin) initAdminCharts();
    else initCustomerCharts();
  };

  return { init, initSectionCharts, destroyCharts };
})();

document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();

  // Re-init charts when section changes
  document.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => Dashboard.init(), 100);
    });
  });
});
