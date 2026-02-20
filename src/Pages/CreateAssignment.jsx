import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Authprovider/Authprovider";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    marks: "",
    difficulty: "Easy",
    dueDate: new Date(),
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "marks" && (value < 0 || value > 100)) {
      toast.error("Marks must be between 0 and 100");
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Image is required");
      return;
    }

    const assignmentPayload = {
      title: formData.title,
      description: formData.description,
      marks: Number(formData.marks),
      difficulty: formData.difficulty,
      dueDate: formData.dueDate,
      createdBy: {
        email: user?.email,
        displayName: user?.displayName,
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(assignmentPayload));
    formDataToSend.append("image", formData.image);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/assignments`,
        formDataToSend
      );

      toast.success("Assignment created successfully!");
      navigate("/assignments");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create assignment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
          <h2 className="text-3xl font-bold text-white text-center">
            Create New Assignment
          </h2>
          <p className="text-center text-cyan-100 mt-2">
            Design engaging assignments for learners
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter assignment title"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              placeholder="Describe the assignment"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              onChange={handleInputChange}
            />
          </div>

          {/* Marks + Difficulty */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Marks</label>
              <input
                type="number"
                name="marks"
                min="0"
                max="100"
                required
                placeholder="0 - 100"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Difficulty</label>
              <select
                name="difficulty"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                onChange={handleInputChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-semibold mb-1">Due Date</label>
            <DatePicker
              selected={formData.dueDate}
              onChange={(date) =>
                setFormData({ ...formData, dueDate: date })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">Assignment Thumbnail</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-cyan-400 rounded-lg p-6 cursor-pointer hover:bg-cyan-50 transition">
              <FaCloudUploadAlt className="text-4xl text-cyan-500 mb-2" />
              <span className="text-gray-600">
                Click to upload image
              </span>
              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-56 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:scale-[1.02] transition transform"
          >
            Create Assignment 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;