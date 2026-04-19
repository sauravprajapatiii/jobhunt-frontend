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
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Fullstack Developer",
    "DevOps",
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
      >
        <ChevronLeft />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => searchJobHandler(cat)}
            className="w-[180px] text-center bg-gray-100 hover:bg-[#F83002] whitespace-nowrap hover:text-white cursor-pointer px-4  py-2 rounded-full transition"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default CategoryCarousel;
