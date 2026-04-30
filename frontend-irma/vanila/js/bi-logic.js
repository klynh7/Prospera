// Data simulasi untuk halaman Business Intelligence.
const biData = {
    summary: { sales: 850000, profit: 320000, trans: 4250 },
    trends: {
        monthly: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], data: [120, 150, 140, 180, 170, 210], profit: [40, 60, 55, 75, 70, 90] },
        daily: { labels: ['01', '02', '03', '04', '05', '06', '07'], data: [42, 38, 51, 49, 62, 58, 55], profit: [17, 15, 21, 19, 27, 24, 23] }
    },
    performance: [
        { name: 'SaaS Pro', volume: 1200, profit: 45000 },
        { name: 'Cloud API', volume: 850, profit: 32000 },
        { name: 'Enterprise', volume: 450, profit: 28000 }
    ]
};

let chart;

function init() {
    // Mengisi ringkasan penjualan, laba, transaksi, dan margin keuntungan.
    document.getElementById('bi-sales-val').innerText = `$${biData.summary.sales.toLocaleString()}`;
    document.getElementById('bi-profit-val').innerText = `$${biData.summary.profit.toLocaleString()}`;
    document.getElementById('bi-trans-val').innerText = biData.summary.trans.toLocaleString();
    document.getElementById('bi-margin-val').innerText = `${((biData.summary.profit/biData.summary.sales)*100).toFixed(1)}%`;

    // Menampilkan daftar produk dengan performa terbaik ke dalam tabel.
    document.getElementById('top-perf-body').innerHTML = biData.performance.map(p => `
        <tr>
            <td><div class="fw-bold">${p.name}</div><small class="text-muted">${p.volume} sold</small></td>
            <td class="text-end text-success fw-bold">+$${p.profit.toLocaleString()}</td>
        </tr>
    `).join('');

    renderChart('monthly');
}

// Merender grafik time-series berdasarkan periode yang dipilih.
function renderChart(period) {
    const ctx = document.getElementById('biChart').getContext('2d');
    const labels = biData.trends[period].labels;
    const sales = biData.trends[period].data.map(v => v * 1000);
    const profit = biData.trends[period].profit.map(v => v * 1000);

    // Menghapus grafik sebelumnya sebelum membuat grafik baru.
    if (chart) chart.destroy();

    // Membuat grafik penjualan dan laba menggunakan Chart.js.
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Sales', data: sales, borderColor: '#2563EB', fill: true, backgroundColor: 'rgba(37, 99, 235, 0.1)' },
                { label: 'Profit', data: profit, borderColor: '#10B981' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Merender ulang grafik ketika pilihan periode berubah.
document.getElementById('trend-period').addEventListener('change', (e) => renderChart(e.target.value));
init();
