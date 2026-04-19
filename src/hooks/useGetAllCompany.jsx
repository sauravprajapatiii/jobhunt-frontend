import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import { setAllCompany } from "../redux/companySlice";

const useGetAllCompany = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get("/api/company/get", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllCompany(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompany();
  }, []);
};

export default useGetAllCompany;
