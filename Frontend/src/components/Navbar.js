import React from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Home, Search } from "react-feather";

const Navbar = ({ title, onSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-purple-900 shadow-lg text-white">
      {/* Logo/Title */}
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Home size={28} />
        <span>{title}</span>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center w-1/3">
        <Search className="absolute left-3 text-gray-300" size={20} />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-4 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring focus:ring-pink-500"
        />
      </div>

      {/* Profile and Logout */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <User size={28} className="bg-pink-500 rounded-full p-1" />
          <span className="text-lg font-semibold">Anusha Sharma</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-pink-600 hover:bg-pink-800 py-2 px-4 rounded-full transition duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
