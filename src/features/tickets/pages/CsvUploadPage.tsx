import CsvUpload from "@/shared/components/CsvUpload";

export default function CsvUploadPage() {
  return (
    <div className="p-4 w-100">
      <div className="d-flex flex-column mb-3">
        <div className="h5 mb-1">CSV Upload</div>
        <div className="text-muted small">
          Upload a CSV file to create or update tickets.
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <CsvUpload />
        </div>
      </div>
    </div>
  );
}
