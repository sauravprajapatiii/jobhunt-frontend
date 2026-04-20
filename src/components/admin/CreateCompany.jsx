import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { toast } from "sonner";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (loading) return;

    if (!companyName.trim()) {
      return toast.error("Company name is required");
    }

    try {
      setLoading(true);

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

        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ allow Enter key submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      registerNewCompany();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-8 sm:my-12">
        {/* Heading */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="font-bold text-lg sm:text-xl">Your Company Name</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            What would you like to name your company? You can change it later.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Company Name</label>

          <input
            type="text"
            className="my-2 border border-gray-300 py-2 px-3 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="JobHunt, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              className="border px-4 py-2 rounded-md w-full sm:w-auto hover:bg-gray-100 transition disabled:opacity-50"
              onClick={() => navigate("/admin/companies")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="border px-4 py-2 rounded-md bg-black text-white w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60"
              onClick={registerNewCompany}
              disabled={loading || !companyName.trim()}
            >
              {loading ? "Creating..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
