import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axiosInstance.post(
        `/api/application/status/${id}/update`,
        { status },
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const applications = applicants?.applications || [];

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold p-4 border-b text-center sm:text-left">
          Recent Applicants
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 sm:px-4 py-2">Full Name</th>
                <th className="px-3 sm:px-4 py-2">Email</th>
                <th className="px-3 sm:px-4 py-2">Contact</th>
                <th className="px-3 sm:px-4 py-2">Date</th>
                <th className="px-3 sm:px-4 py-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No applicants found yet.
                  </td>
                </tr>
              ) : (
                applications.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    {/* Name */}
                    <td className="px-3 sm:px-4 py-2 font-medium text-gray-800 text-xs sm:text-sm">
                      {item?.applicant?.fullname || "N/A"}
                    </td>

                    {/* Email */}
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm">
                      {item?.applicant?.email || "N/A"}
                    </td>

                    {/* Phone */}
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm">
                      {item?.applicant?.phoneNumber || "N/A"}
                    </td>

                    {/* Date */}
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      {item.createdAt?.split("T")[0]}
                    </td>

                    {/* Action */}
                    <td className="px-3 sm:px-4 py-2 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setOpenIndex(openIndex === idx ? null : idx)
                          }
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm px-3 py-1 rounded"
                        >
                          Select
                        </button>

                        {openIndex === idx && (
                          <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
                            {shortlistingStatus.map((status) => (
                              <div
                                key={status}
                                onClick={() => {
                                  statusHandler(status, item._id);
                                  setOpenIndex(null);
                                }}
                                className={`px-3 py-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-100 ${
                                  status === "Accepted"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {status}
                              </div>
                            ))}
                          </div>
                        )}
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

export default ApplicantsTable;
