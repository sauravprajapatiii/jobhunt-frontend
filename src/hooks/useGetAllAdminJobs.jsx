import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminJobs, setAllJobs } from "../redux/jobSlice";
import { setAllCompany } from "../redux/companySlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get("/api/job/getadminjobs", {
          withCredentials: true,
        });
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
