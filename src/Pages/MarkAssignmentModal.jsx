import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MarkAssignmentModal = ({ assignment,status, onClose, onStatusChange }) => {
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the marks, feedback, and status update (completed)
      await axios.post(`${import.meta.env.VITE_API_URL}/mark-assignment`, {
        link: assignment.googleDocsLink,
        quickNote: assignment.quickNote,
        mark: assignment.marks,
        createdBy: assignment.email,
        email: assignment.myemail,
        assignmentId: assignment._id,
        marks,
        feedback,
        status: 'completed', // Update status to completed
      });

      toast.success('Assignment marked successfully!');
      onStatusChange('completed'); // Call parent function to update the status in the list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error marking assignment:', error);
      toast.error('Failed to mark assignment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">Mark Assignment</h2>

        <p><strong>Google Docs Link:</strong> <a href={assignment.googleDocsLink} target="_blank" rel="noopener noreferrer">{assignment.googleDocsLink}</a></p>
        <p><strong>Quick Note:</strong> {assignment.quickNote}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">Marks</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Feedback</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
            />
          </div>

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
