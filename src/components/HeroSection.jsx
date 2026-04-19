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
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 rounded-full mx-auto bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search , Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p>
          Your dream job is just a search away. Explore opportunities, apply
          with confidence, and start building the career you deserve.
        </p>
        <div className="flex w-[40%] border border-gray-300 shadow-lg pl-3  rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            name="search"
            className="outline-none w-full border-none"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="rounded-r-full bg-[#6A38C2] py-2"
            onClick={searchJobHandler}
          >
            <SearchIcon className="h-5 w-10 text-white font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
