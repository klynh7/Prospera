// Data simulasi untuk fitur Business Intelligence.
const dataBI = {
    ringkasan: { penjualan: 850000000, laba: 320000000, transaksi: 4250 },
    tren: {
        monthly: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'], data: [120, 150, 140, 180, 170, 210], laba: [40, 60, 55, 75, 70, 90] },
        daily: { labels: ['01', '02', '03', '04', '05', '06', '07'], data: [42, 38, 51, 49, 62, 58, 55], laba: [17, 15, 21, 19, 27, 24, 23] }
    },
    performa: [
        { nama: 'Layanan Digital', volume: 1200, laba: 45000000 },
        { nama: 'Hosting Web', volume: 850, laba: 32000000 },
        { nama: 'Langganan SaaS', volume: 450, laba: 28000000 },
        { nama: 'Domain .id', volume: 1500, laba: 15000000 },
        { nama: 'Sertifikat SSL', volume: 320, laba: 12000000 }
    ]
};

let grafikBI;

function initBI() {
    // Mengisi ringkasan penjualan, laba, transaksi, dan margin keuntungan.
    document.getElementById('bi-sales-val').innerText = `Rp ${dataBI.ringkasan.penjualan.toLocaleString('id-ID')}`;
    document.getElementById('bi-profit-val').innerText = `Rp ${dataBI.ringkasan.laba.toLocaleString('id-ID')}`;
    document.getElementById('bi-trans-val').innerText = dataBI.ringkasan.transaksi.toLocaleString('id-ID');
    document.getElementById('bi-margin-val').innerText = `${((dataBI.ringkasan.laba/dataBI.ringkasan.penjualan)*100).toFixed(1)}%`;

    // Menampilkan daftar produk berdasarkan data performa.
    document.getElementById('top-perf-body').innerHTML = dataBI.performa.map(p => `
        <tr>
            <td><div class="fw-bold">${p.nama}</div></td>
            <td class="text-center">${p.volume.toLocaleString('id-ID')} unit</td>
            <td class="text-end text-success fw-bold">Rp ${p.laba.toLocaleString('id-ID')}</td>
        </tr>
    `).join('');

    initBIChart('monthly');
}

// Merender grafik tren penjualan dan laba berdasarkan periode.
function initBIChart(periode) {
    const canvas = document.getElementById('biChart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const labels = dataBI.tren[periode].labels;
    const penjualan = dataBI.tren[periode].data.map(v => v * 1000000);
    const laba = dataBI.tren[periode].laba.map(v => v * 1000000);

    // Menghapus grafik lama sebelum membuat grafik baru.
    if (grafikBI) grafikBI.destroy();

    // Membuat grafik garis menggunakan Chart.js.
    grafikBI = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Penjualan', data: penjualan, borderColor: '#2563EB', fill: true, backgroundColor: 'rgba(37, 99, 235, 0.1)', tension: 0.4 },
                { label: 'Laba Bersih', data: laba, borderColor: '#10B981', tension: 0.4 }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => context.dataset.label + ': Rp ' + context.raw.toLocaleString('id-ID')
                    }
                }
            }
        }
    });
}

// Menjalankan inisialisasi BI setelah halaman selesai dimuat.
document.addEventListener('DOMContentLoaded', initBI);
