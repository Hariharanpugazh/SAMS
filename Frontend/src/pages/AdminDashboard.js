import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  UserCheck,
  UserX,
  CheckCircle,
  LogOut,
  Search,
} from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData] = useState([
    { name: "Ramkumar", status: "Present" },
    { name: "Neha", status: "Absent" },
    { name: "Janani", status: "Present" },
    { name: "Ganesh", status: "Present" },
  ]);

  const [students] = useState([
    { name: "Ramkumar", rollNo: "005" },
    { name: "Neha", rollNo: "015" },
    { name: "Janani", rollNo: "023" },
    { name: "Ganesh", rollNo: "026" },
  ]);

  const [currentPageStudents, setCurrentPageStudents] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const studentsPerPage = 4;

  const indexOfLastStudent = currentPageStudents * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstStudent, indexOfLastStudent);

  const paginateStudents = (pageNumber) => setCurrentPageStudents(pageNumber);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    document.body.style.animation = "fadeIn 1s ease-in-out";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white animate-fadeIn">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-purple-900 shadow-lg animate-slideInDown">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <CheckCircle size={28} />
          <span>Admin Dashboard</span>
        </div>
        <div className="relative flex items-center w-1/3">
          <Search className="absolute left-3 text-gray-300" size={20} />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring focus:ring-pink-500 transition-transform transform hover:scale-105"
          />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-pink-600 hover:bg-pink-800 py-2 px-4 rounded-full transition-transform transform hover:scale-110 duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="p-6 grid grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="p-6 bg-purple-700 rounded-lg text-center shadow-lg transform transition-all hover:scale-105 hover:bg-pink-600 animate-slideInUp"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {i === 0 && <Users size={48} className="mx-auto mb-2" />}
            {i === 1 && <UserCheck size={48} className="mx-auto mb-2" />}
            {i === 2 && <UserX size={48} className="mx-auto mb-2" />}
            <h3>
              {i === 0
                ? "Total Students"
                : i === 1
                ? "Attendance Today"
                : "Students Absent"}
            </h3>
            <p className="text-3xl font-bold">{i === 0 ? "120" : i === 1 ? "85%" : "18"}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-6 p-6">
        {/* Student List */}
        <div className="col-span-1 p-4 bg-purple-900 rounded-lg animate-slideInLeft">
          <h2 className="text-xl font-bold mb-4">Student List</h2>
          <ul>
            {currentStudents.map((student, index) => (
              <li
                key={index}
                className="p-2 bg-purple-800 rounded-lg mb-2 transition-transform transform hover:scale-105"
              >
                {student.name} - {student.rollNo}
              </li>
            ))}
          </ul>
        </div>

        {/* Attendance List */}
        <div className="col-span-2 p-6 bg-purple-900 rounded-lg animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4">Attendance</h2>
          <ul>
            {attendanceData.map((record, index) => (
              <li
                key={index}
                className="p-2 bg-purple-800 rounded-lg mb-2 transition-transform transform hover:scale-105"
              >
                {record.name} - {record.status}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar */}
        <div className="col-span-1 p-6 bg-purple-900 rounded-lg animate-slideInRight">
          <h2 className="text-xl font-bold mb-4 text-center">Select Date</h2>
          <div className="flex items-center gap-6 mb-6">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-3/4 p-2 text-lg font-semibold rounded-lg shadow-md text-black focus:ring-200 focus:ring-pink-500 transition-transform transform hover:scale-105"
              dateFormat="dd-MM-yyyy"
            />
            <input
              type="text"
              value={selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
              readOnly
              className="w-1/2   p-3 text-lg font-semibold rounded-lg shadow-md text-black focus:ring-200 focus:ring-pink-500 transition-transform transform hover:scale-105"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/qrcode")}
              className="w-3/4 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:from-pink-600 hover:to-pink-800"
            >
              Generate QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
