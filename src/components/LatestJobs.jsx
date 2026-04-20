import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 sm:px-6">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      {/* Grid */}
      <div
        className="grid gap-6 mt-10 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3"
      >
        {allJobs.length <= 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No jobs available
          </p>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobsCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
