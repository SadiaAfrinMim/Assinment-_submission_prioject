import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const OnlineAdvantage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });  // Customize the duration for animations
  }, []);
  const advantages = [
    {
      title: "Real-Time Collaboration",
      description:
        "Work with friends in real-time to complete assignments, discuss ideas, and share knowledge seamlessly.",
      icon: "https://i.ibb.co.com/wpk5XtK/icons8-collaboration-100.png",
    },
    {
      title: "Track Progress Effortlessly",
      description:
        "Stay on top of your tasks with progress tracking and timely reminders for upcoming deadlines.",
      icon: "https://i.ibb.co.com/B6MBxG0/icons8-fast-track-64.png",
    },
    {
      title: "Centralized Learning Resources",
      description:
        "Access shared notes, reference materials, and assignments all in one place for a streamlined study experience.",
      icon: "https://i.ibb.co.com/DLf1Pb6/icons8-learning-100.png",
    },
    {
      title: "Feedback-Driven Growth",
      description:
        "Receive constructive feedback and grades from your friends to enhance learning outcomes.",
      icon: "https://i.ibb.co.com/kqdkwpN/icons8-profit-growth-64.png",
    },
  ];

  return (
    <div data-aos="zoom-in"  className=" py-12">
      <h2 className="text-3xl font-bold text-center text-[#06B6D4] mb-8">
        Why Choose Online Group Study?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-20">
        {advantages.map((advantage, index) => (
          <div
            key={index}
            className="p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center text-center"
          >
            <img
              src={advantage.icon}
              alt={advantage.title}
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-[#06B6D4] mb-2">
              {advantage.title}
            </h3>
            <p className="text-gray-600">{advantage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineAdvantage;
