import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Authprovider/Authprovider';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Add DatePicker styles

const UpdateAssignment = () => {
  const { user } = useContext(AuthContext); // Get user info
  const { id } = useParams(); // Get assignment ID from URL params

  // Initialize form data state with default values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marks: '',
    thumbnail: '',
    difficulty: 'Easy', // Default value for difficulty
    dueDate: new Date(), // Default to current date
  });

  // Fetch assignment data on component mount
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/update-assignment/${id}`
        );
        setFormData({
          title: response.data.title || '', // Default to empty string if not found
          description: response.data.description || '',
          marks: response.data.marks || '',
          thumbnail: response.data.thumbnail || '',
          difficulty: response.data.difficulty || 'Easy',
          dueDate: response.data.dueDate ? new Date(response.data.dueDate) : new Date(),
        });
      } catch (error) {
        toast.error('Failed to fetch assignment data.');
      }
    };

    fetchAssignment();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date picker changes
  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      ...formData,
      email: user?.email || 'Unknown', // Include logged-in user's email
      dueDate: formData.dueDate.toISOString(), // Convert to ISO string for backend
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/update-assignment/${id}`,
        assignmentData
      );

      if (response.data.success) {
        toast.success('Assignment updated successfully!');
      } else {
        toast.error(response.data.message || 'Failed to update assignment!');
      }
    } catch (error) {
      toast.error('An error occurred while updating the assignment.');
    }
  };

  return (
    <div className="container mx-auto p-6 my-12 border border-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Update Assignment</h2>
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
            <label className="block mb-2">Description</label>
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
            <label className="block mb-2">Marks</label>
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
            <label className="block mb-2">Thumbnail Image URL</label>
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
            <label className="block mb-2">Difficulty Level</label>
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
            <label className="block mb-2">Due Date</label>
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
              Update Assignment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAssignment;
