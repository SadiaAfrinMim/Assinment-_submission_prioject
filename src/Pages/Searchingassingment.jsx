import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Singsearch from './Singsearch';
import { FaBookAtlas } from 'react-icons/fa6';

const Searchingassingment = () => {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch all assignments when component mounts or when search/
    // 


    const fetchAllAssignments = async () => {
        
          // Send search and filter as query parameters
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignment?filter=${filter}&search=${search}`);
          setAssignments(data); // Set assignments in state
      
      };
    // filter changes
    fetchAllAssignments();
  }, [search, filter]); // Trigger re-fetch when search or filter changes

const handleReset = () => {
    setFilter('')
    setSearch('')
   
  }



  return (

    <div className='p-2'>
        {/* <Helmet>
        <title>All_Assainment || CollabStudy</title>
      </Helmet> */}
      <h1 className='text-3xl font-bold text-cyan-500 py-8'>Total_Assignment_({assignments.length})</h1>
      
      {/* Search and Filter Section */}
     <div className=" flex justify-center items-center my-6" >
     <div className="join ">
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Search"
            value={search} // Controlled input
            onChange={e=>setSearch(e.target.value)} // Handle search input change
          />
        </div>
        <div >
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
          <span className="indicator-item  border-cyan-500 bg-cyan-500 badge badge-secondary"><FaBookAtlas  className='text-white  '/></span>
          {/* No need for onClick to fetch data since useEffect handles it */}
          <button onClick={handleReset}
            className="btn join-item"
          >
           Reset
          </button>
        </div>
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
