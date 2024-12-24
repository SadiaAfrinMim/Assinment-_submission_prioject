import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authprovider/Authprovider'; // Get user context
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa6';

const PendingAssignment = () => {
  const { user } = useContext(AuthContext); // Logged-in user info
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Selected assignment for marking
  const [marks, setMarks] = useState(''); // Marks state
  const [feedback, setFeedback] = useState(''); // Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission status
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility control

  // Fetch pending assignments
  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/submit-assignment`);
        setPendingAssignments(data);
      } catch (error) {
        console.error('Error fetching pending assignments', error);
        toast.error('Failed to load pending assignments');
      }
    };

    fetchPendingAssignments();
  }, [user.email]);

  const handleMarkAssignment = (assignment) => {
    setSelectedAssignment(assignment); // Set the assignment to be marked
    setMarks(''); // Reset marks input
    setFeedback(''); // Reset feedback input
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!marks || !feedback) {
      toast.error('Marks and feedback are required');
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      // Prepare the updated data
      const updatedData = {
        assignmentId: selectedAssignment.assignmentId,
        title: selectedAssignment.title,
        marks,
        feedback,
        googleDocsLink: selectedAssignment.googleDocsLink,
        quickNote: selectedAssignment.quickNote,
        status: 'completed', // Mark assignment as completed
        createdBy: selectedAssignment.createdBy,
        myemail: selectedAssignment.myemail,
        name: selectedAssignment.name,
        dueDate: selectedAssignment.dueDate,
      };

      // Send the updated data to the backend (PUT request to update the assignment)
      await axios.put(`${import.meta.env.VITE_API_URL}/submit-assignment/${selectedAssignment._id}`, updatedData);

      // Show success toast
      toast.success('Assignment marked successfully!');

      // Update the assignment status to 'completed' in the local state
      setPendingAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === selectedAssignment._id
            ? { ...assignment, status: 'completed' }
            : assignment
        )
      );

      // Close the modal after submission
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error marking assignment:', error);
      toast.error('Failed to mark assignment. Please try again later.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
              <th className="border-b p-2">Due Date</th>
              <th className="border-b p-2">Google Docs Link</th>
              <th className="border-b p-2">Quick Note</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingAssignments.map((assignment) => (
              <tr key={assignment._id}>
                <td className="border-b p-2">
  {assignment.title.length > 20 ? `${assignment.title.substring(0, 20)}...` : assignment.title}
</td>

                <td className="border-b p-2">{assignment.name}</td>
                <td className="border-b p-2">
                  <span
                    className={assignment.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td className="border-b p-2">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                <td className="border-b p-2 flex justify-center items-center">
  <a
    href={assignment.googleDocsLink}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500"
  >
    <FaEye className="text-3xl font-bold" />
  </a>
</td>

                <td className="border-b p-2">{assignment.quickNote}</td>
                <td className="border-b p-2">
                  <button
                    className="btn text-white bg-cyan-500"
                    onClick={() => handleMarkAssignment(assignment)}
                    disabled={assignment.status === 'completed' || assignment.createdBy === user.email}
                  >
                    {assignment.createdBy === user.email ? 'Not Allowed' : 'Give Mark'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Marking Assignment */}
      {isModalOpen && selectedAssignment && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Mark Assignment</h2>

            {/* Display the assignment details */}
            <p>
              <strong>Google Docs Link:</strong>{' '}
              <a
                href={selectedAssignment.googleDocsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedAssignment.googleDocsLink}
              </a>
            </p>
            <p>
              <strong>Quick Note:</strong> {selectedAssignment.quickNote}
            </p>

            {/* Assignment form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Marks input field */}
              <div className="form-control">
                <label className="label">Marks</label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)} // Update marks state
                  required
                />
              </div>

              {/* Feedback input field */}
              <div className="form-control">
                <label className="label">Feedback</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)} // Update feedback state
                  rows="4"
                />
              </div>

              {/* Modal actions */}
              <div className="modal-action">
                <button
                  type="button "
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting || !marks || !feedback}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Marks'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignment;
