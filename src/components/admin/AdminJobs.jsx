import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setsearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Debounced search (better performance)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setsearchJobByText(input));
    }, 300);

    return () => clearTimeout(timer);
  }, [input, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-8 sm:my-12">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 my-5">
          {/* Search */}
          <input
            type="text"
            className="w-full sm:w-72 border px-3 py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="Search by job title or company..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button */}
          <button
            className="bg-black text-white rounded-md px-4 py-2 text-sm w-full sm:w-auto hover:bg-gray-900 transition"
            onClick={() => navigate("/admin/jobs/create")}
          >
            + New Job
          </button>
        </div>

        {/* Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
