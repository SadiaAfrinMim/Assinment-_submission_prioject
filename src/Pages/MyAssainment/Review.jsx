import React from 'react';

const FlexWithPhoto = () => {
  return (
    <div className="flex flex-col md:flex-row items-center p-8 rounded-lg shadow-lg ">
      {/* Left Side Content */}
      <div className="md:w-1/2 w-full text-center md:text-left md:pr-8">
        <h2 className="text-3xl font-semibold text-sky-400 mb-4">
        Welcome to Our Platform
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Streamline your assignment submissions, enhance collaboration, and stay organized effortlessly. 
          Our user-friendly platform offers seamless communication, progress tracking, and smart tools 
          to boost your productivity. Join us today and take your workflow to the next level!
        </p>
        <button className="btn btn-outline btn-info">
          Get Started Now
        </button>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 w-full flex justify-center mt-6 md:mt-0">
        <img
          src="https://i.ibb.co.com/Pv4XDbRw/business-meeting-23-2147551792.jpg"
          alt="Collaboration in Action"
          className="rounded-full w-64 h-64 border-8 border-[#06B6D4]  p-3 shadow-lg"
        />
      </div>
    </div>
  );
};

export default FlexWithPhoto;
