import React, { useState } from "react";

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSummary, setUploadSummary] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadCsv = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      const response = await fetch(
        "http://localhost:8080/api/tickets/upload-csv",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || "Upload failed");
      }

      // Backend now returns a simple String summary like:
      // "CSV import completed. Total rows: X, Inserted: Y, Updated: Z"
      setUploadSummary(responseText);
      setShowSummary(true);
    } catch (error: any) {
      console.error("CSV Upload error:", error);
      setUploadSummary(null);
      alert("Upload failed: " + error.message);
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
          onClick={uploadCsv}
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
            "Upload"
          )}
        </button>
      </div>
      {uploadSummary && (
        <div
          className={`position-fixed top-50 start-50 translate-middle fade ${
            showSummary ? "show" : ""
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
                  setTimeout(() => setUploadSummary(null), 300);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
