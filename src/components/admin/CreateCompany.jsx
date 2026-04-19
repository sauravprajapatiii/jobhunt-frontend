import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { toast } from "sonner";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      return toast.error("Company name is required");
    }

    try {
      const res = await axiosInstance.post(
        "/api/company/register",
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-6 sm:my-10">
        {/* Heading */}
        <div className="my-6 sm:my-10 text-center sm:text-left">
          <h1 className="font-bold text-lg sm:text-xl">Your Company Name</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            What would you like to name your company? You can change it later.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col">
          <label className="text-sm">Company Name</label>

          <input
            type="text"
            className="my-2 border border-gray-300 py-2 px-2 rounded-md text-sm w-full"
            placeholder="JobHunt, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              className="border px-4 py-2 rounded-md w-full sm:w-auto"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </button>

            <button
              className="border px-4 py-2 rounded-md bg-black text-white w-full sm:w-auto"
              onClick={registerNewCompany}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
