document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("wrapper").classList.toggle("toggled");
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