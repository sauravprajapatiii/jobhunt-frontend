import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="text-center px-4 sm:px-6">
      <div className="flex flex-col gap-6 my-12 max-w-4xl mx-auto">
        {/* Badge */}
        <span className="px-4 py-2 rounded-full mx-auto bg-gray-100 text-[#F83002] text-sm sm:text-base font-medium">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Search, Apply & <br className="hidden sm:block" />
          Get Your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Your dream job is just a search away. Explore opportunities, apply
          with confidence, and start building the career you deserve.
        </p>

        {/* Search Bar */}
        <div className="flex w-full sm:w-[80%] lg:w-[60%] mx-auto border border-gray-300 shadow-md rounded-full overflow-hidden">
          <input
            type="text"
            name="search"
            placeholder="Find your dream jobs"
            className="flex-1 px-4 py-2 sm:py-3 outline-none text-sm sm:text-base"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] px-4 sm:px-6 flex items-center justify-center hover:bg-purple-700 transition"
          >
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
