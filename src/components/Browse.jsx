import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
        {/* Heading */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">
          Search Results{" "}
          <span className="text-[#F83002]">({allJobs.length})</span>
        </h1>

        {/* Jobs Grid */}
        {allJobs.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No jobs found 😕</p>
        ) : (
          <div
            className="grid gap-5 
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3"
          >
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
