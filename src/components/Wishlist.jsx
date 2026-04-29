import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axiosInstance from "../utils/axios";
import { Heart, Bookmark } from "lucide-react";
import { useGetWishlistJobs } from "../hooks/useGetWishlistJobs";

const Wishlist = () => {
  const { user } = useSelector((store) => store.auth);
  const wishlistJobs = useSelector((store) => store.job.wishlistJobs);

  const fetchWishlist = useGetWishlistJobs();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  const handleRemove = async (jobId) => {
    try {
      await axiosInstance.delete(`/api/user/wishlist/remove/${jobId}`);

      toast.success("Removed from wishlist");

      fetchWishlist();
    } catch (error) {
      toast.error("Failed to remove");
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view wishlist</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          My Wishlist ({wishlistJobs?.length || 0})
        </motion.h1>

        {wishlistJobs?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Bookmark className="mx-auto h-24 w-24 text-gray-300 mb-4" />
            <h3>No saved jobs</h3>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistJobs?.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative group">
                  <Job job={job} />

                  <button
                    onClick={() => handleRemove(job._id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
                  >
                    <Heart className="text-red-500 fill-current" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
