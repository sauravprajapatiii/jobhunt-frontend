import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobsCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl bg-white border border-gray-100 
      shadow-sm hover:shadow-lg transition duration-300 
      cursor-pointer flex flex-col justify-between"
    >
      {/* Top */}
      <div>
        <h2 className="text-sm text-gray-500">{job.company?.name}</h2>
        <p className="text-xs text-gray-400">{job.location}</p>

        <h1 className="text-lg sm:text-xl font-semibold mt-2">{job.title}</h1>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Bottom Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {job.position} Positions
        </span>

        <span className="text-xs bg-red-100 text-[#F83002] px-2 py-1 rounded">
          {job.jobType}
        </span>

        <span className="text-xs bg-purple-100 text-[#7209b7] px-2 py-1 rounded">
          {job.salary} LPA
        </span>
      </div>
    </div>
  );
};

export default LatestJobsCard;
