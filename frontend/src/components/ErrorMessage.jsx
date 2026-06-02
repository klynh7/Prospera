import React from 'react';

function ErrorMessage({ error }) {
    return (
        <div className="alert alert-danger m-4 d-flex align-items-center shadow-sm border-0 rounded">
            <i className="fas fa-exclamation-triangle fs-3 me-3 text-danger"></i>
            <div>
                <h6 className="fw-bold mb-1">Gagal memuat data!</h6>
                <p className="mb-0 small">
                    Koneksi terputus atau sesi Anda mungkin telah berakhir. Silakan <strong>muat ulang (refresh)</strong> halaman atau coba login kembali.
                </p>
                <span className="text-muted" style={{ fontSize: '10px' }}>Log sistem: {error}</span>
            </div>
        </div>
    );
}

export default ErrorMessage;