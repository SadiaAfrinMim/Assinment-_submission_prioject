import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../Authprovider/Authprovider';
import { Helmet } from 'react-helmet-async';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UpdateAssignment = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // assignment id from route

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marks: '',
    difficulty: 'Easy',
    dueDate: new Date(),
    image: null,          // new image file
    currentImageUrl: '',  // existing image
  });

  const [preview, setPreview] = useState(null);

  // Fetch assignment data on mount
  useEffect(() => {
    if (!id) return;
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignments/${id}`,
        { withCredentials: true }
      );

      if (!res.data) {
        toast.error('Assignment not found');
        navigate('/assignments');
        return;
      }

      const data = res.data.data || res.data; // handle backend data shape

      setFormData({
        title: data.title || '',
        description: data.description || '',
        marks: data.marks || '',
        difficulty: data.difficulty || 'Easy',
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
        image: null,
        currentImageUrl: data.image || '',
      });

      setPreview(data.image || null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load assignment data');
      navigate('/assignments');
    }
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date picker change
  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error('You must be logged in to update assignments');
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      marks: Number(formData.marks),
      difficulty: formData.difficulty,
      dueDate: formData.dueDate,
      createdBy: {
        email: user.email,
        displayName: user.displayName,
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify(payload));

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/assignments/${id}/${user.email}`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      toast.success('Assignment updated successfully!');
      navigate('/assignments');
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        'You are not authorized to update this assignment.'
      );
    }
  };

  return (
    <div className="container mx-auto p-6 my-12 border border-white shadow-md rounded-md">
      <Helmet>
        <title>Update Assignment || CollabStudy</title>
      </Helmet>
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
            />
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
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block mb-2">Difficulty</label>
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

          <div>
            <label className="block mb-2">Thumbnail Image</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-cyan-400 rounded-lg p-4 cursor-pointer hover:bg-cyan-50 transition">
              <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
              <span className="text-gray-600">
                Click to upload new image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {preview && (
              <img
                src={preview ?? ''}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded-md shadow"
              />
            )}
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