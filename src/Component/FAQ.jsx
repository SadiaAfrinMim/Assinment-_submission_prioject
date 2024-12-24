import React, { useEffect } from "react";
import { useLottie } from "lottie-react";
import faq from '../assets/faq- 1734813543298.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);
    const options = {
        animationData: faq,  // Use the imported animation data
        loop: true,                       // Set loop to true for continuous playback
        autoplay: true,                   // Set autoplay to true to start animation automatically
      };
    
      // Use the useLottie hook to get the View component
      const { View } = useLottie(options); 
  return (
   <div>
     <h1 className="text-3xl text-center font-bold text-cyan-500">Frequently Asked Questions</h1>
     
     <div   className="lg:flex  items-center justify-center gap-8 rounded-md">
     
     {/* FAQ Section */}
     <div data-aos="fade-left" className="flex-1 overflow-hidden space-y-4">
       <div className="collapse  collapse-plus bg-base-200 border border-[#06B6D4] ">
         <input type="radio" name="my-accordion-3" defaultChecked />
         <div className="collapse-title text-xl font-medium">
           What is this platform about?
         </div>
         <div className="collapse-content">
           <p>
             This platform is designed for online group study with friends. It
             allows users to create, complete, and grade assignments
             collaboratively. This platform fosters collaboration and helps students enhance their
         learning experience by working together. It’s an easy way to create
         and manage assignments while building stronger connections with your
         peers.
           </p>
         </div>
       </div>
       <div className="collapse collapse-plus bg-base-200 border border-[#06B6D4] ">
         <input type="radio" name="my-accordion-3" />
         <div className="collapse-title text-xl font-medium">
           How can I create an assignment?
         </div>
         <div className="collapse-content">
           <p>
             After registering and logging in, navigate to the "Create
             Assignment" section, fill out the necessary details, and submit.
             Your friends can view and complete the assignment.
           </p>
         </div>
       </div>
       <div className="collapse collapse-plus bg-base-200 border border-[#06B6D4] ">
         <input type="radio" name="my-accordion-3" />
         <div className="collapse-title text-xl font-medium">
           How do I grade my friends' assignments?
         </div>
         <div className="collapse-content">
           <p>
             You can access the "Grade Assignments" section, view your friends'
             submissions, and provide constructive feedback and grades.
           </p>
         </div>
       </div>
     </div>

     {/* Additional Information Section */}
     <div data-aos="fade-right" className="flex-1 p-4 overflow-hidden text-white rounded-md">
      {View}
     </div>
   </div>
   </div>
  );
};

export default FAQ;
