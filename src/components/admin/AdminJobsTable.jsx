import { Edit2, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!allAdminJobs) return;

    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      const text = searchJobByText.toLowerCase();

      return (
        job?.title?.toLowerCase().includes(text) ||
        job?.company?.name?.toLowerCase().includes(text)
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold p-4 border-b text-center sm:text-left">
          Your Posted Jobs
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 sm:px-4 py-2">Company</th>
                <th className="px-3 sm:px-4 py-2">Role</th>
                <th className="px-3 sm:px-4 py-2">Date</th>
                <th className="px-3 sm:px-4 py-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filterJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No jobs posted yet.
                  </td>
                </tr>
              ) : (
                filterJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition">
                    {/* Company */}
                    <td className="px-3 sm:px-4 py-2 font-medium text-gray-800 text-xs sm:text-sm">
                      {job?.company?.name || "N/A"}
                    </td>

                    {/* Role */}
                    <td className="px-3 sm:px-4 py-2 text-gray-800 text-xs sm:text-sm">
                      {job?.title || "N/A"}
                    </td>

                    {/* Date */}
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      {job.createdAt?.split("T")[0]}
                    </td>

                    {/* Action */}
                    <td className="px-3 sm:px-4 py-2 text-right">
                      <div className="flex justify-end gap-4">
                        {/* Edit */}
                        <div className="relative group">
                          <button
                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          >
                            <Edit2 className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                          </button>
                          <span className="absolute bottom-6 right-0 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded">
                            Edit
                          </span>
                        </div>

                        {/* View Applicants */}
                        <div className="relative group">
                          <button
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                          >
                            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                          </button>
                          <span className="absolute bottom-6 right-0 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Applicants
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsTable;
