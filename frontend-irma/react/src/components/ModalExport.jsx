function ModalExport() {
    return (
        <div className="modal fade" id="ModalExport" tabIndex="-1" aria-labelledby="ModalExportLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold" id="ModalExportLabel">Pilih Format Export</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Tutup" />
                    </div>
                    <div className="modal-body">
                        <div className="d-grid gap-3">
                            <button type="button" className="btn btn-outline-success py-3" data-bs-dismiss="modal">
                                <i className="fas fa-file-excel me-2" />XLSX
                            </button>
                            <button type="button" className="btn btn-outline-primary py-3" data-bs-dismiss="modal">
                                <i className="fas fa-file-csv me-2" />CSV
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalExport;
