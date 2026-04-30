// Data simulasi untuk fitur pintar: prediksi penjualan dan stok.
const dataPintar = {
    rataRataHistoris: 145000000,
    tingkatPertumbuhan: 1.152,
    inventaris: [
        { nama: 'Lisensi SaaS Pro', saatIni: 45, rataBulanan: 120, waktuKirim: '3 hari' },
        { nama: 'Unit Penyimpanan Cloud', saatIni: 210, rataBulanan: 450, waktuKirim: 'Instan' },
        { nama: 'Rak Server Fisik', saatIni: 2, rataBulanan: 5, waktuKirim: '14 hari' }
    ]
};

function inisialisasiPintar() {
    // Mencari item dengan stok di bawah batas minimum.
    const alertBox = document.getElementById('inventory-alert-box');
    const countBox = document.getElementById('critical-count');
    const safetyStock = 50; // Batas minimum stok
    
    const lowStockItems = dataPintar.inventaris.filter(item => item.saatIni < safetyStock);
    
    if (countBox) countBox.innerText = lowStockItems.length;

    // Menampilkan peringatan stok jika ada item yang perlu diperhatikan.
    if (lowStockItems.length > 0) {
        alertBox.innerHTML = lowStockItems.map(item => `
            <div class="alert-item d-flex justify-content-between align-items-center">
                <span>${item.nama}</span>
                <span class="text-danger fw-bold">${item.saatIni} unit tersisa</span>
            </div>
        `).join('');
    } else {
        alertBox.innerHTML = '<div class="text-muted">Semua stok produk saat ini dalam kondisi aman.</div>';
    }

    // Menghitung proyeksi pendapatan berdasarkan rata-rata historis dan pertumbuhan.
    const proyeksi = dataPintar.rataRataHistoris * dataPintar.tingkatPertumbuhan;
    document.getElementById('forecast-revenue').innerText = `Rp ${Math.round(proyeksi).toLocaleString('id-ID')}`;

    // Membuat rekomendasi restock dengan cadangan 20% dari rata-rata bulanan.
    const kontainer = document.getElementById('stock-prediction-container');
    kontainer.innerHTML = dataPintar.inventaris.map(item => {
        const disarankan = Math.ceil(item.rataBulanan * 1.2); // Saran stok dengan cadangan 20%
        const perluDipesan = disarankan - item.saatIni;
        
        return `
            <div class="stock-item shadow-sm">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <div class="fw-bold text-dark">${item.nama}</div>
                        <small class="text-muted">Stok Saat Ini: ${item.saatIni} unit</small>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-warning text-dark">Saran Restock</span>
                        <div class="fw-bold text-danger">+${perluDipesan} unit</div>
                    </div>
                </div>
                <div class="mt-2 small text-secondary">
                    <i class="fas fa-truck-loading me-1"></i> Estimasi pengiriman: ${item.waktuKirim}
                </div>
            </div>
        `;
    }).join('');
}

// Menjalankan fitur pintar saat file dimuat.
inisialisasiPintar();
