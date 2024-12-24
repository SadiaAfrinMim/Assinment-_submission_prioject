import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MarkAssignmentModal = ({ assignment, onClose, onStatusChange }) => {
  const [marks, setMarks] = useState(''); // Marks state
  const [feedback, setFeedback] = useState(''); // Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission status
  const [currentAssignment, setCurrentAssignment] = useState(assignment); // To store the current assignment

  // When the assignment prop changes, update the currentAssignment, marks, and feedback
  useEffect(() => {
    if (assignment && assignment._id) {
      setCurrentAssignment(assignment);
      setMarks(assignment.marks || ''); // Initialize with existing marks
      setFeedback(assignment.feedback || ''); // Initialize with existing feedback
    }
  }, [assignment]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setIsSubmitting(true); // Set submitting state to true

    try {
      // Prepare the updated data
      const updatedData = {
        assignmentId: currentAssignment.assignmentId,
        title: currentAssignment.title,
        marks,
        feedback,
        googleDocsLink: currentAssignment.googleDocsLink,
        quickNote: currentAssignment.quickNote,
        status: 'completed', // Mark assignment as completed
        createdBy: currentAssignment.createdBy,
        myemail: currentAssignment.myemail,
        name: currentAssignment.name,
        dueDate: currentAssignment.dueDate,
      };

      // Send the updated data to the backend (PUT request to update the assignment)
      await axios.put(`${import.meta.env.VITE_API_URL}/submit-assignment/${currentAssignment._id}`, updatedData);

      // Show success toast
      toast.success('Assignment marked successfully!');

      // Call the parent function to update the status in the list
      onStatusChange('completed');

      // Close the modal after submission
      onClose();
    } catch (error) {
      console.error('Error marking assignment:', error);
      // Show error toast
      toast.error('Failed to mark assignment. Please try again later.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">Mark Assignment</h2>

        {/* Display the assignment details */}
        <p><strong>Google Docs Link:</strong> <a href={currentAssignment.googleDocsLink} target="_blank" rel="noopener noreferrer">{currentAssignment.googleDocsLink}</a></p>
        <p><strong>Quick Note:</strong> {currentAssignment.quickNote}</p>

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
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Marks'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkAssignmentModal;
