import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // const toggleDark = () => {
  //   document.documentElement.classList.toggle("dark");
  // };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 flex-wrap">
      <h1
        className="font-bold text-lg cursor-pointer text-gray-800 dark:text-white"
        onClick={() => navigate("/")}
      >
        Task Manager
      </h1>

      <div className="flex gap-3 items-center flex-wrap">
        {/* 🌙 Dark Mode */}
        {/* <button
          onClick={toggleDark}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          🌙
        </button> */}
        <ThemeToggle />


        {/* 🔐 Auth-based buttons */}
        {!token ? (
          <>
            {location.pathname === "/" && (
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Signup
              </button>
            )}

            {location.pathname === "/signup" && (
              <button
                onClick={() => navigate("/")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Login
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
