import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandle = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();
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
      const res = await axios.put(
        `/api/company/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-full max-w-xl px-4 sm:px-6 md:px-8 mx-auto my-6 sm:my-10">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded-lg p-4 sm:p-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
            <button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold border border-gray-300 rounded-md px-3 py-1 w-fit"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>

            <h1 className="font-bold text-lg sm:text-xl text-center sm:text-right">
              Company Setup
            </h1>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm mb-1">Company Name</label>
              <input
                className="border border-gray-300 px-2 py-2 rounded-md text-sm"
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Description</label>
              <input
                className="border border-gray-300 px-2 py-2 rounded-md text-sm"
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Website</label>
              <input
                className="border border-gray-300 px-2 py-2 rounded-md text-sm"
                type="text"
                name="website"
                value={input.website}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Location</label>
              <input
                className="border border-gray-300 px-2 py-2 rounded-md text-sm"
                type="text"
                name="location"
                value={input.location}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm mb-1">Logo</label>
              <input
                className="text-sm"
                type="file"
                accept="image/*"
                onChange={fileHandle}
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            {loading ? (
              <button className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md w-full">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </button>
            ) : (
              <button className="bg-black text-white px-4 py-2 rounded-md w-full">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
