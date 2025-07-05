import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setToken(null);         // Clear token from parent (App)
    navigate('/login');     // Redirect to login
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          StyleKart 👗
        </Link>

        {/* Nav Links */}
        <div className="flex gap-4 text-gray-700 font-medium">
          <Link to="/shop" className="hover:text-blue-600 transition">Shop</Link>
          <Link to="/cart" className="hover:text-blue-600 transition">Cart 🛒</Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
            </>
          ) : (
            <>
              <Link to="/admin/upload" className="hover:text-blue-600 transition">Admin Upload</Link>
              <button
                onClick={handleLogoutClick}
                className="text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
