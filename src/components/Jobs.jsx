import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { SlidersHorizontal, X } from "lucide-react";

const Jobs = () => {
  const { allJobs, filters } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // 🔥 toggle

  useEffect(() => {
    let filtered = allJobs;

    if (filters) {
      if (filters.location) {
        filtered = filtered.filter((job) =>
          job.location?.toLowerCase().includes(filters.location.toLowerCase()),
        );
      }

      if (filters.Industry) {
        filtered = filtered.filter((job) =>
          job.title?.toLowerCase().includes(filters.Industry.toLowerCase()),
        );
      }

      if (filters.Salary) {
        filtered = filtered.filter((job) =>
          job.salary?.toString().includes(filters.Salary),
        );
      }
    }

    setFilterJobs(filtered);
  }, [allJobs, filters]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-5">
        {/* 🔥 Mobile Filter Button */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h1 className="text-lg font-semibold">Jobs</h1>
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-sm"
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ✅ Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <FilterCard />
            </div>
          </div>

          {/* ✅ Jobs */}
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

      {/* 🔥 MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition ${
          showFilter ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            showFilter ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setShowFilter(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform ${
            showFilter ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Filters</h2>
            <button onClick={() => setShowFilter(false)}>
              <X />
            </button>
          </div>

          {/* Filter Content */}
          <div className="p-4 overflow-y-auto h-full">
            <FilterCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
