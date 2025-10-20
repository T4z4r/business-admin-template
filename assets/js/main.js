// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = null;
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);

    // Wait for DOM to be fully loaded before adding event listeners
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  setupEventListeners() {
    // Find theme toggle button
    this.themeToggle = document.getElementById('themeToggle');
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());

      // Update button icon based on current theme
      const icon = this.themeToggle.querySelector('i');
      if (icon) {
        icon.className = this.currentTheme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
      }
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Add visual feedback
    if (this.themeToggle) {
      this.themeToggle.classList.add('active');
      setTimeout(() => {
        this.themeToggle.classList.remove('active');
      }, 300);
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);

    // Update toggle button icon if it exists
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
      }
    }

    // Update chart colors if Chart.js is loaded
    this.updateChartsTheme(theme);

    // Dispatch custom event for other scripts that might need to know about theme changes
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: theme }
    }));
  }

  updateChartsTheme(theme) {
    // Update existing charts when theme changes
    if (typeof Chart !== 'undefined') {
      const charts = Object.keys(Chart.instances);
      charts.forEach(key => {
        const chart = Chart.instances[key];
        if (chart && chart.options) {
          this.updateChartOptions(chart, theme);
          chart.update('none'); // Update without animation for smoother transition
        }
      });
    }
  }

  updateChartOptions(chart, theme) {
    const isDark = theme === 'dark';

    // Update grid colors
    const gridColor = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(74, 144, 164, 0.1)';
    const tickColor = isDark ? '#94A3B8' : '#64748B';
    const legendColor = isDark ? '#94A3B8' : '#64748B';

    if (chart.options.scales) {
      ['x', 'y'].forEach(axis => {
        if (chart.options.scales[axis]) {
          if (chart.options.scales[axis].grid) {
            chart.options.scales[axis].grid.color = gridColor;
          }
          if (chart.options.scales[axis].ticks) {
            chart.options.scales[axis].ticks.color = tickColor;
          }
        }
      });
    }

    if (chart.options.plugins && chart.options.plugins.legend) {
      if (chart.options.plugins.legend.labels) {
        chart.options.plugins.legend.labels.color = legendColor;
      }
    }

    // Update dataset colors for specific chart types
    if (chart.config.type === 'line' && chart.config.data.datasets[0]) {
      const dataset = chart.config.data.datasets[0];
      if (isDark) {
        dataset.borderColor = '#5BA3B8';
        dataset.backgroundColor = 'rgba(91, 163, 184, 0.2)';
        dataset.pointBackgroundColor = '#7DB6C7';
        dataset.pointBorderColor = '#5BA3B8';
      } else {
        dataset.borderColor = '#4A90A4';
        dataset.backgroundColor = 'rgba(74, 144, 164, 0.15)';
        dataset.pointBackgroundColor = '#7DB6C7';
        dataset.pointBorderColor = '#4A90A4';
      }
    }

    if (chart.config.type === 'bar' && chart.config.data.datasets[0]) {
      const dataset = chart.config.data.datasets[0];
      if (isDark) {
        dataset.backgroundColor = 'rgba(91, 163, 184, 0.8)';
        dataset.borderColor = '#5BA3B8';
      } else {
        dataset.backgroundColor = 'rgba(74, 144, 164, 0.7)';
        dataset.borderColor = '#4A90A4';
      }
    }

    if (chart.config.type === 'doughnut' && chart.config.data.datasets[0]) {
      const dataset = chart.config.data.datasets[0];
      if (isDark) {
        dataset.backgroundColor = ['#4ADE80', '#F59E0B', '#EF4444'];
        dataset.borderColor = ['#5BA3B8', '#5BA3B8', '#5BA3B8'];
      } else {
        dataset.backgroundColor = ['#6B9B8A', '#8FA68E', '#B56576'];
        dataset.borderColor = ['#4A90A4', '#4A90A4', '#4A90A4'];
      }
    }
  }
}

// Sidebar Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("wrapper").classList.toggle("toggled");
});

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new ThemeManager();
});

const ctx = document.getElementById('chartPerformance');
if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Monthly Revenue ($)',
        data: [245000, 258000, 272000, 235000, 268000, 284750],
        borderWidth: 3,
        borderColor: '#4A90A4',
        backgroundColor: 'rgba(74, 144, 164, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#7DB6C7',
        pointBorderColor: '#4A90A4',
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#64748B',
            font: {
              family: 'Inter',
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#4A90A4',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(74, 144, 164, 0.1)',
            borderColor: 'rgba(74, 144, 164, 0.2)'
          },
          ticks: {
            color: '#64748B',
            font: {
              family: 'Inter',
              size: 11
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(74, 144, 164, 0.1)',
            borderColor: 'rgba(74, 144, 164, 0.2)'
          },
          ticks: {
            color: '#64748B',
            font: {
              family: 'Inter',
              size: 11
            },
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          }
        }
      },
      elements: {
        point: {
          hoverBorderWidth: 3
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}