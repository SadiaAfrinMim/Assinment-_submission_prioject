import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
 // Adjust the import path if necessary

import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Authprovider';
import { Toggle } from './Darkmode/Darkmode';

const Navbar = () => {
  const { user, logOut, isDark, setIsDark } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamic Navlinks
  const Navlink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " bg-[#06B6D4] text-white font-bold rounded-full"
              : " border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#06B6D4] rounded-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/assignments"
          className={({ isActive }) =>
            isActive
              ? " bg-[#06B6D4] text-white font-bold rounded-full"
              : " border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#06B6D4] rounded-lg"
          }
        >
          Assignments
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/pending-assignments"
              className={({ isActive }) =>
                isActive
                  ? " bg-[#06B6D4] text-white font-bold rounded-full"
              : " border-b-4 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#06B6D4] rounded-lg"
              }
            >
              Pending Assignments
            </NavLink>
          </li>
         
        
        </>
      )}
    </>
  );

  const handleLogin = () => {
    Swal.fire({
      title: 'Log in',
      text: 'Are you sure you want to log in?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, log in',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Log out',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
      }
    });
  };

  return (
   
      <div className={`navbar w-full  mx-auto sticky top-0 left-0 right-0 z-50 ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm z-50 dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 space-y-4 shadow"
            >
              {Navlink}
            </ul>
          )}
        </div>
        <div to="/" className="font-bold flex items-center  light-ehem h-1  text-xl">
        <img className='w-10' src="https://i.ibb.co.com/Q6nTYF3/icons8-assignment-64.png" alt="" />
         <span className='hidden lg:block'>CollabStudy</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal   px-1">{Navlink}</ul>
      </div>

      <div className="navbar-end gap-2 justify-end flex items-center sm:flex-row">
        <div className="sm:mb-0">
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>

        {!user ? (
          <>
            <button
              className="py-2 whitespace-nowrap  btn bg-[#8B5CF6]  rounded-none sm:mb-0"
              onClick={handleLogin}
            >
              Log in
            </button>
          </>
        ) : (
          <div className="relative">
            {/* Profile Picture */}
            <div
              className="relative group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              {/* Display Name on Hover */}

             
  

            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2  bg-white shadow-lg rounded-lg p-2">
                <Link
                  to="/create-assignment"
                  className="block py-2 px-4 mb-2 text-gray-700 hover:bg-cyan-500 whitespace-nowrap"
                >
                  Create Assignment
                </Link>
                <Link
                  to="/search"
                  className="block py-2 px-4 mb-2   whitespace-nowrap text-gray-700 hover:bg-cyan-500"
                >
                  All Assignment
                </Link>
                <Link
                  to="/my-attempted-assignments"
                  className="block py-2 px-4 mb-2   whitespace-nowrap text-gray-700 hover:bg-cyan-500"
                >
                  My Attempted Assignments
                </Link>
                <button
                  className="block py-2 px-4 text-gray-700 hover:bg-cyan-500 w-full text-left"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Navbar;