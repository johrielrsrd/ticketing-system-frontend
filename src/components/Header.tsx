import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onLogout: () => void;
};

export function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      onLogout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Ticketing System</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
