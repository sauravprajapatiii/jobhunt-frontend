import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const EditJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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

  // ✅ Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/job/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;

          setInput({
            ...job,
            requirements: job.requirements.join(","), // array → string
            company: job.company?._id || job.company,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load job");
      }
    };

    fetchJob();
  }, [id]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    setInput({ ...input, company: e.target.value });
  };

  // ✅ Update handler (only change from PostJob)
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(`/api/job/${id}`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-8">
        <form
          onSubmit={handleUpdate}
          className="max-w-4xl bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Job</h2>

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
                  value={input[field.name]}
                  onChange={handleInput}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>
            ))}
          </div>

          {/* Company Select */}
          {companies.length > 0 && (
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
            {loading ? (
              <button className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md w-full">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </button>
            ) : (
              <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                Update Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
