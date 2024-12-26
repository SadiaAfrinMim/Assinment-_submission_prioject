import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Authprovider/Authprovider'; // Importing the auth context
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { FaEye } from 'react-icons/fa6';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { Helmet } from 'react-helmet-async';

const MyAssignment = () => {
  const axiosSecure = UseAxiosSecure()
    useEffect(() => {
      AOS.init({ duration: 2000 });  // Customize the duration for animations
    }, []);
  
  const { id } = useParams(); // Retrieve params (if needed)
  const { user } = useContext(AuthContext); // Get the logged-in user info
  const [assignments, setAssignments] = useState([]); // State to hold assignments
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch submitted assignments
  useEffect(() => {
    const fetchMyAssignments = async () => {
      try {
        const { data } = await axiosSecure.get(`/submit-assignmen/${user?.email}`,{withCredentials:true});

       
        setAssignments(data); // Set user-specific assignments
      } catch (error) {
        console.error('Error fetching submitted assignments:', error);
        toast.error('Failed to load assignments.');
      } finally {
        setIsLoading(false); // Turn off loading state
      }
    };

    fetchMyAssignments();
  }, [user?.email]); // Dependency array ensures re-run if user.email changes

  return (
    <div className="w-11/12 mx-auto p-4">
       <Helmet>
          <title>MySubmittedAssainment || CollabStudy</title>
        </Helmet>
      <h2 className="text-2xl font-bold text-cyan-500 mb-4">My Submitted Assignments ({assignments?.length})</h2>

      {/* Loading state */}
      {isLoading ? (
        <p>Loading assignments...</p>
      ) : assignments?.length === 0 ? (
        <p>No assignments submitted yet.</p>
      ) : (
        <table  data-aos="fade-down" className="table-auto overflow-hidden  w-full text-center border-collapse">
          <thead>
            <tr className="animate-fade-in">
              <th className="border-b p-2">Assignment Title</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Assigned Marks</th>
              <th className="border-b p-2">Obtained Marks</th>
              <th className="border-b p-2">Feedback</th>
              <th className="border-b p-2">Google Docs Link</th>
            </tr>
          </thead>
          <tbody>
            {assignments?.map((assignment) => (
              <tr key={assignment?._id} className="hover:bg-gray-100 transition-colors duration-300">
                <td className="border-b p-2">{assignment?.title}</td>
                <td className="border-b p-2">
                  <span
                    className={`${
                      assignment?.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                    } animate-pulse`}
                  >
                    {assignment?.status}
                  </span>
                </td>
                <td className="border-b p-2">{assignment?.mark || 'N/A'}</td>
                <td className="border-b p-2">{assignment?.marks || 'N/A'}</td>
                <td className="border-b p-2">{assignment?.feedback || 'N/A'}</td>
                <td className="border-b p-2">
                  <div className="flex justify-center items-center">
                    <a
                      href={assignment?.googleDocsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 animate-bounce"
                    >
                      <FaEye className="text-3xl font-bold" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAssignment;
