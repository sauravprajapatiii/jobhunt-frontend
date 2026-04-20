import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Fullstack Developer",
    "DevOps",
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 px-4">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-2 sm:px-10 py-2"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => searchJobHandler(cat)}
            className="flex-shrink-0 text-center bg-gray-100 hover:bg-[#F83002] hover:text-white 
                       cursor-pointer px-4 sm:px-5 py-2 sm:py-3 rounded-full 
                       text-sm sm:text-base font-medium transition whitespace-nowrap"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CategoryCarousel;
