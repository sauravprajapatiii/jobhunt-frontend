import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import axiosInstance from "../utils/axios";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        if (!companyId) return;

        const res = await axiosInstance.get(`/api/company/get/${companyId}`);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
