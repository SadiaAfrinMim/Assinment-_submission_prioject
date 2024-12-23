import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authprovider/Authprovider';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { compareAsc } from 'date-fns';

const AssignmentSubmissionModal = ({ assignmentId, dueDate, onClose, title, createdBy,mark }) => {
  
  const { user } = useContext(AuthContext);
  const [startdate, setStartDate] = useState(new Date());
  const [googleDocsLink, setGoogleDocsLink] = useState('');
  const [quickNote, setQuickNote] = useState('');
  const [status, setStatus] = useState('pending'); // Default status
  const [isLoading, setIsLoading] = useState(false); // Loading state for the submit button
  const [submissionDate, setSubmissionDate] = useState(null); // Store submission date

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check deadline
    if (compareAsc(new Date(), new Date(dueDate)) === 1) {
      setIsLoading(false);
      return toast.error('Deadline crossed');
    }

    // Check if the action is permitted
    if (createdBy === user.email) {
      toast.error('Action is not permitted');
      onClose(); // Close the modal automatically if the action is not permitted
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/submit-assignment`, {
        title,
        assignmentId,
        mark,
        googleDocsLink,
        quickNote,
        status,
        createdBy,
        myemail: user.email,
        name: user.displayName,
        dueDate,
      });
      toast.success('Assignment submitted successfully!');
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Failed to submit assignment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">Submit Your Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Google Docs Link Field */}
          <div className="form-control">
            <label htmlFor="google-docs-link" className="label">
              <span className="label-text">Google Docs Link</span>
            </label>
            <input
              type="url"
              id="google-docs-link"
              placeholder="Enter your Google Docs link"
              className="input input-bordered w-full"
              value={googleDocsLink}
              onChange={(e) => setGoogleDocsLink(e.target.value)}
              required
            />
          </div>

          {/* Quick Note Field */}
          <div className="form-control">
            <label htmlFor="quick-note" className="label">
              <span className="label-text">Quick Note</span>
            </label>
            <textarea
              id="quick-note"
              placeholder="Write a quick note (optional)"
              className="textarea textarea-bordered w-full"
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              rows="4"
            />
          </div>

          {/* User Email Field (Read-Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              defaultValue={user.email}
              readOnly
            />
          </div>

          {/* Submission Time Field */}
          {submissionDate && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Submission Time</span>
              </label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startdate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-action flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#06B6D4] flex-1  btn btn-outline "
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn bg-[#06B6D4] flex-1 ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmissionModal;
