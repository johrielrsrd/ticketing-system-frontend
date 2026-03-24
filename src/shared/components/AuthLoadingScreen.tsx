type LoadingScreenProps = {
  show?: boolean;
  label?: string;
};

export const AuthLoadingScreen = ({
  show = true,
  label = "Checking your session...",
}: LoadingScreenProps) => {
  if (!show) return null;

  return (
    <div
      className="d-flex min-vh-100 w-100 align-items-center justify-content-center bg-white"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="text-center px-4 py-5"
        style={{
          maxWidth: "320px",
          width: "100%",
        }}
      >
        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle border"
          style={{
            width: "56px",
            height: "56px",
          }}
        >
          <div
            className="spinner-border spinner-border-sm text-dark"
            role="status"
            aria-hidden="true"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
        </div>

        <div className="fw-semibold fs-5 text-dark mb-2">Ticketing Lite</div>

        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
};