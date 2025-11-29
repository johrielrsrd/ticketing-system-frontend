import React, { useState } from "react";

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSummary, setUploadSummary] = useState<string | null>(null);
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

      const response = await fetch("http://localhost:8080/api/tickets/upload-csv", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || "Upload failed");
      }

      // Backend now returns a simple String summary like:
      // "CSV import completed. Total rows: X, Inserted: Y, Updated: Z"
      setUploadSummary(responseText);

    } catch (error: any) {
      console.error("CSV Upload error:", error);
      setUploadSummary(null);
      alert("Upload failed: " + error.message);

    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Upload CSV File</h3>

      {/* File Picker */}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {/* Upload Button */}
      <button
        onClick={uploadCsv}
        disabled={isUploading}
        style={{ marginLeft: "10px", padding: "6px 12px" }}
      >
        {isUploading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Display upload summary from backend */}
      {uploadSummary && (
        <div style={{ marginTop: "20px" }}>
          <h4>Upload Result:</h4>
          <p>{uploadSummary}</p>
        </div>
      )}
    </div>
  );
}