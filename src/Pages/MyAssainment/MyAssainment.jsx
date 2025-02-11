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
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialize AOS
  }, []);

  const { id } = useParams(); // Retrieve params (if needed)
  const { user } = useContext(AuthContext); // Get the logged-in user info
  const [assignments, setAssignments] = useState([]); // State to hold assignments
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch submitted assignments
  useEffect(() => {
    const fetchMyAssignments = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/submit-assignmen/${user?.email}`,
          { withCredentials: true }
        );
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
        <title>My Submitted Assignments || CollabStudy</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-cyan-500 mb-4">
        My Submitted Assignments ({assignments?.length})
      </h2>

      {/* Loading state */}
      {isLoading ? (
        <span className="loading loading-spinner text-info"></span>
      ) : assignments?.length === 0 ? (
        <p>No assignments submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments?.map((assignment) => (
           <div
           key={assignment?._id}
           className="border shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
         >
           {/* Assignment Image */}
           {assignment?.thumbnail && (
             <div className="mb-4 relative overflow-hidden rounded-lg">
               <img
                 src={assignment?.thumbnail}
                 alt={assignment?.title}
                 className="w-full h-40 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
               />
               <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25"></div> {/* Dark overlay */}
             </div>
           )}
         
           <h3 className="text-xl font-bold text-[#06B6D4] mb-3">{assignment?.title}</h3>
           <p className="text-sm  mb-2">
             <strong>Status:</strong>{" "}
             <span
               className={`${
                 assignment?.status === "completed" ? "text-green-500" : "text-yellow-500"
               } font-semibold`}
             >
               {assignment?.status}
             </span>
           </p>
           <p className="text-sm  mb-2">
             <strong>Assigned Marks:</strong> {assignment?.mark || "N/A"}
           </p>
           <p className="text-sm  mb-2">
             <strong>Obtained Marks:</strong> {assignment?.marks || "N/A"}
           </p>
           <p className="text-sm  mb-2">
             <strong>Feedback:</strong> {assignment?.feedback || "N/A"}
           </p>
         
           <div className="flex justify-center mt-4">
             <a
               href={assignment?.googleDocsLink}
               target="_blank"
               rel="noopener noreferrer"
               className="text-white bg-[#06B6D4] hover:bg-[#0284a1] transition-all duration-300 px-4 py-2 rounded-lg shadow-lg"
             >
               <FaEye className="text-lg lg:text-2xl" />
             </a>
           </div>
         </div>
         
          ))}
        </div>
      </div>
      
      
      )}
    </div>
  );
};

export default MyAssignment;
