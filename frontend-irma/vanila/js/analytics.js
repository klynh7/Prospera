// Data simulasi untuk halaman analisis lengkap.
const biData = {
    dailySales: [
        { date: '2026-04-01', sales: 4200000, profit: 1700000, trans: 45 },
        { date: '2026-04-02', sales: 3800000, profit: 1500000, trans: 38 },
        { date: '2026-04-03', sales: 5100000, profit: 2100000, trans: 52 },
        { date: '2026-04-04', sales: 4900000, profit: 1950000, trans: 48 },
        { date: '2026-04-05', sales: 6200000, profit: 2700000, trans: 65 },
        { date: '2026-04-06', sales: 5800000, profit: 2400000, trans: 60 },
        { date: '2026-04-07', sales: 5500000, profit: 2300000, trans: 55 },
    ],
    monthlySummary: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        sales: [120000000, 135000000, 128000000, 145000000, 152000000, 160000000],
        profit: [48000000, 55000000, 51000000, 60000000, 64000000, 68000000]
    },
    products: [
        { id: 1, name: 'Layanan Digital', volume: 1240, revenue: 150000000, profit: 45000000, growth: 24 },
        { id: 2, name: 'Hosting Web', volume: 850, revenue: 85000000, profit: 25500000, growth: 12 },
        { id: 3, name: 'Langganan SaaS', volume: 620, revenue: 124000000, profit: 37200000, growth: 18 },
        { id: 4, name: 'Penyimpanan Cloud', volume: 450, revenue: 45000000, profit: 9000000, growth: 9 }
    ]
};

let biTrendChart;

// Menjalankan semua inisialisasi setelah elemen HTML selesai dimuat.
document.addEventListener('DOMContentLoaded', () => {
    initBIStats();
    initBITrend('monthly');
    initAIForecast();
    initBIProducts();
});

function initBIStats() {
    // Menghitung total penjualan, laba, transaksi, dan margin dari data simulasi.
    const totalProfit = biData.monthlySummary.profit.reduce((a, b) => a + b, 0);
    const totalSales = biData.monthlySummary.sales.reduce((a, b) => a + b, 0);
    const totalTrans = biData.products.reduce((a, b) => a + b.volume, 0);
    const margin = (totalProfit / totalSales * 100).toFixed(1);

    if(document.getElementById('bi-total-sales')) {
        document.getElementById('bi-total-sales').innerText = `Rp ${totalSales.toLocaleString('id-ID')}`;
    }
    document.getElementById('bi-net-profit').innerText = `Rp ${totalProfit.toLocaleString('id-ID')}`;
    document.getElementById('bi-total-trans').innerText = totalTrans.toLocaleString('id-ID');
    document.getElementById('bi-margin').innerText = `${margin}%`;
}

function initBITrend(type) {
    // Menentukan data grafik berdasarkan pilihan periode harian atau bulanan.
    const ctx = document.getElementById('biTrendChart').getContext('2d');
    
    let labels, sales, profit;
    if (type === 'daily') {
        labels = biData.dailySales.map(d => d.date.split('-')[2] + ' Apr');
        sales = biData.dailySales.map(d => d.sales);
        profit = biData.dailySales.map(d => d.profit);
    } else {
        labels = biData.monthlySummary.labels;
        sales = biData.monthlySummary.sales;
        profit = biData.monthlySummary.profit;
    }

    // Menghapus grafik lama agar canvas tidak menumpuk saat periode diganti.
    if (biTrendChart) biTrendChart.destroy();

    // Membuat grafik tren penjualan dan laba menggunakan Chart.js.
    biTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Penjualan Kotor',
                    data: sales,
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Laba Bersih',
                    data: profit,
                    borderColor: '#10B981',
                    backgroundColor: 'transparent',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (c) => c.dataset.label + ': Rp ' + c.raw.toLocaleString('id-ID')
                    }
                }
            }
        }
    });
}

function updateBITrend(type) {
    // Memperbarui status tombol aktif lalu merender ulang grafik.
    const btns = document.querySelectorAll('.btn-outline-secondary');
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    initBITrend(type);
}

function initBIProducts() {
    // Menampilkan produk berdasarkan laba tertinggi di tabel performa.
    const tbody = document.getElementById('bi-product-body');
    // Menghapus penggunaan class warna yang berbeda-beda agar seragam putih
    tbody.innerHTML = biData.products.sort((a, b) => b.profit - a.profit).map(p => `
        <tr style="background-color: white !important;">
            <td class="fw-bold text-dark">${p.name}</td>
            <td>${p.volume.toLocaleString('id-ID')} unit</td>
            <td class="text-success fw-bold">Rp ${p.profit.toLocaleString('id-ID')}</td>
            <td>
                <span class="text-primary"><i class="fas fa-arrow-up me-1"></i>${p.growth}%</span>
            </td>
        </tr>
    `).join('');
}

function initAIForecast() {
    // Membuat proyeksi penjualan sederhana dengan asumsi pertumbuhan 15%.
    const prediction = biData.monthlySummary.sales[5] * 1.15;
    document.getElementById('ai-projected-sales').innerText = `Rp ${Math.round(prediction).toLocaleString('id-ID')}`;
    
    // Menampilkan rekomendasi tambahan stok untuk dua produk teratas.
    const stockList = document.getElementById('ai-stock-list');
    stockList.innerHTML = biData.products.slice(0, 2).map(p => `
        <div class="mb-1">• ${p.name}: +${Math.round(p.volume * 0.2)} unit</div>
    `).join('');
}

