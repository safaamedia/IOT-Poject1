import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header
      className="sticky top-4 z-20 w-[700px] md:w-[900px] mx-auto rounded-full backdrop-blur-lg bg-white/30 shadow-lg flex items-center"
      style={{
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.12)',
        border: '1px solid rgba(255,255,255,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex justify-between items-center px-6 md:px-12 py-2 w-full gap-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              className="h-10 w-10 rounded-full"
              src="https://th.bing.com/th/id/OIP.2PDIejApjWb5yA0ZqaFiJgHaHa?rs=1&pid=ImgDetMain"
              alt="logo"
            />
          </Link>
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden flex items-center px-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Nav links */}
        <ul className="hidden md:flex flex-row gap-8 justify-center items-center">
          <li className="font-medium text-base cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="font-medium text-base cursor-pointer">
            <Link to="/temperature">Temperature</Link>
          </li>
          <li className="font-medium text-base cursor-pointer">
            <Link to="/humidity">Humidity</Link>
          </li>
          {!isAuthenticated ? (
            <li className="font-medium text-base cursor-pointer">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li className="font-medium text-base cursor-pointer flex items-center gap-2">
              <FiUser size={16} />
              <span>Hello, {user?.username}</span>
            </li>
          )}
        </ul>
        {/* Buttons and light mode/dark mode toggle */}
        <div className="hidden md:flex flex-row gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <button className="bg-green-600 rounded-full text-white px-6 py-2 shadow text-base font-semibold transition hover:bg-green-600">
                <span>Say Hello!</span>
              </button>
              <button className="bg-green-600 rounded-full text-white px-6 py-2 shadow text-base font-semibold transition hover:bg-green-500">
                <span>Contact Us!</span>
              </button>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="bg-red-500 rounded-full text-white px-6 py-2 shadow text-base font-semibold transition hover:bg-red-600 flex items-center gap-2"
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          )}
          <button
            className="ml-2 p-2 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 transition"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {dark ? <FiSun size={22} /> : <FiMoon size={22} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li className="font-medium text-lg">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="font-medium text-lg">
              <Link to="/temperature" onClick={() => setMenuOpen(false)}>
                Temperature
              </Link>
            </li>
            <li className="font-medium text-lg">
              <Link to="/humidity" onClick={() => setMenuOpen(false)}>
                Humidity
              </Link>
            </li>
            {!isAuthenticated && (
              <li className="font-medium text-lg">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
          <div className="flex flex-col gap-3 mt-4">
            {!isAuthenticated ? (
              <>
                <button className="bg-green-500 rounded-full text-white px-6 py-2 shadow text-base font-semibold transition hover:bg-green-600">
                  Say Hello!
                </button>
                <button className="bg-green-400 rounded-full text-white px-6 py-2 shadow text-base font-semibold transition hover:bg-green-500">
                  Contact Us!
                </button>
              </>
            ) : (
              <>
                <div className="text-center text-gray-700 font-medium">
                  Hello, {user?.username}!
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 rounded-full text-white px-6 py-2 shadow text-base font-semibold transition hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
