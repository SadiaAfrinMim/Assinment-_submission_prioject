import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Singsearch from './Singsearch';
import { FaBookAtlas } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';

const Searchingassingment = () => {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch all assignments when component mounts or when search/filter changes
    const fetchAllAssignments = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignment?filter=${filter}&search=${search}`);
      setAssignments(data); // Set assignments in state
    };

    fetchAllAssignments();
  }, [search, filter]); // Trigger re-fetch when search or filter changes

  const handleReset = () => {
    setFilter('');
    setSearch('');
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Searching&Filtering || CollabStudy</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-cyan-500 py-8">Total Assignments ({assignments.length})</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-center items-center my-6 space-x-4">
        <div className="flex items-center space-x-2">
          <input
            className="input input-bordered w-full sm:w-80"
            placeholder="Search"
            value={search} // Controlled input
            onChange={(e) => setSearch(e.target.value)} // Handle search input change
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="select select-bordered w-full sm:w-48"
            name="category"
            id="category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Handle filter change
          >
            <option value="">Filter</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            {/* Add more filter options as needed */}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="indicator-item border-cyan-500 bg-cyan-500 badge badge-secondary">
            <FaBookAtlas className="text-white" />
          </span>
          <button onClick={handleReset} className="btn join-item">
            Reset
          </button>
        </div>
      </div>

      {/* Display Assignments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {assignments.map((assignment) => (
          <Singsearch key={assignment._id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Searchingassingment;
