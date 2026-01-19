import { useState } from 'react';
import { useAppDispatch } from '@/core/store/hooks';
import { uploadCsv, fetchMyTickets, fetchAllTickets } from '@/features/tickets/store/ticketSlice';

export const CsvUpload = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [uploadSummary, setUploadSummary] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file');
      return;
    }

    try {
      setIsUploading(true);
      const result = await dispatch(uploadCsv(file));

      if (uploadCsv.fulfilled.match(result)) {
        setUploadSummary(result.payload as string);
        setShowSummary(true);
        // Refresh tickets after upload
        dispatch(fetchMyTickets());
        dispatch(fetchAllTickets());
      } else if (uploadCsv.rejected.match(result)) {
        throw new Error(result.payload as string || 'Upload failed');
      }
    } catch (error: unknown) {
      console.error('CSV Upload error:', error);
      setUploadSummary(null);
      alert('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      <div className="d-flex flex-column">
        <div className="fw-semibold">Import</div>
        <div className="text-muted small">CSV file required.</div>
      </div>

      <div className="d-flex flex-wrap gap-2 align-items-center">
        <input
          className="form-control"
          style={{ width: 280 }}
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={isUploading || !file}
        >
          {isUploading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              />
              Uploading…
            </>
          ) : (
            'Upload'
          )}
        </button>
      </div>
      {uploadSummary && (
        <div
          className={`position-fixed top-50 start-50 translate-middle fade ${
            showSummary ? 'show' : ''
          }`}
          style={{ zIndex: 1055 }}
        >
          <div
            className="alert alert-success shadow-lg px-4 py-3 mb-0"
            role="alert"
          >
            <div className="fw-semibold mb-1">Upload complete</div>
            <div className="small">{uploadSummary}</div>
            <div className="text-end mt-3">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => {
                  setShowSummary(false);
                  setUploadSummary(null);
                  window.location.reload();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
