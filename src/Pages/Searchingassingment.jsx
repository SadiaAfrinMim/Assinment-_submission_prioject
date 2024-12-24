import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Singsearch from './Singsearch';

const Searchingassingment = () => {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch all assignments when component mounts or when search/
    // 


    const fetchAllAssignments = async () => {
        
          // Send search and filter as query parameters
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments?filter=${filter}&search=${search}`, {
           
          });
          setAssignments(data); // Set assignments in state
      
      };
    // filter changes
    fetchAllAssignments();
  }, [search, filter]); // Trigger re-fetch when search or filter changes

 


  return (
    <div className='p-2'>
      <h1 className='text-3xl font-bold text-cyan-500 py-8'>Total_Assignment_({assignments.length})</h1>
      
      {/* Search and Filter Section */}
      <div className="join">
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Search"
            value={search} // Controlled input
            onChange={e=>setSearch(e.target.value)} // Handle search input change
          />
        </div>
        <div>
          <select
            className="select select-bordered join-item"
                name='category'
              id='category'
            value={filter}
            onChange={e=>setFilter(e.target.value)} // Handle filter change
          >
            <option value="" selected>
              Filter
            </option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            {/* Add more filter options as needed */}
          </select>
        </div>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">new</span>
          {/* No need for onClick to fetch data since useEffect handles it */}
          <button
            className="btn join-item"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display Assignments */}
      <div className='grid rounded-lg lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8'>
        {assignments.map((assignment) => (
          <Singsearch key={assignment._id}  assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Searchingassingment;
