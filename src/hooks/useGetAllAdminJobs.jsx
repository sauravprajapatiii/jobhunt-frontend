import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../redux/jobSlice";
import axiosInstance from "../utils/axios";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axiosInstance.get("/api/job/getadminjobs");

        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
