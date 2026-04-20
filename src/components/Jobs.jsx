import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs, searchQuery, filters } = useSelector((store) => store.job);
  // const { allJobs, searchText, filters } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  useEffect(() => {
    let filtered = allJobs;

    if (filters) {
      // 📍 location filter
      if (filters.location) {
        filtered = filtered.filter((job) =>
          job.location?.toLowerCase().includes(filters.location.toLowerCase()),
        );
      }

      // 💼 industry filter
      if (filters.Industry) {
        filtered = filtered.filter((job) =>
          job.title?.toLowerCase().includes(filters.Industry.toLowerCase()),
        );
      }

      // 💰 salary filter (basic match)
      if (filters.Salary) {
        filtered = filtered.filter((job) =>
          job.salary?.toString().includes(filters.Salary),
        );
      }
    }

    setFilterJobs(filtered);
  }, [allJobs, filters]);
  console.log("---- Jobs render ----");
  console.log("TYPE:", typeof searchQuery, searchQuery);
  return (
    <div className="max-w-7xl mx-auto px-4 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky top-20">
            <FilterCard />
          </div>
        </div>

        {/* Jobs */}
        <div className="lg:col-span-3">
          {filterJobs?.length <= 0 ? (
            <p className="text-center text-gray-500 mt-10">No jobs found</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filterJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
