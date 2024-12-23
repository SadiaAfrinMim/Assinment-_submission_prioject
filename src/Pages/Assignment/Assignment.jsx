import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AssignmentAll from './AssignmentAll';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch all assignments when component mounts
    fetchAllAssignments();
  }, []);

  const fetchAllAssignments = async () => {
    try {
      // Fetch assignments using GET request
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`);
      setAssignments(data); // Set assignments in state
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  console.log('ehllo',assignments);

  return (
    <div>
      <div className='grid  rounded-lg lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8'>
        {assignments.map((assignment) => (
          <AssignmentAll key={assignment._id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Assignment;
