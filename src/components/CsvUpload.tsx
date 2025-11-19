import React, { useState } from "react";

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setParsedData(data);

    } catch (error: any) {
      console.error("CSV Upload error:", error);
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

      {/* Display parsed results */}
      {parsedData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Parsed CSV Data:</h4>
          <ul>
            {parsedData.map((ticket, index) => (
              <li key={index}>
                <strong>{ticket.subject}</strong> — {ticket.status} - {ticket.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}