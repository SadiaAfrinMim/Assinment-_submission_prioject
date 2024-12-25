import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authprovider/Authprovider'; // Assuming AuthContext provides user info
import { FaPenToSquare } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const AssignmentAll = ({ assignment, fetchdata }) => {
  const axiosSecure = UseAxiosSecure()
  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);
  const navigate = useNavigate()

  const { user } = useContext(AuthContext);
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

  const handleDelete = async () => {
    try {
      const response = await axiosSecure.delete(
        `/assignments/${_id}/${user.email}`,{withCredentials:true}
      );

      if (response.status === 200) {
        setDeleteModalOpen(false);
        toast.success('Assignment deleted successfully!');
        fetchdata();
      }
    } catch (error) {
      toast.error('Failed to delete the assignment!');
      navigate('/login')

    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const legthOfText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div data-aos="zoom-in"  className="border-white overflow-hidden  border-x rounded-lg border-t bg-base-100 shadow-xl mb-4">
      <div className="lg:flex md:flex flex-1 gap-8 items-center justify-between border-b-4 rounded-lg border-cyan-500 p-4">
        {/* Image */}
        <div className=" mb-4 lg:mb-0">
          <img src={thumbnail} alt={title} className="w-full h-64  object-cover rounded-lg" />
        </div>

        {/* Assignment Info */}
        <div className="w-full flex-1 ">
          <div className="">
            <h2 className="card-title text-xl font-semibold">{legthOfText(title, 30)}</h2>
            <p>{legthOfText(description, 60)}</p>
            <p className="text-sm mt-2">
              <strong>Marks: </strong>{marks} <br />
              <strong>Difficulty: </strong>{difficulty}
            </p>
            <p className="text-sm">
              <strong>Due Date: </strong>{new Date(dueDate).toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>Created by: </strong>{createdBy?.displayName}
            </p>
            <p className="text-sm whitespace-nowrap">
              <strong>Email: </strong>{createdBy?.email}
            </p>
         

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <Link to={`/assignments/details/${_id}`} className="btn bg-[#06B6D4] text-white flex items-center justify-center p-2 rounded-md hover:bg-[#03879a] transition duration-300">
              <FaEye className="text-2xl font-bold" />
            </Link>
            <Link to={`/assignments/update-assignment/${_id}`} className="btn bg-yellow-600 text-white flex items-center justify-center p-2 rounded-md hover:bg-yellow-500 transition duration-300">
              <FaPenToSquare className="text-2xl font-bold" />
            </Link>
            <button onClick={() => setDeleteModalOpen(true)} className="btn bg-red-600 text-white flex items-center justify-center p-2 rounded-md hover:bg-red-500 transition duration-300">
              <MdDeleteSweep className="text-2xl font-bold" />
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
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
