import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllCompany } from "../redux/companySlice";
import axiosInstance from "../utils/axios";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axiosInstance.get("/api/company/get");

        if (res.data.success) {
          dispatch(setAllCompany(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCompany();
  }, [dispatch]);
};

export default useGetAllCompany;
