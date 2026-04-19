import React from "react";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b">Applied Jobs</h2>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Job Role</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {allAppliedJobs.length <= 0 ? (
              <span>You have not Applied to any job yet.</span>
            ) : (
              allAppliedJobs.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{item.createdAt.split("T")[0]}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item?.job?.title}
                  </td>
                  <td className="px-6 py-4">{item?.job?.company?.name}</td>

                  <td className="px-3 py-4 text-right">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
