import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudents = () => {
  const [formData, setFormData] = useState({
    registerNumber: "",
    name: "",
    mobileNumber: "",
    department: "",
    dob: "",
  });

  const navigate = useNavigate(); // Used for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch("http://localhost:8000/api/accounts/addstudent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Student added successfully!"); // Notify user of success
        navigate("/admindashboard"); // Navigate to the admin dashboard after successful POST
      } else {
        alert("Failed to add student. Please try again.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred while adding the student.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit} // Ensure the handleSubmit function is triggered on form submit
        className="bg-purple-900 p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
        {[
          { label: "Register Number", name: "registerNumber", type: "text" },
          { label: "Name", name: "name", type: "text" },
          { label: "Mobile Number", name: "mobileNumber", type: "tel" },
          { label: "Department", name: "department", type: "text" },
          { label: "Date of Birth", name: "dob", type: "date" },
        ].map((field, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={field.name} className="block mb-1 font-semibold">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-purple-700 text-white focus:ring focus:ring-pink-500 transition-transform transform hover:scale-105"
            />
          </div>
        ))}
        <button
          type="submit" // Submit the form, triggering handleSubmit
          className="w-full py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:from-pink-600 hover:to-pink-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudents;