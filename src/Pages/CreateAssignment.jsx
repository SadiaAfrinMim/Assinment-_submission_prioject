import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Authprovider/Authprovider";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);
  const { user } = useContext(AuthContext); // Get user info
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    marks: "",
    thumbnail: "",
    difficulty: "Easy", // Default dropdown value
    dueDate: new Date(), // Default to current date
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      ...formData,
      createdBy: {
        email: user?.email || "Unknown",
        displayName: user?.displayName || "Anonymous",
      },
    };

    try {
     await axios.post(
        `${import.meta.env.VITE_API_URL}/assignments`,
        assignmentData
      );
      toast.success(
        "Assignment created successfully"
      );
      navigate('/assignments')
    
    } catch (error) {
      console.error("Error creating assignment:", error); // Debug log
      toast.error("Failed to create assignment!");
    }
  };

  return (
    <div data-aos="fade-left" className="container overflow-hidden mx-auto p-6 my-12 border border-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Create Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block  mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block  mb-2">Marks</label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block  mb-2">Thumbnail Image URL</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block  mb-2">Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block  mb-2">Due Date</label>
            <DatePicker
              selected={formData.dueDate}
              onChange={handleDateChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#06B6D4] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Create Assignment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
