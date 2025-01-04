import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AssignmentAll from './AssignmentAll';
import { Helmet } from 'react-helmet-async';
import Tabcategories from '../../Component/Tabcategories';


const Assignment = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch all assignments when component mounts
    fetchAllAssignments();
  }, []);

  const fetchAllAssignments = async () => {
    try {
      // Fetch assignments using GET request
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`,{withCredentials:true});
      setAssignments(data); // Set assignments in state
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  

  return (
    <div className='p-2' >
       <Helmet>
          <title>AllAssainment || CollabStudy</title>
        </Helmet>
      <h1 className='text-3xl font-bold text-cyan-500 py-8'>Total_Assainment_({assignments.length})</h1>

      <Tabcategories></Tabcategories>
    
      <div className='grid  rounded-lg lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8'>
        {assignments.map((assignment) => (
          <AssignmentAll key={assignment._id} fetchdata={ fetchAllAssignments} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Assignment;
