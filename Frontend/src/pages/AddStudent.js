import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudents = () => {
  const [formData, setFormData] = useState({
    registerNumber: "",
    name: "",
    mobileNumber: "",
    department: "",
    dob: null, // Changed to Date object for DatePicker
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const getDayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return date ? days[date.getDay()] : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/accounts/addstudent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dob: formData.dob ? formData.dob.toISOString().split("T")[0] : "",
        }),
      });

      if (response.ok) {
        toast.success("🎉 Student added successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        setTimeout(() => navigate("/admindashboard"), 3000);
      } else {
        toast.error("⚠️ Failed to add student. Please try again.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("🚨 An error occurred while adding the student.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black flex items-center justify-center text-white animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-purple-900 p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-transform hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-6 text-center animate-slideInDown">
          Add New Student
        </h2>

        {[
          { label: "Register Number", name: "registerNumber", type: "text" },
          { label: "Name", name: "name", type: "text" },
          { label: "Mobile Number", name: "mobileNumber", type: "tel" },
          { label: "Department", name: "department", type: "text" },
        ].map((field, index) => (
          <div key={index} className="mb-6">
            <label htmlFor={field.name} className="block mb-2 font-semibold text-gray-300">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-105"
            />
          </div>
        ))}

        {/* Date of Birth with Day Field */}
        <div className="flex gap-4 items-center mb-6">
          <div className="w-2/3">
            <label htmlFor="dob" className="block mb-2 font-semibold text-gray-300">
              Date of Birth
            </label>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={80}
              showPopperArrow={false}
              className="w-full px-4 py-2 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-105"
            />
          </div>
          <div className="w-2/3">
            <label htmlFor="day" className="block mb-2 font-semibold text-gray-300">
              Day
            </label>
            <input
              id="day"
              type="text"
              value={getDayOfWeek(formData.dob)}
              readOnly
              className="w-full px-4 py-2.5 rounded-full bg-purple-700 text-gray-100 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-full shadow-lg transform transition-transform hover:scale-110 hover:from-pink-600 hover:to-pink-800"
        >
          Submit
        </button>
      </form>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default AddStudents;
