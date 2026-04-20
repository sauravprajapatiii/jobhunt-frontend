import { Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongoDbTime) => {
    if (!mongoDbTime) return "Recently";

    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const diff = currentTime - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between h-full">
      {/* Top Row */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{daysAgo(job?.createdAt)}</span>

        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bookmark className="w-5 h-5 text-[#7209b7]" />
        </button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mt-4">
        <img
          src={job?.company?.logo || "/default-company.png"}
          alt="logo"
          className="w-11 h-11 rounded-full border object-cover bg-gray-50"
        />

        <div className="min-w-0">
          <h2 className="font-semibold text-sm text-gray-800 truncate">
            {job?.company?.name || "Unknown Company"}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            {job?.location || "Location not specified"}
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h1 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#F83002] transition">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job?.description || "No description available"}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">
          {job?.position || 0} Positions
        </span>

        <span className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-600 font-medium">
          {job?.jobType || "N/A"}
        </span>

        <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700 font-medium">
          {job?.salary ? `${job.salary} LPA` : "Salary not disclosed"}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 py-2 text-sm rounded-lg bg-[#F83002] text-white font-medium hover:bg-red-600 transition"
        >
          View Details
        </button>

        <button className="flex-1 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default Job;
