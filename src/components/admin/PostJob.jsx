import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    company: "",
  });

  const { companies } = useSelector((store) => store.company);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    setInput({ ...input, company: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.company) {
      return toast.error("Please select a company first");
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post(`/api/job/post`, input, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");

        // reset form
        setInput({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "",
          experienceLevel: "",
          position: 0,
          company: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Requirements", name: "requirements", type: "text" },
              { label: "Salary", name: "salary", type: "text" },
              { label: "Location", name: "location", type: "text" },
              { label: "Job Type", name: "jobType", type: "text" },
              {
                label: "Experience Level",
                name: "experienceLevel",
                type: "text",
              },
              { label: "No. of Positions", name: "position", type: "number" },
            ].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={input[field.name] || ""}
                  onChange={handleInput}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>
            ))}
          </div>

          {/* Company Select */}
          {companies?.length > 0 && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Select Company
              </label>
              <select
                onChange={selectChangeHandler}
                name="company"
                value={input.company}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="">-- Select Company --</option>

                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6">
            <button className="bg-black text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Please wait..." : "Post Job"}
            </button>

            {companies?.length === 0 && (
              <p className="text-xs text-red-600 font-bold my-3 text-center">
                *Please register a company first before posting a job
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
