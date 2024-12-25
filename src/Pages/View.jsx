import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AssignmentSubmissionModal from './AssignmentSubmissionModal';
import { format } from 'date-fns';  // Import format from date-fns

const AssignmentDetails = () => {
  const { id } = useParams(); // Get assignment ID from URL
  const [assignment, setAssignment] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAssignmentDetails();
  }, [id]);

  

  const fetchAssignmentDetails = async () => {
   
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/${id}`,{withCredentials:true});
      setAssignment(data);
    } catch (error) {
      console.error('Error fetching assignment details:', error);
    }
  };

  const handleTakeAssignment = () => {
    setModalOpen(true); // Open the modal to submit the assignment
  };

  return (
    <div className=" p-4">
       <Helmet>
          <title>AssaignmentDetails || CollabStudy</title>
        </Helmet>
      {assignment ? (
        <div className="card shadow-lg bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold">{assignment.title}</h1>
            <p className="text-gray-700 my-4">{assignment.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <p className="text-sm">
                <strong>Marks:</strong> {assignment?.marks}
              </p>
              <p className="text-sm">
                <strong>Created By:</strong> {assignment?.createdBy?.email || "Unknown"}
              </p>
              {assignment?.dueDate && (
                <p className="text-sm">
                  <strong>Due Date:</strong> {format(new Date(assignment.dueDate), 'P')}
                </p>
              )}
              <p className="text-sm">
                <strong>Difficulty:</strong> {assignment?.difficulty}
              </p>
            </div>

            <div className="card-actions justify-end">
              <button
                onClick={handleTakeAssignment}
                className="btn btn-primary"
              >
                Take Assignment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-semibold text-gray-500">Loading assignment details...</p>
        </div>
      )}

      {isModalOpen && (
        <AssignmentSubmissionModal
          assignmentId={assignment?._id}
          createdBy={assignment?.createdBy?.email}
          mark={assignment?.marks}
          title={assignment?.title}
          dueDate={assignment?.dueDate}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AssignmentDetails;
