// Data simulasi untuk fitur pintar.
const smartData = {
    historicalAvg: 145000,
    growthRate: 1.152,
    inventory: [
        { name: 'SaaS Pro Licenses', current: 45, avgMonthly: 120, leadTime: '3 days' },
        { name: 'Cloud Storage Units', current: 210, avgMonthly: 450, leadTime: 'Instant' },
        { name: 'Physical Server Rack', current: 2, avgMonthly: 5, leadTime: '14 days' }
    ]
};

function initSmart() {
    // Menghitung prediksi pendapatan dari rata-rata historis dan growth rate.
    const prediction = smartData.historicalAvg * smartData.growthRate;
    document.getElementById('forecast-revenue').innerText = `$${Math.round(prediction).toLocaleString()}`;

    // Membuat rekomendasi restock dengan cadangan 20% dari rata-rata bulanan.
    const container = document.getElementById('stock-prediction-container');
    container.innerHTML = smartData.inventory.map(item => {
        const suggested = Math.ceil(item.avgMonthly * 1.2); // Suggest 20% buffer
        const needToOrder = suggested - item.current;
        
        return `
            <div class="stock-item shadow-sm">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <div class="fw-bold text-dark">${item.name}</div>
                        <small class="text-muted">Current Stock: ${item.current} units</small>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-warning text-dark">Suggest Restock</span>
                        <div class="fw-bold text-danger">+${needToOrder} units</div>
                    </div>
                </div>
                <div class="mt-2 small text-secondary">
                    <i class="fas fa-truck-loading me-1"></i> Lead time: ${item.leadTime}
                </div>
            </div>
        `;
    }).join('');
}

// Menjalankan fitur pintar saat file dimuat.
initSmart();
