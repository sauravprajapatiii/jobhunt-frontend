import { Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job?._id;

  console.log("---- Job render ----");
  console.log("Received job:", job);
  const daysAgo = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 grid gap-4">
      {/* Top Row */}
      <div className="grid grid-cols-2 items-center">
        <p className="text-xs text-gray-500">
          {daysAgo(job.createdAt) === 0
            ? "Today"
            : `${daysAgo(job.createdAt)} days ago`}
        </p>

        <div className="flex justify-end">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-[#7209b7]" />
          </button>
        </div>
      </div>

      {/* Company Section */}
      <div className="grid grid-cols-[auto,1fr] gap-3 items-center">
        <div className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden bg-gray-50">
          <img
            src={job.company.logo}
            alt="logo"
            className="w-7 h-7 object-cover"
          />
        </div>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-semibold truncate">
            {job.company.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {job.location}, India
          </p>
        </div>
      </div>

      {/* Job Info */}
      <div className="grid gap-1 min-w-0">
        <h1 className="text-sm sm:text-lg font-bold text-gray-900 truncate">
          {job.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Tags */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <span className="text-xs px-2 py-1 border rounded-md font-semibold text-blue-700 bg-blue-50 text-center">
          {job.position} Positions
        </span>
        <span className="text-xs px-2 py-1 flex justify-center items-center border rounded-md font-semibold text-[#F83002] bg-red-50 text-center">
          {job.jobType}
        </span>
        <span className="text-xs px-2 py-1 flex justify-center items-center border rounded-md  font-semibold text-[#7209b7] bg-purple-50 text-center col-span-2 sm:col-span-1">
          {job.salary} LPA
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          onClick={() => navigate(`/description/${jobId}`)}
          className="w-full text-xs sm:text-sm px-3 py-2 bg-[#F83002] text-white rounded-md hover:bg-white hover:text-black border hover:border-gray-300 transition"
        >
          Details
        </button>

        <button className="w-full text-xs sm:text-sm px-3 py-2 bg-[#7209b7] text-white rounded-md hover:bg-white hover:text-black border hover:border-gray-300 transition">
          Save for Later
        </button>
      </div>
    </div>
  );
};

export default Job;
