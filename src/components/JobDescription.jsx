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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {singleJob?.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge blue">
                {singleJob?.position} Positions
              </span>
              <span className="badge red">{singleJob?.jobType}</span>
              <span className="badge purple">{singleJob?.salary} LPA</span>
            </div>
          </div>

          <button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`px-6 py-3 rounded-xl text-white font-semibold ${
              isApplied ? "bg-gray-400" : "bg-[#F83002] hover:bg-red-600"
            }`}
          >
            {isApplied ? "Applied ✓" : "Apply Now"}
          </button>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Description */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
          <div className="space-y-2">
            <p>
              <strong>Role:</strong> {singleJob?.title}
            </p>
            <p>
              <strong>Location:</strong> {singleJob?.location}
            </p>
            <p>
              <strong>Experience:</strong> {singleJob?.experienceLevel} Years
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Salary:</strong> {singleJob?.salary} LPA
            </p>
            <p>
              <strong>Applicants:</strong>{" "}
              {singleJob?.applications?.length || 0}
            </p>
            <p>
              <strong>Posted:</strong>{" "}
              {singleJob?.createdAt
                ? new Date(singleJob.createdAt).toLocaleDateString()
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
