// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Set initial theme
    this.applyTheme(this.currentTheme);

    // Add event listener to toggle button
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
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
    document.documentElement.setAttribute('data-theme', theme);

    // Update toggle button icon
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
      }
    }

    // Update chart colors if Chart.js is loaded and charts exist
    this.updateChartsTheme(theme);
  }

  updateChartsTheme(theme) {
    // Update existing charts when theme changes
    const charts = Object.keys(Chart.instances);
    charts.forEach(key => {
      const chart = Chart.instances[key];
      if (chart && chart.options) {
        // Update chart colors based on theme
        if (theme === 'dark') {
          if (chart.options.scales) {
            if (chart.options.scales.x && chart.options.scales.x.grid) {
              chart.options.scales.x.grid.color = 'rgba(148, 163, 184, 0.2)';
            }
            if (chart.options.scales.y && chart.options.scales.y.grid) {
              chart.options.scales.y.grid.color = 'rgba(148, 163, 184, 0.2)';
            }
            if (chart.options.scales.x && chart.options.scales.x.ticks) {
              chart.options.scales.x.ticks.color = '#94A3B8';
            }
            if (chart.options.scales.y && chart.options.scales.y.ticks) {
              chart.options.scales.y.ticks.color = '#94A3B8';
            }
          }
          if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
            chart.options.plugins.legend.labels.color = '#94A3B8';
          }
        } else {
          if (chart.options.scales) {
            if (chart.options.scales.x && chart.options.scales.x.grid) {
              chart.options.scales.x.grid.color = 'rgba(74, 144, 164, 0.1)';
            }
            if (chart.options.scales.y && chart.options.scales.y.grid) {
              chart.options.scales.y.grid.color = 'rgba(74, 144, 164, 0.1)';
            }
            if (chart.options.scales.x && chart.options.scales.x.ticks) {
              chart.options.scales.x.ticks.color = '#64748B';
            }
            if (chart.options.scales.y && chart.options.scales.y.ticks) {
              chart.options.scales.y.ticks.color = '#64748B';
            }
          }
          if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
            chart.options.plugins.legend.labels.color = '#64748B';
          }
        }
        chart.update();
      }
    });
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
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue ($)',
      data: [1200, 1500, 1800, 2100, 1900, 2300],
      borderWidth: 3,
      borderColor: '#4A90A4',
      backgroundColor: 'rgba(74, 144, 164, 0.15)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#7DB6C7',
      pointBorderColor: '#4A90A4',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(74, 144, 164, 0.1)'
        },
        ticks: {
          color: '#64748B'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(74, 144, 164, 0.1)'
        },
        ticks: {
          color: '#64748B'
        }
      }
    },
    elements: {
      point: {
        hoverBorderWidth: 3
      }
    }
  }
});