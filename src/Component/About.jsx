import React, { useEffect } from "react";
import { useLottie } from "lottie-react";
import online from '../assets/online - 1734813939712.json';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

const About = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);
    const options = {
        animationData: online,  // Use the imported animation data
        loop: true,                       // Set loop to true for continuous playback
        autoplay: true,                   // Set autoplay to true to start animation automatically
      };
    
      // Use the useLottie hook to get the View component
      const { View } = useLottie(options); 
  return (
    <div className=" py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image */}
          <div data-aos="fade-right" className="flex-1 overflow-hidden">
           {View}
          </div>

          {/* Right: Content */}
          <div  data-aos="fade-left"  className="flex-1 overflow-hidden">
            <h2 className="text-3xl font-bold text-[#06B6D4] mb-4">
              About Us
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              BJET Inc. is a forward-thinking company dedicated to empowering
              individuals through technology-driven solutions. Our mission is to
              create platforms that foster collaboration, innovation, and
              growth.
            </p>
            <h3 className="text-2xl font-semibold mb-4">
              Enhancing Collaborative Learning
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our platform is designed to make group study effortless and
              enjoyable. We aim to enhance collaborative learning among friends
              by providing tools to create, complete, and grade assignments in
              a seamless and engaging environment.
            </p>
            <button className="btn btn-primary text-white bg-[#06B6D4] hover:bg-[#0284a1] px-6 py-2 rounded-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
