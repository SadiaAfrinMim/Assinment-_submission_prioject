
import React, { useEffect, useState } from "react";

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "https://i.ibb.co.com/F3fntWg/andrew-neel-ute2-XAFQU2-I-unsplash.jpg",
      title: "Collaborate, Learn, and Grow Together",
      description:
        "Join the ultimate platform for group studies. Create, complete, and grade assignments with friends effortlessly.",
      buttonText: "Start Learning",
    },
    {
      image: "https://i.ibb.co.com/wC4yc6v/nick-morrison-FHnnjk1-Yj7-Y-unsplash.jpg",
      title: "Create Assignments with Ease",
      description:
        "Empower your learning journey by crafting assignments that challenge and inspire your peers.",
      buttonText: "Create Now",
    },
    {
      image: "https://i.ibb.co.com/k5gRrDB/photo-1562654501-a0ccc0fc3fb1.jpg",
      title: "Track and Complete Assignments",
      description:
        "Stay organized and motivated. Collaborate with friends to complete tasks and achieve goals.",
      buttonText: "Track Progress",
    },
    {
      image: "https://i.ibb.co.com/jWzVTdR/premium-photo-1667520026127-f992759415b2.jpg",
      title: "Share Feedback and Grade Assignments",
      description:
        "Foster a collaborative environment by grading and giving constructive feedback to your friends.",
      buttonText: "Grade Now",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden pb-10">
      <div className="relative w-full h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-4 transition-transform duration-700 ${
                activeSlide === index
                  ? "translate-x-0"
                  : "translate-x-full opacity-0"
              }`}
            >
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="text-lg max-w-xl">{slide.description}</p>
              <button className="btn btn-outline border-[#06B6D4] text-[#06B6D4] bg-transparent hover:bg-[#06B6D4] hover:text-white rounded-lg">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
        <div className="absolute flex justify-between transform -translate-y-1/2 left-10 right-10 top-1/2">
          <button
            onClick={handlePrev}
            className="btn btn-circle bg-black/60 hover:bg-black/80 text-white text-2xl w-12 h-12"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="btn btn-circle bg-black/60 hover:bg-black/80 text-white text-2xl w-12 h-12"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
