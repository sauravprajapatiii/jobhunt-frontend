import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "../../redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setAdminJobs, setsearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-6 sm:my-10">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 my-5">
          {/* Search Input */}
          <input
            type="text"
            className="w-full sm:w-64 border px-3 py-2 border-gray-300 rounded-md text-sm"
            placeholder="Filter by name and role"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          {/* Button */}
          <button
            className="bg-black text-white rounded-md px-4 py-2 text-sm w-full sm:w-auto"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </button>
        </div>

        {/* Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
