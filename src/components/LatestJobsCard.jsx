import React from "react";
import { useNavigate } from "react-router-dom";
const LatestJobsCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/description/${job._id}`);
      }}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium font-lg">{job.company?.name}</h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div>
        <h1 className="text-lg font-bold my-2">{job.title}</h1>
        <p className="text-sm text-gray-600 ">{job.description}</p>
      </div>
      <div className="flex gap-5 mt-2">
        <p className="text-blue-700 px-1 border inline font-bold">
          {job.position} positions
        </p>
        <p className="text-[#F83002] px-1  border inline font-bold">
          {job.jobType}
        </p>
        <p className="text-[#7209b7]  px-1 border inline font-bold">
          {job.salary}LPA
        </p>
      </div>
    </div>
  );
};

export default LatestJobsCard;
