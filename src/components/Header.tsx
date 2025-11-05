import { useNavigate } from "react-router-dom";

export function Header({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include", // so cookies/session are sent
    })
      .then((res) => res.text())
      .then((msg) => console.log(msg));
    navigate("/");
  };

  const handleHome = () => {
    navigate("/tickets");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Ticketing System</h1>
        <div className="space-x-4">
          <button
            onClick={handleHome}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Home
          </button>
          <form
            onSubmit={() => {
              handleLogout();
            }}
          >
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
