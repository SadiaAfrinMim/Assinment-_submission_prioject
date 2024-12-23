import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authprovider/Authprovider'; // Get user context
import MarkAssignmentModal from './MarkAssignmentModal'; // Modal for marking assignments
import toast from 'react-hot-toast';

const PendingAssignment = () => {
  const { user } = useContext(AuthContext); // Logged-in user info
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Selected assignment for marking
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility control

  // Fetch pending assignments
  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/submit-assignment`);
        const filteredAssignments = data.filter(
          (assignment) => assignment.status === 'pending' && assignment.createdBy !== user?.email
        );
        setPendingAssignments(filteredAssignments);
      } catch (error) {
        console.error('Error fetching pending assignments', error);
        toast.error('Failed to load pending assignments');
      }
    };

    fetchPendingAssignments();
  }, [user.email]);

  const handleMarkAssignment = (assignment) => {
    setSelectedAssignment(assignment); // Set the assignment to be marked
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmitMarks = async (marks, feedback) => {
    if (!marks || !feedback) {
      return toast.error('Marks and feedback are required');
    }

    try {
      // Mark the assignment
      await axios.post(`${import.meta.env.VITE_API_URL}/mark-assignment`, {
        assignmentId: selectedAssignment.assignmentId,
        marks,
        feedback,
      });

      // Update the status to 'completed'
      await axios.patch(`${import.meta.env.VITE_API_URL}/status-update/${selectedAssignment._id}`, {
        status: 'completed', // Update status
      });

      toast.success('Assignment marked and status updated successfully!');
      setIsModalOpen(false); // Close the modal

      // Remove the marked assignment from the pending list
      setPendingAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment._id !== selectedAssignment._id)
      );
    } catch (error) {
      console.error('Error marking assignment or updating status', error);
      toast.error('Failed to mark the assignment or update status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Assignments</h2>

      {pendingAssignments.length === 0 ? (
        <p>No pending assignments to evaluate.</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Assignment Title</th>
              <th className="border-b p-2">Examinee Name</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingAssignments.map((assignment) => (
              <tr key={assignment._id}>
                <td className="border-b p-2">{assignment.title}</td>
                <td className="border-b p-2">{assignment.name}</td>
                <td className="border-b p-2">
                  <span className="text-yellow-500">{assignment.status}</span>
                </td>
                <td className="border-b p-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleMarkAssignment(assignment)}
                  >
                    Give Mark
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedAssignment && (
        <MarkAssignmentModal
          assignment={selectedAssignment}
          onClose={() => setIsModalOpen(false)}
          onSubmitMarks={handleSubmitMarks}
        />
      )}
    </div>
  );
};

export default PendingAssignment;
