import React, { useState, useEffect } from "react";
import { FiLogOut, FiUser, FiMapPin, FiEdit2 } from "react-icons/fi";
import { CheckCircle, Search } from "react-feather";
import { MdQrCodeScanner } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState("Ramkumar");
  const [attendance, setAttendance] = useState([
    { date: "17-12-2024", time: "10:00 AM", status: "Present", location: "Classroom 1" },
    { date: "16-12-2024", time: "09:00 AM", status: "Absent", location: "--" },
  ]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
      },
      () => {
        setLocation("Location permission denied.");
      }
    );
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white animate-fadeIn">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-purple-900 shadow-lg animate-slideInDown">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <CheckCircle size={28} />
          <span>Student Dashboard</span>
        </div>
        <div className="relative flex items-center w-1/3">
          <Search className="absolute left-3 text-gray-300" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring focus:ring-pink-500 transition-transform transform hover:scale-105"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 bg-pink-600 py-2 px-4 rounded-full hover:bg-pink-800 transition-transform transform hover:scale-110"
          >
            <FiUser size={20} />
            Account
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-purple-900 text-white rounded-lg shadow-lg p-4 z-10">
              <h2 className="text-lg font-bold mb-4">Update Profile</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 bg-gray-800 rounded text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 bg-gray-800 rounded text-white placeholder-gray-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 bg-gray-800 rounded text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-pink-500 rounded hover:bg-pink-700 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="p-6 grid grid-cols-3 gap-6">
        <div className="p-6 bg-purple-700 rounded-lg text-center shadow-lg transform transition-all hover:scale-105 hover:bg-pink-600">
          <h2 className="text-lg font-semibold">Total Classes</h2>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="p-6 bg-purple-700 rounded-lg text-center shadow-lg transform transition-all hover:scale-105 hover:bg-pink-600">
          <h2 className="text-lg font-semibold">Classes Attended</h2>
          <p className="text-3xl font-bold">102</p>
        </div>
        <div className="p-6 bg-purple-700 rounded-lg text-center shadow-lg transform transition-all hover:scale-105 hover:bg-pink-600">
          <h2 className="text-lg font-semibold">Attendance %</h2>
          <p className="text-3xl font-bold">85%</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Logs</h2>
  <div className="flex gap-4 mb-4">
    <select
      className="p-2 rounded bg-gray-800 text-white"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
    </select>
  </div>
  <table className="w-full bg-purple-900 rounded-lg shadow-lg">
    <thead>
      <tr>
        <th className="p-2 border-b border-purple-800">Date</th>
        <th className="p-2 border-b border-purple-800">Time</th>
        <th className="p-2 border-b border-purple-800">Status</th>
        <th className="p-2 border-b border-purple-800">Location</th>
      </tr>
    </thead>
    <tbody>
      {attendance
        .filter((a) => filterStatus === "All" || a.status === filterStatus)
        .map((record, index) => (
          <tr
            key={index}
            className="text-center transition-all duration-300 hover:bg-purple-700"
          >
            <td className="p-2">{record.date}</td>
            <td className="p-2">{record.time}</td>
            <td className="p-2">{record.status}</td>
            <td className="p-2">{record.location}</td>
          </tr>
        ))}
    </tbody>
  </table>
      </div>

      {/* Location */}
      <div className="p-6 bg-purple-900 rounded-lg shadow-lg mx-6">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
    <FiMapPin />
    Current Location
  </h2>
  <p className="mt-2 mb-4">
    Latitude: {location.split(",")[0]}, Longitude: {location.split(",")[1]}
  </p>
  <div className="flex justify-center">
  <button
    onClick={() => navigate("/qrcodescanner")}
    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 px-6 py-2 rounded-full text-white font-semibold transition-transform transform hover:scale-105"
  >
    <MdQrCodeScanner size={20} />
    Scan QR Code
  </button>
  </div>
  </div>
    </div>
  );
};

export default StudentDashboard;
