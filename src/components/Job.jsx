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
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between h-full">
      {/* Top */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>
          {daysAgo(job.createdAt) === 0
            ? "Today"
            : `${daysAgo(job.createdAt)} days ago`}
        </span>

        <Bookmark className="w-5 h-5 text-[#7209b7] cursor-pointer" />
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mt-3">
        <img
          src={job.company.logo}
          alt="logo"
          className="w-10 h-10 rounded-full border object-cover"
        />
        <div>
          <h2 className="font-semibold text-sm">{job.company.name}</h2>
          <p className="text-xs text-gray-500">{job.location}</p>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3">
        <h1 className="text-lg font-bold text-gray-800 line-clamp-1">
          {job.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
          {job.position} Positions
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
          {job.jobType}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
          {job.salary} LPA
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => navigate(`/description/${job._id}`)}
          className="flex-1 py-2 text-sm rounded-lg bg-[#F83002] text-white hover:bg-red-600 transition"
        >
          View Details
        </button>

        <button className="flex-1 py-2 text-sm rounded-lg border hover:bg-gray-100 transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default Job;
