import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setSingleJob } from "../redux/jobSlice";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // ✅ Apply Job
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`/api/application/apply/${jobId}`);

      if (res.data.success) {
        setIsApplied(true);

        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user._id },
          ],
        };

        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Fetch Job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`/api/job/get/${jobId}`);

        if (res.data.success) {
          const job = res.data.job;

          dispatch(setSingleJob(job));

          const applied = job?.applications?.some((application) => {
            if (typeof application === "object") {
              return application.applicant === user?._id;
            }
            return application === user?._id;
          });

          setIsApplied(applied || false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 border">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {singleJob?.title}
            </h1>

            <div className="flex flex-wrap gap-3 mt-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {singleJob?.position} Positions
              </span>

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                {singleJob?.jobType}
              </span>

              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {singleJob?.salary} LPA
              </span>
            </div>
          </div>

          <button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition-all duration-200 ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isApplied ? "Applied ✓" : "Apply Now"}
          </button>
        </div>

        <div className="border-t my-6"></div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <p>
              <strong className="text-gray-700">Role:</strong>{" "}
              <span className="text-gray-600">{singleJob?.title}</span>
            </p>

            <p>
              <strong className="text-gray-700">Location:</strong>{" "}
              <span className="text-gray-600">{singleJob?.location}</span>
            </p>

            <p>
              <strong className="text-gray-700">Experience:</strong>{" "}
              <span className="text-gray-600">
                {singleJob?.experienceLevel} Years
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong className="text-gray-700">Salary:</strong>{" "}
              <span className="text-gray-600">{singleJob?.salary} LPA</span>
            </p>

            <p>
              <strong className="text-gray-700">Applicants:</strong>{" "}
              <span className="text-gray-600">
                {singleJob?.applications?.length || 0}
              </span>
            </p>

            <p>
              <strong className="text-gray-700">Posted:</strong>{" "}
              <span className="text-gray-600">
                {singleJob?.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString()
                  : "Loading..."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
