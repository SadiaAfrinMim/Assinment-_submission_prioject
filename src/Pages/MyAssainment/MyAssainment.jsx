import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Authprovider/Authprovider'; // Importing the auth context
import toast from 'react-hot-toast';

const MyAssainment = () => {
  const { user } = useContext(AuthContext); // Accessing the logged-in user info
  const [assignments, setAssignments] = useState([]); // State to store assignments

  // Fetching the assignments when the component mounts
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/${user.email}`);
        setAssignments(data); // Set the assignments fetched from the backend
      } catch (error) {
        console.error('Error fetching assignments', error);
        toast.error('Failed to load your assignments');
      }
    };

    if (user?.email) {
      fetchAssignments();
    }
  }, [user.email]); // Fetch data when the user's email changes

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments found for you.</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Assignment Title</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Marks</th>
              <th className="border-b p-2">Obtained Marks</th>
              <th className="border-b p-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td className="border-b p-2">{assignment.title}</td>
                <td className="border-b p-2">{assignment.status}</td>
                <td className="border-b p-2">{assignment.marks}</td>
                <td className="border-b p-2">
                  {assignment.obtainedMarks ? assignment.obtainedMarks : 'Not Graded'}
                </td>
                <td className="border-b p-2">
                  {assignment.feedback ? assignment.feedback : 'No Feedback'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAssainment;
