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
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-5">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="lg:col-span-3">
            {filterJobs?.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs?.map((job, index) => {
                  console.log("Mapping job:", job);
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Job key={job._id} job={job} />;
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
