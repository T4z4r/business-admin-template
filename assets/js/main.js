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
      borderWidth: 2,
      borderColor: '#72140C',
      backgroundColor: 'rgba(114, 20, 12, 0.2)',
      tension: 0.3,
      fill: true
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});