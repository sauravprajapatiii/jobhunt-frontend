import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();

  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandle = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  useEffect(() => {
    if (!singleCompany) return;

    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axiosInstance.put(
        `/api/company/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 md:px-8 my-8 sm:my-12">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded-lg p-4 sm:p-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
            <button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-600 font-medium border border-gray-300 rounded-md px-3 py-1 w-fit hover:bg-gray-100 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <h1 className="font-bold text-lg sm:text-xl text-center sm:text-right">
              Company Setup
            </h1>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "name", placeholder: "Company Name" },
              { name: "description", placeholder: "Description" },
              { name: "website", placeholder: "Website" },
              { name: "location", placeholder: "Location" },
            ].map((field, i) => (
              <input
                key={i}
                className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={input[field.name]}
                onChange={handleChange}
              />
            ))}

            {/* File Upload */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Company Logo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={fileHandle}
                className="w-full text-sm border p-2 rounded-md"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <button
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Please wait..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
