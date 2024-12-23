import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Authprovider/Authprovider'; // Assuming AuthContext provides user info
import { FaPenToSquare } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const AssignmentAll = ({ assignment,fetchdata }) => {
  const { user } = useContext(AuthContext); // Accessing the logged-in user info
  const {
    _id,
    title,
    description,
    marks,
    thumbnail,
    difficulty,
    dueDate,
    createdBy,
  } = assignment;

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      // Make a request to delete the assignment
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/assignments/${_id}/${user.email}`
      );
      
      if (response.status === 200) {
        // Successfully deleted, close the modal and show success message
        setDeleteModalOpen(false);
        toast.success('Assignment deleted successfully!');
        fetchdata()
      }
    } catch (error) {
      toast.error('Failed to delete the assignment!');
    }
  };

  // Function to handle canceling the delete action
  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="  border-white border-x rounded-lg border-t bg-base-100 shadow-xl">
    <div className='flex h-52 items-center justify-between   border-b-4 rounded-lg border-cyan-500'>
    <div>
     
        <img src={thumbnail} alt={title} className="h-52 w-72 object-cover rounded-l-lg rounded-r-none" />
      
      </div>
      <div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p className="text-sm">
          <strong>Marks: </strong>{marks} <br />
          <strong>Difficulty: </strong>{difficulty}
        </p>
        <p className="text-sm">
          <strong>Due Date: </strong>{new Date(dueDate).toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Created by: </strong>{createdBy?.displayName}
        </p>
        <p className="text-sm">
          <strong>Email: </strong>{createdBy?.email}
        </p>
     </div>
     </div>
        
          <div className="join join-vertical">
            <Link to={`/details/${_id}`} className="btn join-item bg-[#06B6D4] text-white"><FaEye className='text-3xl font-bold' /></Link>
            <Link to={`/update-assainment/${_id}`} className="btn join-item " ><FaPenToSquare  className='text-3xl font-bold' /></Link>
            <button onClick={() => setDeleteModalOpen(true)} className="btn join-item bg-[#06B6D4] text-white"><MdDeleteSweep className='text-3xl font-bold ' /></button>
       
        </div>
    
      </div>

      {isDeleteModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl">Are you sure you want to delete this assignment?</h2>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Confirm
              </button>
              <button className="btn" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentAll;
