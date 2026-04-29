import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import axiosInstance from "../utils/axios";
import { toast } from "sonner";
import { useGetWishlistJobs } from "../hooks/useGetWishlistJobs";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);
  const wishlistJobs = useSelector((store) => store.job.wishlistJobs);

  const fetchWishlist = useGetWishlistJobs();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsInWishlist(wishlistJobs?.some((wjob) => wjob._id === job._id));
    }
  }, [user, wishlistJobs, job._id]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = isInWishlist
        ? `/api/user/wishlist/remove/${job._id}`
        : `/api/user/wishlist/add/${job._id}`;

      if (isInWishlist) {
        await axiosInstance.delete(url);
      } else {
        await axiosInstance.post(url);
      }

      setIsInWishlist((prev) => !prev);

      toast.success(
        isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const daysAgo = (time) => {
    if (!time) return "Recently";
    const diff = new Date() - new Date(time);
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
      <div className="flex items-center justify-between mt-4">
        <div className="flex-1">
          <button
            onClick={() => navigate(`/description/${job?._id}`)}
            className="w-full py-2 text-sm rounded-lg bg-[#F83002] text-white font-medium hover:bg-red-600 transition"
          >
            View Details
          </button>
        </div>

        <button
          onClick={toggleWishlist}
          disabled={isLoading}
          className="ml-3 p-2 hover:bg-gray-100 rounded-full transition-all group -m-2"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Bookmark
            size={20}
            className={`transition-all ${
              isInWishlist
                ? "text-red-500 fill-red-100 group-hover:fill-red-200"
                : "text-gray-400 group-hover:text-red-400"
            } ${isLoading ? "opacity-50" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Job;
