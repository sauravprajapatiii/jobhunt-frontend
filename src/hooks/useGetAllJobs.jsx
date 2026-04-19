import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`/api/job/get?keyword=${searchQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [searchQuery]);
};

export default useGetAllJobs;
