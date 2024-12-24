import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

import AOS from 'aos'; // Ensure AOS is installed and initialized
import 'aos/dist/aos.css'; // Import AOS styles
import { AuthContext } from '../Authprovider/Authprovider';

const Singsearch = ({ assignment}) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);

  const { user } = useContext(AuthContext); // Ensure the AuthContext provides the user data

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

  const lengthOfText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div data-aos="zoom-in" className="border-white overflow-hidden border-x rounded-lg border-t bg-base-100 shadow-xl mb-4">
      <div className="lg:flex md:flex flex-1 gap-8 items-center justify-between border-b-4 rounded-lg border-cyan-500 p-4">
        {/* Image */}
        <div className="mb-4 lg:mb-0">
          <img src={thumbnail} alt={title} className="w-full h-64 object-cover rounded-lg" />
        </div>

        {/* Assignment Info */}
        <div className="w-full flex-1">
          <div>
            <h2 className="card-title text-xl font-semibold">{lengthOfText(title, 30)}</h2>
            <p>{lengthOfText(description, 60)}</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singsearch;
