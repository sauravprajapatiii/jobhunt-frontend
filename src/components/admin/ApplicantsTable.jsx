import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { applicants } = useSelector((store) => store.application);
  console.log(applicants.applications);

  // const handleSelect = (status) => {
  //   console.log("Selected:", status);
  //   setOpenIndex(null);
  // };
  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `/api/application/status/${id}/update`,
        {
          status,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <div className="bg-white shadow-md  rounded-lg overflow-hidden">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold p-4 border-b text-center sm:text-left">
          A list of your recent applied users
        </h2>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="min-w-[400px] w-full text-sm text-left">
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
              {applicants &&
                applicants.applications.map((item) => (
                  <tr className="hover:bg-gray-50 transition" key={item._id}>
                    <td className="px-3 sm:px-4 py-2 font-medium text-gray-800 text-xs sm:text-sm">
                      {item.applicant.fullname}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm">
                      {item.applicant.email}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm">
                      {item.applicant.phoneNumber}
                    </td>

                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      {item.createdAt.split("T")[0]}
                    </td>
                    {/* Action Dropdown */}
                    <td className="px-3 sm:px-6 py-2 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setOpenIndex(openIndex === 0 ? null : 0)
                          }
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm px-3 py-1 rounded"
                        >
                          Select
                        </button>

                        {openIndex === 0 && (
                          <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
                            {shortlistingStatus.map((status, index) => (
                              <div
                                key={index}
                                onClick={() => statusHandler(status, item._id)}
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsTable;
