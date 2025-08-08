import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";

const slides = [
  {
    bg: "https://i.postimg.cc/Pr7kyxvB/photo-1600628421066-f6bda6a7b976.avif",
    title: "Share Food, Share Kindness",
    desc: "Bridge the gap between surplus and scarcity. Help reduce food waste by sharing your extra meals with those who need them the most. Together, we can make hunger a thing of the past.",
  },
  {
    bg: "https://i.postimg.cc/VNCMvdX1/FOOD-FOR-HUNGRY-15-5-2024-5.jpg",
    title: "Every Meal Matters",
    desc: "Whether you're a restaurant, home cook, or donor — your shared meal brings hope. Post available food, and let nearby volunteers or seekers find it quickly and easily.",
  },
  {
    bg: "https://i.postimg.cc/cCJVMyxx/110777983-volunteers-share-food-to-the-poor-to-relieve-hunger-charity-concept.jpg",
    title: "Fight Hunger in Your Community",
    desc: "Join a growing network of food heroes working together to end hunger, one plate at a time. Make a difference — locally, compassionately, and effectively.",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const lastIndex = slides.length - 1;

  const goNextSlide = () =>
    setCurrent((prev) => (prev === lastIndex ? 0 : prev + 1));
  const goPreviousSlide = () =>
    setCurrent((prev) => (prev === 0 ? lastIndex : prev - 1));

  useEffect(() => {
    const interval = setInterval(goNextSlide, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="w-[96%] md:w-[90%] lg:w-[80%]  mx-auto rounded-[16px] relative overflow-hidden mb-10">
      <div
        className="flex transition-transform duration-700"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map(({ bg, title, desc }, indx) => (
          <div
            key={indx}
            className="bg-cover bg-center h-[500px] md:h-screen flex-shrink-0 p-7"
            style={{
              width: `${100 / slides.length}%`,
              backgroundImage: `url('${bg}')`,
            }}
          >
            <h1 className="text-[40px] sm:text-[56px] md:text-[80px] text-white font-medium mb-8">
              {title}
            </h1>
            <p className="text-[16px] md:text-[32px] text-white font-medium mb-10">
              {desc}
            </p>
            <NavLink to="/addfood">
              <button className="bg-[#FF6B6B] text-white px-4 py-2 text-[20px] rounded-[8px] hover:bg-[#FF6B6B90]">
                Donate Food
              </button>
            </NavLink>
            <NavLink to="/available-foods">
              <button className="bg-[#FF6B6B] ml-4 text-white px-4 py-2 text-[20px] rounded-[8px] hover:bg-[#FF6B6B90]">
                Available Foods
              </button>
            </NavLink>
          </div>
        ))}
      </div>
      <button
        onClick={goPreviousSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#00000050] text-white p-2 rounded-full hover:bg-[#00000080]"
      >
        ‹
      </button>
      <button
        onClick={goNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#00000050] text-white p-2 rounded-full hover:bg-[#00000080]"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, indx) => (
          <button
            key={indx}
            onClick={() => setCurrent(indx)}
            className={`h-3 w-3 rounded-full ${
              indx === current ? "bg-white" : "bg-[#ffffff50]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
