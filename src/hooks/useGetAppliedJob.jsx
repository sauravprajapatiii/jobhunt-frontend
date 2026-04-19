import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs, setAllJobs } from "../redux/jobSlice";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get("/api/application/get", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJob;
